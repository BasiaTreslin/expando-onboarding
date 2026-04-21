'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, User, Lock, AlertCircle } from 'lucide-react';

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        setLoading(false);
        return;
      }

      router.push(`/${data.slug}`);
      router.refresh();
    } catch {
      setError('Network error — please try again');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-xs font-medium text-expando-gray-600 uppercase tracking-wider mb-1.5">
          Username
        </label>
        <div className="relative">
          <User
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-expando-gray-600 pointer-events-none"
          />
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            className="w-full pl-10 pr-3 py-2.5 bg-expando-gray-50 border border-expando-gray-200 rounded-lg text-sm
                       text-expando-gray-900 placeholder:text-expando-gray-600
                       focus:outline-none focus:ring-2 focus:ring-expando-orange focus:border-expando-orange
                       disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            placeholder="e.g. barbara"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-xs font-medium text-expando-gray-600 uppercase tracking-wider mb-1.5">
          Password
        </label>
        <div className="relative">
          <Lock
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-expando-gray-600 pointer-events-none"
          />
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="w-full pl-10 pr-3 py-2.5 bg-expando-gray-50 border border-expando-gray-200 rounded-lg text-sm
                       text-expando-gray-900 placeholder:text-expando-gray-600
                       focus:outline-none focus:ring-2 focus:ring-expando-orange focus:border-expando-orange
                       disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            placeholder="••••••••••"
          />
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle size={15} className="text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm leading-relaxed">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !username || !password}
        className="w-full btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Signing in…
          </>
        ) : (
          'Sign in'
        )}
      </button>
    </form>
  );
}
