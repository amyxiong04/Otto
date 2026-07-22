import { NextRequest, NextResponse } from 'next/server';

type ConversationMessage = {
  role: 'otto' | 'user';
  text: string;
};

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [], profileContext = {} } = await request.json() as {
      message?: string;
      conversationHistory?: ConversationMessage[];
      profileContext?: { role?: string; experience?: string };
    };

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
        content: `You are having a short, friendly conversation to understand how someone likes to work.

YOUR STYLE:
- Use plain, everyday language
- Ask ONE focused question at a time
- Keep responses VERY SHORT (1-2 sentences MAX)
- Acknowledge their answer briefly when it adds something useful
- Do not use emoticons, emoji, or smiley faces
- Do not use phrases like "That makes sense", "I can see that", or "That's interesting" by default

YOUR GOAL - Discover their work preferences:
- How they recharge (social vs independent)
- Time preferences (morning person, flexible schedule needs)
- Stress handling (collaborative vs independent problem-solving)
- What energizes them (creating, helping, solving, innovating)
- Team dynamics (collaborative vs independent)
- Work environment (office, remote, hybrid)
- What frustrates them at work
- What they want more of in their next role
- What they want less of in their next role
- How they prefer feedback, management, and growth

APPROACH:
- Ask concrete questions that are easy to answer
- Follow up on details instead of running through a generic checklist
- Do not imply that a match or final result is ready. The app decides when results are available.
- If the user gives a short answer, ask a useful follow-up instead of moving on too quickly.

Background the user selected: role area ${profileContext.role || 'not provided'}, experience ${profileContext.experience || 'not provided'}.

Keep it brief and simple. It should feel like a normal conversation, not an interview or personality test.`
      },
      ...conversationHistory.map((msg) => ({
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
          response: "That's interesting. Tell me more about what you're looking for."
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
      response: 'Hmm, something went wrong. What were you saying?'
    }, { status: 200 });
  }
}
