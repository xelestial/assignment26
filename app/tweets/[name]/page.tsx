import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function UserTweetsPage({ params }: { params: { name: string } }) {
  const user = await prisma.user.findUnique({
    where: { name: params.name },
    include: {
      tweets: {
        orderBy: { createdAt: 'desc' },
        include: {
          likes: true,
          comments: { include: { user: true } },
        },
      },
    },
  })
  if (!user) return notFound()
  
    interface Tweet {
      id: number,
      content: string,
      createdAt: string,
      likes: Array<{ id: number }>,
      comments: Array<{
        id: number,
        content: string,
        createdAt: string,
        user: { name: string }
      }>
    }
  return (
    <main className="max-w-2xl mx-auto p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">{user.name}의 트윗</h1>

      <ul className="space-y-4">
        {user.tweets.map((tweet: Tweet) => (
          <li key={tweet.id} className="border border-neutral-700 bg-neutral-800 p-4 rounded">
            <p className="text-base">{tweet.content}</p>
            <p className="text-sm text-gray-400 mt-1">
              {new Date(tweet.createdAt).toLocaleString()}
            </p>
            <div className="text-sm text-gray-500 mt-1 flex gap-4">
              <span>❤️ {tweet.likes.length} 좋아요</span>
              <span>💬 {tweet.comments.length} 댓글</span>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
