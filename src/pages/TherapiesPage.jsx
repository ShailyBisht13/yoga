import usePageMeta from '@/hooks/usePageMeta';
import { Container, Button } from '@/components/ui';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi2';
import {
  IoBodyOutline,
  IoLeafOutline,
  IoHandLeftOutline,
  IoWaterOutline,
  IoCalendarOutline,
  IoMailOutline,
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

/* ===== Therapies offered ===== */
const therapies = [
  {
    title: 'Yoga Therapy',
    description:
      'A therapeutic practice tailored to specific health concerns, combining postures, breathwork and guided recovery.',
    icon: IoBodyOutline,
  },
  {
    title: 'Naturopathy',
    description:
      'Ancient detoxification techniques, including a supervised fasting program, to cleanse and restore balance to the body.',
    icon: IoLeafOutline,
  },
  {
    title: 'Acupressure',
    description:
      'Pressure-point therapy that supports natural pain relief, better circulation and deep relaxation.',
    icon: IoHandLeftOutline,
  },
  {
    title: 'Cupping Therapy',
    description:
      'Traditional suction therapy used to stimulate healing, ease muscle tension and support overall wellness.',
    icon: IoWaterOutline,
  },
];

/* ===== How it works ===== */
const process = [
  {
    title: 'Share your concern',
    description: 'Tell us what you are looking to address — pain, stress, recovery, or general wellness.',
  },
  {
    title: 'Get a tailored plan',
    description: 'Our practitioners design a therapy plan suited to your body and your goals.',
  },
  {
    title: 'Begin guided sessions',
    description: 'Work one-on-one with an experienced therapist, in person or online.',
  },
];

export default function TherapiesPage() {
  usePageMeta('therapies');

  return (
    <div data-page="therapies">
      {/* ===== Intro / Hero ===== */}
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
              Therapies
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="font-heading text-4xl font-semibold leading-tight text-dark md:text-5xl"
            >
              Healing Therapies at <span className="text-primary">Vimoksha Yogshala</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed text-muted md:text-lg"
            >
              Alongside our yoga programs, we offer natural, therapeutic care
              rooted in traditional practice — Yoga Therapy, Naturopathy,
              Acupressure and Cupping Therapy — designed to support recovery,
              relieve pain, and restore balance to body and mind.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-2">
              <Button
                as={Link}
                to="/contact"
                variant="primary"
                size="lg"
                icon={<HiArrowRight className="h-4 w-4" />}
                className="h-[52px] rounded-full px-8 text-base"
              >
                Book a Consultation
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ===== Therapies grid ===== */}
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
              Our Therapies
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base leading-relaxed text-muted md:text-lg">
              Each therapy is offered one-on-one, guided by practitioners trained in both traditional and modern technique.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            {therapies.map((therapy) => {
              const Icon = therapy.icon;
              return (
                <motion.div
                  key={therapy.title}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="group flex flex-col rounded-[24px] border border-border bg-white p-7 shadow-soft transition-shadow duration-300 hover:shadow-elevated"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                    <Icon className="text-2xl" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-dark">
                    {therapy.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {therapy.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* ===== How it works ===== */}
      <section className="bg-background py-[100px]">
        <Container className="max-w-[900px]">
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
              How a Therapy Session Works
            </motion.h2>
          </motion.div>

          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-7"
          >
            {process.map((step, i) => (
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
          </motion.ul>
        </Container>
      </section>

      {/* ===== Contact card ===== */}
      <section className="bg-white py-[100px]">
        <Container className="max-w-[900px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="rounded-[32px] border border-border bg-background p-8 text-center shadow-soft md:p-10"
          >
            <motion.h3
              variants={fadeUp}
              className="font-heading text-2xl font-semibold text-dark md:text-3xl"
            >
              Not sure which therapy is right for you?
            </motion.h3>
            <motion.p variants={fadeUp} className="mt-2 font-body text-sm text-muted">
              Reach out and we'll help you choose the right therapy and schedule.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap justify-center gap-4">
              <a
                href="mailto:info@vimokshayogshala.in"
                className="flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 transition-colors hover:border-primary/40"
              >
                <IoMailOutline className="h-4 w-4 text-primary" />
                <span className="font-body text-sm text-dark/80">info@vimokshayogshala.in</span>
              </a>
              <div className="flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2">
                <IoCalendarOutline className="h-4 w-4 text-primary" />
                <span className="font-body text-sm text-dark/80">By appointment</span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2">
                <IoLocationOutline className="h-4 w-4 text-primary" />
                <span className="font-body text-sm text-dark/80">Dehradun, Uttarakhand</span>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ===== Closing CTA ===== */}
      <section className="bg-background py-[100px]">
        <Container className="max-w-[700px]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col items-center gap-6 text-center"
          >
            <motion.p variants={fadeUp} className="text-base leading-relaxed text-muted md:text-lg">
              Whether you're recovering, managing a chronic concern, or simply
              seeking balance, our therapies work alongside your yoga practice
              to support lasting wellness.
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
                Book a Consultation
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}