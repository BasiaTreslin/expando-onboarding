export interface Credentials {
  username: string;
  password: string;
}

export type ContractType = 'HPP' | 'ŽL' | 'DPČ';
export type Language = 'en' | 'cs';
export type RoleKey = 'KAM' | 'AgencySupport' | 'CS' | 'PPCSpecialist' | 'TechData' | 'GTMSales' | 'Operations';

export interface Day1Session {
  time: string;
  session: string;
  who: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role?: string;
  photo?: string;
  location?: string;
  email?: string;
  slackUserId?: string;
  bio?: string;
  personal?: string;
  quote?: string;
}

export interface Team {
  id: string;
  name: string;
  tagline?: string;
  taglineEn?: string;
  members: TeamMember[];
}

export interface ProfileTask {
  id: string;
  icon?: string;
  titleKey: string;
  descriptionKey: string;
  actionLabelKey: string;
  actionUrl: string;
}

export interface NewHireConfig {
  slug: string;
  name: string;
  fullName: string;
  role: string;
  roleKey?: RoleKey;
  team: string;
  startDate: string; // ISO 8601
  buddy: TeamMember;
  leader: TeamMember;
  teamId?: string;
  profileTasks?: ProfileTask[];
  contractType: ContractType;
  language: Language;
  resourceMapUrl?: string;
  customDay1Schedule?: Day1Session[];
  hasWelcomeVideo?: boolean;
  welcomeVideoUrl?: string;
  credentials?: Credentials;
}
