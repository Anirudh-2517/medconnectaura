import { NextRequest, NextResponse } from 'next/server';
import { uploadPrescriptionFile } from '@/lib/storage';
import { extractTextFromImage, cleanOCRText } from '@/lib/ocr';
import { supabase } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const userId = formData.get('userId') as string;

    if (!file || !userId) {
      return NextResponse.json(
        { error: 'File and userId are required' },
        { status: 400 }
      );
    }

    // Upload file to storage
    const fileUrl = await uploadPrescriptionFile(file, userId);

    // Extract text from image/PDF
    let ocrText = '';
    try {
      ocrText = await extractTextFromImage(file);
      ocrText = cleanOCRText(ocrText);
    } catch (ocrError) {
      console.error('OCR Error:', ocrError);
      // Continue without OCR text
    }

    // Save prescription record to database
    const { data, error } = await supabase.from('prescriptions').insert({
      user_id: userId,
      file_url: fileUrl,
      ocr_text: ocrText,
      created_at: new Date().toISOString(),
    }).select().single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      prescription: data,
      fileUrl,
      ocrText,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    );
  }
}
