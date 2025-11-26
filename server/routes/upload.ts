import { Router } from 'express'
const router = Router()
import dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'

dotenv.config()

router.post('/', async (req, res, next) => {
  //   if (!req.auth?.sub) {
  //     res.sendStatus(StatusCodes.UNAUTHORIZED)
  //     return
  //   }

  try {
    const { file } = req.body

    cloudinary.config({
      cloud_name: 'dfjgv0mp6',
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    })

    const result = await cloudinary.uploader.upload(file)
    console.log(result.public_id)
    res.json(result.public_id)
  } catch (err) {
    next(err)
  }
})

export default router
