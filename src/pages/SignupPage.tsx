import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LabXLogo from '../components/brand/LabXLogo';
import type { UserRole } from '../types';

const ROLES: { id: UserRole; title: string; desc: string; icon: string }[] = [
  { id: 'student', title: 'Student', desc: 'Learn, build projects, and turn curiosity into proof-of-work.', icon: '🎓' },
  { id: 'builder', title: 'Builder', desc: 'Full-stack or specialized engineer shipping production-ready tech.', icon: '⚡' },
  { id: 'founder', title: 'Founder', desc: 'Building a startup, assembling teams, and validating ideas.', icon: '🚀' },
  { id: 'mentor', title: 'Mentor', desc: 'Guiding emerging talent, reviewing architecture, and sharing lessons.', icon: '🎯' },
  { id: 'investor', title: 'Investor', desc: 'Scouting early-stage ventures and backing breakthrough innovations.', icon: '💎' },
  { id: 'researcher', title: 'Researcher', desc: 'Advancing applied science, writing whitepapers, and novel algorithms.', icon: '🔬' },
  { id: 'creator', title: 'Creator', desc: 'Designing interfaces, crafting content, and evangelizing products.', icon: '🎨' },
];

const INTERESTS = [
  'AI / ML', 'Web Development', 'Mobile Dev', 'Cloud & DevOps',
  'Cybersecurity', 'Data Science', 'Robotics & IoT', 'FinTech',
  'HealthTech', 'EdTech', 'ClimateTech', 'SaaS', 'Research', 'Open Source'
];

