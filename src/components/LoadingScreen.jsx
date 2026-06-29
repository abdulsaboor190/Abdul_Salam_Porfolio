import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'var(--bg-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 12,
          }}
          aria-hidden="true"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 52,
              fontWeight: 700,
              color: 'var(--accent)',
              lineHeight: 1,
            }}
          >
            AS
          </motion.span>
          {/* Thin amber progress bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ duration: 1.0, ease: 'easeInOut' }}
            style={{ height: 2, background: 'var(--accent)', borderRadius: 2, opacity: 0.6 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
