import { v2 as cloudinary } from 'cloudinary';
import DatauriParser from 'datauri/parser';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  timeout: 60000,
});

const parser = new DatauriParser();

async function uploadToCloudinary(fileBuffer, fileName) {
  return new Promise((resolve, reject) => {
    const dataUri = parser.format(path.extname(fileName).toString(), fileBuffer);
    cloudinary.uploader.upload(dataUri.content, { resource_type: 'image' }, (error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result.secure_url);
    });
  });
}

async function uploadWithRetry(fileBuffer, fileName, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await uploadToCloudinary(fileBuffer, fileName);
    } catch (error) {
      if (i === retries - 1) {
        throw error;
      }
      console.error(`Retrying Cloudinary upload... (${i + 1}/${retries})`, error);
    }
  }
}

export default cloudinary