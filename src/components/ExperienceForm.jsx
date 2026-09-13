import React from 'react';
import { Briefcase, Plus, Trash2, Zap } from 'lucide-react';
import { sampleActionVerbs } from '../utils/defaultData';

export default function ExperienceForm({ experience, onChange }) {
  const handleAdd = () => {
    const newItem = {
      id: `exp-${Date.now()}`,
      role: '',
      organization: '',
      dates: '',
      bullets: ['']
    };
    onChange([...experience, newItem]);
  };

  const handleRemove = (id) => {
    onChange(experience.filter(item => item.id !== id));
  };

  const handleUpdate = (id, field, value) => {
    onChange(experience.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleBulletChange = (expId, bulletIndex, val) => {
    onChange(experience.map(item => {
      if (item.id === expId) {
        const newBullets = [...item.bullets];
        newBullets[bulletIndex] = val;
        return { ...item, bullets: newBullets };
      }
      return item;
    }));
  };

  const handleAddBullet = (expId) => {
    onChange(experience.map(item => {
      if (item.id === expId) {
        return { ...item, bullets: [...item.bullets, ''] };
      }
      return item;
    }));
  };

  const handleRemoveBullet = (expId, bulletIndex) => {
    onChange(experience.map(item => {
      if (item.id === expId) {
        return { ...item, bullets: item.bullets.filter((_, idx) => idx !== bulletIndex) };
      }
      return item;
    }));
  };

  const handleInsertVerb = (expId, bulletIndex, verb) => {
    onChange(experience.map(item => {
      if (item.id === expId) {
        const newBullets = [...item.bullets];
        const current = newBullets[bulletIndex] || '';
        newBullets[bulletIndex] = current ? `${verb} ${current}` : `${verb} `;
        return { ...item, bullets: newBullets };
      }
      return item;
    }));
  };

  return (
    <div className="form-card">
      <div className="card-header justify-between">
        <div className="flex items-center gap-2">
          <Briefcase className="card-icon text-amber-400" size={20} />
          <h3>Project & Work Experience</h3>
        </div>
        <button type="button" className="btn-primary text-xs" onClick={handleAdd}>
          <Plus size={14} /> Add Project / Job
        </button>
      </div>

      <div className="space-y-6">
        {experience.map((exp, idx) => (
          <div key={exp.id || idx} className="item-card">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-slate-300">Project / Role #{idx + 1}</span>
              <button
                type="button"
                className="btn-danger-icon"
                onClick={() => handleRemove(exp.id)}
                title="Remove Entry"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="form-grid mb-3">
              <div className="form-group">
                <label>Role / Title</label>
                <input
                  type="text"
                  placeholder="e.g. Lead Developer / Software Intern"
                  value={exp.role || ''}
                  onChange={(e) => handleUpdate(exp.id, 'role', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Organization / Project Name</label>
                <input
                  type="text"
                  placeholder="e.g. Full-Stack E-Commerce Platform"
                  value={exp.organization || ''}
                  onChange={(e) => handleUpdate(exp.id, 'organization', e.target.value)}
                />
              </div>

              <div className="form-group full-width">
                <label>Dates (Start – End)</label>
                <input
                  type="text"
                  placeholder="e.g. Jan 2025 – Mar 2025"
                  value={exp.dates || ''}
                  onChange={(e) => handleUpdate(exp.id, 'dates', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs text-slate-300">Key Achievements (Bullet Points)</label>
                <span className="text-[11px] text-amber-400 flex items-center gap-1">
                  <Zap size={11} /> Start bullets with action verbs & quantify results (%)
                </span>
              </div>

              {(exp.bullets || []).map((b, bIdx) => (
                <div key={bIdx} className="mb-3">
                  <div className="flex gap-2 mb-1">
                    <input
                      type="text"
                      placeholder={`• e.g. Architected responsive REST API reducing latency by 35%...`}
                      value={b}
                      onChange={(e) => handleBulletChange(exp.id, bIdx, e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn-danger-icon"
                      onClick={() => handleRemoveBullet(exp.id, bIdx)}
                      disabled={exp.bullets.length <= 1}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  {/* Quick Action Verb Chips */}
                  <div className="verb-suggestions">
                    <span className="text-[10px] text-slate-400">Action Verbs:</span>
                    {sampleActionVerbs.slice(0, 6).map((verb) => (
                      <button
                        key={verb}
                        type="button"
                        className="verb-chip"
                        onClick={() => handleInsertVerb(exp.id, bIdx, verb)}
                      >
                        + {verb}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="btn-secondary text-xs mt-1"
                onClick={() => handleAddBullet(exp.id)}
              >
                <Plus size={13} /> Add Bullet Point
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
