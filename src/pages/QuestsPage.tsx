import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target, Trophy, Users, UserPlus, Award, Megaphone, GitCommit,
  Map, MessageCircle, Layers, User, FolderKanban, CheckCircle,
  Lock, Clock, Zap, ChevronRight, Star
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { questService } from '../services';
import type { Quest, QuestCategory, QuestStatus } from '../types';
import { pageTransition } from '../animations';

// ===== Icon Mapping =====
const QUEST_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  User,
  FolderKanban,
  Target,
  GitCommit,
  UserPlus,
  Users,
  Award,
  Megaphone,
  Map,
  Trophy,
  MessageCircle,
  Layers,
};

// ===== Category Colors =====
const CATEGORY_STYLES: Record<QuestCategory, { color: string; bg: string; label: string }> = {
  identity: { color: '#22D3EE', bg: 'rgba(34,211,238,0.1)', label: 'Identity' },
  builder: { color: '#0EA5E9', bg: 'rgba(14,165,233,0.1)', label: 'Builder' },
  community: { color: '#A855F7', bg: 'rgba(168,85,247,0.1)', label: 'Community' },
  collaboration: { color: '#7C3AED', bg: 'rgba(124,58,237,0.1)', label: 'Collaboration' },
  milestone: { color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', label: 'Milestone' },
  achievement: { color: '#C4B5FD', bg: 'rgba(196,181,253,0.1)', label: 'Achievement' },
};

// ===== Status badge =====
function QuestStatusBadge({ status }: { status: QuestStatus }) {
  const map: Record<QuestStatus, { icon: React.ReactNode; label: string; cls: string }> = {
    LOCKED: { icon: <Lock className="w-3 h-3" />, label: 'Locked', cls: 'text-zinc-500 bg-zinc-800/60 border-zinc-700' },
    ACTIVE: { icon: <Zap className="w-3 h-3" />, label: 'Active', cls: 'text-[#22D3EE] bg-[#22D3EE]/10 border-[#22D3EE]/30' },
    IN_PROGRESS: { icon: <Clock className="w-3 h-3" />, label: 'In Progress', cls: 'text-[#0EA5E9] bg-[#0EA5E9]/10 border-[#0EA5E9]/30' },
    COMPLETED: { icon: <CheckCircle className="w-3 h-3" />, label: 'Completed', cls: 'text-[#A855F7] bg-[#A855F7]/10 border-[#A855F7]/30' },
    CLAIMED: { icon: <Star className="w-3 h-3" />, label: 'Claimed', cls: 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/30' },
    EXPIRED: { icon: <Clock className="w-3 h-3" />, label: 'Expired', cls: 'text-red-400 bg-red-500/10 border-red-500/30' },
  };
  const { icon, label, cls } = map[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${cls}`}>
      {icon}
      {label}
    </span>
  );
}

// ===== Reward Claim Animation =====
function RewardClaimedAnimation({ points, onDone }: { points: number; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
    >
      <motion.div
        initial={{ scale: 0.3, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: -30 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className="flex flex-col items-center gap-4"
      >
        {/* Golden Coin */}
        <motion.div
          animate={{ rotateY: [0, 360], scale: [1, 1.15, 1] }}
          transition={{ rotateY: { duration: 1.2, ease: 'easeInOut' }, scale: { duration: 0.6, delay: 0.3 } }}
          className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FCD34D] via-[#F59E0B] to-[#D97706] flex items-center justify-center shadow-[0_0_60px_rgba(245,158,11,0.7)]"
          style={{ perspective: '600px' }}
        >
          <span className="text-4xl font-black text-[#78350F] select-none" style={{ fontFamily: 'serif' }}>X</span>
        </motion.div>

        {/* Points text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <div className="text-4xl font-black text-[#F59E0B] tabular-nums">
            +{points.toLocaleString()}
          </div>
          <div className="text-sm font-bold text-[#FCD34D] tracking-widest uppercase mt-1">
            LabX Points
          </div>
        </motion.div>

        {/* REWARD CLAIMED text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="px-6 py-2 rounded-full bg-[#F59E0B]/20 border border-[#F59E0B]/40 text-[#F59E0B] text-xs font-black tracking-widest uppercase"
        >
          Reward Claimed
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ===== Quest Card =====
interface QuestCardProps {
  quest: Quest;
  onClaim: (questId: string) => Promise<void>;
  isClaimLoading: string | null;
}

function QuestCard({ quest, onClaim, isClaimLoading }: QuestCardProps) {
  const Icon = QUEST_ICONS[quest.icon] || Target;
  const catStyle = CATEGORY_STYLES[quest.category];
  const progressPct = quest.target > 0 ? Math.round((quest.progress / quest.target) * 100) : 0;
  const isClaimable = quest.status === 'COMPLETED';
  const isClaimed = quest.status === 'CLAIMED';
  const isLocked = quest.status === 'LOCKED';
  const isLoading = isClaimLoading === quest.id;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={!isLocked ? { y: -4 } : {}}
      className={`relative rounded-2xl border p-5 transition-all duration-300 ${
        isClaimed
          ? 'bg-[#0D1020] border-[#F59E0B]/30 shadow-[0_0_20px_rgba(245,158,11,0.08)]'
          : isClaimable
          ? 'bg-[#0D1020] border-[#A855F7]/40 shadow-[0_0_20px_rgba(168,85,247,0.15)]'
          : isLocked
          ? 'bg-[#08090F] border-[#1A2040]/50 opacity-60'
          : 'bg-[#0D1020] border-[#1A2040] hover:border-[#22D3EE]/30'
      }`}
    >
      {/* Claimed shimmer overlay */}
      {isClaimed && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#F59E0B]/5 to-transparent pointer-events-none" />
      )}

      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 relative"
          style={{ background: catStyle.bg }}
        >
          <Icon className="w-5 h-5" style={{ color: catStyle.color }} />
          {isClaimable && (
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#A855F7]"
            />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className={`text-sm font-bold ${isLocked ? 'text-zinc-500' : 'text-white'}`}>
                  {quest.title}
                </h3>
                <QuestStatusBadge status={quest.status} />
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">{quest.description}</p>
            </div>
          </div>

          {/* Progress bar */}
          {!isLocked && quest.target > 1 && (
            <div className="mt-3 mb-2">
              <div className="flex justify-between text-[10px] text-zinc-500 mb-1">
                <span>Progress</span>
                <span className="font-mono">{quest.progress}/{quest.target}</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-[#22D3EE] to-[#7C3AED]"
                />
              </div>
            </div>
          )}

          {/* Requirements (locked) */}
          {isLocked && quest.requirements && quest.requirements.length > 0 && (
            <div className="mt-2">
              {quest.requirements.map((req, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[11px] text-zinc-600 mt-1">
                  <Lock className="w-3 h-3" />
                  <span>{req}</span>
                </div>
              ))}
            </div>
          )}

          {/* Footer: reward + action */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
            {/* Reward */}
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#FCD34D] to-[#F59E0B] flex items-center justify-center">
                <span className="text-[8px] font-black text-[#78350F]">X</span>
              </div>
              <span className="text-xs font-bold text-[#F59E0B]">+{quest.rewardPoints.toLocaleString()} pts</span>
            </div>

            {/* CTA */}
            {isClaimed ? (
              <div className="flex items-center gap-1.5 text-[#F59E0B] text-xs font-bold">
                <CheckCircle className="w-4 h-4" />
                <span>Claimed</span>
              </div>
            ) : isClaimable ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onClaim(quest.id)}
                disabled={isLoading}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#A855F7] to-[#7C3AED] text-white text-xs font-bold hover:brightness-110 transition-all disabled:opacity-60 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
              >
                {isLoading ? (
                  <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Zap className="w-3.5 h-3.5" />
                )}
                <span>Claim Reward</span>
              </motion.button>
            ) : isLocked ? (
              <div className="text-[10px] text-zinc-600 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>Locked</span>
              </div>
            ) : (
              <div className="text-[10px] text-zinc-500 flex items-center gap-1">
                <ChevronRight className="w-3 h-3" />
                <span>In progress</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ===== Main QuestsPage =====
export default function QuestsPage() {
  const { user: currentUser, refreshUser } = useAuth();
  const [quests, setQuests] = useState<Quest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | QuestStatus>('all');
  const [claimLoading, setClaimLoading] = useState<string | null>(null);
  const [rewardAnimation, setRewardAnimation] = useState<{ visible: boolean; points: number }>({
    visible: false,
    points: 0,
  });

  const loadQuests = useCallback(async () => {
    if (!currentUser) return;
    setIsLoading(true);
    const data = await questService.getQuests(currentUser.id);
    setQuests(data);
    setIsLoading(false);
  }, [currentUser]);

  useEffect(() => {
    loadQuests();
  }, [loadQuests]);

  const handleClaimReward = async (questId: string) => {
    if (!currentUser || claimLoading) return;
    setClaimLoading(questId);
    try {
      const result = await questService.claimReward(currentUser.id, questId);
      // Refresh quests list
      const updated = await questService.getQuests(currentUser.id);
      setQuests(updated);
      // Show animation
      setRewardAnimation({ visible: true, points: result.pointsAwarded });
      // Refresh user points
      await refreshUser();
    } catch (err) {
      console.error('Claim error:', err);
    } finally {
      setClaimLoading(null);
    }
  };

  const filteredQuests = activeFilter === 'all'
    ? quests
    : quests.filter(q => q.status === activeFilter);

  const stats = {
    total: quests.length,
    completed: quests.filter(q => q.status === 'COMPLETED' || q.status === 'CLAIMED').length,
    claimed: quests.filter(q => q.status === 'CLAIMED').length,
    totalPoints: quests.filter(q => q.status === 'CLAIMED').reduce((sum, q) => sum + q.rewardPoints, 0),
  };

  const filters: Array<{ value: 'all' | QuestStatus; label: string; count?: number }> = [
    { value: 'all', label: 'All', count: quests.length },
    { value: 'ACTIVE', label: 'Active', count: quests.filter(q => q.status === 'ACTIVE').length },
    { value: 'IN_PROGRESS', label: 'In Progress', count: quests.filter(q => q.status === 'IN_PROGRESS').length },
    { value: 'COMPLETED', label: 'Completed', count: quests.filter(q => q.status === 'COMPLETED').length },
    { value: 'CLAIMED', label: 'Claimed', count: quests.filter(q => q.status === 'CLAIMED').length },
    { value: 'LOCKED', label: 'Locked', count: quests.filter(q => q.status === 'LOCKED').length },
  ].filter(f => f.count === undefined || f.count > 0 || f.value === 'all');

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Reward Claim Animation Overlay */}
      <AnimatePresence>
        {rewardAnimation.visible && (
          <RewardClaimedAnimation
            points={rewardAnimation.points}
            onDone={() => setRewardAnimation({ visible: false, points: 0 })}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#22D3EE]/20 to-[#7C3AED]/20 flex items-center justify-center border border-[#22D3EE]/20">
            <Target className="w-5 h-5 text-[#22D3EE]" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              LabX Quests
            </h1>
            <p className="text-sm text-zinc-400">
              Complete quests to earn LabX Points and unlock your builder reputation.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Quests', value: stats.total, color: '#22D3EE' },
          { label: 'Completed', value: stats.completed, color: '#A855F7' },
          { label: 'Claimed', value: stats.claimed, color: '#F59E0B' },
          { label: 'Points Earned', value: `${stats.totalPoints.toLocaleString()}`, color: '#F59E0B' },
        ].map(stat => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -3 }}
            className="rounded-xl bg-[#0D1020] border border-[#1A2040] p-4"
          >
            <div className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {filters.map(f => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeFilter === f.value
                ? 'bg-gradient-to-r from-[#22D3EE] to-[#7C3AED] text-white shadow-sm'
                : 'bg-[#0D1020] border border-[#1A2040] text-zinc-400 hover:text-white hover:border-[#22D3EE]/30'
            }`}
          >
            {f.label}
            {f.count !== undefined && (
              <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${
                activeFilter === f.value ? 'bg-white/20' : 'bg-white/5'
              }`}>
                {f.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Quest Grid */}
      {isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="rounded-2xl bg-[#0D1020] border border-[#1A2040] p-5 h-40 animate-pulse" />
          ))}
        </div>
      ) : filteredQuests.length === 0 ? (
        <div className="rounded-2xl bg-[#0D1020] border border-[#1A2040] p-12 text-center">
          <Target className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
          <p className="text-zinc-400 font-medium">No quests in this category.</p>
          <button
            onClick={() => setActiveFilter('all')}
            className="mt-3 text-[#22D3EE] text-sm hover:underline"
          >
            View all quests
          </button>
        </div>
      ) : (
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredQuests.map(quest => (
              <QuestCard
                key={quest.id}
                quest={quest}
                onClaim={handleClaimReward}
                isClaimLoading={claimLoading}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Demo: Simulate completing a quest */}
      {process.env.NODE_ENV !== 'production' && currentUser && (
        <div className="mt-12 pt-8 border-t border-[#1A2040]">
          <p className="text-xs text-zinc-600 mb-3 uppercase tracking-wider font-bold">Dev Tools — Simulate Quest Progress</p>
          <div className="flex flex-wrap gap-2">
            {quests.filter(q => q.status !== 'CLAIMED' && q.status !== 'LOCKED' && q.status !== 'COMPLETED').slice(0, 4).map(q => (
              <button
                key={q.id}
                onClick={async () => {
                  await questService.simulateQuestCompletion(currentUser.id, q.id);
                  await loadQuests();
                }}
                className="px-3 py-1.5 rounded-lg bg-[#0D1020] border border-[#1A2040] text-zinc-500 hover:text-white text-xs transition-all"
              >
                Complete: {q.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
