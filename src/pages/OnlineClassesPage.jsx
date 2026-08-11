import usePageMeta from '@/hooks/usePageMeta';
import { Container, Button } from '@/components/ui';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi2';
import {
  IoSchoolOutline,
  IoTimeOutline,
  IoBodyOutline,
  IoHeartOutline,
  IoPricetagOutline,
  IoVideocamOutline,
  IoSparklesOutline,
  IoLeafOutline,
  IoShieldCheckmarkOutline,
  IoFlashOutline,
  IoMailOutline,
  IoCalendarOutline,
  IoLocationOutline,
} from 'react-icons/io5';

/* ===== Animation variants (matches AboutPage.jsx) ===== */
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

/* ===== Why choose us ===== */
const reasons = [
  {
    title: 'Certified Instructors',
    description:
      'Asanas, Pranayama, Shatkriya, Yoga Nidra and Meditation, taught live by certified tutors for every level.',
    icon: IoSchoolOutline,
  },
  {
    title: 'Flexible Timings',
    description:
      'Morning, afternoon, or evening — choose the slot that fits your day, not the other way around.',
    icon: IoTimeOutline,
  },
  {
    title: 'Every Style, One Studio',
    description:
      'Hatha Yoga, Ashtanga Vinyasa, Iyengar Yoga and Chakra Yoga, taught with the same depth as in person.',
    icon: IoBodyOutline,
  },
  {
    title: 'Personalised Programs',
    description:
      'Your tutor adjusts pace, posture and focus to your fitness level and goals, session by session.',
    icon: IoHeartOutline,
  },
  {
    title: 'Honest Pricing',
    description:
      'We believe yoga should be within reach, so quality instruction never comes with an inflated price tag.',
    icon: IoPricetagOutline,
  },
  {
    title: 'Live, Not Recorded',
    description:
      "No pre-recorded playlists. You're seen, corrected and coached in the moment, every session.",
    icon: IoVideocamOutline,
  },
];

/* ===== Inside a class ===== */
const classSteps = [
  {
    title: 'Live, two-way sessions',
    description:
      'Your tutor sees your form and corrects it in real time, just like they would on the studio floor.',
  },
  {
    title: 'Step-by-step guidance',
    description:
      "Postures, breathing techniques and meditation practices are broken down so they're safe and effective from day one.",
  },
  {
    title: 'A real focus on breath',
    description:
      'Pranayama and meditation sit alongside the physical practice, calming the mind and building lung capacity over time.',
  },
];

/* ===== Benefits ===== */
const benefits = [
  { title: 'Flexibility & strength', description: 'Steadier posture, looser joints', icon: IoBodyOutline },
  { title: 'Mental clarity', description: 'Sharper focus that carries past the mat', icon: IoSparklesOutline },
  { title: 'Less stress', description: 'Breathwork that quiets a busy mind', icon: IoLeafOutline },
  { title: 'Stronger immunity', description: 'A body better equipped to recover', icon: IoShieldCheckmarkOutline },
  { title: 'More energy', description: 'Steadier stamina through the day', icon: IoFlashOutline },
];

/* ===== Who can join ===== */
const startingOut = ['Just starting your first practice', 'Sharpening an existing one', 'Building mobility as a senior'];
const lookingTo = ['Manage stress & anxiety', 'Train strength & range', 'Recover from injury, medically guided'];

/* ===== How to join ===== */
const joinSteps = [
  { number: '1', title: 'Choose your program', description: 'Daily sessions, weekend batches, or a fully customised plan.' },
  { number: '2', title: 'Register online', description: "We'll help match you with the right plan and schedule." },
  { number: '3', title: 'Attend live sessions', description: 'Get your class link and meet your tutor for guided practice.' },
  { number: '4', title: 'Keep showing up', description: 'Consistency is where the change happens.' },
];

