import { Container } from '@/components/ui';

export default function WhyChooseUs() {
  const features = [
    {
      title: 'Holistic Approach',
      description: 'We integrate traditional yoga practices with modern wellness techniques for complete mind-body healing',
      icon: '�',
    },
    {
      title: 'Experienced Teachers',
      description: 'Our certified instructors bring years of expertise and deep knowledge of authentic yoga traditions',
      icon: '🧘',
    },
    {
      title: 'Personalized Guidance',
      description: 'Tailored sessions designed to meet your individual needs and wellness goals',
      icon: '🎯',
    },
    {
      title: 'Supportive Community',
      description: 'Join a nurturing environment where you can grow, connect, and thrive with like-minded practitioners',
      icon: '🤝',
    },
  ];

  return (
    <section className="py-12 bg-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl font-semibold text-primary md:text-5xl">
            Why Choose Us
          </h2>
          <p className="mt-4 text-lg text-dark/70">
            Experience the difference with our comprehensive approach to wellness
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-border bg-gradient-to-br from-white to-primary/5 p-8 text-center transition-all duration-300 hover:shadow-lg hover:border-primary/30"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-3xl group-hover:bg-primary/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="font-heading text-xl font-semibold text-primary mb-3">
                {feature.title}
              </h3>
              <p className="text-dark/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
