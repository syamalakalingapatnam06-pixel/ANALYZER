import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import {
  BarChart2,
  GitCompare,
  Wand2,
  FileEdit,
  History,
  Download,
  FileText,
} from 'lucide-react';

export const ContextualNav = ({ resumeTitle, targetRole, resumeId }) => {
  const params = useParams();
  const id = resumeId || params.id || 'res_1';

  const tabs = [
    { name: 'ATS Analysis', path: `/resume/${id}/analysis`, icon: BarChart2 },
    { name: 'Job Match', path: `/resume/${id}/match`, icon: GitCompare },
    { name: 'AI Rewriter', path: `/resume/${id}/rewrite`, icon: Wand2 },
    { name: 'Resume Editor', path: `/resume/${id}/edit`, icon: FileEdit },
    { name: 'Versions', path: `/resumes`, icon: History },
  ];

  return (
    <div className="bg-white border-b border-slate-200 px-4 sm:px-6 pt-4 mb-6 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-slate-900">{resumeTitle || 'Software Engineer Resume'}</h2>
              <span className="text-xs text-blue-600 bg-blue-50 font-semibold px-2 py-0.5 rounded border border-blue-100">
                Active Selection
              </span>
            </div>
            <p className="text-xs text-slate-500">Target Role: {targetRole || 'Frontend Developer'}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-1 sm:space-x-4 overflow-x-auto no-scrollbar pt-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.name}
              to={tab.path}
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2.5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
                  isActive
                    ? 'border-blue-600 text-blue-600 bg-blue-50/30'
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
