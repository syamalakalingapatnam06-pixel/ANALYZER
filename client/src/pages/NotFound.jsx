import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileQuestion } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
        <FileQuestion className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-extrabold text-slate-900">404 - Page Not Found</h1>
      <p className="text-sm text-slate-500 mt-2 max-w-sm mb-6">
        The requested resume analysis page or route does not exist.
      </p>
      <Button variant="primary" onClick={() => navigate('/dashboard')}>
        Return to Dashboard
      </Button>
    </div>
  );
};
