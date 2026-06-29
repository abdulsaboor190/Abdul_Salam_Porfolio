import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = memo(function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      aria-label="Toggle colour theme"
      id="theme-toggle-btn"
      onClick={toggleTheme}
      whileTap={{ scale: 0.93 }}
      transition={{ duration: 0.15, ease: 'easeInOut' }}
      style={{
        width: 52,
        height: 28,
        borderRadius: 9999,
        border: 'none',
        cursor: 'pointer',
        padding: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: isDark ? 'flex-end' : 'flex-start',
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden',
      }}
      animate={{
        backgroundColor: isDark ? '#2A2520' : '#F2EDE5',
      }}
    >
      {/* Sliding thumb */}
      <motion.span
        layout
        layoutId="toggle-thumb"
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        style={{
          width: 22,
          height: 22,
          borderRadius: '50%',
          backgroundColor: isDark ? '#1C1916' : '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
          flexShrink: 0,
          zIndex: 1,
        }}
      >
        {/* Icon crossfade */}
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex' }}
            >
              <Moon size={13} color="#C98A3A" strokeWidth={2.2} />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex' }}
            >
              <Sun size={13} color="#B8722A" strokeWidth={2.2} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
    </motion.button>
  );
});

export default ThemeToggle;
