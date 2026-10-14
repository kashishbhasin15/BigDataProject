interface InputProps {
  label?: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: 'text' | 'number';
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  id?: string;
  min?: number;
  max?: number;
}

export function Input({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
  helperText,
  error,
  id,
  min,
  max,
}: InputProps) {
  return (
    <div className="neu-input-group">
      {label && (
        <label htmlFor={id} className="neu-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <input
        id={id}
        className={`neu-input ${error ? 'error' : ''}`}
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        onChange={(e) => onChange(e.target.value)}
      />
      {helperText && !error && <span className="neu-helper">{helperText}</span>}
      {error && <span className="neu-error-msg">{error}</span>}
    </div>
  );
}
