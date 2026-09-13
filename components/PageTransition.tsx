'use client';

import { motion } from 'motion/react';

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex-1 w-full max-w-7xl mx-auto space-y-8 pb-12"
    >
      {children}
    </motion.div>
  );
}
