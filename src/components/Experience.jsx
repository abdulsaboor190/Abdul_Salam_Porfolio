import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const EVENTS = [
  'Convocation Ceremony 2026',
  'Qawali Night',
  'IBA Collaboration Event',
];

export default function Experience() {
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [entryRef, entryInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="experience" style={{ padding: '100px 6%', background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>

        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 52 }}
        >
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 10 }}>
            Experience
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(28px, 3.5vw, 38px)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.15, margin: 0 }}>
            Timeline
          </h2>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative', paddingLeft: 32 }}>

          {/* Vertical timeline line */}
          <div style={{ position: 'absolute', left: 0, top: 8, bottom: 0, width: 1, background: 'var(--border)' }} />

          {/* Entry */}
          <motion.div
            ref={entryRef}
            initial={{ opacity: 0, x: -20 }}
            animate={entryInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 14 }}
          >
            {/* Dot on line */}
            <div style={{
              position: 'absolute', left: -36, top: 4,
              width: 12, height: 12, borderRadius: '50%',
              background: 'var(--accent)',
              boxShadow: '0 0 0 3px var(--bg-primary), 0 0 0 5px var(--accent)',
            }} />

            {/* Role + org + year row */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 500, color: 'var(--text-primary)', margin: 0, lineHeight: 1.3 }}>
                  Event Volunteer
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-secondary)', margin: '3px 0 0' }}>
                  Textile Institute of Pakistan
                </p>
              </div>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-muted)', flexShrink: 0, paddingTop: 2 }}>
                2024 – 2026
              </span>
            </div>

            {/* Event chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {EVENTS.map(ev => (
                <span key={ev} style={{
                  fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--text-secondary)',
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: 99, padding: '4px 13px',
                }}>
                  {ev}
                </span>
              ))}
            </div>

            {/* Note */}
            <p style={{
              fontFamily: 'var(--font-sans)', fontStyle: 'italic',
              fontSize: 12, color: 'var(--text-muted)',
              lineHeight: 1.6, margin: 0, maxWidth: 560,
            }}>
              Facilitated guest coordination, logistics, cross-campus operations, and event
              management across multiple institutional events.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
