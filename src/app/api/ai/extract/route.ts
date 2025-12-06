import { NextRequest, NextResponse } from 'next/server';
import { extractMedicationData } from '@/lib/ai';

export async function POST(req: NextRequest) {
  try {
    const { ocrText } = await req.json();

    if (!ocrText) {
      return NextResponse.json(
        { error: 'ocrText is required' },
        { status: 400 }
      );
    }

    const extracted = await extractMedicationData(ocrText);

    return NextResponse.json({
      success: true,
      data: extracted,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Extraction failed' },
      { status: 500 }
    );
  }
}
