import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const events = [
  {
    id: 'mehendi',
    name: 'Mehendi',
    icon: '🌿',
    date: 'February 11, 2027',
    time: '4:00 PM – 9:00 PM',
    venue: 'The Bougainvillea Garden, Udaipur',
    desc: 'An evening of laughter, henna, music, and vibrant colors as the bride\'s hands bloom into art.',
    color: 'from-green-900/40 to-emerald-900/30',
    border: '#6ee7b7',
  },
  {
    id: 'haldi',
    name: 'Haldi',
    icon: '🌼',
    date: 'February 12, 2027',
    time: '10:00 AM – 1:00 PM',
    venue: 'The Family Courtyard, Udaipur',
    desc: 'A sacred golden ritual — turmeric blessings poured with love, laughter, and pure happiness.',
    color: 'from-yellow-900/40 to-amber-900/30',
    border: '#fbbf24',
  },
  {
    id: 'sangeet',
    name: 'Sangeet',
    icon: '🎵',
    date: 'February 12, 2027',
    time: '7:00 PM – 11:30 PM',
    venue: 'The Lakeside Amphitheatre, Udaipur',
    desc: 'Dance, music, and celebration under the stars. A night where two families become one through rhythm.',
    color: 'from-purple-900/40 to-violet-900/30',
    border: '#c084fc',
  },
  {
    id: 'wedding',
    name: 'Wedding Ceremony',
    icon: '💍',
    date: 'February 14, 2027',
    time: '10:00 AM',
    venue: 'The Rose Garden Estate, Udaipur',
    desc: 'The sacred union of two souls. Seven vows, seven steps, and a lifetime of love begins today.',
    color: 'from-rose-900/40 to-pink-900/30',
    border: '#f43f5e',
  },
  {
    id: 'reception',
    name: 'Reception',
    icon: '🥂',
    date: 'February 14, 2027',
    time: '6:30 PM – 11:00 PM',
    venue: 'The Grand Ballroom, Palace Hotel, Udaipur',
    desc: 'An elegant evening to celebrate the newlyweds with champagne, fine dining, and joyful company.',
    color: 'from-sky-900/40 to-blue-900/30',
    border: '#60a5fa',
  },
];

function EventCard({ ev, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`relative rounded-2xl p-6 md:p-8 overflow-hidden cursor-default magnetic-btn`}
      style={{
        background: `linear-gradient(135deg, rgba(62,22,32,0.85) 0%, rgba(92,32,48,0.7) 100%)`,
        border: `1px solid ${ev.border}30`,
        boxShadow: `0 4px 30px rgba(0,0,0,0.3), 0 0 0 1px ${ev.border}10`,
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Gradient bg overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${ev.color} pointer-events-none`}
      />
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${ev.border}15 0%, transparent 70%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div
          className="text-4xl mb-4 w-14 h-14 flex items-center justify-center rounded-full"
          style={{
            background: `${ev.border}20`,
            border: `1px solid ${ev.border}40`,
            animation: `floatY ${4 + index * 0.5}s ease-in-out ${index * 0.3}s infinite`,
          }}
        >
          {ev.icon}
        </div>

        <h3
          className="font-serif-wedding text-2xl md:text-3xl mb-1"
          style={{ color: '#FBF7EE', fontWeight: 500 }}
        >
          {ev.name}
        </h3>
        <div className="gold-divider mb-4" style={{ marginLeft: 0, width: 48 }} />

        <p
          className="text-sm leading-relaxed mb-5"
          style={{ color: 'rgba(251,247,238,0.6)', fontFamily: 'Montserrat, sans-serif' }}
        >
          {ev.desc}
        </p>

        {/* Meta */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs" style={{ color: ev.border }}>
            <span>📅</span>
            <span className="font-medium">{ev.date}</span>
          </div>
          <div className="flex items-center gap-2 text-xs" style={{ color: ev.border }}>
            <span>🕐</span>
            <span>{ev.time}</span>
          </div>
          <div className="flex items-center gap-2 text-xs" style={{ color: 'rgba(251,247,238,0.5)' }}>
            <span>📍</span>
            <span>{ev.venue}</span>
          </div>
        </div>

        {/* Hover underline */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 w-0"
          whileHover={{ width: '100%' }}
          transition={{ duration: 0.4 }}
          style={{ background: `linear-gradient(90deg, transparent, ${ev.border}, transparent)` }}
        />
      </div>
    </motion.div>
  );
}

export default function WeddingEvents() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative py-24 px-4 md:px-8 section-bg-light overflow-hidden"
      id="events"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 30% at 50% -10%, rgba(201,169,110,0.08) 0%, transparent 50%),
            radial-gradient(ellipse 40% 40% at 10% 80%, rgba(242,196,206,0.06) 0%, transparent 50%)
          `,
        }}
      />

      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-label mb-4"
          style={{ color: '#9A7A40' }}
        >
          Celebrations Await
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif-wedding text-4xl md:text-6xl mb-4"
          style={{ color: '#3E1620', fontWeight: 400 }}
        >
          Wedding Events
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="gold-divider"
          style={{
            background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)',
          }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-6 text-sm md:text-base max-w-lg mx-auto"
          style={{ color: '#5C3040', fontFamily: 'Montserrat, sans-serif' }}
        >
          Five ceremonies, five celebrations, one unforgettable week.
          Join us for every magical moment.
        </motion.p>
      </div>

      {/* Cards Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((ev, i) => (
          <EventCard key={ev.id} ev={ev} index={i} />
        ))}
      </div>

      {/* Decorative floating elements */}
      <div
        className="absolute bottom-10 right-8 text-5xl pointer-events-none opacity-20"
        style={{ animation: 'floatY 7s ease-in-out 1s infinite' }}
      >
        🦚
      </div>
      <div
        className="absolute top-20 left-6 text-6xl pointer-events-none opacity-20"
        style={{ animation: 'floatY 5s ease-in-out 2s infinite' }}
      >
        🦚
      </div>
      <div
        className="absolute bottom-40 left-12 text-5xl pointer-events-none opacity-30"
        style={{ animation: 'floatY 6s ease-in-out 0s infinite' }}
      >
        🌸
      </div>
      <div
        className="absolute top-40 right-16 text-4xl pointer-events-none opacity-30"
        style={{ animation: 'floatY 8s ease-in-out 3s infinite' }}
      >
        🌺
      </div>
      <div
        className="absolute top-1/2 left-4 text-3xl pointer-events-none opacity-20"
        style={{ animation: 'floatY 4s ease-in-out 1.5s infinite' }}
      >
        🏵️
      </div>
      <div
        className="absolute bottom-20 right-1/4 text-4xl pointer-events-none opacity-20"
        style={{ animation: 'floatY 5.5s ease-in-out 0.5s infinite' }}
      >
        🌷
      </div>
    </section>
  );
}
