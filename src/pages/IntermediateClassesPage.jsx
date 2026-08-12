import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import usePageMeta from '@/hooks/usePageMeta';
import { Container, Button } from '@/components/ui';
import { HiArrowRight } from 'react-icons/hi2';
import {
  IoCheckmarkCircle,
  IoTimeOutline,
  IoTrendingUpOutline,
  IoBodyOutline,
  IoBulbOutline,
  IoFlashOutline,
  IoMailOutline,
  IoCallOutline,
  IoLocationOutline,
} from 'react-icons/io5';
import { GiYinYang, GiMeditation } from 'react-icons/gi';

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

/* ===== Why move up a level ===== */
const benefits = [
  {
    title: 'Longer Holds',
    description: 'Postures are held further into the breath, building real strength and stamina instead of just form.',
    icon: IoTrendingUpOutline,
  },
  {
    title: 'Flowing Sequences',
    description: 'Poses connect through breath-led transitions rather than isolated holds, raising the pace and challenge.',
    icon: IoBodyOutline,
  },
  {
    title: 'Deeper Focus Work',
    description: 'Meditation and pranayama sessions extend, sharpening concentration alongside the physical practice.',
    icon: IoBulbOutline,
  },
  {
    title: 'Real Conditioning',
    description: 'Classes are built to leave you stronger week over week, not just more flexible.',
    icon: IoFlashOutline,
  },
];

/* ===== Styles taught at this level ===== */
const styles = [
  {
    title: 'Ashtanga & Vinyasa Yoga',
    description:
      'Flowing sequences that connect breath with movement through a continuous, more dynamic series of poses.',
    icon: GiYinYang,
  },
  {
    title: 'Chakra Yoga',
    description:
      'Physical postures, breathing, and meditation combined to work with subtler energy through the body.',
    icon: GiMeditation,
  },
];

/* ===== What each class includes ===== */
const classIncludes = [
  'Vinyasa & Ashtanga Flow',
  'Extended Pranayam',
  'Bandha & Breath Control',
  'Deeper Meditation Practice',
  'Strength-building Holds',
  'Yog Nidra',
];

/* ===== Batch timings ===== */
const batchTimings = ['7:00 – 8:00 AM', '5:00 – 6:00 PM', '7:00 – 8:00 PM'];

/* ===== Gallery ===== */
const gallery = [
  { src: '/images/home-downdog-adjustment.jpg', alt: 'Instructor guiding a student through a flowing transition' },
  { src: '/images/corporate-warrior-pose.webp', alt: 'Group holding Warrior pose through a longer flow' },
  { src: '/images/offline-warrior-pose.jpg', alt: 'Studio class deepening a standing pose' },
];

export default function IntermediateClassesPage() {
  usePageMeta('classesIntermediate');

  return (
    <div data-page="intermediate-classes">
      {/* ===== Intro ===== */}
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
              Intermediate
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="font-heading text-4xl font-semibold leading-tight text-dark md:text-5xl"
            >
              Build on the <span className="text-primary">Basics</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed text-muted md:text-lg"
            >
              Comfortable with the fundamentals and ready for more? Intermediate
              classes raise the pace with flowing sequences, longer holds, and
              deeper breathwork — building real strength session by session.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* ===== Why This Level ===== */}
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
              What Changes at This Level
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {benefits.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="group flex flex-col rounded-[24px] border border-border bg-white p-7 shadow-soft transition-shadow duration-300 hover:shadow-elevated"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                    <Icon className="text-2xl" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-dark">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* ===== Gallery ===== */}
      <section className="bg-background py-[100px]">
        <Container className="max-w-[1320px]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-3"
          >
            {gallery.map((photo) => (
              <motion.div
                key={photo.src}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="overflow-hidden rounded-[24px] shadow-soft"
              >
                <img src={photo.src} alt={photo.alt} className="aspect-[4/3] w-full object-cover" />
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ===== Styles Taught ===== */}
      <section className="bg-white py-[100px]">
        <Container className="max-w-[1100px]">
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
              Styles Taught at This Level
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            {styles.map((style) => {
              const Icon = style.icon;
              return (
                <motion.div
                  key={style.title}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="group flex flex-col rounded-[24px] border border-border bg-background p-7 shadow-soft transition-shadow duration-300 hover:shadow-elevated"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                    <Icon className="text-2xl" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-dark">{style.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{style.description}</p>
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
            <motion.div variants={fadeUp} className="rounded-[28px] border border-border bg-white p-8 shadow-soft">
              <h2 className="font-heading text-2xl font-semibold text-dark">Class Includes</h2>
              <ul className="mt-6 flex flex-col gap-3.5">
                {classIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-dark/80">
                    <IoCheckmarkCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeUp} className="rounded-[28px] border border-border bg-white p-8 shadow-soft">
              <h2 className="font-heading text-2xl font-semibold text-dark">Batch Timings</h2>
              <p className="mt-1 font-body text-xs font-semibold uppercase tracking-wider text-muted">Monday to Saturday</p>
              <ul className="mt-6 flex flex-col gap-3">
                {batchTimings.map((time) => (
                  <li key={time} className="flex items-center gap-2.5 border-b border-border/70 pb-3 text-sm font-medium text-dark/80 last:border-b-0 last:pb-0">
                    <IoTimeOutline className="h-4 w-4 shrink-0 text-primary" />
                    {time}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ===== Contact ===== */}
      <section className="bg-white py-[100px]">
        <Container className="max-w-[900px]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-[32px] border border-border bg-background p-8 shadow-soft md:p-10"
          >
            <motion.div variants={fadeUp} className="flex flex-col items-center gap-4 text-center">
              <span className="inline-block rounded-full border border-secondary/30 bg-secondary/5 px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.25em] text-secondary">
                Get In Touch
              </span>
              <h2 className="font-heading text-3xl font-semibold text-dark md:text-4xl">
                Ready to Push Your Practice?
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-muted">
                Let us know your current practice and goals, and we'll place
                you in the right intermediate batch.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:info@vimokshayogshala.in"
                className="flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 transition-colors hover:border-primary/40"
              >
                <IoMailOutline className="h-4 w-4 text-primary" />
                <span className="font-body text-sm text-dark/80">info@vimokshayogshala.in</span>
              </a>
              <a
                href="tel:+919026612796"
                className="flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 transition-colors hover:border-primary/40"
              >
                <IoCallOutline className="h-4 w-4 text-primary" />
                <span className="font-body text-sm text-dark/80">+91 9026612796</span>
              </a>
              <div className="flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2">
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