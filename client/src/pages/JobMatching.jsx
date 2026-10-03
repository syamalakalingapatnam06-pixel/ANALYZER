import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  GitCompare,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  AlertCircle,
  FileText,
  Search,
  Code,
  Layers,
  Award,
} from 'lucide-react';
import { useResume } from '../hooks/useResume';
import { useJobMatch } from '../hooks/useJobMatch';
import { ContextualNav } from '../components/common/ContextualNav';
import { ScoreCircle } from '../components/common/ScoreCircle';
import { Card } from '../components/common/Card';
import { Textarea } from '../components/common/Textarea';
import { Button } from '../components/common/Button';
import { KeywordBadge } from '../components/common/KeywordBadge';
import { LoadingState } from '../components/common/LoadingState';

export const JobMatching = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedResume, showToast } = useResume();
  const { jobMatch, loading, runJobMatch } = useJobMatch();

  const [jobDescription, setJobDescription] = useState(
    `We are seeking a Frontend Developer with 3+ years of experience in React, JavaScript, HTML5, CSS3, and modern UI frameworks.
Responsibilities:
- Build high-performance single page applications using React and Tailwind CSS.
- Collaborate with backend teams to integrate RESTful microservices.
- Write unit tests using Jest and Cypress.
- Experience with TypeScript, Docker, and CI/CD pipelines is a major plus.`
  );

  const handleRunMatch = async () => {
    if (!jobDescription || jobDescription.trim().length < 20) {
      showToast('Please paste a comprehensive job description.', 'warning');
      return;
    }
    const targetId = id || selectedResume?.id || selectedResume?._id || 'res_1';
    await runJobMatch(targetId, jobDescription);
    showToast('Job description matching analysis complete!', 'success');
  };

  const handleLoadSampleJD = () => {
    setJobDescription(
      `Senior React Developer Position:
We need a skilled Frontend Engineer proficient in React, Redux, Next.js, and TypeScript.
Candidates must have experience with state management, REST APIs, and responsive CSS frameworks.
Preferred qualifications: Docker, GraphQL, Jest, CI/CD experience.`
    );
  };

  const currentMatch = jobMatch || {
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
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ContextualNav
        resumeTitle={selectedResume?.title}
        targetRole={selectedResume?.targetRole}
        resumeId={id}
      />

      <div className="space-y-8">
        {/* Job Description Input Form */}
        <Card
          title="Job Description Comparison"
          subtitle="Paste target job posting to detect matching skills, missing keywords, and role alignment."
          action={
            <Button size="sm" variant="ghost" onClick={handleLoadSampleJD}>
              Load Sample Job Description
            </Button>
          }
        >
          <div className="space-y-4">
            <Textarea
              label="Target Job Description"
              rows={6}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job posting here..."
            />

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-slate-500">
                AI will extract technical requirements, soft skills, tools, and certifications.
              </span>
              <Button variant="primary" onClick={handleRunMatch} loading={loading} icon={GitCompare}>
                Analyze Job Match
              </Button>
            </div>
          </div>
        </Card>

        {loading ? (
          <LoadingState message="AI is comparing your resume with the job description..." />
        ) : (
          <>
            {/* Match Score Overview */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center space-x-6">
                <ScoreCircle
                  score={currentMatch.matchScore}
                  size={140}
                  label="Match Alignment"
                  subtitle="76% Technical Match"
                />
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Job Description Alignment</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-md">
                    Based on natural language semantic analysis of skills, frameworks, responsibilities, and key terms.
                  </p>
                  <div className="mt-3 flex items-center space-x-2 text-xs">
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                      9 Matching Skills
                    </span>
                    <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-semibold border border-amber-200">
                      5 Missing Skills
                    </span>
                  </div>
                </div>
              </div>

              <Button variant="outline" onClick={() => navigate(`/resume/${id}/rewrite`)} icon={Sparkles}>
                Rewrite Resume for Job
              </Button>
            </div>

            {/* AI Safety Banner for Missing Skills */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start space-x-3 text-xs text-amber-900">
              <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block">Ethical Career Recommendation</strong>
                <span>
                  Consider adding missing skills to your resume <strong>ONLY if you genuinely possess hands-on experience</strong> with them. Never fabricate skills or experience to pass an ATS screener.
                </span>
              </div>
            </div>

            {/* Skills & Keywords Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="Matching Skills & Keywords" subtitle="Terms found in both resume and job posting">
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-2">
                      Matching Skills
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {currentMatch.matchingSkills.map((sk, idx) => (
                        <KeywordBadge key={idx} keyword={sk} type="match" />
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-2">
                      Matching Keywords
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {currentMatch.matchingKeywords.map((kw, idx) => (
                        <KeywordBadge key={idx} keyword={kw} type="match" />
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              <Card title="Missing Skills & Keywords" subtitle="Gaps identified in job posting comparison">
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-2">
                      Missing Skills
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {currentMatch.missingSkills.map((sk, idx) => (
                        <KeywordBadge
                          key={idx}
                          keyword={sk}
                          type="missing"
                          onClick={() => showToast(`Consider adding ${sk} if you have experience with it.`, 'info')}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-2">
                      Missing Keywords
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {currentMatch.missingKeywords.map((kw, idx) => (
                        <KeywordBadge key={idx} keyword={kw} type="missing" />
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Categorized Keywords Breakdown */}
            <Card title="Categorized Job Keyword Analysis" subtitle="Extracted taxonomy breakdown from target JD">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(currentMatch.keywordCategories || {}).map(([catKey, items]) => (
                  <div key={catKey} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                      {catKey.replace(/([AZ])/g, ' $1').trim()}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map((it, idx) => (
                        <span
                          key={idx}
                          className="bg-white text-slate-700 text-[11px] px-2 py-0.5 rounded border border-slate-200"
                        >
                          {it}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Experience & Project Alignment Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card title="Relevant Experience Match">
                <p className="text-xs text-slate-600 leading-relaxed">
                  {currentMatch.relevantExperienceMatch}
                </p>
              </Card>

              <Card title="Relevant Projects Match">
                <p className="text-xs text-slate-600 leading-relaxed">
                  {currentMatch.relevantProjectsMatch}
                </p>
              </Card>

              <Card title="Recommended Action Areas">
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {currentMatch.improvementAreas.map((area, idx) => (
                    <li key={idx} className="flex items-start space-x-1.5">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
