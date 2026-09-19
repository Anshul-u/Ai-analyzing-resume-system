import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Sparkles, Terminal, Shield } from 'lucide-react';

export const HeroSection = ({ scrollToWorkspace }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20; // -10 to +10 deg
    const y = (clientY / innerHeight - 0.5) * -20;
    setMousePos({ x, y });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="bg-[#F4F4F0] text-[#0A0A0A] border-b border-neutral-300 py-16 px-4 sm:px-8 lg:px-12 relative overflow-hidden font-mono transition-colors duration-500"
    >
      {/* Micro Top Header Bar inside Light Canvas */}
      <div className="max-w-7xl mx-auto flex items-center justify-between border-b border-neutral-300 pb-4 mb-12">
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 bg-[#0A0A0A] text-[#F4F4F0] font-bold text-xs flex items-center justify-center">
            k®
          </div>
          <span className="font-bold text-sm tracking-wider uppercase">analyzer studio ®</span>
        </div>

        <div className="hidden md:flex items-center space-x-8 text-xs text-neutral-600">
          <button onClick={scrollToWorkspace} className="hover:text-black transition-colors font-medium">
            /analyzer
          </button>
          <button onClick={scrollToWorkspace} className="hover:text-black transition-colors font-medium">
            /skill-gap
          </button>
          <button onClick={scrollToWorkspace} className="hover:text-black transition-colors font-medium">
            /roadmap
          </button>
        </div>

        <div className="flex items-center space-x-2 text-[11px] bg-neutral-200/80 px-3 py-1 border border-neutral-300">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span className="font-semibold uppercase text-neutral-800">ENGINE_v1.0 ONLINE</span>
        </div>
      </div>

      {/* Main Hero Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Oversized High-Impact Typography */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-neutral-200 border border-neutral-300 text-xs text-neutral-700 font-semibold uppercase">
            <Sparkles className="w-3.5 h-3.5 text-neutral-900" />
            <span>KOTT.STUDIO EDITORIAL ATS INSTRUMENT</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter uppercase leading-[0.95] text-[#0A0A0A]">
            Precision <br />
            Resume <br />
            Engineering.
          </h1>

          <p className="text-sm sm:text-base text-neutral-700 max-w-xl font-sans leading-relaxed">
            A high-craft candidate ATS emulator & career strategy workbench. Fuses deterministic spatial text matching with Google Gemini Generative AI semantic analysis.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={scrollToWorkspace}
              className="bg-[#0A0A0A] hover:bg-neutral-800 text-[#F4F4F0] font-bold text-xs uppercase px-8 py-4 flex items-center justify-center space-x-3 transition-colors shadow-lg"
            >
              <span>[ INITIALIZE WORKBENCH ]</span>
              <ArrowDownRight className="w-4 h-4" />
            </button>

            <div className="text-xs text-neutral-500 font-mono flex items-center space-x-2 px-4 py-2 border border-neutral-300">
              <Shield className="w-4 h-4 text-neutral-700" />
              <span>PROMPT_INJECTION_SHIELDED</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Interactive Geometric Matrix Card */}
        <div className="lg:col-span-5 flex justify-center">
          <motion.div
            animate={{
              rotateY: mousePos.x,
              rotateX: mousePos.y,
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="w-full max-w-md bg-[#0A0A0A] text-[#EDEDED] p-8 border border-neutral-800 shadow-2xl relative group transform preserve-3d"
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-6">
              <span className="text-xs text-neutral-400 font-bold">[ MATRIX_PREVIEW ]</span>
              <span className="text-[10px] text-emerald-400 font-mono">[ 84% MATCH ]</span>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="bg-neutral-900 border border-neutral-800 p-3">
                <span className="text-neutral-500 text-[10px] block">01 / CANDIDATE_STACK</span>
                <span className="text-neutral-200 font-semibold">React, Node.js, Express, MongoDB</span>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 p-3">
                <span className="text-neutral-500 text-[10px] block">02 / SKILL_GAPS</span>
                <span className="text-amber-400 font-semibold">Docker, AWS S3, Terraform</span>
              </div>

              <div className="border-t border-neutral-800 pt-3 flex items-center justify-between text-[11px] text-neutral-400">
                <span>DETERMINISTIC FORMULA</span>
                <span className="text-neutral-200">100% VERIFIED</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-[10px] text-neutral-500">
              <span>SCROLL TO ENTER DARK CANVAS</span>
              <span>↓</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
