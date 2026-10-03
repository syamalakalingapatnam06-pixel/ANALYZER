import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../common/Navbar';
import { Footer } from '../common/Footer';
import { DemoModeBanner } from '../common/DemoModeBanner';
import { Toast } from '../common/Toast';
import { useResume } from '../../hooks/useResume';
import { useAuth } from '../../hooks/useAuth';

export const PublicLayout = () => {
  const { toast } = useResume();
  const { isDemoMode } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {isDemoMode && <DemoModeBanner />}
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};
