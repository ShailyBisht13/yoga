import { Router } from 'express';
import {
  getPublishedPosts,
  getPublishedPostBySlug,
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  uploadBlogImage,
} from '../controllers/blogController.js';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../config/cloudinary.js';

const router = Router();

// Public
router.get('/', getPublishedPosts);
router.get('/slug/:slug', getPublishedPostBySlug);

// Admin
router.get('/admin/all', requireAuth, getAllPosts);
router.post('/', requireAuth, createPost);
router.patch('/:id', requireAuth, updatePost);
router.delete('/:id', requireAuth, deletePost);
router.post('/upload-image', requireAuth, upload.single('image'), uploadBlogImage);

export default router;
