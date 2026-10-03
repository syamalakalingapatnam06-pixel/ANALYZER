export const calculateWeightedATSScore = (categoryScores) => {
  const weights = {
    keywords: 0.20,
    formatting: 0.15,
    skills: 0.15,
    experience: 0.15,
    education: 0.10,
    achievements: 0.10,
    structure: 0.10,
    readability: 0.05,
  };

  let totalScore = 0;
  let totalWeight = 0;

  for (const [key, weight] of Object.entries(weights)) {
    const score = typeof categoryScores[key] === 'number' ? categoryScores[key] : 70;
    totalScore += score * weight;
    totalWeight += weight;
  }

  return Math.round(totalScore / totalWeight);
};
