import { useEffect, useRef, useState, useCallback } from 'react';
import SectionDecorations from './SectionDecorations';

/* ── Helper ──────────────────────────────────────────────── */
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

const DATE_PARTS = [
  { id: 'day',   label: 'Day',   value: '14',       sub: 'Saturday' },
  { id: 'month', label: 'Month', value: 'February', sub: '2nd Month' },
  { id: 'year',  label: 'Year',  value: '2027',     sub: 'A New Beginning' },
];

/* ── Single scratch card ─────────────────────────────────── */
function ScratchCard({ part, revealed, onReveal }) {
  const canvasRef = useRef(null);
  const ctxRef    = useRef(null);
  const downRef   = useRef(false);
  const [particles, setParticles] = useState([]);

  /* Init / reset canvas when revealed changes */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;

    const dpr = window.devicePixelRatio || 1;
    const w   = canvas.offsetWidth;
    const h   = canvas.offsetHeight;

    canvas.width  = w * dpr;
    canvas.height = h * dpr;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    /* Gold gradient scratch layer */
    const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.8);
    grad.addColorStop(0,   '#FFE082');
    grad.addColorStop(0.5, '#C9A96E');
    grad.addColorStop(1,   '#9A7A40');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    ctx.globalCompositeOperation = 'destination-out';
    ctxRef.current = ctx;
  }, [revealed]);

  /* Spawn particles when card is revealed */
  useEffect(() => {
    if (revealed) {
      const newParticles = [];
      const count = 16;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
        const distance = 50 + Math.random() * 80;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        const scale = 0.6 + Math.random() * 0.8;
        const rot = (Math.random() - 0.5) * 720;
        // Spreads gold stars and sparkles
        const char = Math.random() > 0.5 ? '✨' : '⭐';
        const delay = Math.random() * 0.1;
        newParticles.push({ id: i, tx, ty, scale, rot, char, delay });
      }
      setParticles(newParticles);
    }
  }, [revealed]);

  /* Scratch helper */
  const scratchAt = useCallback((x, y) => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    ctx.beginPath();
    ctx.arc(x, y, 32, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  /* Get canvas-relative coords for both mouse and touch */
  const getXY = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect   = canvas.getBoundingClientRect();
    const source = e.touches ? e.touches[0] : e;
    return {
      x: clamp(source.clientX - rect.left, 0, rect.width),
      y: clamp(source.clientY - rect.top,  0, rect.height),
    };
  }, []);

  /* Check how much is scratched */
  const checkReveal = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx    = ctxRef.current;
    if (!canvas || !ctx) return;
    const { width, height } = canvas;
    const data  = ctx.getImageData(0, 0, width, height).data;
    let clear   = 0;
    for (let i = 3; i < data.length; i += 4) if (data[i] === 0) clear++;
    if (clear / (data.length / 4) > 0.35) onReveal();
  }, [onReveal]);

  const onDown = useCallback((e) => {
    if (revealed) return;
    downRef.current = true;
    const pt = getXY(e);
    if (pt) scratchAt(pt.x, pt.y);
  }, [revealed, getXY, scratchAt]);

  const onMove = useCallback((e) => {
    if (!downRef.current || revealed) return;
    e.preventDefault();
    const pt = getXY(e);
    if (pt) scratchAt(pt.x, pt.y);
  }, [revealed, getXY, scratchAt]);

  const onUp = useCallback(() => {
    if (!downRef.current) return;
    downRef.current = false;
    requestAnimationFrame(checkReveal);
  }, [checkReveal]);

  return (
    <div className="flex flex-col items-center gap-3 select-none">

      {/* Label above card */}
      <div
        style={{
          fontSize: '0.65rem',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: '#9A7A40',
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 600,
        }}
      >
        {part.label}
      </div>

      {/* Card */}
      <div
        style={{
          position: 'relative',
          width: 140,
          height: 140,
          borderRadius: '50%',
          overflow: 'visible', // Allow particles to spread outside card borders
          boxShadow: revealed
            ? '0 0 24px rgba(201,169,110,0.4), 0 8px 32px rgba(0,0,0,0.25)'
            : '0 8px 32px rgba(0,0,0,0.35)',
          border: '2px solid rgba(201,169,110,0.5)',
          background: '#fff6f6',
          cursor: revealed ? 'default' : 'crosshair',
          transition: 'box-shadow 0.4s',
        }}
      >
        {/* Revealed date value (always underneath) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #fff6f6 0%, #ffeef0 100%)',
            padding: 8,
            borderRadius: '50%',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: part.id === 'month' ? '1.4rem' : '2.5rem',
              fontWeight: 600,
              color: '#8B1A30',
              lineHeight: 1.1,
              textAlign: 'center',
            }}
          >
            {part.value}
          </div>
          <div
            style={{
              fontSize: '0.62rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#c0152a',
              marginTop: 6,
              fontFamily: 'Montserrat, sans-serif',
              opacity: 0.7,
            }}
          >
            {part.sub}
          </div>
        </div>

        {/* Scratch canvas layer */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: revealed ? 0 : 1,
            transition: 'opacity 0.6s ease',
            pointerEvents: revealed ? 'none' : 'auto',
            touchAction: 'none',
            borderRadius: '50%',
            zIndex: 10,
          }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerLeave={onUp}
          aria-label={`Scratch to reveal the ${part.label}`}
        />

        {/* "Scratch here" hint — visible before scratching */}
        {!revealed && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              gap: 4,
              zIndex: 20,
            }}
          >
            <div
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#3E1620',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 600,
                textAlign: 'center',
                padding: '0 8px',
              }}
            >
              Scratch to Reveal
            </div>
          </div>
        )}

        {/* Particle Burst of Stars and Loves */}
        {revealed && particles.map((p) => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              fontSize: '1.4rem',
              zIndex: 50,
              '--tx': `${p.tx}px`,
              '--ty': `${p.ty}px`,
              '--scale': p.scale,
              '--rot': `${p.rot}deg`,
              animation: `burstOut 1.2s cubic-bezier(0.1, 0.8, 0.3, 1) ${p.delay}s forwards`,
            }}
          >
            {p.char}
          </div>
        ))}
      </div>

      {/* Status text */}
      <div
        style={{
          fontSize: '0.85rem',
          letterSpacing: '0.1em',
          color: revealed ? '#c0152a' : '#000000',
          fontFamily: 'Montserrat, sans-serif',
          transition: 'color 0.4s',
          fontWeight: revealed ? 600 : 500,
        }}
      >
        {revealed ? '✓ Revealed!' : 'Scratch gently...'}
      </div>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────── */
