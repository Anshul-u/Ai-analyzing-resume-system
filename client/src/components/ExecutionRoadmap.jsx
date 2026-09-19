import React, { useState } from 'react';
import { CheckSquare, Square, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { generatePrintablePDF } from '../utils/pdfExport';

export const ExecutionRoadmap = ({ roadmap = [], analysis }) => {
  const [completedTasks, setCompletedTasks] = useState({});

  const toggleTask = (phaseIdx, actionIdx) => {
    const key = `${phaseIdx}-${actionIdx}`;
    setCompletedTasks((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleExportPDF = () => {
    if (analysis) {
      generatePrintablePDF(analysis);
    } else {
      alert('Analysis report not ready for export.');
    }
  };

  return (
    <section id="execution-roadmap" className="my-8">
      {/* Editorial Section Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-6 font-mono">
        <div className="flex items-center space-x-3">
          <span className="text-neutral-500 text-xs">05 —</span>
          <h2 className="text-sm font-semibold tracking-wider text-neutral-100 uppercase">EXECUTION ROADMAP</h2>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleExportPDF}
          className="px-3 py-1.5 bg-neutral-900 border border-neutral-700 text-neutral-200 text-xs font-mono flex items-center space-x-2 hover:border-white hover:text-white transition-all shadow-[0_0_10px_rgba(255,255,255,0.05)]"
        >
          <Download className="w-3.5 h-3.5" />
          <span>[ EXPORT_PDF_REPORT ]</span>
        </motion.button>
      </div>

      {/* Timeline Steps */}
      <div className="space-y-4 font-mono">
        {roadmap.map((step, phaseIdx) => (
          <motion.div
            key={phaseIdx}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: phaseIdx * 0.1 }}
            className="bg-[#121212] border border-neutral-800 p-6 hover:border-neutral-700 transition-all hover:shadow-[0_0_15px_rgba(99,102,241,0.08)]"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-800 pb-3 mb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs font-bold">
                  [ {step.phase || `WEEKS ${phaseIdx * 2 + 1}–${phaseIdx * 2 + 2}`} ]
                </span>
                <h3 className="text-sm font-bold text-neutral-100">{step.topic}</h3>
              </div>
              <span className="text-neutral-500 text-xs">[ PHASE_0{phaseIdx + 1} ]</span>
            </div>

            <div className="space-y-3">
              {step.actions?.map((action, actionIdx) => {
                const isChecked = !!completedTasks[`${phaseIdx}-${actionIdx}`];
                return (
                  <div
                    key={actionIdx}
                    onClick={() => toggleTask(phaseIdx, actionIdx)}
                    className="flex items-start space-x-3 text-xs text-neutral-300 cursor-pointer group hover:text-white transition-colors"
                  >
                    <button className="mt-0.5 text-neutral-500 group-hover:text-neutral-200">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-400 stroke-[2]" />
                      ) : (
                        <Square className="w-4 h-4 stroke-[1.5]" />
                      )}
                    </button>
                    <span className={isChecked ? 'line-through text-neutral-500' : ''}>{action}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
