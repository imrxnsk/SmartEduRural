import React, { useMemo, useState } from 'react';
import { Search, Filter, Eye, MessageCircle, Phone, Mail, TrendingUp, TrendingDown, Calendar, BookOpen, Clock } from 'lucide-react';
import { useStudentSummaries } from '../../hooks/useStudentSummaries';

const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const students = useStudentSummaries();

  const grades = useMemo(() => {
    const gradeSet = new Set();
    students.forEach((student) => {
      if (student.grade) {
        gradeSet.add(student.grade);
      }
    });
    return ['all', ...Array.from(gradeSet)];
  }, [students]);

  const statuses = ['all', 'active', 'inactive'];

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'all' || (student.grade || 'Unknown') === selectedGrade;
    const matchesStatus = selectedStatus === 'all' || student.status === selectedStatus;
    return matchesSearch && matchesGrade && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend) => {
    if (trend === 'up') {
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    }
    if (trend === 'down') {
      return <TrendingDown className="w-4 h-4 text-red-500" />;
    }
    return <TrendingUp className="w-4 h-4 text-gray-400" />;
  };

  const totalTests = students.reduce((sum, student) => sum + student.testsCompleted, 0);
  const averageScore = students.length
    ? Math.round(students.reduce((sum, student) => sum + student.averageScore, 0) / students.length)
    : 0;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
          <p className="text-gray-600 mt-1">Monitor and manage your students&apos; progress</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          <div className="sm:w-48">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="input-field pl-10 appearance-none"
              >
                {grades.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade === 'all' ? 'All Grades' : grade}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="sm:w-48">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="input-field"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <div key={student.storageKey} className="card hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-primary-600">
                    {student.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{student.name}</h3>
                  <p className="text-sm text-gray-600">{student.grade || 'Unknown Grade'} • {student.school || '—'}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                {student.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Average Score</span>
                <span className="font-semibold text-gray-900">{student.averageScore}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Tests Completed</span>
                <span className="font-medium text-gray-900">{student.testsCompleted}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Resources Downloaded</span>
                <span className="font-medium text-gray-900">{student.resourcesAccessed}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Rank</span>
                <div className="flex items-center space-x-1">
                  <span className="font-medium text-gray-900">{student.rank ? `#${student.rank}` : '—'}</span>
                  {getTrendIcon(student.trend)}
                </div>
              </div>
            </div>

            <div className="mb-4 space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>{student.phone || 'Not provided'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span>{student.email || 'Not provided'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>Joined {student.joinDate || '—'}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>Last active: {student.lastActive || '—'}</span>
              </div>
            </div>

            {student.subjects?.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Subjects</p>
                <div className="flex flex-wrap gap-1">
                  {student.subjects.map((subject) => (
                    <span key={subject} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex space-x-2">
              <button className="flex-1 btn-secondary text-xs py-2 flex items-center justify-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>View</span>
              </button>
              <button className="flex-1 btn-primary text-xs py-2 flex items-center justify-center space-x-1">
                <MessageCircle className="w-3 h-3" />
                <span>Message</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{students.length}</h3>
          <p className="text-sm text-gray-600">Total Students</p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {students.filter((student) => student.status === 'active').length}
          </h3>
          <p className="text-sm text-gray-600">Active Students</p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{averageScore}%</h3>
          <p className="text-sm text-gray-600">Average Score</p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Calendar className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{totalTests}</h3>
          <p className="text-sm text-gray-600">Total Tests</p>
        </div>
      </div>
    </div>
  );
};

export default StudentManagement;
