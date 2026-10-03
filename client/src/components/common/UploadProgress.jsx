import React from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';

export const UploadProgress = ({ step = 1 }) => {
  const steps = [
    { num: 1, label: 'Resume Uploaded' },
    { num: 2, label: 'Text Extracted' },
    { num: 3, label: 'Sections Detected' },
    { num: 4, label: 'Analysis Ready' },
  ];

  return (
    <div className="w-full my-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {steps.map((s) => {
          const isDone = step > s.num;
          const isCurrent = step === s.num;

          return (
            <div
              key={s.num}
              className={`p-3 rounded-xl border flex items-center space-x-3 transition-all ${
                isDone
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : isCurrent
                  ? 'bg-blue-50 border-blue-300 text-blue-800 ring-2 ring-blue-100'
                  : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}
            >
              <div>
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : isCurrent ? (
                  <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-xs font-semibold">
                    {s.num}
                  </div>
                )}
              </div>
              <div className="text-xs font-medium truncate">{s.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
