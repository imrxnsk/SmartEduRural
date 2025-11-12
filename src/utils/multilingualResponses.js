// Multilingual response generator for the virtual mentor
export const generateMultilingualResponse = (userInput, detectedLanguage) => {
  const input = userInput.toLowerCase();
  
  // Math-related responses
  if (input.includes('pythagorean') || input.includes('पाइथागोरस') || input.includes('పైథాగరస్') || input.includes('ಪೈಥಾಗರಸ್') || input.includes('பைதகோரஸ்')) {
    return getMathResponse('pythagorean', detectedLanguage);
  }
  
  if (input.includes('algebra') || input.includes('बीजगणित') || input.includes('బీజగణితం') || input.includes('ಬೀಜಗಣಿತ') || input.includes('அல்ஜீப்ரா')) {
    return getMathResponse('algebra', detectedLanguage);
  }
  
  if (input.includes('geometry') || input.includes('ज्यामिति') || input.includes('జ్యామితి') || input.includes('ಜ್ಯಾಮಿತಿ') || input.includes('வடிவவியல்')) {
    return getMathResponse('geometry', detectedLanguage);
  }
  
  // Science-related responses
  if (input.includes('photosynthesis') || input.includes('प्रकाश संश्लेषण') || input.includes('ప్రకాశ సంశ్లేషణ') || input.includes('ಪ್ರಕಾಶ ಸಂಶ್ಲೇಷಣೆ') || input.includes('ஒளிச்சேர்க்கை')) {
    return getScienceResponse('photosynthesis', detectedLanguage);
  }
  
  if (input.includes('newton') && input.includes('law') || input.includes('न्यूटन') || input.includes('న్యూటన్') || input.includes('ನ್ಯೂಟನ್') || input.includes('நியூட்டன்')) {
    return getScienceResponse('newton', detectedLanguage);
  }
  
  if (input.includes('water cycle') || input.includes('जल चक्र') || input.includes('నీటి చక్రం') || input.includes('ನೀರಿನ ಚಕ್ರ') || input.includes('நீர் சுழற்சி')) {
    return getScienceResponse('waterCycle', detectedLanguage);
  }
  
  // English-related responses
  if (input.includes('grammar') || input.includes('व्याकरण') || input.includes('వ్యాకరణం') || input.includes('ವ್ಯಾಕರಣ') || input.includes('இலக்கணம்')) {
    return getEnglishResponse('grammar', detectedLanguage);
  }
  
  if (input.includes('writing') || input.includes('लेखन') || input.includes('రాయడం') || input.includes('ಬರವಣಿಗೆ') || input.includes('எழுத்து')) {
    return getEnglishResponse('writing', detectedLanguage);
  }
  
  // Study tips
  if (input.includes('study') || input.includes('अध्ययन') || input.includes('అభ్యాసం') || input.includes('ಅಧ್ಯಯನ') || input.includes('படிப்பு')) {
    return getStudyResponse('tips', detectedLanguage);
  }
  
  if (input.includes('exam') || input.includes('परीक्षा') || input.includes('పరీక్ష') || input.includes('ಪರೀಕ್ಷೆ') || input.includes('தேர்வு')) {
    return getStudyResponse('exam', detectedLanguage);
  }
  
  // Motivation
  if (input.includes('motivation') || input.includes('प्रेरणा') || input.includes('ప్రేరణ') || input.includes('ಪ್ರೇರಣೆ') || input.includes('உந்துதல்')) {
    return getMotivationResponse(detectedLanguage);
  }
  
  // Default response
  return getDefaultResponse(detectedLanguage);
};

