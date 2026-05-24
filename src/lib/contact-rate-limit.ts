const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 3;

const hits = new Map<string, number[]>();

export function checkLimit(ip: string, now: number = Date.now()): boolean {
  const cutoff = now - WINDOW_MS;
  const previous = hits.get(ip) ?? [];
  const recent = previous.filter((t) => t > cutoff);

  if (recent.length >= MAX_HITS) {
    hits.set(ip, recent);
    return false;
  }

  recent.push(now);
  hits.set(ip, recent);
  return true;
}

export function resetLimit(ip: string): void {
  hits.delete(ip);
}
