import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MedConnect AI - Your Personal Medical Assistant',
  description: 'Manage prescriptions, medications, and find the best prices for medicines near you',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-gray-950`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