const getMathResponse = (topic, language) => {
  const responses = {
    pythagorean: {
      en: 'The Pythagorean theorem states that in a right-angled triangle, the square of the hypotenuse equals the sum of the squares of the other two sides: a² + b² = c². This is fundamental in geometry and helps solve many triangle problems.',
      hi: 'पाइथागोरस प्रमेय कहता है कि एक समकोण त्रिभुज में, कर्ण का वर्ग अन्य दो भुजाओं के वर्गों के योग के बराबर होता है: a² + b² = c²। यह ज्यामिति में मौलिक है और कई त्रिभुज समस्याओं को हल करने में मदद करता है।',
      te: 'పైథాగరస్ సిద్ధాంతం ఒక లంబకోణ త్రిభుజంలో, కర్ణం యొక్క వర్గం మిగతా రెండు భుజాల వర్గాల మొత్తానికి సమానమని చెబుతుంది: a² + b² = c². ఇది జ్యామితిలో ప్రాథమికమైనది మరియు అనేక త్రిభుజ సమస్యలను పరిష్కరించడంలో సహాయపడుతుంది.',
      kn: 'ಪೈಥಾಗರಸ್ ಪ್ರಮೇಯವು ಲಂಬಕೋನ ತ್ರಿಕೋಣದಲ್ಲಿ, ಕರ್ಣದ ವರ್ಗವು ಇತರ ಎರಡು ಬದಿಗಳ ವರ್ಗಗಳ ಮೊತ್ತಕ್ಕೆ ಸಮಾನವಾಗಿದೆ ಎಂದು ಹೇಳುತ್ತದೆ: a² + b² = c². ಇದು ಜ್ಯಾಮಿತಿಯಲ್ಲಿ ಮೂಲಭೂತವಾಗಿದೆ ಮತ್ತು ಅನೇಕ ತ್ರಿಕೋಣ ಸಮಸ್ಯೆಗಳನ್ನು ಪರಿಹರಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
      ta: 'பைதகோரஸ் கோட்பாடு: ஒரு நேர்கோண முக்கோணத்தில், எதிர்கோணத்தின் சதுரம் மற்ற இரண்டு பக்கங்களின் சதுரங்களின் கூட்டுத்தொகைக்கு சமம்: a² + b² = c².'
    },
    algebra: {
      en: 'Algebra is the branch of mathematics that uses symbols and letters to represent numbers and quantities in equations. It helps solve problems involving unknown values and is essential for advanced mathematics.',
      hi: 'बीजगणित गणित की वह शाखा है जो समीकरणों में संख्याओं और मात्राओं को दर्शाने के लिए प्रतीकों और अक्षरों का उपयोग करती है। यह अज्ञात मूल्यों वाली समस्याओं को हल करने में मदद करती है।',
      te: 'బీజగణితం అనేది సమీకరణాలలో సంఖ్యలు మరియు పరిమాణాలను సూచించడానికి చిహ్నాలు మరియు అక్షరాలను ఉపయోగించే గణిత శాఖ. ఇది తెలియని విలువలతో కూడిన సమస్యలను పరిష్కరించడంలో సహాయపడుతుంది.',
      kn: 'ಬೀಜಗಣಿತವು ಸಮೀಕರಣಗಳಲ್ಲಿ ಸಂಖ್ಯೆಗಳು ಮತ್ತು ಪ್ರಮಾಣಗಳನ್ನು ಪ್ರತಿನಿಧಿಸಲು ಚಿಹ್ನೆಗಳು ಮತ್ತು ಅಕ್ಷರಗಳನ್ನು ಬಳಸುವ ಗಣಿತದ ಶಾಖೆ. ಇದು ಅಜ್ಞಾತ ಮೌಲ್ಯಗಳೊಂದಿಗಿನ ಸಮಸ್ಯೆಗಳನ್ನು ಪರಿಹರಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
      ta: 'அல்ஜீப்ரா என்பது சமன்பாடுகளில் எண்கள் மற்றும் அளவுகளை குறிக்க சின்னங்கள் மற்றும் எழுத்துகளைப் பயன்படுத்தும் கணிதத்தின் ஒரு கிளை.'
    },
    geometry: {
      en: 'Geometry is the study of shapes, sizes, positions, and properties of space. It includes points, lines, angles, surfaces, and solids. Understanding geometry helps in many practical applications.',
      hi: 'ज्यामिति आकृतियों, आकारों, स्थितियों और स्थान के गुणों का अध्ययन है। इसमें बिंदु, रेखाएं, कोण, सतहें और ठोस पदार्थ शामिल हैं।',
      te: 'జ్యామితి అనేది ఆకృతులు, పరిమాణాలు, స్థానాలు మరియు స్థలం యొక్క లక్షణాల అధ్యయనం. ఇది బిందువులు, రేఖలు, కోణాలు, ఉపరితలాలు మరియు ఘన పదార్థాలను కలిగి ఉంటుంది.',
      kn: 'ಜ್ಯಾಮಿತಿಯು ಆಕಾರಗಳು, ಗಾತ್ರಗಳು, ಸ್ಥಾನಗಳು ಮತ್ತು ಸ್ಥಳದ ಗುಣಲಕ್ಷಣಗಳ ಅಧ್ಯಯನ. ಇದು ಬಿಂದುಗಳು, ರೇಖೆಗಳು, ಕೋನಗಳು, ಮೇಲ್ಮೈಗಳು ಮತ್ತು ಘನ ವಸ್ತುಗಳನ್ನು ಒಳಗೊಂಡಿದೆ.',
      ta: 'வடிவவியல் என்பது வடிவங்கள், அளவுகள், நிலைகள் மற்றும் இடத்தின் பண்புகளைப் பற்றிய ஆய்வு.'
    }
  };
  
  return responses[topic]?.[language] || responses[topic]?.en || 'I can help you with mathematics concepts. Please ask a specific question.';
};

