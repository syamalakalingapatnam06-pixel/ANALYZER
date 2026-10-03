import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from 'recharts';

export const ScoreTrendChart = ({ data }) => {
  const chartData = data || [
    { date: 'Ver 1.0', score: 68 },
    { date: 'Ver 1.1', score: 72 },
    { date: 'Ver 1.2', score: 78 },
    { date: 'Ver 2.0', score: 82 },
  ];

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 12 }} />
          <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 12 }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
          />
          <Area type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#scoreGrad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const PerformanceBarChart = ({ categoryScores }) => {
  const scores = categoryScores || {
    keywords: 85,
    formatting: 90,
    skills: 80,
    experience: 82,
    education: 88,
    achievements: 78,
    structure: 85,
    readability: 92,
  };

  const chartData = Object.keys(scores).map((key) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    score: scores[key],
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} />
          <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 12 }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
          />
          <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
