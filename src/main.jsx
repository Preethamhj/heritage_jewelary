import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Heart, Home, Menu, Moon, Search, ShoppingBag, Sun, X, ChevronRight, Sparkles, Gem } from 'lucide-react';
import './styles.css';
import logoImage from './assets/heritage-logo.jpg';

const heritageModules = import.meta.glob('./assets/heritage/*.jpeg', {
  eager: true,
  query: '?url',
  import: 'default',
});

const images = Object.entries(heritageModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, src]) => src);

const pick = (start, count) => images.slice(start, start + count);

/* ─── NEW FIVE-CATEGORY DATA ─── */

const categoryFilters = ['All', 'Kundan', 'Nakashi / Temple', 'Polki', 'Daily Wear', 'Custom'];
const pressLogos = ['VOGUE', 'ELLE', 'BAZAAR', 'TATLER', 'BRIDES'];

const giftProducts = pick(6, 8).map((image, index) => ({
  image,
  name: ['Temple Choker', 'Ruby Kundan Set', 'Pearl Jhumka', 'Emerald Pendant'][index % 4],
  price: ['$420', '$680', '$290', '$510'][index % 4],
}));

const pages = [
  {
    id: 'kundan',
    label: 'KUNDAN JEWELLERY',
    title: 'KUNDAN JEWELLERY',
    eyebrow: 'TRADITIONAL CRAFTSMANSHIP',
    intro: 'A celebration of regal Indian artistry — colourful gemstones set in intricate gold frameworks, each piece reflecting the luminous legacy of Kundan work passed down through generations of master craftsmen.',
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
        images: pick(0, 3),
      },
      {
        title: 'KUNDAN BRIDAL ADORNMENTS',
        text: 'Ruby-green contrasts, pearl borders, and meenakari reverses create ornaments with weight, presence, and ceremonial grandeur.',
        layout: 'dense',
        images: pick(3, 9),
      },
    ],
  },
  {
    id: 'temple',
    label: 'NAKASHI / TEMPLE',
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
        images: pick(9, 3),
      },
      {
        title: 'NAKASHI GOLD SURFACES',
        text: 'Nakashi-inspired surfaces gather depth, shadow, and ceremonial rhythm in antique-finished gold that carries the warmth of Southern heritage.',
        layout: 'dense',
        images: pick(50, 9),
      },
    ],
  },
  {
    id: 'polki',
    label: 'POLKI JEWELLERY',
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
        images: pick(6, 9),
      },
      {
        title: 'POLKI BRIDAL ELEGANCE',
        text: 'Pearl clusters and uncut diamond settings create motion around the neckline — each bridal set composed for presence, weight, and heirloom distinction.',
        layout: 'asymmetric',
        images: pick(40, 2),
      },
    ],
  },
  {
    id: 'daily',
    label: 'DAILY WEAR',
    title: 'DAILY WEAR JEWELLERY',
    eyebrow: 'EVERYDAY ELEGANCE',
    intro: 'Minimal, versatile, and effortlessly refined — jewellery designed for the rhythms of daily life, bringing quiet sophistication to every moment without compromising on comfort or style.',
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
    ],
    sections: [
      {
        title: 'BANGLES AND SMALL TREASURES',
        text: 'Floral bezels, emerald centres, and engraved gold complete the collection with everyday ceremony — each piece scaled for comfort and daily grace.',
        layout: 'dense',
        images: pick(20, 12),
      },
      {
        title: 'PENDANT AND EARRING DETAILS',
        text: 'Small pieces let the handwork come close, revealing the rhythm of stone setting and gold carving in intimate, wearable scale.',
        layout: 'triptych',
        images: pick(30, 3),
      },
    ],
  },
  {
    id: 'custom',
    label: 'CUSTOM JEWELLERY',
    title: 'LIGHTWEIGHT CUSTOM JEWELLERY',
    eyebrow: 'PERSONALISED ELEGANCE',
    intro: 'Your vision, our craft — lightweight bespoke pieces designed around your personal story, combining modern elegance with heritage techniques to create jewellery that is uniquely yours.',
    hero: images[15],
    subcategories: [
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
        title: 'BESPOKE CREATIONS',
        text: 'The collection balances personalised design with heritage goldsmithing — each piece crafted to the individual while honouring traditional handwork.',
        layout: 'dense',
        images: pick(15, 12),
      },
      {
        title: 'LIGHTWEIGHT CRAFT',
        text: 'Modern lightweight construction meets artisanal detail — custom pieces that carry heritage character without weight.',
        layout: 'two',
        images: pick(59, 2),
      },
    ],
  },
];

