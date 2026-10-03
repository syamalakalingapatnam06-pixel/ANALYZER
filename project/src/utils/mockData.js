export const MOCK_USER = {
  id: 'usr-101',
  name: 'Alex Morgan',
  email: 'alex.morgan@example.com',
  createdAt: '2026-01-15T09:00:00Z',
  defaultRole: 'Full Stack Software Engineer',
  studentMode: false
};

export const MOCK_RESUMES = [
  {
    id: 'res-001',
    title: 'Software Engineer Resume 2026',
    targetRole: 'Full Stack Software Engineer',
    fileName: 'Alex_Morgan_Software_Engineer.pdf',
    fileSize: 1450000,
    updatedAt: '2026-09-28T14:30:00Z',
    atsScore: 82,
    jobMatchScore: 78,
    grammarScore: 88,
    keywordScore: 75,
    version: 'v2.1',
    isStudent: false,
    content: {
      personalInfo: {
        fullName: 'Alex Morgan',
        email: 'alex.morgan@example.com',
        phone: '+1 (555) 234-5678',
        location: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/alexmorgan',
        github: 'github.com/alexmorgan'
      },
      summary: 'Results-driven Full Stack Software Engineer with 4+ years of experience designing and scaling web applications using React, Node.js, and TypeScript. Proven track record of improving system response times by 35%.',
      skills: ['React', 'JavaScript', 'Node.js', 'Express', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Docker', 'REST APIs', 'Git', 'CI/CD', 'Jest'],
      experience: [
        {
          id: 'exp-1',
          company: 'TechCorp Solutions',
          role: 'Senior Frontend Developer',
          duration: '2023 - Present',
          description: 'Led a team of 4 frontend engineers building SaaS web applications.\nOptimized bundle size by 40% using code splitting and lazy loading.\nIntegrated REST APIs and WebSocket services for real-time analytics dashboards.'
        },
        {
          id: 'exp-2',
          company: 'Innovate Labs',
          role: 'Software Developer',
          duration: '2021 - 2023',
          description: 'Developed responsive user interface components using React and Tailwind CSS.\nCollaborated with UI/UX designers to implement accessible WCAG 2.1 AA designs.'
        }
      ],
      education: [
        {
          id: 'edu-1',
          institution: 'University of California, Berkeley',
          degree: 'B.S. in Computer Science',
          year: '2017 - 2021',
          gpa: '3.8/4.0'
        }
      ],
      projects: [
        {
          id: 'proj-1',
          title: 'AI Resume Analyzer',
          techStack: 'React, Node.js, Ollama, Tailwind CSS',
          link: 'github.com/alexmorgan/resume-analyzer',
          description: 'Built a privacy-first ATS resume scoring app powered by local Ollama AI.'
        }
      ],
      certifications: ['AWS Certified Solutions Architect', 'Meta Front-End Developer Professional'],
      achievements: ['Won 1st place in HackSF 2024 out of 50 teams.', 'Published article on Web Performance reaching 50k reads.']
    }
  },
  {
    id: 'res-002',
    title: 'Frontend Specialist Resume',
    targetRole: 'Senior React Developer',
    fileName: 'Alex_Morgan_Frontend_Specialist.docx',
    fileSize: 980000,
    updatedAt: '2026-09-20T11:15:00Z',
    atsScore: 74,
    jobMatchScore: 85,
    grammarScore: 82,
    keywordScore: 70,
    version: 'v1.0',
    isStudent: false,
    content: {
      summary: 'Frontend Engineer specialized in modern JavaScript frameworks and scalable UI components.',
      skills: ['React', 'Next.js', 'Redux', 'Tailwind CSS', 'HTML5', 'CSS3', 'Jest'],
      experience: [],
      education: [],
      projects: []
    }
  }
];

export const MOCK_ANALYSIS = {
  res-001: {
    atsScore: 82,
    grammarScore: 88,
    keywordScore: 75,
    formattingScore: 85,
    overallSummary: 'Your resume has a strong structure, clear section demarcation, and high readability, but keyword coverage for senior-level cloud tools (e.g. AWS, Docker) and metric-backed achievements can be further improved.',
    categoryScores: [
      { name: 'Formatting', key: 'formatting', score: 85, reason: 'Clean margins and readable font hierarchy.', suggestion: 'Ensure bullet points use standard black circle markers.' },
      { name: 'Keywords', key: 'keywords', score: 68, reason: 'Missing several high-demand DevOps and cloud architecture terms.', suggestion: 'Incorporate terms like Docker, Kubernetes, and Microservices.' },
      { name: 'Skills', key: 'skills', score: 80, reason: 'Strong core JavaScript & React representation.', suggestion: 'Categorize skills into Frontend, Backend, and Tools for clarity.' },
      { name: 'Experience', key: 'experience', score: 88, reason: 'Action verbs used effectively in experience bullets.', suggestion: 'Add more quantifiable ROI numbers (e.g., increased conversion by X%).' },
      { name: 'Education', key: 'education', score: 90, reason: 'Degree, university name, and graduation year are correctly structured.', suggestion: 'No changes needed.' },
      { name: 'Achievements', key: 'achievements', score: 65, reason: 'Some bullet points list duties rather than achievements.', suggestion: 'Reframe duties into achievement statements with measurable outcomes.' },
      { name: 'Structure', key: 'structure', score: 92, reason: 'Standard ATS section headings detected.', suggestion: 'Keep order: Summary -> Skills -> Experience -> Education.' },
      { name: 'Readability', key: 'readability', score: 88, reason: 'Concise bullet points with zero passive voice warnings.', suggestion: 'Maintain present/past tense consistency.' }
    ],
    strengths: [
      { title: 'Standard ATS Headings', desc: 'All main sections (Experience, Education, Skills) use industry-standard naming.' },
      { title: 'Quantifiable Results', desc: 'Included specific percentages (e.g., bundle size reduction of 40%).' },
      { title: 'Strong Action Verbs', desc: 'Sentences begin with energetic verbs like Led, Optimized, and Developed.' }
    ],
    weaknesses: [
      { id: 'w1', title: 'Missing Cloud Infrastructure Keywords', severity: 'High', desc: 'Target role emphasizes AWS or GCP deployment experience which is currently missing.' },
      { id: 'w2', title: 'Unquantified Duties in Earlier Role', severity: 'Medium', desc: 'Software Developer role bullet points lack metric-based achievements.' },
      { id: 'w3', title: 'Dense Summary Paragraph', severity: 'Low', desc: 'Professional summary exceeds 3 sentences, reducing initial scan speed.' }
    ],
    grammarIssues: [
      {
        id: 'g1',
        original: 'Responsible for managing a team of 4 engineers',
        problem: 'Weak passive starter ("Responsible for")',
        suggestion: 'Directed a high-performing engineering team of 4 developers',
        explanation: 'Active verbs demonstrate proactive leadership instead of passive obligation.'
      },
      {
        id: 'g2',
        original: 'Worked on building different web apps',
        problem: 'Vague terminology ("different web apps")',
        suggestion: 'Architected scalable cross-platform web applications',
        explanation: 'Specific terminology highlights professional technical scope.'
      }
    ],
    missingSections: [
      { name: 'Certifications', status: 'Included', note: 'AWS Certified architect present.' },
      { name: 'Relevant Coursework', status: 'Optional', note: 'Recommended if applying as Student/Fresher.' },
      { name: 'Volunteer Work', status: 'Missing', note: 'Can enhance leadership score if space permits.' }
    ],
    keywords: [
      { word: 'React', category: 'Frameworks', status: 'Found', section: 'Skills' },
      { word: 'JavaScript', category: 'Programming Languages', status: 'Found', section: 'Skills' },
      { word: 'TypeScript', category: 'Programming Languages', status: 'Found', section: 'Skills' },
      { word: 'Docker', category: 'Tools', status: 'Found', section: 'Skills' },
      { word: 'Kubernetes', category: 'Tools', status: 'Not Found', section: '-' },
      { word: 'GraphQL', category: 'Technical Skills', status: 'Not Found', section: '-' },
      { word: 'CI/CD Pipeline', category: 'Domain Terms', status: 'Found', section: 'Skills' },
      { word: 'Agile/Scrum', category: 'Job Responsibilities', status: 'Not Found', section: '-' }
    ]
  }
};

export const MOCK_JOB_MATCH = {
  matchScore: 78,
  matchingSkills: ['React', 'JavaScript', 'Node.js', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'Git'],
  missingSkills: ['GraphQL', 'Kubernetes', 'AWS Lambda', 'Redis'],
  matchingKeywords: [
    { word: 'React', status: 'FOUND', section: 'Skills' },
    { word: 'TypeScript', status: 'FOUND', section: 'Skills' },
    { word: 'REST APIs', status: 'FOUND', section: 'Experience' },
    { word: 'CI/CD', status: 'FOUND', section: 'Skills' }
  ],
  missingKeywords: [
    { word: 'GraphQL', status: 'NOT FOUND', section: '—' },
    { word: 'Kubernetes', status: 'NOT FOUND', section: '—' },
    { word: 'AWS Lambda', status: 'NOT FOUND', section: '—' },
    { word: 'Redis', status: 'NOT FOUND', section: '—' }
  ],
  relevantExperience: [
    'Senior Frontend Developer at TechCorp Solutions (2023 - Present)',
    'Software Developer at Innovate Labs (2021 - 2023)'
  ],
  relevantProjects: [
    'AI Resume Analyzer (React, Node.js, Ollama)'
  ],
  improvementAreas: [
    'Add experience or projects involving cloud serverless technologies (AWS Lambda / Cloud Functions).',
    'Include container orchestration tools if applicable (Kubernetes / ECS).',
    'Explicitly list state management or API query caching tools (GraphQL / React Query).'
  ]
};

export const MOCK_REWRITES = {
  'Improve Grammar': {
    original: 'Responsible for writing frontend components and fixing bugs for the company client app.',
    improved: 'Engineered reusable frontend UI components and resolved critical client-facing application bugs, enhancing system stability by 25%.',
    explanation: 'Replaced passive starter with "Engineered" and added metric-backed stability impact.'
  },
  'Make Professional': {
    original: 'Handled database stuff and made the site load faster.',
    improved: 'Optimized relational database queries and implemented caching strategies, resulting in a 35% reduction in page load latency.',
    explanation: 'Substituted informal terminology with professional backend engineering descriptions.'
  },
  'ATS Friendly': {
    original: 'Made cool React web stuff using modern tools.',
    improved: 'Developed responsive single-page applications utilizing React.js, Webpack, Babel, and Tailwind CSS following modern ATS structural guidelines.',
    explanation: 'Injected specific searchable keywords (React.js, Webpack, Babel, Tailwind CSS).'
  },
  'Make Concise': {
    original: 'Worked together in a close collaboration with the cross-functional product design team in order to create and refine the user interface designs.',
    improved: 'Collaborated with cross-functional design teams to create and refine high-converting user interfaces.',
    explanation: 'Eliminated redundant filler phrasing while maintaining core collaborative intent.'
  },
  'Use Strong Action Verbs': {
    original: 'Helped with building new feature implementations for users.',
    improved: 'Spearheaded the design and rollout of key end-user application features.',
    explanation: 'Replaced helper phrasing with high-impact active lead verb "Spearheaded".'
  },
  'Achievement Focused': {
    original: 'Created a new dashboard page for internal team metrics.',
    improved: 'Designed and deployed an internal metrics dashboard that boosted team analytical efficiency by 40%.',
    explanation: 'Framed project delivery as an efficiency achievement with quantifiable output.'
  },
  'Job Specific': {
    original: 'Built APIs with Node and Express to talk to database.',
    improved: 'Architected RESTful microservices with Node.js and Express, enabling low-latency data exchange with PostgreSQL datastores.',
    explanation: 'Tailored technical stack descriptions to match Senior Node.js developer requirements.'
  },
  'Improve Impact': {
    original: 'Maintained code base and reviewed pull requests from team.',
    improved: 'Championed code quality standards across the organization by conducting thorough code reviews and enforcing CI/CD pipeline automated testing.',
    explanation: 'Elevated routine maintenance into leadership-level quality assurance impact.'
  }
};

export const MOCK_SCORE_TRENDS = [
  { date: 'Aug 10', atsScore: 62, jobMatchScore: 58 },
  { date: 'Aug 24', atsScore: 70, jobMatchScore: 65 },
  { date: 'Sep 05', atsScore: 75, jobMatchScore: 72 },
  { date: 'Sep 18', atsScore: 78, jobMatchScore: 74 },
  { date: 'Sep 28', atsScore: 82, jobMatchScore: 78 },
];

export const MOCK_HISTORY = [
  { id: 'hist-1', resumeTitle: 'Software Engineer Resume 2026', targetRole: 'Full Stack Engineer', atsScore: 82, jobMatchScore: 78, date: '2026-09-28' },
  { id: 'hist-2', resumeTitle: 'Software Engineer Resume 2026', targetRole: 'Senior React Developer', atsScore: 78, jobMatchScore: 85, date: '2026-09-20' },
  { id: 'hist-3', resumeTitle: 'Frontend Specialist Resume', targetRole: 'Frontend Developer', atsScore: 74, jobMatchScore: 70, date: '2026-09-12' },
];
