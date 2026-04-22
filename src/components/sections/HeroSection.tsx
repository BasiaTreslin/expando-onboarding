'use client';

import { useEffect, useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/i18n/LanguageContext';
import {
  getJourneyState,
  getStateForDays,
  type JourneyInfo,
} from '@/lib/journey';
import { heroCopy, renderSubtext } from '@/content/heroCopy';
import type { NewHireConfig } from '@/types';

interface HeroSectionProps {
  config: NewHireConfig;
}

function parsePreviewDay(raw: string | null): number | null {
  if (raw === null) return null;
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') return null;
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n)) return null;
  return n;
}

function applyPreviewOverride(base: JourneyInfo, previewDay: number | null): JourneyInfo {
  if (previewDay === null) return base;
  return {
    state: getStateForDays(previewDay),
    daysSinceStart: previewDay,
    daysUntilStart: -previewDay,
    isFallback: base.isFallback,
  };
}

export function HeroSection({ config }: HeroSectionProps) {
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [previewDay, setPreviewDay] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    const raw = new URLSearchParams(window.location.search).get('previewDay');
    setPreviewDay(parsePreviewDay(raw));
  }, []);

  const info = useMemo<JourneyInfo>(
    () => applyPreviewOverride(getJourneyState(config.startDate), previewDay),
    [config.startDate, previewDay],
  );

  useEffect(() => {
    if (info.isFallback && mounted) {
      console.warn(
        `[HeroSection] Missing or invalid startDate for "${config.slug}"; falling back to week-1 state.`,
      );
    }
  }, [info.isFallback, mounted, config.slug]);

  const copy = heroCopy[info.state][language];
  const subtext = renderSubtext(copy.subtext, Math.abs(info.daysUntilStart));

  const startDateObj = config.startDate ? new Date(config.startDate) : null;
  const formattedDate =
    !startDateObj || info.isFallback || Number.isNaN(startDateObj.getTime())
      ? ''
      : startDateObj.toLocaleDateString(language === 'cs' ? 'cs-CZ' : 'en-GB', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

  const isPreStart = info.state.startsWith('pre-start');
  const dayNumber = info.daysSinceStart + 1;

  let counterPrimary: string;
  if (info.state === 'pre-start-tomorrow') {
    counterPrimary = t('hero.startsTomorrow');
  } else if (isPreStart) {
    counterPrimary = t('hero.startingInDays', { n: info.daysUntilStart });
  } else if (info.state === 'graduated') {
    counterPrimary = t('hero.dayOnboardingComplete', { n: dayNumber });
  } else {
    counterPrimary = t('hero.dayOfJourney', { n: dayNumber });
  }

  const scrollDown = () => {
    document.getElementById('profile')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/photos/team-laptop2.jpg"
          alt="EXPANDO team"
          fill
          className="object-cover object-center"
          priority
          fetchPriority="high"
          onError={() => {}}
        />
        <div className="absolute inset-0 bg-expando-gray-900/75" />
        <div className="absolute inset-0 bg-gradient-to-br from-expando-orange/20 via-transparent to-transparent" />
      </div>

      <div className="absolute inset-0 z-[-1] bg-gradient-to-br from-expando-gray-900 via-[#1a0a00] to-expando-gray-900" />

      <div className="relative z-10 section-container py-32 flex flex-col items-start">
        <div className="animate-fade-in">
          <p className="text-expando-orange font-medium text-lg sm:text-xl tracking-wide mb-2">
            {mounted ? copy.kicker : '\u00A0'}
          </p>
          <h1 className="text-5xl sm:text-7xl font-bold text-white leading-tight mb-6">
            {config.name}
          </h1>
          <p className="text-white/80 text-lg sm:text-xl max-w-xl leading-relaxed mb-10">
            {mounted ? subtext : '\u00A0'}
          </p>
        </div>

        {mounted && (
          <div className="mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div
              className={
                isPreStart
                  ? 'bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-8 py-5'
                  : 'bg-expando-orange/20 border border-expando-orange/40 rounded-2xl px-8 py-5'
              }
            >
              {formattedDate && (
                <p className="text-white/70 text-sm mb-1">
                  {t('hero.startDateLabel')}{' '}
                  <span className="text-white font-medium">{formattedDate}</span>
                </p>
              )}
              <p className="text-white text-2xl font-bold">{counterPrimary}</p>
            </div>
          </div>
        )}

        <button
          onClick={scrollDown}
          className="btn-primary text-base animate-fade-in"
          style={{ animationDelay: '0.4s' }}
        >
          {t('hero.cta')}
          <ChevronDown size={18} />
        </button>
      </div>

      <button
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2
                   text-white/50 hover:text-white transition-colors animate-bounce"
        aria-label={t('hero.scrollHint')}
      >
        <ChevronDown size={24} />
      </button>
    </section>
  );
}
