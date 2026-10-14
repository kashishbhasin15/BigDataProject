import { useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopNav } from '@/components/layout/TopNav';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/readmission': 'Readmission Prediction',
  '/dashboard/length-of-stay': 'Length-of-Stay Prediction',
  '/dashboard/analytics': 'Healthcare Data Analytics',
  '/dashboard/model-performance': 'Model Performance',
  '/dashboard/prediction-history': 'Prediction History',
  '/dashboard/settings': 'Settings & Help',
  '/dashboard/help': 'Help & Documentation',
  '/dashboard/profile': 'User Profile',
};

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const pageTitle = pageTitles[location.pathname] ?? 'Dashboard';

  return (
    <div className="app-layout">
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
      <div className={`app-main ${collapsed ? 'sidebar-collapsed' : ''} ${mobileOpen ? 'sidebar-mobile-open' : ''}`}>
        <TopNav
          pageTitle={pageTitle}
          onToggleSidebar={() => setCollapsed((v) => !v)}
          onToggleMobile={() => setMobileOpen(true)}
          collapsed={collapsed}
        />
        <main className="app-content">
          {children}
        </main>
      </div>
    </div>
  );
}
