import BlogPost from '../models/BlogPost.js';
import { uploadBufferToCloudinary } from '../config/cloudinary.js';

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

// Public — only published posts
export async function getPublishedPosts(req, res) {
  const posts = await BlogPost.find({ published: true })
    .select('title slug excerpt coverImage author createdAt')
    .sort({ createdAt: -1 });
  res.json(posts);
}

export async function getPublishedPostBySlug(req, res) {
  const post = await BlogPost.findOne({ slug: req.params.slug, published: true });
  if (!post) return res.status(404).json({ error: 'Post not found.' });
  res.json(post);
}

// Admin only
export async function getAllPosts(req, res) {
  const posts = await BlogPost.find().sort({ createdAt: -1 });
  res.json(posts);
}

export async function createPost(req, res) {
  const { title, slug, excerpt, content, published, coverImage } = req.body;

  if (!title?.trim()) {
    return res.status(400).json({ error: 'Title is required.' });
  }

  const finalSlug = slug?.trim() ? slugify(slug) : slugify(title);

  const exists = await BlogPost.findOne({ slug: finalSlug });
  if (exists) {
    return res.status(409).json({ error: 'A post with this slug already exists.' });
  }

  const post = await BlogPost.create({
    title,
    slug: finalSlug,
    excerpt,
    content,
    coverImage,
    published: !!published,
  });

  res.status(201).json(post);
}

export async function updatePost(req, res) {
  const { title, slug, excerpt, content, published, coverImage } = req.body;
  const update = { title, excerpt, content, published: !!published };

  if (coverImage !== undefined) update.coverImage = coverImage;
  if (slug?.trim()) update.slug = slugify(slug);

  const post = await BlogPost.findByIdAndUpdate(req.params.id, update, { new: true });
  if (!post) return res.status(404).json({ error: 'Post not found.' });
  res.json(post);
}

export async function deletePost(req, res) {
  const post = await BlogPost.findByIdAndDelete(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found.' });
  res.json({ success: true });
}

// Admin only — uploads a cover image to Cloudinary and returns its URL
export async function uploadBlogImage(req, res) {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });
  const result = await uploadBufferToCloudinary(req.file.buffer, 'vimoksha-yogshala/blog');
  res.json({ url: result.secure_url });
}