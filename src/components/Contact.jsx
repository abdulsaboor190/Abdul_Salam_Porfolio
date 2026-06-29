import { memo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin } from 'lucide-react';

const CARDS = [
  { Icon: Mail,    label: 'Email',    value: 'kablanbeyyciim@gmail.com',  href: 'mailto:kablanbeyyciim@gmail.com', target: '_self' },
  { Icon: Phone,   label: 'Phone',    value: '+92 305 3728223',          href: 'tel:+923053728223', target: '_self' },
  { Icon: MapPin,  label: 'Location', value: 'TIP Karachi, Sindh, PK',   href: 'https://maps.google.com/?q=Textile+Institute+of+Pakistan+Karachi', target: '_blank' },
];

const ContactCard = memo(function ContactCard({ Icon, label, value, href, target, index }) {
  const content = (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="contact-card"
      style={{
        background: 'var(--bg-card)',
        border: '0.5px solid var(--border)',
        borderRadius: 16,
        padding: '28px 20px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        cursor: href ? 'pointer' : 'default',
        textDecoration: 'none',
        transition: 'border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Icon circle */}
      <div style={{
        width: 52, height: 52, borderRadius: '50%',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Icon size={20} color="var(--accent)" strokeWidth={1.8} aria-hidden="true" />
      </div>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: 0 }}>
        {label}
      </p>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', margin: 0, wordBreak: 'break-all' }}>
        {value}
      </p>
    </motion.div>
  );

  return href
    ? <a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined} style={{ textDecoration: 'none', display: 'block' }}>{content}</a>
    : content;
});

export default function Contact() {
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [cardsRef,  cardsInView]  = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="contact" style={{ padding: '100px 6%', background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: 52 }}
        >
          <h2 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 14 }}>
            Get in touch
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 480, margin: '0 auto' }}>
            Available for internships, freelance textile design projects, and collaborations with Kaplan Beyy (Abdul Salam).
          </p>
        </motion.div>

        {/* Cards grid */}
        <div
          ref={cardsRef}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}
          className="contact-grid"
        >
          {cardsInView && CARDS.map((card, i) => (
            <ContactCard key={card.label} {...card} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .contact-card:hover {
          border-color: var(--accent) !important;
          transform: translateY(-4px) !important;
          box-shadow: 0 12px 32px rgba(0,0,0,0.08) !important;
        }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; max-width: 360px; margin: 0 auto; }
        }
      `}</style>
    </section>
  );
}
