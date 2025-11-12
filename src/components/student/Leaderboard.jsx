import React, { useState } from 'react';
import { Trophy, Medal, Award, TrendingUp, Filter, Calendar } from 'lucide-react';

const Leaderboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedSubject, setSelectedSubject] = useState('all');

  // Mock data - in real app, this would come from API
  const leaderboardData = [
    {
      id: 1,
      name: 'Priya Sharma',
      rank: 1,
      score: 95,
      testsCompleted: 18,
      improvement: 8.2,
      avatar: null,
      school: 'Rural High School',
      grade: '10th'
    },
    {
      id: 2,
      name: 'Rahul Kumar',
      rank: 2,
      score: 92,
      testsCompleted: 15,
      improvement: 5.1,
      avatar: null,
      school: 'Rural High School',
      grade: '10th'
    },
    {
      id: 3,
      name: 'Amit Singh',
      rank: 3,
      score: 89,
      testsCompleted: 16,
      improvement: 3.7,
      avatar: null,
      school: 'Rural High School',
      grade: '9th'
    },
    {
      id: 4,
      name: 'Sneha Patel',
      rank: 4,
      score: 87,
      testsCompleted: 14,
      improvement: 2.3,
      avatar: null,
      school: 'Rural High School',
      grade: '10th'
    },
    {
      id: 5,
      name: 'Vikram Joshi',
      rank: 5,
      score: 85,
      testsCompleted: 13,
      improvement: 1.8,
      avatar: null,
      school: 'Rural High School',
      grade: '11th'
    }
  ];

  const periods = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const subjects = [
    { value: 'all', label: 'All Subjects' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'science', label: 'Science' },
    { value: 'english', label: 'English' },
    { value: 'history', label: 'History' }
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">{rank}</span>;
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2: return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3: return 'bg-gradient-to-r from-amber-500 to-amber-700';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leaderboard</h1>
          <p className="text-gray-600 mt-1">See how you rank among your peers</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <TrendingUp className="w-4 h-4" />
            <span>Your rank: #2</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Period Selection */}
          <div className="sm:w-48">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="input-field pl-10"
              >
                {periods.map(period => (
                  <option key={period.value} value={period.value}>
                    {period.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Subject Filter */}
          <div className="sm:w-48">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="input-field pl-10"
              >
                {subjects.map(subject => (
                  <option key={subject.value} value={subject.value}>
                    {subject.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-6 text-center">Top Performers</h2>
        <div className="flex justify-center items-end space-x-4">
          {/* 2nd Place */}
          {leaderboardData[1] && (
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="font-semibold text-gray-900">{leaderboardData[1].name}</h3>
              <p className="text-sm text-gray-600">{leaderboardData[1].score}%</p>
              <p className="text-xs text-gray-500">{leaderboardData[1].grade}</p>
            </div>
          )}

          {/* 1st Place */}
          {leaderboardData[0] && (
            <div className="text-center">
              <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center mb-2">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">{leaderboardData[0].name}</h3>
              <p className="text-sm text-gray-600">{leaderboardData[0].score}%</p>
              <p className="text-xs text-gray-500">{leaderboardData[0].grade}</p>
            </div>
          )}

          {/* 3rd Place */}
          {leaderboardData[2] && (
            <div className="text-center">
              <div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="font-semibold text-gray-900">{leaderboardData[2].name}</h3>
              <p className="text-sm text-gray-600">{leaderboardData[2].score}%</p>
              <p className="text-xs text-gray-500">{leaderboardData[2].grade}</p>
            </div>
          )}
        </div>
      </div>

      {/* Full Leaderboard */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Complete Rankings</h2>
        <div className="space-y-3">
          {leaderboardData.map((student, index) => (
            <div
              key={student.id}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                student.rank <= 3
                  ? `${getRankColor(student.rank)} text-white`
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getRankIcon(student.rank)}
                    <span className="text-lg font-bold">
                      #{student.rank}
                    </span>
                  </div>
                  
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-primary-600">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className={`font-semibold ${
                      student.rank <= 3 ? 'text-white' : 'text-gray-900'
                    }`}>
                      {student.name}
                    </h3>
                    <p className={`text-sm ${
                      student.rank <= 3 ? 'text-white/80' : 'text-gray-600'
                    }`}>
                      {student.grade} • {student.school}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className={`text-2xl font-bold ${
                        student.rank <= 3 ? 'text-white' : 'text-gray-900'
                      }`}>
                        {student.score}%
                      </p>
                      <p className={`text-sm ${
                        student.rank <= 3 ? 'text-white/80' : 'text-gray-600'
                      }`}>
                        {student.testsCompleted} tests
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <TrendingUp className={`w-4 h-4 ${
                          student.rank <= 3 ? 'text-white' : 'text-green-500'
                        }`} />
                        <span className={`text-sm font-medium ${
                          student.rank <= 3 ? 'text-white' : 'text-green-600'
                        }`}>
                          +{student.improvement}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Your Performance */}
      <div className="card bg-primary-50 border-primary-200">
        <h2 className="text-lg font-semibold text-primary-900 mb-4">Your Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <h3 className="font-semibold text-primary-900">Current Rank</h3>
            <p className="text-sm text-primary-700">Out of 45 students</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-white">92</span>
            </div>
            <h3 className="font-semibold text-primary-900">Average Score</h3>
            <p className="text-sm text-primary-700">This period</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-primary-900">Improvement</h3>
            <p className="text-sm text-primary-700">+5.1% from last period</p>
          </div>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900 text-sm">Top Performer</h3>
            <p className="text-xs text-gray-600">Mathematics</p>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900 text-sm">Rising Star</h3>
            <p className="text-xs text-gray-600">Science</p>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900 text-sm">Consistent</h3>
            <p className="text-xs text-gray-600">7 day streak</p>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Medal className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900 text-sm">Quick Learner</h3>
            <p className="text-xs text-gray-600">Fast completion</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
