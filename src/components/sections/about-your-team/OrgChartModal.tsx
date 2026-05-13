'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import { Modal } from '@/components/ui/Modal';
import { TEAMS_BY_ID } from '@/data/teams';
import type { Team, TeamMember } from '@/types';

interface OrgChartModalProps {
  open: boolean;
  onClose: () => void;
}

type ColorTheme = 'gray' | 'blue' | 'orange' | 'yellow' | 'green';

const DEPARTMENT_COLORS: Record<ColorTheme, string> = {
  gray: 'bg-gray-100 text-gray-800',
  blue: 'bg-blue-100 text-blue-800',
  orange: 'bg-orange-100 text-orange-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  green: 'bg-green-100 text-green-800',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="w-20 sm:w-24 flex flex-col items-center text-center">
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-expando-orange-soft ring-2 ring-white shadow-sm">
        {member.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.photo}
            alt={member.name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
              target.parentElement?.classList.add('flex', 'items-center', 'justify-center');
              const fallback = document.createElement('span');
              fallback.className = 'text-expando-orange font-semibold text-sm';
              fallback.textContent = getInitials(member.name);
              target.parentElement?.appendChild(fallback);
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-expando-orange font-semibold text-sm">
            {getInitials(member.name)}
          </div>
        )}
      </div>
      <p className="mt-2 text-xs font-semibold text-expando-gray-900 leading-tight">
        {member.name}
      </p>
      {member.role && (
        <p className="text-[11px] text-expando-gray-600 leading-snug mt-0.5">
          {member.role}
        </p>
      )}
    </div>
  );
}

function DepartmentHeader({
  label,
  color,
}: {
  label: string;
  color: ColorTheme;
}) {
  return (
    <div
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${DEPARTMENT_COLORS[color]}`}
    >
      {label}
    </div>
  );
}

function MembersStack({ team }: { team: Team }) {
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-4 justify-center sm:justify-start">
      {team.members.map((m) => (
        <MemberCard key={m.id} member={m} />
      ))}
    </div>
  );
}

function SubTeam({
  team,
  subtitle,
}: {
  team: Team;
  subtitle: string;
}) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wide font-semibold text-orange-700 mb-2">
        {subtitle}
      </p>
      <MembersStack team={team} />
    </div>
  );
}

export function OrgChartModal({ open, onClose }: OrgChartModalProps) {
  const { t } = useLanguage();

  const leadership = TEAMS_BY_ID['leadership-team'];
  const gtm = TEAMS_BY_ID['gtm-team'];
  const privateLabel = TEAMS_BY_ID['private-label-team'];
  const resell = TEAMS_BY_ID['resell-team'];
  const agencySupport = TEAMS_BY_ID['agency-support-team'];
  const newMarketplaces = TEAMS_BY_ID['new-marketplaces-team'];
  const customerSuccess = TEAMS_BY_ID['customer-success-team'];
  const businessOps = TEAMS_BY_ID['business-ops-team'];

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t('orgChart.modalTitle')}
      description={t('orgChart.modalSubtitle')}
      size="xl"
    >
      <div className="overflow-x-auto -mx-6 px-6">
        <div className="min-w-[640px] space-y-8">
          {/* Leadership row */}
          {leadership && (
            <section>
              <DepartmentHeader
                label={t('orgChart.departments.leadership')}
                color="gray"
              />
              <div className="mt-4">
                <MembersStack team={leadership} />
              </div>
            </section>
          )}

          {/* Departments row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-expando-gray-200">
            {/* Go-to-Market */}
            {gtm && (
              <section className="space-y-3">
                <DepartmentHeader
                  label={t('orgChart.departments.gtm')}
                  color="blue"
                />
                <MembersStack team={gtm} />
              </section>
            )}

            {/* Account Management with sub-teams */}
            <section className="space-y-4">
              <DepartmentHeader
                label={t('orgChart.departments.accountManagement')}
                color="orange"
              />
              <div className="space-y-5">
                {privateLabel && (
                  <SubTeam
                    team={privateLabel}
                    subtitle={t('orgChart.subteams.privateLabel')}
                  />
                )}
                {resell && (
                  <SubTeam
                    team={resell}
                    subtitle={t('orgChart.subteams.resell')}
                  />
                )}
                {agencySupport && (
                  <SubTeam
                    team={agencySupport}
                    subtitle={t('orgChart.subteams.agencySupport')}
                  />
                )}
                {newMarketplaces && (
                  <SubTeam
                    team={newMarketplaces}
                    subtitle={t('orgChart.subteams.newMarketplaces')}
                  />
                )}
              </div>
            </section>

            {/* Customer Success */}
            {customerSuccess && (
              <section className="space-y-3">
                <DepartmentHeader
                  label={t('orgChart.departments.customerSuccess')}
                  color="yellow"
                />
                <MembersStack team={customerSuccess} />
              </section>
            )}

            {/* Business Operations */}
            {businessOps && (
              <section className="space-y-3">
                <DepartmentHeader
                  label={t('orgChart.departments.businessOps')}
                  color="green"
                />
                <MembersStack team={businessOps} />
              </section>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
