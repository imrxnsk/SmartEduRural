import React, { useState } from 'react';
import { Download, Calendar, TrendingUp, TrendingDown, BarChart3, PieChart, FileText, Mail, Phone } from 'lucide-react';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedChild, setSelectedChild] = useState(0);

  // Mock data - in real app, this would come from API
  const children = [
    { id: 1, name: 'Rahul Kumar', grade: '10th' },
    { id: 2, name: 'Priya Kumar', grade: '8th' }
  ];

  const currentChild = children[selectedChild];

  const reportData = {
    overall: {
      averageScore: 82,
      testsCompleted: 15,
      studyHours: 24,
      rank: 8,
      improvement: 5.2
    },
    subjects: [
      { name: 'Mathematics', score: 92, trend: 'up', change: 3.2, tests: 5 },
      { name: 'Science', score: 78, trend: 'down', change: -1.5, tests: 4 },
      { name: 'English', score: 85, trend: 'up', change: 2.1, tests: 3 },
      { name: 'History', score: 88, trend: 'up', change: 4.5, tests: 3 }
    ],
    monthlyProgress: [
      { month: 'Jan', score: 78 },
      { month: 'Feb', score: 82 },
      { month: 'Mar', score: 85 },
      { month: 'Apr', score: 82 }
    ],
    studyPattern: [
      { day: 'Mon', hours: 2.5 },
      { day: 'Tue', hours: 3.0 },
      { day: 'Wed', hours: 2.0 },
      { day: 'Thu', hours: 3.5 },
      { day: 'Fri', hours: 2.5 },
      { day: 'Sat', hours: 4.0 },
      { day: 'Sun', hours: 1.5 }
    ]
  };

  const periods = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const getTrendIcon = (trend) => {
    return trend === 'up' ? (
      <TrendingUp className="w-4 h-4 text-green-500" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-500" />
    );
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Progress Reports</h1>
          <p className="text-gray-600 mt-1">Detailed analysis of your child's academic performance</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-2">
          <button className="btn-primary flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Download Report</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Child Selection */}
          <div className="sm:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Child</label>
            <select
              value={selectedChild}
              onChange={(e) => setSelectedChild(parseInt(e.target.value))}
              className="input-field"
            >
              {children.map((child, index) => (
                <option key={child.id} value={index}>
                  {child.name} ({child.grade})
                </option>
              ))}
            </select>
          </div>

          {/* Period Selection */}
          <div className="sm:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">Time Period</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="input-field"
            >
              {periods.map(period => (
                <option key={period.value} value={period.value}>
                  {period.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Overall Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-gray-900">{reportData.overall.averageScore}%</p>
              <p className="text-sm text-green-600">+{reportData.overall.improvement}% from last period</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tests Completed</p>
              <p className="text-2xl font-bold text-gray-900">{reportData.overall.testsCompleted}</p>
              <p className="text-sm text-gray-500">This period</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Study Hours</p>
              <p className="text-2xl font-bold text-gray-900">{reportData.overall.studyHours}h</p>
              <p className="text-sm text-gray-500">This period</p>
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
              <p className="text-2xl font-bold text-gray-900">#{reportData.overall.rank}</p>
              <p className="text-sm text-gray-500">In class</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Subject-wise Performance */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Subject-wise Performance</h2>
        <div className="space-y-4">
          {reportData.subjects.map((subject, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold text-primary-600">{subject.name[0]}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{subject.name}</h3>
                  <p className="text-sm text-gray-600">{subject.tests} tests completed</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{subject.score}%</p>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(subject.trend)}
                    <span className={`text-sm ${getTrendColor(subject.trend)}`}>
                      {subject.change > 0 ? '+' : ''}{subject.change}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Progress Chart */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Progress</h2>
          <div className="space-y-3">
            {reportData.monthlyProgress.map((month, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">{month.month}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${month.score}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-12 text-right">{month.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Study Pattern */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Weekly Study Pattern</h2>
          <div className="space-y-3">
            {reportData.studyPattern.map((day, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 w-12">{day.day}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(day.hours / 4) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-12 text-right">{day.hours}h</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Strengths</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Excellent performance in Mathematics</li>
              <li>• Consistent study schedule</li>
              <li>• Good attendance record</li>
            </ul>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <h3 className="font-semibold text-orange-900 mb-2">Areas for Improvement</h3>
            <ul className="text-sm text-orange-800 space-y-1">
              <li>• Science scores need attention</li>
              <li>• More practice with English grammar</li>
              <li>• Increase study time on weekends</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Action Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Email Report</h3>
                <p className="text-sm text-gray-600">Send to your email</p>
              </div>
            </div>
          </button>

          <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Schedule Meeting</h3>
                <p className="text-sm text-gray-600">With teacher</p>
              </div>
            </div>
          </button>

          <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Print Report</h3>
                <p className="text-sm text-gray-600">For records</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
