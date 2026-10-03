import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900">Reset Password</h2>
          <p className="text-xs text-slate-500 mt-1">Enter your registered email to receive reset instructions.</p>
        </div>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="text-sm font-bold text-emerald-900">Check Your Inbox</h4>
            <p className="text-xs text-emerald-700">
              We sent password reset instructions to <strong className="font-semibold">{email}</strong>.
            </p>
            <Link to="/login" className="inline-block pt-2 text-xs font-semibold text-blue-600 hover:underline">
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
              required
            />
            <Button type="submit" variant="primary" className="w-full">
              Send Reset Link
            </Button>
          </form>
        )}

        <div className="pt-2 text-center">
          <Link to="/login" className="inline-flex items-center text-xs text-slate-500 hover:text-slate-900">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900">Create New Password</h2>
          <p className="text-xs text-slate-500 mt-1">Set a new strong password for your account.</p>
        </div>

        {done ? (
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="text-sm font-bold text-emerald-900">Password Updated</h4>
            <p className="text-xs text-emerald-700">Your password has been successfully reset.</p>
            <Link to="/login">
              <Button variant="primary" size="sm" className="mt-2">Sign In Now</Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button type="submit" variant="primary" className="w-full">
              Reset Password
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
