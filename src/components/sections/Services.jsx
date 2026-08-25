import { motion } from 'framer-motion';
import { Container } from '@/components/ui';
import { Link } from 'react-router-dom';
import { IoArrowForward } from 'react-icons/io5';
import useSiteContent from '@/hooks/useSiteContent';

// Service images â€” replace paths if your project stores images elsewhere
import yogaClassesImg from '@/assets/images/services/yoga-classes.jpg';
import yogaTherapyImg from '@/assets/images/services/yoga-therapy.jpg';
import acupressureImg from '@/assets/images/services/acupressure.jpg';
import cuppingImg from '@/assets/images/services/cupping-therapy.jpg';
import meditationImg from '@/assets/images/services/meditation.jpeg';
import pranayamaImg from '@/assets/images/services/pranayama.webp';
import trainingPersonalizedImg from '@/assets/images/training/training-personalized.webp';
import trainingGroupImg from '@/assets/images/training/training-group.jpg';
import trainingPracticumImg from '@/assets/images/training/training-practicum.jpg';

/* â”€â”€â”€â”€â”€ Animation Variants (matches WhyChooseUs / ProgramsSection) â”€â”€â”€â”€â”€ */
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
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

const classItems = [
  {
    title: 'Yoga Classes',
    description:
      'Traditional Hatha, Ashtanga, and Vinyasa yoga sessions for all levels to enhance flexibility, strength, and mindfulness.',
    image: yogaClassesImg,
    link: '/classes/beginner',
  },
  {
    title: 'Meditation',
    description:
      'Guided meditation practices to calm the mind, reduce stress, and achieve inner peace and clarity.',
    image: meditationImg,
    link: '/classes/beginner',
  },
  {
    title: 'Pranayama',
    description:
      'Breathing exercises and techniques to enhance respiratory health, boost energy, and balance the nervous system.',
    image: pranayamaImg,
    link: '/classes/beginner',
  },
];

const therapyItems = [
  {
    title: 'Yoga Therapy',
    description:
      'Therapeutic yoga sessions for stress relief, anxiety management, and holistic healing of mind and body.',
    image: yogaTherapyImg,
    link: '/therapies',
  },
  {
    title: 'Acupressure',
    description:
      'Ancient healing technique applying pressure to specific points to relieve pain, reduce tension, and improve circulation.',
    image: acupressureImg,
    link: '/therapies',
  },
  {
    title: 'Cupping Therapy',
    description:
      'Traditional therapy using suction cups to stimulate healing, reduce pain, and improve overall wellness.',
    image: cuppingImg,
    link: '/therapies',
  },
];

const trainingItems = [
  {
    title: 'Personalized Alignment',
    description:
      'One-on-one posture correction and hands-on adjustment so every trainee develops safe, precise alignment before teaching others.',
    image: trainingPersonalizedImg,
    link: '/courses',
  },
  {
    title: 'Group Practice Sessions',
    description:
      'Train alongside a supportive cohort in guided group sessions that build the confidence to lead a full class.',
    image: trainingGroupImg,
    link: '/courses',
  },
  {
    title: 'Hands-on Teaching Practicum',
    description:
      'Practice real adjustments and cueing under supervision, turning classroom theory into confident, hands-on teaching skill.',
    image: trainingPracticumImg,
    link: '/courses',
  },
];

const classLevels = [
  { label: 'Beginner', path: '/classes/beginner' },
  { label: 'Intermediate', path: '/classes/intermediate' },
  { label: 'Advance', path: '/classes/advance' },
];

/* ===== Fallback copy for each admin-editable section header â€”
   used until/unless the admin saves content for that section. ===== */
const classesFallback = {
  heading: 'Our Classes',
  subheading: '',
  description:
    'Every practice is rooted in tradition and guided by experts who care about your whole wellbeing â€” mind, body, and breath.',
  image: '',
  features: [],
  items: classItems,
};

const trainingFallback = {
  heading: 'Our Training',
  subheading: '',
  description:
    'Become a confident, certified yoga teacher through hands-on practicum, personalized guidance, and immersive group practice.',
  image: '',
  features: [],
  items: trainingItems,
};

const therapyFallback = {
  heading: 'Our Therapies',
  subheading: '',
  description:
    'Restorative therapies drawn from ancient healing traditions, guided by experienced practitioners for lasting relief.',
  image: '',
  features: [],
  items: therapyItems,
};

