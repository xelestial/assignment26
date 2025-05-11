import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const SignupSchema = z
  .object({
    username: z
      .string()
      .min(1, 'Username is required')
      .max(16, 'Must be 16 characters or fewer')
      .regex(/^\S+$/, 'No spaces allowed'),
    email: z.string().email('Invalid email'),
    password: z
      .string()
      .min(8, 'At least 8 characters')
      .max(32, 'At most 32 characters')
      .regex(/[A-Za-z]/, 'Must include letters')
      .regex(/[0-9]/, 'Must include numbers')
      .regex(/[^A-Za-z0-9]/, 'Must include special characters'),
    confirmPassword: z.string(),
  })
  .superRefine(async (data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'Passwords do not match',
      });
    }

    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          { username: data.username },
          { email: data.email },
        ],
      },
      select: { username: true, email: true },
    });

    if (existing?.username === data.username) {
      ctx.addIssue({
        code: 'custom',
        path: ['username'],
        message: 'Username already taken',
      });
    }

    if (existing?.email === data.email) {
      ctx.addIssue({
        code: 'custom',
        path: ['email'],
        message: 'Email already in use',
      });
    }
  });
