import PDFDocument from 'pdfkit';
import { hydrateResumeSections } from './extractor.js';

export const generateResumePDF = (resume) => {
  resume = hydrateResumeSections(resume.toObject?.() || resume);
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const buffers = [];

      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));

      // Header
      const name = resume.sections?.personalInfo?.name || resume.title || 'Resume';
      const email = resume.sections?.personalInfo?.email || '';
      const phone = resume.sections?.personalInfo?.phone || '';
      const linkedin = resume.sections?.personalInfo?.linkedin || '';
      const github = resume.sections?.personalInfo?.github || '';

      doc.fontSize(22).fillColor('#1E293B').text(name, { align: 'center' });
      doc.moveDown(0.3);
      
      const contactInfo = [email, phone, linkedin, github].filter(Boolean).join(' | ');
      doc.fontSize(10).fillColor('#64748B').text(contactInfo, { align: 'center' });
      doc.moveDown(1.5);

      // Professional Summary
      if (resume.sections?.summary) {
        doc.fontSize(14).fillColor('#2563EB').text('PROFESSIONAL SUMMARY');
        doc.fontSize(10).fillColor('#334155').text(resume.sections.summary);
        doc.moveDown(1);
      }

      // Technical Skills
      const skills = resume.sections?.skills?.technical || [];
      if (skills.length > 0) {
        doc.fontSize(14).fillColor('#2563EB').text('TECHNICAL SKILLS');
        doc.fontSize(10).fillColor('#334155').text(skills.join(', '));
        doc.moveDown(1);
      }

      // Experience
      const experience = resume.sections?.experience || [];
      if (experience.length > 0) {
        doc.fontSize(14).fillColor('#2563EB').text('WORK EXPERIENCE');
        experience.forEach((exp) => {
          doc.fontSize(11).fillColor('#0F172A').text(`${exp.role || 'Role'} - ${exp.company || 'Company'}`);
          if (exp.dates) doc.fontSize(9).fillColor('#64748B').text(exp.dates);
          if (exp.highlights && exp.highlights.length > 0) {
            exp.highlights.forEach((h) => {
              doc.fontSize(10).fillColor('#334155').text(`• ${h}`);
            });
          }
          doc.moveDown(0.5);
        });
        doc.moveDown(0.5);
      }

      // Projects
      const projects = resume.sections?.projects || [];
      if (projects.length > 0) {
        doc.fontSize(14).fillColor('#2563EB').text('PROJECTS');
        projects.forEach((proj) => {
          doc.fontSize(11).fillColor('#0F172A').text(proj.title || 'Project Title');
          if (proj.description) doc.fontSize(10).fillColor('#334155').text(proj.description);
          doc.moveDown(0.3);
        });
        doc.moveDown(0.5);
      }

      // Education
      const education = resume.sections?.education || [];
      if (education.length > 0) {
        doc.fontSize(14).fillColor('#2563EB').text('EDUCATION');
        education.forEach((edu) => {
          doc.fontSize(11).fillColor('#0F172A').text(`${edu.degree || 'Degree'} - ${edu.institution || 'Institution'}`);
          if (edu.year) doc.fontSize(9).fillColor('#64748B').text(edu.year);
          doc.moveDown(0.3);
        });
      }

      // Fallback text if formatted sections are brief
      if (!resume.sections?.summary && experience.length === 0 && projects.length === 0) {
        doc.fontSize(10).fillColor('#334155').text(resume.originalText || '');
      }

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};
