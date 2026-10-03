import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Menu, X, ArrowRight, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from './Button';

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">
                Resume<span className="text-blue-600">AI</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8 ml-10 text-sm font-medium text-slate-600">
              <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How It Works</a>
              <a href="#safety" className="hover:text-blue-600 transition-colors">AI Safety</a>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-sm font-medium text-slate-700 hover:text-blue-600">
                  Dashboard
                </Link>
                <Button variant="primary" size="sm" onClick={() => navigate('/upload')}>
                  Upload Resume
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2">
                  Sign In
                </Link>
                <Button variant="primary" size="sm" onClick={() => navigate('/register')}>
                  Get Started
                </Button>
              </>
            )}
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-600 hover:text-slate-900 p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2">
          <a href="#features" className="block px-3 py-2 text-base font-medium text-slate-700 rounded-md hover:bg-slate-50">
            Features
          </a>
          <a href="#how-it-works" className="block px-3 py-2 text-base font-medium text-slate-700 rounded-md hover:bg-slate-50">
            How It Works
          </a>
          <a href="#safety" className="block px-3 py-2 text-base font-medium text-slate-700 rounded-md hover:bg-slate-50">
            AI Safety
          </a>
          <div className="pt-4 border-t border-slate-100 flex flex-col space-y-2">
            {isAuthenticated ? (
              <Button variant="primary" onClick={() => navigate('/dashboard')}>
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={() => navigate('/login')}>
                  Sign In
                </Button>
                <Button variant="primary" onClick={() => navigate('/register')}>
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
