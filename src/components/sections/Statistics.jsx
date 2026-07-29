import { Container } from '@/components/ui';

export default function Statistics() {
  const stats = [
    {
      value: '500+',
      label: 'Happy Students',
      icon: '⭐',
    },
    {
      value: '6+',
      label: 'Years Experience',
      icon: '📅',
    },
    {
      value: 'Certified',
      label: 'Yoga Teachers',
      icon: '🧘',
    },
    {
      value: 'Dehradun',
      label: 'Uttarakhand, India',
      icon: '📍',
    },
  ];

  return (
    <section className="py-12 bg-primary text-white">
      <Container>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="mb-2 text-3xl">{stat.icon}</div>
              <div className="font-heading text-3xl font-bold">{stat.value}</div>
              <div className="text-white/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
