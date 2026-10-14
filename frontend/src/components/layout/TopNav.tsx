import { Menu, PanelLeft, Search, Bell } from 'lucide-react';

interface TopNavProps {
  pageTitle: string;
  onToggleSidebar: () => void;
  onToggleMobile: () => void;
  collapsed: boolean;
}

export function TopNav({ pageTitle, onToggleSidebar, onToggleMobile, collapsed }: TopNavProps) {
  return (
    <header className="topnav">
      <div className="topnav-left">
        <button className="neu-icon-btn" onClick={onToggleMobile} aria-label="Open menu" style={{ display: 'block' }}>
          <Menu size={20} />
        </button>
        <button className="neu-icon-btn" onClick={onToggleSidebar} aria-label="Collapse sidebar" style={{ display: 'block' }}>
          <PanelLeft size={20} opacity={collapsed ? 0.4 : 1} />
        </button>
        <div className="topnav-breadcrumb">
          <span className="current">{pageTitle}</span>
        </div>
      </div>

      <div className="topnav-search">
        <Search size={16} className="search-icon" />
        <input type="text" placeholder="Search predictions, patients, models…" aria-label="Search" />
      </div>

      <div className="topnav-right">
        <button className="neu-icon-btn" aria-label="Notifications">
          <Bell size={18} />
        </button>
        <div className="topnav-avatar">
          <div className="avatar-circle">DR</div>
          <span className="avatar-name">Dr. Researcher</span>
        </div>
      </div>
    </header>
  );
}
