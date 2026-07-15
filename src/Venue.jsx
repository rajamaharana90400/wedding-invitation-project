import { useRef, useState } from 'react';
import details from '../details.json';
import { motion, useInView } from 'framer-motion';
import SectionDecorations from './SectionDecorations';

const PIN_PATH =
  'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z';

function AnimatedPin() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      className="relative flex flex-col items-center"
    >
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
        <defs>
          <radialGradient id="pinGrad" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#E8D5A3" />
            <stop offset="100%" stopColor="#C9A96E" />
          </radialGradient>
          <filter id="pinGlow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path d={PIN_PATH} fill="url(#pinGrad)" filter="url(#pinGlow)" />
      </svg>
      {/* Shadow below pin */}
      <motion.div
        animate={{ scaleX: [1, 0.7, 1], opacity: [0.3, 0.15, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="rounded-full"
        style={{ width: 20, height: 6, background: 'rgba(201,169,110,0.5)', filter: 'blur(3px)' }}
      />
    </motion.div>
  );
}

export default function Venue() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [mapHovered, setMapHovered] = useState(false);

  return (
    <section
      ref={ref}
      className="relative px-4 md:px-8 overflow-hidden"
      id="venue"
      style={{
        paddingTop: '160px',
        paddingBottom: '128px',
        marginTop: '-80px',
        borderRadius: '50% 50% 0 0 / 80px 80px 0 0',
        position: 'relative',
        zIndex: 7,
      }}
    >
      {/* Responsive Background Image — mobile portrait / desktop landscape */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <picture>
          <source media="(min-width: 768px)" srcSet="/venue_bg_desktop.jpg" />
          <img
            src="/venue_bg_mobile.png"
            alt=""
            draggable={false}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          />
        </picture>
      </div>

      {/* Content wrapper — above the background image */}
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-label mb-4"
            style={{ color: '#000000', fontWeight: 700 }}
          >
            Where It All Happens
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif-wedding text-4xl md:text-6xl mb-4"
            style={{ color: '#3E1620', fontWeight: 400 }}
          >
            The Venue
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="gold-divider"
            style={{ background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)' }}
          />
        </div>

        {/* Content Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden cursor-pointer"
            style={{ height: 380, border: '1px solid rgba(201,169,110,0.3)' }}
            onMouseEnter={() => setMapHovered(true)}
            onMouseLeave={() => setMapHovered(false)}
          >
            <img
              src="/venue.jpg"
              alt={`${details.wedding.location.venue} venue`}
              className="w-full h-full object-cover"
              loading="lazy"
              style={{ filter: 'sepia(25%) saturate(85%) brightness(0.9)' }}
            />

            {/* Overlay tint */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                background: 'linear-gradient(180deg, rgba(62,22,32,0.2) 0%, rgba(62,22,32,0.05) 50%, rgba(62,22,32,0.3) 100%)',
                opacity: mapHovered ? 0.3 : 0.6,
              }}
            />

            {/* Animated Pin overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <AnimatedPin />
            </div>
          </motion.div>

          {/* Venue Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            {/* Venue Name */}
            <div>
              <div className="section-label mb-2" style={{ color: '#9A7A40' }}>Main Ceremony</div>
              <h3
                className="font-serif-wedding text-3xl md:text-4xl mb-2"
                style={{ color: '#3E1620', fontWeight: 500 }}
              >
                {details.wedding.location.venue}
              </h3>
              <div className="gold-divider mb-4" style={{ margin: '0', width: 60, background: 'linear-gradient(90deg, #C9A96E, transparent)' }} />
              <div
                className="inline-block rounded-2xl px-4 py-3 shadow-sm"
                style={{
                  background: 'rgba(255,255,255,0.42)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.35)',
                }}
              >
                <span
                  className="text-sm md:text-base font-semibold leading-relaxed block"
                  style={{ color: '#1F0D11', fontFamily: 'Montserrat, sans-serif', textShadow: '0 1px 2px rgba(255,255,255,0.4)' }}
                >
                  {details.wedding.venueDescription}
                </span>
              </div>
            </div>

            {/* Address Card */}
            <div
              className="rounded-3xl p-6 shadow-lg"
              style={{
                background: 'rgba(237, 71, 154, 0.18)',
                border: '1px solid rgba(0,0,0,0.08)',
                boxShadow: '0 18px 40px rgba(0, 0, 0, 0.08)',
              }}
            >
              <div className="flex items-start gap-3">
                <div>
                  <div
                    className="font-bold text-sm mb-1"
                    style={{ color: '#000000', fontFamily: 'Montserrat, sans-serif' }}
                  >
                    Address
                  </div>
                  <p
                    className="text-sm leading-relaxed font-semibold"
                    style={{ color: '#000000', fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {details.wedding.location.address.split(',').map((line, index) => (
                      <span key={index}>
                        {line.trim()}
                        {index < details.wedding.location.address.split(',').length - 1 ? <br /> : null}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>

            {/* Info chips */}
            <div className="flex flex-wrap gap-3 rounded-3xl p-4"
              style={{
                background: 'rgba(255,255,255,0.55)',
                border: '1px solid rgba(0,0,0,0.06)',
              }}>
              {[
                { text: details.wedding.date },
                { text: details.wedding.time + ' Onwards' },
                { text: 'Valet Parking Available' },
              ].map((chip) => (
                <div
                  key={chip.text}
                  className="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold"
                  style={{
                    background: '#ffffff',
                    border: '1px solid rgba(201,169,110,0.25)',
                    color: '#000000',
                    fontFamily: 'Montserrat, sans-serif',
                  }}
                >
                  <span>{chip.text}</span>
                </div>
              ))}
            </div>

            {/* Navigation Button */}
            <motion.a
              href="https://maps.google.com/?q=City+Palace+Udaipur+Rajasthan"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="magnetic-btn ripple-btn inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-medium self-start"
              style={{
                background: 'linear-gradient(135deg, #C9A96E, #9A7A40)',
                color: '#FBF7EE',
                fontFamily: 'Montserrat, sans-serif',
                boxShadow: '0 8px 24px rgba(201,169,110,0.3)',
                textDecoration: 'none',
              }}
            >
              <span>Get Directions</span>
              <span>→</span>
            </motion.a>
          </motion.div>
        </div>
      </div>{/* end content wrapper */}
    </section>
  );
}
