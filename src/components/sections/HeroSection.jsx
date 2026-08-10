import { motion, useScroll, useTransform } from 'framer-motion';
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

const avatarData = [
  { bg: '#4F6F52', initials: 'AS' },
  { bg: '#A98C5A', initials: 'RV' },
  { bg: '#3D5640', initials: 'PS' },
];

/* Real batch timings — ties to the "batch" detail shown in student reviews,
   so a visitor sees the same schedule referenced twice, not two disconnected claims. */
const batches = [
  { label: 'Sunrise Batch', time: '6:00 – 7:30 AM' },
  { label: 'Evening Batch', time: '5:00 – 6:30 PM' },
];

export default function HeroSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
    >
      {/* ===== Full-bleed hero background image ===== */}
      <div className="absolute inset-0">
        <img
          src="/hero.png"
          alt="Kewalya Yogshala — Yoga and wellness sanctuary in Dehradun"
          fetchpriority="high"
          className="h-full w-full object-cover"
        />
        {/* Left-side gradient so text stays legible over any photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent" />
      </div>

      {/* Subtle parallax effect on background */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0"
      />

      {/* ===== Main container with content overlaid ===== */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1320px] flex-col items-start justify-center px-6 pt-33 pb-16 lg:pt-25">
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
            className="mb-3 inline-block rounded-full border border-[#A98C5A]/30 bg-white/80 px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-[#4F6F52] backdrop-blur-md sm:text-xs"
          >
            EST. 2015 · DEHRADUN'S TRUSTED YOGA SHALA
          </motion.span>

          {/* Heading */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            className="mb-6 font-heading font-semibold leading-[1.15] text-[#2E2E2E]"
          >
            <span className="text-[25px] md:text-[30px] lg:text-[40px]">
              Find Your Inner
              <br />
              Peace at Kewalya Yogshala
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            custom={2}
            variants={fadeUp}
            className="mb-8 max-w-[480px] text-sm leading-[1.8] text-[#555555] md:text-base"
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
                className="flex items-center gap-2 rounded-full border border-[#A98C5A]/25 bg-white/85 px-4 py-2 backdrop-blur-md"
              >
                <IoTimeOutline className="h-4 w-4 text-[#4F6F52]" />
                <span className="font-body text-xs font-medium text-[#2E2E2E]">
                  {b.label}
                </span>
                <span className="font-body text-xs text-[#777]">
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
                className="h-[56px] rounded-full px-8 text-base"
              >
                Explore Classes
              </Button>
            </motion.div>
          </motion.div>

          {/* Student Rating */}
          <motion.div
            custom={5}
            variants={fadeUp}
            className="flex items-center gap-4"
          >
            <div className="flex -space-x-3">
              {avatarData.map((a, i) => (
                <div
                  key={a.initials}
                  className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold text-white shadow-soft"
                  style={{ backgroundColor: a.bg, zIndex: 3 - i }}
                >
                  {a.initials}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm font-medium text-[#555555]">
                4.9 from 500+ students
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}