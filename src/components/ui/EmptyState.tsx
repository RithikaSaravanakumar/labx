import { motion } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export default function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-2xl bg-white/[0.02] border border-white/5 border-dashed">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4"
      >
        <Icon className="w-6 h-6 text-zinc-500" />
      </motion.div>
      <h3 className="text-sm font-bold text-white mb-2">{title}</h3>
      <p className="text-xs text-zinc-400 max-w-xs mb-4 leading-relaxed">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
