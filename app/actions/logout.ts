'use server';

import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionContent } from '@/lib/sessionOptions';

export async function onLogoutAction() {
    //@ts-ignore
  const session = await getIronSession<SessionContent>(cookies(), sessionOptions);
  await session.destroy();
}