import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { conversationHistory } = await request.json();

    if (!conversationHistory || conversationHistory.length === 0) {
      return NextResponse.json({ error: 'No conversation history provided' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      // Return demo results if no API key
      return NextResponse.json(getDemoResults(), { status: 200 });
    }

    // Build the conversation for context
    const conversationText = conversationHistory
      .map((msg: any) => `${msg.role === 'otto' ? 'Otto' : 'User'}: ${msg.text}`)
      .join('\n');

    const analysisPrompt = `Based on this conversation between Otto (the job helper) and a user, analyze the user's work personality and preferences. 

Conversation:
${conversationText}

Provide a JSON response with the following structure:
{
  "personalityType": "A fun work-related category (e.g., 'Coffee Hustler', 'Meeting Maven', 'Solo Slayer', 'Team Player', 'Creative Chaos', 'Structure Seeker')",
  "hashtags": ["#Tag1", "#Tag2"] (2 hashtags that describe them),
  "workPersona": "A warm, friendly 2-sentence description of their work style",
  "professionalStrengths": {
    "focused": 1-5 (ability to concentrate deeply),
    "independent": 1-5 (prefers working alone),
    "social": 1-5 (energized by people),
    "structured": 1-5 (likes clear processes),
    "analytical": 1-5 (data-driven thinker),
    "creative": 1-5 (innovative and exploratory),
    "collaborative": 1-5 (team-oriented)
  },
  "workBesties": ["Type 1", "Type 2"] (2 personality types they'd work great with),
  "colleagues": ["Type 1", "Type 2"] (2 types they'd have more professional relationships with)
}

Make it fun and personality-driven like the cake.me quiz results!`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert at analyzing work personalities and creating fun, insightful personality profiles. Always respond with valid JSON only.'
          },
          {
            role: 'user',
            content: analysisPrompt
          }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      
      if (error.error?.code === 'insufficient_quota') {
        return NextResponse.json(getDemoResults(), { status: 200 });
      }
      
      return NextResponse.json({ 
        error: 'Analysis failed',
        details: error 
      }, { status: response.status });
    }

    const data = await response.json();
    const analysisResult = JSON.parse(data.choices[0]?.message?.content || '{}');
    
    return NextResponse.json(analysisResult);

  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(getDemoResults(), { status: 200 });
  }
}

function getDemoResults() {
  return {
    personalityType: "Creative Collaborator",
    hashtags: ["#TeamPlayer", "#IdeaMachine"],
    workPersona: "You thrive in collaborative environments where ideas flow freely. You bring creative energy to projects while keeping the team vibe positive and productive.",
    professionalStrengths: {
      focused: 4,
      independent: 2,
      social: 5,
      structured: 3,
      analytical: 3,
      creative: 5,
      collaborative: 5
    },
    workBesties: ["Structure Seeker", "Solo Slayer"],
    colleagues: ["Coffee Hustler", "Meeting Maven"]
  };
}
