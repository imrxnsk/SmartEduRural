import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Building, 
  Calendar, 
  Filter, 
  Search,
  Star,
  ExternalLink,
  Bookmark,
  Users,
  TrendingUp
} from 'lucide-react';

const JobOpportunities = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  // Mock job data - in real app, this would come from API
  const jobCategories = [
    { id: 'all', name: 'All Categories', count: 45 },
    { id: 'technology', name: 'Technology', count: 12 },
    { id: 'education', name: 'Education', count: 8 },
    { id: 'healthcare', name: 'Healthcare', count: 6 },
    { id: 'government', name: 'Government', count: 10 },
    { id: 'agriculture', name: 'Agriculture', count: 9 }
  ];

  const locations = [
    { id: 'all', name: 'All Locations' },
    { id: 'rural', name: 'Rural Areas' },
    { id: 'urban', name: 'Urban Areas' },
    { id: 'remote', name: 'Remote Work' }
  ];

  const jobOpportunities = [
    {
      id: 1,
      title: 'Software Developer',
      company: 'Tech Solutions Pvt Ltd',
      location: 'Remote',
      type: 'Full-time',
      salary: '₹4,00,000 - ₹6,00,000',
      category: 'technology',
      postedDate: '2025-01-15',
      description: 'Looking for a skilled software developer to work on web applications. Experience with React, Node.js required.',
      requirements: ['Bachelor\'s degree in Computer Science', '2+ years experience', 'React, Node.js knowledge'],
      isBookmarked: false,
      isFeatured: true,
      applicants: 45
    },
    {
      id: 2,
      title: 'Rural School Teacher',
      company: 'Rural Education Foundation',
      location: 'Village School, Bihar',
      type: 'Full-time',
      salary: '₹2,50,000 - ₹3,50,000',
      category: 'education',
      postedDate: '2025-01-14',
      description: 'Join our mission to provide quality education in rural areas. Teaching position for Mathematics and Science.',
      requirements: ['B.Ed or equivalent', 'Subject expertise', 'Passion for rural education'],
      isBookmarked: true,
      isFeatured: false,
      applicants: 23
    },
    {
      id: 3,
      title: 'Agricultural Extension Officer',
      company: 'Department of Agriculture',
      location: 'Rural District, UP',
      type: 'Government',
      salary: '₹3,00,000 - ₹4,00,000',
      category: 'agriculture',
      postedDate: '2025-01-13',
      description: 'Help farmers adopt modern agricultural practices and technologies.',
      requirements: ['Degree in Agriculture', 'Field experience', 'Communication skills'],
      isBookmarked: false,
      isFeatured: true,
      applicants: 67
    },
    {
      id: 4,
      title: 'Community Health Worker',
      company: 'Rural Health Initiative',
      location: 'Remote Villages, MP',
      type: 'Full-time',
      salary: '₹2,00,000 - ₹3,00,000',
      category: 'healthcare',
      postedDate: '2025-01-12',
      description: 'Provide basic healthcare services in rural communities.',
      requirements: ['Health-related degree', 'Community work experience', 'Local language proficiency'],
      isBookmarked: false,
      isFeatured: false,
      applicants: 34
    },
    {
      id: 5,
      title: 'Digital Marketing Specialist',
      company: 'Rural Digital Solutions',
      location: 'Remote',
      type: 'Part-time',
      salary: '₹1,50,000 - ₹2,50,000',
      category: 'technology',
      postedDate: '2025-01-11',
      description: 'Help rural businesses establish their online presence.',
      requirements: ['Marketing degree', 'Digital marketing experience', 'Creative thinking'],
      isBookmarked: true,
      isFeatured: false,
      applicants: 28
    }
  ];

  const filteredJobs = jobOpportunities.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || 
                           (selectedLocation === 'rural' && job.location.includes('Rural')) ||
                           (selectedLocation === 'urban' && !job.location.includes('Rural') && !job.location.includes('Remote')) ||
                           (selectedLocation === 'remote' && job.location.includes('Remote'));
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const handleBookmark = (jobId) => {
    // In real app, this would update the backend
    console.log('Bookmark toggled for job:', jobId);
  };

  const handleApply = (jobId) => {
    // In real app, this would redirect to application form
    alert('Application feature coming soon!');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Job Opportunities</h1>
        <p className="text-primary-100">
          Discover career opportunities that match your skills and interests. Find jobs in rural development, education, and technology.
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
                placeholder="Search jobs, companies, or keywords..."
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
              {jobCategories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div className="lg:w-48">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {locations.map(location => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Jobs</p>
              <p className="text-2xl font-bold text-gray-900">{jobOpportunities.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Featured Jobs</p>
              <p className="text-2xl font-bold text-gray-900">{jobOpportunities.filter(job => job.isFeatured).length}</p>
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
              <p className="text-2xl font-bold text-gray-900">{jobOpportunities.filter(job => job.isBookmarked).length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Bookmark className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="card text-center py-12">
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className={`card ${job.isFeatured ? 'ring-2 ring-yellow-400 bg-yellow-50' : ''}`}>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        {job.title}
                        {job.isFeatured && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </span>
                        )}
                      </h3>
                      <p className="text-gray-600 font-medium">{job.company}</p>
                    </div>
                    <button
                      onClick={() => handleBookmark(job.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        job.isBookmarked 
                          ? 'bg-primary-100 text-primary-600' 
                          : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                      }`}
                    >
                      <Bookmark className={`w-5 h-5 ${job.isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Posted {job.postedDate}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-3">{job.description}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{job.applicants} applicants</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      <span className="capitalize">{job.category}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 mt-4 lg:mt-0 lg:ml-6">
                  <button
                    onClick={() => handleApply(job.id)}
                    className="btn-primary flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Apply Now
                  </button>
                  <button className="btn-secondary flex items-center justify-center gap-2">
                    <Building className="w-4 h-4" />
                    View Company
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Tips */}
      <div className="card bg-blue-50 border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Job Search Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h4 className="font-medium mb-1">✓ Update Your Profile</h4>
            <p>Make sure your profile is complete with skills and experience.</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">✓ Customize Applications</h4>
            <p>Tailor your application to match job requirements.</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">✓ Network Actively</h4>
            <p>Connect with professionals in your field of interest.</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">✓ Follow Up</h4>
            <p>Send follow-up emails after applying for positions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobOpportunities;

