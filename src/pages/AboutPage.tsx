import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, Users, Sparkles } from 'lucide-react';
import LabXLogo from '../components/brand/LabXLogo';
import InnovationOrbit from '../components/visualizations/InnovationOrbit';

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Hero Header */}
      <section className="text-center max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-labx-green/10 border border-labx-green/20 text-labx-green text-xs font-bold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          The Innovation Manifesto
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-labx-text tracking-tight uppercase leading-tight">
          YOUR WORK BECOMES YOUR <span className="labx-gradient-text">REPUTATION</span>.
        </h1>
        <p className="mt-6 text-base sm:text-lg text-labx-text-secondary leading-relaxed">
          Traditional platforms reward credentials and paper resumes. <strong className="text-labx-text">LabX</strong> was built on a different premise: what you design, code, launch, and contribute is the only credible proof of ability.
        </p>
      </section>

      {/* Philosophy Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-labx-surface/80 border border-labx-border hover:border-labx-green/40 transition-all shadow-[0_0_0_1px_transparent] hover:shadow-[0_0_18px_rgba(0,255,135,0.08)]">
          <div className="w-10 h-10 rounded-xl bg-labx-green/10 border border-labx-green/20 flex items-center justify-center text-labx-green mb-4">
            <Zap className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-labx-text mb-2">Build in Public</h2>
          <p className="text-xs text-labx-text-secondary leading-relaxed">
            Every commit, milestone, architecture decision, and sprint log is immortalized as transparent proof of your work.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-labx-surface/80 border border-labx-border hover:border-emerald-400/40 transition-all shadow-[0_0_0_1px_transparent] hover:shadow-[0_0_18px_rgba(0,255,135,0.08)]">
          <div className="w-10 h-10 rounded-xl bg-labx-green/10 border border-labx-green/20 flex items-center justify-center text-labx-green mb-4">
            <Users className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-labx-text mb-2">Cross-Pollination</h2>
          <p className="text-xs text-labx-text-secondary leading-relaxed">
            Connecting ambitious students, veteran founders, domain mentors, and early-stage capital in a unified, friction-free orbit.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-labx-surface/80 border border-labx-border hover:border-emerald-400/50 transition-all">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[#00FF87] mb-4">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-labx-text mb-2">Reputation Engine</h2>
          <p className="text-xs text-labx-text-secondary leading-relaxed">
            LabX Points and verified contribution heatmaps reflect real engineering impact, team collaboration, and peer endorsements.
          </p>
        </div>
      </section>

      {/* Ecosystem Visual Section */}
      <section className="p-8 sm:p-12 rounded-3xl bg-labx-surface border border-labx-border grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 space-y-4">
          <span className="text-xs font-bold text-labx-green uppercase tracking-wider">
            Connected Network
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-labx-text tracking-tight">
            From First Idea to Real-World Impact
          </h2>
          <p className="text-xs sm:text-sm text-labx-text-secondary leading-relaxed">
            Whether you are a student discovering your first open-source project, a founder validating traction, or a mentor paying forward decades of experience, LabX provides the tools to build what matters.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              to="/discover"
              className="px-4 py-2.5 rounded-xl font-black text-xs text-black bg-gradient-to-r from-[#00FF87] via-[#10B981] to-[#34D399] hover:brightness-110 flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/25"
            >
              <span>Explore Ecosystem</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2.5 rounded-xl font-bold text-xs text-labx-text bg-labx-bg border border-labx-border hover:border-labx-green/50 transition-colors"
            >
              Claim Proof of Work
            </Link>
          </div>
        </div>
        <div className="lg:col-span-6 flex items-center justify-center">
          <InnovationOrbit />
        </div>
      </section>

      {/* Brand Statement Banner */}
      <section className="text-center py-10 border-t border-labx-border/80">
        <LabXLogo size="xl" className="justify-center mb-4" animate showGlow />
        <h2 className="text-xl sm:text-2xl font-black text-labx-text uppercase tracking-tight">
          BUILD WHAT <span className="labx-gradient-text">MATTERS.</span>
        </h2>
        <p className="text-xs text-labx-text-muted mt-1">
          Where ideas, people, and opportunities come together to create what&apos;s next.
        </p>
      </section>
    </div>
  );
}
