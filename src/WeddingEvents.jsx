import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionDecorations from './SectionDecorations';
import FloatingRosePetals from './FloatingRosePetals';
import details from '../details.json';

// Premium muted Indian wedding flower color palette
const SaffronOrange = '#E5A93C'; // Warm golden saffron
const GoldenYellow = '#F3D078'; // Soft light yellow
const PaleGold = '#FFE082'; // Center dot pale gold
const CrimsonRose = '#A8223B'; // Luxury deep crimson rose
const SageGreen = '#7A9A60'; // Soft muted green leaf
const GoldenThread = '#C9A96E'; // Dashed garland thread

const eventMeta = {
  welcome: {
    desc: 'Join us for a warm, intimate dinner under the stars as we welcome our beloved guests to kickstart the celebrations.',
    color: 'from-amber-900/40 to-yellow-900/30',
    border: '#fbbf24',
    bgImage: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&q=80&w=600',
  },
  mehendi: {
    desc: 'An evening of laughter, henna, music, and vibrant colors as the bride\'s hands bloom into art.',
    color: 'from-green-900/40 to-emerald-900/30',
    border: '#6ee7b7',
    bgImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600',
  },
  haldi: {
    desc: 'A sacred golden ritual — turmeric blessings poured with love, laughter, and pure happiness.',
    color: 'from-yellow-900/40 to-amber-900/30',
    border: '#fbbf24',
    bgImage: 'https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?auto=format&fit=crop&q=80&w=600',
  },
  sangeet: {
    desc: 'Dance, music, and celebration under the stars. A night where two families become one through rhythm.',
    color: 'from-purple-900/40 to-violet-900/30',
    border: '#c084fc',
    bgImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=600',
  },
  wedding: {
    desc: 'The sacred union of two souls. Seven vows, seven steps, and a lifetime of love begins today.',
    color: 'from-rose-900/40 to-pink-900/30',
    border: '#f43f5e',
    bgImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=600',
  },
  reception: {
    desc: 'An elegant evening to celebrate the newlyweds with champagne, fine dining, and joyful company.',
    color: 'from-sky-900/40 to-blue-900/30',
    border: '#60a5fa',
    bgImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=600',
  },
};

const events = details.events.map((event) => ({
  ...event,
  ...eventMeta[event.id],
}));

function FlowerVineLine({ top, height }) {
  return (
    <div
      className="absolute left-[24px] md:left-1/2 -translate-x-1/2 w-[56px] overflow-hidden pointer-events-none"
      style={{
        zIndex: 1,
        top: top || 0,
        height: height || 0,
      }}
    >
      <div
        style={{
          height: '100%',
          backgroundImage: 'url(/flowervine.png)',
          backgroundSize: '56px auto',
          backgroundRepeat: 'repeat-y',
          width: '100%',
          opacity: 0.95,
        }}
      />
    </div>
  );
}

// Helper to get thematic card overlay gradients matching each event type (light theme)
const getOverlayGradient = (id) => {
  switch (id) {
    case 'welcome':
      return 'linear-gradient(135deg, rgba(255, 252, 244, 0.95) 0%, rgba(254, 246, 232, 0.92) 100%)'; // Light gold
    case 'mehendi':
      return 'linear-gradient(135deg, rgba(250, 255, 252, 0.95) 0%, rgba(238, 250, 244, 0.92) 100%)'; // Light green
    case 'haldi':
      return 'linear-gradient(135deg, rgba(255, 253, 240, 0.95) 0%, rgba(254, 248, 225, 0.92) 100%)'; // Light saffron
    case 'sangeet':
      return 'linear-gradient(135deg, rgba(253, 250, 255, 0.95) 0%, rgba(246, 238, 252, 0.92) 100%)'; // Light lavender
    case 'wedding':
      return 'linear-gradient(135deg, rgba(255, 250, 251, 0.95) 0%, rgba(253, 238, 241, 0.92) 100%)'; // Light rose
    case 'reception':
      return 'linear-gradient(135deg, rgba(250, 253, 255, 0.95) 0%, rgba(238, 246, 254, 0.92) 100%)'; // Light blue
    default:
      return 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.92) 100%)';
  }
};

// Helper to get high-contrast theme text and icon colors for readability on light backgrounds
const getThemeColor = (id) => {
  switch (id) {
    case 'welcome':
      return '#A07010'; // Rich dark gold
    case 'mehendi':
      return '#0E7543'; // Forest green
    case 'haldi':
      return '#B58200'; // Turmeric gold
    case 'sangeet':
      return '#7C3AED'; // Royal purple
    case 'wedding':
      return '#8B1A30'; // Crimson burgundy
    case 'reception':
      return '#1D4ED8'; // Royal blue
    default:
      return '#8B1A30';
  }
};

