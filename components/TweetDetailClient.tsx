'use client'

import { useOptimistic, useTransition } from 'react'
import { addLike } from '@/app/actions/addLike'

type TweetWithRelations = {
  id: number
  content: string
  createdAt: string
  likes: { id: number }[]
  comments: { id: number; content: string; createdAt: string }[]
}

export function TweetDetailClient({ tweet }: { tweet: TweetWithRelations }) {
  const [isPending, startTransition] = useTransition()
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    tweet.likes.length,
    (likes: number) => likes + 1
  )

  return (
    <article className="border border-neutral-700 bg-neutral-800 p-4 rounded-[12px] shadow text-white">
      <div>
        <p className="text-lg">{tweet.content}</p>
        <p className="text-sm text-gray-500">{new Date(tweet.createdAt).toLocaleString()}</p>
      </div>

      <button
        onClick={() => {
          addOptimisticLike(undefined)
          startTransition(() => addLike(tweet.id))
        }}
        disabled={isPending}
        className="text-sm text-blue-600 hover:underline disabled:opacity-50"
      >
        ❤️ {optimisticLikes} 좋아요
      </button>

      <section>
        <h2 className="font-semibold text-md">댓글</h2>
        <ul className="space-y-2">
          {tweet.comments.map((comment) => (
            <li key={comment.id} className="text-sm border rounded p-2">
              <p>{comment.content}</p>
              <p className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}
