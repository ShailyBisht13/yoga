import { Router } from 'express';
import { getImages, uploadImage, deleteImage } from '../controllers/galleryController.js';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../config/cloudinary.js';

const router = Router();

router.get('/', getImages); // public
router.post('/', requireAuth, upload.single('image'), uploadImage);
router.delete('/:id', requireAuth, deleteImage);

export default router;
