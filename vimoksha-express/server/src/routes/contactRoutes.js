import express from 'express';
import { getContactInfo, updateContactInfo } from '../controllers/contactController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getContactInfo);
router.put('/', requireAuth, updateContactInfo);

export default router;