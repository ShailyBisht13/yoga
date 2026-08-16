import { motion } from 'framer-motion';
import { Container, Button } from '@/components/ui';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi2';

// Program images — imports left ready for when assets are added
import hathaImg from '@/assets/images/programs/hatha.avif';
import meditationImg from '@/assets/images/programs/meditation.jpg';
import pranayamaImg from '@/assets/images/programs/pranayama.webp';
import therapyImg from '@/assets/images/programs/therapy.webp';
import kidsImg from '@/assets/images/programs/kids.webp';
import teacherTrainingImg from '@/assets/images/programs/teacher-training.jpg';

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
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

/* ===== Difficulty badge styles ===== */
const difficultyStyles = {
  Beginner: 'bg-primary/10 text-primary',
  Intermediate: 'bg-secondary/15 text-secondary',
  Advanced: 'bg-primary-dark/10 text-primary-dark',
  Therapeutic: 'bg-secondary-light/30 text-secondary',
  'All Levels': 'bg-primary/10 text-primary',
  Professional: 'bg-primary-dark/10 text-primary-dark',
};

/* ===== Program data ===== */
const programs = [
  {
    title: 'Hatha Yoga',
    description:
      'Foundational postures and gentle flows to build strength, flexibility, and inner balance.',
    duration: '60 min',
    difficulty: 'Beginner',
    image: hathaImg,
    link: '/classes',
  },
  {
    title: 'Meditation',
    description:
      'Guided mindfulness practices to calm the mind, reduce stress, and cultivate deep awareness.',
    duration: '45 min',
    difficulty: 'All Levels',
    image: meditationImg,
    link: '/classes',
  },
  {
    title: 'Pranayama',
    description:
      'Breath control techniques to energize the body, balance the nervous system, and enhance vitality.',
    duration: '30 min',
    difficulty: 'Beginner',
    image: pranayamaImg,
    link: '/classes',
  },
  {
    title: 'Yoga Therapy',
    description:
      'Therapeutic yoga tailored for healing, pain relief, and recovery from injury or illness.',
    duration: '75 min',
    difficulty: 'Therapeutic',
    image: therapyImg,
    link: '/classes',
  },
  {
    title: 'Kids Yoga',
    description:
      'Playful and engaging sessions designed to improve focus, coordination, and confidence in children.',
    duration: '45 min',
    difficulty: 'Beginner',
    image: kidsImg,
    link: '/classes',
  },
  {
    title: 'Teacher Training',
    description:
      'Comprehensive certification program to become a skilled, confident, and authentic yoga teacher.',
    duration: '200 Hours',
    difficulty: 'Professional',
    image: teacherTrainingImg,
    link: '/courses',
  },
];

export default function ProgramsSection() {
  return (
    <section
      id="programs"
      className="bg-white py-[120px]"
    >
      <Container className="max-w-[1320px]">
        {/* ===== Section Heading ===== */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto mb-10 flex max-w-2xl flex-col items-center gap-3 text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="font-heading text-xl font-semibold leading-tight text-dark md:text-2xl"
          >
            Choose Your Perfect
            <br />
            <span className="text-primary">Yoga Journey</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="max-w-xl text-xs leading-relaxed text-muted md:text-sm"
          >
            Discover a variety of yoga programs designed for beginners,
            intermediate practitioners, advanced students and therapeutic
            healing.
          </motion.p>
        </motion.div>

        {/* ===== Program Cards Grid ===== */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {programs.map((program) => (
            <motion.article
              key={program.title}
              variants={fadeUp}
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group flex flex-col overflow-hidden rounded-[20px] bg-white p-4 shadow-soft transition-shadow duration-300 hover:shadow-elevated"
            >
              {/* Image */}
              <div className="relative mb-4 overflow-hidden rounded-[14px]">
                <img
                  src={program.image}
                  alt={program.title}
                  className="h-[160px] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  loading="lazy"
                />
                {/* Difficulty badge overlay */}
                <span
                  className={`absolute left-4 top-4 rounded-full px-3 py-1 font-body text-xs font-semibold backdrop-blur-md ${
                    difficultyStyles[program.difficulty] ||
                    'bg-white/80 text-dark'
                  }`}
                >
                  {program.difficulty}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col">
                <h3 className="font-heading text-lg font-semibold text-dark transition-colors group-hover:text-primary">
                  {program.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {program.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* ===== View All Programs Button ===== */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mt-16 flex justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <Button
              as={Link}
              to="/classes"
              variant="primary"
              size="lg"
              icon={<HiArrowRight className="h-4 w-4" />}
              className="h-[56px] rounded-full px-8 text-base"
            >
              View All Programs
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}