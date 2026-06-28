'use client';

import { motion } from 'framer-motion';

// Re-mounts on every route change → gives a soft fade as you move between
// the home page and /menu. Opacity-only (no transform) so it never becomes a
// containing block for the page's position:fixed modals/lightboxes.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
