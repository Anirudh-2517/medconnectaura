'use client';

import React, { useState } from 'react';
import { Loader } from '@/components/ui/Loader';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { FileUploader } from '@/components/FileUploader';
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui/Card';
import { extractTextFromImage } from '@/lib/ocr';
import axios from 'axios';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrText, setOcrText] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [extractedMedicines, setExtractedMedicines] = useState<any[]>([]);

  const handleFileSelected = async (selectedFile: File) => {
    setFile(selectedFile);
    setError(null);
    setSuccess(null);
    setOcrText('');
    setExtractedMedicines([]);

    // Start OCR extraction
    setIsProcessing(true);
    try {
      const text = await extractTextFromImage(selectedFile);
      setOcrText(text);

      // Process with AI
      const response = await axios.post('/api/ocr/process', {
        ocrText: text,
        prescriptionId: 'temp-prescription-id', // This will be replaced with actual ID
      });

      if (response.data.medications) {
        setExtractedMedicines(response.data.medications);
        setSuccess('Prescription processed successfully!');
      }

      if (response.data.interactions?.interactions?.length > 0) {
        setError(`Drug interactions detected: ${response.data.interactions.interactions.join(', ')}`);
      }
    } catch (err) {
      console.error('Processing error:', err);
      setError(err instanceof Error ? err.message : 'Failed to process prescription');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Upload Prescription</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Upload your prescription image or PDF. We'll extract the medicines automatically.
        </p>
      </div>

      {/* Alerts */}
      {error && <Alert variant="error">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900 dark:text-white">Upload Prescription File</h3>
        </CardHeader>
        <CardBody>
          <FileUploader onFileSelected={handleFileSelected} disabled={isProcessing} />
        </CardBody>
      </Card>

      {/* Processing Status */}
      {isProcessing && (
        <Card className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-900">
          <CardBody className="flex items-center gap-4">
            <Loader size="md" />
            <div>
              <p className="font-semibold text-blue-900 dark:text-blue-100">Processing prescription...</p>
              <p className="text-sm text-blue-700 dark:text-blue-200">
                Extracting medicines using OCR and AI
              </p>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Extracted Text */}
      {ocrText && !isProcessing && (
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-gray-900 dark:text-white">Extracted Text</h3>
          </CardHeader>
          <CardBody>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-h-40 overflow-y-auto text-sm text-gray-700 dark:text-gray-300">
              {ocrText}
            </div>
          </CardBody>
        </Card>
      )}

      {/* Extracted Medicines */}
      {extractedMedicines.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-gray-900 dark:text-white">Detected Medicines</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {extractedMedicines.map((med, idx) => (
                <div key={idx} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{med.name}</h4>
                    <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded">
                      {med.frequency}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Dosage: {med.dosage}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Duration: {med.duration} days</p>
                  {med.timings && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Timings: {Array.isArray(med.timings) ? med.timings.join(', ') : med.timings}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardBody>
          <CardFooter className="flex gap-2">
            <Button variant="primary" className="flex-1">
              Save Medicines
            </Button>
            <Button variant="secondary" className="flex-1">
              Edit & Save
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Empty State */}
      {!file && !isProcessing && (
        <Card className="text-center py-8">
          <CardBody>
            <p className="text-gray-500 dark:text-gray-400">
              Upload a prescription image or PDF to get started.
            </p>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
