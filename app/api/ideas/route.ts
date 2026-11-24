import {NextRequest, NextResponse} from 'next/server';
import {archiveCookie, archiveMaxAge, createSession, hasArchiveSession} from '@/lib/linkedin-archive';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const owner = 'hiteshisthatyou';
const repo = 'hitesh-portfolio';
const path = 'content/linkedin-posts.json';
const api = 'https://api.github.com/repos/' + owner + '/' + repo + '/contents/' + path;

function validPost(p: any) {
  if (!p || typeof p.id !== 'string' || typeof p.text !== 'string' || typeof p.url !== 'string') return false;
  if (!p.text.trim() || p.text.length > 12000 || !/^https:\/\/(www\.)?linkedin\.com\/(posts\/|feed\/update\/)/i.test(p.url)) return false;
  if (p.embedUrl && (!/^https:\/\/www\.linkedin\.com\/embed\/feed\/update\/urn:li:/i.test(p.embedUrl))) return false;
  return true;
}

async function githubRequest(method: string, body?: any) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('GITHUB_TOKEN is not configured in Vercel.');
  const response = await fetch(api, {
    method, cache: 'no-store',
    headers: {Authorization: 'Bearer ' + token, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28'},
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'GitHub could not save the archive.');
  return data;
}

export async function GET() {
  if (!(await hasArchiveSession())) return NextResponse.json({error: 'Sign in to manage the archive.'}, {status: 401});
  try {
    const data = await githubRequest('GET');
    return NextResponse.json(JSON.parse(Buffer.from(data.content, 'base64').toString('utf8')));
  } catch (error: any) {
    return NextResponse.json({error: error.message || 'Could not load archive.'}, {status: 500});
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (body.action === 'login') {
      const password = process.env.ARCHIVE_ADMIN_PASSWORD;
      if (!password || !process.env.ARCHIVE_SESSION_SECRET || !process.env.GITHUB_TOKEN) {
        return NextResponse.json({error: 'Archive setup is incomplete. Add the three server-side environment variables in Vercel.'}, {status: 503});
      }
      if (typeof body.password !== 'string' || body.password !== password) return NextResponse.json({error: 'Password not recognised.'}, {status: 401});
      const response = NextResponse.json({ok: true});
      response.cookies.set(archiveCookie, createSession(), {httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/', maxAge: archiveMaxAge});
      return response;
    }
    if (!(await hasArchiveSession())) return NextResponse.json({error: 'Your session has expired. Sign in again.'}, {status: 401});
    if (body.action === 'logout') {
      const response = NextResponse.json({ok: true});
      response.cookies.set(archiveCookie, '', {httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/', maxAge: 0});
      return response;
    }
    if (body.action !== 'save' || !Array.isArray(body.posts) || body.posts.length > 200 || !body.posts.every(validPost)) {
      return NextResponse.json({error: 'Check the post details. Only LinkedIn post links and official LinkedIn embed URLs are accepted.'}, {status: 400});
    }
    const current = await githubRequest('GET');
    const content = Buffer.from(JSON.stringify({posts: body.posts}, null, 2) + '\n').toString('base64');
    const saved = await githubRequest('PUT', {message: 'content: update LinkedIn ideas archive', content, sha: current.sha, branch: 'main'});
    return NextResponse.json({ok: true, commit: saved.commit?.sha});
  } catch (error: any) {
    return NextResponse.json({error: error.message || 'Could not save archive.'}, {status: 500});
  }
}