const getScienceResponse = (topic, language) => {
  const responses = {
    photosynthesis: {
      en: 'Photosynthesis is the process by which green plants use sunlight, carbon dioxide, and water to produce glucose and oxygen. The equation is: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂. This process is essential for life on Earth.',
      hi: 'प्रकाश संश्लेषण वह प्रक्रिया है जिसके द्वारा हरे पौधे सूर्य के प्रकाश, कार्बन डाइऑक्साइड और पानी का उपयोग करके ग्लूकोज और ऑक्सीजन उत्पादित करते हैं। यह प्रक्रिया पृथ्वी पर जीवन के लिए आवश्यक है।',
      te: 'ప్రకాశ సంశ్లేషణ అనేది ఆకుపచ్చ మొక్కలు సూర్యకాంతి, కార్బన్ డయాక్సైడ్ మరియు నీటిని ఉపయోగించి గ్లూకోజ్ మరియు ఆక్సిజన్ ఉత్పత్తి చేసే ప్రక్రియ. ఈ ప్రక్రియ భూమిపై జీవితానికి అవసరమైనది.',
      kn: 'ಪ್ರಕಾಶ ಸಂಶ್ಲೇಷಣೆಯು ಹಸಿರು ಸಸ್ಯಗಳು ಸೂರ್ಯನ ಬೆಳಕು, ಕಾರ್ಬನ್ ಡೈಆಕ್ಸೈಡ್ ಮತ್ತು ನೀರನ್ನು ಬಳಸಿಕೊಂಡು ಗ್ಲೂಕೋಸ್ ಮತ್ತು ಆಮ್ಲಜನಕವನ್ನು ಉತ್ಪಾದಿಸುವ ಪ್ರಕ್ರಿಯೆ. ಈ ಪ್ರಕ್ರಿಯೆ ಭೂಮಿಯ ಮೇಲೆ ಜೀವನಕ್ಕೆ ಅತ್ಯಗತ್ಯ.',
      ta: 'ஒளிச்சேர்க்கை என்பது பச்சை தாவரங்கள் சூரியஒளி, கார்பன் டைஆக்சைடு மற்றும் தண்ணீரைப் பயன்படுத்தி குளுக்கோஸ் மற்றும் ஆக்ஸிஜன் உருவாக்கும் செயல்முறை.'
    },
    newton: {
      en: 'Newton\'s three laws of motion are: 1) An object at rest stays at rest unless acted upon by a force. 2) Force equals mass times acceleration (F=ma). 3) For every action, there is an equal and opposite reaction.',
      hi: 'न्यूटन के गति के तीन नियम हैं: 1) कोई वस्तु विरामावस्था में तब तक रहती है जब तक उस पर कोई बल न लगे। 2) बल द्रव्यमान गुणा त्वरण के बराबर होता है (F=ma)। 3) प्रत्येक क्रिया के लिए एक समान और विपरीत प्रतिक्रिया होती है।',
      te: 'న్యూటన్ యొక్క చలన మూడు నియమాలు: 1) ఒక వస్తువు విశ్రాంతిలో ఉంటుంది, దానిపై ఒక బలం పనిచేసే వరకు. 2) బలం = ద్రవ్యరాశి × త్వరణం (F=ma). 3) ప్రతి చర్యకు, సమాన మరియు వ్యతిరేక ప్రతిచర్య ఉంటుంది.',
      kn: 'ನ್ಯೂಟನ್‌ನ ಚಲನೆಯ మూడు ನಿಯಮಗಳು: 1) ಒಂದು ವಸ್ತುವು ವಿಶ್ರಾಂತಿಯಲ್ಲಿದ್ದರೆ, ಅದರ ಮೇಲೆ ಬಲವೊಂದು ಕಾರ್ಯನಿರ್ವಹಿಸುವವರೆಗೆ ಅದು ವಿಶ್ರಾಂತಿಯಲ್ಲಿಯೇ ಇರುತ್ತದೆ. 2) ಬಲ = ದ್ರವ್ಯರಾಶಿ × ತ್ವರಣ (F=ma). 3) ಪ್ರತಿ ಕ್ರಿಯೆಗೆ, ಸಮಾನ ಮತ್ತು ವಿರುದ್ಧ ಪ್ರತಿಕ್ರಿಯೆ ಇರುತ್ತದೆ.',
      ta: 'நியூட்டனின் இயக்கத்தின் மூன்று சட்டங்கள்: 1) ஓர் பொருள் அமைதியில் இருக்கும், ஒரு விசை செயல் செய்யும் வரை. 2) விசை = பருமன் × உட்சேர்ப்பு (F=ma). 3) ஒவ்வொரு செயலுக்கும் சமமான எதிர்மறை எதிர்வினை உண்டு.'
    },
    waterCycle: {
      en: 'The water cycle consists of four main stages: 1) Evaporation - water turns into vapor, 2) Condensation - vapor forms clouds, 3) Precipitation - water falls as rain/snow, 4) Collection - water gathers in oceans, lakes, and rivers.',
      hi: 'जल चक्र में चार मुख्य चरण होते हैं: 1) वाष्पीकरण - पानी भाप में बदलता है, 2) संघनन - भाप बादल बनाती है, 3) वर्षा - पानी बारिश/बर्फ के रूप में गिरता है, 4) संग्रह - पानी महासागरों, झीलों और नदियों में एकत्र होता है।',
      te: 'నీటి చక్రం నాలుగు ప్రధాన దశలను కలిగి ఉంటుంది: 1) బాష్పీకరణం - నీరు ఆవిరిగా మారుతుంది, 2) సంక్షేపణం - ఆవిరి మేఘాలను ఏర్పరుస్తుంది, 3) అవపాతం - నీరు వర్షం/మంచుగా పడుతుంది, 4) సేకరణం - నీరు సముద్రాలు, సరస్సులు మరియు నదులలో సేకరిస్తుంది.',
      kn: 'ನೀರಿನ ಚಕ್ರವು ನಾಲ್ಕು ಮುಖ್ಯ ಹಂತಗಳನ್ನು ಒಳಗೊಂಡಿದೆ: 1) ಆವಿಯಾಗುವಿಕೆ - ನೀರು ಆವಿಯಾಗಿ ಮಾರ್ಪಡುತ್ತದೆ, 2) ಸಂಘನನ - ಆವಿ ಮೋಡಗಳನ್ನು ರೂಪಿಸುತ್ತದೆ, 3) ಅವಪಾತ - ನೀರು ಮಳೆ/ಹಿಮವಾಗಿ ಬೀಳುತ್ತದೆ, 4) ಸಂಗ್ರಹ - ನೀರು ಸಾಗರಗಳು, ಸರೋವರಗಳು ಮತ್ತು ನದಿಗಳಲ್ಲಿ ಸಂಗ್ರಹವಾಗುತ್ತದೆ.',
      ta: 'நீர் சுழற்சி நான்கு நிலைகளைக் கொண்டுள்ளது: 1) ஆவியாக்கம், 2) திரவியமாதல், 3) அளிவீழ்ச்சி, 4) சேகரிப்பு.'
    }
  };
  
  return responses[topic]?.[language] || responses[topic]?.en || 'I can help you with science concepts. Please ask a specific question.';
};

