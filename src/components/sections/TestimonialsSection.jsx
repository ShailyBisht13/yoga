import { motion } from 'framer-motion';
import { Container } from '@/components/ui';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';

/* ===== Animation variants ===== */
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

/* ===== Avatar colors ===== */
const avatarColors = [
  { bg: '#4F6F52', text: '#ffffff' },
  { bg: '#A98C5A', text: '#ffffff' },
  { bg: '#3D5640', text: '#ffffff' },
];

/* ===== Testimonial data ===== */
const testimonials = [
  {
    name: 'Anjali Sharma',
    location: 'Dehradun, Uttarakhand',
    rating: 5,
    text: 'Joining Kewalya Yogshala has transformed my physical and mental well-being. The instructors are incredibly supportive.',
  },
  {
    name: 'Rahul Verma',
    location: 'Rishikesh, Uttarakhand',
    rating: 5,
    text: 'The yoga therapy sessions helped me recover from chronic back pain. Highly recommended.',
  },
  {
    name: 'Priya Singh',
    location: 'Mussoorie, Uttarakhand',
    rating: 5,
    text: 'The peaceful environment and personalized guidance make every class a wonderful experience.',
  },
];

/* ===== Bottom statistics ===== */
const stats = [
  { value: '500+', label: 'Happy Students' },
  { value: '4.9/5', label: 'Average Rating' },
];

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="bg-white py-[120px]"
    >
      <Container className="max-w-[1320px]">
        {/* ===== Section Heading ===== */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto mb-16 flex max-w-[700px] flex-col items-center gap-4 text-center"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block rounded-full border border-secondary/30 bg-secondary/5 px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.25em] text-secondary"
          >
            Testimonials
          </motion.span>

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
            className="max-w-[700px] text-base leading-relaxed text-muted md:text-lg"
          >
            At Kewalya Yogshala, every journey is personal. Hear from our
            students about how authentic yoga practice and compassionate
            guidance have brought balance, healing, and lasting transformation
            to their lives.
          </motion.p>
        </motion.div>

        {/* ===== Testimonial Cards Grid ===== */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              variants={fadeUp}
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative flex min-h-[320px] flex-col rounded-[28px] border border-border bg-white p-8 shadow-soft transition-shadow duration-300 hover:shadow-elevated"
            >
              {/* Quotation icon */}
              <FaQuoteLeft className="absolute right-8 top-8 h-8 w-8 text-secondary/20 transition-colors duration-300 group-hover:text-secondary/40" />

              {/* 5-star rating */}
              <div className="mb-5 flex gap-1 text-secondary">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="h-4 w-4" />
                ))}
              </div>

              {/* Review text */}
              <p className="mb-6 flex-1 text-sm leading-relaxed text-dark/80">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Student info */}
              <div className="flex items-center gap-4 border-t border-border pt-5">
                {/* Circular initials avatar */}
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-body text-sm font-semibold shadow-soft"
                  style={{
                    backgroundColor: avatarColors[index % avatarColors.length].bg,
                    color: avatarColors[index % avatarColors.length].text,
                  }}
                >
                  {testimonial.name
                    .split(' ')
                    .map((n) => n.charAt(0))
                    .join('')}
                </div>
                <div>
                  <p className="font-heading text-base font-semibold text-dark">
                    {testimonial.name}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 font-body text-xs text-muted">
                    <IoLocationOutline className="h-3.5 w-3.5 text-primary" />
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* ===== Bottom Statistics ===== */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto mt-16 flex max-w-2xl flex-col items-center justify-center gap-8 rounded-[28px] border border-border bg-primary/5 p-8 sm:flex-row sm:gap-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className={`flex flex-col items-center text-center ${
                index === 0 ? 'sm:border-r sm:border-border sm:pr-16' : ''
              }`}
            >
              <span className="font-heading text-4xl font-semibold text-primary md:text-5xl">
                {stat.value}
              </span>
              <span className="mt-2 font-body text-sm font-medium uppercase tracking-[0.15em] text-muted">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}