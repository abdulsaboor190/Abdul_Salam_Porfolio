import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/* Botanical SVG illustration for the right column */
function BotanicalIllustration() {
  const branches = [
    { sx: 60, sy: 180, targets: [[130, 100], [170, 130], [145, 65], [185, 45]] },
    { sx: 200, sy: 200, targets: [[260, 110], [300, 145], [280, 72], [320, 52]] },
    { sx: 340, sy: 190, targets: [[390, 115], [415, 148], [400, 78]] },
    { sx: 120, sy: 300, targets: [[160, 255], [195, 275], [175, 232]] },
    { sx: 280, sy: 310, targets: [[320, 265], [355, 282], [335, 238]] },
  ];
  const slices = [
    { cx: 110, cy: 120, r: 52 },
    { cx: 330, cy: 180, r: 44 },
    { cx: 210, cy: 280, r: 36 },
  ];
  return (
    <svg viewBox="0 0 460 360" width="100%" height="100%" style={{ maxWidth: 460 }} aria-hidden="true">
      {/* Dot scatter */}
      {Array.from({ length: 70 }, (_, i) => (
        <circle key={i} cx={(i * 131.3) % 460} cy={(i * 89.7) % 360} r={1.4} fill="#2A8C6E" opacity="0.15" />
      ))}
      {/* Leaf veins */}
      {branches.map((b, bi) => (
        <g key={bi} stroke="#2A8C6E" fill="none" opacity="0.5">
          {b.targets.map(([ex, ey], pi) => (
            <path key={pi}
              d={`M${b.sx},${b.sy} Q${(b.sx + ex) / 2 + 16},${(b.sy + ey) / 2 - 22} ${ex},${ey}`}
              strokeWidth={pi < 2 ? 1.5 : 0.8}
            />
          ))}
          {b.targets.slice(0, 2).map(([ex, ey], pi) => (
            <line key={`lat${pi}`}
              x1={(b.sx + ex) / 2} y1={(b.sy + ey) / 2}
              x2={(b.sx + ex) / 2 + 20} y2={(b.sy + ey) / 2 - 14}
              strokeWidth="0.6" opacity="0.55"
            />
          ))}
        </g>
      ))}
      {/* Citrus slices */}
      {slices.map(({ cx, cy, r }, i) => (
        <g key={i} fill="none" stroke="#EF9F27" strokeWidth="1" opacity="0.32">
          <circle cx={cx} cy={cy} r={r} />
          <circle cx={cx} cy={cy} r={r * 0.68} />
          {Array.from({ length: 8 }, (_, s) => {
            const a = (s / 8) * Math.PI * 2;
            return <line key={s}
              x1={cx + r * 0.68 * Math.cos(a)} y1={cy + r * 0.68 * Math.sin(a)}
              x2={cx + r * Math.cos(a)} y2={cy + r * Math.sin(a)} />;
          })}
          <circle cx={cx} cy={cy} r={r * 0.22} fill="#EF9F27" opacity="0.35" stroke="none" />
        </g>
      ))}
    </svg>
  );
}

export default function FeaturedProject() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  const leftVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };
  const rightVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      id="featured"
      ref={ref}
      style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg-secondary)',
        padding: '80px 6%',
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: '45% 55%',
        gap: '6%',
        alignItems: 'center',
        maxWidth: 1200,
        margin: '0 auto',
      }}
        className="featured-grid"
      >
        {/* Left — text */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.13 } } }}
          style={{ display: 'flex', flexDirection: 'column', gap: 22 }}
        >
          {/* Green chip */}
          <motion.div variants={leftVariants}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 12px', borderRadius: 99,
              background: 'rgba(42,140,110,0.1)', border: '1px solid rgba(42,140,110,0.3)',
              color: 'var(--accent-teal)', fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 500,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-teal)', display: 'inline-block' }} />
              Featured Research · 2025
            </span>
          </motion.div>

          <motion.h2 variants={leftVariants} style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 3vw, 36px)',
            fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2,
            letterSpacing: '-0.02em', margin: 0,
          }}>
            Bioplastic sustainable packaging
          </motion.h2>

          <motion.p variants={leftVariants} style={{
            fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: 1.8,
            color: 'var(--text-secondary)', margin: 0,
          }}>
            A biodegradable packaging prototype derived from orange and lemon peel waste.
            By extracting pectin-based biopolymers, this research proposes plastic-free
            alternatives for the textile supply chain — bridging material science with
            sustainable fashion practice.
          </motion.p>

          {/* Sustainability badge chips */}
          <motion.div variants={leftVariants} style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Sustainability', 'Biopolymers', 'Circular Economy'].map(tag => (
              <span key={tag} style={{
                fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 500,
                color: 'var(--accent-teal)',
                background: 'rgba(42,140,110,0.08)',
                border: '1px solid rgba(42,140,110,0.28)',
                borderRadius: 99, padding: '4px 14px',
              }}>
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — botanical SVG */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={rightVariants}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 280 }}
        >
          <BotanicalIllustration />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .featured-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
