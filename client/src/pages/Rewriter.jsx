import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Wand2,
  Sparkles,
  Check,
  X,
  Edit2,
  RotateCw,
  ShieldCheck,
  Copy,
  ArrowRight,
} from 'lucide-react';
import { useResume } from '../hooks/useResume';
import { useRewrite } from '../hooks/useRewrite';
import { ContextualNav } from '../components/common/ContextualNav';
import { Card } from '../components/common/Card';
import { DiffView } from '../components/common/DiffView';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const Rewriter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedResume, showToast, updateSelectedResume } = useResume();
  const { rewriteResult, loading, rewriteText } = useRewrite();

  const [originalText, setOriginalText] = useState(
    'Built user interfaces for high-traffic web applications using React and Tailwind CSS.'
  );

  const [selectedMode, setSelectedMode] = useState('Make Professional');
  const [editedImprovedText, setEditedImprovedText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState('pending'); // pending, accepted, rejected, edited

  const rewriteModes = [
    'Improve Grammar',
    'Make Professional',
    'ATS Friendly',
    'Make Concise',
    'Strong Action Verbs',
    'Achievement Focused',
    'Job Specific',
    'Improve Impact',
  ];

  const handleGenerateRewrite = async (modeToUse = selectedMode) => {
    if (!originalText || originalText.trim().length === 0) {
      showToast('Please enter or select text to rewrite.', 'warning');
      return;
    }

    setStatus('pending');
    setIsEditing(false);
    const targetId = id || selectedResume?.id || selectedResume?._id || 'res_1';
    const res = await rewriteText(targetId, originalText, modeToUse);
    if (res) {
      setEditedImprovedText(res.improvedText);
      showToast(`Generated rewrite using "${modeToUse}" mode!`, 'success');
    }
  };

  const handleAccept = () => {
    setStatus('accepted');
    showToast('AI improved version accepted and saved to draft!', 'success');
  };

  const handleReject = () => {
    setStatus('rejected');
    showToast('AI suggestion rejected. Keeping original version.', 'info');
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    setStatus('edited');
    showToast('Manual edits saved to approved version!', 'success');
  };

  const improvedDisplay = isEditing
    ? editedImprovedText
    : rewriteResult?.improvedText || editedImprovedText || 'Click a rewrite mode above to generate an improved version...';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ContextualNav
        resumeTitle={selectedResume?.title}
        targetRole={selectedResume?.targetRole}
        resumeId={id}
      />

      <div className="space-y-6">
        {/* Top Header & Safety Callout */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-slate-900">AI Resume Statement Rewriter</h2>
              <Badge variant="primary">ChatGPT / OpenAI Powered</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              Transform weak or passive resume statements into action-driven, ATS-optimized bullet points.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs bg-emerald-50 text-emerald-800 p-3 rounded-xl border border-emerald-200">
            <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>AI never automatically overwrites your resume. Human approval required.</span>
          </div>
        </div>

        {/* Mode Selector Toolbar */}
        <Card title="Select AI Rewrite Mode" subtitle="Choose an optimization goal for your statement">
          <div className="flex flex-wrap gap-2">
            {rewriteModes.map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  setSelectedMode(mode);
                  handleGenerateRewrite(mode);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  selectedMode === mode
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </Card>

        {/* Input Text Selector / Custom Text */}
        <Card title="Statement to Rewrite" subtitle="Select a line from your resume or enter custom text">
          <div className="space-y-3">
            <textarea
              rows={3}
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-xl text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Paste bullet point here..."
            />

            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">
                Sample preset bullet points available for quick testing
              </span>
              <Button
                variant="primary"
                onClick={() => handleGenerateRewrite(selectedMode)}
                loading={loading}
                icon={Wand2}
              >
                Rewrite with {selectedMode}
              </Button>
            </div>
          </div>
        </Card>

        {/* Side-by-Side Diff Editor */}
        <Card
          title="Side-by-Side Version Comparison"
          subtitle="Review changes, edit manually, or accept/reject AI generated version"
        >
          <DiffView
            original={originalText}
            improved={improvedDisplay}
            mode={selectedMode}
          />

          {rewriteResult?.explanation && (
            <div className="mt-4 p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-blue-900">
              <strong className="font-bold">AI Rationale:</strong> {rewriteResult.explanation}
            </div>
          )}

          {/* Action Bar: Accept / Reject / Edit / Regenerate */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <Badge variant={status === 'accepted' ? 'success' : status === 'rejected' ? 'danger' : 'default'}>
                STATUS: {status.toUpperCase()}
              </Badge>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleGenerateRewrite(selectedMode)}
                icon={RotateCw}
                loading={loading}
              >
                Regenerate
              </Button>

              {!isEditing ? (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setIsEditing(true);
                    setEditedImprovedText(rewriteResult?.improvedText || improvedDisplay);
                  }}
                  icon={Edit2}
                >
                  Edit Manually
                </Button>
              ) : (
                <Button variant="primary" size="sm" onClick={handleSaveEdit}>
                  Save Edits
                </Button>
              )}

              <Button variant="outline" size="sm" onClick={handleReject} icon={X}>
                Reject
              </Button>

              <Button variant="success" size="sm" onClick={handleAccept} icon={Check}>
                Accept AI Version
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
