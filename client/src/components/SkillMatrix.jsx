import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const SkillMatrix = ({ matchedSkills = [], missingSkills = [] }) => {
  const [filter, setFilter] = useState('ALL'); // 'ALL', 'MATCHED', 'MISSING'

  const allSkills = [
    ...matchedSkills.map((s) => ({ name: s, matched: true })),
    ...missingSkills.map((s) => ({ name: s, matched: false })),
  ];

  const filteredSkills = allSkills.filter((s) => {
    if (filter === 'MATCHED') return s.matched;
    if (filter === 'MISSING') return !s.matched;
    return true;
  });

  return (
    <section id="skill-matrix" className="my-8">
      {/* Editorial Section Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-6 font-mono">
        <div className="flex items-center space-x-3">
          <span className="text-neutral-500 text-xs">03 —</span>
          <h2 className="text-sm font-semibold tracking-wider text-neutral-100 uppercase">SKILL GAP MATRIX</h2>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="text-neutral-500 hidden sm:inline">FILTER:</span>
          {['ALL', 'MATCHED', 'MISSING'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1 text-[11px] font-mono border transition-all ${
                filter === type
                  ? 'bg-neutral-100 text-neutral-950 font-bold border-white shadow-[0_0_10px_rgba(255,255,255,0.2)]'
                  : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white'
              }`}
            >
              [ {type} ]
            </button>
          ))}
        </div>
      </div>

      {/* Skill Matrix Grid */}
      <div className="bg-[#121212] border border-neutral-800 p-6">
        {filteredSkills.length === 0 ? (
          <p className="font-mono text-xs text-neutral-500">No skills match the current filter selection.</p>
        ) : (
          <motion.div layout className="flex flex-wrap gap-2.5">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ scale: 1.03 }}
                  className={`font-mono text-xs px-3 py-1.5 border flex items-center space-x-1.5 transition-all cursor-default ${
                    skill.matched
                      ? 'border-emerald-500/40 text-emerald-400 bg-emerald-950/20 hover:border-emerald-400 hover:shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                      : 'border-amber-500/40 text-amber-400 bg-amber-950/20 hover:border-amber-400 hover:shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                  }`}
                >
                  <span>{skill.matched ? '[ ✓' : '[ ✗'}</span>
                  <span className="font-semibold text-neutral-100">{skill.name}</span>
                  <span>]</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        <div className="mt-6 pt-4 border-t border-neutral-800/60 flex items-center justify-between font-mono text-[11px] text-neutral-500">
          <span>MATCHED: {matchedSkills.length} SKILLS</span>
          <span>MISSING: {missingSkills.length} SKILLS</span>
        </div>
      </div>
    </section>
  );
};
