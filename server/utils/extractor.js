import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

export const extractTextFromFile = async (fileBuffer, mimeType, originalName) => {
  let text = '';
  const ext = originalName ? originalName.split('.').pop().toLowerCase() : '';

  if (mimeType === 'application/pdf' || ext === 'pdf') {
    const data = await pdfParse(fileBuffer);
    text = data.text;
  } else if (
    mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    mimeType === 'application/msword' ||
    ext === 'docx' ||
    ext === 'doc'
  ) {
    const result = await mammoth.extractRawText({ buffer: fileBuffer });
    text = result.value;
  } else {
    // Plain text fallback
    text = fileBuffer.toString('utf-8');
  }

  return text.trim();
};

export const detectResumeSections = (text) => {
  const lines = text.split('\n').map((line) => line.trim()).filter(Boolean);
  const sections = {
    personalInfo: {},
    summary: '',
    education: [],
    experience: [],
    skills: { technical: [], soft: [], tools: [], frameworks: [], languages: [] },
    projects: [],
    certifications: [],
    achievements: [],
    hackathons: [],
  };

  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) sections.personalInfo.email = emailMatch[0];

  const phoneMatch = text.match(/(\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  if (phoneMatch) sections.personalInfo.phone = phoneMatch[0];

  const linkedinMatch = text.match(/linkedin\.com\/in\/[a-zA-Z0-9_-]+/i);
  if (linkedinMatch) sections.personalInfo.linkedin = `https://${linkedinMatch[0]}`;

  const githubMatch = text.match(/github\.com\/[a-zA-Z0-9_-]+/i);
  if (githubMatch) sections.personalInfo.github = `https://${githubMatch[0]}`;

  const nameLine = lines.find((line) => (
    !/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(line)
    && !/linkedin\.com|github\.com/i.test(line)
    && !/(\+?\d[\d().\s-]{7,}\d)/.test(line)
  ));
  if (nameLine) sections.personalInfo.name = nameLine;

  const headingPatterns = [
    ['summary', /^(professional\s+)?(summary|profile|objective|career objective)$/],
    ['experience', /^(professional\s+|work\s+)?(experience|employment|work history)$/],
    ['education', /^(education|academic background)$/],
    ['skills', /^(technical\s+)?(skills|technologies|technical proficiency)$/],
    ['projects', /^(personal\s+)?projects$/],
    ['certifications', /^(certifications|certificates)$/],
    ['achievements', /^(achievements|honors|awards)$/],
    ['hackathons', /^(hackathons|hackathon experience)$/],
  ];
  const sectionLines = Object.fromEntries(headingPatterns.map(([section]) => [section, []]));
  let currentSection = null;

  for (const line of lines) {
    const normalizedLine = line.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
    const heading = headingPatterns.find(([, pattern]) => pattern.test(normalizedLine));
    if (heading) {
      currentSection = heading[0];
      continue;
    }
    if (currentSection) sectionLines[currentSection].push(line);
  }

  sections.summary = sectionLines.summary.join(' ');
  sections.skills.technical = [...new Set(
    sectionLines.skills.join(',').split(/[,|•;]/).map((skill) => skill.trim()).filter(Boolean)
  )];
  sections.experience = sectionLines.experience.length
    ? [{ highlights: sectionLines.experience.map((line) => line.replace(/^[-•●▪]\s*/, '')) }]
    : [];
  sections.education = sectionLines.education.map((line) => ({ degree: line }));
  sections.projects = sectionLines.projects.map((line) => ({ description: line.replace(/^[-•●▪]\s*/, '') }));
  sections.certifications = sectionLines.certifications;
  sections.achievements = sectionLines.achievements;
  sections.hackathons = sectionLines.hackathons;

  return sections;
};

export const hydrateResumeSections = (resume) => {
  const storedSections = resume.sections?.toObject?.() || resume.sections || {};
  const extractedSections = detectResumeSections(resume.originalText || '');
  const storedSummary = storedSections.summary || '';
  const storedContactInfo = Object.values(storedSections.personalInfo || {}).filter(Boolean);
  const summaryIsPolluted = /professional summary|technical skills|work experience|linkedin\.com|github\.com/i.test(storedSummary)
    || storedContactInfo.some((value) => storedSummary.includes(value));
  const useStoredList = (storedList, extractedList) => (
    Array.isArray(storedList) && storedList.length ? storedList : extractedList
  );

  return {
    ...resume,
    sections: {
      ...extractedSections,
      ...storedSections,
      personalInfo: { ...extractedSections.personalInfo, ...storedSections.personalInfo },
      summary: summaryIsPolluted || !storedSummary ? extractedSections.summary : storedSummary,
      skills: {
        ...extractedSections.skills,
        ...storedSections.skills,
        technical: useStoredList(storedSections.skills?.technical, extractedSections.skills.technical),
      },
      experience: useStoredList(storedSections.experience, extractedSections.experience),
      education: useStoredList(storedSections.education, extractedSections.education),
      projects: useStoredList(storedSections.projects, extractedSections.projects),
      certifications: useStoredList(storedSections.certifications, extractedSections.certifications),
      achievements: useStoredList(storedSections.achievements, extractedSections.achievements),
      hackathons: useStoredList(storedSections.hackathons, extractedSections.hackathons),
    },
  };
};
