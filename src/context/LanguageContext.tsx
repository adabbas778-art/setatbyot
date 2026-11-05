import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ar' | 'en';
type Translations = Record<string, Record<Language, string>>;

const translations: Translations = {
  // ── Navigation ──────────────────────────────────────
  'nav.home':       { en: 'Home',           ar: 'الرئيسية' },
  'nav.process':    { en: 'Our Process',    ar: 'كيف نعمل' },
  'nav.categories': { en: 'Categories',     ar: 'التصنيفات' },
  'nav.market':     { en: 'Markets',         ar: ' الأسواق الافتراضية' },
  'nav.bazaar':     { en: 'Bazaar',         ar: 'البازار الافتراضي' },
  'nav.catering':   { en: 'Catering',       ar:' مناسبات الكيترينج ' },
  'nav.sponsors':   { en: 'Sponsors',       ar: 'الرعاة' },
  'nav.about':      { en: 'About Us',       ar: 'من نحن' },
  'nav.download':   { en: 'Download App',   ar: 'حمل التطبيق' },
  'nav.switchLang': { en: 'التبديل إلى العربية', ar: 'Switch to English' },

  // ── Platform Intro ───────────────────────────────────
  'intro.title': { en: 'Where Heritage Meets Technology', ar: 'حيث يلتقي التراث بالتكنولوجيا' },
  'intro.desc': {
    en: 'Setat Byot is not just another mobile application or digital platform. It is a complete smart business environment connecting home kitchens, handmade businesses, food production services, logistics, virtual exhibitions, and digital commerce into one seamless experience.',
    ar: 'ستات بيوت ليست مجرد منصة إلكترونية. بل هي منظومة اقتصادية رقمية متكاملة تهدف إلى دعم الاقتصاد المحلي، وتمكين المرأة، وخلق فرص عمل حقيقية، وتحويل المشاريع الصغيرة والمنزلية إلى علامات تجارية ناجحة.',
  },
  'intro.stat1.val': { en: '25,000+', ar: '+25,000' },
  'intro.stat1.lbl': { en: 'Targeted Home Businesses',     ar: 'مشروع منزلي مستهدف' },
  'intro.stat2.val': { en: '100+', ar: '+100' },
  'intro.stat2.lbl': { en: 'Commercial & Food Categories', ar: 'تصنيف غذائي وتجاري' },

  // ── Services ────────────────────────────────────────
  'services.title': { en: 'Smart Digital Services',   ar: 'الخدمات الرقمية الذكية' },
  'services.desc': {
    en: 'A complete suite of smart digital services designed for home businesses, food establishments, and modern e-commerce.',
    ar: 'مجموعة متكاملة من الخدمات الرقمية الذكية المصممة لدعم المشاريع المنزلية والمنشآت الغذائية.',
  },
  'services.1': {
  en: 'Virtual Markets Management',
  ar: 'إدارة الأسواق الافتراضية'
},
'services.2': {
  en: 'Virtual Bazaars Management',
  ar: 'إدارة البازارات الافتراضية'
},
'services.3': {
  en: 'Handicrafts Management',
  ar: 'إدارة الحرف اليدوية'
},
'services.4': {
  en: 'Production Kitchens Management',
  ar: 'إدارة المطابخ الإنتاجية'
},
  // ── Process ─────────────────────────────────────────
  'process.title': { en: 'How It Works', ar: 'كيف تعمل المنصة' },
  'process.step1.title': { en: 'Join the Platform',      ar: 'الانضمام للمنصة' },
  'process.step1.desc':  { en: 'Register your home kitchen or handmade business and create your digital storefront.', ar: 'سجّلي مطبخك المنزلي أو مشروعك وأنشئي متجرك الرقمي.' },
  'process.step2.title': { en: 'Training & Onboarding',  ar: 'التدريب والتأهيل' },
  'process.step2.desc':  { en: 'Receive professional training and onboarding support to grow your business.', ar: 'احصلي على تدريب احترافي ودعم كامل للانطلاق بمشروعك.' },
  'process.step3.title': { en: ' Producers',    ar: ' المنتجون' },
  'process.step3.desc':  { en: 'Produce your homemade dishes and handcrafted products with pride and passion.', ar: 'اصنعي منتجاتك المنزلية بشغف واحترافية.' },
  'process.step4.title': { en: 'Quality Checking',       ar: 'فحص الجودة' },
  'process.step4.desc':  { en: 'Every product goes through our ISO-certified quality assurance process.', ar: 'تخضع كل المنتجات لضمان جودة معتمد وفق معايير أيزو.' },
  'process.step5.title': { en: 'Product Publishing',     ar: 'نشر المنتجات' },
  'process.step5.desc':  { en: 'Publish your products and reach thousands of customers.', ar: 'انشري منتجاتك وصلي لآلاف العملاء.' },
  'process.step6.title': { en: 'Order & Delivery',       ar: 'الطلب والتوصيل' },
  'process.step6.desc':  { en: 'Customers order seamlessly and receive items through our smart logistics network.', ar: 'يطلب العملاء بسهولة عبر شبكة لوجستية ذكية.' },

  // ── Categories ──────────────────────────────────────
  'categories.title':    { en: 'Explore Categories',     ar: 'استكشف التصنيفات' },
  'categories.viewMenu': { en: 'View Our Menu',           ar: 'عرض قائمتنا' },
  'categories.subtitle': { en: 'Discover World Cuisines', ar: 'اكتشف مطابخ العالم' },
  'categories.desc': {
    en: 'Browse dozens of Arabic and international kitchens within a premium digital experience.',
    ar: 'تصفح عشرات المطابخ العربية والعالمية ضمن تجربة رقمية احترافية.',
  },
  'cat.food':           { en: 'Food',               ar: 'مأكولات' },
  'cat.food.desc':      { en: 'Home-cooked meals from talented local chefs.', ar: 'وجبات منزلية من طهاة محليين موهوبين.' },
  'cat.beverages':      { en: 'Beverages & Desserts', ar: 'مشروبات وحلويات' },
  'cat.beverages.desc': { en: 'Refreshing drinks and irresistible sweet treats.', ar: 'مشروبات منعشة وحلويات لا تقاوم.' },
  'cat.handmade':       { en: 'Handmade Products',   ar: 'حرف يدوية' },
  'cat.handmade.desc':  { en: 'Unique artisan creations made with skill and heart.', ar: 'إبداعات حرفية فريدة مصنوعة بمهارة وشغف.' },
  'cat.processing':     { en: 'Food Processing',     ar: 'تصنيع غذائي' },
  'cat.processing.desc':{ en: 'Quality preserved and processed homemade food products.', ar: 'منتجات غذائية منزلية محفوظة وعالية الجودة.' },
  'cat.jordanian':      { en: 'Jordanian',           ar: 'أردني' },
  'cat.palestinian':    { en: 'Palestinian',         ar: 'فلسطيني' },
  'cat.lebanese':       { en: 'Lebanese',            ar: 'لبناني' },
  'cat.syrian':         { en: 'Syrian',              ar: 'سوري' },
  'cat.moroccan':       { en: 'Moroccan',            ar: 'مغربي' },
  'cat.yemeni':         { en: 'Yemeni',              ar: 'يمني' },
  'cat.iraqi':          { en: 'Iraqi',               ar: 'عراقي' },
  'cat.italian':        { en: 'Italian',             ar: 'إيطالي' },
  'cat.mexican':        { en: 'Mexican',             ar: 'مكسيكي' },
  'cat.desserts':       { en: 'Arabic Desserts',     ar: 'حلويات عربية' },
  'cat.manoush':        { en: 'Manoush',             ar: 'مناقيش' },
  'cat.drinks':         { en: 'Drinks',              ar: 'مشروبات' },
  'cat.salads':         { en: 'Salads',              ar: 'سلطات' },
  'cat.appetizers':     { en: 'Appetizers',          ar: 'مقبلات' },

  // ── Virtual Market (renamed from "Virtual Bazar") ────
  'market.title':    {  en: 'Virtual Markets',           ar: 'الأسواق الافتراضية' },
  'market.subtitle': { en: 'Discover · Shop · Connect',  ar: 'اكتشف · تسوّق · تواصل' },
  'market.desc': {
    en: 'Discover premium products from trusted companies and brands, and order directly from the source—no middleman required.',
    ar: 'اكتشف منتجات مميزة من شركات وعلامات تجارية موثوقة، واطلب مباشرة من المصدر دون وسيط.',
  },
  'market.partnerBtn': { en: 'Partner with Us', ar: 'تواصل للشراكة' },

  // ── Virtual Bazaar (new weekly 48-hour event) ────────
  'wbazaar.eyebrow':  { en: 'Weekly event · 48 hours only', ar: 'فعالية أسبوعية · 48 ساعة فقط' },
  'wbazaar.title':    { en: 'Virtual bazaar',               ar: 'البازار الافتراضي' },
  'wbazaar.subtitle': {
    en: "Every weekend, vendors offer special products you won't find in the virtual market — for 48 hours only",
    ar: 'كل نهاية أسبوع، بائعات يقدمن منتجات مميزة لا تجدينها في السوق الافتراضي — لمدة 48 ساعة فقط',
  },
  'wbazaar.status.open': {
    en: 'The bazaar is open now — closes Saturday 6:00 PM',
    ar: 'البازار مفتوح الآن — يغلق السبت 6:00 مساءً',
  },
  'wbazaar.status.closedPrefix': {
    en: 'Next bazaar opens Thursday at 6:00 PM — in',
    ar: 'يفتح البازار القادم يوم الخميس الساعة 6:00 مساءً — بعد',
  },
  'wbazaar.unit.day':    { en: 'd', ar: 'يوم' },
  'wbazaar.unit.hour':   { en: 'h', ar: 'ساعة' },
  'wbazaar.unit.minute': { en: 'm', ar: 'دقيقة' },
  'wbazaar.collage.handmade':    { en: 'Handmade crafts',            ar: 'مشغولات يدوية' },
  'wbazaar.collage.sweets':      { en: 'Gourmet dishes',              ar: 'أطباق فاخرة' },
  'wbazaar.collage.provisions':  { en: 'Salads & appetizers',         ar: 'سلطات ومقبلات' },
  'wbazaar.collage.gifts':       { en: 'Gifts and artifacts',         ar: 'هدايا وتحف' },
  'wbazaar.collage.vendorsBadge':{ en: '+30 vendors every week',      ar: '+30 بائعة كل أسبوع' },
  'wbazaar.timeline.opens.label':  { en: 'Opens Thursday', ar: 'يفتح الخميس' },
  'wbazaar.timeline.closes.label': { en: 'Closes Saturday', ar: 'يغلق السبت' },
  'wbazaar.time.6pm':              { en: '6:00 PM', ar: '6:00 مساءً' },
  'wbazaar.timeline.center.title': { en: 'Open 48 hours straight',       ar: 'مفتوح 48 ساعة متواصلة' },
  'wbazaar.timeline.center.sub':   { en: 'Shop and order any time',      ar: 'تسوقي واطلبي في أي وقت' },
  'wbazaar.partner.heldWith': { en: 'Held in partnership with',  ar: 'يقام بالتعاون مع' },
  'wbazaar.partner.name':     { en: 'Lions Signature Bazzars',   ar: 'Lions Signature Bazzars' },
  'wbazaar.partner.badge':    { en: 'Certified bazaar organizer', ar: 'منظم بازارات معتمد' },
  'wbazaar.cta.shopNow':     { en: 'Shop the bazaar now',              ar: 'تسوقي البازار الآن' },
  'wbazaar.cta.remindMe':    { en: 'Remind me of the next bazaar',     ar: 'ذكّريني بالبازار القادم' },
  'wbazaar.cta.vendorBooth': { en: 'Book your booth as a vendor',      ar: 'احجزي ركنك كبائعة' },

  // ── Catering (cinematic redesign) ────────────────────
  'catering.title':    { en: 'Catering services',                        ar: 'خدمات الكيترينج' },
  'catering.subtitle': { en: 'Fine catering · ISO 9001 certified',       ar: 'ضيافة راقية · معتمدة ISO 9001' },
  'catering.banner.badge':    { en: 'From our kitchens', ar: 'لقطات من مطابخنا' },
  'catering.banner.headline': { en: 'Your occasion deserves an unforgettable taste', ar: 'مناسبتك تستحق طعماً لا يُنسى' },
  'catering.banner.subline': {
   en: 'Authentic flavors prepared by Setat Byot kitchens to professional standards — for your weddings, corporate events, and special occasions',
    ar: 'نكهات أصيلة تجهزها مطابخ ستات بيوت بمعايير احترافية — لأعراسكم وشركاتكم ومناسباتكم الخاصة',
  },
  'catering.cta.book':     { en: 'Book your occasion',        ar: 'احجزي مناسبتك' },
  'catering.cta.whatsapp': { en: 'WhatsApp consultation',     ar: 'استشارة واتساب' },
  'catering.photo.weddings':  { en: 'Weddings',           ar: 'أعراس' },
  'catering.photo.corporate': { en: 'Corporate',           ar: 'شركات' },
  'catering.photo.special':   { en: 'Special occasions',   ar: 'مناسبات خاصة' },
  'catering.step1.title': { en: 'Choose your menu',          ar: 'اختاري قائمتك' },
  'catering.step1.desc':  { en: 'Ready-made menus or fully customized for your occasion', ar: 'قوائم جاهزة أو مصممة خصيصاً لمناسبتك' },
  'catering.step2.title': { en: 'Prepared with trusted hands', ar: 'نجهّز بأيادٍ أمينة' },
  'catering.step2.desc':  { en: 'Licensed production kitchens operating in accordance with quality standards', ar:' مطابخ إنتاجية مرخصة تعمل بمعايير الجودة' },
  'catering.step3.title': { en: 'We arrive before your time',  ar: 'نصل قبل موعدك' },
  'catering.step3.desc':  { en: 'Preparation, presentation, and delivery right on schedule', ar: 'تجهيز وتقديم وتوصيل في الوقت المحدد' },
  'catering.trust': {
    en: 'Hundreds of successful occasions · every order passes certified quality inspection before serving',
    ar: 'مئات المناسبات الناجحة · كل طلب يمر بفحص جودة معتمد قبل التقديم',
  },

  // ── Sponsors ────────────────────────────────────────
  'sponsors.eyebrow':  { en: 'Support empowerment', ar: 'ادعم التمكين' },
  'sponsors.title':    { en: 'Our sponsors',        ar: 'الرعاة الرسميون' },
  'sponsors.subtitle': {
    en: 'Join our success partners and support home businesses and the local economy',
    ar: 'انضم إلى شركاء النجاح وادعم المشاريع المنزلية والاقتصاد المحلي',
  },
  'sponsors.diamond.title': { en: 'Diamond Sponsors', ar: 'الرعاة الماسيون' },
  'sponsors.diamond.badge': { en: '4 exclusive seats', ar: '4 مقاعد حصرية' },
  'sponsors.diamond.benefit': {
    en: 'Your logo on the homepage and hero section + mentions in all marketing campaigns',
    ar: 'شعارك في الصفحة الرئيسية والقسم العلوي + ذكر في جميع الحملات التسويقية',
  },
  'sponsors.diamond.placeholder.title': { en: 'Diamond seat available', ar: 'مقعد ماسي متاح' },
  'sponsors.diamond.placeholder.sub':   { en: 'Be the first sponsor',   ar: 'كن أول الرعاة' },
  'sponsors.gold.title': { en: 'Gold Sponsors', ar: 'الرعاة الذهبيون' },
  'sponsors.gold.badge': { en: '10 seats',      ar: '10 مقاعد' },
  'sponsors.gold.benefit': {
    en: 'Your logo in the sponsors section + social media mentions',
    ar: 'شعارك في قسم الرعاة + ذكر في صفحات التواصل الاجتماعي',
  },
  'sponsors.gold.placeholder': { en: 'Gold seat', ar: 'مقعد ذهبي' },
  'sponsors.cta': { en: 'Become a sponsor', ar: 'كن راعياً الآن' },

  // ── About ────────────────────────────────────────────
  'about.title':          { en: 'About Us',   ar: 'من نحن' },
  'about.company.name':   { en: 'مؤسسة ستات بيوت', ar: 'مؤسسة ستات بيوت' },
  'about.company': {
    en: "One of Jordan's leading specialized firms in integrated solutions for managing, operating, and designing food establishments, entrepreneurial projects, and smart applications. We turn ideas into successful and sustainable ventures.",
    ar: 'من المؤسسات الأردنية المتخصصة والرائدة في تقديم حلول متكاملة لإدارة وتشغيل وتصميم المنشآت الغذائية والمشاريع الريادية والتطبيقات الذكية. تحوّل الأفكار إلى مشاريع ناجحة ومستدامة.',
  },
  'about.expertise.title': { en: 'Our Areas of Expertise', ar: 'مجالات خبرتنا' },
  'about.exp1': { en: 'Operations & Management',      ar: 'الإدارة والتشغيل' },
  'about.exp2': { en: 'Engineering & Design',         ar: 'الهندسة والتصميم' },
  'about.exp3': { en: 'Food Safety & Health',         ar: 'الصحة والسلامة الغذائية' },
  'about.exp4': { en: 'Software & Smart Apps',        ar: 'التطوير التقني' },
  'about.exp5': { en: 'Digital Marketing',            ar: 'التسويق الرقمي' },
  'about.exp6': { en: 'Project Management',           ar: 'إدارة المشاريع' },
  'about.exp7': { en: 'Quality & Governance',         ar: 'الجودة والحوكمة' },
  'about.exp8': { en: 'Digital Transformation',       ar: 'التحول الرقمي' },
  'about.exp9': { en: 'Smart Logistics & Technology', ar: 'التطبيقات الذكية' },
  'about.vision':       { en: 'Our Vision',   ar: 'رؤيتنا' },
  'about.vision.desc':  {
    en: " To become the leading and most trusted smart platform in Jordan and the region, supporting businesses, production kitchens, food establishments, Bedouin handicrafts, and smart e-commerce by providing advanced operational and technological solutions based on quality, innovation, and sustainability.",
    ar:   'أن نكون المنصة الذكية الأولى والأكثر ثقة في الأردن والمنطقة لدعم المشاريع والمطابخ الإنتاجية والمنشآت الغذائية والحرف البدوية والتجارة الإلكترونية الذكية، عبر تقديم حلول تشغيلية وتقنية متطورة ترتكز على الجودة والابتكار والاستدامة',
   },
   'about.mission':      { en: 'Our Mission',  ar: 'رسالتنا' },
  'about.mission.desc': {
   en: 'Empowering entrepreneurs, investors, production kitchens, and food establishments to transform their ideas into successful and sustainable businesses through professional operating systems, modern technologies, and integrated services.',
  ar: 'تمكين أصحاب المشاريع والمستثمرين والمطابخ الإنتاجية والمنشآت الغذائية من تحويل أفكارهم إلى مشاريع ناجحة ومستدامة من خلال أنظمة تشغيل احترافية، وتقنيات حديثة، وخدمات متكاملة.'
  },
  'about.reg.title':    { en: 'Official Information', ar: 'المعلومات الرسمية' },
  'about.reg.iso':      { en: 'ISO 9001 Certified', ar: 'حاصلة على شهادة ISO 9001' },
  'about.reg.country':  { en: 'Officially Registered Jordanian Company', ar: 'مؤسسة أردنية مسجلة رسمياً' },
  'about.reg.ministry': { en: 'Ministry of Industry, Trade & Provisioning', ar: 'وزارة الصناعة والتجارة والتمويين' },
  'about.reg.num':      { en: 'Registration No.: 588180', ar: 'رقم التسجيل: 588180' },
  'about.reg.national': { en: 'National No.: 101042113', ar: 'الرقم الوطني: 101042113' },
  'about.reg.trade':    { en: 'Trade Name: 293366', ar: 'الاسم التجاري: 293366' },
  'about.reg.type':     { en: 'Sole Proprietorship', ar: 'مؤسسة فردية' },

  // ── Partners section ────────────────────────────────
  'about.partners.title': { en: 'Our Partners', ar: 'شركاؤنا' },
  'about.partners.msis.name':  { en: 'MSIS Company', ar: 'مؤسسة MSIS' },
  'about.partners.msis.badge': { en: 'Certified Partner — ISO 9001', ar: 'شريك معتمد — ISO 9001' },
  'about.partners.msis.desc': {
    en: "In partnership with MSIS, specialists in quality consulting and institutional excellence, we obtained ISO 9001 and ISO 27001 certifications and implemented world-class operational standards across our platform. Their pivotal role elevated Setat Byot into a certified, professional platform trusted by our clients and partners.",
    ar: 'بالتعاون مع مؤسسة MSIS المتخصصة في استشارات الجودة والتميز المؤسسي، تمكّنا من الحصول على شهادتي ISO 9001 وISO 27001، وتطبيق معايير تشغيلية عالمية المستوى عبر منصتنا. وكان دورها محورياً في رفع مستوى ستات بيوت لتصبح منظومة معتمدة ومحترفة تحظى بثقة عملائنا وشركائنا.',
  },
  'about.contact.title': { en: 'Contact Us', ar: 'تواصل معنا' },

  // ── About Standards card ────────────────────────────
  'about.standards.title': { en: 'Global Standards', ar: 'المعايير العالمية' },
  'about.standards.desc': {
    en: "We commit to applying the highest quality, management, professional safety, and digital security standards to ensure services on par with the world's leading platforms.",
    ar: 'تلتزم المؤسسة بتطبيق أعلى معايير الجودة والإدارة والسلامة المهنية والأمن الرقمي، بما يضمن تقديم خدمات احترافية تواكب أفضل المنصات العالمية.',
  },
  'about.std1': { en: 'Global ISO Systems',                   ar: 'أنظمة ISO العالمية' },
  'about.std2': { en: 'Food Safety Standards',                ar: 'معايير سلامة الغذاء' },
  'about.std3': { en: 'UX/UI User Experience Standards',      ar: 'معايير تجربة المستخدم UX/UI' },
  'about.std4': { en: 'Cybersecurity Systems',                ar: 'أنظمة الأمن السيبراني' },
  'about.std5': { en: 'Digital Transformation Technologies',  ar: 'تقنيات التحول الرقمي' },
  'about.std6': { en: 'Smart Operations Systems',             ar: 'أنظمة التشغيل الذكية' },
  'about.std7': { en: 'Corporate Governance Systems',         ar: 'أنظمة الحوكمة المؤسسية' },

  // ── Contact ──────────────────────────────────────────
  'contact.address': {
    en: 'Amman, Jordan – Al-Shmeisani, opposite Ministry of Industry, Trade & Provisioning, Arif Al-Anbatawi St., Peace Complex, 3rd Floor',
    ar: 'عمّان-الأردن - الشميساني - مقابل وزارة الصناعة والتجارة والتمويين - شارع عارف العنبتاوي - مجمع السلام - الطابق الثالث',
  },
  'contact.pobox':  { en: 'P.O. Box: Amman 142859 – 11814 Jordan', ar: 'صندوق البريد: Amman 142859 – 11814 Jordan' },
  'contact.website':       { en: 'www.setatbyot.com',          ar: 'www.setatbyot.com' },

  // ── Download CTA ─────────────────────────────────────
  'cta.title':     { en: 'Start Your Journey',   ar: 'ابدأ رحلتك' },
  'cta.desc': {
    en: 'Setat Byot is not just a website. It is a complete digital experience designed to be the gateway to the future for home kitchens and entrepreneurial projects.',
    ar: 'ستات بيوت ليست مجرد موقع إلكتروني. إنها تجربة رقمية متكاملة صُممت لتكون بوابة المستقبل للمطابخ المنزلية والمشاريع الريادية.',
  },
  'cta.appstore':   { en: 'App Store',    ar: 'متجر التطبيقات' },
  'cta.googleplay': { en: 'Google Play',  ar: 'جوجل بلاي' },
  'cta.copyright':  { en: '© 2026 Setat Byot. All rights reserved.', ar: '© 2026 ستات بيوت. جميع الحقوق محفوظة.' },
};

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('setat-lang');
    if (stored === 'ar' || stored === 'en') return stored;
    return 'ar';
  });

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('lang', language);
    html.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('setat-lang', language);
  }, [language]);

  const toggleLanguage = () => setLanguage(prev => (prev === 'ar' ? 'en' : 'ar'));
  const t = (key: string): string => translations[key]?.[language] ?? key;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}
