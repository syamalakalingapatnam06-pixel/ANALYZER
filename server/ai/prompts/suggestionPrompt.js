export const getSuggestionPrompt = (resumeText, sectionName) => {
  return `Generate specific, actionable suggestions to improve the "${sectionName}" section of this resume.

Return strictly a JSON object:
{
  "section": "${sectionName}",
  "suggestions": [
    {
      "id": "s_1",
      "original": "string",
      "suggestion": "string",
      "reason": "string"
    }
  ]
}

Resume Content:
${resumeText}`;
};
