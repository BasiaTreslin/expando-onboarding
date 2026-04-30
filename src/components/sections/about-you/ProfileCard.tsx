'use client';

import {
  Briefcase,
  Users,
  Calendar,
  MapPin,
  FileText,
  CheckCircle2,
} from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { InfoTile } from './InfoTile';
import { ActionTile } from './ActionTile';
import type { NewHireConfig } from '@/types';

interface ProfileCardProps {
  config: NewHireConfig;
  formattedStartDate: string;
  contractDone: boolean;
  questionnaireDone: boolean;
  onPracticalInfoClick: () => void;
  onContractClick: () => void;
  onQuestionnaireClick: () => void;
}

export function ProfileCard({
  config,
  formattedStartDate,
  contractDone,
  questionnaireDone,
  onPracticalInfoClick,
  onContractClick,
  onQuestionnaireClick,
}: ProfileCardProps) {
  const { t } = useLanguage();

  const startDateValue = `${formattedStartDate} — ${t('aboutYou.info.startTime')}`;

  return (
    <div
      className="bg-white rounded-xl shadow-sm overflow-hidden
                 border border-expando-gray-200"
    >
      {/* Orange top accent — 3px per brief */}
      <div className="h-[3px] bg-expando-orange" />

      <div className="px-6 sm:px-7 py-6">
        {/* Header: name + team pill */}
        <div
          className="flex items-start justify-between gap-4 pb-4
                     border-b border-expando-gray-200"
        >
          <h3 className="text-2xl font-medium text-expando-gray-900 leading-tight">
            {config.fullName}
          </h3>
          <span
            className="px-3 py-1 rounded-full text-xs font-medium flex-shrink-0
                       bg-expando-orange-soft text-expando-orange-deep"
          >
            {config.team}
          </span>
        </div>

        {/* Tiles grid — auto-flow gives both desktop 2x3 and mobile alternating 1-col */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-6 mt-1"
          role="list"
        >
          {/* Row 1 */}
          <div role="listitem">
            <InfoTile
              icon={Briefcase}
              label={t('aboutYou.info.role')}
              value={config.role}
            />
          </div>
          <div role="listitem" className="my-1.5 sm:my-2.5">
            <ActionTile
              icon={MapPin}
              label={t('aboutYou.tiles.practicalInfo.label')}
              description={t('aboutYou.tiles.practicalInfo.description')}
              ctaText={t('aboutYou.tiles.practicalInfo.cta')}
              onClick={onPracticalInfoClick}
            />
          </div>

          {/* Row 2 */}
          <div role="listitem">
            <InfoTile
              icon={Users}
              label={t('aboutYou.info.team')}
              value={config.team}
            />
          </div>
          <div role="listitem" className="my-1.5 sm:my-2.5">
            <ActionTile
              icon={FileText}
              label={t('aboutYou.tiles.contract.label')}
              description={t('aboutYou.tiles.contract.description')}
              ctaText={
                contractDone
                  ? t('aboutYou.tiles.contract.ctaReviewed')
                  : t('aboutYou.tiles.contract.cta')
              }
              completed={contractDone}
              completedBadge={t('aboutYou.tiles.contract.completedBadge')}
              onClick={onContractClick}
            />
          </div>

          {/* Row 3 */}
          <div role="listitem">
            <InfoTile
              icon={Calendar}
              label={t('aboutYou.info.startDate')}
              value={startDateValue}
            />
          </div>
          <div role="listitem" className="my-1.5 sm:my-2.5">
            <ActionTile
              icon={CheckCircle2}
              label={t('aboutYou.tiles.questionnaire.label')}
              description={t('aboutYou.tiles.questionnaire.description')}
              ctaText={
                questionnaireDone
                  ? t('aboutYou.tiles.questionnaire.ctaCompleted')
                  : t('aboutYou.tiles.questionnaire.cta')
              }
              completed={questionnaireDone}
              completedBadge={t('aboutYou.tiles.questionnaire.completedBadge')}
              onClick={onQuestionnaireClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
