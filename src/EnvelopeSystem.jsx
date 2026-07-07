import React, { useState, useEffect, useRef } from 'react';
import {
    Heart,
    Sparkles,
    Volume2,
    VolumeX
} from 'lucide-react';

const WEDDING_THEME = {
    primary: '#991b1b',
    secondary: '#7f1d1d',
    accent: '#fbbf24',
    paper: '#fffbfb',
    seal: '#be123c',
    text: '#450a0a'
};

const WELCOME_DETAILS = {
    recipient: 'Dearest Family & Friends',
    subject: 'Welcome to Our Wedding!',
    message: "Thank you for joining us to celebrate this beautiful beginning. Your love, presence, and blessings mean the absolute world to us. Let's make wonderful memories together!",
    sender: 'With love, Aarav & Diya'
};

export default function EnvelopeSystem({ onComplete }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLetterPopped, setIsLetterPopped] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [particles, setParticles] = useState([]);
    const [fadeOut, setFadeOut] = useState(false);
    const [hidden, setHidden] = useState(false);
    const audioCtxRef = useRef(null);

    const playSound = (type) => {
        if (!soundEnabled) return;
        try {
            if (!audioCtxRef.current) {
                audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
            }
            const ctx = audioCtxRef.current;
            if (ctx.state === 'suspended') {
                ctx.resume();
            }

            if (type === 'wax-crack') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(150, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.05);
                gain.gain.setValueAtTime(0.25, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
                osc.start();
                osc.stop(ctx.currentTime + 0.08);
            } else if (type === 'paper-slide') {
                const bufferSize = ctx.sampleRate * 0.5;
                const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i += 1) {
                    data[i] = Math.random() * 2 - 1;
                }
                const noiseNode = ctx.createBufferSource();
                noiseNode.buffer = buffer;
                const filter = ctx.createBiquadFilter();
                filter.type = 'bandpass';
                filter.Q.value = 3.0;
                filter.frequency.setValueAtTime(1000, ctx.currentTime);
                filter.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.5);
                const gain = ctx.createGain();
                gain.gain.setValueAtTime(0.05, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
                noiseNode.connect(filter);
                filter.connect(gain);
                gain.connect(ctx.destination);
                noiseNode.start();
            }
        } catch (e) {
            console.warn('Audio Context not started or supported.', e);
        }
    };

    const triggerConfetti = () => {
        const newParticles = Array.from({ length: 45 }).map((_, i) => ({
            id: Date.now() + i,
            x: 50,
            y: 35,
            color: ['#f43f5e', '#fbbf24', '#34d399', '#60a5fa', '#c084fc', WEDDING_THEME.seal][Math.floor(Math.random() * 6)],
            size: Math.random() * 8 + 4,
            angle: Math.random() * 360,
            velocity: Math.random() * 10 + 5,
            spin: Math.random() * 360,
            spinSpeed: Math.random() * 10 - 5
        }));
        setParticles(newParticles);
        playSound('paper-slide');
    };

    useEffect(() => {
        if (particles.length === 0) return undefined;
        const interval = window.setInterval(() => {
            setParticles((prev) =>
                prev
                    .map((p) => ({
                        ...p,
                        x: p.x + Math.cos((p.angle * Math.PI) / 180) * p.velocity * 0.3,
                        y: p.y + Math.sin((p.angle * Math.PI) / 180) * p.velocity * 0.3 + 0.8,
                        spin: p.spin + p.spinSpeed,
                        velocity: p.velocity * 0.95
                    }))
                    .filter((p) => p.y < 120 && p.x > -20 && p.x < 120)
            );
        }, 16);
        return () => window.clearInterval(interval);
    }, [particles]);

    useEffect(() => {
        if (!isLetterPopped) return undefined;
        const timer = window.setTimeout(() => {
            setFadeOut(true);
            const hideTimer = window.setTimeout(() => {
                setHidden(true);
                onComplete?.();
            }, 900);
            return () => window.clearTimeout(hideTimer);
        }, 2000);
        return () => window.clearTimeout(timer);
    }, [isLetterPopped, onComplete]);

    const handleOpenToggle = () => {
        if (!isOpen) {
            setIsOpen(true);
            playSound('wax-crack');
            window.setTimeout(() => {
                setIsLetterPopped(true);
                triggerConfetti();
            }, 700);
        }
    };

    if (hidden) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-rose-950 via-slate-900 to-slate-950 text-slate-100 p-4 overflow-hidden select-none"
            style={{ opacity: fadeOut ? 0 : 1, transition: 'opacity 900ms ease' }}
        >
            <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="absolute top-4 right-4 bg-white/5 hover:bg-white/10 transition-colors p-2.5 rounded-xl border border-white/5 flex items-center gap-2 text-xs font-semibold z-50 text-slate-300"
                title="Toggle Sounds"
            >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
                <span className="hidden sm:inline">{soundEnabled ? 'Sounds On' : 'Sounds Muted'}</span>
            </button>

            <div className="mb-6 flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full text-xs text-rose-300 border border-white/5 animate-pulse">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>You are invited to celebrate with us</span>
            </div>

            <div
                className={`relative w-80 h-[210px] mb-8 transition-transform duration-300 ${!isLetterPopped ? 'hover:scale-105 cursor-pointer' : ''}`}
                onClick={handleOpenToggle}
            >
                <div
                    className="absolute inset-0 rounded-b-2xl transition-all duration-500"
                    style={{
                        backgroundColor: WEDDING_THEME.secondary,
                        boxShadow: isOpen ? '0 25px 50px -12px rgba(0, 0, 0, 0.6)' : '0 15px 30px -10px rgba(0, 0, 0, 0.4)'
                    }}
                />

                <div
                    className="absolute left-4 right-4 rounded-lg p-5 transition-all ease-out select-none overflow-hidden"
                    style={{
                        backgroundColor: WEDDING_THEME.paper,
                        color: WEDDING_THEME.text,
                        height: '220px',
                        top: '10px',
                        transform: isLetterPopped ? 'translateY(-130px) scale(1.05)' : 'translateY(10px) scale(0.95)',
                        zIndex: isLetterPopped ? 25 : 15,
                        opacity: isOpen ? 1 : 0.4,
                        transitionDuration: '700ms',
                        boxShadow: isLetterPopped ? '0 10px 30px rgba(0,0,0,0.3)' : 'none'
                    }}
                    onClick={(e) => {
                        if (isLetterPopped) e.stopPropagation();
                    }}
                >
                    <div className="border-b pb-1.5 mb-2.5 border-stone-200 flex justify-between items-center">
                        <div>
                            <h4 className="font-bold text-stone-500 uppercase tracking-widest text-[8px] mb-0.5">Welcome Invitation</h4>
                            <div className="text-xs font-bold font-serif">{WELCOME_DETAILS.recipient}</div>
                        </div>
                        <div className="text-[9px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-full">Welcome</div>
                    </div>

                    <div className="text-[10.5px] leading-relaxed mb-2.5 text-stone-700">
                        <p className="font-bold italic mb-1 text-stone-800">{WELCOME_DETAILS.subject}</p>
                        <p className="font-sans text-stone-600 font-medium leading-relaxed">{WELCOME_DETAILS.message}</p>
                    </div>

                    <div className="text-right border-t pt-1.5 border-stone-100 mt-auto text-[11px] font-bold font-serif text-stone-600">
                        {WELCOME_DETAILS.sender}
                    </div>
                </div>

                <svg viewBox="0 0 320 210" className="absolute inset-0 w-full h-full pointer-events-none z-20">
                    <polygon points="0,210 160,110 320,210" fill={WEDDING_THEME.primary} />
                    <polygon points="0,0 160,110 0,210" fill={WEDDING_THEME.secondary} opacity="0.95" />
                    <polygon points="320,0 160,110 320,210" fill={WEDDING_THEME.secondary} opacity="0.95" />
                </svg>

                <div
                    style={{
                        transformOrigin: 'top',
                        transform: isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
                        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                        transformStyle: 'preserve-3d',
                        zIndex: isOpen ? 10 : 30
                    }}
                    className="absolute top-0 left-0 w-full h-[110px] pointer-events-none"
                >
                    <svg viewBox="0 0 320 110" className="absolute inset-0 w-full h-full" style={{ backfaceVisibility: 'hidden' }}>
                        <polygon points="0,0 160,110 320,0" fill={WEDDING_THEME.primary} />
                    </svg>
                    <svg
                        viewBox="0 0 320 110"
                        className="absolute inset-0 w-full h-full"
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}
                    >
                        <polygon points="0,0 160,110 320,0" fill={WEDDING_THEME.secondary} />
                    </svg>
                    <div
                        className="absolute shadow-lg flex items-center justify-center transition-all duration-300"
                        style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '50%',
                            backgroundColor: WEDDING_THEME.seal,
                            left: 'calc(50% - 21px)',
                            top: '84px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                            border: `1px solid ${WEDDING_THEME.primary}`
                        }}
                    >
                        <div className="absolute inset-0.5 rounded-full border border-white/10 flex items-center justify-center text-white">
                            <Heart className="w-5 h-5 fill-current" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center gap-1.5 z-30 min-h-[50px]">
                <div className={`transition-all duration-500 transform ${isLetterPopped ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}`}>
                    <button
                        onClick={handleOpenToggle}
                        className="px-8 py-2.5 rounded-2xl font-bold text-xs tracking-wide transition-all duration-300 shadow-xl flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950"
                    >
                        <Sparkles className="w-4 h-4 animate-bounce" />
                        <span>Open Wedding Welcome</span>
                    </button>
                </div>
                {!isLetterPopped && (
                    <p className="text-[10px] text-slate-400">Click the Wax Seal directly to break & open</p>
                )}
            </div>

            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute pointer-events-none rounded-sm"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        backgroundColor: p.color,
                        transform: `rotate(${p.spin}deg)`,
                        opacity: p.velocity > 1 ? 0.9 : p.velocity,
                        zIndex: 40,
                        transition: 'opacity 0.1s'
                    }}
                />
            ))}
        </div>
    );
}
