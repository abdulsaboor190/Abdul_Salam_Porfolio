import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import profileImg from '../assets/Abdul_Salam.jpg';

/* ── Swatch pattern SVGs ── */
function SwatchHerringbone() {
  return (
    <svg viewBox="0 0 88 88" width="88" height="88">
      <rect width="88" height="88" fill="rgba(184,114,42,0.08)" />
      {Array.from({ length: 12 }, (_, i) => (
        <g key={i}>
          <line x1={i * 14 - 14} y1="0"  x2={i * 14}      y2="14" stroke="#B8722A" strokeWidth="2.5" opacity="0.45" />
          <line x1={i * 14}      y1="14" x2={i * 14 + 14}  y2="0"  stroke="#B8722A" strokeWidth="2.5" opacity="0.45" />
          <line x1={i * 14 - 14} y1="28" x2={i * 14}       y2="42" stroke="#B8722A" strokeWidth="2.5" opacity="0.45" />
          <line x1={i * 14}      y1="42" x2={i * 14 + 14}  y2="28" stroke="#B8722A" strokeWidth="2.5" opacity="0.45" />
          <line x1={i * 14 - 14} y1="56" x2={i * 14}       y2="70" stroke="#B8722A" strokeWidth="2.5" opacity="0.45" />
          <line x1={i * 14}      y1="70" x2={i * 14 + 14}  y2="56" stroke="#B8722A" strokeWidth="2.5" opacity="0.45" />
        </g>
      ))}
    </svg>
  );
}

function SwatchHexScale() {
  function hex(cx, cy, r) {
    return Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i;
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    }).join(' ');
  }
  return (
    <svg viewBox="0 0 88 88" width="88" height="88">
      <rect width="88" height="88" fill="rgba(42,140,110,0.08)" />
      {Array.from({ length: 5 }, (_, row) =>
        Array.from({ length: 6 }, (_, col) => {
          const x = col * 18 + (row % 2) * 9;
          const y = row * 16;
          return <polygon key={`${row}-${col}`} points={hex(x, y, 9)} fill="none" stroke="#2A8C6E" strokeWidth="1" opacity="0.5" />;
        })
      )}
    </svg>
  );
}

function SwatchDiamond() {
  return (
    <svg viewBox="0 0 88 88" width="88" height="88">
      <rect width="88" height="88" fill="rgba(26,23,20,0.04)" />
      {Array.from({ length: 7 }, (_, row) =>
        Array.from({ length: 7 }, (_, col) => {
          const x = col * 14 + (row % 2) * 7, y = row * 14;
          return (
            <polygon key={`${row}-${col}`}
              points={`${x},${y - 7} ${x + 7},${y} ${x},${y + 7} ${x - 7},${y}`}
              fill="none" stroke="#1A1714" strokeWidth="0.8" opacity="0.3"
            />
          );
        })
      )}
    </svg>
  );
}

function SwatchFloral() {
  const petals = (cx, cy, r) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i;
      const px = cx + r * 1.4 * Math.cos(a), py = cy + r * 1.4 * Math.sin(a);
      return (
        <ellipse key={i} cx={px} cy={py} rx={r * 0.5} ry={r * 0.9}
          fill="none" stroke="#C04A2A" strokeWidth="0.8" opacity="0.45"
          transform={`rotate(${i * 60} ${px} ${py})`}
        />
      );
    });
  return (
    <svg viewBox="0 0 88 88" width="88" height="88">
      <rect width="88" height="88" fill="rgba(192,74,42,0.05)" />
      {[[22, 22], [66, 22], [22, 66], [66, 66], [44, 44]].map(([cx, cy], i) => (
        <g key={i}>
          {petals(cx, cy, 8)}
          <circle cx={cx} cy={cy} r={4} fill="none" stroke="#C04A2A" strokeWidth="0.7" opacity="0.5" />
        </g>
      ))}
    </svg>
  );
}

function SwatchDiagonalStripe() {
  return (
    <svg viewBox="0 0 88 88" width="88" height="88">
      <rect width="88" height="88" fill="rgba(63,63,160,0.05)" />
      {Array.from({ length: 16 }, (_, i) => (
        <line key={i} x1={i * 12 - 24} y1="0" x2={i * 12 + 64} y2="88"
          stroke="#3F3FA0" strokeWidth={i % 3 === 0 ? 2.5 : 0.8} opacity="0.35"
        />
      ))}
    </svg>
  );
}

const SWATCHES = [
  { Svg: SwatchHerringbone,    label: 'Herringbone' },
  { Svg: SwatchHexScale,       label: 'Hex Scale' },
  { Svg: SwatchDiamond,        label: 'Geometric Diamond' },
  { Svg: SwatchFloral,         label: 'Floral Repeat' },
  { Svg: SwatchDiagonalStripe, label: 'Diagonal Stripe' },
];

function SwatchCard({ Svg, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flexShrink: 0 }}>
      <div className="swatch-card" style={{ width: 88, height: 88, borderRadius: 12, border: '1px solid var(--border)', overflow: 'hidden', background: 'var(--bg-card)' }}>
        <div className="swatch-inner" style={{ width: '100%', height: '100%', transition: 'transform 0.3s ease' }}>
          <Svg />
        </div>
      </div>
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: 10, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{label}</span>
    </div>
  );
}

