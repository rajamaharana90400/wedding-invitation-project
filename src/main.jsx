import React from 'react';
import ReactDOM from 'react-dom/client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import App from './App';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches;
const lenis = new Lenis({
    duration: isTouchDevice ? 0.9 : 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: !isTouchDevice,
    smoothTouch: true,
    wheelMultiplier: isTouchDevice ? 0.9 : 1,
    touchMultiplier: isTouchDevice ? 1.1 : 1.2,
    infinite: false,
    gestureOrientation: 'vertical',
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

lenis.on('scroll', () => ScrollTrigger.update());

if (!prefersReducedMotion) {
    const sections = gsap.utils.toArray('section');

    gsap.from('main, section, h1, h2, h3, p, img', {
        opacity: 0,
        y: 32,
        duration: 1.15,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.18,
    });

    sections.forEach((section, index) => {
        const delay = index * 0.06;
        gsap.fromTo(section, { opacity: 0, y: 40 }, {
            opacity: 1,
            y: 0,
            duration: 1.1,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 82%',
                once: true,
            },
        });
    });
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
