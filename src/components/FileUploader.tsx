'use client';

import React, { useState } from 'react';
import { Upload, File, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/helpers';

interface FileUploaderProps {
  onFileSelected: (file: File) => void;
  accept?: string;
  disabled?: boolean;
}

export function FileUploader({ onFileSelected, accept = 'image/*,.pdf', disabled = false }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      onFileSelected(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      onFileSelected(file);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
  };

  return (
    <div className="w-full">
      {!selectedFile ? (
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={cn(
            'relative rounded-lg border-2 border-dashed p-8 transition-colors',
            isDragging
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
              : 'border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          <input
            type="file"
            accept={accept}
            onChange={handleFileInput}
            disabled={disabled}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              Drag and drop your prescription here
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              or click to select a file (JPG, PNG, PDF)
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <File className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedFile.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={handleClear}
              className="p-1 text-gray-400 hover:bg-gray-100 rounded dark:hover:bg-gray-700"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
