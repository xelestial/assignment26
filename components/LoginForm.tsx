'use client';

import React from "react";
import { useFormStatus } from 'react-dom';
import { onLoginAction } from '../app/actions/login'
import Input from './Input';
import { EnvelopeIcon, KeyIcon } from '@heroicons/react/24/outline';
import Link from "next/link";
import type { LoginFormState } from "@/app/types/login";
import { useRouter } from "next/navigation";

const initialState: LoginFormState = {
  success: false,
  fieldErrors: {},
  error: '',
};

export default function LoginForm() {
  const [state, formAction] = React.useActionState<LoginFormState, FormData>(onLoginAction, initialState);
  const { pending } = useFormStatus();
  const router = useRouter();
  React.useEffect(() => {
    if (state.success) {
      router.push('/'); // Redirect to the home page or any other page after successful login   
    }
  }, [state.success, router]);
  return (
    <>
    <form
      action={formAction}
      className="w-full max-w-md p-6 bg-white rounded-lg shadow space-y-4 *: text-black"
    > 
          <h1 className="text-2xl font-bold text-gray-600 mb-4 text-center">Login</h1>
      <Input name="email" type="email" label="Email" Icon={EnvelopeIcon} 
        errors={state?.success === false ? state.fieldErrors?.email ?? [] : []} />
      <Input name="password" type="password" label="Password" Icon={KeyIcon} 
        errors={state.success === false ? state.fieldErrors?.password ?? []:[]} />
      <div>
        <span className="text-red-500 text-sm"> 
          {state.success === false && state.error === "false" ? "INVALID ID OR PASSWORD" : null } </span>
      </div>
      <button
        type="submit"
        disabled={pending}
        className={`w-full py-2 rounded-full text-white transition ${
          pending
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {pending ? 'Logging in...' : 'Log in'}
      </button>
      <div>
        <Link href="/signup" className="text-blue-500 hover:underline">
        <span className="text-nuetral-500 text-sm"> Sign Up </span>
        </Link>
      </div>
    </form>
    
  </>
  ); 
}
