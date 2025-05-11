'use client'

import { useAppContext } from '@/app/context/AppContext'
import { addTweet } from '@/app/actions/addTweet'
import { useTransition, useState } from 'react'

export function AddTweet() {
  const { userId } = useAppContext()
  const [content, setContent] = useState('')
  const [error, setError] = useState<string | undefined>()
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userId) return alert('로그인이 필요합니다.')

    const formData = new FormData()
    formData.append('content', content)
    formData.append('userId', String(userId))

    startTransition(async () => {
      const result = await addTweet({ error: undefined }, formData)
      if (result.error) {
        setError(result.error)
      } else {
        setError(undefined)
        setContent('')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-2">
      <textarea
        name="content"
        placeholder="What's up?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full bg-neutral-800 text-white border border-neutral-600 p-4 rounded"
        disabled={isPending}
      />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isPending ? 'Uploading...' : 'Tweet!'}
      </button>
    </form>
  )
}