export default function OnlineClassesPage() {
  usePageMeta('online-classes');

  return (
    <div data-page="online-classes">
      {/* ===== Hero ===== */}
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
              Online · Dehradun
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="font-heading text-4xl font-semibold leading-tight text-dark md:text-5xl"
            >
              Welcome to <span className="text-primary">Vimoksha Yogshala</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed text-muted md:text-lg"
            >
              Your sanctuary for holistic wellness, now live online. Certified
              instructors guide you through Hatha, Ashtanga, Vinyasa Flow,
              Pranayama and Meditation — from wherever you call home.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-2 flex flex-wrap justify-center gap-4">
              <Button
                as={Link}
                to="/contact"
                variant="primary"
                size="lg"
                icon={<HiArrowRight className="h-4 w-4" />}
                className="h-[52px] rounded-full px-8 text-base"
              >
                Start Your Yoga Journey
              </Button>
              <Button
                as="a"
                href="#why"
                variant="outline"
                size="lg"
                className="h-[52px] rounded-full px-8 text-base"
              >
                See How Classes Work
              </Button>
            </motion.div>
          </motion.div>

          {/* Image collage */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="relative mx-auto mt-16 grid max-w-[1000px] grid-cols-1 items-end gap-5 sm:grid-cols-[1.3fr_1fr]"
          >
            <div
              aria-hidden="true"
              className="absolute -left-10 -top-16 -z-10 h-[340px] w-[340px] rounded-full border border-primary/15"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-12 -right-8 -z-10 h-[220px] w-[220px] rounded-full border border-secondary/20"
            />
            <img
              src="/images/online-class-1.jpg"
              alt="Student practicing yoga at home during a live online class"
              className="h-[280px] w-full rounded-[32px] object-cover shadow-elevated sm:h-[380px]"
            />
            <img
              src="/images/online-class-2.jpg"
              alt="Student in upward-facing dog pose beside a laptop"
              className="h-[240px] w-full rounded-[32px] object-cover shadow-elevated sm:h-[300px]"
            />
          </motion.div>
        </Container>
      </section>

      {/* ===== What We Offer ===== */}
      <section id="why" className="bg-white py-[100px]">
        <Container className="max-w-[1320px]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto mb-14 flex max-w-2xl flex-col items-center gap-4 text-center"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block rounded-full border border-secondary/30 bg-secondary/5 px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.25em] text-secondary"
            >
              What We Offer
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-heading text-3xl font-semibold text-dark md:text-4xl"
            >
              A practice built around you.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base leading-relaxed text-muted md:text-lg">
              Every class is designed to meet your goals, your pace, and your schedule.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <motion.div
                  key={reason.title}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="group flex flex-col rounded-[24px] border border-border bg-white p-7 shadow-soft transition-shadow duration-300 hover:shadow-elevated"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                    <Icon className="text-2xl" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-dark">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {reason.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* ===== Inside a Class ===== */}
      <section className="bg-background py-[100px]">
        <Container className="max-w-[1160px]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto mb-14 flex max-w-2xl flex-col items-center gap-4 text-center"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block rounded-full border border-secondary/30 bg-secondary/5 px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.25em] text-secondary"
            >
              Inside a Class
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-heading text-3xl font-semibold text-dark md:text-4xl"
            >
              What to expect once you press join.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base leading-relaxed text-muted md:text-lg">
              A link lands in your inbox before your scheduled time — Google
              Meet or WhatsApp video. You roll out your mat, and class begins.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 items-center gap-14 md:grid-cols-2"
          >
            <motion.div variants={fadeUp} className="relative">
              <img
                src="/images/online-class-3.jpg"
                alt="Gallery of students joining a live online yoga class together"
                className="h-[320px] w-full rounded-[32px] object-cover shadow-elevated sm:h-[440px]"
              />
              <div className="absolute -bottom-5 left-6 flex items-center gap-2 rounded-full border border-border bg-white px-5 py-3 shadow-card">
                <span className="h-2 w-2 animate-pulse rounded-full bg-secondary" />
                <span className="font-body text-sm font-semibold text-dark">
                  Live class in session
                </span>
              </div>
            </motion.div>

            <ul className="flex flex-col gap-7">
              {classSteps.map((step, i) => (
                <motion.li key={step.title} variants={fadeUp} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary/10 font-heading text-lg font-bold text-secondary">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-dark">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {step.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </Container>
      </section>

      {/* ===== Benefits ===== */}
      <section className="bg-white py-[100px]">
        <Container className="max-w-[1160px]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto mb-14 flex max-w-2xl flex-col items-center gap-4 text-center"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block rounded-full border border-secondary/30 bg-secondary/5 px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.25em] text-secondary"
            >
              What You'll Notice
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-heading text-3xl font-semibold text-dark md:text-4xl"
            >
              Change that builds, session by session.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base leading-relaxed text-muted md:text-lg">
              Consistency shows up gradually — here's what regular practice tends to bring.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
          >
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  variants={fadeUp}
                  className="flex flex-col items-center rounded-[20px] border border-border bg-background p-6 text-center shadow-soft"
                >
                  <div className="mb-3.5 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="text-lg" />
                  </div>
                  <h4 className="font-heading text-base font-semibold text-dark">
                    {benefit.title}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* ===== Who Can Join ===== */}
      <section className="bg-background py-[100px]">
        <Container className="max-w-[900px]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col items-center gap-10 text-center"
          >
            <motion.div variants={fadeUp} className="flex flex-col items-center gap-4">
              <span className="inline-block rounded-full border border-secondary/30 bg-secondary/5 px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.25em] text-secondary">
                Who Practices With Us
              </span>
              <h2 className="font-heading text-3xl font-semibold text-dark md:text-4xl">
                Wherever you're starting from, there's a place on the mat.
              </h2>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-2.5">
              <p className="font-body text-xs font-semibold uppercase tracking-wider text-muted">
                This Is For You If You're
              </p>
              <div className="flex flex-wrap justify-center gap-2.5">
                {startingOut.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-4 py-1.5 font-body text-sm font-medium text-primary"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-2.5">
              <p className="font-body text-xs font-semibold uppercase tracking-wider text-muted">
                Or You're Looking To
              </p>
              <div className="flex flex-wrap justify-center gap-2.5">
                {lookingTo.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full border border-secondary/30 bg-secondary/5 px-4 py-1.5 font-body text-sm font-medium text-secondary"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ===== How to Join ===== */}
      <section className="bg-white py-[100px]">
        <Container className="max-w-[1160px]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto mb-14 flex max-w-2xl flex-col items-center gap-4 text-center"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block rounded-full border border-secondary/30 bg-secondary/5 px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.25em] text-secondary"
            >
              How to Join
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-heading text-3xl font-semibold text-dark md:text-4xl"
            >
              Four steps between here and your first class.
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {joinSteps.map((step) => (
              <motion.div
                key={step.number}
                variants={fadeUp}
                className="rounded-[24px] border border-border bg-background p-6"
              >
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary font-heading text-base font-bold text-white">
                  {step.number}
                </span>
                <h3 className="font-heading text-lg font-semibold text-dark">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ===== Contact card ===== */}
      <section className="bg-background py-[100px]">
        <Container className="max-w-[900px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="rounded-[32px] border border-border bg-white p-8 text-center shadow-soft md:p-10"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block rounded-full border border-secondary/30 bg-secondary/5 px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.25em] text-secondary"
            >
              Get In Touch
            </motion.span>
            <motion.h3
              variants={fadeUp}
              className="mt-4 font-heading text-2xl font-semibold text-dark md:text-3xl"
            >
              Have a question before you enrol?
            </motion.h3>
            <motion.p variants={fadeUp} className="mt-2 font-body text-sm text-muted">
              Reach out and our team will help you pick the right program and timing.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap justify-center gap-4">
              <a
                href="mailto:info@vimokshayogshala.in"
                className="flex items-center gap-2 rounded-full border border-border px-4 py-2 transition-colors hover:border-primary/40"
              >
                <IoMailOutline className="h-4 w-4 text-primary" />
                <span className="font-body text-sm text-dark/80">info@vimokshayogshala.in</span>
              </a>
              <div className="flex items-center gap-2 rounded-full border border-border px-4 py-2">
                <IoCalendarOutline className="h-4 w-4 text-primary" />
                <span className="font-body text-sm text-dark/80">Morning, afternoon & evening slots</span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-border px-4 py-2">
                <IoLocationOutline className="h-4 w-4 text-primary" />
                <span className="font-body text-sm text-dark/80">Live from Dehradun</span>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ===== Closing CTA ===== */}
      <section className="bg-white py-[100px]">
        <Container className="max-w-[700px]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col items-center gap-6 text-center"
          >
            <motion.p variants={fadeUp} className="text-base leading-relaxed text-muted md:text-lg">
              Discover the benefits of live yoga classes, personalised
              guidance, and a community that values natural health and
              wellness. We look forward to guiding you on your path to
              vitality and balance.
            </motion.p>

            <motion.p variants={fadeUp} className="font-heading text-xl font-semibold text-primary">
              We look forward to welcoming you to Vimoksha Yogshala.
            </motion.p>

            <motion.div variants={fadeUp}>
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