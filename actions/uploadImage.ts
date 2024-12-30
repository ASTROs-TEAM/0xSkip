'use server'

import { cloudinary } from '@/config/cloudinary'
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary'

type UploadResponse =
  | { success: true; result?: UploadApiResponse }
  | { success: false; error: UploadApiErrorResponse }

export const uploadToCloudinary = async (
  fileName: string,
  formData: FormData
): Promise<UploadResponse> => {
  const file = formData.get('file') as File

  const fileBuffer = await file.arrayBuffer()

  const mimeType = file.type
  const encoding = 'base64'
  const base64Data = Buffer.from(fileBuffer).toString('base64')

  // this will be used to upload the file to cloudinary
  const fileUri = 'data:' + mimeType + ';' + encoding + ',' + base64Data

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(fileUri, {
        invalidate: true,
        resource_type: 'auto',
        filename_override: fileName,
        folder: 'event-images',
        use_filename: true
      })
      .then((result) => {
        resolve({ success: true, result })
      })
      .catch((error) => {
        reject({ success: false, error })
      })
  })
}
