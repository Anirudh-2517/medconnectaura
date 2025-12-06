/* eslint-disable @typescript-eslint/no-explicit-any */
import OpenAI from 'openai';

// Prefer a Gemini key if provided; fall back to the existing OpenAI key.
const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error(
    'The AI API key is missing. Set `GEMINI_API_KEY` or `OPENAI_API_KEY` in your environment.'
  );
}

const openai = new OpenAI({ apiKey });

export async function extractMedicationData(ocrText: string) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a medical prescription parser. Extract medication information from prescription text and return a JSON object with the following structure:\n{ "medicines": [ { "name": "...", "dosage": "...", "frequency": "...", "timings": ["HH:MM"], "duration": number, "instructions": "..." } ] }`,
        },
        {
          role: 'user',
          content: `Please extract medication details from this prescription text:\n\n${ocrText}`,
        },
      ],
      temperature: 0.3,
    });

    const content = response?.choices?.[0]?.message?.content;
    if (!content) throw new Error('No response content from OpenAI');

    // Try parse JSON safely
    try {
      return JSON.parse(content);
    } catch (parseErr) {
      const jsonMatch = String(content).match(/\{[\s\S]*\}/);
      if (jsonMatch) return JSON.parse(jsonMatch[0]);
      throw new Error('Failed to parse medication data: ' + String(parseErr));
    }
  } catch (err) {
    console.error('OpenAI extractMedicationData error:', err);
    throw err;
  }
}

export async function generateMedicationSchedule(medicineData: any) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a medication schedule assistant. Return a JSON object with daily reminders and simple health tips.' },
        { role: 'user', content: `Create a medication schedule for:\n${JSON.stringify(medicineData, null, 2)}` },
      ],
      temperature: 0.5,
    });

    return response?.choices?.[0]?.message?.content || '';
  } catch (err) {
    console.error('OpenAI generateMedicationSchedule error:', err);
    throw err;
  }
}

export async function detectDrugInteractions(medicines: string[]) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a clinical pharmacist. Check for drug interactions and provide warnings. Return a JSON object.' },
        { role: 'user', content: `Check for interactions between these medicines: ${medicines.join(', ')}` },
      ],
      temperature: 0.3,
    });

    const content = response?.choices?.[0]?.message?.content;
    if (!content) return { interactions: [], warnings: ['No content returned'] };

    try {
      return JSON.parse(content);
    } catch (parseErr) {
      return { interactions: [], warnings: [String(content)] };
    }
  } catch (err) {
    console.error('OpenAI detectDrugInteractions error:', err);
    return { interactions: [], warnings: ['Interaction check failed'] };
  }
}

export async function healthAssistantChat(userMessage: string, context: string = '') {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: `You are a helpful health assistant chatbot. Always remind users to consult with their doctor. ${context}` },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.7,
    });

    return response?.choices?.[0]?.message?.content || '';
  } catch (err) {
    console.error('OpenAI healthAssistantChat error:', err);
    throw err;
  }
}
