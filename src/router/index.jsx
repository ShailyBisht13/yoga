import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/components/layout';

const HomePage = lazy(() => import('@/pages/HomePage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ClassesPage = lazy(() => import('@/pages/ClassesPage'));
const OnlineClassesPage = lazy(() => import('@/pages/OnlineClassesPage'));
const OfflineClassesPage = lazy(() => import('@/pages/OfflineClassesPage'));
const HomeClassesPage = lazy(() => import('@/pages/HomeClassesPage'));
const CorporateClassesPage = lazy(() => import('@/pages/CorporateClassesPage'));
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
      { path: 'classes/online', element: withSuspense(OnlineClassesPage) },
      { path: 'classes/offline', element: withSuspense(OfflineClassesPage) },
      { path: 'classes/home', element: withSuspense(HomeClassesPage) },
      { path: 'classes/corporate', element: withSuspense(CorporateClassesPage) },
      { path: 'courses', element: withSuspense(CoursesPage) },
      { path: 'gallery', element: withSuspense(GalleryPage) },
      { path: 'blog', element: withSuspense(BlogPage) },
      { path: 'contact', element: withSuspense(ContactPage) },
      { path: '*', element: withSuspense(NotFoundPage) },
    ],
  },
]);

export default router;