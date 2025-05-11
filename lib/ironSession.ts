// lib/ironSession.ts
import { getIronSession, SessionOptions } from 'iron-session';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export type SessionContent = {
  id?: number;
  username?: string;
};

export const sessionOptions: SessionOptions = {
  cookieName: 'user',
  password: process.env.SESSION_SECRET!,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export async function getSession() {
  const cookieStore = cookies();
  // @ts-expect-error - iron-session types are not compatible with next/headers
  return await getIronSession<SessionContent>(cookieStore, sessionOptions);
}

export async function getUser() {
  const session = await getSession();
  if (!session?.id) return null;

  return await prisma.user.findUnique({
    where: { id: session.id },
    select: { id: true, username: true, email: true },
  });
}
