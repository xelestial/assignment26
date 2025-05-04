'use client'

import { useAppContext } from '@/app/context/AppContext'
import { toggleLike } from '@/app/actions/toggleLike'
import { useOptimistic, useTransition } from 'react'

type Props = {
  tweetId: number
  likedByCurrentUser: boolean
  initialLikesCount: number
  refreshPath: string
}

export function LikeButton({ tweetId, likedByCurrentUser, initialLikesCount, refreshPath }: Props) {
  const { userId } = useAppContext()
  const [isPending, startTransition] = useTransition()
  const [optimisticState, toggleOptimistic] = useOptimistic(
    { count: initialLikesCount, liked: likedByCurrentUser },
    (prev) => ({
      count: prev.count + (prev.liked ? -1 : 1),
      liked: !prev.liked,
    })
  )

  const handleClick = () => {
    if (!userId) return alert('로그인이 필요합니다')

    toggleOptimistic(false)
    startTransition(() => toggleLike(tweetId, userId))
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`text-sm pointer-cursor ${optimisticState.liked ? 'text-red-500' : 'text-gray-400'} hover:underline disabled:opacity-50`}
    >
      ❤️ {optimisticState.count}
    </button>
  )
}
