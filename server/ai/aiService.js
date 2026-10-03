import {
  analyzeResumeOpenAI,
  matchJobOpenAI,
  rewriteStatementOpenAI,
  generateSuggestionsOpenAI,
} from './openaiProvider.js';

export const aiService = {
  /**
   * Analyze Resume against target role
   */
  async analyzeResume(resumeText, targetRole = 'Software Engineer', isStudentMode = false) {
    try {
      console.log('[AI Service] Triggering resume analysis via OpenAI Provider...');
      return await analyzeResumeOpenAI(resumeText, targetRole, isStudentMode);
    } catch (error) {
      console.warn('[AI Service Warning]', error.message);
      // Re-throw or handle based on application setup
      throw error;
    }
  },

  /**
   * Match Resume with Job Description
   */
  async matchJob(resumeText, jobDescription, targetRole = 'Software Engineer') {
    try {
      console.log('[AI Service] Triggering job match via OpenAI Provider...');
      return await matchJobOpenAI(resumeText, jobDescription, targetRole);
    } catch (error) {
      console.warn('[AI Service Warning]', error.message);
      throw error;
    }
  },

  /**
   * Rewrite resume statement
   */
  async rewriteStatement(originalText, mode = 'Make Professional', jobDescription = '') {
    try {
      console.log(`[AI Service] Triggering statement rewrite (Mode: ${mode})...`);
      return await rewriteStatementOpenAI(originalText, mode, jobDescription);
    } catch (error) {
      console.warn('[AI Service Warning]', error.message);
      throw error;
    }
  },

  /**
   * Generate suggestions for a specific section
   */
  async generateSuggestions(resumeText, sectionName = 'Summary') {
    try {
      console.log(`[AI Service] Generating suggestions for section: ${sectionName}...`);
      return await generateSuggestionsOpenAI(resumeText, sectionName);
    } catch (error) {
      console.warn('[AI Service Warning]', error.message);
      throw error;
    }
  },
};

export default aiService;
