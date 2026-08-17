import { motion } from 'framer-motion';
import { Container } from '@/components/ui';
import { IoArrowForward } from 'react-icons/io5';
import { GiMeditation, GiLotus } from 'react-icons/gi';
import { HiAcademicCap } from 'react-icons/hi2';

// Swap these paths for wherever the images live in your project (e.g. /src/assets/...)
import classesImg from '../../assets/pathways-classes.png';
import therapyImg from '../../assets/pathways-therapy.png';
import trainingImg from '../../assets/pathways-training.png';

const SCROLL_OFFSET = 110;

const pathways = [
  {
    title: 'Classes',
    description: 'From beginners to advanced practitioners — find the right class for your body & mind.',
    icon: GiMeditation,
    color: 'var(--color-primary)',
    image: classesImg,
    targetId: 'classes',
  },
  {
    title: 'Training',
    description: 'Become a certified yoga teacher with world-class training and guidance.',
    icon: HiAcademicCap,
    color: 'var(--color-secondary)',
    image: trainingImg,
    targetId: 'training',
  },
  {
    title: 'Therapy',
    description: 'Healing therapies to release stress, restore energy and bring inner peace.',
    icon: GiLotus,
    color: 'var(--color-accent)',
    image: therapyImg,
    targetId: 'therapies',
  },
];

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
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export default function PathwaysSection() {
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <section className="overflow-x-hidden bg-[var(--color-background)] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <style>{`
        .explore-btn { background-color: transparent; color: var(--btn-color); }
        .explore-btn:hover,
        .explore-btn:active,
        .explore-btn:focus-visible {
          background-color: var(--btn-color);
          color: #fff;
        }
      `}</style>
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="mx-auto mb-12 max-w-2xl text-center md:mb-16"
        >
          <motion.h2
            variants={fadeUp}
            className="font-heading text-3xl font-semibold text-[var(--color-primary)] md:text-4xl"
          >
            Explore Our Pathways
          </motion.h2>
          <motion.div
            variants={fadeUp}
            className="mx-auto my-3 flex w-16 items-center gap-2"
          >
            <span className="h-px flex-1 bg-[var(--color-primary)]/25" />
            <GiLotus className="h-3 w-3 shrink-0 text-[var(--color-primary)]/40" />
            <span className="h-px flex-1 bg-[var(--color-primary)]/25" />
          </motion.div>
          <motion.p variants={fadeUp} className="text-sm text-[var(--color-muted)] md:text-base">
            Choose what speaks to your journey today.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="grid gap-6 pr-2 md:grid-cols-3 md:pr-4 lg:pr-6"
        >
          {pathways.map((p) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative flex min-h-[260px] overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_8px_30px_-12px_rgba(46,46,46,0.15)]"
            >
              {/* Text content */}
              <div className="relative z-10 flex w-3/5 shrink-0 flex-col justify-between gap-4 p-6">
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white"
                      style={{ backgroundColor: p.color }}
                    >
                      <p.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-[var(--color-primary)]">
                      {p.title}
                    </h3>
                  </div>
                  <p className="text-xs leading-relaxed text-[var(--color-muted)]">
                    {p.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => scrollToId(p.targetId)}
                  className="explore-btn inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-colors duration-300"
                  style={{
                    borderColor: p.color,
                    '--btn-color': p.color,
                  }}
                >
                  Explore {p.title}
                  <IoArrowForward className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Image, tucked into a dashed rounded corner echoing the reference layout */}
              <div className="relative w-2/5 shrink-0">
                <div className="absolute inset-0 overflow-hidden rounded-tl-[64px] border-l-2 border-t-2 border-dashed border-[var(--color-border)]">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}