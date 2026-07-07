import { useState } from 'react';
import EnvelopeSystem from './EnvelopeSystem';
import ScratchReveal from './ScratchReveal';
import ScrollProgress from './ScrollProgress';
import BackgroundEffects from './BackgroundEffects';
import LoveStory from './LoveStory';
import CoupleGallery from './CoupleGallery';
import WeddingEvents from './WeddingEvents';
import CountdownTimer from './CountdownTimer';
import InvitationCard from './InvitationCard';
import Venue from './Venue';
import RSVPForm from './RSVPForm';
import Footer from './Footer';
import FlyingParrot from './FlyingParrot';

export default function App() {
    const [showMain, setShowMain] = useState(false);

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[#3E1620] text-[#2E2620]">
            {/* Global scroll progress bar */}
            <ScrollProgress />

            {/* Global background effects: petals, butterflies, sparkles, hearts */}
            <BackgroundEffects />

            {/* Envelope opening animation — DO NOT TOUCH */}
            <EnvelopeSystem onComplete={() => setShowMain(true)} />

            {/* Main content — fades in after envelope */}
            <div className={`transition-opacity duration-[1000ms] ${showMain ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>

                {/* ── Hero Section — DO NOT TOUCH ─────────────────────────── */}
                <section className="relative flex min-h-screen flex-col items-start justify-center overflow-hidden bg-[#3E1620] px-[8vw] py-[8vh] text-left">
                    {/* Decorative flower threads in top-left corner */}
                    <div className="pointer-events-none absolute top-0 left-0 z-10 hidden sm:block">
                        <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-95">
                            <defs>
                                <radialGradient id="marigoldGrad" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stopColor="#FFE082" />
                                    <stop offset="50%" stopColor="#FFB300" />
                                    <stop offset="100%" stopColor="#FF6F00" />
                                </radialGradient>
                                <radialGradient id="roseGrad" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stopColor="#FF8A80" />
                                    <stop offset="55%" stopColor="#FF1744" />
                                    <stop offset="100%" stopColor="#D50000" />
                                </radialGradient>
                                <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#AEEA00" />
                                    <stop offset="100%" stopColor="#33691E" />
                                </linearGradient>
                                <linearGradient id="goldString" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#E8D5A3" />
                                    <stop offset="100%" stopColor="#9A7A40" />
                                </linearGradient>
                                <filter id="shadow" x="-35%" y="-35%" width="170%" height="170%">
                                    <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodOpacity="0.4"/>
                                </filter>

                                {/* Realistic Marigold Definition (scaled up) */}
                                <g id="marigold" transform="scale(1.25)">
                                    <g filter="url(#shadow)">
                                        <path d="M 0,-12 C -4,-6 -8,-6 -12,0 C -8,6 -4,6 0,12 C 4,6 8,6 12,0 C 8,-6 4,-6 0,-12 Z" fill="url(#marigoldGrad)" />
                                        <path d="M 0,-12 C -4,-6 -8,-6 -12,0 C -8,6 -4,6 0,12 C 4,6 8,6 12,0 C 8,-6 4,-6 0,-12 Z" fill="url(#marigoldGrad)" transform="rotate(30)" />
                                        <path d="M 0,-12 C -4,-6 -8,-6 -12,0 C -8,6 -4,6 0,12 C 4,6 8,6 12,0 C 8,-6 4,-6 0,-12 Z" fill="url(#marigoldGrad)" transform="rotate(60)" />
                                        <path d="M 0,-10 C -3,-5 -6,-5 -10,0 C -6,5 -3,5 0,10 C 3,5 6,5 10,0 C 6,-5 3,-5 0,-10 Z" fill="#FF8F00" transform="rotate(15) scale(0.95)" />
                                        <path d="M 0,-10 C -3,-5 -6,-5 -10,0 C -6,5 -3,5 0,10 C 3,5 6,5 10,0 C 6,-5 3,-5 0,-10 Z" fill="#FF8F00" transform="rotate(45) scale(0.95)" />
                                        <path d="M 0,-10 C -3,-5 -6,-5 -10,0 C -6,5 -3,5 0,10 C 3,5 6,5 10,0 C 6,-5 3,-5 0,-10 Z" fill="#FF8F00" transform="rotate(75) scale(0.95)" />
                                        <circle cx="0" cy="0" r="7" fill="#FFB300" />
                                        <circle cx="0" cy="0" r="4" fill="#FFE082" />
                                        <circle cx="0" cy="0" r="2" fill="#FFF8E1" />
                                    </g>
                                </g>

                                {/* Realistic Rose Definition (scaled up) */}
                                <g id="rose" transform="scale(1.25)">
                                    <g filter="url(#shadow)">
                                        <path d="M0,-12 C-8,-12 -12,-8 -12,0 C-12,8 -8,12 0,12 C8,12 12,8 12,0 C12,-8 8,-12 0,-12 Z" fill="#B71C1C" />
                                        <path d="M-8,-4 C-10,2 -6,8 0,8 C6,8 10,2 8,-4 C6,-8 2,-8 -2,-8 C-6,-8 -7,-6 -8,-4 Z" fill="url(#roseGrad)" />
                                        <path d="M-6,-2 C-8,1 -4,6 0,6 C4,6 8,1 6,-2 C4,-5 1,-5 -2,-5 C-4,-5 -5,-4 -6,-2 Z" fill="#FF1744" />
                                        <path d="M-3,-1 C-5,0 -3,4 0,4 C3,4 5,0 3,-1 C2,-3 0,-3 -1,-3 C-2,-3 -3,-2 -3,-1 Z" fill="#FF5252" />
                                        <circle cx="0" cy="0" r="1.5" fill="#FF8A80" />
                                    </g>
                                </g>

                                {/* Double Leaves Definition (scaled up) */}
                                <g id="leaves" transform="scale(1.25)">
                                    <path d="M0,0 Q-8,-10 -15,-5 Q-8,5 0,0" fill="url(#leafGrad)" />
                                    <path d="M0,0 Q8,-10 15,-5 Q8,5 0,0" fill="url(#leafGrad)" />
                                </g>
                            </defs>

                            {/* Vertical Thread 1 (x=15) */}
                            <line x1="15" y1="0" x2="15" y2="320" stroke="url(#goldString)" strokeWidth="1" />
                            <use href="#marigold" x="15" y="40" />
                            <use href="#rose" x="15" y="80" />
                            <use href="#marigold" x="15" y="120" />
                            <use href="#rose" x="15" y="160" />
                            <use href="#marigold" x="15" y="200" />
                            <use href="#rose" x="15" y="240" />
                            <use href="#marigold" x="15" y="280" />
                            <path d="M11,310 L19,310 L17,320 L13,320 Z" fill="#C9A96E" />
                            <circle cx="15" cy="322" r="3" fill="#E8D5A3" />

                            {/* Vertical Thread 2 (x=45) */}
                            <line x1="45" y1="0" x2="45" y2="240" stroke="url(#goldString)" strokeWidth="1" />
                            <use href="#rose" x="45" y="30" />
                            <use href="#marigold" x="45" y="70" />
                            <use href="#rose" x="45" y="110" />
                            <use href="#marigold" x="45" y="150" />
                            <use href="#rose" x="45" y="190" />
                            <path d="M41,230 L49,230 L47,240 L43,240 Z" fill="#C9A96E" />
                            <circle cx="45" cy="242" r="3" fill="#E8D5A3" />

                            {/* Vertical Thread 3 (x=75) */}
                            <line x1="75" y1="0" x2="75" y2="180" stroke="url(#goldString)" strokeWidth="1" />
                            <use href="#marigold" x="75" y="40" />
                            <use href="#rose" x="75" y="80" />
                            <use href="#marigold" x="75" y="120" />
                            <path d="M71,170 L79,170 L77,180 L73,180 Z" fill="#C9A96E" />
                            <circle cx="75" cy="182" r="3" fill="#E8D5A3" />

                            {/* Vertical Thread 4 (x=105) */}
                            <line x1="105" y1="0" x2="105" y2="120" stroke="url(#goldString)" strokeWidth="1" />
                            <use href="#rose" x="105" y="30" />
                            <use href="#marigold" x="105" y="70" />
                            <path d="M101,110 L109,110 L107,120 L103,120 Z" fill="#C9A96E" />
                            <circle cx="105" cy="122" r="3" fill="#E8D5A3" />

                            {/* Vertical Thread 5 (x=135) */}
                            <line x1="135" y1="0" x2="135" y2="70" stroke="url(#goldString)" strokeWidth="1" />
                            <use href="#marigold" x="135" y="35" />
                            <path d="M131,60 L139,60 L137,70 L133,70 Z" fill="#C9A96E" />
                            <circle cx="135" cy="72" r="3" fill="#E8D5A3" />

                            {/* Horizontal Garland Drape (Left to Right) */}
                            <path d="M 0,10 Q 90,50 180,10 Q 270,50 360,10 Q 380,5 400,0" stroke="url(#goldString)" strokeWidth="1.5" fill="none" />
                            <use href="#marigold" x="45" y="22" />
                            <use href="#rose" x="90" y="30" />
                            <use href="#marigold" x="135" y="22" />
                            <use href="#rose" x="180" y="10" />
                            <use href="#marigold" x="225" y="22" />
                            <use href="#rose" x="270" y="30" />
                            <use href="#marigold" x="315" y="22" />
                            <use href="#rose" x="360" y="10" />

                            {/* Hanging leaves from drape */}
                            <use href="#leaves" x="45" y="31" />
                            <use href="#leaves" x="135" y="31" />
                            <use href="#leaves" x="225" y="31" />
                            <use href="#leaves" x="315" y="31" />
                        </svg>
                    </div>
                    <div className="pointer-events-none absolute -top-6 -right-6 z-0 hidden sm:block">
                        <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-90">
                            <defs>
                                <linearGradient id="fg2" x1="0" x2="1">
                                    <stop offset="0%" stopColor="#fde68a" />
                                    <stop offset="50%" stopColor="#fbcfe8" />
                                    <stop offset="100%" stopColor="#a78bfa" />
                                </linearGradient>
                            </defs>
                            <g transform="translate(8,8)">
                                <circle cx="18" cy="18" r="18" fill="url(#fg2)" opacity="0.95" />
                                <path d="M36 10c8 6 14 14 10 22-6 12-26 8-34 2" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9" />
                                <g transform="translate(6,42)">
                                    <path d="M6 20c10-12 34-18 48-6" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.85" />
                                </g>
                                <g transform="translate(4,72)">
                                    <ellipse cx="28" cy="10" rx="28" ry="10" fill="#f8f0ff" opacity="0.85" />
                                </g>
                            </g>
                        </svg>
                    </div>
                    <video
                        className="absolute inset-0 h-full w-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        src="https://res.cloudinary.com/n0c7bqpd/video/upload/v1783332429/kling_20260706_VIDEO_Animate_th_4164_0_hiy4bv.mp4"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(62,22,32,0.72)_0%,rgba(62,22,32,0.45)_50%,rgba(62,22,32,0.2)_100%)]" />

                    <div className="relative z-10 max-w-[640px] flex flex-col items-start text-left transition-all duration-[1200ms] ease-out">
                        <div className="mb-6 text-[0.95rem] md:text-[1.05rem] uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#D8BE8C] leading-loose">Two souls, one beautiful journey.<br/>Join us as we step into our forever.</div>
                        <h1 className="m-0 mb-[0.35em] font-['Cormorant_Garamond'] text-[clamp(3.6rem,10.2vw,6.8rem)] font-medium leading-[1.05] text-[#FBF7EE] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                            Ananya <em className="my-1.5 block text-[0.58em] font-normal italic tracking-[0.08em] text-[#E6CAC3]">&amp;</em> Arjun
                        </h1>
                        <div className="mb-2 text-[1.45rem] md:text-[1.6rem] uppercase tracking-[0.14em] text-[#FBF7EE]">Wedding &amp; Love Reveal</div>
                        <div className="text-[1.18rem] md:text-[1.3rem] italic text-[#E6CAC3]">Scroll down and touch the hearts to reveal the day our forever begins</div>
                    </div>

                    <div className="absolute bottom-[6vh] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 opacity-70 transition-opacity duration-[1000ms]">
                        <div className="h-[34px] w-px origin-top bg-[#FBF7EE] [animation:scrollDown_1.8s_ease-in-out_infinite]" />
                        <span className="text-[0.65rem] uppercase tracking-[0.3em] text-[#FBF7EE]">Scroll</span>
                    </div>
                </section>
                {/* ── End Hero ──────────────────────────────────────────────── */}

                {/* Scratch Reveal — DO NOT TOUCH */}
                <ScratchReveal />

                {/* ── New Sections ──────────────────────────────────────────── */}
                <LoveStory />
                <CoupleGallery />
                <WeddingEvents />
                <CountdownTimer />
                <InvitationCard />
                <Venue />
                <RSVPForm />
                <Footer />
            </div>
            <FlyingParrot />
        </div>
    );
}
