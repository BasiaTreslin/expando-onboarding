export interface Credentials {
  username: string;
  password: string;
}

export interface PersonCore {
  firstName: string;
  fullName: string;
  role: string;
  photo?: string;
  slackDeepLink?: string;
  email?: string;
  linkedin?: string;
}

export interface CloseCirclePerson extends PersonCore {
  personalLine: string;
}

export interface Founder extends PersonCore {
  quote: string;
  bio?: string;
}

export type HobbyIcon = 'dog' | 'surf' | 'lego' | 'coffee' | 'guitar' | 'book' | 'bike' | 'camera' | 'plant' | 'gamepad';

export interface TeamMember {
  firstName: string;
  fullName: string;
  team: 'GTM' | 'AM' | 'CS' | 'Data' | 'Ops';
  role?: string;
  photo?: string;
  hobby?: HobbyIcon;
}

export interface Day1Session {
  time: string;
  session: string;
  who: string;
  icon?: string;
}

export interface RecentMilestone {
  text: string;
}

export interface MetricStat {
  value: string;
  numeric?: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

export type ContractType = 'HPP' | 'ŽL' | 'DPČ' | 'DPP';
export type Language = 'cs' | 'en';
export type RoleKey = 'KAM' | 'AgencySupport' | 'CS' | 'PPCSpecialist' | 'TechData' | 'GTMSales' | 'Operations';

export interface NewHireConfig {
  slug: string;
  firstName: string;
  fullName: string;
  role: string;
  roleKey?: RoleKey;
  team: string;
  startDate: string; // ISO 8601
  daysUntilStart?: number;
  roleMissionLine: string;

  buddy: CloseCirclePerson;
  teamLeader: CloseCirclePerson;

  contractType: ContractType;
  language: Language;
  resourceMapUrl?: string;
  customDay1Schedule?: Day1Session[];
  hasWelcomeVideo?: boolean;
  welcomeVideoUrl?: string;
  easterEggCode: string;
  officeAddress?: string;
  credentials: Credentials;
}
