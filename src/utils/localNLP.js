// Lightweight local NLP answering without any external API.
// Strategy:
// 1) Simple keyword/topic routing (math, science, english, study, exams)
// 2) Generic informative template when unknown
// 3) Respond in UI language using minimal templates

import { generateMultilingualResponse } from './multilingualResponses';

const TEMPLATES = {
  generic: {
    en: 'Here is a clear explanation based on your question. If you need more depth, ask a follow-up with specifics like grade level or topic focus.\n\n- Summary: Your question is quite broad.\n- Tip: Break it into smaller parts.\n- Next: Tell me the exact concept, example, or formula you want.\n\nI can help with math, science, English, study skills, and exams.',
    hi: 'आपके प्रश्न के आधार पर यहाँ स्पष्ट उत्तर है। अधिक गहराई चाहिए तो कक्षा स्तर या विशेष विषय देकर पूछें।\n\n- सार: आपका प्रश्न व्यापक है।\n- टिप: इसे छोटे भागों में बाँटें।\n- अगला: सटीक अवधारणा, उदाहरण, या सूत्र बताइए।',
    te: 'మీ ప్రశ్న ఆధారంగా స్పష్టమైన వివరణ ఇది. మరింత లోతుకు, తరగతి స్థాయి లేదా అంశం తెలపండి.\n\n- సారాంశం: మీ ప్రశ్న విస్తృతంగా ఉంది.\n- సూచన: దాన్ని చిన్న భాగాలుగా విభజించండి.\n- తదుపరి: ఖచ్చితమైన భావన, ఉదాహరణ లేదా సూత్రం చెప్పండి.',
    kn: 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಆಧರಿಸಿ ಇದು ಸ್ಪಷ್ಟ ವಿವರಣೆ. ಇನ್ನಷ್ಟು ಆಳಕ್ಕೆ, ತರಗತಿ ಮಟ್ಟ ಅಥವಾ ವಿಷಯವನ್ನು ತಿಳಿಸಿ.\n\n- ಸಾರಾಂಶ: ನಿಮ್ಮ ಪ್ರಶ್ನೆ ವಿಶಾಲವಾಗಿದೆ.\n- ಸಲಹೆ: ಅದನ್ನು ಸಣ್ಣ ಭಾಗಗಳಾಗಿ ವಿಭಜಿಸಿ.\n- ಮುಂದಿನದು: ಖಚಿತ ಕಲ್ಪನೆ, ಉದಾಹರಣೆ ಅಥವಾ ಸೂತ್ರವನ್ನು ಹೇಳಿ.',
    ta: 'உங்கள் கேள்வியைப் பொருத்து தெளிவான விளக்கம் இதோ. மேலும் ஆழமாக வேண்டுமென்றால், வகுப்பு நிலை அல்லது தலைப்பைத் தெரிவித்துக் கேளுங்கள்.\n\n- சுருக்கம்: உங்கள் கேள்வி பரந்துள்ளது.\n- குறிப்பு: அதை சிறு பகுதிகளாகப் பிரியுங்கள்.\n- அடுத்தது: வேண்டிய கருத்து/எடுத்துக்காட்டு/சூத்திரத்தைச் சொல்லுங்கள்.'
  },
  mathTip: {
    en: 'Math approach: 1) Write knowns/unknowns 2) Pick a formula 3) Substitute 4) Check units 5) Interpret answer.',
    hi: 'गणित पद्धति: 1) ज्ञात/अज्ञात लिखें 2) सूत्र चुनें 3) प्रतिस्थापित करें 4) इकाइयाँ जाँचें 5) उत्तर समझें।',
    te: 'గణిత పద్ధతి: 1) తెలిసినవి/తెలియనివి రాయండి 2) సూత్రం ఎంచుకోండి 3) ప్రతిస్థాపించండి 4) యూనిట్లు తనిఖీ చేయండి 5) సమాధానాన్ని అర్థం చేసుకోండి.',
    kn: 'ಗಣಿತ ವಿಧಾನ: 1) ತಿಳಿದ/ಅಪರಿಚಿತಗಳನ್ನು ಬರೆಯಿರಿ 2) ಸೂತ್ರ ಆಯ್ಕೆಮಾಡಿ 3) ಬದಲಾಯಿಸಿ 4) ಘಟಕಗಳನ್ನು ಪರಿಶೀಲಿಸಿ 5) ಉತ್ತರ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.',
    ta: 'கணித நடை: 1) தெரிந்த/அறியாதவை எழுதவும் 2) சூத்திரம் தேர்வு 3) பதிலீடு 4) அலகுகள் சரிபார் 5) விடையைப் புரிந்து கொள்.'
  },
  scienceTip: {
    en: 'Science approach: Define the system, identify variables, state the principle (e.g., conservation), and reason step-by-step.',
    hi: 'विज्ञान पद्धति: प्रणाली परिभाषित करें, चरों की पहचान करें, सिद्धांत बताएं (जैसे संरक्षण), चरण-दर-चरण तर्क करें।',
    te: 'సైన్స్ పద్ధతి: వ్యవస్థ నిర్వచించండి, వేరియబుల్స్ గుర్తించండి, సిద్ధాంతం చెప్పండి, దశలవారీగా తర్కించండి.',
    kn: 'ವಿಜ್ಞಾನ ವಿಧಾನ: ವ್ಯವಸ್ಥೆಯನ್ನು ನಿರ್ವಚಿಸಿ, ಚರಗಳನ್ನು ಗುರುತಿಸಿ, ಸಿದ್ಧಾಂತವನ್ನು ಹೇಳಿ, ಹಂತವಾಗಿ ತರ್ಕಿಸಿ.',
    ta: 'அறிவியல் நடை: அமைப்பை வரையறுக்கவும், மாறிகளை கண்டறியவும், கோட்பாட்டை கூறவும், படிப்படியாக காரணம் கூறவும்.'
  },
  englishTip: {
    en: 'English tip: Use clear subject-verb agreement, vary sentence lengths, and proofread once aloud.',
    hi: 'अंग्रेज़ी सुझाव: कर्ता-क्रिया में सामंजस्य रखें, वाक्य लंबाई बदलें, और एक बार ज़ोर से पढ़कर जाँचें।',
    te: 'ఇంగ్లీష్ సూచన: కర్త-క్రియా సరిపోవాలి, వాక్యాల పొడవు మార్చండి, ఒకసారి జొరగా చదివి పరిశీలించండి.',
    kn: 'ಇಂಗ್ಲಿಷ್ ಸಲಹೆ: ಕರ್ತೃ-ಕ್ರಿಯಾಪದ ಹೊಂದಾಣಿಕೆ, ವಾಕ್ಯ ಉದ್ದ ಬದಲಾವಣೆ, ಒಂದು ಬಾರಿ ಜೋರಾಗಿ ಓದಿ ಪರಿಶೀಲಿಸಿ.',
    ta: 'ஆங்கில குறிப்பு: கருப்பொருள்-வினைச்சொல் பொருந்தல், வாக்கிய நீளங்களை மாறுங்கள், ஒருமுறை சத்தமாக வாசித்து திருத்துங்கள்.'
  },
  studyTip: {
    en: 'Study tip: 25–30 min focus + 5–10 min break, spaced repetition, and active recall with flashcards.',
    hi: 'अध्ययन टिप: 25–30 मिनट फोकस + 5–10 मिनट ब्रेक, स्पेस्ड रिपिटिशन, और फ्लैशकार्ड से सक्रिय पुनःस्मरण।',
    te: 'అభ్యాస సూచన: 25–30 నిమి కేంద్రీకరణ + 5–10 నిమి విరామం, spaced repetition, ఫ్లాష్‌కార్డులతో active recall.',
    kn: 'ಅಧ್ಯಯನ ಸಲಹೆ: 25–30 ನಿಮಿಷ ಗಮನ + 5–10 ನಿಮಿಷ ವಿರಾಮ, spaced repetition, ಫ್ಲಾಶ್‌ಕಾರ್ಡ್‌ಗಳಿಂದ active recall.',
    ta: 'படிப்பு குறிப்பு: 25–30 நிமிடம் கவனம் + 5–10 நிமிடம் இடைவேளை, இடைவெளி மீளாய்வு, ஃப்ளாஷ் கார்ட்களுடன் active recall.'
  }
};

