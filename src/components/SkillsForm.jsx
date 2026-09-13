import React, { useState } from 'react';
import { Code, Plus, X } from 'lucide-react';

export default function SkillsForm({ skills, onChange }) {
  const [inputs, setInputs] = useState({
    languages: '',
    frameworks: '',
    tools: '',
    softSkills: ''
  });

  const handleAddSkill = (category) => {
    const val = inputs[category].trim();
    if (!val) return;
    const currentList = skills[category] || [];
    if (!currentList.includes(val)) {
      onChange({
        ...skills,
        [category]: [...currentList, val]
      });
    }
    setInputs({ ...inputs, [category]: '' });
  };

  const handleRemoveSkill = (category, index) => {
    const currentList = skills[category] || [];
    onChange({
      ...skills,
      [category]: currentList.filter((_, i) => i !== index)
    });
  };

  const handleKeyDown = (e, category) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill(category);
    }
  };

  const categories = [
    { id: 'languages', title: 'Programming Languages', placeholder: 'e.g. JavaScript, Python, C++, SQL' },
    { id: 'frameworks', title: 'Frameworks & Libraries', placeholder: 'e.g. React, Node.js, Express, Tailwind' },
    { id: 'tools', title: 'Databases & Developer Tools', placeholder: 'e.g. PostgreSQL, MongoDB, Git, Docker' },
    { id: 'softSkills', title: 'Soft Skills & Competencies', placeholder: 'e.g. Problem Solving, Communication' }
  ];

  return (
    <div className="form-card">
      <div className="card-header">
        <Code className="card-icon text-cyan-400" size={20} />
        <h3>Technical & Soft Skills</h3>
      </div>

      <div className="space-y-4">
        {categories.map((cat) => {
          const list = skills[cat.id] || [];
          return (
            <div key={cat.id} className="form-group">
              <label>{cat.title}</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={cat.placeholder}
                  value={inputs[cat.id]}
                  onChange={(e) => setInputs({ ...inputs, [cat.id]: e.target.value })}
                  onKeyDown={(e) => handleKeyDown(e, cat.id)}
                />
                <button
                  type="button"
                  className="btn-primary px-3 py-1 flex items-center"
                  onClick={() => handleAddSkill(cat.id)}
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="tags-container mt-2">
                {list.map((item, idx) => (
                  <span key={idx} className="tag-chip">
                    {item}
                    <button type="button" onClick={() => handleRemoveSkill(cat.id, idx)}>
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
