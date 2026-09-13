import React from 'react';
import { generatePlainTextResume } from '../utils/exportHelpers';

export default function ResumePreview({ data, previewMode }) {
  if (previewMode === 'text') {
    const plainText = generatePlainTextResume(data);
    return (
      <div className="preview-container text-mode">
        <div className="preview-badge">ATS Scanner Plain Text Output</div>
        <pre className="font-mono text-xs whitespace-pre-wrap leading-relaxed text-slate-800 dark:text-slate-200 select-all">
          {plainText}
        </pre>
      </div>
    );
  }

  const h = data.header || {};
  const s = data.skills || {};

  return (
    <div className="preview-container modern-mode" id="resume-document">
      {/* Header */}
      <div className="border-b border-slate-300 dark:border-slate-700 pb-4 mb-4 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-wide">
          {h.fullName || 'YOUR NAME'}
        </h1>
        {h.title && (
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
            {h.title}
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-slate-600 dark:text-slate-300 mt-2">
          {h.location && <span>{h.location}</span>}
          {h.phone && <span>• Phone: {h.phone}</span>}
          {h.email && <span>• Email: {h.email}</span>}
        </div>

        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-indigo-600 dark:text-indigo-400 font-mono mt-1">
          {h.linkedin && <span>LinkedIn: {h.linkedin}</span>}
          {h.github && <span>• GitHub: {h.github}</span>}
          {h.portfolio && <span>• Portfolio: {h.portfolio}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.summary?.trim() && (
        <div className="mb-4">
          <h2 className="section-title">Professional Summary</h2>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            {data.summary.trim()}
          </p>
        </div>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <div className="mb-4">
          <h2 className="section-title">Education</h2>
          <div className="space-y-2">
            {data.education.map((edu, idx) => {
              if (!edu.degree && !edu.institution) return null;
              return (
                <div key={idx} className="text-xs">
                  <div className="flex justify-between font-bold text-slate-900 dark:text-slate-100">
                    <span>{edu.degree}</span>
                    <span>{edu.graduationDate}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400 italic">
                    <span>{[edu.institution, edu.location].filter(Boolean).join(', ')}</span>
                    {edu.gpa && <span>GPA: {edu.gpa}</span>}
                  </div>
                  {edu.highlights && (
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                      Highlights: {edu.highlights}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Technical & Soft Skills */}
      {(s.languages?.length || s.frameworks?.length || s.tools?.length || s.softSkills?.length) ? (
        <div className="mb-4">
          <h2 className="section-title">Technical & Soft Skills</h2>
          <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
            {s.languages?.length > 0 && (
              <div><strong className="text-slate-900 dark:text-slate-100">Programming Languages:</strong> {s.languages.join(', ')}</div>
            )}
            {s.frameworks?.length > 0 && (
              <div><strong className="text-slate-900 dark:text-slate-100">Frameworks & Libraries:</strong> {s.frameworks.join(', ')}</div>
            )}
            {s.tools?.length > 0 && (
              <div><strong className="text-slate-900 dark:text-slate-100">Databases & Tools:</strong> {s.tools.join(', ')}</div>
            )}
            {s.coreCompetencies?.length > 0 && (
              <div><strong className="text-slate-900 dark:text-slate-100">Core Competencies:</strong> {s.coreCompetencies.join(', ')}</div>
            )}
            {s.softSkills?.length > 0 && (
              <div><strong className="text-slate-900 dark:text-slate-100">Soft Skills:</strong> {s.softSkills.join(', ')}</div>
            )}
          </div>
        </div>
      ) : null}

      {/* Experience / Projects */}
      {data.experience?.length > 0 && (
        <div className="mb-4">
          <h2 className="section-title">Project & Work Experience</h2>
          <div className="space-y-3">
            {data.experience.map((exp, idx) => {
              if (!exp.role && !exp.organization) return null;
              return (
                <div key={idx} className="text-xs">
                  <div className="flex justify-between font-bold text-slate-900 dark:text-slate-100">
                    <span>{exp.role} <span className="font-normal text-slate-600 dark:text-slate-400">| {exp.organization}</span></span>
                    <span className="text-slate-500 dark:text-slate-400 font-normal">{exp.dates}</span>
                  </div>
                  <ul className="list-disc list-inside mt-1 space-y-1 text-slate-700 dark:text-slate-300 leading-normal">
                    {(exp.bullets || []).map((bullet, bIdx) => (
                      bullet.trim() ? <li key={bIdx}>{bullet.trim()}</li> : null
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Certifications */}
      {data.certifications?.length > 0 && (
        <div className="mb-4">
          <h2 className="section-title">Certifications</h2>
          <ul className="list-disc list-inside text-xs text-slate-700 dark:text-slate-300 space-y-0.5">
            {data.certifications.map((cert, idx) => {
              if (!cert.name) return null;
              return (
                <li key={idx}>
                  <strong>{cert.name}</strong> – {cert.issuer} {cert.date ? `(${cert.date})` : ''}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Additional */}
      {(data.additional?.languages || data.additional?.interests) && (
        <div>
          <h2 className="section-title">Additional Information</h2>
          <div className="text-xs space-y-0.5 text-slate-700 dark:text-slate-300">
            {data.additional.languages && <div><strong>Languages:</strong> {data.additional.languages}</div>}
            {data.additional.interests && <div><strong>Interests:</strong> {data.additional.interests}</div>}
          </div>
        </div>
      )}
    </div>
  );
}
