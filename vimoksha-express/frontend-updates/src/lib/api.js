const API_URL = import.meta.env.VITE_API_URL;

function getToken() {
  return localStorage.getItem('admin_token');
}

async function request(path, { method = 'GET', body, isFormData = false, auth = false } = {}) {
  const headers = {};
  if (!isFormData) headers['Content-Type'] = 'application/json';
  if (auth) {
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }

  return data;
}

export const api = {
  // Auth
  login: (email, password) => request('/api/auth/login', { method: 'POST', body: { email, password } }),
  me: () => request('/api/auth/me', { auth: true }),

  // Bookings
  createBooking: (payload) => request('/api/bookings', { method: 'POST', body: payload }),
  getBookings: () => request('/api/bookings', { auth: true }),
  updateBookingStatus: (id, status) =>
    request(`/api/bookings/${id}`, { method: 'PATCH', body: { status }, auth: true }),
  deleteBooking: (id) => request(`/api/bookings/${id}`, { method: 'DELETE', auth: true }),

  // Blog (public)
  getPublishedPosts: () => request('/api/blog'),
  getPublishedPostBySlug: (slug) => request(`/api/blog/slug/${slug}`),

  // Blog (admin)
  getAllPosts: () => request('/api/blog/admin/all', { auth: true }),
  createPost: (payload) => request('/api/blog', { method: 'POST', body: payload, auth: true }),
  updatePost: (id, payload) =>
    request(`/api/blog/${id}`, { method: 'PATCH', body: payload, auth: true }),
  deletePost: (id) => request(`/api/blog/${id}`, { method: 'DELETE', auth: true }),
  uploadBlogImage: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return request('/api/blog/upload-image', {
      method: 'POST',
      body: formData,
      isFormData: true,
      auth: true,
    });
  },

  // Gallery
  getGalleryImages: () => request('/api/gallery'),
  uploadGalleryImage: (file, title, category) => {
    const formData = new FormData();
    formData.append('image', file);
    if (title) formData.append('title', title);
    if (category) formData.append('category', category);
    return request('/api/gallery', { method: 'POST', body: formData, isFormData: true, auth: true });
  },
  deleteGalleryImage: (id) => request(`/api/gallery/${id}`, { method: 'DELETE', auth: true }),
};

export function setToken(token) {
  localStorage.setItem('admin_token', token);
}

export function clearToken() {
  localStorage.removeItem('admin_token');
}

export function isLoggedIn() {
  return !!getToken();
}
