import { useState } from 'react';
import usePageMeta from '@/hooks/usePageMeta';
import { Container, Button } from '@/components/ui';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi2';
import {
  IoLeafOutline,
  IoWaterOutline,
  IoHandLeftOutline,
  IoBodyOutline,
  IoFlameOutline,
  IoFootstepsOutline,
  IoFlashlightOutline,
  IoShieldCheckmarkOutline,
  IoPersonOutline,
  IoSparklesOutline,
  IoPulseOutline,
  IoHeartOutline,
  IoMoonOutline,
  IoFlashOutline,
  IoRibbonOutline,
  IoPeopleOutline,
  IoDocumentTextOutline,
  IoBookOutline,
  IoFitnessOutline,
  IoHomeOutline,
  IoStar,
  IoAddOutline,
  IoRemoveOutline,
  IoLogoWhatsapp,
  IoCallOutline,
  IoCalendarOutline,
  IoMailOutline,
  IoChevronDown,
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
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

/* ===== Hero trust badges ===== */
const heroBadges = [
  { label: 'Drug-Free Natural Healing', icon: IoLeafOutline },
  { label: 'Personalized Therapy Plans', icon: IoPersonOutline },
  { label: 'Holistic Wellness for Body & Mind', icon: IoSparklesOutline },
  { label: 'Safe, Hygienic & Professional Care', icon: IoShieldCheckmarkOutline },
];

/* ===== Therapies offered ===== */
const therapies = [
  {
    title: 'Naturopathy',
    image: '/images/therapies/Naturopathy.jpg',
    icon: IoLeafOutline,
    accent: 'primary',
    description: 'Healing through nature with detox, nutrition, hydrotherapy, mud therapy and lifestyle practices.',
    recommendedFor: ['Lifestyle Disorders', 'Digestive Problems', 'Obesity', 'Diabetes Support', 'Stress Management', 'Detoxification'],
    benefits: ['Improves Immunity', 'Restores Energy', 'Enhances Digestion', 'Promotes Natural Healing'],
  },
  {
    title: 'Cupping Therapy',
    image: '/images/therapies/Cupping_Therapy.jpg',
    icon: IoWaterOutline,
    accent: 'primary',
    description: 'Ancient therapy that uses suction cups to improve circulation and relieve muscular tension.',
    recommendedFor: ['Back Pain', 'Neck Pain', 'Shoulder Pain', 'Sports Recovery', 'Muscle Tightness'],
    benefits: ['Pain Relief', 'Better Blood Circulation', 'Muscle Recovery', 'Detoxification'],
  },
  {
    title: 'Acupressure Therapy',
    image: '/images/therapies/Acupressure_Therapy.jpg',
    icon: IoHandLeftOutline,
    accent: 'primary',
    description: 'Stimulating pressure points to restore energy flow and support the body\u2019s natural healing.',
    recommendedFor: ['Migraine', 'Cervical Pain', 'Joint Pain', 'Stress & Anxiety', 'Digestive Issues'],
    benefits: ['Relieves Pain', 'Reduces Stress', 'Improves Energy Flow', 'Supports Overall Wellness'],
  },
  {
    title: 'Therapeutic Massage',
    image: '/images/therapies/Therapeutic_Massage.webp',
    icon: IoBodyOutline,
    accent: 'dark',
    description: 'Professional massage therapies to relax muscles, improve circulation and reduce stress.',
    recommendedFor: ['Muscle Pain', 'Fatigue', 'Stress', 'Poor Circulation', 'Sports Recovery'],
    benefits: ['Deep Relaxation', 'Improved Mobility', 'Faster Recovery', 'Better Sleep'],
  },
  {
    title: 'Shirodhara',
    image: '/images/therapies/Shirodhara.jpeg',
    icon: IoFlameOutline,
    accent: 'secondary',
    description: 'Warm herbal oil is gently poured over the forehead to calm the nervous system and mind.',
    recommendedFor: ['Stress', 'Anxiety', 'Insomnia', 'Mental Fatigue', 'Headaches'],
    benefits: ['Mental Relaxation', 'Better Sleep', 'Improved Concentration', 'Emotional Balance'],
  },
  {
    title: 'Janu Basti',
    image: '/images/therapies/Janu_Basti.webp',
    icon: IoFootstepsOutline,
    accent: 'secondary',
    description: 'Warm medicated oil is retained around the knee joint to nourish tissues and improve function.',
    recommendedFor: ['Knee Pain', 'Arthritis', 'Joint Stiffness', 'Sports Injuries'],
    benefits: ['Reduces Pain', 'Improves Joint Mobility', 'Strengthens Knee Health', 'Supports Recovery'],
  },
  {
    title: 'Kati Basti',
    image: '/images/therapies/Kati_Basti.webp',
    icon: IoFlashlightOutline,
    accent: 'dark',
    description: 'Warm medicated oil is retained over the lower back to relieve pain and stiffness.',
    recommendedFor: ['Lower Back Pain', 'Sciatica', 'Lumbar Stiffness', 'Disc-Related Discomfort'],
    benefits: ['Relieves Lower Back Pain', 'Improves Flexibility', 'Reduces Muscle Tightness', 'Supports Spine Health'],
  },
  {
    title: 'Head & Shoulder Massage',
    image: '/images/therapies/hero.jpg',
    icon: IoMoonOutline,
    accent: 'primary',
    description: 'A soothing candlelit ritual that eases tension through the head, neck and shoulders.',
    recommendedFor: ['Stress', 'Tension Headaches', 'Poor Sleep', 'Mental Fatigue'],
    benefits: ['Deep Relaxation', 'Relieves Tension', 'Improves Sleep Quality', 'Calms the Mind'],
  },
];

/* Tailwind-safe class lookups per accent (keeps arbitrary class names static so
   the JIT compiler can see them, rather than building class strings at runtime).
   Icon badges keep a bit of color variety across cards; the "Explore" button
   below is intentionally the same color on every card (see EXPLORE_BUTTON_CLASS). */
const accentClasses = {
  primary: { icon: 'bg-primary text-white' },
  secondary: { icon: 'bg-secondary text-white' },
  dark: { icon: 'bg-dark text-white' },
};

const EXPLORE_BUTTON_CLASS = 'bg-primary text-white hover:bg-primary-dark';

/* ===== Benefits of natural healing ===== */
const healingBenefits = [
  { label: 'Boosts Immunity', icon: IoShieldCheckmarkOutline },
  { label: 'Detoxifies Body', icon: IoWaterOutline },
  { label: 'Reduces Pain & Inflammation', icon: IoPulseOutline },
  { label: 'Relieves Stress & Anxiety', icon: IoHeartOutline },
  { label: 'Improves Sleep', icon: IoMoonOutline },
  { label: 'Enhances Energy', icon: IoFlashOutline },
  { label: 'Restores Body Balance', icon: IoBodyOutline },
  { label: 'Supports Overall Wellness', icon: IoSparklesOutline },
];

/* ===== Why choose us ===== */
const whyChooseUs = [
  { label: 'Experienced Therapists', icon: IoPeopleOutline },
  { label: 'Personalized Treatment Plans', icon: IoDocumentTextOutline },
  { label: 'Natural & Holistic Healing', icon: IoLeafOutline },
  { label: 'Safe & Hygienic Environment', icon: IoShieldCheckmarkOutline },
  { label: 'Traditional Ayurvedic Practices', icon: IoBookOutline },
  { label: 'Integrated Yoga + Therapy Approach', icon: IoFitnessOutline },
  { label: 'Professional Care & Guidance', icon: IoRibbonOutline },
  { label: 'Peaceful Wellness Centre', icon: IoHomeOutline },
];

/* ===== Testimonials ===== */
const testimonials = [
  {
    name: 'Neha S.',
    image: '/images/testimonials/neha.jpg',
    quote: 'Naturopathy sessions helped me detox and improve my energy levels naturally. I feel lighter, healthier and more active.',
  },
  {
    name: 'Rohit M.',
    image: '/images/testimonials/rohit.jpg',
    quote: 'Cupping therapy and massage reduced my back pain significantly. The therapists are professional and caring.',
  },
  {
    name: 'Priya D.',
    image: '/images/testimonials/priya.jpg',
    quote: 'Shirodhara therapy is extremely relaxing. It has improved my sleep and reduced my stress levels a lot.',
  },
  {
    name: 'Arjun K.',
    image: '/images/testimonials/arjun.jpg',
    quote: 'The Janu Basti sessions eased my knee pain within a couple of weeks. The therapists genuinely listen and adjust the treatment to what you need.',
  },
];

/* ===== FAQs ===== */
const faqs = [
  { q: 'Are the therapies safe?', a: 'Yes. Every therapy is administered by trained practitioners using natural, drug-free techniques suited to your health profile.' },
  { q: 'How many sessions will I need?', a: 'This depends on your concern and goals. Your practitioner will recommend a session plan after your first consultation.' },
  { q: 'Do I need to book an appointment?', a: 'Yes, all therapies are offered by appointment so we can give you focused, one-on-one attention.' },
  { q: 'Can I combine therapies with yoga?', a: 'Absolutely. Many guests pair therapies with our yoga classes for a more complete wellness routine.' },
  { q: 'Will there be any side effects?', a: 'Our therapies are natural and gentle. Mild, temporary effects like relaxation or light soreness are normal and pass quickly.' },
  { q: 'What should I do before the session?', a: 'Eat a light meal, stay hydrated, and wear comfortable clothing. Your practitioner will share any specific guidance beforehand.' },
  { q: 'Is there any age limit?', a: 'Most therapies suit a wide age range. We\u2019ll tailor the approach for you after understanding your health background.' },
  { q: 'Do you offer customized plans?', a: 'Yes, every plan is built around your specific concerns, schedule and wellness goals.' },
  { q: 'What are your centre timings?', a: 'We\u2019re open daily by appointment. Reach out and we\u2019ll find a slot that works for you.' },
];

const therapyOptions = therapies.map((t) => t.title);

export default function TherapiesPage() {
  usePageMeta('therapies');

  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    therapy: '',
    date: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div data-page="therapies">
      {/* ===== Hero ===== */}
      <section className="bg-background pt-[120px] pb-[60px] sm:pt-[140px] md:pt-[160px] md:pb-[80px]">
        <Container className="max-w-[1320px]">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-start gap-5"
            >
              <motion.span
                variants={fadeUp}
                className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-secondary"
              >
                Natural Healing Therapies
              </motion.span>

              <motion.h1
                variants={fadeUp}
                className="font-heading text-3xl font-semibold leading-tight text-dark sm:text-4xl md:text-5xl"
              >
                Heal Naturally.
                <br />
                Restore Balance.
                <br />
                <span className="text-primary">Live Better.</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="max-w-md text-base leading-relaxed text-muted">
                At Vimoksha Yogshala, we combine the wisdom of Ayurveda,
                Naturopathy and traditional healing therapies to address the
                root cause of discomfort and support your body's natural
                healing process.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-2 grid w-full grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4"
              >
                {heroBadges.map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <div key={badge.label} className="flex flex-col items-start gap-2">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-white text-primary">
                        <Icon className="text-lg" />
                      </span>
                      <span className="font-body text-xs font-medium leading-snug text-dark/70">
                        {badge.label}
                      </span>
                    </div>
                  );
                })}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-[28px] shadow-elevated"
            >
              <img
                src="/images/therapies/hero.jpg"
                alt="Guest enjoying a calming candlelit head and face massage at Vimoksha Yogshala"
                className="h-[320px] w-full object-cover sm:h-[380px] md:h-[420px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
              <blockquote className="absolute bottom-6 right-6 max-w-[220px] text-right font-heading text-lg font-medium leading-snug text-white sm:bottom-8 sm:right-8">
                <span className="mb-1 block text-3xl leading-none text-white/70">&ldquo;</span>
                Nature has the power to heal. We simply help your body remember it.
              </blockquote>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ===== Therapies grid ===== */}
      <section className="bg-white py-[60px] md:py-[100px]">
        <Container className="max-w-[1400px]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto mb-12 flex flex-col items-center gap-3 text-center"
          >
            <motion.h2
              variants={fadeUp}
              className="font-heading text-2xl font-semibold uppercase tracking-wide text-dark sm:text-3xl"
            >
              Our Healing Therapies
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {therapies.map((therapy) => {
              const Icon = therapy.icon;
              const accent = accentClasses[therapy.accent];
              return (
                <motion.div
                  key={therapy.title}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="flex flex-col overflow-hidden rounded-[20px] border border-border bg-background shadow-soft transition-shadow duration-300 hover:shadow-elevated"
                >
                  <div className="relative">
                    <img
                      src={therapy.image}
                      alt={therapy.title}
                      className="h-[150px] w-full object-cover"
                    />
                    <span
                      className={`absolute -bottom-5 left-5 flex h-11 w-11 items-center justify-center rounded-full border-4 border-background ${accent.icon}`}
                    >
                      <Icon className="text-lg" />
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col px-5 pb-5 pt-8">
                    <h3 className="font-heading text-lg font-semibold uppercase tracking-wide text-dark">
                      {therapy.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {therapy.description}
                    </p>

                    <p className="mt-4 font-body text-xs font-bold uppercase tracking-wide text-dark">
                      Recommended For
                    </p>
                    <ul className="mt-1.5 space-y-0.5">
                      {therapy.recommendedFor.map((item) => (
                        <li key={item} className="text-xs leading-relaxed text-muted">
                          &bull; {item}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-4 font-body text-xs font-bold uppercase tracking-wide text-dark">
                      Benefits
                    </p>
                    <ul className="mt-1.5 space-y-0.5">
                      {therapy.benefits.map((item) => (
                        <li key={item} className="text-xs leading-relaxed text-muted">
                          &bull; {item}
                        </li>
                      ))}
                    </ul>

                    <a
                      href="#book-consultation"
                      className={`mt-auto pt-5 inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-2.5 font-body text-xs font-bold uppercase tracking-wide transition-colors ${EXPLORE_BUTTON_CLASS}`}
                    >
                      Explore
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* ===== Main content + sticky booking sidebar ===== */}
      <section className="bg-background pt-[60px] md:pt-[100px]">
        <Container className="max-w-[1400px]">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
            {/* ----- Left column ----- */}
            <div className="flex flex-col gap-16">
              {/* Benefits of natural healing */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <motion.h2
                  variants={fadeUp}
                  className="mb-8 text-center font-heading text-xl font-semibold uppercase tracking-wide text-dark sm:text-2xl"
                >
                  Benefits of Natural Healing
                </motion.h2>
                <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
                  {healingBenefits.map((item) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.label}
                        variants={fadeUp}
                        className="flex flex-col items-center gap-3 text-center"
                      >
                        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-white text-primary shadow-soft">
                          <Icon className="text-2xl" />
                        </span>
                        <span className="font-body text-xs font-medium leading-snug text-dark/70">
                          {item.label}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Why choose us */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <motion.h2
                  variants={fadeUp}
                  className="mb-8 text-center font-heading text-xl font-semibold uppercase tracking-wide text-dark sm:text-2xl"
                >
                  Why Choose Vimoksha Yogshala?
                </motion.h2>
                <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
                  {whyChooseUs.map((item) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.label}
                        variants={fadeUp}
                        className="flex flex-col items-center gap-3 text-center"
                      >
                        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-white text-secondary shadow-soft">
                          <Icon className="text-2xl" />
                        </span>
                        <span className="font-body text-xs font-medium leading-snug text-dark/70">
                          {item.label}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* ----- Right column: booking sidebar ----- */}
            <motion.div
              id="book-consultation"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-fit overflow-hidden rounded-[20px] border border-border shadow-elevated lg:sticky lg:top-28"
            >
              <div className="bg-secondary px-6 py-5 text-white">
                <h3 className="font-heading text-base font-bold uppercase tracking-wide">
                  Book Your Therapy Consultation
                </h3>
                <p className="mt-1 font-body text-xs text-white/80">
                  Fill in the details and we will get in touch with you.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-white px-6 py-6">
                <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-2.5">
                  <IoPersonOutline className="shrink-0 text-muted" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Name *"
                    className="w-full bg-transparent font-body text-sm text-dark outline-none placeholder:text-muted"
                  />
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-2.5">
                  <IoCallOutline className="shrink-0 text-muted" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number *"
                    className="w-full bg-transparent font-body text-sm text-dark outline-none placeholder:text-muted"
                  />
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-2.5">
                  <IoMailOutline className="shrink-0 text-muted" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email Address *"
                    className="w-full bg-transparent font-body text-sm text-dark outline-none placeholder:text-muted"
                  />
                </div>

                <div className="relative flex items-center gap-2 rounded-lg border border-border px-3 py-2.5">
                  <IoLeafOutline className="shrink-0 text-muted" />
                  <select
                    name="therapy"
                    required
                    value={form.therapy}
                    onChange={handleChange}
                    className="w-full appearance-none bg-transparent font-body text-sm text-dark outline-none"
                  >
                    <option value="" disabled>Select Therapy *</option>
                    {therapyOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <IoChevronDown className="pointer-events-none absolute right-3 text-muted" />
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-2.5">
                  <IoCalendarOutline className="shrink-0 text-muted" />
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    placeholder="Preferred Date"
                    className="w-full bg-transparent font-body text-sm text-dark outline-none placeholder:text-muted"
                  />
                </div>

                <div className="flex items-start gap-2 rounded-lg border border-border px-3 py-2.5">
                  <IoDocumentTextOutline className="mt-0.5 shrink-0 text-muted" />
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Your Message (Optional)"
                    rows={3}
                    className="w-full resize-none bg-transparent font-body text-sm text-dark outline-none placeholder:text-muted"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="mt-1 h-[50px] rounded-full text-sm font-bold uppercase tracking-wide"
                >
                  {submitted ? 'Request Sent' : 'Book Consultation'}
                </Button>

                <div className="my-1 flex items-center gap-3">
                  <span className="h-px flex-1 bg-border" />
                  <span className="font-body text-xs font-medium text-muted">OR</span>
                  <span className="h-px flex-1 bg-border" />
                </div>

                <a
                  href="https://wa.me/919026612796"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-[50px] items-center justify-center gap-2 rounded-full bg-[#25D366] font-body text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
                >
                  <IoLogoWhatsapp className="text-lg" />
                  Chat on WhatsApp
                </a>

                <a
                  href="tel:+919026612796"
                  className="inline-flex h-[50px] items-center justify-center gap-2 rounded-full border border-border font-body text-sm font-bold uppercase tracking-wide text-dark transition-colors hover:border-primary hover:text-primary"
                >
                  <IoCallOutline className="text-lg" />
                  Call Now: +91 90266 12796
                </a>
              </form>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ===== Client reviews & FAQ (full width) ===== */}
      <section className="bg-background pb-[60px] md:pb-[100px]">
        <Container className="max-w-[1400px]">
          <div className="flex flex-col gap-16">
              {/* Testimonials */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <motion.h2
                  variants={fadeUp}
                  className="mb-8 text-center font-heading text-xl font-semibold uppercase tracking-wide text-dark sm:text-2xl"
                >
                  What Our Clients Say
                </motion.h2>
                <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {testimonials.map((t) => (
                    <motion.div
                      key={t.name}
                      variants={fadeUp}
                      className="flex h-full flex-col rounded-[20px] border border-border bg-white p-5 shadow-soft"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={t.image}
                          alt={t.name}
                          className="h-11 w-11 shrink-0 rounded-full object-cover"
                        />
                        <div className="flex text-primary">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <IoStar key={i} className="text-sm" />
                          ))}
                        </div>
                      </div>
                      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                        {t.quote}
                      </p>
                      <p className="mt-4 font-heading text-sm font-semibold text-dark">
                        &mdash; {t.name}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* FAQ */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <motion.h2
                  variants={fadeUp}
                  className="mb-8 text-center font-heading text-xl font-semibold uppercase tracking-wide text-dark sm:text-2xl"
                >
                  Frequently Asked Questions
                </motion.h2>
                <div className="grid grid-cols-1 gap-x-8 gap-y-1 sm:grid-cols-3">
                  {faqs.map((faq, i) => {
                    const isOpen = openFaq === i;
                    return (
                      <motion.div key={faq.q} variants={fadeUp} className="border-b border-border py-3">
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? null : i)}
                          className="flex w-full items-center justify-between gap-3 text-left"
                          aria-expanded={isOpen}
                        >
                          <span className="font-body text-sm font-medium text-dark/80">
                            {faq.q}
                          </span>
                          <span className="shrink-0 text-primary">
                            {isOpen ? <IoRemoveOutline /> : <IoAddOutline />}
                          </span>
                        </button>
                        {isOpen && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.25 }}
                            className="mt-2 text-xs leading-relaxed text-muted"
                          >
                            {faq.a}
                          </motion.p>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
          </div>
        </Container>
      </section>

      {/* ===== Closing CTA banner ===== */}
      <section className="relative overflow-hidden bg-dark py-14">
        <img
          src="/images/therapies/hero.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/90 to-dark/40" />
        <Container className="relative max-w-[1320px]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between"
          >
            <motion.div variants={fadeUp}>
              <h2 className="font-heading text-2xl font-semibold text-white sm:text-3xl">
                Begin Your <span className="text-primary">Natural Healing Journey</span> Today
              </h2>
              <p className="mt-2 font-body text-sm text-white/70">
                Let nature heal you. Let us guide you.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-6">
              {[
                { label: 'Heal Naturally', icon: IoLeafOutline },
                { label: 'Restore Balance', icon: IoBodyOutline },
                { label: 'Reduce Stress', icon: IoHeartOutline },
                { label: 'Live Better', icon: IoSparklesOutline },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex flex-col items-center gap-2 text-center">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-primary">
                      <Icon className="text-lg" />
                    </span>
                    <span className="font-body text-xs font-medium text-white/80">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </motion.div>

            <motion.div variants={fadeUp}>
              <Button
                as={Link}
                to="/contact"
                variant="primary"
                size="lg"
                icon={<HiArrowRight className="h-4 w-4" />}
                className="h-[52px] rounded-full px-8 text-sm"
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