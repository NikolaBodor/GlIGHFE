
import  db  from './connection.js'
import { User, UserData } from '../../models/user.js'

// export async function getAllFruits() {
//   const fruit = await db('fruit').select()
//   return fruit as Fruit[]
// }

export async function getUserById(id: number | string): Promise<User> {
  const result = await db('users').select().first().where('id', id)
  return result
}

export async function addUser(data: UserData) {
  const result = await db('user').insert(data)
  return result
}


