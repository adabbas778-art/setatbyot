import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import LegalPolicies from './LegalPolicies';

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z"/>
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: 'WhatsApp', href: 'https://wa.me/+962788233400', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
    </svg>
  )},
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/setst-byot-45b2b4411?utm_source=share_via&utm_content=profile&utm_medium=member_android', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
  )},
  { label: 'Facebook', href: 'https://www.facebook.com/share/18hBzTmqHk/?mibextid=wwXIfr', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )},
  { label: 'Instagram', href: 'https://www.instagram.com/setat_byot?igsh=MTl1NHZleXAyZGRwZw==', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
    </svg>
  )},
];

export default function DownloadCTA() {
  const { t, language } = useLanguage();
  const [isPoliciesOpen, setIsPoliciesOpen] = useState(false);
  const isArabic = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const fontAr    = isArabic ? 'var(--font-arabic)' : 'var(--font-sans)';
  const fontTitle = isArabic ? 'var(--font-arabic)' : 'var(--font-serif)';

  return (
    <>
    <footer
      ref={ref}
      style={{
        backgroundColor: 'var(--background)',
        borderTop: '1px solid var(--accent-border)',
      }}
    >
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '80px 40px', textAlign: 'center' }}>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Diamond separator */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '28px' }}>
            <div style={{ height: '1px', width: '48px', background: 'linear-gradient(to right, transparent, var(--accent))' }} />
            <span style={{ color: 'var(--accent)' }}>◆</span>
            <div style={{ height: '1px', width: '48px', background: 'linear-gradient(to left, transparent, var(--accent))' }} />
          </div>

          {/* Title */}
          <h2 style={{
            fontFamily: fontTitle,
            fontSize: 'clamp(2.4rem, 6vw, 4rem)',
            fontWeight: isArabic ? 700 : 500,
            color: 'var(--foreground)',
            marginBottom: '20px',
            lineHeight: 1.15,
          }}>
            {t('cta.title')}
          </h2>

          {/* Description */}
          <p style={{
            fontFamily: fontAr,
            fontSize: '1rem',
            color: 'var(--muted-foreground)',
            lineHeight: 1.8,
            maxWidth: '580px',
            margin: '0 auto 40px',
          }}>
            {t('cta.desc')}
          </p>

          {/* App store buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '48px' }}>
            {/* Google Play — text first, icon second: in RTL icon lands LEFT (trailing) */}
<a
  href="https://play.google.com/store/apps/details?id=com.ebda3user"
  target="_blank"
  rel="noopener noreferrer"
  className="store-btn"
  style={{    display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '13px 32px',
              border: '1px solid var(--border)',
              backgroundColor: 'transparent',
              color: 'var(--foreground)',
              fontFamily: fontAr,
              fontSize: isArabic ? '0.98rem' : '0.9rem',
              fontWeight: 500,
              cursor: 'pointer',
              borderRadius: '2px',
              transition: 'border-color 0.2s, color 0.2s, background 0.2s',
              minWidth: '190px',
              justifyContent: 'center',
              textDecoration: 'none',
            }}>
              <span>{t('cta.googleplay')}</span>
              <span style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center' }}><PlayIcon /></span>
            </a>

            {/* App Store — text first, icon second */}
            <button className="store-btn" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '13px 32px',
              border: '1px solid var(--border)',
              backgroundColor: 'transparent',
              color: 'var(--foreground)',
              fontFamily: fontAr,
              fontSize: isArabic ? '0.98rem' : '0.9rem',
              fontWeight: 500,
              cursor: 'pointer',
              borderRadius: '2px',
              transition: 'border-color 0.2s, color 0.2s, background 0.2s',
              minWidth: '190px',
              justifyContent: 'center',
            }}>
              <span>{t('cta.appstore')}</span>
              <span style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center' }}><AppleIcon /></span>
            </button>
          </div>

          {/* Contact card */}
          <div style={{
            border: '1px solid var(--border)',
            backgroundColor: 'var(--surface)',
            padding: '20px 32px',
            marginBottom: '36px',
            fontSize: '0.83rem',
            color: 'var(--muted-foreground)',
            fontFamily: 'var(--font-sans)',
            lineHeight: 1.8,
          }}>
            <p style={{ marginBottom: '4px' }}>
              <a href="mailto:Catering@setatbyot.com" className="cta-link" style={{ color: 'var(--muted-foreground)', transition: 'color 0.2s' }}>
                Catering@setatbyot.com
              </a>
              {' · '}
              <a href="mailto:Info@setatbyot.com" className="cta-link" style={{ color: 'var(--muted-foreground)', transition: 'color 0.2s' }}>
                Info@setatbyot.com
              </a>
            </p>
            <p>
              {isArabic ? 'الهاتف: ' : 'Phone: '}
              <span dir="ltr" style={{ direction: 'ltr', unicodeBidi: 'isolate' }}>
                06 523 3400
              </span>
            </p>
          </div>

          {/* Social icons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '36px' }}>
            {SOCIAL_LINKS.map((s, i) => (
              <a
                key={i}
                href={s.href}
                aria-label={s.label}
                className="social-icon"
                style={{
                  width: '42px', height: '42px',
                  border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--muted-foreground)',
                  transition: 'color 0.2s, border-color 0.2s',
                  borderRadius: '2px',
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Divider + copyright */}
          <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, var(--border), transparent)', marginBottom: '20px' }} />
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', color: 'var(--muted-foreground)', opacity: 0.5, letterSpacing: '0.06em' }}>
            {t('cta.copyright')}
          </p>
          <button
            type="button"
            onClick={() => setIsPoliciesOpen(true)}
            className="cta-link"
            style={{ marginTop: '12px', border: 'none', background: 'none', color: 'var(--muted-foreground)', fontFamily: fontAr, fontSize: '0.72rem', textDecoration: 'underline', cursor: 'pointer' }}
          >
            {isArabic ? 'السياسات والشروط القانونية' : 'Legal Policies & Terms'}
          </button>
        </motion.div>
      </div>

      <style>{`
        .store-btn:hover {
          border-color: var(--accent-border) !important;
          color: var(--accent) !important;
          background: var(--accent-dim) !important;
        }
        .social-icon:hover { color: var(--accent) !important; border-color: var(--accent-border) !important; }
        .cta-link:hover { color: var(--accent) !important; }
        @media (max-width: 560px) {
          .store-btn { min-width: unset !important; width: 100% !important; }
          footer > div { padding: 60px 20px !important; }
        }
      `}</style>
    </footer>
    {isPoliciesOpen && <LegalPolicies onClose={() => setIsPoliciesOpen(false)} />}
    </>
  );
}
