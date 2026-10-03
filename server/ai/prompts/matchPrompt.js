export const getMatchPrompt = (resumeText, jobDescription, targetRole) => {
  return `You are a Technical Recruiter and Job Match Specialist.
Compare the resume text with the job description for target role "${targetRole}".

CRITICAL MANDATORY SAFETY RULES:
1. Identify matching and missing skills truthfully based ONLY on the provided resume text and job description.
2. For missing skills, provide a clear disclaimer reminder that the user should ONLY add skills they genuinely possess.
3. NEVER invent skills, projects, or statistics.

Return strictly a valid JSON object with this schema:
{
  "matchScore": number (0-100),
  "matchingSkills": ["string"],
  "missingSkills": ["string"],
  "matchingKeywords": ["string"],
  "missingKeywords": ["string"],
  "keywordCategories": {
    "technicalSkills": ["string"],
    "softSkills": ["string"],
    "tools": ["string"],
    "frameworks": ["string"],
    "programmingLanguages": ["string"],
    "certifications": ["string"],
    "domainTerms": ["string"],
    "responsibilities": ["string"]
  },
  "relevantExperienceMatch": "string summary analysis",
  "relevantProjectsMatch": "string summary analysis",
  "improvementAreas": ["string"]
}

RESUME TEXT:
${resumeText}

JOB DESCRIPTION:
${jobDescription}`;
};
