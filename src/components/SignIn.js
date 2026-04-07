'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const SignIn = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password2: '',
    username: '',
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (data.password !== data.password2) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    if (data.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstname: data.firstname,
          lastname: data.lastname,
          password: data.password,
          username: data.username,
          email: data.email,
          password2: data.password2,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        login(result.token);
        router.push('/');
      } else {
        setError(result.message || 'Registration failed. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-700 px-8 py-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white rounded-xl p-2 shadow-lg">
                <Image src="/logo.jpeg" alt="HomeOfElectronics" width={52} height={52} className="rounded-lg" />
              </div>
            </div>
            <h1 className="text-xl font-bold text-white">Create Your Account</h1>
            <p className="text-slate-400 text-sm mt-1">
              Home<span className="text-blue-400">Of</span>Electronics
            </p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            {error && (
              <div className="mb-5 flex items-start gap-3 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">First Name</label>
                  <input
                    type="text"
                    name="firstname"
                    value={data.firstname}
                    onChange={handleChange}
                    placeholder="John"
                    required
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Last Name</label>
                  <input
                    type="text"
                    name="lastname"
                    value={data.lastname}
                    onChange={handleChange}
                    placeholder="Doe"
                    required
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Username</label>
                <input
                  type="text"
                  name="username"
                  value={data.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  required
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    placeholder="Min. 6 characters"
                    required
                    minLength={6}
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
                  <input
                    type="password"
                    name="password2"
                    value={data.password2}
                    onChange={handleChange}
                    placeholder="Repeat password"
                    required
                    minLength={6}
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-300 text-white font-semibold py-2.5 rounded-lg transition-colors duration-200 text-sm mt-2"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Creating Account...
                  </span>
                ) : 'Create Account'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{' '}
              <Link href="/signUp" className="text-blue-600 hover:text-blue-500 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-slate-500 text-xs mt-6">
          &copy; {new Date().getFullYear()} HomeOfElectronics. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SignIn;
