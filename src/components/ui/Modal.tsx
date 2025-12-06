'use client';

import React from 'react';
import { cn } from '@/lib/helpers';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ open, onClose, title, children, size = 'md' }, ref) => {
    if (!open) return null;

    const sizeStyles: Record<string, string> = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div ref={ref} className={cn('rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900', sizeStyles[size])}>
          {title && <h2 className="mb-4 text-lg font-bold">{title}</h2>}
          {children}
          <div className="mt-6 flex justify-end gap-2">
            <button
              onClick={onClose}
              className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';
