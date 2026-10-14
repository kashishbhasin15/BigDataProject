import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'primary' | 'teal' | 'neutral';
  dot?: boolean;
  className?: string;
}

export function Badge({ children, variant = 'neutral', dot = false, className = '' }: BadgeProps) {
  return (
    <span className={`neu-badge ${variant} ${className}`}>
      {dot && <span className="badge-dot" />}
      {children}
    </span>
  );
}
