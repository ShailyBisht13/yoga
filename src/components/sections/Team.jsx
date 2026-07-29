import { Container } from '@/components/ui';

export default function Team() {
  const team = [
    {
      name: 'Yogacharya Gyan Prakash',
      role: 'Founder & Yoga Teacher',
      certification: 'Certified from Uttarakhand University Sanskrit',
      image: '🧘‍♂️',
    },
    {
      name: 'Yogacharya Rita',
      role: 'Co-Founder & Yoga Teacher',
      certification: 'Certified from Shri Guru Ram Rai University',
      image: '🧘‍♀️',
    },
    {
      name: 'Yogi Anuj',
      role: 'Yoga Instructor',
      certification: 'Certified by Yoga Certification Board Ministry of AYUSH',
      image: '🙏',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl font-semibold text-primary md:text-5xl">
            Our Key People
          </h2>
          <p className="mt-4 text-lg text-dark/70">
            Practice Yoga to perfect physical beauty, take care of your soul and enjoy life more fully!
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-border bg-gradient-to-br from-white to-primary/5 p-8 text-center transition-all duration-300 hover:shadow-lg hover:border-primary/30"
            >
              <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-primary/10 text-6xl group-hover:bg-primary/20 transition-colors">
                {member.image}
              </div>
              <h3 className="font-heading text-xl font-semibold text-primary mb-2">
                {member.name}
              </h3>
              <p className="text-primary/80 font-medium mb-3">{member.role}</p>
              <p className="text-dark/60 text-sm leading-relaxed">
                {member.certification}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
