import mongoose from 'mongoose';

const siteContentSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      required: true,
      unique: true,
      enum: ['hero', 'training', 'therapy', 'classes'],
    },
    heading: { type: String, default: '' },
    subheading: { type: String, default: '' },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    ctaText: { type: String, default: '' },
    ctaLink: { type: String, default: '' },
    features: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model('SiteContent', siteContentSchema);