const getEnglishResponse = (topic, language) => {
  const responses = {
    grammar: {
      en: 'English grammar includes parts of speech (nouns, verbs, adjectives), tenses (past, present, future), sentence structure, and punctuation. Practice regularly and read good books to improve your grammar skills.',
      hi: 'अंग्रेज़ी व्याकरण में शब्द भेद (संज्ञा, क्रिया, विशेषण), काल (भूत, वर्तमान, भविष्य), वाक्य संरचना और विराम चिह्न शामिल हैं। नियमित अभ्यास करें और अच्छी किताबें पढ़ें।',
      te: 'ఇంగ్లీష్ వ్యాకరణంలో పదభాగాలు (నామవాచకాలు, క్రియలు, విశేషణాలు), కాలాలు (భూత, వర్తమాన, భవిష్యత్తు), వాక్య నిర్మాణం మరియు విరామ చిహ్నాలు ఉంటాయి. నియమితంగా అభ్యాసం చేయండి మరియు మంచి పుస్తకాలు చదవండి.',
      kn: 'ಇಂಗ್ಲಿಷ್ ವ್ಯಾಕರಣದಲ್ಲಿ ಪದಭಾಗಗಳು (ನಾಮಪದಗಳು, ಕ್ರಿಯಾಪದಗಳು, ವಿಶೇಷಣಗಳು), ಕಾಲಗಳು (ಭೂತ, ವರ್ತಮಾನ, ಭವಿಷ್ಯತ್), ವಾಕ್ಯ ರಚನೆ ಮತ್ತು ವಿರಾಮ ಚಿಹ್ನೆಗಳು ಸೇರಿವೆ. ನಿಯಮಿತವಾಗಿ ಅಭ್ಯಾಸ ಮಾಡಿ ಮತ್ತು ಉತ್ತಮ ಪುಸ್ತಕಗಳನ್ನು ಓದಿ.'
    },
    writing: {
      en: 'To improve English writing: 1) Read regularly to expand vocabulary, 2) Practice writing daily, 3) Learn grammar rules, 4) Use varied sentence structures, 5) Proofread your work, 6) Get feedback from others.',
      hi: 'अंग्रेज़ी लेखन में सुधार के लिए: 1) शब्दावली बढ़ाने के लिए नियमित पढ़ें, 2) प्रतिदिन लेखन का अभ्यास करें, 3) व्याकरण नियम सीखें, 4) विभिन्न वाक्य संरचनाओं का उपयोग करें, 5) अपने काम की जांच करें, 6) दूसरों से प्रतिक्रिया लें।',
      te: 'ఇంగ్లీష్ రాయడంలో మెరుగుదల కోసం: 1) పదభాండారాన్ని విస్తరించడానికి నియమితంగా చదవండి, 2) ప్రతిరోజూ రాయడం అభ్యాసం చేయండి, 3) వ్యాకరణ నియమాలు నేర్చుకోండి, 4) వివిధ వాక్య నిర్మాణాలను ఉపయోగించండి, 5) మీ పనిని సరిచూడండి, 6) ఇతరుల నుండి అభిప్రాయం తీసుకోండి.',
      kn: 'ಇಂಗ್ಲಿಷ್ ಬರವಣಿಗೆಯಲ್ಲಿ ಸುಧಾರಣೆಗಾಗಿ: 1) ಶಬ್ದಕೋಶವನ್ನು ವಿಸ್ತರಿಸಲು ನಿಯಮಿತವಾಗಿ ಓದಿ, 2) ಪ್ರತಿದಿನ ಬರವಣಿಗೆ ಅಭ್ಯಾಸ ಮಾಡಿ, 3) ವ್ಯಾಕರಣ ನಿಯಮಗಳನ್ನು ಕಲಿಯಿರಿ, 4) ವಿವಿಧ ವಾಕ್ಯ ರಚನೆಗಳನ್ನು ಬಳಸಿ, 5) ನಿಮ್ಮ ಕೆಲಸವನ್ನು ಪರಿಶೀಲಿಸಿ, 6) ಇತರರಿಂದ ಪ್ರತಿಕ್ರಿಯೆ ಪಡೆಯಿರಿ.'
    }
  };
  
  return responses[topic]?.[language] || responses[topic]?.en || 'I can help you with English language skills. Please ask a specific question.';
};

