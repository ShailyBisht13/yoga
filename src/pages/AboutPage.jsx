import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import usePageMeta from '@/hooks/usePageMeta';
import { Container, Button } from '@/components/ui';
import { HiArrowRight } from 'react-icons/hi2';
import { FiPlus, FiMinus } from 'react-icons/fi';
import {
  IoLeafOutline,
  IoBodyOutline,
  IoHandLeftOutline,
  IoWaterOutline,
  IoSchoolOutline,
  IoMailOutline,
  IoTimeOutline,
  IoRibbonOutline,
} from 'react-icons/io5';
import { GiMeditation, GiLotus } from 'react-icons/gi';

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

/* ===== Programs offered ===== */
const programs = [
  {
    title: 'Yoga Classes',
    description: 'Asanas, Pranayama, Shatkriya, Yoga Nidra & Meditation for all levels.',
    icon: GiMeditation,
  },
  {
    title: 'Yoga Therapy',
    description: 'Therapeutic practice tailored to specific health concerns and recovery.',
    icon: IoBodyOutline,
  },
  {
    title: 'Naturopathy',
    description: 'Ancient detoxification techniques to cleanse and restore balance.',
    icon: IoLeafOutline,
  },
  {
    title: 'Acupressure',
    description: 'Pressure-point therapy for natural pain relief and circulation.',
    icon: IoHandLeftOutline,
  },
  {
    title: 'Cupping Therapy',
    description: 'Traditional suction therapy to stimulate healing and wellness.',
    icon: IoWaterOutline,
  },
  {
    title: 'Yoga Teacher Training',
    description: 'Certified training for those ready to deepen and share their practice.',
    icon: IoSchoolOutline,
  },
];

/* ===== Practices & styles ===== */
const practices = ['Asanas', 'Pranayama', 'Shatkriya', 'Yoga Nidra', 'Meditation'];
const styles = ['Hatha Yoga', 'Ashtanga Vinyasa Yoga', 'Iyengar Yoga', 'Chakra Yoga'];

/* ===== Founder credentials ===== */
const credentials = [
  'M.A. (Yogacharya)',
  'B.N.Y.',
  'UGC NET (Yoga)',
  'D.N.Y.S.',
  'D.A.H.S.',
  'H.H.M.',
];

const founderBioFull = `When he came to Haridwar, he stayed at Shantikunj Ashram. Attended regular yoga and yagya classes there for 45 days and ate satvik food and saw huge change in his physical, mental health, stress, and insomnia — and came to know that yoga is the art of living life. So he decided to live his future life in the same way. Then he did a Diploma in Holistic Health Management course from Dev Sanskriti Vishwavidyalaya, Shantikunj in 2012, and from there continued further education in Yoga and tried to bring changes in the health and lifestyle of people based on knowledge and experience. Meanwhile, he also got education in Naturopathy, Diploma in Acupressure, Ayurveda, and Marma Chikitsa.

Established Vimoksha Yogashala in 2019 after doing his MA in Yoga. From there, efforts are being made to bring changes in the health and lifestyle of people through Yoga and Naturopathy.`;

