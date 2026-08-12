import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/components/layout';

const HomePage = lazy(() => import('@/pages/HomePage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ClassesPage = lazy(() => import('@/pages/ClassesPage'));
const BeginnerClassesPage = lazy(() => import('@/pages/BeginnerClassesPage'));
const IntermediateClassesPage = lazy(() => import('@/pages/IntermediateClassesPage'));
const AdvanceClassesPage = lazy(() => import('@/pages/AdvanceClassesPage'));
const TherapiesPage = lazy(() => import('@/pages/Therapiespage'));
const CoursesPage = lazy(() => import('@/pages/CoursesPage'));
const GalleryPage = lazy(() => import('@/pages/GalleryPage'));
const BlogPage = lazy(() => import('@/pages/BlogPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}

function withSuspense(Component) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: withSuspense(HomePage) },
      { path: 'about', element: withSuspense(AboutPage) },
      { path: 'classes', element: withSuspense(ClassesPage) },
      { path: 'classes/beginner', element: withSuspense(BeginnerClassesPage) },
      { path: 'classes/intermediate', element: withSuspense(IntermediateClassesPage) },
      { path: 'classes/advance', element: withSuspense(AdvanceClassesPage) },
      { path: 'therapies', element: withSuspense(TherapiesPage) },
      { path: 'courses', element: withSuspense(CoursesPage) },
      { path: 'gallery', element: withSuspense(GalleryPage) },
      { path: 'blog', element: withSuspense(BlogPage) },
      { path: 'contact', element: withSuspense(ContactPage) },
      { path: '*', element: withSuspense(NotFoundPage) },
    ],
  },
]);

export default router;