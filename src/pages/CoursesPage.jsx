import usePageMeta from '@/hooks/usePageMeta';

export default function CoursesPage() {
  usePageMeta('courses');
  return <div data-page="courses" />;
}
