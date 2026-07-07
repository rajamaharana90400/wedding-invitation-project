import { useEffect, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

// Ping-pong frame sequence: 1→2→3→4→5→4→3→2→(repeat)
const FRAMES = ['/11.png', '/22.png', '/33.png', '/44.png', '/55.png', '/44.png', '/33.png', '/22.png'];
const FRAME_INTERVAL = 120; // ms per frame

export default function FlyingParrot() {
  const { scrollYProgress } = useScroll();
  const [frameIndex, setFrameIndex] = useState(0);
  const [scaleXVal, setScaleXVal] = useState(-1); // -1 = face left, 1 = face right

  // Cycle through frames continuously for wing-flap animation
  useEffect(() => {
    const timer = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % FRAMES.length);
    }, FRAME_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  // Track scroll direction and update face direction accordingly
  useEffect(() => {
    let lastProgress = scrollYProgress.get();

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const delta = latest - lastProgress;
      const progress = latest;

      if (Math.abs(delta) < 0.0001) return; // ignore tiny jitters

      if (delta > 0) {
        // Scrolling DOWN: follow the S-path direction
        // 0→50% = moving right→left = face LEFT (-1)
        // 50→100% = moving left→right = face RIGHT (1)
        setScaleXVal(progress < 0.5 ? -1 : 1);
      } else {
        // Scrolling UP: reversed direction, so flip
        // 50→100% reversed = moving right→left = face LEFT (-1)
        // 0→50% reversed = moving left→right = face RIGHT (1)
        setScaleXVal(progress < 0.5 ? 1 : -1);
      }

      lastProgress = latest;
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  // S-path: starts off-screen right → left → right
  const left = useTransform(
    scrollYProgress,
    [0,      0.15,  0.5,  0.85,  1],
    ['110%', '75%', '2%', '65%', '110%']
  );

  const top = useTransform(
    scrollYProgress,
    [0, 1],
    ['5%', '85%']
  );

  // Gentle tilt following the S-curve
  const rotate = useTransform(
    scrollYProgress,
    [0,   0.15, 0.35,  0.5, 0.65, 0.85,  1],
    [-10,   -5,  -18,   -8,   12,    5, -10]
  );

  return (
    <motion.div
      className="pointer-events-none"
      style={{
        position: 'fixed',
        left,
        top,
        rotate,
        scaleX: scaleXVal,
        zIndex: 50,
        width: '160px',
        transition: 'scale 0.15s ease', // smooth flip
      }}
    >
      <img
        src={FRAMES[frameIndex]}
        alt="Flying Dove"
        style={{
          width: '100%',
          height: 'auto',
          filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.25))',
          display: 'block',
        }}
      />
    </motion.div>
  );
}
