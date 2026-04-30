'use client';

import { useEffect, useState } from 'react';
import { Check, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Modal } from '@/components/ui/Modal';
import { CelebrationPop } from '@/components/CelebrationPop';

interface ContractModalProps {
  open: boolean;
  onClose: () => void;
  reviewed: boolean;
  firstName: string;
  onReview: () => void;
}

const CONTRACT_PDF_URL = '/contracts/ramcova_smlouva_OSVC_CZ.pdf';

export function ContractModal({
  open,
  onClose,
  reviewed,
  firstName,
  onReview,
}: ContractModalProps) {
  const { t, messages } = useLanguage();

  const [success, setSuccess] = useState(false);
  const [confettiKey, setConfettiKey] = useState<number | null>(null);

  // Reset transient state when modal opens
  useEffect(() => {
    if (open) {
      setSuccess(false);
    }
  }, [open]);

  const keyTerms = (messages as unknown as {
    contractModal: { keyTerms: { items: string[] } };
  }).contractModal.keyTerms.items;

  const handleReview = () => {
    console.log('[contract] reviewed');
    onReview();
    setSuccess(true);
    setConfettiKey(Date.now());
    setTimeout(onClose, 2000);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        title={t('contractModal.title')}
        description={t('contractModal.subtitle')}
        size="lg"
        footer={
          success ? null : reviewed ? (
            <a
              href={CONTRACT_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              {t('contractModal.status.viewTemplate')}
              <ExternalLink size={14} className="opacity-80" />
            </a>
          ) : (
            <button
              type="button"
              onClick={handleReview}
              className="btn-primary"
            >
              <Check size={16} />
              {t('contractModal.review.cta')}
            </button>
          )
        }
      >
        {success ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div
              className="w-16 h-16 rounded-full bg-expando-green-soft
                         flex items-center justify-center mb-4 animate-scale-in"
            >
              <Check
                size={32}
                className="text-expando-green-deep"
                strokeWidth={2.5}
              />
            </div>
            <p className="text-lg font-semibold text-expando-gray-900">
              {t('contractModal.review.success')}
            </p>
          </div>
        ) : (
          <>
            {reviewed && (
              <div className="-mt-1 mb-5">
                <span
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full
                             text-xs font-semibold
                             bg-expando-green-soft text-expando-green-deep"
                >
                  <Check size={12} strokeWidth={2.5} />
                  {t('contractModal.reviewedBadge')}
                </span>
              </div>
            )}

            <section className="pb-5">
              <h3
                className="text-[11px] uppercase font-semibold text-expando-orange
                           tracking-[0.05em] mb-3"
              >
                {t('contractModal.keyTerms.label')}
              </h3>
              <ul className="space-y-2 text-[15px] text-expando-gray-900 leading-relaxed">
                {keyTerms.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-expando-orange flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="pt-5 border-t border-expando-gray-200">
              <h3
                className="text-[11px] uppercase font-semibold text-expando-orange
                           tracking-[0.05em] mb-3"
              >
                {t('contractModal.status.label')}
              </h3>
              <p className="text-[15px] text-expando-gray-900 leading-relaxed mb-3">
                {t('contractModal.status.body')}
              </p>
              <a
                href={CONTRACT_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[14px] font-medium
                           text-expando-orange hover:text-expando-orange-hover
                           transition-colors"
              >
                {t('contractModal.status.viewTemplate')}
                <ExternalLink size={13} className="opacity-80" />
              </a>
            </section>
          </>
        )}
      </Modal>

      {confettiKey !== null && (
        <CelebrationPop
          key={confettiKey}
          name={firstName}
          accentColor="#FF4D00"
          onComplete={() => setConfettiKey(null)}
        />
      )}
    </>
  );
}