function pick(lang, key) {
  return (TEMPLATES[key] && (TEMPLATES[key][lang] || TEMPLATES[key].en)) || TEMPLATES.generic.en;
}

export function answerLocally(questionText, uiLanguage) {
  const q = (questionText || '').toLowerCase();
  const lang = uiLanguage || 'en';

  // -1) If the question mentions specific known topics, return a factual answer
  // Delegate to multilingualResponses which contains concrete explanations
  const specificPattern = /(pythagorean|photosynthesis|newton|water cycle|grammar|writing|pythagoras|ஒளிச்சேர்க்கை|न्यूटन|जल चक्र|వ్యాకరణం|ವ್ಯಾಕರಣ|நியூட்டன்|பைதகோரஸ்)/i;
  if (specificPattern.test(q)) {
    return generateMultilingualResponse(questionText, lang);
  }

  // 0) Question-style patterns for more specific answers
  const diffMatch = q.match(/difference between\s+(.+?)\s+and\s+(.+?)\??$/i);
  if (diffMatch) {
    const a = diffMatch[1].trim();
    const b = diffMatch[2].trim();
    // Special-case: speed vs velocity -> provide factual answer
    const isSpeedVelocity = /^(speed|வேகம்|गति|వేగం|ವೇಗ)$/i.test(a) && /^(velocity|திசைவேகம்|वेग|వేగం|ವೇಗ)$/i.test(b)
      || /^(velocity|திசைவேகம்|वेग|వేగం|ವೇಗ)$/i.test(a) && /^(speed|வேகம்|गति|వేగం|ವೇಗ)$/i.test(b);
    if (isSpeedVelocity) {
      const byLangSV = {
        en: 'Difference between speed and velocity:\n- Speed: rate of change of distance; scalar (no direction); SI unit m/s.\n- Velocity: rate of change of displacement; vector (has direction); SI unit m/s.\n- Example: Running 5 m/s north → speed = 5 m/s, velocity = 5 m/s north.',
        hi: 'गति और वेग में अंतर:\n- गति: दूरी परिवर्तन की दर; अदिश (दिशा नहीं); SI इकाई m/s।\n- वेग: विस्थापन परिवर्तन की दर; सदिश (दिशा सहित); SI इकाई m/s।\n- उदाहरण: 5 m/s उत्तर दिशा में दौड़ना → गति = 5 m/s, वेग = 5 m/s उत्तर।',
        te: 'వేగం మరియు దిశావేగం మధ్య తేడా:\n- వేగం (Speed): దూర మార్పు రేటు; స్కేలర్; SI యూనిట్ m/s.\n- దిశావేగం (Velocity): స్థానచలనం మార్పు రేటు; వెక్టర్; SI యూనిట్ m/s.\n- ఉదాహరణ: ఉత్తర దిశలో 5 m/s → వేగం = 5 m/s, దిశావేగం = 5 m/s ఉత్తరం.',
        kn: 'ವೇಗ ಮತ್ತು ದಿಕ್ಕು ವೇಗದ ವ್ಯತ್ಯಾಸ:\n- ವೇಗ (Speed): ದೂರ ಬದಲಾವಣೆಯ ದರ; ಅಡಿಶ; SI ಘಟಕ m/s.\n- ದಿಕ್ಕು ವೇಗ (Velocity): ವಿಸ್ಥಾಪನ ಬದಲಾವಣೆಯ ದರ; ಸದಿಶ; SI ಘಟಕ m/s.\n- ಉದಾಹರಣೆ: ಉತ್ತರಕ್ಕೆ 5 m/s → ವೇಗ = 5 m/s, ದಿಕ್ಕು ವೇಗ = 5 m/s ಉತ್ತರ.',
        ta: 'வேகம் மற்றும் திசைவேகம் வித்தியாசம்:\n- வேகம் (Speed): தூர மாற்ற விகிதம்; அளவை (திசையில்லை); SI அலகு m/s.\n- திசைவேகம் (Velocity): இடமாற்ற மாற்ற விகிதம்; திசையுடைய அளவு; SI அலகு m/s.\n- எடுத்துக்காட்டு: வடக்கு திசையில் 5 m/s → வேகம் = 5 m/s, திசைவேகம் = 5 m/s வடக்கு.'
      };
      return byLangSV[lang] || byLangSV.en;
    }
    const byLang = {
      en: `Here is a concise comparison:\n\n- ${a}: definition, key features, typical use\n- ${b}: definition, key features, typical use\n- Core difference: contrast scope, mechanism, or outcome\n- When to use ${a} vs ${b}: brief guidance\n\nIf you share your grade/topic, I can tailor this further.`,
      hi: `संक्षिप्त तुलना:\n\n- ${a}: परिभाषा, मुख्य विशेषताएँ, सामान्य उपयोग\n- ${b}: परिभाषा, मुख्य विशेषताएँ, सामान्य उपयोग\n- मुख्य अंतर: क्षेत्र, तंत्र या परिणाम में अंतर\n- कब ${a} और कब ${b}: संक्षिप्त मार्गदर्शन\n\nकक्षा/विषय बताएँ तो और बेहतर समझा सकता हूँ।`,
      te: `సంక్షిప్త పోలిక:\n\n- ${a}: నిర్వచనం, ముఖ్య లక్షణాలు, వినియోగం\n- ${b}: నిర్వచనం, ముఖ్య లక్షణాలు, వినియోగం\n- ప్రధాన తేడా: పరిధి/యంత్రాంగం/ఫలితం\n- ఎప్పుడు ${a}, ఎప్పుడు ${b}: చిన్న మార్గదర్శకం\n\nగ్రేడ్/విషయం చెబితే మరింతగా వివరిస్తాను।`,
      kn: `ಸಂಕ್ಷಿಪ್ತ ಹೋಲಿಕೆ:\n\n- ${a}: ವ್ಯಾಖ್ಯಾನ, ಪ್ರಮುಖ ಲಕ್ಷಣಗಳು, ಸಾಮಾನ್ಯ ಬಳಕೆ\n- ${b}: ವ್ಯಾಖ್ಯಾನ, ಪ್ರಮುಖ ಲಕ್ಷಣಗಳು, ಸಾಮಾನ್ಯ ಬಳಕೆ\n- ಮುಖ್ಯ ವ್ಯತ್ಯಾಸ: ವ್ಯಾಪ್ತಿ/ವ್ಯವಸ್ಥೆ/ಫಲಿತಾಂಶ\n- ಯಾವಾಗ ${a}, ಯಾವಾಗ ${b}: ಸಂಕ್ಷಿಪ್ತ ಮಾರ್ಗದರ್ಶನ\n\nತರಗತಿ/ವಿಷಯ ತಿಳಿಸಿದರೆ ಇನ್ನಷ್ಟು ವಿವರಿಸುತ್ತೇನೆ।`,
      ta: `சுருக்கமான ஒப்பீடு:\n\n- ${a}: வரையறை, முக்கிய அம்சங்கள், சாதாரண பயன்பாடு\n- ${b}: வரையறை, முக்கிய அம்சங்கள், சாதாரண பயன்பாடு\n- முக்கிய வித்தியாசம்: வரம்பு/செயல்முறை/விளைவு\n- எப்போது ${a}, எப்போது ${b}: சுருக்க வழிகாட்டி\n\nவகுப்பு/தலைப்பை சொன்னால் மேலும் துல்லியமாக விளக்குவேன்.`
    };
    return byLang[lang] || byLang.en;
  }

  const whatIsMatch = q.match(/^(what is|define|explain)\s+(.+?)\??$/i);
  if (whatIsMatch) {
    const term = whatIsMatch[2].trim();
    const byLang = {
      en: `Definition of ${term}:\n- Core idea: concise explanation\n- Key properties or formula (if any)\n- Simple example\n- Common pitfalls\n\nShare grade/topic for a tailored explanation.`,
      hi: `${term} की परिभाषा:\n- मुख्य विचार: संक्षिप्त व्याख्या\n- मुख्य गुण/सूत्र (यदि हो)\n- सरल उदाहरण\n- सामान्य गलतियाँ\n\nकक्षा/विषय बताएं तो और बेहतर समझाऊँगा।`,
      te: `${term} నిర్వచనం:\n- మూల భావన: సంక్షిప్త వివరణ\n- ముఖ్య లక్షణాలు/సూత్రం (ఉంటే)\n- సరళ ఉదాహరణ\n- సాధారణ తప్పులు\n\nగ్రేడ్/విషయాన్ని చెబితే ప్రత్యేకంగా చెప్పగలను।`,
      kn: `${term} ವ್ಯಾಖ್ಯಾನ:\n- ಮೂಲ ಕಲ್ಪನೆ: ಸಂಕ್ಷಿಪ್ತ ವಿವರಣೆ\n- ಪ್ರಮುಖ ಲಕ್ಷಣಗಳು/ಸೂತ್ರ (ಇದ್ದರೆ)\n- ಸರಳ ಉದಾಹರಣೆ\n- ಸಾಮಾನ್ಯ ದೋಷಗಳು\n\nತರಗತಿ/ವಿಷಯ ತಿಳಿಸಿದರೆ ವಿಶೇಷವಾಗಿ ವಿವರಿಸುತ್ತೇನೆ।`,
      ta: `${term} என 무엇?\n- மைய கருத்து: சுருக்கமான விளக்கம்\n- முக்கிய பண்புகள்/சூத்திரம் (இருந்தால்)\n- எளிய எடுத்துக்காட்டு\n- பொதுவான தவறுகள்\n\nவகுப்பு/தலைப்பை சொன்னால் விரிவாக விளக்குவேன்.`
    };
    return byLang[lang] || byLang.en;
  }

  const howToMatch = q.match(/^(how to|how do i|steps to)\s+(.+?)\??$/i);
  if (howToMatch) {
    const task = howToMatch[2].trim();
    const byLang = {
      en: `Steps to ${task}:\n1) Understand the goal and constraints\n2) Gather required info/tools\n3) Follow a clear procedure\n4) Verify the result\n5) Reflect and improve\n\nTell me your grade/topic to tailor steps and examples.`,
      hi: `${task} के चरण:\n1) लक्ष्य और बाधाएँ समझें\n2) आवश्यक जानकारी/उपकरण जुटाएँ\n3) स्पष्ट प्रक्रिया अपनाएँ\n4) परिणाम जाँचें\n5) सुधार के लिए विचार करें\n\nकक्षा/विषय बताएँ तो चरणों को अनुकूलित करूँगा।`,
      te: `${task} చేయడం కోసం దశలు:\n1) లక్ష్యం/పరిమితులు అర్థం చేసుకోండి\n2) అవసరమైన సమాచారం/సాధనాలు సిద్ధం చేసుకోండి\n3) స్పష్టమైన ప్రక్రియను అనుసరించండి\n4) ఫలితాన్ని ధృవీకరించండి\n5) ఆలోచించి మెరుగుపరచండి\n\nగ్రేడ్/విషయాన్ని చెబితే దశలను అనుకూలీకరిస్తాను।`,
      kn: `${task} ಮಾಡುವ ಹಂತಗಳು:\n1) ಗುರಿ/ನಿಬಂಧನೆಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ\n2) ಅಗತ್ಯ ಮಾಹಿತಿ/ಉಪಕರಣಗಳನ್ನು ಸಿದ್ದಪಡಿಸಿ\n3) ಸ್ಪಷ್ಟ ಕ್ರಮ ಅನುಸರಿಸಿ\n4) ಫಲಿತಾಂಶ ಪರಿಶೀಲಿಸಿ\n5) ಪರಿಷ್ಕರಿಸಿ\n\nತರಗತಿ/ವಿಷಯ ತಿಳಿಸಿದರೆ ಹಂತಗಳನ್ನು ಹೊಂದಿಸುತ್ತೇನೆ।`,
      ta: `${task} செய்வது எப்படி:\n1) இலக்கு/வரம்புகளைப் புரிந்து கொள்\n2) தேவையான தகவல்/கருவிகள் தயார் செய்\n3) தெளிவான செயல்முறையை பின்பற்று\n4) விளைவைச் சரிபார்\n5) மேம்படுத்த சிந்தி\n\nவகுப்பு/தலைப்பு சொன்னால் படிகளைத் தனிப்பயனாக்குவேன்.`
    };
    return byLang[lang] || byLang.en;
  }

  // Topic routing
  const isMath = /(math|algebra|geometry|calculus|pythag|triangle|speed|velocity|area|volume|probability|equation|formula)/.test(q);
  const isScience = /(physics|chemistry|biology|photosynthesis|newton|force|energy|atom|molecule|water cycle|ecosystem)/.test(q);
  const isEnglish = /(english|grammar|writing|vocabulary|sentence|essay|synonym|antonym)/.test(q);
  const isStudy = /(study|exam|prepare|preparation|revision|memor(y|ise|ize)|tips|learn better)/.test(q);

  let parts = [];
  if (isMath) parts.push(pick(lang, 'mathTip'));
  if (isScience) parts.push(pick(lang, 'scienceTip'));
  if (isEnglish) parts.push(pick(lang, 'englishTip'));
  if (isStudy) parts.push(pick(lang, 'studyTip'));

  if (!parts.length) {
    return pick(lang, 'generic');
  }

  return parts.join('\n\n');
}


