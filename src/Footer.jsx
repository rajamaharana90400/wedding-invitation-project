import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SOCIAL = [
  { label: 'Instagram', icon: '📷', href: '#' },
  { label: 'Facebook', icon: '📘', href: '#' },
  { label: 'WhatsApp', icon: '💬', href: '#' },
];

function FloralDecor({ style, emoji = '🌸', delay = 0, duration = 5 }) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        fontSize: 32,
        pointerEvents: 'none',
        animation: `floatY ${duration}s ease-in-out ${delay}s infinite`,
        opacity: 0.15,
        ...style,
      }}
    >
      {emoji}
    </div>
  );
}

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <footer
      ref={ref}
      className="relative pt-20 pb-10 px-4 md:px-8 text-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #2A0F1A 0%, #1A0510 100%)',
        borderTop: '1px solid rgba(201,169,110,0.15)',
      }}
    >
      {/* Decorative florals */}
      <FloralDecor style={{ top: '5%', left: '2%' }} emoji="🌺" delay={0} duration={6} />
      <FloralDecor style={{ top: '5%', right: '2%' }} emoji="🌸" delay={1} duration={5} />
      <FloralDecor style={{ top: '40%', left: '5%' }} emoji="🌷" delay={2} duration={7} />
      <FloralDecor style={{ top: '40%', right: '5%' }} emoji="🌼" delay={0.5} duration={5.5} />
      <FloralDecor style={{ bottom: '20%', left: '8%' }} emoji="🌸" delay={1.5} duration={6} />
      <FloralDecor style={{ bottom: '20%', right: '8%' }} emoji="🌺" delay={2.5} duration={7} />

      {/* Top gold divider */}
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.5), transparent)',
          boxShadow: '0 0 20px rgba(201,169,110,0.2)',
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Monogram / Ring SVG */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, type: 'spring', stiffness: 120 }}
          className="flex justify-center mb-8"
        >
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <defs>
              <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#E8D5A3" />
                <stop offset="50%" stopColor="#C9A96E" />
                <stop offset="100%" stopColor="#9A7A40" />
              </linearGradient>
              <linearGradient id="ringShineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
            </defs>
            {/* Two interlocking rings */}
            <circle cx="28" cy="40" r="18" stroke="url(#ringGrad)" strokeWidth="3" fill="none" />
            <circle cx="52" cy="40" r="18" stroke="url(#ringGrad)" strokeWidth="3" fill="none" />
            {/* Shine */}
            <circle cx="28" cy="40" r="18" stroke="url(#ringShineGrad)" strokeWidth="1.5" fill="none" opacity="0.6" />
            <circle cx="52" cy="40" r="18" stroke="url(#ringShineGrad)" strokeWidth="1.5" fill="none" opacity="0.6" />
          </svg>
        </motion.div>

        {/* Couple Names */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif-wedding text-4xl md:text-5xl mb-2"
          style={{ color: '#FBF7EE', fontWeight: 400 }}
        >
          Ananya <span style={{ color: '#C9A96E' }}>&amp;</span> Arjun
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="section-label mb-6"
        >
          February 14, 2027 · Udaipur, Rajasthan
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="gold-divider mb-8"
        />

        {/* Thank you message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-sm md:text-base leading-relaxed mb-8 italic"
          style={{ color: 'rgba(251,247,238,0.55)', fontFamily: 'Cormorant Garamond, serif' }}
        >
          "Thank you for being part of our journey. Your presence at our wedding means the world to us.
          We look forward to celebrating this beautiful beginning with the ones we love most."
          <br /><br />
          — With all our love, Ananya &amp; Arjun 💛
        </motion.p>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex justify-center gap-4 mb-10"
        >
          {SOCIAL.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              whileHover={{ scale: 1.2, y: -4 }}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center gap-1"
              style={{ textDecoration: 'none' }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                style={{
                  background: 'rgba(201,169,110,0.1)',
                  border: '1px solid rgba(201,169,110,0.25)',
                  transition: 'all 0.3s',
                }}
              >
                {s.icon}
              </div>
              <span
                className="text-xs"
                style={{ color: 'rgba(201,169,110,0.5)', fontFamily: 'Montserrat, sans-serif' }}
              >
                {s.label}
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* Navigation links */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10"
        >
          {[
            ['Our Story', '#love-story'],
            ['Events', '#events'],
            ['Countdown', '#countdown'],
            ['Venue', '#venue'],
            ['RSVP', '#rsvp'],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-xs tracking-wider uppercase transition-colors duration-200"
              style={{
                color: 'rgba(201,169,110,0.5)',
                fontFamily: 'Montserrat, sans-serif',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#C9A96E')}
              onMouseLeave={(e) => (e.target.style.color = 'rgba(201,169,110,0.5)')}
            >
              {label}
            </a>
          ))}
        </motion.nav>

        {/* Bottom divider */}
        <div
          className="w-full h-px mb-6"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.2), transparent)' }}
        />

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-xs"
          style={{ color: 'rgba(201,169,110,0.3)', fontFamily: 'Montserrat, sans-serif' }}
        >
          © 2027 Ananya &amp; Arjun Wedding. Made with 💛 &amp; a lot of love.
        </motion.p>
      </div>
    </footer>
  );
}
