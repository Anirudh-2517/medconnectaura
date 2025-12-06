'use client';

import React from 'react';
import { cn } from '@/lib/helpers';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', title, children, ...props }, ref) => {
    const variantStyles: Record<string, string> = {
      success: 'border-l-4 border-green-500 bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-200',
      error: 'border-l-4 border-red-500 bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-200',
      warning: 'border-l-4 border-yellow-500 bg-yellow-50 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      info: 'border-l-4 border-blue-500 bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    };

    return (
      <div ref={ref} className={cn('rounded p-4', variantStyles[variant], className)} {...props}>
        {title && <p className="font-semibold">{title}</p>}
        <div>{children}</div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';
