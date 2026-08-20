import mongoose from 'mongoose';

const galleryImageSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    imageUrl: { type: String, required: true },
    category: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model('GalleryImage', galleryImageSchema);
