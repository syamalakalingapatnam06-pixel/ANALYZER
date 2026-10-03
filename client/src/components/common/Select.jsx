import React from 'react';

export const Select = ({
  label,
  options = [],
  error,
  helperText,
  className = '',
  id,
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-slate-700 mb-1">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`block w-full rounded-lg border text-sm transition-colors duration-150 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          error ? 'border-red-300 text-red-900 focus:ring-red-500' : 'border-slate-300 text-slate-900'
        } ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value || opt} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      {helperText && !error && <p className="mt-1 text-xs text-slate-500">{helperText}</p>}
    </div>
  );
};
