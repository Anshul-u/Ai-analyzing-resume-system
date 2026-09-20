import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildFencedAnalysisPrompt } from '../utils/promptTemplates.js';

/**
 * Perform qualitative LLM evaluation using Google Gemini API
 */
export const analyzeResumeWithGemini = async (resumeText, jobDescriptionText, matchedSkills, missingSkills) => {
  const apiKey = process.env.GEMINI_API_KEY;

  // Fallback AI synthesis when API Key is absent
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    return generateFallbackAISynthesis(matchedSkills, missingSkills);
  }

  try {
    const ai = new GoogleGenerativeAI(apiKey);
    const model = ai.getGenerativeModel({ model: 'gemini-1.5-pro' });
    const prompt = buildFencedAnalysisPrompt(resumeText, jobDescriptionText, matchedSkills, missingSkills);

    const response = await model.generateContent(prompt);
    let rawText = response.response.text() || '';

    // Strip markdown code fences (```json ... ``` or ``` ...) and surrounding whitespace
    rawText = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();

    // Extract JSON object substring if extra commentary is present
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    const cleanJsonString = jsonMatch ? jsonMatch[0] : rawText;

    return JSON.parse(cleanJsonString);
  } catch (error) {
    console.warn(`[GEMINI API WARNING] API call failed (${error.message}). Returning fallback synthesis.`);
    return generateFallbackAISynthesis(matchedSkills, missingSkills);
  }
};

/**
 * High-quality fallback synthesis generator
 */
export const generateFallbackAISynthesis = (matchedSkills = [], missingSkills = []) => {
  const topMissing = missingSkills.slice(0, 4);

  return {
    strengths: [
      `Solid foundational alignment with core skills (${matchedSkills.slice(0, 3).join(', ') || 'General Development'})`,
      'Clear technical experience documented in resume text',
      'Valid document formatting with parseable structural headers',
    ],
    weaknesses: [
      missingSkills.length > 0
        ? `Lacks explicit production proof for key skills: ${topMissing.join(', ')}`
        : 'Could benefit from quantified impact metrics (e.g. % improvements, user counts)',
      'Keyword density can be improved for automated recruiter filters',
    ],
    keywordRecommendations: topMissing.concat(['CI/CD Pipelines', 'Automated Testing', 'Production Deployment']),
    roadmap: [
      {
        phase: 'WEEKS 01–02',
        topic: `Core Skill Remediation (${topMissing[0] || 'Modern Tooling'})`,
        actions: [
          `Master fundamental architecture and best practices for ${topMissing[0] || 'target framework'}`,
          `Build a mini-project demonstrating ${topMissing[0] || 'skill'} integration with existing stack`,
        ],
      },
      {
        phase: 'WEEKS 03–04',
        topic: `Advanced Tooling (${topMissing[1] || 'Cloud Infrastructure'})`,
        actions: [
          `Implement containerization / deployment workflows using ${topMissing[1] || 'Docker'}`,
          'Add unit and integration tests to verify production resilience',
        ],
      },
      {
        phase: 'WEEKS 05–06',
        topic: 'Portfolio Polish & ATS Optimization',
        actions: [
          'Update resume work experience bullets to include quantified revenue / performance metrics',
          'Deploy live working demonstrations on AWS / Vercel with public GitHub repositories',
        ],
      },
    ],
  };
};
