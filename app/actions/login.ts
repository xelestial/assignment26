// /app/actions/login.ts
'use server';

import { LoginSchema } from '../../lib/loginSchema';
import type { LoginFormState } from '../types/login';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/lib/ironSession';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export async function onLoginAction(
  _prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const raw = {
    email: formData.get('email')?.toString() || '',
    password: formData.get('password')?.toString() || '',
  };

  const parsed = await LoginSchema.safeParseAsync(raw);
  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
      error: 'Invalid input',
    };
  }

  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return {
      success: false,
      fieldErrors: {},
      error: 'Invalid email or password',
    };
  }

  
  const cookieStore = cookies();
  //@ts-expect-error - iron-session types are not compatible with next/headers
  const session = await getIronSession(cookieStore, sessionOptions);
  //@ts-expect-error - iron-session types are not compatible with next/headers
  session.id = user.id;
  //@ts-expect-error - iron-session types are not compatible with next/headers
  session.username = user.username;
  await session.save();

  redirect('/profile');
}
