import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import usePageMeta from '@/hooks/usePageMeta';
import { Container, Button } from '@/components/ui';
import { HiArrowRight } from 'react-icons/hi2';
import {
  IoCheckmarkCircle,
  IoTimeOutline,
  IoFlashOutline,
  IoTrophyOutline,
  IoRibbonOutline,
  IoSpeedometerOutline,
  IoMailOutline,
  IoCallOutline,
  IoLocationOutline,
} from 'react-icons/io5';
import { GiMuscleUp } from 'react-icons/gi';

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

/* ===== What defines this level ===== */
const benefits = [
  {
    title: 'Fast, Dynamic Flows',
    description: 'Sequences move quickly, chaining challenging postures with minimal rest between them.',
    icon: IoFlashOutline,
  },
  {
    title: 'Inversions & Backbends',
    description: 'Deeper backbends, arm balances, and inversions are practiced with an established base of strength.',
    icon: IoTrophyOutline,
  },
  {
    title: 'Minimal Cueing',
    description: 'Instructors trust your form and focus corrections on refinement, not fundamentals.',
    icon: IoRibbonOutline,
  },
  {
    title: 'Peak Conditioning',
    description: 'Built for practitioners training for stamina, competition-level flexibility, or teaching certification.',
    icon: IoSpeedometerOutline,
  },
];

/* ===== Style taught at this level ===== */
const styles = [
  {
    title: 'Power Yoga',
    description:
      'A high-intensity style inspired by Ashtanga, built to develop strength and endurance through a vigorous, fast-paced practice.',
    icon: GiMuscleUp,
  },
];

/* ===== What each class includes ===== */
const classIncludes = [
  'Advanced Asana Sequences',
  'Arm Balances & Inversions',
  'Deep Backbends',
  'High-intensity Vinyasa Flow',
  'Advanced Pranayam',
  'Teaching-level Alignment Detail',
];

/* ===== Batch timings ===== */
const batchTimings = ['5:00 – 6:00 AM', '10:00 – 11:00 AM', '6:00 – 7:00 PM'];

/* ===== Gallery ===== */
const gallery = [
  { src: '/images/offline-aerial-yoga.jpg', alt: 'Advanced student practicing aerial yoga' },
  { src: '/images/corporate-studio-group.jpg', alt: 'Group deep in an advanced sequence in the studio' },
  { src: '/images/home-partner-boat-pose.jpg', alt: 'Instructor assisting an advanced partner pose' },
];

export default function AdvanceClassesPage() {
  usePageMeta('classesAdvance');

  return (
    <div data-page="advance-classes">
      {/* ===== Intro ===== */}
      <section className="bg-background pt-[120px] pb-[60px] sm:pt-[140px] sm:pb-[80px] md:pt-[160px] md:pb-[100px]">
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
              Advance
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="font-heading text-3xl font-semibold leading-tight text-dark sm:text-4xl md:text-5xl"
            >
              Practice at Your <span className="text-primary">Peak</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed text-muted md:text-lg"
            >
              For practitioners with an established foundation. Advance
              classes move fast, go deep into backbends and inversions, and
              assume your alignment is already solid — this is where strength
              and years of practice meet.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* ===== What Defines This Level ===== */}
      <section className="bg-white py-[60px] md:py-[100px]">
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
              className="font-heading text-2xl font-semibold text-dark sm:text-3xl md:text-4xl"
            >
              What Defines This Level
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
      <section className="bg-background py-[60px] md:py-[100px]">
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

      {/* ===== Style Taught ===== */}
      <section className="bg-white py-[60px] md:py-[100px]">
        <Container className="max-w-[700px]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto mb-10 flex max-w-2xl flex-col items-center gap-4 text-center"
          >
            <motion.h2
              variants={fadeUp}
              className="font-heading text-2xl font-semibold text-dark sm:text-3xl md:text-4xl"
            >
              Style Taught at This Level
            </motion.h2>
          </motion.div>

          {styles.map((style) => {
            const Icon = style.icon;
            return (
              <motion.div
                key={style.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="flex flex-col items-center rounded-[24px] border border-border bg-background p-8 text-center shadow-soft"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="text-2xl" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-dark">{style.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{style.description}</p>
              </motion.div>
            );
          })}
        </Container>
      </section>

      {/* ===== Class Includes + Batch Timings ===== */}
      <section className="bg-background py-[60px] md:py-[100px]">
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
      <section className="bg-white py-[60px] md:py-[100px]">
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
              <h2 className="font-heading text-2xl font-semibold text-dark sm:text-3xl md:text-4xl">
                Ready to Train at This Level?
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-muted">
                Advance batches are kept small — reach out and we'll confirm
                you're ready before booking you in.
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