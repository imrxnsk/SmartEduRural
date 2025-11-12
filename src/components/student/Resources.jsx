import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import { Search, Download, BookOpen, FileText, Video, Image, Filter, Grid, List } from 'lucide-react';

const Resources = () => {
  const { user } = useAuth();
  const { t, i18n: i18nInstance } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  // Mock data - in real app, this would come from API
  const resources = [
    {
      id: 1,
      title: t('mathematics') + ' - ' + t('algebraBasics'),
      description: t('algebraBasicsDesc'),
      type: 'pdf',
        category: 'mathematics',
        size: '2.4 MB',
        downloads: 156,
        rating: 4.8,
        author: 'Dr. Priya Sharma',
        date: '2024-01-10'
      },
      {
        id: 2,
        title: t('science') + ' - ' + t('photosynthesisProcess'),
        description: t('photosynthesisDesc'),
        type: 'video',
        category: 'science',
        size: '45.2 MB',
        downloads: 89,
        rating: 4.6,
        author: 'Prof. Rajesh Kumar',
        date: '2024-01-08'
      },
      {
        id: 3,
        title: t('english') + ' - ' + t('grammarRules'),
        description: t('grammarDesc'),
        type: 'pdf',
        category: 'english',
        size: '1.8 MB',
        downloads: 203,
        rating: 4.9,
        author: 'Ms. Anita Singh',
        date: '2024-01-12'
      },
      {
        id: 4,
        title: t('history') + ' - ' + t('indianIndependence'),
        description: t('independenceDesc'),
        type: 'image',
        category: 'history',
        size: '3.1 MB',
        downloads: 67,
        rating: 4.5,
        author: 'Dr. Suresh Patel',
        date: '2024-01-05'
      },
      {
        id: 5,
        title: t('physics') + ' - ' + t('motionAndForce'),
        description: t('motionDesc'),
        type: 'video',
        category: 'science',
        size: '38.7 MB',
        downloads: 124,
        rating: 4.7,
        author: 'Dr. Meera Joshi',
        date: '2024-01-14'
      },
      {
        id: 6,
        title: t('geography') + ' - ' + t('worldMaps'),
        description: t('mapsDesc'),
        type: 'image',
        category: 'geography',
        size: '5.2 MB',
        downloads: 98,
        rating: 4.4,
        author: 'Prof. Vikram Singh',
        date: '2024-01-11'
      }
    ];
  const categories = [
    { value: 'all', label: t('allSubjects') },
    { value: 'mathematics', label: t('mathematics') },
    { value: 'science', label: t('science') },
    { value: 'english', label: t('english') },
    { value: 'history', label: t('history') },
    { value: 'geography', label: t('geography') }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'pdf': return <FileText className="w-5 h-5 text-red-500" />;
      case 'video': return <Video className="w-5 h-5 text-blue-500" />;
      case 'image': return <Image className="w-5 h-5 text-green-500" />;
      default: return <BookOpen className="w-5 h-5 text-gray-500" />;
    }
  };

  const [showLangModal, setShowLangModal] = useState(false);
  const [pendingResource, setPendingResource] = useState(null);
  const [selectedLang, setSelectedLang] = useState('');
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [infoPanelLang, setInfoPanelLang] = useState('');
  const availableLangs = ['en', 'hi', 'te', 'kn'];

  const handleDownload = (resource) => {
    setPendingResource(resource);
    setShowLangModal(true);
  };

  const confirmDownload = () => {
    if (!pendingResource || !selectedLang) return;
    let resource = pendingResource;
    // Create a mock file content based on resource type
    let content = '';
    let mimeType = '';
    let fileName = `${resource.title}.${resource.type}`;
    const tSel = i18nInstance.getFixedT(selectedLang, 'translation');
    
    switch (resource.type) {
      case 'pdf':
        if (resource.id === 1) {
          // Mathematics - Algebra Basics (language-aware)
          const L = (k, d) => tSel(k, d);
          const mat = L('mathematics', 'Mathematics');
          const title = L('algebraBasics', 'Algebra Basics');
          const desc = L('algebraBasicsDesc', 'Complete guide to algebraic expressions and equations');
          const topicsTitle = L('topicsCovered', 'Topics Covered:');
          const topics = L('algebraBasicsTopics', '- Algebraic Expressions\n- Equations\n- Solving for Variables\n- Word Problems');
          const usageTitle = L('howToUse', 'How to Use This Material:');
          const usage = L('algebraBasicsUsage', '1. Read through the examples carefully.\n2. Try solving the practice problems at the end of each section.\n3. Review the summary notes for quick revision.\n4. If you have questions, ask your mentor for help!');
          const motivationTitle = L('motivation', 'Motivation:');
          const motivation = L('algebraBasicsMotivation', '"Every expert in mathematics was once a beginner. Keep practicing and you will succeed!"');
          const authorLabel = L('author', 'Author');
          content = `${mat} - ${title}\n\n${desc}\n\n${authorLabel}: Dr. Priya Sharma\n\n${topicsTitle}\n${topics}\n\n${usageTitle}\n${usage}\n\n${motivationTitle}\n${motivation}`;
          mimeType = 'text/plain';
          fileName = `${mat}-${title}.txt`;
        } else if (resource.id === 3) {
          // English - Grammar Rules (language-aware)
          const L = (k, d) => tSel(k, d);
          const eng = L('english', 'English');
          const title = L('grammarRules', 'Grammar Rules');
          const desc = L('grammarDesc', 'Comprehensive grammar guide with examples');
          const topicsTitle = L('topicsCovered', 'Topics Covered:');
          const topics = L('grammarTopics', '- Parts of Speech\n- Tenses\n- Sentence Structure\n- Common Mistakes');
          const usageTitle = L('howToUse', 'How to Use This Material:');
          const usage = L('grammarUsage', '1. Read the rules and examples carefully.\n2. Practice with the exercises provided.\n3. Review the summary notes for revision.\n4. Ask your mentor if you have questions!');
          const motivationTitle = L('motivation', 'Motivation:');
          const motivation = L('grammarMotivation', '"Good grammar opens doors to great opportunities!"');
          const authorLabel = L('author', 'Author');
          content = `${eng} - ${title}\n\n${desc}\n\n${authorLabel}: Ms. Anita Singh\n\n${topicsTitle}\n${topics}\n\n${usageTitle}\n${usage}\n\n${motivationTitle}\n${motivation}`;
          mimeType = 'text/plain';
          fileName = `${eng}-${title}.txt`;
        } else {
          // Generic localized text export
          const header = tSel('resources', 'Resources');
          const authorLabel = tSel('author', 'Author');
          content = `${header}: ${resource.title}\n${authorLabel}: ${resource.author}\n${resource.description}`;
          mimeType = 'text/plain';
          fileName = `${header}-${resource.id}.txt`;
        }
        break;
      case 'video':
        // Create a simple video placeholder
        content = `# Video Content: ${resource.title}\n\nThis is a placeholder for the video file.\nIn a real application, this would be the actual video content.`;
        mimeType = 'video/mp4';
        fileName = `${resource.title}.mp4`;
        break;
      case 'image':
        // Create a simple image placeholder
        content = `# Image Content: ${resource.title}\n\nThis is a placeholder for the image file.\nIn a real application, this would be the actual image content.`;
        mimeType = 'image/jpeg';
        fileName = `${resource.title}.jpg`;
        break;
      default:
        content = `# ${resource.title}\n\n${resource.description}\n\nAuthor: ${resource.author}\nDate: ${resource.date}\nSize: ${resource.size}\nDownloads: ${resource.downloads}\nRating: ${resource.rating}`;
        mimeType = 'text/plain';
        fileName = `${resource.title}.txt`;
    }
    
    // Create and trigger download
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    setShowLangModal(false);
    setPendingResource(null);
    setSelectedLang('');
    // Show info panel only for the first material
    if (resource.title === 'Mathematics - Algebra Basics') {
      setShowInfoPanel(true);
      setInfoPanelLang(selectedLang);
    }
    // Show success message
    alert(`Downloaded ${resource.title} in ${selectedLang} successfully!`);

    // Track resource access for student dashboard stats
    try {
      const key = `smartedurural_resources_accessed_${user?.id || 'guest'}`;
      const prev = parseInt(localStorage.getItem(key) || '0', 10) || 0;
      localStorage.setItem(key, String(prev + 1));
    } catch (e) {
      // ignore
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6 flex flex-col lg:flex-row">
  {/* Main Content */}
  <div className="flex-1">
  {/* Header */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('resources')}</h1>
          <p className="text-gray-600 mt-1">{t('resourcesDesc')}</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="sm:w-48">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field pl-10 appearance-none"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Resources Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div key={resource.id} className="card hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(resource.type)}
                  <span className="text-sm font-medium text-gray-600 capitalize">{resource.type}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-400">★</span>
                  <span className="text-sm text-gray-600">{resource.rating}</span>
                </div>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{resource.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{resource.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Size: {resource.size}</span>
                  <span>{resource.downloads} downloads</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>By {resource.author}</span>
                  <span>{resource.date}</span>
                </div>
              </div>

              <button 
                onClick={() => handleDownload(resource)}
                className="w-full btn-primary flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>{t('download')}</span>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredResources.map((resource) => (
            <div key={resource.id} className="card hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    {getTypeIcon(resource.type)}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{resource.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Size: {resource.size}</span>
                        <span>{resource.downloads} downloads</span>
                        <span>By {resource.author}</span>
                        <span>{resource.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 ml-4">
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm text-gray-600">{resource.rating}</span>
                      </div>
                      <button 
                        onClick={() => handleDownload(resource)}
                        className="btn-primary flex items-center space-x-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>{t('download')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t('noResourcesFound')}</h3>
          <p className="text-gray-600">{t('tryAdjustingSearch')}</p>
        </div>
      )}
    {/* Language Selection Modal */}
    {showLangModal && (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full">
          <h3 className="font-semibold mb-2">{t('selectLanguage')}</h3>
          <select
            className="w-full border p-2 rounded mb-4"
            value={selectedLang}
            onChange={e => setSelectedLang(e.target.value)}
          >
            <option value="">{t('chooseLanguage')}</option>
            {availableLangs.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
          <div className="flex justify-end space-x-2">
            <button
              className="btn-secondary px-3 py-1 rounded"
              onClick={() => { setShowLangModal(false); setPendingResource(null); setSelectedLang(''); }}
            >{t('cancel')}</button>
            <button
              className="btn-primary px-3 py-1 rounded"
              disabled={!selectedLang}
              onClick={confirmDownload}
            >{t('download')}</button>
          </div>
        </div>
      </div>
    )}
      </div>
      {/* Info Panel for Downloaded Material */}
      {showInfoPanel && (
        <div className="w-full lg:w-80 lg:ml-6 mt-8 lg:mt-0 card bg-blue-50 border border-blue-200">
          <h2 className="text-lg font-bold mb-2">{i18nInstance.getResource(infoPanelLang, 'translation', 'mathematics') || 'Mathematics'} - {i18nInstance.getResource(infoPanelLang, 'translation', 'algebraBasics') || 'Algebra Basics'}</h2>
          <p className="mb-2 text-gray-700">{i18nInstance.getResource(infoPanelLang, 'translation', 'algebraBasicsDesc') || 'Complete guide to algebraic expressions and equations'}</p>
          <p className="mb-2 text-gray-600 text-sm">{t('author')}: Dr. Priya Sharma</p>
          <button className="btn-secondary mt-2" onClick={() => setShowInfoPanel(false)}>{t('close')}</button>
        </div>
      )}
    </div>
  );
};

export default Resources;
