const PREFIX = 'expando-onboarding';

function completedKey(slug: string): string {
  return `${PREFIX}:${slug}:completedTasks`;
}

function introKey(slug: string): string {
  return `${PREFIX}:${slug}:introDismissed`;
}

function hasStorage(): boolean {
  return typeof window !== 'undefined' && !!window.localStorage;
}

function readJson<T>(key: string, fallback: T): T {
  if (!hasStorage()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown): void {
  if (!hasStorage()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // quota exceeded / private mode — silently ignore
  }
}

export function getCompletedTasks(slug: string): Record<string, boolean> {
  const data = readJson<Record<string, boolean>>(completedKey(slug), {});
  return data && typeof data === 'object' ? data : {};
}

export function isTaskCompleted(slug: string, taskId: string): boolean {
  return !!getCompletedTasks(slug)[taskId];
}

export function markTaskCompleted(slug: string, taskId: string): void {
  const current = getCompletedTasks(slug);
  if (current[taskId]) return;
  current[taskId] = true;
  writeJson(completedKey(slug), current);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('tasks-updated', { detail: { slug, taskId } })
    );
  }
}

export function isIntroDismissed(slug: string): boolean {
  return readJson<boolean>(introKey(slug), false) === true;
}

export function dismissIntro(slug: string): void {
  writeJson(introKey(slug), true);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('tasks-updated', { detail: { slug, intro: true } })
    );
  }
}
