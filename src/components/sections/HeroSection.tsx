'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/i18n/LanguageContext';
import type { NewHireConfig } from '@/types';

interface HeroSectionProps {
  config: NewHireConfig;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
  daysPast: number;
}

function getTimeLeft(startDateStr: string): TimeLeft {
  const start = new Date(startDateStr).getTime();
  const now = Date.now();
  const diff = start - now;

  if (diff <= 0) {
    const daysPast = Math.floor(Math.abs(diff) / (1000 * 60 * 60 * 24));
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true, daysPast };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    isPast: false,
    daysPast: 0,
  };
}

function CountdownBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-4xl sm:text-5xl font-bold text-white tabular-nums leading-none">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-xs sm:text-sm text-white/70 mt-1 uppercase tracking-wider">{label}</span>
    </div>
  );
}

export function HeroSection({ config }: HeroSectionProps) {
  const { t, language } = useLanguage();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(config.startDate));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(config.startDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [config.startDate]);

  const startDate = new Date(config.startDate);
  const formattedDate = startDate.toLocaleDateString(language === 'cs' ? 'cs-CZ' : 'en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const scrollDown = () => {
    document.getElementById('profile')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background */}
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
        {/* Subtle orange gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-expando-orange/20 via-transparent to-transparent" />
      </div>

      {/* Fallback gradient (shown when photo not present) */}
      <div className="absolute inset-0 z-[-1] bg-gradient-to-br from-expando-gray-900 via-[#1a0a00] to-expando-gray-900" />

      <div className="relative z-10 section-container py-32 flex flex-col items-start">
        {/* Welcome */}
        <div className="animate-fade-in">
          <p className="text-expando-orange font-medium text-lg sm:text-xl tracking-wide mb-2">
            {t('hero.welcome')}
          </p>
          <h1 className="text-5xl sm:text-7xl font-bold text-white leading-tight mb-6">
            {config.name}
          </h1>
          <p className="text-white/80 text-lg sm:text-xl max-w-xl leading-relaxed mb-10">
            {t('hero.tagline')}
          </p>
        </div>

        {/* Countdown / Journey indicator */}
        {mounted && (
          <div className="mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {timeLeft.isPast ? (
              <div className="bg-expando-orange/20 border border-expando-orange/40 rounded-2xl px-8 py-5">
                <p className="text-white/70 text-sm mb-1">{t('hero.startDateLabel')} {formattedDate}</p>
                <p className="text-white text-2xl font-bold">
                  {t('hero.dayOfJourney', { n: timeLeft.daysPast + 1 })}
                </p>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-8 py-5">
                <p className="text-white/70 text-sm mb-4">
                  {t('hero.startDateLabel')} <span className="text-white font-medium">{formattedDate}</span>
                </p>
                <div className="flex items-start gap-6 sm:gap-8">
                  <CountdownBlock value={timeLeft.days} label={language === 'cs' ? 'dní' : 'days'} />
                  <span className="text-white/50 text-3xl font-light mt-1">:</span>
                  <CountdownBlock value={timeLeft.hours} label={language === 'cs' ? 'hodin' : 'hours'} />
                  <span className="text-white/50 text-3xl font-light mt-1">:</span>
                  <CountdownBlock value={timeLeft.minutes} label={language === 'cs' ? 'minut' : 'min'} />
                  <span className="text-white/50 text-3xl font-light mt-1">:</span>
                  <CountdownBlock value={timeLeft.seconds} label={language === 'cs' ? 'sekund' : 'sec'} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* CTA */}
        <button
          onClick={scrollDown}
          className="btn-primary text-base animate-fade-in"
          style={{ animationDelay: '0.4s' }}
        >
          {t('hero.cta')}
          <ChevronDown size={18} />
        </button>
      </div>

      {/* Scroll hint */}
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
