import { useState } from 'react';
import {
  ArrowLeft, Edit2, X, Check, Save, HeartPulse, CalendarClock, Activity,
  User, Mail, Building2, Briefcase, Bell, Moon, LayoutGrid, LogOut,
  Clock, Inbox, Sparkles, Settings as SettingsIcon,
} from 'lucide-react';
import './ProfilePage.css';

interface ProfilePageProps {
  onNavigate?: (page: 'landing' | 'dashboard') => void;
}

interface ProfileData {
  fullName: string;
  email: string;
  institution: string;
  role: string;
}

interface ActivityRecord {
  id: string;
  type: string;
  outcome: string;
  timestamp: string;
}

const demoProfile: ProfileData = {
  fullName: 'Dr. Jane Smith',
  email: 'jane.smith@university.edu',
  institution: 'University Research Lab',
  role: 'Research Analyst',
};

const demoActivity: ActivityRecord[] = [
  { id: 'PRD-2024-1842', type: 'Readmission', outcome: 'Yes (72%)', timestamp: '2024-10-13 14:32' },
  { id: 'PRD-2024-1839', type: 'Readmission', outcome: 'Yes (68%)', timestamp: '2024-10-12 16:44' },
  { id: 'PRD-2024-1838', type: 'Length of Stay', outcome: '8.7 days', timestamp: '2024-10-12 14:22' },
  { id: 'PRD-2024-1837', type: 'Readmission', outcome: 'No (22%)', timestamp: '2024-10-12 10:48' },
  { id: 'PRD-2024-1835', type: 'Length of Stay', outcome: '3.1 days', timestamp: '2024-10-11 09:15' },
];