const getStudyResponse = (topic, language) => {
  const responses = {
    tips: {
      en: 'Effective study tips: 1) Create a study schedule and stick to it, 2) Find a quiet, comfortable study space, 3) Take regular breaks (25-30 minutes study, 5-10 minutes break), 4) Use active learning techniques like summarizing and teaching others, 5) Practice with past papers and mock tests, 6) Get adequate sleep and maintain a healthy routine.',
      hi: 'प्रभावी अध्ययन सुझाव: 1) अध्ययन समय सारणी बनाएं और उसका पालन करें, 2) शांत, आरामदायक अध्ययन स्थान खोजें, 3) नियमित ब्रेक लें (25-30 मिनट अध्ययन, 5-10 मिनट ब्रेक), 4) सक्रिय अध्ययन तकनीकों का उपयोग करें, 5) पिछले प्रश्नपत्रों और मॉक टेस्ट से अभ्यास करें, 6) पर्याप्त नींद लें।',
      te: 'సమర్థవంతమైన అభ్యాస సూచనలు: 1) అభ్యాస షెడ్యూల్ తయారు చేసి పాటించండి, 2) ప్రశాంతమైన, సుఖకరమైన అభ్యాస స్థలాన్ని కనుగొనండి, 3) నియమిత విరామాలు తీసుకోండి (25-30 నిమిషాలు అభ్యాసం, 5-10 నిమిషాలు విరామం), 4) సారాంశం చెప్పడం, ఇతరులకు బోధించడం వంటి యాక్టివ్ లెర్నింగ్ పద్ధతులు ఉపయోగించండి, 5) పాత పేపర్లు, మాక్ టెస్టులతో అభ్యాసం చేయండి, 6) తగినంత నిద్ర, ఆరోగ్యకరమైన జీవనశైలి పాటించండి.',
      kn: 'ಪರಿಣಾಮಕಾರಿ ಅಧ್ಯಯನ ಸಲಹೆಗಳು: 1) ಅಧ್ಯಯನ ವೇಳಾಪಟ್ಟಿ ರೂಪಿಸಿ ಮತ್ತು ಪಾಲಿಸಿ, 2) ಶಾಂತ, ಆರಾಮದಾಯಕ ಅಧ್ಯಯನ ಸ್ಥಳವನ್ನು ಹುಡುಕಿ, 3) ನಿಯಮಿತ ವಿರಾಮಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ (25-30 ನಿಮಿಷ ಅಧ್ಯಯನ, 5-10 ನಿಮಿಷ ವಿರಾಮ), 4) ಸಾರಾಂಶ ಮಾಡುವುದು ಮತ್ತು ಇತರರಿಗೆ ಬೋಧಿಸುವುದು ವಂಟಿ ಸಕ್ರಿಯ ಅಧ್ಯಯನ ತಂತ್ರಗಳನ್ನು ಬಳಸಿ, 5) ಹಳೆಯ ಪ್ರಶ್ನೆಪತ್ರಿಕೆಗಳು ಮತ್ತು ಮಾಕ್ ಟೆಸ್ಟ್‌ಗಳೊಂದಿಗೆ ಅಭ್ಯಾಸ ಮಾಡಿ, 6) ಸಾಕಷ್ಟು ನಿದ್ರೆ ಮತ್ತು ಆರೋಗ್ಯಕರ ಜೀವನಶೈಲಿ ಅನುಸರಿಸಿ.'
    },
    exam: {
      en: 'Exam preparation strategies: 1) Start early and create a study plan, 2) Review all topics systematically, 3) Practice with past papers and sample questions, 4) Create summary notes and flashcards, 5) Take mock tests under timed conditions, 6) Focus on weak areas, 7) Maintain a healthy lifestyle, 8) Stay calm and confident on exam day.',
      hi: 'परीक्षा तैयारी रणनीतियां: 1) जल्दी शुरू करें और अध्ययन योजना बनाएं, 2) सभी विषयों की व्यवस्थित समीक्षा करें, 3) पिछले प्रश्नपत्रों और नमूना प्रश्नों से अभ्यास करें, 4) सारांश नोट्स और फ्लैशकार्ड बनाएं, 5) समयबद्ध स्थितियों में मॉक टेस्ट दें, 6) कमजोर क्षेत्रों पर ध्यान दें, 7) स्वस्थ जीवनशैली बनाए रखें, 8) परीक्षा के दिन शांत और आत्मविश्वासी रहें।',
      te: 'పరీక్ష సిద్ధత వ్యూహాలు: 1) ముందుగానే ప్రారంభించి అభ్యాస ప్రణాళిక తయారు చేయండి, 2) అన్ని అంశాలను క్రమబద్ధంగా సమీక్షించండి, 3) పాత పేపర్లు, నమూనా ప్రశ్నలతో అభ్యాసం చేయండి, 4) సారాంశ నోట్లు, ఫ్లాష్ కార్డులు తయారు చేయండి, 5) సమయ పరిమితులలో మాక్ టెస్టులు రాయండి, 6) బలహీన ప్రాంతాలపై దృష్టి పెట్టండి, 7) ఆరోగ్యకరమైన జీవనశైలి పాటించండి, 8) పరీక్ష రోజున ప్రశాంతంగా, ఆత్మవిశ్వాసంతో ఉండండి.',
      kn: 'ಪರೀಕ್ಷಾ ಸಿದ್ಧತೆ ತಂತ್ರಗಳು: 1) ಮುಂಚಿತವಾಗಿ ಪ್ರಾರಂಭಿಸಿ ಮತ್ತು ಅಧ್ಯಯನ ಯೋಜನೆಯನ್ನು ರೂಪಿಸಿ, 2) ಎಲ್ಲಾ ವಿಷಯಗಳನ್ನು ಕ್ರಮಬದ್ಧವಾಗಿ ಪರಿಶೀಲಿಸಿ, 3) ಹಳೆಯ ಪ್ರಶ್ನೆಪತ್ರಿಕೆಗಳು ಮತ್ತು ಮಾದರಿ ಪ್ರಶ್ನೆಗಳೊಂದಿಗೆ ಅಭ್ಯಾಸ ಮಾಡಿ, 4) ಸಾರಾಂಶ ಟಿಪ್ಪಣಿಗಳು ಮತ್ತು ಫ್ಲಾಶ್ ಕಾರ್ಡ್‌ಗಳನ್ನು ರಚಿಸಿ, 5) ಸಮಯದ ನಿಯಮಗಳಡಿ ಮಾಕ್ ಟೆಸ್ಟ್‌ಗಳನ್ನು ಬರೆಯಿರಿ, 6) ದುರ್ಬಲ ಪ್ರದೇಶಗಳ ಮೇಲೆ ಗಮನ ಹರಿಸಿ, 7) ಆರೋಗ್ಯಕರ ಜೀವನಶೈಲಿಯನ್ನು ನಿರ್ವಹಿಸಿ, 8) ಪರೀಕ್ಷೆಯ ದಿನ ಶಾಂತ ಮತ್ತು ಆತ್ಮವಿಶ್ವಾಸದಿಂದಿರಿ.'
    }
  };
  
  return responses[topic]?.[language] || responses[topic]?.en || 'I can help you with study strategies. Please ask a specific question.';
};

