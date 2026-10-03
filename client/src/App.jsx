import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';

import { PublicLayout } from './components/layouts/PublicLayout';
import { DashboardLayout } from './components/layouts/DashboardLayout';

import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';

import { Dashboard } from './pages/Dashboard';
import { UploadResume } from './pages/UploadResume';
import { ResumeAnalysis } from './pages/ResumeAnalysis';
import { JobMatching } from './pages/JobMatching';
import { Rewriter } from './pages/Rewriter';
import { ResumeEditor } from './pages/ResumeEditor';
import { ResumeVersions } from './pages/ResumeVersions';
import { History } from './pages/History';
import { Profile } from './pages/Profile';
import { NotFound } from './pages/NotFound';

// Protected Route Guard
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export function App() {
  return (
    <AuthProvider>
      <ResumeProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Route>

            {/* Protected SaaS App Routes */}
            <Route
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/upload" element={<UploadResume />} />
              <Route path="/resume/:id/analysis" element={<ResumeAnalysis />} />
              <Route path="/resume/:id/match" element={<JobMatching />} />
              <Route path="/resume/:id/rewrite" element={<Rewriter />} />
              <Route path="/resume/:id/edit" element={<ResumeEditor />} />
              <Route path="/resumes" element={<ResumeVersions />} />
              <Route path="/history" element={<History />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ResumeProvider>
    </AuthProvider>
  );
}

export default App;
