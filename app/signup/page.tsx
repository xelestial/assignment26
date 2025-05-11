import SignupForm from '@/components/SignupForm';

export default function SignupPage() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="bg-darkgray shadow-md rounded-lg p-6 w-full max-w-md">
        <SignupForm />
      </div>
    </main>
  );
}