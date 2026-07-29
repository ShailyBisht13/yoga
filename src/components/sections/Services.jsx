import { Container } from '@/components/ui';
import { Link } from 'react-router-dom';
import { IoArrowForward } from 'react-icons/io5';

export default function Services() {
  const services = [
    {
      title: 'Yoga Classes',
      description: 'Traditional Hatha, Ashtanga, and Vinyasa yoga sessions for all levels to enhance flexibility, strength, and mindfulness.',
      icon: '🧘‍♀️',
      link: '/classes',
    },
    {
      title: 'Yoga Therapy',
      description: 'Therapeutic yoga sessions for stress relief, anxiety management, and holistic healing of mind and body.',
      icon: '💆',
      link: '/classes',
    },
    {
      title: 'Acupressure',
      description: 'Ancient healing technique applying pressure to specific points to relieve pain, reduce tension, and improve circulation.',
      icon: '🤲',
      link: '/classes',
    },
    {
      title: 'Cupping Therapy',
      description: 'Traditional therapy using suction cups to stimulate healing, reduce pain, and improve overall wellness.',
      icon: '🔮',
      link: '/classes',
    },
    {
      title: 'Meditation',
      description: 'Guided meditation practices to calm the mind, reduce stress, and achieve inner peace and clarity.',
      icon: '�',
      link: '/classes',
    },
    {
      title: 'Pranayama',
      description: 'Breathing exercises and techniques to enhance respiratory health, boost energy, and balance the nervous system.',
      icon: '🌬️',
      link: '/classes',
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-primary/5 to-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl font-semibold text-primary md:text-5xl">
            Our Offerings
          </h2>
          <p className="mt-4 text-lg text-dark/70">
            Our Classes & Therapies
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-border bg-white p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="mb-4 text-5xl">{service.icon}</div>
              <h3 className="font-heading text-2xl font-semibold text-primary mb-3">
                {service.title}
              </h3>
              <p className="text-dark/70 leading-relaxed mb-6">
                {service.description}
              </p>
              <Link
                to={service.link}
                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
              >
                Learn More <IoArrowForward />
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
