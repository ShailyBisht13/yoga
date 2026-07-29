import { Link } from 'react-router-dom';
import { IoArrowForward } from 'react-icons/io5';
import usePageMeta from '@/hooks/usePageMeta';
import { Button, Container, Section } from '@/components/ui';

export default function NotFoundPage() {
  usePageMeta('notFound');

  return (
    <Section className="flex min-h-[70vh] items-center">
      <Container className="text-center">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-primary">404</p>
        <h1 className="mt-4 font-heading text-5xl text-dark md:text-6xl">Page Not Found</h1>
        <p className="mx-auto mt-4 max-w-md text-muted">
          The page you are looking for may have been moved or no longer exists.
        </p>
        <Button as={Link} to="/" className="mt-8" icon={<IoArrowForward />}>
          Back to Home
        </Button>
      </Container>
    </Section>
  );
}
