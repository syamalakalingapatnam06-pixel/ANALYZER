import React from 'react';

export const Select = ({
  label,
  id,
  options = [],
  error,
  helperText,
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
      <select
        id={id}
        className={`block w-full rounded-lg text-sm border px-3.5 py-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 ${
          error
            ? 'border-rose-300 bg-rose-50/30 text-rose-900 focus:border-rose-500 focus:ring-rose-200'
            : 'border-slate-300 bg-white text-slate-900 focus:border-brand-500 focus:ring-brand-200'
        }`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value ?? opt.id ?? opt} value={opt.value ?? opt.id ?? opt}>
            {opt.label ?? opt.name ?? opt}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-rose-600 font-medium">{error}</p>}
      {!error && helperText && <p className="mt-1 text-xs text-slate-500">{helperText}</p>}
    </div>
  );
};

export default Select;
