import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui';
import { useState } from 'react';
import { Star, ExternalLink, Quote } from 'lucide-react';

/* ===== Animation variants ===== */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

/* Points to Vimoksha Yogshala's Google Maps listing, where visitors can
   tap "Write a review". Once you have your Google Business Profile's
   short review link (Business Profile > Ask for reviews > Share link),
   swap it in here for a more direct one-click experience. */
const GOOGLE_REVIEW_URL =
  'https://www.google.com/maps/search/?api=1&query=Vimoksha+Yogshala+27+Mohit+Nagar+GMS+Road+Dehradun';

const STARTER_REVIEWS = [
  {
    id: 'seed-1',
    name: 'Ananya Sharma',
    rating: 5,
    message:
      'The instructors genuinely care about how you progress. I went from a complete beginner to feeling confident in a few months.',
  },
  {
    id: 'seed-2',
    name: 'Rohit Verma',
    rating: 5,
    message:
      'Friendly staff, clean facility, and a schedule that actually works around my job. Would recommend to anyone starting out.',
  },
  {
    id: 'seed-3',
    name: 'Priya Nair',
    rating: 5,
    message:
      'Small batch sizes mean the teacher actually corrects your form. Best decision I made this year.',
  },
  {
    id: 'seed-4',
    name: 'Karan Mehta',
    rating: 4,
    message:
      'Great variety of classes and the teacher training program is genuinely thorough and well structured.',
  },
];

/* ===== Star rating input ===== */
function StarRatingInput({ value, onChange }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = (hovered || value) >= star;
        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={value === star}
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="p-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            <Star
              size={26}
              className={
                filled
                  ? 'fill-primary text-primary transition-colors'
                  : 'fill-transparent text-muted transition-colors'
              }
              strokeWidth={1.5}
            />
          </button>
        );
      })}
    </div>
  );
}

/* ===== Static star display (read-only) ===== */
function StarDisplay({ rating }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={13}
          className={star <= rating ? 'fill-primary text-primary' : 'fill-transparent text-muted'}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

/* ===== Review card ===== */
function ReviewCard({ review }) {
  return (
    <motion.div
      variants={fadeUp}
      layout
      className="flex h-full flex-col gap-2 rounded-xl border border-dark/5 bg-white p-3.5 shadow-sm"
    >
      <Quote className="h-3.5 w-3.5 text-primary/40" strokeWidth={1.5} />
      <p className="line-clamp-3 flex-1 text-xs leading-relaxed text-muted">{review.message}</p>
      <div className="flex items-center justify-between border-t border-dark/5 pt-2">
        <span className="font-heading text-xs font-semibold text-dark">{review.name}</span>
        <StarDisplay rating={review.rating} />
      </div>
    </motion.div>
  );
}

/* ===== Review submission form ===== */
function ReviewForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !message.trim() || rating === 0) {
      setError('Please add your name, a rating, and a short review before sending.');
      return;
    }

    onSubmit({
      id: `review-${Date.now()}`,
      name: name.trim(),
      rating,
      message: message.trim(),
    });

    setName('');
    setRating(0);
    setMessage('');
    setError('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-xl border border-dark/5 bg-white p-5 shadow-sm"
    >
      <div>
        <h3 className="font-heading text-xl font-semibold text-dark">Share your experience</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          Your review will appear in the list below.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="review-name" className="text-sm font-medium text-dark">
          Your name
        </label>
        <input
          id="review-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Doe"
          className="rounded-lg border border-dark/10 bg-background px-4 py-2.5 text-sm text-dark placeholder:text-muted/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-dark">Your rating</span>
        <StarRatingInput value={rating} onChange={setRating} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="review-message" className="text-sm font-medium text-dark">
          Your review
        </label>
        <textarea
          id="review-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us what stood out about your experience..."
          rows={4}
          className="resize-none rounded-lg border border-dark/10 bg-background px-4 py-2.5 text-sm text-dark placeholder:text-muted/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <AnimatePresence>
        {submitted && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-sm font-medium text-primary"
          >
            Thanks! Your review has been posted below.
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        className="mt-1 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Submit review
      </button>
    </form>
  );
}

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState(STARTER_REVIEWS);

  function handleNewReview(review) {
    setReviews((prev) => [review, ...prev]);
  }

  return (
    <section id="testimonials" className="bg-background py-[120px]">
      <Container className="max-w-[1320px]">
        {/* ===== Section Heading ===== */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto mb-12 flex max-w-[700px] flex-col items-center gap-0 text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="font-heading text-4xl font-semibold leading-tight text-dark md:text-5xl"
          >
            What Our Students
            <br />
            <span className="text-primary">Say About Us</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-[640px] text-base leading-relaxed text-muted md:text-lg"
          >
            Read what students are saying, or leave a review of your own.
          </motion.p>

          <motion.a
            variants={fadeUp}
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-dark/10 bg-white px-5 py-2.5 text-sm font-semibold text-dark shadow-sm transition-colors hover:border-primary hover:text-primary"
          >
            Leave us a review on Google
            <ExternalLink size={16} strokeWidth={2} />
          </motion.a>
        </motion.div>

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          {/* ===== Review cards (2x2 grid) ===== */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:grid-rows-2"
          >
            <AnimatePresence>
              {reviews.slice(0, 4).map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* ===== Manual review submission form ===== */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeUp}
          >
            <ReviewForm onSubmit={handleNewReview} />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}