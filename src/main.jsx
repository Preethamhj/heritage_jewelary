import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Home, Menu, Moon, Search, Sun, X, ChevronRight, Sparkles, Gem, MessageCircle, Mail, Instagram, Facebook } from 'lucide-react';
import './styles.css';

// Safeguard against Google Translate DOM modifications causing React reconcile errors
if (typeof Node === 'function' && Node.prototype) {
  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) {
      return child;
    }
    return originalRemoveChild.apply(this, arguments);
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode !== this) {
      return newNode;
    }
    return originalInsertBefore.apply(this, arguments);
  };
}

import logoImage from './assets/heritage-logo.jpg';
import frontpageImage from './assets/heritage-frontpage.jpg';
import showcasePendant from './assets/heritage-showcase-pendant.webp';
import showcasePendantBack from './assets/heritage-showcase-pendant-back.webp';
import kundan1 from './assets/kundan-1.jpg';
import kundan2 from './assets/kundan-2.jpg';
import kundan3 from './assets/kundan-3.jpg';
import kundan4 from './assets/kundan-4.jpg';
import kundanHero from './assets/kundan-hero.jpg';
import polkiHero from './assets/polki-hero.jpg';
import polki1 from './assets/polki-1.jpg';
import polki2 from './assets/polki-2.jpg';
import polki3 from './assets/polki-3.jpg';
import polki4 from './assets/polki-4.jpg';
import polki5 from './assets/polki-5.jpg';
import templeHero from './assets/temple-hero.jpg';
import temple1 from './assets/temple-1.jpg';
import temple2 from './assets/temple-2.jpg';
import temple3 from './assets/temple-3.jpg';
import temple4 from './assets/temple-4.jpg';
import temple5 from './assets/temple-5.jpg';
import lightweightHero from './assets/lightweight-hero.jpg';
import daily1 from './assets/daily-1.jpg';
import daily2 from './assets/daily-2.jpg';
import daily3 from './assets/daily-3.jpg';
import daily4 from './assets/daily-4.jpg';
import daily5 from './assets/daily-5.jpg';
import daily6 from './assets/daily-6.jpg';

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
    message: 'Hello Heritage Jewellery! I would like to know more about jewellery ideas and designs. Please share the available details.',
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
    hero: kundanHero,
    editorialShowcase: [
      {
        badge: 'PURE CRAFTSMANSHIP',
        title: 'Intricate Detailing',
        text: 'Each piece is a celebration of artistry, tradition and timeless elegance, featuring handset uncut gems and delicate meenakari detailing.',
        image: kundan2,
        imageAlt: 'Handcrafted royal Kundan choker with pearls, rubies and emerald on blue silk',
        objectPosition: 'center 52%',
      },
      {
        badge: 'A LEGACY OF ELEGANCE',
        title: 'Regal Designs',
        text: 'Designed to make every moment more memorable—sculpted jadau frameworks with vibrant ruby-green contrast and timeless grace.',
        image: kundan3,
        imageAlt: 'Imperial peacock Kundan pendant with rubies and emeralds nestled among roses',
        objectPosition: 'center 50%',
      },
      {
        badge: 'TIMELESS APPEAL',
        title: 'Forever Elegant',
        text: 'A perfect blend of tradition and sophistication. Hand-selected stones set within 24-karat gold foil to create heirlooms for generations.',
        image: kundan4,
        imageAlt: 'Crescent moon Kundan ornament on deep maroon velvet with vintage elements',
        objectPosition: 'center 50%',
      },
      {
        badge: 'ROYAL HEIRLOOM',
        title: 'Imperial Grandeur',
        text: 'Magnificent spherical ruby-studded beads and ornate kundan stud earrings, embodying centuries of imperial Indian aristocracy.',
        image: kundan1,
        imageAlt: 'Royal Kundan ruby bead necklace with matching round stud earrings on crimson velvet',
        objectPosition: 'center 50%',
      },
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
    hero: templeHero,
    editorialShowcase: [
      {
        badge: 'SACRED CRAFTSMANSHIP',
        title: 'Divine Union',
        text: 'An opulent repoussé medallion celebrating the celestial harmony of Radha and Krishna, framed by peacock flourishes and strung upon sculpted gold motifs.',
        image: temple1,
        imageAlt: 'Handcrafted antique gold Radha-Krishna medallion necklace on deep wine silk',
        objectPosition: 'center 78%',
      },
      {
        badge: 'ROYAL ARCHITECTURE',
        title: 'Regal Choker & Jhumkas',
        text: 'Chevron repoussé patterns crowned by a central ruby cabochon with rhythmic gold bead edging, harmonized with bell-shaped nakashi jhumkas.',
        image: temple2,
        imageAlt: 'Sculpted antique gold chevron choker with ruby cabochon and matching jhumkas on royal blue silk',
        objectPosition: 'center 56%',
      },
      {
        badge: 'SANCTUM EMBLEM',
        title: 'Ideaology of Iconography',
        text: 'Intricately carved deity figures radiating around an emerald core encircled by uncut polki diamonds and auspicious teardrop emerald beads.',
        image: temple3,
        imageAlt: 'Sacred antique gold deity medallion with central emerald, polki diamonds, and hanging beads on royal violet silk',
        objectPosition: 'center 54%',
      },
      {
        badge: 'DEVOTIONAL ART',
        title: 'Goddess of Harmony',
        text: 'A breathtaking sculptural relief of Goddess Saraswati playing the divine veena, enveloped within an ornate floral prabhavali and dancing peacock aura.',
        image: temple4,
        imageAlt: 'Intricately carved Goddess Saraswati nakashi gold pendant with veena on ivory silk',
        objectPosition: 'center 55%',
      },
      {
        badge: 'HEIRLOOM TRADITION',
        title: 'Lord of Melody',
        text: 'Lord Krishna playing the celestial flute beneath a sacred serpent canopy, surrounded by a dramatic crescent of radiant spherical gold beads.',
        image: temple5,
        imageAlt: 'Antique gold Krishna flute pendant encircled by spherical gold beads on deep charcoal silk',
        objectPosition: 'center 53%',
      },
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
    label: 'POLKI & GEMS STONE',
    title: 'POLKI & GEMS STONE JEWELLERY',
    eyebrow: 'NATURAL STONE CHARACTER',
    intro: 'The raw beauty of uncut diamonds set in traditional frameworks — Polki jewellery celebrates the natural character of each stone, creating pieces of ceremonial elegance and timeless distinction.',
    hero: polkiHero,
    heroStyle: { objectFit: 'contain', objectPosition: 'center', background: '#0d0c0c' },
    heroMediaStyle: { background: '#0d0c0c' },
    editorialShowcase: [
      {
        badge: 'IMPERIAL HEIRLOOM',
        title: 'The Rajkumari Emerald Choker',
        text: 'Luminous cabochon emeralds encased in hand-engraved antique gold plaques with delicate seed pearl borders, harmoniously paired with polki-topped jhumka earrings.',
        image: polki1,
        imageAlt: 'Antique gold and cabochon emerald choker with seed pearls and matching earrings on fuchsia pink velvet',
        objectPosition: 'center 50%',
      },
      {
        badge: 'ROYAL COURTYARD',
        title: 'The Maharani Polki Guttapusalu Haram',
        text: 'A grand ceremonial necklace with uncut diamonds, ruby florets, and a sculpted peacock medallion fringed with cascading sea pearls, harmonized with matching peacock earrings.',
        image: polki2,
        imageAlt: 'Royal Polki Guttapusalu Haram necklace with peacock medallion and matching earrings on black silk',
        objectPosition: 'center 50%',
      },
      {
        badge: 'CELESTIAL HARMONY',
        title: 'Navratna Imperial Choker',
        text: 'Nine sacred celestial gemstones set alongside uncut diamonds within engraved antique gold frames, accompanied by royal drop earrings.',
        image: polki3,
        imageAlt: 'Navratna gemstone and uncut diamond Polki choker with matching drop earrings on violet velvet',
        objectPosition: 'center 55%',
      },
      {
        badge: 'IMPERIAL MAJESTY',
        title: 'Emerald Peacock Necklace',
        text: 'Square-cut vibrant emeralds and lustrous pearl edging lead into an opulent dual-peacock polki pendant with an exuberant waterfall of seed pearls.',
        image: polki4,
        imageAlt: 'Square emerald step-cut and pearl choker with dual peacock Polki pendant on golden velvet',
        objectPosition: 'center 52%',
      },
      {
        badge: 'ANTIQUE SPLENDOUR',
        title: 'Jadau Cabochon Choker',
        text: 'Enormous cabochon rubies and emeralds nestled among polki diamonds, framed with hand-engraved meenakari scrollwork and deep ruby droplet fringes.',
        image: polki5,
        imageAlt: 'Antique gold jadau Polki choker with large cabochon rubies and emeralds on royal blue silk',
        objectPosition: 'center 49%',
      },
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
    hero: lightweightHero,
    heroStyle: { objectFit: 'contain', objectPosition: 'center', background: '#010826' },
    heroMediaStyle: { background: '#010826' },
    editorialShowcase: [
      {
        badge: 'DEVOTIONAL GRACE',
        title: 'Lakshmi Kasu Medallions',
        text: 'Sacred Kasu pendants embossed with Goddess Lakshmi seated upon a lotus, framed by granulated beadwork and crowned with a cabochon ruby eye, set on vibrant fuchsia velvet.',
        image: daily1,
        imageAlt: 'Five antique gold Lakshmi coin pendants with ruby accents on fuchsia velvet',
        objectPosition: 'center 48%',
      },
      {
        badge: 'TIMELESS TRADITION',
        title: 'Classic Mangalsutra Chain',
        text: 'A graceful daily-wear gold chain strung with auspicious black beads and finished with twin micro-textured gold globes, reflecting understated elegance and enduring marital grace.',
        image: daily2,
        imageAlt: 'Gold black bead Mangalsutra chain with twin textured gold pendants on deep red velvet',
        objectPosition: 'center 56%',
      },
      {
        badge: 'ARTISANAL CHARM',
        title: 'Mayura Diamond Earstuds',
        text: 'Sculptural peacock tops carved in yellow gold, adorned with brilliant-cut diamonds across the crest and ruby eye accents, presented over textured ivory fabric.',
        image: daily3,
        imageAlt: 'Pair of gold peacock earrings with diamonds and ruby accents on textured white fabric',
        objectPosition: 'center 50%',
      },
      {
        badge: 'HERITAGE ESSENTIALS',
        title: 'Gundlu Gold Mangalya',
        text: 'Traditional South Indian convex gold beads with carved crowns and ruby finials, designed for custom neckpieces, mangalsutra styling, or heirloom talisman clusters.',
        image: daily4,
        imageAlt: 'Collection of traditional gold gundlu beads with ruby finials arranged on royal purple velvet',
        objectPosition: 'center 50%',
      },
      {
        badge: 'DAILY REFINEMENT',
        title: 'Twisted Rope Gold Chain',
        text: 'Hand-woven coiled rope chain in radiant 22kt yellow gold with a classic handcrafted S-hook clasp, offering lightweight durability and quiet luxury for everyday wear.',
        image: daily5,
        imageAlt: 'Hand-woven twisted rope gold chain with traditional S-clasp on emerald green silk',
        objectPosition: 'center 53%',
      },
      {
        badge: 'SOLAR SPLENDOUR',
        title: 'Suryakanti Diamond Studs',
        text: 'Radiant solar starburst motifs crafted in textured gold rays with delicate satellite beads, centering brilliant solitaire stones that catch the light with quiet daily brilliance.',
        image: daily6,
        imageAlt: 'Pair of gold solar starburst diamond stud earrings on black textured silk',
        objectPosition: 'center 50%',
      },
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
  { id: 'kundan', label: 'Kundan', image: kundanHero, subtitle: 'Explore Collection' },
  { id: 'temple', label: 'Temple', image: templeHero, subtitle: 'Explore Collection' },
  { id: 'polki', label: 'Polki', image: polkiHero, style: { objectFit: 'contain', objectPosition: 'center', background: '#0d0c0c' }, subtitle: 'Explore Collection' },
  { id: 'lightweight-daily wears', label: 'Lightweight / Daily Wears', image: lightweightHero, style: { objectFit: 'contain', objectPosition: 'center', background: '#010826' }, subtitle: 'Explore Collection' },
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
    return false; // Default to light theme
  };
  const [darkMode, setDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
    localStorage.setItem('heritage-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return [darkMode, setDarkMode];
}

/* ─── GOOGLE TRANSLATOR (KANNADA / ENGLISH) ─── */
function useLanguageTranslation() {
  const getInitialLang = () => {
    if (typeof document !== 'undefined') {
      const match = document.cookie.match(/googtrans=\/en\/(en|kn)/);
      if (match && match[1]) return match[1];
      try {
        const saved = localStorage.getItem('preferred_lang');
        if (saved === 'kn' || saved === 'en') return saved;
      } catch (e) {}
    }
    return 'en';
  };

  const [currentLang, setCurrentLang] = useState(getInitialLang);

  const switchLanguage = (lang) => {
    if (lang === currentLang) return;
    setCurrentLang(lang);
    try {
      localStorage.setItem('preferred_lang', lang);
    } catch (e) {}

    // Set standard Google Translate cookie
    const cookieVal = `/en/${lang}`;
    const hostname = window.location.hostname;
    document.cookie = `googtrans=${cookieVal}; path=/;`;
    document.cookie = `googtrans=${cookieVal}; path=/; domain=${hostname};`;
    if (hostname.includes('.')) {
      const parts = hostname.split('.');
      if (parts.length >= 2) {
        const rootDomain = parts.slice(-2).join('.');
        document.cookie = `googtrans=${cookieVal}; path=/; domain=.${rootDomain};`;
      }
    }

    if (lang === 'en') {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname};`;
    }

    // Trigger translation via Google Translate combo box
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      const hasEn = Array.from(select.options).some((o) => o.value === 'en');
      select.value = lang === 'kn' ? 'kn' : (hasEn ? 'en' : '');
      select.dispatchEvent(new Event('change'));

      if (lang === 'en') {
        setTimeout(() => {
          window.location.reload();
        }, 120);
      }
    } else {
      window.location.reload();
    }
  };

  return [currentLang, switchLanguage];
}

function Header({ activePage, onNavigate, darkMode, onThemeToggle, currentLang, onLanguageChange, onOpenSearch }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
        {pages.map((item) => (
          <div className="nav-item" key={item.id}>
            <button
              className={activePage === item.id ? 'is-active' : ''}
              onClick={(event) => navigate(item.id, event)}
            >
              {item.label}
            </button>
          </div>
        ))}
      </nav>
      <div className="header-actions">
        {/* Language translation buttons (English & Kannada via Google Translator) */}
        <div className="lang-switcher" role="group" aria-label="Language translation">
          <button
            type="button"
            className={`lang-btn ${currentLang === 'en' ? 'is-active' : ''}`}
            onClick={() => onLanguageChange('en')}
            aria-label="Translate to English"
            title="English"
          >
            English
          </button>
          <span className="lang-sep" aria-hidden="true">|</span>
          <button
            type="button"
            className={`lang-btn ${currentLang === 'kn' ? 'is-active' : ''}`}
            onClick={() => onLanguageChange('kn')}
            aria-label="Translate to Kannada"
            title="ಕನ್ನಡ (Kannada)"
          >
            ಕನ್ನಡ
          </button>
        </div>

        <button className="icon-button" onClick={onThemeToggle} aria-label="Toggle evening mode">
          {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        </button>
        <button
          className="icon-button search-button"
          onClick={onOpenSearch}
          aria-label="Search website content"
          title="Search"
        >
          <Search size={22} />
        </button>
      </div>
      <div className={`mobile-drawer ${open ? 'is-open' : ''}`}>
        <button className="icon-button drawer-close" onClick={() => setOpen(false)} aria-label="Close menu">
          <X size={20} />
        </button>
        <div className="drawer-brand">HERITAGE JEWELARY</div>

        <button
          className="drawer-search-btn"
          onClick={() => {
            setOpen(false);
            onOpenSearch();
          }}
          aria-label="Search Collection"
        >
          <Search size={18} />
          <span>Search jewellery & stories...</span>
        </button>

        <button className="drawer-link drawer-home-link" onClick={(event) => navigate('home', event)}>Home</button>
        {pages.map((item) => (
          <button
            key={item.id}
            className={`drawer-link ${activePage === item.id ? 'drawer-link-active' : ''}`}
            onClick={(event) => navigate(item.id, event)}
          >
            {item.label}
          </button>
        ))}

        <div className="drawer-lang-switcher">
          <span className="drawer-lang-label">LANGUAGE:</span>
          <div className="lang-switcher" role="group" aria-label="Language selection">
            <button
              type="button"
              className={`lang-btn ${currentLang === 'en' ? 'is-active' : ''}`}
              onClick={() => { onLanguageChange('en'); setOpen(false); }}
              title="English"
            >
              English
            </button>
            <span className="lang-sep" aria-hidden="true">|</span>
            <button
              type="button"
              className={`lang-btn ${currentLang === 'kn' ? 'is-active' : ''}`}
              onClick={() => { onLanguageChange('kn'); setOpen(false); }}
              title="ಕನ್ನಡ (Kannada)"
            >
              ಕನ್ನಡ
            </button>
          </div>
        </div>
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
          // Determine the sticky header offset so rotation coordinates perfectly with the docked stage
          const headerOffset = window.innerWidth > 991 ? 122 : (window.innerWidth > 767 ? 64 : 56);
          // Track distance is the total height minus one viewport
          const trackDistance = rect.height - windowHeight;

          if (trackDistance <= 0) {
            setScrollProgress(0);
            ticking = false;
            return;
          }

          // Progress begins when container docks below the category nav bar, fully visible
          const scrolled = headerOffset - rect.top;
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
        <div className="page-hero-media" style={page.heroMediaStyle}>
          <img src={page.hero} alt={page.title} style={page.heroStyle} />
        </div>
        <div className="page-hero-copy" data-reveal="up">
          <p className="category">{page.eyebrow}</p>
          <StaggeredHeadline text={page.title} />
          <div className="hero-underline" />
          <p>{page.intro}</p>
        </div>
      </section>

      {/* Editorial Curated Showcase Grid (Lies between the main title and The Craft / Art of the jewellery) */}
      {page.editorialShowcase && page.editorialShowcase.length > 0 && (
        <section className="category-editorial-showcase" aria-label={`${page.label} Curated Collection`}>
          <div className="editorial-showcase-container">
            {page.editorialShowcase.map((item, idx) => {
              const anchorId = `item-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
              return (
                <div
                  id={anchorId}
                  key={item.title}
                  className={`editorial-showcase-row ${idx % 2 === 1 ? 'is-reversed' : ''}`}
                  data-reveal={idx % 2 === 1 ? 'right' : 'left'}
                >
                  <div className="editorial-showcase-media">
                    <div className="editorial-arch-frame">
                      <img
                        src={item.image}
                        alt={item.imageAlt || item.title}
                        style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="editorial-showcase-content">
                    <p className="editorial-badge">
                      <span className="editorial-star" aria-hidden="true">✦</span> {item.badge}
                    </p>
                    <h3 className="editorial-title">{item.title}</h3>
                    <p className="editorial-text">{item.text}</p>
                    <div className="editorial-flourish" aria-hidden="true">
                      <span className="flourish-line" />
                      <span className="flourish-diamond">✦</span>
                      <span className="flourish-line" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

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
        <section id="craft" className="collection-story" data-reveal="scale">
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
      <h2 className="hero-kannada-headline">ಪರಂಪರೆ ಮುಂದುವರೆಯಬೇಕು, ಮರೆಯಾಗಬಾರದು.</h2>
      <p className="hero-belief">We believe heritage deserves to be preserved.</p>
      <h3 className="hero-trust-value">"Trust and Value"</h3>
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
            <h2>Made Designs, Worn For Generations</h2>
            <p>Every ornament is presented as a fragment of memory: antique gold, kundan, pearls, and ruby-green contrast composed with a boutique editorial rhythm.</p>
            <button className="btn-primary btn-magnetic" onClick={() => onNavigate('kundan')}>Explore Collections</button>
          </div>
        </section>

        {/* Four category tiles */}
        <section className="category-tiles" id="categories" data-reveal="up">
          {categoryTiles.map((tile) => (
            <button
              id={`category-tile-${tile.id}`}
              className="category-tile product-card"
              onClick={() => onNavigate(tile.id)}
              key={tile.id}
            >
              <img
                src={tile.image || images[tile.imageIndex]}
                alt={`${tile.label} collection`}
                style={tile.style}
                loading="lazy"
              />
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

/* ─── LUXURY SEARCH MODAL ─── */
function SearchModal({ isOpen, onClose, onNavigate }) {
  const [query, setQuery] = useState('');
  const inputRef = React.useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 80);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const searchIndex = [
    // Categories
    ...pages.map((p) => ({
      id: `cat-${p.id}`,
      type: 'Collection',
      category: p.label,
      title: p.title,
      text: p.intro,
      image: p.hero,
      pageId: p.id,
      anchor: null,
    })),
    // Editorial Showcase Items across all categories
    ...pages.flatMap((p) =>
      (p.editorialShowcase || []).map((item) => ({
        id: `showcase-${item.title}`,
        type: 'Jewellery Piece',
        category: p.label,
        badge: item.badge,
        title: item.title,
        text: item.text,
        image: item.image,
        pageId: p.id,
        anchor: `item-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      }))
    ),
    // Collection Craft stories
    ...pages.map((p) => {
      const s = collectionStories[p.id];
      return s
        ? {
            id: `story-${p.id}`,
            type: 'Heritage Craft',
            category: p.label,
            title: s.title,
            text: s.text,
            image: p.hero,
            pageId: p.id,
            anchor: 'craft',
          }
        : null;
    }).filter(Boolean),
    // Bespoke Consultation
    {
      id: 'service-consultation',
      type: 'Appointments',
      category: 'CONSULTATION',
      title: 'Book a Private Jewellery Consultation',
      text: 'Schedule an in-person boutique visit or virtual video consultation with master jewellers.',
      image: logoImage,
      pageId: 'home',
      anchor: 'consultation',
    },
    // 360 Showcase
    {
      id: 'showcase-360',
      type: 'Heirloom Archive',
      category: '360° SHOWCASE',
      title: 'Heritage Jewellery 360° Pendant Showcase',
      text: 'Interactive front and reverse rotation of archival antique gold temple pendant.',
      image: showcasePendant,
      pageId: 'home',
      anchor: 'showcase',
    },
  ];

  const q = query.trim().toLowerCase();
  const results = q
    ? searchIndex.filter((item) => {
        return (
          item.title.toLowerCase().includes(q) ||
          item.text.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          (item.badge && item.badge.toLowerCase().includes(q)) ||
          item.type.toLowerCase().includes(q)
        );
      })
    : [];

  const handleSelect = (item) => {
    onClose();
    onNavigate(item.pageId);
    if (item.anchor) {
      setTimeout(() => {
        const el = document.getElementById(item.anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);
    }
  };

  const quickPills = [
    'Kundan',
    'Temple',
    'Polki',
    'Daily Wear',
    'Emerald',
    'Diamond',
    'Mangalsutra',
    'Choker',
    'Earrings',
    'Gold Chain',
  ];

  return (
    <div className="search-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Search website content">
      <div className="search-modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="search-header-bar">
          <div className="search-input-box">
            <Search className="search-input-icon" size={20} />
            <input
              ref={inputRef}
              type="search"
              className="search-input-field"
              placeholder="Search jewellery, stones, categories, craftsmanship..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search"
            />
            {query && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setQuery('')}
                aria-label="Clear search input"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <button className="search-close-button" onClick={onClose} aria-label="Close search">
            <X size={22} />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="search-quick-tags">
          <span className="search-tag-label">Popular Searches:</span>
          <div className="search-tags-row">
            {quickPills.map((pill) => (
              <button
                key={pill}
                type="button"
                className={`search-pill-btn ${query.toLowerCase() === pill.toLowerCase() ? 'is-active' : ''}`}
                onClick={() => setQuery(pill)}
              >
                {pill}
              </button>
            ))}
          </div>
        </div>

        {/* Results Container */}
        <div className="search-results-area">
          {q && results.length > 0 && (
            <div className="search-results-list">
              <p className="search-results-count">
                Found {results.length} {results.length === 1 ? 'match' : 'matches'} for "{query}":
              </p>
              {results.map((item) => (
                <button
                  key={item.id}
                  className="search-result-card"
                  onClick={() => handleSelect(item)}
                >
                  {item.image && (
                    <div className="search-result-thumb">
                      <img src={item.image} alt={item.title} />
                    </div>
                  )}
                  <div className="search-result-info">
                    <div className="search-result-meta">
                      <span className="search-result-category">{item.category}</span>
                      {item.badge && <span className="search-result-badge">✦ {item.badge}</span>}
                    </div>
                    <h4 className="search-result-title">{item.title}</h4>
                    <p className="search-result-snippet">{item.text}</p>
                  </div>
                  <ChevronRight className="search-result-arrow" size={20} />
                </button>
              ))}
            </div>
          )}

          {q && results.length === 0 && (
            <div className="search-empty-state">
              <p className="search-empty-title">No pieces found matching "{query}"</p>
              <p className="search-empty-hint">Try searching with broader terms such as Kundan, Temple, Polki, Gold, Emerald, or Pearls.</p>
            </div>
          )}

          {!q && (
            <div className="search-initial-state">
              <p className="search-initial-hint">Type to search collections, individual pieces, gemstones, and artisanal heritage crafts.</p>
            </div>
          )}
        </div>
      </div>
    </div>
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
  const [currentLang, switchLanguage] = useLanguageTranslation();
  const [searchOpen, setSearchOpen] = useState(false);
  const lastCategoryRef = React.useRef(null);
  const shouldScrollToCategoryRef = React.useRef(false);

  useScrollReveal(transitionKey);

  const navigate = (pageId, options = {}) => {
    const resolved = resolvePageId(pageId);
    if (resolved !== 'home') {
      lastCategoryRef.current = resolved;
    }
    if (resolved === 'home') {
      if (options && options.returnToCategory) {
        shouldScrollToCategoryRef.current = options.returnToCategory;
      } else if (lastCategoryRef.current) {
        shouldScrollToCategoryRef.current = lastCategoryRef.current;
      }
    } else {
      shouldScrollToCategoryRef.current = false;
    }

    if (resolved === activePage) {
      if (resolved === 'home' && shouldScrollToCategoryRef.current) {
        const catId = shouldScrollToCategoryRef.current;
        const target = document.getElementById(`category-tile-${catId}`) || document.getElementById('categories');
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    setActivePage(resolved);
    setTransitionKey((key) => key + 1);
    window.history.pushState(null, '', `#/${resolved}`);
  };

  useEffect(() => {
    if (activePage === 'home' && shouldScrollToCategoryRef.current) {
      const catId = shouldScrollToCategoryRef.current;
      shouldScrollToCategoryRef.current = false;
      setTimeout(() => {
        const target = document.getElementById(`category-tile-${catId}`) || document.getElementById('categories');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activePage]);

  useEffect(() => {
    const onHashChange = () => {
      const rawId = window.location.hash.replace('#/', '');
      const resolved = resolvePageId(rawId);
      if (resolved === 'home' && lastCategoryRef.current) {
        shouldScrollToCategoryRef.current = lastCategoryRef.current;
      }
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
      <Header
        activePage={activePage}
        onNavigate={navigate}
        darkMode={darkMode}
        onThemeToggle={() => setDarkMode((value) => !value)}
        currentLang={currentLang}
        onLanguageChange={switchLanguage}
        onOpenSearch={() => setSearchOpen(true)}
      />
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={navigate}
      />
      <div className="page-transition" key={transitionKey}>
        {activePage === 'home' ? (
          <HomePage onNavigate={navigate} />
        ) : (
          <CollectionPage page={pageMap[activePage]} onNavigate={navigate} />
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
  const [modalContent, setModalContent] = useState(null);

  const handleNav = (target, e) => {
    if (e) e.preventDefault();
    if (target.startsWith('#')) {
      const id = target.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        onNavigate('home');
        setTimeout(() => {
          const targetEl = document.getElementById(id);
          if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    } else {
      onNavigate(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const columns = [
    {
      heading: 'COLLECTIONS',
      links: [
        { label: 'Kundan', id: 'kundan' },
        { label: 'Temple', id: 'temple' },
        { label: 'Polki', id: 'polki' },
        { label: 'Lightweight / Daily Wears', id: 'lightweight-daily wears' },
      ],
    },
    {
      heading: 'CUSTOMER CARE',
      links: [
        { label: 'Contact', action: () => handleNav('#consultation') },
        { label: 'Appointments', action: () => handleNav('#consultation') },
      ],
    },
    {
      heading: 'SOCIAL',
      links: [
        { label: 'Instagram', href: 'https://www.instagram.com/_heritagejewellery_?igsh=Ym5qd3ptYzZlcDli' },
        { label: 'Facebook', href: 'https://www.facebook.com/share/18hSQxoych/' },
      ],
    },
    {
      heading: 'CORPORATE',
      links: [
        {
          label: 'Privacy Policy',
          action: () => setModalContent({
            title: 'Privacy Policy',
            body: 'At Heritage Jewellery, your privacy and trust are paramount. Any personal information shared with us—including your name, phone number, email address, bespoke consultation preferences, and purchase history—is treated with the utmost confidentiality. We do not sell, rent, or trade your data to third parties. Information collected during appointments or digital consultations is used solely to provide bespoke craftsmanship, curated service, and seamless communication. For any inquiries regarding your data, contact us at heritage.jewellary@gmail.com.',
          }),
        },
        {
          label: 'Terms of Use',
          action: () => setModalContent({
            title: 'Terms of Use',
            body: 'Welcome to Heritage Jewellery. All designs, photographs, jewellery models, imagery, brand marks, and editorial narratives presented across this website are the intellectual property of Heritage Jewellery and protected by copyright laws. Bespoke consultations and customized jewellery orders are handcrafted to order following confirmation of design specifications and precious metal hallmarks. By browsing or booking an appointment, you agree to respect our craftsmanship standards and terms of service. For custom commissions and appraisal policies, reach out to our concierge team.',
          }),
        },
      ],
    },
  ];

  return (
    <>
      <footer className="footer">
        <div className="footer-logo">HERITAGE JEWELARY</div>
        <div className="footer-grid">
          {columns.map((col) => (
            <div key={col.heading} className="footer-col">
              <h3>{col.heading}</h3>
              {col.links.map((link) => (
                link.href ? (
                  <a
                    href={link.href}
                    key={link.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                  >
                    {link.label}
                  </a>
                ) : link.id ? (
                  <a
                    href={`#/${link.id}`}
                    key={link.label}
                    onClick={(e) => handleNav(link.id, e)}
                    className="footer-link"
                  >
                    {link.label}
                  </a>
                ) : (
                  <button
                    type="button"
                    key={link.label}
                    onClick={link.action}
                    className="footer-link footer-btn-link"
                  >
                    {link.label}
                  </button>
                )
              ))}
            </div>
          ))}
        </div>
      </footer>

      {/* Corporate Policy Modal */}
      {modalContent && (
        <div className="policy-modal-overlay" onClick={() => setModalContent(null)}>
          <div className="policy-modal" onClick={(e) => e.stopPropagation()}>
            <div className="policy-modal-header">
              <h3>{modalContent.title}</h3>
              <button
                type="button"
                className="policy-modal-close"
                onClick={() => setModalContent(null)}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
            <div className="policy-modal-body">
              <p>{modalContent.body}</p>
            </div>
            <div className="policy-modal-footer">
              <button
                type="button"
                className="btn-primary btn-magnetic"
                onClick={() => setModalContent(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
