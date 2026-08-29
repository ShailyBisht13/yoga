import mongoose from 'mongoose';

const siteContentSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      required: true,
      unique: true,
      enum: ['hero', 'training', 'therapy', 'classes', 'programs', 'blogs', 'gallery', 'faq'],
    },
    heading: { type: String, default: '' },
    subheading: { type: String, default: '' },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    ctaText: { type: String, default: '' },
    ctaLink: { type: String, default: '' },
    features: { type: [String], default: [] },
    // The photo+text cards shown under this section
    // (3 for classes/training/therapy/blogs, 6 for programs, 9 for gallery,
    // any length for faq â€” title/description double as question/answer)
    items: {
      type: [
        {
          title: { type: String, default: '' },
          description: { type: String, default: '' },
          image: { type: String, default: '' },
          link: { type: String, default: '' },
          // Programs-only fields â€” harmless no-ops for other sections
          duration: { type: String, default: '' },
          difficulty: { type: String, default: '' },
          // Blogs / Gallery â€” harmless no-ops for other sections
          category: { type: String, default: '' },
          date: { type: String, default: '' },
          readTime: { type: String, default: '' },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model('SiteContent', siteContentSchema);
