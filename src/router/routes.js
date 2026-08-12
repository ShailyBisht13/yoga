import { lazy } from 'react';

/* ===== Page components, lazy-loaded ===== */
// Confirmed to exist (built in this project): AboutPage, BeginnerClassesPage,
// IntermediateClassesPage, AdvanceClassesPage, GalleryPage, BlogPage, ContactPage.
// Guessed paths/names for the rest (Home, Therapies, Courses, NotFound) —
// rename these imports if your actual files differ.
const HomePage = lazy(() => import('@/pages/HomePage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const BeginnerClassesPage = lazy(() => import('@/pages/BeginnerClassesPage'));
const IntermediateClassesPage = lazy(() => import('@/pages/IntermediateClassesPage'));
const AdvanceClassesPage = lazy(() => import('@/pages/AdvanceClassesPage'));
const TherapiesPage = lazy(() => import('@/pages/TherapiesPage'));
const CoursesPage = lazy(() => import('@/pages/CoursesPage'));
const GalleryPage = lazy(() => import('@/pages/GalleryPage'));
const BlogPage = lazy(() => import('@/pages/BlogPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

export const navigationLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  {
    label: 'Classes',
    path: '/classes',
    children: [
      { label: 'Beginner', path: '/classes/beginner' },
      { label: 'Intermediate', path: '/classes/intermediate' },
      { label: 'Advance', path: '/classes/advance' },
    ],
  },
  { label: 'Therapies', path: '/therapies' },
  { label: 'Teacher Training', path: '/courses' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Blogs', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

export const routeMeta = {
  home: { title: 'Home', description: 'Kewalya Yogshala — Premium yoga & wellness in Dehradun.' },
  about: { title: 'About', description: 'Learn about Kewalya Yogshala and our philosophy.' },
  classes: { title: 'Classes', description: 'Explore our yoga classes and schedules.' },
  classesBeginner: { title: 'Beginner Classes', description: 'Foundational yoga classes for those new to the mat.' },
  classesIntermediate: { title: 'Intermediate Classes', description: 'Flowing sequences and deeper breathwork for practitioners building on the basics.' },
  classesAdvance: { title: 'Advance Classes', description: 'Fast-paced, high-intensity classes for practitioners with an established foundation.' },
  therapies: { title: 'Therapies', description: 'Yoga Therapy, Naturopathy, Acupressure and Cupping Therapy at Kewalya Yogshala.' },
  courses: { title: 'Courses', description: 'Yoga Teacher Training Courses in Dehradun.' },
  gallery: { title: 'Gallery', description: 'Moments from Kewalya Yogshala.' },
  blog: { title: 'Blog', description: 'Wellness insights and yoga articles.' },
  contact: { title: 'Contact', description: 'Get in touch with Kewalya Yogshala.' },
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
  { path: '/gallery', component: GalleryPage, metaKey: 'gallery' },
  { path: '/blog', component: BlogPage, metaKey: 'blog' },
  { path: '/contact', component: ContactPage, metaKey: 'contact' },
];

export { NotFoundPage };