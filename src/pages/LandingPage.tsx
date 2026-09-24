import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Rocket, Users, Trophy, Target, Lightbulb, TrendingUp } from 'lucide-react';
import InnovationOrbit from '../components/visualizations/InnovationOrbit';
import HolographicCube3D from '../components/visualizations/HolographicCube3D';
import { mockProjects, mockBuildUpdates, mockMentors } from '../data/mockData';
import { fadeInUp, staggerContainer, staggerItem } from '../animations';
import { DOMAIN_LABELS, DOMAIN_COLORS, STAGE_LABELS } from '../constants';
import { formatRelativeTime } from '../utils';

const roles = [
  { id: 'student', label: 'Student', icon: '', desc: 'Learn, build, grow your portfolio' },
  { id: 'builder', label: 'Builder', icon: '', desc: 'Find projects, showcase work' },
  { id: 'founder', label: 'Founder', icon: '', desc: 'Build startup, find team' },
  { id: 'mentor', label: 'Mentor', icon: '', desc: 'Guide builders, share expertise' },
  { id: 'investor', label: 'Investor', icon: '', desc: 'Discover startups, track progress' },
  { id: 'researcher', label: 'Researcher', icon: '', desc: 'Collaborate on research' },
];

const stats = [
  { label: 'Active Projects', value: '2,400+', icon: Rocket },
  { label: 'Builders', value: '18,000+', icon: Users },
  { label: 'Mentors', value: '850+', icon: Target },
  { label: 'Hackathons', value: '120+', icon: Trophy },
];