export default function ScratchReveal() {
  const [revealed, setRevealed] = useState({ day: false, month: false, year: false });
  const allRevealed = Object.values(revealed).every(Boolean);

  return (
    <section
      style={{
        background: 'linear-gradient(160deg, #FFF0F2 0%, #FFD6E0 50%, #FFBBD0 100%)',
        padding: '80px 24px 110px 24px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden',
      }}
    >
      <SectionDecorations />
      {/* Inline styles for keyframe animations */}
      <style>{`
        @keyframes burstOut {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) scale(0.2) rotate(0deg);
            opacity: 1;
          }
          70% {
            opacity: 0.9;
          }
          100% {
            transform: translate(-50%, -50%) translate(var(--tx), var(--ty)) scale(var(--scale)) rotate(var(--rot));
            opacity: 0;
          }
        }
      `}</style>

      {/* Content wrapper — positioned above the decoration image */}
      <div style={{ position: 'relative', zIndex: 1 }}>

      {/* Section heading */}
      <div
        style={{
          fontSize: '0.72rem',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: '#9b111e',
          fontFamily: 'Montserrat, sans-serif',
          marginBottom: 12,
          fontWeight: 600,
        }}
      >
        Save the Date
      </div>
      <h2
        style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(1.8rem, 5vw, 3rem)',
          fontWeight: 400,
          color: '#3E1620',
          margin: '0 0 6px',
          lineHeight: 1.15,
        }}
      >
        Scratch to Reveal the Date
      </h2>
      <p
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: 'clamp(0.95rem, 3vw, 1.15rem)',
          color: 'rgba(155,17,30,0.85)',
          marginBottom: 48,
          letterSpacing: '0.05em',
        }}
      >
        Each heart holds a secret — scratch all three to uncover your wedding date.
      </p>

      {/* Three scratch cards */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(20px, 5vw, 48px)',
          flexWrap: 'wrap',
          maxWidth: 600,
          margin: '0 auto 48px',
        }}
      >
        {DATE_PARTS.map((part) => (
          <ScratchCard
            key={part.id}
            part={part}
            revealed={revealed[part.id]}
            onReveal={() => setRevealed((prev) => ({ ...prev, [part.id]: true }))}
          />
        ))}
      </div>

      {/* Full date reveal after all three are scratched */}
      <div
        style={{
          maxWidth: 480,
          margin: '0 auto',
          borderRadius: 20,
          padding: '24px 32px',
          background: allRevealed ? 'rgba(192,21,42,0.06)' : 'transparent',
          border: allRevealed ? '1px solid rgba(192,21,42,0.2)' : '1px solid transparent',
          transition: 'all 0.6s ease',
        }}
      >
        {allRevealed ? (
          <div style={{ animation: 'fadeInUp 0.7s ease forwards' }}>
            <div
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(1.3rem, 4vw, 2rem)',
                fontWeight: 500,
                color: '#8B1A30',
                lineHeight: 1.3,
              }}
            >
              Saturday · 14 February 2027
            </div>
            <div
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.78rem',
                color: 'rgba(139,26,48,0.6)',
                marginTop: 6,
                letterSpacing: '0.1em',
              }}
            >
              The Rose Garden Estate · Udaipur, Rajasthan
            </div>
            <div
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.72rem',
                color: 'rgba(139,26,48,0.45)',
                marginTop: 10,
                letterSpacing: '0.05em',
              }}
            >
              Scroll down to explore the full invitation ↓
            </div>
          </div>
        ) : (
          <div
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.78rem',
              color: 'rgba(139,26,48,0.4)',
              letterSpacing: '0.08em',
            }}
          >
            {Object.values(revealed).filter(Boolean).length} of 3 revealed...
          </div>
        )}
      </div>

      </div>{/* end content wrapper */}
    </section>
  );
}
