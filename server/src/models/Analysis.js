import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
    required: false,
  },
  jobTitle: {
    type: String,
    required: true,
    default: 'Target Position',
  },
  jobDescriptionText: {
    type: String,
    required: true,
  },
  compatibilityScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  scoringBreakdown: {
    skillsMatchRatio: Number,
    experienceMatch: Number,
    keywordFrequency: Number,
    educationMatch: Number,
    projectRelevance: Number,
    weightedSkillsScore: Number,
    weightedExpScore: Number,
    weightedKeywordScore: Number,
    weightedEduScore: Number,
    weightedProjectScore: Number,
  },
  matchedSkills: [String],
  missingSkills: [String],
  aiAnalysis: {
    strengths: [String],
    weaknesses: [String],
    keywordRecommendations: [String],
    roadmap: [
      {
        phase: String,
        topic: String,
        actions: [String],
        status: { type: String, default: 'pending' },
      },
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Analysis', analysisSchema);
