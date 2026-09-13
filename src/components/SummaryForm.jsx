import React from 'react';
import { FileText, Sparkles } from 'lucide-react';

export default function SummaryForm({ summary, onChange }) {
  const wordCount = summary ? summary.trim().split(/\s+/).filter(Boolean).length : 0;

  const handleEnhance = () => {
    const template = "Motivated and detail-oriented Computer Science graduate with strong expertise in full-stack web development and software engineering. Proficient in JavaScript, React, Node.js, Python, C++, and SQL, with a proven track record of building high-performance web applications and scalable APIs. Eager to leverage technical skills and project experience to contribute to innovative software development teams in an entry-level software engineer role.";
    onChange(template);
  };

  return (
    <div className="form-card">
      <div className="card-header justify-between">
        <div className="flex items-center gap-2">
          <FileText className="card-icon text-emerald-400" size={20} />
          <h3>Professional Summary</h3>
        </div>
        <button type="button" className="btn-secondary text-xs" onClick={handleEnhance}>
          <Sparkles size={13} /> Load ATS Template
        </button>
      </div>

      <div className="form-group">
        <textarea
          rows={4}
          placeholder="2-3 lines highlighting core strengths, technical skills, and career goals (e.g. 'Motivated Computer Science graduate proficient in JavaScript, Python, React...')"
          value={summary || ''}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="form-help flex justify-between mt-1 text-xs text-slate-400">
          <span>Target: 25 - 75 words (No personal pronouns like 'I' or 'me')</span>
          <span className={wordCount >= 25 && wordCount <= 80 ? 'text-emerald-400 font-semibold' : 'text-slate-400'}>
            {wordCount} words
          </span>
        </div>
      </div>
    </div>
  );
}
