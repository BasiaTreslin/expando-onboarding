'use client';

import { Briefcase, Users, Calendar, User, Shield, ExternalLink, MapPin } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import type { NewHireConfig, PersonInfo } from '@/types';

interface ProfileSectionProps {
  config: NewHireConfig;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function PersonCard({ person, label }: { person: PersonInfo; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="avatar-circle text-sm">
        {person.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={person.photo} alt={person.name} className="w-full h-full rounded-full object-cover" />
        ) : (
          getInitials(person.name)
        )}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-expando-gray-600 font-medium uppercase tracking-wide">{label}</p>
        <div className="flex items-center gap-1 mt-0.5">
          <p className="font-semibold text-expando-gray-900 truncate">{person.name}</p>
          {person.linkedin && (
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-expando-gray-600 hover:text-expando-orange transition-colors flex-shrink-0"
              aria-label={`${person.name} on LinkedIn`}
            >
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-start gap-3 py-4 border-b border-expando-gray-200 last:border-0">
      <div className="w-8 h-8 rounded-lg bg-expando-orange-soft flex items-center justify-center flex-shrink-0 mt-0.5">
        <span className="text-expando-orange">{icon}</span>
      </div>
      <div>
        <p className="text-xs text-expando-gray-600 font-medium uppercase tracking-wide">{label}</p>
        <p className="font-semibold text-expando-gray-900 mt-0.5">{value}</p>
      </div>
    </div>
  );
}

export function ProfileSection({ config }: ProfileSectionProps) {
  const { t, language } = useLanguage();

  const startDate = new Date(config.startDate);
  const formattedDate = startDate.toLocaleDateString(language === 'cs' ? 'cs-CZ' : 'en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <SectionWrapper id="profile" className="py-20 sm:py-28 bg-expando-gray-50">
      <div className="section-container">
        <div className="max-w-3xl mx-auto">
          {/* Heading */}
          <div className="mb-10">
            <div className="orange-line mb-4" />
            <h2 className="section-heading">{t('profile.title')}</h2>
            <p className="section-subheading">{t('profile.subtitle')}</p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            {/* Orange top accent */}
            <div className="h-1.5 bg-expando-orange" />

            <div className="p-6 sm:p-8">
              {/* Name + role header */}
              <div className="flex items-start justify-between gap-4 mb-6 pb-6 border-b border-expando-gray-200">
                <div>
                  <h3 className="text-2xl font-bold text-expando-gray-900">{config.fullName}</h3>
                  <p className="text-expando-orange font-medium mt-1">{config.role}</p>
                </div>
                <span className="tag flex-shrink-0">{config.team}</span>
              </div>

              {/* Info grid */}
              <div className="grid sm:grid-cols-2 gap-0 sm:gap-x-8 mb-6">
                <div>
                  <InfoRow
                    icon={<Briefcase size={15} />}
                    label={t('profile.role')}
                    value={config.role}
                  />
                  <InfoRow
                    icon={<Users size={15} />}
                    label={t('profile.team')}
                    value={config.team}
                  />
                  <InfoRow
                    icon={<Shield size={15} />}
                    label={t('profile.contractType')}
                    value={config.contractType}
                  />
                </div>
                <div>
                  <InfoRow
                    icon={<Calendar size={15} />}
                    label={t('profile.startDate')}
                    value={`${formattedDate} — ${t('profile.startTime')}`}
                  />
                  <InfoRow
                    icon={<MapPin size={15} />}
                    label="Location"
                    value={t('profile.officeAddress')}
                  />
                </div>
              </div>

              {/* People */}
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-expando-gray-50 rounded-xl p-4">
                  <PersonCard person={config.buddy} label={t('profile.buddy')} />
                </div>
                <div className="bg-expando-gray-50 rounded-xl p-4">
                  <PersonCard person={config.teamLeader} label={t('profile.teamLeader')} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
