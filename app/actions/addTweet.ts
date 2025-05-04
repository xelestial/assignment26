'use server'

import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

const schema = z.object({
  content: z.string().min(1).max(280),
  userId: z.coerce.number().int().positive(),
})

export async function addTweet(
  _: { error: string | undefined },
  formData: FormData
): Promise<{ error: string | undefined }> {
  const result = schema.safeParse({
    content: formData.get('content'),
    userId: formData.get('userId'),
  })

  if (!result.success) {
    return { error: result.error.flatten().fieldErrors.content?.[0] ?? '잘못된 입력입니다.' }
  }

  const { content, userId } = result.data

  await prisma.tweet.create({
    data: {
      content,
      userId,
    },
  })

  revalidatePath('/')
  return { error: undefined }
}
