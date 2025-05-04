'use client'

import { useParams } from 'next/navigation'
import { TweetListClient } from './TweetListClient'

export function TweetListClientWrapper() {
  const params = useParams()
  const userName = params.name as string

  if (!userName) return <p>유저명을 찾을 수 없습니다.</p>

  return <TweetListClient userName={userName} />
}
