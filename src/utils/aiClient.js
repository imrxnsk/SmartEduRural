// Simple AI client for answering arbitrary questions using OpenAI
// Reads API key from Vite env: VITE_OPENAI_API_KEY

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export const isAiConfigured = () => {
  return Boolean(import.meta.env.VITE_OPENAI_API_KEY);
};

export async function askAI(questionText, languageCode) {
  if (!isAiConfigured()) {
    throw new Error('AI is not configured');
  }

  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const model = import.meta.env.VITE_OPENAI_MODEL || 'gpt-4o-mini';

  const systemPrompt = `You are a helpful educational mentor for school students. Answer clearly and concisely.
Always reply in the UI language code provided: ${languageCode}. If the user asks in another language, translate and answer in ${languageCode}.
Keep explanations suitable for grade 6-12 unless the question is clearly advanced. Use bullet points when helpful. Avoid unsafe instructions.`;

  const body = {
    model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: questionText }
    ],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  };

  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`AI request failed: ${response.status} ${text}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content?.trim();
  if (!content) {
    throw new Error('AI returned empty response');
  }
  return content;
}


