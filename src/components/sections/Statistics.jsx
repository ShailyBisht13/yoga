import { motion } from 'framer-motion';
import { Container } from '@/components/ui';
import { HiOutlineUserGroup, HiOutlineCalendar, HiOutlineAcademicCap, HiOutlineMapPin } from 'react-icons/hi2';
import { useRef } from 'react';

const stats = [
  {
    value: '500+',
    label: 'Happy Students',
    icon: HiOutlineUserGroup,
  },
  {
    value: '6+',
    label: 'Years Experience',
    icon: HiOutlineCalendar,
  },
  {
    value: 'Certified',
    label: 'Teachers',
    icon: HiOutlineAcademicCap,
  },
  {
    value: 'Dehradun',
    label: 'Uttarakhand',
    icon: HiOutlineMapPin,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 * i },
  }),
};

export default function Statistics() {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-primary py-14 md:py-16">
      {/* Subtle background pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-white blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-white blur-3xl" />
      </div>

      <Container>
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4 md:gap-0">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              custom={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="group relative flex flex-col items-center text-center md:px-6"
            >
              {/* Separator (desktop) */}
              {index > 0 && (
                <div className="absolute left-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-white/15 md:block" />
              )}

              {/* Icon */}
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110">
                <stat.icon className="h-6 w-6" />
              </div>

              {/* Value */}
              <span className="font-heading text-3xl font-bold text-white md:text-4xl">
                {stat.value}
              </span>

              {/* Label */}
              <span className="mt-1 text-sm font-medium tracking-wide text-white/70">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}