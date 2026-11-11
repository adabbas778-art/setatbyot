import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, DoorOpen, DoorClosed } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { isBazaarOpen, nextOpening, getCountdown, buildGoogleCalendarLink } from '../utils/bazaarSchedule';
import lionsLogo from '../assets/lions-signature-bazaars-logo.png';
import imgHandmade   from '../assets/weekly-bazaar-handmade-crafts.jpg';
import imgSweets from '../assets/bazar-handmade-macrame.jpg';
import imgProvisions from '../assets/bazar-handmade-jewelry.jpg';
import imgGifts      from '../assets/weekly-bazaar-gifts-and-decor.jpg';

// Photo collage tiles — data-driven so photos can be replaced without
// changing the layout.
interface CollageTile {
  img: string;
  labelKey: string;
  large?: boolean;
}

const COLLAGE_TILES: CollageTile[] = [
  { labelKey: 'wbazaar.collage.handmade',   large: true, img: imgHandmade },
  { labelKey: 'wbazaar.collage.sweets',     img: imgSweets },
  { labelKey: 'wbazaar.collage.provisions', img: imgProvisions },
  { labelKey: 'wbazaar.collage.gifts',      img: imgGifts },
];

function useBazaarStatus() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);
  const open = isBazaarOpen(now);
  const countdown = open ? null : getCountdown(nextOpening(now), now);
  return { open, countdown, now };
}


const VENDOR_MAILTO = `mailto:Sponsorship@setatbyot.com?subject=${encodeURIComponent('طلب مشاركة في البازار الافتراضي')}`;

