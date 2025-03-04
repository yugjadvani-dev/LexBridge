/**
 * Cloudinary Integration Module
 * This module provides functionality for uploading images to Cloudinary and managing uploads.
 */

import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import config from "../config";

// Initialize Cloudinary configuration immediately
(async function initCloudinary() {
  cloudinary.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret,
    secure: true,
  });
})();

/** Base folder name for all uploads in this application */
export const cloudinaryFolderName = 'lex_bridge';

/**
 * Uploads an image to Cloudinary and handles local file cleanup
 * @param file - Local file path of the image to upload
 * @returns Promise resolving to the Cloudinary URL of the uploaded image, or null if upload fails
 */
const uploadOnCloudinary = async (file: string): Promise<string | null> => {
  try {
    if (!file) return null;

    // Upload image to Cloudinary with specific folder and resource type
    const result = await cloudinary.uploader.upload(file, {
      folder: cloudinaryFolderName,
      resource_type: 'image',
    });

    console.log('✅ File uploaded to Cloudinary:', result.url);

    // Clean up local file after successful upload
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
      console.log('🗑️ Local file cleaned up:', file);
    } else {
      console.warn('⚠️ Local file not found for cleanup:', file);
    }

    return result.url;
  } catch (error) {
    console.error('❌ Error uploading to Cloudinary:', error);

    // Ensure local file cleanup even if upload fails
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
      console.log('🗑️ Local file cleaned up after error:', file);
    } else {
      console.warn('⚠️ Local file not found for cleanup:', file);
    }

    return null;
  }
};

export default uploadOnCloudinary;