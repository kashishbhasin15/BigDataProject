import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'teal' | 'ghost';
  size?: 'sm' | 'md';
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
  icon?: ReactNode;
  className?: string;
}

export function Button({
  children,
  variant = 'default',
  size = 'md',
  type = 'button',
  disabled = false,
  onClick,
  icon,
  className = '',
}: ButtonProps) {
  const classes = ['neu-btn', variant];
  if (size === 'sm') classes.push('sm');
  if (className) classes.push(className);
  return (
    <button
      type={type}
      className={classes.join(' ')}
      disabled={disabled}
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
  );
}