export function ProfilePage({ onNavigate }: ProfilePageProps) {
  const [profile, setProfile] = useState<ProfileData>(demoProfile);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState<ProfileData>(demoProfile);
  const [notifications, setNotifications] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [chartStyle, setChartStyle] = useState('neumorphic');
  const [showEmpty, setShowEmpty] = useState(false);

  const initials = profile.fullName
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const handleEditSave = () => {
    setProfile(editData);
    setEditOpen(false);
  };

  const handleEditCancel = () => {
    setEditData(profile);
    setEditOpen(false);
  };

  const activityData = showEmpty ? [] : demoActivity;

  return (
    <div className="profile-page">
      <div className="profile-container">
        <button className="profile-back-link" onClick={() => onNavigate?.('dashboard')}>
          <ArrowLeft size={16} /> Back to dashboard
        </button>

        {/* Header Card */}
        <div className="profile-header-card">
          <div className="profile-avatar">{initials}</div>
          <div className="profile-header-info">
            <div className="profile-header-name">
              {profile.fullName}
              <span className="profile-demo-tag">
                <Sparkles size={10} /> Demo Profile
              </span>
            </div>
            <div className="profile-header-email">{profile.email}</div>
          </div>
          <button className="profile-edit-btn" onClick={() => { setEditData(profile); setEditOpen(true); }}>
            <Edit2 size={15} /> Edit Profile
          </button>
        </div>

        {/* Personal Information */}
        <div className="profile-section">
          <div className="profile-section-title">
            <User size={18} /> Personal Information
          </div>
          <div className="profile-info-list">
            <div className="profile-info-row">
              <span className="profile-info-label">Full Name</span>
              <span className="profile-info-value">{profile.fullName}</span>
            </div>
            <div className="profile-info-row">
              <span className="profile-info-label">Email Address</span>
              <span className="profile-info-value">{profile.email}</span>
            </div>
            <div className="profile-info-row">
              <span className="profile-info-label">Institution / Organization</span>
              <span className="profile-info-value">{profile.institution || 'Not specified'}</span>
            </div>
            <div className="profile-info-row">
              <span className="profile-info-label">Role</span>
              <span className="profile-info-value">{profile.role || 'Not specified'}</span>
            </div>
          </div>
        </div>

        {/* Activity Overview */}
        <div className="profile-section">
          <div className="profile-section-title">
            <Activity size={18} /> Activity Overview
          </div>
          <div className="profile-activity-grid">
            <div className="profile-activity-card">
              <div className="profile-activity-icon primary">
                <Activity size={20} />
              </div>
              <div className="profile-activity-value">142</div>
              <div className="profile-activity-label">Total Predictions</div>
            </div>
            <div className="profile-activity-card">
              <div className="profile-activity-icon teal">
                <HeartPulse size={20} />
              </div>
              <div className="profile-activity-value">87</div>
              <div className="profile-activity-label">Readmission Predictions</div>
            </div>
            <div className="profile-activity-card">
              <div className="profile-activity-icon warning">
                <CalendarClock size={20} />
              </div>
              <div className="profile-activity-value">55</div>
              <div className="profile-activity-label">Length-of-Stay Predictions</div>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="profile-section">
          <div className="profile-section-title">
            <SettingsIcon size={18} /> Preferences
          </div>
          <div className="profile-pref-row">
            <div className="profile-pref-label">
              <span className="pref-title">Email notifications</span>
              <span className="pref-desc">Receive updates about prediction activity</span>
            </div>
            <button
              className={`profile-toggle ${notifications ? 'on' : ''}`}
              onClick={() => setNotifications((v) => !v)}
              role="switch"
              aria-checked={notifications}
              aria-label="Toggle notifications"
            >
              <div className="profile-toggle-knob" />
            </button>
          </div>
          <div className="profile-pref-row">
            <div className="profile-pref-label">
              <span className="pref-title">Compact dashboard</span>
              <span className="pref-desc">Reduce card padding for denser layouts</span>
            </div>
            <button
              className={`profile-toggle ${compactMode ? 'on' : ''}`}
              onClick={() => setCompactMode((v) => !v)}
              role="switch"
              aria-checked={compactMode}
              aria-label="Toggle compact mode"
            >
              <div className="profile-toggle-knob" />
            </button>
          </div>
          <div className="profile-pref-row">
            <div className="profile-pref-label">
              <span className="pref-title">Auto-refresh dashboard</span>
              <span className="pref-desc">Update KPI cards every 30 seconds</span>
            </div>
            <button
              className={`profile-toggle ${autoRefresh ? 'on' : ''}`}
              onClick={() => setAutoRefresh((v) => !v)}
              role="switch"
              aria-checked={autoRefresh}
              aria-label="Toggle auto refresh"
            >
              <div className="profile-toggle-knob" />
            </button>
          </div>
          <div className="profile-pref-row">
            <div className="profile-pref-label">
              <span className="pref-title">Chart style</span>
              <span className="pref-desc">Visual style for data visualizations</span>
            </div>
            <div className="profile-radio-group">
              {['neumorphic', 'flat', 'classic'].map((s) => (
                <button
                  key={s}
                  className={`profile-radio ${chartStyle === s ? 'active' : ''}`}
                  onClick={() => setChartStyle(s)}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="profile-section">
          <div className="profile-section-title">
            <Clock size={18} /> Recent Activity
            <button
              style={{ marginLeft: 'auto', fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem 0.5rem' }}
              onClick={() => setShowEmpty((v) => !v)}
            >
              {showEmpty ? 'Show records' : 'Show empty state'}
            </button>
          </div>
          {activityData.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table className="profile-activity-table">
                <thead>
                  <tr>
                    <th>Prediction ID</th>
                    <th>Type</th>
                    <th>Outcome</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {activityData.map((rec) => (
                    <tr key={rec.id}>
                      <td style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{rec.id}</td>
                      <td>{rec.type}</td>
                      <td style={{ fontWeight: 500 }}>{rec.outcome}</td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{rec.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="profile-empty-state">
              <div className="profile-empty-icon">
                <Inbox size={24} />
              </div>
              <div className="profile-empty-title">No recent activity</div>
              <div className="profile-empty-text">
                Your prediction history will appear here once you start making predictions.
              </div>
            </div>
          )}
        </div>

        {/* Account Actions */}
        <div className="profile-section">
          <div className="profile-section-title">
            <Briefcase size={18} /> Account Actions
          </div>
          <div className="profile-actions">
            <button className="profile-action-btn ghost" onClick={() => { setEditData(profile); setEditOpen(true); }}>
              <Edit2 size={16} /> Edit Profile
            </button>
            <button className="profile-action-btn danger" onClick={() => onNavigate?.('landing')}>
              <LogOut size={16} /> End Demo Session
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editOpen && (
        <div className="profile-modal-overlay" onClick={() => handleEditCancel()}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            <div className="profile-modal-header">
              <h3 className="profile-modal-title">Edit Profile</h3>
              <button className="profile-modal-close" onClick={handleEditCancel} aria-label="Close">
                <X size={18} />
              </button>
            </div>
            <div className="profile-modal-field">
              <label className="profile-modal-label" htmlFor="edit-name">Full Name</label>
              <input
                id="edit-name"
                className="profile-modal-input"
                type="text"
                value={editData.fullName}
                onChange={(e) => setEditData((p) => ({ ...p, fullName: e.target.value }))}
              />
            </div>
            <div className="profile-modal-field">
              <label className="profile-modal-label" htmlFor="edit-email">Email Address</label>
              <input
                id="edit-email"
                className="profile-modal-input"
                type="email"
                value={editData.email}
                onChange={(e) => setEditData((p) => ({ ...p, email: e.target.value }))}
              />
            </div>
            <div className="profile-modal-field">
              <label className="profile-modal-label" htmlFor="edit-institution">Institution / Organization</label>
              <input
                id="edit-institution"
                className="profile-modal-input"
                type="text"
                placeholder="e.g. University Research Lab"
                value={editData.institution}
                onChange={(e) => setEditData((p) => ({ ...p, institution: e.target.value }))}
              />
            </div>
            <div className="profile-modal-field">
              <label className="profile-modal-label" htmlFor="edit-role">Role</label>
              <input
                id="edit-role"
                className="profile-modal-input"
                type="text"
                placeholder="e.g. Research Analyst"
                value={editData.role}
                onChange={(e) => setEditData((p) => ({ ...p, role: e.target.value }))}
              />
            </div>
            <div className="profile-modal-actions">
              <button className="profile-modal-btn cancel" onClick={handleEditCancel}>
                <X size={15} /> Cancel
              </button>
              <button className="profile-modal-btn save" onClick={handleEditSave}>
                <Save size={15} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
