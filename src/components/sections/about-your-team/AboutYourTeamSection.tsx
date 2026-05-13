'use client';

import { MapPin, MessageCircle, Mail } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { getTeamById, resolveSayHiHref, isSlackHref } from '@/data/teams';
import { IntroduceYourselfForm } from './IntroduceYourselfForm';
import { OrgChartCard } from './OrgChartCard';
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

function OptionalBlock({ label, text }: { label?: string; text?: string }) {
  if (!text) return null;
  return (
    <div className="mt-3">
      {label && (
        <p className="text-[11px] uppercase tracking-wider font-semibold text-expando-gray-600 mb-1">
          {label}
        </p>
      )}
      <p className="text-sm text-expando-gray-600 leading-relaxed">{text}</p>
    </div>
  );
}

function SayHiLink({
  member,
  label,
  small = false,
}: {
  member: TeamMember;
  label: string;
  small?: boolean;
}) {
  const href = resolveSayHiHref(member);
  if (!href) return null;
  const Icon = isSlackHref(href) ? MessageCircle : Mail;
  const external = isSlackHref(href);
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`inline-flex items-center gap-${small ? '1.5' : '2'} font-medium
                  text-expando-orange hover:text-expando-orange-hover transition-colors
                  ${small ? 'text-xs' : 'text-sm'}`}
    >
      <Icon size={small ? 12 : 14} />
      {label}
    </a>
  );
}

function LeaderBuddyCard({
  member,
  label,
  sayHiLabel,
}: {
  member: TeamMember;
  label: string;
  sayHiLabel: string;
}) {
  return (
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
          {member.location && (
            <p className="flex items-center gap-1 text-xs text-expando-gray-600 mt-1.5">
              <MapPin size={12} />
              {member.location}
            </p>
          )}
        </div>
      </div>

      <OptionalBlock text={member.bio} />
      <OptionalBlock text={member.personal} />
      {member.quote && (
        <blockquote className="mt-4 pl-4 border-l-2 border-expando-orange text-sm italic text-expando-gray-600">
          &ldquo;{member.quote}&rdquo;
        </blockquote>
      )}

      <div className="mt-5">
        <SayHiLink member={member} label={sayHiLabel} />
      </div>
    </div>
  );
}

function PeerCard({
  member,
  sayHiLabel,
}: {
  member: TeamMember;
  sayHiLabel: string;
}) {
  return (
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
          {member.location && (
            <p className="flex items-center gap-1 text-xs text-expando-gray-600 mt-1">
              <MapPin size={11} />
              {member.location}
            </p>
          )}
        </div>
      </div>

      <OptionalBlock text={member.bio} />
      <OptionalBlock text={member.personal} />
      {member.quote && (
        <blockquote className="mt-3 pl-3 border-l-2 border-expando-orange text-xs italic text-expando-gray-600">
          &ldquo;{member.quote}&rdquo;
        </blockquote>
      )}

      <div className="mt-4 self-start">
        <SayHiLink member={member} label={sayHiLabel} small />
      </div>
    </div>
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
              sayHiLabel={t('aboutYourTeam.slackCta')}
            />
            <LeaderBuddyCard
              member={config.buddy}
              label={t('aboutYourTeam.buddyLabel')}
              sayHiLabel={t('aboutYourTeam.slackCta')}
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
                  sayHiLabel={t('aboutYourTeam.slackCta')}
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
