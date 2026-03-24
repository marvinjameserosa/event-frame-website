'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/supabase';

export default function LoginForm() {
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) {
        setError(error.message);
      } else {
        setResetEmailSent(true);
      }
    } catch {
      setError('Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, remember }),
      });
      const result = await res.json();
      setLoading(false);
      if (!res.ok) {
        if (result.error && result.error.toLowerCase().includes('invalid login credentials')) {
          setError('No account found with that email and password.');
        } else {
          setError(result.error || 'Sign in failed');
        }
      } else {
        if (result.session) {
          await supabase.auth.setSession({
            access_token: result.session.access_token,
            refresh_token: result.session.refresh_token,
          });
        }
        window.location.href = '/upload';
      }
    } catch {
      setLoading(false);
      setError('Network error');
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
          {forgotPasswordMode ? 'Reset Password' : 'Sign in'}
        </h1>
        <p className="text-center mb-8 text-sm" style={{ color: 'rgba(240,230,212,0.4)' }}>
          {forgotPasswordMode ? 'Enter your email to receive a reset link' : 'Welcome back to FrameIt'}
        </p>

        {resetEmailSent ? (
          <div className="text-center space-y-4">
            <div className="text-sm font-medium" style={{ color: '#FFB84D' }}>
              Password reset email sent! Check your inbox.
            </div>
            <button
              onClick={() => {
                setResetEmailSent(false);
                setForgotPasswordMode(false);
              }}
              className="text-sm transition-colors duration-200"
              style={{ color: '#D4952B' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFB84D')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#D4952B')}
            >
              Back to Sign in
            </button>
          </div>
        ) : (
          <form className="space-y-5" onSubmit={forgotPasswordMode ? handleForgotPassword : handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(240,230,212,0.6)' }}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all duration-200"
                style={{
                  background: 'rgba(240,230,212,0.04)',
                  border: '1px solid rgba(240,230,212,0.1)',
                  color: '#f0e6d4',
                }}
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                onFocus={(e) => (e.target.style.borderColor = 'rgba(212,149,43,0.4)')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(240,230,212,0.1)')}
              />
            </div>

            {!forgotPasswordMode && (
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="password" className="block text-sm font-medium" style={{ color: 'rgba(240,230,212,0.6)' }}>
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotPasswordMode(true)}
                    className="text-xs transition-colors duration-200"
                    style={{ color: 'rgba(240,230,212,0.35)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#D4952B')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,230,212,0.35)')}
                  >
                    Forgot password?
                  </button>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all duration-200"
                  style={{
                    background: 'rgba(240,230,212,0.04)',
                    border: '1px solid rgba(240,230,212,0.1)',
                    color: '#f0e6d4',
                  }}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(212,149,43,0.4)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(240,230,212,0.1)')}
                />
              </div>
            )}

            {!forgotPasswordMode && (
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="h-4 w-4 rounded border-0"
                  style={{ accentColor: '#D4952B' }}
                  disabled={loading}
                />
                <label htmlFor="remember" className="ml-2 block text-sm" style={{ color: 'rgba(240,230,212,0.5)' }}>
                  Remember me
                </label>
              </div>
            )}

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
              {loading
                ? forgotPasswordMode ? 'Sending...' : 'Signing in...'
                : forgotPasswordMode ? 'Send Reset Link' : 'Sign in'
              }
            </button>

            {forgotPasswordMode ? (
              <button
                type="button"
                onClick={() => setForgotPasswordMode(false)}
                className="w-full text-center text-sm transition-colors duration-200"
                style={{ color: 'rgba(240,230,212,0.35)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#D4952B')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,230,212,0.35)')}
              >
                Back to Sign in
              </button>
            ) : (
              <p className="text-center text-sm" style={{ color: 'rgba(240,230,212,0.35)' }}>
                {"Don't have an account? "}
                <Link
                  href="/signup"
                  className="font-medium transition-colors duration-200"
                  style={{ color: '#D4952B' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FFB84D')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#D4952B')}
                >
                  Sign up
                </Link>
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