export default function WeeklyBazaar() {
  const { t, language } = useLanguage();
  const isArabic = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { open, countdown, now } = useBazaarStatus();

  const fontAr    = isArabic ? 'var(--font-arabic)' : 'var(--font-sans)';
  const fontTitle = isArabic ? 'var(--font-arabic)' : 'var(--font-serif)';
  const tAlign    = isArabic ? 'right' as const : 'left' as const;

  const countdownStr = countdown
    ? isArabic
      ? `${countdown.days} ${t('wbazaar.unit.day')} و${countdown.hours} ${t('wbazaar.unit.hour')} و${countdown.minutes} ${t('wbazaar.unit.minute')}`
      : `${countdown.days}${t('wbazaar.unit.day')} ${countdown.hours}${t('wbazaar.unit.hour')} ${countdown.minutes}${t('wbazaar.unit.minute')}`
    : '';

  const primaryBtnStyle = {
    display: 'inline-flex', alignItems: 'center', gap: '10px',
    padding: '14px 44px',
    backgroundColor: 'var(--primary)',
    border: '1px solid var(--accent-border)',
    borderRadius: '4px',
    color: 'var(--accent)',
    fontFamily: fontAr,
    fontSize: isArabic ? '1.05rem' : '0.88rem',
    fontWeight: 600,
    letterSpacing: isArabic ? '0' : '0.08em',
    textTransform: isArabic ? 'none' as const : 'uppercase' as const,
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'background 0.2s, box-shadow 0.2s',
  };

  const secondaryBtnStyle = {
    ...primaryBtnStyle,
    backgroundColor: 'transparent',
    color: 'var(--foreground)',
    border: '1px solid var(--border)',
  };

  return (
    <section
      id="bazaar"
      ref={ref}
      style={{
        padding: '100px 0',
        backgroundColor: 'var(--background)',
        borderTop: '1px solid var(--accent-border)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>

        {/* ── Header ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ height: '1px', width: '48px', background: 'linear-gradient(to right, transparent, var(--accent))' }} />
            <span style={{ color: 'var(--accent)' }}>◆</span>
            <div style={{ height: '1px', width: '48px', background: 'linear-gradient(to left, transparent, var(--accent))' }} />
          </div>

          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>
            {t('wbazaar.eyebrow')}
          </p>

          <h2 style={{
            fontFamily: fontTitle,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: isArabic ? 700 : 500,
            color: 'var(--foreground)',
            marginBottom: '20px',
          }}>
            {t('wbazaar.title')}
          </h2>

          <p style={{
            fontFamily: fontAr,
            fontSize: '1.05rem',
            color: 'var(--muted-foreground)',
            lineHeight: 1.7,
          }}>
            {t('wbazaar.subtitle')}
          </p>
        </motion.div>

        {/* ── Live status banner ────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            maxWidth: '700px',
            margin: '0 auto 56px',
            padding: '14px 22px',
            borderRadius: '999px',
            border: open ? '1px solid rgba(34,197,94,0.4)' : '1px solid var(--accent-border)',
            backgroundColor: open ? 'rgba(34,197,94,0.1)' : 'var(--accent-dim)',
            textAlign: 'center',
          }}
        >
          {open && <span className="wbazaar-dot" style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#22c55e', flexShrink: 0 }} />}
          <span style={{
            fontFamily: fontAr,
            fontSize: '0.92rem',
            fontWeight: 600,
            color: open ? '#22c55e' : 'var(--accent)',
          }}>
            {open ? t('wbazaar.status.open') : `${t('wbazaar.status.closedPrefix')} ${countdownStr}`}
          </span>
        </motion.div>

        {/* ── Photo collage (bento) ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.2 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridAutoRows: '170px',
            gap: '12px',
            marginBottom: '64px',
          }}
          className="wbazaar-collage"
        >
          {COLLAGE_TILES.map((tile, i) => (
            <div
              key={i}
              className="wbazaar-tile"
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '12px',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--surface)',
                gridRow: tile.large ? 'span 2' : undefined,
              }}
            >
              <img src={tile.img} alt={t(tile.labelKey)} className="wbazaar-tile-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <span style={{
                position: 'absolute',
                bottom: '10px',
                insetInlineStart: '10px',
                display: 'inline-block',
                backgroundColor: 'rgba(19,19,19,0.85)',
                border: '1px solid var(--accent-border)',
                color: 'var(--accent)',
                fontSize: '0.7rem',
                fontFamily: fontAr,
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: '999px',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}>
                {t(tile.labelKey)}
              </span>
            </div>
          ))}

          {/* 5th tile — solid accent, not a photo */}
          <div style={{
            borderRadius: '12px',
            border: '1px solid var(--accent-border)',
            backgroundColor: 'var(--primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '16px',
            textAlign: 'center',
          }}>
            <span style={{
              fontFamily: fontTitle,
              fontSize: '1.15rem',
              fontWeight: 700,
              color: 'var(--accent)',
              lineHeight: 1.3,
            }}>
              {t('wbazaar.collage.vendorsBadge')}
            </span>
          </div>
        </motion.div>

        {/* ── 48-hour timeline strip ────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.3 }}
          style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: '12px',
            marginBottom: '64px',
          }}
          className="wbazaar-timeline"
        >
          <div style={{
            flex: '1 1 0',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: '8px',
            padding: '24px 16px',
            border: '1px solid var(--border)',
            backgroundColor: 'var(--surface)',
            borderRadius: '10px',
            textAlign: 'center',
          }}>
            <DoorOpen size={22} strokeWidth={1.5} style={{ color: 'var(--accent)' }} />
            <span style={{ fontFamily: fontAr, fontSize: '0.9rem', fontWeight: 600, color: 'var(--foreground)' }}>
              {t('wbazaar.timeline.opens.label')}
            </span>
            <span style={{ fontFamily: fontAr, fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>
              {t('wbazaar.time.6pm')}
            </span>
          </div>

          <div style={{
            flex: '1.4 1 0',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: '8px',
            padding: '24px 16px',
            border: '1px solid var(--accent-border)',
            backgroundColor: 'var(--accent-dim)',
            borderRadius: '10px',
            textAlign: 'center',
          }}>
            <Clock size={24} strokeWidth={1.5} style={{ color: 'var(--accent)' }} />
            <span style={{ fontFamily: fontAr, fontSize: '0.95rem', fontWeight: 700, color: 'var(--foreground)' }}>
              {t('wbazaar.timeline.center.title')}
            </span>
            <span style={{ fontFamily: fontAr, fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>
              {t('wbazaar.timeline.center.sub')}
            </span>
          </div>

          <div style={{
            flex: '1 1 0',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: '8px',
            padding: '24px 16px',
            border: '1px solid var(--border)',
            backgroundColor: 'var(--surface)',
            borderRadius: '10px',
            textAlign: 'center',
          }}>
            <DoorClosed size={22} strokeWidth={1.5} style={{ color: 'var(--accent)' }} />
            <span style={{ fontFamily: fontAr, fontSize: '0.9rem', fontWeight: 600, color: 'var(--foreground)' }}>
              {t('wbazaar.timeline.closes.label')}
            </span>
            <span style={{ fontFamily: fontAr, fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>
              {t('wbazaar.time.6pm')}
            </span>
          </div>
        </motion.div>

        {/* ── Partner card ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.4 }}
          style={{
            border: '1px solid var(--border)',
            backgroundColor: 'var(--surface)',
            padding: '28px 36px',
            marginBottom: '56px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', direction: 'ltr' }} className="wbazaar-partner-body">
            <div style={{
              flexShrink: 0,
              width: '160px',
              padding: '16px',
              border: '1px solid var(--border)',
              backgroundColor: '#faf7f0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: '12px',
            }}>
              <img src={lionsLogo} alt="Lions Signature Bazzars" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
            <div style={{ flex: 1, textAlign: tAlign }}>
              <p style={{ fontFamily: fontAr, fontSize: '0.8rem', color: 'var(--muted-foreground)', marginBottom: '4px' }}>
                {t('wbazaar.partner.heldWith')}
              </p>
              <p style={{ fontFamily: fontTitle, fontSize: '1.2rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '4px' }}>
                {t('wbazaar.partner.name')}
              </p>
              <p style={{ fontFamily: fontAr, fontSize: '0.8rem', color: 'var(--accent)' }}>
                {t('wbazaar.partner.badge')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── CTAs ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}
          className="wbazaar-cta-row"
        >
          {open ? (
            // TODO: replace with the real bazaar listings route/deep-link once it exists
            <a href="/bazaar" style={primaryBtnStyle} className="wbazaar-cta-btn">
              <span style={{ fontSize: '0.9rem' }}>◆</span>
              {t('wbazaar.cta.shopNow')}
            </a>
          ) : (
            <a href={buildGoogleCalendarLink(now)} target="_blank" rel="noopener noreferrer" style={primaryBtnStyle} className="wbazaar-cta-btn">
              <span style={{ fontSize: '0.9rem' }}>◆</span>
              {t('wbazaar.cta.remindMe')}
            </a>
          )}

          {/* TODO: swap for a dedicated vendor-application email/route if one is set up later */}
          <a href={VENDOR_MAILTO} style={secondaryBtnStyle} className="wbazaar-cta-btn wbazaar-cta-btn-outline">
            {t('wbazaar.cta.vendorBooth')}
          </a>
        </motion.div>
      </div>

      <style>{`
        @keyframes wbazaarPulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
        .wbazaar-dot { animation: wbazaarPulseDot 1.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .wbazaar-dot { animation: none; }
        }

        .wbazaar-tile:hover .wbazaar-tile-img { transform: scale(1.08); }
        .wbazaar-tile-img { transition: transform 0.7s ease; }

        .wbazaar-cta-btn:hover {
          background: var(--primary-hover) !important;
          box-shadow: var(--accent-glow) !important;
        }
        .wbazaar-cta-btn-outline:hover {
          background: var(--accent-dim) !important;
          border-color: var(--accent) !important;
          color: var(--accent) !important;
        }

        @media (max-width: 768px) {
          .wbazaar-collage { grid-template-columns: repeat(2, 1fr) !important; grid-auto-rows: 150px !important; }
          .wbazaar-timeline { flex-direction: column !important; }
        }
        @media (max-width: 560px) {
          .wbazaar-partner-body { flex-direction: column !important; text-align: center !important; }
          .wbazaar-cta-row { flex-direction: column !important; align-items: stretch !important; }
          .wbazaar-cta-btn { justify-content: center !important; width: 100% !important; }
          #bazaar > div { padding: 0 20px !important; }
        }
      `}</style>
    </section>
  );
}
