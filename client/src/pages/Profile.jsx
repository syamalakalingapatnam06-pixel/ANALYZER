import React, { useState } from 'react';
import { User, Mail, Lock, GraduationCap, Bell, ShieldAlert, Trash2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useResume } from '../hooks/useResume';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { ConfirmDialog } from '../components/common/ConfirmDialog';

export const Profile = () => {
  const { user, isStudentMode, toggleStudentMode, logout } = useAuth();
  const { showToast } = useResume();

  const [name, setName] = useState(user?.name || 'Alex Johnson');
  const [email, setEmail] = useState(user?.email || 'alex@example.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    showToast('Profile updated successfully!', 'success');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match.', 'error');
      return;
    }
    showToast('Password updated successfully!', 'success');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleDeleteAccount = () => {
    setDeleteModalOpen(false);
    logout();
    showToast('Account deleted.', 'info');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Profile & Settings</h1>
        <p className="text-xs text-slate-500 mt-1">Manage your account credentials, preferences, and security options.</p>
      </div>

      {/* Profile Information */}
      <Card title="Profile Information" subtitle="Update your personal details and email address">
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              icon={User}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Email Address"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" variant="primary" size="sm">
              Save Profile
            </Button>
          </div>
        </form>
      </Card>

      {/* Preferences & Modes */}
      <Card title="Preferences & Evaluation Modes">
        <div className="space-y-4">
          <div className="p-4 bg-purple-50 rounded-xl border border-purple-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <GraduationCap className="w-6 h-6 text-purple-600" />
              <div>
                <span className="text-xs font-bold text-purple-900 block">Student / Fresher Evaluation Mode</span>
                <span className="text-xs text-purple-700">
                  When enabled, ATS analysis prioritizes academic projects, hackathons, and coursework over extensive work history.
                </span>
              </div>
            </div>
            <button
              onClick={toggleStudentMode}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                isStudentMode ? 'bg-purple-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ${
                  isStudentMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-slate-600" />
              <div>
                <span className="text-xs font-bold text-slate-800 block">Email Digest & Suggestions</span>
                <span className="text-xs text-slate-500">Receive analysis reports and tips when new features release.</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
        </div>
      </Card>

      {/* Security: Change Password */}
      <Card title="Security & Password" subtitle="Ensure your account stays protected">
        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
          <Input
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit" variant="outline" size="sm">
            Update Password
          </Button>
        </form>
      </Card>

      {/* Danger Zone */}
      <div className="bg-red-50/60 rounded-2xl border border-red-200 p-6 space-y-3">
        <div className="flex items-center space-x-2 text-red-900">
          <ShieldAlert className="w-5 h-5 text-red-600" />
          <h3 className="text-base font-bold">Danger Zone</h3>
        </div>
        <p className="text-xs text-red-700">
          Deleting your account will permanently purge all uploaded resume files, analysis history, and custom versions from the vault.
        </p>
        <Button variant="danger" size="sm" onClick={() => setDeleteModalOpen(true)} icon={Trash2}>
          Delete Account
        </Button>
      </div>

      <ConfirmDialog
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteAccount}
        title="Delete Account Permanently"
        message="Are you completely sure? This will remove all your data permanently."
        confirmText="Yes, Delete My Account"
      />
    </div>
  );
};