const getMotivationResponse = (language) => {
  const responses = {
    en: 'Remember: Every expert was once a beginner. Learning is a journey, not a destination. Small consistent efforts lead to big results. You are capable of more than you think. It\'s okay to ask for help when needed. Stay positive, stay curious, and keep learning!',
    hi: 'याद रखें: हर विशेषज्ञ कभी एक शुरुआत करने वाला था। सीखना एक यात्रा है, गंतव्य नहीं। छोटे-छोटे निरंतर प्रयास बड़े परिणाम लाते हैं। आप अपनी सोच से अधिक सक्षम हैं। जरूरत पड़ने पर मदद माँगना ठीक है। सकारात्मक रहें, जिज्ञासु रहें और सीखते रहें!',
    te: 'గుర్తుంచుకోండి: ప్రతి నిపుణుడు ఒకప్పుడు ప్రారంభకుడు. అభ్యాసం ఒక ప్రయాణం, గమ్యం కాదు. చిన్న చిన్న సతత ప్రయత్నాలు పెద్ద ఫలితాలను ఇస్తాయి. మీరు అనుకున్నదానికంటే ఎక్కువ చేయగలరు. అవసరమైతే సహాయం అడగడం సరి. సానుకూలంగా ఉండండి, కుతూహలంతో ఉండండి, అభ్యాసం కొనసాగించండి!',
    kn: 'ನೆನಪಿಡಿ: ಪ್ರತಿಯೊಬ್ಬ ತಜ್ಞನು ಒಮ್ಮೆ ಪ್ರಾರಂಭಿಕನಾಗಿದ್ದನು. ಕಲಿಕೆಯು ಒಂದು ಪ್ರಯಾಣ, ಗಮ್ಯಸ್ಥಾನವಲ್ಲ. ಸಣ್ಣ ಸತತ ಪ್ರಯತ್ನಗಳು ದೊಡ್ಡ ಫಲಿತಾಂಶಗಳನ್ನು ನೀಡುತ್ತವೆ. ನೀವು ಯೋಚಿಸುವದಕ್ಕಿಂತ ಹೆಚ್ಚು ಸಾಮರ್ಥ್ಯ ಹೊಂದಿದ್ದೀರಿ. ಅಗತ್ಯವಿದ್ದರೆ ಸಹಾಯ ಕೇಳುವುದು ಸರಿ. ಸಕಾರಾತ್ಮಕವಾಗಿ ಉಳಿಯಿರಿ, ಕುತೂಹಲದಿಂದಿರಿ ಮತ್ತು ಕಲಿಯುತ್ತಲೇ ಇರಿ!',
    ta: 'நினைவில் கொள்ளுங்கள்: ஒவ்வொரு நிபுணரும் ஒருகாலத்தில் தொடக்கநிலையில் இருந்தவர். கற்றல் ஒரு பயணம்; சிறிய தொடர்ச்சியான முயற்சிகள் பெரிய முடிவுகளுக்குக் கொண்டுசெல்லும். தேவையானால் உதவி கேட்கலாம்.'
  };
  
  return responses[language] || responses.en;
};

