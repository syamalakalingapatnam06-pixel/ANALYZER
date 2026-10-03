import React from 'react';
import { Info, Sparkles } from 'lucide-react';

export const DemoModeBanner = ({ message }) => {
  return (
    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 text-sm font-medium flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-2">
        <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded font-semibold uppercase tracking-wider">
          Demo Mode
        </span>
        <span>
          {message || 'Running with interactive fallback data. To switch to live OpenAI API, configure OPENAI_API_KEY in server/.env.'}
        </span>
      </div>
      <div className="hidden md:flex items-center text-xs opacity-90">
        <Sparkles className="w-3.5 h-3.5 mr-1" />
        Full SaaS Capabilities Active
      </div>
    </div>
  );
};
