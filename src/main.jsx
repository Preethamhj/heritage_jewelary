import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Home, Menu, Moon, Search, Sun, X, ChevronRight, Sparkles, Gem, MessageCircle, Mail, Instagram, Facebook } from 'lucide-react';
import './styles.css';
import logoImage from './assets/heritage-logo.jpg';
import frontpageImage from './assets/heritage-frontpage.jpg';
import showcasePendant from './assets/heritage-showcase-pendant.webp';
import showcasePendantBack from './assets/heritage-showcase-pendant-back.webp';

const heritageModules = import.meta.glob('./assets/heritage/*.jpeg', {
  eager: true,
  query: '?url',
  import: 'default',
});

const images = Object.entries(heritageModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, src]) => src);

const pick = (start, count) => images.slice(start, start + count);

/* ─── BUSINESS CONTACT CONFIGURATION ─── */
const BUSINESS_CONFIG = {
  whatsapp: {
    number: '917483458586',
    displayNumber: '+91 74834 58586',
    message: 'Hello Heritage Jewellery! I would like to book a private jewellery consultation. Please share the available details.',
  },
  email: {
    address: 'heritage.jewellary@gmail.com',
  },
};

/* ─── FOUR-CATEGORY DATA ───
   Note: All gallery images have been removed from category pages to make it easy
   to replace with your customized images.
   - To replace the main heading image: update the `hero` property for that category.
   - To add your customized collection images: add your image imports or URLs into
     the `images: []` array of any section below. The section and image grid
     will automatically appear!
─── */

