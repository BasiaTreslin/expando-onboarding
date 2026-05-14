'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  size?: 'md' | 'lg' | 'xl';
  initialFocusRef?: React.RefObject<HTMLElement>;
  closeOnBackdropClick?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Modal({
  open,
  onClose,
  title,
  description,
  size = 'lg',
  initialFocusRef,
  closeOnBackdropClick = true,
  children,
  footer,
}: ModalProps) {
  const { t } = useLanguage();
  const titleId = useId();
  const descId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      setVisible(false);
      return;
    }
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';

    const raf = requestAnimationFrame(() => {
      setVisible(true);
      const target =
        initialFocusRef?.current ??
        panelRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR) ??
        panelRef.current;
      target?.focus();
    });

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = '';
      previouslyFocusedRef.current?.focus?.();
    };
  }, [open, initialFocusRef]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusables = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((el) => !el.hasAttribute('data-focus-skip'));
      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!mounted || !open) return null;

  const sizeClass = size === 'md' ? 'sm:max-w-lg' : size === 'xl' ? 'sm:max-w-6xl' : 'sm:max-w-[720px]';

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      role="presentation"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label={t('common.close')}
        data-focus-skip="true"
        tabIndex={-1}
        onClick={() => closeOnBackdropClick && onClose()}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        className={`relative w-full ${sizeClass} max-h-[90vh] sm:max-h-[85vh]
                    bg-white shadow-2xl
                    rounded-t-2xl sm:rounded-2xl
                    flex flex-col outline-none
                    transition-all duration-200 ease-out
                    ${
                      visible
                        ? 'translate-y-0 sm:scale-100 opacity-100'
                        : 'translate-y-full sm:translate-y-0 sm:scale-95 opacity-0'
                    }`}
      >
        {/* Mobile grab handle */}
        <div className="sm:hidden flex justify-center pt-2.5 pb-1">
          <div className="w-10 h-1 rounded-full bg-expando-gray-200" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 pt-5 sm:pt-6 pb-4 border-b border-expando-gray-200">
          <div className="min-w-0">
            <h2
              id={titleId}
              className="text-xl sm:text-2xl font-bold text-expando-gray-900 leading-tight"
            >
              {title}
            </h2>
            {description && (
              <p
                id={descId}
                className="text-sm text-expando-gray-600 mt-1 leading-relaxed"
              >
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('common.close')}
            className="flex-shrink-0 -mr-2 p-2 rounded-lg text-expando-gray-600
                       hover:text-expando-gray-900 hover:bg-expando-gray-50
                       focus:outline-none focus:ring-2 focus:ring-expando-orange transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body (scrollable) */}
        <div className="flex-1 overflow-y-auto px-6 py-5 text-expando-gray-900">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="border-t border-expando-gray-200 px-6 py-4 flex flex-wrap gap-3 justify-end">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
