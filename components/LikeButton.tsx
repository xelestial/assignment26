'use client'

import { useOptimistic, useTransition } from 'react'
import { toggleLike } from '@/app/actions/toggleLike'

export function LikeButton({
  tweetId,
  userId,
  initialLikesCount,
  likedByCurrentUser,
  refreshPath,
}: {
  tweetId: number
  userId: number
  initialLikesCount: number
  likedByCurrentUser: boolean
  refreshPath: string
}) {
  const [isPending, startTransition] = useTransition()

  const [optimisticCount, addOptimisticLike] = useOptimistic(
    initialLikesCount,
    (state: number, liked: boolean) => liked ? state + 1 : state - 1
  )

  return (
    <button
      disabled={isPending}
      className="text-sm text-blue-400 disabled:opacity-50"
      onClick={() => {
        startTransition(() => {
          addOptimisticLike(!likedByCurrentUser)
          toggleLike(tweetId, userId, refreshPath)
        })
      }}
    >
      ❤️ {optimisticCount} 좋아요
    </button>
  )
}
