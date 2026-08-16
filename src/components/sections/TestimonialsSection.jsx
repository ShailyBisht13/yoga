import { motion } from 'framer-motion';
import { Container } from '@/components/ui';
import { useEffect } from 'react';

/* ===== Animation variants ===== */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

/* Elfsight's platform script only needs to be loaded once per page.
   If it's already been injected elsewhere (e.g. in index.html), this
   effect just no-ops via the duplicate check below. */
const ELFSIGHT_SCRIPT_SRC = 'https://elfsightcdn.com/platform.js';
const ELFSIGHT_WIDGET_CLASS = 'elfsight-app-b9b841eb-b379-4e1e-86d3-c4639c2543ca';

function useElfsightScript() {
  useEffect(() => {
    if (document.querySelector(`script[src="${ELFSIGHT_SCRIPT_SRC}"]`)) return;
    const script = document.createElement('script');
    script.src = ELFSIGHT_SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);
}

export default function TestimonialsSection() {
  useElfsightScript();

  return (
    <section id="testimonials" className="bg-background py-[120px]">
      <Container className="max-w-[1320px]">
        {/* ===== Section Heading ===== */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto mb-12 flex max-w-[700px] flex-col items-center gap-0 text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="font-heading text-2xl font-semibold leading-none text-dark md:text-3xl"
          >
            What Our Students
            <br />
            <span className="text-primary">Say About Us</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-[640px] text-sm leading-snug text-muted md:text-base"
          >
            Real, live reviews straight from Google — nothing written or
            curated by us.
          </motion.p>
        </motion.div>

        {/* ===== Live Elfsight Google Reviews widget ===== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
        >
          <div className={ELFSIGHT_WIDGET_CLASS} data-elfsight-app-lazy />
        </motion.div>
      </Container>
    </section>
  );
}