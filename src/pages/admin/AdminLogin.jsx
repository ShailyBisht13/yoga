import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api, setToken } from '@/lib/api';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { token } = await api.login(email, password);
      setToken(token);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F5F2] px-6">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-elevated">
        <h1 className="font-heading text-2xl font-semibold text-dark">Admin Login</h1>
        <p className="mt-1 text-sm text-muted">Vimoksha Yogshala dashboard</p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-full border border-border px-5 py-3 text-sm outline-none focus:border-secondary"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-full border border-border px-5 py-3 text-sm outline-none focus:border-secondary"
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-opacity disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
