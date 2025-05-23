// app/actions/addLike.ts
'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function addLike(tweetId: number, userId: number) {
  await prisma.like.create({
    data: { tweetId, userId},

  })

  revalidatePath(`/tweets/${tweetId}`)
}
