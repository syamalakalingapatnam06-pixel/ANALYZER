import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 text-white mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg">ResumeAI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              AI-Powered Resume Analyzer · Match · Rewrite · Export. Turn your resume into a stronger job application.
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 p-2 rounded-lg">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>AI Safety Guaranteed: Human Approval Required</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Product</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
              <li><a href="/upload" className="hover:text-white transition-colors">Upload Resume</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">ATS Scoring</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Job Matcher</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Features</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="text-slate-400">Explainable ATS Score</span></li>
              <li><span className="text-slate-400">Keyword Gap Analysis</span></li>
              <li><span className="text-slate-400">AI Statement Rewriter</span></li>
              <li><span className="text-slate-400">PDF & DOCX Export</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Legal & Safety</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="text-slate-400">Privacy Policy</span></li>
              <li><span className="text-slate-400">Terms of Service</span></li>
              <li><span className="text-slate-400">AI Ethics & Preservation</span></li>
              <li><span className="text-slate-400">Contact Support</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-xs text-center text-slate-500 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} ResumeAI Prototype. All rights reserved.</p>
          <p className="flex items-center space-x-1">
            <span>Isolated Backend Architecture with OpenAI API</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
