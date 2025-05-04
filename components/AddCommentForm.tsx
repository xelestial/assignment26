'use client'

import { useState, useTransition } from 'react'
import { addComment } from '@/app/actions/addComment'
import { useAppContext } from '@/app/context/AppContext'

export function AddCommentForm({ tweetId }: { tweetId: number }) {
  const [content, setContent] = useState('')
  const [isPending, startTransition] = useTransition()
  const { userId } = useAppContext()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userId) return alert('로그인 필요')

    const formData = new FormData()
    formData.append('tweetId', String(tweetId))
    formData.append('userId', String(userId))
    formData.append('content', content)

    startTransition(async () => {
      await addComment(formData)
      setContent('')
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full bg-neutral-800 text-white border border-neutral-600 p-2 rounded"
        placeholder="댓글을 입력하세요"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={isPending}
      >
        {isPending ? '등록 중...' : '댓글 작성'}
      </button>
    </form>
  )
}
