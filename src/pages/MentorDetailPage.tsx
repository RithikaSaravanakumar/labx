import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ArrowLeft, CheckCircle2, Send, ShieldCheck } from 'lucide-react';
import { mentorService } from '../services';
import type { Mentor } from '../types';
import { DOMAIN_LABELS } from '../constants';
import { pageTransition } from '../animations';

export default function MentorDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Booking Form State
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [note, setNote] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    if (!id) return;
    mentorService.getMentorById(id).then(m => {
      if (m) setMentor(m);
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 border-4 border-labx-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-labx-text-muted">Loading mentor calendar...</p>
      </div>
    );
  }

  if (!mentor) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-labx-text mb-2">Mentor Not Found</h2>
        <Link to="/mentors" className="labx-button-primary px-4 py-2 rounded-xl text-xs">Return to Mentors</Link>
      </div>
    );
  }

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
  };

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <Link to="/mentors" className="inline-flex items-center gap-2 text-xs font-semibold text-labx-text-muted hover:text-labx-green mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Mentor Directory</span>
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Card Left */}
        <div className="lg:col-span-2 space-y-8">
          <div className="labx-card p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
              <img src={mentor.avatar} alt={mentor.name} className="w-24 h-24 rounded-2xl border-2 border-labx-green/60 object-cover shadow-[0_0_20px_rgba(0,255,135,0.2)]" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-labx-text">{mentor.name}</h1>
                  {mentor.isVerified && <ShieldCheck className="w-5 h-5 text-labx-green fill-labx-green/20" />}
                </div>
                <p className="text-sm text-labx-text-secondary font-medium">{mentor.title} at {mentor.company || 'Ecosystem'}</p>
                
                <div className="flex items-center gap-4 text-xs text-labx-text-muted mt-3">
                  <span className="flex items-center gap-1 text-amber-400 font-mono font-bold">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{mentor.rating} ({mentor.totalSessions} Sessions)</span>
                  </span>
                  <span>📍 {mentor.location}</span>
                </div>
              </div>
            </div>

            <h3 className="text-base font-bold text-labx-text mb-2">Biography</h3>
            <p className="text-sm text-labx-text-secondary leading-relaxed mb-6 whitespace-pre-line">
              {mentor.bio}
            </p>

            <h3 className="text-base font-bold text-labx-text mb-2">Domains & Expertise</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {mentor.expertise.map(exp => (
                <span key={exp} className="px-3 py-1 rounded-lg text-xs font-mono bg-labx-green/10 text-labx-green border border-labx-green/20 font-medium">
                  {exp}
                </span>
              ))}
              {mentor.domains.map(dom => (
                <span key={dom} className="px-3 py-1 rounded-lg text-xs font-mono bg-labx-surface text-labx-text-secondary border border-labx-border">
                  {DOMAIN_LABELS[dom]}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Office Hours Booking Form */}
        <div>
          <div className="labx-card p-6 relative overflow-hidden">
            <h3 className="text-lg font-bold text-labx-text mb-1">Book Office Hours</h3>
            <p className="text-xs text-labx-text-muted mb-6">1-on-1 30-minute virtual office hour session with {mentor.name}.</p>

            {isBooked ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-labx-text">Session Requested!</h4>
                <p className="text-xs text-labx-text-muted">A calendar invite link has been generated and sent to your email.</p>
                <button onClick={() => setIsBooked(false)} className="text-xs font-semibold text-labx-green underline pt-2">
                  Book Another Session
                </button>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-labx-text mb-1">Mentorship Topic</label>
                  <select
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-labx-surface border border-labx-border text-xs text-labx-text focus:outline-none focus:border-labx-green/50"
                  >
                    <option value="">Select Topic</option>
                    {mentor.expertise.map(exp => (
                      <option key={exp} value={exp}>{exp}</option>
                    ))}
                    <option value="pitch-deck">Pitch Deck Review</option>
                    <option value="tech-architecture">Technical Architecture Review</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-labx-text mb-1">Preferred Slot</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-labx-surface border border-labx-border text-xs text-labx-text focus:outline-none focus:border-labx-green/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-labx-text mb-1">Project Note / Questions</label>
                  <textarea
                    rows={3}
                    placeholder="Describe what project or problem you'd like feedback on..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-labx-surface border border-labx-border text-xs text-labx-text focus:outline-none focus:border-labx-green/50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full labx-button-primary py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Request 30-Min Session</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
