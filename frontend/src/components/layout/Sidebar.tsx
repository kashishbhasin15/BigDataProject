import { NavLink } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { Activity, HeartPulse, CalendarClock, BarChart3, Gauge, History, Settings, HelpCircle, Stethoscope, UserCircle } from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onClose: () => void;
}

const navItems: { path: string; label: string; icon: LucideIcon }[] = [
  { path: '/dashboard', label: 'Dashboard', icon: Activity },
  { path: '/dashboard/readmission', label: 'Readmission Prediction', icon: HeartPulse },
  { path: '/dashboard/length-of-stay', label: 'Length-of-Stay Prediction', icon: CalendarClock },
  { path: '/dashboard/analytics', label: 'Healthcare Data Analytics', icon: BarChart3 },
  { path: '/dashboard/model-performance', label: 'Model Performance', icon: Gauge },
  { path: '/dashboard/prediction-history', label: 'Prediction History', icon: History },
];

const bottomNav: { path: string; label: string; icon: LucideIcon }[] = [
  { path: '/dashboard/profile', label: 'Profile', icon: UserCircle },
  { path: '/dashboard/settings', label: 'Settings', icon: Settings },
  { path: '/dashboard/help', label: 'Help & Documentation', icon: HelpCircle },
];

export function Sidebar({ collapsed, mobileOpen, onClose }: SidebarProps) {
  const sidebarClass = `sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`;

  return (
    <>
      {mobileOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={sidebarClass}>
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <Stethoscope size={22} />
          </div>
          {!collapsed && (
            <div className="sidebar-logo-text">
              <span className="logo-title">Healthcare Analytics</span>
              <span className="logo-sub">Smart Prediction System</span>
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <item.icon size={20} style={{ flexShrink: 0 }} />
              <span className="nav-text">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-nav-divider" />
          {bottomNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <item.icon size={20} style={{ flexShrink: 0 }} />
              <span className="nav-text">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </aside>
    </>
  );
}
