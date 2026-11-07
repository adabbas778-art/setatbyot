import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

import catFood from '../assets/project-kitchens.png';
import catBeverages from '../assets/project-bazaars.png';
import catHandmade from '../assets/project-handicrafts.jpeg';
import catProcessing from '../assets/project-markets.png';

// Menu pages rendered from the current Setat Byot PDF menu.
import menu1 from '../assets/menu/setat-byot-menu-cover.png';
import menu2 from '../assets/menu/setat-byot-menu-international-cuisines.png';
import menu3 from '../assets/menu/setat-byot-menu-manakish-and-pastries.png';
import menu4 from '../assets/menu/setat-byot-menu-jordanian-and-palestinian.png';
import menu5 from '../assets/menu/setat-byot-menu-lebanese-syrian-and-salads.png';
import menu6 from '../assets/menu/setat-byot-menu-desserts-and-beverages.png';

const MENU_PAGES = [menu1, menu2, menu3, menu4, menu5, menu6];



const CATEGORIES = [
  {
    id: 'food',
    titleKey: 'project.kitchens',
    descKey: 'project.kitchens.desc',
    img: catFood
  },
  {
    id: 'beverages',
    titleKey: 'project.bazaars',
    descKey: 'project.bazaars.desc',
    img: catBeverages
  },
  {
    id: 'handmade',
    titleKey: 'project.handicrafts',
    descKey: 'project.handicrafts.desc',
    img: catHandmade
  },
  {
    id: 'processing',
    titleKey: 'project.markets',
    descKey: 'project.markets.desc',
    img: catProcessing
  },
];
function MenuModal({ onClose }: { onClose: () => void }) {
  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(0,0,0,0.92)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        overflowY: 'auto',
        padding: '40px 16px',
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1001,
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.6)',
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: '50%',
          color: '#fff',
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
        }}
        aria-label="Close menu"
      >
        <X size={20} />
      </button>

      {/* Menu images — click inside stops propagation so only backdrop closes */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          width: '100%',
          maxWidth: '500px',
        }}
      >
        {MENU_PAGES.map((src, i) => (
          <motion.img
            key={i}
            src={src}
            alt={`Menu page ${i + 1}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            style={{
              width: '100%',
              borderRadius: '4px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              display: 'block',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function Categories() {
  const { t, language } = useLanguage();
  const isArabic = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section
      id="categories"
      ref={ref}
      style={{
        padding: '100px 0',
        backgroundColor: 'var(--background)',
        borderTop: '1px solid var(--accent-border)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '16px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ height: '1px', width: '48px', background: 'linear-gradient(to right, transparent, var(--accent))' }} />
            <span style={{ color: 'var(--accent)' }}>◆</span>
            <div style={{ height: '1px', width: '48px', background: 'linear-gradient(to left, transparent, var(--accent))' }} />
          </div>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '12px',
          }}>
            {t('categories.subtitle')}
          </p>
          <h2 style={{
            fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-serif)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: isArabic ? 700 : 500,
            color: 'var(--foreground)',
            marginBottom: '16px',
          }}>
            {t('categories.title')}
          </h2>
          <p style={{
            fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-sans)',
            fontSize: '1rem',
            color: 'var(--muted-foreground)',
            maxWidth: '600px',
            margin: '0 auto 40px',
            lineHeight: 1.7,
          }}>
            {t('categories.desc')}
          </p>
        </motion.div>

   <div style={{
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '45px',
}}>
  <motion.div
    whileHover={{
      y: -6,
      scale: 1.04,
      borderColor: 'var(--accent)',
      boxShadow: '0 12px 35px rgba(212,175,55,0.20)',
    }}
    transition={{
      duration: 0.3,
      ease: 'easeOut',
    }}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      padding: '20px 42px',
      minWidth: '220px',
      border: '1px solid var(--border)',
      backgroundColor: 'var(--surface)',
      borderRadius: '4px',
      textAlign: 'center',
    }}
  >
    <span style={{
      color: 'var(--accent)',
      fontSize: '1.5rem',
    }}>
      ✦
    </span>

    <span style={{
      fontFamily: isArabic
        ? 'var(--font-arabic)'
        : 'var(--font-sans)',
      fontSize: '1.2rem',
      fontWeight: 700,
      color: 'var(--foreground)',
    }}>
      {isArabic ? 'شبكة المشاريع' : 'Projects Network'}
    </span>

    <div style={{
      width: '45px',
      height: '2px',
      backgroundColor: 'var(--accent)',
    }} />
  </motion.div>
</div>

        {/* Category cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }} className="categories-grid">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
              style={{
                position: 'relative',
                height: '420px',
                overflow: 'hidden',
                cursor: 'pointer',
                backgroundColor: 'var(--surface)',
              }}
              className="cat-card"
            >
              <img
                src={cat.img}
                alt={t(cat.titleKey)}
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.7s ease',
                }}
                className="cat-img"
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, var(--background) 0%, rgba(19,19,19,0.5) 50%, transparent 100%)',
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                border: '1px solid transparent',
                transition: 'border-color 0.3s',
                zIndex: 2,
                pointerEvents: 'none',
              }} className="cat-border" />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px', zIndex: 3 }}>
                <h3 style={{
                  fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-serif)',
                  fontSize: '1.4rem',
                  fontWeight: isArabic ? 700 : 400,
                  color: 'var(--foreground)',
                  marginBottom: '8px',
                }}>
                  {t(cat.titleKey)}
                </h3>
                <p style={{
                  fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-sans)',
                  fontSize: '0.82rem',
                  color: 'var(--muted-foreground)',
                  lineHeight: 1.5,
                  opacity: 0,
                  transition: 'opacity 0.3s 0.05s',
                }} className="cat-desc">
                  {t(cat.descKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View Menu button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          style={{ display: 'flex', justifyContent: 'center', marginTop: '48px' }}
        >
          <button
            onClick={() => setMenuOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 40px',
              border: '1px solid var(--accent-border)',
              backgroundColor: 'var(--primary)',
              color: 'var(--accent)',
              fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-sans)',
              fontSize: isArabic ? '1.05rem' : '0.88rem',
              fontWeight: 600,
              letterSpacing: isArabic ? '0' : '0.08em',
              textTransform: isArabic ? 'none' : 'uppercase',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background 0.2s, box-shadow 0.2s',
            }}
            className="menu-btn"
          >
            <span style={{ fontSize: '1rem' }}>◆</span>
            {t('categories.viewMenu')}
          </button>
        </motion.div>
      </div>

      {/* Menu modal */}
      <AnimatePresence>
        {menuOpen && <MenuModal onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>

      <style>{`
        .cuisine-tag:hover { border-color: rgba(230,195,100,0.4) !important; color: var(--foreground) !important; }
        .cat-card:hover .cat-img { transform: scale(1.08) !important; }
        .cat-card:hover .cat-border { border-color: rgba(230,195,100,0.7) !important; }
        .cat-card:hover .cat-desc { opacity: 1 !important; }
        .menu-btn:hover { background: var(--primary-hover) !important; box-shadow: var(--accent-glow) !important; }
        @media (max-width: 900px) {
          .categories-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .categories-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
