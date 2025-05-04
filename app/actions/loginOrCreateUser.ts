'use server'

import { prisma } from '@/lib/prisma'

export async function loginOrCreateUser(name: string) {
  if (!name || typeof name !== 'string') {
    throw new Error('이름이 전달되지 않았습니다.')
  }

  const existing = await prisma.user.findUnique({
    where: { name },
  })

  if (existing) return existing

  return await prisma.user.create({
    data: { name },
  })
}
