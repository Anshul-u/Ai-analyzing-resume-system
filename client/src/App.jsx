import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { Header } from './components/Header';
import { IngestionWorkbench } from './components/IngestionWorkbench';
import { HorizontalShelf } from './components/HorizontalShelf';
import { MetricsDashboard } from './components/MetricsDashboard';
import { SkillMatrix } from './components/SkillMatrix';
import { ScoringBreakdown } from './components/ScoringBreakdown';
import { ExecutionRoadmap } from './components/ExecutionRoadmap';
import { SkeletonLoader } from './components/SkeletonLoader';
import { calculateDynamicAnalysis } from './utils/dynamicScoring';
import { getApiUrl } from './utils/api';

export default function App() {
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeSection, setActiveSection] = useState('input-stream');

  const scrollToWorkspace = () => {
    const element = document.getElementById('dark-workspace');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRunAnalysis = async (inputData) => {
    setIsAnalyzing(true);
    try {
      const response = await fetch(getApiUrl('/api/analysis/analyze'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputData),
      });

      const result = await response.json();
      if (result.success) {
        setAnalysis(result.data);
        setTimeout(() => {
          scrollToSection('horizontal-shelf');
        }, 300);
      } else {
        // Fallback to client-side dynamic evaluation if backend returns error
        const dynamicResult = calculateDynamicAnalysis(inputData);
        setAnalysis(dynamicResult);
        setTimeout(() => {
          scrollToSection('horizontal-shelf');
        }, 300);
      }
    } catch (error) {
      console.warn('[ANALYSIS FETCH WARNING] Backend unavailable. Executing client-side dynamic evaluation:', error.message);
      // Execute 100% dynamic analysis on real input strings
      const dynamicResult = calculateDynamicAnalysis(inputData);
      setAnalysis(dynamicResult);
      setTimeout(() => {
        scrollToSection('horizontal-shelf');
      }, 300);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F0] text-[#0A0A0A] font-sans selection:bg-[#0A0A0A] selection:text-[#F4F4F0]">
      {/* 1. LIGHT CANVAS HERO SECTION (KOTT.STUDIO 00:00–00:05) */}
      <HeroSection scrollToWorkspace={scrollToWorkspace} />

      {/* 2. DARK CANVAS WORKSPACE SECTION (KOTT.STUDIO 00:06–00:21) */}
      <div id="dark-workspace" className="bg-[#0A0A0A] text-[#EDEDED] min-h-screen transition-colors duration-700">
        {/* Top Sticky Header */}
        <Header activeSection={activeSection} scrollToSection={scrollToSection} isAnalyzing={isAnalyzing} />

        {/* Main Workspace Container */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* 01 — DUAL INGESTION WORKBENCH */}
          <IngestionWorkbench onRunAnalysis={handleRunAnalysis} isAnalyzing={isAnalyzing} />

          {/* Render Skeleton Loader while Analyzing */}
          {isAnalyzing && <SkeletonLoader />}

          {/* Output Sections Rendered Upon Synthesis */}
          {!isAnalyzing && analysis && (
            <>
              {/* HORIZONTAL CAROUSEL SHELF (KOTT.STUDIO 00:15–00:17) */}
              <HorizontalShelf analysis={analysis} />

              {/* 02 — SYNTHESIS OUTPUT & METRICS */}
              <MetricsDashboard analysis={analysis} />

              {/* 03 — SKILL MATRIX */}
              <SkillMatrix matchedSkills={analysis.matchedSkills} missingSkills={analysis.missingSkills} />

              {/* 04 — SCORING BREAKDOWN */}
              <ScoringBreakdown breakdown={analysis.scoringBreakdown} />

              {/* 05 — EXECUTION ROADMAP */}
              <ExecutionRoadmap roadmap={analysis.aiAnalysis?.roadmap} analysis={analysis} />
            </>
          )}
        </main>

        {/* Editorial Dark Footer */}
        <footer className="border-t border-neutral-800 py-8 mt-12 bg-[#0A0A0A] font-mono text-xs text-neutral-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <span className="text-neutral-300 font-semibold">analyzer studio ®</span>
              <span>— KOTT.STUDIO EDITION</span>
            </div>
            <div>
              <span>AWS + DOCKER + TERRAFORM + GEMINI AI</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
