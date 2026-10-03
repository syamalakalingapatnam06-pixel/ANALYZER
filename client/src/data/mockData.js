export const initialMockUser = {
  id: 'usr_demo_101',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  isStudentMode: false,
};

export const initialMockResumes = [
  {
    id: 'res_1',
    _id: 'res_1',
    title: 'Software Engineer Resume',
    targetRole: 'Frontend Developer',
    isStudentMode: false,
    atsScore: 82,
    suggestionsCount: 4,
    version: 2,
    createdAt: '2026-09-28T10:30:00Z',
    updatedAt: '2026-09-29T14:20:00Z',
    originalText: `ALEX JOHNSON
Frontend Engineer | React Specialist
San Francisco, CA | alex.johnson@example.com | github.com/alexj | linkedin.com/in/alexjohnson

SUMMARY
Experienced Frontend Developer with 3+ years of building web applications using React, JavaScript, and CSS. Passionate about creating responsive user interfaces and improving performance.

SKILLS
JavaScript, React, HTML5, CSS3, Tailwind CSS, Redux, Git, REST APIs, Jest, Webpack

EXPERIENCE
Frontend Developer | TechCorp Inc. | 2023 - Present
- Built user interfaces for high-traffic web applications using React and Tailwind CSS.
- Improved application load time and optimized component re-renders.
- Collaborated with backend engineers to integrate RESTful APIs.

Software Engineer Intern | Innovate Soft | 2022 - 2023
- Developed reusable UI components and written unit tests using Jest.
- Assisted in bug fixes and refactored legacy JavaScript code.

EDUCATION
B.S. in Computer Science | State University | 2018 - 2022

PROJECTS
E-Commerce Dashboard: Built real-time analytics dashboard with React, Chart.js, and Node.js.`,
    sections: {
      personalInfo: {
        name: 'Alex Johnson',
        email: 'alex.johnson@example.com',
        phone: '+1 (555) 234-5678',
        location: 'San Francisco, CA',
        linkedin: 'https://linkedin.com/in/alexjohnson',
        github: 'https://github.com/alexj',
      },
      summary: 'Experienced Frontend Developer with 3+ years of building web applications using React, JavaScript, and CSS. Passionate about creating responsive user interfaces and improving performance.',
      skills: {
        technical: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Redux', 'Git', 'REST APIs', 'Jest'],
        soft: ['Problem Solving', 'Teamwork', 'Communication'],
        tools: ['VS Code', 'Webpack', 'Postman'],
        frameworks: ['React', 'Next.js'],
        languages: ['JavaScript', 'TypeScript', 'HTML/CSS'],
      },
      education: [
        {
          degree: 'B.S. in Computer Science',
          institution: 'State University',
          location: 'San Francisco, CA',
          year: '2018 - 2022',
          gpa: '3.8/4.0',
        },
      ],
      experience: [
        {
          company: 'TechCorp Inc.',
          role: 'Frontend Developer',
          location: 'San Francisco, CA',
          dates: '2023 - Present',
          highlights: [
            'Built user interfaces for high-traffic web applications using React and Tailwind CSS.',
            'Improved application load time and optimized component re-renders.',
            'Collaborated with backend engineers to integrate RESTful APIs.',
          ],
        },
        {
          company: 'Innovate Soft',
          role: 'Software Engineer Intern',
          location: 'San Jose, CA',
          dates: '2022 - 2023',
          highlights: [
            'Developed reusable UI components and written unit tests using Jest.',
            'Assisted in bug fixes and refactored legacy JavaScript code.',
          ],
        },
      ],
      projects: [
        {
          title: 'E-Commerce Dashboard',
          techStack: ['React', 'Chart.js', 'Node.js'],
          description: 'Built real-time analytics dashboard with React, Chart.js, and Node.js.',
          link: 'https://github.com/alexj/ecommerce-dash',
        },
      ],
      certifications: [
        { title: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', year: '2023' },
      ],
      achievements: ['Dean\'s List for 6 consecutive semesters', 'Hackathon 1st Place Winner 2022'],
    },
  },
  {
    id: 'res_2',
    _id: 'res_2',
    title: 'Fullstack Developer Resume',
    targetRole: 'Full Stack Engineer',
    isStudentMode: false,
    atsScore: 74,
    suggestionsCount: 6,
    version: 1,
    createdAt: '2026-09-20T08:15:00Z',
    updatedAt: '2026-09-20T08:15:00Z',
    originalText: `ALEX JOHNSON - FULLSTACK DEVELOPER...`,
    sections: {
      personalInfo: { name: 'Alex Johnson', email: 'alex.johnson@example.com' },
      summary: 'Full Stack developer experienced in MERN stack applications.',
      skills: { technical: ['Node.js', 'Express', 'MongoDB', 'React', 'JavaScript'] },
    },
  },
];

export const mockAnalysis = {
  resumeId: 'res_1',
  atsScore: 82,
  categoryScores: {
    keywords: 85,
    formatting: 90,
    skills: 80,
    experience: 82,
    education: 88,
    achievements: 78,
    structure: 85,
    readability: 92,
  },
  categoryFeedback: {
    keywords: { reason: 'Matches 85% of target role core terms.', suggestion: 'Add domain terms like GraphQL, Docker, and CI/CD.' },
    formatting: { reason: 'Clean bullet points and uniform margins.', suggestion: 'Ensure consistent date formatting (e.g. MMM YYYY).' },
    skills: { reason: 'Strong core frontend & backend coverage.', suggestion: 'Group skills by categories (Languages, Frameworks, Cloud).' },
    experience: { reason: 'Solid action-oriented bullet points.', suggestion: 'Quantify impact with metrics (e.g. latency reduction).' },
    education: { reason: 'Degree, institution, and graduation dates verified.', suggestion: 'Highlight relevant CS coursework.' },
    achievements: { reason: 'Notable achievements included.', suggestion: 'Specify scale of systems or team size.' },
    structure: { reason: 'Logical section flow detected.', suggestion: 'Place Skills near the top for quick scanner readability.' },
    readability: { reason: 'Excellent Flesch-Kincaid grade level.', suggestion: 'Maintain concise 1-2 line bullet points.' },
  },
  strengths: [
    'Strong technical skill alignment with target Frontend Developer role',
    'Clear, readable structure with standard section headers recognized by ATS',
    'Consistent use of action-oriented experience bullet points',
    'Well-formatted contact and social link headers',
  ],
  weaknesses: [
    'Missing quantifiable metrics in earlier work experience (e.g., % improvement, traffic size)',
    'Soft skills section could be integrated into achievement statements',
    'Target job key terms like TypeScript & Next.js are absent in skills overview',
  ],
  missingSections: ['Certifications Section Header', 'Metrics & Quantifiable Impact'],
  grammarIssues: [
    {
      original: 'Developed reusable UI components and written unit tests using Jest.',
      problem: 'Grammatical tense mismatch ("written" vs "developed")',
      correction: 'Developed reusable UI components and wrote comprehensive unit tests using Jest.',
      explanation: 'Using consistent past-tense verbs maintains grammatical harmony in bullet points.',
    },
  ],
  suggestions: [
    {
      id: 's_1',
      section: 'Summary',
      original: 'Experienced Frontend Developer with 3+ years of building web applications using React, JavaScript, and CSS.',
      suggestion: 'Results-driven Frontend Engineer with 3+ years of experience architecting scalable React applications, optimizing web performance, and collaborating with cross-functional teams.',
      reason: 'Replaces generic summary with high-impact action verbs and ATS target role terminology.',
      status: 'pending',
    },
    {
      id: 's_2',
      section: 'Experience',
      original: 'Improved application load time and optimized component re-renders.',
      suggestion: 'Optimized React component rendering lifecycles and bundle size, reducing page load latency by 28% across high-traffic routes.',
      reason: 'Adds measurable performance achievement metric and ATS optimization keywords.',
      status: 'pending',
    },
    {
      id: 's_3',
      section: 'Experience',
      original: 'Collaborated with backend engineers to integrate RESTful APIs.',
      suggestion: 'Partnered with backend engineers to integrate RESTful microservices, designing robust data contracts and client-side error handling.',
      reason: 'Enhances technical depth and professional phrasing.',
      status: 'pending',
    },
  ],
  isDemoData: true,
};

export const mockJobMatch = {
  resumeId: 'res_1',
  matchScore: 76,
  matchingSkills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Redux', 'Git', 'REST APIs', 'Jest'],
  missingSkills: ['TypeScript', 'Next.js', 'GraphQL', 'Docker', 'CI/CD'],
  matchingKeywords: ['Single Page Applications', 'State Management', 'UI/UX Design', 'Agile Environment', 'Responsive Layouts'],
  missingKeywords: ['Micro-frontends', 'End-to-End Testing (Cypress)', 'Server-Side Rendering (SSR)', 'Performance Benchmarking'],
  keywordCategories: {
    technicalSkills: ['React.js', 'JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'Redux Toolkit'],
    softSkills: ['Problem Solving', 'Team Collaboration', 'Effective Communication', 'Adaptability'],
    tools: ['VS Code', 'Git', 'Postman', 'Webpack', 'Figma'],
    frameworks: ['React', 'Next.js', 'Tailwind CSS', 'Express.js'],
    programmingLanguages: ['JavaScript', 'TypeScript'],
    certifications: ['AWS Certified Cloud Practitioner', 'Meta Frontend Developer (Preferred)'],
    domainTerms: ['Frontend Architecture', 'Client-side State', 'Web Accessibility (WCAG)', 'ATS Optimization'],
    responsibilities: ['Build modern user interfaces', 'Collaborate with product designers', 'Write clean unit tests'],
  },
  relevantExperienceMatch: 'Strong 85% match in UI component development and client-side web application architecture.',
  relevantProjectsMatch: 'E-Commerce Dashboard project demonstrates real-world application of React and data visualization tools.',
  improvementAreas: [
    'Add TypeScript to skills and experience bullets if you have hands-on experience.',
    'Mention Server-Side Rendering or Next.js if you have built SSR applications.',
    'Include testing framework details (e.g. Jest / React Testing Library metrics).',
  ],
  isDemoData: true,
};

export const mockHistory = [
  {
    _id: 'h_1',
    resumeId: { _id: 'res_1', title: 'Software Engineer Resume', targetRole: 'Frontend Developer', version: 2 },
    atsScore: 82,
    categoryScores: mockAnalysis.categoryScores,
    createdAt: '2026-09-29T14:20:00Z',
    status: 'Completed',
  },
  {
    _id: 'h_2',
    resumeId: { _id: 'res_2', title: 'Fullstack Dev Resume', targetRole: 'Full Stack Engineer', version: 1 },
    atsScore: 74,
    categoryScores: { keywords: 70, formatting: 85, skills: 75, experience: 72, education: 80, achievements: 65, structure: 78, readability: 85 },
    createdAt: '2026-09-20T08:15:00Z',
    status: 'Completed',
  },
];