/* ── Profile Photo Frame ── */
function ProfilePhoto() {
  return (
    <div style={{ position: 'relative', width: 'fit-content' }}>
      {/* Decorative amber offset frame */}
      <div style={{
        position: 'absolute',
        top: 12, left: 12,
        width: '100%', height: '100%',
        borderRadius: 20,
        border: '2px solid var(--accent)',
        opacity: 0.35,
        zIndex: 0,
      }} />
      {/* Subtle teal accent corner */}
      <div style={{
        position: 'absolute',
        bottom: -8, right: -8,
        width: 48, height: 48,
        borderRadius: '0 0 16px 0',
        background: 'var(--accent-teal)',
        opacity: 0.18,
        zIndex: 0,
      }} />
      {/* Photo */}
      <div style={{ position: 'relative', zIndex: 1, borderRadius: 18, overflow: 'hidden', lineHeight: 0 }}>
        <img
          src={profileImg}
          alt="Abdul Salam — Textile Design Student"
          style={{
            width: '100%',
            maxWidth: 320,
            height: 380,
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
            filter: 'contrast(1.02) saturate(1.05)',
          }}
        />
        {/* Subtle gradient overlay at bottom */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: 80,
          background: 'linear-gradient(to top, rgba(26,23,20,0.45), transparent)',
        }} />
        {/* Name badge */}
        <div style={{
          position: 'absolute',
          bottom: 16, left: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}>
          <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 15, fontWeight: 700, color: '#fff', lineHeight: 1 }}>
            Kaplan Beyy
          </span>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 10, color: 'rgba(255,255,255,0.72)', letterSpacing: '0.06em' }}>
            Abdul Salam · TIP Karachi
          </span>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const [leftRef,   leftInView]   = useInView({ triggerOnce: true, threshold: 0.15 });
  const [rightRef,  rightInView]  = useInView({ triggerOnce: true, threshold: 0.15 });
  const [swatchRef, swatchInView] = useInView({ triggerOnce: true, threshold: 0.1  });

  return (
    <section id="about" style={{ padding: '100px 6%', background: 'var(--bg-primary)' }}>

      {/* ── Two-column layout ── */}
      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '7%', alignItems: 'start', maxWidth: 1100, margin: '0 auto' }}
        className="about-grid"
      >
        {/* Left — photo + heading */}
        <motion.div
          ref={leftRef}
          initial={{ opacity: 0, x: -40 }}
          animate={leftInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', flexDirection: 'column', gap: 28, alignItems: 'flex-start' }}
        >
          <ProfilePhoto />

          <h2 style={{
            fontFamily: 'var(--font-display)', fontStyle: 'italic',
            fontSize: 'clamp(28px, 3.2vw, 38px)', fontWeight: 700,
            color: 'var(--text-primary)', letterSpacing: '-0.02em',
            lineHeight: 1.1, margin: 0,
          }}>
            About Kaplan Beyy
          </h2>

          {/* Language badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Urdu', 'English', 'Sindhi'].map(lang => (
              <span key={lang} style={{
                fontFamily: 'var(--font-sans)', fontSize: 11,
                color: 'var(--text-secondary)', background: 'var(--bg-card)',
                border: '1px solid var(--border)', borderRadius: 99, padding: '4px 14px',
              }}>
                {lang}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right — bio + education + core areas */}
        <motion.div
          ref={rightRef}
          initial={{ opacity: 0, x: 40 }}
          animate={rightInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', flexDirection: 'column', gap: 22 }}
        >
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>
            Abdul Salam is a first-year Textile Design student at the Textile Institute of
            Pakistan, Karachi (Class of 2028). His practice spans fashion illustration,
            surface pattern development, and material sustainability research.
          </p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>
            Rooted in South Asian craft traditions, he merges cultural visual vocabulary
            with contemporary design methodologies — exploring how heritage motifs can
            inform modern textile innovation and sustainable production systems.
          </p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>
            Currently open to internships, collaborative projects, and freelance illustration
            work across fashion, textile, and sustainability sectors.
          </p>

          {/* Education card */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 500 }}>Education</span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>B.Sc. Textile Design</h3>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>Textile Institute of Pakistan, Karachi</p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>2024 – 2028</p>
          </div>

          {/* Core areas */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 500, margin: 0 }}>Core Areas</p>
            {[
              'Fashion Illustration & Concept Development',
              'Surface Pattern Design',
              'Sustainable Material Research',
              'Textile Manufacturing Processes',
              'Trend Forecasting & Color Theory',
            ].map(area => (
              <div key={area} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, marginTop: 6 }} />
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{area}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Swatch strip ── */}
      <motion.div
        ref={swatchRef}
        initial={{ opacity: 0, y: 24 }}
        animate={swatchInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginTop: 64, maxWidth: 1100, margin: '64px auto 0' }}
      >
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 500, marginBottom: 16 }}>
          Pattern Swatches
        </p>
        <div
          className="swatch-strip"
          style={{ display: 'flex', gap: 18, overflowX: 'auto', paddingBottom: 8, msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        >
          {SWATCHES.map(s => <SwatchCard key={s.label} {...s} />)}
        </div>
      </motion.div>

      <style>{`
        .swatch-strip::-webkit-scrollbar { display: none; }
        .swatch-card:hover .swatch-inner { transform: scale(1.1); }
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
