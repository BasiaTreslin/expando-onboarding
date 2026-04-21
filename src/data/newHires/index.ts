import type { NewHireConfig } from '@/types';
import { config as barbaraTreslinova } from './barbara-treslinova';

const allNewHires: NewHireConfig[] = [barbaraTreslinova];

export function getNewHireBySlug(slug: string): NewHireConfig | null {
  return allNewHires.find((h) => h.slug === slug) ?? null;
}

export function getAllSlugs(): string[] {
  return allNewHires.map((h) => h.slug);
}

export function findByCredentials(username: string, password: string): NewHireConfig | null {
  const normalized = username.trim().toLowerCase();
  return (
    allNewHires.find(
      (h) =>
        h.credentials.username.toLowerCase() === normalized &&
        h.credentials.password === password
    ) ?? null
  );
}
