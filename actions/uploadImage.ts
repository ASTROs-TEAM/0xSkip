'use server'
import { cloudinary } from '@/config/cloudinary';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

type UploadResponse =
  | { success: true; results: string[] } 
  | { success: false; error: UploadApiErrorResponse };

export const uploadToCloudinary = async (formData: FormData): Promise<UploadResponse> => {
  try {
    const files = formData.getAll('files') as File[];

    if (!files.length) {
      return { success: false, error: { message: 'No files received' } as UploadApiErrorResponse };
    }

    const uploadPromises = files.map(async (file) => {
      const fileBuffer = await file.arrayBuffer();
      const base64Data = Buffer.from(fileBuffer).toString('base64');
      const fileUri = `data:${file.type};base64,${base64Data}`;

      const result = await cloudinary.uploader.upload(fileUri, {
        invalidate: true,
        resource_type: 'auto',
        folder: 'event-images',
        use_filename: true
      });

      return result.secure_url; 
    });

    const results = await Promise.all(uploadPromises);

    return { success: true, results };
  } catch (error) {
    return { success: false, error: error as UploadApiErrorResponse };
  }
};
