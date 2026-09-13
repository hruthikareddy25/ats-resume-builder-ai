import React, { useState, useEffect } from 'react';
import HeaderForm from './components/HeaderForm';
import SummaryForm from './components/SummaryForm';
import SkillsForm from './components/SkillsForm';
import ExperienceForm from './components/ExperienceForm';
import EducationForm from './components/EducationForm';
import CertificationsForm from './components/CertificationsForm';
import AtsScoreCard from './components/AtsScoreCard';
import ResumePreview from './components/ResumePreview';
import AiWorkspacePage from './components/AiWorkspacePage';
import AuthModal from './components/AuthModal';

import { defaultResumeData } from './utils/defaultData';
import { analyzeResume } from './utils/atsAnalyzer';
import { generatePlainTextResume, generateMarkdownResume, downloadTextFile, copyToClipboard } from './utils/exportHelpers';

import {
  FileText, Sun, Moon, Download, Copy, Printer, RotateCcw,
  Sparkles, Eye, Edit3, Columns, Check, Brain, Gauge, Layout, User
} from 'lucide-react';

export default function App() {
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('ats_resume_builder_data');
    return saved ? JSON.parse(saved) : defaultResumeData;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('ats_resume_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(true);
  const [previewStyle, setPreviewStyle] = useState('modern'); // 'modern' or 'text'
  const [viewMode, setViewMode] = useState('split'); // 'split', 'editor', 'preview'
  const [copied, setCopied] = useState(false);
  
  // Page Tab Navigation: 'ai' | 'builder' | 'dashboard'
  const [activeTab, setActiveTab] = useState(() => {
    const visited = localStorage.getItem('ats_resume_builder_visited');
    if (!visited) {
      localStorage.setItem('ats_resume_builder_visited', 'true');
      return 'ai'; // Default to AI Resume Creator page on first visit!
    }
    return 'builder';
  });

  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    localStorage.setItem('ats_resume_builder_data', JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('ats_resume_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('ats_resume_user');
    }
  }, [currentUser]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const analysis = analyzeResume(resumeData);

  const handleGeneratedResume = (newResume) => {
    setResumeData(newResume);
    setActiveTab('builder');
    setViewMode('split');
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to load the default sample resume? Any unsaved edits will be replaced.")) {
      setResumeData(defaultResumeData);
    }
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear all resume sections? You will be navigated to the AI Resume Creator page.")) {
      setResumeData({
        header: { fullName: '', title: '', email: '', phone: '', location: '', linkedin: '', github: '', portfolio: '' },
        summary: '',
        education: [],
        skills: { languages: [], frameworks: [], tools: [], softSkills: [] },
        experience: [],
        certifications: [],
        additional: { languages: '', interests: '' }
      });
      setActiveTab('ai');
    }
  };

  const handleExportTxt = () => {
    const content = generatePlainTextResume(resumeData);
    const filename = `${resumeData.header?.fullName ? resumeData.header.fullName.replace(/\s+/g, '_') : 'Resume'}_ATS.txt`;
    downloadTextFile(filename, content);
  };

  const handleExportMd = () => {
    const content = generateMarkdownResume(resumeData);
    const filename = `${resumeData.header?.fullName ? resumeData.header.fullName.replace(/\s+/g, '_') : 'Resume'}_ATS.md`;
    downloadTextFile(filename, content);
  };

  const handleCopy = () => {
    const content = generatePlainTextResume(resumeData);
    copyToClipboard(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} transition-colors duration-300`}>
      
      {/* Toast Notification when AI Resume is generated */}
      {showNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <Check size={22} className="bg-white/20 p-1 rounded-full" />
          <div>
            <div className="font-bold text-sm">Resume Generated Successfully!</div>
            <div className="text-xs text-emerald-100">AI optimized your ATS score to {analysis.score}%</div>
          </div>
        </div>
      )}

      {/* Top Header Navigation */}
      <header className="no-print border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white shadow-md shadow-indigo-500/20">
              <FileText size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-400 flex items-center gap-2">
                ATS Resume Builder & AI Creator
                <span className="text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-2 py-0.5 rounded-full">
                  v2.0 AI
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                Give your details & AI will generate a 100% ATS-optimized resume
              </p>
            </div>
          </div>

          {/* Main Navigation Pages Bar */}
          <div className="flex items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700/80 text-xs font-semibold">
            <button
              type="button"
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                activeTab === 'ai'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              onClick={() => setActiveTab('ai')}
            >
              <Sparkles size={15} className="text-amber-400" />
              1. AI Resume Creator
            </button>

            <button
              type="button"
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                activeTab === 'builder'
                  ? 'bg-indigo-600 text-white shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              onClick={() => setActiveTab('builder')}
            >
              <Layout size={15} />
              2. Builder & Live Preview
            </button>

            <button
              type="button"
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-indigo-600 text-white shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              onClick={() => setActiveTab('dashboard')}
            >
              <Gauge size={15} />
              3. ATS Score Dashboard
            </button>
          </div>

          {/* Quick Action Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="btn-secondary text-xs border-indigo-500/40 text-indigo-300"
              onClick={() => setIsAuthOpen(true)}
            >
              <User size={14} /> {currentUser?.isLoggedIn ? currentUser.name.split(' ')[0] : 'Sign In'}
            </button>
            <button type="button" className="btn-secondary text-xs" onClick={handleReset} title="Load Software Engineering Sample">
              <RotateCcw size={13} /> Sample Preset
            </button>
            <button type="button" className="btn-secondary text-xs" onClick={handleClear} title="Clear all fields">
              Clear Form
            </button>
            <button type="button" className="btn-icon" onClick={() => setDarkMode(!darkMode)} title="Toggle Dark/Light Mode">
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

        </div>
      </header>

      {/* Action Toolbar for Exports (Shown when on Builder or Dashboard tabs) */}
      {activeTab !== 'ai' && (
        <div className="no-print bg-slate-900/40 border-b border-slate-800/60 px-4 py-2.5">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            
            {/* View Mode Switcher */}
            <div className="flex items-center bg-slate-800/80 p-1 rounded-lg border border-slate-700/60 text-xs">
              <button
                type="button"
                className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-colors ${viewMode === 'split' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
                onClick={() => { setViewMode('split'); setActiveTab('builder'); }}
              >
                <Columns size={14} /> Split View
              </button>
              <button
                type="button"
                className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-colors ${viewMode === 'editor' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
                onClick={() => { setViewMode('editor'); setActiveTab('builder'); }}
              >
                <Edit3 size={14} /> Form Only
              </button>
              <button
                type="button"
                className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-colors ${viewMode === 'preview' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
                onClick={() => { setViewMode('preview'); setActiveTab('builder'); }}
              >
                <Eye size={14} /> Preview Only
              </button>
            </div>

            {/* Preview Format Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 hidden sm:inline">Preview Style:</span>
              <div className="flex items-center bg-slate-800/80 p-1 rounded-lg border border-slate-700/60 text-xs">
                <button
                  type="button"
                  className={`px-2.5 py-1 rounded-md transition-colors ${previewStyle === 'modern' ? 'bg-cyan-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
                  onClick={() => setPreviewStyle('modern')}
                >
                  Modern Layout
                </button>
                <button
                  type="button"
                  className={`px-2.5 py-1 rounded-md transition-colors ${previewStyle === 'text' ? 'bg-cyan-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
                  onClick={() => setPreviewStyle('text')}
                >
                  ATS Plain Text
                </button>
              </div>
            </div>

            {/* Export Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" className="btn-primary text-xs" onClick={handleExportTxt}>
                <Download size={14} /> Download .TXT
              </button>
              <button type="button" className="btn-secondary text-xs" onClick={handleExportMd}>
                <Download size={14} /> Download .MD
              </button>
              <button type="button" className="btn-secondary text-xs" onClick={handleCopy}>
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy Text'}
              </button>
              <button type="button" className="btn-accent text-xs" onClick={handlePrintPdf}>
                <Printer size={14} /> Save as PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto p-4 md:p-6">
        
        {/* PAGE 1: DEDICATED AI RESUME CREATOR WORKSPACE */}
        {activeTab === 'ai' && (
          <AiWorkspacePage
            onGenerateResume={handleGeneratedResume}
            onNavigateToBuilder={() => setActiveTab('builder')}
          />
        )}

        {/* PAGE 2: RESUME BUILDER & LIVE PREVIEW WORKSPACE */}
        {activeTab === 'builder' && (
          <div className={`grid gap-6 ${
            viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'
          }`}>
            {/* Left Form Column */}
            {(viewMode === 'split' || viewMode === 'editor') && (
              <div className={`space-y-6 ${viewMode === 'split' ? 'lg:col-span-6 xl:col-span-6' : 'max-w-4xl mx-auto w-full'}`}>
                
                {/* Banner callout to switch to AI Creator if user wants */}
                <div className="no-print bg-indigo-950/60 border border-indigo-500/30 rounded-xl p-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <Sparkles size={18} className="text-amber-400" />
                    <div>
                      <div className="text-xs font-bold text-indigo-200">Want AI to rebuild or rewrite your resume?</div>
                      <div className="text-[11px] text-slate-400">Go to the AI Resume Creator workspace anytime</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn-primary text-xs px-3 py-1.5"
                    onClick={() => setActiveTab('ai')}
                  >
                    Open AI Creator
                  </button>
                </div>

                <HeaderForm
                  header={resumeData.header}
                  onChange={(h) => setResumeData({ ...resumeData, header: h })}
                />

                <SummaryForm
                  summary={resumeData.summary}
                  onChange={(s) => setResumeData({ ...resumeData, summary: s })}
                />

                <SkillsForm
                  skills={resumeData.skills}
                  onChange={(s) => setResumeData({ ...resumeData, skills: s })}
                />

                <ExperienceForm
                  experience={resumeData.experience}
                  onChange={(exp) => setResumeData({ ...resumeData, experience: exp })}
                />

                <EducationForm
                  education={resumeData.education}
                  onChange={(edu) => setResumeData({ ...resumeData, education: edu })}
                />

                <CertificationsForm
                  certifications={resumeData.certifications}
                  additional={resumeData.additional}
                  onCertChange={(certs) => setResumeData({ ...resumeData, certifications: certs })}
                  onAddChange={(add) => setResumeData({ ...resumeData, additional: add })}
                />
              </div>
            )}

            {/* Right Live Preview Column */}
            {(viewMode === 'split' || viewMode === 'preview') && (
              <div className={`sticky top-20 h-fit ${viewMode === 'split' ? 'lg:col-span-6 xl:col-span-6' : 'max-w-4xl mx-auto w-full'}`}>
                <div className="no-print flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Eye size={14} /> Live Render Preview
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Updates in real-time as you type
                  </span>
                </div>
                <ResumePreview data={resumeData} previewMode={previewStyle} />
              </div>
            )}
          </div>
        )}

        {/* PAGE 3: ATS SCORE & COMPLIANCE DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <AtsScoreCard analysis={analysis} />
            <div className="form-card">
              <h3 className="text-base font-bold text-slate-100 mb-2">Resume Real-Time Preview</h3>
              <ResumePreview data={resumeData} previewMode={previewStyle} />
            </div>
          </div>
        )}

      </main>

      {/* Auth Modal for Sign In / Profile */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={(u) => setCurrentUser(u)}
        currentUser={currentUser}
      />
    </div>
  );
}

