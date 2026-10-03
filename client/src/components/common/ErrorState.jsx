import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

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
