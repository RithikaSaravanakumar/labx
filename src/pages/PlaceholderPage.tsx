import { motion } from 'framer-motion';
import { pageTransition } from '../animations';

interface PlaceholderPageProps {
  title: string;
  subtitle?: string;
}

export default function PlaceholderPage({ title, subtitle }: PlaceholderPageProps) {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <h1 className="text-3xl font-bold text-labx-text mb-2">{title}</h1>
      {subtitle && <p className="text-labx-text-secondary">{subtitle}</p>}
      <div className="mt-8 p-8 rounded-xl bg-labx-surface border border-labx-border text-center">
        <p className="text-labx-text-muted">This page is being built...</p>
      </div>
    </motion.div>
  );
}
