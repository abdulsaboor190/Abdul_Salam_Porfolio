import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { end: 4, label: 'Projects Completed', suffix: '+' },
  { end: 3, label: 'Design Disciplines', suffix: '' },
  { end: 4, label: 'Events Volunteered', suffix: '+' },
];

function StatCounter({ end, label, suffix, inView }) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: end,
      duration: 1.6,
      ease: 'power2.out',
      onUpdate() { setCount(Math.round(obj.val)); },
    });
  }, [inView, end]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 6 }}
    >
      <span style={{
        fontFamily: 'var(--font-display)',
        fontStyle: 'italic',
        fontSize: 'clamp(40px, 5vw, 60px)',
        fontWeight: 700,
        color: 'var(--accent)',
        lineHeight: 1,
        letterSpacing: '-0.02em',
      }}>
        {count}{suffix}
      </span>
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        {label}
      </span>
    </motion.div>
  );
}

export default function Stats() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      id="stats"
      ref={ref}
      style={{
        padding: '64px 6%',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '2px',
        maxWidth: 700,
        margin: '0 auto',
        background: 'var(--border)',
      }}
        className="stats-grid"
      >
        {STATS.map((s, i) => (
          <div key={s.label} style={{ background: 'var(--bg-secondary)', padding: '32px 24px' }}>
            <StatCounter {...s} inView={inView} />
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; max-width: 400px !important; }
        }
      `}</style>
    </section>
  );
}
