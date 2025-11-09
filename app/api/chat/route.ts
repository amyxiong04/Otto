import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'No message provided' }, { status: 400 });
    }

    // Check for API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ 
        error: 'OpenAI API key not configured',
        response: 'Sorry, AI responses are not configured. Please add your OpenAI API key.' 
      }, { status: 200 });
    }

    // Build conversation messages for GPT
    const messages = [
      {
        role: 'system',
        content: `You are Otto, a friendly otter helping someone find their perfect job. You're warm, approachable, and genuinely interested in understanding them.

YOUR STYLE:
- Text like a friend would - simple, natural, warm
- Ask ONE focused question at a time
- Use text emoticons sparingly (maybe once every 3-4 messages): :) :D :/
- Keep responses VERY SHORT (1-2 sentences MAX)
- Use simple punctuation - just periods and question marks, no dashes
- Be conversational and kind

CRITICAL: Use text emoticons VERY rarely. Most messages should have none. When you do use them, only use :) :D or :/

YOUR GOAL - Discover their work preferences:
- How they recharge (social vs independent)
- Time preferences (morning person, flexible schedule needs)
- Stress handling (collaborative vs independent problem-solving)
- What energizes them (creating, helping, solving, innovating)
- Team dynamics (collaborative vs independent)
- Work environment (office, remote, hybrid)
- What frustrates them at work

APPROACH:
- Share brief relatable thoughts: "I find back to back meetings exhausting. How do you feel about lots of scheduled time vs open blocks?"
- Be genuinely curious: "Interesting! Are you more of a morning person or do you prefer flexible hours?"
- React naturally and briefly: "That makes sense!" "I can see that" "Got it"

Remember: Be helpful and friendly, but keep it brief and simple. Text like you would to a friend, not an interview.`
      },
      ...conversationHistory.map((msg: any) => ({
        role: msg.role === 'otto' ? 'assistant' : 'user',
        content: msg.text
      })),
      {
        role: 'user',
        content: message
      }
    ];

    // Call OpenAI Chat API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 100,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      
      // If quota exceeded, return demo response
      if (error.error?.code === 'insufficient_quota') {
        return NextResponse.json({ 
          response: "That's interesting! Tell me more about what you're looking for :)"
        }, { status: 200 });
      }
      
      return NextResponse.json({ 
        error: 'Chat failed',
        details: error 
      }, { status: response.status });
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || "Tell me more!";
    
    return NextResponse.json({ response: aiResponse });

  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      response: 'Hmm, something went wrong. What were you saying? :/'
    }, { status: 200 });
  }
}
