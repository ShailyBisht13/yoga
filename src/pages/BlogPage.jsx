import usePageMeta from '@/hooks/usePageMeta';

export default function BlogPage() {
  usePageMeta('blog');
  return <div data-page="blog" />;
}
