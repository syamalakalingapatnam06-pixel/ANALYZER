import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, AlertCircle } from 'lucide-react';

export const FileDropzone = ({ onFileSelected, accept = '.pdf,.docx', maxSizeBytes = 5242880 }) => {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const processFile = (file) => {
    setError(null);
    if (!file) return;

    if (file.size > maxSizeBytes) {
      setError(`File size exceeds limit (${(maxSizeBytes / (1024 * 1024)).toFixed(0)}MB maximum).`);
      return;
    }

    const ext = file.name.split('.').pop().toLowerCase();
    if (!['pdf', 'docx', 'doc'].includes(ext)) {
      setError('Only PDF and DOCX resume formats are supported.');
      return;
    }

    onFileSelected(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
          isDragOver
            ? 'border-blue-500 bg-blue-50/50 scale-[0.99]'
            : 'border-slate-300 hover:border-blue-400 bg-slate-50/50 hover:bg-white'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => e.target.files && processFile(e.target.files[0])}
        />
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
          <UploadCloud className="w-8 h-8" />
        </div>
        <h4 className="text-base font-semibold text-slate-800">
          Drag & Drop your Resume here, or <span className="text-blue-600 hover:underline">Browse</span>
        </h4>
        <p className="text-xs text-slate-500 mt-1">Supports PDF or DOCX documents (Up to 5 MB)</p>

        <div className="mt-4 inline-flex items-center space-x-2 text-xs text-slate-400 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs">
          <FileText className="w-3.5 h-3.5" />
          <span>Original formatting preserved</span>
        </div>
      </div>
      {error && (
        <div className="mt-3 flex items-center space-x-2 text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
