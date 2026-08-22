import mongoose from 'mongoose';

const contactInfoSchema = new mongoose.Schema(
  {
    phone: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
    email: { type: String, default: '' },
    address: { type: String, default: '' },
    workingHours: { type: String, default: '' },
    instagram: { type: String, default: '' },
    facebook: { type: String, default: '' },
    youtube: { type: String, default: '' },
    mapEmbedUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('ContactInfo', contactInfoSchema);