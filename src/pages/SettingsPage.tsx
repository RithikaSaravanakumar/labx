import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, CheckCircle2 } from 'lucide-react';
import { pageTransition } from '../animations';

export default function SettingsPage() {
  const [name, setName] = useState('Aarav Sharma');
  const [username, setUsername] = useState('aarav_ai');
  const [bio, setBio] = useState('AI Systems Researcher & Founder building LabX Vision');
  const [email, setEmail] = useState('aarav@labx.io');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <h1 className="text-3xl font-bold text-labx-text mb-2">Account Settings</h1>
      <p className="text-sm text-labx-text-secondary mb-8">Manage your builder profile, preferences, and verified credentials.</p>

      <div className="labx-card p-6 sm:p-8">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-labx-border">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="Avatar" className="w-16 h-16 rounded-2xl border-2 border-labx-cyan/60 shadow-[0_0_15px_rgba(34, 211, 238,0.2)] object-cover" />
            <div>
              <button type="button" className="labx-button-secondary text-xs px-3 py-1.5 rounded-lg font-semibold">Change Avatar</button>
              <div className="text-[10px] text-labx-text-muted mt-1">Recommended: 400x400px square image</div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-labx-text mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-labx-surface border border-labx-border text-sm text-labx-text focus:outline-none focus:border-labx-cyan/60"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-labx-text mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-labx-surface border border-labx-border text-sm text-labx-text focus:outline-none focus:border-labx-cyan/60 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-labx-text mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-labx-surface border border-labx-border text-sm text-labx-text focus:outline-none focus:border-labx-cyan/60 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-labx-text mb-1">Bio</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-labx-surface border border-labx-border text-sm text-labx-text focus:outline-none focus:border-labx-cyan/60"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-labx-border">
            {isSaved ? (
              <span className="flex items-center gap-1.5 text-xs text-cyan-300 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Settings saved successfully!</span>
              </span>
            ) : <span />}

            <button type="submit" className="labx-button-primary px-6 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2">
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
