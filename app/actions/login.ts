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

  // ✅ Next.js 규칙을 지킨 세션 처리
  const cookieStore = cookies();
  // @ts-ignore
  const session = await getIronSession(cookieStore, sessionOptions);
  // @ts-ignore
  session.id = user.id;
  // @ts-ignore
  session.username = user.username;
  await session.save();

  redirect('/profile'); // ✅ redirect 후 return 불필요 (stop execution)
}
