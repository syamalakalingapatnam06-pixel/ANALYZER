import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Upload,
  FileText,
  History,
  User,
  Sparkles,
  LogOut,
  GraduationCap,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const { logout, isStudentMode, toggleStudentMode } = useAuth();
  const location = useLocation();

  const mainNav = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Upload Resume', path: '/upload', icon: Upload },
    { name: 'My Resumes', path: '/resumes', icon: FileText },
    { name: 'Analysis History', path: '/history', icon: History },
    { name: 'Profile & Settings', path: '/profile', icon: User },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-200 ease-in-out md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-slate-100">
            <NavLink to="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Sparkles className="w-4.5 h-4.5" />
              </div>
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">
                Resume<span className="text-blue-600">AI</span>
              </span>
            </NavLink>
          </div>

          {/* Student/Fresher Mode Quick Toggle */}
          <div className="px-4 py-3 bg-slate-50 mx-3 my-3 rounded-xl border border-slate-200/60">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 flex items-center">
                <GraduationCap className="w-4 h-4 mr-1 text-blue-600" />
                Student Mode
              </span>
              <button
                onClick={toggleStudentMode}
                className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isStudentMode ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    isStudentMode ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              {isStudentMode ? 'Prioritizes projects & coursework' : 'Prioritizes professional experience'}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="px-3 py-2 space-y-1">
            {mainNav.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Footer / Logout */}
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={logout}
            className="flex items-center space-x-3 w-full px-3 py-2 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 text-slate-400" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
