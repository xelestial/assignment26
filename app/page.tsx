

import { AddTweet } from '@/components/AddTweet';
// import LoginForm from '@/components/LoginForm' 기존 미완성 과제 주석처리

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* <LoginForm /> */}
      <main className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">트윗 작성</h1>
        <AddTweet />
      </main>
    </div>
  );
}
