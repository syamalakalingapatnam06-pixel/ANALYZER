import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ message, type = 'info', onClose }) => {
  if (!message) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };

  const bgStyles = {
    success: 'bg-white border-emerald-200 text-slate-800',
    error: 'bg-white border-red-200 text-slate-800',
    warning: 'bg-white border-amber-200 text-slate-800',
    info: 'bg-white border-blue-200 text-slate-800',
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-bounce-in">
      <div
        className={`flex items-center space-x-3 px-4 py-3 rounded-xl border shadow-lg ${bgStyles[type]} max-w-md`}
      >
        {icons[type]}
        <span className="text-sm font-medium">{message}</span>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
