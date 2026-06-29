import { useRef, useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';

/* Custom mouse-tilt hook */
function useTilt(ref, { maxTilt = 6 } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf, tRx = 0, tRy = 0, cRx = 0, cRy = 0;
    function tick() {
      cRx += (tRx - cRx) * 0.12;
      cRy += (tRy - cRy) * 0.12;
      el.style.transform = `perspective(1000px) rotateX(${cRx}deg) rotateY(${cRy}deg)`;
      raf = requestAnimationFrame(tick);
    }
    function onMove(e) {
      const r = el.getBoundingClientRect();
      tRy = ((e.clientX - r.left) / r.width - 0.5) * maxTilt * 2;
      tRx = -((e.clientY - r.top) / r.height - 0.5) * maxTilt * 2;
    }
    function onLeave() { tRx = 0; tRy = 0; }
    raf = requestAnimationFrame(tick);
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { cancelAnimationFrame(raf); el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, [ref, maxTilt]);
}

/* ── SVG Artwork Previews ── */
function ThumbTitanic() {
  return (
    <svg viewBox="0 0 400 260" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="400" height="260" fill="#0D0C0A" />
      {Array.from({ length: 30 }, (_, i) => <line key={i} x1="0" y1={i * 9} x2="400" y2={i * 9} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />)}
      <line x1="200" y1="10" x2="200" y2="250" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" strokeDasharray="4 4" />
      <g stroke="rgba(255,255,255,0.85)" strokeWidth="1.2" fill="none">
        <ellipse cx="120" cy="55" rx="20" ry="24" />
        <path d="M100,79 Q82,92 76,132 L78,218 L112,220 L116,155 L124,155 L128,220 L162,218 L160,132 Q152,92 140,79" />
        <path d="M106,80 L120,98 L134,80" />
        <path d="M80,158 Q120,148 160,158" />
        <path d="M78,218 Q100,238 120,242 Q140,238 162,218" />
        {Array.from({ length: 6 }, (_, i) => <line key={i} x1={86 + i * 12} y1="90" x2={84 + i * 12} y2="145" stroke="rgba(255,255,255,0.3)" strokeWidth="0.6" />)}
      </g>
      <g stroke="rgba(255,255,255,0.85)" strokeWidth="1.2" fill="none">
        <ellipse cx="280" cy="55" rx="20" ry="24" />
        <path d="M260,79 Q240,96 234,140 L236,200 L268,202 L272,155 L288,155 L292,202 L324,200 L322,140 Q316,96 300,79" />
        <path d="M262,80 L268,73 L280,94 L292,73 L300,82" />
        <path d="M236,158 Q280,144 322,158" />
        <path d="M236,200 Q222,228 232,244 Q264,252 280,248 Q296,252 328,244 Q338,228 324,200" />
        {Array.from({ length: 5 }, (_, i) => <path key={i} d={`M${242 + i * 14},88 Q${247 + i * 14},108 ${242 + i * 14},132`} stroke="rgba(255,255,255,0.3)" strokeWidth="0.7" />)}
      </g>
      <text x="200" y="248" textAnchor="middle" fontFamily="serif" fontStyle="italic" fontSize="9" fill="rgba(255,255,255,0.25)" letterSpacing="3">TITANIC × CRUELLA</text>
    </svg>
  );
}

function ThumbDragon() {
  return (
    <svg viewBox="0 0 400 260" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="400" height="260" fill="#140609" />
      {Array.from({ length: 6 }, (_, row) => Array.from({ length: 7 }, (_, col) => {
        const x = col * 62 + (row % 2) * 31 - 10, y = row * 42 - 5;
        return <path key={`${row}-${col}`} d={`M${x},${y + 38} A38,38 0 0,1 ${x + 62},${y + 38}`} fill="none" stroke="#9E2424" strokeWidth="10" opacity="0.55" />;
      }))}
      {Array.from({ length: 7 }, (_, row) => Array.from({ length: 8 }, (_, col) => {
        const x = col * 52 + (row % 2) * 26 - 5, y = row * 35 - 8;
        return <path key={`${row}-${col}`} d={`M${x},${y + 28} A28,28 0 0,1 ${x + 52},${y + 28}`} fill="none" stroke="#D85622" strokeWidth="5" opacity="0.4" />;
      }))}
      {Array.from({ length: 10 }, (_, row) => Array.from({ length: 11 }, (_, col) => {
        const x = col * 38 + (row % 2) * 19 - 5, y = row * 26 - 5;
        return <path key={`${row}-${col}`} d={`M${x},${y + 18} A18,18 0 0,1 ${x + 38},${y + 18}`} fill="none" stroke="rgba(220,150,50,0.25)" strokeWidth="0.9" />;
      }))}
      <text x="200" y="248" textAnchor="middle" fontFamily="serif" fontStyle="italic" fontSize="9" fill="rgba(220,100,30,0.4)" letterSpacing="3">DRAGON THEME</text>
    </svg>
  );
}

function ThumbArchitectural() {
  return (
    <svg viewBox="0 0 400 260" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="400" height="260" fill="#F4EFE6" />
      {Array.from({ length: 26 }, (_, i) => <line key={`v${i}`} x1={i * 16} y1="0" x2={i * 16} y2="260" stroke="rgba(45,42,36,0.08)" strokeWidth="0.5" />)}
      {Array.from({ length: 18 }, (_, i) => <line key={`h${i}`} x1="0" y1={i * 16} x2="400" y2={i * 16} stroke="rgba(45,42,36,0.08)" strokeWidth="0.5" />)}
      {[60, 160, 260, 340].map((x, i) => (
        <g key={i} stroke="rgba(45,42,36,0.28)" strokeWidth="1.2" fill="none">
          <rect x={x - 24} y="30" width="48" height="90" rx="24" />
          <rect x={x - 16} y="38" width="32" height="74" rx="16" />
          <line x1={x} y1="30" x2={x} y2="120" stroke="rgba(45,42,36,0.15)" strokeDasharray="3 3" />
        </g>
      ))}
      {[0, 1, 2].map(l => <rect key={l} x={40 + l * 22} y={148 + l * 16} width={320 - l * 44} height={68 - l * 28} fill="none" stroke="rgba(45,42,36,0.22)" strokeWidth="0.9" />)}
      {[80, 200, 320].map((x, i) => (
        <g key={i} opacity="0.2">
          {Array.from({ length: 7 }, (_, j) => <line key={j} x1={x - 18 + j * 6} y1="160" x2={x - 24 + j * 6} y2="212" stroke="#2D2A24" strokeWidth="0.7" />)}
          {Array.from({ length: 7 }, (_, j) => <line key={j + 7} x1={x - 18} y1={160 + j * 8} x2={x + 24} y2={160 + j * 8} stroke="#2D2A24" strokeWidth="0.6" />)}
        </g>
      ))}
      <text x="200" y="248" textAnchor="middle" fontFamily="sans-serif" fontSize="8" fill="rgba(45,42,36,0.35)" letterSpacing="3">ARCHITECTURAL PATTERNS</text>
    </svg>
  );
}

function ThumbBioplastic() {
  const branches = [
    { sx: 40, sy: 130, targets: [[90, 60], [130, 90], [110, 48]] },
    { sx: 200, sy: 140, targets: [[250, 68], [290, 98], [265, 50]] },
    { sx: 340, sy: 148, targets: [[380, 82], [395, 112], [385, 55]] },
    { sx: 110, sy: 225, targets: [[145, 185], [170, 205], [155, 162]] },
    { sx: 270, sy: 232, targets: [[305, 192], [328, 208], [315, 165]] },
  ];
  const slices = [{ cx: 100, cy: 100, r: 38 }, { cx: 300, cy: 162, r: 32 }, { cx: 192, cy: 212, r: 26 }];
  return (
    <svg viewBox="0 0 400 260" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="400" height="260" fill="#0B1E12" />
      {branches.map((b, bi) => (
        <g key={bi} stroke="#3DB88A" strokeWidth="1.2" fill="none" opacity="0.5">
          {b.targets.map(([ex, ey], pi) => (
            <path key={pi} d={`M${b.sx},${b.sy} Q${(b.sx + ex) / 2 + 14},${(b.sy + ey) / 2 - 18} ${ex},${ey}`} strokeWidth={pi === 0 ? 1.4 : 0.8} />
          ))}
        </g>
      ))}
      {slices.map(({ cx, cy, r }, i) => (
        <g key={i} fill="none" stroke="#F5A020" strokeWidth="0.9" opacity="0.3">
          <circle cx={cx} cy={cy} r={r} />
          <circle cx={cx} cy={cy} r={r * 0.68} />
          {Array.from({ length: 8 }, (_, s) => {
            const a = (s / 8) * Math.PI * 2;
            return <line key={s} x1={cx + r * 0.68 * Math.cos(a)} y1={cy + r * 0.68 * Math.sin(a)} x2={cx + r * Math.cos(a)} y2={cy + r * Math.sin(a)} />;
          })}
          <circle cx={cx} cy={cy} r={r * 0.22} fill="#F5A020" opacity="0.35" stroke="none" />
        </g>
      ))}
      {Array.from({ length: 55 }, (_, i) => (
        <circle key={i} cx={(i * 137.5) % 400} cy={(i * 97.3) % 260} r={1.2} fill="#3DB88A" opacity="0.22" />
      ))}
      <text x="200" y="248" textAnchor="middle" fontFamily="sans-serif" fontSize="8" fill="rgba(61,184,138,0.45)" letterSpacing="3">BIOPLASTIC PACKAGING</text>
    </svg>
  );
}

const THUMBS = [ThumbTitanic, ThumbDragon, ThumbArchitectural, ThumbBioplastic];

const ProjectCard = memo(function ProjectCard({ project, index, layoutStyle = 'standard' }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  useTilt(cardRef, { maxTilt: 6 });
  const Thumb = THUMBS[index % THUMBS.length];

  const formattedNum = (index + 1).toString().padStart(2, '0');

  return (
    <motion.article
      ref={cardRef}
      id={`project-card-${index}`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`modern-project-card layout-${layoutStyle}`}
      style={{
        position: 'relative',
        background: 'var(--bg-card)',
        borderRadius: 24,
        border: '1px solid var(--border)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: layoutStyle === 'featured' ? 'row' : 'column',
        gridColumn: layoutStyle === 'featured' ? 'span 2' : 'span 1',
        transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Editorial Watermark Number */}
      <span style={{
        position: 'absolute',
        top: 16,
        right: 24,
        fontFamily: 'var(--font-display)',
        fontStyle: 'italic',
        fontSize: layoutStyle === 'featured' ? 72 : 54,
        fontWeight: 700,
        color: 'var(--text-muted)',
        opacity: 0.12,
        lineHeight: 1,
        userSelect: 'none',
        pointerEvents: 'none',
        zIndex: 2,
      }}>
        {formattedNum}
      </span>

      {/* Media / Artwork Area */}
      <div style={{
        flex: layoutStyle === 'featured' ? '1.2' : 'none',
        height: layoutStyle === 'featured' ? 380 : 280,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
        }}>
          <Thumb />
        </div>

        {/* Hover overlay with action */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: hovered ? 'auto' : 'none',
            zIndex: 3,
          }}
        >
          <span style={{
            color: '#fff',
            fontFamily: 'var(--font-sans)',
            fontSize: 13,
            fontWeight: 600,
            padding: '10px 24px',
            borderRadius: 99,
            background: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.3)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
          }}>
            Explore Concept →
          </span>
        </motion.div>
      </div>

      {/* Content Area */}
      <div style={{
        flex: '1',
        padding: layoutStyle === 'featured' ? '40px 36px' : '28px 24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 16,
        position: 'relative',
        zIndex: 2,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{
              fontSize: 11,
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              color: 'var(--accent)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              {project.category}
            </span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>
              {project.year}
            </span>
          </div>

          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: layoutStyle === 'featured' ? 28 : 22,
            fontWeight: 700,
            color: 'var(--text-primary)',
            margin: 0,
            lineHeight: 1.2,
          }}>
            {project.name}
          </h3>

          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 13,
            color: 'var(--text-secondary)',
            lineHeight: 1.65,
            margin: 0,
          }}>
            {project.description}
          </p>
        </div>

        {/* Tools Chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, paddingTop: 8 }}>
          {project.tools.map(t => (
            <span key={t} style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 10,
              color: 'var(--text-secondary)',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 99,
              padding: '4px 12px',
              fontWeight: 500,
            }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .modern-project-card:hover {
          border-color: var(--accent) !important;
          box-shadow: 0 20px 40px -15px rgba(0,0,0,0.12) !important;
        }
        @media (max-width: 900px) {
          .layout-featured {
            flex-direction: column !important;
            grid-column: span 1 !important;
          }
          .layout-featured > div:first-child {
            height: 280px !important;
          }
        }
      `}</style>
    </motion.article>
  );
});

export default ProjectCard;
