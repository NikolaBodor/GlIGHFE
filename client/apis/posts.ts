import { Post } from '../../models/post'

const rootUrl = '/api/v1/posts'

export async function fetchAllPosts(): Promise<Post[]> {
  const res = await fetch(rootUrl)
  if (!res.ok) {
    throw new Error('Failed to fetch posts')
  }
  const { posts } = await res.json()
  return posts
}
