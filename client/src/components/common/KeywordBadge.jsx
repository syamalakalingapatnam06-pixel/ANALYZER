import React from 'react';
import { Check, Plus } from 'lucide-react';

export const KeywordBadge = ({ keyword, type = 'match', onClick }) => {
  const isMatch = type === 'match';

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border transition-all ${
        isMatch
          ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
          : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100 cursor-pointer'
      }`}
    >
      {isMatch ? (
        <Check className="w-3 h-3 text-emerald-600 flex-shrink-0" />
      ) : (
        <Plus className="w-3 h-3 text-amber-600 flex-shrink-0" />
      )}
      <span>{keyword}</span>
    </span>
  );
};
