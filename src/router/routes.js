export const navigationLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  {
    label: 'Classes',
    path: '/classes',
    children: [
      { label: 'Online Classes', path: '/classes/online' },
      { label: 'Offline Classes', path: '/classes/offline' },
      { label: 'Home Classes', path: '/classes/home' },
      { label: 'Corporate Classes', path: '/classes/corporate' },
    ],
  },
  { label: 'Therapies', path: '/therapies' },
  { label: 'Teacher Training', path: '/courses' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Blogs', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

export const routeMeta = {
  home: { title: 'Home', description: 'Kewalya Yogshala — Premium yoga & wellness in Dehradun.' },
  about: { title: 'About', description: 'Learn about Kewalya Yogshala and our philosophy.' },
  classes: { title: 'Classes', description: 'Explore our yoga classes and schedules.' },
  classesOnline: { title: 'Online Classes', description: 'Join our live online yoga classes from anywhere.' },
  classesOffline: { title: 'Offline Classes', description: 'In-studio yoga classes at our Dehradun locations.' },
  classesHome: { title: 'Home Classes', description: 'Private yoga sessions in the comfort of your home.' },
  classesCorporate: { title: 'Corporate Classes', description: 'Workplace yoga and wellness programs for teams.' },
  therapies: { title: 'Therapies', description: 'Yoga Therapy, Naturopathy, Acupressure and Cupping Therapy at Kewalya Yogshala.' },
  courses: { title: 'Courses', description: 'Yoga Teacher Training Courses in Dehradun.' },
  gallery: { title: 'Gallery', description: 'Moments from Kewalya Yogshala.' },
  blog: { title: 'Blog', description: 'Wellness insights and yoga articles.' },
  contact: { title: 'Contact', description: 'Get in touch with Kewalya Yogshala.' },
  notFound: { title: 'Page Not Found', description: 'The page you are looking for does not exist.' },
};