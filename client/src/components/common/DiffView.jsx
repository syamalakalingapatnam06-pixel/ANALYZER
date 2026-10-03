import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export const DiffView = ({ original, improved, mode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
      {/* Left Column: Original */}
      <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-200">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Original Version
          </span>
          <span className="text-xs text-slate-400">Preserved as truth</span>
        </div>
        <div className="p-3 bg-white rounded-lg border border-slate-200 text-sm text-slate-700 font-mono whitespace-pre-wrap leading-relaxed">
          {original || 'Select or paste text to rewrite...'}
        </div>
      </div>

      {/* Right Column: AI Improved */}
      <div className="bg-blue-50/40 rounded-xl border border-blue-200 p-4">
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-blue-200">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center">
            <Sparkles className="w-3.5 h-3.5 mr-1" />
            AI Improved Version
          </span>
          {mode && <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">{mode}</span>}
        </div>
        <div className="p-3 bg-white rounded-lg border border-blue-200 text-sm text-slate-900 font-mono whitespace-pre-wrap leading-relaxed shadow-2xs">
          {improved || 'AI rewrite will appear here after selecting a mode...'}
        </div>
      </div>
    </div>
  );
};
