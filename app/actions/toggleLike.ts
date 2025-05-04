'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function toggleLike(tweetId: number, userId: number, path: string) {
  const existing = await prisma.like.findFirst({
    where: { tweetId, userId }
  })

  if (existing) {
    await prisma.like.delete({ where: { id: existing.id } })
  } else {
    await prisma.like.create({ data: { tweetId, userId } })
  }

  revalidatePath(path)
}
