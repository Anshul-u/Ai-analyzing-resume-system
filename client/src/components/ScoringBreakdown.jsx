import React from 'react';
import { motion } from 'framer-motion';

export const ScoringBreakdown = ({ breakdown }) => {
  if (!breakdown) return null;

  const components = [
    {
      id: '01',
      name: 'SKILLS MATCH OVERLAP',
      weight: '40%',
      ratio: breakdown.skillsMatchRatio || 0,
      score: breakdown.weightedSkillsScore || 0,
      max: 40,
    },
    {
      id: '02',
      name: 'EXPERIENCE LEVEL MATCH',
      weight: '25%',
      ratio: breakdown.experienceMatch || 0,
      score: breakdown.weightedExpScore || 0,
      max: 25,
    },
    {
      id: '03',
      name: 'KEYWORD FREQUENCY (TF-IDF)',
      weight: '15%',
      ratio: breakdown.keywordFrequency || 0,
      score: breakdown.weightedKeywordScore || 0,
      max: 15,
    },
    {
      id: '04',
      name: 'EDUCATION & DEGREE RELEVANCE',
      weight: '10%',
      ratio: breakdown.educationMatch || 0,
      score: breakdown.weightedEduScore || 0,
      max: 10,
    },
    {
      id: '05',
      name: 'PROJECT TECH STACK OVERLAP',
      weight: '10%',
      ratio: breakdown.projectRelevance || 0,
      score: breakdown.weightedProjectScore || 0,
      max: 10,
    },
  ];

  return (
    <section id="scoring-breakdown" className="my-8">
      {/* Editorial Section Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-6 font-mono">
        <div className="flex items-center space-x-3">
          <span className="text-neutral-500 text-xs">04 —</span>
          <h2 className="text-sm font-semibold tracking-wider text-neutral-100 uppercase">DETERMINISTIC FORMULA BREAKDOWN</h2>
        </div>
        <span className="text-[11px] text-neutral-500 font-mono">[ ALGORITHMIC_TRANSPARENCY ]</span>
      </div>

      <div className="bg-[#121212] border border-neutral-800 p-6 space-y-6 font-mono">
        {components.map((c) => (
          <div key={c.id} className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
              <span className="text-neutral-300 font-semibold">
                [{c.id}] {c.name} <span className="text-neutral-500 font-normal">({c.weight} WEIGHT)</span>
              </span>
              <span className="text-neutral-100">
                RATIO: <span className="font-bold">{c.ratio}%</span> | SCORE: <span className="text-emerald-400 font-bold">{c.score} / {c.max} PTS</span>
              </span>
            </div>

            {/* Framer Motion Hairline Progress Meter */}
            <div className="w-full bg-neutral-950 h-3 border border-neutral-800 relative overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${c.ratio}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="bg-neutral-100 h-full shadow-[0_0_10px_rgba(255,255,255,0.3)]"
              />
            </div>
          </div>
        ))}

        <div className="pt-4 border-t border-neutral-800/60 flex items-center justify-between text-[11px] text-neutral-500">
          <span>FORMULA: 0.40(Sm) + 0.25(Em) + 0.15(Kf) + 0.10(Edm) + 0.10(Pr)</span>
          <span>DETERMINISM: 100% REPEATABLE</span>
        </div>
      </div>
    </section>
  );
};
