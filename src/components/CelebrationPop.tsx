'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '@/i18n/LanguageContext';

interface CelebrationPopProps {
  imageSrc?: string;
  name: string;
  accentColor?: string;
  onComplete: () => void;
}

export function CelebrationPop({
  imageSrc,
  name,
  accentColor = '#F97316',
  onComplete,
}: CelebrationPopProps) {
  const { t } = useLanguage();
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onComplete();
  };

  // Safety net: if the animationend event is swallowed (tab backgrounded,
  // browser quirk), fire onComplete after the longest expected duration.
  useEffect(() => {
    const timer = window.setTimeout(finish, 2800);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (typeof document === 'undefined') return null;

  const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (
      e.animationName !== 'celebration-pop' &&
      e.animationName !== 'celebration-pop-reduced'
    ) {
      return;
    }
    finish();
  };

  const content = (
    <div
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
      role="presentation"
      aria-hidden="true"
      style={{ zIndex: 9999 }}
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="celebration-pop-card w-[280px] h-[280px] rounded-3xl bg-white shadow-2xl
                     overflow-hidden flex items-center justify-center"
          onAnimationEnd={handleAnimationEnd}
        >
          {imageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageSrc}
              alt=""
              draggable={false}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-[7rem] leading-none">🎉</span>
          )}
        </div>
        <div
          className="celebration-pop-text text-xl sm:text-2xl font-bold
                     px-5 py-2 rounded-full bg-white/95 shadow-lg"
          style={{ color: accentColor }}
        >
          {t('gamification.modal.title', { firstName: name })}
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
