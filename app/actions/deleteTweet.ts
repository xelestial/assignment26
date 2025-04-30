'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function deleteTweet(id: number) {
  await prisma.tweet.delete({
    where: { id },
  })

  revalidatePath('/')
}