function EventTimelineCard({ ev, index, dotRef }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-160px' });
  const isLeft = index % 2 === 0;
  const [isPressed, setIsPressed] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const triggerPress = () => {
    setIsPressed(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsPressed(false), 900);
  };

  const clearPress = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsPressed(false);
  };

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-[48px_1fr] md:grid-cols-[1fr_48px_1fr] gap-4 md:gap-8 mb-20 items-center w-full"
    >
      {/* Event Circular Card Container */}
      <div
        className={`relative col-start-2 justify-self-center flex flex-col items-center event-card-wrap ${isLeft ? 'md:col-start-1' : 'md:col-start-3'
          }`}
      >
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -80 : 80 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          whileHover={{
            scale: 1.04,
            boxShadow: `0 20px 48px rgba(0,0,0,0.15), 0 0 24px ${ev.border}70`,
            borderColor: ev.border,
            zIndex: 20,
          }}
          whileTap={{
            scale: 1.04,
            boxShadow: `0 20px 48px rgba(0,0,0,0.15), 0 0 24px ${ev.border}70`,
            borderColor: ev.border,
            zIndex: 20,
          }}
          onPointerDown={triggerPress}
          onPointerUp={clearPress}
          onPointerLeave={clearPress}
          onPointerCancel={clearPress}
          onTouchStart={triggerPress}
          onTouchEnd={clearPress}
          onTouchCancel={clearPress}
          className={`relative rounded-full p-8 overflow-hidden cursor-pointer premium-shadow flex flex-col items-center justify-center text-center event-card-circle group ${index % 2 === 0 ? 'animate-event-float-odd' : 'animate-event-float-even'
            }`}
          style={{
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: `${ev.border}45`,
            width: 'clamp(290px, 82vw, 350px)',
            height: 'clamp(290px, 82vw, 350px)',
            transition: 'border-color 0.4s, box-shadow 0.4s',
            touchAction: 'manipulation',
          }}
        >
          {/* Background image container enabling independent hover zoom */}
          <div
            className="absolute inset-0 transition-transform duration-700 ease-out scale-100 pointer-events-none"
            style={{
              backgroundImage: `url(${ev.bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: isPressed ? 'scale(1.10)' : 'scale(1.0)',
              transition: 'transform 0.7s ease-out',
            }}
          />
          {/* Soft light pastel gradient overlay */}
          <div
            className="absolute inset-0 opacity-95 transition-opacity duration-500 pointer-events-none"
            style={{
              background: getOverlayGradient(ev.id),
              opacity: isPressed ? 0.88 : 0.95,
            }}
          />
          {/* Golden hover radial gradient */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${ev.border}30 0%, transparent 80%)`,
              opacity: isPressed ? 1 : 0,
            }}
          />

          {/* Content */}
          <div className="relative z-10 w-full px-4 flex flex-col items-center">
            <h3
              className="font-serif-wedding text-xl md:text-2xl mb-1 pt-1 text-center"
              style={{ color: '#8B1A30', fontWeight: 600 }}
            >
              {ev.name}
            </h3>
            <div className="gold-divider mb-3" style={{ margin: '0 auto 0.75rem', width: 44 }} />

            <p
              className="text-[0.78rem] md:text-[0.88rem] leading-relaxed mb-4 text-center"
              style={{ color: '#4E3C30', fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
            >
              {ev.desc}
            </p>

            {/* Meta info with SVG icons */}
            <div className="flex flex-col items-center gap-1.5 text-[0.72rem] md:text-[0.78rem]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              <div className="flex items-center justify-center gap-1.5 font-semibold" style={{ color: getThemeColor(ev.id) }}>
                <svg className="w-3 h-3 opacity-90" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>{ev.date}</span>
              </div>
              <div className="flex items-center justify-center gap-1.5" style={{ color: getThemeColor(ev.id) }}>
                <svg className="w-3 h-3 opacity-90" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>{ev.time}</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-center px-2" style={{ color: '#4E3C30' }}>
                <svg className="w-3 h-3 opacity-90 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="line-clamp-1">{ev.venue}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hanging flower garlands row decoration */}
        <div
          className="relative flex justify-center items-start gap-2.5 md:gap-4 garlands-row pointer-events-none"
          style={{
            marginTop: '-12px',
            zIndex: 10,
            width: '100%',
          }}
        >
          {/* Garland 1: Short */}
          <div className="animate-flower-sway" style={{ animationDelay: '-0.4s', animationDuration: '2.8s' }}>
            <svg width="20" height="65" viewBox="0 0 24 65" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="12" y1="0" x2="12" y2="55" stroke={GoldenThread} strokeWidth="1.2" strokeDasharray="2 2" />
              <circle cx="12" cy="15" r="5" fill={SaffronOrange} />
              <circle cx="12" cy="15" r="3" fill={GoldenYellow} />
              <circle cx="12" cy="15" r="1.5" fill={PaleGold} />
              <path d="M12 30 C9 27, 7 32, 12 37 C17 32, 15 27, 12 30 Z" fill={CrimsonRose} />
              <circle cx="12" cy="48" r="5" fill={SaffronOrange} />
              <circle cx="12" cy="48" r="3" fill={GoldenYellow} />
              <path d="M12 55 Q15 58 12 61 Q9 58 12 55 Z" fill={SageGreen} />
            </svg>
          </div>

          {/* Garland 2: Medium */}
          <div className="animate-flower-sway" style={{ animationDelay: '-0.8s', animationDuration: '3.4s' }}>
            <svg width="20" height="85" viewBox="0 0 24 85" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="12" y1="0" x2="12" y2="75" stroke={GoldenThread} strokeWidth="1.2" strokeDasharray="2 2" />
              <circle cx="12" cy="15" r="5" fill={SaffronOrange} />
              <circle cx="12" cy="15" r="3" fill={GoldenYellow} />
              <circle cx="12" cy="15" r="1.5" fill={PaleGold} />
              <circle cx="12" cy="32" r="5" fill={SaffronOrange} />
              <circle cx="12" cy="32" r="3" fill={GoldenYellow} />
              <path d="M12 48 C9 45, 7 50, 12 55 C17 50, 15 45, 12 48 Z" fill={CrimsonRose} />
              <circle cx="12" cy="68" r="5" fill={SaffronOrange} />
              <circle cx="12" cy="68" r="3" fill={GoldenYellow} />
              <path d="M12 75 Q15 78 12 81 Q9 78 12 75 Z" fill={SageGreen} />
            </svg>
          </div>

          {/* Garland 3: Long */}
          <div className="animate-flower-sway" style={{ animationDelay: '0s', animationDuration: '3.0s' }}>
            <svg width="20" height="105" viewBox="0 0 24 105" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="12" y1="0" x2="12" y2="95" stroke={GoldenThread} strokeWidth="1.2" strokeDasharray="2 2" />
              <circle cx="12" cy="15" r="5" fill={SaffronOrange} />
              <circle cx="12" cy="15" r="3" fill={GoldenYellow} />
              <circle cx="12" cy="15" r="1.5" fill={PaleGold} />
              <path d="M12 30 C9 27, 7 32, 12 37 C17 32, 15 27, 12 30 Z" fill={CrimsonRose} />
              <circle cx="12" cy="50" r="5" fill={SaffronOrange} />
              <circle cx="12" cy="50" r="3" fill={GoldenYellow} />
              <circle cx="12" cy="68" r="5" fill={SaffronOrange} />
              <circle cx="12" cy="68" r="3" fill={GoldenYellow} />
              <path d="M12 82 C9 79, 7 84, 12 89 C17 84, 15 79, 12 82 Z" fill={CrimsonRose} />
              <path d="M12 95 Q15 98 12 101 Q9 98 12 95 Z" fill={SageGreen} />
            </svg>
          </div>

          {/* Garland 4: Medium */}
          <div className="animate-flower-sway" style={{ animationDelay: '-1.2s', animationDuration: '3.2s' }}>
            <svg width="20" height="85" viewBox="0 0 24 85" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="12" y1="0" x2="12" y2="75" stroke={GoldenThread} strokeWidth="1.2" strokeDasharray="2 2" />
              <circle cx="12" cy="15" r="5" fill={SaffronOrange} />
              <circle cx="12" cy="15" r="3" fill={GoldenYellow} />
              <circle cx="12" cy="15" r="1.5" fill={PaleGold} />
              <circle cx="12" cy="32" r="5" fill={SaffronOrange} />
              <circle cx="12" cy="32" r="3" fill={GoldenYellow} />
              <path d="M12 48 C9 45, 7 50, 12 55 C17 50, 15 45, 12 48 Z" fill={CrimsonRose} />
              <circle cx="12" cy="68" r="5" fill={SaffronOrange} />
              <circle cx="12" cy="68" r="3" fill={GoldenYellow} />
              <path d="M12 75 Q15 78 12 81 Q9 78 12 75 Z" fill={SageGreen} />
            </svg>
          </div>

          {/* Garland 5: Short */}
          <div className="animate-flower-sway" style={{ animationDelay: '-0.2s', animationDuration: '2.6s' }}>
            <svg width="20" height="65" viewBox="0 0 24 65" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="12" y1="0" x2="12" y2="55" stroke={GoldenThread} strokeWidth="1.2" strokeDasharray="2 2" />
              <circle cx="12" cy="15" r="5" fill={SaffronOrange} />
              <circle cx="12" cy="15" r="3" fill={GoldenYellow} />
              <circle cx="12" cy="15" r="1.5" fill={PaleGold} />
              <path d="M12 30 C9 27, 7 32, 12 37 C17 32, 15 27, 12 30 Z" fill={CrimsonRose} />
              <circle cx="12" cy="48" r="5" fill={SaffronOrange} />
              <circle cx="12" cy="48" r="3" fill={GoldenYellow} />
              <path d="M12 55 Q15 58 12 61 Q9 58 12 55 Z" fill={SageGreen} />
            </svg>
          </div>
        </div>
      </div>

      {/* Center dot on timeline */}
      <div
        ref={dotRef}
        className="col-start-1 md:col-start-2 flex justify-center items-center"
        style={{ width: '48px', justifySelf: 'center', zIndex: 5 }}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
          style={{
            background: 'linear-gradient(135deg, #C9A96E, #8B1A30)',
            boxShadow: '0 0 15px rgba(139,26,48,0.3)',
          }}
        >
          {index + 1}
        </motion.div>
      </div>
    </div>
  );
}

