import React from 'react';

export const ScoreCircle = ({
  score = 0,
  maxScore = 100,
  size = 'md',
  label = 'ATS Score',
  description,
  className = ''
}) => {
  const percentage = Math.min(Math.max(0, Math.round((score / maxScore) * 100)), 100);

  // SVG dimensions according to size
  const sizeMap = {
    sm: { dimension: 80, stroke: 6, textSize: 'text-lg', labelSize: 'text-xs' },
    md: { dimension: 120, stroke: 8, textSize: 'text-2xl', labelSize: 'text-xs' },
    lg: { dimension: 160, stroke: 10, textSize: 'text-4xl', labelSize: 'text-sm' },
    xl: { dimension: 200, stroke: 12, textSize: 'text-5xl', labelSize: 'text-base' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;
  const radius = (currentSize.dimension - currentSize.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColorClass = (pct) => {
    if (pct >= 80) return 'stroke-emerald-500 text-emerald-600';
    if (pct >= 70) return 'stroke-brand-500 text-brand-600';
    if (pct >= 50) return 'stroke-amber-500 text-amber-600';
    return 'stroke-rose-500 text-rose-600';
  };

  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      <div className="relative inline-flex items-center justify-center">
        <svg
          width={currentSize.dimension}
          height={currentSize.dimension}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={currentSize.dimension / 2}
            cy={currentSize.dimension / 2}
            r={radius}
            className="stroke-slate-100"
            strokeWidth={currentSize.stroke}
            fill="transparent"
          />
          {/* Animated score circle */}
          <circle
            cx={currentSize.dimension / 2}
            cy={currentSize.dimension / 2}
            r={radius}
            className={`transition-all duration-1000 ease-out ${getColorClass(percentage).split(' ')[0]}`}
            strokeWidth={currentSize.stroke}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className={`font-bold tracking-tight text-slate-900 ${currentSize.textSize}`}>
            {score}
          </span>
          <span className="text-[10px] text-slate-400 font-medium">/{maxScore}</span>
        </div>
      </div>
      {label && (
        <span className={`mt-2 font-semibold text-slate-700 ${currentSize.labelSize}`}>
          {label}
        </span>
      )}
      {description && (
        <p className="mt-1 text-xs text-slate-500 max-w-xs">{description}</p>
      )}
    </div>
  );
};

export default ScoreCircle;
