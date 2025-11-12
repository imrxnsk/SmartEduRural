import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { TestProvider } from './contexts/TestContext';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import './i18n';
import BrandLoader from './components/common/BrandLoader';

// Student Components
import StudentDashboard from './components/student/StudentDashboard';
import Resources from './components/student/Resources';
import Tests from './components/student/Tests';
import VirtualMentor from './components/student/VirtualMentor';
import Leaderboard from './components/student/Leaderboard';
import JobOpportunities from './components/student/JobOpportunities';
import Scholarships from './components/student/Scholarships';
import StudentSessions from './components/student/Sessions';

// Parent Components
import ParentDashboard from './components/parent/ParentDashboard';
import Reports from './components/parent/Reports';

// Teacher Components
import TeacherDashboard from './components/teacher/TeacherDashboard';
import CreateTest from './components/teacher/CreateTest';
import StudentManagement from './components/teacher/StudentManagement';
import TeacherSessions from './components/teacher/Sessions';

function AppContent() {
  const { user, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <BrandLoader />
      </div>
    );
  }

  if (!user) {
    return isLogin ? (
      <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
    ) : (
      <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
    );
  }

  const renderContent = () => {
    switch (user.type) {
      case 'student':
        switch (activeTab) {
          case 'dashboard': return <StudentDashboard />;
          case 'resources': return <Resources />;
          case 'tests': return <Tests />;
          case 'leaderboard': return <Leaderboard />;
          case 'mentor': return <VirtualMentor />;
          case 'sessions': return <StudentSessions />;
          case 'jobs': return <JobOpportunities />;
          case 'scholarships': return <Scholarships />;
          default: return <StudentDashboard />;
        }
      case 'parent':
        switch (activeTab) {
          case 'dashboard': return <ParentDashboard />;
          case 'reports': return <Reports />;
          case 'mentor': return <VirtualMentor />;
          case 'jobs': return <JobOpportunities />;
          case 'scholarships': return <Scholarships />;
          default: return <ParentDashboard />;
        }
      case 'teacher':
        switch (activeTab) {
          case 'dashboard': return <TeacherDashboard />;
          case 'tests': return <CreateTest />;
          case 'students': return <StudentManagement />;
          case 'sessions': return <TeacherSessions />;
          case 'mentor': return <VirtualMentor />;
          case 'jobs': return <JobOpportunities />;
          case 'scholarships': return <Scholarships />;
          default: return <TeacherDashboard />;
        }
      default:
        return <div>Unknown user type</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 lg:ml-0 ml-0 overflow-x-hidden min-h-screen">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <TestProvider>
        <AppContent />
      </TestProvider>
    </AuthProvider>
  );
}

export default App;
