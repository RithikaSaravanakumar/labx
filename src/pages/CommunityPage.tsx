import { motion } from 'framer-motion';
import { pageTransition } from '../animations';
import { mockUsers } from '../data/mockData';

export default function CommunityPage() {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-labx-cyan/10 text-labx-cyan border border-labx-cyan/20">
          Peer Builder Network
        </span>
        <span className="text-xs text-labx-text-muted">{mockUsers.length * 150}+ Global Builders</span>
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-labx-text mb-2">LabX Community Hub</h1>
      <p className="text-labx-text-secondary text-sm sm:text-base mb-8 max-w-2xl">
        Connect with co-founders, join specialized domain working groups, and participate in technical research discussions.
      </p>

      {/* Domain Circles */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
          { name: 'AI & Generative Systems Guild', members: 420, icon: '', tag: 'ai-ml' },
          { name: 'Climate & Sustainability Tech', members: 215, icon: '', tag: 'climate' },
          { name: 'BioTech & Health Systems', members: 180, icon: '', tag: 'healthcare' },
          { name: 'Robotics & Hardware Lab', members: 155, icon: '', tag: 'robotics' },
          { name: 'Quantum & DeepTech Guild', members: 130, icon: '', tag: 'deep-tech' },
          { name: 'SaaS Architecture & Infra', members: 310, icon: '', tag: 'saas' },
        ].map(guild => (
          <div key={guild.name} className="labx-card p-6 flex flex-col justify-between group hover:border-labx-cyan/60 transition-colors">
            <div>
              <div className="text-3xl mb-3">{guild.icon}</div>
              <h3 className="text-lg font-bold text-labx-text group-hover:text-labx-cyan transition-colors mb-1">{guild.name}</h3>
              <p className="text-xs text-labx-text-muted font-mono mb-4">{guild.members} Active Members</p>
            </div>
            <button className="labx-button-secondary w-full py-2 rounded-xl text-xs font-semibold">Join Guild Channel</button>
          </div>
        ))}
      </div>

      {/* Featured Community Builders */}
      <h2 className="text-xl font-bold text-labx-text mb-4">Featured Ecosystem Builders</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockUsers.map(user => (
          <div key={user.id} className="labx-card p-6 text-center">
            <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-labx-cyan/60 object-cover shadow-[0_0_12px_rgba(34, 211, 238,0.2)]" />
            <h3 className="text-sm font-bold text-labx-text">{user.name}</h3>
            <p className="text-xs text-labx-text-muted capitalize mb-2">{user.role}</p>
            <div className="text-xs font-mono font-bold text-labx-cyan bg-labx-cyan/10 py-1 px-2 rounded-lg inline-block border border-labx-cyan/20">
              Level {user.level} · {user.labxPoints} pts
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
