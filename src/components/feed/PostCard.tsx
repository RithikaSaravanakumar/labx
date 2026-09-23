import { useState } from 'react';
import { Heart, MessageSquare, Share2, Bookmark, Trophy, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Post } from '../../types';
import { formatRelativeTime } from '../../utils';

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
}

export default function PostCard({ post, onLike }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLikedByMe);
  const [likes, setLikes] = useState(post.likesCount);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    onLike?.(post.id);
  };

  return (
    <div className="labx-card p-5 sm:p-6 mb-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.authorId}`}>
            <img src={post.authorAvatar} alt={post.authorName} className="w-12 h-12 rounded-xl object-cover border border-labx-green/30" />
          </Link>
          <div>
            <Link to={`/profile/${post.authorId}`} className="text-base font-bold text-labx-text hover:text-labx-green transition-colors">
              {post.authorName}
            </Link>
            <p className="text-xs text-labx-text-muted">{post.authorHeadline}</p>
            <p className="text-[10px] text-labx-text-secondary mt-0.5">{formatRelativeTime(post.createdAt)}</p>
          </div>
        </div>
        
        {post.type === 'build_in_public' && (
          <span className="px-3 py-1 bg-labx-green/10 border border-labx-green/20 text-labx-green rounded-full text-[10px] font-bold uppercase tracking-wider hidden sm:block">
            Building in Public
          </span>
        )}
      </div>

      <div className="mb-4">
        <p className="text-sm text-labx-text whitespace-pre-wrap">{post.content}</p>
      </div>

      {post.projectId && (
        <div className="mb-4 p-4 rounded-xl bg-labx-bg border border-labx-border/60">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-labx-text uppercase tracking-wider">Project Milestone</span>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <Link to={`/projects/${post.projectId}`} className="text-sm font-bold text-labx-green hover:underline">
                {post.projectName}
              </Link>
              {post.milestoneTitle && <p className="text-xs text-labx-text-secondary mt-1">{post.milestoneTitle}</p>}
            </div>
            {post.labxPointsEarned && (
              <span className="text-xs font-mono font-bold text-amber-400">+{post.labxPointsEarned} PTS</span>
            )}
          </div>
        </div>
      )}

      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs text-labx-green hover:underline cursor-pointer">#{tag}</span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-labx-border/60">
        <div className="flex items-center gap-6">
          <button 
            onClick={handleLike}
            className={`flex items-center gap-2 text-xs font-semibold transition-colors ${isLiked ? 'text-labx-green' : 'text-labx-text-muted hover:text-labx-text'}`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-labx-green' : ''}`} />
            <span>{likes}</span>
          </button>
          <button className="flex items-center gap-2 text-xs font-semibold text-labx-text-muted hover:text-labx-text transition-colors">
            <MessageSquare className="w-4 h-4" />
            <span>{post.commentsCount}</span>
          </button>
          <button className="flex items-center gap-2 text-xs font-semibold text-labx-text-muted hover:text-labx-text transition-colors">
            <Share2 className="w-4 h-4" />
            <span>{post.sharesCount}</span>
          </button>
        </div>
        <button className="text-labx-text-muted hover:text-labx-text transition-colors">
          <Bookmark className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
