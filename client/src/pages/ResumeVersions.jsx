import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Copy,
  Trash2,
  Download,
  BarChart2,
  Plus,
  GitCompare,
} from 'lucide-react';
import { useResume } from '../hooks/useResume';
import { resumeService } from '../services/resumeService';
import { exportService } from '../services/exportService';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ConfirmDialog } from '../components/common/ConfirmDialog';

export const ResumeVersions = () => {
  const { resumes, selectResumeById, addResume, showToast, fetchResumes } = useResume();
  const navigate = useNavigate();

  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);

  const handleDuplicate = async (id) => {
    setLoadingAction(true);
    try {
      const res = await resumeService.duplicateResume(id);
      if (res.success && res.resume) {
        addResume(res.resume);
        showToast('New resume version duplicated successfully!', 'success');
      }
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return;
    setLoadingAction(true);
    try {
      await resumeService.deleteResume(deleteTargetId);
      await fetchResumes();
      showToast('Resume version deleted.', 'info');
    } finally {
      setLoadingAction(false);
      setDeleteModalOpen(false);
    }
  };

  const handleExportOriginalFormat = async (version) => {
    try {
      const format = exportService.getOriginalFormat(version.originalFile);
      showToast(`Preparing ${format} download...`, 'info');
      await exportService.downloadOriginalFormat(version.id || version._id, version.title, version.originalFile);
      showToast(`${format} downloaded successfully.`, 'success');
    } catch (error) {
      console.error('Failed to export resume:', error);
      showToast('Failed to export resume. Please try again.', 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Resume Vault & Versions</h1>
          <p className="text-xs text-slate-500 mt-1">
            Maintain targeted versions tailored for different tech stack job descriptions.
          </p>
        </div>

        <Button variant="primary" onClick={() => navigate('/upload')} icon={Plus}>
          Create New Version
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resumes.map((version) => (
          <div
            key={version.id || version._id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-extrabold text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-md">
                  VER {version.version || 1}.0
                </span>
                <Badge variant={version.atsScore >= 80 ? 'success' : 'warning'}>
                  ATS: {version.atsScore || 82}/100
                </Badge>
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug">{version.title}</h3>
              <p className="text-xs text-slate-500 mt-1">Role Target: {version.targetRole || 'Software Engineer'}</p>

              <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 block">Created</span>
                  <span className="font-semibold text-slate-700">
                    {new Date(version.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Job Match</span>
                  <span className="font-semibold text-emerald-600">76% Aligned</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2 pt-4 border-t border-slate-100">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => {
                    selectResumeById(version.id || version._id);
                    navigate(`/resume/${version.id || version._id}/analysis`);
                  }}
                  icon={BarChart2}
                >
                  Analysis
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    selectResumeById(version.id || version._id);
                    navigate(`/resume/${version.id || version._id}/edit`);
                  }}
                >
                  Edit
                </Button>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleExportOriginalFormat(version)}
                  >
                    {exportService.getOriginalFormat(version.originalFile)}
                  </Button>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleDuplicate(version.id || version._id)}
                    className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50"
                    title="Duplicate version"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setDeleteTargetId(version.id || version._id);
                      setDeleteModalOpen(true);
                    }}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                    title="Delete version"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Resume Version"
        message="Are you sure you want to delete this resume version? This action cannot be undone."
        loading={loadingAction}
      />
    </div>
  );
};
