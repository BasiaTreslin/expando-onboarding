'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import { Modal } from '@/components/ui/Modal';
import type { ContractType } from '@/types';

interface PracticalInfoModalProps {
  open: boolean;
  onClose: () => void;
  contractType: ContractType;
}

function Section({
  label,
  children,
  isFirst = false,
}: {
  label: string;
  children: React.ReactNode;
  isFirst?: boolean;
}) {
  return (
    <section
      className={`${isFirst ? 'pt-0' : 'pt-5'} pb-5 ${
        isFirst ? '' : 'border-t border-expando-gray-200'
      }`}
    >
      <h3
        className="text-[11px] uppercase font-semibold text-expando-orange
                   tracking-[0.05em] mb-3"
      >
        {label}
      </h3>
      <div className="text-[15px] text-expando-gray-900 leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export function PracticalInfoModal({
  open,
  onClose,
  contractType,
}: PracticalInfoModalProps) {
  const { t, messages } = useLanguage();
  const isZL = contractType === 'ŽL';

  const vacationItems = (messages as unknown as {
    practicalInfo: { vacation: { items: string[] } };
  }).practicalInfo.vacation.items;

  const hppSteps = (messages as unknown as {
    practicalInfo: { sickLeave: { hppSteps: string[] } };
  }).practicalInfo.sickLeave.hppSteps;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t('practicalInfo.title')}
      description={t('practicalInfo.subtitle')}
      size="lg"
    >
      <Section label={t('practicalInfo.workingHours.label')} isFirst>
        <p>{t('practicalInfo.workingHours.body')}</p>
      </Section>

      <Section label={t('practicalInfo.vacation.label')}>
        <ul className="list-disc pl-5 space-y-1.5">
          {vacationItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section label={t('practicalInfo.sickLeave.label')}>
        {isZL ? (
          <p>{t('practicalInfo.sickLeave.zl')}</p>
        ) : (
          <>
            <p className="text-sm text-expando-gray-600 mb-2">
              {t('practicalInfo.sickLeave.hppIntro')}
            </p>
            <ol className="list-decimal pl-5 space-y-1.5">
              {hppSteps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </>
        )}
      </Section>

      <Section label={t('practicalInfo.perks.label')}>
        <ul className="space-y-2">
          <li>{t('practicalInfo.perks.homeOffice')}</li>
          <li>{t('practicalInfo.perks.multisport')}</li>
          <li>
            {isZL
              ? t('practicalInfo.perks.payrollZl')
              : t('practicalInfo.perks.payrollHpp')}
          </li>
          <li>{t('practicalInfo.perks.offices')}</li>
          <li>{t('practicalInfo.perks.referral')}</li>
        </ul>
      </Section>

      <Section label={t('practicalInfo.onboardingTask.label')}>
        <p>{t('practicalInfo.onboardingTask.body')}</p>
      </Section>

      <p className="pt-5 border-t border-expando-gray-200 text-sm text-expando-gray-600">
        {t('practicalInfo.footer')}
        <a
          href="https://www.notion.so/expando/GI11-Employees-11fef12c4f0c8084b242d5f67046c997"
          target="_blank"
          rel="noopener noreferrer"
          className="text-expando-orange font-medium hover:text-expando-orange-hover"
        >
          {t('practicalInfo.footerLinkLabel')}
        </a>
      </p>
    </Modal>
  );
}
