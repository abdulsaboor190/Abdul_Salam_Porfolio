import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const curr = useRef({ x: -100, y: -100 });
  const expanded = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    /* RAF loop — smooth lag follow */
    let raf;
    function tick() {
      curr.current.x += (pos.current.x - curr.current.x) * 0.18;
      curr.current.y += (pos.current.y - curr.current.y) * 0.18;
      cursor.style.transform = `translate(${curr.current.x - (expanded.current ? 20 : 6)}px, ${curr.current.y - (expanded.current ? 20 : 6)}px)`;
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    function onMove(e) {
      pos.current = { x: e.clientX, y: e.clientY };
    }

    function onEnterInteractive() {
      expanded.current = true;
      cursor.style.width = '40px';
      cursor.style.height = '40px';
      cursor.style.opacity = '0.35';
    }

    function onLeaveInteractive() {
      expanded.current = false;
      cursor.style.width = '12px';
      cursor.style.height = '12px';
      cursor.style.opacity = '1';
    }

    /* Attach to all interactive elements */
    const selectors = 'a, button, [role="button"], .contact-card, .skill-pill, .swatch-card';
    function attachListeners() {
      document.querySelectorAll(selectors).forEach(el => {
        el.addEventListener('mouseenter', onEnterInteractive);
        el.addEventListener('mouseleave', onLeaveInteractive);
      });
    }

    document.addEventListener('mousemove', onMove);
    attachListeners();

    /* Re-attach on DOM mutations (dynamic components) */
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 12, height: 12,
          borderRadius: '50%',
          background: 'var(--accent)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease',
          willChange: 'transform',
          mixBlendMode: 'multiply',
        }}
      />
      {/* Hide on touch devices */}
      <style>{`
        @media (pointer: coarse) {
          [aria-hidden="true"][style*="position: fixed"][style*="border-radius: 50%"] { display: none !important; }
        }
        body { cursor: none; }
        @media (pointer: coarse) { body { cursor: auto; } }
      `}</style>
    </>
  );
}
