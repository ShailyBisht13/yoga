import ContactInfo from '../models/ContactInfo.js';

// GET /api/contact — public, used by the site header/footer/contact page
export const getContactInfo = async (req, res) => {
  try {
    let info = await ContactInfo.findOne();
    if (!info) info = await ContactInfo.create({});
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load contact info' });
  }
};

// PUT /api/contact — admin only, upserts the single contact-info document
export const updateContactInfo = async (req, res) => {
  try {
    const {
      phone,
      whatsapp,
      email,
      address,
      workingHours,
      instagram,
      facebook,
      youtube,
      mapEmbedUrl,
    } = req.body;

    const info = await ContactInfo.findOneAndUpdate(
      {},
      { phone, whatsapp, email, address, workingHours, instagram, facebook, youtube, mapEmbedUrl },
      { new: true, upsert: true }
    );
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save contact info' });
  }
};