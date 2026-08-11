import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IoArrowForward, IoCheckmark } from 'react-icons/io5';
import { FaUsers } from 'react-icons/fa';
import { GiMeditation } from 'react-icons/gi';
import { PiCertificateBold } from 'react-icons/pi';
import { HiOutlineMapPin } from 'react-icons/hi2';
import heroImage from './hero1.png';

const statItems = [
  { icon: FaUsers, value: '500+', label: 'Happy Students' },
  { icon: GiMeditation, value: '6+', label: 'Years Experience' },
  { icon: PiCertificateBold, value: 'Certified', label: 'Yoga Teachers' },
  { icon: HiOutlineMapPin, value: 'Dehradun', label: 'Uttarakhand' },
];

const featurePoints = [
  'Authentic Yoga Practices Rooted in Ancient Tradition',
  'Experienced & Certified Yoga Teachers',
  'Serene Himalayan Environment for Deep Practice',
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 * i },
  }),
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export default function StatisticsAboutPreview() {
  return (
    <section className="overflow-hidden bg-background">
      <div className="mx-auto max-w-[1320px] px-6 pt-[100px] pb-[100px]">
        {/* ===== TOP: Statistics Card ===== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          whileHover={{ y: -6, boxShadow: '0 24px 60px rgba(46, 46, 46, 0.12)' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="mb-[100px] rounded-[28px] border border-[#ebe0d2]/40 bg-white p-8 shadow-soft md:p-10"
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {statItems.map((item, index) => (
              <motion.div
                key={item.label}
                custom={index}
                variants={fadeUp}
                className="group relative flex flex-col items-center text-center"
              >
                {index > 0 && (
                  <div className="absolute left-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-[#ebe0d2]/60 lg:block" />
                )}
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#9a3617]/5 text-[#9a3617] transition-all duration-300 group-hover:bg-[#9a3617] group-hover:text-white">
                  <item.icon className="h-7 w-7" />
                </div>
                <span className="font-heading text-3xl font-bold text-[#2E2E2E] md:text-4xl">
                  {item.value}
                </span>
                <span className="mt-1 text-sm font-medium tracking-wide text-[#6B6B6B]">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ===== BOTTOM: About Preview ===== */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT: Content */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Badge */}
            <motion.span
              variants={fadeUp}
              className="mb-5 inline-block rounded-full border border-[#f69116]/30 bg-[#f69116]/10 px-4 py-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f69116]"
            >
              ABOUT KEWALYA YOGSHALA
            </motion.span>

            {/* Heading */}
            <motion.h2
              variants={fadeUp}
              className="font-heading text-[2.5rem] font-semibold leading-[1.12] text-[#2E2E2E] md:text-[3.2rem]"
            >
              Transform Your Mind,
              <br />
              Body & Soul Through
              <br />
              Authentic Yoga
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="mt-6 text-base leading-[1.8] text-[#6B6B6B] md:text-lg"
            >
              Nestled in the serene beauty of Dehradun, Kewalya Yogshala offers a
              transformative yoga experience that nurtures physical vitality, mental
              clarity, and spiritual growth. Our authentic approach combines
              traditional teachings with modern wellness practices to create a truly
              holistic journey.
            </motion.p>

            {/* Feature points */}
            <motion.div variants={fadeUp} className="mt-8 space-y-4">
              {featurePoints.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#9a3617]/10 text-[#9a3617]">
                    <IoCheckmark className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-[15px] font-medium text-[#2E2E2E]">
                    {point}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Button */}
            <motion.div variants={fadeUp} className="mt-10">
              <Link
                to="/about"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#9a3617] px-8 py-3.5 font-body text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:bg-[#742711] hover:shadow-card"
              >
                Learn More
                <IoArrowForward className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT: Image with floating elements */}
          <div className="relative">
            {/* Image Container */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-[32px] shadow-soft"
            >
              <motion.img
                src={heroImage}
                alt="Kewalya Yogshala — Yoga practice in serene environment"
                loading="lazy"
                className="h-[400px] w-full object-cover md:h-[620px]"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
              />
            </motion.div>

            {/* Floating Card 1 - Top Right */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute right-4 top-4 md:right-6 md:top-6"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
                className="rounded-2xl bg-white/95 px-5 py-3 shadow-card backdrop-blur-sm"
              >
                <p className="font-heading text-2xl font-bold text-[#9a3617]">
                  500+
                </p>
                <p className="text-xs font-medium text-[#6B6B6B]">
                  Happy Students
                </p>
              </motion.div>
            </motion.div>

            {/* Floating Card 2 - Bottom Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute bottom-4 left-4 md:bottom-6 md:left-6"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 5,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  delay: 1,
                }}
                className="rounded-2xl bg-white/95 px-5 py-3 shadow-card backdrop-blur-sm"
              >
                <p className="font-heading text-2xl font-bold text-[#9a3617]">
                  6+
                </p>
                <p className="text-xs font-medium text-[#6B6B6B]">
                  Years Experience
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}