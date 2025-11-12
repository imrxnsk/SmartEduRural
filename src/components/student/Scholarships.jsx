import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { 
  GraduationCap, 
  DollarSign, 
  Calendar, 
  MapPin, 
  Filter, 
  Search,
  Star,
  ExternalLink,
  Bookmark,
  Users,
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const Scholarships = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  // Mock scholarship data - in real app, this would come from API
  const scholarshipCategories = [
    { id: 'all', name: 'All Categories', count: 28 },
    { id: 'merit', name: 'Merit-based', count: 12 },
    { id: 'need', name: 'Need-based', count: 8 },
    { id: 'sports', name: 'Sports', count: 3 },
    { id: 'arts', name: 'Arts & Culture', count: 2 },
    { id: 'rural', name: 'Rural Development', count: 3 }
  ];

  const educationLevels = [
    { id: 'all', name: 'All Levels' },
    { id: 'school', name: 'School Level' },
    { id: 'undergraduate', name: 'Undergraduate' },
    { id: 'postgraduate', name: 'Postgraduate' },
    { id: 'phd', name: 'PhD/Research' }
  ];

  const scholarships = [
    {
      id: 1,
      title: 'Rural Education Excellence Scholarship',
      provider: 'Ministry of Education',
      amount: '₹50,000 - ₹1,00,000',
      category: 'merit',
      level: 'undergraduate',
      deadline: '2026-03-15',
      description: 'Scholarship for students from rural areas who have excelled in academics and show potential for higher education.',
      requirements: ['Rural area residence', 'Minimum 85% in 12th grade', 'Family income below ₹5,00,000'],
      isBookmarked: false,
      isFeatured: true,
      applicants: 234,
      status: 'open'
    },
    {
      id: 2,
      title: 'Digital India Scholarship',
      provider: 'Tech Foundation',
      amount: '₹25,000 - ₹75,000',
      category: 'merit',
      level: 'undergraduate',
      deadline: '2026-02-28',
      description: 'Supporting students pursuing technology and computer science degrees.',
      requirements: ['Computer Science/IT background', 'Minimum 80% in 12th grade', 'Innovation project'],
      isBookmarked: true,
      isFeatured: true,
      applicants: 156,
      status: 'open'
    },
    {
      id: 3,
      title: 'Women Empowerment Scholarship',
      provider: 'Women Development Foundation',
      amount: '₹30,000 - ₹60,000',
      category: 'need',
      level: 'all',
      deadline: '2026-04-10',
      description: 'Encouraging women from rural areas to pursue higher education in any field.',
      requirements: ['Female candidate', 'Rural background', 'Financial need', 'Academic merit'],
      isBookmarked: false,
      isFeatured: false,
      applicants: 89,
      status: 'open'
    },
    {
      id: 4,
      title: 'Sports Excellence Scholarship',
      provider: 'Sports Authority of India',
      amount: '₹40,000 - ₹80,000',
      category: 'sports',
      level: 'all',
      deadline: '2026-03-30',
      description: 'For students who have represented state/national level in sports.',
      requirements: ['State/National level participation', 'Academic performance', 'Sports certificates'],
      isBookmarked: false,
      isFeatured: false,
      applicants: 45,
      status: 'open'
    },
    {
      id: 5,
      title: 'Agricultural Innovation Scholarship',
      provider: 'Agriculture Ministry',
      amount: '₹35,000 - ₹70,000',
      category: 'rural',
      level: 'postgraduate',
      deadline: '2026-02-15',
      description: 'Supporting students pursuing agricultural studies and rural development.',
      requirements: ['Agriculture/related field', 'Rural development focus', 'Innovation proposal'],
      isBookmarked: true,
      isFeatured: false,
      applicants: 67,
      status: 'closing_soon'
    }
  ];

  const filteredScholarships = scholarships.filter(scholarship => {
    const matchesSearch = scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || scholarship.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || scholarship.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleBookmark = (scholarshipId) => {
    // In real app, this would update the backend
    console.log('Bookmark toggled for scholarship:', scholarshipId);
  };

  const handleApply = (scholarshipId) => {
    // In real app, this would redirect to application form
    alert('Scholarship application feature coming soon!');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'closing_soon': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open': return <CheckCircle className="w-4 h-4" />;
      case 'closing_soon': return <Clock className="w-4 h-4" />;
      case 'closed': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Scholarships & Financial Aid</h1>
        <p className="text-primary-100">
          Discover scholarships and financial aid opportunities to support your educational journey. Find funding for school, college, and higher education.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search scholarships, providers, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="lg:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {scholarshipCategories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
          </div>

          {/* Level Filter */}
          <div className="lg:w-48">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {educationLevels.map(level => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Scholarships</p>
              <p className="text-2xl font-bold text-gray-900">{scholarships.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Featured</p>
              <p className="text-2xl font-bold text-gray-900">{scholarships.filter(s => s.isFeatured).length}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Bookmarked</p>
              <p className="text-2xl font-bold text-gray-900">{scholarships.filter(s => s.isBookmarked).length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Bookmark className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Open Now</p>
              <p className="text-2xl font-bold text-gray-900">{scholarships.filter(s => s.status === 'open').length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Scholarship Listings */}
      <div className="space-y-4">
        {filteredScholarships.length === 0 ? (
          <div className="card text-center py-12">
            <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No scholarships found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        ) : (
          filteredScholarships.map((scholarship) => (
            <div key={scholarship.id} className={`card ${scholarship.isFeatured ? 'ring-2 ring-yellow-400 bg-yellow-50' : ''}`}>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        {scholarship.title}
                        {scholarship.isFeatured && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </span>
                        )}
                      </h3>
                      <p className="text-gray-600 font-medium">{scholarship.provider}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(scholarship.status)}`}>
                        {getStatusIcon(scholarship.status)}
                        <span className="ml-1 capitalize">{scholarship.status.replace('_', ' ')}</span>
                      </span>
                      <button
                        onClick={() => handleBookmark(scholarship.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          scholarship.isBookmarked 
                            ? 'bg-primary-100 text-primary-600' 
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                      >
                        <Bookmark className={`w-5 h-5 ${scholarship.isBookmarked ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-semibold text-green-600">{scholarship.amount}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Deadline: {scholarship.deadline}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      <span className="capitalize">{scholarship.category.replace('_', ' ')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GraduationCap className="w-4 h-4" />
                      <span className="capitalize">{scholarship.level}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-3">{scholarship.description}</p>

                  <div className="mb-3">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Requirements:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {scholarship.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{scholarship.applicants} applicants</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>Competitive</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 mt-4 lg:mt-0 lg:ml-6">
                  <button
                    onClick={() => handleApply(scholarship.id)}
                    className="btn-primary flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Apply Now
                  </button>
                  <button className="btn-secondary flex items-center justify-center gap-2">
                    <Award className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Application Tips */}
      <div className="card bg-green-50 border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-3">Scholarship Application Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-800">
          <div>
            <h4 className="font-medium mb-1">✓ Start Early</h4>
            <p>Begin your applications well before deadlines to avoid last-minute rush.</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">✓ Read Requirements Carefully</h4>
            <p>Ensure you meet all eligibility criteria before applying.</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">✓ Prepare Strong Essays</h4>
            <p>Write compelling personal statements that highlight your achievements.</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">✓ Gather Documents</h4>
            <p>Keep all required documents ready: transcripts, certificates, income proof.</p>
          </div>
        </div>
      </div>

      {/* Financial Aid Resources */}
      <div className="card bg-blue-50 border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Additional Financial Aid Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white rounded-lg">
            <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-medium text-blue-900 mb-1">Education Loans</h4>
            <p className="text-sm text-blue-700">Low-interest loans for higher education</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg">
            <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-medium text-blue-900 mb-1">Merit Awards</h4>
            <p className="text-sm text-blue-700">Recognition for academic excellence</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-medium text-blue-900 mb-1">Mentorship</h4>
            <p className="text-sm text-blue-700">Guidance for career and education</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scholarships;

