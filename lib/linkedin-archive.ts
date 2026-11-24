import {createHmac, timingSafeEqual} from 'node:crypto';
import {cookies} from 'next/headers';

const COOKIE = 'hitesh_ideas_session';
const MAX_AGE = 60 * 60 * 12;

function signature(value: string) {
  const secret = process.env.ARCHIVE_SESSION_SECRET;
  if (!secret) throw new Error('ARCHIVE_SESSION_SECRET is not configured.');
  return createHmac('sha256', secret).update(value).digest('base64url');
}

export function createSession() {
  const payload = Buffer.from(JSON.stringify({exp: Date.now() + MAX_AGE * 1000})).toString('base64url');
  return payload + '.' + signature(payload);
}

export async function hasArchiveSession() {
  try {
    const token = (await cookies()).get(COOKIE)?.value;
    if (!token) return false;
    const [payload, supplied] = token.split('.');
    if (!payload || !supplied) return false;
    const expected = signature(payload);
    const a = Buffer.from(supplied);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return Number(data.exp) > Date.now();
  } catch { return false; }
}

export const archiveCookie = COOKIE;
export const archiveMaxAge = MAX_AGE;
