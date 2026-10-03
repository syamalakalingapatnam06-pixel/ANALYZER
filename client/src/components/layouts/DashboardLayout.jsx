import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../common/Sidebar';
import { Topbar } from '../common/Topbar';
import { DemoModeBanner } from '../common/DemoModeBanner';
import { Toast } from '../common/Toast';
import { useResume } from '../../hooks/useResume';
import { useAuth } from '../../hooks/useAuth';

export const DashboardLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { toast } = useResume();
  const { isDemoMode } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {isDemoMode && <DemoModeBanner />}
      <Sidebar mobileOpen={mobileSidebarOpen} setMobileOpen={setMobileSidebarOpen} />
      
      <div className="md:pl-64 flex flex-col flex-1">
        <Topbar onMenuClick={() => setMobileSidebarOpen(true)} />
        
        <main className="flex-1 pb-12">
          <Outlet />
        </main>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};
