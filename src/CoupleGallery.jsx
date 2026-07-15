import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import SectionDecorations from './SectionDecorations';

// Placeholder couple photos using picsum.photos (unique seeds for wedding aesthetic)
const PHOTOS = [
  { id: 1, src: 'gallery1.jpg', alt: 'Together', span: 'row-span-2' },
  { id: 2, src: 'happymoment.jpg', alt: 'Happy moments', span: '' },
  { id: 3, src: 'engagement.jpg', alt: 'Our story', span: '' },
  { id: 4, src: 'love story.jpg', alt: 'The proposal', span: 'row-span-2' },
  { id: 5, src: 'proposal.jpg', alt: 'Engagement', span: '' },
  { id: 6, src: 'sindur.jpg', alt: 'Love story', span: '' },
  { id: 7, src: 'celebration.jpg', alt: 'Golden hour', span: '' },
  { id: 8, src: 'https://picsum.photos/seed/wed8/600/400', alt: 'Forever', span: '' },
  { id: 9, src: 'celebration.jpg', alt: 'Celebration', span: '' },
  { id: 10, src: 'https://picsum.photos/seed/wed10/600/400', alt: 'Together Forever', span: '' },
];

function Lightbox({ photo, onClose }) {
  return createPortal(
    <AnimatePresence>
      {photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 lightbox-portal"
          style={{ background: 'rgba(10,0,8,0.95)', backdropFilter: 'blur(12px)', touchAction: 'none' }}
          onClick={onClose}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative max-w-3xl max-h-[85vh] rounded-3xl overflow-hidden"
            style={{
              border: '1px solid rgba(201,169,110,0.3)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 60px rgba(201,169,110,0.1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photo.src && (photo.src.startsWith('http') ? photo.src : encodeURI('/' + photo.src))}
              alt={photo.alt}
              className="w-full h-full object-cover max-h-[80vh]"
            />
            {/* Caption */}
            <div
              className="absolute bottom-0 left-0 right-0 px-6 py-4"
              style={{
                background: 'linear-gradient(0deg, rgba(10,0,8,0.9) 0%, transparent 100%)',
              }}
            >
              <p
                className="font-serif-wedding text-lg"
                style={{ color: '#E8D5A3', fontWeight: 400 }}
              >
                {photo.alt}
              </p>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all"
              style={{
                background: 'rgba(201,169,110,0.2)',
                border: '1px solid rgba(201,169,110,0.3)',
                color: '#E8D5A3',
                cursor: 'pointer',
              }}
              aria-label="Close"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

function GalleryCard({ photo, index, onClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      whileHover={{ scale: 1.03, y: -4 }}
      className={`relative rounded-2xl overflow-hidden cursor-pointer group ${photo.span}`}
      style={{
        border: '1px solid rgba(201,169,110,0.2)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      }}
      onClick={() => onClick(photo)}
    >
      <img
        src={photo.src && (photo.src.startsWith('http') ? photo.src : encodeURI('/' + photo.src))}
        alt={photo.alt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        style={{ minHeight: photo.span ? 320 : 200 }}
        loading="lazy"
      />

      {/* Overlay on hover */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400"
        style={{ background: 'linear-gradient(180deg, rgba(62,22,32,0.3) 0%, rgba(62,22,32,0.75) 100%)' }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center mb-2 text-lg"
          style={{ background: 'rgba(201,169,110,0.3)', border: '1px solid rgba(201,169,110,0.5)' }}
        >
          🔍
        </div>
        <p
          className="text-xs tracking-wider"
          style={{ color: '#E8D5A3', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.2em' }}
        >
          View
        </p>
      </div>

      {/* Gold frame corners */}
      {[
        'top-2 left-2 border-t border-l',
        'top-2 right-2 border-t border-r',
        'bottom-2 left-2 border-b border-l',
        'bottom-2 right-2 border-b border-r',
      ].map((cls, i) => (
        <div
          key={i}
          className={`absolute w-6 h-6 pointer-events-none ${cls}`}
          style={{ borderColor: 'rgba(201,169,110,0.5)' }}
        />
      ))}
    </motion.div>
  );
}

export default function CoupleGallery() {
  const [lightbox, setLightbox] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!lightbox) return undefined;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, [lightbox]);

  // Also toggle a body class so global decorations can be hidden via CSS
  useEffect(() => {
    try {
      if (lightbox) {
        document.body.classList.add('lightbox-open');
      } else {
        document.body.classList.remove('lightbox-open');
      }
    } catch (err) {
      // ignore during SSR or if document isn't available
    }
    return () => {
      try {
        document.body.classList.remove('lightbox-open');
      } catch (e) { }
    };
  }, [lightbox]);

  // Hide page sections (e.g., countdown) when lightbox is open to prevent them
  // from peeking through on some devices or z-index contexts.
  useEffect(() => {
    const el = document.getElementById('countdown');
    if (!el) return undefined;

    const originalDisplay = el.style.display;
    if (lightbox) {
      el.style.display = 'none';
    } else {
      el.style.display = originalDisplay || '';
    }

    return () => {
      el.style.display = originalDisplay || '';
    };
  }, [lightbox]);

  return (
    <section
      ref={ref}
      className="relative px-4 md:px-8 section-bg-rose overflow-hidden"
      id="gallery"
      style={{
        paddingTop: '160px',
        paddingBottom: '128px',
        marginTop: '-80px',
        borderRadius: '50% 50% 0 0 / 80px 80px 0 0',
        position: 'relative',
        zIndex: 4,
      }}
    >
      <SectionDecorations />
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(201,169,110,0.05) 0%, transparent 60%)',
        }}
      />

      {/* Section Header */}
      <div className="text-center mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-label mb-4"
        >
          Memories Together
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif-wedding text-4xl md:text-6xl mb-4"
          style={{ color: '#8B1A30', fontWeight: 400 }}
        >
          Our Gallery
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="gold-divider"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-5 text-[1.05rem] md:text-[1.2rem] max-w-md mx-auto"
          style={{ color: '#3E1620', fontFamily: 'Montserrat, sans-serif' }}
        >
          A collection of cherished moments, frozen in time — each one a chapter of our love story.
        </motion.p>
      </div>

      {/* Masonry Grid */}
      <div
        className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] gap-3"
        style={{ gridAutoFlow: 'dense' }}
      >
        {PHOTOS.map((photo, i) => (
          <GalleryCard key={photo.id} photo={photo} index={i} onClick={setLightbox} />
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox photo={lightbox} onClose={() => setLightbox(null)} />
    </section>
  );
}