export default function LandingPage() {
  return (
    <div className="overflow-hidden">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center labx-grid-bg overflow-hidden py-4 lg:py-8">
        {/* 3D Cyber Perspective Floor */}
        <div className="cyber-plane-3d" />

        {/* Ambient Glowing Emerald Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-cyan-400/12 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-[#22D3EE]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            {/* Left Column: Hero Typography & CTAs */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-[#22D3EE] text-[10px] sm:text-xs font-black tracking-widest uppercase mb-5 shadow-[0_0_15px_rgba(0,255,135,0.2)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
                  THE INNOVATION ECOSYSTEM
                </div>
              </motion.div>

              <motion.h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-black tracking-tighter mb-4 leading-[0.9] text-white"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                BUILD WHAT<br />
                <span className="labx-gradient-text tracking-tighter">MATTERS.</span>
              </motion.h1>

              <motion.p
                className="text-base sm:text-lg md:text-xl text-labx-text-secondary max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed font-medium"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Where ambitious people, bold ideas, and meaningful opportunities come together.{' '}
                <strong className="text-white font-bold block mt-2 text-cyan-300">Your work becomes your reputation.</strong>
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link
                  to="/projects/new"
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#22D3EE] via-[#10B981] to-[#34D399] text-black font-black text-sm hover:brightness-110 active:scale-[0.98] transition-all flex items-center gap-2 shadow-lg shadow-cyan-400/30 hover:shadow-cyan-400/50"
                >
                  <span>Start Building</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/discover"
                  className="px-6 py-3.5 rounded-xl bg-white/[0.04] border border-white/15 text-white font-bold text-sm hover:border-cyan-300/60 hover:bg-cyan-400/10 transition-all shadow-sm"
                >
                  Explore Ecosystem
                </Link>
                <Link
                  to="/projects"
                  className="px-6 py-3.5 rounded-xl text-zinc-300 hover:text-[#22D3EE] font-semibold text-sm transition-colors"
                >
                  See What&apos;s Being Built &rarr;
                </Link>
              </motion.div>
            </div>

            {/* Right Column: Interactive 3D Holographic Cube & Gyroscope */}
            <motion.div
              className="flex-1 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
            >
              <HolographicCube3D size={360} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="border-y border-labx-border bg-labx-bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map(stat => (
              <motion.div key={stat.label} variants={staggerItem} className="text-center">
                <stat.icon className="w-6 h-6 text-labx-cyan mx-auto mb-2" />
                <div className="text-2xl sm:text-3xl font-bold text-labx-text">{stat.value}</div>
                <div className="text-sm text-labx-text-muted">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== INNOVATION ORBIT ===== */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-labx-text mb-4">The Innovation Ecosystem</h2>
            <p className="text-labx-text-secondary max-w-xl mx-auto">
              Every role connects to the same ecosystem. Discover how LabX brings together the people who build the future.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <InnovationOrbit />
          </motion.div>
        </div>
      </section>

      {/* ===== ROLE SELECTOR ===== */}
      <section className="py-20 bg-labx-bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-labx-text mb-4">Who are you building as?</h2>
            <p className="text-labx-text-secondary">LabX adapts to your journey</p>
          </motion.div>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {roles.map(role => (
              <motion.div
                key={role.id}
                variants={staggerItem}
                whileHover={{ scale: 1.05, y: -4 }}
                className="labx-card p-6 text-center cursor-pointer group"
              >
                <div className="text-3xl mb-3">{role.icon}</div>
                <h3 className="text-sm font-semibold text-labx-text mb-1">{role.label}</h3>
                <p className="text-xs text-labx-text-muted">{role.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== PROJECT DISCOVERY PREVIEW ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-black text-labx-text mb-4 uppercase tracking-tight">What's Being Built</h2>
            <p className="text-labx-text-secondary">Real projects by real builders, right now</p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {mockProjects.slice(0, 3).map(project => (
              <motion.div key={project.id} variants={staggerItem}>
                <Link to={`/projects/${project.id}`} className="labx-card p-6 block h-full group">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                      style={{ backgroundColor: `${DOMAIN_COLORS[project.domain]}20`, color: DOMAIN_COLORS[project.domain] }}
                    >
                      {DOMAIN_LABELS[project.domain]}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-labx-surface text-labx-text-muted uppercase tracking-wider">
                      {STAGE_LABELS[project.stage]}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-labx-text mb-2 group-hover:text-labx-cyan transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-labx-text-secondary mb-4 line-clamp-2">{project.description}</p>

                  {/* Progress bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-labx-text-muted">Progress</span>
                      <span className="text-labx-cyan font-mono font-bold">{project.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-labx-bg rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-labx-cyan to-cyan-300"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${project.progress}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>

                  {/* Team & tech */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-labx-text-muted" />
                      <span className="text-xs text-labx-text-muted">{project.contributorCount} builders</span>
                    </div>
                    <div className="flex gap-1">
                      {project.techStack.slice(0, 3).map(tech => (
                        <span key={tech} className="px-1.5 py-0.5 rounded text-[10px] bg-labx-bg text-labx-text-muted">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-8">
            <Link to="/projects" className="text-sm text-labx-cyan hover:text-sky-200 font-medium inline-flex items-center gap-1">
              View all projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== BUILD IN PUBLIC PREVIEW ===== */}
      <section className="py-20 bg-labx-bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-labx-text mb-4">Build in Public</h2>
            <p className="text-labx-text-secondary">Watch innovation happen in real-time</p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {mockBuildUpdates.slice(0, 2).map(update => (
              <motion.div key={update.id} variants={staggerItem} className="labx-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <img src={update.authorAvatar} alt={update.authorName} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="text-sm font-semibold text-labx-text">{update.authorName}</p>
                    <p className="text-xs text-labx-text-muted">{update.projectName} · Day {update.day}</p>
                  </div>
                  <span className="ml-auto text-xs text-labx-text-muted">{formatRelativeTime(update.createdAt)}</span>
                </div>
                <h4 className="text-base font-bold text-labx-text mb-2">{update.title}</h4>
                <p className="text-sm text-labx-text-secondary whitespace-pre-line line-clamp-4">{update.content}</p>
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-labx-border">
                  <span className="text-xs text-labx-text-muted"> {update.reactions.fire}</span>
                  <span className="text-xs text-labx-text-muted"> {update.reactions.rocket}</span>
                  <span className="text-xs text-labx-text-muted"> {update.reactions.heart}</span>
                  <span className="text-xs text-labx-text-muted"> {update.reactions.clap}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-8">
            <Link to="/build" className="text-sm text-labx-cyan hover:text-sky-200 font-medium inline-flex items-center gap-1">
              See all build updates <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== MENTORS SECTION ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-black text-labx-text mb-4 uppercase tracking-tight">
              Learn From Those Who've Built Before
            </h2>
            <p className="text-labx-text-secondary">Mentors matched to your project, not just your search query</p>
          </motion.div>
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {mockMentors.map(mentor => (
              <motion.div key={mentor.id} variants={staggerItem}>
                <Link to={`/mentors/${mentor.id}`} className="labx-card p-6 block text-center group">
                  <img src={mentor.avatar} alt={mentor.name} className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-labx-border group-hover:border-labx-cyan transition-colors" />
                  <h3 className="text-sm font-bold text-labx-text">{mentor.name}</h3>
                  <p className="text-xs text-labx-text-muted mb-2">{mentor.title} · {mentor.experience}</p>
                  <div className="flex flex-wrap justify-center gap-1 mb-3">
                    {mentor.expertise.slice(0, 2).map(e => (
                      <span key={e} className="px-2 py-0.5 rounded-full text-[10px] bg-labx-cyan/10 text-labx-cyan border border-labx-cyan/20">{e}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs text-labx-text-muted">
                    <span> {mentor.rating}</span>
                    <span>·</span>
                    <span>{mentor.totalSessions} sessions</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== LABX POINTS ===== */}
      <section className="py-20 bg-labx-bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="text-3xl sm:text-4xl font-bold text-labx-text mb-4">
                Your contribution has value
              </h2>
              <p className="text-labx-text-secondary mb-8 leading-relaxed">
                LabX Points represent what you've actually built, contributed, mentored, and collaborated on.
                Not claims — proof of work.
              </p>
              <div className="space-y-3">
                {[
                  { icon: Rocket, label: 'Build projects', points: '+50–100' },
                  { icon: Users, label: 'Mentor others', points: '+30–60' },
                  { icon: Trophy, label: 'Win hackathons', points: '+80–200' },
                  { icon: Lightbulb, label: 'Share knowledge', points: '+20–40' },
                  { icon: TrendingUp, label: 'Collaborate', points: '+25–50' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3 p-3 rounded-lg bg-labx-surface border border-labx-border">
                    <item.icon className="w-5 h-5 text-labx-cyan" />
                    <span className="text-sm text-labx-text flex-1">{item.label}</span>
                    <span className="text-sm font-semibold text-labx-cyan font-mono">{item.points}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="w-56 h-56 rounded-full border-4 border-labx-cyan/30 flex items-center justify-center">
                  <div className="w-44 h-44 rounded-full border-2 border-labx-cyan/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-black labx-gradient-text">1,840</div>
                      <div className="text-sm text-labx-text-muted mt-1">LabX Points</div>
                      <div className="text-xs text-labx-cyan mt-1 font-mono">Builder Level 07</div>
                    </div>
                  </div>
                </div>
                <motion.div
                  className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-labx-cyan shadow-[0_0_12px_rgba(0,255,135,0.7)]"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-4 -left-4 w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(16,185,129,0.7)]"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-5xl font-black text-labx-text mb-4 uppercase tracking-tight">
              YOUR NEXT CHAPTER STARTS WITH SOMETHING YOU <span className="labx-gradient-text">BUILD.</span>
            </h2>
            <p className="text-base text-labx-text-secondary mb-8 max-w-xl mx-auto">
              Join thousands of builders, founders, mentors, and innovators creating verified proof of work.
            </p>
            <Link
              to="/projects/new"
              className="inline-flex items-center gap-2 px-9 py-3.5 rounded-xl bg-gradient-to-r from-[#22D3EE] via-[#10B981] to-[#34D399] text-black font-black text-base hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-cyan-400/30 hover:shadow-cyan-400/50"
            >
              <span>Start Building</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-xs text-labx-text-muted mt-3">Free and open ecosystem for builders worldwide.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
