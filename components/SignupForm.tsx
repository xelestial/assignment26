'use client';

import { useFormStatus } from 'react-dom';
import { useActionState, useEffect } from 'react';
import Input from './Input';
import { signup} from '../app/actions/signUp';
import type { SignupFormState } from "../app/types/signUp"; 
import { EnvelopeIcon, UserIcon, KeyIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

const initialState: SignupFormState = {
  success: false,
  fieldErrors: {},
  error: '',
};

export default function SignupForm() {
  const [state, formAction] = useActionState<SignupFormState, FormData>(
    signup,
    initialState
  );
  const { pending } = useFormStatus();
  const router = useRouter();

  useEffect(()=>{
    if (state.success) {     
      router.push('/login');
    }
  },[state.success, router])
  return (
    <form
      action={formAction}
      className="w-full max-w-md p-6 bg-white rounded-lg shadow space-y-4 *:text-black"
    >
      <h1 className="text-2xl font-bold text-gray-600 mb-4 text-center">Sign Up</h1>

      <Input
        name="username"
        type="text"
        label="Username"
        Icon={UserIcon}
        errors={state.success === false ? state.fieldErrors?.username ?? [] : []}
      />
      <Input
        name="email"
        type="email"
        label="Email"
        Icon={EnvelopeIcon}
        errors={state.success === false ? state.fieldErrors?.email ?? [] : []}
      />
      <Input
        name="password"
        type="password"
        label="Password"
        Icon={KeyIcon}
        errors={state.success === false ? state.fieldErrors?.password ?? [] : []}
      />
      <Input
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        Icon={KeyIcon}
        errors={state.success === false ? state.fieldErrors?.confirmPassword ?? [] : []}
      />

      {state.success === false && state.error && (
        <p className="text-sm text-red-500">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className={`w-full py-2 rounded-full !text-white transition ${
          pending
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500  hover:bg-blue-600'
        }`
      }
      >
        {pending ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>
  );
}
