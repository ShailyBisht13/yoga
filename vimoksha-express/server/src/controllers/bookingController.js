import Booking from '../models/Booking.js';
import { sendBookingStatusEmail } from '../utils/mailer.js';

// Public — anyone can submit a trial booking
export async function createBooking(req, res) {
  const { name, phone, email, preferredBatch, message } = req.body;

  if (!name?.trim() || !phone?.trim()) {
    return res.status(400).json({ error: 'Name and phone are required.' });
  }

  const booking = await Booking.create({ name, phone, email, preferredBatch, message });
  res.status(201).json(booking);
}

// Admin only
export async function getBookings(req, res) {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  res.json(bookings);
}

export async function updateBookingStatus(req, res) {
  const { status } = req.body;
  if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status.' });
  }

  const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!booking) return res.status(404).json({ error: 'Booking not found.' });

  // Fire-and-forget: don't make the admin wait on the email send
  sendBookingStatusEmail(booking);

  res.json(booking);
}

export async function deleteBooking(req, res) {
  const booking = await Booking.findByIdAndDelete(req.params.id);
  if (!booking) return res.status(404).json({ error: 'Booking not found.' });
  res.json({ success: true });
}