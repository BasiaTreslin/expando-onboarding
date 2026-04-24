import type {
  ContractType,
  Language,
  NewHireConfig,
  ProfileTask,
  RoleKey,
  TeamMember,
} from '@/types';
import { getSupabaseAdmin } from '@/lib/supabase/admin';

interface HireRow {
  slug: string;
  name: string;
  full_name: string;
  role: string;
  role_key: RoleKey | null;
  team: string;
  start_date: string;
  contract_type: ContractType;
  language: Language;
  team_leader_name: string;
  team_leader_linkedin: string | null;
  team_leader_photo: string | null;
  buddy_name: string | null;
  buddy_linkedin: string | null;
  buddy_photo: string | null;
  resource_map_url: string | null;
}

const PUBLIC_COLUMNS =
  'slug, name, full_name, role, role_key, team, start_date, contract_type, language, ' +
  'team_leader_name, team_leader_linkedin, team_leader_photo, ' +
  'buddy_name, buddy_linkedin, buddy_photo, resource_map_url';

// TEMP: TS overlay for enriched leader/buddy/teamId/profileTasks until
// Supabase schema adds these fields
interface HireOverlay {
  leader: TeamMember;
  buddy: TeamMember;
  teamId: string;
  profileTasks?: ProfileTask[];
}

const HIRE_OVERLAYS: Record<string, HireOverlay> = {
  'barbara-treslinova': {
    leader: {
      id: 'lukas-doskocil',
      name: 'Lukáš Doskočil',
      role: 'Head of Agency',
      photo: '/team/lukas-doskocil.png',
      email: 'lukas.doskocil@expan.do',
      slackUserId: 'U094LQ5CMHV',
    },
    buddy: {
      id: 'jakub-zemlicka',
      name: 'Jakub Žemlička',
      role: 'Key Account Manager',
      photo: '/team/jakub-zemlicka.png',
      email: 'jakub.zemlicka@expan.do',
      slackUserId: 'U01RR6QEEUW',
    },
    teamId: 'resell-team',
    profileTasks: [
      {
        id: 'employee-questionnaire-osvc',
        icon: '📋',
        titleKey: 'profileTasks.questionnaire.title',
        descriptionKey: 'profileTasks.questionnaire.description',
        actionLabelKey: 'profileTasks.questionnaire.actionLabel',
        actionUrl: 'https://docs.google.com/document/d/14N7mseqD32voYPpaRYbL14Y2aJClScvk/edit',
      },
    ],
  },
};

function slugifyName(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function rowToConfig(row: HireRow): NewHireConfig {
  const leaderFromRow: TeamMember = {
    id: slugifyName(row.team_leader_name),
    name: row.team_leader_name,
    photo: row.team_leader_photo ?? undefined,
  };
  const buddyFromRow: TeamMember = row.buddy_name
    ? {
        id: slugifyName(row.buddy_name),
        name: row.buddy_name,
        photo: row.buddy_photo ?? undefined,
      }
    : leaderFromRow;

  const overlay = HIRE_OVERLAYS[row.slug];

  return {
    slug: row.slug,
    name: row.name,
    fullName: row.full_name,
    role: row.role,
    roleKey: row.role_key ?? undefined,
    team: row.team,
    startDate: row.start_date,
    contractType: row.contract_type,
    language: row.language,
    leader: overlay?.leader ?? leaderFromRow,
    buddy: overlay?.buddy ?? buddyFromRow,
    teamId: overlay?.teamId,
    profileTasks: overlay?.profileTasks,
    resourceMapUrl: row.resource_map_url ?? undefined,
  };
}

export async function getNewHireBySlug(slug: string): Promise<NewHireConfig | null> {
  const { data, error } = await getSupabaseAdmin()
    .from('new_hires')
    .select(PUBLIC_COLUMNS)
    .eq('slug', slug)
    .maybeSingle<HireRow>();

  if (error) throw error;
  return data ? rowToConfig(data) : null;
}

export async function getAllSlugs(): Promise<string[]> {
  const { data, error } = await getSupabaseAdmin()
    .from('new_hires')
    .select('slug');

  if (error) throw error;
  return (data ?? []).map((r) => r.slug);
}

export async function verifyCredentials(
  username: string,
  password: string
): Promise<string | null> {
  const normalized = username.trim().toLowerCase();
  const { data, error } = await getSupabaseAdmin()
    .from('new_hires')
    .select('slug, username, password')
    .ilike('username', normalized)
    .eq('password', password)
    .maybeSingle();

  if (error) throw error;
  return data?.slug ?? null;
}
