import { motion } from 'framer-motion';
import { Container, Button } from '@/components/ui';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi2';
import { IoTimeOutline } from 'react-icons/io5';
import { useRef } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 * i },
  }),
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const batches = [
  { label: 'Sunrise Batch', time: '6:00 – 7:30 AM' },
  { label: 'Evening Batch', time: '5:00 – 6:30 PM' },
];

/* Delicate high-contrast serif for the hero headline — matches the new
   reference screenshot's font (with italic for the accent line).
   Move this <link> to index.html if you'd rather not inject it at runtime. */
const HeadingFont = () => (
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Poppins:wght@300;400;500;600&display=swap"
  />
);

export default function HeroSection() {
  const sectionRef = useRef(null);

  return (
    <section className="relative bg-[#F3F1EC] pb-6 sm:pb-10">
      <HeadingFont />

      {/* ===== Full-width, bottom-cropped hero card — flush with the navbar
          above it (no top gap/rounding), full browser width, rounded only
          at the bottom so the image reads as "cut off" there. No dark
          overlay: the photo's own light wall gives the dark text its
          contrast, so the copy sits directly on the image. ===== */}
      <div
        ref={sectionRef}
        className="relative h-[calc(100vh-1rem)] w-full overflow-hidden rounded-b-[28px]"
      >
        <div className="absolute inset-0">
          <img
            src="/hero.png"
            alt="Vimoksha Yogshala — student meditating in a sunlit courtyard studio"
            fetchPriority="high"
            className="h-full w-full object-cover object-[70%_center]"
          />
        </div>

        {/* ===== Content overlaid on the card ===== */}
        <div className="relative z-10 flex h-full max-w-[1320px] flex-col items-start justify-center px-6 pt-36 pb-10 sm:px-10 sm:pt-40 md:px-14 md:pt-44">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="w-full max-w-[620px]"
          >
            {/* Tagline */}
            <motion.span
              custom={0}
              variants={fadeUp}
              className="mb-3 inline-block rounded-full border border-black/10 bg-white/70 px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-[#742711] backdrop-blur-md sm:text-xs"
            >
              EST. 2015 · DEHRADUN'S TRUSTED YOGA SHALA
            </motion.span>

            {/* Heading */}
            <motion.h1
              custom={1}
              variants={fadeUp}
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="mb-6 font-medium leading-[1.15] tracking-tight text-neutral-900"
            >
              <span className="text-[32px] sm:text-[36px] md:text-[42px] lg:text-[48px]">
                Find Your Inner
                <br />
                Peace at <span style={{ color: '#9a3617' }}>Vimoksha Yogshala</span>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              custom={2}
              variants={fadeUp}
              style={{ fontFamily: "'Poppins', sans-serif" }}
              className="mb-8 max-w-[480px] text-sm font-light leading-[1.8] text-neutral-600 md:text-base"
            >
              Nestled in the serene beauty of Dehradun, we've guided over 500
              students through authentic Hatha yoga, pranayama, and yoga
              therapy — taught in small batches, led by teachers who know your
              name by the second class.
            </motion.p>

            {/* Batch timings strip — concrete, checkable information beats
                another line of wellness copy */}
            <motion.div
              custom={3}
              variants={fadeUp}
              className="mb-8 flex flex-wrap gap-3"
            >
              {batches.map((b) => (
                <div
                  key={b.label}
                  className="flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 backdrop-blur-md"
                >
                  <IoTimeOutline className="h-4 w-4 text-[#F69116]" />
                  <span className="font-body text-xs font-medium text-neutral-900">
                    {b.label}
                  </span>
                  <span className="font-body text-xs text-neutral-500">
                    {b.time}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              custom={4}
              variants={fadeUp}
              className="mb-10 flex flex-wrap items-center gap-5"
            >
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                <Button
                  as={Link}
                  to="/contact"
                  variant="primary"
                  icon={<HiArrowRight className="h-4 w-4" />}
                  className="h-[56px] rounded-full px-8 text-base"
                >
                  Book Free Trial Class
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                <Button
                  as={Link}
                  to="/classes"
                  variant="outline"
                  icon={<HiArrowRight className="h-4 w-4" />}
                  className="h-[56px] rounded-full border-black/20 px-8 text-base text-neutral-900 hover:bg-black/5"
                >
                  Explore Classes
                </Button>
              </motion.div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}