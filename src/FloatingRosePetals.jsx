import React from 'react';
import { motion } from 'framer-motion';

const NUM_PETALS = 25; // Enough to make it look crowded

export default function FloatingRosePetals() {
  // Generate random properties for each petal once
  const petals = React.useMemo(() => {
    return Array.from({ length: NUM_PETALS }).map((_, i) => {
      // 50% chance to start from left or right side
      const isLeft = Math.random() > 0.5;

      // Start outside the screen on the sides, randomly distributed vertically
      const startX = isLeft ? -5 - Math.random() * 10 : 105 + Math.random() * 10;
      const endX = startX + (isLeft ? 1 : -1) * (20 + Math.random() * 80);

      const startY = -10 + Math.random() * 110;
      const endY = startY + 20 + Math.random() * 40; // float downwards slightly

      const size = 20 + Math.random() * 40; // mix of small and big (20px to 60px)
      const duration = 12 + Math.random() * 18; // Slow, gentle floating
      const delay = Math.random() * -20; // Negative delay so they are already on screen when loaded

      const rotationStart = Math.random() * 360;
      const rotationEnd = rotationStart + 360 * (Math.random() > 0.5 ? 1 : -1);

      const opacity = 0.3 + Math.random() * 0.5; // low opacity (0.3 to 0.8)

      return {
        id: i,
        startX, endX, startY, endY, size, duration, delay, rotationStart, rotationEnd, opacity
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 floating-petals">
      {petals.map(p => (
        <motion.img
          key={p.id}
          src="/pink_rose.png"
          alt="rose petal"
          style={{
            position: 'absolute',
            width: p.size,
            height: 'auto',
            opacity: p.opacity,
            left: `${p.startX}%`,
            top: `${p.startY}%`,
            transformOrigin: 'center center',
          }}
          animate={{
            left: [`${p.startX}%`, `${p.endX}%`],
            top: [`${p.startY}%`, `${p.endY}%`],
            rotate: [p.rotationStart, p.rotationEnd],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
