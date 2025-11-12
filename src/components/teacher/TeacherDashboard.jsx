import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Users, BookOpen, FileText, MessageCircle, TrendingUp, Calendar, Clock, Eye } from 'lucide-react';
import { useTests } from '../../contexts/TestContext';
import { useStudentSummaries } from '../../hooks/useStudentSummaries';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const { availableTests, submissions } = useTests();
  const students = useStudentSummaries();

  const totalStudents = students.length;
  const activeTests = availableTests.length;
  const averageScore = totalStudents
    ? Math.round(students.reduce((sum, student) => sum + student.averageScore, 0) / totalStudents)
    : 0;

  const stats = {
    totalStudents,
    activeTests,
    resourcesUploaded: 0,
    sessionsCompleted: submissions.length,
    averageScore,
    pendingRequests: 0
  };

  const recentActivity = submissions
    .slice(-5)
    .reverse()
    .map((submission) => ({
      id: submission.id,
      type: 'test',
      title: submission.testTitle,
      date: submission.submittedAt ? new Date(submission.submittedAt).toLocaleString() : '',
      status: 'completed',
      students: 1,
      score: submission.score,
      maxScore: submission.maxScore
    }));

  const upcomingEvents = availableTests
    .filter((test) => test.startDate && new Date(test.startDate).getTime() > Date.now())
    .map((test) => ({
      id: test.id,
      title: test.title,
      date: new Date(test.startDate).toLocaleDateString(),
      time: new Date(test.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      participants: test.totalParticipants || 0
    }));

  const studentPerformance = students.slice(0, 6);

  const quickActions = [
    { id: 'create-test', title: 'Create Test', icon: FileText, color: 'bg-blue-500' },
    { id: 'upload-resource', title: 'Upload Resource', icon: BookOpen, color: 'bg-green-500' },
    { id: 'schedule-session', title: 'Schedule Session', icon: MessageCircle, color: 'bg-purple-500' },
    { id: 'view-reports', title: 'View Reports', icon: TrendingUp, color: 'bg-orange-500' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-primary-100">
          Manage your students, create tests, and track their progress all in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Tests</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeTests}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-gray-900">{stats.averageScore}%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Assessments Completed</p>
              <p className="text-2xl font-bold text-gray-900">{stats.sessionsCompleted}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                className="p-4 rounded-lg border-2 border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 group"
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
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.length === 0 ? (
              <p className="text-sm text-gray-600">No recent submissions yet.</p>
            ) : (
              recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <FileText className="w-4 h-4 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                  <div className="text-right text-xs text-gray-600">
                    <div>Score {activity.score}/{activity.maxScore}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h2>
          <div className="space-y-3">
            {upcomingEvents.length === 0 ? (
              <p className="text-sm text-gray-600">No upcoming tests scheduled.</p>
            ) : (
              upcomingEvents.map((event) => (
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
              ))
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Student Performance Overview</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tests Taken</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {studentPerformance.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-sm text-gray-600 text-center">
                    No student data yet.
                  </td>
                </tr>
              ) : (
                studentPerformance.map((student) => (
                  <tr key={student.storageKey} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary-600">
                            {student.name.split(' ').map((n) => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          <div className="text-xs text-gray-500">{student.email || 'No email'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.averageScore}%</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.testsCompleted}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.lastActive || '—'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <TrendingUp className={`w-4 h-4 ${
                          student.trend === 'up' ? 'text-green-500' : student.trend === 'down' ? 'text-red-500' : 'text-gray-400'
                        }`} />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-900 flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
