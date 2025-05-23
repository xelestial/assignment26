import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="bg-darkgray shadow-md rounded-lg p-6 w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  );
}