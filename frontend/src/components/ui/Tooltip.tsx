import type { ReactNode } from 'react';

interface TooltipProps {
  text: string;
  children: ReactNode;
}

export function Tooltip({ text, children }: TooltipProps) {
  return (
    <span className="neu-tooltip-wrapper">
      {children}
      <span className="neu-tooltip">{text}</span>
    </span>
  );
}
