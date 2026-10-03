import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, Sparkles, GraduationCap } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isStudentMode, setIsStudentMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const res = await register(name, email, password, isStudentMode);
    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-xl p-8 space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white mx-auto mb-3 shadow-md shadow-blue-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
          <p className="text-xs text-slate-500 mt-1">Start analyzing and optimizing your resume with AI.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg text-xs font-medium border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            icon={User}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Alex Johnson"
            required
          />

          <Input
            label="Email Address"
            type="email"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="alex@example.com"
            required
          />

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-lg border border-slate-300 pl-3 pr-10 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-purple-600" />
              <div>
                <span className="text-xs font-bold text-purple-900 block">Student / Fresher Mode</span>
                <span className="text-[10px] text-purple-700">Prioritizes coursework & projects over experience</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={isStudentMode}
              onChange={(e) => setIsStudentMode(e.target.checked)}
              className="h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
            />
          </div>

          <Button type="submit" variant="primary" className="w-full" loading={loading}>
            Create Account
          </Button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          Already registered?{' '}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
