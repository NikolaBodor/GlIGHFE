import db from './connection.js'
import { User, UserData } from '../../models/user.js'

// export async function getAllFruits() {
//   const fruit = await db('fruit').select()
//   return fruit as Fruit[]
// }

export async function getUserById(auth_id: string): Promise<User> {
  const result = await db('users').select().first().where('auth_id', auth_id)
  return result
}

export async function addUser({
  authId,
  name,
  bio,
  font,
  profilePicture,
}: UserData) {
  const result = await db('users').insert({
    auth_id: authId,
    name,
    bio,
    font,
    profile_picture: profilePicture,
  })
  return result
}

// Get basic User info for profiles
export async function getUserProfile(id: number): Promise<User> {
  const user = await db('users')
    .select('id', 'name', 'bio', 'profile_picture as profilePicture')
    .where({ id })
    .first()
  return user
}

// Retrieve all posts from User
export async function getUserPosts(id: number): Promise<Post[]> {
  const posts = await db('posts')
    .select(
      'id',
      'user_id as userId',
      'message',
      'image',
      'date_added as dateAdded',
    )
    .where('user_id', id)
    .orderBy('date_added', 'desc')
  return posts
}

// Get followers of User
export async function getFollowers(userId: number): Promise<User[]> {
  const followers = await db('followers')
    .join('users', 'followers.follower_id', 'users.id')
    .where('followers.following_id', userId)
    .select('users.id', 'users.name', 'users.profile_picture as profilePicture')
  return followers
}

// Get who User is following
export async function getFollowing(userId: number): Promise<User[]> {
  const following = await db('followers')
    .join('users', 'followers.following_id', 'users.id')
    .where('followers.follower_id', userId)
    .select('users.id', 'users.name', 'users.profile_picture as profilePicture')
  return following
}
