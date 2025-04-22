// app/page.tsx
'use client';

import LoginForm from '@/components/LoginForm';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
