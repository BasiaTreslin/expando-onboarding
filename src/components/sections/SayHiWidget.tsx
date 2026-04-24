'use client';

import { useEffect, useMemo, useState } from 'react';
import { Copy, Check, ExternalLink, Mail, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { resolveSayHiHref, isSlackHref } from '@/data/teams';
import type { NewHireConfig, TeamMember } from '@/types';

interface SayHiWidgetProps {
  config: NewHireConfig;
}

type Tab = 'buddy' | 'leader';

function fillTemplate(
  tpl: string,
  vars: Record<string, string>
): string {
  return Object.entries(vars).reduce(
    (acc, [k, v]) => acc.replace(new RegExp(`\\{${k}\\}`, 'g'), v),
    tpl
  );
}

function hasHref(member: TeamMember): boolean {
  return !!resolveSayHiHref(member);
}

export function SayHiWidget({ config }: SayHiWidgetProps) {
  const { t, language } = useLanguage();

  const formattedStartDate = useMemo(() => {
    const d = new Date(config.startDate);
    return d.toLocaleDateString(language === 'cs' ? 'cs-CZ' : 'en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }, [config.startDate, language]);

  const baseVars = {
    name: config.name,
    role: config.role,
    startDate: formattedStartDate,
    buddyName: config.buddy.name,
    leaderName: config.leader.name,
  };

  const buddyTemplate = fillTemplate(t('sayHi.templateBuddy'), baseVars);
  const leaderTemplate = fillTemplate(t('sayHi.templateLeader'), baseVars);

  const buddyAvailable = hasHref(config.buddy);
  const leaderAvailable = hasHref(config.leader);

  const [tab, setTab] = useState<Tab>(buddyAvailable ? 'buddy' : 'leader');
  const [buddyText, setBuddyText] = useState(buddyTemplate);
  const [leaderText, setLeaderText] = useState(leaderTemplate);
  const [copied, setCopied] = useState(false);

  // Keep textareas reactive to language switch — but only if the user
  // hasn't edited the draft yet, so we don't clobber their changes.
  const [buddyPristine, setBuddyPristine] = useState(true);
  const [leaderPristine, setLeaderPristine] = useState(true);

  useEffect(() => {
    if (buddyPristine) setBuddyText(buddyTemplate);
  }, [buddyTemplate, buddyPristine]);

  useEffect(() => {
    if (leaderPristine) setLeaderText(leaderTemplate);
  }, [leaderTemplate, leaderPristine]);

  if (!buddyAvailable && !leaderAvailable) return null;

  const activeMember = tab === 'buddy' ? config.buddy : config.leader;
  const activeText = tab === 'buddy' ? buddyText : leaderText;
  const setActiveText = (val: string) => {
    if (tab === 'buddy') {
      setBuddyText(val);
      setBuddyPristine(false);
    } else {
      setLeaderText(val);
      setLeaderPristine(false);
    }
  };

  const href = resolveSayHiHref(activeMember);
  const openInSlack = isSlackHref(href);
  const OpenIcon = openInSlack ? MessageCircle : Mail;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore — clipboard blocked
    }
  };

  const tabs: Array<{ key: Tab; label: string; available: boolean }> = [
    { key: 'buddy', label: t('sayHi.tabBuddy'), available: buddyAvailable },
    { key: 'leader', label: t('sayHi.tabLeader'), available: leaderAvailable },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-expando-gray-200 overflow-hidden">
      <div className="px-5 sm:px-6 pt-5 pb-3 border-b border-expando-gray-200">
        <h3 className="text-lg font-bold text-expando-gray-900">{t('sayHi.title')}</h3>
      </div>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label={t('sayHi.title')}
        className="flex gap-1 px-3 pt-3 border-b border-expando-gray-200 bg-expando-gray-50"
      >
        {tabs
          .filter((tb) => tb.available)
          .map((tb) => {
            const active = tab === tb.key;
            return (
              <button
                key={tb.key}
                role="tab"
                aria-selected={active}
                onClick={() => setTab(tb.key)}
                className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${
                  active
                    ? 'bg-white text-expando-orange border border-expando-gray-200 border-b-white -mb-px'
                    : 'text-expando-gray-600 hover:text-expando-gray-900'
                }`}
              >
                {tb.label}
              </button>
            );
          })}
      </div>

      {/* Body */}
      <div className="p-5 sm:p-6">
        <textarea
          value={activeText}
          onChange={(e) => setActiveText(e.target.value)}
          rows={5}
          className="w-full resize-y rounded-lg border border-expando-gray-200 bg-white
                     px-4 py-3 text-sm text-expando-gray-800 leading-relaxed
                     focus:outline-none focus:ring-2 focus:ring-expando-orange focus:border-expando-orange"
        />

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg
                       border border-expando-gray-200 bg-white text-sm font-medium
                       text-expando-gray-700 hover:border-expando-orange hover:text-expando-orange
                       transition-colors"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? t('sayHi.copied') : t('sayHi.copy')}
          </button>

          {href && (
            <a
              href={href}
              target={openInSlack ? '_blank' : undefined}
              rel={openInSlack ? 'noopener noreferrer' : undefined}
              className="btn-primary"
            >
              <OpenIcon size={16} />
              {t('sayHi.openSlack')}
              {openInSlack && <ExternalLink size={14} className="opacity-80" />}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
