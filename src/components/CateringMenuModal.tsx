import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { PartyPopper, Bird, Coffee, Landmark, House, X } from 'lucide-react';
import logo from '../assets/setat-byot-brand-logo.png';
import joyImage from '../assets/catering-menu-joy.webp';
import condolenceImage from '../assets/catering-menu-condolence.webp';
import conferenceImage from '../assets/catering-menu-conference.webp';
import formalImage from '../assets/catering-menu-formal.webp';
import homeImage from '../assets/home-feast-new.png';
import './CateringMenuModal.css';

type OccasionId = 'joy' | 'condolence' | 'conference' | 'formal' | 'home';

type Props = {
  open: boolean;
  onClose: () => void;
  language?: 'ar' | 'en';
};


const occasions = [
  {
    id: 'joy',
    icon: PartyPopper,
    image: joyImage,
    ar: {
      title: 'الأفراح والمناسبات',
      short: 'الأفراح والمناسبات',
      description: 'قوائم ضيافة بتفاصيل مميزة لكافة المناسبات',
    },
    en: {
      title: 'Celebrations & Occasions',
      short: 'Celebrations & Occasions',
      description: 'Distinctive catering menus with special touches for every occasion.',
    },
  },
  {
    id: 'condolence',
    icon: Bird,
    image: condolenceImage,
    ar: {
      title: 'بيوت الأجر',
      short: 'بيوت الأجر',
      description: 'قوائم مصممة خصيصًا لبيوت الأجر',
    },
    en: {
      title: 'Condolence Gatherings',
      short: 'Condolences',
      description: 'Catering menus specially designed for condolence gatherings.',
    },
  },
  {
    id: 'conference',
    icon: Coffee,
    image: conferenceImage,
    ar: {
      title: 'المؤتمرات',
      short: 'المؤتمرات',
      description: 'قوائم ضيافة عملية وأنيقة للمؤتمرات والاجتماعات الرسمية',
    },
    en: {
      title: 'Conferences',
      short: 'Conferences',
      description: 'Practical and elegant catering menus for conferences and formal meetings.',
    },
  },
  {
    id: 'formal',
    icon: Landmark,
    image: formalImage,
    ar: {
      title: 'المناسبات الرسمية',
      short: 'المناسبات الرسمية',
      description: 'قوائم ضيافة راقية للفعاليات والمناسبات الرسمية',
    },
    en: {
      title: 'Formal Occasions',
      short: 'Formal Events',
      description: 'Elegant catering menus for official events and formal occasions.',
    },
  },
  {
    id: 'home',
    icon: House,
    image: homeImage,
    ar: {
      title: 'العزائم المنزلية',
      short: 'العزائم المنزلية',
      description: 'أطباق بيتية شهية وضيافة دافئة تناسب العزائم والجمعات العائلية.',
    },
    en: {
      title: 'Home Gatherings',
      short: 'Home Gatherings',
      description: 'Delicious homemade dishes and warm hospitality for home gatherings and family get-togethers.',
    },
  },
] as const;


export default function CateringMenuModal({ open, onClose, language = 'ar' }: Props) {
  const [active, setActive] = useState<OccasionId>('joy');
  const closeRef = useRef<HTMLButtonElement>(null);
  const isArabic = language === 'ar';

  useEffect(() => {
    if (!open) return;
    setActive('joy');
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const selected = occasions.find((item) => item.id === active) ?? occasions[0];
  const selectedText = selected[language];

  return createPortal(
    <div
      className="sb-catering-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="sb-catering-modal" role="dialog" aria-modal="true" aria-label={isArabic ? 'منيو ستات بيوت' : 'Setatbyot Catering Menu'} dir={isArabic ? 'rtl' : 'ltr'}>
        <header className="sb-catering-top">
          <div className="sb-catering-brand">
            <img src={logo} alt={isArabic ? 'شعار ستات بيوت' : 'Setatbyot logo'} />
            <div><strong>{isArabic ? 'ستات بيوت' : 'Setatbyot'}</strong><small>SETATBYOT CATERING</small></div>
          </div>
          <button type="button" ref={closeRef} className="sb-catering-close" aria-label={isArabic ? 'إغلاق القائمة' : 'Close menu'} onClick={onClose}><X size={21} /></button>
        </header>

        <div className="sb-catering-intro">
          <span>◆ {isArabic ? 'قائمة الضيافة' : 'CATERING MENU'}</span>
          <h2>{isArabic ? 'منيو ستات بيوت' : 'Setatbyot Menu'}</h2>
          <p>{isArabic ? 'اختر نوع المناسبة واستكشف أجواء الضيافة التي تناسبها' : 'Select your occasion and explore the right catering experience.'}</p>
        </div>

        <nav className="sb-catering-choices" aria-label={isArabic ? 'نوع المناسبة' : 'Occasion type'}>
          {occasions.map((item) => {
            const Icon = item.icon;
            return (
              <button type="button" key={item.id} aria-pressed={active === item.id} className={`sb-catering-choice${active === item.id ? ' sb-catering-choice-active' : ''}`} onClick={() => setActive(item.id)}>
                <Icon size={24} strokeWidth={1.65} aria-hidden="true" />
                <span>{item[language].short}</span>
              </button>
            );
          })}
        </nav>

        <div className="sb-catering-content" key={selected.id}>
          <div className="sb-catering-picture">
            <img src={selected.image} alt={selectedText.title} />
            <span>◆ {isArabic ? 'ضيافة ستات بيوت' : 'Setatbyot Hospitality'}</span>
          </div>
          <div className="sb-catering-details">
            <span className="sb-catering-count">01 / {isArabic ? 'استكشف مناسبتك' : 'Explore the occasion'}</span>
            <div className="sb-catering-rule" />
            <h3>{selectedText.title}</h3>
            <p>{selectedText.description}</p>
          </div>
        </div>
        <p className="sb-catering-disclaimer">{isArabic ? 'الصور توضيحية لطابع الضيافة، وليست قائمة طعام أو عرض سعر نهائي.' : 'Images illustrate catering styles, not a fixed menu or quotation.'}</p>
      </div>
    </div>,
    document.body
  );
}
