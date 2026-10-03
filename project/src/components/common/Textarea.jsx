import React from 'react';

export const Textarea = ({
  label,
  id,
  error,
  helperText,
  rows = 4,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        className={`block w-full rounded-lg text-sm border p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 ${
          error
            ? 'border-rose-300 bg-rose-50/30 text-rose-900 focus:border-rose-500 focus:ring-rose-200'
            : 'border-slate-300 bg-white text-slate-900 focus:border-brand-500 focus:ring-brand-200'
        }`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-rose-600 font-medium">{error}</p>}
      {!error && helperText && <p className="mt-1 text-xs text-slate-500">{helperText}</p>}
    </div>
  );
};

export default Textarea;
