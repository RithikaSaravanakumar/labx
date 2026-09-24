import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Users } from 'lucide-react';
import { projectService, startupService, mentorService, hackathonService, opportunityService, userService } from '../services';
import { DOMAIN_LABELS, DOMAIN_COLORS, STAGE_LABELS } from '../constants';
import { staggerContainer, staggerItem, pageTransition } from '../animations';
import PersonCard from '../components/network/PersonCard';
import type { Project, Startup, Mentor, Hackathon, Opportunity, User } from '../types';

type Tab = 'projects' | 'startups' | 'people' | 'mentors' | 'hackathons' | 'opportunities';

const tabs: { value: Tab; label: string }[] = [
  { value: 'projects', label: 'Projects' },
  { value: 'startups', label: 'Startups' },
  { value: 'people', label: 'People' },
  { value: 'mentors', label: 'Mentors' },
  { value: 'hackathons', label: 'Hackathons' },
  { value: 'opportunities', label: 'Opportunities' },
];

export default function DiscoverPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const initialTab = (searchParams.get('tab') as Tab) || 'projects';
  // Ensure the tab is valid
  const validTab = tabs.find(t => t.value === initialTab) ? initialTab : 'projects';
  
  const [activeTab, setActiveTab] = useState<Tab>(validTab);
  const [search, setSearch] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [startups, setStartups] = useState<Startup[]>([]);
  const [people, setPeople] = useState<User[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tabParam = searchParams.get('tab') as Tab;
    if (tabParam && tabs.find(t => t.value === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const loadData = async () => {
      const [p, s, ppl, m, h, o] = await Promise.all([
        projectService.getProjects({ search }),
        startupService.getStartups({ search }),
        userService.getUsers(), // Implement search in backend, returning all mock users for now
        mentorService.getMentors({ search }),
        hackathonService.getHackathons(),
        opportunityService.getOpportunities({ search }),
      ]);
      setProjects(p);
      setStartups(s);
      setPeople(ppl.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.skills.some(skill => skill.toLowerCase().includes(search.toLowerCase()))));
      setMentors(m);
      setHackathons(h);
      setOpportunities(o);
      setIsLoading(false);
    };
    loadData();
  }, [search]);

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-labx-text mb-2 tracking-tight uppercase">Discover Ecosystem</h1>
        <p className="text-labx-text-secondary">Explore projects, startups, mentors, and opportunities</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-labx-text-muted" />
        <input
          type="text"
          placeholder="Search projects, startups, mentors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-labx-surface border border-labx-border text-labx-text placeholder-labx-text-muted focus:border-emerald-400 focus:outline-none transition-colors"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map(tab => (
          <button
            key={tab.value}
            onClick={() => {
              setActiveTab(tab.value);
              setSearchParams({ tab: tab.value });
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
              activeTab === tab.value
                ? 'bg-[#00FF87] text-black shadow-md shadow-emerald-500/25'
                : 'bg-labx-surface text-labx-text-secondary hover:text-white border border-transparent hover:border-emerald-500/20'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="labx-card p-6 animate-pulse">
              <div className="h-4 bg-labx-surface rounded w-1/3 mb-4" />
              <div className="h-5 bg-labx-surface rounded w-2/3 mb-2" />
              <div className="h-4 bg-labx-surface rounded w-full mb-4" />
              <div className="h-2 bg-labx-surface rounded w-full" />
            </div>
          ))}
        </div>
      ) : (
        <>
          {activeTab === 'projects' && (
            <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" variants={staggerContainer} initial="hidden" animate="visible">
              {projects.map(project => (
                <motion.div key={project.id} variants={staggerItem}>
                  <Link to={`/projects/${project.id}`} className="labx-card p-6 block h-full group">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ backgroundColor: `${DOMAIN_COLORS[project.domain]}20`, color: DOMAIN_COLORS[project.domain] }}>
                        {DOMAIN_LABELS[project.domain]}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-labx-surface text-labx-text-muted uppercase">{STAGE_LABELS[project.stage]}</span>
                    </div>
                    <h3 className="text-lg font-bold text-labx-text mb-2 group-hover:text-labx-green transition-colors">{project.name}</h3>
                    <p className="text-sm text-labx-text-secondary mb-4 line-clamp-2">{project.description}</p>
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-labx-text-muted">Progress</span>
                        <span className="text-labx-green font-mono font-bold">{project.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-labx-bg rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-labx-green to-emerald-400" style={{ width: `${project.progress}%` }} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-labx-text-muted" />
                        <span className="text-xs text-labx-text-muted">{project.contributorCount} builders</span>
                      </div>
                      <div className="flex gap-1">
                        {project.techStack.slice(0, 3).map(tech => (
                          <span key={tech} className="px-1.5 py-0.5 rounded text-[10px] bg-labx-bg text-labx-text-muted">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'startups' && (
            <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" variants={staggerContainer} initial="hidden" animate="visible">
              {startups.map(startup => (
                <motion.div key={startup.id} variants={staggerItem}>
                  <Link to={`/startups/${startup.id}`} className="labx-card p-6 block h-full group">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ backgroundColor: `${DOMAIN_COLORS[startup.domain]}20`, color: DOMAIN_COLORS[startup.domain] }}>
                        {DOMAIN_LABELS[startup.domain]}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-labx-surface text-labx-text-muted uppercase">{STAGE_LABELS[startup.stage]}</span>
                    </div>
                    <h3 className="text-lg font-bold text-labx-text mb-2 group-hover:text-labx-green transition-colors">{startup.name}</h3>
                    <p className="text-sm text-labx-text-secondary mb-3 line-clamp-2">{startup.description}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <img src={startup.founderAvatar} alt={startup.founderName} className="w-6 h-6 rounded-full" />
                      <span className="text-xs text-labx-text-muted">{startup.founderName}</span>
                    </div>
                    {startup.traction.length > 0 && (
                      <div className="flex gap-3 pt-3 border-t border-labx-border">
                        {startup.traction.slice(0, 2).map(t => (
                          <div key={t.label}>
                            <div className="text-sm font-bold text-labx-text">{t.value}</div>
                            <div className="text-[10px] text-labx-text-muted">{t.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'people' && (
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" variants={staggerContainer} initial="hidden" animate="visible">
              {people.map(person => (
                <motion.div key={person.id} variants={staggerItem}>
                  <PersonCard person={person} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'mentors' && (
            <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" variants={staggerContainer} initial="hidden" animate="visible">
              {mentors.map(mentor => (
                <motion.div key={mentor.id} variants={staggerItem}>
                  <Link to={`/mentors/${mentor.id}`} className="labx-card p-6 block text-center group">
                    <img src={mentor.avatar} alt={mentor.name} className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-labx-border group-hover:border-labx-green transition-colors" />
                    <h3 className="text-sm font-bold text-labx-text">{mentor.name}</h3>
                    <p className="text-xs text-labx-text-muted mb-2">{mentor.title}</p>
                    <div className="flex flex-wrap justify-center gap-1 mb-3">
                      {mentor.expertise.slice(0, 2).map(e => (
                        <span key={e} className="px-2 py-0.5 rounded-full text-[10px] bg-labx-green/10 text-labx-green border border-labx-green/20">{e}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-center gap-2 text-xs text-labx-text-muted">
                      <span>⭐ {mentor.rating}</span>
                      <span>·</span>
                      <span className={`${mentor.availability === 'available' ? 'text-labx-success' : 'text-labx-warning'}`}>{mentor.availability}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'hackathons' && (
            <motion.div className="grid md:grid-cols-2 gap-6" variants={staggerContainer} initial="hidden" animate="visible">
              {hackathons.map(hackathon => (
                <motion.div key={hackathon.id} variants={staggerItem}>
                  <Link to={`/hackathons/${hackathon.id}`} className="labx-card p-6 block group">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        hackathon.status === 'live' ? 'bg-labx-success/20 text-labx-success' :
                        hackathon.status === 'upcoming' ? 'bg-labx-green/20 text-labx-green border border-labx-green/30' :
                        'bg-labx-surface text-labx-text-muted'
                      }`}>
                        {hackathon.status === 'live' ? '🔴 Live' : hackathon.status}
                      </span>
                      {hackathon.isFeatured && <span className="px-2 py-0.5 rounded-full text-[10px] bg-labx-warning/20 text-labx-warning font-medium">Featured</span>}
                    </div>
                    <h3 className="text-lg font-bold text-labx-text mb-1 group-hover:text-labx-green transition-colors">{hackathon.name}</h3>
                    <p className="text-xs text-labx-text-muted mb-2">{hackathon.organizer}</p>
                    <p className="text-sm text-labx-text-secondary mb-4 line-clamp-2">{hackathon.description}</p>
                    <div className="flex items-center gap-4 text-xs text-labx-text-muted">
                      <span>👥 {hackathon.participants} participants</span>
                      <span>🏆 {hackathon.prize}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'opportunities' && (
            <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" variants={staggerContainer} initial="hidden" animate="visible">
              {opportunities.map(opp => (
                <motion.div key={opp.id} variants={staggerItem} className="labx-card p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-labx-green/10 text-labx-green border border-labx-green/20">{opp.type}</span>
                    {opp.isRemote && <span className="px-2 py-0.5 rounded-full text-[10px] bg-labx-surface text-labx-text-muted">Remote</span>}
                  </div>
                  <h3 className="text-base font-bold text-labx-text mb-1">{opp.title}</h3>
                  <p className="text-xs text-labx-text-muted mb-2">{opp.organization}</p>
                  <p className="text-sm text-labx-text-secondary mb-4 line-clamp-2">{opp.description}</p>
                  <div className="flex items-center justify-between text-xs text-labx-text-muted">
                    <span>📅 Deadline: {new Date(opp.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    <span>📍 {opp.location}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
}
