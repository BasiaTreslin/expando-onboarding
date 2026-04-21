'use client';

import { useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/i18n/LanguageContext';
import type { NewHireConfig } from '@/types';

interface HeroSectionProps {
  config: NewHireConfig;
}

function computeDaysUntil(startDateStr: string): { days: number; past: boolean; dayNumber: number } {
  const start = new Date(startDateStr);
  start.setHours(0, 0, 0, 0);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diffMs = start.getTime() - now.getTime();
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  if (days <= 0) {
    return { days: 0, past: true, dayNumber: Math.abs(days) + 1 };
  }
  return { days, past: false, dayNumber: 0 };
}

export function HeroSection({ config }: HeroSectionProps) {
  const { t } = useLanguage();

  const { days, past, dayNumber } = useMemo(() => computeDaysUntil(config.startDate), [config.startDate]);

  const headline = past
    ? t('hero.alreadyStarted', { day: dayNumber })
    : days === 0
      ? t('hero.startsToday')
      : days === 1
        ? t('hero.startsTomorrow')
        : t('hero.startsInDays', { days });

  const scrollDown = () => {
    document.getElementById('dna')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background photo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/photos/team-laptop2.jpg"
          alt="EXPANDO tým"
          fill
          className="object-cover object-center"
          priority
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-expando-gray-900/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-expando-gray-900/60 via-transparent to-transparent" />
      </div>

      {/* Fallback gradient */}
      <div className="absolute inset-0 z-[-1] bg-gradient-to-br from-expando-gray-900 via-[#1a0a00] to-expando-gray-900" />

      <div className="relative z-10 section-container py-32 sm:py-40 w-full">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-5xl sm:text-7xl font-bold text-white leading-[1.05] mb-6">
            {t('hero.greeting', { name: config.firstName })}
            <br />
            <span className="text-expando-orange">{headline}</span>
          </h1>

          <p className="text-xl sm:text-2xl text-white/90 font-medium mb-4 leading-snug">
            {t('hero.subtitle')}
          </p>

          <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-10 max-w-xl">
            {t('hero.microcopy', { role: config.role, team: config.team })}
          </p>

          <button
            onClick={scrollDown}
            className="inline-flex items-center gap-2 text-expando-orange font-semibold text-lg
                       hover:text-white transition-colors group"
          >
            {t('hero.cta')}
            <ChevronDown
              size={20}
              className="transition-transform duration-300 group-hover:translate-y-1 animate-bounce"
            />
          </button>
        </div>
      </div>

      {/* Scroll hint at bottom */}
      <button
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/40 hover:text-white transition-colors"
        aria-label={t('hero.scrollHint')}
      >
        <ChevronDown size={24} className="animate-bounce" />
      </button>
    </section>
  );
}
