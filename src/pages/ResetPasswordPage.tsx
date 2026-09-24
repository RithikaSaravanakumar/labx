import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { authService } from '../services/authService';
import LabXLogo from '../components/brand/LabXLogo';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError(null);
    setIsSubmitting(true);
    try {
      await authService.resetPassword('token', password);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2500);
    } catch {
      setError('Unable to reset password. Token may be expired.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 labx-grid-bg relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-labx-surface/90 border border-labx-border backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl relative z-10"
      >
        <div className="mb-6 text-center">
          <LabXLogo size="lg" linkToHome animate showGlow />
          <h1 className="text-2xl font-black text-labx-text tracking-tight mt-4">
            Set New Password
          </h1>
          <p className="text-xs text-labx-text-secondary mt-1">
            Choose a secure password to protect your LabX proof-of-work identity.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
            {error}
          </div>
        )}

        {success ? (
          <div className="text-center py-4 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-labx-success mx-auto" />
            <p className="text-sm text-labx-text font-semibold">Password Reset Complete</p>
            <p className="text-xs text-labx-text-muted">Redirecting to sign-in portal...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-labx-text-secondary uppercase tracking-wider mb-1.5">
                New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-labx-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-labx-bg border border-labx-border text-labx-text text-sm focus:outline-none focus:border-labx-cyan"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-labx-text-secondary uppercase tracking-wider mb-1.5">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-labx-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-labx-bg border border-labx-border text-labx-text text-sm focus:outline-none focus:border-labx-cyan"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-xl font-black text-xs text-black bg-gradient-to-r from-[#22D3EE] via-[#10B981] to-[#34D399] hover:brightness-110 active:scale-[0.99] transition-all shadow-md shadow-cyan-400/25 flex items-center justify-center gap-1.5 disabled:opacity-60"
            >
              <span>Update Password</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
