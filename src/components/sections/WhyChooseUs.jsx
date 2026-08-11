import { motion } from 'framer-motion';
import { Container, Button } from '@/components/ui';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi2';
import {
  FaUserGraduate,
  FaLeaf,
  FaHeart,
  FaClock,
  FaHandsHelping,
} from 'react-icons/fa';
import { GiMeditation } from 'react-icons/gi';

/* ───── Animation Variants ───── */
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.12 * i },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.25 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ───── Feature Data ───── */
const features = [
  {
    title: 'Certified Yoga Experts',
    description:
      'Learn from highly trained instructors with decades of combined experience in authentic yoga traditions.',
    icon: FaUserGraduate,
  },
  {
    title: 'Personalized Yoga Programs',
    description:
      'Customized practices designed to match your unique body type, fitness level, and wellness aspirations.',
    icon: FaLeaf,
  },
  {
    title: 'Peaceful Learning Environment',
    description:
      'Immerse yourself in a serene sanctuary surrounded by nature, perfect for deep practice and inner reflection.',
    icon: GiMeditation,
  },
  {
    title: 'Holistic Wellness Approach',
    description:
      'We integrate asanas, pranayama, meditation, and yogic philosophy for complete mind-body transformation.',
    icon: FaHeart,
  },
  {
    title: 'Flexible Class Timings',
    description:
      'Early morning, daytime, and evening sessions available to fit seamlessly into your busy schedule.',
    icon: FaClock,
  },
  {
    title: 'Lifetime Learning Support',
    description:
      'Access ongoing guidance, workshops, and resources to support your yoga journey at every stage.',
    icon: FaHandsHelping,
  },
];

/* ───── Component ───── */
export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-background py-[120px]">
      {/* ─── Subtle Decorative Background ─── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Large blurred circle top-left */}
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#f9b35c]/20 blur-[120px]" />
        {/* Small blurred circle bottom-right */}
        <div className="absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-[#9a3617]/10 blur-[100px]" />
        {/* Leaf-like decorative dots */}
        <div className="absolute top-[20%] right-[8%] h-3 w-3 rounded-full bg-[#f9b35c]/30 blur-[2px]" />
        <div className="absolute top-[35%] right-[5%] h-2 w-2 rounded-full bg-[#f9b35c]/20 blur-[1px]" />
        <div className="absolute bottom-[25%] left-[6%] h-4 w-4 rounded-full bg-[#9a3617]/15 blur-[2px]" />
      </div>

      {/* ─── Header ─── */}
      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mx-auto mb-16 max-w-[700px] text-center md:mb-20"
        >
          {/* Premium Pill Badge */}
          <motion.span
            custom={0}
            variants={fadeUp}
            className="mb-5 inline-block rounded-full border border-[#f69116]/30 bg-white/80 px-5 py-1.5 font-body text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9a3617] shadow-sm backdrop-blur-md sm:text-xs"
          >
            WHY CHOOSE KEWALYA YOGSHALA
          </motion.span>

          {/* Heading */}
          <motion.h2
            custom={1}
            variants={fadeUp}
            className="font-heading text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.15] tracking-tight text-[#2E2E2E]"
          >
            Experience Authentic Yoga
            <br />
            With Expert Guidance
          </motion.h2>

          {/* Description */}
          <motion.p
            custom={2}
            variants={fadeUp}
            className="mx-auto mt-5 max-w-[580px] text-base leading-relaxed text-[#6B6B6B] md:text-lg"
          >
            Discover what makes Kewalya Yogshala a sanctuary for authentic yoga
            practice. Our dedicated team of experts provides a transformative
            experience rooted in tradition and tailored to modern needs.
          </motion.p>
        </motion.div>

        {/* ─── Feature Cards (3 across, 2 rows) ─── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="group relative flex flex-col rounded-[24px] border border-transparent bg-white p-7 shadow-[0_4px_24px_rgba(46,46,46,0.06)] transition-all duration-300 hover:border-[#9a3617]/30 hover:shadow-[0_12px_40px_rgba(46,46,46,0.10)]"
                >
                  {/* Circular Icon */}
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#f9b35c]/30 text-[#9a3617] transition-all duration-300 group-hover:rotate-6 group-hover:bg-[#f9b35c]/50">
                    <IconComponent className="text-xl" />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-xl font-semibold text-[#2E2E2E]">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6B6B6B]">
                    {feature.description}
                  </p>

                  {/* Small Arrow - bottom right */}
                  <div className="mt-4 flex items-center justify-end">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f9b35c]/20 text-[10px] text-[#9a3617] transition-all duration-300 group-hover:bg-[#9a3617] group-hover:text-white">
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 12 12"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2.5 9.5l7-7M4.5 2.5h5v5" />
                      </svg>
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ─── Bottom CTA ─── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mx-auto mt-24 max-w-[700px] text-center md:mt-28"
        >
          <motion.span
            custom={0}
            variants={fadeUp}
            className="mb-4 inline-block rounded-full border border-[#f69116]/30 bg-white/80 px-4 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9a3617] shadow-sm backdrop-blur-md sm:text-xs"
          >
            BEGIN YOUR JOURNEY
          </motion.span>

          <motion.h3
            custom={1}
            variants={fadeUp}
            className="font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.15] text-[#2E2E2E]"
          >
            Start Your Wellness Journey Today
          </motion.h3>

          <motion.p
            custom={2}
            variants={fadeUp}
            className="mx-auto mt-4 max-w-[520px] text-base leading-relaxed text-[#6B6B6B]"
          >
            Join hundreds of students improving their physical and mental
            well-being through authentic yoga.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            className="mt-8 flex justify-center"
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
                size="lg"
                icon={<HiArrowRight className="h-4 w-4" />}
                className="h-[56px] rounded-full px-9 text-base font-medium"
              >
                Book Free Trial
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}