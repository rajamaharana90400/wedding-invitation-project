import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function InvitationCard() {
  const containerRef = useRef(null);

  // Set up scroll tracking for this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  // Map scroll progress to opacity and y-translation
  // As the user scrolls down and the section enters the screen, opacity goes from 0 to 1, and y goes from 100 to 0
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  return (
    <section 
      ref={containerRef}
      className="relative py-32 px-4 md:px-8 section-bg-light flex flex-col items-center justify-center min-h-[80vh]"
      id="invitation"
    >
      {/* Background with couple image and low opacity */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop')",
          opacity: 0.15,
        }}
      />
      {/* Gradient overlay to blend it with the site background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#3E1620]/20 to-[#3E1620]/50 pointer-events-none" />

      <div className="max-w-4xl w-full mx-auto relative z-10 flex flex-col items-center">
        
        <motion.div
          style={{ opacity, y }}
          className="text-center mb-12"
        >
          <div className="section-label mb-3" style={{ color: '#9A7A40' }}>
            Join Us
          </div>
          <h2 className="font-serif-wedding text-4xl md:text-5xl" style={{ color: '#3E1620' }}>
            You Are Invited
          </h2>
          <div className="gold-divider mx-auto mt-4" style={{ width: '80px', marginLeft: 'auto', marginRight: 'auto' }} />
        </motion.div>

        {/* The invitation card without a box, smoothly animating in based on scroll */}
        <motion.div
          style={{ opacity, y, scale }}
          className="w-full max-w-2xl"
        >
          <img 
            src="/Maharana_s.png" 
            alt="Wedding Invitation Card" 
            className="w-full h-auto object-cover drop-shadow-2xl rounded-sm"
          />
        </motion.div>
      </div>
    </section>
  );
}
