import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import BeginnerClassesPage from '@/pages/BeginnerClassesPage';
import IntermediateClassesPage from '@/pages/IntermediateClassesPage';
import AdvanceClassesPage from '@/pages/AdvanceClassesPage';
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
  classesBeginner: { title: 'Beginner Classes', description: 'Foundational yoga classes for those new to the mat.' },
  classesIntermediate: { title: 'Intermediate Classes', description: 'Flowing sequences and deeper breathwork for practitioners building on the basics.' },
  classesAdvance: { title: 'Advance Classes', description: 'Fast-paced, high-intensity classes for practitioners with an established foundation.' },
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
   registering a page here is the only step needed to make it live. */
export const appRoutes = [
  { path: '/', component: HomePage, metaKey: 'home' },
  { path: '/about', component: AboutPage, metaKey: 'about' },
  { path: '/classes/beginner', component: BeginnerClassesPage, metaKey: 'classesBeginner' },
  { path: '/classes/intermediate', component: IntermediateClassesPage, metaKey: 'classesIntermediate' },
  { path: '/classes/advance', component: AdvanceClassesPage, metaKey: 'classesAdvance' },
  { path: '/therapies', component: TherapiesPage, metaKey: 'therapies' },
  { path: '/courses', component: CoursesPage, metaKey: 'courses' },
  { path: '/teacher-training', component: TeacherTrainingPage, metaKey: 'teacherTraining' },
  { path: '/gallery', component: GalleryPage, metaKey: 'gallery' },
  { path: '/blog', component: BlogPage, metaKey: 'blog' },
  { path: '/contact', component: ContactPage, metaKey: 'contact' },
];

export { NotFoundPage };