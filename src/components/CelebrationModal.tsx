'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

interface CelebrationModalProps {
  open: boolean;
  onClose: () => void;
  firstName: string;
  celebrationMediaUrl?: string;
  celebrationPoster?: string;
  celebrationMessageKey?: string;
}

export function CelebrationModal({
  open,
  onClose,
  firstName,
  celebrationMediaUrl,
  celebrationPoster,
  celebrationMessageKey,
}: CelebrationModalProps) {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const titleId = 'celebration-modal-title';

  useEffect(() => {
    if (!open) return;

    const prevActive = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const card = cardRef.current;
      if (!card) return;
      const focusables = card.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, video, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKey);

    // focus the close button on next tick to give the modal time to mount
    const focusTimeout = window.setTimeout(() => {
      const closeBtn = cardRef.current?.querySelector<HTMLButtonElement>(
        'button[data-modal-close]'
      );
      closeBtn?.focus();
    }, 50);

    return () => {
      window.removeEventListener('keydown', handleKey);
      window.clearTimeout(focusTimeout);
      document.body.style.overflow = prevOverflow;
      prevActive?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;
  if (typeof document === 'undefined') return null;

  const title = t('gamification.modal.title', { firstName });
  const closeLabel = t('gamification.modal.close');
  const fallbackMessage = celebrationMessageKey
    ? t(celebrationMessageKey)
    : t('gamification.modal.defaultMessage');

  const hasVideo = !!celebrationMediaUrl;

  const content = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70" aria-hidden="true" />
      <div
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8
                   flex flex-col items-center text-center"
      >
        <button
          onClick={onClose}
          aria-label={closeLabel}
          className="absolute top-3 right-3 p-2 rounded-lg text-expando-gray-500
                     hover:text-expando-gray-900 hover:bg-expando-gray-50 transition-colors"
        >
          <X size={18} />
        </button>

        <h2
          id={titleId}
          className="text-2xl sm:text-3xl font-bold text-expando-gray-900 mb-4"
        >
          {title}
        </h2>

        {hasVideo ? (
          <video
            autoPlay
            muted
            playsInline
            loop={false}
            poster={celebrationPoster}
            className="w-full max-w-sm rounded-xl shadow-sm mb-5 bg-black"
          >
            <source src={celebrationMediaUrl} type="video/mp4" />
          </video>
        ) : (
          <>
            <div className="text-6xl mb-4" aria-hidden="true">
              🎉
            </div>
            <p className="text-expando-gray-700 leading-relaxed mb-5">
              {fallbackMessage}
            </p>
          </>
        )}

        <button
          data-modal-close
          onClick={onClose}
          className="btn-primary"
        >
          {closeLabel}
        </button>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
