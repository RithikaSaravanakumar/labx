import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star, TrendingUp, ShieldCheck } from 'lucide-react';
import { userService } from '../services';
import type { User } from '../types';
import { pageTransition } from '../animations';
import { Link } from 'react-router-dom';

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<'global' | 'monthly' | 'projects'>('global');
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    userService.getUsers().then(data => {
      // Sort users by points for leaderboard
      const sorted = [...data].sort((a, b) => b.labxPoints - a.labxPoints);
      setUsers(sorted);
      setIsLoading(false);
    });
  }, []);

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-labx-text tracking-tight uppercase flex items-center gap-3">
            <Trophy className="w-8 h-8 text-amber-400" />
            Global Rankings
          </h1>
          <p className="text-labx-text-secondary mt-2 max-w-xl">
            The most active builders in the ecosystem. Earn points by building in public, reaching roadmap milestones, and contributing to open projects.
          </p>
        </div>
        <div className="labx-card p-4 flex items-center gap-4 bg-gradient-to-r from-labx-surface to-labx-surface-hover border-labx-green/30">
          <div className="w-12 h-12 rounded-xl bg-labx-bg border border-labx-green/50 flex items-center justify-center">
            <span className="text-xl font-black font-mono text-labx-green">#{users.findIndex(u => u.username === 'aarav_sharma') + 1}</span>
          </div>
          <div>
            <div className="text-xs font-bold text-labx-text-muted uppercase tracking-wider">Your Global Rank</div>
            <div className="text-sm font-medium text-labx-text">Top 5% of Builders</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-labx-border mb-8 pb-1">
        {[
          { id: 'global', label: 'All-Time Global', icon: Trophy },
          { id: 'monthly', label: 'This Month', icon: TrendingUp },
          { id: 'projects', label: 'Top Projects', icon: Star },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-labx-green text-black font-bold shadow-lg shadow-emerald-500/20'
                  : 'text-labx-text-muted hover:text-labx-text hover:bg-labx-surface'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="py-12 text-center">
          <div className="w-8 h-8 border-2 border-labx-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-labx-text-muted font-medium">Calculating global standings...</p>
        </div>
      ) : activeTab === 'global' ? (
        <div className="space-y-3">
          {/* Top 3 Podium */}
          <div className="grid grid-cols-3 gap-4 mb-8 items-end px-4 sm:px-12">
            {/* 2nd Place */}
            {users[1] && (
              <div className="flex flex-col items-center">
                <div className="relative mb-2">
                  <img src={users[1].avatar} alt={users[1].name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-[#C0C0C0] object-cover" />
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#C0C0C0] border-2 border-labx-bg flex items-center justify-center text-black font-black text-sm">2</div>
                </div>
                <Link to={`/profile/${users[1].username}`} className="text-sm font-bold text-labx-text hover:text-labx-green mt-3 text-center truncate w-full">{users[1].name}</Link>
                <div className="text-xs font-mono font-bold text-[#C0C0C0] mt-1">{users[1].labxPoints.toLocaleString()} PTS</div>
                <div className="w-full h-24 bg-gradient-to-t from-labx-surface to-transparent mt-4 rounded-t-xl border-t border-x border-[#C0C0C0]/20" />
              </div>
            )}
            
            {/* 1st Place */}
            {users[0] && (
              <div className="flex flex-col items-center z-10">
                <div className="relative mb-2">
                  <Medal className="absolute -top-6 left-1/2 -translate-x-1/2 w-8 h-8 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                  <img src={users[0].avatar} alt={users[0].name} className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border-4 border-amber-400 object-cover shadow-[0_0_20px_rgba(251,191,36,0.3)]" />
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-amber-400 border-2 border-labx-bg flex items-center justify-center text-black font-black text-sm">1</div>
                </div>
                <Link to={`/profile/${users[0].username}`} className="text-base font-bold text-labx-text hover:text-amber-400 mt-3 text-center truncate w-full flex justify-center items-center gap-1">
                  {users[0].name}
                  {users[0].isVerified && <ShieldCheck className="w-3.5 h-3.5 text-labx-green" />}
                </Link>
                <div className="text-sm font-mono font-black text-amber-400 mt-1">{users[0].labxPoints.toLocaleString()} PTS</div>
                <div className="w-full h-32 bg-gradient-to-t from-amber-500/10 to-transparent mt-4 rounded-t-xl border-t border-x border-amber-400/30" />
              </div>
            )}

            {/* 3rd Place */}
            {users[2] && (
              <div className="flex flex-col items-center">
                <div className="relative mb-2">
                  <img src={users[2].avatar} alt={users[2].name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-[#CD7F32] object-cover" />
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#CD7F32] border-2 border-labx-bg flex items-center justify-center text-black font-black text-sm">3</div>
                </div>
                <Link to={`/profile/${users[2].username}`} className="text-sm font-bold text-labx-text hover:text-labx-green mt-3 text-center truncate w-full">{users[2].name}</Link>
                <div className="text-xs font-mono font-bold text-[#CD7F32] mt-1">{users[2].labxPoints.toLocaleString()} PTS</div>
                <div className="w-full h-20 bg-gradient-to-t from-labx-surface to-transparent mt-4 rounded-t-xl border-t border-x border-[#CD7F32]/20" />
              </div>
            )}
          </div>

          {/* Rest of Leaderboard */}
          <div className="labx-card overflow-hidden">
            {users.slice(3).map((user, index) => (
              <div key={user.id} className="flex items-center justify-between p-4 border-b border-labx-border/50 hover:bg-labx-surface/50 transition-colors last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-8 text-center text-sm font-mono font-bold text-labx-text-muted">
                    {index + 4}
                  </div>
                  <Link to={`/profile/${user.username}`}>
                    <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-xl object-cover" />
                  </Link>
                  <div>
                    <Link to={`/profile/${user.username}`} className="text-sm font-bold text-labx-text hover:text-labx-green flex items-center gap-1">
                      {user.name}
                      {user.isVerified && <ShieldCheck className="w-3 h-3 text-labx-green" />}
                    </Link>
                    <div className="text-xs text-labx-text-secondary mt-0.5">{user.bio.substring(0, 50)}...</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black font-mono text-labx-green">{user.labxPoints.toLocaleString()}</div>
                  <div className="text-[10px] text-labx-text-muted uppercase tracking-widest mt-0.5">Points</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="labx-card p-12 text-center">
          <TrendingUp className="w-12 h-12 text-labx-text-muted mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-bold text-labx-text mb-2">Coming Soon</h3>
          <p className="text-labx-text-secondary">This leaderboard view is currently calculating data.</p>
        </div>
      )}
    </motion.div>
  );
}
