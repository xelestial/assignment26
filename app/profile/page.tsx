import { getUser } from '@/lib/ironSession';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="bg-darkgray shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </main>
  );
}
