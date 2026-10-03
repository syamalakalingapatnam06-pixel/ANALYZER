import React, { useState } from 'react';
import { Sparkles, Check, X, Edit2, RotateCw } from 'lucide-react';
import { Button } from './Button';
import { Badge } from './Badge';

export const SuggestionCard = ({
  suggestion,
  onAccept,
  onReject,
  onEdit,
  onRegenerate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(suggestion.suggestion || '');
  const [status, setStatus] = useState(suggestion.status || 'pending');

  const handleApply = () => {
    setStatus('accepted');
    if (onAccept) onAccept(suggestion.id, editedText);
  };

  const handleReject = () => {
    setStatus('rejected');
    if (onReject) onReject(suggestion.id);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    setStatus('edited');
    if (onEdit) onEdit(suggestion.id, editedText);
  };

  return (
    <div className={`p-4 rounded-xl border transition-all ${
      status === 'accepted'
        ? 'bg-emerald-50/50 border-emerald-200'
        : status === 'rejected'
        ? 'bg-slate-50 border-slate-200 opacity-60'
        : 'bg-white border-slate-200 hover:border-blue-300 shadow-2xs'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Badge variant="primary">{suggestion.section || 'General'}</Badge>
          {status !== 'pending' && (
            <Badge variant={status === 'accepted' ? 'success' : 'default'}>
              {status.toUpperCase()}
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-1">
          {onRegenerate && status === 'pending' && (
            <button
              onClick={() => onRegenerate(suggestion.id)}
              className="text-slate-400 hover:text-blue-600 p-1 text-xs flex items-center"
              title="Regenerate AI suggestion"
            >
              <RotateCw className="w-3.5 h-3.5 mr-1" />
              Regenerate
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Original</span>
          <p className="text-sm text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100 italic">
            "{suggestion.original}"
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1" /> AI Improved Suggestion
            </span>
            {!isEditing && status === 'pending' && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-xs text-slate-500 hover:text-slate-700 flex items-center"
              >
                <Edit2 className="w-3 h-3 mr-1" /> Edit
              </button>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="w-full p-2.5 text-sm border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                rows={3}
              />
              <div className="flex justify-end space-x-2">
                <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button size="sm" variant="primary" onClick={handleSaveEdit}>Save Edits</Button>
              </div>
            </div>
          ) : (
            <p className="text-sm font-medium text-slate-900 bg-blue-50/50 p-2.5 rounded-lg border border-blue-100">
              "{editedText}"
            </p>
          )}
        </div>

        {suggestion.reason && (
          <p className="text-xs text-slate-500 bg-slate-50 p-2 rounded">
            <strong className="text-slate-600">Rationale:</strong> {suggestion.reason}
          </p>
        )}

        {status === 'pending' && (
          <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
            <Button size="sm" variant="outline" onClick={handleReject} icon={X}>
              Reject
            </Button>
            <Button size="sm" variant="success" onClick={handleApply} icon={Check}>
              Accept Suggestion
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
