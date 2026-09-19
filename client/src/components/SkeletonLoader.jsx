import React from 'react';

export const SkeletonLoader = ({ stageMessage }) => {
  return (
    <div className="my-8 space-y-6 font-mono animate-pulse">
      {/* Loading Status Bar */}
      <div className="bg-[#121212] border border-neutral-800 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 rounded-full bg-indigo-500 animate-ping" />
          <span className="text-xs font-semibold text-neutral-200 tracking-wider">
            {stageMessage || 'STAGE 1: EXTRACTING SPATIAL TEXT STREAM...'}
          </span>
        </div>
        <span className="text-[11px] text-neutral-500">[ DUAL_LAYER_EVALUATION ]</span>
      </div>

      {/* Metric Skeleton Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-[#121212] border border-neutral-800 p-6 h-40 flex flex-col justify-between">
            <div className="w-32 h-4 bg-neutral-800 rounded" />
            <div className="w-24 h-10 bg-neutral-800 rounded my-2" />
            <div className="w-full h-2 bg-neutral-800 rounded" />
          </div>
        ))}
      </div>

      {/* Grid Skeleton Card */}
      <div className="bg-[#121212] border border-neutral-800 p-6 space-y-4">
        <div className="w-48 h-4 bg-neutral-800 rounded" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-8 bg-neutral-800 border border-neutral-700/40 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
};
