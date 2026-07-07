import { useRef } from 'react';
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

function TimelineCard({ event, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isLeft = event.side === 'left';

  return (
    <div
      ref={ref}
      className={`relative flex w-full items-start gap-4 mb-12 ${
        isLeft ? 'flex-row' : 'flex-row-reverse'
      } md:gap-8`}
    >
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex-1 glass rounded-2xl p-6 md:p-8 premium-shadow relative overflow-hidden"
        style={{ maxWidth: '420px' }}
      >
        {/* Glow bg */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${isLeft ? '10%' : '90%'} 50%, #C9A96E 0%, transparent 60%)`,
          }}
        />

        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">{event.icon}</span>
          <div>
            <div className="section-label text-xs mb-0.5">{event.year}</div>
            <h3
              className="font-serif-wedding text-xl md:text-2xl text-white"
              style={{ fontWeight: 500 }}
            >
              {event.title}
            </h3>
          </div>
        </div>

        <p className="text-sm md:text-base leading-relaxed" style={{ color: 'rgba(251,247,238,0.75)' }}>
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
      <div className="flex-shrink-0 flex flex-col items-center" style={{ width: '48px' }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
          style={{
            background: 'linear-gradient(135deg, #C9A96E, #E8D5A3)',
            boxShadow: '0 0 20px rgba(201,169,110,0.5)',
          }}
        >
          {event.icon}
        </motion.div>
      </div>

      {/* Spacer for opposite side */}
      <div className="flex-1 hidden md:block" style={{ maxWidth: '420px' }} />
    </div>
  );
}

function AnimatedGoldLine({ visible }) {
  return (
    <svg
      className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none"
      style={{ height: '100%', width: '4px', overflow: 'visible' }}
      aria-hidden
    >
      <defs>
        <linearGradient id="goldLineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9A7A40" stopOpacity="0" />
          <stop offset="20%" stopColor="#C9A96E" stopOpacity="1" />
          <stop offset="80%" stopColor="#C9A96E" stopOpacity="1" />
          <stop offset="100%" stopColor="#9A7A40" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.line
        x1="2"
        y1="0"
        x2="2"
        y2="2000"
        stroke="url(#goldLineGrad)"
        strokeWidth="2"
        strokeDasharray="2000"
        strokeDashoffset="2000"
        animate={visible ? { strokeDashoffset: 0 } : {}}
        transition={{ duration: 2.5, ease: 'easeOut' }}
      />
    </svg>
  );
}

export default function LoveStory() {
  const sectionRef = useRef(null);
  const titleInView = useInView(sectionRef, { once: true, margin: '-100px' });

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
          style={{ color: '#FBF7EE', fontWeight: 400 }}
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
          className="mt-6 text-sm md:text-base max-w-lg mx-auto"
          style={{ color: 'rgba(251,247,238,0.6)', fontFamily: 'Montserrat, sans-serif' }}
        >
          Every great love story has its chapters. Here is ours — written in the stars,
          sealed with a kiss, and forever in our hearts.
        </motion.p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-3xl mx-auto">
        <AnimatedGoldLine visible={titleInView} />
        {events.map((ev, i) => (
          <TimelineCard key={ev.year} event={ev} index={i} />
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
