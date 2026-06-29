import { motion } from 'framer-motion';

/* Inline Instagram SVG — brand icons removed from lucide-react v1 */
function IgIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const NAV = [
  { label: 'Work',     href: '#work'     },
  { label: 'About',   href: '#about'    },
  { label: 'Skills',  href: '#skills'   },
  { label: 'Contact', href: '#contact'  },
];

export default function Footer() {
  return (
    <footer
      id="footer"
      style={{
        background: '#0E0C0A',
        padding: '64px 6% 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 36,
        borderTop: '1px solid #2A2520',
      }}
    >
      {/* Row 1 — Logo + tagline */}
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28, fontWeight: 700, color: '#C98A3A', lineHeight: 1 }}>
          Kaplan Beyy
        </span>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: '#A89880', letterSpacing: '0.06em' }}>
          Textile Design · TIP Karachi, Pakistan
        </span>
      </div>

      {/* Row 2 — Nav links */}
      <nav aria-label="Footer navigation">
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
          {NAV.map(n => (
            <a key={n.label} href={n.href} style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: '#6B5E52', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none', transition: 'color 0.2s ease' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#C98A3A')}
              onMouseLeave={e => (e.currentTarget.style.color = '#6B5E52')}
            >
              {n.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Row 3 — Instagram CTA button (centerpiece) */}
      <motion.a
        id="footer-instagram-btn"
        href="https://www.instagram.com/kaplan_beyy_/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow Kaplan Beyy on Instagram"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          height: 52,
          padding: '0 36px',
          borderRadius: 99,
          background: 'linear-gradient(90deg, #833AB4, #E1306C, #F56040, #FCAF45)',
          backgroundSize: '200% 100%',
          backgroundPosition: '0% 50%',
          color: '#fff',
          fontFamily: 'var(--font-sans)',
          fontSize: 14,
          fontWeight: 500,
          textDecoration: 'none',
          border: 'none',
          cursor: 'pointer',
          transition: 'background-position 0.5s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundPosition = '100% 50%')}
        onMouseLeave={e => (e.currentTarget.style.backgroundPosition = '0% 50%')}
      >
        {/* Icon with bounce on hover */}
        <motion.span
          whileHover={{ y: -3 }}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <IgIcon size={18} />
        </motion.span>
        Follow on Instagram
      </motion.a>

      {/* Row 4 — Divider */}
      <div style={{ width: '100%', maxWidth: 500, height: 1, background: '#2A2520' }} />

      {/* Row 5 — Copyright */}
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: '#6B5E52', textAlign: 'center', margin: 0 }}>
        © 2025 Kaplan Beyy (Abdul Salam) · Textile Institute of Pakistan · All rights reserved
      </p>
    </footer>
  );
}
