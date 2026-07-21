import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('file') as File;

    if (!audioFile) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
    }

    // Check for API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ 
        error: 'OpenAI API key not configured',
        text: '(API not configured - this is a demo response)' 
      }, { status: 200 }); // Return 200 for demo purposes
    }

    // Call OpenAI Whisper API
    const whisperFormData = new FormData();
    whisperFormData.append('file', audioFile);
    whisperFormData.append('model', 'whisper-1');

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
      body: whisperFormData,
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Whisper API error:', error);
      
      // If quota exceeded, return demo response
      if (error.error?.code === 'insufficient_quota') {
        return NextResponse.json({ 
          text: 'This is a demo transcription because your API quota is exceeded. Please add credits to your OpenAI account at https://platform.openai.com/account/billing' 
        }, { status: 200 });
      }
      
      return NextResponse.json({ 
        error: 'Transcription failed',
        details: error 
      }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ text: data.text });

  } catch (error) {
    console.error('Transcription error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      text: '(Error processing audio - this is a demo response)' 
    }, { status: 200 }); // Return 200 for demo purposes
  }
}
