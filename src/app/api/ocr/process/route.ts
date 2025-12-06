import { NextRequest, NextResponse } from 'next/server';
import { extractMedicationData, detectDrugInteractions } from '@/lib/ai';
import { supabase } from '@/lib/db';
import { parseFrequencyToTimes } from '@/lib/helpers';

export async function POST(req: NextRequest) {
  try {
    const { ocrText, prescriptionId } = await req.json();

    if (!ocrText) {
      return NextResponse.json(
        { error: 'OCR text is required' },
        { status: 400 }
      );
    }

    // Extract medication data using AI
    const extractedData = await extractMedicationData(ocrText);

    if (!extractedData.medicines || !Array.isArray(extractedData.medicines)) {
      return NextResponse.json(
        { error: 'Failed to parse medication data' },
        { status: 400 }
      );
    }

    // Check for drug interactions
    const medicineNames = extractedData.medicines.map((m: any) => m.name);
    let interactions: any = null;

    try {
      interactions = await detectDrugInteractions(medicineNames);
    } catch (interactionError) {
      console.error('Interaction check error:', interactionError);
    }

    // Save medications to database
    const medicationsToInsert = extractedData.medicines.map((medicine: any) => ({
      prescription_id: prescriptionId,
      name: medicine.name,
      dosage: medicine.dosage,
      frequency: medicine.frequency,
      timings: medicine.timings || parseFrequencyToTimes(medicine.frequency),
      duration: medicine.duration || 7,
      start_date: new Date().toISOString(),
      instructions: medicine.instructions || '',
    }));

    const { data: savedMeds, error: saveMedsError } = await supabase
      .from('medications')
      .insert(medicationsToInsert)
      .select();

    if (saveMedsError) throw saveMedsError;

    return NextResponse.json({
      success: true,
      medications: savedMeds,
      interactions,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Processing failed' },
      { status: 500 }
    );
  }
}
