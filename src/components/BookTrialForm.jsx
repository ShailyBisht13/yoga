import { useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';

const batches = ['Sunrise (6:00 – 7:30 AM)', 'Evening (5:30 – 7:00 PM)'];

export default function BookTrialForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    preferredBatch: batches[0],
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (status.message) setStatus({ type: '', message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim()) {
      setStatus({ type: 'error', message: 'Please enter your name and phone number.' });
      return;
    }

    setSubmitting(true);
    try {
      await api.createBooking(form);
      setStatus({
        type: 'success',
        message: "You're booked! We'll confirm your slot over WhatsApp or call shortly.",
      });
      setForm({ name: '', phone: '', email: '', preferredBatch: batches[0], message: '' });
    } catch {
      setStatus({
        type: 'error',
        message: 'Something went wrong. Please try again or call us directly.',
      });
    }
    setSubmitting(false);
  };

  const inputClass =
    'w-full rounded-full border border-border bg-white px-5 py-3 text-sm text-dark placeholder-muted outline-none transition-colors duration-300 focus:border-secondary';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Your full name"
        className={inputClass}
      />
      <input
        type="tel"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone number"
        className={inputClass}
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email (optional)"
        className={inputClass}
      />
      <select
        name="preferredBatch"
        value={form.preferredBatch}
        onChange={handleChange}
        className={`${inputClass} appearance-none`}
      >
        {batches.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Anything we should know? (injuries, experience level, etc.)"
        rows={3}
        className="w-full rounded-2xl border border-border bg-white px-5 py-3 text-sm text-dark placeholder-muted outline-none transition-colors duration-300 focus:border-secondary"
      />

      <motion.button
        type="submit"
        disabled={submitting}
        whileHover={{ scale: submitting ? 1 : 1.03 }}
        whileTap={{ scale: submitting ? 1 : 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-opacity duration-300 disabled:opacity-60"
      >
        {submitting ? 'Booking…' : 'Book Free Trial'}
      </motion.button>

      {status.message && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-sm ${status.type === 'error' ? 'text-red-600' : 'text-secondary'}`}
        >
          {status.message}
        </motion.p>
      )}
    </form>
  );
}
