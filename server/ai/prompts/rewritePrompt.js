export const getRewritePrompt = (originalText, mode, jobDescription = '') => {
  return `You are a professional Resume Writer and Executive Editor.
Rewrite the following resume bullet point or section based on the requested mode: "${mode}".

Modes:
- "Improve Grammar": Fix syntax, spelling, punctuation, and readability.
- "Make Professional": Enhance vocabulary, tone, and professional phrasing.
- "ATS Friendly": Use standard high-impact industry terminology and keywords.
- "Make Concise": Remove filler words and keep action-dense.
- "Strong Action Verbs": Start with powerful action verbs (e.g., Engineered, Spearheaded, Architected, Optimized).
- "Achievement Focused": Focus on outcomes, achievements, and impact.
- "Job Specific": Tailor content to align with the provided target job description.
- "Improve Impact": Maximize clarity, active voice, and professional impression.

CRITICAL SAFETY RULES:
1. Preserve all factual information (dates, companies, tools, true metrics).
2. NEVER invent fake metrics, false technologies, or unearned achievements.
3. If no metric is present, do NOT hallucinate "by 40%". Rephrase with focus on scope and technique.

Target Job Context (if any):
${jobDescription || 'N/A'}

Original Text:
"${originalText}"

Return strictly a JSON object:
{
  "improvedText": "string",
  "explanation": "string describing what changed and why"
}`;
};
