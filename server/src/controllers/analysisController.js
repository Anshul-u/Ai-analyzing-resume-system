import { calculateDeterministicScore } from '../services/scoringService.js';
import { analyzeResumeWithGemini } from '../services/geminiService.js';
import { categorizeResumeEntities } from '../services/parserService.js';
import Analysis from '../models/Analysis.js';
import Resume from '../models/Resume.js';
import { checkIsMockDb } from '../config/db.js';

const mockAnalyses = [];

export const runFullSynthesis = async (req, res) => {
  try {
    const { resumeId, resumeText, jobTitle, jobDescriptionText, requiredExpYears } = req.body;

    if (!jobDescriptionText || jobDescriptionText.trim().length < 15) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid target Job Description.',
      });
    }

    let parsedResume = { rawText: resumeText || '', skills: [], yearsOfExperience: 0 };

    if (resumeText) {
      const parsedEntities = categorizeResumeEntities(resumeText);
      parsedResume = {
        rawText: resumeText,
        ...parsedEntities,
      };
    }

    // 1. Calculate Layer 1 Deterministic Baseline Score
    const scoringResult = calculateDeterministicScore(parsedResume, jobDescriptionText, requiredExpYears || 3);

    // 2. Execute Layer 2 Gemini AI Evaluation
    const aiAnalysis = await analyzeResumeWithGemini(
      parsedResume.rawText,
      jobDescriptionText,
      scoringResult.matchedSkills,
      scoringResult.missingSkills
    );

    const payload = {
      jobTitle: jobTitle || 'Target Position',
      jobDescriptionText,
      compatibilityScore: scoringResult.compatibilityScore,
      scoringBreakdown: scoringResult.scoringBreakdown,
      matchedSkills: scoringResult.matchedSkills,
      missingSkills: scoringResult.missingSkills,
      aiAnalysis,
      createdAt: new Date(),
    };

    if (checkIsMockDb()) {
      const mockDoc = {
        _id: 'analysis_' + Date.now(),
        ...payload,
      };
      mockAnalyses.unshift(mockDoc);

      return res.status(201).json({
        success: true,
        data: mockDoc,
      });
    }

    const analysisDoc = await Analysis.create({
      userId: req.user ? req.user.id : null,
      resumeId: resumeId || null,
      ...payload,
    });

    res.status(201).json({
      success: true,
      data: analysisDoc,
    });
  } catch (error) {
    console.error('[ANALYSIS ERROR]', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAnalysisHistory = async (req, res) => {
  try {
    if (checkIsMockDb()) {
      return res.json({ success: true, data: mockAnalyses });
    }

    const query = req.user ? { userId: req.user.id } : {};
    const analyses = await Analysis.find(query).sort({ createdAt: -1 }).limit(10);

    res.json({ success: true, data: analyses });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
