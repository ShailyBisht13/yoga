import { motion } from 'framer-motion';
import { Container, Button } from '@/components/ui';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiOutlineMapPin, HiOutlineCheckBadge } from 'react-icons/hi2';
import { IoLeafOutline } from 'react-icons/io5';
import { GiMeditation } from 'react-icons/gi';
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

const stats = [
  { icon: IoLeafOutline, value: '500+', label: 'Happy Students' },
  { icon: GiMeditation, value: '6+', label: 'Years Experience' },
  { icon: HiOutlineCheckBadge, value: 'Certified', label: 'Yoga Teachers' },
  { icon: HiOutlineMapPin, value: 'Dehradun', label: 'Uttarakhand, India' },
];

/* Brand primary — reused for the stat-strip accent bars and value text
   so the strip visually ties back to the CTA button above it. */
const colorPrimary = '#9a3617';

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
            className="h-full w-full object-cover object-[85%_15%] sm:object-[70%_15%]"
          />
        </div>

        {/* ===== Content overlaid on the card ===== */}
        <div className="relative z-10 flex h-full max-w-[1320px] flex-col items-start justify-center px-6 pt-44 pb-10 sm:px-10 sm:pt-48 md:px-14 md:pt-52">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="w-full max-w-[280px] sm:max-w-[620px]"
          >
            {/* Tagline */}
            <motion.span
              custom={0}
              variants={fadeUp}
              className="mb-3 inline-block whitespace-nowrap rounded-full border border-black/10 bg-white/70 px-3 py-1 font-body text-[9px] font-semibold uppercase tracking-[0.15em] text-[#742711] backdrop-blur-md sm:text-xs sm:tracking-[0.2em]"
            >
              EST. 2019 · DEHRADUN'S TRUSTED YOGSHALA
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

            {/* CTA Button */}
            <motion.div
              custom={4}
              variants={fadeUp}
              className="mb-10 flex items-center gap-3"
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
                  icon={<HiArrowRight className="h-3.5 w-3.5" />}
                  className="h-11 whitespace-nowrap rounded-full px-6 text-sm sm:h-12 sm:px-8 sm:text-base"
                >
                  Book Free Trial
                </Button>
              </motion.div>
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* ===== Stats strip — trust markers pulled from the reference
          design (500+ students, years experience, certification, and
          location), restyled with the site's serif/sans pairing and
          brand palette so it reads as one system with the hero above. ===== */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        style={{ fontFamily: "'Poppins', sans-serif" }}
        className="relative z-10 mx-auto -mt-px flex max-w-[1320px] flex-wrap items-center justify-center gap-x-10 gap-y-8 px-6 pt-10 pb-4 sm:justify-between sm:gap-y-0 sm:px-10 sm:pt-14 md:px-14"
      >
        {stats.map(({ icon: Icon, value, label }, i) => (
          <motion.div
            key={label}
            custom={i}
            variants={fadeUp}
            className="flex items-center gap-3.5 sm:gap-4"
          >
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#EAE6DA] sm:h-14 sm:w-14" style={{ color: colorPrimary }}>
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
            </span>
            <span className="flex flex-col leading-tight">
              <span
                style={{ color: colorPrimary }}
                className="font-heading text-lg font-semibold sm:text-xl"
              >
                {value}
              </span>
              <span className="text-xs font-light text-neutral-500 sm:text-sm">
                {label}
              </span>
            </span>

            {i < stats.length - 1 && (
              <span
                style={{ backgroundColor: colorPrimary }}
                className="ml-6 hidden h-8 w-[3px] flex-shrink-0 rounded-full opacity-25 sm:ml-8 sm:block lg:ml-10"
              />
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}