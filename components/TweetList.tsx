
import { getTweets } from '@/lib/tweet'
import { TweetListClient } from './TweetListClient'

export async function TweetList() {
  const tweets = await getTweets()
  return <TweetListClient tweets={tweets} />
}
