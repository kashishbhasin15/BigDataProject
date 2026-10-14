import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout';
import { ToastProvider } from '@/components/ui/Toast';
import { DashboardPage } from '@/pages/Dashboard';
import { ReadmissionPage } from '@/pages/Readmission';
import { LengthOfStayPage } from '@/pages/LengthOfStay';
import { AnalyticsPage } from '@/pages/Analytics';
import { ModelPerformancePage } from '@/pages/ModelPerformance';
import { PredictionHistoryPage } from '@/pages/PredictionHistory';
import { SettingsPage } from '@/pages/Settings';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { SignupPage } from '@/pages/SignupPage';
import { ProfilePage } from '@/pages/ProfilePage';
import type { ReactNode } from 'react';

function LandingWrapper() {
  const navigate = useNavigate();
  return (
    <LandingPage
      onNavigate={(page) => {
        if (page === 'login') navigate('/login');
        else if (page === 'signup') navigate('/signup');
        else if (page === 'dashboard') navigate('/dashboard');
      }}
    />
  );
}

function LoginWrapper() {
  const navigate = useNavigate();
  return (
    <LoginPage
      onNavigate={(page) => {
        if (page === 'landing') navigate('/');
        else if (page === 'signup') navigate('/signup');
        else if (page === 'dashboard') navigate('/dashboard');
      }}
    />
  );
}

function SignupWrapper() {
  const navigate = useNavigate();
  return (
    <SignupPage
      onNavigate={(page) => {
        if (page === 'landing') navigate('/');
        else if (page === 'login') navigate('/login');
        else if (page === 'dashboard') navigate('/dashboard');
      }}
    />
  );
}

function ProfileWrapper() {
  const navigate = useNavigate();
  return (
    <ProfilePage
      onNavigate={(page) => {
        if (page === 'landing') navigate('/');
        else if (page === 'dashboard') navigate('/dashboard');
      }}
    />
  );
}

function DashboardWrapper() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/readmission" element={<ReadmissionPage />} />
        <Route path="/dashboard/length-of-stay" element={<LengthOfStayPage />} />
        <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
        <Route path="/dashboard/model-performance" element={<ModelPerformancePage />} />
        <Route path="/dashboard/prediction-history" element={<PredictionHistoryPage />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />
        <Route path="/dashboard/help" element={<SettingsPage />} />
        <Route path="/dashboard/profile" element={<ProfileWrapper />} />
        <Route path="*" element={<DashboardPage />} />
      </Routes>
    </AppLayout>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingWrapper />} />
      <Route path="/login" element={<LoginWrapper />} />
      <Route path="/signup" element={<SignupWrapper />} />
      <Route path="/dashboard/*" element={<DashboardWrapper />} />
      <Route path="*" element={<LandingWrapper />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AppRoutes />
      </ToastProvider>
    </BrowserRouter>
  );
}
