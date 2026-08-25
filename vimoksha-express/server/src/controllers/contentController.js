import { uploadBufferToCloudinary } from '../config/cloudinary.js';
import SiteContent from '../models/SiteContent.js';

const SECTIONS = ['hero', 'training', 'therapy', 'classes', 'programs', 'blogs', 'gallery'];

// GET /api/content â€” public, returns all sections keyed by section name
export const getAllSiteContent = async (req, res) => {
  try {
    const docs = await SiteContent.find();
    const bySection = {};
    docs.forEach((d) => {
      bySection[d.section] = d;
    });
    res.json(bySection);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load site content' });
  }
};

// GET /api/content/:section â€” public, single section (used by the admin form)
export const getSiteContentSection = async (req, res) => {
  const { section } = req.params;
  if (!SECTIONS.includes(section)) {
    return res.status(400).json({ error: 'Unknown section' });
  }
  try {
    const doc = (await SiteContent.findOne({ section })) || { section };
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load section' });
  }
};

// PATCH /api/content/:section â€” admin only, creates or updates a section
export const updateSiteContentSection = async (req, res) => {
  const { section } = req.params;
  if (!SECTIONS.includes(section)) {
    return res.status(400).json({ error: 'Unknown section' });
  }
  try {
    const { heading, subheading, description, image, ctaText, ctaLink, features, items } =
      req.body;
    const doc = await SiteContent.findOneAndUpdate(
      { section },
      { heading, subheading, description, image, ctaText, ctaLink, features, items },
      { new: true, upsert: true }
    );
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save section' });
  }
};

// POST /api/content/upload-image â€” admin only, mirrors blog's upload-image.
// Reuses the shared uploadBufferToCloudinary helper from config/cloudinary.js.
export const uploadContentImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No image provided' });
    const result = await uploadBufferToCloudinary(req.file.buffer, 'vimoksha-yogshala/content');
    res.json({ url: result.secure_url });
  } catch (err) {
    res.status(500).json({ error: 'Image upload failed' });
  }
};
