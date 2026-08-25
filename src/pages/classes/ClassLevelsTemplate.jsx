import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { classLevels, levelOrder } from './classLevelsData';

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

/**
 * Reusable classes-page shell. Renders a page-specific hero and CTA, plus
 * an interactive Beginner / Intermediate / Advance switcher that always
 * shows all three levels — every classes page (Student, Professional,
 * Adult) uses this same component so all three sections are guaranteed
 * to be present everywhere.
 */
export default function ClassLevelsTemplate({
  metaKey,
  pageKey,
  defaultLevel = 'beginner',
  badgeLabel,
  heroTitleLead,
  heroTitleAccent,
  heroTitleTail = '',
  heroDescription,
  ctaBadge = 'Get In Touch',
  ctaHeading,
  ctaDescription,
}) {
  usePageMeta(metaKey);
  const [activeLevel, setActiveLevel] = useState(defaultLevel);
  const level = classLevels[activeLevel];

  return (
    <div data-page={pageKey}>
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
              {badgeLabel}
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="font-heading text-3xl font-semibold leading-tight text-dark sm:text-4xl md:text-5xl"
            >
              {heroTitleLead} <span className="text-primary">{heroTitleAccent}</span>
              {heroTitleTail ? ` ${heroTitleTail}` : ''}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed text-muted md:text-lg"
            >
              {heroDescription}
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* ===== Level Switcher ===== */}
      <section className="bg-white pt-[60px] md:pt-[80px]">
        <Container className="max-w-[900px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            className="flex flex-col items-center gap-6 text-center"
          >
            <p className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-muted">
              Every batch, one roof — pick a level to explore
            </p>
            <div className="relative flex w-full max-w-md rounded-full border border-border bg-background p-1.5">
              {levelOrder.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveLevel(id)}
                  aria-pressed={activeLevel === id}
                  className="relative flex-1 rounded-full px-4 py-2.5 font-body text-sm font-semibold transition-colors duration-300"
                >
                  {activeLevel === id && (
                    <motion.span
                      layoutId={`level-pill-${pageKey}`}
                      className="absolute inset-0 rounded-full bg-primary shadow-soft"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 ${activeLevel === id ? 'text-white' : 'text-dark/70'}`}>
                    {classLevels[id].label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeLevel}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ===== Level Summary + Benefits ===== */}
          <section className="bg-white py-[60px] md:py-[100px]">
            <Container className="max-w-[1320px]">
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
                  {level.sectionHeading}
                </motion.h2>
                <motion.p variants={fadeUp} className="text-base leading-relaxed text-muted">
                  {level.summary}
                </motion.p>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
              >
                {level.benefits.map((item) => {
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
                {level.gallery.map((photo) => (
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
          <section className="bg-white py-[60px] md:py-[100px]">
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
                  className="font-heading text-2xl font-semibold text-dark sm:text-3xl md:text-4xl"
                >
                  Styles Taught at This Level
                </motion.h2>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className={`mx-auto grid grid-cols-1 gap-6 ${
                  level.styles.length === 1
                    ? 'max-w-[420px]'
                    : level.styles.length === 2
                    ? 'sm:grid-cols-2'
                    : 'sm:grid-cols-3'
                }`}
              >
                {level.styles.map((style) => {
                  const Icon = style.icon;
                  return (
                    <motion.div
                      key={style.title}
                      variants={fadeUp}
                      whileHover={{ y: -6 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                      className="group flex flex-col items-center rounded-[24px] border border-border bg-background p-7 text-center shadow-soft transition-shadow duration-300 hover:shadow-elevated"
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
                    {level.classIncludes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-dark/80">
                        <IoCheckmarkCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div variants={fadeUp} className="rounded-[28px] border border-border bg-white p-8 shadow-soft">
                  <h2 className="font-heading text-2xl font-semibold text-dark">Batch Timings</h2>
                  <p className="mt-1 font-body text-xs font-semibold uppercase tracking-wider text-muted">
                    Monday to Saturday
                  </p>
                  <ul className="mt-6 flex flex-col gap-3">
                    {level.batchTimings.map((time) => (
                      <li
                        key={time}
                        className="flex items-center gap-2.5 border-b border-border/70 pb-3 text-sm font-medium text-dark/80 last:border-b-0 last:pb-0"
                      >
                        <IoTimeOutline className="h-4 w-4 shrink-0 text-primary" />
                        {time}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            </Container>
          </section>
        </motion.div>
      </AnimatePresence>

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
                {ctaBadge}
              </span>
              <h2 className="font-heading text-2xl font-semibold text-dark sm:text-3xl md:text-4xl">
                {ctaHeading}
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-muted">{ctaDescription}</p>
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