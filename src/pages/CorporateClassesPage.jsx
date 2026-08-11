import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import usePageMeta from '@/hooks/usePageMeta';
import { Container, Button } from '@/components/ui';
import { HiArrowRight } from 'react-icons/hi2';
import {
  IoHeartOutline,
  IoTrendingUpOutline,
  IoBodyOutline,
  IoPeopleOutline,
  IoFlashOutline,
  IoSettingsOutline,
  IoLaptopOutline,
  IoRibbonOutline,
  IoBulbOutline,
  IoSunnyOutline,
  IoMoonOutline,
  IoLeafOutline,
  IoPersonOutline,
  IoSchoolOutline,
  IoCalendarOutline,
  IoTrophyOutline,
  IoWalletOutline,
  IoMedkitOutline,
  IoCloudOutline,
  IoShirtOutline,
  IoTimeOutline,
  IoBusinessOutline,
  IoCafeOutline,
  IoPeopleCircleOutline,
  IoMailOutline,
  IoCallOutline,
  IoCheckmarkCircle,
} from 'react-icons/io5';
import { GiLotus, GiYinYang } from 'react-icons/gi';
import { MdChair } from 'react-icons/md';

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

/* ===== Benefits of corporate yoga ===== */
const benefits = [
  {
    title: 'Reduces Stress & Anxiety',
    description: 'Yoga helps calm the mind, lower stress levels, and enhance emotional well-being.',
    icon: IoHeartOutline,
  },
  {
    title: 'Boosts Productivity',
    description: 'A relaxed and focused mind leads to higher efficiency and better performance.',
    icon: IoTrendingUpOutline,
  },
  {
    title: 'Improves Posture & Flexibility',
    description: 'Sessions target the back pain and stiffness that come from long hours of sitting.',
    icon: IoBodyOutline,
  },
  {
    title: 'Enhances Team Bonding',
    description: 'Practicing together fosters better team relationships and collaboration.',
    icon: IoPeopleOutline,
  },
  {
    title: 'Increases Energy Levels',
    description: 'Employees feel rejuvenated and more energetic, which translates to real productivity gains.',
    icon: IoFlashOutline,
  },
];

/* ===== Training approach ===== */
const approach = [
  {
    title: 'Customized Yoga Programs',
    description: 'Tailored yoga routines to fit different corporate environments.',
    icon: IoSettingsOutline,
  },
  {
    title: 'On-site & Online Classes',
    description: 'In-office and virtual sessions, whichever works for your team.',
    icon: IoLaptopOutline,
  },
  {
    title: 'Certified Yoga Instructors',
    description: 'Our trainers are highly experienced and certified.',
    icon: IoRibbonOutline,
  },
  {
    title: 'Workplace-friendly Poses',
    description: 'Easy, effective postures that can be done right at the desk or in office wear.',
    icon: IoBulbOutline,
  },
  {
    title: 'Mindfulness & Meditation',
    description: 'Techniques to enhance concentration and reduce stress through the workday.',
    icon: GiLotus,
  },
];

/* ===== Types of corporate classes ===== */
const classTypes = [
  {
    title: 'Morning Energizer Sessions',
    description: 'A 30–45 minute session that boosts energy and sets a positive tone for the day.',
    icon: IoSunnyOutline,
  },
  {
    title: 'Midday Stretch & Refresh',
    description: 'A short, effective session to relieve stiffness and refresh the mind.',
    icon: IoLeafOutline,
  },
  {
    title: 'Evening Relaxation Sessions',
    description: 'Perfect for unwinding after a long workday, reducing stress and improving sleep.',
    icon: IoMoonOutline,
  },
  {
    title: 'Weekend Yoga Retreats',
    description: 'Corporate wellness programs conducted in serene locations around Dehradun.',
    icon: IoBusinessOutline,
  },
  {
    title: 'One-on-One Coaching',
    description: 'Personalized sessions for executives and employees who need individual attention.',
    icon: IoPersonOutline,
  },
];

/* ===== Why choose Vimoksha Yogshala ===== */
const whyUs = [
  {
    title: 'Expert Guidance',
    description: 'Experienced instructors bring years of expertise in corporate wellness and holistic health.',
    icon: IoSchoolOutline,
  },
  {
    title: 'Flexible Scheduling',
    description: 'Sessions at times that suit your corporate schedule.',
    icon: IoCalendarOutline,
  },
  {
    title: 'Result-Oriented Programs',
    description: 'Sessions designed to provide tangible, measurable benefits for employee health.',
    icon: IoTrophyOutline,
  },
  {
    title: 'Affordable Packages',
    description: 'Cost-effective solutions to bring yoga into the workplace without straining your budget.',
    icon: IoWalletOutline,
  },
  {
    title: 'Holistic Well-being',
    description: 'Classes that focus on mental, physical, and emotional well-being alike.',
    icon: GiYinYang,
  },
];

/* ===== Beyond corporate: general yoga classes ===== */
const generalClasses = [
  {
    title: 'Hatha Yoga',
    description: 'A perfect balance of strength and flexibility.',
    icon: GiLotus,
  },
  {
    title: 'Ashtanga Yoga',
    description: 'A dynamic, powerful form of yoga for strength and endurance.',
    icon: GiYinYang,
  },
  {
    title: 'Pranayama & Breathwork',
    description: 'Techniques to enhance lung capacity and mental clarity.',
    icon: IoCloudOutline,
  },
  {
    title: 'Meditation & Mindfulness',
    description: 'Guided sessions to improve focus and reduce stress.',
    icon: IoBulbOutline,
  },
  {
    title: 'Therapeutic Yoga',
    description: 'Specialized yoga for managing ailments like back pain, diabetes, and hypertension.',
    icon: IoMedkitOutline,
  },
];

