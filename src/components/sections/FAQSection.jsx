/**
 * FAQSection — Frequently Asked Questions with animated accordion.
 *
 * TODO: Add the following image to `src/assets/images/faq/`:
 *   faq.jpg
 *
 * Once the image is placed in the folder, uncomment the import below
 * and remove the `placeholder` gradient fallback. No JSX changes needed.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui';
import { FiPlus, FiMinus } from 'react-icons/fi';

/* ===== FAQ image — uncomment when image is added ===== */
// import faqImage from '@/assets/images/faq/faq.jpg';

/* Placeholder null — used until real image is added */
const faqImage = null;

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
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ===== FAQ data ===== */
const faqs = [
  {
    question: 'Do I need prior yoga experience?',
    answer:
      'Not at all! Our classes are designed for all levels, from complete beginners to advanced practitioners. Our experienced instructors will guide you through each posture at your own pace, ensuring a safe and comfortable practice.',
  },
  {
    question: 'What should I bring to my first class?',
    answer:
      'We recommend bringing a water bottle, a small towel, and wearing comfortable, breathable clothing that allows free movement. Yoga mats and props are provided at the studio, but you are welcome to bring your own mat if you prefer.',
  },
  {
    question: 'Do you offer yoga therapy sessions?',
    answer:
      'Yes, we offer specialized yoga therapy sessions tailored for individuals dealing with specific health concerns such as back pain, stress, anxiety, joint issues, and recovery from injury. Our certified therapists create personalized plans for your healing journey.',
  },
  {
    question: 'How can I book a free trial?',
    answer:
      'Booking a free trial is easy! Simply visit our Contact page, call us directly, or use the "Book Free Trial" button on our homepage. We will schedule your complimentary session at a time that works best for you.',
  },
  {
    question: 'What are the class timings?',
    answer:
      'We offer multiple sessions throughout the day to accommodate different schedules. Morning classes start at 6:00 AM, with sessions at 7:30 AM and 9:00 AM. Evening classes are held at 4:00 PM, 5:30 PM, and 7:00 PM. Please check our schedule for detailed timings.',
  },
  {
    question: 'Do you provide teacher training certification?',
    answer:
      'Yes, we offer a comprehensive 200-hour Yoga Teacher Training Certification program accredited by Yoga Alliance. Our course covers asanas, pranayama, meditation, anatomy, teaching methodology, and philosophy to prepare you as a confident, certified yoga instructor.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="bg-[#FAF7F2] py-[120px]"
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
            FAQ
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-heading text-4xl font-semibold leading-tight text-dark md:text-5xl"
          >
            Frequently Asked
            <br />
            <span className="text-primary">Questions</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="max-w-[700px] text-base leading-relaxed text-muted md:text-lg"
          >
            Help visitors quickly find answers to the most common questions
            about yoga classes, teacher training, therapies, trial sessions,
            schedules, and memberships.
          </motion.p>
        </motion.div>

        {/* ===== Two-column layout: Image (45%) + Accordion (55%) ===== */}
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          {/* Left: Image (45%) */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="w-full lg:w-[45%]"
          >
            <div className="relative overflow-hidden rounded-[28px] shadow-elevated">
              {faqImage ? (
                <img
                  src={faqImage}
                  alt="Yoga FAQ illustration"
                  className="h-[500px] w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-[500px] w-full items-center justify-center bg-gradient-to-br from-primary/30 to-primary-dark/40">
                  <div className="text-center">
                    <span className="font-heading text-3xl text-white/70">
                      Kewalya Yogshala
                    </span>
                    <p className="mt-3 font-body text-sm text-white/50">
                      FAQ illustration will appear here
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right: Accordion (55%) */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="w-full lg:w-[55%]"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="flex flex-col gap-4"
            >
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className={`overflow-hidden rounded-[20px] border bg-white p-6 shadow-soft transition-all duration-300 ${
                    openIndex === index
                      ? 'border-primary'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {/* Question header */}
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="flex w-full items-center justify-between gap-4 text-left"
                    aria-expanded={openIndex === index}
                  >
                    <span className="font-heading text-base font-semibold text-dark md:text-lg">
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        openIndex === index
                          ? 'bg-primary text-white'
                          : 'bg-primary/10 text-primary'
                      }`}
                    >
                      {openIndex === index ? (
                        <FiMinus className="h-4 w-4" />
                      ) : (
                        <FiPlus className="h-4 w-4" />
                      )}
                    </span>
                  </button>

                  {/* Answer with animated open/close */}
                  <AnimatePresence initial={false}>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pt-4 text-sm leading-relaxed text-muted">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}