import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import usePageMeta from '@/hooks/usePageMeta';
import { Container, Button } from '@/components/ui';
import { HiArrowRight } from 'react-icons/hi2';
import {
  IoCheckmarkCircle,
  IoPersonOutline,
  IoSchoolOutline,
  IoPeopleOutline,
  IoTrendingUpOutline,
  IoMedkitOutline,
  IoBulbOutline,
  IoPulseOutline,
  IoWomanOutline,
  IoHomeOutline,
  IoHeartOutline,
  IoPersonCircleOutline,
  IoMailOutline,
  IoCallOutline,
} from 'react-icons/io5';
import { GiLotus, GiMuscleUp } from 'react-icons/gi';

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

/* ===== Benefits of personal yoga training ===== */
const benefits = [
  {
    title: 'Individualized, Not Group',
    description: 'Unlike group yoga classes, personal sessions are built entirely around you.',
    icon: IoPersonOutline,
  },
  {
    title: 'Great for Beginners',
    description: 'A comfortable starting point before stepping into a group setting.',
    icon: IoSchoolOutline,
  },
  {
    title: 'One-on-One Attention',
    description: 'You get personal attention and learn directly from one experienced instructor.',
    icon: IoPeopleOutline,
  },
  {
    title: 'Deepen an Existing Practice',
    description: 'Ideal for experienced practitioners working toward specific goals like balance or stamina.',
    icon: IoTrendingUpOutline,
  },
  {
    title: 'Modified for You',
    description: 'Poses are adapted to your ability, or to accommodate injuries and disabilities.',
    icon: IoMedkitOutline,
  },
  {
    title: 'Focused on Your Goals',
    description: 'Sessions built around your personal interests, concerns, and goals.',
    icon: IoBulbOutline,
  },
  {
    title: 'Sharper Mental Focus',
    description: 'Regular practice helps build concentration and mental clarity.',
    icon: GiLotus,
  },
  {
    title: 'Supports Weight Loss & Strength',
    description: 'Highly beneficial when incorporated into a weight loss or strength training program.',
    icon: GiMuscleUp,
  },
  {
    title: 'Therapeutic Issues Addressed',
    description: 'Specific therapeutic concerns are targeted and worked through directly.',
    icon: IoPulseOutline,
  },
  {
    title: 'Pre & Post Natal Yoga',
    description: 'A personal trainer makes pre- and post-natal sessions safer and more effective.',
    icon: IoWomanOutline,
  },
];

/* ===== Occasions for home yoga ===== */
const occasions = [
  { title: 'Personal Yoga Class', icon: IoPersonOutline },
  { title: 'Family Yoga Class', icon: IoHomeOutline },
  { title: 'Couple Yoga Class', icon: IoHeartOutline },
  { title: 'Senior Citizen', icon: IoPersonCircleOutline },
];

/* ===== What each class includes ===== */
const classIncludes = [
  'Stretching / Flexibility / Strength / Weight Loss',
  'Asana Practice (Hatha, Ashtanga & Vinyasa Flow)',
  'Shatkriya',
  'Pranayam',
  'Meditation',
  'Yog Nidra',
];

/* ===== Gallery ===== */
const gallery = [
  {
    src: '/images/home-partner-boat-pose.jpg',
    alt: 'Instructor assisting a student with a partner boat pose at home',
  },
  {
    src: '/images/home-side-stretch.jpg',
    alt: 'Instructor guiding a student through a standing side stretch',
  },
  {
    src: '/images/home-downdog-adjustment.jpg',
    alt: 'Instructor adjusting a student in downward dog at home',
  },
];

export default function HomeClassesPage() {
  usePageMeta('homeClasses');

  return (
    <div data-page="home-classes">
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
              Home Classes
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="font-heading text-4xl font-semibold leading-tight text-dark md:text-5xl"
            >
              Get a Certified <span className="text-primary">Yoga Trainer</span> at Home
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed text-muted md:text-lg"
            >
              Start your journey of self-discovery and inner peace through
              personalized yoga sessions. Personal yoga classes at home give
              you individualized attention, a schedule that suits you, and
              the comfort of practicing in your own space — with privacy,
              personalized feedback, and a deeper connection to your
              practice.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* ===== Benefits ===== */}
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
              Benefits of Personal Yoga Training
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
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
                  <h3 className="font-heading text-xl font-semibold text-dark">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
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
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="aspect-[4/3] w-full object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ===== Home Yoga For Any Occasion ===== */}
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
              Home Yoga Classes For Any Occasion
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base leading-relaxed text-muted">
              The best moments in life are better with some mindfulness and
              self-care.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-2 gap-5 sm:grid-cols-4"
          >
            {occasions.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="flex flex-col items-center gap-3 rounded-[24px] border border-border bg-background p-6 text-center shadow-soft"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="text-2xl" />
                  </div>
                  <h3 className="font-heading text-sm font-semibold text-dark md:text-base">
                    {item.title}
                  </h3>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* ===== Class Includes ===== */}
      <section className="bg-background py-[100px]">
        <Container className="max-w-[700px]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-[28px] border border-border bg-white p-8 shadow-soft md:p-10"
          >
            <motion.h2
              variants={fadeUp}
              className="text-center font-heading text-2xl font-semibold text-dark md:text-3xl"
            >
              Class Includes
            </motion.h2>
            <motion.ul
              variants={fadeUp}
              className="mx-auto mt-6 grid max-w-md grid-cols-1 gap-3.5 sm:grid-cols-2"
            >
              {classIncludes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-dark/80"
                >
                  <IoCheckmarkCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </motion.ul>
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
                Bring Your Practice Home
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-muted">
                Tell us which occasion fits — personal, family, couple, or
                senior citizen — and we'll match you with the right
                instructor for your home.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
            >
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