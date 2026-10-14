import type { SelectOption } from '@/types';

interface SelectProps {
  label?: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  id?: string;
}

export function Select({
  label,
  value,
  options,
  onChange,
  placeholder,
  required = false,
  helperText,
  error,
  id,
}: SelectProps) {
  return (
    <div className="neu-input-group">
      {label && (
        <label htmlFor={id} className="neu-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <select
        id={id}
        className={`neu-select ${error ? 'error' : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {helperText && !error && <span className="neu-helper">{helperText}</span>}
      {error && <span className="neu-error-msg">{error}</span>}
    </div>
  );
}
