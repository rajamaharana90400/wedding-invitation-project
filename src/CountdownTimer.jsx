import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import SectionDecorations from './SectionDecorations';

const WEDDING_DATE = new Date('2027-02-14T10:00:00');

function getTimeLeft() {
  const now = new Date();
  const diff = WEDDING_DATE - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function AnimatedDigit({ value, label }) {
  const prev = useRef(value);
  const changed = prev.current !== value;
  useEffect(() => { prev.current = value; }, [value]);

  const padded = String(value).padStart(2, '0');

  return (
    <div className="flex flex-col items-center gap-2 md:gap-3">
      <div
        className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 flex items-center justify-center rounded-xl md:rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(62,22,32,0.92) 0%, rgba(92,32,48,0.85) 100%)',
          border: '1px solid rgba(201,169,110,0.4)',
          boxShadow: '0 8px 32px rgba(139,26,48,0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
          animation: 'glowPulse 3s ease-in-out infinite',
        }}
      >
        {/* Shine line */}
        <div
          className="absolute top-0 left-0 w-full h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.6), transparent)' }}
        />

        <AnimatePresence mode="popLayout">
          <motion.span
            key={padded}
            initial={changed ? { rotateX: -90, opacity: 0, y: 10 } : false}
            animate={{ rotateX: 0, opacity: 1, y: 0 }}
            exit={{ rotateX: 90, opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="font-serif-wedding text-2xl sm:text-3xl md:text-5xl gold-gradient-text"
            style={{ fontWeight: 500, display: 'block' }}
          >
            {padded}
          </motion.span>
        </AnimatePresence>

        {/* Card flip divider */}
        <div
          className="absolute w-full h-px pointer-events-none"
          style={{ background: 'rgba(201,169,110,0.15)', top: '50%' }}
        />
      </div>

      <span
        className="text-[0.62rem] sm:text-xs tracking-widest uppercase font-medium"
        style={{ color: '#8B1A30', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.25em' }}
      >
        {label}
      </span>
    </div>
  );
}

/* Floating sparkle particles around countdown */
function Particle({ style }) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        width: 4,
        height: 4,
        borderRadius: '50%',
        background: 'radial-gradient(circle, #E8D5A3, #C9A96E)',
        pointerEvents: 'none',
        animation: 'sparkle 3s ease-in-out infinite',
        ...style,
      }}
    />
  );
}

export default function CountdownTimer() {
  const [time, setTime] = useState(getTimeLeft());
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 90 + 5}%`,
    left: `${Math.random() * 90 + 5}%`,
    delay: `${(i * 0.3).toFixed(1)}s`,
    duration: `${2 + (i % 4)}s`,
  }));

  return (
    <section
      ref={ref}
      className="relative px-4 md:px-8 section-bg-light overflow-hidden text-center"
      id="countdown"
      style={{
        paddingTop: '160px',
        paddingBottom: '128px',
        marginTop: '-80px',
        borderRadius: '50% 50% 0 0 / 80px 80px 0 0',
        position: 'relative',
        zIndex: 5,
      }}
    >
      {/* Curved Divider to overlap the section below (placed first so SectionDecorations multiply blends over it) */}

      <SectionDecorations />


      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,169,110,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Sparkle particles */}
      {particles.map((p) => (
        <Particle
          key={p.id}
          style={{
            top: p.top,
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}

      {/* Lantern decoration */}
      <div
        className="absolute top-8 left-8 text-4xl pointer-events-none opacity-20"
        style={{ animation: 'lanternFloat 5s ease-in-out infinite' }}
      >
        🏮
      </div>
      <div
        className="absolute top-8 right-8 text-4xl pointer-events-none opacity-20"
        style={{ animation: 'lanternFloat 5s ease-in-out 1s infinite' }}
      >
        🏮
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-12"
      >
        <div className="section-label mb-4 font-bold tracking-[0.25em]" style={{ fontWeight: 700, color: '#8B1A30' }}>The Big Day Approaches</div>
        <h2
          className="font-serif-wedding text-4xl md:text-6xl mb-4"
          style={{ color: '#8B1A30', fontWeight: 400 }}
        >
          Counting Down
        </h2>
        <div className="gold-divider" />
        <p
          className="mt-6 text-[1.05rem] md:text-[1.2rem] italic"
          style={{ color: '#000', fontFamily: 'Montserrat, sans-serif' }}
        >
          February 14, 2027 · Udaipur, Rajasthan
        </p>
      </motion.div>

      {/* Countdown digits */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="flex items-start justify-center gap-3 sm:gap-4 md:gap-8"
      >
        <AnimatedDigit value={time.days} label="Days" />
        <div className="font-serif-wedding text-2xl md:text-5xl mt-5 md:mt-8 hidden sm:block" style={{ color: '#C9A96E' }}>:</div>
        <AnimatedDigit value={time.hours} label="Hours" />
        <div className="font-serif-wedding text-2xl md:text-5xl mt-5 md:mt-8 hidden sm:block" style={{ color: '#C9A96E' }}>:</div>
        <AnimatedDigit value={time.minutes} label="Minutes" />
        <div className="font-serif-wedding text-2xl md:text-5xl mt-5 md:mt-8 hidden sm:block" style={{ color: '#C9A96E' }}>:</div>
        <AnimatedDigit value={time.seconds} label="Seconds" />
      </motion.div>
    </section>
  );
}
