import React, { useState } from 'react';
import { Sparkles, Brain, ArrowRight, Compass, Lightbulb, User, FileText, CheckCircle2, RefreshCw } from 'lucide-react';
import { AI_PRESETS, generateResumeFromIdeas, parseRawTextToResume } from '../utils/aiGenerator';

export default function AiWorkspacePage({ onGenerateResume, onNavigateToBuilder }) {
  const [mode, setMode] = useState('guided'); // 'guided', 'presets', 'draft'
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  // Guided Form Inputs
  const [fullName, setFullName] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [portfolio, setPortfolio] = useState('');

  const [userIdeas, setUserIdeas] = useState('');
  const [userSkillsInput, setUserSkillsInput] = useState('');
  const [userInterests, setUserInterests] = useState('');
  
  const [degree, setDegree] = useState('');
  const [institution, setInstitution] = useState('');
  const [gradDate, setGradDate] = useState('');
  const [gpa, setGpa] = useState('');

  // Raw Draft Input
  const [rawTextDraft, setRawTextDraft] = useState('');

  const handleSelectPreset = (preset) => {
    setFullName('ALEX MORGAN');
    setEmail('alex.morgan@email.com');
    setPhone('(555) 019-2834');
    setLocation('San Francisco, CA');
    setTargetRole(preset.role);
    setUserIdeas(preset.ideas);
    if (preset.skills) setUserSkillsInput(preset.skills.join(', '));
    if (preset.degree) setDegree(preset.degree);
    if (preset.institution) setInstitution(preset.institution);
    setGradDate('May 2025');
    setGpa('3.8/4.0');
    setMode('guided');
    setStep(2);
  };

  const handleGenerateGuided = (e) => {
    if (e) e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      const generated = generateResumeFromIdeas({
        fullName: fullName || 'ALEX MORGAN',
        title: targetRole || 'Software Engineer',
        email: email || 'alex.morgan@email.com',
        phone: phone || '(555) 019-2834',
        location: location || 'San Francisco, CA',
        linkedin: linkedin || 'linkedin.com/in/alexmorgan-dev',
        github: github || 'github.com/alexmorgan-dev',
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
      onNavigateToBuilder();
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
      onNavigateToBuilder();
    }, 800);
  };

  const handleFillSample = () => {
    setFullName('ALEX MORGAN');
    setTargetRole('Full-Stack Software Engineer');
    setEmail('alex.morgan@email.com');
    setPhone('(555) 019-2834');
    setLocation('San Francisco, CA');
    setLinkedin('linkedin.com/in/alexmorgan-dev');
    setGithub('github.com/alexmorgan-dev');
    setUserIdeas('Architected and deployed a full-stack React and Node.js web application with PostgreSQL. Integrated Stripe payment API, reduced query latency by 35% using database indexing, and managed microservices.');
    setUserSkillsInput('JavaScript, React, Node.js, Python, PostgreSQL, Docker, AWS, Git');
    setUserInterests('Open Source Contributing, Software Engineering, UI/UX');
    setDegree('Bachelor of Science in Computer Science');
    setInstitution('University of Technology');
    setGradDate('May 2025');
    setGpa('3.8/4.0');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      
      {/* Hero Welcome Header Card */}
      <div className="form-card bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-950 border-indigo-500/40 p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 text-white shadow-xl shadow-indigo-500/30">
              <Brain size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                AI Resume Creation Workspace
                <span className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-2.5 py-0.5 rounded-full font-semibold">
                  ✨ Gemini 3.6 AI Engine
                </span>
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Enter your information below, choose a career template, or paste raw notes. AI will build your 100% ATS-optimized resume!
              </p>
            </div>
          </div>

          <button
            type="button"
            className="btn-secondary text-xs border-indigo-500/40 text-indigo-300 hover:bg-indigo-900/30 flex items-center gap-1.5"
            onClick={handleFillSample}
          >
            <RefreshCw size={13} /> Auto-Fill Demo Details
          </button>
        </div>
      </div>

      {/* Mode Navigation Bar */}
      <div className="flex items-center gap-3 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 shadow-md">
        <button
          type="button"
          className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            mode === 'guided'
              ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
          onClick={() => setMode('guided')}
        >
          <User size={16} /> Guided AI Details Form
        </button>

        <button
          type="button"
          className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            mode === 'presets'
              ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
          onClick={() => setMode('presets')}
        >
          <Compass size={16} /> 1-Click Role Templates
        </button>

        <button
          type="button"
          className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            mode === 'draft'
              ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
          onClick={() => setMode('draft')}
        >
          <FileText size={16} /> Paste Raw Resume Draft
        </button>
      </div>

      {/* MODE 1: STEP-BY-STEP GUIDED FORM */}
      {mode === 'guided' && (
        <div className="form-card space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <button
              type="button"
              className={`flex-1 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                step === 1 ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
              onClick={() => setStep(1)}
            >
              Step 1: Contact Details
            </button>
            <span className="text-slate-700 px-2">→</span>
            <button
              type="button"
              className={`flex-1 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                step === 2 ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
              onClick={() => setStep(2)}
            >
              Step 2: Role & Project Notes
            </button>
            <span className="text-slate-700 px-2">→</span>
            <button
              type="button"
              className={`flex-1 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                step === 3 ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
              onClick={() => setStep(3)}
            >
              Step 3: Skills & Education
            </button>
          </div>

          <form onSubmit={handleGenerateGuided} className="space-y-5">
            {step === 1 && (
              <div className="space-y-4">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">
                    Step 1 of 3: Personal & Contact Details
                  </h3>
                  <p className="text-xs text-slate-400">Tell us your name, contact info, and target job goal.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Target Job Title / Career Goal *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Full-Stack Engineer, Data Analyst, Web Developer"
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="alex.morgan@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      placeholder="(555) 019-2834"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Location (City, State/Country)</label>
                    <input
                      type="text"
                      placeholder="San Francisco, CA"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>LinkedIn Profile URL</label>
                    <input
                      type="text"
                      placeholder="linkedin.com/in/alexmorgan-dev"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>GitHub Profile URL</label>
                    <input
                      type="text"
                      placeholder="github.com/alexmorgan-dev"
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Portfolio / Website</label>
                    <input
                      type="text"
                      placeholder="alexmorgan.dev"
                      value={portfolio}
                      onChange={(e) => setPortfolio(e.target.value)}
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    className="btn-primary text-xs font-semibold px-5 py-2.5"
                    onClick={() => setStep(2)}
                  >
                    Next: Role & Project Notes <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">
                    Step 2 of 3: Experience, Projects & Background Notes
                  </h3>
                  <p className="text-xs text-slate-400">Describe your project achievements, work experience, or raw background notes.</p>
                </div>

                <div className="form-group">
                  <label className="flex items-center gap-1.5 text-xs text-slate-200">
                    <Lightbulb size={15} className="text-amber-400" /> Share your work experience, projects, or background notes
                  </label>
                  <textarea
                    rows={6}
                    required
                    placeholder="Describe your background or projects in plain text... (e.g. 'I built a React web application for task management. Handled API endpoints in Node.js, integrated PostgreSQL database, reduced query response time by 35%, and managed JWT user authentication.')"
                    value={userIdeas}
                    onChange={(e) => setUserIdeas(e.target.value)}
                  />
                  <span className="text-[11px] text-slate-400 mt-1">
                    💡 AI automatically converts plain text into action-verb bullet points with metric highlights!
                  </span>
                </div>

                <div className="form-group">
                  <label>Extracurricular Activities & Interests</label>
                  <input
                    type="text"
                    placeholder="e.g. Open Source Contributing, Hackathons, Tech Blogging, UI Design"
                    value={userInterests}
                    onChange={(e) => setUserInterests(e.target.value)}
                  />
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    className="btn-secondary text-xs"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="btn-primary text-xs font-semibold px-5 py-2.5"
                    onClick={() => setStep(3)}
                  >
                    Next: Skills & Education <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">
                    Step 3 of 3: Technical Skills & Education
                  </h3>
                  <p className="text-xs text-slate-400">Specify your technical stack and degree background.</p>
                </div>

                <div className="form-group">
                  <label>Programming Languages, Frameworks & Databases (Comma-separated)</label>
                  <input
                    type="text"
                    placeholder="JavaScript, Python, React, Node.js, Express, PostgreSQL, Docker, AWS, Git"
                    value={userSkillsInput}
                    onChange={(e) => setUserSkillsInput(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    <label>GPA / Academic Honors</label>
                    <input
                      type="text"
                      placeholder="3.8/4.0"
                      value={gpa}
                      onChange={(e) => setGpa(e.target.value)}
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center border-t border-slate-800 mt-6">
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
                    className="btn-primary text-sm font-bold px-8 py-3 flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 shadow-xl shadow-indigo-600/30 hover:scale-105 transition-all"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Generating ATS Resume with AI...
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} /> Generate Resume with AI <ArrowRight size={16} />
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
        <div className="form-card space-y-4">
          <div className="border-b border-slate-800 pb-2">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
              <Compass size={16} className="text-cyan-400" /> Select a Career Role Template
            </h3>
            <p className="text-xs text-slate-400">Click any preset below to load specialized skills, background notes, and degree details!</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {AI_PRESETS.map((preset, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/80 hover:bg-indigo-950/40 transition-all cursor-pointer flex flex-col justify-between group shadow-md"
                onClick={() => handleSelectPreset(preset)}
              >
                <div>
                  <div className="font-bold text-indigo-300 text-base mb-1 group-hover:text-indigo-200">{preset.title}</div>
                  <div className="text-xs text-slate-400 mb-2 font-medium">{preset.role}</div>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{preset.ideas}</p>
                </div>
                
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] text-cyan-400 font-mono bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
                    {preset.skills.length} Skills Included
                  </span>
                  <span className="text-xs text-indigo-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Use This Template <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODE 3: PASTE RAW TEXT DRAFT */}
      {mode === 'draft' && (
        <div className="form-card space-y-4">
          <div className="border-b border-slate-800 pb-2">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
              <FileText size={16} className="text-cyan-400" /> Paste Raw Plain Text / Existing Resume
            </h3>
            <p className="text-xs text-slate-400">Paste your old resume text or bio notes. AI will extract sections automatically!</p>
          </div>

          <div className="form-group">
            <textarea
              rows={10}
              placeholder="Paste plain text here... (Name, Contact, Work History bullets, Education, Technical Skills list). AI will parse and format into your ATS builder!"
              value={rawTextDraft}
              onChange={(e) => setRawTextDraft(e.target.value)}
              className="font-mono text-xs bg-slate-950/90 border-slate-800"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <button
              type="button"
              className="text-xs text-indigo-400 hover:underline flex items-center gap-1 font-semibold"
              onClick={() => {
                setRawTextDraft(`ALEX MORGAN
Email: alex.morgan@email.com | Phone: (555) 019-2834 | Location: San Francisco, CA
LinkedIn: linkedin.com/in/alexmorgan-dev | GitHub: github.com/alexmorgan-dev

SUMMARY
Motivated Computer Science graduate proficient in React, Node.js, Python, C++, and PostgreSQL. Eager to leverage full-stack web development skills to contribute as a Software Engineer.

EDUCATION
Bachelor of Science in Computer Science
University of Technology | Graduation: May 2025 | GPA: 3.8/4.0

TECHNICAL SKILLS
• Languages: JavaScript (ES6+), Python, C++, SQL, HTML5, CSS3
• Frameworks: React, Node.js, Express.js, Tailwind CSS, REST APIs
• Tools: PostgreSQL, MongoDB, Git, GitHub, Docker, Postman

PROJECT EXPERIENCE
Full-Stack E-Commerce Web Application
Lead Developer | Jan 2025 – Present
• Architected and deployed a responsive e-commerce web platform using React, Node.js, Express, and PostgreSQL supporting 500+ active user accounts.
• Optimized database queries and API endpoint performance, reducing page load latency by 35%.`);
              }}
            >
              💡 Load Sample Plain Text Resume
            </button>

            <button
              type="button"
              disabled={!rawTextDraft.trim() || isGenerating}
              className="btn-primary text-xs font-bold px-6 py-2.5 flex items-center gap-2"
              onClick={handleParseDraft}
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Parsing Draft...
                </>
              ) : (
                <>
                  <Sparkles size={15} /> Parse Draft & Build Resume <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
