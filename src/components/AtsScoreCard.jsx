import React, { useState } from 'react';
import { Gauge, CheckCircle2, AlertTriangle, AlertCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export default function AtsScoreCard({ analysis }) {
  const [expanded, setExpanded] = useState(true);
  const { score, checks, suggestions, stats } = analysis;

  const getScoreColor = (val) => {
    if (val >= 85) return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
    if (val >= 65) return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/40 bg-rose-500/10';
  };

  const getMeterGradient = (val) => {
    if (val >= 85) return '#10b981';
    if (val >= 65) return '#f59e0b';
    return '#f43f5e';
  };

  return (
    <div className="ats-card mb-6">
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-3">
          <div className={`ats-badge ${getScoreColor(score)}`}>
            <Gauge size={22} />
            <span className="font-bold text-xl">{score}%</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-100">ATS Readiness Index</h3>
              {score >= 85 && (
                <span className="bg-emerald-500/20 text-emerald-300 text-[11px] px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                  <Sparkles size={11} /> Scanner Ready
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">
              {score >= 85
                ? 'Excellent ATS compliance! High probability of passing recruiter screeners.'
                : score >= 65
                ? 'Good foundation. Follow the suggestions below to reach 85%+ score.'
                : 'Needs improvement. Add quantified bullets, action verbs, and contact info.'}
            </p>
          </div>
        </div>

        <button className="text-slate-400 hover:text-slate-200">
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-slate-700/60 space-y-4">
          {/* Progress Bar */}
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${score}%`,
                backgroundColor: getMeterGradient(score)
              }}
            />
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
            <div className="metric-box">
              <span className="metric-val text-indigo-400">{stats.actionVerbCount}/{stats.totalBullets}</span>
              <span className="metric-lbl">Action Verbs</span>
            </div>
            <div className="metric-box">
              <span className="metric-val text-amber-400">{stats.quantifiedCount}</span>
              <span className="metric-lbl">Quantified Metrics</span>
            </div>
            <div className="metric-box">
              <span className="metric-val text-cyan-400">{stats.totalSkills}</span>
              <span className="metric-lbl">Skills Tagged</span>
            </div>
            <div className="metric-box">
              <span className="metric-val text-emerald-400">{stats.pronounCount === 0 ? '0' : stats.pronounCount}</span>
              <span className="metric-lbl">Pronouns (Ideal: 0)</span>
            </div>
          </div>

          {/* Checklist Breakdown */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Evaluation Breakdown</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {checks.map((chk, i) => (
                <div key={i} className="check-item flex items-center justify-between text-xs p-2 rounded bg-slate-800/60 border border-slate-700/40">
                  <div className="flex items-center gap-2">
                    {chk.status === 'pass' && <CheckCircle2 size={15} className="text-emerald-400" />}
                    {chk.status === 'warning' && <AlertTriangle size={15} className="text-amber-400" />}
                    {chk.status === 'fail' && <AlertCircle size={15} className="text-rose-400" />}
                    <span className="text-slate-300">{chk.title}</span>
                  </div>
                  <span className="font-mono text-slate-400">{chk.score}/{chk.maxScore}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Suggestions */}
          {suggestions.length > 0 && (
            <div className="suggestions-box">
              <h4 className="text-xs font-semibold text-amber-300 flex items-center gap-1 mb-1.5">
                <AlertTriangle size={13} /> Actionable Improvement Checklist ({suggestions.length})
              </h4>
              <ul className="text-xs space-y-1 text-slate-300 list-disc list-inside">
                {suggestions.map((sug, i) => (
                  <li key={i}>{sug}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
