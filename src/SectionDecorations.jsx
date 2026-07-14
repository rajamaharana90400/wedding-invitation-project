/**
 * SectionDecorations – decorative flower frame overlay.
 * Place as the FIRST child inside any relative + overflow-hidden section.
 * The overlay uses a soft multiply blend so the floral artwork appears
 * behind the content without overpowering it.
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
      }}
    >
      <picture>
        <source media="(min-width: 768px)" srcSet="/desktop.png" />
        <img
          src="/backside.png"
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: 0.95,
            mixBlendMode: 'multiply',
            userSelect: 'none',
            pointerEvents: 'none',
            display: 'block',
            transform: 'none',
            transition: 'none',
          }}
          draggable={false}
        />
      </picture>
    </div>
  );
}
