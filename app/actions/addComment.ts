'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function addComment(formData: FormData) {
  const tweetId = formData.get('tweetId') as string
  const userId = Number(formData.get('userId'))
  const content = formData.get('content') as string

  await prisma.comment.create({
    data: {
      content,
      userId,
      tweetId: Number(tweetId),
    },
  })

  revalidatePath(`/tweets/${tweetId}`)
}
