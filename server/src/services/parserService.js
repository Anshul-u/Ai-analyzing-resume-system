import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import { ALL_SKILLS } from '../../../shared/constants/skillsList.js';

/**
 * Sanitize and strip non-printable / prompt injection strings
 */
export const sanitizeText = (text) => {
  if (!text) return '';
  return text
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '') // Non-printable ASCII
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

/**
 * Extract raw text from PDF, DOCX, or plain text buffer
 */
export const extractTextFromBuffer = async (buffer, mimeType, filename) => {
  let rawText = '';
  const ext = filename ? filename.split('.').pop().toLowerCase() : '';

  if (mimeType === 'application/pdf' || ext === 'pdf') {
    const data = await pdfParse(buffer);
    rawText = data.text;
  } else if (
    mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    ext === 'docx'
  ) {
    const result = await mammoth.extractRawText({ buffer });
    rawText = result.value;
  } else {
    rawText = buffer.toString('utf-8');
  }

  return sanitizeText(rawText);
};

/**
 * Structured Entity Categorization Pipeline
 */
export const categorizeResumeEntities = (rawText) => {
  const cleanText = sanitizeText(rawText);
  const lines = cleanText.split('\n');

  // 1. Skill Extraction matching Taxonomy
  const extractedSkills = new Set();
  const lowerText = cleanText.toLowerCase();

  ALL_SKILLS.forEach((skill) => {
    // Escaped regex search for skill boundary
    const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (regex.test(cleanText)) {
      extractedSkills.add(skill);
    }
  });

  // 2. Experience Extraction & Years Heuristics
  const experienceLines = [];
  const educationLines = [];
  const certLines = [];

  let currentSection = 'summary';

  lines.forEach((line) => {
    const trimmed = line.trim();
    const lowerLine = trimmed.toLowerCase();

    if (lowerLine.match(/^(work|professional|employment)\s+(experience|history)/i) || lowerLine === 'experience') {
      currentSection = 'experience';
      return;
    }
    if (lowerLine.match(/^(education|academic|qualifications)/i) || lowerLine === 'education') {
      currentSection = 'education';
      return;
    }
    if (lowerLine.match(/^(certifications|licenses|courses)/i) || lowerLine === 'certifications') {
      currentSection = 'certifications';
      return;
    }

    if (currentSection === 'experience' && trimmed.length > 5) {
      experienceLines.push(trimmed);
    } else if (currentSection === 'education' && trimmed.length > 3) {
      educationLines.push(trimmed);
    } else if (currentSection === 'certifications' && trimmed.length > 3) {
      certLines.push(trimmed);
    }
  });

  // Simple years of experience estimation heuristic
  let yearsOfExperience = 0;
  const yearMatches = cleanText.match(/\b(19\d\d|20\d\d)\b/g);
  if (yearMatches && yearMatches.length >= 2) {
    const years = yearMatches.map(Number).sort((a, b) => a - b);
    const minYear = years[0];
    const maxYear = Math.min(years[years.length - 1], new Date().getFullYear());
    if (maxYear > minYear && maxYear - minYear <= 40) {
      yearsOfExperience = maxYear - minYear;
    }
  }

  return {
    skills: Array.from(extractedSkills),
    experience: experienceLines.slice(0, 15),
    education: educationLines.slice(0, 10),
    certifications: certLines.slice(0, 10),
    yearsOfExperience,
  };
};
