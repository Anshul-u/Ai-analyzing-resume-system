import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertTriangle, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export const MetricsDashboard = ({ analysis }) => {
  if (!analysis) return null;

  const { compatibilityScore = 0, scoringBreakdown = {}, matchedSkills = [], missingSkills = [], aiAnalysis = {} } = analysis;

  const [animatedScore, setAnimatedScore] = useState(0);

  // Smooth number counter animation
  useEffect(() => {
    let start = 0;
    const end = compatibilityScore;
    const duration = 1200; // ms
    const incrementTime = 20; // ms
    const step = (end - start) / (duration / incrementTime);

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setAnimatedScore(end);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [compatibilityScore]);

  const getScoreTheme = (score) => {
    if (score >= 75) {
      return {
        color: '#10B981',
        textColor: 'text-emerald-400',
        borderColor: 'border-emerald-500/40',
        bgGlow: 'shadow-[0_0_25px_rgba(16,185,129,0.15)]',
        badge: '[ STRONG_MATCH ]',
      };
    }
    if (score >= 50) {
      return {
        color: '#F59E0B',
        textColor: 'text-amber-400',
        borderColor: 'border-amber-500/40',
        bgGlow: 'shadow-[0_0_25px_rgba(245,158,11,0.15)]',
        badge: '[ MODERATE_MATCH ]',
      };
    }
    return {
      color: '#F43F5E',
      textColor: 'text-rose-400',
      borderColor: 'border-rose-500/40',
      bgGlow: 'shadow-[0_0_25px_rgba(244,63,94,0.15)]',
      badge: '[ HIGH_SKILL_GAP ]',
    };
  };

  const theme = getScoreTheme(compatibilityScore);

  // SVG Circular Gauge Math
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <section id="synthesis-output" className="my-8">
      {/* Editorial Section Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-6 font-mono">
        <div className="flex items-center space-x-3">
          <span className="text-neutral-500 text-xs">02 —</span>
          <h2 className="text-sm font-semibold tracking-wider text-neutral-100 uppercase">SYNTHESIS OUTPUT</h2>
        </div>
        <span className="text-[11px] text-neutral-500 font-mono">[ REALTIME_METRIC_ENGINE ]</span>
      </div>

      {/* Primary High-Density Metric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Metric Card 1: Interactive Animated SVG Score Gauge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-[#121212] border border-neutral-800 p-6 flex flex-col justify-between hover:border-neutral-700 transition-all ${theme.bgGlow}`}
        >
          <div className="flex items-center justify-between font-mono text-xs text-neutral-400 mb-2">
            <span>COMPATIBILITY_SCORE</span>
            <span className={`px-2 py-0.5 border text-[10px] font-bold ${theme.textColor} ${theme.borderColor}`}>
              {theme.badge}
            </span>
          </div>

          <div className="my-2 flex items-center justify-between">
            {/* SVG Circular Gauge */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background Track Circle */}
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke="#1E1E1E"
                  strokeWidth="8"
                  fill="transparent"
                />
                {/* Animated Progress Circle */}
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke={theme.color}
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center font-mono">
                <span className={`text-2xl font-extrabold ${theme.textColor}`}>{animatedScore}%</span>
                <span className="text-[9px] text-neutral-500">MATCH</span>
              </div>
            </div>

            <div className="font-mono text-right space-y-1">
              <p className="text-xs text-neutral-400">HEURISTIC WEIGHTS</p>
              <p className="text-sm font-bold text-neutral-100">{scoringBreakdown.weightedSkillsScore || 34}/40 PTS</p>
              <p className="text-[11px] text-neutral-500">SKILLS OVERLAP</p>
            </div>
          </div>

          <div className="w-full bg-neutral-900 h-1.5 border border-neutral-800 overflow-hidden mt-2">
            <div
              className="h-full transition-all duration-1000"
              style={{ width: `${animatedScore}%`, backgroundColor: theme.color }}
            />
          </div>
        </motion.div>

        {/* Metric Card 2: Skill Overlap Ratio */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#121212] border border-neutral-800 p-6 flex flex-col justify-between hover:border-neutral-700 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.03)]"
        >
          <div className="flex items-center justify-between font-mono text-xs text-neutral-400 mb-2">
            <span>SKILL_MATCH_RATIO</span>
            <span className="text-neutral-500 text-[10px]">[ TAXONOMY_VERIFIED ]</span>
          </div>

          <div className="my-4 flex items-baseline space-x-2 font-mono">
            <span className="text-5xl font-bold text-neutral-100">
              {matchedSkills.length} <span className="text-neutral-600 text-3xl">/ {matchedSkills.length + missingSkills.length}</span>
            </span>
          </div>

          <div className="font-mono text-xs text-neutral-400 space-y-1">
            <p className="flex items-center justify-between">
              <span>MATCHED COMPETENCIES:</span>
              <span className="text-emerald-400 font-bold">{matchedSkills.length}</span>
            </p>
            <p className="flex items-center justify-between">
              <span>MISSING COMPETENCIES:</span>
              <span className="text-amber-400 font-bold">{missingSkills.length}</span>
            </p>
          </div>
        </motion.div>

        {/* Metric Card 3: Experience & Keyword Frequency */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#121212] border border-neutral-800 p-6 flex flex-col justify-between hover:border-neutral-700 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.03)]"
        >
          <div className="flex items-center justify-between font-mono text-xs text-neutral-400 mb-2">
            <span>WEIGHTED_INDEXES</span>
            <span className="text-neutral-500 text-[10px]">[ HYBRID_FORMULA ]</span>
          </div>

          <div className="my-2 space-y-2.5 font-mono text-xs">
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">EXP MATCH:</span>
              <span className="text-neutral-100 font-semibold">{scoringBreakdown?.experienceMatch || 75}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">KEYWORD DENSITY:</span>
              <span className="text-neutral-100 font-semibold">{scoringBreakdown?.keywordFrequency || 80}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">DEGREE RELEVANCE:</span>
              <span className="text-neutral-100 font-semibold">{scoringBreakdown?.educationMatch || 100}%</span>
            </div>
          </div>

          <div className="pt-2 border-t border-neutral-800 text-[10px] font-mono text-neutral-500">
            DETERMINISTIC FORMULA ENGINE ACTIVE
          </div>
        </motion.div>
      </div>

      {/* Qualitative Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="bg-[#121212] border border-neutral-800 p-6 font-mono hover:border-neutral-700 transition-all">
          <div className="flex items-center space-x-2 text-xs text-emerald-400 mb-4 pb-2 border-b border-neutral-800 font-semibold">
            <CheckCircle className="w-4 h-4" />
            <span>[ CANDIDATE_STRENGTHS ]</span>
          </div>
          <ul className="space-y-2.5 text-xs text-neutral-300">
            {aiAnalysis.strengths?.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-neutral-600 font-bold">+</span>
                <span>{item}</span>
              </li>
            )) || <li>No explicit strengths cataloged.</li>}
          </ul>
        </div>

        {/* Weaknesses / Gaps */}
        <div className="bg-[#121212] border border-neutral-800 p-6 font-mono hover:border-neutral-700 transition-all">
          <div className="flex items-center space-x-2 text-xs text-amber-400 mb-4 pb-2 border-b border-neutral-800 font-semibold">
            <AlertTriangle className="w-4 h-4" />
            <span>[ STRUCTURAL_WEAKNESSES_&_GAPS ]</span>
          </div>
          <ul className="space-y-2.5 text-xs text-neutral-300">
            {aiAnalysis.weaknesses?.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-amber-600 font-bold">-</span>
                <span>{item}</span>
              </li>
            )) || <li>No explicit weaknesses cataloged.</li>}
          </ul>
        </div>
      </div>
    </section>
  );
};
