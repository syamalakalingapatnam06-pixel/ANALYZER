import React from 'react';

export const Textarea = ({
  label,
  error,
  helperText,
  rows = 4,
  className = '',
  id,
  ...props
}) => {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-slate-700 mb-1">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        className={`block w-full rounded-lg border text-sm transition-colors duration-150 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          error
            ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
            : 'border-slate-300 text-slate-900 placeholder-slate-400 bg-white'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      {helperText && !error && <p className="mt-1 text-xs text-slate-500">{helperText}</p>}
    </div>
  );
};
