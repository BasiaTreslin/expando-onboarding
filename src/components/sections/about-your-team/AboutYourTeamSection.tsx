'use client';

import { useState } from 'react';
import { User } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { getTeamById } from '@/data/teams';
import { IntroduceYourselfForm } from './IntroduceYourselfForm';
import { OrgChartCard } from './OrgChartCard';
import { TeamMemberModal } from './TeamMemberModal';
import type { NewHireConfig, TeamMember } from '@/types';

interface AboutYourTeamSectionProps {
  config: NewHireConfig;
}

function Avatar({ member, size }: { member: TeamMember; size: 'lg' | 'md' }) {
  const dimensions =
    size === 'lg' ? 'w-24 h-24 sm:w-28 sm:h-28' : 'w-20 h-20';
  return (
    <div
      className={`${dimensions} rounded-full overflow-hidden bg-expando-gray-50 ring-4 ring-white shadow-md flex-shrink-0`}
    >
      {member.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={member.photo}
          alt={member.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-expando-gray-600 font-semibold">
          {member.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .slice(0, 2)
            .toUpperCase()}
        </div>
      )}
    </div>
  );
}

function AboutMeButton({
  onClick,
  label,
  small = false,
}: {
  onClick: () => void;
  label: string;
  small?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-${small ? '1.5' : '2'} font-medium
                  text-expando-orange hover:text-expando-orange-hover transition-colors
                  ${small ? 'text-xs' : 'text-sm'}`}
    >
      <User size={small ? 12 : 14} />
      {label}
    </button>
  );
}

function LeaderBuddyCard({
  member,
  label,
  aboutMeLabel,
}: {
  member: TeamMember;
  label: string;
  aboutMeLabel: string;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <div
        className="group bg-white rounded-2xl shadow-md border border-expando-gray-200 p-6 sm:p-7
                   transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
      >
        <div className="flex items-start gap-5">
          <Avatar member={member} size="lg" />
          <div className="min-w-0 flex-1">
            <p className="text-[11px] uppercase tracking-wider font-semibold text-expando-gray-600">
              {label}
            </p>
            <h3 className="text-xl font-bold text-expando-gray-900 mt-1 truncate">
              {member.name}
            </h3>
            {member.role && (
              <p className="text-expando-orange font-medium text-sm mt-0.5">
                {member.role}
              </p>
            )}
          </div>
        </div>

        {member.bio && (
          <div className="mt-5">
            <AboutMeButton
              onClick={() => setModalOpen(true)}
              label={aboutMeLabel}
            />
          </div>
        )}
      </div>

      {member.bio && (
        <TeamMemberModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          member={member}
        />
      )}
    </>
  );
}

function PeerCard({
  member,
  aboutMeLabel,
}: {
  member: TeamMember;
  aboutMeLabel: string;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <div
        className="group bg-white rounded-2xl shadow-sm border border-expando-gray-200 p-5
                   transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex flex-col"
      >
        <div className="flex items-start gap-4">
          <Avatar member={member} size="md" />
          <div className="min-w-0 flex-1">
            <h4 className="font-bold text-expando-gray-900 leading-tight">
              {member.name}
            </h4>
            {member.role && (
              <p className="text-expando-orange text-sm font-medium mt-0.5">
                {member.role}
              </p>
            )}
          </div>
        </div>

        {member.bio && (
          <div className="mt-4 self-start">
            <AboutMeButton
              onClick={() => setModalOpen(true)}
              label={aboutMeLabel}
              small
            />
          </div>
        )}
      </div>

      {member.bio && (
        <TeamMemberModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          member={member}
        />
      )}
    </>
  );
}

export function AboutYourTeamSection({ config }: AboutYourTeamSectionProps) {
  const { t } = useLanguage();
  const team = getTeamById(config.teamId);

  const peerMembers = team
    ? team.members.filter(
        (m) => m.id !== config.leader.id && m.id !== config.buddy.id
      )
    : [];

  return (
    <SectionWrapper id="team" className="py-20 sm:py-28 bg-white">
      <div className="section-container">
        {/* Heading + leader & buddy */}
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <div className="orange-line mb-4" />
            <h2 className="section-heading">{t('aboutYourTeam.title')}</h2>
            <p className="section-subheading">{t('aboutYourTeam.subtitle')}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <LeaderBuddyCard
              member={config.leader}
              label={t('aboutYourTeam.leaderLabel')}
              aboutMeLabel={t('aboutYourTeam.aboutMeCta')}
            />
            <LeaderBuddyCard
              member={config.buddy}
              label={t('aboutYourTeam.buddyLabel')}
              aboutMeLabel={t('aboutYourTeam.aboutMeCta')}
            />
          </div>
        </div>

        {/* Peer team */}
        {team && peerMembers.length > 0 && (
          <div className="max-w-5xl mx-auto mt-20 sm:mt-24">
            <div className="mb-10">
              <div className="orange-line mb-4" />
              <h2 className="section-heading">
                {t('aboutYourTeam.teamHeader', { teamName: team.name })}
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {peerMembers.map((member) => (
                <PeerCard
                  key={member.id}
                  member={member}
                  aboutMeLabel={t('aboutYourTeam.aboutMeCta')}
                />
              ))}
            </div>
          </div>
        )}

        {/* Introduce yourself form */}
        <div className="max-w-3xl mx-auto mt-12 sm:mt-16">
          <IntroduceYourselfForm
            slug={config.slug}
            fullName={config.fullName}
            firstName={config.name}
          />
        </div>

        {/* Org chart card */}
        <div className="max-w-3xl mx-auto mt-8">
          <OrgChartCard />
        </div>
      </div>
    </SectionWrapper>
  );
}
