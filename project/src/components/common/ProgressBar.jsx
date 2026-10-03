import React from 'react';

export const ProgressBar = ({ value = 0, max = 100, label, showValue = true, size = 'md', className = '' }) => {
  const percentage = Math.min(Math.max(0, Math.round((value / max) * 100)), 100);

  const getColor = (pct) => {
    if (pct >= 80) return 'bg-emerald-500';
    if (pct >= 70) return 'bg-brand-500';
    if (pct >= 50) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5 text-xs font-medium text-slate-700">
          {label && <span>{label}</span>}
          {showValue && <span className="font-semibold">{percentage}%</span>}
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${heights[size]}`}>
        <div
          className={`h-full transition-all duration-500 ease-out rounded-full ${getColor(percentage)}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
