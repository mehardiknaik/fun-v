import { useState, useEffect } from 'react';
import './App.css';

interface Page {
  id: number;
  title: string;
  content: string;
  color: string;
  image?: string;
  isCover?: boolean;
}

const PAGES: Page[] = [
  {
    id: 0,
    title: 'OUR JOURNEY',
    content: 'A record of our beautiful moments together.',
    color: 'linear-gradient(135deg, #2d1b2d 0%, #1a0f1a 100%)',
    isCover: true
  },
  {
    id: 1,
    title: 'The Day We Met',
    content: 'It was a day that changed everything. I still remember the way the light caught your eyes and the moment I knew you were someone special. The coffee shop was bustling, but to me, it felt like the world had stopped.',
    color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    image: 'first_meeting_romantic_1770970952482.png' // Using the generated image
  },
  {
    id: 2,
    title: 'Our First Date',
    content: 'Walks in the park, endless conversations, and that clumsy first laugh. Everything felt so effortless, like we had known each other forever. I remember feeling so nervous, yet so at home at the same time.',
    color: 'linear-gradient(135deg, #a1887f 0%, #d7ccc8 100%)',
    image: 'https://images.unsplash.com/photo-1516589174184-c685266e4a63?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Memorable Trips',
    content: 'From spontaneous road trips to quiet weekends away, every journey with you is my favorite adventure. Exploring new places with you makes every destination feel like paradise.',
    color: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    title: 'Little Moments',
    content: 'It is the quiet mornings, the inside jokes, and the way you hold my hand. Those are the moments that truly matter. Life is better when shared with you, in every small, beautiful detail.',
    color: 'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)',
    image: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    title: 'FOREVER',
    content: 'This is just the beginning of our story. I love you more than words can say.',
    color: 'linear-gradient(135deg, #2d1b2d 0%, #1a0f1a 100%)',
    isCover: true
  },
];

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 700);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextPage = () => {
    if (currentPage < PAGES.length - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const bookTransform = isMobile
    ? `translateY(${currentPage === 0 ? '0%' : '-20%'})`
    : `translateX(${currentPage === 0 ? '50%' : '100%'})`;

  // Render pages with 3D View for both Desktop and Mobile
  const renderPages = () => {
    return PAGES.map((page, index) => {
      const zIndex = PAGES.length - index;
      const isFlipped = index < currentPage;

      return (
        <div
          key={page.id}
          className={`page ${isFlipped ? 'flipped' : ''}`}
          style={{ zIndex: isFlipped ? index : zIndex }}
        >
          <div className={`page-face front ${page.isCover ? 'cover' : ''}`} style={{ background: page.color }}>
            <div className="page-content">
              {page.isCover ? (
                <div className="cover-content">
                  <div className="ornament">❤</div>
                  <h2>{page.title}</h2>
                  <div className="divider"></div>
                  <p className="subtitle">{page.content}</p>
                  <div className="author">V ❤️ H</div>
                </div>
              ) : (
                <div className="story-content">
                  <span className="page-number">{index}</span>
                  <h2>{page.title}</h2>
                  <div className="detail-line"></div>
                  <p>{page.content}</p>
                </div>
              )}
            </div>
          </div>
          <div className="page-face back">
            <div className="page-content">
              {page.isCover ? (
                <div className="inner-cover">
                  <div className="pattern"></div>
                </div>
              ) : (
                <div className="image-spread">
                  <div className="photo-frame">
                    {page.image ? (
                      <img src={page.image} alt={page.title} className="story-image" />
                    ) : (
                      <div className="image-placeholder">
                        <span>Memories here</span>
                      </div>
                    )}
                    <div className="photo-caption">{page.title}</div>
                  </div>
                  <div className="page-number-left">{index + 1}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="app-container">
      <div className="background-decoration">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
      </div>

      <header>
        <h1>Our Love <span>Story</span></h1>
      </header>

      <div className="book-stage">
        <div className="book" style={{ transform: bookTransform }}>
          {renderPages()}
        </div>
      </div>

      <div className="controls">
        <button className="nav-btn prev" onClick={prevPage} disabled={currentPage === 0}>
          <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></svg>
          <span>Prev</span>
        </button>
        <div className="page-indicator">
          <span className="current">{currentPage + 1}</span>
          <span className="sep">/</span>
          <span className="total">{PAGES.length}</span>
        </div>
        <button className="nav-btn next" onClick={nextPage} disabled={currentPage === PAGES.length - 1}>
          <span>Next</span>
          <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" /></svg>
        </button>
      </div>
    </div>
  );
}

export default App;
