import React, { useState } from 'react';
import { Sparkles, Brain, ArrowRight, X, Compass, Lightbulb, User, FileText, CheckCircle2 } from 'lucide-react';
import { AI_PRESETS, generateResumeFromIdeas, parseRawTextToResume } from '../utils/aiGenerator';

export default function AiResumeWizard({ isOpen, onClose, onGenerateResume }) {
  const [mode, setMode] = useState('guided'); // 'guided', 'presets', 'draft'
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  // Guided Form Inputs
  const [fullName, setFullName] = useState('ALEX MORGAN');
  const [targetRole, setTargetRole] = useState('Full-Stack Software Engineer');
  const [email, setEmail] = useState('alex.morgan@email.com');
  const [phone, setPhone] = useState('(555) 019-2834');
  const [location, setLocation] = useState('San Francisco, CA');
  const [linkedin, setLinkedin] = useState('linkedin.com/in/alexmorgan-dev');
  const [github, setGithub] = useState('github.com/alexmorgan-dev');
  const [portfolio, setPortfolio] = useState('alexmorgan.dev');

  const [userIdeas, setUserIdeas] = useState(
    'Architected and deployed a full-stack React and Node.js e-commerce app with PostgreSQL. Integrated Stripe payments, reduced latency by 35% with Redis caching, and built REST APIs.'
  );
  const [userSkillsInput, setUserSkillsInput] = useState('JavaScript, React, Node.js, Python, PostgreSQL, Docker, AWS, Git');
  const [userInterests, setUserInterests] = useState('Open Source Contributing, Cloud Architecture, UI/UX Design');
  
  const [degree, setDegree] = useState('Bachelor of Science in Computer Science');
  const [institution, setInstitution] = useState('University of Technology');
  const [gradDate, setGradDate] = useState('May 2025');
  const [gpa, setGpa] = useState('3.8/4.0');

  // Raw Draft Input
  const [rawTextDraft, setRawTextDraft] = useState('');

  if (!isOpen) return null;

  const handleSelectPreset = (preset) => {
    setTargetRole(preset.role);
    setUserIdeas(preset.ideas);
    if (preset.skills) setUserSkillsInput(preset.skills.join(', '));
    if (preset.degree) setDegree(preset.degree);
    if (preset.institution) setInstitution(preset.institution);
    setMode('guided');
    setStep(2);
  };

  const handleGenerateGuided = (e) => {
    if (e) e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      const generated = generateResumeFromIdeas({
        fullName,
        title: targetRole,
        email,
        phone,
        location,
        linkedin,
        github,
        portfolio,
        targetRole,
        userIdeas,
        userInterests,
        userSkillsInput,
        degree,
        institution,
        gradDate,
        gpa
      });

      onGenerateResume(generated);
      setIsGenerating(false);
      onClose();
    }, 700);
  };

  const handleParseDraft = () => {
    if (!rawTextDraft || rawTextDraft.trim().length === 0) return;
    setIsGenerating(true);

    setTimeout(() => {
      const parsed = parseRawTextToResume(rawTextDraft);
      if (parsed) {
        onGenerateResume(parsed);
      }
      setIsGenerating(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in no-print">
      <div className="form-card max-w-3xl w-full relative border border-indigo-500/40 shadow-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 overflow-hidden">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 z-10"
          title="Close Modal"
        >
          <X size={20} />
        </button>

        {/* Modal Top Header */}
        <div className="flex items-center gap-3 mb-4 pr-8">
          <div className="p-3 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/30">
            <Brain size={28} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              AI Resume Creator & Details Assistant
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-2.5 py-0.5 rounded-full font-semibold">
                ✨ Gemini Powered
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Provide your details, career background, or paste notes — AI will build a complete ATS-ready resume in seconds.
            </p>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-4">
          <button
            type="button"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              mode === 'guided'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
            onClick={() => setMode('guided')}
          >
            <User size={14} /> Step-by-Step Details Form
          </button>

          <button
            type="button"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              mode === 'presets'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
            onClick={() => setMode('presets')}
          >
            <Compass size={14} /> Quick Role Presets
          </button>

          <button
            type="button"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              mode === 'draft'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
            onClick={() => setMode('draft')}
          >
            <FileText size={14} /> Paste Draft / Plain Text
          </button>
        </div>

        {/* MODE 1: GUIDED DETAILS FORM */}
        {mode === 'guided' && (
          <div>
            {/* Step Navigation Progress */}
            <div className="flex items-center justify-between text-xs mb-4 bg-slate-800/40 p-2 rounded-lg border border-slate-800">
              <button
                type="button"
                className={`px-3 py-1 rounded ${step === 1 ? 'bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/40' : 'text-slate-400'}`}
                onClick={() => setStep(1)}
              >
                1. Personal Details
              </button>
              <span className="text-slate-600">→</span>
              <button
                type="button"
                className={`px-3 py-1 rounded ${step === 2 ? 'bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/40' : 'text-slate-400'}`}
                onClick={() => setStep(2)}
              >
                2. Job & Projects Notes
              </button>
              <span className="text-slate-600">→</span>
              <button
                type="button"
                className={`px-3 py-1 rounded ${step === 3 ? 'bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/40' : 'text-slate-400'}`}
                onClick={() => setStep(3)}
              >
                3. Skills & Education
              </button>
            </div>

            <form onSubmit={handleGenerateGuided} className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {step === 1 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Step 1: Personal & Contact Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Alex Morgan"
                      />
                    </div>
                    <div className="form-group">
                      <label>Target Job Title / Career Goal *</label>
                      <input
                        type="text"
                        required
                        value={targetRole}
                        onChange={(e) => setTargetRole(e.target.value)}
                        placeholder="e.g. Full-Stack Developer, Data Analyst"
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Location (City, State/Country)</label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>LinkedIn Profile URL</label>
                      <input
                        type="text"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>GitHub Profile URL</label>
                      <input
                        type="text"
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Portfolio / Website</label>
                      <input
                        type="text"
                        value={portfolio}
                        onChange={(e) => setPortfolio(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      className="btn-primary text-xs font-semibold px-4 py-2"
                      onClick={() => setStep(2)}
                    >
                      Next: Role & Project Notes <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Step 2: Experience, Projects & Raw Background</h3>
                  
                  <div className="form-group">
                    <label className="flex items-center gap-1.5">
                      <Lightbulb size={14} className="text-amber-400" /> Describe your work experience, projects, or background notes
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Explain your work experience or projects in plain text... (e.g. 'I built a React web application for task management. Handled API endpoints in Node.js, integrated PostgreSQL database, reduced query speed by 35%, and led a team of 3 developers.')"
                      value={userIdeas}
                      onChange={(e) => setUserIdeas(e.target.value)}
                    />
                    <span className="text-[11px] text-slate-400 mt-1">
                      💡 Tip: Include any metrics (percentages, numbers of users, records processed) — AI will format them into high-scoring ATS action bullets!
                    </span>
                  </div>

                  <div className="form-group">
                    <label>Key Achievements & Extracurricular Interests</label>
                    <input
                      type="text"
                      placeholder="e.g. Hackathon Winner, Open Source Contributor, Technical Blogging"
                      value={userInterests}
                      onChange={(e) => setUserInterests(e.target.value)}
                    />
                  </div>

                  <div className="pt-2 flex justify-between">
                    <button
                      type="button"
                      className="btn-secondary text-xs"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      className="btn-primary text-xs font-semibold px-4 py-2"
                      onClick={() => setStep(3)}
                    >
                      Next: Skills & Education <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Step 3: Technical Skills & Education</h3>

                  <div className="form-group">
                    <label>Programming Languages, Frameworks & Tools (Comma-separated)</label>
                    <input
                      type="text"
                      placeholder="JavaScript, Python, React, Node.js, PostgreSQL, Docker, AWS"
                      value={userSkillsInput}
                      onChange={(e) => setUserSkillsInput(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="form-group">
                      <label>Degree Name</label>
                      <input
                        type="text"
                        placeholder="Bachelor of Science in Computer Science"
                        value={degree}
                        onChange={(e) => setDegree(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>University / School</label>
                      <input
                        type="text"
                        placeholder="University of Technology"
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Graduation Date</label>
                      <input
                        type="text"
                        placeholder="May 2025"
                        value={gradDate}
                        onChange={(e) => setGradDate(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>GPA / Honors</label>
                      <input
                        type="text"
                        placeholder="3.8/4.0"
                        value={gpa}
                        onChange={(e) => setGpa(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="pt-3 flex justify-between items-center border-t border-slate-800 mt-4">
                    <button
                      type="button"
                      className="btn-secondary text-xs"
                      onClick={() => setStep(2)}
                    >
                      Back
                    </button>

                    <button
                      type="submit"
                      disabled={isGenerating}
                      className="btn-primary text-xs font-semibold px-6 py-2.5 flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-cyan-500 shadow-lg shadow-indigo-500/30"
                    >
                      {isGenerating ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Synthesizing Resume with AI...
                        </>
                      ) : (
                        <>
                          <Sparkles size={16} /> Generate Resume Now <ArrowRight size={14} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}

        {/* MODE 2: QUICK ROLE PRESETS */}
        {mode === 'presets' && (
          <div className="space-y-4">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Compass size={14} className="text-cyan-400" /> Select a pre-engineered career template:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto pr-1">
              {AI_PRESETS.map((preset, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/70 hover:border-indigo-500/60 hover:bg-indigo-950/30 transition-all cursor-pointer flex flex-col justify-between"
                  onClick={() => handleSelectPreset(preset)}
                >
                  <div>
                    <div className="font-bold text-indigo-300 text-sm mb-1">{preset.title}</div>
                    <div className="text-xs text-slate-400 mb-2 font-medium">{preset.role}</div>
                    <p className="text-[11px] text-slate-400 line-clamp-2">{preset.ideas}</p>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[10px] text-cyan-400 font-mono bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800/40">
                      {preset.skills.length} Skills Included
                    </span>
                    <span className="text-xs text-indigo-400 font-semibold flex items-center gap-1">
                      Use Preset <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODE 3: PASTE RAW TEXT DRAFT */}
        {mode === 'draft' && (
          <div className="space-y-4">
            <div className="form-group">
              <label className="flex items-center gap-1.5 text-xs text-slate-300">
                <FileText size={14} className="text-cyan-400" /> Paste your raw plain text, old resume, or project notes:
              </label>
              <textarea
                rows={8}
                placeholder="Paste plain text here... (e.g. Name, Summary, Work history bullets, Education, Skills lists). AI will automatically parse headers and extract sections into your builder!"
                value={rawTextDraft}
                onChange={(e) => setRawTextDraft(e.target.value)}
                className="font-mono text-xs"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                className="text-xs text-indigo-400 hover:underline flex items-center gap-1"
                onClick={() => {
                  setRawTextDraft(`ALEX MORGAN
Email: alex.morgan@email.com | Phone: (555) 019-2834 | Location: San Francisco, CA

SUMMARY
Motivated Computer Science graduate proficient in React, Node.js, Python, and PostgreSQL. Eager to contribute as a Software Engineer.

EDUCATION
Bachelor of Science in Computer Science
University of Technology | Graduation: May 2025 | GPA: 3.8/4.0

TECHNICAL SKILLS
• Languages: JavaScript, Python, C++, SQL
• Frameworks: React, Node.js, Express.js
• Tools: PostgreSQL, MongoDB, Git, Docker

PROJECT EXPERIENCE
Full-Stack Web Application
Lead Developer | Jan 2025 – Present
• Built a responsive e-commerce web platform using React and Node.js.
• Optimized database query speeds by 35% with PostgreSQL indexing.`);
                }}
              >
                💡 Insert Sample Plain Text Draft
              </button>

              <button
                type="button"
                disabled={!rawTextDraft.trim() || isGenerating}
                className="btn-primary text-xs font-semibold px-5 py-2 flex items-center gap-2"
                onClick={handleParseDraft}
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Parsing Draft...
                  </>
                ) : (
                  <>
                    <Sparkles size={14} /> Parse & Build Resume <ArrowRight size={14} />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