const pages = [
  {
    id: 'kundan',
    label: 'KUNDAN',
    title: 'KUNDAN JEWELLERY',
    eyebrow: 'TRADITIONAL CRAFTSMANSHIP',
    intro: 'Its  a classic design and meticulous detailing make it more than details of legacy— it becomes a statement of Heritage and everlasting allure.',
    hero: images[0],
    subcategories: [
      'Kundan Necklace Sets',
      'Kundan Chokers',
      'Kundan Earrings',
      'Kundan Jhumkas',
      'Kundan Maang Tikka',
      'Kundan Bangles',
      'Kundan Rings',
      'Kundan Pendants',
      'Bridal Kundan Sets',
    ],
    sections: [
      {
        title: 'THE ROYAL KUNDAN NECKLACE',
        text: 'Grand necklaces composed through jadau forms, river pearls, kundan settings, and dramatic pendants — each piece an expression of regal elegance.',
        layout: 'triptych hero-grid',
        images: [],
      },
      {
        title: 'KUNDAN BRIDAL ADORNMENTS',
        text: 'Ruby-green contrasts, pearl borders, and meenakari reverses create ornaments with weight, presence, and ceremonial grandeur.',
        layout: 'dense',
        images: [],
      },
    ],
  },
  {
    id: 'temple',
    label: 'TEMPLE',
    title: 'NAKASHI / TEMPLE JEWELLERY',
    eyebrow: 'SOUTH INDIAN HERITAGE',
    intro: 'Sacred motifs sculpted in antique gold — Lakshmi forms, peacock silhouettes, and intricate nakashi relief work honouring centuries of South Indian temple artistry and devotional craftsmanship.',
    hero: images[9],
    subcategories: [
      'Temple Necklace Sets',
      'Lakshmi Necklaces',
      'Temple Haram',
      'Temple Chokers',
      'Nakashi Earrings',
      'Temple Jhumkas',
      'Temple Bangles',
      'Temple Rings',
      'Peacock Motif Jewellery',
      'Antique Temple Jewellery',
    ],
    sections: [
      {
        title: 'LAKSHMI AND PEACOCK MOTIFS',
        text: 'Gold relief gives each ornament a carved, almost architectural presence — deity forms and sacred geometry shaped by generations of temple goldsmiths.',
        layout: 'triptych',
        images: [],
      },
      {
        title: 'NAKASHI GOLD SURFACES',
        text: 'Nakashi-inspired surfaces gather depth, shadow, and ceremonial rhythm in antique-finished gold that carries the warmth of Southern heritage.',
        layout: 'dense',
        images: [],
      },
    ],
  },
  {
    id: 'polki',
    label: 'POLKI',
    title: 'UNCUT DIAMOND / POLKI JEWELLERY',
    eyebrow: 'NATURAL STONE CHARACTER',
    intro: 'The raw beauty of uncut diamonds set in traditional frameworks — Polki jewellery celebrates the natural character of each stone, creating pieces of ceremonial elegance and timeless distinction.',
    hero: images[6],
    subcategories: [
      'Polki Necklace Sets',
      'Polki Chokers',
      'Polki Earrings',
      'Polki Jhumkas',
      'Polki Rings',
      'Polki Pendants',
      'Polki Bangles',
      'Polki Bridal Sets',
      'Uncut Diamond Necklaces',
    ],
    sections: [
      {
        title: 'POLKI CEREMONIAL NECKLACES',
        text: 'Large neckpieces anchor the collection with sculptural pendants, uncut diamond clusters, and pearl edges that frame the face with luminous softness.',
        layout: 'dense',
        images: [],
      },
      {
        title: 'POLKI BRIDAL ELEGANCE',
        text: 'Pearl clusters and uncut diamond settings create motion around the neckline — each bridal set composed for presence, weight, and heirloom distinction.',
        layout: 'asymmetric',
        images: [],
      },
    ],
  },
  {
    id: 'lightweight-daily wears',
    label: 'LIGHTWEIGHT / DAILY WEARS',
    title: 'LIGHTWEIGHT & DAILY WEAR JEWELLERY',
    eyebrow: 'EVERYDAY ELEGANCE & PERSONALISATION',
    intro: 'From minimal daily wear to bespoke creations — jewellery that bridges heritage craftsmanship with contemporary lifestyle and personal expression, combining comfort with custom artistry.',
    hero: images[20],
    subcategories: [
      'Gold Chains',
      'Mangalsutra',
      'Daily Wear Rings',
      'Daily Wear Earrings',
      'Stud Earrings',
      'Hoop Earrings',
      'Daily Wear Pendants',
      'Bracelets',
      'Lightweight Bangles',
      'Custom Necklaces',
      'Custom Earrings',
      'Custom Rings',
      'Custom Pendants',
      'Lightweight Necklace Sets',
      'Personalised Jewellery',
      'Custom Mangalsutra',
      'Custom Bracelet Designs',
    ],
    sections: [
      {
        title: 'BANGLES AND SMALL TREASURES',
        text: 'Floral bezels, emerald centres, and engraved gold complete the collection with everyday ceremony — each piece scaled for comfort and daily grace.',
        layout: 'dense',
        images: [],
      },
      {
        title: 'PENDANT AND EARRING DETAILS',
        text: 'Small pieces let the handwork come close, revealing the rhythm of stone setting and gold carving in intimate, wearable scale.',
        layout: 'triptych',
        images: [],
      },
      {
        title: 'BESPOKE CREATIONS',
        text: 'The collection balances personalised design with heritage goldsmithing — each piece crafted to the individual while honouring traditional handwork.',
        layout: 'dense',
        images: [],
      },
      {
        title: 'LIGHTWEIGHT CRAFT',
        text: 'Modern lightweight construction meets artisanal detail — custom pieces that carry heritage character without weight.',
        layout: 'two',
        images: [],
      },
    ],
  },
];

const pageMap = Object.fromEntries(pages.map((page) => [page.id, page]));

/* ─── LEGACY HASH REDIRECTS ─── */
const legacyRedirects = {
  daily: 'lightweight-daily wears',
  custom: 'lightweight-daily wears',
  'lightweight-custom': 'lightweight-daily wears',
  'lightweight-dialy wears': 'lightweight-daily wears',
};

/* ─── CATEGORY TILES DATA (4 tiles) ─── */
const categoryTiles = [
  { id: 'kundan', label: 'Kundan', imageIndex: 0, subtitle: 'Explore Collection' },
  { id: 'temple', label: 'Temple', imageIndex: 9, subtitle: 'Explore Collection' },
  { id: 'polki', label: 'Polki', imageIndex: 6, subtitle: 'Explore Collection' },
  { id: 'lightweight-daily wears', label: 'Lightweight / Daily Wears', imageIndex: 20, subtitle: 'Explore Collection' },
];

