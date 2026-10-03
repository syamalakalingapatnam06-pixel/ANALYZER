import JSZip from 'jszip';
import { DOMParser, XMLSerializer } from '@xmldom/xmldom';

const WORD_NAMESPACE = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';
const XML_NAMESPACE = 'http://www.w3.org/XML/1998/namespace';

const sections = [
  {
    key: 'summary',
    headings: ['SUMMARY', 'PROFESSIONAL SUMMARY', 'PROFILE', 'PROFESSIONAL PROFILE', 'OBJECTIVE'],
    getLines: (resume) => resume.sections?.summary ? [resume.sections.summary] : [],
  },
  {
    key: 'skills',
    headings: ['SKILLS', 'TECHNICAL SKILLS', 'TECHNOLOGIES', 'TECHNICAL PROFICIENCY'],
    getLines: (resume) => resume.sections?.skills?.technical?.length
      ? [resume.sections.skills.technical.join(', ')]
      : [],
  },
  {
    key: 'experience',
    headings: ['EXPERIENCE', 'WORK EXPERIENCE', 'PROFESSIONAL EXPERIENCE', 'EMPLOYMENT', 'WORK HISTORY'],
    getLines: (resume) => (resume.sections?.experience || []).flatMap((entry) => [
      [entry.role, entry.company].filter(Boolean).join(' - '),
      entry.dates,
      ...(entry.highlights || []).map((highlight) => `- ${highlight}`),
    ].filter(Boolean)),
  },
  {
    key: 'education',
    headings: ['EDUCATION', 'ACADEMIC BACKGROUND'],
    getLines: (resume) => (resume.sections?.education || []).flatMap((entry) => [
      [entry.degree, entry.institution].filter(Boolean).join(' - '),
      [entry.location, entry.year, entry.gpa && `GPA: ${entry.gpa}`].filter(Boolean).join(' | '),
      entry.coursework && `Coursework: ${entry.coursework}`,
    ].filter(Boolean)),
  },
  {
    key: 'projects',
    headings: ['PROJECTS', 'PERSONAL PROJECTS'],
    getLines: (resume) => (resume.sections?.projects || []).flatMap((entry) => [
      entry.title,
      entry.techStack?.length ? `Technologies: ${entry.techStack.join(', ')}` : '',
      entry.description,
      ...(entry.highlights || []).map((highlight) => `- ${highlight}`),
      entry.link,
    ].filter(Boolean)),
  },
  {
    key: 'certifications',
    headings: ['CERTIFICATIONS', 'CERTIFICATES'],
    getLines: (resume) => (resume.sections?.certifications || []).map((entry) => (
      typeof entry === 'string'
        ? entry
        : [entry.title, entry.issuer, entry.year].filter(Boolean).join(' - ')
    )).filter(Boolean),
  },
  {
    key: 'achievements',
    headings: ['ACHIEVEMENTS', 'HONORS', 'AWARDS'],
    getLines: (resume) => resume.sections?.achievements || [],
  },
  {
    key: 'hackathons',
    headings: ['HACKATHONS', 'HACKATHON EXPERIENCE'],
    getLines: (resume) => resume.sections?.hackathons || [],
  },
];

const normalizeHeading = (text) => text.toUpperCase().replace(/[^A-Z0-9 ]/g, '').trim();

const getParagraphText = (paragraph) => Array.from(
  paragraph.getElementsByTagNameNS(WORD_NAMESPACE, 't')
).map((node) => node.textContent || '').join('').trim();

const setParagraphText = (paragraph, text) => {
  const document = paragraph.ownerDocument;
  const paragraphProperties = Array.from(paragraph.childNodes).find((node) => (
    node.nodeType === 1 && node.namespaceURI === WORD_NAMESPACE && node.localName === 'pPr'
  ));
  const firstRun = Array.from(paragraph.getElementsByTagNameNS(WORD_NAMESPACE, 'r'))[0];
  const runProperties = firstRun && Array.from(firstRun.childNodes).find((node) => (
    node.nodeType === 1 && node.namespaceURI === WORD_NAMESPACE && node.localName === 'rPr'
  ));

  Array.from(paragraph.childNodes).forEach((node) => {
    if (node !== paragraphProperties) paragraph.removeChild(node);
  });

  const run = document.createElementNS(WORD_NAMESPACE, 'w:r');
  if (runProperties) run.appendChild(runProperties.cloneNode(true));
  const textNode = document.createElementNS(WORD_NAMESPACE, 'w:t');
  textNode.textContent = text;
  if (/^\s|\s$/.test(text)) textNode.setAttributeNS(XML_NAMESPACE, 'xml:space', 'preserve');
  run.appendChild(textNode);
  paragraph.appendChild(run);
};

