/**
 * SectionDecorations – Cherry blossom frame overlay using backside.png.
 * Place as the FIRST child inside any relative + overflow-hidden section.
 * Uses mix-blend-mode: multiply so white areas become transparent,
 * and z-index is not set so content renders on top via DOM order.
 */
export default function SectionDecorations() {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        /* No zIndex — follows natural DOM paint order so content renders on top */
      }}
    >
      {/* Cherry blossom frame — covers the entire section */}
      <img
        src="/backside.png"
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'fill',        /* stretch to fill full section size */
          objectPosition: 'center',
          opacity: 0.85,
          mixBlendMode: 'multiply', /* white areas become transparent, pink stays */
          userSelect: 'none',
          pointerEvents: 'none',
          display: 'block',
        }}
        draggable={false}
      />
    </div>
  );
}
