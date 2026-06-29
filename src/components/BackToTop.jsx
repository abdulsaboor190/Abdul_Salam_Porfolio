import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() { setVisible(window.scrollY > 500); }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          onClick={scrollTop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Back to top"
          style={{
            position: 'fixed',
            bottom: 28,
            right: 28,
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'var(--accent)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
          }}
        >
          <ChevronUp size={20} color="#fff" strokeWidth={2.5} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
