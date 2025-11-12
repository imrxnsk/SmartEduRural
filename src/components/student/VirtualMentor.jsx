import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, Bot, User, Loader2, MessageCircle, Lightbulb, BookOpen, HelpCircle, Globe, Languages } from 'lucide-react';
import { detectLanguageSmart as detectLanguage, getLanguageName, containsNonLatinCharacters, isLikelyLanguage } from '../../utils/languageDetection';
import { generateMultilingualResponse } from '../../utils/multilingualResponses';
import { answerLocally } from '../../utils/localNLP';
import { answerFromWeb } from '../../utils/webAnswers';

const VirtualMentor = () => {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: t('mentorWelcome'),
      timestamp: new Date(),
      language: i18n.language
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState(i18n.language);
  const [showLanguageInfo, setShowLanguageInfo] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // When UI language changes, update the initial bot welcome message to the new language
  useEffect(() => {
    setMessages(prev => {
      if (!prev.length) return prev;
      const first = prev[0];
      if (first.type !== 'bot') return prev;
      const updatedFirst = { ...first, content: t('mentorWelcome'), language: i18n.language };
      return [updatedFirst, ...prev.slice(1)];
    });
  }, [i18n.language, t]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    // Detect language from user input
    const userLanguage = detectLanguage(inputMessage);
    setDetectedLanguage(userLanguage);

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      language: userLanguage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Web-first answering: Wikipedia/DDG, then multilingual fallback, then generic local
    try {
      // Answer in the user's detected language; fall back to selected UI language
      const langForAnswer = userLanguage || i18n.language;

      // Race: web answer with a timeout to speed responses
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout for better non-English fetches
      // Try web in selected language first; if result looks English while UI is non-English, disregard
      let content = await answerFromWeb(userMessage.content, langForAnswer, controller.signal);
      clearTimeout(timeoutId);


      // Prefer concrete multilingual responses before generic local template
      if (!content) content = generateMultilingualResponse(userMessage.content, langForAnswer);
      if (!content) content = answerLocally(userMessage.content, langForAnswer);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content,
        timestamp: new Date(),
        language: langForAnswer
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      const langForAnswer = userLanguage || i18n.language;
      const fallback = generateMultilingualResponse(userMessage.content, langForAnswer);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: fallback,
        timestamp: new Date(),
        language: langForAnswer
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };


  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    { en: 'What is the Pythagorean theorem?', hi: 'पाइथागोरस प्रमेय क्या है?', te: 'పైథాగరస్ సిద్ధాంతం అంటే ఏమిటి?', kn: 'ಪೈಥಾಗರಸ್ ಪ್ರಮೇಯ ಎಂದರೇನು?', ta: 'பைதகோரஸ் கோட்பாடு என்ன?' },
    { en: 'Explain Newton\'s laws of motion.', hi: 'न्यूटन के गति के नियमों की व्याख्या करें।', te: 'న్యూటన్ చలన నియమాలను వివరించండి.', kn: 'ನ್ಯೂಟನ್‌ನ ಚಲನೆಯ ನಿಯಮಗಳನ್ನು ವಿವರಿಸಿ.', ta: 'நியூட்டனின் இயக்க விதிகளை விளக்குங்கள்.' },
    { en: 'How does photosynthesis work?', hi: 'प्रकाश संश्लेषण कैसे काम करता है?', te: 'ప్రకాశ సంశ్లేషణ ఎలా పనిచేస్తుంది?', kn: 'ಪ್ರಕಾಶ ಸಂಶ್ಲೇಷಣೆ ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ?', ta: 'ஒளிச்சேர்க்கை எப்படி செயல்படுகிறது?' },
    { en: 'Tips to improve English writing skills?', hi: 'अंग्रेज़ी लेखन कौशल सुधारने के सुझाव?', te: 'ఇంగ్లీష్ రాయడం నైపుణ్యాలను మెరుగుపరచడానికి సూచనలు?', kn: 'ಇಂಗ್ಲಿಷ್ ಬರವಣಿಗೆ ಕೌಶಲ್ಯಗಳನ್ನು ಸುಧಾರಿಸಲು ಸಲಹೆಗಳು?', ta: 'ஆங்கில எழுத்துத் திறனை மேம்படுத்த குறிப்புகள்?' },
    { en: 'How to prepare for board exams?', hi: 'बोर्ड परीक्षाओं की तैयारी कैसे करें?', te: 'బోర్డ్ పరీక్షలకు ఎలా సిద్ధం కావాలి?', kn: 'ಬೋರ್ಡ್ ಪರೀಕ್ಷೆಗಳಿಗೆ ಹೇಗೆ ಸಿದ್ಧತೆ ಮಾಡಿಕೊಳ್ಳಬೇಕು?', ta: 'போர்டு தேர்வுகளுக்காக எப்படி தயாராகுவது?' },
    { en: 'What is the difference between speed and velocity?', hi: 'गति और वेग में क्या अंतर है?', te: 'వేగం మరియు వేగం మధ్య తేడా ఏమిటి?', kn: 'ವೇಗ ಮತ್ತು ವೇಗದ ನಡುವೆ ಯಾವ ವ್ಯತ್ಯಾಸವಿದೆ?', ta: 'வேகம் மற்றும் திசைவேகம் என்ன வித்தியாசம்?' },
    { en: 'Explain the water cycle.', hi: 'जल चक्र की व्याख्या करें।', te: 'నీటి చక్రాన్ని వివరించండి.', kn: 'ನೀರಿನ ಚಕ್ರವನ್ನು ವಿವರಿಸಿ.', ta: 'நீர்சுழற்சியை விளக்குங்கள்.' },
    { en: 'How to remember historical dates?', hi: 'ऐतिहासिक तिथियों को कैसे याद रखें?', te: 'చారిత్రక తేదీలను ఎలా గుర్తుంచుకోవాలి?', kn: 'ಐತಿಹಾಸಿಕ ದಿನಾಂಕಗಳನ್ನು ಹೇಗೆ ನೆನಪಿಡಬೇಕು?', ta: 'வரலாற்றுத் தேதிகளை எப்படி நினைவில் வைத்துக் கொள்ளலாம்?' },
    { en: 'What are common grammar mistakes in English?', hi: 'अंग्रेज़ी में सामान्य व्याकरण की गलतियाँ क्या हैं?', te: 'ఇంగ్లీష్‌లో సాధారణ వ్యాకరణ తప్పులు ఏమిటి?', kn: 'ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಸಾಮಾನ್ಯ ವ್ಯಾಕರಣ ತಪ್ಪುಗಳು ಯಾವುವು?', ta: 'ஆங்கிலத்தில் பொதுவான இலக்கணப் பிழைகள் என்ன?' }
  ];

  const handleQuickQuestion = (question) => {
    const questionText = question[i18n.language] || question.en;
    setInputMessage(questionText);
  };

  const getQuestionText = (question) => {
    return question[i18n.language] || question.en;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('virtualMentorTitle')}</h1>
            <p className="text-gray-600">{t('virtualMentorDesc')}</p>
          </div>
        </div>
        
        {/* Language Detection Info */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowLanguageInfo(!showLanguageInfo)}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors duration-200"
          >
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium">
              {getLanguageName(detectedLanguage)}
            </span>
          </button>
        </div>
      </div>

      {/* Language Info Panel */}
      {showLanguageInfo && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Languages className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">{t('multilingualSupport')}</h3>
          </div>
          <p className="text-sm text-blue-700 mb-2">
            {t('askInAnyLanguage')}
          </p>
          <div className="flex flex-wrap gap-2">
            {['English', 'Hindi', 'Telugu', 'Kannada', 'Bengali', 'Gujarati', 'Marathi', 'Tamil', 'Malayalam'].map((lang) => (
              <span key={lang} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {lang}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Quick Questions */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">{t('quickQuestions')}</h2>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(question)}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors duration-200"
            >
              {getQuestionText(question)}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Interface */}
      <div className="card p-0 overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white">
          <div className="flex items-center space-x-3">
            <Bot className="w-6 h-6" />
            <div>
              <h3 className="font-semibold">{t('aiMentor')}</h3>
              <p className="text-sm text-purple-100">{t('aiMentorDesc')}</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.type === 'bot' && (
                    <Bot className="w-4 h-4 mt-1 flex-shrink-0" />
                  )}
                  {message.type === 'user' && (
                    <User className="w-4 h-4 mt-1 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className={`text-xs ${
                        message.type === 'user' ? 'text-primary-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      {message.language && message.language !== 'en' && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          message.type === 'user' 
                            ? 'bg-primary-500 text-white' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {getLanguageName(message.language)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4" />
                  <div className="flex items-center space-x-1">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">{t('thinking')}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-2">
            <div className="flex-1">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`${t('mentorInputPlaceholder')} (Ask in any language!)`}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                rows="2"
                disabled={isLoading}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="btn-primary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Tips and Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Lightbulb className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">{t('studyTips')}</h3>
          <p className="text-sm text-gray-600">{t('studyTipsDesc')}</p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <BookOpen className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">{t('subjectHelp')}</h3>
          <p className="text-sm text-gray-600">{t('subjectHelpDesc')}</p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <HelpCircle className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">{t('support247')}</h3>
          <p className="text-sm text-gray-600">{t('support247Desc')}</p>
        </div>
      </div>
    </div>
  );
};

export default VirtualMentor;
