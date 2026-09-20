import { ALL_SKILLS } from './skillsList.js';

/**
 * Client-Side Dynamic Evaluation Engine
 * Dynamically computes score, matched skills, missing skills, and roadmap from raw input strings.
 */
export const calculateDynamicAnalysis = (inputData) => {
  const resumeText = (inputData.resumeText || '').toLowerCase();
  const jdText = (inputData.jobDescriptionText || '').toLowerCase();
  const jobTitle = inputData.jobTitle || 'Target Position';

  // 1. Extract required skills from Job Description using taxonomy
  const jdSkills = new Set();
  ALL_SKILLS.forEach((skill) => {
    const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (regex.test(jdText)) {
      jdSkills.add(skill);
    }
  });

  // If JD has no recognized taxonomy skills, populate reasonable defaults from JD text
  if (jdSkills.size === 0) {
    ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'Docker', 'AWS'].forEach((s) => {
      if (jdText.includes(s.toLowerCase())) jdSkills.add(s);
    });
  }

  // 2. Identify Matched vs Missing Skills
  const matchedSkills = [];
  const missingSkills = [];

  jdSkills.forEach((skill) => {
    const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (regex.test(resumeText)) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  // 3. Compute Weighted Formula Components
  const totalRequired = Math.max(jdSkills.size, 1);
  const skillsMatchRatio = Math.round((matchedSkills.length / totalRequired) * 100);
  const weightedSkillsScore = Number(((skillsMatchRatio / 100) * 40).toFixed(1));

  // Experience heuristic (estimating from resume text)
  const expMatch = resumeText.includes('senior') || resumeText.includes('lead') || resumeText.length > 1000 ? 90 : 70;
  const weightedExpScore = Number(((expMatch / 100) * 25).toFixed(1));

  // Keyword frequency heuristic
  const keywordFrequency = Math.min(Math.round((matchedSkills.length / Math.max(totalRequired, 1)) * 100 + 15), 100);
  const weightedKeywordScore = Number(((keywordFrequency / 100) * 15).toFixed(1));

  // Education match
  const eduKeywords = ['bachelor', 'master', 'phd', 'bca', 'btech', 'bs', 'ms', 'degree'];
  const eduMatch = eduKeywords.some((k) => resumeText.includes(k)) ? 100 : 60;
  const weightedEduScore = Number(((eduMatch / 100) * 10).toFixed(1));

  // Project relevance
  const projectRelevance = matchedSkills.length >= 3 ? 85 : 60;
  const weightedProjectScore = Number(((projectRelevance / 100) * 10).toFixed(1));

  const totalScore = Math.min(
    Math.round(weightedSkillsScore + weightedExpScore + weightedKeywordScore + weightedEduScore + weightedProjectScore),
    100
  );

  // 4. Generate Dynamic Strengths & Weaknesses
  const topMatched = matchedSkills.slice(0, 4);
  const topMissing = missingSkills.slice(0, 4);

  const strengths = [
    topMatched.length > 0
      ? `Strong verified expertise in key required skills: ${topMatched.join(', ')}`
      : 'Basic foundational experience detected in candidate profile',
    `Good keyword density alignment for ${jobTitle} role requirements`,
    'Structured document formatting compatible with spatial ATS parser',
  ];

  const weaknesses = [
    topMissing.length > 0
      ? `Lacks explicit production proof for critical missing skills: ${topMissing.join(', ')}`
      : 'Resume could benefit from more quantified metrics and business impact results',
    'Consider adding explicit cloud infrastructure or deployment bullet points',
  ];

  const roadmap = [
    {
      phase: 'WEEKS 01–02',
      topic: `Priority Skill Remediation (${topMissing[0] || 'Core Architecture'})`,
      actions: [
        `Master core concepts and hands-on integration for ${topMissing[0] || 'target framework'}`,
        `Build a dedicated project module implementing ${topMissing[0] || 'skill'} in your repository`,
      ],
    },
    {
      phase: 'WEEKS 03–04',
      topic: `Secondary Tooling (${topMissing[1] || 'Cloud & DevOps'})`,
      actions: [
        `Implement containerization and deployment pipelines for ${topMissing[1] || 'Docker/AWS'}`,
        'Set up automated unit and integration test coverage',
      ],
    },
    {
      phase: 'WEEKS 05–06',
      topic: 'Portfolio Polish & ATS Optimization',
      actions: [
        `Tailor resume bullet points specifically for ${jobTitle} ATS keyword filters`,
        'Deploy live working demonstrations to public cloud hosting',
      ],
    },
  ];

  return {
    jobTitle,
    jobDescriptionText: inputData.jobDescriptionText,
    compatibilityScore: totalScore,
    scoringBreakdown: {
      skillsMatchRatio,
      experienceMatch: expMatch,
      keywordFrequency,
      educationMatch: eduMatch,
      projectRelevance,
      weightedSkillsScore,
      weightedExpScore,
      weightedKeywordScore,
      weightedEduScore,
      weightedProjectScore,
    },
    matchedSkills,
    missingSkills,
    aiAnalysis: {
      strengths,
      weaknesses,
      keywordRecommendations: topMissing.concat(['CI/CD', 'Automated Testing']),
      roadmap,
    },
  };
};
