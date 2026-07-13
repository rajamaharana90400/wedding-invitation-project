import React from 'react';
import ReactDOM from 'react-dom/client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import App from './App';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
