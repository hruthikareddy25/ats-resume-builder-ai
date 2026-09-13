import React, { useState } from 'react';
import { User, Lock, Mail, LogIn, UserPlus, Sparkles, X, CheckCircle2 } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLogin, currentUser }) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const userObj = {
      name: formData.name || (isRegister ? 'New User' : formData.email.split('@')[0] || 'Logged In User'),
      email: formData.email || 'user@example.com',
      isLoggedIn: true
    };
    onLogin(userObj);
    onClose();
  };

  const handleQuickLogin = (name, email) => {
    onLogin({ name, email, isLoggedIn: true });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="form-card max-w-md w-full relative border border-slate-700/80 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-slate-200"
        >
          <X size={18} />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 mb-2">
            <User size={24} />
          </div>
          <h2 className="text-xl font-bold text-slate-100">
            {currentUser?.isLoggedIn ? 'Account Profile' : isRegister ? 'Create Your Account' : 'Welcome Back'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {currentUser?.isLoggedIn
              ? `Logged in as ${currentUser.email}`
              : 'Save your ATS resumes, sync AI ideas, and export anytime.'}
          </p>
        </div>

        {currentUser?.isLoggedIn ? (
          <div className="space-y-4 text-center">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-300 text-xs flex items-center justify-center gap-2">
              <CheckCircle2 size={16} /> Active Session: {currentUser.name} ({currentUser.email})
            </div>
            <button
              type="button"
              className="btn-secondary w-full justify-center"
              onClick={() => {
                onLogin(null);
                onClose();
              }}
            >
              Log Out
            </button>
          </div>
        ) : (
          <>
            {/* Quick Demo Accounts */}
            <div className="mb-5 p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
              <span className="text-[11px] font-semibold text-slate-300 block mb-2 uppercase tracking-wider flex items-center gap-1">
                <Sparkles size={12} className="text-amber-400" /> Quick Demo One-Click Login
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="btn-secondary text-xs flex-1 justify-center"
                  onClick={() => handleQuickLogin('Alex Morgan', 'alex.morgan@email.com')}
                >
                  Alex Morgan (Engineer)
                </button>
                <button
                  type="button"
                  className="btn-secondary text-xs flex-1 justify-center"
                  onClick={() => handleQuickLogin('Sarah Chen', 'sarah.chen@dev.io')}
                >
                  Sarah Chen (Data Scientist)
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {isRegister && (
                <div className="form-group">
                  <label><User size={13} /> Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              )}

              <div className="form-group">
                <label><Mail size={13} /> Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label><Lock size={13} /> Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <button type="submit" className="btn-primary w-full justify-center mt-2">
                {isRegister ? <UserPlus size={16} /> : <LogIn size={16} />}
                {isRegister ? 'Sign Up & Start Building' : 'Sign In'}
              </button>
            </form>

            <div className="text-center mt-4 pt-3 border-t border-slate-800 text-xs">
              <button
                type="button"
                className="text-indigo-400 hover:underline"
                onClick={() => setIsRegister(!isRegister)}
              >
                {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
