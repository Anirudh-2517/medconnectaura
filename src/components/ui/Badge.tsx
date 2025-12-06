'use client';

import React from 'react';
import { cn } from '@/lib/helpers';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  size?: 'sm' | 'md';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variantStyles: Record<string, string> = {
      primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
      success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    };

    const sizeStyles: Record<string, string> = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-1 text-sm',
    };

    return (
      <span
        ref={ref}
        className={cn('inline-flex items-center rounded-full font-medium', variantStyles[variant], sizeStyles[size], className)}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';
