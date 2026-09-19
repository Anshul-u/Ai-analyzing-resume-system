import { ALL_SKILLS } from '../../../shared/constants/skillsList.js';
import natural from 'natural';

const TfIdf = natural.TfIdf;

/**
 * Deterministic Hybrid Scoring Algorithm Implementation
 * 
 * Formula:
 * Score = (Sm * 0.40) + (Em * 0.25) + (Kf * 0.15) + (Edm * 0.10) + (Pr * 0.10)
 */
export const calculateDeterministicScore = (parsedResume, jobDescriptionText, requiredExpYears = 3) => {
  const resumeText = (parsedResume.rawText || '').toLowerCase();
  const jdText = (jobDescriptionText || '').toLowerCase();

  // 1. Skills Match Ratio (Sm * 40%)
  const jdRequiredSkills = new Set();
  ALL_SKILLS.forEach((skill) => {
    const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (regex.test(jdText)) {
      jdRequiredSkills.add(skill);
    }
  });

  const matchedSkills = [];
  const missingSkills = [];

  const candidateSkills = new Set(parsedResume.skills || []);

  // Check candidate skills against required skills
  jdRequiredSkills.forEach((skill) => {
    if (candidateSkills.has(skill) || resumeText.includes(skill.toLowerCase())) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  const skillsMatchRatio = jdRequiredSkills.size > 0 ? matchedSkills.length / jdRequiredSkills.size : 0.8;
  const weightedSkillsScore = Number((skillsMatchRatio * 40).toFixed(2));

  // 2. Experience Match (Em * 25%)
  const candidateYears = parsedResume.yearsOfExperience || 0;
  let expRatio = Math.min(candidateYears / Math.max(requiredExpYears, 1), 1.0);
  if (candidateYears === 0 && (parsedResume.experience || []).length > 0) {
    expRatio = 0.7; // Moderate baseline if experience lines exist
  }
  const weightedExpScore = Number((expRatio * 25).toFixed(2));

  // 3. Keyword Frequency / TF-IDF Heuristic (Kf * 15%)
  const tfidf = new TfIdf();
  tfidf.addDocument(jdText);
  tfidf.addDocument(resumeText);

  let tfidfScore = 0;
  const tokens = natural.PorterStemmer.tokenizeAndStem(jdText);
  const uniqueTokens = Array.from(new Set(tokens)).slice(0, 30);

  let matchCount = 0;
  uniqueTokens.forEach((token) => {
    if (resumeText.includes(token)) {
      matchCount++;
    }
  });

  const keywordFrequencyRatio = uniqueTokens.length > 0 ? matchCount / uniqueTokens.length : 0.75;
  const weightedKeywordScore = Number((keywordFrequencyRatio * 15).toFixed(2));

  // 4. Education Match (Edm * 10%)
  const eduKeywords = ['bachelor', 'master', 'phd', 'b.c.a', 'bca', 'b.tech', 'btech', 'm.tech', 'mtech', 'bs', 'ms', 'degree'];
  let eduMatch = 0.5;
  const resumeEduText = (parsedResume.education || []).join(' ').toLowerCase() + ' ' + resumeText;
  if (eduKeywords.some((term) => resumeEduText.includes(term))) {
    eduMatch = 1.0;
  }
  const weightedEduScore = Number((eduMatch * 10).toFixed(2));

  // 5. Project Relevance (Pr * 10%)
  let projectRelevanceRatio = 0.6;
  if (matchedSkills.length >= 3) {
    projectRelevanceRatio = 0.9;
  } else if (matchedSkills.length >= 1) {
    projectRelevanceRatio = 0.75;
  }
  const weightedProjectScore = Number((projectRelevanceRatio * 10).toFixed(2));

  // Total Score Calculation (0 - 100%)
  const totalScore = Math.round(
    weightedSkillsScore + weightedExpScore + weightedKeywordScore + weightedEduScore + weightedProjectScore
  );

  return {
    compatibilityScore: Math.min(Math.max(totalScore, 0), 100),
    scoringBreakdown: {
      skillsMatchRatio: Number((skillsMatchRatio * 100).toFixed(1)),
      experienceMatch: Number((expRatio * 100).toFixed(1)),
      keywordFrequency: Number((keywordFrequencyRatio * 100).toFixed(1)),
      educationMatch: Number((eduMatch * 100).toFixed(1)),
      projectRelevance: Number((projectRelevanceRatio * 100).toFixed(1)),
      weightedSkillsScore,
      weightedExpScore,
      weightedKeywordScore,
      weightedEduScore,
      weightedProjectScore,
    },
    matchedSkills,
    missingSkills,
  };
};
