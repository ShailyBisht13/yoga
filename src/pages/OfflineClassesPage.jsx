import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import usePageMeta from '@/hooks/usePageMeta';
import { Container, Button } from '@/components/ui';
import { HiArrowRight } from 'react-icons/hi2';
import {
  IoCheckmarkCircle,
  IoTimeOutline,
  IoMailOutline,
  IoCallOutline,
  IoLocationOutline,
} from 'react-icons/io5';
import {
  GiLotus,
  GiWaterDrop,
  GiMuscleUp,
  GiYinYang,
  GiMeditation,
} from 'react-icons/gi';
import { FaPersonBooth } from 'react-icons/fa6';

/* ===== Animation variants ===== */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
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

/* ===== Yoga styles offered offline ===== */
const styles = [
  {
    title: 'Hatha Yoga',
    description:
      "A gentle introduction to the most basic yoga postures. It's great for beginners and focuses on physical postures, breathing techniques, and relaxation.",
    icon: GiLotus,
  },
  {
    title: 'Ashtanga & Vinyasa Yoga',
    description:
      'Known for its flowing sequences, Vinyasa connects breath with movement, moving through a continuous series of poses for a more dynamic, challenging practice.',
    icon: GiYinYang,
  },
  {
    title: 'Iyengar Yoga',
    description:
      "Focuses on precise alignment and uses props like blocks, straps, and blankets to help students perform poses correctly — ideal for a detailed, methodical approach.",
    icon: FaPersonBooth,
  },
  {
    title: 'Chakra Yoga',
    description:
      'Combines physical postures, breathing techniques, and meditation with the goal of awakening spiritual energy (Chakra), often including chanting and mantras.',
    icon: GiMeditation,
  },
  {
    title: 'Restorative Yoga',
    description:
      "Focuses on relaxation and healing through passive poses held for extended periods. It's gentle and soothing, aimed at reducing stress and restoring balance.",
    icon: GiWaterDrop,
  },
  {
    title: 'Power Yoga',
    description:
      "A high-intensity style inspired by Ashtanga, focused on building strength and endurance through a vigorous practice — great for those looking for a workout.",
    icon: GiMuscleUp,
  },
];

/* ===== What each class includes ===== */
const classIncludes = [
  'Stretching / Flexibility / Strength / Weight Loss / Health Issues',
  'Asana Practice (Hatha, Ashtanga & Vinyasa Flow)',
  'Shatkriya',
  'Pranayam',
  'Meditation',
  'Yog Nidra',
];

/* ===== Batch timings, Monday to Saturday ===== */
const batchTimings = [
  { time: '5:00 – 6:00 AM', level: 'Intermediate / Advance' },
  { time: '6:00 – 7:00 AM', level: 'Beginner' },
  { time: '7:00 – 8:00 AM', level: 'Beginner' },
  { time: '8:00 – 9:00 AM', level: 'Senior Citizen' },
  { time: '10:00 – 11:00 AM', level: 'Advance' },
  { time: '4:00 – 5:00 PM', level: 'Beginner' },
  { time: '5:00 – 6:00 PM', level: 'Beginner' },
  { time: '6:00 – 7:00 PM', level: 'Beginner' },
  { time: '7:00 – 8:00 PM', level: 'Beginner / Intermediate' },
];

/* ===== Gallery ===== */
const gallery = [
  {
    src: '/images/offline-park-session.jpeg',
    alt: 'Outdoor yoga session in the park',
  },
  {
    src: '/images/offline-studio-stretch.jpeg',
    alt: 'Studio class practicing a seated stretch',
  },
  {
    src: '/images/offline-warrior-pose.jpg',
    alt: 'Class practicing Warrior pose in the studio',
  },
  {
    src: '/images/offline-aerial-yoga.jpg',
    alt: 'Aerial yoga class using hammocks',
  },
];

