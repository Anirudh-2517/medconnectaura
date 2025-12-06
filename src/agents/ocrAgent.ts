import Tesseract from 'tesseract.js';

/**
 * OCR Agent - Extracts text from prescription images using Tesseract.js
 */
export class OCRAgent {
  static async processImage(imageData: string): Promise<string> {
    try {
      const result = await Tesseract.recognize(imageData, 'eng', {
        logger: (m: any) => {
          if (m.status === 'recognizing') {
            console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`);
          }
        },
      });

      return result.data.text;
    } catch (error) {
      throw new Error(`OCR processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static preprocessText(text: string): string {
    // Remove extra whitespace
    let processed = text.replace(/\s+/g, ' ');

    // Fix common OCR errors
    processed = processed.replace(/[|]/g, 'l');
    processed = processed.replace(/[0O]/g, '0');

    // Trim
    processed = processed.trim();

    return processed;
  }
}

export default OCRAgent;
