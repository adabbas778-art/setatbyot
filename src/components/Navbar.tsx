import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/setat-byot-brand-logo.png';

// ── Nav links ──────────────────────────────────────────────────────────────
// Each link has a translation key and the section id it scrolls to
const NAV_LINKS = [
  { key: 'nav.home',       id: 'hero' },
  { key: 'nav.process',    id: 'process' },
  { key: 'nav.categories', id: 'categories' },
  { key: 'nav.market',     id: 'market' },
  { key: 'nav.bazaar',     id: 'bazaar' },
  { key: 'nav.handmade', id: 'bazaar' },
  { key: 'nav.catering',   id: 'catering' },
  { key: 'nav.sponsors',   id: 'sponsors' },
  { key: 'nav.about',      id: 'about' },
];

// ── Smooth scroll helper ───────────────────────────────────────────────────
function scrollTo(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  const navbarHeight = Number.parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--navbar-height'),
  ) || 80;
  const top = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}

// ── Sun icon ───────────────────────────────────────────────────────────────
function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1"  x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22"  x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

// ── Moon icon ──────────────────────────────────────────────────────────────
function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

// ── Main Navbar component ──────────────────────────────────────────────────
export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  // Track whether the user has scrolled past 50px
  const [scrolled, setScrolled] = useState(false);
  // Track whether the mobile menu is open
  const [mobileOpen, setMobileOpen] = useState(false);
  // Mobile Safari can cancel scrolling if its menu is removed mid-animation.
  const [pendingSection, setPendingSection] = useState<string | null>(null);
  // The mobile navbar stays available from the top of the page.
  const [isMobile, setIsMobile] = useState(false);

  // Listen to scroll events
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 1023px)');
    const updateMobile = () => {
      setIsMobile(media.matches);
      if (!media.matches) setMobileOpen(false);
    };

    updateMobile();
    media.addEventListener('change', updateMobile);
    return () => media.removeEventListener('change', updateMobile);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [mobileOpen]);

  // Close mobile menu when clicking a nav link
  const handleNavClick = (id: string) => {
    if (mobileOpen) {
      setPendingSection(id);
      setMobileOpen(false);
      return;
    }

    scrollTo(id);
  };

  const finishMobileNavigation = () => {
    if (!pendingSection) return;
    scrollTo(pendingSection);
    setPendingSection(null);
  };

  const isArabic = language === 'ar';
  const isDark   = theme === 'dark';
  const navbarVisible = scrolled || isMobile || mobileOpen;

  return (
    <>
      {/* ── Navbar bar ──────────────────────────────────── */}
      <motion.nav
        className="site-navbar"
        aria-label={isArabic ? 'التنقل الرئيسي' : 'Main navigation'}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: navbarVisible
            ? (isDark ? 'rgba(19,19,19,0.92)' : 'rgba(244,240,232,0.95)')
            : 'transparent',
          backdropFilter: navbarVisible ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: navbarVisible ? 'blur(20px)' : 'none',
          borderBottom: navbarVisible ? '1px solid var(--accent-border)' : '1px solid transparent',
          opacity: navbarVisible ? 1 : 0,
          pointerEvents: navbarVisible ? 'auto' : 'none',
          transition: 'opacity 0.4s ease, background-color 0.4s ease, border-color 0.4s ease',
          height: 'var(--navbar-height)',
        }}
      >
        {/* ── Inner container ─────────────────────────────── */}
        <div className="navbar-inner" style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 40px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          // Logo on right in RTL, left in LTR — flexbox handles this with dir
          justifyContent: 'space-between',
          gap: '24px',
        }}>

          {/* ── Logo ──────────────────────────────────────── */}
          <button
            onClick={() => scrollTo('hero')}
            style={{ flexShrink: 0, lineHeight: 0, background: 'none', border: 'none' }}
            aria-label="Go to top"
          >
            <img
              src={logo}
              alt="ستات بيوت"
              className="navbar-logo"
              style={{ height: '68px', width: 'auto', objectFit: 'contain' }}
            />
          </button>

          {/* ── Desktop nav links (hidden on mobile) ─────── */}
          <nav
            aria-label="Main navigation"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
              // Hide below 1024px
              flex: 1,
              justifyContent: 'center',
            }}
            className="desktop-nav"
          >
            {NAV_LINKS.map(link => (
              <button
                key={link.key}
                onClick={() => handleNavClick(link.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--foreground)',
                  fontSize: isArabic ? '1rem' : '0.85rem',
                  fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-sans)',
                  fontWeight: isArabic ? 500 : 500,
                  letterSpacing: isArabic ? '0' : '0.06em',
                  textTransform: isArabic ? 'none' : 'uppercase',
                  cursor: 'pointer',
                  padding: '4px 0',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s ease',
                  // Underline on hover via CSS class
                  position: 'relative',
                }}
                className="nav-link"
              >
                {t(link.key)}
              </button>
            ))}
          </nav>

          {/* ── Right-side controls ───────────────────────── */}
          <div className="navbar-controls" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexShrink: 0,
          }}>

            {/* Theme toggle button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              style={{
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--accent-border)',
                borderRadius: '4px',
                color: 'var(--accent)',
                background: 'none',
                transition: 'border-color 0.2s, background 0.2s',
              }}
              className="icon-btn"
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* Language toggle button */}
            <button
              onClick={toggleLanguage}
              style={{
                border: '1px solid var(--accent-border)',
                borderRadius: '999px',
                padding: '5px 14px',
                color: 'var(--accent)',
                fontSize: '0.82rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                background: 'none',
                transition: 'background 0.2s, border-color 0.2s',
                whiteSpace: 'nowrap',
              }}
              className="icon-btn"
            >
              {isArabic ? 'EN' : 'AR'}
            </button>

            {/* Download App CTA button */}
            <button
              style={{
                backgroundColor: 'var(--primary)',
                border: '1px solid var(--accent-border)',
                borderRadius: '4px',
                padding: '10px 20px',
                color: 'var(--accent)',
                fontSize: isArabic ? '0.95rem' : '0.82rem',
                fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-sans)',
                fontWeight: 600,
                letterSpacing: isArabic ? '0' : '0.06em',
                whiteSpace: 'nowrap',
                transition: 'background 0.2s, box-shadow 0.2s',
              }}
              className="cta-btn"
            >
              {t('nav.download')}
            </button>

            {/* ── Hamburger (mobile only) ──────────────────── */}
            <button
              onClick={() => setMobileOpen(prev => !prev)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              style={{
                display: 'none',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '5px',
                width: '38px',
                height: '38px',
                background: 'none',
                border: '1px solid var(--accent-border)',
                borderRadius: '4px',
                color: 'var(--accent)',
                cursor: 'pointer',
              }}
              className="hamburger"
            >
              {mobileOpen ? (
                // X icon
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger lines
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile dropdown menu ────────────────────────── */}
      <AnimatePresence onExitComplete={finishMobileNavigation}>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              top: 'var(--navbar-height)',
              left: 0,
              right: 0,
              zIndex: 99,
              backgroundColor: isDark ? 'rgba(19,19,19,0.97)' : 'rgba(244,240,232,0.98)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--accent-border)',
              maxHeight: 'calc(100dvh - var(--navbar-height))',
              overflowX: 'hidden',
              overflowY: 'auto',
              overscrollBehavior: 'contain',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <div style={{
              padding: '20px 24px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              alignItems: isArabic ? 'flex-end' : 'flex-start',
            }}>
              {/* Mobile nav links */}
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.key}
                  initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(link.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--foreground)',
                    fontSize: '1.1rem',
                    fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-sans)',
                    fontWeight: 500,
                    padding: '12px 0',
                    width: '100%',
                    textAlign: isArabic ? 'right' : 'left',
                    borderBottom: '1px solid var(--border)',
                    cursor: 'pointer',
                    transition: 'color 0.2s',
                  }}
                  className="mobile-nav-link"
                >
                  {t(link.key)}
                </motion.button>
              ))}

              {/* Mobile bottom controls */}
              <div style={{
                display: 'flex',
                gap: '12px',
                marginTop: '16px',
                width: '100%',
                justifyContent: isArabic ? 'flex-end' : 'flex-start',
                flexWrap: 'wrap',
              }}>
                <button
                  onClick={() => { toggleLanguage(); setMobileOpen(false); }}
                  style={{
                    border: '1px solid var(--accent-border)',
                    borderRadius: '999px',
                    padding: '8px 18px',
                    color: 'var(--accent)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    background: 'none',
                  }}
                >
                  {t('nav.switchLang')}
                </button>
                <button
                  style={{
                    backgroundColor: 'var(--primary)',
                    border: '1px solid var(--accent-border)',
                    borderRadius: '4px',
                    padding: '8px 18px',
                    color: 'var(--accent)',
                    fontSize: '0.9rem',
                    fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-sans)',
                    fontWeight: 600,
                  }}
                >
                  {t('nav.download')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Scoped styles (hover effects + responsive) ────── */}
      <style>{`
        /* Hover glow on nav links */
        .nav-link:hover {
          color: var(--accent) !important;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 1px;
          background: var(--accent);
          transform: scaleX(0);
          transition: transform 0.25s ease;
          transform-origin: center;
        }
        .nav-link:hover::after {
          transform: scaleX(1);
        }

        /* Hover for icon buttons */
        .icon-btn:hover {
          background: var(--accent-dim) !important;
          border-color: var(--accent) !important;
        }

        /* Hover glow for CTA */
        .cta-btn:hover {
          background: var(--primary-hover) !important;
          box-shadow: var(--accent-glow) !important;
        }

        /* Mobile nav link hover */
        .mobile-nav-link:hover {
          color: var(--accent) !important;
        }

        /* ── Responsive breakpoints ── */

        /* Hide desktop nav + show hamburger below 1024px */
        @media (max-width: 1023px) {
          .desktop-nav { display: none !important; }
          .hamburger   { display: flex !important; }
          /* Also hide the Download CTA on mobile — it's in the dropdown */
          .cta-btn     { display: none !important; }
        }

        /* Tighten padding on smaller screens */
        @media (max-width: 640px) {
          :root { --navbar-height: 72px; }
          .navbar-inner { padding: 0 16px !important; gap: 12px !important; }
          .navbar-controls { gap: 8px !important; }
          .navbar-logo { height: 58px !important; }
        }

        @media (max-width: 360px) {
          .navbar-inner { padding: 0 10px !important; gap: 8px !important; }
          .navbar-controls { gap: 6px !important; }
          .navbar-logo { height: 52px !important; }
          .icon-btn,
          .hamburger { width: 36px !important; height: 36px !important; }
        }
      `}</style>
    </>
  );
}
