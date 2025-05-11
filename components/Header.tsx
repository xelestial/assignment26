import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionContent } from '@/lib/sessionOptions';
import { onLogoutAction } from '@/app/actions/logout';
import { prisma } from '@/lib/prisma';

export  async function Header() {
  const cookieStore = cookies();
  // @ts-expect-error - iron-session types are not compatible with next/headers
  const session = await getIronSession<SessionContent>(cookieStore, sessionOptions);

  const user = session.id
    ? await prisma.user.findUnique({
        where: { id: session.id },
        select: { username: true },
      })
    : null;

  return (
    <header className="p-4 bg-neutral-900 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">Nomad X</h1>
      {user && (
        <form action={onLogoutAction}>
          <span className="mr-3">Hi, {user.username}</span>
          <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
            Logout
          </button>
        </form>
      )}
    </header>
  );
}
