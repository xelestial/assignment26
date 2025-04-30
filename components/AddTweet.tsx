'use client'

import { addTweet } from '@/app/actions/addTweet'
import { useFormStatus,  } from 'react-dom'
import { useActionState } from 'react'

const initialState = { error: undefined }

export function AddTweet() {
  const [state, formAction] = useActionState(addTweet, initialState)
  const { pending } = useFormStatus()

  return (
    <form action={formAction} className="w-full max-w-md mx-auto space-y-2">
      <textarea
        name="content"
        placeholder="What's up?"
        className="w-full p-2 border rounded-[12px]"
        disabled={pending}
      />
    {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
    <button
        type="submit"
        disabled={pending}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {pending ? '업로드 중...' : '트윗하기'}
      </button>
    </form>
  )
}


