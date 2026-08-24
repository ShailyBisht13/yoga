import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Users,
  Users2,
  Award,
  Clock,
  CheckCircle2,
  Home,
  UtensilsCrossed,
  TreePine,
  Wifi,
  UserCheck,
  FlaskConical,
  Hand,
  BookOpen,
  HeartPulse,
  MessageCircle,
  Phone,
  CalendarCheck,
  Plus,
  Minus,
  Flower2,
  Info,
  ImageIcon,
  Calendar,
  Star,
  Check,
  ChevronRight,
  ShieldCheck,
  GraduationCap,
  Sparkle,
} from 'lucide-react';
import SEO from '@/components/common/SEO';
import { useAppContext } from '@/context/AppContext';

/* ===== Image Slot Component ===== */
function ImageSlot({ src, alt = '', label, className = '', focus = 'center' }) {
  if (src) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          style={{ objectPosition: focus }}
        />
      </div>
    );
  }
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed border-primary-light/50 bg-primary-light/10 text-primary-dark/50 ${className}`}
    >
      <ImageIcon className="w-6 h-6" />
      {label && (
        <span className="text-[11px] font-semibold uppercase tracking-wide text-center px-2">
          {label}
        </span>
      )}
    </div>
  );
}

/* ===== Decorative Lotus Mark ===== */
function LotusMark({ className = '' }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor">
      {[0, 45, 90, 135].map((deg) => (
        <ellipse
          key={deg}
          cx="100"
          cy="100"
          rx="90"
          ry="26"
          strokeWidth="1"
          transform={`rotate(${deg} 100 100)`}
        />
      ))}
      <circle cx="100" cy="100" r="6" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ===== Section Badge ===== */
function RibbonLabel({ children, tone = 'dark', icon: Icon }) {
  const toneClasses =
    tone === 'dark' ? 'bg-primary-dark text-white' : 'bg-secondary text-white';
  return (
    <div
      className={`inline-flex items-center gap-2 ${toneClasses} rounded-full px-5 py-2 text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-soft`}
    >
      {Icon ? <Icon className="w-4 h-4" /> : null}
      {children}
    </div>
  );
}

/* ===== Card Panel Wrapper ===== */
function Panel({ children, className = '' }) {
  return (
    <div
      className={`bg-surface rounded-2xl border border-border shadow-card p-6 sm:p-7 ${className}`}
    >
      {children}
    </div>
  );
}

/* ===== Static Data Definitions ===== */
const heroFeatures = [
  { icon: Sparkles, label: 'Traditional Wisdom', desc: 'Classical Hatha & Vinyasa roots' },
  { icon: Users, label: 'Experienced Faculty', desc: 'Master yogis & expert gurus' },
  { icon: Users2, label: 'Small Batch Size', desc: 'Max 12-15 students for personal care' },
  { icon: Award, label: 'Yoga Alliance USA', desc: 'RYS 200 Internationally Certified' },
];

const upcomingBatches = [
  {
    month: 'September 2026 Batch',
    dates: 'Sep 1 – Sep 28, 2026',
    status: 'Filling Fast',
    seatsLeft: '3 Seats Left',
    badgeTone: 'bg-amber-100 text-amber-800 border-amber-300',
  },
  {
    month: 'October 2026 Batch',
    dates: 'Oct 1 – Oct 28, 2026',
    status: 'Open for Registration',
    seatsLeft: '7 Seats Left',
    badgeTone: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  },
  {
    month: 'November 2026 Batch',
    dates: 'Nov 1 – Nov 28, 2026',
    status: 'Open for Registration',
    seatsLeft: '10 Seats Left',
    badgeTone: 'bg-blue-100 text-blue-800 border-blue-300',
  },
];

const curriculumModules = [
  {
    id: 'asana',
    title: '1. Asana Alignment & Adjustments',
    desc: 'Master 80+ foundational & advanced poses with precision alignment, anatomy cues, and safe hands-on adjustments.',
    highlights: [
      'Hatha & Vinyasa Flow Primary Series',
      'Anatomical alignment & modification props',
      'Hands-on physical adjustments & corrections',
      'Avoidance of common injuries & contraindications',
    ],
  },
  {
    id: 'anatomy',
    title: '2. Yogic Anatomy & Biomechanics',
    desc: 'Understand how the human body moves, breathes, and responds to yogic practices from both Western and Eastern perspectives.',
    highlights: [
      'Musculoskeletal system in posture mechanics',
      'Nervous system, breath regulation & stress response',
      'Subtle body: Chakras, Nadis, Pancha Koshas & Prana',
      'Biomechanics of spinal health & joint flexibility',
    ],
  },
  {
    id: 'philosophy',
    title: '3. Yoga Philosophy & Sutras',
    desc: 'Explore the timeless spiritual heritage of Patanjali Yoga Sutras, Bhagavad Gita, and the 8 Limbs of Yoga.',
    highlights: [
      'History and origin of classical Yoga',
      'Patanjali Yoga Sutras (4 Padas breakdown)',
      'The 8 Limbs (Yama, Niyama to Samadhi)',
      'Applying ancient wisdom in modern daily life',
    ],
  },
  {
    id: 'pranayama',
    title: '4. Pranayama, Shatkarma & Meditation',
    desc: 'Deepen inner stillness through traditional yogic breathwork, cleansing techniques, and mindfulness meditation.',
    highlights: [
      'Classical Pranayama (Nadi Shodhana, Kapalabhati, Bhastrika)',
      'Shatkarma detox techniques (Jala Neti, Trataka)',
      'Dhyana (Meditation) techniques & Mantra chanting',
      'Yoga Nidra & deep relaxation practices',
    ],
  },
  {
    id: 'teaching',
    title: '5. Teaching Methodology & Cueing',
    desc: 'Build confidence, clarity, and voice modulation to structure and lead inspiring yoga classes.',
    highlights: [
      'Effective class sequencing & theme planning',
      'Verbal cueing, tone & spatial awareness',
      'Teaching mixed-ability & beginner groups',
      'Classroom management & student engagement',
    ],
  },
  {
    id: 'practicum',
    title: '6. Practicum & Yogic Lifestyle',
    desc: 'Put theory into practice by co-teaching classes, receiving peer feedback, and adopting a true yogic lifestyle.',
    highlights: [
      'Live teaching practice with real feedback',
      'Yogic diet (Satvik principles) & daily routine',
      'Code of ethics for professional yoga teachers',
      'Business of Yoga: Marketing & starting your studio',
    ],
  },
];

const schedule = [
  ['6:00 AM – 6:30 AM', 'Pranayama & Meditation (Stillness)'],
  ['6:30 AM – 8:00 AM', 'Morning Asana Practice (Hatha / Vinyasa)'],
  ['8:00 AM – 9:00 AM', 'Nutritious Satvik Breakfast & Break'],
  ['9:00 AM – 10:30 AM', 'Anatomy, Physiology & Biomechanics'],
  ['10:45 AM – 12:15 PM', 'Yoga Philosophy & Patanjali Sutras'],
  ['12:15 PM – 1:15 PM', 'Satvik Lunch & Relaxation'],
  ['1:15 PM – 2:45 PM', 'Teaching Methodology & Alignment Workshop'],
  ['3:00 PM – 4:00 PM', 'Self-Study, Assignments & Group Discussion'],
  ['4:15 PM – 5:45 PM', 'Evening Asana & Practicum Lab'],
  ['6:00 PM – 7:00 PM', 'Evening Chanting, Kirtan & Meditation'],
];

function scheduleDot(activity) {
  const a = activity.toLowerCase();
  if (a.includes('break') || a.includes('lunch') || a.includes('rest')) {
    return 'bg-border';
  }
  if (a.includes('meditation') || a.includes('pranayama') || a.includes('chanting') || a.includes('kirtan')) {
    return 'bg-secondary';
  }
  return 'bg-primary';
}

const certBenefits = [
  'Yoga Alliance USA Certified (RYS 200 Registration)',
  'Internationally Recognized Teaching Qualification Worldwide',
  'Lifetime Access to Faculty Mentorship & Community',
  'Professional Teaching Methodology & Studio Guidance',
  'Career Support & Assistance for Global Placement',
];

const whoCanJoin = [
  'Beginners seeking a strong yogic foundation',
  'Regular yoga practitioners deepening their practice',
  'Fitness trainers & wellness coaches adding Yoga certification',
  'Aspiring yoga teachers preparing for a global career',
  'Anyone seeking personal transformation & inner peace',
];

const inclusions = [
  '200 Hours Intensive Training & Official Study Manuals',
  'Yoga Alliance RYS 200 Certificate upon graduation',
  'Yoga Mat, Cleansing Kit (Jala Neti Pot) & Studio T-shirt',
  'Daily 3 Fresh Satvik Vegetarian Meals & Herbal Teas',
  'Accommodation Options (Shared or Private Room)',
  'Excursions & Spiritual Outings in Serene Surroundings',
];

const accommodation = [
  { icon: Home, label: 'Clean & Comfortable Rooms' },
  { icon: UtensilsCrossed, label: '3 Daily Pure Satvik Meals' },
  { icon: TreePine, label: 'Peaceful Yogic Environment' },
  { icon: Wifi, label: 'High-Speed Wi-Fi Access' },
];

const whyChoose = [
  { icon: Users, label: 'Experienced & Dedicated Faculty' },
  { icon: UserCheck, label: 'Small Batch Size for Personal Attention' },
  { icon: FlaskConical, label: 'Traditional Wisdom with Modern Science' },
  { icon: Hand, label: 'Hands-on Practical Training & Adjustment' },
  { icon: TreePine, label: 'Peaceful & Natural Environment' },
  { icon: BookOpen, label: 'Comprehensive Study Material & Books' },
  { icon: Users2, label: 'Lifetime Learning Community & Support' },
  { icon: HeartPulse, label: 'Holistic Growth for Mind, Body & Soul' },
];

const faculty = [
  {
    name: 'Yogacharya Master Dev',
    role: 'Lead Asana & Alignment Instructor',
    exp: '12+ Years Teaching Experience',
    bio: 'Specializes in classical Hatha alignment, Vinyasa flow sequencing, and hands-on body adjustments.',
  },
  {
    name: 'Acharya Dr. Sharma',
    role: 'Philosophy & Sutra Scholar',
    exp: '15+ Years Academic & Spiritual Study',
    bio: 'Deep knowledge of Patanjali Yoga Sutras, Bhagavad Gita, and Sanskrit mantra chanting.',
  },
  {
    name: 'Dr. Neha Verma',
    role: 'Yogic Anatomy & Biomechanics Specialist',
    exp: '10+ Years Integrative Health Expertise',
    bio: 'Combines Western human anatomy with Eastern Chakra system and injury prevention.',
  },
];

const faqs = [
  {
    q: 'Do I need prior yoga experience to join the 200 Hour YTT?',
    a: 'No prior experience is strictly required. Our 200-hour program is thoughtfully structured to welcome complete beginners as well as intermediate practitioners looking to build a rock-solid foundation.',
  },
  {
    q: 'What is the duration of the 200 Hour YTT program?',
    a: 'The program runs for 4 weeks (or 28 days intensive) covering all practical and theoretical contact hours required for Yoga Alliance USA certification.',
  },
  {
    q: 'What is included in the course fee?',
    a: 'The course fee includes full tuition, comprehensive study manuals, yoga mat, Neti pot cleansing kit, studio t-shirt, Yoga Alliance certification, daily Satvik meals, and herbal teas. Room stay options are selected at enrollment.',
  },
  {
    q: 'Will I get an internationally valid certification?',
    a: 'Yes! Upon successful completion of practical assessments and written evaluations, you will receive an internationally recognized 200-Hour Teacher Training Certificate eligible for registration with Yoga Alliance USA (RYT 200).',
  },
  {
    q: 'How does the Early Bird Discount work?',
    a: 'When you confirm your enrollment at least 30 days prior to the batch start date, you receive our Early Bird rate of ₹42,000 (discounted from regular fee of ₹50,000). A non-refundable ₹5,000 deposit reserves your seat.',
  },
  {
    q: 'What are the accommodation and food arrangements?',
    a: 'We offer comfortable shared twin rooms as well as private single room options with attached bathrooms, 24/7 hot water, and high-speed Wi-Fi. All meals are 100% fresh, organic, Satvik vegetarian dishes.',
  },
  {
    q: 'What happens if I miss a class due to illness?',
    a: 'We provide catch-up sessions, faculty guidance, and study materials so you can easily complete any missed modules during the course.',
  },
  {
    q: 'How can I pay the course fee?',
    a: 'We accept credit/debit cards, UPI, net banking, and wire transfers. You can reserve your seat with a ₹5,000 deposit and pay the remaining balance on or before arrival.',
  },
];

const testimonials = [
  {
    name: 'Ananya Sharma',
    location: 'Delhi, India',
    rating: 5,
    text: 'Transformative month! The teachers at Vimoksha Yogshala explain alignment and philosophy with so much clarity. I gained full confidence to teach asana classes immediately after graduating.',
  },
  {
    name: 'Marcus Lindqvist',
    location: 'Stockholm, Sweden',
    rating: 5,
    text: 'A life-changing 200-hour YTT experience. Authentic yoga practices, wonderful Satvik meals, and lifetime mentorship. I registered as RYT 200 on Yoga Alliance right away.',
  },
  {
    name: 'Pooja Kulkarni',
    location: 'Mumbai, India',
    rating: 5,
    text: 'Small batch size meant personal attention from lead gurus every single day. The hands-on adjustments and anatomy modules were second to none.',
  },
];

export default function TeacherTrainingPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const [activeModule, setActiveModule] = useState(curriculumModules[0].id);
  const { openTrialModal } = useAppContext();

  const selectedModuleObj =
    curriculumModules.find((m) => m.id === activeModule) || curriculumModules[0];

  return (
    <div className="bg-background font-body text-dark">
      {/* SEO metadata */}
      <SEO
        title="200 Hour Yoga Teacher Training (RYS 200)"
        description="Join Vimoksha Yogshala's 200 Hour Yoga Alliance Certified Teacher Training program. Deepen your practice, master alignment & philosophy, and earn an international certification."
      />

      {/* HERO SECTION */}
      <section className="section-padding pt-28 sm:pt-20 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <LotusMark className="absolute -top-24 -left-24 w-[420px] h-[420px] text-primary-dark opacity-[0.05]" />
        </div>
        <div className="container-custom grid lg:grid-cols-2 gap-10 lg:gap-14 items-center relative">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary-dark text-xs font-semibold mb-4">
              <Award className="w-4 h-4 text-primary" />
              Yoga Alliance USA Certified (RYS 200)
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl leading-[1.15] text-dark font-semibold">
              200 Hour
            </h1>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl leading-[1.15] text-primary mt-1 font-semibold">
              Yoga Teacher Training
            </h2>
            <p className="font-heading italic text-xl sm:text-2xl text-primary-dark mt-3">
              Build a Strong Foundation & Become a Certified Yoga Instructor
            </p>
            <div className="flex items-center gap-2 my-4 text-secondary">
              <span className="h-px w-10 bg-border" />
              <Flower2 className="w-4 h-4" />
              <span className="h-px w-10 bg-border" />
            </div>
            <p className="text-muted text-base sm:text-lg max-w-xl leading-relaxed">
              An intensive, life-transforming program rooted in classical Hatha & Vinyasa Flow yoga,
              anatomical alignment, philosophy, pranayama, and professional teaching methodology.
            </p>

            {/* Feature Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {heroFeatures.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="flex flex-col items-center text-center gap-2 group">
                  <span className="w-14 h-14 rounded-full bg-surface border border-border shadow-soft flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <Icon className="w-6 h-6" />
                  </span>
                  <span className="text-xs font-semibold text-dark leading-tight">
                    {label}
                  </span>
                  <span className="text-[10px] text-muted leading-tight hidden sm:block">
                    {desc}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <button
                type="button"
                onClick={openTrialModal}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark transition-colors text-white font-semibold px-7 py-3.5 rounded-full shadow-elevated"
              >
                Enroll Now <Flower2 className="w-4 h-4" />
              </button>
              <a
                href="https://wa.me/919026612796?text=Hi%20Vimoksha%20Yogshala,%20I'm%20interested%20in%20the%20200%20Hour%20Yoga%20Teacher%20Training%20program."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:opacity-90 transition-opacity text-white font-semibold px-6 py-3.5 rounded-full shadow-soft"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Inquiry
              </a>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-elevated border border-border">
              <ImageSlot
                src="/images/teacher-training/hero.webp"
                alt="Yoga teacher training class in session at Vimoksha Yogshala"
                label="Teacher Training Class"
                className="w-full h-full"
              />
            </div>

            {/* Certification Badge Overlay */}
            <div className="absolute -bottom-5 -right-3 sm:-bottom-6 sm:-right-6 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-surface border-2 border-dashed border-secondary shadow-elevated flex flex-col items-center justify-center text-center leading-none p-2">
              <ShieldCheck className="w-5 h-5 text-secondary mb-0.5" />
              <span className="text-[9px] font-semibold tracking-wide text-primary-dark uppercase">
                Yoga Alliance USA
              </span>
              <span className="font-heading text-2xl text-primary font-bold my-0.5">
                RYS 200
              </span>
              <span className="text-[9px] font-semibold tracking-wide text-primary-dark uppercase">
                Certified
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* UPCOMING BATCHES SECTION */}
      <section className="section-padding bg-surface/50 border-y border-border py-12">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <RibbonLabel icon={Calendar}>Upcoming YTT Batches</RibbonLabel>
            <h2 className="font-heading text-3xl sm:text-4xl text-dark mt-3">
              Reserve Your Seat in Next Batch
            </h2>
            <p className="text-muted text-sm mt-2">
              Small batch size (max 15 students) to ensure personalized instruction & one-on-one feedback.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingBatches.map((batch) => (
              <Panel key={batch.month} className="flex flex-col justify-between hover:border-primary/40 transition-colors">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      28-Day Intensive
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${batch.badgeTone}`}
                    >
                      {batch.status}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl text-dark font-semibold">
                    {batch.month}
                  </h3>
                  <p className="text-sm font-medium text-primary-dark mt-1 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary shrink-0" />
                    {batch.dates}
                  </p>
                  <p className="text-xs text-muted mt-3 bg-background p-2.5 rounded-lg border border-border">
                    🔥 <strong>{batch.seatsLeft}</strong> remaining for this intake.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted block">Deposit to Reserve</span>
                    <span className="text-base font-bold text-dark">₹ 5,000</span>
                  </div>
                  <button
                    type="button"
                    onClick={openTrialModal}
                    className="inline-flex items-center gap-1 bg-primary hover:bg-primary-dark text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors"
                  >
                    Reserve Seat <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </Panel>
            ))}
          </div>
        </div>
      </section>

      {/* CURRICULUM SECTION (INTERACTIVE TABS) */}
      <section className="section-padding py-16">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <RibbonLabel icon={BookOpen}>Comprehensive Curriculum</RibbonLabel>
            <h2 className="font-heading text-3xl sm:text-4xl text-dark mt-3">
              What You Will Learn
            </h2>
            <p className="text-muted text-sm mt-2">
              Our 200-hour syllabus covers all 6 key modules mandated by Yoga Alliance USA.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Module Tabs List */}
            <div className="lg:col-span-5 flex flex-col gap-2">
              {curriculumModules.map((module) => {
                const isActive = module.id === activeModule;
                return (
                  <button
                    key={module.id}
                    type="button"
                    onClick={() => setActiveModule(module.id)}
                    className={`text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-primary text-white border-primary shadow-soft'
                        : 'bg-surface hover:bg-background border-border text-dark'
                    }`}
                  >
                    <span className="font-semibold text-sm sm:text-base">
                      {module.title}
                    </span>
                    <ChevronRight
                      className={`w-5 h-5 shrink-0 transition-transform ${
                        isActive ? 'text-white translate-x-1' : 'text-muted'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Active Module Details */}
            <div className="lg:col-span-7">
              <Panel className="border-2 border-primary/20">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondary mb-2">
                  <Sparkle className="w-4 h-4" /> Module Overview
                </div>
                <h3 className="font-heading text-2xl text-dark font-semibold">
                  {selectedModuleObj.title}
                </h3>
                <p className="text-muted text-sm sm:text-base mt-2 leading-relaxed">
                  {selectedModuleObj.desc}
                </p>

                <div className="my-6 h-px bg-border" />

                <h4 className="font-semibold text-dark text-sm mb-3">
                  Key Topics Covered:
                </h4>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {selectedModuleObj.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs sm:text-sm text-dark bg-background p-3 rounded-lg border border-border">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 relative aspect-[16/9] rounded-xl overflow-hidden shadow-soft border border-border">
                  <ImageSlot
                    src="/images/teacher-training/curriculum.jpg"
                    alt="Trainees practicing yoga poses"
                    label="Asana Practice & Curriculum"
                    className="w-full h-full"
                  />
                </div>
              </Panel>
            </div>
          </div>
        </div>
      </section>

      {/* DAILY SCHEDULE & CERTIFICATION */}
      <section className="section-padding pt-0">
        <div className="container-custom grid lg:grid-cols-2 gap-8">
          {/* Daily Schedule Timeline */}
          <Panel className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <RibbonLabel tone="light">Daily Schedule</RibbonLabel>
              <span className="text-xs text-muted font-semibold">Sample Intensive Day</span>
            </div>
            <p className="text-xs text-muted -mt-2">
              Structured daily routine designed to build discipline, focus, and physical strength.
            </p>
            <ul className="relative flex flex-col pl-2">
              <span
                className="absolute left-[11px] top-3 bottom-3 w-px bg-border"
                aria-hidden="true"
              />
              {schedule.map(([time, activity]) => (
                <li key={time} className="relative flex items-start gap-3 py-2.5">
                  <span
                    className={`relative z-10 mt-1.5 w-3 h-3 rounded-full ring-4 ring-surface shrink-0 ${scheduleDot(
                      activity
                    )}`}
                  />
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
                    <span className="text-xs font-bold text-primary-dark sm:w-36 sm:shrink-0">
                      {time}
                    </span>
                    <span className="text-xs sm:text-sm text-dark">{activity}</span>
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted bg-background border border-border rounded-lg px-3 py-2 flex items-start gap-2 mt-auto">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-secondary" />
              Schedule may slightly adapt on special excursion days, workshops & outdoor sessions.
            </p>
          </Panel>

          {/* Certification & Inclusions */}
          <div className="flex flex-col gap-6">
            <Panel className="flex flex-col gap-5 border-2 border-primary/20">
              <RibbonLabel icon={Award}>Certification</RibbonLabel>
              
              {/* Certificate Preview Card */}
              <div className="border-2 border-dashed border-primary-light/50 rounded-xl p-5 text-center bg-background relative overflow-hidden">
                <Flower2 className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-heading text-xl text-dark font-semibold">Certificate of Completion</p>
                <p className="text-xs text-muted mt-1">Is proudly awarded to</p>
                <p className="font-heading italic text-primary-dark text-lg font-semibold my-1">
                  (Your Full Name)
                </p>
                <p className="text-xs text-muted">
                  For completing the 200 Hour Hatha & Vinyasa Teacher Training Course
                </p>
                <div className="mt-3 pt-3 border-t border-border/60 flex items-center justify-between text-[11px] font-semibold text-dark">
                  <span>Vimoksha Yogshala</span>
                  <span className="text-secondary font-bold">Yoga Alliance RYS 200</span>
                </div>
              </div>

              <h4 className="font-semibold text-sm text-dark">Certification Benefits:</h4>
              <ul className="flex flex-col gap-2.5">
                {certBenefits.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-xs sm:text-sm text-dark">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel className="flex flex-col gap-4">
              <h4 className="font-heading text-xl text-dark font-semibold flex items-center gap-2">
                <GiftIcon className="w-5 h-5 text-primary" /> Included in Course Package:
              </h4>
              <ul className="grid sm:grid-cols-2 gap-2 text-xs text-dark">
                {inclusions.map((inc) => (
                  <li key={inc} className="flex items-start gap-2 bg-background p-2.5 rounded-lg border border-border">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </div>
      </section>

      {/* COURSE FEES & ACCOMMODATION */}
      <section className="section-padding pt-0">
        <div className="container-custom grid lg:grid-cols-3 gap-6">
          {/* Fees Card */}
          <Panel className="flex flex-col gap-5 border-2 border-primary/30 relative">
            <div className="absolute -top-3 right-5 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-soft">
              Best Value
            </div>
            <RibbonLabel tone="light">Course Fees</RibbonLabel>
            
            <div className="flex flex-col divide-y divide-border">
              {/* Early Bird */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-bold text-dark">Early Bird Offer</p>
                  <p className="text-xs text-emerald-700 font-semibold">Book 30 days prior</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-primary">₹ 42,000</p>
                  <p className="text-xs text-muted line-through">₹ 50,000</p>
                </div>
              </div>
              {/* Regular */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-semibold text-dark">Regular Fee</p>
                  <p className="text-xs text-muted">Standard rate</p>
                </div>
                <p className="text-lg font-bold text-dark">₹ 50,000</p>
              </div>
              {/* Deposit */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-semibold text-dark">Seat Booking</p>
                  <p className="text-xs text-muted">Advance deposit</p>
                </div>
                <p className="text-base font-bold text-secondary">₹ 5,000</p>
              </div>
            </div>

            <div className="bg-primary/5 rounded-xl p-3 border border-primary/15 text-xs text-muted space-y-1">
              <p>✔ <strong>Installments available:</strong> Pay deposit now, balance on arrival.</p>
              <p>✔ <strong>GST:</strong> Applicable extra as per government norms.</p>
            </div>

            <button
              type="button"
              onClick={openTrialModal}
              className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark transition-colors text-white font-semibold px-6 py-3.5 rounded-full shadow-soft"
            >
              Enroll & Reserve Seat <Flower2 className="w-4 h-4" />
            </button>
          </Panel>

          {/* Accommodation & Food */}
          <Panel className="flex flex-col gap-5">
            <RibbonLabel>Stay & Satvik Food</RibbonLabel>
            <p className="text-xs text-muted -mt-2">
              Comfortable, peaceful stay options paired with nourishing Satvik organic meals.
            </p>

            <div className="grid grid-cols-4 gap-2">
              {accommodation.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center text-center gap-1.5">
                  <span className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-primary">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="text-[10px] font-medium text-dark leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Photo Thumbnails */}
            <div className="grid grid-cols-3 gap-2">
              <ImageSlot
                src="/images/teacher-training/room.jpg"
                alt="Guest room at Vimoksha Yogshala"
                label="Room"
                className="aspect-square rounded-lg"
              />
              <ImageSlot
                src="/images/teacher-training/meal.jpeg"
                alt="Satvik meal spread"
                label="Satvik Meals"
                className="aspect-square rounded-lg"
              />
              <ImageSlot
                src="/images/teacher-training/grounds.jpg"
                alt="Peaceful outdoor grounds"
                label="Grounds"
                className="aspect-square rounded-lg"
              />
            </div>

            <div className="bg-primary-dark text-white rounded-lg p-3 text-xs text-center font-medium mt-auto">
              Shared Twin & Private Room options available at nominal extra charges.
            </div>
          </Panel>

          {/* Who Can Join */}
          <Panel className="flex flex-col gap-5">
            <RibbonLabel tone="light">Who Can Join?</RibbonLabel>
            <p className="text-xs text-muted -mt-2">
              This course is crafted for anyone ready to step onto the path of Yoga.
            </p>
            <ul className="flex flex-col gap-3">
              {whoCanJoin.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-dark">
                  <span className="w-5 h-5 rounded-full bg-secondary/15 text-secondary flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-4 flex justify-center border-t border-border">
              <div className="text-center">
                <GraduationCap className="w-8 h-8 text-primary mx-auto mb-1" />
                <span className="text-xs font-semibold text-muted">Join 500+ YTT Graduates Globally</span>
              </div>
            </div>
          </Panel>
        </div>
      </section>

      {/* LEAD FACULTY */}
      <section className="section-padding bg-surface/40 border-t border-border py-16">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <RibbonLabel icon={Users}>Meet Your Mentors</RibbonLabel>
            <h2 className="font-heading text-3xl sm:text-4xl text-dark mt-3">
              Learn From Experienced Masters
            </h2>
            <p className="text-muted text-sm mt-2">
              Dedicated gurus committed to guiding your physical, mental, and spiritual evolution.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {faculty.map((member) => (
              <Panel key={member.name} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary text-primary flex items-center justify-center mb-4">
                  <Users className="w-9 h-9" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-dark">{member.name}</h3>
                <p className="text-xs font-bold text-primary mt-0.5">{member.role}</p>
                <p className="text-[11px] font-semibold text-secondary mt-1 bg-secondary/10 px-3 py-1 rounded-full">
                  {member.exp}
                </p>
                <p className="text-xs text-muted mt-3 leading-relaxed">{member.bio}</p>
              </Panel>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ & WHY CHOOSE US */}
      <section className="section-padding py-16">
        <div className="container-custom grid lg:grid-cols-12 gap-8 items-start">
          {/* FAQ Accordion */}
          <div className="lg:col-span-7">
            <Panel>
              <div className="flex justify-center mb-6">
                <RibbonLabel icon={Flower2}>Frequently Asked Questions</RibbonLabel>
              </div>

              <div className="flex flex-col divide-y divide-border">
                {faqs.map((item, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={item.q} className="py-2">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between gap-4 py-3 text-left"
                      >
                        <span className="text-sm font-semibold text-dark">{item.q}</span>
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        </span>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <p className="text-xs sm:text-sm text-muted pb-4 pr-6 leading-relaxed">
                              {item.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </Panel>
          </div>

          {/* Why Choose Us & Reviews */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Panel>
              <div className="flex justify-center mb-6">
                <RibbonLabel>Why Choose Vimoksha Yogshala?</RibbonLabel>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {whyChoose.slice(0, 6).map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center text-center gap-2 bg-background p-3 rounded-xl border border-border">
                    <span className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="text-[11px] font-semibold text-dark leading-tight">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </Panel>

            {/* Testimonial Quote */}
            <Panel className="bg-primary-dark text-white border-none">
              <div className="flex items-center gap-1 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="italic text-xs sm:text-sm leading-relaxed text-white/90">
                "{testimonials[0].text}"
              </p>
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="font-bold">{testimonials[0].name}</span>
                <span className="text-secondary-light">{testimonials[0].location}</span>
              </div>
            </Panel>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-primary-dark relative overflow-hidden py-12">
        <LotusMark className="pointer-events-none absolute -bottom-20 -right-20 w-72 h-72 text-white opacity-[0.06]" />
        <div className="container-custom flex flex-col lg:flex-row items-center justify-between gap-6 relative">
          <div className="text-center lg:text-left">
            <h3 className="text-white font-heading text-2xl sm:text-3xl font-semibold">
              Ready to Begin Your Yogic Transformation?
            </h3>
            <p className="text-secondary-light italic font-heading mt-1 text-base sm:text-lg">
              Reserve your seat for the upcoming 200 Hour Teacher Training batch.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://wa.me/919026612796?text=Hi%20Vimoksha%20Yogshala,%20I'm%20interested%20in%20the%20200%20Hour%20Yoga%20Teacher%20Training%20program."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:opacity-90 transition-opacity text-white font-semibold text-sm px-5 py-3 rounded-full"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="flex flex-col items-start leading-tight">
                Chat on WhatsApp
                <span className="text-[10px] font-normal opacity-90">+91 9026612796</span>
              </span>
            </a>
            <a
              href="tel:+919026612796"
              className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-light transition-colors text-white font-semibold text-sm px-5 py-3 rounded-full"
            >
              <Phone className="w-4 h-4" />
              <span className="flex flex-col items-start leading-tight">
                Call Now
                <span className="text-[10px] font-normal opacity-90">+91 9026612796</span>
              </span>
            </a>
            <button
              type="button"
              onClick={openTrialModal}
              className="inline-flex items-center gap-2 bg-white text-primary-dark hover:bg-surface transition-colors font-semibold text-sm px-6 py-3 rounded-full shadow-soft"
            >
              <CalendarCheck className="w-4 h-4" />
              Enroll / Reserve Seat
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function GiftIcon({ className = '' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V6a2 2 0 10-2 2h2zm8 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V10m16 0H4m16 0l-1-4H5L4 10" />
    </svg>
  );
}