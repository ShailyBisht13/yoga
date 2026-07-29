import usePageMeta from '@/hooks/usePageMeta';

export default function AboutPage() {
  usePageMeta('about');
  return <div data-page="about" />;
}
