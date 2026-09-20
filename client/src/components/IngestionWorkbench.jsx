import React, { useState, useRef, useEffect } from 'react';
import { Upload, FileText, Check, Sparkles, FileCode, Eye, Sliders } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getApiUrl } from '../utils/api';

export const IngestionWorkbench = ({ onRunAnalysis, isAnalyzing }) => {
  const [activeTab, setActiveTab] = useState('01'); // '01' = Resume Parser, '02' = Job Spec
  const [file, setFile] = useState(null);
  const [fileSize, setFileSize] = useState('');
  const [parsedResumeText, setParsedResumeText] = useState('');
  const [jobTitle, setJobTitle] = useState('Senior Full-Stack Developer');
  const [jobDescription, setJobDescription] = useState(
    'We are seeking a Senior Full-Stack Developer proficient in React.js, Node.js, Express, MongoDB, Docker, AWS, and TypeScript. Responsible for building scalable REST APIs, microservices, unit testing, and cloud deployments.'
  );
  const [uploadStatus, setUploadStatus] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [loadingStage, setLoadingStage] = useState(1);
  const fileInputRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isAnalyzing) {
      setLoadingStage(1);
      interval = setInterval(() => {
        setLoadingStage((prev) => (prev < 3 ? prev + 1 : prev));
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const formatBytes = (bytes) => {
    if (!bytes) return '';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const processFile = async (selectedFile) => {
    setFile(selectedFile);
    setFileSize(formatBytes(selectedFile.size));
    setUploadStatus('uploading');

    const formData = new FormData();
    formData.append('resume', selectedFile);

    try {
      const response = await fetch(getApiUrl('/api/resume/upload'), {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setUploadStatus('parsed');
        setParsedResumeText(data.data.rawText);
      } else {
        setUploadStatus('error');
        alert(data.error || 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      const reader = new FileReader();
      reader.onload = (event) => {
        setParsedResumeText(event.target.result);
        setUploadStatus('parsed');
      };
      reader.readAsText(selectedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!parsedResumeText && !file) {
      alert('Please upload a resume or paste your resume text.');
      return;
    }
    if (!jobDescription) {
      alert('Please enter a target job description.');
      return;
    }

    onRunAnalysis({
      resumeText: parsedResumeText,
      jobTitle,
      jobDescriptionText: jobDescription,
    });
  };

  const getLoadingMessage = () => {
    if (loadingStage === 1) return 'STAGE 1: EXTRACTING SPATIAL TEXT STREAM...';
    if (loadingStage === 2) return 'STAGE 2: CALCULATING HYBRID SCORING ALGORITHM...';
    return 'STAGE 3: GENERATING GEMINI AI ROADMAP...';
  };

  return (
    <section id="input-stream" className="my-8">
      {/* Editorial Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-6 font-mono">
        <div className="flex items-center space-x-3">
          <span className="text-neutral-500 text-xs">01 —</span>
          <h2 className="text-sm font-semibold tracking-wider text-neutral-100 uppercase">WORKBENCH INGESTION ENGINE</h2>
        </div>
        <span className="text-[11px] text-neutral-500 font-mono">[ DUAL_COLUMN_LAYOUT ]</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-neutral-800 bg-[#121212] font-mono">
          {/* LEFT COLUMN: Dynamic Interactive Card Preview */}
          <div className="lg:col-span-5 p-6 border-b lg:border-b-0 lg:border-r border-neutral-800 flex flex-col justify-between bg-neutral-950/40">
            <div>
              <div className="flex items-center justify-between mb-4 text-xs">
                <span className="text-neutral-400 font-semibold flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-indigo-400 stroke-[1.5]" />
                  <span>[ LIVE_PREVIEW_CARD ]</span>
                </span>
                <span className="text-[10px] text-neutral-500 font-mono">
                  {uploadStatus === 'parsed' ? '[ STATUS: READY ]' : '[ STATUS: IDLE ]'}
                </span>
              </div>

              {/* Dynamic Document Card Preview */}
              <div className="border border-neutral-800 bg-[#0A0A0A] p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-neutral-300" />
                    <span className="text-xs font-bold text-neutral-200 truncate max-w-[180px]">
                      {file ? file.name : 'Candidate_Resume.pdf'}
                    </span>
                  </div>
                  {uploadStatus === 'parsed' ? (
                    <span className="px-2 py-0.5 bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono">
                      [ ATS_PARSED ]
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-neutral-500 text-[10px] font-mono">
                      [ RAW_STREAM ]
                    </span>
                  )}
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-neutral-400">
                    <span>FILE SIZE:</span>
                    <span className="text-neutral-200 font-semibold">{fileSize || '32.4 KB'}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>CHAR COUNTER:</span>
                    <span className="text-neutral-200 font-semibold">{parsedResumeText.length} CHARS</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>TARGET POSITION:</span>
                    <span className="text-neutral-200 font-semibold truncate max-w-[140px]">{jobTitle}</span>
                  </div>
                </div>

                {/* Text Snippet Preview */}
                <div className="pt-3 border-t border-neutral-800">
                  <span className="text-[10px] text-neutral-500 block mb-1">RAW PARSED PREVIEW:</span>
                  <div className="bg-neutral-950 p-2 border border-neutral-800 text-[11px] text-neutral-400 h-24 overflow-y-auto font-mono leading-relaxed">
                    {parsedResumeText || 'No document text extracted yet. Drop a PDF/DOCX file or paste text.'}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500">
              <span>SECURITY: FENCED PROMPTS</span>
              <span>KOTT ENGINE ACTIVE</span>
            </div>
          </div>

          {/* RIGHT COLUMN: Editorial Micro-Index Selector (01 / 02) */}
          <div className="lg:col-span-7 p-6 flex flex-col justify-between">
            <div>
              {/* Micro Index Selector Tabs */}
              <div className="flex items-center space-x-2 border-b border-neutral-800 pb-3 mb-6 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setActiveTab('01')}
                  className={`px-3 py-1.5 border transition-all ${
                    activeTab === '01'
                      ? 'bg-neutral-100 text-neutral-950 font-bold border-white shadow-[0_0_12px_rgba(255,255,255,0.2)]'
                      : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white'
                  }`}
                >
                  01 / RESUME_PARSER
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('02')}
                  className={`px-3 py-1.5 border transition-all ${
                    activeTab === '02'
                      ? 'bg-neutral-100 text-neutral-950 font-bold border-white shadow-[0_0_12px_rgba(255,255,255,0.2)]'
                      : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white'
                  }`}
                >
                  02 / JOB_SPECIFICATION
                </button>
              </div>

              {/* Tab 01 Content: Drag and Drop + Text Paste */}
              {activeTab === '01' && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <motion.div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    animate={{
                      scale: isDragOver ? 1.01 : 1,
                      borderColor: isDragOver ? '#6366F1' : '#1E1E1E',
                    }}
                    className={`border border-dashed p-8 text-center cursor-pointer transition-all ${
                      isDragOver
                        ? 'bg-indigo-950/20 shadow-[0_0_20px_rgba(99,102,241,0.2)]'
                        : 'bg-neutral-950/50 hover:border-neutral-700 hover:shadow-[0_0_15px_rgba(99,102,241,0.1)]'
                    }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])}
                      accept=".pdf,.docx,.doc,.txt"
                      className="hidden"
                    />

                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-12 h-12 bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300">
                        <Upload className="w-5 h-5 stroke-[1.5]" />
                      </div>
                      <div className="font-mono text-xs">
                        <p className="text-neutral-200">
                          Drop candidate PDF / DOCX file here or <span className="text-indigo-400 underline">browse</span>
                        </p>
                        <p className="text-neutral-500 text-[10px] mt-1">MAX 5MB — SPATIAL EXTRACTOR READY</p>
                      </div>
                    </div>
                  </motion.div>

                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">DIRECT TEXT PASTE FALLBACK:</label>
                    <textarea
                      value={parsedResumeText}
                      onChange={(e) => setParsedResumeText(e.target.value)}
                      placeholder="Paste raw resume text here if not uploading file..."
                      rows={4}
                      className="w-full bg-[#0A0A0A] border border-neutral-800 p-3 text-xs text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-neutral-500 resize-none font-mono"
                    />
                  </div>
                </motion.div>
              )}

              {/* Tab 02 Content: Job Specification */}
              {activeTab === '02' && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">TARGET JOB TITLE:</label>
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="e.g. Senior Full-Stack Engineer"
                      className="w-full bg-[#0A0A0A] border border-neutral-800 p-2.5 text-xs text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-neutral-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">TARGET JOB DESCRIPTION:</label>
                    <textarea
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Paste target job description..."
                      rows={7}
                      className="w-full bg-[#0A0A0A] border border-neutral-800 p-3 text-xs text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-neutral-500 resize-none font-mono"
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Inverted Brutalist Action CTA */}
            <div className="mt-6 pt-4 border-t border-neutral-800">
              <motion.button
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.995 }}
                type="submit"
                disabled={isAnalyzing}
                className={`w-full font-mono font-bold text-xs py-4 px-6 uppercase tracking-wider flex items-center justify-center space-x-3 transition-all border ${
                  isAnalyzing
                    ? 'bg-neutral-900 border-indigo-500/50 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.2)]'
                    : 'bg-neutral-100 hover:bg-white text-neutral-950 border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                }`}
              >
                <Sparkles className={`w-4 h-4 stroke-[2] ${isAnalyzing ? 'animate-spin' : ''}`} />
                <span>{isAnalyzing ? `[ ⚡ ${getLoadingMessage()} ]` : '[ SEND FOR ANALYSIS ]'}</span>
              </motion.button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};
