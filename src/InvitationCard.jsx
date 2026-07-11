import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import SectionDecorations from './SectionDecorations';

export default function InvitationCard() {
  const containerRef = useRef(null);

  // Track scroll progress relative to the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 95%', 'end 60%'],
  });

  // Smooth spring for buttery feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001,
  });

  // ── Card frame animation ──
  const frameOpacity = useTransform(smoothProgress, [0, 0.25], [0, 1]);
  const frameY      = useTransform(smoothProgress, [0, 0.25], [100, 0]);
  const frameScale  = useTransform(smoothProgress, [0, 0.25], [0.88, 1]);

  // ── Section heading ──
  const headingOpacity = useTransform(smoothProgress, [0, 0.18], [0, 1]);
  const headingY       = useTransform(smoothProgress, [0, 0.18], [50, 0]);

  // ── Text blocks – each staggered ──
  const mkBlock = (start) => ({
    opacity: useTransform(smoothProgress, [start, start + 0.12], [0, 1]),
    y:       useTransform(smoothProgress, [start, start + 0.12], [40, 0]),
  });

  const t0 = mkBlock(0.22); // Ganesha
  const t1 = mkBlock(0.30); // Header titles
  const t2 = mkBlock(0.38); // Couple names
  const t3 = mkBlock(0.44); // Divider
  const t4 = mkBlock(0.50); // Date
  const t5 = mkBlock(0.57); // Divider 2
  const t6 = mkBlock(0.63); // Venue
  const t7 = mkBlock(0.70); // Invited by

  return (
    <section
      ref={containerRef}
      className="relative px-4 md:px-8 section-bg-light flex flex-col items-center justify-center min-h-screen"
      id="invitation"
      style={{ paddingTop: '6rem', paddingBottom: '8rem' }}
    >
      <SectionDecorations />

      <div className="max-w-5xl w-full mx-auto relative z-10 flex flex-col items-center">

        {/* ── Section heading ── */}
        <motion.div
          style={{ opacity: headingOpacity, y: headingY }}
          className="text-center mb-10"
        >
          <div className="section-label mb-2" style={{ color: '#9A7A40', letterSpacing: '0.18em' }}>
            Join Us
          </div>
          <h2 className="font-serif-wedding text-4xl md:text-5xl" style={{ color: '#3E1620' }}>
            You Are Invited
          </h2>
          <div
            className="gold-divider mt-4"
            style={{ width: '80px', height: '2px', background: 'linear-gradient(90deg,transparent,#C9A96E,transparent)', margin: '12px auto 0' }}
          />
        </motion.div>

        {/* ── Invitation card with frame ── */}
        <motion.div
          style={{
            opacity: frameOpacity,
            y: frameY,
            scale: frameScale,
            maxWidth: '420px',
          }}
          className="relative w-full"
        >
          {/* Frame image */}
          <img
            src="/invitation_frame.png"
            alt="Invitation Frame"
            className="w-full h-auto block"
            draggable={false}
            style={{ pointerEvents: 'none', userSelect: 'none', filter: 'drop-shadow(0 24px 48px rgba(62,22,32,0.18))' }}
          />

          {/* Overlay text inside the blank white space */}
          <div
            className="absolute flex flex-col items-center justify-start"
            style={{
              top: '22%',
              left: '16%',
              right: '16%',
              bottom: '13%',
              overflow: 'hidden',
              gap: '0',
            }}
          >

            {/* Ganesha icon */}
            <motion.div style={{ opacity: t0.opacity, y: t0.y }} className="text-center mb-1">
              <svg viewBox="0 0 60 60" width="40" height="40" style={{ margin: '0 auto', display: 'block' }}>
                <ellipse cx="30" cy="30" rx="27" ry="27" fill="none" stroke="#C9A96E" strokeWidth="1.2" />
                <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fontSize="26" fill="#C9A96E">🕉</text>
              </svg>
            </motion.div>

            {/* Maharana's — Wedding Invitation */}
            <motion.div style={{ opacity: t1.opacity, y: t1.y }} className="text-center">
              <p style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: 'clamp(0.85rem, 2.8vw, 1.15rem)',
                color: '#9A7A40',
                lineHeight: 1.1,
                marginBottom: '1px',
              }}>
                Maharana's
              </p>
              <p style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: 'clamp(1.1rem, 3.6vw, 1.5rem)',
                color: '#7B2D8B',
                lineHeight: 1,
                marginBottom: '6px',
              }}>
                Wedding Invitation
              </p>
            </motion.div>

            {/* Couple names */}
            <motion.div style={{ opacity: t2.opacity, y: t2.y }} className="text-center">
              <p style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: 'clamp(1rem, 3.2vw, 1.4rem)',
                color: '#3E1620',
                lineHeight: 1.2,
                marginBottom: '3px',
              }}>
                Ananya &amp; Arjun
              </p>
              <p style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 'clamp(0.48rem, 1.4vw, 0.65rem)',
                color: '#666',
                letterSpacing: '0.04em',
                marginBottom: '8px',
              }}>
                are inviting for their wedding ceremony
              </p>
            </motion.div>

            {/* Gold line */}
            <motion.div style={{ opacity: t3.opacity, y: t3.y }}>
              <div style={{ width: '55px', height: '1px', background: 'linear-gradient(90deg,transparent,#C9A96E,transparent)', margin: '0 auto 8px' }} />
            </motion.div>

            {/* Date block */}
            <motion.div style={{ opacity: t4.opacity, y: t4.y }} className="text-center">
              <p style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(0.52rem, 1.6vw, 0.72rem)',
                letterSpacing: '0.14em',
                color: '#3E1620',
                marginBottom: '3px',
              }}>FEBRUARY</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '3px' }}>
                <span style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: 'clamp(0.42rem, 1.2vw, 0.58rem)',
                  color: '#999',
                  letterSpacing: '0.06em',
                  borderRight: '1px solid #e0c8c8',
                  paddingRight: '7px',
                }}>SATURDAY</span>
                <span style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: 'clamp(1.4rem, 4.5vw, 2rem)',
                  color: '#3E1620',
                  lineHeight: 1,
                }}>14</span>
                <span style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: 'clamp(0.42rem, 1.2vw, 0.58rem)',
                  color: '#999',
                  letterSpacing: '0.06em',
                  borderLeft: '1px solid #e0c8c8',
                  paddingLeft: '7px',
                }}>8:00 A.M.</span>
              </div>
              <p style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 600,
                fontSize: 'clamp(0.52rem, 1.6vw, 0.72rem)',
                color: '#3E1620',
              }}>2027</p>
            </motion.div>

            {/* Gold line 2 */}
            <motion.div style={{ opacity: t5.opacity, y: t5.y }}>
              <div style={{ width: '55px', height: '1px', background: 'linear-gradient(90deg,transparent,#C9A96E,transparent)', margin: '8px auto' }} />
            </motion.div>

            {/* Venue */}
            <motion.div style={{ opacity: t6.opacity, y: t6.y }} className="text-center">
              <p style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(0.48rem, 1.4vw, 0.65rem)',
                color: '#7B2D8B',
                letterSpacing: '0.08em',
                marginBottom: '2px',
              }}>Venue :-</p>
              <p style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 'clamp(0.42rem, 1.3vw, 0.6rem)',
                color: '#555',
                lineHeight: 1.5,
                marginBottom: '6px',
              }}>Udaipur, Rajasthan</p>
            </motion.div>

            {/* Invited by */}
            <motion.div style={{ opacity: t7.opacity, y: t7.y }} className="text-center">
              <p style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(0.48rem, 1.4vw, 0.65rem)',
                color: '#000000',
                letterSpacing: '0.08em',
                marginBottom: '2px',
              }}>Invited by :-</p>
              <p style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 'clamp(0.42rem, 1.3vw, 0.6rem)',
                color: '#000000',
              }}>Sri &amp; Smt. Maharana Family</p>
            </motion.div>

          </div>
        </motion.div>
      </div>

      {/* Curved Divider at the bottom removed to allow seamless cherry blossom flow */}
    </section>
  );
}
