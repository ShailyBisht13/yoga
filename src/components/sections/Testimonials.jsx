import { Container } from '@/components/ui';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Neeraj Chandra',
      text: "I love going to Kewalya Yogshala. All teachers provide very good practice. My life has changed a lot in just one month. I would ask everyone to join once for good health and peace of mind.",
    },
    {
      name: 'Jaya Kunwar',
      text: "I joined Yoga at Kewalya before 2 months and found out that I could not even do some basic stretches completely. Sir and Mam are very hardworking and dedicated and put immense efforts to bring the best in all of us.",
    },
    {
      name: 'Yoga Master Shyam',
      text: "My experience for past 1 year has been quite good. All instructors are very nice and explain yoga in a way that it connects. I am planning to continue for as long as I can.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-primary/5 to-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl font-semibold text-primary md:text-5xl">
            What Our Students Say
          </h2>
          <p className="mt-4 text-lg text-dark/70">
            Real experiences from our yoga community
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="mb-4 flex gap-1 text-primary">
                {'★'.repeat(5)}
              </div>
              <p className="text-dark/80 leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-primary">{testimonial.name}</p>
                  <p className="text-sm text-dark/60">Student</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
