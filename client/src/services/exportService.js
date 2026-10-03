import api from './api';

export const exportService = {
  getOriginalFormat(originalFile = {}) {
    return /\.docx$/i.test(originalFile.filename || '')
      || originalFile.fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ? 'DOCX'
      : 'PDF';
  },

  async downloadOriginalFormat(resumeId, title = 'Resume', originalFile) {
    return this.getOriginalFormat(originalFile) === 'DOCX'
      ? this.downloadDOCX(resumeId, title)
      : this.downloadPDF(resumeId, title);
  },

  async downloadPDF(resumeId, title = 'Resume') {
    try {
      const response = await api.get(`/resume/${resumeId}/export/pdf`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${title.replace(/[^a-zA-Z0-9]/g, '_')}_Resume.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      return true;
    } catch (error) {
      console.error('PDF export failed:', error);
      throw error;
    }
  },

  async downloadDOCX(resumeId, title = 'Resume') {
    try {
      const response = await api.get(`/resume/${resumeId}/export/docx`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${title.replace(/[^a-zA-Z0-9]/g, '_')}_Resume.docx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      return true;
    } catch (error) {
      console.error('DOCX export failed:', error);
      throw error;
    }
  },
};
