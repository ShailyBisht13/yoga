import usePageMeta from '@/hooks/usePageMeta';

export default function ClassesPage() {
  usePageMeta('classes');
  return <div data-page="classes" />;
}
