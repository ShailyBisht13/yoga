import { Container, Button } from '@/components/ui';
import { Link } from 'react-router-dom';
import { IoArrowForward } from 'react-icons/io5';

export default function CTA() {
  const benefits = [
    'Calm your Mind',
    'Reduce Stress',
    'Get Inner Peace',
    'More Productivity',
  ];

  return (
    <section className="py-20 bg-primary text-white">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <h2 className="font-heading text-4xl font-semibold md:text-5xl mb-6">
              Join Us for a Transformational Journey
            </h2>
            <p className="text-lg text-white/90 leading-relaxed mb-8">
              At Kewalya Yogshala, we are committed to helping you achieve a healthier and more fulfilling life. Whether you want to practice yoga, undergo therapy, or become a certified yoga teacher, we are here to guide you every step of the way.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Button
                as={Link}
                to="/contact"
                size="lg"
                icon={<IoArrowForward />}
                className="bg-white text-primary hover:bg-white/90"
              >
                Book Your Session Today
              </Button>
              <Button
                as={Link}
                to="/classes"
                size="lg"
                variant="ghost"
                className="border border-white/30 text-white hover:bg-white/10"
              >
                Explore Classes
              </Button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="font-heading text-2xl font-semibold mb-6">
              Body Detoxification & Rejuvenation
            </h3>
            <p className="text-white/90 leading-relaxed mb-6">
              Naturopathy is one of the most effective ways to detoxify and heal the body. It supports the immune system and the body's ability to heal and detoxify naturally.
            </p>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-sm">
                    ✓
                  </span>
                  <span className="font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
