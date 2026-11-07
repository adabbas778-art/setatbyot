import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

// New market images
import marketCars from '../assets/market-cars.jpg';
import marketTelecom from '../assets/market-telecom.jpg';
import marketBanks from '../assets/bank.jpeg';
import marketElectronics from '../assets/market-electronics.jpg';
import marketFactories from '../assets/market-food-factories.jpg';
import marketFurniture from '../assets/market-furniture.jpg';
import marketWater from '../assets/market-water.jpg';

// Original images kept as requested
import marketSalads from '../assets/market-fresh-fruit-display.jpg';
import marketRice from '../assets/market-rice-provisions.jpg';

type MarketItem = { img: string; labelAr: string; labelEn: string };

// Three images on each side, all with equal height.
const LEFT_PRODUCTS: MarketItem[] = [
  { img: marketTelecom, labelAr: 'قطاع الاتصالات', labelEn: 'Telecommunications' },
  { img: marketRice, labelAr: 'الأرز والمواد التموينية', labelEn: 'Rice & Provisions' },
  { img: marketFactories, labelAr: 'مصانع الأغذية', labelEn: 'Food Manufacturing' },
];

const CENTER_PRODUCTS: MarketItem[] = [
  { img: marketBanks, labelAr: 'قطاع البنوك', labelEn: 'Banks' },
  { img: marketElectronics, labelAr: 'الكهربائيات', labelEn: 'Electronics & Appliances' },
  { img: marketFurniture, labelAr: 'المفروشات', labelEn: 'Furniture' },
];

const RIGHT_PRODUCTS: MarketItem[] = [
  { img: marketSalads, labelAr: 'سلطات', labelEn: 'Salads' },
  { img: marketCars, labelAr: 'السيارات', labelEn: 'Cars' },
  { img: marketWater, labelAr: 'المياه', labelEn: 'Water & Filtration' },
];

const MARKET_COLUMNS = [
  { name: 'left', items: LEFT_PRODUCTS },
  { name: 'center', items: CENTER_PRODUCTS },
  { name: 'right', items: RIGHT_PRODUCTS },
];

export default function SmartBazar() {
  const { t, language } = useLanguage();
  const isArabic = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="market"
      ref={ref}
      style={{
        padding: '100px 0',
        backgroundColor: 'var(--surface)',
        borderTop: '1px solid var(--accent-border)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>

        {/* ── Header ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 64px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ height: '1px', width: '48px', background: 'linear-gradient(to right, transparent, var(--accent))' }} />
            <span style={{ color: 'var(--accent)' }}>◆</span>
            <div style={{ height: '1px', width: '48px', background: 'linear-gradient(to left, transparent, var(--accent))' }} />
          </div>

          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>
            {t('market.subtitle')}
          </p>

          <h2 style={{
            fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-serif)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: isArabic ? 700 : 500,
            color: 'var(--foreground)',
            marginBottom: '20px',
          }}>
            {t('market.title')}
          </h2>

          <p style={{
            fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-sans)',
            fontSize: '1.05rem',
            color: 'var(--muted-foreground)',
            lineHeight: 1.7,
          }}>
            {t('market.desc')}
          </p>
        </motion.div>

        {/* ── Balanced market mosaic: 3 equal-sized cards on each side ─── */}
        <div className="bazar-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr 1fr',
          height: '660px',
          direction: 'ltr', // Maintain positions in Arabic and English
          gap: '12px',
        }}>
          {MARKET_COLUMNS.map((column, columnIndex) => (
            <div
              key={column.name}
              className={`bazar-column bazar-column-${column.name}`}
              style={{
                display: 'grid',
                gridTemplateRows: column.name === 'center' ? '2.2fr 0.9fr 0.9fr' : 'repeat(3, minmax(0, 1fr))',
                minWidth: 0,
                minHeight: 0,
                gap: '12px',
              }}
            >
              {column.items.map((p, i) => (
                <motion.div
                  key={`${column.name}-${i}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: (columnIndex * 3 + i) * 0.08 }}
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    minWidth: 0,
                    minHeight: 0,
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--surface)',
                    transition: 'border-color 0.3s',
                    cursor: 'pointer',
                  }}
                  className={`bazar-card${column.name === 'center' && i === 0 ? ' bazar-card--feature' : ''}`}
                >
                  <img
                    src={p.img}
                    alt={isArabic ? p.labelAr : p.labelEn}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.7s ease' }}
                    className="bazar-img"
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundColor: 'rgba(19,19,19,0.12)',
                    transition: 'background-color 0.4s',
                  }} className="bazar-overlay" />
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    padding: '16px', opacity: 0, transition: 'opacity 0.3s',
                  }} className="bazar-label">
                    <span style={{
                      display: 'inline-block',
                      backgroundColor: 'rgba(19,19,19,0.85)',
                      border: '1px solid var(--accent-border)',
                      color: 'var(--accent)',
                      fontSize: '0.72rem',
                      fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-sans)',
                      fontWeight: 600,
                      letterSpacing: isArabic ? '0' : '0.1em',
                      textTransform: isArabic ? 'none' : 'uppercase',
                      padding: '4px 12px',
                      backdropFilter: 'blur(8px)',
                    }}>
                      ◆ {isArabic ? p.labelAr : p.labelEn}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>

        {/* ── Partner button ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{ display: 'flex', justifyContent: 'center', marginTop: '48px' }}
        >
          <a
            href="mailto:sponsorship@setatbyot.com"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 44px',
              backgroundColor: 'var(--primary)',
              border: '1px solid var(--accent-border)',
              borderRadius: '4px',
              color: 'var(--accent)',
              fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-sans)',
              fontSize: isArabic ? '1.05rem' : '0.88rem',
              fontWeight: 600,
              letterSpacing: isArabic ? '0' : '0.08em',
              textTransform: isArabic ? 'none' : 'uppercase',
              textDecoration: 'none',
              transition: 'background 0.2s, box-shadow 0.2s',
            }}
            className="bazar-btn"
          >
            <span>◆</span>
            {t('market.partnerBtn')}
          </a>
        </motion.div>
      </div>

      <style>{`
        .bazar-card:hover { border-color: rgba(230,195,100,0.6) !important; }
        .bazar-card:hover .bazar-img { transform: scale(1.06) !important; }
        .bazar-card:hover .bazar-overlay { background-color: transparent !important; }
        .bazar-card:hover .bazar-label { opacity: 1 !important; }
        .bazar-btn:hover { background: var(--primary-hover) !important; box-shadow: var(--accent-glow) !important; }
        @media (max-width: 768px) {
          .bazar-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; height: auto !important; }
          .bazar-column { display: contents !important; }
          .bazar-card { height: 190px !important; }
          .bazar-card--feature { grid-column: span 2 !important; height: 280px !important; }
        }
        @media (max-width: 480px) {
          .bazar-grid { grid-template-columns: 1fr !important; }
          .bazar-card { height: 210px !important; }
          .bazar-card--feature { grid-column: span 1 !important; height: 260px !important; }
        }
      `}</style>
    </section>
  );
}
