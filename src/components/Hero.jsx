import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import profileImg from '../assets/Abdul_Salam.jpg';

/* ── Animation Variants ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const childVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Decorative SVG Illustration (right column) ── */
function HeroIllustration() {
  const ACCENT       = 'var(--accent)';
  const BORDER       = 'var(--border)';
  const TEXT_MUTED   = 'var(--text-muted)';

  /* Hexagon path helper */
  function hexPath(cx, cy, r) {
    const pts = Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    });
    return `M${pts.join('L')}Z`;
  }

  /* Build honeycomb grid outside avatar circle */
  const hexagons = [];
  const hr = 14; // hex radius
  const cols = 14, rows = 14;
  const ox = 250, oy = 250;
  for (let row = -rows; row <= rows; row++) {
    for (let col = -cols; col <= cols; col++) {
      const x = ox + col * hr * 1.73;
      const y = oy + row * hr * 2 + (col % 2 === 0 ? 0 : hr);
      const d = Math.hypot(x - ox, y - oy);
      if (d < 230 && d > 175) {
        hexagons.push({ x, y });
      }
    }
  }

  /* Four arc orbits surrounding the large photo */
  const orbits = [
    { r: 185, startAngle: 20,  dotCount: 3, duration: 20, color: ACCENT },
    { r: 198, startAngle: 120, dotCount: 2, duration: 30, color: TEXT_MUTED },
    { r: 212, startAngle: 240, dotCount: 4, duration: 45, color: BORDER },
    { r: 226, startAngle: 70,  dotCount: 2, duration: 28, color: ACCENT },
  ];

  return (
    <motion.div
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }}
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}
    >
      <svg
        viewBox="0 0 500 500"
        width="500"
        height="500"
        style={{ maxWidth: '100%', overflow: 'visible' }}
        aria-hidden="true"
      >
        <defs>
          <clipPath id="avatar-clip-large">
            <circle cx="250" cy="250" r="175" />
          </clipPath>
        </defs>

        {/* ── Mandala-like background rings ── */}
        <g opacity="0.06">
          <circle cx="250" cy="250" r="240" fill="none" stroke={ACCENT} strokeWidth="28" />
          <circle cx="250" cy="250" r="210" fill="none" stroke={ACCENT} strokeWidth="8" strokeDasharray="12 6" />
          {/* Decorative petal ring */}
          {Array.from({ length: 16 }, (_, i) => {
            const a = (Math.PI * 2 * i) / 16;
            const x1 = 250 + 240 * Math.cos(a);
            const y1 = 250 + 240 * Math.sin(a);
            return (
              <line key={i} x1="250" y1="250" x2={x1} y2={y1} stroke={ACCENT} strokeWidth="1.5" opacity="0.5" />
            );
          })}
        </g>

        {/* ── Honeycomb hex grid (surrounding ring) ── */}
        <g opacity="0.25">
          {hexagons.map((h, i) => (
            <path key={i} d={hexPath(h.x, h.y, 12)} fill="none" stroke={BORDER} strokeWidth="0.8" />
          ))}
        </g>

        {/* ── Outer rotating dashed ring ── */}
        <circle
          cx="250" cy="250" r="210"
          fill="none" stroke={ACCENT} strokeWidth="1" strokeDasharray="6 10" opacity="0.35"
          className="spin-slow" style={{ transformOrigin: '250px 250px' }}
        />

        {/* ── Orbiting arcs with dots ── */}
        {orbits.map((orb, oi) => (
          <motion.g
            key={oi}
            animate={{ rotate: 360 }}
            transition={{ duration: orb.duration, ease: 'linear', repeat: Infinity }}
            style={{ originX: '250px', originY: '250px', transformOrigin: '250px 250px' }}
          >
            <path
              d={`M ${250 + orb.r} 250 A ${orb.r} ${orb.r} 0 0 1 ${250} ${250 - orb.r}`}
              fill="none" stroke={orb.color} strokeWidth="0.8" opacity="0.3"
            />
            {Array.from({ length: orb.dotCount }, (_, di) => {
              const angle = orb.startAngle + di * (360 / orb.dotCount);
              const rad = (angle * Math.PI) / 180;
              const dx = 250 + orb.r * Math.cos(rad);
              const dy = 250 + orb.r * Math.sin(rad);
              return <circle key={di} cx={dx} cy={dy} r={3.5} fill={orb.color} opacity="0.7" />;
            })}
          </motion.g>
        ))}

        {/* ── Large Circular Profile Picture ── */}
        <circle cx="250" cy="250" r="178" fill="var(--bg-card)" stroke={ACCENT} strokeWidth="2.5" opacity="0.95" />
        <image
          href={profileImg}
          x="75"
          y="75"
          width="350"
          height="350"
          preserveAspectRatio="xMidYMin slice"
          clipPath="url(#avatar-clip-large)"
          style={{ filter: 'contrast(1.03) saturate(1.05)' }}
        />
        <circle cx="250" cy="250" r="175" fill="none" stroke={ACCENT} strokeWidth="1.5" opacity="0.7" />
        <circle cx="250" cy="250" r="182" fill="none" stroke={ACCENT} strokeWidth="1" strokeDasharray="5 5" opacity="0.5" />
      </svg>
    </motion.div>
  );
}

