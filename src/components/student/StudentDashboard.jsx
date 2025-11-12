import React, { useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { BookOpen, FileText, Trophy, MessageCircle, Users, TrendingUp, Calendar, Clock } from 'lucide-react';
import { useTests } from '../../contexts/TestContext';


const StudentDashboard = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  const { submissions } = useTests();

  const mySubs = useMemo(() => submissions.filter(s => s.studentId === user?.id), [submissions, user]);
  const testsCompleted = mySubs.length;
  const averageScore = useMemo(() => {
    if (mySubs.length === 0) return 0;
    const sum = mySubs.reduce((acc, s) => acc + (s.maxScore ? (s.score / s.maxScore) : 0), 0);
    return Math.round((sum / mySubs.length) * 100);
  }, [mySubs]);

  const resourcesAccessed = useMemo(() => {
    try {
      const key = `smartedurural_resources_accessed_${user?.id || 'guest'}`;
      return parseInt(localStorage.getItem(key) || '0', 10) || 0;
    } catch (e) {
      return 0;
    }
  }, [user]);

  const currentRank = useMemo(() => {
    if (submissions.length === 0 || !user?.id) return null;
    // Compute average per student
    const map = new Map();
    submissions.forEach(s => {
      const k = s.studentId || 'unknown';
      const entry = map.get(k) || { sum: 0, count: 0 };
      entry.sum += (s.maxScore ? (s.score / s.maxScore) : 0);
      entry.count += 1;
      map.set(k, entry);
    });
    const leaderboard = Array.from(map.entries()).map(([studentId, v]) => ({ studentId, avg: v.count ? v.sum / v.count : 0 }))
      .sort((a, b) => b.avg - a.avg);
    const idx = leaderboard.findIndex(e => String(e.studentId) === String(user.id));
    return idx >= 0 ? idx + 1 : null;
  }, [submissions, user]);

  const stats = {
    testsCompleted,
    averageScore,
    resourcesAccessed,
    mentorSessions: 0,
    currentStreak: 0,
    rank: currentRank
  };

  const recentTests = mySubs.slice(-3).reverse().map((s, i) => ({
    id: s.id || i,
    subject: s.subjectLabel || 'Test',
    score: s.maxScore ? Math.round((s.score / s.maxScore) * 100) : 0,
    date: new Date(s.submittedAt).toLocaleDateString(),
    status: 'completed'
  }));

  const upcomingEvents = [
    { id: 1, title: '1:1 Session with Mentor', date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ];

  const quickActions = [
    { id: 'resources', title: t('resources'), icon: BookOpen, color: 'bg-blue-500', action: () => window.location.hash = '#resources' },
    { id: 'tests', title: t('takeTest'), icon: FileText, color: 'bg-green-500', action: () => window.location.hash = '#tests' },
    { id: 'mentor', title: t('askMentor'), icon: MessageCircle, color: 'bg-purple-500', action: () => window.location.hash = '#mentor' },
    { id: 'sessions', title: 'Book Session', icon: Users, color: 'bg-orange-500', action: () => alert('Session booking feature coming soon!') },
  ];

  // Add translation keys for dashboard messages
  const welcomeMsg = testsCompleted === 0
    ? t('dashboardWelcomeNew')
    : t('dashboardWelcomeStreak', { streak: stats.currentStreak });

  const noTestsMsg = t('dashboardNoTests');
  const takeFirstTestMsg = t('dashboardTakeFirstTest');
  const notTakenMsg = t('dashboardNotTaken');

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">{t('welcome')} {user?.name}!</h1>
        <p className="text-primary-100">
          {welcomeMsg}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t('testsCompleted')}</p>
              <p className="text-2xl font-bold text-gray-900">{stats.testsCompleted}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t('averageScore')}</p>
              <p className="text-2xl font-bold text-gray-900">{stats.averageScore}%</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t('resourcesAccessed')}</p>
              <p className="text-2xl font-bold text-gray-900">{stats.resourcesAccessed}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t('currentRank')}</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.rank ? `#${stats.rank}` : 'Not ranked yet'}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('quickActions')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={action.action}
                className="p-4 rounded-lg border-2 border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 group cursor-pointer"
              >
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-900">{action.title}</p>
              </button>
            );
          })}
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tests */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('recentTests')}</h2>
          <div className="space-y-3">
            {recentTests.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-4">{noTestsMsg}</p>
                <button 
                  onClick={() => window.location.hash = '#tests'}
                  className="btn-primary"
                >
                  {takeFirstTestMsg}
                </button>
              </div>
            ) : (
              recentTests.map((test) => (
                <div key={test.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{test.subject}</p>
                    <p className="text-sm text-gray-600">{test.date}</p>
                  </div>
                  <div className="text-right">
                    {test.status === 'completed' ? (
                      <div>
                        <p className="font-semibold text-green-600">{test.score}%</p>
                        <p className="text-xs text-gray-500">{t('completed')}</p>
                      </div>
                    ) : (
                      <div>
                        <p className="font-semibold text-orange-600">{t('pending')}</p>
                        <p className="text-xs text-gray-500">{notTakenMsg}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h2>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{event.title}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Learning Progress</h2>
        {testsCompleted === 0 ? (
          <div className="text-center py-8">
            <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Your Learning Journey</h3>
            <p className="text-gray-600 mb-4">Take tests and access resources to build your progress</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button 
                onClick={() => window.location.hash = '#tests'}
                className="btn-primary"
              >
                Take First Test
              </button>
              <button 
                onClick={() => window.location.hash = '#resources'}
                className="btn-secondary"
              >
                Explore Resources
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Mathematics</h3>
              <p className="text-2xl font-bold text-green-600">92%</p>
              <p className="text-sm text-gray-600">Last test score</p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Science</h3>
              <p className="text-2xl font-bold text-blue-600">78%</p>
              <p className="text-sm text-gray-600">Last test score</p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">English</h3>
              <p className="text-2xl font-bold text-purple-600">85%</p>
              <p className="text-sm text-gray-600">Average score</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
