import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Menu, ShoppingBag, X } from 'lucide-react';
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

const pages = [
  {
    id: 'heritage',
    label: 'HERITAGE JEWELARY',
    title: 'HERITAGE JEWELARY',
    eyebrow: 'THE HOUSE COLLECTION',
    intro: 'A luxury editorial archive of antique gold, kundan work, temple forms, pearls, ruby-green contrasts, and hand-finished heirloom jewelary.',
    useLogoHero: true,
    sections: [
      { title: 'THE DECONSTRUCTED MAHARANI NECKLACE', text: 'Royal necklaces are reimagined through jadau forms, river pearls, kundan settings, and dramatic pendants.', layout: 'triptych hero-grid', images: pick(39, 3) },
      { title: 'CRAFTED AS MEMORY', text: 'Each piece is treated as miniature architecture: arches, birds, flowers, goddess motifs, and sacred geometry in antique gold.', layout: 'asymmetric', images: pick(0, 2) },
    ],
  },
  {
    id: 'high',
    label: 'HIGH JEWELARY',
    title: 'HIGH JEWELARY',
    eyebrow: 'CEREMONIAL PIECES',
    intro: 'Grand necklaces, pendants, and courtly jewelary forms composed for weddings, rituals, and formal heirloom dressing.',
    hero: images[6],
    sections: [
      { title: 'MAHARANI NECKLACES', text: 'Large neckpieces anchor the collection with sculptural pendants, peacock details, Lakshmi forms, and long pearl edges.', layout: 'dense', images: pick(6, 9) },
      { title: 'STATEMENT GOLD', text: 'Antique gold surfaces create depth through repetition, relief, and shadow.', layout: 'two', images: pick(43, 2) },
    ],
  },
  {
    id: 'fine',
    label: 'FINE JEWELARY',
    title: 'FINE JEWELARY',
    eyebrow: 'DETAIL STUDY',
    intro: 'Smaller ornaments carry the same heritage language at intimate scale: bangles, pendants, rings, earrings, and brooch-like pieces.',
    hero: images[20],
    sections: [
      { title: 'BANGLES AND SMALL TREASURES', text: 'Floral bezels, emerald centers, and engraved gold complete the collection with everyday ceremony.', layout: 'dense', images: pick(20, 12) },
      { title: 'PENDANT DETAILS', text: 'Small pieces let the handwork come close, revealing the rhythm of stone setting and gold carving.', layout: 'triptych', images: pick(30, 3) },
    ],
  },
  {
    id: 'bridal',
    label: 'BRIDAL',
    title: 'BRIDAL JEWELARY',
    eyebrow: 'WEDDING ARCHIVE',
    intro: 'Bridal jewelary with weight, polish, and presence: chokers, long necklaces, chandbalis, and complete ceremonial sets.',
    hero: images[40],
    sections: [
      { title: 'WEDDING SETS', text: 'Pearl clusters and kundan settings create motion around the neckline and frame the face with softness.', layout: 'asymmetric', images: pick(40, 2) },
      { title: 'CEREMONIAL NECKLACES', text: 'Red velvet, white fur, and dark leather surfaces emphasize the glow of ruby, emerald, pearl, and gold.', layout: 'dense', images: pick(45, 9) },
    ],
  },
  {
    id: 'temple',
    label: 'TEMPLE GOLD',
    title: 'TEMPLE GOLD',
    eyebrow: 'NAKASHI AND MOTIF',
    intro: 'Temple gold pieces shaped through deity motifs, peacocks, floral relief, coin work, and sculpted surfaces.',
    hero: images[9],
    sections: [
      { title: 'LAKSHMI AND PEACOCK MOTIFS', text: 'Gold relief gives each ornament a carved, almost architectural presence.', layout: 'triptych', images: pick(9, 3) },
      { title: 'SOUTHERN GOLD', text: 'Nakashi-inspired surfaces gather depth, shadow, and ceremonial rhythm.', layout: 'dense', images: pick(50, 9) },
    ],
  },
  {
    id: 'collections',
    label: 'COLLECTIONS',
    title: 'COLLECTIONS',
    eyebrow: 'CURATED EDITS',
    intro: 'A curated view of ruby-emerald pieces, pearl work, antique gold necklaces, and sculptural pendants.',
    hero: images[15],
    sections: [
      { title: 'RUBY, EMERALD AND PEARL', text: 'The collection balances jewel tones with warm gold and soft white pearls.', layout: 'dense', images: pick(15, 12) },
      { title: 'ANTIQUE GOLD EDIT', text: 'Plain gold, coin work, and repoussé-like surfaces bring a quieter opulence.', layout: 'two', images: pick(59, 2) },
    ],
  },
  {
    id: 'accessories',
    label: 'ACCESSORIES',
    title: 'ACCESSORIES',
    eyebrow: 'FINISHING PIECES',
    intro: 'Rings, bangles, earrings, pendants, and small ornaments that complete the larger heritage story.',
    hero: images[23],
    sections: [
      { title: 'EARRINGS AND CHANDBALIS', text: 'Pearls and domed gold details create movement in compact, expressive forms.', layout: 'dense', images: pick(23, 10) },
      { title: 'BANGLES AND RINGS', text: 'Small scale pieces keep the same floral language and handworked texture.', layout: 'triptych', images: pick(61, 3) },
    ],
  },
  {
    id: 'world',
    label: 'WORLD OF HERITAGE',
    title: 'WORLD OF HERITAGE',
    eyebrow: 'CRAFT AND CULTURE',
    intro: 'The editorial side of Heritage Jewelary: craft notes, material stories, store visits, and the emotional life of heirlooms.',
    hero: images[63],
    sections: [
      { title: 'THE MAKING OF INHERITANCE', text: 'A heritage piece is never only an ornament. It holds memory, ceremony, touch, and the confidence of work made slowly by hand.', layout: 'asymmetric', images: pick(63, 2) },
      { title: 'ARCHIVE WALL', text: 'A final gallery of forms, surfaces, and gestures that define the house language.', layout: 'dense', images: pick(0, 12) },
    ],
  },
];

