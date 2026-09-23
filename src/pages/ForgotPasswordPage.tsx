import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { authService } from '../services/authService';
import LabXLogo from '../components/brand/LabXLogo';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      const res = await authService.forgotPassword(email);
      setMessage(res.message);
      setSubmitted(true);
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
          <LabXLogo size="md" linkToHome />
          <h1 className="text-2xl font-black text-labx-text tracking-tight mt-4">
            Reset Password
          </h1>
          <p className="text-xs text-labx-text-secondary mt-1">
            Enter your email to receive proof-of-work password recovery instructions.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-4 space-y-4">
            <CheckCircle2 className="w-12 h-12 text-labx-success mx-auto" />
            <p className="text-sm text-labx-text leading-relaxed">{message}</p>
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs text-labx-violet hover:underline font-bold"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-labx-text-secondary uppercase tracking-wider mb-1.5">
                Builder Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-labx-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="builder@labx.demo"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-labx-bg border border-labx-border text-labx-text text-sm focus:outline-none focus:border-labx-violet"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-labx-violet to-labx-purple hover:brightness-110 active:scale-[0.99] transition-all shadow-md shadow-labx-violet/20 disabled:opacity-60"
            >
              {isSubmitting ? 'Sending instructions...' : 'Send Recovery Link'}
            </button>

            <div className="text-center pt-2">
              <Link to="/login" className="text-xs text-labx-text-muted hover:text-labx-text flex items-center justify-center gap-1">
                <ArrowLeft className="w-3 h-3" />
                <span>Return to Sign In</span>
              </Link>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