const pageMap = Object.fromEntries(pages.map((page) => [page.id, page]));

/* ─── HOME PAGE DEFINITION ─── */
const homePage = {
  id: 'home',
  label: 'HOME',
  title: 'HERITAGE JEWELLERY',
  eyebrow: 'THE HOUSE COLLECTION',
  intro: 'A luxury editorial archive of antique gold, kundan work, temple forms, pearls, ruby-green contrasts, and hand-finished heirloom jewellery.',
  useLogoHero: true,
  sections: [
    { title: 'THE DECONSTRUCTED MAHARANI NECKLACE', text: 'Royal necklaces are reimagined through jadau forms, river pearls, kundan settings, and dramatic pendants.', layout: 'triptych hero-grid', images: pick(39, 3) },
    { title: 'CRAFTED AS MEMORY', text: 'Each piece is treated as miniature architecture: arches, birds, flowers, goddess motifs, and sacred geometry in antique gold.', layout: 'asymmetric', images: pick(33, 2) },
  ],
};

/* ─── CATEGORY TILES DATA ─── */
const categoryTiles = [
  { id: 'kundan', label: 'Kundan Jewellery', imageIndex: 0, subtitle: 'Explore Collection' },
  { id: 'temple', label: 'Nakashi / Temple', imageIndex: 9, subtitle: 'Explore Collection' },
  { id: 'polki', label: 'Polki Jewellery', imageIndex: 6, subtitle: 'Explore Collection' },
  { id: 'daily', label: 'Daily Wear', imageIndex: 20, subtitle: 'Explore Collection' },
  { id: 'custom', label: 'Custom Jewellery', imageIndex: 15, subtitle: 'Explore Collection' },
];

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
function SubcategoryNav({ subcategories, pageId, label }) {
  return (
    <section className="subcategory-nav" data-reveal="up">
      <div className="subcategory-inner">
        <p className="subcategory-heading">Browse {label}</p>
        <div className="subcategory-pills">
          {subcategories.map((sub) => (
            <button className="subcategory-pill" key={sub}>{sub}</button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── COLLECTION STORYTELLING SECTION ─── */
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
  daily: {
    title: 'Elegance for Every Day',
    text: 'Daily wear jewellery bridges heritage craftsmanship with contemporary lifestyle. Lightweight gold chains, minimal studs, and comfortable bangles bring quiet sophistication to everyday moments — designed to move with you, complement any wardrobe, and become part of your personal signature.',
  },
  custom: {
    title: 'Your Story, Our Craft',
    text: 'Lightweight custom jewellery invites you to co-create with our artisans. From personalised necklaces to bespoke mangalsutras, each piece is designed around your vision — combining modern lightweight construction with heritage handwork to create jewellery that is intimately yours.',
  },
};

function CollectionPage({ page, onNavigate }) {
  const story = collectionStories[page.id];

  return (
    <main className="page-shell" id="top" key={page.id}>
      <section className="page-hero">
        <div className="page-hero-media">
          <img src={page.hero} alt="" />
        </div>
        <div className="page-hero-copy" data-reveal="up">
          <p className="category">{page.eyebrow}</p>
          <StaggeredHeadline text={page.title} />
          <div className="hero-underline" />
          <p>{page.intro}</p>
        </div>
      </section>

      <SubcategoryNav subcategories={page.subcategories} pageId={page.id} label={page.label} />

      {page.sections.map((section, index) => (
        <React.Fragment key={section.title}>
          <section className={`text-block ${index % 2 ? 'center' : 'left'}`} data-reveal={index % 2 ? 'right' : 'left'}>
            <p className="eyebrow">{page.label}</p>
            <h2>{section.title}</h2>
            <p>{section.text}</p>
          </section>
          <ImageGrid variant={section.layout} items={section.images} />
        </React.Fragment>
      ))}

      {/* Collection storytelling */}
      {story && (
        <section className="collection-story" data-reveal="scale">
          <div className="collection-story-inner">
            <p className="eyebrow">THE CRAFT</p>
            <h2>{story.title}</h2>
            <p>{story.text}</p>
          </div>
        </section>
      )}

      <GiftFinder />

      <section className="statement" data-reveal="scale">
        <p>
          Heritage Jewellery is built as a living archive: every page gives the collection space,
          movement, and the quiet pace of a luxury editorial.
        </p>
      </section>
    </main>
  );
}

function HomePage({ onNavigate }) {
  const page = homePage;

  return (
    <main className="page-shell" id="top">
      <section className="page-hero logo-hero">
        <div className="page-hero-copy" data-reveal="up">
          <img className="hero-logo-mark hero-bg" src={logoImage} alt="Heritage Jewellery logo" />
          <p className="category">{page.eyebrow}</p>
          <StaggeredHeadline text={page.title} />
          <div className="hero-underline" />
          <p>{page.intro}</p>
        </div>
      </section>

      <HomeStory onNavigate={onNavigate} />

      {page.sections.map((section, index) => (
        <React.Fragment key={section.title}>
          <section className={`text-block ${index % 2 ? 'center' : 'left'}`} data-reveal={index % 2 ? 'right' : 'left'}>
            <p className="eyebrow">HERITAGE JEWELLERY</p>
            <h2>{section.title}</h2>
            <p>{section.text}</p>
          </section>
          <ImageGrid variant={section.layout} items={section.images} />
        </React.Fragment>
      ))}

      <GiftFinder />

      <section className="statement" data-reveal="scale">
        <p>
          Heritage Jewellery is built as a living archive: every page gives the collection space,
          movement, and the quiet pace of a luxury editorial.
        </p>
      </section>
    </main>
  );
}

function HomeStory({ onNavigate }) {
  const [filter, setFilter] = useState('All');
  const featured = useMemo(() => pick(12, 12).map((image, index) => ({
    image,
    category: categoryFilters[(index % (categoryFilters.length - 1)) + 1],
    name: ['Nakashi Gold Choker', 'Polki Temple Pendant', 'Pearl Kundan Earrings', 'Daily Wear Bracelet'][index % 4],
  })), []);
  const visible = filter === 'All' ? featured : featured.filter((item) => item.category === filter);

  return (
    <section className="story-home">
      <section className="story-split" data-reveal="left">
        <img src={images[7]} alt="Hand-finished heritage jewellery detail" loading="lazy" />
        <div>
          <p className="eyebrow">THE HOUSE</p>
          <h2>Made Slowly, Worn For Generations</h2>
          <p>Every ornament is presented as a fragment of memory: antique gold, kundan, pearls, and ruby-green contrast composed with a boutique editorial rhythm.</p>
          <button className="btn-primary btn-magnetic" onClick={() => onNavigate('kundan')}>Explore Collections</button>
        </div>
      </section>

      <section className="category-tiles" data-reveal="up">
        {categoryTiles.map((tile) => (
          <button className="category-tile product-card" onClick={() => onNavigate(tile.id)} key={tile.id}>
            <img src={images[tile.imageIndex]} alt={`${tile.label} collection`} loading="lazy" />
            <span>{tile.label}</span>
            <small>{tile.subtitle}</small>
          </button>
        ))}
      </section>

      <section className="featured-edit" data-reveal="up">
        <div className="section-heading">
          <p className="eyebrow">FEATURED COLLECTION</p>
          <h2>Editorial Jewellery Edit</h2>
        </div>
        <div className="filter-bar">
          {categoryFilters.map((item) => (
            <button className={filter === item ? 'is-active' : ''} onClick={() => setFilter(item)} key={item}>{item}</button>
          ))}
        </div>
        <div className="editorial-grid">
          {visible.map((item, index) => (
            <article className={`product-card editorial-card ${index % 7 === 0 ? 'featured' : ''} ${index % 4 === 0 ? 'tall' : ''}`} data-reveal="scale" key={`${item.name}-${index}`}>
              <img src={item.image} alt={item.name} loading="lazy" />
              <div className="card-copy">
                <h3>{item.name}</h3>
                <p>{item.category}</p>
              </div>
              <span className="quick-view">Quick View</span>
            </article>
          ))}
        </div>
      </section>

      <section className="press-strip" data-reveal="up">
        {pressLogos.map((logo) => <span key={logo}>{logo}</span>)}
      </section>

      <section className="craft-scroll" data-reveal="left">
        {['Sketch', 'Stone Setting', 'Gold Work', 'Final Polish'].map((step, index) => (
          <article className="craft-card" key={step}>
            <img src={images[44 + index]} alt={`${step} process`} loading="lazy" />
            <span>0{index + 1}</span>
            <h3>{step}</h3>
          </article>
        ))}
      </section>

      <section className="newsletter" data-reveal="scale">
        <div>
          <p className="eyebrow">PRIVATE NOTES</p>
          <h2>Receive the next archive edit.</h2>
        </div>
        <form>
          <input type="email" placeholder="Email address" aria-label="Email address" />
          <button className="btn-primary btn-magnetic" type="submit">Join</button>
        </form>
      </section>
    </section>
  );
}

function GiftFinder() {
  const [step, setStep] = useState(0);
  const [budget, setBudget] = useState(250);
  const groups = [
    { title: 'Who is it for?', options: ['For Her', 'For Him', 'For Them', 'For Me'] },
    { title: 'What is the occasion?', options: ['Birthday', 'Anniversary', 'Wedding', 'Just Because'] },
  ];

  return (
    <section className="gift-finder" data-reveal="up">
      <p className="eyebrow">GIFT FINDER</p>
      <h2>A quieter way to choose.</h2>
      {step < 2 ? (
        <>
          <h3>{groups[step].title}</h3>
          <div className="option-grid">
            {groups[step].options.map((option) => <button onClick={() => setStep(step + 1)} key={option}>{option}</button>)}
          </div>
        </>
      ) : (
        <>
          <h3>What is your budget?</h3>
          <input type="range" min="50" max="500" value={budget} onChange={(event) => setBudget(event.target.value)} />
          <strong>${budget}</strong>
          <div className="gift-results">
            {giftProducts.slice(0, 4).map((item) => (
              <article className="product-card" key={item.image}>
                <img src={item.image} alt={item.name} loading="lazy" />
                <h3>{item.name}</h3>
                <p>{item.price}</p>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function App() {
  const validIds = ['home', ...pages.map((p) => p.id)];
  const initialPage = window.location.hash.replace('#/', '') || 'home';
  const [activePage, setActivePage] = useState(validIds.includes(initialPage) ? initialPage : 'home');
  const [transitionKey, setTransitionKey] = useState(0);
  const [darkMode, setDarkMode] = useDarkMode();
  useScrollReveal(transitionKey);

  const navigate = (pageId) => {
    if (pageId === activePage) return;
    setActivePage(pageId);
    setTransitionKey((key) => key + 1);
    window.history.pushState(null, '', `#/${pageId}`);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  useEffect(() => {
    const onHashChange = () => {
      const pageId = window.location.hash.replace('#/', '') || 'home';
      if (validIds.includes(pageId)) {
        setActivePage(pageId);
        setTransitionKey((key) => key + 1);
      } else {
        setActivePage('home');
        setTransitionKey((key) => key + 1);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

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
  const columns = [
    { heading: 'COLLECTIONS', links: [
      { label: 'Kundan Jewellery', id: 'kundan' },
      { label: 'Nakashi / Temple', id: 'temple' },
      { label: 'Polki Jewellery', id: 'polki' },
      { label: 'Daily Wear', id: 'daily' },
      { label: 'Custom Jewellery', id: 'custom' },
    ]},
    { heading: 'FEATURED', links: [
      { label: 'Kundan Necklace Sets', id: 'kundan' },
      { label: 'Temple Haram', id: 'temple' },
      { label: 'Polki Bridal Sets', id: 'polki' },
      { label: 'Daily Wear Earrings', id: 'daily' },
      { label: 'Custom Necklaces', id: 'custom' },
    ]},
    { heading: 'CUSTOMER CARE', links: [
      { label: 'Contact' },
      { label: 'Stores' },
      { label: 'Appointments' },
    ]},
    { heading: 'SOCIAL', links: [
      { label: 'Instagram' },
      { label: 'YouTube' },
      { label: 'Facebook' },
    ]},
    { heading: 'CORPORATE', links: [
      { label: 'Privacy Policy' },
      { label: 'Terms of Use' },
      { label: 'Careers' },
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
              link.id ? (
                <a href={`#/${link.id}`} key={link.label} onClick={(e) => { e.preventDefault(); onNavigate(link.id); }}>{link.label}</a>
              ) : (
                <a href="#footer" key={link.label}>{link.label}</a>
              )
            ))}
          </div>
        ))}
      </div>
      <div className="ship-to">Ship to: United States (USD)</div>
    </footer>
  );
}

createRoot(document.getElementById('root')).render(<App />);
