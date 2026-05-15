import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Heart, Home, Menu, Moon, Search, ShoppingBag, Sun, X } from 'lucide-react';
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

const categories = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets'];
const pressLogos = ['VOGUE', 'ELLE', 'BAZAAR', 'TATLER', 'BRIDES'];
const giftProducts = pick(6, 8).map((image, index) => ({
  image,
  name: ['Temple Choker', 'Ruby Kundan Set', 'Pearl Jhumka', 'Emerald Pendant'][index % 4],
  price: ['$420', '$680', '$290', '$510'][index % 4],
}));

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
      <div className="header-actions">
        <button className="icon-button" onClick={onThemeToggle} aria-label="Toggle evening mode">
          {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        </button>
        <button className="icon-button bag-button" aria-label="Shopping bag"><ShoppingBag size={22} /></button>
      </div>
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
    <section className={`image-grid ${variant}`} data-reveal="up">
      {items.map((item, index) => (
        <figure className="product-card" data-reveal={index % 2 ? 'scale' : 'up'} key={`${item}-${index}`}>
          <img src={item} alt="Heritage jewelary collection piece" loading="lazy" />
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

function Page({ page, onNavigate }) {
  return (
    <main className="page-shell" id="top" key={page.id}>
      <section className={`page-hero ${page.useLogoHero ? 'logo-hero' : ''}`}>
        {!page.useLogoHero && (
          <div className="page-hero-media">
            <img src={page.hero} alt="" />
          </div>
        )}
        <div className="page-hero-copy" data-reveal="up">
          {page.useLogoHero && <img className="hero-logo-mark hero-bg" src={logoImage} alt="Heritage Jewellery logo" />}
          <p className="category">{page.eyebrow}</p>
          <StaggeredHeadline text={page.title} />
          <div className="hero-underline" />
          <p>{page.intro}</p>
        </div>
      </section>

      {page.useLogoHero && <HomeStory onNavigate={onNavigate} />}

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

      <GiftFinder />

      <section className="statement" data-reveal="scale">
        <p>
          Heritage Jewelary is built as a living archive: every page gives the collection space,
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
    category: categories[(index % (categories.length - 1)) + 1],
    name: ['Nakashi Gold Choker', 'Ruby Temple Pendant', 'Pearl Kundan Earrings', 'Emerald Bracelet'][index % 4],
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
          <button className="btn-primary btn-magnetic" onClick={() => onNavigate('world')}>Explore Craft</button>
        </div>
      </section>

      <section className="category-tiles" data-reveal="up">
        {['Rings', 'Necklaces', 'Earrings', 'Bracelets'].map((label, index) => (
          <button className="category-tile product-card" onClick={() => onNavigate(index === 1 ? 'high' : 'accessories')} key={label}>
            <img src={images[20 + index]} alt={`${label} collection`} loading="lazy" />
            <span>{label}</span>
            <small>View Edit</small>
          </button>
        ))}
      </section>

      <section className="featured-edit" data-reveal="up">
        <div className="section-heading">
          <p className="eyebrow">FEATURED COLLECTION</p>
          <h2>Editorial Jewellery Edit</h2>
        </div>
        <div className="filter-bar">
          {categories.map((item) => (
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
  const initialPage = window.location.hash.replace('#/', '') || 'heritage';
  const [activePage, setActivePage] = useState(pageMap[initialPage] ? initialPage : 'heritage');
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
      <ProgressBar />
      <CustomCursor />
      <MovingLogoBackground />
      <Header activePage={activePage} onNavigate={navigate} darkMode={darkMode} onThemeToggle={() => setDarkMode((value) => !value)} />
      <div className="page-transition" key={transitionKey}>
        <Page page={pageMap[activePage]} onNavigate={navigate} />
      </div>
      <MobileBottomNav activePage={activePage} onNavigate={navigate} />
      <Footer />
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
    ['heritage', Home, 'Home'],
    ['collections', Search, 'Collections'],
    ['accessories', Heart, 'Wishlist'],
    ['bridal', ShoppingBag, 'Bag'],
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
