import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionDecorations from './SectionDecorations';

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

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex justify-center gap-6 mb-10"
        >
          {/* Instagram */}
          <motion.a
            href="#"
            aria-label="Instagram"
            whileHover={{ scale: 1.15, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-1.5"
            style={{ textDecoration: 'none' }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(139,26,48,0.06)',
                border: '1px solid rgba(139,26,48,0.2)',
                color: '#8B1A30',
                transition: 'all 0.3s',
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>
            <span
              className="text-[0.7rem] uppercase tracking-wider font-semibold"
              style={{ color: '#8B1A30', fontFamily: 'Montserrat, sans-serif' }}
            >
              Instagram
            </span>
          </motion.a>

          {/* Facebook */}
          <motion.a
            href="#"
            aria-label="Facebook"
            whileHover={{ scale: 1.15, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-1.5"
            style={{ textDecoration: 'none' }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(139,26,48,0.06)',
                border: '1px solid rgba(139,26,48,0.2)',
                color: '#8B1A30',
                transition: 'all 0.3s',
              }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.14H6v4h3.5v12h5v-12h3.64l.63-4z"></path>
              </svg>
            </div>
            <span
              className="text-[0.7rem] uppercase tracking-wider font-semibold"
              style={{ color: '#8B1A30', fontFamily: 'Montserrat, sans-serif' }}
            >
              Facebook
            </span>
          </motion.a>

          {/* WhatsApp */}
          <motion.a
            href="#"
            aria-label="WhatsApp"
            whileHover={{ scale: 1.15, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-1.5"
            style={{ textDecoration: 'none' }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(139,26,48,0.06)',
                border: '1px solid rgba(139,26,48,0.2)',
                color: '#8B1A30',
                transition: 'all 0.3s',
              }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.005 5.232 5.24 0 11.666 0c3.112.002 6.039 1.213 8.239 3.413 2.2 2.2 3.41 5.127 3.41 8.239 0 6.428-5.235 11.66-11.66 11.66-2.01-.002-3.99-.523-5.74-1.517L0 24zm6.402-3.896c1.616.96 3.2 1.47 4.887 1.47 5.164 0 9.36-4.197 9.36-9.36 0-5.163-4.195-9.36-9.36-9.36-5.165 0-9.36 4.197-9.36 9.36-.001 1.766.478 3.414 1.397 4.982L1.87 20.315l3.967-1.037.622.385z"></path>
              </svg>
            </div>
            <span
              className="text-[0.7rem] uppercase tracking-wider font-semibold"
              style={{ color: '#8B1A30', fontFamily: 'Montserrat, sans-serif' }}
            >
              WhatsApp
            </span>
          </motion.a>
        </motion.div>

        {/* Navigation links */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-5 md:gap-7 mb-10"
        >
          {[
            ['Events', '#events'],
            ['Countdown', '#countdown'],
            ['Venue', '#venue'],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-[0.82rem] md:text-[0.92rem] tracking-wider font-semibold uppercase transition-colors duration-200"
              style={{
                color: 'rgba(139, 26, 48, 0.7)',
                fontFamily: 'Montserrat, sans-serif',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#8B1A30')}
              onMouseLeave={(e) => (e.target.style.color = 'rgba(139, 26, 48, 0.7)')}
            >
              {label}
            </a>
          ))}
        </motion.nav>

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
          Crafted by Tekkzy — AI-Powered Intelligent Cloud Solutions
        </motion.p>
      </div>
    </footer>
  );
}
