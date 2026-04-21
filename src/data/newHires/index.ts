import type { ContractType, Language, NewHireConfig, RoleKey } from '@/types';
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

function rowToConfig(row: HireRow): NewHireConfig {
  const teamLeader = {
    name: row.team_leader_name,
    linkedin: row.team_leader_linkedin ?? undefined,
    photo: row.team_leader_photo ?? undefined,
  };
  const buddy = row.buddy_name
    ? {
        name: row.buddy_name,
        linkedin: row.buddy_linkedin ?? undefined,
        photo: row.buddy_photo ?? undefined,
      }
    : teamLeader;

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
    teamLeader,
    buddy,
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
