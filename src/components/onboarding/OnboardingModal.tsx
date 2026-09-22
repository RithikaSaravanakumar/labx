import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2, X } from 'lucide-react';
import type { UserRole, Domain } from '../../types';
import { DOMAIN_LABELS } from '../../constants';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (role: UserRole, interests: Domain[]) => void;
}

const roles: { value: UserRole; label: string; desc: string; icon: string }[] = [
  { value: 'student', label: 'Student', desc: 'Learning, discovering projects, seeking mentorship & internships', icon: '🎓' },
  { value: 'builder', label: 'Builder / Dev', desc: 'Shipping open-source code, completing milestones, gaining points', icon: '💻' },
  { value: 'founder', label: 'Founder', desc: 'Building a venture, recruiting co-founders, pitching to investors', icon: '🚀' },
  { value: 'mentor', label: 'Mentor', desc: 'Offering office hours, guiding projects, reviewing tech stacks', icon: '🧠' },
  { value: 'investor', label: 'Investor', desc: 'Discovering deal flow, tracking startup traction & telemetry', icon: '💎' },
  { value: 'researcher', label: 'Researcher', desc: 'Publishing deep-tech papers, sharing dataset prototypes', icon: '🔬' },
];

export default function OnboardingModal({ isOpen, onClose, onComplete }: OnboardingModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>('builder');
  const [selectedInterests, setSelectedInterests] = useState<Domain[]>(['ai-ml', 'deep-tech']);

  if (!isOpen) return null;

  const toggleInterest = (d: Domain) => {
    if (selectedInterests.includes(d)) {
      setSelectedInterests(selectedInterests.filter(item => item !== d));
    } else {
      setSelectedInterests([...selectedInterests, d]);
    }
  };

  const handleFinish = () => {
    if (selectedRole) {
      onComplete(selectedRole, selectedInterests);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-xl bg-labx-card border border-labx-border p-6 sm:p-8 rounded-2xl shadow-2xl relative"
        >
          <button onClick={onClose} className="absolute right-4 top-4 p-1 rounded-lg text-labx-text-muted hover:text-labx-text">
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-labx-violet/10 text-labx-violet border border-labx-violet/30 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Step {step} of 2</span>
            </span>
          </div>

          {step === 1 ? (
            <div>
              <h2 className="text-2xl font-bold text-labx-text mb-1">What brings you to LabX?</h2>
              <p className="text-xs text-labx-text-secondary mb-6">Select your primary role to customize your ecosystem feed.</p>

              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {roles.map(r => (
                  <button
                    key={r.value}
                    onClick={() => setSelectedRole(r.value)}
                    className={`p-3.5 rounded-xl text-left border transition-all ${
                      selectedRole === r.value
                        ? 'bg-labx-violet/20 border-labx-violet shadow-md'
                        : 'bg-labx-surface border-labx-border hover:border-labx-border/80'
                    }`}
                  >
                    <div className="text-2xl mb-1">{r.icon}</div>
                    <div className="text-sm font-bold text-labx-text">{r.label}</div>
                    <div className="text-[11px] text-labx-text-muted line-clamp-2 mt-0.5">{r.desc}</div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!selectedRole}
                className="w-full labx-button-primary py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
              >
                <span>Continue to Interests</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-labx-text mb-1">Select your domain focus</h2>
              <p className="text-xs text-labx-text-secondary mb-6">Choose deep-tech domains you want to track and build in.</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-8">
                {Object.entries(DOMAIN_LABELS).map(([key, label]) => {
                  const isSelected = selectedInterests.includes(key as Domain);
                  return (
                    <button
                      key={key}
                      onClick={() => toggleInterest(key as Domain)}
                      className={`p-2.5 rounded-xl text-xs font-semibold text-center border transition-all ${
                        isSelected
                          ? 'bg-labx-cyan/20 border-labx-cyan text-labx-cyan'
                          : 'bg-labx-surface border-labx-border text-labx-text-muted hover:text-labx-text'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="w-1/3 labx-button-secondary py-3 rounded-xl text-xs font-semibold">
                  Back
                </button>
                <button
                  onClick={handleFinish}
                  className="w-2/3 labx-button-primary py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Enter LabX Ecosystem</span>
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
