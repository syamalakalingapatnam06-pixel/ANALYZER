import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { updateDocxTemplate } from './docxTemplateUpdater.js';
import { hydrateResumeSections } from './extractor.js';

export const generateResumeDOCX = async (resume) => {
  const exportResume = hydrateResumeSections(resume.toObject?.() || resume);
  const originalName = exportResume.originalFile?.filename || '';
  if (exportResume.originalFile?.fileBuffer && /\.docx$/i.test(originalName)) {
    try {
      return await updateDocxTemplate(exportResume.originalFile.fileBuffer, exportResume);
    } catch (error) {
      console.warn('Could not preserve the uploaded DOCX layout; generating a formatted DOCX instead:', error.message);
    }
  }

  const name = exportResume.sections?.personalInfo?.name || exportResume.title || 'Resume';
  const email = exportResume.sections?.personalInfo?.email || '';
  const phone = exportResume.sections?.personalInfo?.phone || '';
  const linkedin = exportResume.sections?.personalInfo?.linkedin || '';
  const github = exportResume.sections?.personalInfo?.github || '';
  const contactInfo = [email, phone, linkedin, github].filter(Boolean).join(' | ');

  const children = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: name,
          bold: true,
          size: 32,
          color: '1E293B',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: contactInfo,
          size: 20,
          color: '64748B',
        }),
      ],
    }),
    new Paragraph({ text: '' }),
  ];

  if (exportResume.sections?.summary) {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text: 'PROFESSIONAL SUMMARY', bold: true, color: '2563EB' })],
      }),
      new Paragraph({
        children: [new TextRun({ text: exportResume.sections.summary, size: 22 })],
      }),
      new Paragraph({ text: '' })
    );
  }

  const skills = exportResume.sections?.skills?.technical || [];
  if (skills.length > 0) {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text: 'TECHNICAL SKILLS', bold: true, color: '2563EB' })],
      }),
      new Paragraph({
        children: [new TextRun({ text: skills.join(', '), size: 22 })],
      }),
      new Paragraph({ text: '' })
    );
  }

  const experience = exportResume.sections?.experience || [];
  if (experience.length > 0) {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text: 'WORK EXPERIENCE', bold: true, color: '2563EB' })],
      })
    );
    experience.forEach((exp) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${exp.role || 'Role'} - ${exp.company || 'Company'}`, bold: true, size: 24 }),
          ],
        }),
        new Paragraph({
          children: [new TextRun({ text: exp.dates || '', italic: true, size: 20, color: '64748B' })],
        })
      );
      if (exp.highlights && exp.highlights.length > 0) {
        exp.highlights.forEach((h) => {
          children.push(
            new Paragraph({
              bullet: { level: 0 },
              children: [new TextRun({ text: h, size: 22 })],
            })
          );
        });
      }
    });
    children.push(new Paragraph({ text: '' }));
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children,
      },
    ],
  });

  return await Packer.toBuffer(doc);
};
