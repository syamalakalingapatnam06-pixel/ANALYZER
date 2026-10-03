export const ATS_CATEGORIES = [
  { key: 'formatting', name: 'Formatting', description: 'Margins, fonts, sections, and structural parsing' },
  { key: 'keywords', name: 'Keywords', description: 'Industry keyword density and relevancy' },
  { key: 'skills', name: 'Skills', description: 'Technical, soft, and tool skill presence' },
  { key: 'experience', name: 'Experience', description: 'Work history detail, bullet points, and impact' },
  { key: 'education', name: 'Education', description: 'Degree formatting, field of study, and institution details' },
  { key: 'achievements', name: 'Achievements', description: 'Quantifiable metrics and achievements' },
  { key: 'structure', name: 'Structure', description: 'Standard section order and clarity' },
  { key: 'readability', name: 'Readability', description: 'Sentence length, tone, and grammar clarity' },
];

export const REWRITE_MODES = [
  { id: 'Improve Grammar', label: 'Improve Grammar', desc: 'Fix typos, syntax, and passive phrasing' },
  { id: 'Make Professional', label: 'Make Professional', desc: 'Elevate tone for executive and corporate standards' },
  { id: 'ATS Friendly', label: 'ATS Friendly', desc: 'Optimize for scanner algorithms and keyword parsing' },
  { id: 'Make Concise', label: 'Make Concise', desc: 'Trim fluff while keeping key responsibilities intact' },
  { id: 'Use Strong Action Verbs', label: 'Use Strong Action Verbs', desc: 'Start bullets with powerful action verbs' },
  { id: 'Achievement Focused', label: 'Achievement Focused', desc: 'Highlight results and measurable output' },
  { id: 'Job Specific', label: 'Job Specific', desc: 'Tailor phrasing to the target job description' },
  { id: 'Improve Impact', label: 'Improve Impact', desc: 'Maximize high-level impact and leadership tone' },
];

export const KEYWORD_CATEGORIES = [
  'Technical Skills',
  'Soft Skills',
  'Tools',
  'Frameworks',
  'Programming Languages',
  'Certifications',
  'Domain Terms',
  'Job Responsibilities'
];

export const RESUME_SECTIONS = [
  { id: 'personalInfo', name: 'Personal Information' },
  { id: 'summary', name: 'Professional Summary' },
  { id: 'skills', name: 'Skills' },
  { id: 'experience', name: 'Work Experience' },
  { id: 'education', name: 'Education' },
  { id: 'projects', name: 'Projects' },
  { id: 'certifications', name: 'Certifications' },
  { id: 'achievements', name: 'Achievements' },
  { id: 'coursework', name: 'Relevant Coursework' },
  { id: 'internships', name: 'Internships' },
  { id: 'hackathons', name: 'Hackathons' },
  { id: 'github', name: 'GitHub & Portfolio' },
  { id: 'linkedin', name: 'LinkedIn & Socials' }
];

export const MAX_FILE_SIZE_MB = 5;
export const ALLOWED_EXTENSIONS = ['.pdf', '.docx'];

export const ERROR_MESSAGES = {
  415: 'Please upload a PDF or DOCX file.',
  413: 'Your file is too large. Maximum allowed size is 5 MB.',
  422: 'Text extraction failed. Please upload a text-based PDF or DOCX file.',
  503: 'AI service is not available right now. Please verify Ollama is running on localhost:11434.',
  504: 'The AI request took too long. Please try again.',
  502: 'The AI returned an unexpected response. Please retry.',
  401: 'Your session has expired. Please log in again.',
  403: 'You do not have permission to access this resume resource.',
  404: 'Resume not found or has been removed.',
  500: 'Something went wrong. Please try again.'
};
