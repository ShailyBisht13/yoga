import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import AdminShell from './AdminShell';
import {
  LuMail,
  LuPhone,
  LuMapPin,
  LuClock,
  LuInstagram,
  LuFacebook,
  LuYoutube,
} from 'react-icons/lu';

const emptyForm = {
  phone: '',
  whatsapp: '',
  email: '',
  address: '',
  workingHours: '',
  instagram: '',
  facebook: '',
  youtube: '',
  mapEmbedUrl: '',
};

export default function AdminContactPage() {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api
      .getContactInfo()
      .then((data) => setForm((prev) => ({ ...prev, ...data })))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSaved(false);
    try {
      await api.updateContactInfo(form);
      setSaved(true);
    } catch (err) {
      setError(err.message || 'Save failed.');
    }
    setSaving(false);
  };

  const inputClass =
    'w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none transition-colors focus:border-secondary';
  const labelClass =
    'mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted';

  if (loading) {
    return (
      <AdminShell eyebrow="Contact" title="Contact Info">
        <p className="text-sm text-muted">Loading…</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell
      eyebrow="Contact"
      title="Contact Info"
      subtitle="Shown in the site header, footer and contact page."
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 rounded-2xl border border-border bg-white p-7 shadow-soft"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>
              <LuPhone className="h-3.5 w-3.5" /> Phone
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className={inputClass}
              placeholder="+91 98765 43210"
            />
          </div>
          <div>
            <label className={labelClass}>
              <LuPhone className="h-3.5 w-3.5" /> WhatsApp Number
            </label>
            <input
              name="whatsapp"
              value={form.whatsapp}
              onChange={handleChange}
              className={inputClass}
              placeholder="+91 98765 43210"
            />
          </div>
          <div>
            <label className={labelClass}>
              <LuMail className="h-3.5 w-3.5" /> Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
              placeholder="hello@vimoksha.com"
            />
          </div>
          <div>
            <label className={labelClass}>
              <LuClock className="h-3.5 w-3.5" /> Working Hours
            </label>
            <input
              name="workingHours"
              value={form.workingHours}
              onChange={handleChange}
              className={inputClass}
              placeholder="Mon–Sat, 6 AM – 8 PM"
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>
            <LuMapPin className="h-3.5 w-3.5" /> Address
          </label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            rows={2}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Google Maps Embed URL</label>
          <input
            name="mapEmbedUrl"
            value={form.mapEmbedUrl}
            onChange={handleChange}
            className={inputClass}
            placeholder="https://www.google.com/maps/embed?..."
          />
        </div>

        <div className="grid grid-cols-1 gap-5 border-t border-border pt-5 sm:grid-cols-3">
          <div>
            <label className={labelClass}>
              <LuInstagram className="h-3.5 w-3.5" /> Instagram
            </label>
            <input
              name="instagram"
              value={form.instagram}
              onChange={handleChange}
              className={inputClass}
              placeholder="https://instagram.com/..."
            />
          </div>
          <div>
            <label className={labelClass}>
              <LuFacebook className="h-3.5 w-3.5" /> Facebook
            </label>
            <input
              name="facebook"
              value={form.facebook}
              onChange={handleChange}
              className={inputClass}
              placeholder="https://facebook.com/..."
            />
          </div>
          <div>
            <label className={labelClass}>
              <LuYoutube className="h-3.5 w-3.5" /> YouTube
            </label>
            <input
              name="youtube"
              value={form.youtube}
              onChange={handleChange}
              className={inputClass}
              placeholder="https://youtube.com/..."
            />
          </div>
        </div>

        {error && <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>}
        {saved && (
          <p className="rounded-lg bg-emerald-50 px-4 py-2.5 text-sm text-emerald-700">
            Contact info saved.
          </p>
        )}

        <div className="flex gap-3 border-t border-border pt-5">
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </form>
    </AdminShell>
  );
}