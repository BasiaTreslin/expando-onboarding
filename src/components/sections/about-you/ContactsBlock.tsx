'use client';

import { useLanguage } from '@/i18n/LanguageContext';

const IT_SLACK_URL = 'slack://channel?id=PLACEHOLDER';

interface Row {
  emoji: string;
  labelKey: string;
  value: React.ReactNode;
}

export function ContactsBlock() {
  const { t } = useLanguage();

  const linkClass =
    'text-expando-gray-900 hover:text-expando-orange transition-colors';

  const rows: Row[] = [
    {
      emoji: '💬',
      labelKey: 'contacts.rows.hr',
      value: (
        <span className="text-expando-gray-900">
          {t('contacts.values.hrPerson')}
        </span>
      ),
    },
    {
      emoji: '🏋️',
      labelKey: 'contacts.rows.multisport',
      value: (
        <span className="text-expando-gray-900">
          {t('contacts.values.multisportPerson')}
        </span>
      ),
    },
    {
      emoji: '💻',
      labelKey: 'contacts.rows.it',
      value: (
        <a href={IT_SLACK_URL} className={linkClass}>
          {t('contacts.values.itChannel')}
        </a>
      ),
    },
    {
      emoji: '🤝',
      labelKey: 'contacts.rows.anything',
      value: (
        <span className="text-expando-gray-900">
          {t('contacts.values.anythingPerson')}
        </span>
      ),
    },
  ];

  return (
    <div className="mt-8">
      <h3
        className="text-[11px] uppercase font-semibold text-expando-gray-600
                   tracking-[0.05em] mb-4"
      >
        {t('contacts.title')}
      </h3>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
        {rows.map((row) => (
          <div
            key={row.labelKey}
            className="flex items-baseline gap-3 text-[14px]"
          >
            <span className="text-base leading-none" aria-hidden="true">
              {row.emoji}
            </span>
            <dt className="text-expando-gray-600 flex-shrink-0">
              {t(row.labelKey)}
            </dt>
            <span
              className="text-expando-gray-200 mx-0.5"
              aria-hidden="true"
            >
              →
            </span>
            <dd className="min-w-0 truncate font-medium">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
