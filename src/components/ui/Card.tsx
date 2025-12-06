'use client';

import React from 'react';
import { cn } from '@/lib/helpers';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900',
      className
    )}
    {...props}
  />
));

Card.displayName = 'Card';

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('px-6 py-4 border-b border-gray-200 dark:border-gray-700', className)} {...props} />
));

CardHeader.displayName = 'CardHeader';

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('px-6 py-4', className)} {...props} />
));

CardBody.displayName = 'CardBody';

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('px-6 py-4 border-t border-gray-200 dark:border-gray-700', className)} {...props} />
));

CardFooter.displayName = 'CardFooter';