/* ─── COLLECTION STORYTELLING ─── */
const collectionStories = {
  kundan: {
    title: 'The Art of Kundan',
    text: 'Kundan jewellery represents one of India\'s oldest forms of gemstone jewellery, originating in the royal courts of Rajasthan and Gujarat. Each piece begins with a gold framework into which carefully shaped stones are set using refined lac and gold foil, creating ornaments that radiate warmth, colour, and regal magnificence.',
  },
  temple: {
    title: 'The Legacy of Temple Gold',
    text: 'Nakashi and temple jewellery draw from the sacred art of South Indian temple architecture. Lakshmi, peacock, and floral motifs are sculpted into antique gold using repousse and relief techniques — each ornament a fragment of devotional art, carrying the spiritual weight and cultural memory of centuries.',
  },
  polki: {
    title: 'The Character of Uncut Diamonds',
    text: 'Polki jewellery preserves the raw, natural character of uncut diamonds — each stone unique in its shape, clarity, and luminance. Set in traditional gold frameworks with kundan technique and pearl accents, Polki pieces carry an authenticity and ceremonial grandeur that cut stones cannot replicate.',
  },
  'lightweight-daily wears': {
    title: 'Elegance for Every Day & Your Story, Our Craft',
    text: 'Lightweight jewellery bridges heritage craftsmanship with contemporary lifestyle — minimal studs, gold chains, and comfortable bangles bring quiet sophistication to everyday moments. Our custom creations invite you to co-create with our artisans, combining modern lightweight construction with heritage handwork to create jewellery that is intimately yours.',
  },
};

function useScrollReveal(key) {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nodes = [...document.querySelectorAll('[data-reveal]')];
    if (reduceMotion) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15 });

    nodes.forEach((node, index) => {
      if (!node.dataset.delay) node.style.setProperty('--delay', `${(index % 6) * 80}ms`);
      observer.observe(node);
    });

    return () => observer.disconnect();
  }, [key]);
}

