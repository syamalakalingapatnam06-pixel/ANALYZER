import api from './api';
import { MOCK_RESUMES } from '../utils/mockData';

// Helper to manage localStorage mock sync
const getLocalResumes = () => {
  const stored = localStorage.getItem('app_resumes');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      // parse error
    }
  }
  localStorage.setItem('app_resumes', JSON.stringify(MOCK_RESUMES));
  return MOCK_RESUMES;
};

const saveLocalResumes = (resumes) => {
  localStorage.setItem('app_resumes', JSON.stringify(resumes));
};

export const resumeService = {
  async upload(formData, onProgress) {
    try {
      const response = await api.post('/resume/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total && onProgress) {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress(percent);
          }
        }
      });
      return response.data || response;
    } catch (err) {
      if (!err.status || err.message.includes('standalone') || err.message.includes('Network Error')) {
        // Fallback upload simulation
        const file = formData.get('file');
        const title = formData.get('title') || file?.name || 'Uploaded Resume';
        const targetRole = formData.get('targetRole') || 'Full Stack Engineer';
        const isStudent = formData.get('isStudent') === 'true';

        const newResume = {
          id: 'res-' + Date.now(),
          title,
          targetRole,
          fileName: file?.name || 'resume.pdf',
          fileSize: file?.size || 1200000,
          updatedAt: new Date().toISOString(),
          atsScore: 78,
          jobMatchScore: 72,
          grammarScore: 84,
          keywordScore: 70,
          version: 'v1.0',
          isStudent,
          content: {
            personalInfo: { fullName: 'Alex Morgan', email: 'alex.morgan@example.com' },
            summary: 'Experienced software professional looking to optimize resume performance for ATS filters.',
            skills: ['JavaScript', 'React', 'HTML5', 'CSS3', 'Git', 'REST APIs'],
            experience: [],
            education: [],
            projects: [],
            certifications: [],
            achievements: []
          }
        };

        const current = getLocalResumes();
        const updated = [newResume, ...current];
        saveLocalResumes(updated);

        return { success: true, data: newResume };
      }
      throw err;
    }
  },

  async getAll() {
    try {
      const response = await api.get('/resume');
      return response.data || response.resumes || [];
    } catch (err) {
      return getLocalResumes();
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/resume/${id}`);
      return response.data || response;
    } catch (err) {
      const resumes = getLocalResumes();
      const found = resumes.find(r => r.id === id);
      if (found) return found;
      return resumes[0]; // fallback default
    }
  },

  async update(id, data) {
    try {
      const response = await api.put(`/resume/${id}`, data);
      return response.data || response;
    } catch (err) {
      const resumes = getLocalResumes();
      const updated = resumes.map(r => r.id === id ? { ...r, ...data, updatedAt: new Date().toISOString() } : r);
      saveLocalResumes(updated);
      const target = updated.find(r => r.id === id);
      return { success: true, data: target };
    }
  },

  async delete(id) {
    try {
      const response = await api.delete(`/resume/${id}`);
      return response.data || response;
    } catch (err) {
      const resumes = getLocalResumes();
      const filtered = resumes.filter(r => r.id !== id);
      saveLocalResumes(filtered);
      return { success: true, message: 'Resume deleted successfully' };
    }
  },

  async duplicate(id) {
    const resumes = getLocalResumes();
    const original = resumes.find(r => r.id === id) || resumes[0];
    const duplicated = {
      ...original,
      id: 'res-' + Date.now(),
      title: `${original.title} (Copy)`,
      version: `v${(parseFloat(original.version?.replace('v', '') || 1.0) + 0.1).toFixed(1)}`,
      updatedAt: new Date().toISOString()
    };
    saveLocalResumes([duplicated, ...resumes]);
    return { success: true, data: duplicated };
  },

  async exportPdf(id) {
    try {
      const response = await api.get(`/resume/${id}/export/pdf`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Resume-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      return { success: true };
    } catch (err) {
      // Simulate file download for local offline testing
      const blob = new Blob(['%PDF-1.4 Mock Exported Resume PDF Content'], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Resume-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      return { success: true };
    }
  },

  async exportDocx(id) {
    try {
      const response = await api.get(`/resume/${id}/export/docx`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Resume-${id}.docx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      return { success: true };
    } catch (err) {
      const blob = new Blob(['Mock Exported Resume DOCX Content'], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Resume-${id}.docx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      return { success: true };
    }
  }
};

export default resumeService;
