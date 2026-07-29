import usePageMeta from '@/hooks/usePageMeta';

export default function ContactPage() {
  usePageMeta('contact');
  return <div data-page="contact" />;
}
