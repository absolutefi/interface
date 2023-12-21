import { NextApiRequest, NextApiResponse } from 'next'
import { IncomingForm } from 'formidable'
import { v2 as cloudinary } from 'cloudinary'
import { v4 as uuidv4 } from 'uuid'

export const config = {
  api: {
    bodyParser: false,
  },
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data: any = await new Promise((resolve, reject) => {
      const form = new IncomingForm()

      form.parse(req, (err, fields, files) => {
        if (err) return reject(err)
        resolve({ fields, files })
      })
    })

    const file = data?.files?.file?.[0]?.filepath

    const response = await cloudinary.uploader.upload(file, {
      resource_type: 'image',
      public_id: `${uuidv4()}`,
      folder: process.env.CLOUDINARY_FOLDER,
      unique_filename: true,
    })

    res.status(200).json({ url: response.secure_url })
  } catch (error: any) {
    console.error(error)
    return res.status(500).send(error?.message)
  }
}
