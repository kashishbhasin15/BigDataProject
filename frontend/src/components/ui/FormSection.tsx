import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

interface FormSectionProps {
  title: string;
  icon?: LucideIcon;
  children: ReactNode;
}

export function FormSection({ title, icon: Icon, children }: FormSectionProps) {
  return (
    <div className="neu-form-section">
      <div className="neu-form-section-title">
        {Icon && <Icon size={20} color="var(--primary)" />}
        {title}
      </div>
      <div className="neu-form-grid">{children}</div>
    </div>
  );
}
