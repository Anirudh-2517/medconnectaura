/* eslint-disable @typescript-eslint/no-explicit-any */
import Tesseract from 'tesseract.js';

export async function extractTextFromImage(imageFile: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const imageData = event.target?.result as string;

        const result = await Tesseract.recognize(imageData, 'eng', {
          logger: (m: any) => {
            // Keep logging light and only when useful
            if (m && m.status) console.debug('OCR:', m.status, m.progress ?? '');
          },
        });

        resolve(result.data?.text || '');
      } catch (error) {
        console.error('OCR extraction error:', error);
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(imageFile);
  });
}

export async function extractTextFromPDF(pdfFile: File): Promise<string> {
  // For PDF extraction, we'll use a server-side approach with pdfjs
  // This is a placeholder for client-side PDF extraction
  try {
    const text = await extractTextFromImage(pdfFile);
    return text;
  } catch (error) {
    throw new Error('PDF extraction requires server-side processing or a dedicated PDF parser; ' + String(error));
  }
}

export function cleanOCRText(text: string): string {
  // Remove extra whitespace
  let cleaned = text.replace(/\s+/g, ' ');
  // Replace pipes with lowercase L which is a common mis-recognition
  cleaned = cleaned.replace(/\|/g, 'l');

  // Avoid aggressive global replacement between letters/numbers: only normalize common ligatures
  // Replace multiple spaces and trim
  cleaned = cleaned.trim();

  return cleaned;
}
