import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionDecorations from './SectionDecorations';

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
      className="relative px-4 md:px-8 text-center overflow-hidden section-bg-light"
      style={{
        paddingTop: '140px',
        paddingBottom: '40px',
        marginTop: '-80px',
        borderRadius: '50% 50% 0 0 / 80px 80px 0 0',
        position: 'relative',
        zIndex: 8,
      }}
    >
      <SectionDecorations />

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
          style={{ color: '#8B1A30', fontWeight: 400 }}
        >
          Ananya <span style={{ color: '#C9A96E' }}>&amp;</span> Arjun
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="section-label mb-6 font-bold text-black"
          style={{ color: '#000' }}
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
          className="leading-relaxed mb-8 italic"
          style={{
            color: '#3E1620',
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(1.2rem, 3.8vw, 1.5rem)',
            fontWeight: 500,
          }}
        >
          "Thank you for being part of our journey. Your presence at our wedding means the world to us.
          We look forward to celebrating this beautiful beginning with the ones we love most."
          <br /><br />
          — With all our love, Ananya &amp; Arjun 💛
        </motion.p>

        {/* Bottom divider */}
        <div
          className="w-full h-px mb-6"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(139, 26, 48, 0.15), transparent)' }}
        />

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-[0.82rem] md:text-[0.92rem] font-medium"
          style={{ color: 'rgba(92, 32, 48, 0.8)', fontFamily: 'Montserrat, sans-serif' }}
        >
          <a
            href="https://tekkzy.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#000',
              textDecoration: 'underline',
              fontWeight: 600,
            }}
          >
            Crafted by Tekkzy
          </a>
          {' '}— AI-Powered Intelligent Cloud Solutions
        </motion.p>
      </div>
    </footer>
  );
}
