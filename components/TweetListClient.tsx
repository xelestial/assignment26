
'use client'

import { deleteTweet } from '@/app/actions/deleteTweet'
import { useTransition } from 'react'


type Tweet = {
    id: number
    content: string
    createdAt: Date
  }


export function TweetListClient({ tweets }: { tweets: Tweet[] }) {
  const [isPending, startTransition] = useTransition()

  return (
    <ul className="mt-6 space-y-4">
      {tweets.map(tweet => (
        <li key={tweet.id} className="border p-4 rounded shadow flex justify-between items-start">
          <div>
            <p>{tweet.content}</p>
            <span className="text-sm text-gray-500 block mt-2">
              {new Date(tweet.createdAt).toLocaleString()}
            </span>
          </div>
          <form
            action={() => {
              startTransition(() => deleteTweet(tweet.id))
            }}
          >
            <button
              type="submit"
              disabled={isPending}
              className="ml-4 text-red-500 text-sm hover:underline"
            >
              {isPending ? '삭제 중...' : '삭제'}
            </button>
          </form>
        </li>
      ))}
    </ul>
  )
}
