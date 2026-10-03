export const getAnalyzePrompt = (resumeText, targetRole, isStudentMode = false) => {
  return `You are an expert ATS (Applicant Tracking System) Auditor and Senior Career Coach.
Analyze the following resume text against the target role: "${targetRole}".
${isStudentMode ? 'NOTE: The candidate is in STUDENT / FRESHER mode. Prioritize projects, technical skills, coursework, certifications, hackathons, and academic achievements over extensive full-time work experience.' : ''}

CRITICAL MANDATORY SAFETY RULES:
1. NEVER invent or fabricate work experience, projects, certifications, skills, achievements, statistics, or employers.
2. If metrics or statistics are missing, suggest that the user add them IF they have real numbers, but do NOT invent fake numbers like "improved efficiency by 45%".
3. Original content must be preserved as truth.

Provide your evaluation strictly as a valid JSON object matching this schema:
{
  "atsScore": number (0-100),
  "categoryScores": {
    "keywords": number (0-100),
    "formatting": number (0-100),
    "skills": number (0-100),
    "experience": number (0-100),
    "education": number (0-100),
    "achievements": number (0-100),
    "structure": number (0-100),
    "readability": number (0-100)
  },
  "categoryFeedback": {
    "keywords": { "reason": "string", "suggestion": "string" },
    "formatting": { "reason": "string", "suggestion": "string" },
    "skills": { "reason": "string", "suggestion": "string" },
    "experience": { "reason": "string", "suggestion": "string" },
    "education": { "reason": "string", "suggestion": "string" },
    "achievements": { "reason": "string", "suggestion": "string" },
    "structure": { "reason": "string", "suggestion": "string" },
    "readability": { "reason": "string", "suggestion": "string" }
  },
  "strengths": ["string"],
  "weaknesses": ["string"],
  "missingSections": ["string"],
  "grammarIssues": [
    {
      "original": "string",
      "problem": "string",
      "correction": "string",
      "explanation": "string"
    }
  ],
  "suggestions": [
    {
      "id": "s1",
      "section": "Summary | Experience | Skills | Education | Projects | Achievements",
      "original": "string",
      "suggestion": "string",
      "reason": "string"
    }
  ]
}

RESUME TEXT:
---
${resumeText}
---`;
};
