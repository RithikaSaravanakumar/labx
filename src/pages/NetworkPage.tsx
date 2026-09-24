import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, UserCheck, Users, Search } from 'lucide-react';
import { networkService } from '../services';
import type { User } from '../types';
import { pageTransition } from '../animations';
import { Link } from 'react-router-dom';

export default function NetworkPage() {
  const [activeTab, setActiveTab] = useState<'connections' | 'requests' | 'following' | 'followers'>('connections');
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const userId = 'current-user'; // Mock current user
    let fetchPromise;

    switch (activeTab) {
      case 'connections':
        fetchPromise = networkService.getConnections(userId);
        break;
      case 'requests':
        fetchPromise = networkService.getPendingRequests();
        break;
      case 'following':
        fetchPromise = networkService.getFollowing(userId);
        break;
      case 'followers':
        fetchPromise = networkService.getFollowers(userId);
        break;
    }

    fetchPromise.then(data => {
      setUsers(data);
      setIsLoading(false);
    });
  }, [activeTab]);

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-labx-text tracking-tight uppercase">My Network</h1>
          <p className="text-labx-text-secondary mt-1">Manage your connections and followers.</p>
        </div>
        <Link
          to="/discover"
          className="labx-button-primary px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          Discover People
        </Link>
      </div>

      <div className="flex gap-2 border-b border-labx-border mb-8 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'connections', label: 'Connections', icon: Users },
          { id: 'requests', label: 'Pending Requests', icon: UserPlus },
          { id: 'following', label: 'Following', icon: UserCheck },
          { id: 'followers', label: 'Followers', icon: Users },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-labx-cyan text-black font-bold shadow-lg shadow-cyan-400/20'
                  : 'text-labx-text-muted hover:text-labx-text hover:bg-labx-surface'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {isLoading ? (
        <div className="py-12 text-center">
          <div className="w-8 h-8 border-2 border-labx-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-labx-text-muted">Loading network graph...</p>
        </div>
      ) : users.length === 0 ? (
        <div className="py-16 text-center bg-labx-surface border border-labx-border rounded-2xl">
          <Users className="w-12 h-12 text-labx-text-muted mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-bold text-labx-text mb-2">No {activeTab} yet</h3>
          <p className="text-labx-text-secondary max-w-md mx-auto mb-6">
            Start building your professional network. Follow builders and send connection requests to collaborate on projects.
          </p>
          <Link to="/discover" className="labx-button-primary px-6 py-2 rounded-xl text-sm">
            Find Builders
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map(user => (
            <Link key={user.id} to={`/profile/${user.username}`} className="labx-card p-6 flex items-start gap-4 hover:-translate-y-1 transition-transform group">
              <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-xl object-cover border border-labx-border" />
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-labx-text truncate group-hover:text-labx-cyan transition-colors">{user.name}</h3>
                <p className="text-xs text-labx-text-muted truncate mb-2">@{user.username}</p>
                <p className="text-sm text-labx-text-secondary line-clamp-2">{user.bio}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </motion.div>
  );
}
