import type { Team, TeamMember } from '@/types';
import { resellTeam } from './resell-team';
import { leadershipTeam } from './leadership-team';
import { gtmTeam } from './gtm-team';
import { privateLabelTeam } from './private-label-team';
import { agencySupportTeam } from './agency-support-team';
import { newMarketplacesTeam } from './new-marketplaces-team';
import { customerSuccessTeam } from './customer-success-team';
import { businessOpsTeam } from './business-ops-team';

export const TEAMS_BY_ID: Record<string, Team> = {
  [resellTeam.id]: resellTeam,
  [leadershipTeam.id]: leadershipTeam,
  [gtmTeam.id]: gtmTeam,
  [privateLabelTeam.id]: privateLabelTeam,
  [agencySupportTeam.id]: agencySupportTeam,
  [newMarketplacesTeam.id]: newMarketplacesTeam,
  [customerSuccessTeam.id]: customerSuccessTeam,
  [businessOpsTeam.id]: businessOpsTeam,
};

export function getTeamById(id: string | undefined): Team | undefined {
  if (!id) return undefined;
  return TEAMS_BY_ID[id];
}

const SLACK_WORKSPACE = 'expando';

export function resolveSayHiHref(member: TeamMember): string | undefined {
  if (member.slackUserId) {
    return `https://${SLACK_WORKSPACE}.slack.com/team/${member.slackUserId}`;
  }
  if (member.email) {
    return `mailto:${member.email}`;
  }
  return undefined;
}

export function isSlackHref(href: string | undefined): boolean {
  return !!href && href.includes('.slack.com/');
}
