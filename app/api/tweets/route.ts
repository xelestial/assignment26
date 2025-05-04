import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const name = searchParams.get('name')

  if (!name) {
    return NextResponse.json({ error: 'name is required' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { name },
    include: {
      tweets: {
        orderBy: { createdAt: 'desc' },
        include: {
          likes: true,
          comments: true,
        },
      },
    },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  return NextResponse.json(user.tweets)
}
