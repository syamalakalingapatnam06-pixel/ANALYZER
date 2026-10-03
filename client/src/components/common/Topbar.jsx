import React from 'react';
import { Menu, Bell, User, Sparkles, GraduationCap } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const Topbar = ({ onMenuClick }) => {
  const { user, isStudentMode, isDemoMode } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center space-x-3">
        <button
          onClick={onMenuClick}
          className="md:hidden text-slate-600 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-100"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-slate-900 hidden sm:block">
          Resume Analyzer <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">SaaS</span>
        </h1>
      </div>

      <div className="flex items-center space-x-3 sm:space-x-4">
        {isDemoMode && (
          <span className="hidden sm:inline-flex items-center space-x-1 text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>Demo Data Mode</span>
          </span>
        )}

        {isStudentMode && (
          <span className="inline-flex items-center space-x-1 text-xs font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
            <GraduationCap className="w-3.5 h-3.5 text-purple-600" />
            <span className="hidden xs:inline">Fresher Mode</span>
          </span>
        )}

        <button className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full" />
        </button>

        <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center border border-blue-200">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
          </div>
          <div className="hidden lg:block text-left">
            <span className="text-xs font-semibold text-slate-800 block leading-tight">{user?.name || 'Alex Johnson'}</span>
            <span className="text-[10px] text-slate-500 block">{user?.email || 'alex@example.com'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
