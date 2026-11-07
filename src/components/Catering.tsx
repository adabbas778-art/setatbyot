import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  ChefHat,
  Truck,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import cateringImg from '../assets/catering-event-food-display.jpeg';
import cateringDetailImg from '../assets/catering-event-service-team.jpeg';

const STEPS = [
  { icon: CalendarDays, titleKey: 'catering.step1.title', descKey: 'catering.step1.desc' },
  { icon: ChefHat, titleKey: 'catering.step2.title', descKey: 'catering.step2.desc' },
  { icon: Truck, titleKey: 'catering.step3.title', descKey: 'catering.step3.desc' },
];

const OCCASIONS = [
  'catering.occasion.weddings',
  'catering.occasion.conferences',
  'catering.occasion.condolences',
  'catering.occasion.official',
  'catering.occasion.home',
];

const BOOK_MAILTO = `mailto:Catering@setatbyot.com?subject=${encodeURIComponent('طلب خدمة كيترينج - ستات بيوت')}`;
const WHATSAPP_URL = `https://wa.me/962777233400?text=${encodeURIComponent('مرحباً، أرغب بالاستفسار عن خدمات الكيترينج')}`;

function WhatsAppIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.5 11.6a8.5 8.5 0 0 1-12.56 7.47L3.5 20.5l1.45-4.3A8.5 8.5 0 1 1 20.5 11.6Z" />
      <path d="M8.1 7.4c.25-.28.62-.23.82-.05l1.13 1.45c.16.21.17.49.03.71l-.55.87c.57 1.23 1.56 2.22 2.79 2.79l.87-.55c.22-.14.5-.13.71.03l1.45 1.13c.18.2.23.57-.05.82-.55.5-1.27.77-2.01.74-3.63-.17-6.54-3.08-6.71-6.71-.03-.74.24-1.46.74-2.01Z" />
    </svg>
  );
}

