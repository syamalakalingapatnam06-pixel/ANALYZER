import React from 'react';
import { FileQuestion, Loader2, AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

export const EmptyState = ({
  title = 'No Resumes Found',
  description = 'Upload your first resume to start analyzing ATS scores and job matching.',
  icon: Icon = FileQuestion,
  actionLabel = 'Upload Resume',
  onAction,
}) => {
  return (
    <div className="text-center py-12 px-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
      <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1 mb-6">{description}</p>
      {onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export const LoadingState = ({ message = 'AI is processing your resume request...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-2xl border border-slate-200">
      <div className="relative mb-4">
        <div className="w-12 h-12 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />
      </div>
      <p className="text-sm font-semibold text-slate-800">{message}</p>
      <div className="mt-3 flex items-center space-x-1 text-xs text-slate-400">
        <span className="animate-pulse">Checking keywords...</span>
        <span>•</span>
        <span className="animate-pulse">Evaluating ATS compatibility...</span>
      </div>
    </div>
  );
};

export const ErrorState = ({ message = 'Something went wrong while processing', onRetry }) => {
  return (
    <div className="text-center py-12 px-4 bg-red-50/50 rounded-2xl border border-red-200">
      <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h4 className="text-base font-semibold text-red-900">Analysis Error</h4>
      <p className="text-sm text-red-700 max-w-md mx-auto mt-1 mb-4">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} icon={RefreshCw}>
          Retry Operation
        </Button>
      )}
    </div>
  );
};
