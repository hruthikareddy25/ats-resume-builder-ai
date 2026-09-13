import React, { useState } from 'react';
import { Sparkles, Brain, ArrowRight, X, Compass, Lightbulb } from 'lucide-react';
import { AI_PRESETS, generateResumeFromIdeas } from '../utils/aiGenerator';

export default function AiIdeaPrompter({ isOpen, onClose, onGenerateResume, currentUser }) {
  const [targetRole, setTargetRole] = useState('Full-Stack Software Engineer');
  const [userIdeas, setUserIdeas] = useState('');
  const [userInterests, setUserInterests] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleSelectPreset = (preset) => {
    setTargetRole(preset.role);
    setUserIdeas(preset.ideas);
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      const generated = generateResumeFromIdeas({
        targetRole,
        userIdeas,
        userInterests,
        userName: currentUser?.name || 'ALEX MORGAN',
        userEmail: currentUser?.email || 'alex.morgan@email.com'
      });

      onGenerateResume(generated);
      setIsGenerating(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="form-card max-w-2xl w-full relative border border-indigo-500/40 shadow-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/20">
            <Brain size={26} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              AI Resume Assistant & Idea Generator
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-2 py-0.5 rounded-full font-semibold">
                AI Powered
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Tell AI your career goals, project ideas, skills, and interests — AI will generate a complete ATS resume!
            </p>
          </div>
        </div>

        {/* Preset Selector */}
        <div className="mb-4">
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
            <Compass size={14} className="text-cyan-400" /> Or pick a quick career template:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {AI_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                className="text-left p-2 rounded-lg bg-slate-800/80 border border-slate-700/70 hover:border-indigo-500/60 hover:bg-indigo-950/30 transition-all text-xs"
                onClick={() => handleSelectPreset(preset)}
              >
                <div className="font-semibold text-indigo-300 text-[11px] truncate">{preset.title}</div>
                <div className="text-[10px] text-slate-400 truncate">{preset.role}</div>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="form-group">
            <label><Brain size={13} /> Target Job Title / Career Goal</label>
            <input
              type="text"
              required
              placeholder="e.g. Full-Stack Developer, Data Science Intern, Mobile Engineer"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label><Lightbulb size={13} className="text-amber-400" /> Share your background, ideas, and project experiences</label>
            <textarea
              rows={4}
              required
              placeholder="Describe your ideas or background in plain text... (e.g. 'I built a python web scraper project and a React dashboard. I studied CS and am interested in backend APIs and cloud deployment.')"
              value={userIdeas}
              onChange={(e) => setUserIdeas(e.target.value)}
            />
            <span className="text-[11px] text-slate-400 mt-1">
              💡 AI will automatically format your ideas into action-verb bullet points with quantified metric suggestions!
            </span>
          </div>

          <div className="form-group">
            <label>Interests & Extracurriculars (Optional)</label>
            <input
              type="text"
              placeholder="e.g. Open Source Contributing, Hackathons, Tech Blogging, UI Design"
              value={userInterests}
              onChange={(e) => setUserInterests(e.target.value)}
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button type="button" className="btn-secondary text-xs" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              disabled={isGenerating}
              className="btn-primary text-xs font-semibold px-5 py-2 flex items-center gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating ATS Resume...
                </>
              ) : (
                <>
                  <Sparkles size={16} /> Generate Resume with AI <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
