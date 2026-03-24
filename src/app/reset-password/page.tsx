"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError('Invalid or expired reset link. Please request a new one.');
      }
    };
    checkSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
        setTimeout(() => router.push('/login'), 2000);
      }
    } catch {
      setError('Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  /* ── Firefly data ── */
  const fireflies = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    size: 4 + Math.random() * 4,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    driftDuration: `${14 + Math.random() * 10}s`,
    glowDuration: `${3 + Math.random() * 4}s`,
    driftAnim: `fireflyDrift${(i % 3) + 1}`,
    color: ['#FFB84D', '#D4952B', '#E87D3E'][i % 3],
  }));

  const stars = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    size: 1 + Math.random() * 1.5,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 6}s`,
    duration: `${3 + Math.random() * 4}s`,
  }));

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0806 0%, #110e0a 40%, #0a0806 100%)' }}
    >
      {/* Stars */}
      {stars.map((s) => (
        <div
          key={`star-${s.id}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: s.size,
            height: s.size,
            left: s.left,
            top: s.top,
            background: '#f0e6d4',
            opacity: 0.15,
            animation: `twinkle ${s.duration} ease-in-out infinite ${s.delay}`,
          }}
        />
      ))}

      {/* Fireflies */}
      {fireflies.map((f) => (
        <div
          key={`fly-${f.id}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: f.size,
            height: f.size,
            left: f.left,
            top: f.top,
            background: f.color,
            color: f.color,
            animation: `${f.driftAnim} ${f.driftDuration} ease-in-out infinite ${f.delay}, fireflyGlow ${f.glowDuration} ease-in-out infinite ${f.delay}`,
          }}
        />
      ))}

      {/* Warm ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,149,43,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-md rounded-2xl px-10 py-12"
        style={{
          background: 'rgba(17, 14, 10, 0.85)',
          border: '1px solid rgba(240, 230, 212, 0.08)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(212,149,43,0.04)',
        }}
      >
        <h1
          className="text-4xl font-extrabold mb-2 text-center tracking-tight"
          style={{ color: '#f0e6d4' }}
        >
          Reset Password
        </h1>
        <p className="text-center mb-8 text-sm" style={{ color: 'rgba(240,230,212,0.4)' }}>
          Choose a new password for your account
        </p>

        {success ? (
          <div className="text-center space-y-4">
            <div className="text-base font-medium" style={{ color: '#FFB84D' }}>
              Password reset successful!
            </div>
            <p className="text-sm" style={{ color: 'rgba(240,230,212,0.4)' }}>
              Redirecting to sign in...
            </p>
          </div>
        ) : (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(240,230,212,0.6)' }}>
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all duration-200"
                style={{
                  background: 'rgba(240,230,212,0.04)',
                  border: '1px solid rgba(240,230,212,0.1)',
                  color: '#f0e6d4',
                }}
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                onFocus={(e) => (e.target.style.borderColor = 'rgba(212,149,43,0.4)')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(240,230,212,0.1)')}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(240,230,212,0.6)' }}>
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all duration-200"
                style={{
                  background: 'rgba(240,230,212,0.04)',
                  border: '1px solid rgba(240,230,212,0.1)',
                  color: '#f0e6d4',
                }}
                placeholder="Re-enter your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                onFocus={(e) => (e.target.style.borderColor = 'rgba(212,149,43,0.4)')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(240,230,212,0.1)')}
              />
            </div>

            {error && (
              <div className="text-sm text-center font-medium" style={{ color: '#E87D3E' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-base font-bold rounded-xl transition-all duration-300 cursor-pointer disabled:opacity-50"
              style={{
                background: 'linear-gradient(135deg, #D4952B, #FFB84D)',
                color: '#0a0806',
                boxShadow: '0 4px 20px rgba(212,149,43,0.25)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 6px 30px rgba(212,149,43,0.4)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(212,149,43,0.25)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>

            <p className="text-center text-sm" style={{ color: 'rgba(240,230,212,0.35)' }}>
              <Link
                href="/login"
                className="font-medium transition-colors duration-200"
                style={{ color: '#D4952B' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFB84D')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#D4952B')}
              >
                Back to Sign in
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