export default function WeddingEvents() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const dot1Ref = useRef(null);
  const dot6Ref = useRef(null);

  const [lineCoords, setLineCoords] = useState({ top: 0, height: 0 });
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    const updateLine = () => {
      if (dot1Ref.current && dot6Ref.current && timelineRef.current) {
        const dot1Rect = dot1Ref.current.getBoundingClientRect();
        const dot6Rect = dot6Ref.current.getBoundingClientRect();
        const timelineRect = timelineRef.current.getBoundingClientRect();

        const top = dot1Rect.top + dot1Rect.height / 2 - timelineRect.top;
        const bottom = dot6Rect.top + dot6Rect.height / 2 - timelineRect.top;

        setLineCoords({
          top,
          height: bottom - top,
        });
      }
    };

    updateLine();
    window.addEventListener('resize', updateLine);
    window.addEventListener('load', updateLine);
    const interval = setInterval(updateLine, 400);

    return () => {
      window.removeEventListener('resize', updateLine);
      window.removeEventListener('load', updateLine);
      clearInterval(interval);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative px-4 md:px-8 section-bg-rose overflow-hidden"
      id="events"
      style={{
        paddingTop: '160px',
        paddingBottom: '96px',
        marginTop: '-80px',
        borderRadius: '50% 50% 0 0 / 80px 80px 0 0',
        position: 'relative',
        zIndex: 3,
      }}
    >
      <FloatingRosePetals />

      {/* Upper cherry blossom branches (background removed) */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '400px',
          pointerEvents: 'none',
          overflow: 'hidden',
          zIndex: 0,
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
        }}
      >
        <img
          src="/wedding_events_top_transparent.png"
          alt=""
          draggable={false}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top center',
            opacity: 0.95,
            mixBlendMode: 'multiply',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Content wrapper — renders above the decoration image */}
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-label mb-4 font-bold text-black text-[1rem] md:text-[1.15rem]"
            style={{ color: '#000' }}
          >
            Celebrations Await
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif-wedding text-4xl md:text-6xl mb-4"
            style={{ color: '#3E1620', fontWeight: 400 }}
          >
            Wedding Events
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="gold-divider"
            style={{
              background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)',
            }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 text-[1.05rem] md:text-[1.2rem] max-w-lg mx-auto"
            style={{ color: '#3E1620', fontFamily: 'Montserrat, sans-serif' }}
          >
            Six ceremonies, six celebrations, one unforgettable week.
            Join us for every magical moment.
          </motion.p>
        </div>

        {/* Timeline Layout */}
        <div ref={timelineRef} className="relative max-w-3xl mx-auto">
          <FlowerVineLine top={lineCoords.top} height={lineCoords.height} />
          {events.map((ev, i) => (
            <EventTimelineCard
              key={ev.id}
              ev={ev}
              index={i}
              dotRef={i === 0 ? dot1Ref : i === events.length - 1 ? dot6Ref : null}
            />
          ))}
        </div>

      </div>{/* end content wrapper */}

      {/* ── Cherry blossom strip at bottom — transitions into Our Gallery ── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '200px',
          pointerEvents: 'none',
          overflow: 'hidden',
          zIndex: 2,
        }}
      >
        <img
          src="/backside.png"
          alt=""
          draggable={false}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '400px',        /* show only the top portion (branches) of the image */
            objectFit: 'fill',
            objectPosition: 'top',  /* crop to show top branches at bottom of section */
            opacity: 0.9,
            mixBlendMode: 'multiply',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        />
      </div>
    </section>
  );
}
