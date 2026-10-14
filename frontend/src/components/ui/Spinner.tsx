interface SpinnerProps {
  size?: 'small' | 'default';
  label?: string;
}

export function Spinner({ size = 'default', label }: SpinnerProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <div className={`neu-spinner ${size === 'small' ? 'small' : ''}`} />
      {label && (
        <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
          {label}
        </span>
      )}
    </div>
  );
}
