import React from 'react';

export const LoadingState = ({ message = 'AI is processing your resume request...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-2xl border border-slate-200">
      <div className="relative mb-4">
        <div className="w-12 h-12 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />
      </div>
      <p className="text-sm font-semibold text-slate-800">{message}</p>
      <div className="mt-3 flex items-center space-x-1 text-xs text-slate-400">
        <span className="animate-pulse">Checking keywords...</span>
        <span>•</span>
        <span className="animate-pulse">Evaluating ATS compatibility...</span>
      </div>
    </div>
  );
};
