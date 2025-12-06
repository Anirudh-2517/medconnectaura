import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function extractMedicationData(ocrText: string) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content: `You are a medical prescription parser. Extract medication information from prescription text and return a JSON array with the following structure:
        {
          "medicines": [
            {
              "name": "Medicine name",
              "dosage": "Dosage amount",
              "frequency": "Number of times per day",
              "timings": ["08:00", "14:00", "20:00"],
              "duration": "Number of days",
              "instructions": "Additional instructions"
            }
          ]
        }`,
      },
      {
        role: 'user',
        content: `Please extract medication details from this prescription text:\n\n${ocrText}`,
      },
    ],
    temperature: 0.3,
  });

  const content = response.choices[0].message.content;
  if (!content) throw new Error('No response from OpenAI');

  try {
    return JSON.parse(content);
  } catch {
    // If JSON parsing fails, try to extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Failed to parse medication data');
  }
}

export async function generateMedicationSchedule(medicineData: any) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content: `You are a medication schedule assistant. Create a detailed medication schedule with reminders.
        Return a JSON object with daily reminders and health tips.`,
      },
      {
        role: 'user',
        content: `Create a medication schedule for:\n${JSON.stringify(medicineData, null, 2)}`,
      },
    ],
    temperature: 0.5,
  });

  const content = response.choices[0].message.content;
  if (!content) throw new Error('No response from OpenAI');

  return content;
}

export async function detectDrugInteractions(medicines: string[]) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content: `You are a clinical pharmacist. Check for drug interactions and provide warnings.
        Return a JSON object with any identified interactions and recommendations.`,
      },
      {
        role: 'user',
        content: `Check for interactions between these medicines: ${medicines.join(', ')}`,
      },
    ],
    temperature: 0.3,
  });

  const content = response.choices[0].message.content;
  if (!content) throw new Error('No response from OpenAI');

  try {
    return JSON.parse(content);
  } catch {
    return { interactions: [], warnings: [content] };
  }
}

export async function healthAssistantChat(userMessage: string, context: string = '') {
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content: `You are a helpful health assistant chatbot. Provide general health information and medication guidance.
        Always remind users to consult with their doctor for specific medical advice. ${context}`,
      },
      {
        role: 'user',
        content: userMessage,
      },
    ],
    temperature: 0.7,
  });

  return response.choices[0].message.content || '';
}
