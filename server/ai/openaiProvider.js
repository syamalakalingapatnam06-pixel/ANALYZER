import OpenAI from 'openai';
import { getAnalyzePrompt } from './prompts/analyzePrompt.js';
import { getMatchPrompt } from './prompts/matchPrompt.js';
import { getRewritePrompt } from './prompts/rewritePrompt.js';
import { getSuggestionPrompt } from './prompts/suggestionPrompt.js';
import { validateAnalysisResponse, validateMatchResponse } from './validators/analysisValidator.js';

let openaiClient = null;

const getOpenAIInstance = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey.includes('your_openai_api_key')) {
    return null;
  }
  if (!openaiClient) {
    openaiClient = new OpenAI({ apiKey });
  }
  return openaiClient;
};

const cleanAndParseJSON = (content) => {
  try {
    let clean = content.trim();
    if (clean.startsWith('```json')) {
      clean = clean.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (clean.startsWith('```')) {
      clean = clean.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }
    return JSON.parse(clean);
  } catch (err) {
    console.error('Failed to parse AI JSON response:', err.message, 'Raw response:', content);
    throw new Error('Invalid JSON format received from AI model');
  }
};

export const analyzeResumeOpenAI = async (resumeText, targetRole, isStudentMode = false) => {
  const openai = getOpenAIInstance();
  if (!openai) {
    throw new Error('OPENAI_API_KEY is missing or not configured');
  }

  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const prompt = getAnalyzePrompt(resumeText, targetRole, isStudentMode);

  let attempts = 0;
  while (attempts < 2) {
    attempts++;
    try {
      const response = await openai.chat.completions.create({
        model,
        messages: [
          { role: 'system', content: 'You respond only in valid JSON objects according to the requested schema.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.2,
        response_format: { type: 'json_object' },
      });

      const content = response.choices[0]?.message?.content;
      const parsed = cleanAndParseJSON(content);

      if (validateAnalysisResponse(parsed)) {
        return parsed;
      }
      console.warn(`[OpenAI Attempt ${attempts}] Analysis validation failed. Retrying...`);
    } catch (err) {
      console.error(`[OpenAI Attempt ${attempts} Error]:`, err.message);
      if (attempts >= 2) throw err;
    }
  }
  throw new Error('AI analysis is temporarily unavailable. Please try again.');
};

export const matchJobOpenAI = async (resumeText, jobDescription, targetRole) => {
  const openai = getOpenAIInstance();
  if (!openai) {
    throw new Error('OPENAI_API_KEY is missing or not configured');
  }

  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const prompt = getMatchPrompt(resumeText, jobDescription, targetRole);

  let attempts = 0;
  while (attempts < 2) {
    attempts++;
    try {
      const response = await openai.chat.completions.create({
        model,
        messages: [
          { role: 'system', content: 'You respond strictly in valid JSON format.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.2,
        response_format: { type: 'json_object' },
      });

      const content = response.choices[0]?.message?.content;
      const parsed = cleanAndParseJSON(content);

      if (validateMatchResponse(parsed)) {
        return parsed;
      }
      console.warn(`[OpenAI Attempt ${attempts}] Job Match validation failed. Retrying...`);
    } catch (err) {
      console.error(`[OpenAI Attempt ${attempts} Match Error]:`, err.message);
      if (attempts >= 2) throw err;
    }
  }
  throw new Error('AI job matching is temporarily unavailable. Please try again.');
};

export const rewriteStatementOpenAI = async (originalText, mode, jobDescription = '') => {
  const openai = getOpenAIInstance();
  if (!openai) {
    throw new Error('OPENAI_API_KEY is missing or not configured');
  }

  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const prompt = getRewritePrompt(originalText, mode, jobDescription);

  const response = await openai.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: 'You respond strictly in valid JSON with fields "improvedText" and "explanation".' },
      { role: 'user', content: prompt },
    ],
    temperature: 0.3,
    response_format: { type: 'json_object' },
  });

  const content = response.choices[0]?.message?.content;
  return cleanAndParseJSON(content);
};

export const generateSuggestionsOpenAI = async (resumeText, sectionName) => {
  const openai = getOpenAIInstance();
  if (!openai) {
    throw new Error('OPENAI_API_KEY is missing or not configured');
  }

  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const prompt = getSuggestionPrompt(resumeText, sectionName);

  const response = await openai.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: 'You respond strictly in valid JSON.' },
      { role: 'user', content: prompt },
    ],
    temperature: 0.3,
    response_format: { type: 'json_object' },
  });

  const content = response.choices[0]?.message?.content;
  return cleanAndParseJSON(content);
};
