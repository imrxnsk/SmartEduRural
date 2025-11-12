import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User, TrendingUp, BookOpen, Trophy, Bell, MessageSquare, Calendar, Download, Phone } from 'lucide-react';

const ParentDashboard = () => {
  const { user } = useAuth();
  const [selectedChild, setSelectedChild] = useState(0);

  // Mock data - in real app, this would come from API
  const children = [
    {
      id: 1,
      name: 'Rahul Kumar',
      grade: '10th',
      school: 'Rural High School',
      avatar: null,
      lastActive: '2 hours ago'
    },
    {
      id: 2,
      name: 'Priya Kumar',
      grade: '8th',
      school: 'Rural High School',
      avatar: null,
      lastActive: '1 day ago'
    }
  ];

  const currentChild = children[selectedChild];

  const childStats = {
    testsCompleted: 15,
    averageScore: 82,
    resourcesAccessed: 28,
    studyHours: 24,
    currentStreak: 5,
    rank: 8
  };

  const recentActivity = [
    { id: 1, type: 'test', title: 'Mathematics Test', score: 92, date: '2024-01-15', time: '10:30 AM' },
    { id: 2, type: 'resource', title: 'Science Video - Photosynthesis', date: '2024-01-14', time: '3:45 PM' },
    { id: 3, type: 'session', title: '1:1 Session with Mentor', date: '2024-01-13', time: '4:00 PM' },
    { id: 4, type: 'test', title: 'English Grammar Quiz', score: 78, date: '2024-01-12', time: '11:15 AM' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Mathematics Test', date: '2024-01-20', time: '10:00 AM' },
    { id: 2, title: 'Science Quiz', date: '2024-01-22', time: '2:00 PM' },
    { id: 3, title: 'Parent-Teacher Meeting', date: '2024-01-25', time: '3:00 PM' },
  ];

  const subjectPerformance = [
    { subject: 'Mathematics', score: 92, trend: 'up', color: 'bg-blue-500' },
    { subject: 'Science', score: 78, trend: 'down', color: 'bg-green-500' },
    { subject: 'English', score: 85, trend: 'up', color: 'bg-purple-500' },
    { subject: 'History', score: 88, trend: 'up', color: 'bg-orange-500' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome, {user?.name}!</h1>
        <p className="text-primary-100">
          Monitor your child's progress and stay connected with their learning journey.
        </p>
      </div>

      {/* Child Selection */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Child</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {children.map((child, index) => (
            <button
              key={child.id}
              onClick={() => setSelectedChild(index)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                selectedChild === index
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{child.name}</h3>
                  <p className="text-sm text-gray-600">{child.grade} • {child.school}</p>
                  <p className="text-xs text-gray-500">Last active: {child.lastActive}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Child Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tests Completed</p>
              <p className="text-2xl font-bold text-gray-900">{childStats.testsCompleted}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-gray-900">{childStats.averageScore}%</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Study Hours</p>
              <p className="text-2xl font-bold text-gray-900">{childStats.studyHours}h</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Rank</p>
              <p className="text-2xl font-bold text-gray-900">#{childStats.rank}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Performance */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Subject Performance</h2>
          <div className="space-y-4">
            {subjectPerformance.map((subject, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${subject.color}`}></div>
                  <span className="font-medium text-gray-900">{subject.subject}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-900">{subject.score}%</span>
                  <TrendingUp className={`w-4 h-4 ${
                    subject.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  {activity.type === 'test' && <BookOpen className="w-4 h-4 text-primary-600" />}
                  {activity.type === 'resource' && <BookOpen className="w-4 h-4 text-primary-600" />}
                  {activity.type === 'session' && <MessageSquare className="w-4 h-4 text-primary-600" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.title}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{activity.date} at {activity.time}</span>
                    {activity.score && (
                      <span className="font-semibold text-green-600">({activity.score}%)</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Calendar className="w-5 h-5 text-primary-600" />
                <h3 className="font-medium text-gray-900">{event.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Download className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Download Report</h3>
                <p className="text-sm text-gray-600">Get detailed progress report</p>
              </div>
            </div>
          </button>

          <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">SMS Alerts</h3>
                <p className="text-sm text-gray-600">Enable notifications</p>
              </div>
            </div>
          </button>

          <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Contact Teacher</h3>
                <p className="text-sm text-gray-600">Schedule a meeting</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
