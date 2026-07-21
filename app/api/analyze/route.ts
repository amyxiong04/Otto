import { NextRequest, NextResponse } from 'next/server';

type ConversationMessage = {
  role: 'otto' | 'user';
  text: string;
};

export async function POST(request: NextRequest) {
  try {
    const { conversationHistory } = await request.json() as {
      conversationHistory?: ConversationMessage[];
    };

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
      .map((msg) => `${msg.role === 'otto' ? 'Otto' : 'User'}: ${msg.text}`)
      .join('\n');

    const analysisPrompt = `Based on this conversation between Otto and a user, analyze the user's work personality and preferences.

Conversation:
${conversationText}

Choose the user's main workplace animal from this list. Use the animal name and descriptor exactly, then explain it in the workPersona:
- Bear - independent, protective, steady, likes room to focus
- Dolphin - social, collaborative, emotionally tuned in, energizes a team
- Owl - analytical, thoughtful, observant, likes depth before action
- Beaver - structured, reliable, process-minded, builds strong systems
- Fox - adaptable, strategic, quick, good at navigating ambiguity
- Bee - busy, helpful, team-oriented, keeps momentum going
- Cat - autonomous, selective, creative, works best with trust and flexibility
- Elephant - calm, dependable, big-picture, remembers context and supports others

Provide a JSON response with the following structure:
{
  "personalityType": "One workplace animal from the list, formatted like 'Bear - Independent Builder'",
  "hashtags": ["#Tag1", "#Tag2"] (2 useful tags that explain the type, not random hype words),
  "workPersona": "A warm, specific 2-sentence explanation of why this animal fits their work style",
  "professionalStrengths": {
    "focused": 1-5 (ability to concentrate deeply),
    "independent": 1-5 (prefers working alone),
    "social": 1-5 (energized by people),
    "structured": 1-5 (likes clear processes),
    "analytical": 1-5 (data-driven thinker),
    "creative": 1-5 (innovative and exploratory),
    "collaborative": 1-5 (team-oriented)
  },
  "workBesties": ["Animal - Descriptor", "Animal - Descriptor"] (2 workplace animal types from the list that would complement them well),
  "colleagues": ["Animal - Descriptor", "Animal - Descriptor"] (2 workplace animal types from the list that may work differently from them and require more communication)
}

Avoid vague labels like Hustler, Maven, Team Player, Creative Chaos, Solo Slayer, or Structure Seeker. Keep it playful, but make every label mean something.`;

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
    personalityType: "Dolphin - Collaborative Connector",
    hashtags: ["#PeopleEnergy", "#IdeaFlow"],
    workPersona: "You do your best work when ideas can move between people instead of staying stuck in one person's head. You bring warmth and momentum to a team, especially when the environment leaves room for creativity.",
    professionalStrengths: {
      focused: 4,
      independent: 2,
      social: 5,
      structured: 3,
      analytical: 3,
      creative: 5,
      collaborative: 5
    },
    workBesties: ["Beaver - Systems Builder", "Fox - Adaptive Strategist"],
    colleagues: ["Bear - Independent Builder", "Owl - Deep Thinker"]
  };
}
