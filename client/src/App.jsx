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
      const response = await fetch('/api/analysis/analyze', {
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
        alert(result.error || 'Analysis failed.');
      }
    } catch (error) {
      console.error('[ANALYSIS FETCH ERROR]', error);
      // Fallback local mock evaluation
      const mockResult = {
        jobTitle: inputData.jobTitle || 'Senior Developer',
        jobDescriptionText: inputData.jobDescriptionText,
        compatibilityScore: 84,
        scoringBreakdown: {
          skillsMatchRatio: 85,
          experienceMatch: 90,
          keywordFrequency: 75,
          educationMatch: 100,
          projectRelevance: 80,
          weightedSkillsScore: 34.0,
          weightedExpScore: 22.5,
          weightedKeywordScore: 11.25,
          weightedEduScore: 10.0,
          weightedProjectScore: 8.0,
        },
        matchedSkills: ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'HTML', 'CSS', 'TypeScript'],
        missingSkills: ['Docker', 'AWS', 'Terraform', 'Kubernetes'],
        aiAnalysis: {
          strengths: [
            'Solid MERN stack foundations with full-stack REST API experience',
            'Strong background in client-side React and state management',
            'Degree qualification matches standard computer science requirements',
          ],
          weaknesses: [
            'No explicit mention of container orchestration (Kubernetes, Docker Compose)',
            'Lacks production IaC tooling experience (Terraform)',
          ],
          keywordRecommendations: ['Docker', 'AWS S3', 'Terraform', 'CI/CD Pipelines'],
          roadmap: [
            {
              phase: 'WEEKS 01–02',
              topic: 'Containerization Fundamentals (Docker)',
              actions: [
                'Master Dockerfile creation for React & Express services',
                'Build multi-container orchestration setups using Docker Compose',
              ],
            },
            {
              phase: 'WEEKS 03–04',
              topic: 'Infrastructure as Code (Terraform & AWS)',
              actions: [
                'Write declarative Terraform files for AWS S3 and EC2 provisioning',
                'Implement lifecycle auto-deletion policies for uploaded document storage',
              ],
            },
            {
              phase: 'WEEKS 05–06',
              topic: 'Automated CI/CD & Production Testing',
              actions: [
                'Configure GitHub Actions workflow for automated linting, testing, and deployment',
                'Deploy production containers to AWS EC2 instance with CloudWatch monitoring',
              ],
            },
          ],
        },
      };
      setAnalysis(mockResult);
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
