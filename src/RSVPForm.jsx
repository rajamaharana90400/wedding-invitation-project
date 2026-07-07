import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  guests: '1',
  attending: 'yes',
  message: '',
};

function FloatField({ label, id, type = 'text', value, onChange, required }) {
  return (
    <div className="float-label-group">
      <input
        id={id}
        type={type}
        placeholder=" "
        value={value}
        onChange={onChange}
        required={required}
        autoComplete="off"
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

function FloatTextarea({ label, id, value, onChange }) {
  return (
    <div className="float-label-group">
      <textarea
        id={id}
        placeholder=" "
        value={value}
        onChange={onChange}
        rows={3}
        style={{ resize: 'none' }}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

function SuccessAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className="text-center py-10"
    >
      {/* Ring of petals */}
      <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ delay: i * 0.07, type: 'spring', stiffness: 300 }}
            style={{
              position: 'absolute',
              fontSize: 22,
              transform: `rotate(${i * 45}deg) translateY(-40px)`,
            }}
          >
            🌸
          </motion.div>
        ))}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
          style={{ fontSize: 40 }}
        >
          💌
        </motion.div>
      </div>

      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="font-serif-wedding text-3xl md:text-4xl mb-3"
        style={{ color: '#FBF7EE', fontWeight: 400 }}
      >
        You're Invited!
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
        className="text-sm"
        style={{ color: 'rgba(232,213,163,0.8)', fontFamily: 'Montserrat, sans-serif' }}
      >
        Thank you for your response. We can't wait to celebrate with you!
        <br />A confirmation will be sent to your email shortly.
      </motion.p>

      {/* Sparkle row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex justify-center gap-3 mt-6 text-xl"
      >
        {['✨', '💛', '🥂', '💛', '✨'].map((e, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 1.5, delay: i * 0.15, repeat: Infinity }}
          >
            {e}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function RSVPForm() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => setSubmitted(true), 400);
  };

  return (
    <section
      ref={ref}
      className="relative py-24 px-4 md:px-8 overflow-hidden"
      id="rsvp"
      style={{
        background: 'linear-gradient(160deg, #2A0F1A 0%, #3E1620 50%, #4A1828 100%)',
      }}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 60% 40% at 50% 0%, rgba(201,169,110,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 30% 30% at 10% 90%, rgba(242,196,206,0.04) 0%, transparent 50%)
          `,
        }}
      />

      {/* Decorative floral */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="absolute pointer-events-none opacity-5 text-5xl"
          style={{
            top: `${10 + i * 25}%`,
            left: i % 2 === 0 ? '1%' : '96%',
            animation: `floatY ${5 + i * 1.5}s ease-in-out ${i * 0.7}s infinite`,
          }}
        >
          {['🌸', '🌺', '🌸', '🌷'][i]}
        </div>
      ))}

      {/* Section Header */}
      <div className="text-center mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-label mb-4"
        >
          Will You Join Us?
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif-wedding text-4xl md:text-6xl mb-4"
          style={{ color: '#FBF7EE', fontWeight: 400 }}
        >
          RSVP
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="gold-divider"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-5 text-sm italic"
          style={{ color: 'rgba(232,213,163,0.6)', fontFamily: 'Montserrat, sans-serif' }}
        >
          Kindly respond by January 15, 2027
        </motion.p>
      </div>

      {/* Form card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-xl mx-auto rounded-3xl p-8 md:p-10 relative overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(201,169,110,0.2)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        }}
      >
        {/* Card shine */}
        <div
          className="absolute top-0 left-0 w-full h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.4), transparent)' }}
        />

        <AnimatePresence mode="wait">
          {submitted ? (
            <SuccessAnimation key="success" />
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              <FloatField
                label="Full Name"
                id="rsvp-name"
                value={form.name}
                onChange={handleChange('name')}
                required
              />
              <FloatField
                label="Email Address"
                id="rsvp-email"
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                required
              />
              <FloatField
                label="Phone Number"
                id="rsvp-phone"
                type="tel"
                value={form.phone}
                onChange={handleChange('phone')}
              />

              {/* Guests & Attending row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="float-label-group">
                  <select
                    id="rsvp-guests"
                    value={form.guests}
                    onChange={handleChange('guests')}
                    style={{ paddingTop: 20, paddingBottom: 8 }}
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n} style={{ background: '#3E1620', color: '#FBF7EE' }}>
                        {n} {n === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="rsvp-guests">No. of Guests</label>
                </div>

                <div className="float-label-group">
                  <select
                    id="rsvp-attending"
                    value={form.attending}
                    onChange={handleChange('attending')}
                    style={{ paddingTop: 20, paddingBottom: 8 }}
                  >
                    <option value="yes" style={{ background: '#3E1620', color: '#FBF7EE' }}>
                      ✅ Joyfully Accept
                    </option>
                    <option value="no" style={{ background: '#3E1620', color: '#FBF7EE' }}>
                      😔 Regretfully Decline
                    </option>
                  </select>
                  <label htmlFor="rsvp-attending">Attendance</label>
                </div>
              </div>

              <FloatTextarea
                label="Personal Message (optional)"
                id="rsvp-message"
                value={form.message}
                onChange={handleChange('message')}
              />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="magnetic-btn ripple-btn w-full py-4 rounded-2xl text-sm font-medium tracking-wide mt-2"
                style={{
                  background: 'linear-gradient(135deg, #C9A96E, #9A7A40)',
                  color: '#FBF7EE',
                  fontFamily: 'Montserrat, sans-serif',
                  boxShadow: '0 8px 24px rgba(201,169,110,0.3)',
                  border: 'none',
                  cursor: 'pointer',
                  letterSpacing: '0.1em',
                }}
              >
                ✉️ &nbsp; Send RSVP
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
