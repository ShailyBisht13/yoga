import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import StudentClassesPage from '@/pages/StudentClassesPage';
import ProfessionalClassesPage from '@/pages/ProfessionalClassesPage';
import AdultClassesPage from '@/pages/AdultClassesPage';
import TherapiesPage from '@/pages/TherapiesPage';
import CoursesPage from '@/pages/CoursesPage';
import TeacherTrainingPage from '@/pages/TeacherTrainingPage';
import GalleryPage from '@/pages/GalleryPage';
import BlogPage from '@/pages/BlogPage';
import ContactPage from '@/pages/ContactPage';
import NotFoundPage from '@/pages/NotFoundPage';

export const navigationLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  {
    label: 'Classes',
    path: '/classes',
    children: [
      { label: 'Student', path: '/classes/beginner' },
      { label: 'Professional', path: '/classes/intermediate' },
      { label: 'Adult', path: '/classes/advance' },
    ],
  },
  { label: 'Teacher Training', path: '/teacher-training' },
  { label: 'Therapies', path: '/therapies' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Blogs', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

export const routeMeta = {
  home: { title: 'Home', description: 'Vimoksha Yogshala — Premium yoga & wellness in Dehradun.' },
  about: { title: 'About', description: 'Learn about Vimoksha Yogshala and our philosophy.' },
  classes: { title: 'Classes', description: 'Explore our yoga classes and schedules.' },
  classesBeginner: {
    title: 'Student Classes',
    description: 'Beginner, Intermediate & Advance batches for students, all in one place.',
  },
  classesIntermediate: {
    title: 'Professional Classes',
    description: 'Beginner, Intermediate & Advance batches built around a working schedule.',
  },
  classesAdvance: {
    title: 'Adult Classes',
    description: 'Beginner, Intermediate & Advance yoga programs for adult practitioners.',
  },
  therapies: { title: 'Therapies', description: 'Yoga Therapy, Naturopathy, Acupressure and Cupping Therapy at Vimoksha Yogshala.' },
  courses: { title: 'Courses', description: 'Yoga Teacher Training Courses in Dehradun.' },
  teacherTraining: { title: 'Teacher Training', description: '200-Hour Yoga Teacher Training in Dehradun — an eight-week residential certification program.' },
  gallery: { title: 'Gallery', description: 'Moments from Vimoksha Yogshala.' },
  blog: { title: 'Blog', description: 'Wellness insights and yoga articles.' },
  contact: { title: 'Contact', description: 'Get in touch with Vimoksha Yogshala.' },
  notFound: { title: 'Page Not Found', description: 'The page you are looking for does not exist.' },
};

/* ===== Single source of truth: path -> page component -> meta key =====
   AppRoutes.jsx renders <Route> elements straight from this list, so
   registering a page here is the only step needed to make it live.
   Note: each Classes page (Student/Professional/Adult) internally
   renders all three levels — Beginner, Intermediate, Advance — via a
   shared level switcher; the path/component below just controls which
   level tab opens by default. */
export const appRoutes = [
  { path: '/', component: HomePage, metaKey: 'home' },
  { path: '/about', component: AboutPage, metaKey: 'about' },
  { path: '/classes/beginner', component: StudentClassesPage, metaKey: 'classesBeginner' },
  { path: '/classes/intermediate', component: ProfessionalClassesPage, metaKey: 'classesIntermediate' },
  { path: '/classes/advance', component: AdultClassesPage, metaKey: 'classesAdvance' },
  { path: '/therapies', component: TherapiesPage, metaKey: 'therapies' },
  { path: '/courses', component: CoursesPage, metaKey: 'courses' },
  { path: '/teacher-training', component: TeacherTrainingPage, metaKey: 'teacherTraining' },
  { path: '/gallery', component: GalleryPage, metaKey: 'gallery' },
  { path: '/blog', component: BlogPage, metaKey: 'blog' },
  { path: '/contact', component: ContactPage, metaKey: 'contact' },
];

export { NotFoundPage };