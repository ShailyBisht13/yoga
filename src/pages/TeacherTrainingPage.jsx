import React, { useState } from 'react';
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
} from 'lucide-react';

/* Drop-in image slot: pass a `src` once you have the real photo and it
   renders normally. Until then it shows a labeled dashed placeholder so
   the layout and spacing are already correct. */
function ImageSlot({ src, alt = '', label, className = '', focus = 'center' }) {
  if (src) {
    // The sizing/rounding classes go on the wrapper, and the <img> just
    // fills it — keeps width/height utilities from colliding on one
    // element, so the crop is always predictable instead of stretched.
    return (
      <div className={`overflow-hidden ${className}`}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
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

/* Signature decorative device: a quiet radial line motif built from the
   page's existing Flower2 mark, used once in the hero and once in the
   closing banner so it reads as the studio's own mark rather than
   repeated decoration. */
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

const heroFeatures = [
  { icon: Sparkles, label: 'Traditional Wisdom' },
  { icon: Users, label: 'Experienced Faculty' },
  { icon: Users2, label: 'Small Batch Size' },
  { icon: Award, label: 'Yoga Alliance Certified' },
];

const curriculum = [
  { title: 'Asana Practice', desc: 'Master foundational poses with alignment & safety.' },
  { title: 'Anatomy & Physiology', desc: 'Understand the body, muscles, joints & systems.' },
  { title: 'Yoga Philosophy', desc: 'History of yoga, Patanjali Yoga Sutras & 8 Limbs of Yoga.' },
  { title: 'Pranayama & Meditation', desc: 'Breath awareness, focus & inner balance.' },
  { title: 'Teaching Methodology', desc: 'Class sequencing, cueing, adjustments & observation.' },
  { title: 'Lifestyle & Ethics', desc: 'Yogic lifestyle, values & professionalism.' },
];

const schedule = [
  ['6:00 AM – 6:30 AM', 'Pranayama & Meditation'],
  ['6:30 AM – 8:00 AM', 'Asana Practice'],
  ['8:00 AM – 9:00 AM', 'Breakfast & Break'],
  ['9:00 AM – 10:30 AM', 'Anatomy / Yoga Philosophy'],
  ['10:45 AM – 12:15 PM', 'Teaching Methodology'],
  ['12:15 PM – 1:15 PM', 'Lunch & Rest'],
  ['1:15 PM – 2:45 PM', 'Practical Lab / Workshop'],
  ['3:00 PM – 4:00 PM', 'Self Study / Assignments'],
  ['4:15 PM – 5:15 PM', 'Meditation / Chanting'],
  ['7:00 PM – 8:00 PM', 'Evening Self Practice'],
];

// Purely visual classification of the existing schedule text, so the
// timeline dot's color signals what kind of activity it is (practice /
// stillness / rest) — no wording is changed or added.
function scheduleDot(activity) {
  const a = activity.toLowerCase();
  if (a.includes('break') || a.includes('lunch') || a.includes('rest')) {
    return 'bg-border';
  }
  if (a.includes('meditation') || a.includes('pranayama') || a.includes('chanting')) {
    return 'bg-secondary';
  }
  return 'bg-primary';
}

const certBenefits = [
  'Yoga Alliance USA Certified (RYS 200)',
  'Internationally Recognized Certification',
  'Lifetime Support & Guidance',
  'Professional Teaching Skills',
  'Boost Your Confidence & Career',
];

const whoCanJoin = [
  'Complete Beginners',
  'Yoga Practitioners',
  'Fitness & Wellness Professionals',
  'Aspiring Yoga Teachers',
  'Anyone Passionate About Yoga',
];

const accommodation = [
  { icon: Home, label: 'Comfortable Rooms' },
  { icon: UtensilsCrossed, label: 'Pure & Satvik Meals' },
  { icon: TreePine, label: 'Peaceful Environment' },
  { icon: Wifi, label: 'High Speed Wi-Fi' },
];

const whyChoose = [
  { icon: Users, label: 'Experienced & Dedicated Faculty' },
  { icon: UserCheck, label: 'Small Batch Size for Personal Care' },
  { icon: FlaskConical, label: 'Traditional Yoga with Modern Science' },
  { icon: Hand, label: 'Hands-on Practical Training' },
  { icon: TreePine, label: 'Peaceful & Natural Environment' },
  { icon: BookOpen, label: 'Comprehensive Study Material' },
  { icon: Users2, label: 'Lifetime Learning Community' },
  { icon: HeartPulse, label: 'Holistic Growth Mind, Body & Soul' },
];

const faqs = [
  {
    q: 'Do I need prior yoga experience to join?',
    a: 'No prior experience is required. The program is designed to welcome complete beginners as well as practitioners looking to deepen their knowledge.',
  },
  {
    q: 'What is the duration of the 200 Hour YTT?',
    a: 'The course runs for 8 weeks on a full-time, residential basis, covering all required contact hours for certification.',
  },
  {
    q: 'What is included in the course?',
    a: 'Tuition, study material, daily practice sessions, and certification are included. Accommodation and meals are available as an optional add-on.',
  },
  {
    q: 'Will I get a certification after completion?',
    a: 'Yes — graduates receive a Yoga Alliance USA-recognized 200-hour teacher training certificate.',
  },
  {
    q: 'Is accommodation available?',
    a: 'Yes, comfortable on-site rooms with meals are available for an additional fee.',
  },
  {
    q: 'How can I pay the course fees?',
    a: 'We accept full payment or easy installments — reach out to our team to set up a plan that works for you.',
  },
];

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

function Panel({ children, className = '' }) {
  return (
    <div
      className={`bg-surface rounded-2xl border border-border shadow-card p-6 sm:p-7 ${className}`}
    >
      {children}
    </div>
  );
}

export default function TeacherTrainingPage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="bg-background font-body text-dark">
      {/* HERO */}
      <section className="section-padding pt-12 sm:pt-16 relative overflow-hidden">
        <LotusMark className="pointer-events-none absolute -top-24 -left-24 w-[420px] h-[420px] text-primary-dark opacity-[0.05]" />
        <div className="container-custom grid lg:grid-cols-2 gap-10 lg:gap-14 items-center relative">
          <div>
            <h1 className="font-heading text-4xl sm:text-5xl leading-tight text-dark">
              200 Hour
            </h1>
            <h2 className="font-heading text-3xl sm:text-4xl leading-tight text-primary mt-1">
              Yoga Teacher Training
            </h2>
            <p className="font-heading italic text-xl sm:text-2xl text-primary-dark mt-3">
              Build a Strong Foundation in Yoga
            </p>
            <div className="flex items-center gap-2 my-4 text-secondary">
              <span className="h-px w-10 bg-border" />
              <Flower2 className="w-4 h-4" />
              <span className="h-px w-10 bg-border" />
            </div>
            <p className="text-muted text-base sm:text-lg max-w-xl">
              A comprehensive program for beginners and aspiring yoga teachers to
              deepen knowledge, build confidence and inspire others.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {heroFeatures.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center text-center gap-2">
                  <span className="w-14 h-14 rounded-full bg-surface border border-border shadow-soft flex items-center justify-center text-primary">
                    <Icon className="w-6 h-6" />
                  </span>
                  <span className="text-xs font-medium text-dark leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="/contact"
              className="inline-flex items-center gap-2 mt-8 bg-primary hover:bg-primary-dark transition-colors text-white font-semibold px-7 py-3.5 rounded-full shadow-elevated"
            >
              Enroll Now <Flower2 className="w-4 h-4" />
            </a>
          </div>

          {/* Hero visual */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-elevated border border-border">
              <ImageSlot
                src="/images/teacher-training/hero.webp"
                alt="Yoga teacher training class in session"
                label="Add hero photo — studio / class in session (4:3)"
                className="w-full h-full"
              />
            </div>

            {/* Certification badge */}
            <div className="absolute -bottom-5 -right-3 sm:-bottom-6 sm:-right-6 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-surface border-2 border-dashed border-secondary shadow-elevated flex flex-col items-center justify-center text-center leading-none">
              <span className="text-[10px] font-semibold tracking-wide text-primary-dark uppercase">
                Yoga Alliance
              </span>
              <span className="font-heading text-xl text-primary font-semibold">
                RYS 200
              </span>
              <span className="text-[10px] font-semibold tracking-wide text-primary-dark uppercase">
                Certified
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION DIVIDER */}
      <div className="container-custom flex justify-center py-8">
        <RibbonLabel icon={Info}>Complete Course Information</RibbonLabel>
      </div>

      {/* CURRICULUM / SCHEDULE / CERTIFICATION */}
      <section className="section-padding pt-8">
        <div className="container-custom grid lg:grid-cols-3 gap-6">
          {/* Curriculum */}
          <Panel className="flex flex-col gap-5">
            <RibbonLabel>Curriculum</RibbonLabel>
            <p className="text-xs font-semibold text-muted -mt-3">What You'll Learn</p>
            <ul className="flex flex-col gap-4">
              {curriculum.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-dark text-sm">{item.title}</p>
                    <p className="text-xs text-muted mt-0.5">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <ImageSlot
              src="/images/teacher-training/curriculum.jpg"
              alt="Trainees practicing yoga poses outdoors"
              label="Add practice photo (3:2)"
              className="aspect-[3/2] rounded-xl mt-auto"
            />
          </Panel>

          {/* Daily Schedule — same content, now a simple timeline */}
          <Panel className="flex flex-col gap-5">
            <RibbonLabel tone="light">Daily Schedule</RibbonLabel>
            <p className="text-xs font-semibold text-muted -mt-3">Sample Day</p>
            <ul className="relative flex flex-col">
              <span
                className="absolute left-[5px] top-2 bottom-2 w-px bg-border"
                aria-hidden="true"
              />
              {schedule.map(([time, activity]) => (
                <li key={time} className="relative flex items-start gap-3 py-2.5">
                  <span
                    className={`relative z-10 mt-1.5 w-[11px] h-[11px] rounded-full ring-4 ring-surface ${scheduleDot(
                      activity
                    )}`}
                  />
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
                    <span className="text-xs font-semibold text-primary-dark sm:w-32 sm:shrink-0">
                      {time}
                    </span>
                    <span className="text-sm text-dark">{activity}</span>
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted bg-background border border-border rounded-lg px-3 py-2 flex items-start gap-2">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-secondary" />
              Schedule may vary on special days, workshops & excursions.
            </p>
          </Panel>

          {/* Certification */}
          <Panel className="flex flex-col gap-5">
            <RibbonLabel>Certification</RibbonLabel>
            <div className="border-2 border-dashed border-primary-light/50 rounded-xl p-5 text-center bg-background">
              <Flower2 className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="font-heading text-lg text-dark">Certificate of Completion</p>
              <p className="text-xs text-muted mt-1">Proudly presented to</p>
              <p className="font-heading italic text-primary-dark text-base">(Your Name)</p>
              <p className="text-xs text-muted mt-2">
                For successfully completing the 200 Hour Yoga Teacher Training
              </p>
              <p className="text-[11px] font-semibold text-dark mt-2">
                Vimoksha Yogshala · Yoga Alliance USA Certified
              </p>
            </div>
            <ul className="flex flex-col gap-2.5">
              {certBenefits.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm text-dark">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </section>

      {/* FEES / ACCOMMODATION / WHO CAN JOIN */}
      <section className="section-padding pt-0">
        <div className="container-custom grid lg:grid-cols-3 gap-6">
          {/* Fees */}
          <Panel className="flex flex-col gap-5">
            <RibbonLabel tone="light">Course Fees</RibbonLabel>
            <div className="flex flex-col divide-y divide-border">
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-semibold text-dark">Early Bird Offer</p>
                  <p className="text-xs text-muted">Enroll before 30 days</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">₹ 42,000</p>
                  <p className="text-xs text-muted line-through">₹ 50,000</p>
                </div>
              </div>
              <div className="flex items-center justify-between py-3">
                <p className="text-sm font-semibold text-dark">Regular Fees</p>
                <p className="text-lg font-bold text-dark">₹ 50,000</p>
              </div>
              <div className="flex items-center justify-between py-3">
                <p className="text-sm font-semibold text-dark">Payment Options</p>
                <p className="text-sm text-muted">Easy Installments Available</p>
              </div>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark transition-colors text-white font-semibold px-6 py-3 rounded-full shadow-soft"
            >
              Enroll Now <Flower2 className="w-4 h-4" />
            </a>
            <p className="text-xs text-muted text-center">* GST extra as applicable</p>
          </Panel>

          {/* Accommodation */}
          <Panel className="flex flex-col gap-5">
            <RibbonLabel>Accommodation & Food</RibbonLabel>
            <p className="text-xs font-semibold text-muted -mt-3">Optional</p>
            <div className="grid grid-cols-4 gap-3">
              {accommodation.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center text-center gap-2">
                  <span className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center text-primary">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="text-[11px] font-medium text-dark leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Add room photo', alt: 'Guest room', src: '/images/teacher-training/room.jpg' },
                { label: 'Add meal photo', alt: 'Satvik meal spread', src: '/images/teacher-training/meal.jpeg' },
                { label: 'Add grounds photo', alt: 'Peaceful outdoor grounds', src: '/images/teacher-training/grounds.jpg' },
              ].map((slot) => (
                <ImageSlot
                  key={slot.label}
                  src={slot.src}
                  alt={slot.alt}
                  label={slot.label}
                  className="aspect-square rounded-lg"
                />
              ))}
            </div>
            <p className="text-xs font-semibold text-white bg-primary-dark rounded-lg px-3 py-2 text-center">
              Stay close to nature and focus on your learning journey.
            </p>
          </Panel>

          {/* Who can join */}
          <Panel className="flex flex-col gap-5">
            <RibbonLabel tone="light">Who Can Join?</RibbonLabel>
            <ul className="flex flex-col gap-3">
              {whoCanJoin.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-dark">
                  <span className="w-5 h-5 rounded-full bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex justify-center pt-4 opacity-40">
              <Flower2 className="w-12 h-12 text-primary" />
            </div>
          </Panel>
        </div>
      </section>

      {/* FAQ / WHY CHOOSE US */}
      <section className="section-padding pt-0">
        <div className="container-custom grid lg:grid-cols-2 gap-6 items-start">
          {/* FAQ */}
          <Panel>
            <div className="flex justify-center mb-6">
              <RibbonLabel icon={Flower2}>Frequently Asked Questions</RibbonLabel>
            </div>
            {/* Mobile: wide banner crop above the questions */}
            <ImageSlot
              src="/images/teacher-training/faq.jpg"
              alt="Trainee in a seated yoga pose"
              label="Add photo (portrait)"
              focus="50% 20%"
              className="sm:hidden w-full h-40 rounded-xl mb-6"
            />
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex flex-col divide-y divide-border flex-1">
                {faqs.map((item, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={item.q} className="py-1">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between gap-4 py-3 text-left"
                      >
                        <span className="text-sm font-medium text-dark">{item.q}</span>
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        </span>
                      </button>
                      {isOpen && <p className="text-sm text-muted pb-4 pr-9">{item.a}</p>}
                    </div>
                  );
                })}
              </div>
              {/* Desktop: tall side crop, matched to the question list's height */}
              <ImageSlot
                src="/images/teacher-training/faq.jpg"
                alt="Trainee in a seated yoga pose"
                label="Add photo (portrait)"
                focus="50% 15%"
                className="hidden sm:block w-40 shrink-0 rounded-xl self-stretch"
              />
            </div>
          </Panel>

          {/* Why choose us */}
          <Panel>
            <div className="flex justify-center mb-6">
              <RibbonLabel>Why Choose Vimoksha Yogshala?</RibbonLabel>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-6">
              {whyChoose.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center text-center gap-2">
                  <span className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center text-primary">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="text-[11px] font-medium text-dark leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-primary-dark relative overflow-hidden">
        <LotusMark className="pointer-events-none absolute -bottom-20 -right-20 w-72 h-72 text-white opacity-[0.06]" />
        <div className="container-custom py-8 flex flex-col lg:flex-row items-center justify-between gap-6 relative">
          <div className="text-center lg:text-left">
            <p className="text-white font-heading text-xl sm:text-2xl">
              Take the first step towards a meaningful career and a balanced life.
            </p>
            <p className="text-secondary-light italic font-heading mt-1">
              Your journey begins here…
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://wa.me/911234567890"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:opacity-90 transition-opacity text-white font-semibold text-sm px-5 py-3 rounded-full"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="flex flex-col items-start leading-tight">
                Chat on WhatsApp
                <span className="text-[11px] font-normal opacity-90">Quick Response</span>
              </span>
            </a>
            <a
              href="tel:+919026612796"
              className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-light transition-colors text-white font-semibold text-sm px-5 py-3 rounded-full"
            >
              <Phone className="w-4 h-4" />
              <span className="flex flex-col items-start leading-tight">
                Call Now
                <span className="text-[11px] font-normal opacity-90">+91 9026612796</span>
              </span>
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-transparent border border-white/40 hover:border-white transition-colors text-white font-semibold text-sm px-5 py-3 rounded-full"
            >
              <CalendarCheck className="w-4 h-4" />
              Book Free Counselling
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}