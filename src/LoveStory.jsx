import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const events = [
  {
    year: '2019',
    title: 'First Meeting',
    icon: '✨',
    desc: 'Two souls crossed paths at a college cultural fest in Jaipur. A glance, a smile — the universe whispered "this is the one."',
    side: 'left',
  },
  {
    year: '2020',
    title: 'First Date',
    icon: '🌹',
    desc: 'Over candlelit chai at a rooftop café, conversations flowed like poetry. Time stood still as they discovered their shared dreams.',
    side: 'right',
  },
  {
    year: '2022',
    title: 'The Proposal',
    icon: '💍',
    desc: 'Under a sky full of stars at Udaipur Lake, he knelt down — with trembling hands and a heart full of love — and asked the question.',
    side: 'left',
  },
  {
    year: '2023',
    title: 'Engagement',
    icon: '💒',
    desc: 'Surrounded by family, laughter, and marigold garlands, they made their promise official. The rings shone as bright as their smiles.',
    side: 'right',
  },
  {
    year: '2027',
    title: 'Wedding Day',
    icon: '🎊',
    desc: 'The day two hearts become one soul. A celebration of love, family, and the beautiful journey that lies ahead — forever and always.',
    side: 'left',
  },
];

function TimelineCard({ event, index, dotRef }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-160px' });
  const isLeft = event.side === 'left';

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-[48px_1fr] md:grid-cols-[1fr_48px_1fr] gap-4 md:gap-8 mb-12 items-center w-full"
    >
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -80 : 80 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`glass rounded-2xl p-6 md:p-8 premium-shadow relative overflow-hidden col-start-2 ${
          isLeft ? 'md:col-start-1' : 'md:col-start-3'
        }`}
        style={{ justifySelf: 'stretch' }}
      >
        {/* Glow bg */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${isLeft ? '10%' : '90%'} 50%, #C9A96E 0%, transparent 60%)`,
          }}
        />

        <div className="flex items-center gap-3 mb-3">
          <div>
            <div className="section-label text-xs mb-0.5" style={{ color: '#C9A96E' }}>{event.year}</div>
            <h3
              className="font-serif-wedding text-xl md:text-2xl text-[#8B1A30]"
              style={{ fontWeight: 500 }}
            >
              {event.title}
            </h3>
          </div>
        </div>

        <p className="text-[0.95rem] md:text-[1.1rem] leading-relaxed" style={{ color: 'rgba(92, 32, 48, 0.85)' }}>
          {event.desc}
        </p>

        {/* Gold corner accent */}
        <div
          className={`absolute top-0 ${isLeft ? 'right-0' : 'left-0'} w-16 h-16 pointer-events-none opacity-20`}
        >
          <svg viewBox="0 0 64 64" fill="none">
            {isLeft ? (
              <>
                <path d="M64 0 L64 64 L0 0 Z" fill="#C9A96E" />
              </>
            ) : (
              <>
                <path d="M0 0 L64 0 L0 64 Z" fill="#C9A96E" />
              </>
            )}
          </svg>
        </div>
      </motion.div>

      {/* Centre dot on timeline */}
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

export default function LoveStory() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const dot1Ref = useRef(null);
  const dot5Ref = useRef(null);
  
  const [lineCoords, setLineCoords] = useState({ top: 0, height: 0 });
  const titleInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    const updateLine = () => {
      if (dot1Ref.current && dot5Ref.current && timelineRef.current) {
        const dot1Rect = dot1Ref.current.getBoundingClientRect();
        const dot5Rect = dot5Ref.current.getBoundingClientRect();
        const timelineRect = timelineRef.current.getBoundingClientRect();

        // Calculate center vertical position of dot 1 and dot 5
        const top = dot1Rect.top + dot1Rect.height / 2 - timelineRect.top;
        const bottom = dot5Rect.top + dot5Rect.height / 2 - timelineRect.top;
        
        setLineCoords({
          top,
          height: bottom - top
        });
      }
    };

    // Run layout update
    updateLine();

    // Event listeners for window resize/load
    window.addEventListener('resize', updateLine);
    window.addEventListener('load', updateLine);
    
    // Fallback interval to capture any late DOM shifts or lazy loading layouts
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
      className="relative py-24 px-4 md:px-8 overflow-hidden section-bg-rose"
      id="love-story"
    >
      {/* Decorative background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(201,169,110,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-label mb-4"
        >
          Our Journey
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif-wedding text-4xl md:text-6xl mb-4"
          style={{ color: '#8B1A30', fontWeight: 400 }}
        >
          Our Love Story
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={titleInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="gold-divider"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-6 text-[1.05rem] md:text-[1.2rem] max-w-lg mx-auto"
          style={{ color: '#3E1620', fontFamily: 'Montserrat, sans-serif' }}
        >
          Every great love story has its chapters. Here is ours — written in the stars,
          sealed with a kiss, and forever in our hearts.
        </motion.p>
      </div>

      {/* Timeline */}
      <div ref={timelineRef} className="relative max-w-3xl mx-auto">
        <FlowerVineLine top={lineCoords.top} height={lineCoords.height} />
        {events.map((ev, i) => (
          <TimelineCard
            key={ev.year}
            event={ev}
            index={i}
            dotRef={i === 0 ? dot1Ref : i === events.length - 1 ? dot5Ref : null}
          />
        ))}
      </div>


      {/* Floating decorative flowers */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute pointer-events-none opacity-10"
          style={{
            top: `${20 + i * 30}%`,
            left: i % 2 === 0 ? '2%' : '95%',
            animation: `floatY ${6 + i * 2}s ease-in-out ${i}s infinite`,
            fontSize: '48px',
          }}
        >
          🌸
        </div>
      ))}
    </section>
  );
}