/* ===== No-equipment quick facts ===== */
const quickFacts = [
  {
    title: 'Chair',
    description: 'All you need is a chair. Any office chair works — no special equipment needed.',
    icon: MdChair,
  },
  {
    title: 'Any Clothes',
    description: 'Wear anything you want. No need to change into yoga clothes.',
    icon: IoShirtOutline,
  },
  {
    title: 'Anyone Can Do It',
    description: 'Great for employee wellness. Prior yoga experience not required.',
    icon: IoPeopleOutline,
  },
  {
    title: 'Just 30 Minutes',
    description: 'A quick break that leaves everyone relaxed and refreshed.',
    icon: IoTimeOutline,
  },
];

/* ===== Where sessions can be conducted ===== */
const locations = [
  'On the floor / bay area',
  'Cafeteria / open garden',
  'Boardroom / conference room',
  'Any other on-site event space',
];

/* ===== Gallery ===== */
const gallery = [
  {
    src: '/images/corporate-office-meditation.jpg',
    alt: 'Office team meditating together during a workday session',
  },
  {
    src: '/images/corporate-studio-group.jpg',
    alt: 'Corporate group practicing yoga poses in the studio',
  },
  {
    src: '/images/corporate-warrior-pose.webp',
    alt: 'Corporate group practicing Warrior pose together',
  },
];

export default function CorporateClassesPage() {
  usePageMeta('corporateClasses');

  return (
    <div data-page="corporate-classes">
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
              Corporate Classes
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="font-heading text-4xl font-semibold leading-tight text-dark md:text-5xl"
            >
              Transform Your Workplace with{' '}
              <span className="text-primary">Corporate Yoga</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed text-muted md:text-lg"
            >
              In today's fast-paced corporate world, stress and fatigue are
              common challenges that impact productivity and well-being.
              Vimoksha Yogshala offers structured corporate yoga training in
              Dehradun to help businesses create a healthier, more balanced
              work environment.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* ===== Why Corporate Yoga ===== */}
      <section className="bg-white py-[100px]">
        <Container className="max-w-[900px]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-5 text-center"
          >
            <motion.h2
              variants={fadeUp}
              className="font-heading text-3xl font-semibold text-dark md:text-4xl"
            >
              Why Corporate Yoga?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base leading-relaxed text-muted md:text-lg">
              Corporate yoga is an excellent way to integrate health and
              wellness into the workplace. It's well established that yoga
              enhances mental clarity, boosts immunity, and increases energy
              levels. Employees who practice regularly experience reduced
              stress, better posture, and improved productivity — and at
              Vimoksha Yogshala, every program is tailored to the specific
              needs of your organization.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* ===== Benefits ===== */}
      <section className="bg-background py-[100px]">
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
              Benefits of Corporate Yoga
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
      <section className="bg-white py-[100px]">
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

      {/* ===== Training Approach ===== */}
      <section className="bg-background py-[100px]">
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
              Corporate Yoga Training
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-heading text-3xl font-semibold text-dark md:text-4xl"
            >
              Our Training Approach
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {approach.map((item) => {
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

      {/* ===== Types of Corporate Classes ===== */}
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
              Types of Corporate Yoga Classes
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base leading-relaxed text-muted">
              We cater to organizations of every size — startups, mid-sized
              companies, and large enterprises alike.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {classTypes.map((item) => {
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

      {/* ===== No Equipment Needed — quick facts ===== */}
      <section className="bg-background py-[100px]">
        <Container className="max-w-[1100px]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {quickFacts.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="flex flex-col items-center gap-3 rounded-[24px] border border-border bg-white p-7 text-center shadow-soft"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="text-2xl" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-dark">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Where sessions can be conducted */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto mt-10 max-w-2xl rounded-[28px] border border-border bg-white p-8 shadow-soft"
          >
            <motion.h3
              variants={fadeUp}
              className="text-center font-heading text-xl font-semibold text-dark"
            >
              Where Can You Conduct It?
            </motion.h3>
            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap justify-center gap-3">
              {locations.map((place) => (
                <span
                  key={place}
                  className="inline-flex items-center gap-2 rounded-full bg-primary/8 px-4 py-2 font-body text-sm font-medium text-primary"
                >
                  <IoCafeOutline className="h-4 w-4" />
                  {place}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ===== Why Choose Us ===== */}
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
              Why Choose Vimoksha Yogshala?
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {whyUs.map((item) => {
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

      {/* ===== Beyond Corporate Yoga ===== */}
      <section className="bg-background py-[100px]">
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
              Yoga Classes in Dehradun — Beyond Corporate Yoga
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base leading-relaxed text-muted">
              We also offer classes for individuals looking to improve their
              overall fitness and mental well-being — group classes, private
              sessions, and programs for every level.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {generalClasses.map((item) => {
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
                Get Started
              </span>
              <h2 className="font-heading text-3xl font-semibold text-dark md:text-4xl">
                Book a Corporate Yoga Session Today
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-muted">
                Ready to transform your workplace? Contact us to schedule a
                consultation or book a trial session — invest in employee
                wellness and watch your workplace thrive.
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
                href="tel:+910000000000"
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
                Schedule a Consultation
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}