function ServiceGrid({ items }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
    >
      {items.map((service, idx) => (
        <motion.div
          key={`${service.title}-${idx}`}
          variants={fadeUp}
          whileHover={{ y: -8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="group flex flex-col overflow-hidden rounded-[20px] bg-white shadow-soft transition-shadow duration-300 hover:shadow-elevated"
        >
          {/* Image */}
          <div className="relative overflow-hidden">
            <img
              src={service.image}
              alt={service.title}
              loading="lazy"
              className="h-[200px] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col p-4">
            <h3 className="font-heading text-lg font-semibold text-primary">
              {service.title}
            </h3>
            <p className="mt-1.5 flex-1 text-sm leading-relaxed text-dark/70">
              {service.description}
            </p>
            <Link
              to={service.link || '#'}
              className="mt-3 inline-flex items-center gap-1.5 self-start text-xs font-medium text-primary transition-all hover:gap-2.5"
            >
              Learn More <IoArrowForward className="h-3 w-3" />
            </Link>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* Section intro â€” heading/description/optional badge, optional banner
   image, and optional highlight chips. All admin-editable via the
   Site Content tab matching this section's key. */
function SectionHeading({ badge, title, description, image, features }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="mx-auto mb-8 flex max-w-2xl flex-col items-center gap-3 text-center md:mb-10"
    >
      {image && (
        <motion.div
          variants={fadeUp}
          className="mb-2 w-full max-w-[560px] overflow-hidden rounded-[20px] shadow-soft"
        >
          <img src={image} alt={title} className="h-[220px] w-full object-cover" loading="lazy" />
        </motion.div>
      )}

      {badge && (
        <motion.span
          variants={fadeUp}
          className="inline-block rounded-full border border-secondary/30 bg-secondary/5 px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.25em] text-secondary"
        >
          {badge}
        </motion.span>
      )}

      <motion.h2
        variants={fadeUp}
        className="font-heading text-4xl font-semibold leading-tight text-primary md:text-5xl"
      >
        {title}
      </motion.h2>

      <motion.p
        variants={fadeUp}
        className="max-w-xl text-base leading-relaxed text-dark/70 md:text-lg"
      >
        {description}
      </motion.p>

      {features?.length > 0 && (
        <motion.div
          variants={fadeUp}
          className="mt-1 flex flex-wrap items-center justify-center gap-2"
        >
          {features.map((f) => (
            <span
              key={f}
              className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-body text-xs font-medium text-primary"
            >
              {f}
            </span>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

export default function Services() {
  const { content: classesContent } = useSiteContent('classes', classesFallback);
  const { content: trainingContent } = useSiteContent('training', trainingFallback);
  const { content: therapyContent } = useSiteContent('therapy', therapyFallback);

  return (
    <section id="classes" className="bg-gradient-to-b from-primary/5 to-white py-[120px]">
      <Container>
        {/* ===== Classes ===== */}
        <SectionHeading
          badge={classesContent.subheading}
          title={classesContent.heading}
          description={classesContent.description}
          features={classesContent.features}
        />

        {/* Class level buttons â€” link to the same pages as the header's Classes dropdown */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-8 flex flex-wrap items-center justify-center gap-3 md:mb-10"
        >
          {classLevels.map((level) => (
            <motion.div key={level.path} variants={fadeUp}>
              <Link
                to={level.path}
                className="inline-flex items-center justify-center rounded-full border border-primary/20 bg-white px-6 py-2.5 text-sm font-semibold text-primary shadow-soft transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-card"
              >
                {level.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <ServiceGrid items={classesContent.items} />

        {/* ===== Training ===== */}
        <div id="training" className="mt-12 md:mt-16">
          <SectionHeading
            badge={trainingContent.subheading}
            title={trainingContent.heading}
            description={trainingContent.description}
            features={trainingContent.features}
          />
          <ServiceGrid items={trainingContent.items} />
        </div>

        {/* ===== Therapies ===== */}
        <div id="therapies" className="mt-12 md:mt-16">
          <SectionHeading
            badge={therapyContent.subheading}
            title={therapyContent.heading}
            description={therapyContent.description}
            features={therapyContent.features}
          />
          <ServiceGrid items={therapyContent.items} />
        </div>
      </Container>
    </section>
  );
}
