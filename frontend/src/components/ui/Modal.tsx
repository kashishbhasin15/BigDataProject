import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function Modal({ open, onClose, title, children, footer }: ModalProps) {
  useEffect(() => {
    if (open) {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="neu-modal-overlay" onClick={onClose}>
      <div className="neu-modal" onClick={(e) => e.stopPropagation()}>
        <div className="neu-modal-header">
          <h3 className="neu-modal-title">{title}</h3>
          <button className="neu-icon-btn" onClick={onClose} aria-label="Close dialog">
            <X size={18} />
          </button>
        </div>
        <div className="neu-modal-body">{children}</div>
        {footer && <div className="neu-modal-footer">{footer}</div>}
      </div>
    </div>
  );
}
