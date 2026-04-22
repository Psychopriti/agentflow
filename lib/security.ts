import { jsonError } from "@/lib/api";

type RateLimitOptions = {
  keyPrefix: string;
  limit: number;
  windowMs: number;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const globalRateLimitStore = globalThis as typeof globalThis & {
  miunixRateLimitStore?: Map<string, RateLimitEntry>;
};

const rateLimitStore =
  globalRateLimitStore.miunixRateLimitStore ??
  new Map<string, RateLimitEntry>();

globalRateLimitStore.miunixRateLimitStore = rateLimitStore;

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

export function enforceRateLimit(
  request: Request,
  { keyPrefix, limit, windowMs }: RateLimitOptions,
) {
  const now = Date.now();
  const key = `${keyPrefix}:${getClientIp(request)}`;
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });

    return null;
  }

  if (current.count >= limit) {
    const retryAfterSeconds = Math.max(
      Math.ceil((current.resetAt - now) / 1000),
      1,
    );
    const response = jsonError({
      error:
        "Demasiadas solicitudes por ahora. Espera un momento y vuelve a intentar.",
      status: 429,
    });

    response.headers.set("Retry-After", String(retryAfterSeconds));

    return response;
  }

  current.count += 1;
  rateLimitStore.set(key, current);

  return null;
}

