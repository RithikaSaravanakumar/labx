import { ShieldCheck, UserPlus, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { User } from '../../types';
import LabXPointRing from '../reputation/LabXPointRing';

interface PersonCardProps {
  person: User;
}

export default function PersonCard({ person }: PersonCardProps) {
  return (
    <div className="labx-card p-6 flex flex-col items-center text-center relative overflow-hidden group hover:-translate-y-2 transition-all">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10 mb-4">
        <LabXPointRing points={person.labxPoints} level={person.level} size={80} strokeWidth={4} />
        <img
          src={person.avatar}
          alt={person.name}
          className="w-14 h-14 rounded-full object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-labx-green/30"
        />
      </div>

      <div className="relative z-10 w-full">
        <Link to={`/profile/${person.username}`} className="text-lg font-bold text-labx-text hover:text-labx-green transition-colors flex items-center justify-center gap-1">
          {person.name}
          {person.isVerified && <ShieldCheck className="w-3.5 h-3.5 text-labx-green" />}
        </Link>
        <p className="text-xs text-labx-text-muted mb-2">@{person.username}</p>
        <p className="text-sm font-medium text-labx-text-secondary line-clamp-2 mb-4 h-10">
          {person.bio}
        </p>

        <div className="flex flex-wrap justify-center gap-1.5 mb-6">
          {person.skills.slice(0, 3).map(skill => (
            <span key={skill} className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-labx-surface border border-labx-border/60 text-labx-text-muted">
              {skill}
            </span>
          ))}
          {person.skills.length > 3 && (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-labx-surface border border-labx-border/60 text-labx-text-muted">
              +{person.skills.length - 3}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link to={`/profile/${person.username}`} className="labx-button-primary py-2 text-xs rounded-xl flex items-center justify-center gap-2">
            View Profile
          </Link>
          <button className="bg-labx-surface border border-labx-border hover:bg-labx-surface-hover text-labx-text py-2 text-xs rounded-xl font-bold transition-colors flex items-center justify-center gap-1">
            <UserPlus className="w-3 h-3" />
            Connect
          </button>
        </div>
      </div>
    </div>
  );
}