export default function OfflineClassesPage() {
  usePageMeta('offlineClasses');

  return (
    <div data-page="offline-classes">
      {/* ===== Intro / Welcome ===== */}
      <section className="bg-background pt-[160px] pb-[100px]">
        <Container className="max-w-[900px]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-5 text-center"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block rounded-full border border-secondary/30 bg-secondary/5 px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.25em] text-secondary"
            >
              Offline Classes
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="font-heading text-4xl font-semibold leading-tight text-dark md:text-5xl"
            >
              Offline Yoga <span className="text-primary">Classes</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed text-muted md:text-lg"
            >
              Attending regular offline yoga classes at a yoga studio is a
              great way to deepen your practice, connect with others, and
              receive personalized attention. Our classes are designed for
              every level, from beginner to advanced.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* ===== Styles We Teach ===== */}
      <section className="bg-white py-[100px]">
        <Container className="max-w-[1320px]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto mb-14 flex max-w-2xl flex-col items-center gap-4 text-center"
          >
            <motion.h2
              variants={fadeUp}
              className="font-heading text-3xl font-semibold text-dark md:text-4xl"
            >
              Styles We Teach
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {styles.map((style) => {
              const Icon = style.icon;
              return (
                <motion.div
                  key={style.title}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="group flex flex-col rounded-[24px] border border-border bg-white p-7 shadow-soft transition-shadow duration-300 hover:shadow-elevated"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                    <Icon className="text-2xl" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-dark">
                    {style.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {style.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* ===== Class Includes + Batch Timings ===== */}
      <section className="bg-background py-[100px]">
        <Container className="max-w-[1100px]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-10 lg:grid-cols-2"
          >
            {/* Class includes */}
            <motion.div
              variants={fadeUp}
              className="rounded-[28px] border border-border bg-white p-8 shadow-soft"
            >
              <h2 className="font-heading text-2xl font-semibold text-dark">
                Class Includes
              </h2>
              <ul className="mt-6 flex flex-col gap-3.5">
                {classIncludes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-dark/80"
                  >
                    <IoCheckmarkCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Batch timings */}
            <motion.div
              variants={fadeUp}
              className="rounded-[28px] border border-border bg-white p-8 shadow-soft"
            >
              <h2 className="font-heading text-2xl font-semibold text-dark">
                Batch Timings
              </h2>
              <p className="mt-1 font-body text-xs font-semibold uppercase tracking-wider text-muted">
                Monday to Saturday
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {batchTimings.map((batch) => (
                  <li
                    key={batch.time}
                    className="flex items-center justify-between gap-3 border-b border-border/70 pb-3 last:border-b-0 last:pb-0"
                  >
                    <span className="flex items-center gap-2.5 text-sm font-medium text-dark/80">
                      <IoTimeOutline className="h-4 w-4 shrink-0 text-primary" />
                      {batch.time}
                    </span>
                    <span className="rounded-full bg-primary/8 px-3 py-1 font-body text-xs font-medium text-primary">
                      {batch.level}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ===== Gallery ===== */}
      <section className="bg-white py-[100px]">
        <Container className="max-w-[1320px]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto mb-14 flex max-w-2xl flex-col items-center gap-4 text-center"
          >
            <motion.h2
              variants={fadeUp}
              className="font-heading text-3xl font-semibold text-dark md:text-4xl"
            >
              Inside Our Classes
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base leading-relaxed text-muted">
              A look at our students practicing — outdoors, in the studio,
              and up in the air.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4"
          >
            {gallery.map((photo) => (
              <motion.div
                key={photo.src}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="overflow-hidden rounded-[20px] shadow-soft"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="aspect-[3/4] w-full object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ===== Contact ===== */}
      <section className="bg-background py-[100px]">
        <Container className="max-w-[900px]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-[32px] border border-border bg-white p-8 shadow-soft md:p-10"
          >
            <motion.div variants={fadeUp} className="flex flex-col items-center gap-4 text-center">
              <span className="inline-block rounded-full border border-secondary/30 bg-secondary/5 px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.25em] text-secondary">
                Get In Touch
              </span>
              <h2 className="font-heading text-3xl font-semibold text-dark md:text-4xl">
                Ready to Join a Class?
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-muted">
                Pick a batch that fits your schedule, or reach out and we'll
                help you find the right level to start at.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              <a
                href="mailto:info@vimokshayogshala.in"
                className="flex items-center gap-2 rounded-full border border-border px-4 py-2 transition-colors hover:border-primary/40"
              >
                <IoMailOutline className="h-4 w-4 text-primary" />
                <span className="font-body text-sm text-dark/80">info@vimokshayogshala.in</span>
              </a>
              <a
                href="tel:+919026612796"
                className="flex items-center gap-2 rounded-full border border-border px-4 py-2 transition-colors hover:border-primary/40"
              >
                <IoCallOutline className="h-4 w-4 text-primary" />
                <span className="font-body text-sm text-dark/80">+91 9026612796</span>
              </a>
              <div className="flex items-center gap-2 rounded-full border border-border px-4 py-2">
                <IoLocationOutline className="h-4 w-4 text-primary" />
                <span className="font-body text-sm text-dark/80">Dehradun, Uttarakhand</span>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 flex justify-center">
              <Button
                as={Link}
                to="/contact"
                variant="primary"
                size="lg"
                icon={<HiArrowRight className="h-4 w-4" />}
                className="h-[56px] rounded-full px-8 text-base"
              >
                Book Free Trial
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}