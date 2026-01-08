import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone?.replace(/\D/g, '') ?? '';
  if (cleaned?.length === 10) {
    return `(${cleaned?.slice(0, 3)}) ${cleaned?.slice(3, 6)}-${cleaned?.slice(6)}`;
  }
  return phone ?? '';
}

export function slugify(text: string): string {
  if (!text) return '';
  
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}