const GOALS = [
  'Projects to join', 'Collaborators / Co-founders', 'Mentors & Guidance',
  'Opportunities & Grants', 'Hackathons & Competitions', 'Startup validation',
  'Angel / Venture Investment', 'Community & Networking'
];

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('builder');
  const [interests, setInterests] = useState<string[]>(['AI / ML', 'Web Development']);
  const [lookingFor, setLookingFor] = useState<string[]>(['Projects to join', 'Collaborators / Co-founders']);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleInterest = (item: string) => {
    setInterests(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const toggleGoal = (item: string) => {
    setLookingFor(prev =>
      prev.includes(item) ? prev.filter(g => g !== item) : [...prev, item]
    );
  };

  const validateStep1 = () => {
    if (!name.trim()) return 'Please provide your full builder name.';
    if (!email.trim() || !email.includes('@')) return 'Please provide a valid work or personal email.';
    if (password.length < 6) return 'Password should be at least 6 characters.';
    if (password !== confirmPassword) return 'Passwords do not match.';
    return null;
  };

  const handleNext = () => {
    setError(null);
    if (step === 1) {
      const err = validateStep1();
      if (err) {
        setError(err);
        return;
      }
    }
    if (step < 4) {
      setStep(prev => prev + 1);
    } else {
      handleFinalSubmit();
    }
  };

  const handleBack = () => {
    setError(null);
    if (step > 1) setStep(prev => prev - 1);
  };

  const handleFinalSubmit = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      await signup({
        name,
        email,
        password,
        role,
        interests,
        lookingFor,
      });
      navigate('/dashboard');
    } catch {
      setError('An error occurred while creating your proof-of-work identity.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 labx-grid-bg relative overflow-hidden">
      <div className="w-full max-w-2xl relative z-10">
        {/* Step indicator */}
        <div className="mb-6 flex items-center justify-between">
          <LabXLogo size="md" linkToHome />
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map(s => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all duration-300 ${
                  s === step
                    ? 'w-8 bg-labx-green shadow-[0_0_12px_rgba(0,255,135,0.6)]'
                    : s < step
                    ? 'w-4 bg-labx-green/40'
                    : 'w-4 bg-labx-border'
                }`}
              />
            ))}
            <span className="text-xs font-mono text-labx-text-muted ml-2">
              STEP {step} / 4
            </span>
          </div>
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-labx-surface/90 border border-labx-border backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl"
        >
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <span>{error}</span>
            </div>
          )}

          {/* STEP 1: Account */}
          {step === 1 && (
            <div>
              <div className="mb-6">
                <div className="inline-flex mb-4">
                  <LabXLogo size="lg" linkToHome animate showGlow />
                </div>
                <span className="block text-xs font-bold text-labx-green uppercase tracking-wider">
                  Step 1 &bull; Identity
                </span>
                <h1 className="text-2xl font-black text-labx-text tracking-tight mt-1">
                  Create Your <span className="labx-gradient-text">Proof-of-Work</span> Profile
                </h1>
                <p className="text-xs text-labx-text-secondary mt-1">
                  Your work becomes your reputation. Start your innovation record.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-labx-text-secondary uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Elena Rostova"
                    className="w-full px-4 py-2.5 rounded-xl bg-labx-bg border border-labx-border text-labx-text text-sm focus:outline-none focus:border-labx-green focus:ring-1 focus:ring-labx-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-labx-text-secondary uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="builder@labx.demo"
                    className="w-full px-4 py-2.5 rounded-xl bg-labx-bg border border-labx-border text-labx-text text-sm focus:outline-none focus:border-labx-green focus:ring-1 focus:ring-labx-green"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-labx-text-secondary uppercase tracking-wider mb-1.5">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 rounded-xl bg-labx-bg border border-labx-border text-labx-text text-sm focus:outline-none focus:border-labx-green focus:ring-1 focus:ring-labx-green"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-labx-text-secondary uppercase tracking-wider mb-1.5">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 rounded-xl bg-labx-bg border border-labx-border text-labx-text text-sm focus:outline-none focus:border-labx-green focus:ring-1 focus:ring-labx-green"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Role */}
          {step === 2 && (
            <div>
              <div className="mb-6">
                <span className="text-xs font-bold text-labx-green uppercase tracking-wider">
                  Step 2 &bull; Role
                </span>
                <h1 className="text-2xl font-black text-labx-text tracking-tight mt-1">
                  Who Are You in the Ecosystem?
                </h1>
                <p className="text-xs text-labx-text-secondary mt-1">
                  Choose your primary persona. You can explore multiple roles later.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
                {ROLES.map(r => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRole(r.id)}
                    className={`p-3.5 rounded-xl text-left border transition-all flex items-start gap-3 ${
                      role === r.id
                        ? 'bg-labx-green/15 border-labx-green shadow-lg shadow-labx-green/10'
                        : 'bg-labx-bg border-labx-border hover:border-labx-green/40 hover:bg-labx-surface'
                    }`}
                  >
                    <span className="text-2xl">{r.icon}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-labx-text">{r.title}</span>
                        {role === r.id && <Check className="w-3.5 h-3.5 text-labx-green ml-auto" />}
                      </div>
                      <p className="text-xs text-labx-text-muted mt-0.5 leading-snug">{r.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Interests / Domains */}
          {step === 3 && (
            <div>
              <div className="mb-6">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Step 3 &bull; Domains & Tech
                </span>
                <h1 className="text-2xl font-black text-labx-text tracking-tight mt-1">
                  What Do You Build &amp; Care About?
                </h1>
                <p className="text-xs text-labx-text-secondary mt-1">
                  Select key disciplines to tailor your discovery feed and mentor recommendations.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {INTERESTS.map(item => {
                  const selected = interests.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleInterest(item)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                        selected
                          ? 'bg-labx-green text-black border-labx-green shadow-sm'
                          : 'bg-labx-bg text-labx-text-secondary border-labx-border hover:border-labx-green/50 hover:text-labx-text'
                      }`}
                    >
                      {selected && <Check className="w-3 h-3 text-black" />}
                      <span>{item}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Goals / What are you looking for */}
          {step === 4 && (
            <div>
              <div className="mb-6">
                <span className="text-xs font-bold text-labx-green uppercase tracking-wider">
                  Step 4 &bull; Objectives
                </span>
                <h1 className="text-2xl font-black text-labx-text tracking-tight mt-1">
                  What Are You Looking For?
                </h1>
                <p className="text-xs text-labx-text-secondary mt-1">
                  LabX connects you with matching builders, mentors, and opportunities.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {GOALS.map(goal => {
                  const selected = lookingFor.includes(goal);
                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => toggleGoal(goal)}
                      className={`p-3 rounded-xl text-left text-xs font-medium border transition-all flex items-center justify-between ${
                        selected
                          ? 'bg-labx-green/15 border-labx-green text-white'
                          : 'bg-labx-bg border-labx-border text-labx-text-secondary hover:border-labx-green/40 hover:text-labx-text'
                      }`}
                    >
                      <span>{goal}</span>
                      {selected && <Check className="w-3.5 h-3.5 text-labx-green" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 pt-5 border-t border-labx-border/80">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 rounded-xl text-xs font-medium text-labx-text-secondary hover:text-labx-text hover:bg-labx-bg flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="text-xs text-labx-text-muted hover:text-labx-text transition-colors"
              >
                Already have an account? Sign in
              </Link>
            )}

            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl text-xs font-black text-black bg-gradient-to-r from-[#00FF87] via-[#10B981] to-[#34D399] hover:brightness-110 active:scale-[0.99] flex items-center gap-2 shadow-lg shadow-emerald-500/25 disabled:opacity-60"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
              ) : step === 4 ? (
                <>
                  <span>Complete Setup &amp; Enter LabX</span>
                  <Sparkles className="w-4 h-4 text-black" />
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
