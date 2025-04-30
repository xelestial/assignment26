'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

const schema = z.object({
  content: z
    .string()
    .min(1, { message: '트윗은 최소 1자 이상이어야 합니다.' })
    .max(280, { message: '트윗은 280자 이내여야 합니다.' }),
})

export async function addTweet(
  prevState: { error: string | undefined },
  formData: FormData
): Promise<{ error: string | undefined }> {
  const result = schema.safeParse({
    content: formData.get('content'),
  })

  if (!result.success) {
    return { error: result.error.flatten().fieldErrors.content?.[0] }
  }

  await prisma.tweet.create({
    data: { content: result.data.content },
  })

  redirect('/')
}