'use client'

import { useEffect, useState, useTransition } from 'react'
import { LikeButton } from './LikeButton'
import { useAppContext } from '@/app/context/AppContext'

type Tweet = {
  id: number
  content: string
  createdAt: string
  likes: { userId: number }[]
  comments: { content: string; createdAt: string }[]
}

export function TweetListClient({ userName }: { userName: string }) {
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [isPending, startTransition] = useTransition()
  const { userId } = useAppContext()

  useEffect(() => {
    startTransition(async () => {
      try {
        const res = await fetch(`/api/tweets?name=${userName}`)
        console.log('요청한 이름:', userName)

        if (!res.ok) {
          const msg = await res.text()
          console.error('서버 오류:', res.status, msg)
          return
        }

        const data = await res.json()
        setTweets(data)
      } catch (err) {
        console.error('fetch 에러:', err)
      }
    })
  }, [userName])

  if (userId === null) return <p className="text-white">로그인이 필요합니다.</p>

  return (
    <main className="max-w-2xl mx-auto p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">{userName}의 트윗</h1>

      <ul className="space-y-4">
        {tweets.map((tweet) => (
          <li key={tweet.id} className="border border-neutral-700 bg-neutral-800 p-4 rounded">
            <p className="text-base">{tweet.content}</p>
            <p className="text-sm text-gray-400 mt-1">
              {new Date(tweet.createdAt).toLocaleString()}
            </p>

            <div className="text-sm text-gray-500 mt-1 flex gap-4 items-center">
              <LikeButton
                tweetId={tweet.id}
                userId={userId}
                initialLikesCount={tweet.likes.length}
                likedByCurrentUser={tweet.likes.some((like) => like.userId === userId)}
                refreshPath={`/tweets/${userName}`}
              />
              <span>💬 {tweet.comments.length} 댓글</span>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
