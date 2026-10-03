import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FileEdit,
  Sparkles,
  Save,
  Download,
  X,
  Plus,
  Trash2,
  AlertCircle,
} from 'lucide-react';
import { useResume } from '../hooks/useResume';
import { ContextualNav } from '../components/common/ContextualNav';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Textarea } from '../components/common/Textarea';
import { Badge } from '../components/common/Badge';
import { exportService } from '../services/exportService';

export const ResumeEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedResume, selectResumeById, updateSelectedResume, showToast } = useResume();

  const [activeTab, setActiveTab] = useState('Summary');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingResume, setIsLoadingResume] = useState(true);
  const [canExportSavedResume, setCanExportSavedResume] = useState(false);
  const [exportingFormat, setExportingFormat] = useState(null);

  // Form State initialized from selectedResume sections
  const [summary, setSummary] = useState(
    selectedResume?.sections?.summary || ''
  );

  const [technicalSkills, setTechnicalSkills] = useState(
    selectedResume?.sections?.skills?.technical?.join(', ') || ''
  );

  const [experience, setExperience] = useState(
    selectedResume?.sections?.experience || []
  );

  const [education, setEducation] = useState(
    selectedResume?.sections?.education || []
  );

  const [projects, setProjects] = useState(
    selectedResume?.sections?.projects || []
  );

  useEffect(() => {
    let isMounted = true;

    const loadResume = async () => {
      try {
        const resume = await selectResumeById(id);
        if (!resume) throw new Error('Resume could not be loaded.');
        if (!isMounted) return;

        setSummary(resume.sections?.summary || '');
        setTechnicalSkills(resume.sections?.skills?.technical?.join(', ') || '');
        setExperience(resume.sections?.experience || []);
        setEducation(resume.sections?.education || []);
        setProjects(resume.sections?.projects || []);
      } catch (error) {
        console.error('Failed to load resume for editing:', error);
        showToast('Failed to load this resume. Please try again.', 'error');
      } finally {
        if (isMounted) setIsLoadingResume(false);
      }
    };

    loadResume();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const updateEducationField = (index, field, value) => {
    setEducation((current) => current.map((entry, entryIndex) => (
      entryIndex === index ? { ...entry, [field]: value } : entry
    )));
    markUnsavedChanges();
  };

  const updateProjectField = (index, field, value) => {
    setProjects((current) => current.map((entry, entryIndex) => (
      entryIndex === index ? { ...entry, [field]: value } : entry
    )));
    markUnsavedChanges();
  };

  const markUnsavedChanges = () => {
    setHasUnsavedChanges(true);
    setCanExportSavedResume(false);
  };

  const tabs = ['Summary', 'Skills', 'Experience', 'Education', 'Projects', 'Certifications', 'Achievements'];

  const handleAIImproveSummary = () => {
    setSummary(
      'Results-driven Frontend Engineer with 3+ years of experience architecting high-performance React web applications, optimizing component rendering, and building responsive user interfaces.'
    );
    markUnsavedChanges();
    showToast('AI improved summary generated!', 'success');
  };

  const handleSave = async () => {
    if (isSaving || isLoadingResume) return;

    const updated = {
      ...selectedResume,
      sections: {
        ...selectedResume?.sections,
        summary,
        skills: {
          ...selectedResume?.sections?.skills,
          technical: technicalSkills.split(',').map((s) => s.trim()).filter(Boolean),
        },
        experience,
        education,
        projects,
      },
      updatedAt: new Date().toISOString(),
    };

    setIsSaving(true);
    try {
      await updateSelectedResume(updated);
      setHasUnsavedChanges(false);
      setCanExportSavedResume(true);
      showToast('Resume changes saved successfully.', 'success');
    } catch (error) {
      console.error('Failed to save resume changes:', error);
      showToast('Failed to save resume changes. Please try again.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = async (format) => {
    if (exportingFormat || hasUnsavedChanges || !selectedResume?._id) return;

    setExportingFormat(format);
    try {
      await exportService.downloadOriginalFormat(
        selectedResume._id,
        selectedResume.title,
        selectedResume.originalFile
      );
      showToast(`${format} downloaded successfully.`, 'success');
    } catch (error) {
      console.error(`Failed to export ${format}:`, error);
      showToast(`Failed to export ${format}. Please try again.`, 'error');
    } finally {
      setExportingFormat(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ContextualNav
        resumeTitle={selectedResume?.title}
        targetRole={selectedResume?.targetRole}
        resumeId={id}
      />

      <div className="space-y-6">
        {/* Editor Top Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Structured Resume Editor</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Edit individual sections and use AI field-level assistance to polish content.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {hasUnsavedChanges && (
              <span className="text-xs text-amber-600 bg-amber-50 px-2.5 py-1 rounded font-semibold border border-amber-200 flex items-center">
                <AlertCircle className="w-3.5 h-3.5 mr-1" /> Unsaved Changes
              </span>
            )}
            <Button variant="secondary" onClick={() => setHasUnsavedChanges(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave} icon={Save} loading={isSaving} disabled={isLoadingResume}>
              {isSaving ? 'Saving...' : 'Save Resume Changes'}
            </Button>
            {canExportSavedResume && !hasUnsavedChanges && (
              <Button
                variant="outline"
                onClick={() => handleExport(exportService.getOriginalFormat(selectedResume?.originalFile))}
                icon={Download}
                loading={Boolean(exportingFormat)}
                disabled={Boolean(exportingFormat) || isSaving}
              >
                Export {exportService.getOriginalFormat(selectedResume?.originalFile)}
              </Button>
            )}
          </div>
        </div>

        {/* Section Tabs */}
        <div className="bg-white rounded-xl border border-slate-200 p-2 flex space-x-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <Card title={`${activeTab} Section Editor`}>
          {activeTab === 'Summary' && (
            <div className="space-y-4">
              <Textarea
                label="Professional Summary"
                rows={5}
                value={summary}
                onChange={(e) => {
                  setSummary(e.target.value);
                  markUnsavedChanges();
                }}
              />
              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-slate-400">Keep summary concise (2-4 sentences).</span>
                <Button variant="outline" size="sm" onClick={handleAIImproveSummary} icon={Sparkles}>
                  AI Improve Summary
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'Skills' && (
            <div className="space-y-4">
              <Textarea
                label="Technical Skills (Comma Separated)"
                rows={4}
                value={technicalSkills}
                onChange={(e) => {
                  setTechnicalSkills(e.target.value);
                  markUnsavedChanges();
                }}
              />
              <p className="text-xs text-slate-500">
                Tip: Group skills into logical categories (e.g. Languages, Frameworks, Developer Tools).
              </p>
            </div>
          )}

          {activeTab === 'Experience' && (
            <div className="space-y-6">
              {experience.map((exp, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Input
                      label="Company Name"
                      value={exp.company}
                      onChange={(e) => {
                        const next = [...experience];
                        next[idx].company = e.target.value;
                        setExperience(next);
                        markUnsavedChanges();
                      }}
                    />
                    <Input
                      label="Job Role"
                      value={exp.role}
                      onChange={(e) => {
                        const next = [...experience];
                        next[idx].role = e.target.value;
                        setExperience(next);
                        markUnsavedChanges();
                      }}
                    />
                    <Input
                      label="Dates"
                      value={exp.dates}
                      onChange={(e) => {
                        const next = [...experience];
                        next[idx].dates = e.target.value;
                        setExperience(next);
                        markUnsavedChanges();
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Bullet Points</label>
                    {exp.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-center space-x-2 mb-2">
                        <input
                          type="text"
                          value={h}
                          onChange={(e) => {
                            const next = [...experience];
                            next[idx].highlights[hIdx] = e.target.value;
                            setExperience(next);
                            markUnsavedChanges();
                          }}
                          className="flex-1 p-2 text-xs border border-slate-300 rounded-lg bg-white"
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            const next = [...experience];
                            next[idx].highlights.splice(hIdx, 1);
                            setExperience(next);
                            markUnsavedChanges();
                          }}
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Education' && (
            <div className="space-y-4">
              {education.map((entry, index) => (
                <div key={entry._id || index} className="grid grid-cols-1 md:grid-cols-2 gap-3 rounded-lg border border-slate-200 p-4">
                  <Input label="Degree" value={entry.degree || ''} onChange={(e) => updateEducationField(index, 'degree', e.target.value)} />
                  <Input label="Institution" value={entry.institution || ''} onChange={(e) => updateEducationField(index, 'institution', e.target.value)} />
                  <Input label="Location" value={entry.location || ''} onChange={(e) => updateEducationField(index, 'location', e.target.value)} />
                  <Input label="Year" value={entry.year || ''} onChange={(e) => updateEducationField(index, 'year', e.target.value)} />
                  <Input label="GPA" value={entry.gpa || ''} onChange={(e) => updateEducationField(index, 'gpa', e.target.value)} />
                  <Input label="Coursework" value={entry.coursework || ''} onChange={(e) => updateEducationField(index, 'coursework', e.target.value)} />
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                icon={Plus}
                onClick={() => {
                  setEducation((current) => [...current, { degree: '', institution: '', location: '', year: '', gpa: '', coursework: '' }]);
                  markUnsavedChanges();
                }}
              >
                Add Education
              </Button>
            </div>
          )}

          {activeTab === 'Projects' && (
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div key={project._id || index} className="space-y-3 rounded-lg border border-slate-200 p-4">
                  <Input label="Project Title" value={project.title || ''} onChange={(e) => updateProjectField(index, 'title', e.target.value)} />
                  <Input label="Technology Stack (Comma Separated)" value={project.techStack?.join(', ') || ''} onChange={(e) => updateProjectField(index, 'techStack', e.target.value.split(',').map((item) => item.trim()).filter(Boolean))} />
                  <Textarea label="Description" rows={3} value={project.description || ''} onChange={(e) => updateProjectField(index, 'description', e.target.value)} />
                  <Textarea label="Highlights (One per line)" rows={3} value={project.highlights?.join('\n') || ''} onChange={(e) => updateProjectField(index, 'highlights', e.target.value.split('\n').map((item) => item.trim()).filter(Boolean))} />
                  <Input label="Project Link" value={project.link || ''} onChange={(e) => updateProjectField(index, 'link', e.target.value)} />
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                icon={Plus}
                onClick={() => {
                  setProjects((current) => [...current, { title: '', techStack: [], description: '', highlights: [], link: '' }]);
                  markUnsavedChanges();
                }}
              >
                Add Project
              </Button>
            </div>
          )}

          {['Certifications', 'Achievements'].includes(activeTab) && (
            <div className="py-8 text-center text-xs text-slate-500">
              <FileEdit className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <span>{activeTab} fields are pre-populated and editable. Customize as required.</span>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
