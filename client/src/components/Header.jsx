import React from 'react';
import { Terminal, Shield, Activity } from 'lucide-react';

export const Header = ({ activeSection, scrollToSection, isAnalyzing }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md hairline-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between font-mono text-xs">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-8 h-8 bg-neutral-900 border border-neutral-700 flex items-center justify-center font-bold text-white">
            a®
          </div>
          <div>
            <span className="text-neutral-100 font-semibold tracking-wider text-sm">analyzer ®</span>
            <span className="text-neutral-500 text-[10px] block font-mono">CAREER_INSTRUMENT_v1.0</span>
          </div>
        </div>

        {/* Numbered Editorial Nav Links */}
        <nav className="hidden md:flex items-center space-x-6 text-neutral-400">
          <button
            onClick={() => scrollToSection('input-stream')}
            className={`hover:text-white transition-colors flex items-center space-x-1 ${
              activeSection === 'input-stream' ? 'text-white underline underline-offset-4' : ''
            }`}
          >
            <span className="text-neutral-600">01/</span>
            <span>analyzer</span>
          </button>
          <button
            onClick={() => scrollToSection('skill-matrix')}
            className={`hover:text-white transition-colors flex items-center space-x-1 ${
              activeSection === 'skill-matrix' ? 'text-white underline underline-offset-4' : ''
            }`}
          >
            <span className="text-neutral-600">02/</span>
            <span>skill-gap</span>
          </button>
          <button
            onClick={() => scrollToSection('scoring-breakdown')}
            className={`hover:text-white transition-colors flex items-center space-x-1 ${
              activeSection === 'scoring-breakdown' ? 'text-white underline underline-offset-4' : ''
            }`}
          >
            <span className="text-neutral-600">03/</span>
            <span>breakdown</span>
          </button>
          <button
            onClick={() => scrollToSection('execution-roadmap')}
            className={`hover:text-white transition-colors flex items-center space-x-1 ${
              activeSection === 'execution-roadmap' ? 'text-white underline underline-offset-4' : ''
            }`}
          >
            <span className="text-neutral-600">04/</span>
            <span>roadmap</span>
          </button>
        </nav>

        {/* System Status Indicator Pill */}
        <div className="flex items-center space-x-2">
          {isAnalyzing ? (
            <div className="flex items-center space-x-2 px-3 py-1 bg-amber-950/40 border border-amber-500/40 text-amber-400 rounded-none text-[11px] animate-pulse">
              <Activity className="w-3.5 h-3.5" />
              <span>⚡ SYNTHESIS_RUNNING</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 px-3 py-1 bg-neutral-900 border border-neutral-800 text-emerald-400 rounded-none text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>🟢 ENGINE_READY</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
