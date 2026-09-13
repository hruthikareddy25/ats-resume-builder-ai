import React from 'react';
import { Award, Plus, Trash2 } from 'lucide-react';

export default function CertificationsForm({ certifications, additional, onCertChange, onAddChange }) {
  const handleAddCert = () => {
    const newItem = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      date: ''
    };
    onCertChange([...certifications, newItem]);
  };

  const handleRemoveCert = (id) => {
    onCertChange(certifications.filter(item => item.id !== id));
  };

  const handleUpdateCert = (id, field, value) => {
    onCertChange(certifications.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  return (
    <div className="form-card">
      <div className="card-header justify-between">
        <div className="flex items-center gap-2">
          <Award className="card-icon text-pink-400" size={20} />
          <h3>Certifications & Additional Info</h3>
        </div>
        <button type="button" className="btn-primary text-xs" onClick={handleAddCert}>
          <Plus size={14} /> Add Certification
        </button>
      </div>

      <div className="space-y-4 mb-6">
        {certifications.map((cert, idx) => (
          <div key={cert.id || idx} className="item-card">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-slate-300">Certification #{idx + 1}</span>
              <button
                type="button"
                className="btn-danger-icon"
                onClick={() => handleRemoveCert(cert.id)}
              >
                <Trash2 size={15} />
              </button>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Certification Name</label>
                <input
                  type="text"
                  placeholder="e.g. AWS Certified Cloud Practitioner"
                  value={cert.name || ''}
                  onChange={(e) => handleUpdateCert(cert.id, 'name', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Issuing Organization</label>
                <input
                  type="text"
                  placeholder="e.g. Amazon Web Services"
                  value={cert.issuer || ''}
                  onChange={(e) => handleUpdateCert(cert.id, 'issuer', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Issue Date</label>
                <input
                  type="text"
                  placeholder="e.g. Oct 2024"
                  value={cert.date || ''}
                  onChange={(e) => handleUpdateCert(cert.id, 'date', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-700/60 pt-4">
        <h4 className="text-sm font-semibold text-slate-300 mb-3">Additional Details</h4>
        <div className="form-grid">
          <div className="form-group">
            <label>Languages Spoken</label>
            <input
              type="text"
              placeholder="e.g. English (Native), Spanish (Conversational)"
              value={additional.languages || ''}
              onChange={(e) => onAddChange({ ...additional, languages: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Interests / Extracurriculars</label>
            <input
              type="text"
              placeholder="e.g. Open Source Contributing, Competitive Programming"
              value={additional.interests || ''}
              onChange={(e) => onAddChange({ ...additional, interests: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
