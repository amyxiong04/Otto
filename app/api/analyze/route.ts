import { NextRequest, NextResponse } from 'next/server';
import { buildAnimalResult, type Strengths } from '@/lib/workplaceAnimals';
import { sendResultsEmail } from '@/lib/resultsEmail';

type ConversationMessage = {
  role: 'otto' | 'user';
  text: string;
};

type ProfileContext = {
  role?: string;
  experience?: string;
};

type ModelAnalysis = {
  personalSummary: string;
  professionalStrengths: Strengths;
  evidence: string[];
};

const analysisSchema = {
  name: 'work_style_analysis',
  strict: true,
  schema: {
    type: 'object',
    additionalProperties: false,
    properties: {
      personalSummary: {
        type: 'string',
        description: 'One natural sentence, under 30 words, grounded in the user messages.',
      },
      professionalStrengths: {
        type: 'object',
        additionalProperties: false,
        properties: {
          focused: { type: 'integer', minimum: 1, maximum: 5 },
          independent: { type: 'integer', minimum: 1, maximum: 5 },
          social: { type: 'integer', minimum: 1, maximum: 5 },
          structured: { type: 'integer', minimum: 1, maximum: 5 },
          analytical: { type: 'integer', minimum: 1, maximum: 5 },
          creative: { type: 'integer', minimum: 1, maximum: 5 },
          collaborative: { type: 'integer', minimum: 1, maximum: 5 },
        },
        required: ['focused', 'independent', 'social', 'structured', 'analytical', 'creative', 'collaborative'],
      },
      evidence: {
        type: 'array',
        minItems: 2,
        maxItems: 5,
        items: { type: 'string' },
        description: 'Short observations tied directly to things the user said.',
      },
    },
    required: ['personalSummary', 'professionalStrengths', 'evidence'],
  },
};

export async function POST(request: NextRequest) {
  try {
    const { conversationHistory, profileContext = {}, email } = await request.json() as {
      conversationHistory?: ConversationMessage[];
      profileContext?: ProfileContext;
      email?: string;
    };

    if (!conversationHistory || conversationHistory.length === 0) {
      return NextResponse.json({ error: 'No conversation history provided' }, { status: 400 });
    }

    const userMessages = conversationHistory.filter((message) => message.role === 'user');
    if (userMessages.length < 4) {
      return NextResponse.json({ error: 'There is not enough conversation to create a reliable result.' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Analysis is not configured.' }, { status: 503 });
    }

    const conversationText = conversationHistory
      .map((message) => `${message.role === 'otto' ? 'Assistant' : 'User'}: ${message.text}`)
      .join('\n');
    const contextText = [
      profileContext.role ? `Role area: ${profileContext.role}` : '',
      profileContext.experience ? `Experience: ${profileContext.experience}` : '',
    ].filter(Boolean).join('\n');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You analyze work preferences using only evidence from the user's own messages.

Scoring rules:
- A 1 means the user clearly prefers the opposite end of the trait. A 5 means they clearly and repeatedly prefer this trait.
- Use 3 when the conversation does not provide enough evidence. Do not guess from job title, age, or experience.
- Treat mixed answers as mixed. Do not force extreme scores to make the profile more interesting.
- Base the summary on specific preferences the user expressed. Use everyday language and no hype, hashtags, therapy language, or personality-test jargon.
- Never use statements made by the assistant as evidence about the user.`,
          },
          {
            role: 'user',
            content: `${contextText ? `Background supplied by the user:\n${contextText}\n\n` : ''}Conversation:\n${conversationText}`,
          },
        ],
        temperature: 0.2,
        max_tokens: 500,
        response_format: {
          type: 'json_schema',
          json_schema: analysisSchema,
        },
      }),
    });

    if (!response.ok) {
      console.error('OpenAI analysis failed:', response.status, await response.text());
      return NextResponse.json({ error: 'We could not analyze this conversation right now.' }, { status: 502 });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      return NextResponse.json({ error: 'The analysis came back empty.' }, { status: 502 });
    }

    const analysis = JSON.parse(content) as ModelAnalysis;
    const results = buildAnimalResult(analysis.professionalStrengths, analysis.personalSummary);
    const cleanEmail = email?.trim().toLowerCase();
    const emailDelivery = cleanEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
      ? await sendResultsEmail(cleanEmail, results)
      : 'not_requested';

    return NextResponse.json({ ...results, emailDelivery });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json({ error: 'We could not finish the analysis.' }, { status: 500 });
  }
}
