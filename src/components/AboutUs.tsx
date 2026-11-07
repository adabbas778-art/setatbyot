import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Target, Flag, Users, ShieldCheck } from 'lucide-react';
import msisLogo from '../assets/msis-certification-logo.png';
import { useLanguage } from '../context/LanguageContext';
import LegalPolicies from './LegalPolicies';

const EXPERTISE = [
  'about.exp5',
  'about.exp9',
  'about.exp1',
  'about.exp3',
  'about.exp4',
  'about.exp8',
];
const REG_ITEMS = [
  'about.reg.country','about.reg.ministry','about.reg.num',
  'about.reg.national','about.reg.trade',  'about.reg.trademark','about.reg.type',
];
const STANDARDS = [
  'about.std1',
  'about.std2',
  'about.std3',
  'about.std5',
  'about.std6',
];

function BuildingIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="0"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  );
}

function IconBox({ children, size = 38 }: { children: React.ReactNode; size?: number }) {
  return (
    <div style={{
      width: size, height: size,
      border: '1px solid var(--accent-border)',
      borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'var(--accent)', flexShrink: 0,
    }}>
      {children}
    </div>
  );
}

function Divider() {
  return <div style={{ height: '1px', backgroundColor: 'rgba(230,195,100,0.3)', marginBottom: '16px' }} />;
}

