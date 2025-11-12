import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { 
  Home, 
  BookOpen, 
  FileText, 
  Trophy, 
  MessageCircle, 
  Users, 
  BarChart3, 
  Settings,
  Bell,
  User,
  GraduationCap,
  Calendar,
  Download,
  Briefcase,
  Award
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { user } = useAuth();
  const { t } = useTranslation();

  const getNavigationItems = () => {
    switch (user?.type) {
      case 'student':
        return [
          { id: 'dashboard', label: t('dashboard'), icon: Home },
          { id: 'resources', label: t('resources'), icon: BookOpen },
          { id: 'tests', label: t('tests'), icon: FileText },
          { id: 'leaderboard', label: t('leaderboard'), icon: Trophy },
          { id: 'mentor', label: t('mentor'), icon: MessageCircle },
          { id: 'jobs', label: t('jobOpportunities'), icon: Briefcase },
          { id: 'scholarships', label: t('scholarships'), icon: Award },
          { id: 'sessions', label: t('sessions'), icon: Users },
          { id: 'notifications', label: t('notifications'), icon: Bell },
        ];
      
      case 'parent':
        return [
          { id: 'dashboard', label: t('dashboard'), icon: Home },
          { id: 'reports', label: t('reports'), icon: BarChart3 },
          { id: 'children', label: t('children'), icon: User },
          { id: 'mentor', label: t('mentor'), icon: MessageCircle },
          { id: 'jobs', label: t('jobOpportunities'), icon: Briefcase },
          { id: 'scholarships', label: t('scholarships'), icon: Award },
          { id: 'notifications', label: t('notifications'), icon: Bell },
        ];
      
      case 'teacher':
        return [
          { id: 'dashboard', label: t('dashboard'), icon: Home },
          { id: 'students', label: t('students'), icon: GraduationCap },
          { id: 'tests', label: t('tests'), icon: FileText },
          { id: 'resources', label: t('resources'), icon: BookOpen },
          { id: 'mentor', label: t('mentor'), icon: MessageCircle },
          { id: 'sessions', label: t('sessions'), icon: Users },
          { id: 'jobs', label: t('jobOpportunities'), icon: Briefcase },
          { id: 'scholarships', label: t('scholarships'), icon: Award },
          { id: 'reports', label: t('reports'), icon: BarChart3 },
          { id: 'calendar', label: t('calendar'), icon: Calendar },
          { id: 'notifications', label: t('notifications'), icon: Bell },
        ];
      
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="w-64 bg-white/90 backdrop-blur-sm shadow-sm border-r border-gray-200 h-full">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SE</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">SmartEduRural</h2>
            <p className="text-xs text-gray-500 capitalize">{t(user?.type || 'user')} {t('userPortal')}</p>
          </div>
        </div>
      </div>

      <nav className="px-3 pb-4">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-primary-50 to-emerald-50 text-primary-700 border-r-4 border-primary-500 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:translate-x-0.5'
                }`}
              >
                <Icon className={`w-5 h-5 ${
                  activeTab === item.id ? 'text-primary-600' : 'text-gray-400'
                }`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Quick Actions */}
      <div className="px-4 pb-4">
        <div className="border-t border-gray-200 pt-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            {t('quickActions')}
          </h3>
          <div className="space-y-1">
            {user?.type === 'student' && (
              <>
                <button 
                  onClick={() => setActiveTab('resources')}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                >
                  <Download className="w-4 h-4" />
                  <span>{t('downloadResources')}</span>
                </button>
                <button 
                  onClick={() => setActiveTab('mentor')}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t('askMentor')}</span>
                </button>
              </>
            )}
            {user?.type === 'teacher' && (
              <>
                <button 
                  onClick={() => setActiveTab('tests')}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                >
                  <FileText className="w-4 h-4" />
                  <span>{t('createTest')}</span>
                </button>
                <button 
                  onClick={() => setActiveTab('resources')}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{t('uploadResource')}</span>
                </button>
              </>
            )}
            {user?.type === 'parent' && (
              <>
                <button 
                  onClick={() => setActiveTab('reports')}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>{t('viewReports')}</span>
                </button>
                <button 
                  onClick={() => alert('SMS alerts feature coming soon!')}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                >
                  <Bell className="w-4 h-4" />
                  <span>{t('enableSMSAlerts')}</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