const makeParagraph = (template, text) => {
  const paragraph = template.cloneNode(true);
  setParagraphText(paragraph, text);
  return paragraph;
};

const appendMissingSection = (body, headingTemplate, contentTemplate, title, lines) => {
  if (!headingTemplate || !contentTemplate || lines.length === 0) return;

  const heading = makeParagraph(headingTemplate, title);
  const content = lines.map((line) => makeParagraph(contentTemplate, line));
  const sectionProperties = Array.from(body.childNodes).find((node) => (
    node.nodeType === 1 && node.namespaceURI === WORD_NAMESPACE && node.localName === 'sectPr'
  ));
  [heading, ...content].forEach((paragraph) => body.insertBefore(paragraph, sectionProperties || null));
};

export const updateDocxTemplate = async (encodedFile, resume) => {
  const zip = await JSZip.loadAsync(Buffer.from(encodedFile, 'base64'));
  const documentFile = zip.file('word/document.xml');
  if (!documentFile) throw new Error('DOCX document content was not found.');

  const xml = await documentFile.async('string');
  const document = new DOMParser().parseFromString(xml, 'application/xml');
  const body = document.getElementsByTagNameNS(WORD_NAMESPACE, 'body')[0];
  if (!body) throw new Error('DOCX document body was not found.');

  const paragraphs = Array.from(body.getElementsByTagNameNS(WORD_NAMESPACE, 'p'));
  const headingIndexes = paragraphs.map((paragraph, index) => {
    const text = normalizeHeading(getParagraphText(paragraph));
    return sections.some((section) => section.headings.includes(text)) ? index : -1;
  }).filter((index) => index >= 0);
  const headingTemplate = headingIndexes.length ? paragraphs[headingIndexes[0]] : null;
  const contentTemplate = paragraphs.find((paragraph, index) => !headingIndexes.includes(index)) || headingTemplate;

  sections.forEach((section) => {
    const lines = section.getLines(resume);
    const headingIndex = paragraphs.findIndex((paragraph) => (
      section.headings.includes(normalizeHeading(getParagraphText(paragraph)))
    ));
    if (headingIndex < 0) {
      appendMissingSection(body, headingTemplate, contentTemplate, section.headings[0], lines);
      return;
    }

    const nextHeadingIndex = headingIndexes.find((index) => index > headingIndex);
    const endIndex = nextHeadingIndex ?? paragraphs.length;
    const existingParagraphs = paragraphs.slice(headingIndex + 1, endIndex);
    if (lines.length === 0) {
      existingParagraphs.forEach((paragraph) => {
        if (!getParagraphText(paragraph)) paragraph.parentNode.removeChild(paragraph);
      });
      return;
    }

    let anchor = existingParagraphs[existingParagraphs.length - 1] || paragraphs[headingIndex];

    lines.forEach((line, index) => {
      let paragraph = existingParagraphs[index];
      if (!paragraph) {
        const template = existingParagraphs[Math.min(index, existingParagraphs.length - 1)] || contentTemplate;
        if (!template) return;
        paragraph = makeParagraph(template, '');
        anchor.parentNode.insertBefore(paragraph, anchor.nextSibling);
        anchor = paragraph;
      }
      setParagraphText(paragraph, line);
    });

    existingParagraphs.slice(lines.length).forEach((paragraph) => paragraph.parentNode.removeChild(paragraph));
  });

  zip.file('word/document.xml', new XMLSerializer().serializeToString(document));
  return zip.generateAsync({ type: 'nodebuffer' });
};