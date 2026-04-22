export type JourneyState =
  | 'pre-start-14plus'
  | 'pre-start-week'
  | 'pre-start-tomorrow'
  | 'day-1'
  | 'week-1'
  | 'month-1'
  | 'month-2'
  | 'month-3'
  | 'graduated';

export interface JourneyInfo {
  state: JourneyState;
  daysSinceStart: number;
  daysUntilStart: number;
  isFallback: boolean;
}

export function getStateForDays(daysSinceStart: number): JourneyState {
  if (daysSinceStart <= -14) return 'pre-start-14plus';
  if (daysSinceStart <= -2) return 'pre-start-week';
  if (daysSinceStart === -1) return 'pre-start-tomorrow';
  if (daysSinceStart === 0) return 'day-1';
  if (daysSinceStart <= 6) return 'week-1';
  if (daysSinceStart <= 29) return 'month-1';
  if (daysSinceStart <= 59) return 'month-2';
  if (daysSinceStart <= 89) return 'month-3';
  return 'graduated';
}

function parseCalendarDate(value: string | Date): { y: number; m: number; d: number } | null {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return null;
    return { y: value.getFullYear(), m: value.getMonth(), d: value.getDate() };
  }
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const iso = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) {
    const y = Number(iso[1]);
    const m = Number(iso[2]) - 1;
    const d = Number(iso[3]);
    const probe = new Date(y, m, d);
    if (probe.getFullYear() !== y || probe.getMonth() !== m || probe.getDate() !== d) return null;
    return { y, m, d };
  }
  const fallback = new Date(trimmed);
  if (Number.isNaN(fallback.getTime())) return null;
  return { y: fallback.getFullYear(), m: fallback.getMonth(), d: fallback.getDate() };
}

// UTC-based day number gives stable calendar-day deltas across DST transitions.
function toDayNumber(y: number, m: number, d: number): number {
  return Math.floor(Date.UTC(y, m, d) / 86_400_000);
}

export function getJourneyState(
  startDate: string | Date | null | undefined,
  now: Date = new Date(),
): JourneyInfo {
  const parsed = startDate == null ? null : parseCalendarDate(startDate);
  if (!parsed) {
    return { state: 'week-1', daysSinceStart: 1, daysUntilStart: -1, isFallback: true };
  }
  const startDay = toDayNumber(parsed.y, parsed.m, parsed.d);
  const todayDay = toDayNumber(now.getFullYear(), now.getMonth(), now.getDate());
  const daysSinceStart = todayDay - startDay;
  return {
    state: getStateForDays(daysSinceStart),
    daysSinceStart,
    daysUntilStart: -daysSinceStart,
    isFallback: false,
  };
}
