// lib/ironSession.ts
import { getIronSession, SessionOptions } from 'iron-session';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

const SESSION_SECRET='Error: iron-session: Bad usage. Password must be at least 32 characters long.'

export type SessionContent = {
  id?: number;
  username?: string;
};

export const sessionOptions: SessionOptions = {
  cookieName: 'user',
//   password: process.env.SESSION_SECRET!,
   password: SESSION_SECRET,
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
