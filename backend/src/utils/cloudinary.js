import { v2 as cloudinary } from "cloudinary";
import config from "../config/config.js";

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (fileBuffer) => {
  try {
    const response = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "avatars" }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        })
        .end(fileBuffer);
    });
    console.log("response", response);
    return response;
  } catch (error) {
    throw error;
  }
};
