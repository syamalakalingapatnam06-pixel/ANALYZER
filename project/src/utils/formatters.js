export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

export const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

export const getScoreColor = (score) => {
  if (score >= 80) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
  if (score >= 70) return 'text-blue-600 bg-blue-50 border-blue-200';
  if (score >= 50) return 'text-amber-600 bg-amber-50 border-amber-200';
  return 'text-rose-600 bg-rose-50 border-rose-200';
};

export const getScoreBadgeVariant = (score) => {
  if (score >= 80) return 'success';
  if (score >= 70) return 'info';
  if (score >= 50) return 'warning';
  return 'danger';
};

export const getScoreStatusLabel = (score) => {
  if (score >= 80) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 50) return 'Needs Improvement';
  return 'Critical Attention';
};
