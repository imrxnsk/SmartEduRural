import { franc } from 'franc';

// Language mapping from franc codes to our supported languages
const languageMap = {
  'eng': 'en',
  'hin': 'hi', 
  'tel': 'te',
  'kan': 'kn',
  'tam': 'ta',
  'urd': 'ur',
  'ben': 'bn',
  'guj': 'gu',
  'mar': 'mr',
  'mal': 'ml',
  'ori': 'or',
  'pan': 'pa',
  'asm': 'as'
};

// Detect language from text input
export const detectLanguage = (text) => {
  if (!text || !text.trim()) {
    return 'en';
  }
  const trimmed = text.trim();
  // For very short inputs, prefer script heuristic over franc
  if (trimmed.length < 3) {
    const script = detectByScriptHeuristic(trimmed);
    if (script) return script;
    return 'en';
  }

  try {
    const detected = franc(trimmed);
    const mappedLanguage = languageMap[detected] || 'en';
    if (detected === 'und' || !mappedLanguage) {
      const script = detectByScriptHeuristic(trimmed);
      return script || 'en';
    }
    return mappedLanguage;
  } catch (error) {
    console.error('Language detection error:', error);
    const script = detectByScriptHeuristic(trimmed);
    return script || 'en';
  }
};

// Heuristic detection by script ranges with priority order (first match wins)
function detectByScriptHeuristic(text) {
  if (!text) return null;
  // Scan left-to-right and return the first script block we encounter
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const code = ch.codePointAt(0);
    if (!code) continue;
    // Devanagari (Hindi)
    if (code >= 0x0900 && code <= 0x097F) return 'hi';
    // Tamil
    if (code >= 0x0B80 && code <= 0x0BFF) return 'ta';
    // Telugu
    if (code >= 0x0C00 && code <= 0x0C7F) return 'te';
    // Kannada
    if (code >= 0x0C80 && code <= 0x0CFF) return 'kn';
    // Bengali
    if (code >= 0x0980 && code <= 0x09FF) return 'bn';
    // Gujarati
    if (code >= 0x0A80 && code <= 0x0AFF) return 'gu';
    // Malayalam
    if (code >= 0x0D00 && code <= 0x0D7F) return 'ml';
    // Marathi uses Devanagari (covered by hi)
    // Urdu (Arabic)
    if (code >= 0x0600 && code <= 0x06FF) return 'ur';
    // Odia
    if (code >= 0x0B00 && code <= 0x0B7F) return 'or';
    // Punjabi (Gurmukhi)
    if (code >= 0x0A00 && code <= 0x0A7F) return 'pa';
    // Assamese uses Bengali block (covered by bn)
  }
  return null;
}

// Smart detector that prefers script heuristic for mixed-language inputs
export const detectLanguageSmart = (text) => {
  if (!text || !text.trim()) return 'en';
  const scriptLang = detectByScriptHeuristic(text);
  if (scriptLang) return scriptLang;
  // Fallback to franc mapping
  try {
    const code = franc(text);
    const mapped = languageMap[code];
    return mapped || 'en';
  } catch {
    return 'en';
  }
};

// Check if text contains non-Latin characters (indicating regional language)
export const containsNonLatinCharacters = (text) => {
  return /[\u0900-\u097F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F\u0D80-\u0DFF\u0E00-\u0E7F\u0F00-\u0FFF]/.test(text);
};

// Get language name from code
export const getLanguageName = (code) => {
  const names = {
    'en': 'English',
    'hi': 'Hindi',
    'te': 'Telugu', 
    'kn': 'Kannada',
    'ta': 'Tamil',
    'ur': 'Urdu',
    'bn': 'Bengali',
    'gu': 'Gujarati',
    'mr': 'Marathi',
    'ml': 'Malayalam',
    'or': 'Odia',
    'pa': 'Punjabi',
    'as': 'Assamese'
  };
  return names[code] || 'English';
};

// Heuristic: check if text likely matches the target language script
export const isLikelyLanguage = (text, lang) => {
  if (!text || !lang) return false;
  switch (lang) {
    case 'hi': // Devanagari
      return /[\u0900-\u097F]/.test(text);
    case 'ta': // Tamil
      return /[\u0B80-\u0BFF]/.test(text);
    case 'te': // Telugu
      return /[\u0C00-\u0C7F]/.test(text);
    case 'kn': // Kannada
      return /[\u0C80-\u0CFF]/.test(text);
    case 'bn': // Bengali
      return /[\u0980-\u09FF]/.test(text);
    case 'gu': // Gujarati
      return /[\u0A80-\u0AFF]/.test(text);
    case 'ml': // Malayalam
      return /[\u0D00-\u0D7F]/.test(text);
    case 'ur': // Arabic script
      return /[\u0600-\u06FF]/.test(text);
    case 'or': // Odia
      return /[\u0B00-\u0B7F]/.test(text);
    case 'pa': // Gurmukhi
      return /[\u0A00-\u0A7F]/.test(text);
    case 'en':
    default:
      // If requesting English, ensure absence of above scripts or presence of latin letters
      return /[A-Za-z]/.test(text);
  }
};
