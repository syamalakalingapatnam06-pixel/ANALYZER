import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { History as HistoryIcon, Search, FileText } from 'lucide-react';
import { analysisService } from '../services/analysisService';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Input } from '../components/common/Input';
import { LoadingState } from '../components/common/LoadingState';
import { EmptyState } from '../components/common/EmptyState';

export const History = () => {
  const [historyItems, setHistoryItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHist = async () => {
      setLoading(true);
      const res = await analysisService.getHistory();
      if (res.success && res.history) {
        setHistoryItems(res.history);
      }
      setLoading(false);
    };
    fetchHist();
  }, []);

  const filtered = historyItems.filter((item) => {
    const title = item.resumeId?.title || 'Resume';
    const role = item.resumeId?.targetRole || item.targetRole || '';
    return (
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (loading) return <LoadingState message="Loading analysis history..." />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analysis History</h1>
          <p className="text-xs text-slate-500 mt-1">Audit log of all AI resume checks and ATS evaluations.</p>
        </div>

        <div className="w-full sm:w-72">
          <Input
            icon={Search}
            placeholder="Search by title or target role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title={historyItems.length === 0 ? 'No analyses yet' : 'No matching analyses'}
          description={historyItems.length === 0
            ? 'Analyze a resume to see its results here.'
            : 'Try a different search or analyze another resume.'}
          icon={HistoryIcon}
          actionLabel="Analyze a Resume"
          onAction={() => navigate('/upload')}
        />
      ) : (
      <>
      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3.5 px-6">Resume Document</th>
              <th className="py-3.5 px-4">Target Role</th>
              <th className="py-3.5 px-4">ATS Score</th>
              <th className="py-3.5 px-4">Job Match</th>
              <th className="py-3.5 px-4">Analysis Date</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filtered.map((item) => {
              const resId = item.resumeId?._id || item.resumeId?.id || item.resumeId || 'res_1';
              const title = item.resumeId?.title || 'Software Engineer Resume';
              const role = item.resumeId?.targetRole || item.targetRole || 'Frontend Developer';

              return (
                <tr key={item._id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-semibold text-slate-900 flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span>{title}</span>
                  </td>
                  <td className="py-4 px-4 text-slate-600">{role}</td>
                  <td className="py-4 px-4">
                    <Badge variant={item.atsScore >= 80 ? 'success' : 'warning'}>
                      {item.atsScore} / 100
                    </Badge>
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-700">76%</td>
                  <td className="py-4 px-4 text-slate-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold text-[10px]">
                      Completed
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/resume/${resId}/analysis`)}
                    >
                      View Analysis
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Transform View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filtered.map((item) => {
          const resId = item.resumeId?._id || item.resumeId?.id || 'res_1';
          return (
            <div key={item._id} className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{item.resumeId?.title || 'Resume'}</h4>
                  <p className="text-xs text-slate-500">{item.resumeId?.targetRole || 'Developer'}</p>
                </div>
                <Badge variant={item.atsScore >= 80 ? 'success' : 'warning'}>
                  {item.atsScore}/100
                </Badge>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-slate-100">
                <span>Date: {new Date(item.createdAt).toLocaleDateString()}</span>
                <Button size="sm" variant="primary" onClick={() => navigate(`/resume/${resId}/analysis`)}>
                  Open Analysis
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      </>
      )}
    </div>
  );
};
