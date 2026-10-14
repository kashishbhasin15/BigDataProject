import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  message: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, message, action }: EmptyStateProps) {
  return (
    <div className="neu-empty-state">
      <div className="neu-empty-state-icon">{icon}</div>
      <div className="neu-empty-state-title">{title}</div>
      <div className="neu-empty-state-text">{message}</div>
      {action}
    </div>
  );
}
