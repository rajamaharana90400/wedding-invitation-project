import { useEffect, useRef, useState, memo } from 'react';

/* ── Petal SVG paths ───────────────────────────────────── */
const PETALS = [
  'M10,0 C15,5 20,15 10,20 C0,15 5,5 10,0 Z',
  'M8,0 C14,4 18,14 8,20 C-2,14 2,4 8,0 Z',
  'M12,0 C18,6 16,16 8,20 C0,16 2,6 12,0 Z',
];
const PETAL_COLORS = ['#FADADD', '#F2C4CE', '#FFB6C1', '#FFC0CB', '#E8A0B0', '#f9d5e0'];

/* ── Butterfly Wing SVG ────────────────────────────────── */
function ButterflyWing({ color, flip }) {
  return (
    <svg
      width="28"
      height="20"
      viewBox="0 0 28 20"
      style={{
        transform: flip ? 'scaleX(-1)' : 'scaleX(1)',
        animation: 'wingFlap 0.35s ease-in-out infinite',
        transformOrigin: flip ? 'right center' : 'left center',
        display: 'block',
      }}
    >
      <ellipse cx="14" cy="10" rx="12" ry="8" fill={color} opacity="0.8" />
      <ellipse cx="14" cy="10" rx="8" ry="5" fill={color} opacity="0.5" />
    </svg>
  );
}

/* ── Sparkle dot ───────────────────────────────────────── */
function Sparkle({ style }) {
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: 'radial-gradient(circle, #E8D5A3 0%, #C9A96E 60%, transparent 100%)',
        animation: 'sparkle 2.5s ease-in-out infinite',
        pointerEvents: 'none',
        zIndex: 1,
        ...style,
      }}
    />
  );
}

/* ── Heart ─────────────────────────────────────────────── */
function FloatingHeart({ style }) {
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        fontSize: '10px',
        color: '#F2C4CE',
        animation: 'heartFloat 4s ease-in-out infinite',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.4,
        ...style,
      }}
    >
      ♥
    </div>
  );
}

/* ── Canvas-based petals ────────────────────────────────── */
function PetalCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const petalsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const spawn = () => ({
      x: Math.random() * canvas.width,
      y: -20,
      size: Math.random() * 10 + 6,
      speed: Math.random() * 1.2 + 0.4,
      drift: Math.random() * 1.5 - 0.75,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.04,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      opacity: Math.random() * 0.5 + 0.3,
    });

    // Seed initial petals spread out vertically
    for (let i = 0; i < 28; i++) {
      const p = spawn();
      p.y = Math.random() * canvas.height;
      petalsRef.current.push(p);
    }

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Occasionally spawn new petals
      if (Math.random() < 0.15) petalsRef.current.push(spawn());

      petalsRef.current = petalsRef.current.filter((p) => {
        p.y += p.speed;
        p.x += p.drift;
        p.angle += p.spin;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();

        return p.y < canvas.height + 30;
      });

      animRef.current = requestAnimationFrame(tick);
    };

    tick();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden
    />
  );
}

/* ── Main component ─────────────────────────────────────── */
function BackgroundEffects() {
  const [butterflies, setButterflies] = useState([
    { id: 1, x: 5, y: 15, angle: 0, color: '#F2C4CE', duration: '12s' },
    { id: 2, x: 25, y: 35, angle: 15, color: '#E8D5A3', duration: '14s' },
    { id: 3, x: 45, y: 55, angle: -10, color: '#c9a8e8', duration: '10s' },
    { id: 4, x: 65, y: 75, angle: 25, color: '#FADADD', duration: '16s' },
  ]);

  useEffect(() => {
    const updatePositions = () => {
      setButterflies((prev) =>
        prev.map((b) => {
          const nextX = Math.random() * 90 + 5; // 5% to 95%
          const nextY = Math.random() * 80 + 10; // 10% to 90%

          // Calculate angle relative to previous position
          const dx = nextX - b.x;
          const dy = nextY - b.y;
          // Math.atan2 gives radians, convert to degrees
          let angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;

          // Normalize angle to avoid sharp spins
          if (angleDeg - b.angle > 180) angleDeg -= 360;
          if (b.angle - angleDeg > 180) angleDeg += 360;

          return {
            ...b,
            x: nextX,
            y: nextY,
            angle: angleDeg,
          };
        })
      );
    };

    // Initial movement
    const initialTimeout = setTimeout(updatePositions, 1000);

    // Update positions every 10 seconds
    const interval = setInterval(updatePositions, 10000);
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const sparkles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 95}%`,
    left: `${Math.random() * 98}%`,
    delay: `${(i * 0.4).toFixed(1)}s`,
    duration: `${2 + (i % 3)}s`,
  }));

  const hearts = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    top: `${20 + i * 12}%`,
    right: `${3 + i * 8}%`,
    delay: `${i * 0.8}s`,
    duration: `${4 + i}s`,
  }));

  return (
    <div className="background-effects" aria-hidden>
      <>
        <PetalCanvas />

        {/* Butterflies */}
        {butterflies.map((b) => (
          <div
            key={b.id}
            aria-hidden
            style={{
              position: 'fixed',
              left: `${b.x}vw`,
              top: `${b.y}vh`,
              transform: `translate(-50%, -50%) rotate(${b.angle}deg)`,
              transition: 'left 10s ease-in-out, top 10s ease-in-out, transform 4s ease-in-out',
              pointerEvents: 'none',
              zIndex: 40,
              opacity: 0.8,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ButterflyWing color={b.color} flip={false} />
            <ButterflyWing color={b.color} flip />
          </div>
        ))}

        {/* Sparkles */}
        {sparkles.map((s) => (
          <Sparkle
            key={s.id}
            style={{
              top: s.top,
              left: s.left,
              animationDelay: s.delay,
              animationDuration: s.duration,
            }}
          />
        ))}

        {/* Hearts */}
        {hearts.map((h) => (
          <FloatingHeart
            key={h.id}
            style={{
              top: h.top,
              right: h.right,
              animationDelay: h.delay,
              animationDuration: h.duration,
            }}
          />
        ))}
      </>
    </div>
  );
}

export default memo(BackgroundEffects);
