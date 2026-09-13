import React from 'react';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

export default function EducationForm({ education, onChange }) {
  const handleAdd = () => {
    const newItem = {
      id: `edu-${Date.now()}`,
      degree: '',
      institution: '',
      location: '',
      graduationDate: '',
      gpa: '',
      highlights: ''
    };
    onChange([...education, newItem]);
  };

  const handleRemove = (id) => {
    onChange(education.filter(item => item.id !== id));
  };

  const handleUpdate = (id, field, value) => {
    onChange(education.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  return (
    <div className="form-card">
      <div className="card-header justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="card-icon text-purple-400" size={20} />
          <h3>Education</h3>
        </div>
        <button type="button" className="btn-primary text-xs" onClick={handleAdd}>
          <Plus size={14} /> Add Education
        </button>
      </div>

      <div className="space-y-4">
        {education.map((edu, idx) => (
          <div key={edu.id || idx} className="item-card">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-slate-300">Degree #{idx + 1}</span>
              <button
                type="button"
                className="btn-danger-icon"
                onClick={() => handleRemove(edu.id)}
                title="Remove Entry"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Degree Title</label>
                <input
                  type="text"
                  placeholder="e.g. B.S. in Computer Science"
                  value={edu.degree || ''}
                  onChange={(e) => handleUpdate(edu.id, 'degree', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Institution / University</label>
                <input
                  type="text"
                  placeholder="e.g. University of Technology"
                  value={edu.institution || ''}
                  onChange={(e) => handleUpdate(edu.id, 'institution', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Graduation Year / Date</label>
                <input
                  type="text"
                  placeholder="e.g. May 2025"
                  value={edu.graduationDate || ''}
                  onChange={(e) => handleUpdate(edu.id, 'graduationDate', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>GPA (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. 3.8/4.0"
                  value={edu.gpa || ''}
                  onChange={(e) => handleUpdate(edu.id, 'gpa', e.target.value)}
                />
              </div>

              <div className="form-group full-width">
                <label>Honors / Relevant Coursework (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Dean's List, Algorithms, Database Systems"
                  value={edu.highlights || ''}
                  onChange={(e) => handleUpdate(edu.id, 'highlights', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
