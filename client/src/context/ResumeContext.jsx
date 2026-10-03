import React, { createContext, useContext, useState, useEffect } from 'react';
import { resumeService } from '../services/resumeService';
import { initialMockResumes } from '../data/mockData';

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resumes, setResumes] = useState(initialMockResumes);
  const [selectedResume, setSelectedResume] = useState(initialMockResumes[0]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchResumes = async () => {
    setLoading(true);
    try {
      const res = await resumeService.getAllResumes();
      if (res.success && res.resumes?.length > 0) {
        setResumes(res.resumes);
        if (!selectedResume) {
          setSelectedResume(res.resumes[0]);
        }
      }
    } catch (err) {
      console.warn('Error fetching resumes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const selectResumeById = async (id) => {
    const found = resumes.find((r) => r.id === id || r._id === id);
    if (found) {
      setSelectedResume(found);
      return found;
    }
    const res = await resumeService.getResumeById(id);
    if (res.success && res.resume) {
      setSelectedResume(res.resume);
      return res.resume;
    }
    return null;
  };

  const addResume = (newResume) => {
    setResumes((prev) => [newResume, ...prev]);
    setSelectedResume(newResume);
  };

  const updateSelectedResume = async (updated) => {
    const resumeId = updated?._id;
    if (!resumeId) {
      throw new Error('This resume does not have a MongoDB ID and cannot be saved.');
    }

    const response = await resumeService.updateResume(resumeId, updated);
    const savedResume = response.resume;
    setSelectedResume(savedResume);
    setResumes((prev) => prev.map((resume) => (
      String(resume._id || resume.id) === String(resumeId) ? savedResume : resume
    )));
    return savedResume;
  };

  return (
    <ResumeContext.Provider
      value={{
        resumes,
        selectedResume,
        loading,
        toast,
        showToast,
        setResumes,
        selectResumeById,
        setSelectedResume,
        addResume,
        updateSelectedResume,
        fetchResumes,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResumeContext must be used within a ResumeProvider');
  }
  return context;
};
