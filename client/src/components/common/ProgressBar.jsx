import React from 'react';

export const ProgressBar = ({ value = 0, max = 100, label, showValue = true, color = 'blue', size = 'md' }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const colors = {
    blue: 'bg-blue-600',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
    purple: 'bg-purple-600',
  };

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  let autoColor = colors[color] || colors.blue;
  if (color === 'auto') {
    if (percentage >= 80) autoColor = colors.emerald;
    else if (percentage >= 60) autoColor = colors.amber;
    else autoColor = colors.red;
  }

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1 text-xs font-medium">
          {label && <span className="text-slate-700">{label}</span>}
          {showValue && <span className="text-slate-500">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${sizes[size]}`}>
        <div
          className={`${autoColor} transition-all duration-500 rounded-full h-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
