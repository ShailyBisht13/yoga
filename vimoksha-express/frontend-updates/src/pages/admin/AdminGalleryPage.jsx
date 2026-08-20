import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import AdminShell from './AdminShell';
import { LuImage, LuTrash2 } from 'react-icons/lu';

export default function AdminGalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');

  const fetchImages = () => {
    setLoading(true);
    api
      .getGalleryImages()
      .then(setImages)
      .catch(() => setImages([]))
      .finally(() => setLoading(false));
  };

  useEffect(fetchImages, []);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');
    try {
      await api.uploadGalleryImage(file, title, category);
      setTitle('');
      setCategory('');
      e.target.value = '';
      fetchImages();
    } catch (err) {
      setError('Upload failed: ' + err.message);
    }
    setUploading(false);
  };

  const deleteImage = async (id) => {
    if (!confirm('Delete this image?')) return;
    setImages((prev) => prev.filter((img) => img._id !== id));
    try {
      await api.deleteGalleryImage(id);
    } catch {
      fetchImages();
    }
  };

  const inputClass =
    'rounded-xl border border-border px-4 py-2.5 text-sm outline-none transition-colors focus:border-secondary';
  const labelClass = 'mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted';

  return (
    <AdminShell
      eyebrow="Gallery"
      title="Gallery"
      subtitle={`${images.length} image${images.length === 1 ? '' : 's'}`}
    >
      <div className="rounded-2xl border border-border bg-white p-7 shadow-soft">
        <h2 className="mb-5 font-heading text-lg font-semibold text-dark">Add an image</h2>
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className={labelClass}>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
              placeholder="Optional"
            />
          </div>
          <div>
            <label className={labelClass}>Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClass}
              placeholder="e.g. Classes, Studio"
            />
          </div>
          <div>
            <label className={labelClass}>Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
              className="text-sm text-muted file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white file:transition-colors hover:file:bg-primary-dark disabled:opacity-60"
            />
          </div>
          {uploading && <p className="text-xs text-muted">Uploading…</p>}
        </div>
        {error && <p className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>}
      </div>

      {loading && <p className="mt-6 text-sm text-muted">Loading gallery…</p>}

      {!loading && images.length === 0 && (
        <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-16 text-center shadow-soft">
          <LuImage className="h-8 w-8 text-secondary-light" />
          <div>
            <p className="font-medium text-dark">No images yet</p>
            <p className="mt-1 text-sm text-muted">Images you add above will appear here.</p>
          </div>
        </div>
      )}

      {!loading && images.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((img) => (
            <div
              key={img._id}
              className="group relative overflow-hidden rounded-2xl border border-border shadow-soft"
            >
              <img src={img.imageUrl} alt={img.title || ''} className="h-40 w-full object-cover" />
              <div className="absolute inset-0 flex flex-col justify-between bg-black/0 p-3 opacity-0 transition-all duration-300 group-hover:bg-black/45 group-hover:opacity-100">
                <button
                  onClick={() => deleteImage(img._id)}
                  className="ml-auto flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-red-600"
                >
                  <LuTrash2 className="h-3.5 w-3.5" />
                  Delete
                </button>
                <div className="text-xs text-white">
                  <p className="font-medium">{img.title}</p>
                  {img.category && <p className="opacity-80">{img.category}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
