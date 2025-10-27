const store = new Map<string, { count: number; expiresAt: number }>();

export interface RateLimitOptions {
  identifier: string;
  limit: number;
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  retryAfter?: number;
}

export function checkRateLimit({
  identifier,
  limit,
  windowMs,
}: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const current = store.get(identifier);

  if (!current || current.expiresAt <= now) {
    store.set(identifier, { count: 1, expiresAt: now + windowMs });
    return { allowed: true };
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      retryAfter: Math.ceil((current.expiresAt - now) / 1000),
    };
  }

  current.count += 1;
  store.set(identifier, current);

  return { allowed: true };
}
