import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Flame, TrendingUp } from 'lucide-react';
import PostCard from '../components/feed/PostCard';
import PostComposer from '../components/feed/PostComposer';
import { feedService, userService, projectService } from '../services';
import type { Post, User, Project } from '../types';
import { pageTransition } from '../animations';
import { Link } from 'react-router-dom';
import ProjectPulseCard from '../components/projects/ProjectPulseCard';

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState<'for-you' | 'following' | 'trending'>('for-you');
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [trendingProjects, setTrendingProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      feedService.getPosts(),
      userService.getCurrentUser(),
      projectService.getTrendingProjects()
    ]).then(([postsResponse, user, projects]) => {
      setPosts(postsResponse.data);
      setCurrentUser(user);
      setTrendingProjects(projects.slice(0, 2));
      setIsLoading(false);
    });
  }, []);

  const handlePostSubmit = async (content: string, type: string) => {
    const newPost = await feedService.createPost({ content, type: type as any });
    setPosts(prev => [newPost, ...prev]);
  };

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Sidebar - Profile Snippet */}
        <div className="hidden lg:block space-y-6">
          {currentUser && (
            <div className="labx-card p-6">
              <div className="flex flex-col items-center text-center">
                <Link to={`/profile/${currentUser.username}`}>
                  <img src={currentUser.avatar} alt={currentUser.name} className="w-20 h-20 rounded-full object-cover border-2 border-labx-cyan/60 mb-3 hover:scale-105 transition-transform" />
                </Link>
                <Link to={`/profile/${currentUser.username}`} className="text-lg font-bold text-labx-text hover:text-labx-cyan transition-colors">
                  {currentUser.name}
                </Link>
                <p className="text-xs text-labx-text-muted mt-1">{currentUser.bio}</p>
              </div>
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-labx-border/60 text-sm">
                <span className="text-labx-text-muted font-medium">Following</span>
                <span className="font-bold text-labx-text">{currentUser.followingCount?.toLocaleString() || 0}</span>
              </div>
              <div className="flex items-center justify-between mt-3 text-sm">
                <span className="text-labx-text-muted font-medium">Followers</span>
                <span className="font-bold text-labx-text">{currentUser.followersCount?.toLocaleString() || 0}</span>
              </div>
            </div>
          )}

          <div className="labx-card p-6">
            <h3 className="text-sm font-bold text-labx-text mb-4 uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-300" />
              Trending Projects
            </h3>
            <div className="space-y-4">
              {trendingProjects.map(project => (
                <Link key={project.id} to={`/projects/${project.id}`} className="block group">
                  <h4 className="text-sm font-bold text-labx-text group-hover:text-labx-cyan transition-colors line-clamp-1">{project.name}</h4>
                  <p className="text-xs text-labx-text-muted line-clamp-1 mt-1">{project.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Main Feed Column */}
        <div className="lg:col-span-2">
          {/* Header & Tabs */}
          <div className="mb-6">
            <h1 className="text-2xl font-black text-labx-text mb-4 uppercase tracking-tight">Community Feed</h1>
            <div className="flex gap-2 border-b border-labx-border pb-1">
              {[
                { id: 'for-you', label: 'For You', icon: Activity },
                { id: 'following', label: 'Following', icon: Flame },
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      activeTab === tab.id
                        ? 'bg-labx-surface border border-labx-border text-labx-cyan'
                        : 'text-labx-text-muted hover:text-labx-text hover:bg-labx-surface/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Composer */}
          {currentUser && <PostComposer currentUser={currentUser} onSubmit={handlePostSubmit} />}

          {/* Feed Content */}
          {isLoading ? (
            <div className="py-12 text-center">
              <div className="w-8 h-8 border-2 border-labx-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-labx-text-muted font-medium">Syncing ecosystem activity...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="labx-card p-12 text-center">
              <Activity className="w-12 h-12 text-labx-text-muted mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-labx-text mb-2">No activity found</h3>
              <p className="text-labx-text-secondary">Start following builders and projects to see their updates here.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
