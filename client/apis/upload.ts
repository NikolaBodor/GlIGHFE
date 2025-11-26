// import { v2 as cloudinary } from 'cloudinary'
// import dotenv from 'dotenv'
import request from 'superagent'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function addFile(file: File): Promise<number> {
  const response = await request.post(`${rootURL}/upload`).attach('image', file)
  console.log(response.body)
  return response.body
}

// dotenv.config()

// cloudinary.config({
//   cloud_name: 'dfjgv0mp6',
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true,
// })

// export async function upload(fileLocation: string) {
//   const result = await cloudinary.uploader.upload(fileLocation)
//   console.log(result.public_id)
//   return result.public_id
// }

// const url = cloudinary.url('kitten', {
//   transformation: [
//     {
//       fetch_format: 'auto',
//       quality: 'auto',
//     },
//   ],
// })

// console.log(url)