const pageMap = Object.fromEntries(pages.map((page) => [page.id, page]));

function Header({ activePage, onNavigate }) {
  const [open, setOpen] = useState(false);

  const navigate = (pageId, event) => {
    event?.currentTarget?.blur();
    onNavigate(pageId);
    setOpen(false);
  };

  return (
    <header className="site-header">
      <button className="icon-button menu-toggle" onClick={() => setOpen(true)} aria-label="Open menu">
        <Menu size={18} />
      </button>
      <button className="brand" onClick={(event) => navigate('heritage', event)} aria-label="Heritage Jewelary home">
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
                  {item.sections.map((section) => (
                    <button onClick={(event) => navigate(item.id, event)} key={section.title}>{section.title}</button>
                  ))}
                </div>
                <div className="mega-tiles">
                  {pick(itemIndex * 4, 3).map((image, index) => (
                    <button className="mega-tile" onClick={(event) => navigate(item.id, event)} key={`${item.id}-${index}`}>
                      <img src={image} alt="" loading="lazy" />
                      <span>{item.sections[index % item.sections.length].title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </nav>
      <button className="icon-button bag-button" aria-label="Shopping bag"><ShoppingBag size={18} /></button>
      <div className={`mobile-drawer ${open ? 'is-open' : ''}`}>
        <button className="icon-button drawer-close" onClick={() => setOpen(false)} aria-label="Close menu">
          <X size={20} />
        </button>
        <div className="drawer-brand">HERITAGE JEWELARY</div>
        {pages.map((item) => (
          <button className="drawer-link" onClick={(event) => navigate(item.id, event)} key={item.id}>{item.label}</button>
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
    <section className={`image-grid ${variant}`}>
      {items.map((item, index) => (
        <figure key={`${item}-${index}`}>
          <img src={item} alt="Heritage jewelary collection piece" loading="lazy" />
        </figure>
      ))}
    </section>
  );
}

function Page({ page }) {
  return (
    <main className="page-shell" id="top" key={page.id}>
      <section className={`page-hero ${page.useLogoHero ? 'logo-hero' : ''}`}>
        {!page.useLogoHero && (
          <div className="page-hero-media">
            <img src={page.hero} alt="" />
          </div>
        )}
        <div className="page-hero-copy">
          {page.useLogoHero && <img className="hero-logo-mark" src={logoImage} alt="Heritage Jewellery logo" />}
          <p className="category">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p>{page.intro}</p>
        </div>
      </section>

      {page.sections.map((section, index) => (
        <React.Fragment key={section.title}>
          <section className={`text-block ${index % 2 ? 'center' : 'left'}`}>
            <p className="eyebrow">{page.label}</p>
            <h2>{section.title}</h2>
            <p>{section.text}</p>
          </section>
          <ImageGrid variant={section.layout} items={section.images} />
        </React.Fragment>
      ))}

      <section className="statement">
        <p>
          Heritage Jewelary is built as a living archive: every page gives the collection space,
          movement, and the quiet pace of a luxury editorial.
        </p>
      </section>
    </main>
  );
}

function App() {
  const initialPage = window.location.hash.replace('#/', '') || 'heritage';
  const [activePage, setActivePage] = useState(pageMap[initialPage] ? initialPage : 'heritage');
  const [transitionKey, setTransitionKey] = useState(0);

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
      const pageId = window.location.hash.replace('#/', '') || 'heritage';
      if (pageMap[pageId]) {
        setActivePage(pageId);
        setTransitionKey((key) => key + 1);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <>
      <MovingLogoBackground />
      <Header activePage={activePage} onNavigate={navigate} />
      <div className="page-transition" key={transitionKey}>
        <Page page={pageMap[activePage]} />
      </div>
      <Footer />
    </>
  );
}

function Footer() {
  const columns = [
    ['HERITAGE JEWELARY', 'Temple Necklaces', 'Kundan Sets', 'Antique Gold'],
    ['COLLECTIONS', 'Jadau Pendants', 'Pearl Work', 'Bridal Sets'],
    ['CUSTOMER CARE', 'Contact', 'Stores', 'Appointments'],
    ['SOCIAL', 'Instagram', 'YouTube', 'Facebook'],
    ['CORPORATE', 'Privacy Policy', 'Terms of Use', 'Careers'],
  ];

  return (
    <footer className="footer">
      <div className="footer-logo">HERITAGE JEWELARY</div>
      <div className="footer-grid">
        {columns.map(([heading, ...links]) => (
          <div key={heading}>
            <h3>{heading}</h3>
            {links.map((link) => <a href="#footer" key={link}>{link}</a>)}
          </div>
        ))}
      </div>
      <div className="ship-to">Ship to: United States (USD)</div>
    </footer>
  );
}

createRoot(document.getElementById('root')).render(<App />);
