import {
  IoTrendingUpOutline,
  IoBodyOutline,
  IoBulbOutline,
  IoFlashOutline,
  IoPersonOutline,
  IoSchoolOutline,
  IoHeartOutline,
  IoMedkitOutline,
  IoTrophyOutline,
  IoRibbonOutline,
  IoSpeedometerOutline,
} from 'react-icons/io5';
import { GiYinYang, GiMeditation, GiMuscleUp, GiLotus, GiWaterDrop } from 'react-icons/gi';
import { FaPersonBooth } from 'react-icons/fa6';

/* Fixed display order for the level switcher tabs */
export const levelOrder = ['beginner', 'intermediate', 'advance'];

/* ===== Single source of truth for every level's content =====
   Every classes page (Student, Professional, Adult) pulls from this
   same object so Beginner / Intermediate / Advance content always
   stays in sync no matter which page it's shown on. */
export const classLevels = {
  beginner: {
    id: 'beginner',
    label: 'Beginner',
    sectionHeading: 'Why Start With Beginner Classes',
    summary:
      "New to yoga, or coming back after time away? Beginner classes build the foundation — proper alignment, steady breathing, and the confidence to move into a fuller practice at your own pace.",
    benefits: [
      {
        title: 'No Experience Needed',
        description: 'Every posture is introduced from the ground up — you never need to have set foot on a mat before.',
        icon: IoPersonOutline,
      },
      {
        title: 'Full Alignment Cues',
        description: 'Instructors walk through exactly where your hands, feet, and hips go, so nothing is left to guesswork.',
        icon: IoSchoolOutline,
      },
      {
        title: 'Slower, Steadier Pace',
        description: 'Poses are held longer and transitions are gentle, giving your body time to learn each shape properly.',
        icon: IoHeartOutline,
      },
      {
        title: 'Modified for You',
        description: 'Adjustments and props are offered freely for tighter hips, stiff shoulders, or old injuries.',
        icon: IoMedkitOutline,
      },
    ],
    styles: [
      {
        title: 'Hatha Yoga',
        description: 'The most basic yoga postures, paired with breathing and relaxation techniques — the natural starting point.',
        icon: GiLotus,
      },
      {
        title: 'Iyengar Yoga',
        description: 'Precise alignment with blocks, straps, and blankets, so correct form comes before difficulty.',
        icon: FaPersonBooth,
      },
      {
        title: 'Restorative Yoga',
        description: 'Gentle, passive poses held for longer stretches — soothing for a nervous system new to slowing down.',
        icon: GiWaterDrop,
      },
    ],
    classIncludes: [
      'Foundational Asana Practice',
      'Breathing Basics (Pranayam)',
      'Guided Relaxation',
      'Posture & Alignment Coaching',
      'Beginner-friendly Meditation',
      'Modifications & Props',
    ],
    batchTimings: ['6:00 – 7:00 AM', '8:00 – 9:00 AM', '4:00 – 5:00 PM'],
    gallery: [
      { src: '/images/offline-studio-stretch.jpg', alt: 'Beginner practicing a seated stretch in the studio' },
      { src: '/images/home-side-stretch.jpg', alt: 'Instructor guiding a new student through a standing side stretch' },
      { src: '/images/offline-park-session.jpg', alt: 'Beginner-friendly outdoor session in the park' },
    ],
  },

  intermediate: {
    id: 'intermediate',
    label: 'Intermediate',
    sectionHeading: 'What Changes at This Level',
    summary:
      "Comfortable with the fundamentals and ready for more? Intermediate classes raise the pace with flowing sequences, longer holds, and deeper breathwork — building real strength session by session.",
    benefits: [
      {
        title: 'Longer Holds',
        description: 'Postures are held further into the breath, building real strength and stamina instead of just form.',
        icon: IoTrendingUpOutline,
      },
      {
        title: 'Flowing Sequences',
        description: 'Poses connect through breath-led transitions rather than isolated holds, raising the pace and challenge.',
        icon: IoBodyOutline,
      },
      {
        title: 'Deeper Focus Work',
        description: 'Meditation and pranayama sessions extend, sharpening concentration alongside the physical practice.',
        icon: IoBulbOutline,
      },
      {
        title: 'Real Conditioning',
        description: 'Classes are built to leave you stronger week over week, not just more flexible.',
        icon: IoFlashOutline,
      },
    ],
    styles: [
      {
        title: 'Ashtanga & Vinyasa Yoga',
        description: 'Flowing sequences that connect breath with movement through a continuous, more dynamic series of poses.',
        icon: GiYinYang,
      },
      {
        title: 'Chakra Yoga',
        description: 'Physical postures, breathing, and meditation combined to work with subtler energy through the body.',
        icon: GiMeditation,
      },
    ],
    classIncludes: [
      'Vinyasa & Ashtanga Flow',
      'Extended Pranayam',
      'Bandha & Breath Control',
      'Deeper Meditation Practice',
      'Strength-building Holds',
      'Yog Nidra',
    ],
    batchTimings: ['7:00 – 8:00 AM', '5:00 – 6:00 PM', '7:00 – 8:00 PM'],
    gallery: [
      { src: '/images/home-downdog-adjustment.jpg', alt: 'Instructor guiding a student through a flowing transition' },
      { src: '/images/corporate-warrior-pose.webp', alt: 'Group holding Warrior pose through a longer flow' },
      { src: '/images/offline-warrior-pose.jpg', alt: 'Studio class deepening a standing pose' },
    ],
  },

  advance: {
    id: 'advance',
    label: 'Advance',
    sectionHeading: 'What Defines This Level',
    summary:
      "For practitioners with an established foundation. Advance classes move fast, go deep into backbends and inversions, and assume your alignment is already solid — this is where strength and years of practice meet.",
    benefits: [
      {
        title: 'Fast, Dynamic Flows',
        description: 'Sequences move quickly, chaining challenging postures with minimal rest between them.',
        icon: IoFlashOutline,
      },
      {
        title: 'Inversions & Backbends',
        description: 'Deeper backbends, arm balances, and inversions are practiced with an established base of strength.',
        icon: IoTrophyOutline,
      },
      {
        title: 'Minimal Cueing',
        description: 'Instructors trust your form and focus corrections on refinement, not fundamentals.',
        icon: IoRibbonOutline,
      },
      {
        title: 'Peak Conditioning',
        description: 'Built for practitioners training for stamina, competition-level flexibility, or teaching certification.',
        icon: IoSpeedometerOutline,
      },
    ],
    styles: [
      {
        title: 'Power Yoga',
        description: 'A high-intensity style inspired by Ashtanga, built to develop strength and endurance through a vigorous, fast-paced practice.',
        icon: GiMuscleUp,
      },
    ],
    classIncludes: [
      'Advanced Asana Sequences',
      'Arm Balances & Inversions',
      'Deep Backbends',
      'High-intensity Vinyasa Flow',
      'Advanced Pranayam',
      'Teaching-level Alignment Detail',
    ],
    batchTimings: ['5:00 – 6:00 AM', '10:00 – 11:00 AM', '6:00 – 7:00 PM'],
    gallery: [
      { src: '/images/offline-aerial-yoga.jpg', alt: 'Advanced student practicing aerial yoga' },
      { src: '/images/corporate-studio-group.jpg', alt: 'Group deep in an advanced sequence in the studio' },
      { src: '/images/home-partner-boat-pose.jpg', alt: 'Instructor assisting an advanced partner pose' },
    ],
  },
};