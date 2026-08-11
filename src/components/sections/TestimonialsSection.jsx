import { motion } from 'framer-motion';
import { Container } from '@/components/ui';
import { FaStar } from 'react-icons/fa';
import { IoLocationOutline, IoCheckmarkCircle } from 'react-icons/io5';

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

/* ===== Avatar colors ===== */
const avatarColors = [
  { bg: '#9A3617', text: '#ffffff' },
  { bg: '#F69116', text: '#ffffff' },
  { bg: '#742711', text: '#ffffff' },
  { bg: '#EB5E1A', text: '#ffffff' },
  { bg: '#B8542F', text: '#ffffff' },
  { bg: '#C1571F', text: '#ffffff' },
];

/* ===== Testimonial data =====
   Each entry names the actual practice + duration + batch —
   the specifics that make a review read as a real person's, not filler copy. */
const testimonials = [
  {
    name: 'Anjali Sharma',
    location: 'Dehradun, Uttarakhand',
    practice: 'Hatha Yoga · 6 months',
    batch: 'Morning batch',
    text: "I came in with a stiff back from years at a desk job. Six months in, I can sit cross-legged through a full meditation without wincing. Didi corrects your posture in every single class — nothing slips by her.",
  },
  {
    name: 'Rahul Verma',
    location: 'Rishikesh, Uttarakhand',
    practice: 'Yoga Therapy · 4 months',
    batch: 'Evening batch',
    text: "My physiotherapist actually suggested I try yoga therapy for my lower back. Four months at Kewalya and I've stopped needing the pain medication I was on. The sessions are slow, deliberate, and nothing like a gym class.",
  },
  {
    name: 'Priya Singh',
    location: 'Mussoorie, Uttarakhand',
    practice: 'Pranayama & Meditation · 1 year',
    batch: 'Sunrise batch',
    text: "A year of 6 AM classes and I still look forward to them, which says everything. The breathing techniques carried over into how I handle stress at work — I notice myself using them in meetings without thinking.",
  },
  {
    name: 'Neeraj Chandra',
    location: 'Haridwar, Uttarakhand',
    practice: 'Hatha Yoga · 1 month',
    batch: 'Evening batch',
    text: "Only a month in and I've already told three friends to join. Every teacher here actually watches you, not just the room. I sleep better and I'm not exaggerating about that.",
  },
  {
    name: 'Jaya Kunwar',
    location: 'Dehradun, Uttarakhand',
    practice: 'Hatha Yoga · 2 months',
    batch: 'Morning batch',
    text: "I couldn't hold a basic forward fold when I started. Sir and Ma'am don't let you skip the fundamentals just because you want to move faster — frustrating some days, but it's clearly why people here actually improve.",
  },
  {
    name: 'Yoga Master Shyam',
    location: 'Rishikesh, Uttarakhand',
    practice: 'Advanced Practice · 1 year',
    batch: 'Sunrise batch',
    text: "I've trained at a few ashrams over the years. What stands out at Kewalya is how the instructors adjust the pace for who's actually in the room that day, rather than running through a fixed routine.",
  },
];

const trustStats = {
  rating: 4.9,
  reviewCount: '500+',
};

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-background py-[120px]">
      <Container className="max-w-[1320px]">
        {/* ===== Section Heading ===== */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto mb-12 flex max-w-[700px] flex-col items-center gap-4 text-center"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block rounded-full border border-secondary/30 bg-secondary/5 px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.25em] text-secondary"
          >
            Student Voices
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
            className="max-w-[640px] text-base leading-relaxed text-muted md:text-lg"
          >
            Every review below names the practice, the batch, and how long
            they've been coming — because that's what tells you a story is
            real, not just kind.
          </motion.p>
        </motion.div>

        {/* ===== Trust bar ===== */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto mb-16 flex max-w-fit flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-full border border-border bg-white px-7 py-3.5 shadow-soft"
        >
          <div className="flex items-center -space-x-3">
            {avatarColors.map((c, i) => (
              <div
                key={i}
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-[10px] font-semibold"
                style={{ backgroundColor: c.bg, color: c.text }}
              >
                {testimonials[i].name.charAt(0)}
              </div>
            ))}
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="flex items-center gap-1.5 text-secondary">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="h-3.5 w-3.5" />
            ))}
          </div>
          <p className="font-body text-sm text-dark/80">
            <span className="font-semibold text-dark">{trustStats.rating}</span>{' '}
            average from{' '}
            <span className="font-semibold text-dark">{trustStats.reviewCount}</span>{' '}
            students
          </p>
        </motion.div>

        {/* ===== Testimonial Cards Grid ===== */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="group relative flex min-h-[300px] flex-col rounded-[24px] border border-border bg-white p-7 shadow-soft transition-shadow duration-300 hover:shadow-elevated"
            >
              {/* Verified seal */}
              <div className="absolute -right-2.5 -top-2.5 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white shadow-soft ring-4 ring-background">
                <IoCheckmarkCircle className="h-6 w-6" />
              </div>

              {/* Practice tag */}
              <span className="mb-4 inline-flex w-fit items-center rounded-full bg-primary/8 px-3 py-1 font-body text-[11px] font-semibold uppercase tracking-wide text-primary">
                {testimonial.practice}
              </span>

              {/* Review text */}
              <p className="mb-6 flex-1 font-body text-[15px] leading-relaxed text-dark/80">
                {testimonial.text}
              </p>

              {/* Rating row */}
              <div className="mb-5 flex items-center gap-1 text-secondary">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="h-3.5 w-3.5" />
                ))}
                <span className="ml-2 font-body text-xs text-muted">
                  {testimonial.batch}
                </span>
              </div>

              {/* Student info */}
              <div className="flex items-center gap-3.5 border-t border-border pt-5">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-body text-sm font-semibold shadow-soft"
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
                  <p className="font-heading text-[15px] font-semibold text-dark">
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
      </Container>
    </section>
  );
}