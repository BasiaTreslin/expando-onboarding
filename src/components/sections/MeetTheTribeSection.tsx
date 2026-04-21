'use client';

import { useState, useMemo } from 'react';
import { MessageSquare, Mail, Linkedin } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { TeamAvatar } from '@/components/ui/TeamAvatar';
import { founders } from '@/data/founders';
import { teamMembers } from '@/data/team';
import type { NewHireConfig, CloseCirclePerson, Founder, TeamMember } from '@/types';

function initialsFor(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

function FounderCard({ founder }: { founder: Founder }) {
  return (
    <div className="bg-white rounded-2xl border border-expando-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-full bg-expando-gray-900 text-white flex items-center justify-center font-bold text-lg overflow-hidden flex-shrink-0">
          {founder.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={founder.photo} alt={founder.fullName} className="w-full h-full object-cover" />
          ) : (
            initialsFor(founder.fullName)
          )}
        </div>
        <div>
          <h3 className="font-bold text-expando-gray-900">{founder.fullName}</h3>
          <p className="text-sm text-expando-orange font-medium">{founder.role}</p>
        </div>
      </div>
      <p className="text-expando-gray-700 text-sm leading-relaxed italic">&ldquo;{founder.quote}&rdquo;</p>
    </div>
  );
}

function CirclePerson({ person, label, role }: { person: CloseCirclePerson; label: string; role: string }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
      <div className="w-20 h-20 rounded-full bg-expando-orange text-white flex items-center justify-center font-bold text-xl overflow-hidden flex-shrink-0 shadow-md">
        {person.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={person.photo} alt={person.fullName} className="w-full h-full object-cover" />
        ) : (
          initialsFor(person.fullName)
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-expando-orange uppercase tracking-wider mb-1">{label}</p>
        <h4 className="font-bold text-lg text-expando-gray-900">{person.fullName}</h4>
        <p className="text-sm text-expando-gray-600 mb-3">{role}</p>
        <p className="text-expando-gray-700 text-sm leading-relaxed italic mb-4">
          &ldquo;{person.personalLine}&rdquo;
        </p>
        <div className="flex flex-wrap gap-2">
          {person.slackDeepLink && (
            <a
              href={person.slackDeepLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-expando-orange hover:bg-expando-orange-hover
                         text-white text-sm font-medium rounded-lg transition-colors"
            >
              <MessageSquare size={13} />
              {t('tribe.slackCTA')}
            </a>
          )}
          {person.email && (
            <a
              href={`mailto:${person.email}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-expando-gray-200
                         hover:border-expando-orange hover:text-expando-orange text-expando-gray-700
                         text-sm font-medium rounded-lg transition-colors"
            >
              <Mail size={13} />
              {t('tribe.emailCTA')}
            </a>
          )}
          {person.linkedin && (
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-expando-gray-200
                         hover:border-expando-orange hover:text-expando-orange text-expando-gray-700
                         text-sm font-medium rounded-lg transition-colors"
            >
              <Linkedin size={13} />
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function MeetTheTribeSection({ config }: { config: NewHireConfig }) {
  const { t, messages } = useLanguage();
  const [filter, setFilter] = useState<'All' | TeamMember['team']>('All');

  const teamFilters: Array<'All' | TeamMember['team']> = ['All', 'GTM', 'AM', 'CS', 'Data', 'Ops'];

  const teamLabels = messages.tribe.teams as Record<string, string>;

  const filtered = useMemo(
    () => (filter === 'All' ? teamMembers : teamMembers.filter((m) => m.team === filter)),
    [filter]
  );

  return (
    <SectionWrapper id="tribe" className="py-20 sm:py-28 bg-expando-gray-50">
      <div className="section-container">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <div className="orange-line mx-auto mb-4" />
          <h2 className="section-heading">{t('tribe.title')}</h2>
          <p className="section-subheading">{t('tribe.subtitle')}</p>
        </div>

        {/* Founders */}
        <div className="mb-14">
          <p className="text-center text-expando-gray-600 text-sm mb-6 max-w-xl mx-auto leading-relaxed">
            {t('tribe.foundersIntro')}
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {founders.map((f) => (
              <FounderCard key={f.firstName} founder={f} />
            ))}
          </div>
        </div>

        {/* Your circle — highlight card */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden max-w-3xl mx-auto mb-14">
          <div className="h-1.5 bg-expando-orange" />
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <p className="text-xs font-bold text-expando-orange uppercase tracking-widest mb-1">
                {t('tribe.yourCircleLabel')}
              </p>
              <p className="text-expando-gray-600 text-sm">{t('tribe.yourCircleSubtitle')}</p>
            </div>

            <div className="space-y-8">
              <CirclePerson person={config.buddy} label={t('tribe.buddyLabel')} role={config.buddy.role} />
              <div className="h-px bg-expando-gray-200" />
              <CirclePerson
                person={config.teamLeader}
                label={t('tribe.leaderLabel')}
                role={config.teamLeader.role}
              />
            </div>
          </div>
        </div>

        {/* Rest of tribe */}
        <div>
          <div className="text-center mb-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-expando-gray-900 mb-1">{t('tribe.restTitle')}</h3>
            <p className="text-sm text-expando-gray-600">{t('tribe.restSubtitle')}</p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {teamFilters.map((teamKey) => (
              <button
                key={teamKey}
                onClick={() => setFilter(teamKey)}
                className={`px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors ${
                  filter === teamKey
                    ? 'bg-expando-orange text-white'
                    : 'bg-white border border-expando-gray-200 text-expando-gray-700 hover:border-expando-orange hover:text-expando-orange'
                }`}
              >
                {teamKey === 'All' ? t('tribe.filterAll') : teamLabels[teamKey]}
              </button>
            ))}
          </div>

          {/* Avatar grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 max-w-4xl mx-auto">
            {filtered.map((m) => (
              <TeamAvatar key={m.fullName} member={m} />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
