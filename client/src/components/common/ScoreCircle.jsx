import React from 'react';

export const ScoreCircle = ({ score = 0, size = 140, strokeWidth = 12, label = 'ATS Score', subtitle = '' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let color = '#3b82f6'; // blue
  let statusText = 'Good Compatibility';

  if (score >= 80) {
    color = '#10b981'; // emerald
    statusText = 'Excellent ATS Compatibility';
  } else if (score >= 60) {
    color = '#f59e0b'; // amber
    statusText = 'Moderate - Needs Refinement';
  } else {
    color = '#ef4444'; // red
    statusText = 'Low ATS Score - Needs Attention';
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold text-slate-900">{score}</span>
          <span className="text-xs text-slate-400 font-medium">/ 100</span>
        </div>
      </div>
      {label && <p className="mt-3 text-sm font-semibold text-slate-700">{label}</p>}
      <p className="text-xs font-medium mt-0.5" style={{ color }}>
        {subtitle || statusText}
      </p>
    </div>
  );
};
