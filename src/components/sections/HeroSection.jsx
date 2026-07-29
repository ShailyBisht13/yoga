import { usePageMeta } from '@/hooks';
import { Container, Button } from '@/components/ui';
import { Link } from 'react-router-dom';
import { IoArrowForward } from 'react-icons/io5';

export default function HeroSection() {
  return (
    <section className="relative flex items-center overflow-hidden bg-gradient-to-br from-primary/10 to-white py-16">
      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="order-2 lg:order-1">
            <img
              src="/72f80c8f-f566-427b-9e07-1ae26cbc16e6.png"
              alt="Kewalya Yogshala Yoga Studio"
              className="rounded-2xl shadow-2xl w-full object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full">
              About Us
            </span>
            <h1 className="font-heading text-5xl font-semibold leading-tight text-primary md:text-6xl lg:text-7xl">
              A Sanctuary for Mind, Body & Soul
            </h1>
            <p className="mt-6 text-lg text-dark/70 leading-relaxed md:text-xl">
              Nestled in the serene beauty of Dehradun, Kewalya Yogshala is a premier yoga studio dedicated to guiding individuals toward physical, mental, and spiritual transformation. Whether you are a beginner or an advanced practitioner, our studio provides the perfect environment for deepening your practice and achieving inner harmony.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                as={Link}
                to="/about"
                size="lg"
                icon={<IoArrowForward />}
              >
                Know More About Us
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

