import { useState } from 'react';
import {
  Stethoscope, Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft,
  AlertCircle, Sparkles, HeartPulse, CalendarClock, CheckCircle2,
} from 'lucide-react';
import './LoginPage.css';

interface LoginPageProps {
  onNavigate?: (page: 'landing' | 'signup' | 'dashboard') => void;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    const e: { email?: string; password?: string } = {};
    if (!email.trim()) {
      e.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.email = 'Please enter a valid email address';
    }
    if (!password) {
      e.password = 'Password is required';
    } else if (password.length < 6) {
      e.password = 'Password must be at least 6 characters';
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
    }, 1200);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Form Side */}
        <div className="login-form-side">
          <div className="login-brand">
            <div className="login-brand-icon">
              <Stethoscope size={20} />
            </div>
            <span className="login-brand-name">Smart Healthcare Analytics</span>
          </div>

          <h1 className="login-welcome-title">Welcome Back</h1>
          <p className="login-welcome-desc">
            Sign in to access your healthcare analytics dashboard and prediction tools.
          </p>

          <form className="login-field-group" onSubmit={handleSubmit} noValidate>
            <div className="login-field">
              <label className="login-field-label" htmlFor="login-email">
                Email Address<span className="required">*</span>
              </label>
              <div className="login-input-wrapper">
                <Mail size={16} className="login-input-icon" />
                <input
                  id="login-email"
                  type="email"
                  className={`login-input ${errors.email ? 'error' : ''}`}
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'login-email-error' : undefined}
                />
              </div>
              {errors.email && (
                <span className="login-field-error" id="login-email-error">
                  <AlertCircle size={13} /> {errors.email}
                </span>
              )}
            </div>

            <div className="login-field">
              <label className="login-field-label" htmlFor="login-password">
                Password<span className="required">*</span>
              </label>
              <div className="login-input-wrapper">
                <Lock size={16} className="login-input-icon" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  className={`login-input ${errors.password ? 'error' : ''}`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
                  autoComplete="current-password"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'login-password-error' : undefined}
                />
                <button
                  type="button"
                  className="login-input-toggle"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <span className="login-field-error" id="login-password-error">
                  <AlertCircle size={13} /> {errors.password}
                </span>
              )}
            </div>

            <div className="login-row">
              <label className="login-remember">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Remember me
              </label>
              <button type="button" className="login-forgot" onClick={() => {}}>
                Forgot password?
              </button>
            </div>

            <button type="submit" className="login-submit-btn" disabled={submitting}>
              {submitting ? (
                <>
                  <Sparkles size={18} className="login-spinner-icon" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            <div className="login-demo-notice">
              <Sparkles size={12} />
              Simulated login — no real authentication is performed.
            </div>
          </form>

          <p className="login-footer-text">
            Don't have an account?{' '}
            <button onClick={() => onNavigate?.('signup')}>Create one</button>
          </p>
        </div>

        {/* Illustration Side */}
        <div className="login-illustration-side">
          <button className="login-back-link" onClick={() => onNavigate?.('landing')}>
            <ArrowLeft size={16} /> Back to home
          </button>

          <div className="login-illustration-card">
            <div className="login-illustration-icon">
              <Stethoscope size={28} />
            </div>
            <h2 className="login-illustration-title">Healthcare Analytics</h2>
            <p className="login-illustration-text">
              Predictive insights for readmission risk and hospital length of stay.
            </p>
            <div className="login-illustration-stats">
              <div className="login-illustration-stat">
                <div className="login-illustration-stat-icon primary">
                  <HeartPulse size={16} />
                </div>
                <div>
                  <div className="login-illustration-stat-label">Readmission Prediction</div>
                  <div className="login-illustration-stat-value">Binary classification</div>
                </div>
              </div>
              <div className="login-illustration-stat">
                <div className="login-illustration-stat-icon teal">
                  <CalendarClock size={16} />
                </div>
                <div>
                  <div className="login-illustration-stat-label">Length of Stay</div>
                  <div className="login-illustration-stat-value">Regression estimate</div>
                </div>
              </div>
              <div className="login-illustration-stat">
                <div className="login-illustration-stat-icon primary">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <div className="login-illustration-stat-label">Model Accuracy</div>
                  <div className="login-illustration-stat-value">87.3% (demo)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
