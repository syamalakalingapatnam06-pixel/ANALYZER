import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Award, Calendar, ChevronRight, Download, Trash2, Copy } from 'lucide-react';
import { Badge } from './Badge';
import { Button } from './Button';

export const ResumeCard = ({ resume, onSelect, onDelete, onDuplicate }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-md transition-all group">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
              {resume.title}
            </h4>
            <p className="text-xs text-slate-500">{resume.targetRole || 'Software Engineer'}</p>
          </div>
        </div>
        <Badge variant={resume.atsScore >= 80 ? 'success' : resume.atsScore >= 60 ? 'warning' : 'danger'}>
          ATS: {resume.atsScore || 0}
        </Badge>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center">
          <Calendar className="w-3.5 h-3.5 mr-1" />
          Updated {new Date(resume.updatedAt || resume.createdAt).toLocaleDateString()}
        </span>
        <span className="font-semibold text-slate-600">Ver {resume.version || 1}.0</span>
      </div>

      <div className="mt-4 flex items-center space-x-2">
        <Button
          size="sm"
          variant="primary"
          className="flex-1"
          onClick={() => navigate(`/resume/${resume.id || resume._id}/analysis`)}
        >
          View Analysis
        </Button>
        {onDuplicate && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onDuplicate(resume.id || resume._id)}
            title="Duplicate version"
          >
            <Copy className="w-3.5 h-3.5" />
          </Button>
        )}
        {onDelete && (
          <Button
            size="sm"
            variant="ghost"
            className="text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={() => onDelete(resume.id || resume._id)}
            title="Delete resume"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export const VersionCard = ({ version, onSelect, onExport, onDelete }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
            Version {version.version || 1}.0
          </span>
          <h4 className="text-base font-semibold text-slate-900 mt-1">{version.title}</h4>
          <p className="text-xs text-slate-500">{version.targetRole}</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-extrabold text-slate-900">{version.atsScore || 82}</span>
          <span className="text-xs text-slate-400 block">ATS Score</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
        <span>Created: {new Date(version.createdAt).toLocaleDateString()}</span>
        <span>Match: {version.jobMatchScore || 76}%</span>
      </div>

      <div className="mt-4 flex items-center space-x-2">
        <Button size="sm" variant="outline" className="flex-1" onClick={onSelect}>
          View & Edit
        </Button>
        <Button size="sm" variant="secondary" onClick={onExport} icon={Download}>
          Export
        </Button>
      </div>
    </div>
  );
};
