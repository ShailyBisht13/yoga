import express from 'express';
import { upload } from '../config/cloudinary.js';
import {
  getAllSiteContent,
  getSiteContentSection,
  updateSiteContentSection,
  uploadContentImage,
} from '../controllers/contentController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllSiteContent);
router.get('/:section', getSiteContentSection);
router.patch('/:section', requireAuth, updateSiteContentSection);
router.post('/upload-image', requireAuth, upload.single('image'), uploadContentImage);

export default router;