import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api, setToken } from '@/lib/api';
import { LuEye, LuEyeOff, LuLock, LuMail } from 'react-icons/lu';

function Sunburst({ className }) {
  const rays = Array.from({ length: 16 });
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      {rays.map((_, i) => (
        <rect
          key={i}
          x="49"
          y="2"
          width="2"
          height="26"
          rx="1"
          fill="currentColor"
          transform={`rotate(${i * 22.5} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="18" fill="currentColor" />
    </svg>
  );
}

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

  const inputClass =
    'w-full rounded-xl border border-border bg-white py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-secondary';

  return (
    <div className="flex min-h-screen bg-[#FBF8F2]">
      {/* Brand panel */}
      <div className="relative hidden w-[44%] shrink-0 flex-col justify-between overflow-hidden bg-[#241611] p-12 text-[#EDE3D5] lg:flex">
        <Sunburst className="pointer-events-none absolute -right-24 -top-24 h-[26rem] w-[26rem] text-secondary opacity-[0.08]" />
        <Sunburst className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 text-secondary opacity-[0.05]" />

        <div className="relative z-10 inline-block w-fit rounded-xl bg-[#FBF8F2] px-5 py-4 shadow-elevated">
          <img src="/logo.png" alt="Vimoksha Yogshala" className="h-10 w-auto" />
        </div>

        <div className="relative z-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-secondary-light">
            Administrator Console
          </p>
          <h2 className="mt-4 max-w-sm font-heading text-3xl font-medium leading-snug text-white">
            Manage bookings, stories, and the studio gallery — all in one calm, focused place.
          </h2>
        </div>

        <p className="relative z-10 text-xs text-[#8f8072]">
          © {new Date().getFullYear()} Vimoksha Yogshala. Internal use only.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
        <div className="mb-8 lg:hidden">
          <img src="/logo.png" alt="Vimoksha Yogshala" className="h-9 w-auto" />
        </div>

        <div className="w-full max-w-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-secondary">
            Welcome back
          </p>
          <h1 className="mt-1.5 font-heading text-3xl font-semibold text-dark">Sign in to Admin</h1>
          <p className="mt-2 text-sm text-muted">
            Enter your administrator credentials to continue.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            <div className="relative">
              <LuMail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
                className={inputClass}
              />
            </div>

            <div className="relative">
              <LuLock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-dark"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <LuEyeOff className="h-4 w-4" /> : <LuEye className="h-4 w-4" />}
              </button>
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-muted">
            Vimoksha Yogshala staff access only.
          </p>
        </div>
      </div>
    </div>
  );
}
