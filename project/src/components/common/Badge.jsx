import React from 'react';

export const Badge = ({ children, variant = 'neutral', size = 'md', className = '' }) => {
  const variants = {
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    info: 'bg-blue-50 text-blue-700 border-blue-200',
    brand: 'bg-brand-50 text-brand-700 border-brand-200',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs font-medium',
    lg: 'px-3 py-1 text-sm font-medium',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