export default function Catering() {
  const { t, language } = useLanguage();
  const isArabic = language === 'ar';
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });

  const fontBody = isArabic ? 'var(--font-arabic)' : 'var(--font-sans)';
  const fontTitle = isArabic ? 'var(--font-arabic)' : 'var(--font-serif)';

  return (
    <section id="catering" ref={ref}>
      <div className="catering-ambient catering-ambient-one" />
      <div className="catering-ambient catering-ambient-two" />

      <div className="catering-shell">
        <motion.header
          initial={{ opacity: 0, y: 22 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="catering-heading"
        >
          <div className="catering-kicker" style={{ fontFamily: fontBody }}>
            <span className="catering-kicker-line" />
            <span>{t('catering.subtitle')}</span>
          </div>

          <div className="catering-heading-grid">
            <h2 style={{ fontFamily: fontTitle }}>{t('catering.title')}</h2>
            <p style={{ fontFamily: fontBody }}>{t('catering.trust')}</p>
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.12 }}
          className="catering-editorial"
        >
          <div className="catering-visual">
            <div className="catering-visual-frame">
              <img
                src={cateringImg}
                alt={t('catering.photo.special')}
                className="catering-main-image"
              />
              <div className="catering-image-shade" />

              <div className="catering-image-label" style={{ fontFamily: fontBody }}>
                <ChefHat size={15} strokeWidth={1.7} />
                <span>{t('catering.banner.badge')}</span>
              </div>

              <div className="catering-occasion-list">
                {OCCASIONS.map(key => (
                  <span key={key} style={{ fontFamily: fontBody }}>
                    {t(key)}
                  </span>
                ))}
              </div>
            </div>

            <div className="catering-event-card">
              <img src={cateringDetailImg} alt={t('catering.photo.special')} />
              <span style={{ fontFamily: fontBody }}>{t('catering.banner.badge')}</span>
            </div>
          </div>

          <aside className="catering-booking-card">
            <div className="catering-panel-topline">
              <span className="catering-panel-diamond">◆</span>
              <span className="catering-iso" style={{ fontFamily: fontBody }}>
                <BadgeCheck size={16} strokeWidth={1.7} />
                ISO 9001
              </span>
            </div>

            <div>
              <p className="catering-panel-eyebrow" style={{ fontFamily: fontBody }}>
                {t('catering.banner.badge')}
              </p>
              <h3 style={{ fontFamily: fontTitle }}>{t('catering.banner.headline')}</h3>
              <p className="catering-panel-copy" style={{ fontFamily: fontBody }}>
                {t('catering.banner.subline')}
              </p>
            </div>

            <div className="catering-panel-services">
              {STEPS.map(({ icon: Icon, titleKey }) => (
                <div key={titleKey} className="catering-panel-service">
                  <span className="catering-service-icon"><Icon size={17} strokeWidth={1.6} /></span>
                  <span style={{ fontFamily: fontBody }}>{t(titleKey)}</span>
                </div>
              ))}
            </div>

            <div className="catering-actions">
              <a href={BOOK_MAILTO} className="catering-book-btn" style={{ fontFamily: fontBody }}>
                <span>{t('catering.cta.book')}</span>
                <ArrowUpRight size={18} strokeWidth={1.8} />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="catering-whatsapp-btn"
                aria-label={t('catering.cta.whatsapp')}
              >
                <WhatsAppIcon />
              </a>
            </div>
          </aside>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.28 }}
          className="catering-journey"
        >
          {STEPS.map(({ icon: Icon, titleKey, descKey }, index) => (
            <article key={titleKey} className="catering-journey-step">
              <div className="catering-step-meta">
                <span className="catering-step-number">0{index + 1}</span>
                <span className="catering-step-icon"><Icon size={20} strokeWidth={1.5} /></span>
              </div>
              <h4 style={{ fontFamily: fontTitle }}>{t(titleKey)}</h4>
              <p style={{ fontFamily: fontBody }}>{t(descKey)}</p>
            </article>
          ))}
        </motion.div>
      </div>

      <style>{`
        #catering {
          position: relative;
          overflow: hidden;
          padding: 120px 0;
          background: var(--background);
          border-top: 1px solid var(--accent-border);
        }

        .catering-shell {
          position: relative;
          z-index: 1;
          width: min(1200px, calc(100% - 80px));
          margin: 0 auto;
        }

        .catering-ambient {
          position: absolute;
          pointer-events: none;
          border-radius: 50%;
          filter: blur(2px);
        }
        .catering-ambient-one {
          width: 460px;
          height: 460px;
          inset-block-start: -260px;
          inset-inline-end: -180px;
          background: radial-gradient(circle, rgba(230,195,100,0.09), transparent 68%);
        }
        .catering-ambient-two {
          width: 520px;
          height: 520px;
          inset-block-end: -320px;
          inset-inline-start: -220px;
          background: radial-gradient(circle, rgba(10,74,74,0.18), transparent 68%);
        }

        .catering-heading {
          margin-bottom: 54px;
        }
        .catering-kicker {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 20px;
          color: var(--accent);
          font-size: 0.76rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        .catering-kicker-line {
          width: 52px;
          height: 1px;
          background: var(--accent);
        }
        .catering-heading-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(320px, 0.72fr);
          align-items: end;
          gap: 80px;
        }
        .catering-heading h2 {
          margin: 0;
          color: var(--foreground);
          font-size: clamp(3.2rem, 7vw, 6.5rem);
          font-weight: 500;
          line-height: 0.88;
          letter-spacing: -0.035em;
        }
        html[dir="rtl"] .catering-heading h2 {
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: 0;
        }
        .catering-heading-grid > p {
          max-width: 500px;
          margin: 0;
          color: var(--muted-foreground);
          font-size: 0.96rem;
          line-height: 1.85;
        }

        .catering-editorial {
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(360px, 0.75fr);
          min-height: 620px;
          gap: 22px;
        }

        .catering-visual {
          position: relative;
          min-width: 0;
          min-height: 620px;
          padding-bottom: 30px;
        }
        .catering-visual-frame {
          position: absolute;
          inset: 0 0 30px;
          overflow: hidden;
          border: 1px solid var(--border);
          background: var(--surface);
        }
        .catering-main-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 58%;
          transition: transform 1.2s ease;
        }
        .catering-visual:hover .catering-main-image {
          transform: scale(1.025);
        }
        .catering-image-shade {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to top, rgba(9,17,17,0.85) 0%, rgba(9,17,17,0.12) 46%, rgba(9,17,17,0.18) 100%),
            linear-gradient(to right, rgba(9,17,17,0.22), transparent 45%);
        }
        .catering-image-label {
          position: absolute;
          inset-block-start: 24px;
          inset-inline-start: 24px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 13px;
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 999px;
          color: #fff;
          background: rgba(10,24,24,0.45);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          font-size: 0.76rem;
          font-weight: 600;
        }
        .catering-occasion-list {
          position: absolute;
          inset-inline-start: 24px;
          inset-block-end: 54px;
          display: flex;
          flex-wrap: wrap;
          max-width: calc(100% - 310px);
          gap: 8px;
        }
        .catering-occasion-list span {
          padding: 7px 12px;
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 2px;
          color: rgba(255,255,255,0.9);
          background: rgba(8,24,24,0.52);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          font-size: 0.72rem;
        }
        .catering-event-card {
          position: absolute;
          z-index: 3;
          width: 248px;
          height: 166px;
          inset-inline-end: 24px;
          inset-block-end: 0;
          overflow: hidden;
          border: 7px solid var(--background);
          background: var(--surface);
          box-shadow: 0 20px 45px rgba(0,0,0,0.28);
        }
        .catering-event-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        .catering-event-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(7,20,20,0.8), transparent 52%);
        }
        .catering-event-card span {
          position: absolute;
          z-index: 1;
          inset-inline-start: 14px;
          inset-block-end: 13px;
          color: #fff;
          font-size: 0.76rem;
          font-weight: 600;
        }

        .catering-booking-card {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-width: 0;
          min-height: 590px;
          padding: 38px;
          overflow: hidden;
          border: 1px solid rgba(230,195,100,0.32);
          color: #f7f2e8;
          background:
            radial-gradient(circle at 100% 0%, rgba(230,195,100,0.12), transparent 34%),
            linear-gradient(145deg, #0c5251 0%, #073b3b 58%, #052d2d 100%);
        }
        .catering-booking-card::after {
          content: '◆';
          position: absolute;
          inset-inline-end: -22px;
          inset-block-end: -75px;
          color: rgba(230,195,100,0.06);
          font-size: 190px;
          line-height: 1;
          pointer-events: none;
        }
        .catering-panel-topline,
        .catering-booking-card > div {
          position: relative;
          z-index: 1;
        }
        .catering-panel-topline {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 44px;
        }
        .catering-panel-diamond {
          color: var(--accent);
          font-size: 1.1rem;
        }
        .catering-iso {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 11px;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 999px;
          color: rgba(255,255,255,0.86);
          font-size: 0.72rem;
          letter-spacing: 0.08em;
        }
        .catering-panel-eyebrow {
          margin: 0 0 14px;
          color: var(--accent);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .catering-booking-card h3 {
          margin: 0 0 22px;
          color: #fff;
          font-size: clamp(2rem, 3vw, 3rem);
          font-weight: 500;
          line-height: 1.08;
        }
        html[dir="rtl"] .catering-booking-card h3 {
          font-weight: 700;
          line-height: 1.35;
        }
        .catering-panel-copy {
          margin: 0;
          color: rgba(255,255,255,0.7);
          font-size: 0.88rem;
          line-height: 1.75;
        }
        .catering-panel-services {
          display: grid;
          gap: 0;
          margin: 34px 0;
          border-top: 1px solid rgba(255,255,255,0.14);
        }
        .catering-panel-service {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255,255,255,0.14);
          color: rgba(255,255,255,0.86);
          font-size: 0.82rem;
        }
        .catering-service-icon {
          display: flex;
          color: var(--accent);
        }
        .catering-actions {
          display: flex;
          align-items: stretch;
          gap: 10px;
        }
        .catering-book-btn,
        .catering-whatsapp-btn {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 50px;
          border: 1px solid var(--accent);
          transition: transform 0.2s ease, background-color 0.2s ease, color 0.2s ease;
        }
        .catering-book-btn {
          flex: 1;
          justify-content: space-between;
          gap: 14px;
          padding: 0 18px;
          color: #173333;
          background: var(--accent);
          font-size: 0.86rem;
          font-weight: 700;
        }
        html[dir="rtl"] .catering-book-btn svg {
          transform: scaleX(-1);
        }
        .catering-whatsapp-btn {
          flex: 0 0 50px;
          color: var(--accent);
          background: transparent;
        }
        .catering-book-btn:hover,
        .catering-whatsapp-btn:hover {
          transform: translateY(-2px);
        }
        .catering-whatsapp-btn:hover {
          color: #173333;
          background: var(--accent);
        }

        .catering-journey {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          margin-top: 70px;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .catering-journey-step {
          min-width: 0;
          padding: 34px 38px 38px;
        }
        .catering-journey-step:not(:first-child) {
          border-inline-start: 1px solid var(--border);
        }
        .catering-step-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 30px;
        }
        .catering-step-number {
          color: var(--accent);
          font-family: var(--font-sans);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.12em;
        }
        .catering-step-icon {
          display: flex;
          color: var(--muted-foreground);
        }
        .catering-journey h4 {
          margin: 0 0 11px;
          color: var(--foreground);
          font-size: 1.18rem;
          font-weight: 600;
        }
        .catering-journey p {
          margin: 0;
          color: var(--muted-foreground);
          font-size: 0.82rem;
          line-height: 1.7;
        }

        @media (prefers-reduced-motion: reduce) {
          .catering-main-image,
          .catering-book-btn,
          .catering-whatsapp-btn {
            transition: none;
          }
          .catering-visual:hover .catering-main-image,
          .catering-book-btn:hover,
          .catering-whatsapp-btn:hover {
            transform: none;
          }
        }

        @media (max-width: 980px) {
          #catering { padding: 96px 0; }
          .catering-heading-grid {
            grid-template-columns: 1fr;
            gap: 26px;
          }
          .catering-heading-grid > p { max-width: 680px; }
          .catering-editorial {
            grid-template-columns: 1fr;
          }
          .catering-visual { min-height: 570px; }
          .catering-booking-card {
            min-height: auto;
            gap: 28px;
          }
          .catering-panel-topline { margin-bottom: 8px; }
        }

        @media (max-width: 720px) {
          .catering-shell { width: min(1200px, calc(100% - 40px)); }
          .catering-heading { margin-bottom: 38px; }
          .catering-heading h2 { font-size: clamp(2.7rem, 14vw, 4.6rem); }
          .catering-visual { min-height: 510px; }
          .catering-occasion-list {
            max-width: calc(100% - 250px);
            inset-block-end: 42px;
          }
          .catering-event-card {
            width: 210px;
            height: 140px;
            inset-inline-end: 15px;
          }
          .catering-booking-card { padding: 30px 26px; }
          .catering-journey {
            grid-template-columns: 1fr;
            margin-top: 52px;
          }
          .catering-journey-step { padding: 28px 4px; }
          .catering-journey-step:not(:first-child) {
            border-inline-start: 0;
            border-top: 1px solid var(--border);
          }
          .catering-step-meta { margin-bottom: 18px; }
        }

        @media (max-width: 480px) {
          #catering { padding: 78px 0; }
          .catering-kicker { letter-spacing: 0.1em; }
          .catering-kicker-line { width: 34px; }
          .catering-visual { min-height: 460px; }
          .catering-main-image { object-position: center; }
          .catering-image-label {
            inset-block-start: 16px;
            inset-inline-start: 16px;
          }
          .catering-occasion-list {
            inset-inline-start: 16px;
            inset-block-end: 34px;
            max-width: calc(100% - 174px);
            gap: 6px;
          }
          .catering-occasion-list span { padding: 6px 9px; }
          .catering-event-card {
            width: 150px;
            height: 100px;
            border-width: 5px;
          }
          .catering-actions { flex-wrap: wrap; }
          .catering-book-btn { flex-basis: calc(100% - 60px); }
        }
      `}</style>
    </section>
  );
}
