import { useState, useMemo } from 'react';
import {
  Stethoscope, User, Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft,
  AlertCircle, Sparkles, CheckCircle2, Circle, ShieldCheck, BarChart3, HeartPulse,
} from 'lucide-react';
import './SignupPage.css';

interface SignupPageProps {
  onNavigate?: (page: 'landing' | 'login' | 'dashboard') => void;
}

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export function SignupPage({ onNavigate }: SignupPageProps) {
  const [data, setData] = useState<FormData>({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const update = (key: keyof FormData, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const passwordReqs = useMemo(() => [
    { label: 'At least 8 characters', met: data.password.length >= 8 },
    { label: 'Contains a letter', met: /[a-zA-Z]/.test(data.password) },
    { label: 'Contains a number', met: /\d/.test(data.password) },
  ], [data.password]);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!data.fullName.trim()) {
      e.fullName = 'Full name is required';
    } else if (data.fullName.trim().length < 2) {
      e.fullName = 'Name must be at least 2 characters';
    }
    if (!data.email.trim()) {
      e.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      e.email = 'Please enter a valid email address';
    }
    if (!data.password) {
      e.password = 'Password is required';
    } else if (data.password.length < 8) {
      e.password = 'Password must be at least 8 characters';
    } else if (!/[a-zA-Z]/.test(data.password) || !/\d/.test(data.password)) {
      e.password = 'Password must contain letters and numbers';
    }
    if (!data.confirmPassword) {
      e.confirmPassword = 'Please confirm your password';
    } else if (data.confirmPassword !== data.password) {
      e.confirmPassword = 'Passwords do not match';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onNavigate?.('dashboard');
    }, 1400);
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* Illustration Side */}
        <div className="signup-illustration-side">
          <button className="signup-back-link" onClick={() => onNavigate?.('landing')}>
            <ArrowLeft size={16} /> Back to home
          </button>

          <div className="signup-illustration-card">
            <div className="signup-illustration-icon">
              <ShieldCheck size={32} />
            </div>
            <h2 className="signup-illustration-title">Join the Platform</h2>
            <p className="signup-illustration-text">
              Create an account to access healthcare predictive analytics and data exploration tools.
            </p>
            <div className="signup-illustration-features">
              <div className="signup-illustration-feature">
                <HeartPulse size={18} />
                Readmission risk prediction
              </div>
              <div className="signup-illustration-feature">
                <BarChart3 size={18} />
                Interactive data analytics
              </div>
              <div className="signup-illustration-feature">
                <CheckCircle2 size={18} />
                Model performance insights
              </div>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="signup-form-side">
          <div className="signup-brand">
            <div className="signup-brand-icon">
              <Stethoscope size={20} />
            </div>
            <span className="signup-brand-name">Smart Healthcare Analytics</span>
          </div>

          <h1 className="signup-title">Create Account</h1>
          <p className="signup-desc">
            Fill in your details to set up a demonstration account.
          </p>

          <form className="signup-field-group" onSubmit={handleSubmit} noValidate>
            <div className="signup-field">
              <label className="signup-field-label" htmlFor="signup-name">
                Full Name<span className="required">*</span>
              </label>
              <div className="signup-input-wrapper">
                <User size={16} className="signup-input-icon" />
                <input
                  id="signup-name"
                  type="text"
                  className={`signup-input ${errors.fullName ? 'error' : ''}`}
                  placeholder="Dr. Jane Smith"
                  value={data.fullName}
                  onChange={(e) => update('fullName', e.target.value)}
                  autoComplete="name"
                  aria-invalid={!!errors.fullName}
                />
              </div>
              {errors.fullName && (
                <span className="signup-field-error">
                  <AlertCircle size={13} /> {errors.fullName}
                </span>
              )}
            </div>

            <div className="signup-field">
              <label className="signup-field-label" htmlFor="signup-email">
                Email Address<span className="required">*</span>
              </label>
              <div className="signup-input-wrapper">
                <Mail size={16} className="signup-input-icon" />
                <input
                  id="signup-email"
                  type="email"
                  className={`signup-input ${errors.email ? 'error' : ''}`}
                  placeholder="you@example.com"
                  value={data.email}
                  onChange={(e) => update('email', e.target.value)}
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                />
              </div>
              {errors.email && (
                <span className="signup-field-error">
                  <AlertCircle size={13} /> {errors.email}
                </span>
              )}
            </div>

            <div className="signup-field">
              <label className="signup-field-label" htmlFor="signup-password">
                Password<span className="required">*</span>
              </label>
              <div className="signup-input-wrapper">
                <Lock size={16} className="signup-input-icon" />
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  className={`signup-input ${errors.password ? 'error' : ''}`}
                  placeholder="Create a password"
                  value={data.password}
                  onChange={(e) => update('password', e.target.value)}
                  autoComplete="new-password"
                  aria-invalid={!!errors.password}
                />
                <button
                  type="button"
                  className="signup-input-toggle"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <span className="signup-field-error">
                  <AlertCircle size={13} /> {errors.password}
                </span>
              )}
              <div className="signup-password-reqs">
                {passwordReqs.map((req) => (
                  <div key={req.label} className={`signup-password-req ${req.met ? 'met' : ''}`}>
                    {req.met ? <CheckCircle2 size={13} /> : <Circle size={13} />}
                    {req.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="signup-field">
              <label className="signup-field-label" htmlFor="signup-confirm">
                Confirm Password<span className="required">*</span>
              </label>
              <div className="signup-input-wrapper">
                <Lock size={16} className="signup-input-icon" />
                <input
                  id="signup-confirm"
                  type={showConfirm ? 'text' : 'password'}
                  className={`signup-input ${errors.confirmPassword ? 'error' : ''}`}
                  placeholder="Re-enter your password"
                  value={data.confirmPassword}
                  onChange={(e) => update('confirmPassword', e.target.value)}
                  autoComplete="new-password"
                  aria-invalid={!!errors.confirmPassword}
                />
                <button
                  type="button"
                  className="signup-input-toggle"
                  onClick={() => setShowConfirm((v) => !v)}
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="signup-field-error">
                  <AlertCircle size={13} /> {errors.confirmPassword}
                </span>
              )}
            </div>

            <button type="submit" className="signup-submit-btn" disabled={submitting}>
              {submitting ? (
                <>
                  <Sparkles size={18} />
                  Creating account…
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            <div className="signup-demo-notice">
              <Sparkles size={12} />
              Simulated registration — no persistent account is created.
            </div>
          </form>

          <p className="signup-footer-text">
            Already have an account?{' '}
            <button onClick={() => onNavigate?.('login')}>Sign in</button>
          </p>
        </div>
      </div>
    </div>
  );
}
