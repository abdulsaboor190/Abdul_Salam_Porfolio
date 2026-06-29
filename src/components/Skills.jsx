import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const DESIGN_SKILLS = [
  'Fashion Illustration',
  'Textile Pattern Design',
  'Concept Development',
  'Color Theory',
  'Surface Design',
  'Trend Forecasting',
  'Apparel Manufacturing',
];

const TECH_SKILLS = [
  'Adobe Photoshop',
  'Adobe Illustrator',
  'Biopolymer Development',
  'Sustainable Material Innovation',
  'Circular Economy Design',
];

function SkillPill({ label, delay }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3, delay, ease: [0.22, 1, 0.36, 1] }}
      className="skill-pill"
      style={{
        display: 'inline-block',
        fontFamily: 'var(--font-sans)',
        fontSize: 12,
        color: 'var(--text-secondary)',
        background: 'var(--bg-card)',
        border: '0.5px solid var(--border)',
        borderRadius: 99,
        padding: '6px 14px',
        cursor: 'default',
        transition: 'color 0.2s ease, border-color 0.2s ease',
      }}
    >
      {label}
    </motion.span>
  );
}

export default function Skills() {
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="skills" style={{ padding: '100px 6%', background: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Heading */}
        <motion.h2
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font-display)', fontStyle: 'italic',
            fontSize: 'clamp(28px, 3.5vw, 38px)', fontWeight: 700,
            color: 'var(--text-primary)', letterSpacing: '-0.02em',
            textAlign: 'center', marginBottom: 56,
          }}
        >
          Skills &amp; Expertise
        </motion.h2>

        {/* Two columns with vertical divider */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1px 1fr',
          gap: '0 48px',
          alignItems: 'start',
        }} className="skills-grid">

          {/* Design column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 500, margin: 0 }}>
              Design
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {DESIGN_SKILLS.map((s, i) => <SkillPill key={s} label={s} delay={i * 0.03} />)}
            </div>
          </div>

          {/* Divider */}
          <div style={{ width: 1, background: 'var(--border)', alignSelf: 'stretch', minHeight: 180 }} />

          {/* Software & Research column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 500, margin: 0 }}>
              Software &amp; Research
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {TECH_SKILLS.map((s, i) => <SkillPill key={s} label={s} delay={i * 0.03} />)}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .skill-pill:hover {
          color: var(--accent) !important;
          border-color: var(--accent) !important;
        }
        @media (max-width: 640px) {
          .skills-grid {
            grid-template-columns: 1fr !important;
          }
          .skills-grid > div:nth-child(2) { display: none; }
        }
      `}</style>
    </section>
  );
}