export default function AboutUs() {
  const { t, language } = useLanguage();
  const [policiesOpen, setPoliciesOpen] = useState(false);
  const isArabic = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.03 });

  const fontAr    = isArabic ? 'var(--font-arabic)' : 'var(--font-sans)';
  const fontTitle = isArabic ? 'var(--font-arabic)' : 'var(--font-serif)';
  const tAlign    = isArabic ? 'right' as const : 'left' as const;

  // Icon grouped with title on the same side:
  // In RTL flex (row), first item→RIGHT. With <IconBox><h4>, icon lands on the RIGHT,
  // title lands immediately to its LEFT. Both stay packed to the right (RTL flex-start).
  // In LTR flex (row), first item→LEFT. Icon lands LEFT, title immediately to its RIGHT.
  const cardBase = { border: '1px solid var(--border)', backgroundColor: 'var(--background)', transition: 'border-color 0.3s' };

  // Subsection heading (Partners / Contact)
  function SubHeading({ icon, titleKey, delay = 0 }: { icon: React.ReactNode; titleKey: string; delay?: number }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay }}
        style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}
      >
        {/* In RTL: icon (first)→RIGHT, h3 (second)→LEFT of icon, grouped on right */}
        <IconBox size={36}>{icon}</IconBox>
        <h3 style={{ fontFamily: fontTitle, fontSize: '1.3rem', fontWeight: isArabic ? 700 : 500, color: 'var(--foreground)', margin: 0 }}>
          {t(titleKey)}
        </h3>
      </motion.div>
    );
  }

  return (
    <section
      id="about"
      ref={ref}
      style={{ padding: '100px 0', backgroundColor: 'var(--surface)', borderTop: '1px solid var(--accent-border)' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>

        {/* ── Main section heading ─────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '20px' }}>
            <div style={{ height: '1px', width: '48px', background: 'linear-gradient(to right, transparent, var(--accent))' }} />
            <span style={{ color: 'var(--accent)' }}>◆</span>
            <div style={{ height: '1px', width: '48px', background: 'linear-gradient(to left, transparent, var(--accent))' }} />
          </div>
          <h2 style={{ fontFamily: fontTitle, fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: isArabic ? 700 : 500, color: 'var(--foreground)', marginBottom: '16px' }}>
            {t('about.title')}
          </h2>
          <div style={{ height: '1px', width: '96px', background: 'linear-gradient(to right, transparent, var(--accent), transparent)', margin: '0 auto' }} />
        </motion.div>

        {/* ── Row 1: Company (first→RIGHT in RTL) | Left col (second→LEFT in RTL) ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }} className="about-main-grid">

          {/* ① Company card — RIGHT in RTL */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{ ...cardBase, padding: '36px', position: 'relative' }}
            className="about-card"
          >
            {(['tl','tr','bl','br'] as const).map(pos => (
              <div key={pos} style={{
                position: 'absolute',
                top: pos.startsWith('t') ? 0 : 'auto', bottom: pos.startsWith('b') ? 0 : 'auto',
                left: pos.endsWith('l') ? 0 : 'auto', right: pos.endsWith('r') ? 0 : 'auto',
                width: '14px', height: '14px',
                borderTop:    pos.startsWith('t') ? '1px solid var(--accent)' : 'none',
                borderBottom: pos.startsWith('b') ? '1px solid var(--accent)' : 'none',
                borderLeft:   pos.endsWith('l')   ? '1px solid var(--accent)' : 'none',
                borderRight:  pos.endsWith('r')   ? '1px solid var(--accent)' : 'none',
              }} />
            ))}

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <div style={{ width: '56px', height: '56px', border: '1px solid var(--accent-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                <BuildingIcon />
              </div>
            </div>

            <h3 style={{ fontFamily: fontTitle, fontSize: '1.2rem', fontWeight: isArabic ? 700 : 500, color: 'var(--foreground)', marginBottom: '12px', textAlign: 'center' }}>
              {t('about.company.name')}
            </h3>
            <div style={{ height: '1px', width: '72px', backgroundColor: 'rgba(230,195,100,0.4)', margin: '0 auto 20px' }} />

            <p style={{ fontFamily: fontAr, fontSize: '0.9rem', color: 'var(--muted-foreground)', lineHeight: 1.9, marginBottom: '28px', textAlign: tAlign }}>
              {t('about.company')}
            </p>

            <p style={{ fontFamily: isArabic ? fontAr : 'var(--font-sans)', fontSize: isArabic ? '0.85rem' : '0.65rem', letterSpacing: isArabic ? 0 : '0.14em', textTransform: isArabic ? 'none' : 'uppercase', color: 'var(--accent)', marginBottom: '12px', textAlign: tAlign }}>
              {t('about.expertise.title')}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {EXPERTISE.map((key, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--muted-foreground)', fontFamily: fontAr }}>
                  <span style={{ color: 'var(--accent)', fontSize: '0.45rem', flexShrink: 0 }}>◆</span>
                  <span style={{ flex: 1, textAlign: tAlign }}>{t(key)}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ② Reg + Standards stacked — LEFT in RTL */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Registration card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.2 }}
              style={{ ...cardBase, padding: '28px' }}
              className="about-card"
            >
              {/* Icon + title grouped on the right (RTL flex-start) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <IconBox><Award size={17} strokeWidth={1.5} /></IconBox>
                <h4 style={{ fontFamily: fontTitle, fontSize: '1.05rem', fontWeight: isArabic ? 700 : 500, color: 'var(--foreground)', margin: 0 }}>
                  {t('about.reg.title')}
                </h4>
              </div>
              <Divider />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'center' }}>
                {REG_ITEMS.map((key, i) => (
                  <p key={i} style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', fontFamily: fontAr, margin: 0 }}>
                    {t(key)}
                  </p>
                ))}
                <p style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-sans)', marginTop: '10px' }}>
                  {t('about.reg.iso')}
                </p>
              </div>
            </motion.div>

            {/* Standards card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.25 }}
              style={{ ...cardBase, padding: '28px', flex: 1 }}
              className="about-card"
            >
              <h4 style={{ fontFamily: fontTitle, fontSize: '1.05rem', fontWeight: isArabic ? 700 : 500, color: 'var(--foreground)', marginBottom: '12px', textAlign: tAlign }}>
                {t('about.standards.title')}
              </h4>
              <Divider />
              <p style={{ fontSize: '0.83rem', color: 'var(--muted-foreground)', lineHeight: 1.7, marginBottom: '18px', fontFamily: fontAr, textAlign: tAlign }}>
                {t('about.standards.desc')}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {STANDARDS.map((key, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--muted-foreground)', fontFamily: fontAr }}>
                    <span style={{ color: 'var(--accent)', fontSize: '0.45rem', flexShrink: 0 }}>◆</span>
                    <span style={{ flex: 1, textAlign: tAlign }}>{t(key)}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Row 2: Vision | Mission ─────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '56px' }} className="about-main-grid">

          {/* ① Vision — RIGHT in RTL */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.3 }}
            style={{ ...cardBase, padding: '32px' }}
            className="about-card"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <IconBox><Target size={18} strokeWidth={1.5} /></IconBox>
              <h3 style={{ fontFamily: fontTitle, fontSize: '1.1rem', fontWeight: isArabic ? 700 : 500, color: 'var(--foreground)', margin: 0 }}>
                {t('about.vision')}
              </h3>
            </div>
            <Divider />
            <p style={{ fontFamily: fontAr, fontSize: '0.88rem', color: 'var(--muted-foreground)', lineHeight: 1.9, textAlign: tAlign }}>
              {t('about.vision.desc')}
            </p>
          </motion.div>

          {/* ② Mission — LEFT in RTL */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.35 }}
            style={{ ...cardBase, padding: '32px' }}
            className="about-card"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <IconBox><Flag size={18} strokeWidth={1.5} /></IconBox>
              <h3 style={{ fontFamily: fontTitle, fontSize: '1.1rem', fontWeight: isArabic ? 700 : 500, color: 'var(--foreground)', margin: 0 }}>
                {t('about.mission')}
              </h3>
            </div>
            <Divider />
            <p style={{ fontFamily: fontAr, fontSize: '0.88rem', color: 'var(--muted-foreground)', lineHeight: 1.9, textAlign: tAlign }}>
              {t('about.mission.desc')}
            </p>
          </motion.div>
        </div>

        {/* ── Partners section ─────────────────────── */}
        <SubHeading icon={<Users size={18} strokeWidth={1.5} />} titleKey="about.partners.title" delay={0.4} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.45 }}
          style={{ ...cardBase, padding: '28px 36px', position: 'relative', marginBottom: '56px' }}
          className="about-card"
        >
          {(['tl','tr','bl','br'] as const).map(pos => (
            <div key={pos} style={{
              position: 'absolute',
              top: pos.startsWith('t') ? 0 : 'auto', bottom: pos.startsWith('b') ? 0 : 'auto',
              left: pos.endsWith('l') ? 0 : 'auto', right: pos.endsWith('r') ? 0 : 'auto',
              width: '12px', height: '12px',
              borderTop:    pos.startsWith('t') ? '1px solid var(--accent)' : 'none',
              borderBottom: pos.startsWith('b') ? '1px solid var(--accent)' : 'none',
              borderLeft:   pos.endsWith('l')   ? '1px solid var(--accent)' : 'none',
              borderRight:  pos.endsWith('r')   ? '1px solid var(--accent)' : 'none',
            }} />
          ))}

          {/* MSIS card header: company name+icon on RIGHT, badge on LEFT (space-between) */}
          <div
            className="msis-header"
            dir={isArabic ? 'rtl' : 'ltr'}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: isArabic ? 'row' : 'row-reverse', marginBottom: '16px' }}
          >
            {/* Company name + icon — grouped on RIGHT in RTL (first in RTL space-between) */}
            <div className="msis-name" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <IconBox size={42}><ShieldCheck size={20} strokeWidth={1.5} /></IconBox>
              <h4 style={{ fontFamily: fontTitle, fontSize: '1.15rem', fontWeight: isArabic ? 700 : 500, color: 'var(--foreground)', margin: 0 }}>
                {t('about.partners.msis.name')}
              </h4>
            </div>
            {/* ISO badge — on LEFT in RTL (last in RTL space-between) */}
            <span className="msis-badge" dir={isArabic ? 'rtl' : 'ltr'} style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              border: '1px solid var(--accent-border)',
              padding: '5px 14px',
              fontSize: '0.78rem',
              color: 'var(--accent)',
              fontFamily: isArabic ? fontAr : 'var(--font-sans)',
              whiteSpace: 'nowrap',
            }}>
              <ShieldCheck size={13} strokeWidth={1.5} />
              {t('about.partners.msis.badge')}
            </span>
          </div>
          <Divider />

          {/* Keep the logo physically left while giving the copy its proper language direction. */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', direction: 'ltr' }} className="msis-body">
            <div style={{
              flexShrink: 0,
              width: '160px',
              padding: '12px 16px',
              border: '1px solid var(--border)',
              backgroundColor: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px',
            }} className="msis-logo-box">
              <img src={msisLogo} alt="MSIS Certifications & More" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
            <p
              className="msis-description"
              dir={isArabic ? 'rtl' : 'ltr'}
              style={{
                fontFamily: fontAr,
                fontSize: '0.9rem',
                color: 'var(--muted-foreground)',
                lineHeight: 1.9,
                textAlign: tAlign,
                flex: 1,
                margin: 0,
                unicodeBidi: 'plaintext',
              }}
            >
              {t('about.partners.msis.desc')}
            </p>
          </div>
        </motion.div>

        {/* ── Contact section ──────────────────────── */}
        <SubHeading icon={<Users size={18} strokeWidth={1.5} />} titleKey="about.contact.title" delay={0.5} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.55 }}
          style={{ ...cardBase, padding: '32px 36px' }}
          className="about-card"
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }} className="contact-grid">
            {[
              {
                label: 'ADDRESS',
                lines: [t('contact.address'), t('contact.pobox')],
              },
              {
                label: 'PHONE',
                links: [
                  { href: 'tel:+96265233400',   text: '+962 06 523 3400' },
                  { href: 'tel:+9620777233400', text: '+962 77 723 3400' },
                  { href: 'tel:+9620788233400', text: '+962 78 823 3400' },
                ],
              },
              {
                label: 'EMAIL',
                links: [
                  { href: 'mailto:Info@setatbyot.com',        text: 'Info@setatbyot.com' },
                  { href: 'mailto:CEO@setatbyot.com',         text: 'CEO@setatbyot.com' },
                  { href: 'mailto:Catering@setatbyot.com',    text: 'Catering@setatbyot.com' },
                  { href: 'mailto:Sponsorship@setatbyot.com', text: 'Sponsorship@setatbyot.com' },
                  { href: 'mailto:HR@setatbyot.com',          text: 'HR@setatbyot.com' },
                ],
              },
              {
                label: 'WEBSITE',
                links: [{ href: 'https://www.setatbyot.com', text: t('contact.website') }],
              },
            ].map((col, i) => (
              <div key={i}>
                <p style={{ color: 'var(--accent)', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'var(--font-sans)', marginBottom: '10px', textAlign: tAlign }}>
                  {col.label}
                </p>
                {'lines' in col && col.lines?.map((line, j) => (
                  <p key={j} style={{ fontSize: '0.82rem', color: 'var(--muted-foreground)', fontFamily: fontAr, lineHeight: 1.7, marginBottom: '4px', textAlign: tAlign }}>
                    {line}
                  </p>
                ))}
                {'links' in col && col.links?.map((link, j) => (
                  <p key={j} style={{ marginBottom: '4px', textAlign: tAlign }}>
                    <a
                      href={link.href}
                      dir="ltr"
                      style={{
                        fontSize: '0.82rem',
                        color: 'var(--muted-foreground)',
                        fontFamily: 'var(--font-sans)',
                        transition: 'color 0.2s',
                        display: 'inline-block',
                        direction: 'ltr',
                        unicodeBidi: 'isolate',
                      }}
                      className="contact-link"
                    >
                      {link.text}
                    </a>
                  </p>
                ))}
              </div>
            ))}
          </div>
          <div style={{ marginTop: '22px', paddingTop: '18px', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
            <button
              type="button"
              onClick={() => setPoliciesOpen(true)}
              className="contact-link"
              style={{
                border: '1px solid var(--accent-border)',
                borderRadius: '999px',
                padding: '9px 18px',
                color: 'var(--accent)',
                background: 'transparent',
                fontFamily: fontAr,
                fontSize: isArabic ? '0.9rem' : '0.82rem',
                cursor: 'pointer',
              }}
            >
              {isArabic ? 'السياسات والشروط القانونية' : 'Legal Policies & Terms'}
            </button>
          </div>
        </motion.div>

      </div>

      <style>{`
        .about-card:hover { border-color: rgba(230,195,100,0.4) !important; }
        .contact-link:hover { color: var(--accent) !important; }
        @media (max-width: 900px) {
          .about-main-grid { grid-template-columns: 1fr !important; }
          .contact-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          #about > div { padding: 60px 20px !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .msis-header {
            align-items: stretch !important;
            flex-direction: column !important;
            gap: 14px;
          }
          .msis-name { justify-content: flex-start; }
          .msis-badge {
            align-self: flex-start;
            justify-content: center;
          }
          html[dir="rtl"] .msis-badge { align-self: flex-end; }
          .msis-body {
            align-items: stretch !important;
            flex-direction: column !important;
            gap: 18px !important;
          }
          .msis-logo-box {
            width: 130px !important;
            margin: 0 auto;
          }
          .msis-description { width: 100%; }
        }
      `}</style>
      {policiesOpen && <LegalPolicies onClose={() => setPoliciesOpen(false)} />}
    </section>
  );
}