const getDefaultResponse = (language) => {
  const responses = {
    en: 'That\'s an interesting question! I\'m here to help you with your studies and provide guidance. Could you be more specific about what you\'d like to know? I can help with mathematics, science, English, study techniques, and exam preparation. What would you like to explore?',
    hi: 'यह एक दिलचस्प सवाल है! मैं आपकी पढ़ाई और मार्गदर्शन में मदद करने के लिए यहाँ हूँ। कृपया स्पष्ट करें कि आप क्या जानना चाहते हैं? मैं गणित, विज्ञान, अंग्रेज़ी, अध्ययन तकनीकों और परीक्षा तैयारी में मदद कर सकता हूँ। आप क्या जानना चाहेंगे?',
    te: 'అది ఆసక్తికరమైన ప్రశ్న! నేను మీ అభ్యాసానికి సహాయం చేయడానికి ఇక్కడ ఉన్నాను. మీరు ఏమి తెలుసుకోవాలనుకుంటున్నారు? నేను గణితం, సైన్స్, ఇంగ్లీష్, అభ్యాస పద్ధతులు మరియు పరీక్ష సిద్ధతలో సహాయం చేయగలను. మీరు ఏమి తెలుసుకోవాలనుకుంటున్నారు?',
    kn: 'ಅದು ಆಸಕ್ತಿದಾಯಕವಾದ ಪ್ರಶ್ನೆ! ನಾನು ನಿಮ್ಮ ಅಧ್ಯಯನಕ್ಕೆ ಸಹಾಯ ಮಾಡಲು ಇಲ್ಲಿದ್ದೇನೆ. ನೀವು ಏನು ತಿಳಿಯಲು ಇಚ್ಛಿಸುತ್ತೀರಿ? 나는 ಗಣಿತ, ವಿಜ್ಞಾನ, ಇಂಗ್ಲಿಷ್, ಅಧ್ಯಯನ ತಂತ್ರಗಳು ಮತ್ತು ಪರೀಕ್ಷಾ ಸಿದ್ಧತೆಯಲ್ಲಿ ಸಹಾಯ ಮಾಡಬಹುದು. ನೀವು ಏನು ತಿಳಿಯಲು ಇಚ್ಛಿಸುತ್ತೀರಿ?',
    ta: 'இது ஒரு சுவாரஸ்யமான கேள்வி! உங்கள் படிப்பில் உதவ நான் இருக்கிறேன். நீங்கள் எதைப் பற்றி அறிய விரும்புகிறீர்கள்? கணிதம், அறிவியல், ஆங்கிலம், படிப்பு நுட்பங்கள், தேர்வு தயாரிப்பு ஆகியவற்றில் உதவ முடியும்.'
  };
  
  return responses[language] || responses.en;
};
