import { motion } from 'framer-motion';
import { Container } from '@/components/ui';
import { Link } from 'react-router-dom';
import { IoArrowForward } from 'react-icons/io5';

// Service images — replace paths if your project stores images elsewhere
import yogaClassesImg from '@/assets/images/services/yoga-classes.jpg';
import yogaTherapyImg from '@/assets/images/services/yoga-therapy.jpg';
import acupressureImg from '@/assets/images/services/acupressure.jpg';
import cuppingImg from '@/assets/images/services/cupping-therapy.jpg';
import meditationImg from '@/assets/images/services/meditation.jpeg';
import pranayamaImg from '@/assets/images/services/pranayama.webp';

/* ───── Animation Variants (matches WhyChooseUs / ProgramsSection) ───── */
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

const services = [
  {
    title: 'Yoga Classes',
    description:
      'Traditional Hatha, Ashtanga, and Vinyasa yoga sessions for all levels to enhance flexibility, strength, and mindfulness.',
    image: yogaClassesImg,
    link: '/classes',
  },
  {
    title: 'Yoga Therapy',
    description:
      'Therapeutic yoga sessions for stress relief, anxiety management, and holistic healing of mind and body.',
    image: yogaTherapyImg,
    link: '/classes',
  },
  {
    title: 'Acupressure',
    description:
      'Ancient healing technique applying pressure to specific points to relieve pain, reduce tension, and improve circulation.',
    image: acupressureImg,
    link: '/classes',
  },
  {
    title: 'Cupping Therapy',
    description:
      'Traditional therapy using suction cups to stimulate healing, reduce pain, and improve overall wellness.',
    image: cuppingImg,
    link: '/classes',
  },
  {
    title: 'Meditation',
    description:
      'Guided meditation practices to calm the mind, reduce stress, and achieve inner peace and clarity.',
    image: meditationImg,
    link: '/classes',
  },
  {
    title: 'Pranayama',
    description:
      'Breathing exercises and techniques to enhance respiratory health, boost energy, and balance the nervous system.',
    image: pranayamaImg,
    link: '/classes',
  },
];

export default function Services() {
  return (
    <section className="bg-gradient-to-b from-primary/5 to-white py-[120px]">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto mb-16 flex max-w-2xl flex-col items-center gap-4 text-center md:mb-20"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block rounded-full border border-secondary/30 bg-secondary/5 px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.25em] text-secondary"
          >
            Our Offerings
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-heading text-4xl font-semibold leading-tight text-primary md:text-5xl"
          >
            Our Classes & Therapies
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="max-w-xl text-base leading-relaxed text-dark/70 md:text-lg"
          >
            Every practice is rooted in tradition and guided by experts who
            care about your whole wellbeing — mind, body, and breath.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group flex flex-col overflow-hidden rounded-[28px] bg-white shadow-soft transition-shadow duration-300 hover:shadow-elevated"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="h-[220px] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-heading text-2xl font-semibold text-primary">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-dark/70">
                  {service.description}
                </p>
                <Link
                  to={service.link}
                  className="mt-6 inline-flex items-center gap-2 self-start font-medium text-primary transition-all hover:gap-3"
                >
                  Learn More <IoArrowForward />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}