import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, Layers, Calendar, ChevronRight } from 'lucide-react';

export const HorizontalShelf = ({ analysis }) => {
  if (!analysis) return null;

  const { compatibilityScore, matchedSkills = [], missingSkills = [], aiAnalysis = {} } = analysis;

  const cards = [
    {
      id: 'score',
      badge: `[ ${compatibilityScore}% MATCH ]`,
      badgeColor: compatibilityScore >= 75 ? 'text-emerald-400 border-emerald-500/40 bg-emerald-950/20' : 'text-amber-400 border-amber-500/40 bg-amber-950/20',
      title: 'ATS COMPATIBILITY RATING',
      subtitle: `Calculated from ${matchedSkills.length + missingSkills.length} taxonomy checkpoints.`,
      content: (
        <div className="my-2 font-mono">
          <div className="text-4xl font-extrabold text-neutral-100">{compatibilityScore}%</div>
          <div className="text-xs text-neutral-400 mt-1">DETERMINISTIC FORMULA VERIFIED</div>
        </div>
      ),
    },
    {
      id: 'skills',
      badge: `[ ${matchedSkills.length} MATCHED ]`,
      badgeColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/20',
      title: 'MATCHED COMPETENCIES',
      subtitle: 'Verified technical taxonomy overlap.',
      content: (
        <div className="flex flex-wrap gap-1.5 font-mono text-[11px] my-2">
          {matchedSkills.slice(0, 6).map((s, i) => (
            <span key={i} className="px-2 py-0.5 border border-emerald-500/40 text-emerald-400 bg-emerald-950/20">
              ✓ {s}
            </span>
          ))}
          {matchedSkills.length > 6 && <span className="text-neutral-500 text-[10px]">+{matchedSkills.length - 6} more</span>}
        </div>
      ),
    },
    {
      id: 'gaps',
      badge: `[ ${missingSkills.length} MISSING ]`,
      badgeColor: 'text-amber-400 border-amber-500/40 bg-amber-950/20',
      title: 'SKILL GAPS & REMEDIATION',
      subtitle: 'Required skills missing from candidate text.',
      content: (
        <div className="flex flex-wrap gap-1.5 font-mono text-[11px] my-2">
          {missingSkills.slice(0, 5).map((s, i) => (
            <span key={i} className="px-2 py-0.5 border border-amber-500/40 text-amber-400 bg-amber-950/20">
              ✗ {s}
            </span>
          ))}
        </div>
      ),
    },
    ...(aiAnalysis.roadmap || []).map((step, idx) => ({
      id: `roadmap-${idx}`,
      badge: `[ ${step.phase || `PHASE 0${idx + 1}`} ]`,
      badgeColor: 'text-indigo-400 border-indigo-500/40 bg-indigo-950/20',
      title: step.topic,
      subtitle: `${step.actions?.length || 0} Actionable Remediation Tasks`,
      content: (
        <div className="space-y-1 font-mono text-xs text-neutral-300 my-2">
          {step.actions?.slice(0, 2).map((act, i) => (
            <p key={i} className="truncate">
              • {act}
            </p>
          ))}
        </div>
      ),
    })),
  ];

  return (
    <section id="horizontal-shelf" className="my-10 font-mono">
      {/* Editorial Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-6">
        <div className="flex items-center space-x-3">
          <span className="text-neutral-500 text-xs">02 —</span>
          <h2 className="text-sm font-semibold tracking-wider text-neutral-100 uppercase">ANALYSIS CAROUSEL SHELF</h2>
        </div>
        <div className="flex items-center space-x-2 text-[11px] text-neutral-500">
          <span>SWIPE HORIZONTALLY</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Horizontal Scrollable Shelf Container */}
      <div className="flex space-x-4 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
        {cards.map((card, idx) => (
          <motion.div
            key={card.id || idx}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0 w-80 bg-[#121212] border border-neutral-800 p-6 flex flex-col justify-between hover:border-neutral-600 hover:shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition-all cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className={`px-2.5 py-0.5 border text-[10px] font-bold ${card.badgeColor}`}>
                  {card.badge}
                </span>
                <span className="text-neutral-600 text-[10px]">SHELF_0{idx + 1}</span>
              </div>

              <h3 className="text-sm font-bold text-neutral-100 tracking-tight">{card.title}</h3>
              <p className="text-[11px] text-neutral-400 mt-1">{card.subtitle}</p>

              <div className="mt-4">{card.content}</div>
            </div>

            <div className="pt-4 border-t border-neutral-800/60 flex items-center justify-between text-[10px] text-neutral-500">
              <span>CARD_ID: #{idx + 1}</span>
              <span>INSPECT →</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
