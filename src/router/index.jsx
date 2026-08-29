import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout';
import HomePage from '@/pages/HomePage';

const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ClassesPage = lazy(() => import('@/pages/ClassesPage'));
const StudentClassesPage = lazy(() => import('@/pages/StudentClassesPage'));
const ProfessionalClassesPage = lazy(() => import('@/pages/ProfessionalClassesPage'));
const AdultClassesPage = lazy(() => import('@/pages/AdultClassesPage'));
const TherapiesPage = lazy(() => import('@/pages/TherapiesPage'));
const CoursesPage = lazy(() => import('@/pages/CoursesPage'));
const TeacherTrainingPage = lazy(() => import('@/pages/TeacherTrainingPage'));
const GalleryPage = lazy(() => import('@/pages/GalleryPage'));
const BlogPage = lazy(() => import('@/pages/BlogPage'));
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

// Admin pages
const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'));
const AdminBookingsPage = lazy(() => import('@/pages/admin/AdminBookingsPage'));
const AdminBlogPage = lazy(() => import('@/pages/admin/AdminBlogPage'));
const AdminGalleryPage = lazy(() => import('@/pages/admin/AdminGalleryPage'));
const AdminDashboardPage = lazy(() => import('@/pages/admin/AdminDashboardPage'));
const AdminContactPage = lazy(() => import('@/pages/admin/AdminContactPage'));
const AdminContentPage = lazy(() => import('@/pages/admin/AdminContentPage'));
const AdminFaqPage = lazy(() => import('@/pages/admin/AdminFaqPage'));

function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
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
      { index: true, element: <HomePage /> },
      { path: 'about', element: withSuspense(AboutPage) },
      { path: 'classes', element: withSuspense(ClassesPage) },
      { path: 'classes/beginner', element: withSuspense(StudentClassesPage) },
      { path: 'classes/intermediate', element: withSuspense(ProfessionalClassesPage) },
      { path: 'classes/advance', element: withSuspense(AdultClassesPage) },
      { path: 'therapies', element: withSuspense(TherapiesPage) },
      { path: 'courses', element: withSuspense(CoursesPage) },
      { path: 'teacher-training', element: withSuspense(TeacherTrainingPage) },
      { path: 'gallery', element: withSuspense(GalleryPage) },
      { path: 'blog', element: withSuspense(BlogPage) },
      { path: 'blog/:slug', element: withSuspense(BlogPostPage) },
      { path: 'contact', element: withSuspense(ContactPage) },
      { path: '*', element: withSuspense(NotFoundPage) },
    ],
  },
  {
    path: 'admin/login',
    element: withSuspense(AdminLogin),
  },
  {
    path: 'admin',
    element: <Navigate to="/admin/dashboard" replace />,
  },
  {
    path: 'admin/dashboard',
    element: withSuspense(AdminDashboardPage),
  },
  {
    path: 'admin/bookings',
    element: withSuspense(AdminBookingsPage),
  },
  {
    path: 'admin/blog',
    element: withSuspense(AdminBlogPage),
  },
  {
    path: 'admin/gallery',
    element: withSuspense(AdminGalleryPage),
  },
  {
    path: 'admin/contact',
    element: withSuspense(AdminContactPage),
  },
  {
    path: 'admin/content',
    element: withSuspense(AdminContentPage),
  },
  {
    path: 'admin/faq',
    element: withSuspense(AdminFaqPage),
  },
]);

export default router;