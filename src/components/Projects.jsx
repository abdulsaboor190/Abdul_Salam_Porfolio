import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ProjectCard from './ProjectCard';

const PROJECTS = [
  {
    id: 'titanic-cruella',
    name: 'Titanic × Cruella',
    category: 'Fashion Illustration',
    categoryGroup: 'Illustration',
    year: 2024,
    tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Concept Development'],
    description: "A narrative-driven collection merging Titanic-era luxury silhouettes with Cruella's dramatic aesthetic through structured forms and monochromatic contrast.",
    layoutStyle: 'featured',
  },
  {
    id: 'dragon-theme',
    name: 'Dragon Theme',
    category: 'Textile Illustration',
    categoryGroup: 'Illustration',
    year: 2024,
    tools: ['Adobe Photoshop', 'Surface Design', 'Pattern Making'],
    description: 'A fantasy-inspired textile collection built on scale-like motifs and bold textures, translating organic creature patterns into print-ready wearable fashion concepts.',
    layoutStyle: 'standard',
  },
  {
    id: 'architectural-patterns',
    name: 'Architectural Patterns',
    category: 'Pattern Design',
    categoryGroup: 'Pattern',
    year: 2024,
    tools: ['Adobe Illustrator', 'Repeat Pattern Design', 'Geometric Design'],
    description: 'A repeat-pattern collection translating campus architectural geometry into cohesive textile surface designs for apparel and home textile applications.',
    layoutStyle: 'standard',
  },
  {
    id: 'bioplastic-packaging',
    name: 'Bioplastic Packaging',
    category: 'Sustainability Research',
    categoryGroup: 'Sustainability',
    year: 2025,
    tools: ['Biopolymer Development', 'Circular Economy', 'Material Research'],
    description: 'A biodegradable packaging prototype from orange and lemon peel waste, extracting pectin-based biopolymers as plastic alternatives for the textile supply chain.',
    layoutStyle: 'featured',
  },
];

const CATEGORIES = ['All', 'Illustration', 'Pattern', 'Sustainability'];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Projects() {
  const [activeTab, setActiveTab] = useState('All');
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const filteredProjects = useMemo(() => {
    if (activeTab === 'All') return PROJECTS;
    return PROJECTS.filter(p => p.categoryGroup === activeTab);
  }, [activeTab]);

  return (
    <section
      id="work"
      style={{ padding: '120px 6%', background: 'var(--bg-primary)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header and Filter Controls Row */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            marginBottom: 56,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>
                Curated Portfolio Showcase
              </motion.p>
              <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(36px, 4.5vw, 52px)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.1, margin: 0 }}>
                Selected Projects
              </motion.h2>
            </div>

            {/* Filter Pills */}
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 12,
                    fontWeight: 500,
                    padding: '8px 20px',
                    borderRadius: 99,
                    border: '1px solid',
                    borderColor: activeTab === cat ? 'var(--accent)' : 'var(--border)',
                    backgroundColor: activeTab === cat ? 'var(--accent)' : 'var(--bg-card)',
                    color: activeTab === cat ? '#fff' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Modern Bento Showcase Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 28,
            }}
            className="projects-bento-grid"
          >
            {filteredProjects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                layoutStyle={activeTab === 'All' ? project.layoutStyle : 'featured'}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .projects-bento-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
