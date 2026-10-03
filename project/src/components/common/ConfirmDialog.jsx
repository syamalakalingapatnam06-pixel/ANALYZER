import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { AlertTriangle } from 'lucide-react';

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed? This action cannot be undone.',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  variant = 'danger',
  isLoading = false
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md">
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-full shrink-0 ${variant === 'danger' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}>
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-base font-semibold text-slate-900">{title}</h4>
          <p className="mt-1 text-sm text-slate-600 leading-relaxed">{message}</p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-3">
        <Button variant="secondary" onClick={onClose} disabled={isLoading}>
          {cancelText}
        </Button>
        <Button variant={variant} onClick={onConfirm} isLoading={isLoading}>
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
