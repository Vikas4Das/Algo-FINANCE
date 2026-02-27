// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Hexagon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsSubmitting(true);

    try {
      // Front-end only registration: create a simple user profile
      const userData = {
        name: name || email.split('@')[0] || 'Trader',
        email,
      };

      login(userData, 'local-demo-token');
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-bg-dark text-slate-300 font-sans px-4 py-10 md:px-6 selection:bg-algo-green/30 flex items-center justify-center">
      <main className="w-full max-w-md">
        <div className="bg-card-dark border border-border-dark px-8 md:px-10 py-10 md:py-12 rounded-3xl shadow-2xl relative">
          <div className="absolute -top-20 -right-10 w-40 h-40 bg-algo-green/10 rounded-full blur-3xl pointer-events-none" />

          {/* Logo */}
          <div className="flex justify-center items-center gap-1 mb-8">
            <Hexagon className="text-algo-green" size={24} />
            <span className="text-3xl font-black text-white tracking-tighter">
              <span className="text-algo-green">Algo</span>Finance
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 text-center">
            Create Account
          </h1>
          <p className="text-text-gray mb-10 text-center text-lg leading-relaxed">
            Join us and start your trading journey today.
          </p>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center bg-red-500/10 border border-red-500/40 rounded-lg py-2 px-3">
              {error}
            </p>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            <button
              type="button"
              className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-3 border border-slate-200 hover:bg-slate-50 transition-all shadow-md"
            >
              <img
                src="https://authjs.dev/img/providers/google.svg"
                alt="Google"
                className="h-6"
              />
              Continue with Google
            </button>

            <div className="flex items-center gap-4 text-xs md:text-sm text-slate-700 uppercase font-black tracking-[0.25em] my-8">
              <div className="h-px flex-grow bg-slate-800" />
              <span>or</span>
              <div className="h-px flex-grow bg-slate-800" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-3">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-white focus:outline-none focus:border-algo-green focus:ring-1 focus:ring-algo-green/30 transition-all shadow-inner"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-3">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-white focus:outline-none focus:border-algo-green focus:ring-1 focus:ring-algo-green/30 transition-all shadow-inner"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-3">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-white focus:outline-none focus:border-algo-green focus:ring-1 focus:ring-algo-green/30 transition-all shadow-inner"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-3">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-white focus:outline-none focus:border-algo-green focus:ring-1 focus:ring-algo-green/30 transition-all shadow-inner"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-algo-green text-black text-lg font-black py-4 rounded-xl hover:bg-[#00c985] hover:shadow-[0_0_20px_rgba(0,229,153,0.3)] transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="text-center mt-8 space-y-3 text-sm font-medium">
            <p className="text-text-gray">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-algo-green font-bold hover:text-[#00c985] transition-all"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-[11px] md:text-xs text-text-gray">
          © 2024 Algo Finance. All rights reserved.
        </p>
      </main>
    </div>
  );
};

export default RegisterPage;
