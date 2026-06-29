import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import ThemeToggle from './ThemeToggle';

const NAV_LINKS = [
  { label: 'Work',    href: '#work',    id: 'work'    },
  { label: 'About',  href: '#about',   id: 'about'   },
  { label: 'Skills', href: '#skills',  id: 'skills'  },
  { label: 'Contact',href: '#contact', id: 'contact' },
];

function IgIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function NavLink({ label, href, active }) {
  return (
    <a
      href={href}
      id={`nav-link-${label.toLowerCase()}`}
      style={{
        position: 'relative',
        fontFamily: 'var(--font-sans)',
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: active ? 'var(--accent)' : 'var(--text-secondary)',
        textDecoration: 'none',
        paddingBottom: 6,
        display: 'inline-block',
        transition: 'color 0.2s ease',
      }}
    >
      {label}
      {/* Hover + active underline */}
      <motion.span
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        animate={{ scaleX: active ? 1 : 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{
          position: 'absolute', left: 0, bottom: 0,
          height: 1.5, width: '100%',
          backgroundColor: 'var(--accent)',
          transformOrigin: 'left', borderRadius: 2, display: 'block',
        }}
      />
      {/* Active dot */}
      {active && (
        <span style={{
          position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%)',
          width: 3, height: 3, borderRadius: '50%', background: 'var(--accent)',
          display: 'block',
        }} />
      )}
    </a>
  );
}

export default function Navbar() {
  const navRef       = useRef(null);
  const [activeId, setActiveId] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  /* Scroll-based opacity increase */
  const bgOpacity = useTransform(scrollY, [0, 80], [0.85, 0.97]);

  /* GSAP slide-down on mount */
  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(navRef.current,
      { y: '-100%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.1 }
    );
  }, []);

  /* Active section tracking */
  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.getElementById(l.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* Close menu on scroll */
  useEffect(() => {
    const unsub = scrollY.on('change', () => setMenuOpen(false));
    return unsub;
  }, [scrollY]);

  const toggleMenu = useCallback(() => setMenuOpen(v => !v), []);

  return (
    <>
      <motion.nav
        ref={navRef}
        id="main-navbar"
        className="navbar-root"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          height: 64,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 32px',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)',
          transform: 'translateY(-100%)', opacity: 0,
        }}
      >
        {/* Dynamic background overlay using Framer Motion style */}
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, zIndex: -1,
            backgroundColor: 'var(--bg-primary)',
            opacity: bgOpacity,
          }}
        />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexShrink: 0 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 20, fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>Kaplan Beyy</span>
          <span style={{ color: 'var(--text-muted)', fontSize: 13, fontWeight: 300 }}>/ Portfolio</span>
        </div>

        {/* Center nav links (desktop) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="nav-links-group">
          {NAV_LINKS.map(lnk => (
            <NavLink key={lnk.label} {...lnk} active={activeId === lnk.id} />
          ))}
        </div>

        {/* Right: ThemeToggle + Instagram + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
          <div className="nav-desktop-right">
            <ThemeToggle />
          </div>
          <motion.a
            id="navbar-instagram-btn"
            href="https://www.instagram.com/abdulsalam"
            target="_blank" rel="noopener noreferrer"
            aria-label="Instagram"
            whileHover={{ scale: 1.05 }}
            className="nav-ig-btn"
            style={{
              height: 36, padding: '0 16px', borderRadius: 99,
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'linear-gradient(90deg,#833AB4,#E1306C,#FCAF45)',
              backgroundSize: '200% 100%', backgroundPosition: '0% 50%',
              color: '#fff', fontSize: 12, fontFamily: 'var(--font-sans)', fontWeight: 500,
              textDecoration: 'none', transition: 'background-position 0.5s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundPosition = '100% 50%')}
            onMouseLeave={e => (e.currentTarget.style.backgroundPosition = '0% 50%')}
          >
            <IgIcon size={13} /> Instagram
          </motion.a>

          {/* Hamburger (mobile only) */}
          <button
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="hamburger-btn"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', display: 'none', padding: 4 }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile full-screen drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0, width: '80%', maxWidth: 320,
              zIndex: 100,
              background: 'var(--bg-card)',
              borderLeft: '1px solid var(--border)',
              display: 'flex', flexDirection: 'column',
              padding: '80px 36px 40px',
              gap: 32,
            }}
          >
            {/* Close btn */}
            <button onClick={toggleMenu} aria-label="Close menu" style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}>
              <X size={24} />
            </button>

            {/* Nav links */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {NAV_LINKS.map((lnk, i) => (
                <motion.a
                  key={lnk.label}
                  href={lnk.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.3 }}
                  style={{ fontFamily: 'var(--font-sans)', fontSize: 22, fontWeight: 500, color: 'var(--text-primary)', textDecoration: 'none' }}
                >
                  {lnk.label}
                </motion.a>
              ))}
            </nav>

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <ThemeToggle />
              <a href="https://www.instagram.com/abdulsalam" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 99, background: 'linear-gradient(90deg,#833AB4,#E1306C,#FCAF45)', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, textDecoration: 'none', width: 'fit-content' }}>
                <IgIcon size={14} /> Instagram
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 99, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
          />
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 480px) {
          .nav-links-group  { display: none !important; }
          .nav-ig-btn       { display: none !important; }
          .nav-desktop-right { display: none !important; }
          .hamburger-btn    { display: flex !important; }
        }
        @media (max-width: 640px) {
          .nav-links-group  { display: none !important; }
          .hamburger-btn    { display: flex !important; }
        }
      `}</style>
    </>
  );
}
