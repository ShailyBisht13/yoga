import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    excerpt: { type: String, trim: true },
    content: { type: String, trim: true },
    coverImage: { type: String, trim: true },
    author: { type: String, default: 'Vimoksha Yogshala' },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('BlogPost', blogPostSchema);
