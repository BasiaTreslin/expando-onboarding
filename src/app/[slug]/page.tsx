import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getNewHireBySlug, getAllSlugs } from '@/data/newHires';
import { OnboardingPage } from '@/components/OnboardingPage';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const config = getNewHireBySlug(slug);
  if (!config) return { title: 'EXPANDO Onboarding' };
  return {
    title: `Welcome, ${config.name} — EXPANDO Onboarding`,
    description: `Your personalised onboarding guide for the first 90 days at EXPANDO, ${config.name}.`,
    robots: { index: false, follow: false },
  };
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  const config = getNewHireBySlug(slug);
  if (!config) notFound();
  return <OnboardingPage config={config} />;
}
