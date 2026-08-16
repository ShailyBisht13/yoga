import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IoArrowForward, IoCheckmark } from 'react-icons/io5';
import heroImage from './hero1.png';

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
      <div className="mx-auto max-w-[1320px] px-6 pt-[60px] pb-[60px] sm:pt-[80px] sm:pb-[80px] md:pt-[100px] md:pb-[100px]">
        {/* ===== About Preview ===== */}
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
              className="font-heading text-[28px] font-semibold leading-[1.2] text-[#2E2E2E] sm:text-[34px] sm:leading-[1.15] md:text-[3.2rem] md:leading-[1.12]"
            >
              Transform Your Mind,
              <br className="hidden sm:block" />
              Body & Soul Through
              <br className="hidden sm:block" />
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
                className="h-[280px] w-full object-cover sm:h-[400px] md:h-[620px]"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}