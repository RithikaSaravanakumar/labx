import { useState, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LabXLogo from '../components/brand/LabXLogo';
import type { UserRole } from '../types';

export default function LoginPage() {
  const { login, loginWithDemo, demoPersonas } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please provide your builder email.');
      return;
    }
    setError(null);
    setIsSubmitting(true);
    try {
      await login({ email, password, rememberMe });
      navigate(redirectPath);
    } catch {
      setError('Failed to authenticate. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoSelect = async (role: UserRole) => {
    setError(null);
    setIsSubmitting(true);
    try {
      await loginWithDemo(role);
      navigate(redirectPath);
    } catch {
      setError('Failed to initialize demo persona.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 labx-grid-bg relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-labx-cyan/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-cyan-400/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Main Login Form Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 bg-labx-surface/90 border border-labx-border backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl"
        >
          <div className="text-center sm:text-left mb-6">
            <div className="inline-flex mb-5">
              <LabXLogo size="xl" linkToHome animate showGlow />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-labx-text tracking-tight uppercase">
              Welcome Back, <span className="labx-gradient-text">Builder</span>.
            </h1>
            <p className="text-sm text-labx-text-secondary mt-1.5 leading-relaxed">
              Your ideas are waiting. Let&apos;s keep building.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-labx-text-secondary uppercase tracking-wider mb-1.5">
                Work / Builder Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-labx-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="builder@labx.demo"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-labx-bg border border-labx-border text-labx-text placeholder-labx-text-muted text-sm focus:outline-none focus:border-labx-cyan focus:ring-1 focus:ring-labx-cyan transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-xs font-semibold text-labx-text-secondary uppercase tracking-wider">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-labx-cyan hover:text-sky-200 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-labx-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-labx-bg border border-labx-border text-labx-text placeholder-labx-text-muted text-sm focus:outline-none focus:border-labx-cyan focus:ring-1 focus:ring-labx-cyan transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-labx-text-muted hover:text-labx-text p-1 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-labx-border bg-labx-bg text-labx-cyan focus:ring-labx-cyan focus:ring-offset-0"
                />
                <span className="text-xs text-labx-text-secondary">Keep me signed in</span>
              </label>
              <span className="text-xs text-labx-text-muted flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-labx-success" />
                Proof-of-work secured
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-[#22D3EE] via-[#10B981] to-[#34D399] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-400/25 disabled:opacity-60"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <>
                  <span>Sign In to Innovation Hub</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Social login placeholders */}
          <div className="mt-5 pt-5 border-t border-labx-border/60">
            <p className="text-center text-xs text-labx-text-muted uppercase tracking-wider mb-3">
              Or authenticate with
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleDemoSelect('builder')}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-labx-bg border border-labx-border hover:border-labx-cyan/40 text-xs font-medium text-labx-text transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoSelect('student')}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-labx-bg border border-labx-border hover:border-labx-cyan/40 text-xs font-medium text-labx-text transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
                <span>Google</span>
              </button>
            </div>
          </div>

          <div className="mt-5 text-center">
            <p className="text-xs text-labx-text-secondary">
              Don&apos;t have an account yet?{' '}
              <Link to="/signup" className="text-labx-cyan hover:underline font-semibold ml-1">
                Start Building on LabX &rarr;
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Demo Personas Column (Quick Access) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="lg:col-span-5 flex flex-col gap-4"
        >
          <div className="bg-labx-card/95 border border-labx-border/80 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-labx-cyan" />
              <h2 className="text-xs font-bold text-labx-text uppercase tracking-wider">
                Explore LabX As &bull; Demo Access
              </h2>
            </div>
            <p className="text-xs text-labx-text-muted mb-4 leading-relaxed">
              No registration needed. Choose an official persona to test real-world interactions across the ecosystem:
            </p>

            <div className="space-y-2.5">
              {demoPersonas.map(persona => (
                <button
                  key={persona.id}
                  type="button"
                  onClick={() => handleDemoSelect(persona.role)}
                  className="w-full text-left p-3 rounded-xl bg-labx-bg/80 border border-labx-border hover:border-labx-cyan/60 hover:bg-labx-surface transition-all flex items-center gap-3 group"
                >
                  <img
                    src={persona.avatar}
                    alt={persona.name}
                    className="w-9 h-9 rounded-full ring-1 ring-labx-border group-hover:ring-labx-cyan shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-labx-text group-hover:text-labx-cyan transition-colors truncate">
                        {persona.name}
                      </span>
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-labx-cyan/10 text-labx-cyan border border-labx-cyan/20">
                        {persona.role}
                      </span>
                    </div>
                    <p className="text-[11px] text-labx-text-muted truncate mt-0.5">
                      {persona.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-labx-border/40 flex items-center justify-between text-[11px] text-labx-text-muted">
              <span>Demo Password:</span>
              <code className="bg-labx-bg px-2 py-0.5 rounded border border-labx-border text-labx-cyan font-mono text-[10px]">
                LabX@Demo123
              </code>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
