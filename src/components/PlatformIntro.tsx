import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const STATS = [
  { val: 'intro.stat1.val', lbl: 'intro.stat1.lbl' },
  { val: 'intro.stat2.val', lbl: 'intro.stat2.lbl' },
];

const SERVICES = [
   'services.1',
  'services.2',
  'services.3',
  'services.4',
];

function GoldDivider() {
  return (
    <div style={{
      height: '1px',
      width: '120px',
      background: 'linear-gradient(to right, transparent, var(--accent), transparent)',
      margin: '0 auto',
    }} />
  );
}

function DiamondRow() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      marginBottom: '24px',
    }}>
      <div style={{ height: '1px', width: '48px', background: 'linear-gradient(to right, transparent, var(--accent))' }} />
      <span style={{ color: 'var(--accent)', fontSize: '0.9rem' }}>◆</span>
      <div style={{ height: '1px', width: '48px', background: 'linear-gradient(to left, transparent, var(--accent))' }} />
    </div>
  );
}

export default function PlatformIntro() {
  const { t, language } = useLanguage();
  const isArabic = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      id="intro"
      ref={ref}
      style={{
        backgroundColor: 'var(--background)',
        borderBottom: '1px solid var(--accent-border)',
      }}
    >

      {/* ── Part 1: Title + description + stats + ISO ─────── */}
      <div style={{ padding: '100px 0 80px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 40px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center' }}
          >
            <DiamondRow />

            {/* Title */}
            <h2 style={{
              fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: isArabic ? 700 : 500,
              color: 'var(--foreground)',
              lineHeight: 1.25,
              marginBottom: '24px',
            }}>
              {t('intro.title')}
            </h2>

            {/* Description */}
            <p style={{
              fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-sans)',
              fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
              color: 'var(--muted-foreground)',
              maxWidth: '760px',
              margin: '0 auto 64px',
              lineHeight: 1.8,
            }}>
              {t('intro.desc')}
            </p>

            {/* Stats + ISO grid — 2 columns, 2 rows */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}
              className="stats-grid"
            >
              {/* Stat cards */}
              {STATS.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '32px 16px',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--surface)',
                    transition: 'border-color 0.25s, box-shadow 0.25s',
                    cursor: 'default',
                  }}
                  className="stat-card"
                >
                  <div style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                    fontWeight: 700,
                    color: 'var(--accent)',
                    marginBottom: '8px',
                    lineHeight: 1,
                  }}>
                    {t(stat.val)}
                  </div>
                  <div style={{
                    fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-sans)',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: isArabic ? '0' : '0.08em',
                    textTransform: isArabic ? 'none' : 'uppercase',
                    color: 'var(--muted-foreground)',
                    textAlign: 'center',
                    lineHeight: 1.4,
                  }}>
                    {t(stat.lbl)}
                  </div>
                </motion.div>
              ))}

              {/* ISO 9001 — clickable, same size as stat cards */}
              <motion.a
                href="https://www.iafcertsearch.org/certification/mmtODvRNpvK5ym1UqGxxECcb"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '32px 16px',
                  border: '1px solid var(--accent-border)',
                  backgroundColor: 'var(--surface)',
                  color: 'var(--accent)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(1rem, 2vw, 1.4rem)',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                className="iso-badge-link"
              >
                <span style={{ fontSize: '1.1rem', color: 'var(--accent)' }}>✓</span>
                ISO 9001
              </motion.a>

              {/* ISO 27001 — same size as stat cards */}
              <motion.a
                href="https://www.iafcertsearch.org/certification/mmtODvRNpvK5ym1UqGxxECcb"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '32px 16px',
                  border: '1px solid var(--accent-border)',
                  backgroundColor: 'var(--surface)',
                  color: 'var(--accent)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(1rem, 2vw, 1.4rem)',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                className="iso-badge-link"
              >
                <span style={{ fontSize: '1.1rem', color: 'var(--accent)' }}>✓</span>
                ISO 27001
              </motion.a>
            </div>

          </motion.div>
        </div>
      </div>

      {/* ── Part 2: Services grid ────────────────────────── */}
      <div style={{ padding: '80px 0 100px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 40px' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h3 style={{
                fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-serif)',
                fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                fontWeight: isArabic ? 700 : 500,
                color: 'var(--foreground)',
                marginBottom: '16px',
              }}>
                {t('services.title')}
              </h3>
              <p style={{
                fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-sans)',
                fontSize: '1rem',
                color: 'var(--muted-foreground)',
                maxWidth: '600px',
                margin: '0 auto 24px',
                lineHeight: 1.7,
              }}>
                {t('services.desc')}
              </p>
              <GoldDivider />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}
              className="services-grid"
            >
              {SERVICES.map((key, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.04 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '20px 24px',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--surface)',
                    transition: 'border-color 0.25s, background 0.25s',
                    cursor: 'default',
                  }}
                  className="service-item"
                >
                  <span style={{ color: 'var(--accent)', fontSize: '0.6rem', flexShrink: 0, transition: 'transform 0.2s' }}
                    className="service-diamond"
                  >◆</span>
                  <span style={{
                    fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-sans)',
                    fontSize: isArabic ? '0.95rem' : '0.85rem',
                    color: 'var(--foreground)',
                    lineHeight: 1.4,
                  }}>
                    {t(key)}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Scoped styles ─────────────────────────────────── */}
      <style>{`
        .stat-card:hover {
          border-color: rgba(230,195,100,0.4) !important;
          box-shadow: 0 0 24px rgba(230,195,100,0.08) !important;
        }
        .iso-badge-link:hover {
          border-color: var(--accent) !important;
          box-shadow: var(--accent-glow) !important;
        }
        .service-item:hover {
          border-color: var(--accent-border) !important;
          background: var(--surface-high) !important;
        }
        .service-item:hover .service-diamond {
          transform: scale(1.4) !important;
        }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          #intro > div > div { padding: 0 20px !important; }
        }
      `}</style>
    </section>
  );
}
