import { prisma } from './prisma'

export async function getTweets() {
  return prisma.tweet.findMany({
    orderBy: { createdAt: 'desc' },
  })
}