import { useEffect, useState } from 'react';
import { api, isLoggedIn, clearToken } from './api';

/**
 * Verifies the stored JWT against the server on mount.
 * Returns { authenticated, loading }.
 */
export function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function check() {
      if (!isLoggedIn()) {
        setAuthenticated(false);
        setLoading(false);
        return;
      }
      try {
        await api.me();
        setAuthenticated(true);
      } catch {
        clearToken();
        setAuthenticated(false);
      }
      setLoading(false);
    }
    check();
  }, []);

  return { authenticated, loading };
}
