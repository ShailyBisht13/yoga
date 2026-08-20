import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import AdminShell from './AdminShell';

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
    'rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:border-secondary';

  return (
    <AdminShell>
      <h1 className="font-heading text-2xl font-semibold text-dark">Gallery</h1>
      <p className="mt-1 text-sm text-muted">{images.length} images</p>

      <div className="mt-6 flex flex-wrap items-end gap-3 rounded-2xl border border-border bg-white p-6">
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClass}
            placeholder="Optional"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted">
            Category
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputClass}
            placeholder="e.g. Classes, Studio"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted">
            Image
          </label>
          <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} />
        </div>
        {uploading && <p className="text-xs text-muted">Uploading…</p>}
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      {loading && <p className="mt-6 text-muted">Loading…</p>}
      {!loading && images.length === 0 && <p className="mt-6 text-muted">No images yet.</p>}

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((img) => (
          <div key={img._id} className="group relative overflow-hidden rounded-2xl border border-border">
            <img src={img.imageUrl} alt={img.title || ''} className="h-40 w-full object-cover" />
            <div className="absolute inset-0 flex flex-col justify-between bg-black/0 p-3 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
              <button
                onClick={() => deleteImage(img._id)}
                className="ml-auto rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-red-600"
              >
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
    </AdminShell>
  );
}
