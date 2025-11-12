// Web-powered Q&A without API keys: Wikipedia summaries and DuckDuckGo Instant Answer.
// Note: Browser CORS may block some endpoints; we handle failures and return null to allow fallbacks.

function normalizeLang(uiLanguage) {
  // Prefer two-letter ISO codes; default to English
  if (typeof uiLanguage === 'string' && /^[a-z]{2}$/i.test(uiLanguage)) {
    return uiLanguage.toLowerCase();
  }
  return 'en';
}

function sanitizeQuery(q) {
  if (!q) return '';
  const s = String(q).trim();
  const patterns = [
    /^(definition of|what is|explain|define)\s+/i,
    // Hindi
    /^(परिभाषा|क्या है|समझाइए)\s+/i,
    // Telugu
    /^(నిర్వచనం|ఏమిటి|వివరించండి)\s+/i,
    // Kannada
    /^(ವ್ಯಾಖ್ಯಾನ|ಏನು|ವಿವರಿಸಿ)\s+/i,
    // Tamil
    /^(வரையறை|என்ன|விளக்கவும்)\s+/i
  ];
  let out = s;
  for (const p of patterns) out = out.replace(p, '');
  return out.trim();
}

const CACHE = new Map();

async function fetchJson(url, options = {}) {
  const cacheKey = `GET:${url}`;
  if (CACHE.has(cacheKey)) return CACHE.get(cacheKey);
  try {
    const res = await fetch(url, { headers: { 'Accept': 'application/json' }, ...options });
    if (!res.ok) return null;
    const json = await res.json();
    // naive cache with small TTL effect via size bound
    CACHE.set(cacheKey, json);
    if (CACHE.size > 200) {
      // drop oldest entry
      const firstKey = CACHE.keys().next().value;
      CACHE.delete(firstKey);
    }
    return json;
  } catch (_) {
    return null;
  }
}

async function searchWikipediaTitle(query, lang, signal) {
  // Use opensearch with CORS allowed by origin=*
  const url = `https://${lang}.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(query)}&limit=1&namespace=0&format=json&origin=*`;
  const data = await fetchJson(url, { signal });
  if (!data || !Array.isArray(data) || !data[1] || !data[1][0]) return null;
  return data[1][0];
}

async function fetchWikipediaExtractViaAPI(queryOrTitle, lang, signal) {
  // Fallback: MediaWiki API extracts with CORS via origin=*
  const url = `https://${lang}.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=1&explaintext=1&redir=1&titles=${encodeURIComponent(queryOrTitle)}&format=json&origin=*`;
  const data = await fetchJson(url, { signal });
  if (!data || !data.query || !data.query.pages) return null;
  const pages = data.query.pages;
  const firstKey = Object.keys(pages)[0];
  if (!firstKey || firstKey === '-1') return null;
  const page = pages[firstKey];
  if (page && page.extract) return page.extract;
  return null;
}

async function getInterlanguageTitle(sourceTitle, sourceLang, targetLang, signal) {
  // Use langlinks to map an English title to the desired language title
  const url = `https://${sourceLang}.wikipedia.org/w/api.php?action=query&prop=langlinks&titles=${encodeURIComponent(sourceTitle)}&lllang=${encodeURIComponent(targetLang)}&format=json&origin=*`;
  const data = await fetchJson(url, { signal });
  if (!data || !data.query || !data.query.pages) return null;
  const pages = data.query.pages;
  const firstKey = Object.keys(pages)[0];
  if (!firstKey || firstKey === '-1') return null;
  const page = pages[firstKey];
  const ll = page && page.langlinks && page.langlinks[0];
  if (ll && ll['*']) return ll['*'];
  return null;
}

export async function answerFromWikipedia(query, uiLanguage, signal) {
  const lang = normalizeLang(uiLanguage);
  const cleaned = sanitizeQuery(query);
  // Try direct summary in the requested language only
  let url = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cleaned || query)}`;
  let data = await fetchJson(url, { signal });
  if (data && data.extract) return data.extract;

  // If not found, search best title then get summary
  const title = await searchWikipediaTitle(cleaned || query, lang, signal);
  if (!title) return null;
  url = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  data = await fetchJson(url, { signal });
  if (data && data.extract) return data.extract;

  // Final fallback via MediaWiki extracts API
  const extract = await fetchWikipediaExtractViaAPI(title, lang, signal);
  if (extract) return extract;

  // Bridge from English: find English title, then interlanguage link to target language
  const enTitle = await searchWikipediaTitle(cleaned || query, 'en', signal);
  if (enTitle) {
    const mappedTitle = await getInterlanguageTitle(enTitle, 'en', lang, signal);
    if (mappedTitle) {
      // Try REST summary in target lang for mapped title
      const mappedUrl = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(mappedTitle)}`;
      const mappedData = await fetchJson(mappedUrl, { signal });
      if (mappedData && mappedData.extract) return mappedData.extract;
      const mappedExtract = await fetchWikipediaExtractViaAPI(mappedTitle, lang, signal);
      if (mappedExtract) return mappedExtract;
    }
  }
  return null;
}

export async function answerFromDuckDuckGo(query, uiLanguage, signal) {
  const lang = normalizeLang(uiLanguage);
  // DuckDuckGo Instant Answer API (no CORS headers by default; may fail)
  const api = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1&no_html=1&skip_disambig=1&kl=${lang}-${lang}`;
  const data = await fetchJson(api, { signal });
  if (!data) return null;
  if (data.AbstractText) return data.AbstractText;
  if (data.Abstract) return data.Abstract;
  if (data.Heading) return `${data.Heading}: ${data.AbstractText || ''}`.trim();
  return null;
}

export async function answerFromWeb(query, uiLanguage, signal) {
  // Try Wikipedia, then DuckDuckGo
  const wiki = await answerFromWikipedia(query, uiLanguage, signal);
  if (wiki) return wiki;
  const ddg = await answerFromDuckDuckGo(query, uiLanguage, signal);
  if (ddg) return ddg;
  return null;
}


