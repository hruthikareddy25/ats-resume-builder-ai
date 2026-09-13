import React from 'react';
import { User, Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

export default function HeaderForm({ header, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...header, [field]: value });
  };

  return (
    <div className="form-card">
      <div className="card-header">
        <User className="card-icon text-indigo-400" size={20} />
        <h3>Contact & Personal Info</h3>
      </div>
      <div className="form-grid">
        <div className="form-group">
          <label><User size={14} /> Full Name</label>
          <input
            type="text"
            placeholder="e.g. Alex Morgan"
            value={header.fullName || ''}
            onChange={(e) => handleChange('fullName', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label><User size={14} /> Professional Title</label>
          <input
            type="text"
            placeholder="e.g. Software Engineer / CS Student"
            value={header.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label><Mail size={14} /> Email Address</label>
          <input
            type="email"
            placeholder="alex.morgan@email.com"
            value={header.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label><Phone size={14} /> Phone Number</label>
          <input
            type="text"
            placeholder="(555) 019-2834"
            value={header.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label><MapPin size={14} /> Location</label>
          <input
            type="text"
            placeholder="San Francisco, CA"
            value={header.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label><Linkedin size={14} /> LinkedIn Profile</label>
          <input
            type="text"
            placeholder="linkedin.com/in/alexmorgan-dev"
            value={header.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label><Github size={14} /> GitHub Profile</label>
          <input
            type="text"
            placeholder="github.com/alexmorgan-dev"
            value={header.github || ''}
            onChange={(e) => handleChange('github', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label><Globe size={14} /> Portfolio Website (Optional)</label>
          <input
            type="text"
            placeholder="alexmorgan.dev"
            value={header.portfolio || ''}
            onChange={(e) => handleChange('portfolio', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
