import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  return uuidv4();
}

export function formatDate(date: Date | string, format: string = 'MMM DD, YYYY'): string {
  return dayjs(date).format(format);
}

export function formatTime(time: string): string {
  return dayjs(`2024-01-01 ${time}`).format('hh:mm A');
}

export function getTodayDate(): string {
  return dayjs().format('YYYY-MM-DD');
}

export function addDays(date: Date | string, days: number): string {
  return dayjs(date).add(days, 'day').format('YYYY-MM-DD');
}

export function getTimeUntilReminder(time: string): string {
  const now = dayjs();
  const reminderTime = dayjs(`${getTodayDate()} ${time}`);

  if (reminderTime.isBefore(now)) {
    return 'Overdue';
  }

  const diff = reminderTime.diff(now, 'minute');
  if (diff < 60) {
    return `${diff} minutes`;
  }

  const hours = Math.floor(diff / 60);
  return `${hours} hours`;
}

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(price);
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function parseFrequencyToTimes(frequency: string): string[] {
  const frequencyMap: Record<string, string[]> = {
    'once': ['09:00'],
    'twice': ['09:00', '21:00'],
    'thrice': ['09:00', '13:00', '21:00'],
    '1 time a day': ['09:00'],
    '2 times a day': ['09:00', '21:00'],
    '3 times a day': ['09:00', '13:00', '21:00'],
    '4 times a day': ['09:00', '13:00', '17:00', '21:00'],
  };

  for (const [key, times] of Object.entries(frequencyMap)) {
    if (frequency.toLowerCase().includes(key)) {
      return times;
    }
  }

  return ['09:00'];
}

export function calculateAge(birthDate: Date | string): number {
  return dayjs().diff(dayjs(birthDate), 'year');
}
