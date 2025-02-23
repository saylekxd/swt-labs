import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request) {
  const { formData, projectType, complexity, timeline } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        { 
          role: "system", 
          content: "You are a professional project estimation assistant. Analyze the project details and provide accurate pricing." 
        },
        { role: "user", content: createPrompt(formData, projectType, complexity, timeline) }
      ],
      temperature: 0.3,
      max_tokens: 200
    });
    
    return NextResponse.json(JSON.parse(completion.choices[0].message.content || '{}'));
  } catch (error) {
    return NextResponse.json(
      { error: "Estimation failed" },
      { status: 500 }
    );
  }
}

// Helper function to keep prompt template hidden
function createPrompt(formData: any, projectType: string, complexity: number, timeline: string) {
  return `Act as an expert project estimator. Consider these factors:
  - Project Name: ${formData.projectName}
  - Type: ${projectType}
  - Features: ${formData.selectedFeatures.join(', ')}
  - Description: ${formData.description}
  - Complexity: ${complexity}/100
  - Timeline: ${timeline}
  
  Generate price range in USD and confidence score (1-100). Format response as JSON: { "priceRange": "x-y", "confidence": number, "reasoning": "short_pl" }`;
} 