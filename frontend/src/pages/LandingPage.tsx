import { useState, useEffect } from 'react';
import {
  Stethoscope, Menu, X, Activity, HeartPulse, CalendarClock, BarChart3,
  ArrowRight, Compass, Database, Brain, Cpu, LineChart, Sparkles,
  TrendingUp, Clock, ShieldCheck, Github, Mail,
} from 'lucide-react';
import './LandingPage.css';

interface LandingPageProps {
  onNavigate?: (page: 'login' | 'signup' | 'dashboard') => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [barHeights, setBarHeights] = useState<number[]>([20, 20, 20, 20, 20, 20]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBarHeights([45, 72, 38, 90, 56, 67]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleNav = (page: 'login' | 'signup' | 'dashboard') => {
    onNavigate?.(page);
    setMobileMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="landing-navbar">
        <div className="landing-nav-brand" onClick={() => scrollToSection('hero')}>
          <div className="landing-nav-brand-icon">
            <Stethoscope size={22} />
          </div>
          <span className="landing-nav-brand-name">Smart Healthcare Analytics</span>
        </div>

        <div className="landing-nav-links">
          <button className="landing-nav-link" onClick={() => scrollToSection('hero')}>Home</button>
          <button className="landing-nav-link" onClick={() => scrollToSection('features')}>Features</button>
          <button className="landing-nav-link" onClick={() => scrollToSection('how-it-works')}>How It Works</button>
          <button className="landing-nav-link" onClick={() => scrollToSection('about')}>About</button>
        </div>

        <div className="landing-nav-actions">
          <button className="landing-nav-btn ghost" onClick={() => handleNav('login')}>Login</button>
          <button className="landing-nav-btn primary" onClick={() => handleNav('signup')}>
            Get Started
            <ArrowRight size={16} />
          </button>
        </div>

        <button
          className="landing-mobile-toggle"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <div className={`landing-mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <button className="landing-nav-link" onClick={() => scrollToSection('hero')}>Home</button>
        <button className="landing-nav-link" onClick={() => scrollToSection('features')}>Features</button>
        <button className="landing-nav-link" onClick={() => scrollToSection('how-it-works')}>How It Works</button>
        <button className="landing-nav-link" onClick={() => scrollToSection('about')}>About</button>
        <button className="landing-nav-btn ghost" onClick={() => handleNav('login')}>Login</button>
        <button className="landing-nav-btn primary" onClick={() => handleNav('signup')}>Get Started</button>
      </div>

      {/* Hero */}
      <section className="landing-hero" id="hero">
        <div className="landing-hero-left">
          <span className="landing-hero-eyebrow">
            <Sparkles size={14} />
            Intelligent Healthcare Analytics
          </span>
          <h1 className="landing-hero-heading">
            Smarter Insights. <span className="accent">Better Healthcare Decisions.</span>
          </h1>
          <p className="landing-hero-desc">
            Explore healthcare data, estimate patient readmission likelihood, and analyze hospital
            length of stay through a machine learning-powered analytics platform.
          </p>
          <div className="landing-hero-buttons">
            <button className="landing-hero-btn primary" onClick={() => handleNav('signup')}>
              Get Started
              <ArrowRight size={18} />
            </button>
            <button className="landing-hero-btn secondary" onClick={() => scrollToSection('features')}>
              <Compass size={18} />
              Explore Features
            </button>
          </div>
          <div className="landing-hero-disclaimer">
            <Sparkles size={12} />
            Academic MCA capstone project for demonstration purposes — not intended for clinical use.
          </div>
        </div>

        <div className="landing-hero-right">
          <div className="landing-hero-illustration">
            <span className="landing-illustration-badge">Demo Dashboard</span>
            <div className="landing-illustration-header">
              <span className="landing-illustration-title">Analytics Overview</span>
              <div className="landing-illustration-dot">
                <span /><span /><span />
              </div>
            </div>
            <div className="landing-illustration-chart">
              {barHeights.map((h, i) => (
                <div
                  key={i}
                  className="landing-illustration-bar"
                  style={{
                    height: `${h}%`,
                    background: `linear-gradient(180deg, ${i % 2 === 0 ? 'var(--primary)' : 'var(--teal)'}, ${i % 2 === 0 ? 'var(--primary-light)' : 'var(--teal-light)'})`,
                  }}
                />
              ))}
            </div>
            <div className="landing-illustration-cards">
              <div className="landing-illustration-card">
                <div className="landing-illustration-card-label">Readmission Risk</div>
                <div className="landing-illustration-card-value primary">72%</div>
                <div className="landing-illustration-card-badge yes">
                  <HeartPulse size={12} /> High Risk
                </div>
              </div>
              <div className="landing-illustration-card">
                <div className="landing-illustration-card-label">Est. Length of Stay</div>
                <div className="landing-illustration-card-value teal">4.2d</div>
                <div className="landing-illustration-card-badge no">
                  <CalendarClock size={12} /> Normal Range
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="landing-section" id="features">
        <div className="landing-section-header">
          <h2 className="landing-section-title">Core Capabilities</h2>
          <p className="landing-section-subtitle">
            Three powerful prediction and analytics modules designed for healthcare data exploration.
          </p>
        </div>
        <div className="landing-features-grid">
          <div className="landing-feature-card">
            <div className="landing-feature-icon primary">
              <HeartPulse size={30} />
            </div>
            <h3 className="landing-feature-title">Readmission Prediction</h3>
            <p className="landing-feature-desc">
              Binary classification that estimates whether a patient is likely to be readmitted.
              Both &lt;30 and &gt;30 day categories map to Yes; NO maps to No.
            </p>
          </div>
          <div className="landing-feature-card">
            <div className="landing-feature-icon teal">
              <CalendarClock size={30} />
            </div>
            <h3 className="landing-feature-title">Length-of-Stay Prediction</h3>
            <p className="landing-feature-desc">
              Regression-based estimation of hospital stay duration in days, with a likely range
              based on admission type, prior utilization, and diagnostic factors.
            </p>
          </div>
          <div className="landing-feature-card">
            <div className="landing-feature-icon warning">
              <BarChart3 size={30} />
            </div>
            <h3 className="landing-feature-title">Healthcare Data Analytics</h3>
            <p className="landing-feature-desc">
              Interactive exploration of healthcare dataset distributions, admission patterns,
              missing-value summaries, and diagnosis-level analysis through charts and filters.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="landing-section" id="how-it-works">
        <div className="landing-section-header">
          <h2 className="landing-section-title">How It Works</h2>
          <p className="landing-section-subtitle">
            Three simple steps from data exploration to predictive insight.
          </p>
        </div>
        <div className="landing-steps">
          <div className="landing-step-card">
            <div className="landing-step-number">1</div>
            <h3 className="landing-step-title">Explore Healthcare Data</h3>
            <p className="landing-step-desc">
              Visualize dataset distributions, admission patterns, and diagnostic trends through
              interactive charts and filters.
            </p>
          </div>
          <div className="landing-step-card">
            <div className="landing-step-number">2</div>
            <h3 className="landing-step-title">Enter Patient Information</h3>
            <p className="landing-step-desc">
              Fill in structured encounter forms with patient demographics, admission details,
              and prior healthcare utilization data.
            </p>
          </div>
          <div className="landing-step-card">
            <div className="landing-step-number">3</div>
            <h3 className="landing-step-title">View Predictive Insights</h3>
            <p className="landing-step-desc">
              Receive readmission risk scores, length-of-stay estimates, and detailed explanations
              with model performance context.
            </p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="landing-section" id="about">
        <div className="landing-about">
          <div className="landing-about-text">
            <h2>About the Project</h2>
            <p>
              Smart Healthcare Analytics System Using Big Data is an academic MCA capstone project
              that combines healthcare analytics, machine learning, and data visualization into a
              unified frontend platform.
            </p>
            <p>
              The system is designed to demonstrate how predictive models can surface meaningful
              patterns from hospital encounter data — including readmission risk and length-of-stay
              estimation — through an intuitive, neumorphic interface.
            </p>
            <div className="disclaimer">
              <ShieldCheck size={16} />
              This is a demonstration project. It is not deployed in a hospital and makes no claims
              about clinical effectiveness.
            </div>
          </div>
          <div className="landing-about-visual">
            <div className="landing-about-stat">
              <div className="landing-about-stat-value">1,800+</div>
              <div className="landing-about-stat-label">Demo Predictions</div>
            </div>
            <div className="landing-about-stat">
              <div className="landing-about-stat-value">87%</div>
              <div className="landing-about-stat-label">Demo Accuracy</div>
            </div>
            <div className="landing-about-stat">
              <div className="landing-about-stat-value">7</div>
              <div className="landing-about-stat-label">Dashboard Pages</div>
            </div>
            <div className="landing-about-stat">
              <div className="landing-about-stat-value">10+</div>
              <div className="landing-about-stat-label">Chart Visualizations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="landing-section" id="technology">
        <div className="landing-section-header">
          <h2 className="landing-section-title">Technology Stack</h2>
          <p className="landing-section-subtitle">
            Built with modern technologies for the frontend and designed for ML backend integration.
          </p>
        </div>
        <div className="landing-tech-grid">
          <div className="landing-tech-item"><Cpu size={18} /> Python</div>
          <div className="landing-tech-item"><Brain size={18} /> Machine Learning</div>
          <div className="landing-tech-item"><Activity size={18} /> React</div>
          <div className="landing-tech-item"><Database size={18} /> TypeScript</div>
          <div className="landing-tech-item"><LineChart size={18} /> Data Visualization</div>
          <div className="landing-tech-item"><TrendingUp size={18} /> Big Data Analytics</div>
        </div>
      </section>

      {/* CTA */}
      <section className="landing-cta">
        <h2>Turn Healthcare Data into Meaningful Insights.</h2>
        <p>Start exploring predictive analytics with a polished, neumorphic interface.</p>
        <button className="landing-hero-btn primary" onClick={() => handleNav('signup')}>
          Get Started
          <ArrowRight size={18} />
        </button>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-footer-content">
          <div className="landing-footer-brand">
            <div className="landing-footer-brand-row">
              <div className="landing-nav-brand-icon">
                <Stethoscope size={20} />
              </div>
              <span className="landing-footer-brand-name">Smart Healthcare Analytics</span>
            </div>
            <p className="landing-footer-brand-desc">
              An academic MCA capstone project demonstrating healthcare predictive analytics
              with a premium neumorphism design. Not for clinical use.
            </p>
          </div>
          <div className="landing-footer-col">
            <h4>Pages</h4>
            <ul>
              <li onClick={() => scrollToSection('hero')}>Home</li>
              <li onClick={() => scrollToSection('features')}>Features</li>
              <li onClick={() => scrollToSection('how-it-works')}>How It Works</li>
              <li onClick={() => scrollToSection('about')}>About</li>
            </ul>
          </div>
          <div className="landing-footer-col">
            <h4>Account</h4>
            <ul>
              <li onClick={() => handleNav('login')}>Login</li>
              <li onClick={() => handleNav('signup')}>Sign Up</li>
              <li onClick={() => handleNav('dashboard')}>Dashboard</li>
            </ul>
          </div>
        </div>
        <div className="landing-footer-bottom">
          <span>© 2024 Smart Healthcare Analytics — MCA Capstone Project. For demonstration only.</span>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Github size={16} />
            <Mail size={16} />
          </div>
        </div>
      </footer>
    </div>
  );
}
