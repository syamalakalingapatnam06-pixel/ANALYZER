import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Award,
  GitCompare,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Upload,
  Plus,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useResume } from '../hooks/useResume';
import { StatCard } from '../components/common/StatCard';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ScoreTrendChart, PerformanceBarChart } from '../components/common/ScoreChart';
import { EmptyState } from '../components/common/EmptyState';

export const Dashboard = () => {
  const { user } = useAuth();
  const { resumes, selectedResume, selectResumeById } = useResume();
  const navigate = useNavigate();

  if (!resumes || resumes.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Good morning, {user?.name || 'User'}</h1>
          <p className="text-sm text-slate-500 mt-1">Here's an overview of your resume performance.</p>
        </div>
        <EmptyState
          title="No Resumes Uploaded Yet"
          description="Upload your first PDF or DOCX resume to analyze your ATS score, run job description matching, and apply AI rewrites."
          actionLabel="Upload Your First Resume"
          onAction={() => navigate('/upload')}
        />
      </div>
    );
  }

  const latestATS = selectedResume?.atsScore || 82;
  const jobMatchScore = 76;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white p-6 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-extrabold tracking-tight">Good day, {user?.name || 'Alex'}</h1>
            <span className="bg-blue-500/20 text-blue-300 text-xs px-2.5 py-0.5 rounded-full border border-blue-400/30">
              Pro Account
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1">Here's an overview of your active resume performance and ATS compatibility.</p>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="primary" onClick={() => navigate('/upload')} icon={Upload}>
            Upload Resume
          </Button>
          {selectedResume && (
            <Button
              variant="outline"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              onClick={() => navigate(`/resume/${selectedResume.id || selectedResume._id}/analysis`)}
            >
              Run AI Analysis
            </Button>
          )}
        </div>
      </div>

      {/* Stats Cards Grid (8 Stats) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Resumes"
          value={resumes.length}
          icon={FileText}
          color="blue"
          subtitle="Managed in vault"
        />
        <StatCard
          title="Latest ATS Score"
          value={`${latestATS} / 100`}
          icon={Award}
          color="emerald"
          trend="+8 pts this week"
        />
        <StatCard
          title="Job Match Score"
          value={`${jobMatchScore}%`}
          icon={GitCompare}
          color="indigo"
          subtitle="Target Role Matched"
        />
        <StatCard
          title="Grammar Score"
          value="95%"
          icon={CheckCircle2}
          color="amber"
          subtitle="1 Grammar Fix Available"
        />
        <StatCard
          title="Keyword Score"
          value="85%"
          icon={Sparkles}
          color="purple"
          subtitle="Technical Terms Matched"
        />
        <StatCard
          title="Issues Found"
          value="3 Total"
          icon={AlertCircle}
          color="amber"
          subtitle="Low Severity"
        />
        <StatCard
          title="AI Suggestions"
          value={selectedResume?.suggestionsCount || 4}
          icon={Sparkles}
          color="blue"
          subtitle="Ready to Review"
        />
        <StatCard
          title="Resume Versions"
          value={`${selectedResume?.version || 2} Active`}
          icon={TrendingUp}
          color="emerald"
          subtitle="Targeted variations"
        />
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="ATS Score Improvement Trend" subtitle="Score progression across resume revisions">
          <ScoreTrendChart />
        </Card>

        <Card title="Resume Performance Breakdown" subtitle="Detailed evaluation across 8 weighted categories">
          <PerformanceBarChart />
        </Card>
      </div>

      {/* Recent Analyses Table */}
      <Card
        title="Recent Resume Analyses"
        subtitle="Historical audit log and ATS evaluations"
        action={
          <Button size="sm" variant="ghost" onClick={() => navigate('/history')}>
            View All History
          </Button>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-2">Resume Title</th>
                <th className="py-3 px-2">Target Role</th>
                <th className="py-3 px-2">ATS Score</th>
                <th className="py-3 px-2">Job Match</th>
                <th className="py-3 px-2">Last Updated</th>
                <th className="py-3 px-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {resumes.map((r) => (
                <tr key={r.id || r._id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-2 font-semibold text-slate-900 flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>{r.title}</span>
                  </td>
                  <td className="py-3 px-2 text-slate-600">{r.targetRole}</td>
                  <td className="py-3 px-2">
                    <Badge variant={r.atsScore >= 80 ? 'success' : 'warning'}>
                      {r.atsScore || 82} / 100
                    </Badge>
                  </td>
                  <td className="py-3 px-2 font-medium text-slate-700">76%</td>
                  <td className="py-3 px-2 text-slate-500">
                    {new Date(r.updatedAt || r.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-2 text-right space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        selectResumeById(r.id || r._id);
                        navigate(`/resume/${r.id || r._id}/analysis`);
                      }}
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => navigate(`/resume/${r.id || r._id}/match`)}
                    >
                      Match Job
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
