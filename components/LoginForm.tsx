'use client';

import React from "react";
import { useFormStatus } from 'react-dom';
import { onLoginAction } from '../app/login/actions'
import Input from './Input';
import { EnvelopeIcon, UserIcon, KeyIcon } from '@heroicons/react/24/outline';



type FormState = {
  success: boolean;
  error?: string;
};


export default function LoginForm() {
  const [state, formAction] = React.useActionState(onLoginAction, null);
  const { pending } = useFormStatus();

  return (
    <form
      action={formAction}
      className="w-full max-w-md p-6 bg-white rounded-lg shadow space-y-4 *: text-black"
    >
      <Input name="email" type="email" label="Email" Icon={EnvelopeIcon} errors={state?.fieldErrors?.email ?? []} />
      <Input name="username" type="text" label="Username" Icon={UserIcon} errors={state?.fieldErrors?.username ?? []}/>
      <Input name="password" type="password" label="Password" Icon={KeyIcon} errors={state?.fieldErrors?.password ?? []} />
      <button
        type="submit"
        disabled={pending}
        className={`w-full py-2 rounded-full text-white transition ${
          state?.success
            ? 'bg-green-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        { state?.success ? 'Login Success!' : "Log in"}
      </button>
    </form>
  ); 
}
