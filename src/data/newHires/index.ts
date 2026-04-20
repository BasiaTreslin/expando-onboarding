import type { NewHireConfig } from '@/types';
import { config as barbaraTreslinova } from './barbara-treslinova';

const allNewHires: NewHireConfig[] = [barbaraTreslinova];

export function getNewHireBySlug(slug: string): NewHireConfig | null {
  return allNewHires.find((h) => h.slug === slug) ?? null;
}

export function getAllSlugs(): string[] {
  return allNewHires.map((h) => h.slug);
}
