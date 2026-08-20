import { Router } from 'express';
import {
  createBooking,
  getBookings,
  updateBookingStatus,
  deleteBooking,
} from '../controllers/bookingController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/', createBooking); // public
router.get('/', requireAuth, getBookings);
router.patch('/:id', requireAuth, updateBookingStatus);
router.delete('/:id', requireAuth, deleteBooking);

export default router;
