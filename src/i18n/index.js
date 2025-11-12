import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      // Virtual Mentor keys
      virtualMentorTitle: 'AI Mentor',
      virtualMentorDesc: 'Always here to help you learn',
      aiMentor: 'Smart Mentor',
      aiMentorDesc: 'Your personalized guide for every subject',
      quickQuestions: 'Quick Questions',
      mentorWelcome: "Hello! I'm your virtual mentor. I'm here to help you with your studies, answer questions, and provide guidance. What would you like to know?",
      mentorInputPlaceholder: 'Ask me anything about your studies...',
      thinking: 'Thinking...',
      studyTips: 'Study Tips',
      studyTipsDesc: 'Get personalized study strategies and learning techniques',
      subjectHelp: 'Subject Help',
      subjectHelpDesc: 'Ask questions about any subject - Math, Science, English, and more',
      support247: '24/7 Support',
      support247Desc: 'Available anytime to help with your learning journey',
      multilingualSupport: 'Multilingual Support',
      askInAnyLanguage: 'Ask questions in any language! I can understand and respond in:',
      languageDetected: 'Language Detected',
      supportedLanguages: 'Supported Languages',
      // Dashboard keys
      welcome: 'Welcome',
      dashboardWelcomeNew: 'Let\'s get started on your learning journey! Take your first test to begin.',
      dashboardWelcomeStreak: 'You are on a {streak}-day learning streak! Keep it up!',
      dashboardNoTests: 'No tests taken yet.',
      dashboardTakeFirstTest: 'Take your first test',
      dashboardNotTaken: 'Not taken yet',
      completed: 'Completed',
      pending: 'Pending',
      // Resources page keys
      resources: 'Resources',
      resourcesDesc: 'Download study materials, videos, and guides for all subjects.',
      searchPlaceholder: 'Search resources...',
      allSubjects: 'All Subjects',
      mathematics: 'Mathematics',
      science: 'Science',
      english: 'English',
      history: 'History',
      physics: 'Physics',
      geography: 'Geography',
      topicsCovered: 'Topics Covered:',
      howToUse: 'How to Use This Material:',
      motivation: 'Motivation:',
      // Resource-specific (Algebra Basics)
      algebraBasics: 'Algebra Basics',
      algebraBasicsDesc: 'Complete guide to algebraic expressions and equations',
      algebraBasicsTopics: '- Algebraic Expressions\n- Equations\n- Solving for Variables\n- Word Problems',
      algebraBasicsUsage: '1. Read through the examples carefully.\n2. Try solving the practice problems at the end of each section.\n3. Review the summary notes for quick revision.\n4. If you have questions, ask your mentor for help!',
      algebraBasicsMotivation: '"Every expert in mathematics was once a beginner. Keep practicing and you will succeed!"',
      // Resource-specific (Grammar Rules)
      grammarRules: 'Grammar Rules',
      grammarDesc: 'Comprehensive grammar guide with examples',
      grammarTopics: '- Parts of Speech\n- Tenses\n- Sentence Structure\n- Common Mistakes',
      grammarUsage: '1. Read the rules and examples carefully.\n2. Practice with the exercises provided.\n3. Review the summary notes for revision.\n4. Ask your mentor if you have questions!',
      grammarMotivation: '"Good grammar opens doors to great opportunities!"',
      noResourcesFound: 'No resources found',
      tryAdjustingSearch: 'Try adjusting your search or filter criteria',
      selectLanguage: 'Select Language',
      chooseLanguage: 'Choose language',
      cancel: 'Cancel',
      download: 'Download',
      close: 'Close',
      author: 'Author',
      // Navigation keys
      dashboard: 'Dashboard',
      tests: 'Tests',
      leaderboard: 'Leaderboard',
      mentor: 'AI Mentor',
      notifications: 'Notifications',
      students: 'Students',
      reports: 'Reports',
      student: 'Student',
      teacher: 'Teacher',
      parent: 'Parent',
      // Additional navigation
      jobOpportunities: 'Job Opportunities',
      scholarships: 'Scholarships',
      sessions: '1:1 Sessions',
      children: 'Children',
      calendar: 'Calendar',
      // Quick Actions
      quickActions: 'Quick Actions',
      downloadResources: 'Download Resources',
      askMentor: 'Ask Mentor',
      createTest: 'Create Test',
      uploadResource: 'Upload Resource',
      viewReports: 'View Reports',
      enableSMSAlerts: 'Enable SMS Alerts',
      // Header
      goodMorning: 'Good Morning',
      goodAfternoon: 'Good Afternoon',
      goodEvening: 'Good Evening',
      logout: 'Logout',
      userPortal: 'Portal'
    }
  },
  hi: {
    translation: {
      // Virtual Mentor keys (Hindi)
      virtualMentorTitle: 'वर्चुअल मेंटर',
      virtualMentorDesc: 'आपका एआई-संचालित अध्ययन साथी',
      aiMentor: 'एआई मेंटर',
      aiMentorDesc: 'हमेशा आपकी मदद के लिए तैयार',
      quickQuestions: 'त्वरित प्रश्न',
      mentorWelcome: "नमस्ते! मैं आपका वर्चुअल मेंटर हूँ। मैं आपकी पढ़ाई, सवालों और मार्गदर्शन में मदद करने के लिए यहाँ हूँ। आप क्या जानना चाहेंगे?",
      mentorInputPlaceholder: 'अपनी पढ़ाई से संबंधित कुछ भी पूछें...',
      thinking: 'सोच रहा हूँ...',
      studyTips: 'अध्ययन सुझाव',
      studyTipsDesc: 'व्यक्तिगत अध्ययन रणनीतियाँ और तकनीकें प्राप्त करें',
      subjectHelp: 'विषय सहायता',
      subjectHelpDesc: 'किसी भी विषय के बारे में पूछें - गणित, विज्ञान, अंग्रेज़ी और अधिक',
      support247: '24/7 सहायता',
      support247Desc: 'आपकी अध्ययन यात्रा में कभी भी मदद के लिए उपलब्ध',
      multilingualSupport: 'बहुभाषी सहायता',
      askInAnyLanguage: 'किसी भी भाषा में प्रश्न पूछें! मैं समझ सकता हूँ और जवाब दे सकता हूँ:',
      languageDetected: 'भाषा का पता चला',
      supportedLanguages: 'समर्थित भाषाएं',
      // Dashboard keys
      welcome: 'स्वागत है',
      dashboardWelcomeNew: 'आइए अपनी सीखने की यात्रा शुरू करें! शुरू करने के लिए अपना पहला टेस्ट दें।',
      dashboardWelcomeStreak: 'आप {streak}-दिन की सीखने की स्ट्रीक पर हैं! ऐसे ही जारी रखें!',
      dashboardNoTests: 'अभी तक कोई टेस्ट नहीं दिया गया है।',
      dashboardTakeFirstTest: 'अपना पहला टेस्ट दें',
      dashboardNotTaken: 'अभी तक नहीं दिया गया',
      completed: 'पूर्ण',
      pending: 'लंबित',
      // Resources page keys
      resources: 'संसाधन',
      resourcesDesc: 'सभी विषयों के लिए अध्ययन सामग्री, वीडियो और गाइड डाउनलोड करें।',
      searchPlaceholder: 'संसाधनों को खोजें...',
      allSubjects: 'सभी विषय',
      mathematics: 'गणित',
      science: 'विज्ञान',
      english: 'अंग्रेज़ी',
      history: 'इतिहास',
      physics: 'भौतिकी',
      geography: 'भूगोल',
      topicsCovered: 'विषय सूची:',
      howToUse: 'इस सामग्री का उपयोग कैसे करें:',
      motivation: 'प्रेरणा:',
      algebraBasics: 'बीजगणित की मूल बातें',
      algebraBasicsDesc: 'बीजगणितीय व्यंजकों और समीकरणों की संपूर्ण मार्गदर्शिका',
      algebraBasicsTopics: '- बीजगणितीय व्यंजक\n- समीकरण\n- चर के लिए हल करना\n- शब्द समस्याएं',
      algebraBasicsUsage: '1. उदाहरणों को ध्यान से पढ़ें।\n2. प्रत्येक भाग के अंत में दिए गए अभ्यास प्रश्न हल करें।\n3. त्वरित पुनरावृत्ति के लिए सारांश नोट्स देखें।\n4. कोई प्रश्न हो तो अपने मेंटर से पूछें!',
      algebraBasicsMotivation: '"हर विशेषज्ञ कभी एक शुरुआती था। अभ्यास करते रहें और आप सफल होंगे!"',
      grammarRules: 'व्याकरण के नियम',
      grammarDesc: 'उदाहरणों के साथ व्यापक व्याकरण मार्गदर्शिका',
      grammarTopics: '- शब्द भेद\n- काल\n- वाक्य रचना\n- सामान्य गलतियाँ',
      grammarUsage: '1. नियम और उदाहरण ध्यान से पढ़ें।\n2. दिए गए अभ्यासों के साथ अभ्यास करें।\n3. पुनरावृत्ति के लिए सारांश नोट्स देखें।\n4. सवाल होने पर मेंटर से पूछें!',
      grammarMotivation: '"अच्छा व्याकरण बड़ी संभावनाओं के द्वार खोलता है!"',
      noResourcesFound: 'कोई संसाधन नहीं मिला',
      tryAdjustingSearch: 'अपनी खोज या फ़िल्टर मानदंड समायोजित करने का प्रयास करें',
      selectLanguage: 'भाषा चुनें',
      chooseLanguage: 'भाषा चुनें',
      cancel: 'रद्द करें',
      download: 'डाउनलोड',
      close: 'बंद करें',
      author: 'लेखक',
      // Navigation keys
      dashboard: 'डैशबोर्ड',
      tests: 'टेस्ट',
      leaderboard: 'लीडरबोर्ड',
      mentor: 'AI मेंटर',
      notifications: 'सूचनाएं',
      students: 'छात्र',
      reports: 'रिपोर्ट',
      student: 'छात्र',
      teacher: 'शिक्षक',
      parent: 'अभिभावक',
      // Additional navigation
      jobOpportunities: 'नौकरी के अवसर',
      scholarships: 'छात्रवृत्ति',
      sessions: '1:1 सत्र',
      children: 'बच्चे',
      calendar: 'कैलेंडर',
      // Quick Actions
      quickActions: 'त्वरित कार्य',
      downloadResources: 'संसाधन डाउनलोड करें',
      askMentor: 'मेंटर से पूछें',
      createTest: 'टेस्ट बनाएं',
      uploadResource: 'संसाधन अपलोड करें',
      viewReports: 'रिपोर्ट देखें',
      enableSMSAlerts: 'SMS अलर्ट सक्षम करें',
      // Header
      goodMorning: 'सुप्रभात',
      goodAfternoon: 'नमस्कार',
      goodEvening: 'सुसंध्या',
      logout: 'लॉगआउट',
      userPortal: 'पोर्टल'
    }
  },
  te: {
    translation: {
      // Virtual Mentor keys (Telugu)
      virtualMentorTitle: 'వర్చువల్ మెంటర్',
      virtualMentorDesc: 'మీ AI ఆధారిత అభ్యాస సహచరుడు',
      aiMentor: 'AI మెంటర్',
      aiMentorDesc: 'మీ అభ్యాసానికి ఎల్లప్పుడూ సహాయం',
      quickQuestions: 'త్వరిత ప్రశ్నలు',
      mentorWelcome: "హలో! నేను మీ వర్చువల్ మెంటర్‌ని. మీ అభ్యాసానికి, ప్రశ్నలకు, మార్గదర్శనానికి నేను ఇక్కడ ఉన్నాను. మీరు ఏమి తెలుసుకోవాలనుకుంటున్నారు?",
      mentorInputPlaceholder: 'మీ అభ్యాసం గురించి ఏదైనా అడగండి...',
      thinking: 'ఆలోచిస్తున్నాను...',
      studyTips: 'అభ్యాస సూచనలు',
      studyTipsDesc: 'వ్యక్తిగత అభ్యాస వ్యూహాలు మరియు పద్ధతులు పొందండి',
      subjectHelp: 'విషయ సహాయం',
      subjectHelpDesc: 'ఏదైనా విషయంపై అడగండి - గణితం, సైన్స్, ఇంగ్లీష్ మరియు మరిన్ని',
      support247: '24/7 సహాయం',
      support247Desc: 'మీ అభ్యాస ప్రయాణంలో ఎప్పుడైనా సహాయం అందుబాటులో ఉంది',
      multilingualSupport: 'బహుభాషా మద్దతు',
      askInAnyLanguage: 'ఏ భాషలోనైనా ప్రశ్నలు అడగండి! నేను అర్థం చేసుకోగలను మరియు సమాధానం ఇవ్వగలను:',
      languageDetected: 'భాష గుర్తించబడింది',
      supportedLanguages: 'మద్దతు ఇచ్చే భాషలు',
      // Dashboard keys
      welcome: 'స్వాగతం',
      dashboardWelcomeNew: 'మీ అభ్యాస ప్రయాణాన్ని ప్రారంభిద్దాం! ప్రారంభించడానికి మీ మొదటి పరీక్షను రాయండి.',
      dashboardWelcomeStreak: 'మీరు {streak} రోజుల అభ్యాస స్ట్రీక్‌లో ఉన్నారు! ఇలానే కొనసాగించండి!',
      dashboardNoTests: 'ఇంకా పరీక్షలు రాయలేదు.',
      dashboardTakeFirstTest: 'మీ మొదటి పరీక్షను రాయండి',
      dashboardNotTaken: 'ఇంకా రాయలేదు',
      completed: 'పూర్తయింది',
      pending: 'పెండింగ్',
      // Resources page keys
      resources: 'వనరులు',
      resourcesDesc: 'అన్ని విషయాల కోసం అధ్యయన పదార్థాలు, వీడియోలు మరియు మార్గదర్శకాలను డౌన్‌లోడ్ చేయండి.',
      searchPlaceholder: 'వనరులను శోధించండి...',
      allSubjects: 'అన్ని విషయాలు',
      mathematics: 'గణితం',
      science: 'సైన్స్',
      english: 'ఇంగ్లీష్',
      history: 'చరిత్ర',
      physics: 'భౌతిక శాస్త్రం',
      geography: 'భూగోళ శాస్త్రం',
      topicsCovered: 'కవర్ చేసిన అంశాలు:',
      howToUse: 'ఈ పదార్థాన్ని ఎలా ఉపయోగించాలి:',
      motivation: 'ప్రేరణ:',
      algebraBasics: 'అల్గెబ్రా మౌలికాలు',
      algebraBasicsDesc: 'అల్గెబ్రా వ్యక్తీకరణలు మరియు సమీకరణాలపై పూర్తి మార్గదర్శకం',
      algebraBasicsTopics: '- అల్గెబ్రా వ్యక్తీకరణలు\n- సమీకరణాలు\n- చర రాశులకు పరిష్కారం\n- పద సమస్యలు',
      algebraBasicsUsage: '1. ఉదాహరణలను శ్రద్ధగా చదవండి.\n2. ప్రతి విభాగం చివరిలో ఉన్న అభ్యాసాలను ప్రయత్నించండి.\n3. త్వరిత పునర్వివరణ కోసం సారాంశ గమనికలను చూడండి.\n4. ప్రశ్నలు ఉంటే మీ మెంటర్‌ను అడగండి!',
      algebraBasicsMotivation: '"ప్రతి నిపుణుడు ఒకప్పుడు ఆరంభదశలో ఉన్నాడు. సాధన కొనసాగించండీ — మీరు విజయవంతం అవుతారు!"',
      grammarRules: 'వ్యాకరణ నియమాలు',
      grammarDesc: 'ఉదాహరణలతో సమగ్ర వ్యాకరణ మార్గదర్శకం',
      grammarTopics: '- పదభాగాలు\n- కాలాలు\n- వాక్య నిర్మాణం\n- సాధారణ తప్పులు',
      grammarUsage: '1. నియమాలు మరియు ఉదాహరణలను శ్రద్ధగా చదవండి.\n2. ఇచ్చిన వ్యాయామాలతో అభ్యాసం చేయండి.\n3. పునర్వివరణ కోసం సారాంశ గమనికలను చూడండి.\n4. సందేహాలు ఉంటే మీ మెంటర్‌ను అడగండి!',
      grammarMotivation: '"మంచి వ్యాకరణం గొప్ప అవకాశాలకున్న తలుపులు తెరుస్తుంది!"',
      noResourcesFound: 'వనరులు కనబడలేదు',
      tryAdjustingSearch: 'మీ శోధన లేదా ఫిల్టర్ ప్రమాణాలను సర్దుబాటు చేయడానికి ప్రయత్నించండి',
      selectLanguage: 'భాషను ఎంచుకోండి',
      chooseLanguage: 'భాషను ఎంచుకోండి',
      cancel: 'రద్దు చేయండి',
      download: 'డౌన్‌లోడ్',
      close: 'మూసివేయండి',
      author: 'రచయిత',
      // Navigation keys
      dashboard: 'డాష్‌బోర్డ్',
      tests: 'పరీక్షలు',
      leaderboard: 'లీడర్‌బోర్డ్',
      mentor: 'AI మెంటర్',
      notifications: 'నోటిఫికేషన్‌లు',
      students: 'విద్యార్థులు',
      reports: 'రిపోర్ట్‌లు',
      student: 'విద్యార్థి',
      teacher: 'ఉపాధ్యాయుడు',
      parent: 'తల్లిదండ్రులు',
      // Additional navigation
      jobOpportunities: 'ఉద్యోగ అవకాశాలు',
      scholarships: 'విద్యార్థి వేతనాలు',
      sessions: '1:1 సెషన్‌లు',
      children: 'పిల్లలు',
      calendar: 'క్యాలెండర్',
      // Quick Actions
      quickActions: 'త్వరిత చర్యలు',
      downloadResources: 'వనరులను డౌన్‌లోడ్ చేయండి',
      askMentor: 'మెంటర్‌ను అడగండి',
      createTest: 'పరీక్ష సృష్టించండి',
      uploadResource: 'వనరును అప్‌లోడ్ చేయండి',
      viewReports: 'రిపోర్ట్‌లను వీక్షించండి',
      enableSMSAlerts: 'SMS హెచ్చరికలను ప్రారంభించండి',
      // Header
      goodMorning: 'శుభోదయం',
      goodAfternoon: 'నమస్కారం',
      goodEvening: 'శుభ సాయంత్రం',
      logout: 'లాగ్‌అవుట్',
      userPortal: 'పోర్టల్'
    }
  },
  kn: {
    translation: {
      // Virtual Mentor keys (Kannada)
      virtualMentorTitle: 'ವರ್ಚುವಲ್ ಮೆಂಟರ್',
      virtualMentorDesc: 'ನಿಮ್ಮ AI ಚಾಲಿತ ಅಧ್ಯಯನ ಸಹಚರ',
      aiMentor: 'AI ಮೆಂಟರ್',
      aiMentorDesc: 'ನಿಮ್ಮ ಅಧ್ಯಯನಕ್ಕೆ ಯಾವಾಗಲೂ ಸಹಾಯ',
      quickQuestions: 'ತ್ವರಿತ ಪ್ರಶ್ನೆಗಳು',
      mentorWelcome: "ಹಲೋ! ನಾನು ನಿಮ್ಮ ವರ್ಚುವಲ್ ಮೆಂಟರ್. ನಾನು ನಿಮ್ಮ ಅಧ್ಯಯನ, ಪ್ರಶ್ನೆಗಳು ಮತ್ತು ಮಾರ್ಗದರ್ಶನದಲ್ಲಿ ಸಹಾಯ ಮಾಡಲು ಇಲ್ಲಿದ್ದೇನೆ. ನೀವು ಏನು ತಿಳಿಯಲು ಇಚ್ಛಿಸುತ್ತೀರಿ?",
      mentorInputPlaceholder: 'ನಿಮ್ಮ ಅಧ್ಯಯನದ ಬಗ್ಗೆ ಏನಾದರೂ ಕೇಳಿ...',
      thinking: 'ಯೋಚಿಸುತ್ತಿದ್ದೇನೆ...',
      studyTips: 'ಅಧ್ಯಯನ ಸಲಹೆಗಳು',
      studyTipsDesc: 'ವೈಯಕ್ತಿಕ ಅಧ್ಯಯನ ತಂತ್ರಗಳು ಮತ್ತು ವಿಧಾನಗಳನ್ನು ಪಡೆಯಿರಿ',
      subjectHelp: 'ವಿಷಯ ಸಹಾಯ',
      subjectHelpDesc: 'ಯಾವುದೇ ವಿಷಯದ ಬಗ್ಗೆ ಕೇಳಿ - ಗಣಿತ, ವಿಜ್ಞಾನ, ಇಂಗ್ಲಿಷ್ ಮತ್ತು ಇನ್ನಷ್ಟು',
      support247: '24/7 ಸಹಾಯ',
      support247Desc: 'ನಿಮ್ಮ ಅಧ್ಯಯನ ಪ್ರಯಾಣದಲ್ಲಿ ಯಾವಾಗಲೂ ಸಹಾಯ ಲಭ್ಯವಿದೆ',
      multilingualSupport: 'ಬಹುಭಾಷಾ ಬೆಂಬಲ',
      askInAnyLanguage: 'ಯಾವುದೇ ಭಾಷೆಯಲ್ಲಿ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ! ನಾನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಬಲ್ಲೆ ಮತ್ತು ಉತ್ತರಿಸಬಲ್ಲೆ:',
      languageDetected: 'ಭಾಷೆ ಗುರುತಿಸಲಾಗಿದೆ',
      supportedLanguages: 'ಬೆಂಬಲಿತ ಭಾಷೆಗಳು',
      // Dashboard keys
      welcome: 'ಸ್ವಾಗತ',
      dashboardWelcomeNew: 'ನಿಮ್ಮ ಅಧ್ಯಯನ ಪ್ರಯಾಣವನ್ನು ಪ್ರಾರಂಭಿಸೋಣ! ಪ್ರಾರಂಭಿಸಲು ನಿಮ್ಮ ಮೊದಲ ಪರೀಕ್ಷೆಯನ್ನು ಬರೆಯಿರಿ.',
      dashboardWelcomeStreak: 'ನೀವು {streak} ದಿನಗಳ ಅಧ್ಯಯನ ಸ್ಟ್ರೀಕ್‌ನಲ್ಲಿ ಇದ್ದೀರಿ! ಹೀಗೆ ಮುಂದುವರಿಸಿ!',
      dashboardNoTests: 'ಇನ್ನೂ ಯಾವುದೇ ಪರೀಕ್ಷೆ ಬರೆಯಲಾಗಿಲ್ಲ.',
      dashboardTakeFirstTest: 'ನಿಮ್ಮ ಮೊದಲ ಪರೀಕ್ಷೆಯನ್ನು ಬರೆಯಿರಿ',
      dashboardNotTaken: 'ಇನ್ನೂ ಬರೆಯಲಾಗಿಲ್ಲ',
      completed: 'ಪೂರ್ಣಗೊಂಡಿದೆ',
      pending: 'ಬಾಕಿ ಇದೆ',
      // Resources page keys
      resources: 'ಸಂಪನ್ಮೂಲಗಳು',
      resourcesDesc: 'ಎಲ್ಲಾ ವಿಷಯಗಳಿಗಾಗಿ ಅಧ್ಯಯನ ವಸ್ತುಗಳು, ವೀಡಿಯೊಗಳು ಮತ್ತು ಮಾರ್ಗದರ್ಶಿಗಳನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ.',
      searchPlaceholder: 'ಸಂಪನ್ಮೂಲಗಳನ್ನು ಹುಡುಕಿ...',
      allSubjects: 'ಎಲ್ಲಾ ವಿಷಯಗಳು',
      mathematics: 'ಗಣಿತ',
      science: 'ವಿಜ್ಞಾನ',
      english: 'ಇಂಗ್ಲಿಷ್',
      history: 'ಇತಿಹಾಸ',
      physics: 'ಭೌತಶಾಸ್ತ್ರ',
      geography: 'ಭೂಗೋಳಶಾಸ್ತ್ರ',
      topicsCovered: 'ಒಳಗೊಂಡ ವಿಷಯಗಳು:',
      howToUse: 'ಈ ವಸ್ತುವನ್ನು ಬಳಸುವ ವಿಧಾನ:',
      motivation: 'ಪ್ರೇರಣೆ:',
      algebraBasics: 'ಅಲ್ಜೆಬ್ರಾ ಮೂಲಭೂತಗಳು',
      algebraBasicsDesc: 'ಅಲ್ಜೆಬ್ರಿಕ ವ್ಯಕ್ತೀಕರಣಗಳು ಮತ್ತು ಸಮೀಕರಣಗಳ ಸಂಪೂರ್ಣ ಮಾರ್ಗದರ್ಶಿ',
      algebraBasicsTopics: '- ಅಲ್ಜೆಬ್ರಿಕ ವ್ಯಕ್ತೀಕರಣಗಳು\n- ಸಮೀಕರಣಗಳು\n- ಚರಗಳಿಗೆ ಪರಿಹಾರ\n- ಪದ ಸಮಸ್ಯೆಗಳು',
      algebraBasicsUsage: '1. ಉದಾಹರಣೆಗಳನ್ನು ಗಮನಿಟ್ಟು ಓದಿ.\n2. ಪ್ರತಿಯೊಂದು ವಿಭಾಗದ ಕೊನೆಯಲ್ಲಿ ಇರುವ ಅಭ್ಯಾಸಗಳನ್ನು ಮಾಡಿ.\n3. ವೇಗದ ಪುನರಾವರ್ತನೆಗಾಗಿ ಸಂಗ್ರಹ ಸೂಚನೆಗಳನ್ನು ನೋಡಿ.\n4. ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳಿದ್ದರೆ ನಿಮ್ಮ ಮಾರ್ಗದರ್ಶಿಯನ್ನು ಕೇಳಿ!',
      algebraBasicsMotivation: '"ಪ್ರತಿ ಪರಿಣಿತನು ಒಮ್ಮೆ ಆರಂಭಿಕನಾಗಿದ್ದನು. ಅಭ್ಯಾಸವನ್ನು ಮುಂದುವರಿಸಿ — ನೀವು ಯಶಸ್ವಿಯಾಗುತ್ತೀರಿ!"',
      grammarRules: 'ವ್ಯಾಕರಣ ನಿಯಮಗಳು',
      grammarDesc: 'ಉದಾಹರಣೆಗಳೊಂದಿಗೆ ಸಮಗ್ರ ವ್ಯಾಕರಣ ಮಾರ್ಗದರ್ಶಿ',
      grammarTopics: '- ಪದವರ್ಗಗಳು\n- ಕಾಲಗಳು\n- ವಾಕ್ಯರಚನೆ\n- ಸಾಮಾನ್ಯ ತಪ್ಪುಗಳು',
      grammarUsage: '1. ನಿಯಮಗಳು ಮತ್ತು ಉದಾಹರಣೆಗಳನ್ನು ಗಮನದಿಂದ ಓದಿ.\n2. ನೀಡಿದ ವ್ಯಾಯಾಮಗಳೊಂದಿಗೆ ಅಭ್ಯಾಸ ಮಾಡಿ.\n3. ಪುನರಾವರ್ತನೆಗಾಗಿ ಸಂಗ್ರಹ ಟಿಪ್ಪಣಿಗಳನ್ನು ನೋಡಿ.\n4. ಅನುಮಾನಗಳಿದ್ದರೆ ಮಾರ್ಗದರ್ಶಿಯನ್ನು ಕೇಳಿ!',
      grammarMotivation: '"ಉತ್ತಮ ವ್ಯಾಕರಣವು ಮಹತ್ತರ ಅವಕಾಶಗಳಿಗೆ ದಾರಿ ತೆರೆದುಕೊಡುತ್ತದೆ!"',
      noResourcesFound: 'ಯಾವುದೇ ಸಂಪನ್ಮೂಲಗಳು ಕಂಡುಬಂದಿಲ್ಲ',
      tryAdjustingSearch: 'ನಿಮ್ಮ ಹುಡುಕಾಟ ಅಥವಾ ಫಿಲ್ಟರ್ ಮಾನದಂಡಗಳನ್ನು ಹೊಂದಿಸಲು ಪ್ರಯತ್ನಿಸಿ',
      selectLanguage: 'ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ',
      chooseLanguage: 'ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ',
      cancel: 'ರದ್ದುಮಾಡಿ',
      download: 'ಡೌನ್‌ಲೋಡ್',
      close: 'ಮುಚ್ಚಿ',
      author: 'ಲೇಖಕ',
      // Navigation keys
      dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
      tests: 'ಪರೀಕ್ಷೆಗಳು',
      leaderboard: 'ಲೀಡರ್‌ಬೋರ್ಡ್',
      mentor: 'AI ಮೆಂಟರ್',
      notifications: 'ಅಧಿಸೂಚನೆಗಳು',
      students: 'ವಿದ್ಯಾರ್ಥಿಗಳು',
      reports: 'ವರದಿಗಳು',
      student: 'ವಿದ್ಯಾರ್ಥಿ',
      teacher: 'ಶಿಕ್ಷಕ',
      parent: 'ಪೋಷಕ',
      // Additional navigation
      jobOpportunities: 'ಉದ್ಯೋಗ ಅವಕಾಶಗಳು',
      scholarships: 'ವಿದ್ಯಾರ್ಥಿ ವೇತನಗಳು',
      sessions: '1:1 ಅಧಿವೇಶನಗಳು',
      children: 'ಮಕ್ಕಳು',
      calendar: 'ಕ್ಯಾಲೆಂಡರ್',
      // Quick Actions
      quickActions: 'ತ್ವರಿತ ಕ್ರಿಯೆಗಳು',
      downloadResources: 'ಸಂಪನ್ಮೂಲಗಳನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
      askMentor: 'ಮೆಂಟರ್‌ಗೆ ಕೇಳಿ',
      createTest: 'ಪರೀಕ್ಷೆಯನ್ನು ರಚಿಸಿ',
      uploadResource: 'ಸಂಪನ್ಮೂಲವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
      viewReports: 'ವರದಿಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
      enableSMSAlerts: 'SMS ಎಚ್ಚರಿಕೆಗಳನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ',
      // Header
      goodMorning: 'ಶುಭೋದಯ',
      goodAfternoon: 'ನಮಸ್ಕಾರ',
      goodEvening: 'ಶುಭ ಸಂಜೆ',
      logout: 'ಲಾಗ್‌ಔಟ್',
      userPortal: 'ಪೋರ್ಟಲ್'
    }
  }
  ,
  ta: {
    translation: {
      // Virtual Mentor keys (Tamil)
      virtualMentorTitle: 'மெய்நிகர் வழிகாட்டி',
      virtualMentorDesc: 'உங்கள் AI ஆதரிக்கப்படும் கற்றல் துணை',
      aiMentor: 'AI வழிகாட்டி',
      aiMentorDesc: 'ஒவ்வொரு பாடத்திற்கும் உங்கள் தனிப்பயன் வழிகாட்டி',
      quickQuestions: 'விரைவு கேள்விகள்',
      mentorWelcome: "வணக்கம்! நான் உங்கள் மெய்நிகர் வழிகாட்டி. உங்கள் படிப்புகள், கேள்விகள் மற்றும் வழிகாட்டுதலுக்கு நான் எப்போதும் தயார். நீங்கள் என்ன அறிய விரும்புகிறீர்கள்?",
      mentorInputPlaceholder: 'உங்கள் படிப்பைப் பற்றி ஏதாவது கேளுங்கள்...',
      thinking: 'யோசிக்கிறேன்...',
      studyTips: 'படிப்பு குறிப்புகள்',
      studyTipsDesc: 'தனிப்பயன் படிப்பு யுக்திகள் மற்றும் நுட்பங்களைப் பெறுங்கள்',
      subjectHelp: 'பாட உதவி',
      subjectHelpDesc: 'எந்தப் பாடம் பற்றியும் கேளுங்கள் - கணிதம், அறிவியல், ஆங்கிலம் மற்றும் மேலும்',
      support247: '24/7 ஆதரம்',
      support247Desc: 'உங்கள் கற்றல் பயணத்தில் எப்போதும் உதவி கிடைக்கும்',
      multilingualSupport: 'பலமொழி ஆதரம்',
      askInAnyLanguage: 'எந்த மொழியிலும் கேள்விகளை கேளுங்கள்! நான் புரிந்து கொண்டு அதே மொழியில் பதில் தருவேன்:',
      languageDetected: 'மொழி கண்டறியப்பட்டது',
      supportedLanguages: 'ஆதரிக்கப்படும் மொழிகள்',
      // Minimal dashboard/resource keys (optional fallbacks)
      welcome: 'வரவேற்கிறோம்',
      resources: 'வளங்கள்',
      // Navigation keys
      dashboard: 'டாஷ்போர்டு',
      tests: 'டெஸ்ட்கள்',
      leaderboard: 'லீடர்போர்டு',
      mentor: 'AI வழிகாட்டி',
      notifications: 'அறிவிப்புகள்',
      students: 'மாணவர்கள்',
      reports: 'அறிக்கைகள்',
      student: 'மாணவர்',
      teacher: 'ஆசிரியர்',
      parent: 'பெற்றோர்',
      // Additional navigation
      jobOpportunities: 'வேலை வாய்ப்புகள்',
      scholarships: 'கல்வி உதவித்தொகை',
      sessions: '1:1 அமர்வுகள்',
      children: 'குழந்தைகள்',
      calendar: 'காலண்டர்',
      // Quick Actions
      quickActions: 'விரைவு செயல்கள்',
      downloadResources: 'வளங்களை பதிவிறக்க',
      askMentor: 'வழிகாட்டியிடம் கேளுங்கள்',
      createTest: 'டெஸ்ட் உருவாக்க',
      uploadResource: 'வளத்தை பதிவேற்ற',
      viewReports: 'அறிக்கைகளை பார்க்க',
      enableSMSAlerts: 'SMS எச்சரிக்கைகளை இயக்க',
      // Header
      goodMorning: 'காலை வணக்கம்',
      goodAfternoon: 'மதிய வணக்கம்',
      goodEvening: 'மாலை வணக்கம்',
      logout: 'வெளியேற',
      userPortal: 'போர்டல்'
    }
  }
};

// Load saved language from localStorage
const getStoredLanguage = () => {
  try {
    const stored = localStorage.getItem('smartedurural_language');
    if (stored && ['en', 'hi', 'te', 'kn', 'ta'].includes(stored)) {
      return stored;
    }
  } catch (e) {
    console.error('Error loading language from localStorage:', e);
  }
  return 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getStoredLanguage(), // Load from localStorage or default to 'en'
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false // react already does escaping
    }
  });

// Save language preference to localStorage when it changes
i18n.on('languageChanged', (lng) => {
  try {
    localStorage.setItem('smartedurural_language', lng);
  } catch (e) {
    console.error('Error saving language to localStorage:', e);
  }
});

export default i18n;