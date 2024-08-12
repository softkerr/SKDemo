import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request: messages array is required' },
        { status: 400 }
      );
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { 
          error: 'Groq API key is not configured. Please add GROQ_API_KEY to your .env.local file.',
          needsApiKey: true
        },
        { status: 500 }
      );
    }

    // Call Groq API - using Llama 3.3 70B (latest and best!)
    const completion = await groq.chat.completions.create({
      messages: messages,
      model: 'llama-3.3-70b-versatile', // Latest model, fast and smart!
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    const assistantMessage = completion.choices[0]?.message;

    if (!assistantMessage) {
      return NextResponse.json(
        { error: 'No response from Groq AI' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: assistantMessage,
      usage: completion.usage,
    });
  } catch (error: any) {
    console.error('Groq API Error:', error);
    
    // Handle specific Groq errors
    if (error.status === 401) {
      return NextResponse.json(
        { 
          error: 'Invalid Groq API key. Please check your GROQ_API_KEY in .env.local',
          needsApiKey: true
        },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { 
        error: error.message || 'Failed to process chat request',
        details: error.response?.data || null
      },
      { status: error.status || 500 }
    );
  }
}
