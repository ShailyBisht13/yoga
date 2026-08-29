/**
 * FAQSection â€” Frequently Asked Questions with animated accordion.
 *
 * The photo and the question/answer list are both admin-editable from
 * Site Content > FAQ. Until the admin edits them, this falls back to the
 * hardcoded copy below â€” see `faqFallback`.
 *
 * TODO: Add the image to `src/assets/images/faq/faq.jpg`.
 * Once it's added, uncomment the import below and remove the
 * `placeholder` gradient fallback. No other JSX changes needed.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { IoCheckmarkCircle, IoLogoWhatsapp } from 'react-icons/io5';
import useSiteContent from '@/hooks/useSiteContent';

/* ===== FAQ image â€” uncomment when image is added ===== */
// import faqImage from '@/assets/images/faq/faq.jpg';

/* Placeholder null â€” used until real image is added */
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

/* ===== Fallback FAQ data â€” shown until the admin edits this section.
   Class timings here match the batch schedule shown in the hero section â€”
   keep these two in sync if either changes (in the admin FAQ tab). ===== */
const faqItems = [
  {
    title: 'Do I need prior yoga experience?',
    description:
      'No prior experience is required. Every new student begins with the same foundational sequence for the first two weeks, regardless of age or fitness level, before progressing to a faster-paced batch.',
  },
  {
    title: 'What should I bring to my first class?',
    description:
      'Please bring water and comfortable clothing suitable for movement. Mats, blocks, and straps are provided free of charge. If you own a mat, you are welcome to bring your own, as floor space is assigned by mat to help you retain the same spot each class.',
  },
  {
    title: 'Do you offer yoga therapy sessions?',
    description:
      'Yes. Our therapy track is separate from regular batches and is designed for specific concerns such as chronic back pain, post-injury recovery, stress, and joint issues. Each program begins with a one-on-one assessment so the plan is tailored to your individual needs.',
  },
  {
    title: 'How can I book a free trial?',
    description:
      'Please call or send a WhatsApp message to the number provided below, or use the "Book Free Trial" button on the homepage. We will confirm a batch and time on the same day, and no advance payment is required for the trial class.',
  },
  {
    title: 'What are the class timings?',
    description:
      'The sunrise batch runs from 6:00 AM to 7:30 AM, and the evening batch runs from 5:00 PM to 6:30 PM, daily except Sundays. Batches are limited to 12 students, so we recommend confirming your spot at least a day in advance.',
  },
  {
    title: 'Do you provide teacher training certification?',
    description:
      'Yes, we offer a 200-hour Yoga Alliance-certified teacher training program, conducted twice a year. The curriculum covers asana, pranayama, meditation, anatomy, and teaching practice. Batch sizes are limited and priority is given to existing students; please speak with us in class if you are interested.',
  },
];

const faqFallback = {
  heading: '',
  subheading: '',
  description: '',
  image: '',
  features: [],
  items: faqItems,
};

export default function FAQSection() {
  const { content } = useSiteContent('faq', faqFallback);
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const photo = content.image || faqImage;

  return (
    <section
      id="faq"
      className="bg-background py-[120px]"
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
            Please review the questions we hear most frequently from students prior to their first
            class. If your question is not listed here, kindly call or message us on WhatsApp directly.
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
            className="relative w-full lg:w-[45%]"
          >
            <div className="relative overflow-hidden rounded-[28px] shadow-elevated">
              {photo ? (
                <img
                  src={photo}
                  alt="Students practicing at Vimoksha Yogshala"
                  className="h-[500px] w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-[500px] w-full items-center justify-center bg-gradient-to-br from-primary/30 to-primary-dark/40">
                  <div className="text-center">
                    <span className="font-heading text-3xl text-white/70">
                      Vimoksha Yogshala
                    </span>
                    <p className="mt-3 font-body text-sm text-white/50">
                      FAQ photo will appear here
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Same verified mark used across the site, tying this photo
                back to the studio rather than reading as stock art */}
            <div className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-2xl border border-border bg-white px-5 py-4 shadow-elevated">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                <IoCheckmarkCircle className="h-6 w-6" />
              </div>
              <div>
                <p className="font-heading text-sm font-semibold text-dark">
                  Small Batches
                </p>
                <p className="font-body text-xs text-muted">
                  Max 12 students per class
                </p>
              </div>
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
              {content.items.map((faq, index) => (
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
                      {faq.title}
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
                          {faq.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>

            {/* Still-have-a-question fallback â€” a real channel, not a dead end */}
            <motion.a
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              href="https://wa.me/917351317975"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center justify-between gap-4 rounded-[20px] border border-primary/20 bg-primary/5 p-5 transition-colors hover:bg-primary/10"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                  <IoLogoWhatsapp className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold text-dark">
                    Still have a question?
                  </p>
                  <p className="font-body text-xs text-muted">
                    Message us on WhatsApp; we typically respond within the hour.
                  </p>
                </div>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
