import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  BarChart3,
  Search,
  Wand2,
  FileCheck,
  Cpu,
  Layers,
  Award,
  Zap,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-24 pb-16">
      {/* Hero Section */}
      <section className="pt-12 sm:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-3.5 py-1.5 rounded-full border border-blue-200/80 text-xs font-semibold mb-6 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
          <span>AI-Powered Resume Intelligence Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
          Turn Your Resume Into a{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Stronger Job Application
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Analyze your resume, understand your explainable ATS score, compare against job descriptions, refine phrasing with AI, and export production-ready PDF/DOCX files.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" variant="primary" onClick={() => navigate('/upload')} icon={Sparkles}>
            Analyze My Resume
          </Button>
          <a href="#how-it-works">
            <Button size="lg" variant="outline">
              See How It Works
            </Button>
          </a>
        </div>

        {/* Hero Visual Mockup */}
        <div className="mt-14 relative max-w-5xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-xl opacity-25"></div>
          <div className="relative bg-white rounded-2xl border border-slate-200/80 shadow-2xl p-6 sm:p-8 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-xs font-medium text-slate-400 pl-2">Dashboard Preview</span>
              </div>
              <Badge variant="primary">Target Role: Frontend Engineer</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200">
                <p className="text-xs font-semibold text-emerald-700">ATS Score</p>
                <p className="text-3xl font-extrabold text-emerald-900 mt-1">82 / 100</p>
                <span className="text-[10px] text-emerald-700 font-medium">Good ATS Compatibility</span>
              </div>
              <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-200">
                <p className="text-xs font-semibold text-blue-700">Job Match</p>
                <p className="text-3xl font-extrabold text-blue-900 mt-1">76%</p>
                <span className="text-[10px] text-blue-700 font-medium">9 Skills Matched</span>
              </div>
              <div className="bg-indigo-50/60 p-4 rounded-xl border border-indigo-200">
                <p className="text-xs font-semibold text-indigo-700">Keyword Coverage</p>
                <p className="text-3xl font-extrabold text-indigo-900 mt-1">85%</p>
                <span className="text-[10px] text-indigo-700 font-medium">Core Tech Terms Found</span>
              </div>
              <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200">
                <p className="text-xs font-semibold text-amber-700">AI Suggestions</p>
                <p className="text-3xl font-extrabold text-amber-900 mt-1">4 Actionable</p>
                <span className="text-[10px] text-amber-700 font-medium">Ready to Review</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-800">AI Suggestion Ready:</p>
                  <p className="text-xs text-slate-600 italic">"Replaced generic phrasing with active technical metrics."</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <span className="text-xs font-semibold text-slate-500 bg-white px-2.5 py-1 rounded border border-slate-200">Reject</span>
                <span className="text-xs font-semibold text-white bg-blue-600 px-2.5 py-1 rounded">Accept</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900">How It Works</h2>
          <p className="text-slate-600 mt-2 text-sm">Five seamless steps to refine and export your resume with total confidence.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { step: '01', title: 'Upload Resume', desc: 'Drag and drop your PDF or DOCX file.', icon: Cpu },
            { step: '02', title: 'Analyze ATS', desc: 'Get category-wise ATS score breakdowns.', icon: BarChart3 },
            { step: '03', title: 'Match With Job', desc: 'Identify missing keywords and tech skills.', icon: Search },
            { step: '04', title: 'Improve With AI', desc: 'Review, edit, accept, or reject AI suggestions.', icon: Wand2 },
            { step: '05', title: 'Export Resume', desc: 'Download clean PDF or DOCX versions.', icon: FileCheck },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.step} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs relative group hover:border-blue-300 transition-all">
                <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md mb-4 inline-block">
                  STEP {s.step}
                </span>
                <div className="w-10 h-10 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-slate-900">{s.title}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Comprehensive Resume Suite</h2>
            <p className="text-slate-600 mt-2 text-sm">Everything you need to bypass ATS screeners and impress hiring managers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Explainable ATS Score', desc: 'Weighted scoring across 8 categories with explicit explanations and improvement tips.', icon: Award },
              { title: 'Job Description Matching', desc: 'Compare your resume line-by-line against target job postings to surface keyword gaps.', icon: Search },
              { title: 'AI Statement Rewriter', desc: 'Rewrite bullet points with strong action verbs, conciseness, or ATS-friendly terminology.', icon: Wand2 },
              { title: 'Structured Resume Editor', desc: 'Full section-by-section editing with real-time AI assistance for each bullet point.', icon: Layers },
              { title: 'Version Management', desc: 'Maintain multiple targeted resume versions for different tech stack applications.', icon: Zap },
              { title: 'Clean PDF & DOCX Export', desc: 'Export approved content directly into ATS-compliant document formats.', icon: FileCheck },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900">{f.title}</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Safety Section */}
      <section id="safety" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold mb-6 border border-blue-400/30">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Strict AI Safety & Ethics Standard</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight">Your Resume Truth Is Preserved</h2>
            <p className="mt-4 text-slate-300 text-sm leading-relaxed">
              We believe AI should enhance your authentic career story, never fabricate fake qualifications.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mb-2" />
                <h4 className="text-xs font-bold text-white">No Auto-Replacement</h4>
                <p className="text-[11px] text-slate-400 mt-1">AI suggestions never replace original content without explicit user approval.</p>
              </div>
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mb-2" />
                <h4 className="text-xs font-bold text-white">Zero Invented Facts</h4>
                <p className="text-[11px] text-slate-400 mt-1">AI does not fabricate skills, employers, achievements, or fake metrics.</p>
              </div>
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mb-2" />
                <h4 className="text-xs font-bold text-white">Full User Control</h4>
                <p className="text-[11px] text-slate-400 mt-1">Accept, reject, edit, or regenerate every AI recommendation individually.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
