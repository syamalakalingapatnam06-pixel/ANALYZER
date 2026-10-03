import api from './api';
import { initialMockResumes } from '../data/mockData';

export const resumeService = {
  async uploadResume(file, title, targetRole, isStudentMode = false) {
    const formData = new FormData();
    formData.append('resumeFile', file);
    formData.append('title', title);
    formData.append('targetRole', targetRole);
    formData.append('isStudentMode', isStudentMode);

    try {
      const response = await api.post('/resume/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      console.warn('Backend upload unavailable, returning parsed mock resume.');
      const newResume = {
        id: 'res_' + Date.now(),
        _id: 'res_' + Date.now(),
        title: title || file.name.replace(/\.[^/.]+$/, ''),
        targetRole: targetRole || 'Software Engineer',
        isStudentMode,
        atsScore: 80,
        suggestionsCount: 3,
        version: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        originalText: `Uploaded resume content from ${file.name}`,
        sections: initialMockResumes[0].sections,
      };
      return { success: true, resume: newResume, isDemoMode: true };
    }
  },

  async getAllResumes() {
    try {
      const response = await api.get('/resume');
      return response.data;
    } catch (error) {
      return { success: true, resumes: initialMockResumes, isDemoMode: true };
    }
  },

  async getResumeById(id) {
    try {
      const response = await api.get(`/resume/${id}`);
      return response.data;
    } catch (error) {
      const found = initialMockResumes.find((r) => r.id === id || r._id === id) || initialMockResumes[0];
      return { success: true, resume: found, isDemoMode: true };
    }
  },

  async updateResume(id, updateData) {
    const response = await api.put(`/resume/${id}`, updateData);
    if (!response.data?.success || !response.data.resume) {
      throw new Error(response.data?.message || 'The server did not confirm the resume update.');
    }
    return response.data;
  },

  async deleteResume(id) {
    try {
      const response = await api.delete(`/resume/${id}`);
      return response.data;
    } catch (error) {
      return { success: true, message: 'Resume deleted (Demo Mode)', isDemoMode: true };
    }
  },

  async duplicateResume(id) {
    try {
      const orig = await this.getResumeById(id);
      const res = orig.resume;
      const dup = {
        ...res,
        id: 'res_' + Date.now(),
        _id: 'res_' + Date.now(),
        title: `${res.title} (Copy)`,
        version: (res.version || 1) + 1,
        createdAt: new Date().toISOString(),
      };
      return { success: true, resume: dup };
    } catch (error) {
      return { success: false, message: 'Could not duplicate resume' };
    }
  },
};