export default function AboutPage() {
  usePageMeta('about');
  const [bioExpanded, setBioExpanded] = useState(false);

  return (
    <div data-page="about">
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
              About Us
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
              Your sanctuary for holistic wellness and natural healing. Located
              in the serene surroundings of Dehradun, we offer a unique blend
              of yoga and naturopathy designed to nurture both body and mind
              — including Yoga Classes, Yoga Therapy, Naturopathy,
              Acupressure and Cupping Therapy, and Yoga Teacher Trainings.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* ===== What We Offer ===== */}
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
              What We Offer
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {programs.map((program) => {
              const Icon = program.icon;
              return (
                <motion.div
                  key={program.title}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="group flex flex-col rounded-[24px] border border-border bg-white p-7 shadow-soft transition-shadow duration-300 hover:shadow-elevated"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                    <Icon className="text-2xl" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-dark">
                    {program.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {program.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* ===== Our Story ===== */}
      <section className="bg-background py-[100px]">
        <Container className="max-w-[900px]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-6"
          >
            <motion.span
              variants={fadeUp}
              className="mx-auto inline-block rounded-full border border-secondary/30 bg-secondary/5 px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.25em] text-secondary"
            >
              Our Story
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="text-center font-heading text-3xl font-semibold text-dark md:text-4xl"
            >
              Where Tradition Meets Modern Wellness
            </motion.h2>

            <motion.p variants={fadeUp} className="text-base leading-relaxed text-muted md:text-lg">
              Founded in 2019 by Yogacharya Gyan Prakash, Vimoksha Yogshala
              was created with the vision of providing a space where
              traditional healing methods and contemporary wellness practices
              converge. Our founders are passionate about guiding individuals
              on their journey to balance and vitality.
            </motion.p>

            <motion.p variants={fadeUp} className="text-base leading-relaxed text-muted md:text-lg">
              We design yoga classes for beginners to advanced levels,
              including Asanas, Pranayama, Shatkriya, Yoga Nidra, and
              Meditation — following different styles of yoga such as Hatha
              Yoga, Ashtanga Vinyasa Yoga, Iyengar Yoga, and Chakra Yoga.
            </motion.p>

            <motion.p variants={fadeUp} className="text-base leading-relaxed text-muted md:text-lg">
              Our Naturopathy program is an ancient detoxification technique
              that involves a series of cleansing treatments designed to
              remove toxins and restore balance to the body. This program is
              a popular choice among our clients, as it offers a holistic
              approach to detoxification and rejuvenation.
            </motion.p>

            <motion.p variants={fadeUp} className="text-base leading-relaxed text-muted md:text-lg">
              At Vimoksha, we offer a range of programs and services tailored
              to meet the unique needs of each individual. Our yoga
              trainings, led by experienced and certified instructors, are
              designed to help students deepen their practice and
              understanding of yoga, while our Naturopathy and Acupressure
              services provide natural solutions for a variety of health
              concerns.
            </motion.p>

            {/* Practices & Styles pills */}
            <motion.div variants={fadeUp} className="mt-4 flex flex-col gap-4">
              <div>
                <p className="mb-2.5 font-body text-xs font-semibold uppercase tracking-wider text-muted">
                  Practices We Teach
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {practices.map((p) => (
                    <span
                      key={p}
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-4 py-1.5 font-body text-sm font-medium text-primary"
                    >
                      <GiLotus className="h-3.5 w-3.5" />
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2.5 font-body text-xs font-semibold uppercase tracking-wider text-muted">
                  Yoga Styles
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {styles.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center rounded-full border border-secondary/30 bg-secondary/5 px-4 py-1.5 font-body text-sm font-medium text-secondary"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ===== Founder Profile ===== */}
      <section className="bg-background py-[100px]">
        <Container className="max-w-[900px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="rounded-[32px] border border-border bg-white p-8 shadow-soft md:p-10"
          >
            <motion.div variants={fadeUp} className="flex flex-col gap-6 sm:flex-row sm:items-start">
              {/* Founder photo */}
              <div className="mx-auto h-40 w-40 shrink-0 overflow-hidden rounded-full border border-border bg-background sm:mx-0">
                <img
                  src="/images/about-instructor.jpg"
                  alt="Yogacharya Gyan Prakash"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col gap-2 text-center sm:text-left">
                <h3 className="font-heading text-2xl font-semibold text-dark md:text-3xl">
                  Yogacharya Gyan Prakash
                </h3>
                <p className="font-body text-sm text-muted">
                  {credentials.join(', ')}
                </p>
              </div>
            </motion.div>

            {/* Quick facts */}
            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-full border border-border px-4 py-2">
                <IoTimeOutline className="h-4 w-4 text-primary" />
                <span className="font-body text-sm text-dark/80">13 years experience</span>
              </div>
              <a
                href="mailto:info@vimokshayogshala.in"
                className="flex items-center gap-2 rounded-full border border-border px-4 py-2 transition-colors hover:border-primary/40"
              >
                <IoMailOutline className="h-4 w-4 text-primary" />
                <span className="font-body text-sm text-dark/80">info@vimokshayogshala.in</span>
              </a>
              <div className="flex items-center gap-2 rounded-full border border-border px-4 py-2">
                <IoRibbonOutline className="h-4 w-4 text-primary" />
                <span className="font-body text-sm text-dark/80">Founder & Patron</span>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.p variants={fadeUp} className="mt-6 text-base leading-relaxed text-dark/80">
              Yogacharya Gyan Prakash is the founder and patron of Vimoksha
              Yogashala. He is a PhD scholar in Yogic Science from Shri Guru
              Ram Rai University and has qualified UGC NET in Yoga. He also
              serves as Assistant Professor in the Department of Yoga at ITM
              College, Dehradun. The beginning of yoga in his life is like a
              mysterious event which brought a lot of change in his life.
            </motion.p>

            {/* Expandable "About More" */}
            <motion.div variants={fadeUp} className="mt-4">
              <button
                onClick={() => setBioExpanded(!bioExpanded)}
                className="flex items-center gap-2 font-body text-sm font-semibold text-primary transition-all hover:gap-3"
                aria-expanded={bioExpanded}
              >
                {bioExpanded ? 'Show Less' : 'About More'}
                {bioExpanded ? (
                  <FiMinus className="h-4 w-4" />
                ) : (
                  <FiPlus className="h-4 w-4" />
                )}
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: bioExpanded ? 'auto' : 0,
                  opacity: bioExpanded ? 1 : 0,
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-4 flex flex-col gap-4 border-t border-border pt-4">
                  {founderBioFull.split('\n\n').map((para, i) => (
                    <p key={i} className="text-sm leading-relaxed text-dark/70">
                      {para}
                    </p>
                  ))}
                </div>
              </motion.div>
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
              Discover the benefits of our yoga classes, naturopathic
              consultations, and holistic workshops, and become part of a
              community that values natural health and wellness. We look
              forward to guiding you on your path to vitality and balance.
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