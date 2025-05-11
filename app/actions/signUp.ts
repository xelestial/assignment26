'use server';

import { PrismaClient } from '@prisma/client';
import { SignupSchema } from '../../lib/signupSchema';
import type { SignupFormState } from "../types/signUp";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function signup(
  _prevState: SignupFormState,
  formData: FormData
): Promise<SignupFormState> {
  const raw = {
    username: formData.get('username')?.toString() || '',
    email: formData.get('email')?.toString() || '',
    password: formData.get('password')?.toString() || '',
    confirmPassword: formData.get('confirmPassword')?.toString() || '',
  };

  const parsed = await SignupSchema.safeParseAsync(raw);

  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
      error: 'Invalid input',
    };
  }

  const { username, email, password } = parsed.data;

  try {
    const hashed = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        username,
        password: hashed,
        email,
      },
    });
    return { success: true };
  } catch (err: unknown) {
    return {
      success: false,
      fieldErrors: {},
      error: 'Username or email already exists',
    };
  }
}
