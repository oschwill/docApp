import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { config as cloudConfig, v2 as cloudinary } from 'cloudinary';

// Cloud conf
cloudConfig({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
  secure: true,
});

// Unser Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'docApp/docProfileImages',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    transformation: [{ with: 150, height: 150, crop: 'fill' }],
  },
});

export const profileParser = multer({ storage: storage });
export default cloudinary;
