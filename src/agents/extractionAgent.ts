import { extractMedicationData, detectDrugInteractions } from '@/lib/ai';

/**
 * Extraction Agent - Parses prescription text using LLM (OpenAI GPT-4)
 * Converts unstructured prescription data into structured medicine information
 */
export class ExtractionAgent {
  static async extractPrescription(ocrText: string) {
    try {
      const extractedData = await extractMedicationData(ocrText);

      if (!extractedData.medicines || !Array.isArray(extractedData.medicines)) {
        throw new Error('Failed to extract medicines from prescription');
      }

      // Validate and normalize extracted data
      const normalizedMedicines = extractedData.medicines.map((med: any) => ({
        name: med.name?.trim() || '',
        dosage: med.dosage?.trim() || '',
        frequency: med.frequency?.trim() || '1 time a day',
        timings: Array.isArray(med.timings) ? med.timings : ['09:00'],
        duration: parseInt(med.duration) || 7,
        instructions: med.instructions?.trim() || '',
      }));

      return {
        success: true,
        medicines: normalizedMedicines,
        extractedAt: new Date().toISOString(),
      };
    } catch (error) {
      throw new Error(`Extraction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static async checkInteractions(medicines: string[]) {
    try {
      const interactions = await detectDrugInteractions(medicines);
      return interactions;
    } catch (error) {
      console.error('Interaction check error:', error);
      return { interactions: [], warnings: [] };
    }
  }
}

export default ExtractionAgent;
