import type { ReactNode, CSSProperties } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  flat?: boolean;
  style?: CSSProperties;
}

export function Card({ children, className = '', hoverable = false, flat = false, style }: CardProps) {
  const classes = ['neu-card'];
  if (hoverable) classes.push('hoverable');
  if (flat) classes.push('flat');
  if (className) classes.push(className);
  return <div className={classes.join(' ')} style={style}>{children}</div>;
}
