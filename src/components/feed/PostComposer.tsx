import { useState } from 'react';
import { Send, Image as ImageIcon, Link2, Hash } from 'lucide-react';
import type { User } from '../../types';

interface PostComposerProps {
  currentUser: User;
  onSubmit: (content: string, type: string) => Promise<void>;
}

export default function PostComposer({ currentUser, onSubmit }: PostComposerProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBuildInPublic, setIsBuildInPublic] = useState(true);

  const handleSubmit = async () => {
    if (!content.trim() || isSubmitting) return;
    setIsSubmitting(true);
    await onSubmit(content, isBuildInPublic ? 'build_in_public' : 'text');
    setContent('');
    setIsSubmitting(false);
  };

  return (
    <div className="labx-card p-4 sm:p-6 mb-8 border-2 border-transparent focus-within:border-labx-cyan/30 transition-colors">
      <div className="flex gap-4">
        <img src={currentUser.avatar} alt="You" className="w-12 h-12 rounded-xl object-cover" />
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share an update on what you're building..."
            className="w-full bg-transparent text-labx-text placeholder-labx-text-muted resize-none focus:outline-none min-h-[80px]"
          />
          
          <div className="flex flex-wrap items-center justify-between pt-3 border-t border-labx-border/60 gap-4 mt-2">
            <div className="flex items-center gap-4 text-labx-text-muted">
              <button className="hover:text-labx-cyan transition-colors flex items-center gap-1 text-xs font-semibold">
                <ImageIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Media</span>
              </button>
              <button className="hover:text-labx-cyan transition-colors flex items-center gap-1 text-xs font-semibold">
                <Link2 className="w-4 h-4" />
                <span className="hidden sm:inline">Link</span>
              </button>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={isBuildInPublic}
                  onChange={(e) => setIsBuildInPublic(e.target.checked)}
                  className="w-4 h-4 rounded border-labx-border bg-labx-bg text-labx-cyan focus:ring-labx-cyan focus:ring-offset-labx-surface"
                />
                <span className={`text-xs font-semibold uppercase tracking-wide transition-colors ${isBuildInPublic ? 'text-labx-cyan' : 'text-labx-text-muted group-hover:text-labx-text'}`}>
                  Build in Public
                </span>
              </label>
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={!content.trim() || isSubmitting}
              className="labx-button-primary px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Post
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