function useDarkMode() {
  const getInitialTheme = () => {
    const saved = localStorage.getItem('heritage-theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };
  const [darkMode, setDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
    localStorage.setItem('heritage-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return [darkMode, setDarkMode];
}

function Header({ activePage, onNavigate, darkMode, onThemeToggle }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigate = (pageId, event) => {
    event?.currentTarget?.blur();
    onNavigate(pageId);
    setOpen(false);
    setExpandedMobile(null);
  };

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <button className="icon-button menu-toggle" onClick={() => setOpen(true)} aria-label="Open menu">
        <Menu size={18} />
      </button>
      <button className="brand" onClick={(event) => navigate('home', event)} aria-label="Heritage Jewelary home">
        <img className="brand-logo" src={logoImage} alt="Heritage Jewellery logo" />
        <span className="brand-name">HERITAGE JEWELARY</span>
      </button>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {pages.map((item, itemIndex) => (
          <div className="nav-item" key={item.id}>
            <button className={activePage === item.id ? 'is-active' : ''} onClick={(event) => navigate(item.id, event)}>
              {item.label}
            </button>
            <div className="mega-menu">
              <div className="mega-inner">
                <div className="mega-links">
                  <p>{item.label}</p>
                  {item.subcategories.map((sub) => (
                    <button onClick={(event) => navigate(item.id, event)} key={sub}>{sub}</button>
                  ))}
                </div>
                <div className="mega-tiles">
                  {pick(itemIndex * 8, 3).map((image, index) => (
                    <button className="mega-tile" onClick={(event) => navigate(item.id, event)} key={`${item.id}-mega-${index}`}>
                      <img src={image} alt="" loading="lazy" />
                      <span>{item.subcategories[index] || item.sections[index % item.sections.length].title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </nav>
      <div className="header-actions">
        <button className="icon-button" onClick={onThemeToggle} aria-label="Toggle evening mode">
          {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        </button>
        <button className="icon-button search-button" aria-label="Search"><Search size={22} /></button>
      </div>
      <div className={`mobile-drawer ${open ? 'is-open' : ''}`}>
        <button className="icon-button drawer-close" onClick={() => setOpen(false)} aria-label="Close menu">
          <X size={20} />
        </button>
        <div className="drawer-brand">HERITAGE JEWELARY</div>
        <button className="drawer-link drawer-home-link" onClick={(event) => navigate('home', event)}>Home</button>
        {pages.map((item) => (
          <div key={item.id} className="drawer-category">
            <button
              className={`drawer-link ${activePage === item.id ? 'drawer-link-active' : ''}`}
              onClick={(event) => {
                if (expandedMobile === item.id) {
                  navigate(item.id, event);
                } else {
                  setExpandedMobile(item.id);
                }
              }}
            >
              {item.label}
              <ChevronRight size={14} className={`drawer-chevron ${expandedMobile === item.id ? 'drawer-chevron-open' : ''}`} />
            </button>
            {expandedMobile === item.id && (
              <div className="drawer-subcategories">
                <button className="drawer-sub-link drawer-sub-viewall" onClick={(event) => navigate(item.id, event)}>
                  View All {item.label}
                </button>
                {item.subcategories.map((sub) => (
                  <button className="drawer-sub-link" onClick={(event) => navigate(item.id, event)} key={sub}>{sub}</button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </header>
  );
}

function MovingLogoBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      className="moving-logo-bg"
      aria-hidden="true"
      style={{ transform: `translate3d(0, ${scrollY * 0.08}px, 0)` }}
    >
      <img src={logoImage} alt="" />
    </div>
  );
}

function ImageGrid({ variant, items }) {
  return (
    <section className={`image-grid ${variant}`} data-reveal="up">
      {items.map((item, index) => (
        <figure className="product-card" data-reveal={index % 2 ? 'scale' : 'up'} key={`${item}-${index}`}>
          <img src={item} alt="Heritage Jewellery collection piece" loading="lazy" />
          <figcaption className="quick-view">Quick View</figcaption>
        </figure>
      ))}
    </section>
  );
}

function StaggeredHeadline({ text }) {
  return (
    <h1>
      {text.split(' ').map((word, index) => (
        <span className="hero-word" style={{ '--i': index }} key={`${word}-${index}`}>{word} </span>
      ))}
    </h1>
  );
}

/* ─── SUBCATEGORY NAV WITHIN COLLECTION PAGE ─── */
function SubcategoryNav({ subcategories, label }) {
  return (
    <section className="subcategory-nav" data-reveal="up">
    </section>
  );
}

/* ─── LUXURY HERITAGE JEWELLERY 3D SHOWCASE ─── */
function JewelleryShowcase() {
  const containerRef = React.useRef(null);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [isReducedMotion, setIsReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  React.useEffect(() => {
    if (isReducedMotion) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false;
            return;
          }
          const rect = containerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          // Track distance is the total height minus one viewport
          const trackDistance = rect.height - windowHeight;

          if (trackDistance <= 0) {
            setScrollProgress(0);
            ticking = false;
            return;
          }

          // Progress begins when container top hits top of viewport (rect.top <= 0)
          const scrolled = -rect.top;
          let progress = scrolled / trackDistance;

          // Strictly clamp between 0 and 1
          if (progress < 0) progress = 0;
          if (progress > 1) progress = 1;

          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isReducedMotion]);

  // Map progress directly to rotation: 0 to exactly 360 degrees, stopping at completion
  const rotationAngle = isReducedMotion ? 0 : scrollProgress * 360;

  // Specular lighting & shadow trigonometry
  const rad = (rotationAngle * Math.PI) / 180;
  const shimmerAngle = 120 + Math.sin(rad) * 50;
  const shimmerOpacity = 0.12 + 0.16 * Math.abs(Math.cos(rad));
  const shadowScaleX = 0.45 + 0.55 * Math.abs(Math.cos(rad));
  const floatY = Math.sin(rad * 2) * -4;

  return (
    <section className="jewellery-showcase-section" ref={containerRef} id="jewellery-showcase">
      <div className="showcase-sticky-stage">
        {/* 3D Rotating Pendant */}
        <div className="showcase-3d-viewport" aria-label="3D Interactive Jewellery Showcase">
          <div
            className="showcase-jewel-card"
            style={{
              transform: `rotateY(${rotationAngle}deg) translateY(${floatY}px)`,
            }}
          >
            {/* Depth extrusion layers along Z for authentic relief thickness */}
            <div className="showcase-depth-layer" style={{ transform: 'translateZ(-2px)' }}>
              <img src={showcasePendant} alt="" aria-hidden="true" />
            </div>
            <div className="showcase-depth-layer" style={{ transform: 'translateZ(-1px)' }}>
              <img src={showcasePendant} alt="" aria-hidden="true" />
            </div>

            {/* Front Face: Original High-Res Isolated Temple Pendant */}
            <div className="showcase-face showcase-face-front">
              <img
                src={showcasePendant}
                alt="Handcrafted Sacred Uma-Maheshwara Temple Jewellery Pendant in antique gold"
                loading="eager"
              />
              <div
                className="showcase-specular-shimmer"
                style={{
                  background: `linear-gradient(${shimmerAngle}deg, transparent 35%, rgba(255, 240, 190, ${shimmerOpacity}) 50%, transparent 65%)`,
                  maskImage: `url(${showcasePendant})`,
                  WebkitMaskImage: `url(${showcasePendant})`,
                }}
              />
            </div>

            {/* Back Face: Authentic Hand-Carved Antique Gold Repoussé Backplate */}
            <div className="showcase-face showcase-face-back">
              <img
                src={showcasePendantBack}
                alt="Authentic repoussé reverse gold backplate of the pendant"
                loading="eager"
              />
              <div
                className="showcase-specular-shimmer"
                style={{
                  background: `linear-gradient(${shimmerAngle + 180}deg, transparent 35%, rgba(255, 235, 175, ${shimmerOpacity * 0.7}) 50%, transparent 65%)`,
                  maskImage: `url(${showcasePendantBack})`,
                  WebkitMaskImage: `url(${showcasePendantBack})`,
                }}
              />
            </div>
          </div>

          {/* Dynamic Ambient Ground Shadow */}
          <div
            className="showcase-ground-shadow"
            style={{
              transform: `translateX(-50%) rotateX(82deg) scaleX(${shadowScaleX})`,
              opacity: 0.3 + 0.2 * Math.abs(Math.cos(rad)),
            }}
            aria-hidden="true"
          />
        </div>

        {/* Text directly below the pendant */}
        <div className="showcase-caption-wrap" data-reveal="up">
          <h2 className="showcase-caption-heading">why heritage jewellery?</h2>
          <p className="showcase-caption-text">
            Heritage jewelry represents purity and holiness, more than ornaments—it is a reflection of culture, traditional legacy, emotional value, craftsmanship, and stories passed down through generations. Each piece is inspired by traditional artistry, where skilled hands transform precious metals and stones into timeless designs rooted in history. These jewels carry the essence of rituals, celebrations, and identity, preserving the beauty of the past while remaining relevant in the present.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── BOOK CONSULTATION SECTION ─── */
function BookConsultation() {
  const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.whatsapp.number}?text=${encodeURIComponent(BUSINESS_CONFIG.whatsapp.message)}`;

  return (
    <section className="consultation" id="consultation" data-reveal="up">
      <div className="consultation-inner">
        <p className="eyebrow">PERSONALISED SERVICE</p>
        <h2>Book a Consultation</h2>
        <p className="consultation-description">
          Discover jewellery that tells your story. Connect with our team for personalised assistance, custom designs, collection enquiries and expert guidance.
        </p>
        <div className="consultation-grid">
          <div className="consultation-card">
            <div className="consultation-icon">
              <MessageCircle size={28} />
            </div>
            <h3>WHATSAPP</h3>
            <p className="consultation-contact">{BUSINESS_CONFIG.whatsapp.displayNumber}</p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-magnetic consultation-btn"
              aria-label="Book consultation via WhatsApp"
            >
              Book Consultation
            </a>
          </div>
          <div className="consultation-card">
            <div className="consultation-icon">
              <Mail size={28} />
            </div>
            <h3>EMAIL</h3>
            <p className="consultation-contact">{BUSINESS_CONFIG.email.address}</p>
            <a
              href={`mailto:${BUSINESS_CONFIG.email.address}`}
              className="btn-primary btn-magnetic consultation-btn"
              aria-label="Send email enquiry"
            >
              Send Enquiry
            </a>
          </div>
        </div>

        {/* To connect us: */}
        <div className="consultation-connect" data-reveal="up">
          <p className="consultation-connect-heading">To connect us:</p>
          <div className="consultation-social-logos">
            <a
              href="https://www.instagram.com/_heritagejewellery_?igsh=Ym5qd3ptYzZlcDli"
              target="_blank"
              rel="noopener noreferrer"
              className="consultation-social-btn"
              aria-label="Instagram"
              title="Instagram"
            >
              <Instagram size={28} />
            </a>
            <a
              href="https://www.facebook.com/share/18hSQxoych/"
              target="_blank"
              rel="noopener noreferrer"
              className="consultation-social-btn"
              aria-label="Facebook"
              title="Facebook"
            >
              <Facebook size={28} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── COLLECTION PAGE ─── */
function CollectionPage({ page }) {
  if (!page) return null;
  const story = collectionStories[page.id];

  return (
    <main className="page-shell" id="top" key={page.id}>
      {/* Main heading section with its primary image */}
      <section className="page-hero">
        <div className="page-hero-media">
          <img src={page.hero} alt={page.title} />
        </div>
        <div className="page-hero-copy" data-reveal="up">
          <p className="category">{page.eyebrow}</p>
          <StaggeredHeadline text={page.title} />
          <div className="hero-underline" />
          <p>{page.intro}</p>
        </div>
      </section>

      {/* Render sections & image grids if customized images are added */}
      {page.sections && page.sections.map((section, index) => (
        section.images && section.images.length > 0 ? (
          <React.Fragment key={section.title}>
            <section className={`text-block ${index % 2 ? 'center' : 'left'}`} data-reveal={index % 2 ? 'right' : 'left'}>
              <p className="eyebrow">{page.label}</p>
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </section>
            <ImageGrid variant={section.layout} items={section.images} />
          </React.Fragment>
        ) : null
      ))}

      {/* THE CRAFT section */}
      {story && (
        <section className="collection-story" data-reveal="scale">
          <div className="collection-story-inner">
            <p className="eyebrow">THE CRAFT</p>
            <h2>{story.title}</h2>
            <p>{story.text}</p>
          </div>
        </section>
      )}

      <section className="statement" data-reveal="scale">
        <p>
          Heritage Jewellery is built as a living archive: every page gives the collection space,
          movement, and the quiet pace of a luxury editorial.
        </p>
      </section>
    </main>
  );
}

/* ─── HOME PAGE ─── */
function HomePage({ onNavigate }) {
  return (
    <main className="page-shell" id="top">
  <section className="page-hero logo-hero">
    <div className="page-hero-copy" data-reveal="up">
      <img className="hero-logo-mark hero-bg" src={logoImage} alt="Heritage Jewellery logo" />
      <h2 className="para-style">ಪರಂಪರೆ ಮುಂದುವರೆಯಬೇಕು, ಮರೆಯಾಗಬಾರದು.</h2>
      <p>We believe heritage deserves to evolve.</p>
      {/* REMOVE THIS LINE: <br/> */}
      <p className="hero-quote">"Trust and Value"</p>
      <p className="hero-brand-description">
        A luxury editorial archive of antique gold, Kundan work, Temple forms, pearls, ruby-green contrasts, and hand-finished heirloom jewellery.
      </p>
    </div>
  </section>

      {/* House story */}
      <section className="story-home">
        <section className="story-split" data-reveal="left">
          <img src={frontpageImage} alt="Handcrafted heritage gold necklace with uncut gems and pearls" loading="lazy" />
          <div>
            <p className="eyebrow">THE HOUSE</p>
            <h2>Made Slowly, Worn For Generations</h2>
            <p>Every ornament is presented as a fragment of memory: antique gold, kundan, pearls, and ruby-green contrast composed with a boutique editorial rhythm.</p>
            <button className="btn-primary btn-magnetic" onClick={() => onNavigate('kundan')}>Explore Collections</button>
          </div>
        </section>

        {/* Four category tiles */}
        <section className="category-tiles" data-reveal="up">
          {categoryTiles.map((tile) => (
            <button className="category-tile product-card" onClick={() => onNavigate(tile.id)} key={tile.id}>
              <img src={images[tile.imageIndex]} alt={`${tile.label} collection`} loading="lazy" />
              <span>{tile.label}</span>
              <small>{tile.subtitle}</small>
            </button>
          ))}
        </section>
      </section>

      {/* NEW: 2. Heritage Jewellery Showcase section (Immediately after Categories, immediately before Book Consultation) */}
      <JewelleryShowcase onNavigate={onNavigate} />

      {/* 3. Existing Book Consultation section */}
      <BookConsultation />

      {/* Closing brand statement */}
      <section className="statement" data-reveal="scale">
        <p>
          Heritage Jewellery is built as a living archive: every page gives the collection space,
          movement, and the quiet pace of a luxury editorial.
        </p>
      </section>
    </main>
  );
}

/* ─── APP ─── */
function App() {
  const validIds = ['home', ...pages.map((p) => p.id)];

  const resolvePageId = (rawId) => {
    if (!rawId || rawId === '') return 'home';
    if (validIds.includes(rawId)) return rawId;
    if (legacyRedirects[rawId]) return legacyRedirects[rawId];
    return 'home';
  };

  const initialHash = window.location.hash.replace('#/', '');
  const [activePage, setActivePage] = useState(resolvePageId(initialHash));
  const [transitionKey, setTransitionKey] = useState(0);
  const [darkMode, setDarkMode] = useDarkMode();
  useScrollReveal(transitionKey);

  const navigate = (pageId) => {
    const resolved = resolvePageId(pageId);
    if (resolved === activePage) return;
    setActivePage(resolved);
    setTransitionKey((key) => key + 1);
    window.history.pushState(null, '', `#/${resolved}`);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  useEffect(() => {
    const onHashChange = () => {
      const rawId = window.location.hash.replace('#/', '');
      const resolved = resolvePageId(rawId);
      if (resolved !== activePage) {
        setActivePage(resolved);
        setTransitionKey((key) => key + 1);
      }
      if (legacyRedirects[rawId]) {
        window.history.replaceState(null, '', `#/${resolved}`);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [activePage]);

  return (
    <>
      <ProgressBar />
      <CustomCursor />
      <MovingLogoBackground />
      <Header activePage={activePage} onNavigate={navigate} darkMode={darkMode} onThemeToggle={() => setDarkMode((value) => !value)} />
      <div className="page-transition" key={transitionKey}>
        {activePage === 'home' ? (
          <HomePage onNavigate={navigate} />
        ) : (
          <CollectionPage page={pageMap[activePage]} />
        )}
      </div>
      <MobileBottomNav activePage={activePage} onNavigate={navigate} />
      <Footer onNavigate={navigate} />
    </>
  );
}

function ProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="scroll-progress" style={{ transform: `scaleX(${progress / 100})` }} />;
}

function CustomCursor() {
  useEffect(() => {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor || window.matchMedia('(pointer: coarse)').matches) return undefined;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let targetX = x;
    let targetY = y;
    let frame = 0;
    const move = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };
    const animate = () => {
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = requestAnimationFrame(animate);
    };
    const hover = (event) => {
      cursor.dataset.mode = event.target.closest('.product-card') ? 'view' : event.target.closest('a, button') ? 'link' : '';
    };
    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', hover);
    animate();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', hover);
    };
  }, []);
  return <div className="custom-cursor" aria-hidden="true" />;
}

function MobileBottomNav({ activePage, onNavigate }) {
  const items = [
    ['home', Home, 'Home'],
    ['kundan', Gem, 'Kundan'],
    ['temple', Sparkles, 'Temple'],
    ['polki', Search, 'Polki'],
  ];
  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      {items.map(([id, Icon, label]) => (
        <button className={activePage === id ? 'is-active' : ''} onClick={() => onNavigate(id)} key={id}>
          <Icon size={19} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

function Footer({ onNavigate }) {
  const columns = [
    { heading: 'COLLECTIONS', links: [
      { label: 'Kundan', id: 'kundan' },
      { label: 'Temple', id: 'temple' },
      { label: 'Polki', id: 'polki' },
      { label: 'Lightweight / Daily Wears', id: 'lightweight-daily wears' },
    ]},
    { heading: 'CUSTOMER CARE', links: [
      { label: 'Contact' },
      { label: 'Appointments' },
    ]},
    { heading: 'SOCIAL', links: [
      { label: 'Instagram', href: 'https://www.instagram.com/_heritagejewellery_?igsh=Ym5qd3ptYzZlcDli' },
      { label: 'Facebook', href: 'https://www.facebook.com/share/18hSQxoych/' },
    ]},
    { heading: 'CORPORATE', links: [
      { label: 'Privacy Policy' },
      { label: 'Terms of Use' },
    ]},
  ];

  return (
    <footer className="footer">
      <div className="footer-logo">HERITAGE JEWELARY</div>
      <div className="footer-grid">
        {columns.map((col) => (
          <div key={col.heading}>
            <h3>{col.heading}</h3>
            {col.links.map((link) => (
              link.href ? (
                <a href={link.href} key={link.label} target="_blank" rel="noopener noreferrer">{link.label}</a>
              ) : link.id ? (
                <a href={`#/${link.id}`} key={link.label} onClick={(e) => { e.preventDefault(); onNavigate(link.id); }}>{link.label}</a>
              ) : (
                <a href="#footer" key={link.label}>{link.label}</a>
              )
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
}

createRoot(document.getElementById('root')).render(<App />);
