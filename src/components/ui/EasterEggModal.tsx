'use client';

import { useEffect } from 'react';
import { X, Pizza } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

interface EasterEggModalProps {
  open: boolean;
  onClose: () => void;
  code: string;
}

export function EasterEggModal({ open, onClose, code }: EasterEggModalProps) {
  const { t } = useLanguage();

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-expando-orange p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label={t('common.close')}
          >
            <X size={18} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <Pizza size={24} />
            </div>
            <h3 className="text-xl font-bold">{t('easterEgg.title')}</h3>
          </div>
        </div>

        <div className="p-6">
          <p className="text-expando-gray-700 leading-relaxed mb-5">{t('easterEgg.body')}</p>

          <div className="bg-expando-gray-50 border border-dashed border-expando-orange rounded-xl p-4 mb-5">
            <p className="text-xs text-expando-gray-600 uppercase tracking-wider mb-1">
              {t('easterEgg.codeLabel')}
            </p>
            <p className="text-expando-orange text-xl font-mono font-bold tracking-wider">{code}</p>
          </div>

          <button onClick={onClose} className="btn-primary w-full justify-center">
            {t('easterEgg.close')}
          </button>
        </div>
      </div>
    </div>
  );
}
