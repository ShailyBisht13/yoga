import GalleryImage from '../models/GalleryImage.js';
import { uploadBufferToCloudinary } from '../config/cloudinary.js';

// Public
export async function getImages(req, res) {
  const images = await GalleryImage.find().sort({ createdAt: -1 });
  res.json(images);
}

// Admin only — uploads to Cloudinary and creates the DB record in one step
export async function uploadImage(req, res) {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });

  const { title, category } = req.body;
  const result = await uploadBufferToCloudinary(req.file.buffer, 'vimoksha-yogshala/gallery');

  const image = await GalleryImage.create({
    title: title || req.file.originalname,
    category,
    imageUrl: result.secure_url,
  });

  res.status(201).json(image);
}

export async function deleteImage(req, res) {
  const image = await GalleryImage.findByIdAndDelete(req.params.id);
  if (!image) return res.status(404).json({ error: 'Image not found.' });
  res.json({ success: true });
}