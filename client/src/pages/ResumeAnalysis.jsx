import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Award,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileText,
  HelpCircle,
  RefreshCw,
  Plus,
} from 'lucide-react';
import { useResume } from '../hooks/useResume';
import { useAnalysis } from '../hooks/useAnalysis';
import { ContextualNav } from '../components/common/ContextualNav';
import { ScoreCircle } from '../components/common/ScoreCircle';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';
import { SuggestionCard } from '../components/common/SuggestionCard';
import { LoadingState } from '../components/common/LoadingState';
import { Button } from '../components/common/Button';

export const ResumeAnalysis = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedResume, selectResumeById, showToast } = useResume();
  const { analysis, loading, runAnalysis, fetchAnalysis } = useAnalysis();
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const init = async () => {
      const targetId = id || selectedResume?.id || selectedResume?._id || 'res_1';
      await selectResumeById(targetId);
      const res = await fetchAnalysis(targetId);
      if (res) {
        setSuggestions(res.suggestions || []);
      } else {
        const newRes = await runAnalysis(targetId);
        if (newRes) setSuggestions(newRes.suggestions || []);
      }
    };
    init();
  }, [id]);

  const handleReAnalyze = async () => {
    const targetId = id || selectedResume?.id || selectedResume?._id || 'res_1';
    const res = await runAnalysis(targetId);
    if (res) {
      setSuggestions(res.suggestions || []);
      showToast('Resume re-analyzed successfully!', 'success');
    }
  };

  const handleAcceptSuggestion = (sId, text) => {
    setSuggestions((prev) =>
      prev.map((s) => (s.id === sId ? { ...s, suggestion: text, status: 'accepted' } : s))
    );
    showToast('AI suggestion applied to draft!', 'success');
  };

  const handleRejectSuggestion = (sId) => {
    setSuggestions((prev) =>
      prev.map((s) => (s.id === sId ? { ...s, status: 'rejected' } : s))
    );
    showToast('AI suggestion rejected.', 'info');
  };

  const handleEditSuggestion = (sId, newText) => {
    setSuggestions((prev) =>
      prev.map((s) => (s.id === sId ? { ...s, suggestion: newText, status: 'edited' } : s))
    );
    showToast('AI suggestion saved with edits!', 'success');
  };

  if (loading && !analysis) {
    return <LoadingState message="AI is evaluating your resume ATS compatibility..." />;
  }

  const categoryWeights = [
    { key: 'keywords', label: 'Keywords', weight: '20%' },
    { key: 'formatting', label: 'Formatting', weight: '15%' },
    { key: 'skills', label: 'Skills', weight: '15%' },
    { key: 'experience', label: 'Experience', weight: '15%' },
    { key: 'education', label: 'Education', weight: '10%' },
    { key: 'achievements', label: 'Achievements', weight: '10%' },
    { key: 'structure', label: 'Structure', weight: '10%' },
    { key: 'readability', label: 'Readability', weight: '5%' },
  ];

  const scores = analysis?.categoryScores || {
    keywords: 85,
    formatting: 90,
    skills: 80,
    experience: 82,
    education: 88,
    achievements: 78,
    structure: 85,
    readability: 92,
  };

  const feedback = analysis?.categoryFeedback || {};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ContextualNav
        resumeTitle={selectedResume?.title}
        targetRole={selectedResume?.targetRole}
        resumeId={id}
      />

      <div className="space-y-8">
        {/* Top Score Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-6">
            <ScoreCircle score={analysis?.atsScore || 82} size={150} />
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-slate-900">Explainable ATS Compatibility Score</h2>
                {analysis?.isDemoData && <Badge variant="warning">Demo Mode</Badge>}
              </div>
              <p className="text-xs text-slate-500 mt-1 max-w-md">
                Calculated using weighted category analysis. Every deduction includes actionable reasoning below.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded font-semibold border border-emerald-200">
                  Top 15% ATS Pass Rate
                </span>
                <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded font-semibold border border-blue-200">
                  Target Role: {selectedResume?.targetRole || 'Frontend Developer'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Button variant="outline" onClick={handleReAnalyze} icon={RefreshCw} loading={loading}>
              Re-Analyze
            </Button>
            <Button variant="primary" onClick={() => navigate(`/resume/${id}/match`)} icon={Sparkles}>
              Compare With Job
            </Button>
          </div>
        </div>

        {/* 8 Weighted Category Cards */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">Category-Wise ATS Score Breakdown</h3>
            <span className="text-xs text-slate-500 font-medium">8 Weighted Dimensions</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categoryWeights.map((item) => {
              const scoreVal = scores[item.key] || 75;
              const itemFb = feedback[item.key] || {
                reason: 'Evaluated against role standards.',
                suggestion: 'Optimize phrasing.',
              };

              return (
                <div key={item.key} className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs hover:shadow-md transition-all">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      {item.label}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                      {item.weight}
                    </span>
                  </div>

                  <div className="flex items-baseline space-x-1 mb-2">
                    <span className="text-2xl font-extrabold text-slate-900">{scoreVal}</span>
                    <span className="text-xs text-slate-400">/ 100</span>
                  </div>

                  <ProgressBar value={scoreVal} color="auto" showValue={false} size="sm" />

                  <div className="mt-3 text-xs space-y-1">
                    <p className="text-slate-600 leading-tight">
                      <strong className="text-slate-700">Reason:</strong> {itemFb.reason}
                    </p>
                    <p className="text-blue-600 font-medium leading-tight">
                      <strong>Tip:</strong> {itemFb.suggestion}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Strengths & Weaknesses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Detected Strengths" subtitle="High-impact ATS scanner green flags">
            <ul className="space-y-2.5">
              {(analysis?.strengths || [
                'Strong technical skill alignment with target Frontend Developer role',
                'Clear, readable structure with standard section headers recognized by ATS',
                'Consistent use of action-oriented experience bullet points',
              ]).map((str, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-xs text-slate-700 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Areas for Improvement" subtitle="Weaknesses & missing section headers">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-2">Weaknesses</span>
                <ul className="space-y-2">
                  {(analysis?.weaknesses || [
                    'Missing quantifiable metrics in earlier work experience',
                    'Soft skills section could be integrated into achievement statements',
                  ]).map((w, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs text-slate-700 bg-amber-50/50 p-2.5 rounded-lg border border-amber-100">
                      <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Missing Sections</span>
                <div className="flex flex-wrap gap-2">
                  {(analysis?.missingSections || ['Certifications Header', 'GitHub Link']).map((ms, idx) => (
                    <Badge key={idx} variant="warning">{ms}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Grammar & Phrasing Fixes */}
        {analysis?.grammarIssues && analysis.grammarIssues.length > 0 && (
          <Card title="Grammar & Readability Audit" subtitle="Identified syntax and tone corrections">
            <div className="space-y-3">
              {analysis.grammarIssues.map((g, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="font-semibold text-slate-400 uppercase">Original:</span>
                      <p className="text-red-700 line-through bg-red-50 p-2 rounded border border-red-100 mt-1 font-mono">
                        "{g.original}"
                      </p>
                    </div>
                    <div>
                      <span className="font-semibold text-emerald-600 uppercase">Correction:</span>
                      <p className="text-emerald-800 font-semibold bg-emerald-50 p-2 rounded border border-emerald-100 mt-1 font-mono">
                        "{g.correction}"
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-500 italic">
                    <strong>Explanation:</strong> {g.explanation}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Actionable AI Suggestions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Actionable AI Improvement Suggestions</h3>
              <p className="text-xs text-slate-500">Every suggestion must be approved by you before modifying the resume.</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => navigate(`/resume/${id}/rewrite`)} icon={Sparkles}>
              Open AI Rewriter
            </Button>
          </div>

          <div className="space-y-4">
            {suggestions.map((s) => (
              <SuggestionCard
                key={s.id}
                suggestion={s}
                onAccept={handleAcceptSuggestion}
                onReject={handleRejectSuggestion}
                onEdit={handleEditSuggestion}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
