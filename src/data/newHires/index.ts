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
      bio: `Hi, I'm Lukáš — Head of Agency at EXPANDO. Originally from Nový Bor, a little glass-making town in Bohemia, currently based in Milan, Italy.

I love travel and history (ancient Egypt is the best!), I'm seriously into books — Terry Pratchett's Discworld series tops the list — and a massive sports fan: West Ham United and Bílí Tygři Liberec all the way.`,
    },
    buddy: {
      id: 'jakub-zemlicka',
      name: 'Jakub Žemlička',
      role: 'Key Account Manager',
      photo: '/team/jakub-zemlicka.png',
      email: 'jakub.zemlicka@expan.do',
      slackUserId: 'U01RR6QEEUW',
      bio: `I'm an Account Manager at EXPANDO, taking care of clients and making sure the resell side runs smoothly.

In my free time I've been renovating my friend's boat and building a "summer resort" with my dad at Slapy. I love bodyweight training, yoga, and meditation — and I keep trying running, though it's a real challenge (anyone want to join?). Travel is the third pillar — never easy these days, but "where there's a will, there's a way". And family time? Always the best part.`,
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
        completable: true,
        // TEMP: using Ilona's video for Barbara's test until Lukáš records his own
        celebrationMediaUrl: '/reactions/ilona-medova.mp4',
        celebrationPoster: '/reactions/ilona-medova-poster.jpg',
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