/* ── Hand-drawn underline SVG under "fabric" ── */
function HandUnderline() {
  const pathLen = 220;
  return (
    <svg
      viewBox="0 0 220 12"
      width="220"
      height="12"
      style={{ position: 'absolute', bottom: -10, left: 0, overflow: 'visible' }}
      aria-hidden="true"
    >
      <path
        d="M2,7 C40,2 80,10 110,6 C140,2 180,11 218,5"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={pathLen}
        strokeDashoffset={pathLen}
        className="draw-on"
        style={{ '--stroke-length': pathLen }}
      />
    </svg>
  );
}

/* ── Status Badge ── */
function StatusBadge() {
  return (
    <motion.div
      variants={childVariants}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 14px',
        borderRadius: 99,
        border: '1px solid var(--border)',
        backgroundColor: 'var(--bg-card)',
        width: 'fit-content',
      }}
    >
      <span
        className="pulse-dot"
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#2d9e5e',
          flexShrink: 0,
          display: 'block',
        }}
      />
      <span style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 12,
        color: 'var(--text-muted)',
        whiteSpace: 'nowrap',
      }}>
        Open to opportunities · Internships and Freelance
      </span>
    </motion.div>
  );
}

/* ── CTA Buttons ── */
function CTAButtons() {
  return (
    <motion.div variants={childVariants} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {/* Filled pill */}
      <motion.a
        href="#work"
        id="hero-cta-work"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.18 }}
        style={{
          height: 44,
          padding: '0 28px',
          borderRadius: 99,
          backgroundColor: 'var(--accent)',
          color: '#fff',
          fontFamily: 'var(--font-sans)',
          fontSize: 14,
          fontWeight: 600,
          display: 'inline-flex',
          alignItems: 'center',
          textDecoration: 'none',
          border: 'none',
          cursor: 'pointer',
          filter: 'brightness(1)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(0.88)')}
        onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
      >
        Explore my work
      </motion.a>

      {/* Ghost pill */}
      <motion.a
        href="/cv.pdf"
        id="hero-cta-cv"
        download="Abdul_Salam_CV.pdf"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.18 }}
        style={{
          height: 44,
          padding: '0 28px',
          borderRadius: 99,
          backgroundColor: 'transparent',
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-sans)',
          fontSize: 14,
          fontWeight: 600,
          display: 'inline-flex',
          alignItems: 'center',
          textDecoration: 'none',
          border: '1.5px solid var(--border)',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent)';
          e.currentTarget.style.color = 'var(--accent)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border)';
          e.currentTarget.style.color = 'var(--text-secondary)';
        }}
      >
        Download CV
      </motion.a>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════ */
export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '55% 45%',
        alignItems: 'center',
        padding: '0 5% 0 6%',
        paddingTop: 64, /* navbar height */
        gap: '4%',
      }}
      className="hero-section"
    >
      {/* ── LEFT COLUMN ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          maxWidth: 600,
        }}
      >
        {/* Eyebrow */}
        <motion.p
          variants={childVariants}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            margin: 0,
          }}
        >
          Kaplan Beyy (Abdul Salam) · Textile Designer · Karachi
        </motion.p>

        {/* Headline */}
        <motion.div variants={childVariants}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 'clamp(44px, 5.5vw, 72px)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              margin: 0,
            }}
          >
            <span style={{ display: 'block' }}>Crafting</span>
            <span style={{ display: 'block', position: 'relative', width: 'fit-content' }}>
              fabric
              <HandUnderline />
            </span>
            <span style={{ display: 'block' }}>into story</span>
          </h1>
        </motion.div>

        {/* Sub-paragraph */}
        <motion.p
          variants={childVariants}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 15,
            lineHeight: 1.75,
            color: 'var(--text-secondary)',
            margin: 0,
            maxWidth: 480,
          }}
        >
          Fashion illustration, surface pattern design, and sustainable material
          research — merging cultural craft with contemporary innovation.
        </motion.p>

        {/* CTA Buttons */}
        <CTAButtons />

        {/* Status Badge */}
        <StatusBadge />
      </motion.div>

      {/* ── RIGHT COLUMN (decorative SVG with profile picture) ── */}
      <div
        className="hero-illustration"
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <HeroIllustration />
      </div>

      {/* ── Mobile: hide right column via CSS ── */}
      <style>{`
        @media (max-width: 768px) {
          .hero-section {
            grid-template-columns: 1fr !important;
            padding: 80px 24px 48px !important;
            gap: 48px !important;
          }
          .hero-illustration {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
