import Tesseract from 'tesseract.js';

export async function extractTextFromImage(imageFile: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const imageData = event.target?.result as string;

        const result = await Tesseract.recognize(imageData, 'eng', {
          logger: (m: any) => console.log('OCR Progress:', m),
        });

        resolve(result.data.text);
      } catch (error) {
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
    throw new Error('PDF extraction requires server-side processing');
  }
}

export function cleanOCRText(text: string): string {
  // Remove extra whitespace
  let cleaned = text.replace(/\s+/g, ' ');

  // Remove common OCR errors
  cleaned = cleaned.replace(/[|]/g, 'l');
  cleaned = cleaned.replace(/[0O]/g, '0');

  // Trim
  cleaned = cleaned.trim();

  return cleaned;
}
