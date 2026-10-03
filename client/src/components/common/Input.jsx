import React from 'react';

export const Input = ({
  label,
  error,
  helperText,
  icon: Icon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-slate-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative rounded-md shadow-sm">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Icon className="h-4 w-4" />
          </div>
        )}
        <input
          id={inputId}
          className={`block w-full rounded-lg border text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            Icon ? 'pl-9' : 'pl-3'
          } pr-3 py-2 ${
            error
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-slate-300 text-slate-900 placeholder-slate-400 bg-white'
          } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      {helperText && !error && <p className="mt-1 text-xs text-slate-500">{helperText}</p>}
    </div>
  );
};
