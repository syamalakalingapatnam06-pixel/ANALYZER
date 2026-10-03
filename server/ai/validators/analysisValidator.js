export const validateAnalysisResponse = (data) => {
  if (!data || typeof data !== 'object') return false;
  
  if (typeof data.atsScore !== 'number' || data.atsScore < 0 || data.atsScore > 100) {
    return false;
  }
  
  if (!data.categoryScores || typeof data.categoryScores !== 'object') {
    return false;
  }
  
  const requiredCategories = ['keywords', 'formatting', 'skills', 'experience', 'education', 'achievements', 'structure', 'readability'];
  for (const cat of requiredCategories) {
    if (typeof data.categoryScores[cat] !== 'number') {
      return false;
    }
  }

  if (!Array.isArray(data.strengths) || !Array.isArray(data.weaknesses)) {
    return false;
  }

  return true;
};

export const validateMatchResponse = (data) => {
  if (!data || typeof data !== 'object') return false;
  if (typeof data.matchScore !== 'number') return false;
  if (!Array.isArray(data.matchingSkills) || !Array.isArray(data.missingSkills)) return false;
  return true;
};
