'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  MessageSquare, Megaphone, Instagram, Linkedin, Mail,
  Check, Copy, CheckCheck,
} from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { EasterEggModal } from '@/components/ui/EasterEggModal';
import { fireOrangeConfetti } from '@/lib/confetti';
import type { NewHireConfig } from '@/types';

const ICON_MAP: Record<string, React.ElementType> = {
  slack: MessageSquare,
  megaphone: Megaphone,
  instagram: Instagram,
};

interface CTAItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface CTAProps {
  config: NewHireConfig;
}

export function CTASection({ config }: CTAProps) {
  const { t, messages } = useLanguage();
  const items = messages.cta.items as CTAItem[];

  const storageKey = `cta-done-${config.slug}`;
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);
  const [celebrated, setCelebrated] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [copied, setCopied] = useState(false);
  const [emojiClicks, setEmojiClicks] = useState(0);
  const [easterOpen, setEasterOpen] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setDone(JSON.parse(raw));
      const cel = localStorage.getItem(`${storageKey}-celebrated`);
      if (cel === '1') setCelebrated(true);
    } catch {}
    setHydrated(true);
  }, [storageKey]);

  const persist = useCallback(
    (next: Record<string, boolean>) => {
      setDone(next);
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {}
    },
    [storageKey]
  );

  const toggle = (id: string) => {
    const next = { ...done, [id]: !done[id] };
    persist(next);
  };

  // Trigger celebration when all done (first time only)
  useEffect(() => {
    if (!hydrated) return;
    const allDone = items.every((i) => done[i.id]);
    if (allDone && !celebrated) {
      setCelebrated(true);
      try {
        localStorage.setItem(`${storageKey}-celebrated`, '1');
      } catch {}
      fireOrangeConfetti();
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2500);
    }
  }, [done, items, celebrated, hydrated, storageKey]);

  const copyTemplate = async () => {
    const text = t('cta.templateText', { role: config.role, team: config.team });
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleEmojiClick = () => {
    const next = emojiClicks + 1;
    setEmojiClicks(next);
    if (next >= 3) {
      setEmojiClicks(0);
      setEasterOpen(true);
    }
  };

  const getItemAction = (item: CTAItem) => {
    if (item.id === 'slack-buddy') {
      return (
        <a
          href={config.buddy.slackDeepLink ?? `mailto:${config.buddy.email ?? ''}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-expando-orange hover:bg-expando-orange-hover text-white text-xs font-medium rounded-lg transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <MessageSquare size={12} />
          {t('cta.slackButton')}
        </a>
      );
    }
    if (item.id === 'intro-general') {
      return (
        <button
          onClick={(e) => {
            e.stopPropagation();
            copyTemplate();
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-expando-gray-200 hover:border-expando-orange hover:text-expando-orange text-xs font-medium rounded-lg transition-colors"
        >
          {copied ? <CheckCheck size={12} /> : <Copy size={12} />}
          {copied ? t('cta.copied') : t('cta.copyTemplate')}
        </button>
      );
    }
    if (item.id === 'social') {
      return (
        <div className="flex gap-2">
          <a
            href="https://www.instagram.com/expando.io/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-expando-gray-200 hover:border-expando-orange hover:text-expando-orange text-xs font-medium rounded-lg transition-colors"
          >
            <Instagram size={12} />
            {t('cta.instagram')}
          </a>
          <a
            href="https://www.linkedin.com/company/expando/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-expando-gray-200 hover:border-expando-orange hover:text-expando-orange text-xs font-medium rounded-lg transition-colors"
          >
            <Linkedin size={12} />
            {t('cta.linkedin')}
          </a>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {/* CTA section */}
      <SectionWrapper id="cta" className="py-20 sm:py-28 bg-expando-gray-50">
        <div className="section-container">
          <div className="mb-10 max-w-2xl">
            <div className="orange-line mb-4" />
            <h2 className="section-heading">{t('cta.title')}</h2>
            <p className="section-subheading">{t('cta.subtitle')}</p>
          </div>

          <div className="space-y-3 max-w-3xl">
            {items.map((item) => {
              const Icon = ICON_MAP[item.icon] ?? MessageSquare;
              const isDone = !!done[item.id];
              return (
                <div
                  key={item.id}
                  className={`flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                    isDone
                      ? 'bg-expando-orange-soft border-expando-orange'
                      : 'bg-white border-expando-gray-200 hover:border-expando-orange/40'
                  }`}
                  onClick={() => toggle(item.id)}
                >
                  {/* Checkbox */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggle(item.id);
                    }}
                    className={`w-7 h-7 rounded-lg border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                      isDone
                        ? 'bg-expando-orange border-expando-orange'
                        : 'bg-white border-expando-gray-200'
                    }`}
                    aria-pressed={isDone}
                  >
                    {isDone && <Check size={15} className="text-white" strokeWidth={3} />}
                  </button>

                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-white border border-expando-gray-200 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-expando-orange" />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-expando-gray-900 mb-1 ${isDone ? 'line-through opacity-70' : ''}`}>
                      {item.title}
                    </p>
                    <p className="text-sm text-expando-gray-700 leading-relaxed">
                      {item.description.replace('{{buddy}}', config.buddy.firstName)}
                    </p>
                  </div>

                  {/* Action */}
                  <div className="flex-shrink-0">{getItemAction(item)}</div>
                </div>
              );
            })}
          </div>
        </div>
      </SectionWrapper>

      {/* Outro / final CTA */}
      <section id="outro" className="py-20 sm:py-28 bg-expando-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 50%, #FF4D00 0%, transparent 50%),
                                radial-gradient(circle at 70% 20%, #FF4D00 0%, transparent 40%)`,
            }}
          />
        </div>

        <div className="relative z-10 section-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
            <div>
              <div className="w-12 h-1 bg-expando-orange rounded-full mb-6" />
              <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
                {t('outro.title')}
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
                {t('outro.subtitle')}
              </p>

              <div className="mb-8">
                <p className="text-expando-orange font-bold text-xl">{t('outro.signature')}</p>
              </div>

              <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
                <Mail size={14} />
                <span>{t('outro.questionsLabel')}</span>
                <a
                  href="mailto:people@expando.com"
                  className="text-expando-orange hover:text-expando-orange-hover transition-colors font-medium"
                >
                  people@expando.com
                </a>
              </div>

              <div className="flex gap-3">
                <a
                  href="https://www.linkedin.com/company/expando/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 text-white/70 hover:bg-white/10 hover:text-white transition-colors text-sm font-medium"
                >
                  <Linkedin size={16} />
                  LinkedIn
                </a>
                <a
                  href="https://www.instagram.com/expando.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 text-white/70 hover:bg-white/10 hover:text-white transition-colors text-sm font-medium"
                >
                  <Instagram size={16} />
                  Instagram
                </a>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="/photos/team-laptop4.jpg"
                alt="EXPANDO"
                fill
                className="object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-expando-gray-900/30" />
            </div>
          </div>

          {/* Brand stamp with hidden easter egg trigger */}
          <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between gap-4 flex-wrap max-w-5xl mx-auto">
            <p className="text-white font-bold text-xl tracking-tight">EXPANDO</p>
            <p className="text-white/40 text-xs flex items-center gap-1">
              onboarding.expando.com · &copy; {new Date().getFullYear()}{' '}
              <button
                onClick={handleEmojiClick}
                className="text-white/40 hover:text-expando-orange transition-colors select-none"
                aria-label="🎸"
                title="🎸"
              >
                🎸
              </button>
            </p>
          </div>
        </div>
      </section>

      {/* Celebration overlay */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-expando-orange text-white px-8 py-5 rounded-2xl shadow-2xl animate-scale-in">
            <p className="text-2xl font-bold">{t('cta.confettiMsg')}</p>
          </div>
        </div>
      )}

      {/* Easter egg */}
      <EasterEggModal
        open={easterOpen}
        onClose={() => setEasterOpen(false)}
        code={config.easterEggCode}
      />
    </>
  );
}
