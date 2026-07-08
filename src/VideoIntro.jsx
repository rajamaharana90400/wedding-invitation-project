import { useState, useEffect, useRef } from 'react';

export default function VideoIntro({ onComplete }) {
    // 'waiting' = closed curtains, click to start | 'playing' = curtains opening | 'fading' | 'done'
    const [phase, setPhase] = useState('waiting');
    const videoRef = useRef(null);
    const hasEnded = useRef(false);

    // Set up video events (loaded metadata, ended, error, timeupdate)
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Force video to load and stand by on the first frame (closed curtains)
        video.load();

        const handleEnded = () => {
            if (hasEnded.current) return;
            hasEnded.current = true;
            setPhase('fading');
        };

        const handleError = () => {
            setPhase('done');
            onComplete?.();
        };

        const handleTimeUpdate = () => {
            if (video.duration && video.currentTime >= video.duration - 1.2) {
                handleEnded();
            }
        };

        const handlePlaying = () => {
            setPhase('playing');
        };

        video.addEventListener('playing', handlePlaying);
        video.addEventListener('ended', handleEnded);
        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('error', handleError);

        return () => {
            video.removeEventListener('playing', handlePlaying);
            video.removeEventListener('ended', handleEnded);
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('error', handleError);
        };
    }, [onComplete]);

    // Handle user clicking/touching the closed curtains to open them
    const handleStart = () => {
        if (phase !== 'waiting') return;

        const video = videoRef.current;
        if (video) {
            video.play().catch(() => {
                // If browser block, skip intro
                setPhase('done');
                onComplete?.();
            });
        }
    };

    const handleTransitionEnd = () => {
        if (phase === 'fading') {
            setPhase('done');
            onComplete?.();
        }
    };

    if (phase === 'done') return null;

    return (
        <div
            className="video-intro-overlay"
            style={{
                opacity: phase === 'fading' ? 0 : 1,
                cursor: phase === 'waiting' ? 'pointer' : 'default',
            }}
            onClick={handleStart}
            onTransitionEnd={handleTransitionEnd}
        >
            {/* Couple image — revealed as curtains open */}
            <div
                className="video-intro-couple"
                style={{
                    opacity: phase !== 'waiting' ? 1 : 0,
                    transition: 'opacity 0.4s ease-out'
                }}
            >
                <img
                    src="/happymoment.jpg"
                    alt="Ananya & Arjun"
                    className="video-intro-couple-img"
                />
                <div className="video-intro-vignette" />
                <div className="video-intro-names">
                    <div className="video-intro-names-text">Ananya &amp; Arjun</div>
                    <div className="video-intro-names-sub">We Are Getting Married</div>
                </div>
            </div>

            {/* Curtain video wrapped in blend-mode container */}
            {/* mix-blend-mode is only active when playing/fading, keeping curtains opaque when closed */}
            <div className={`video-intro-curtain-wrap ${phase !== 'waiting' ? 'blend-active' : ''}`}>
                <video
                    ref={videoRef}
                    className="video-intro-player"
                    muted
                    playsInline
                    preload="auto"
                    poster="https://res.cloudinary.com/n0c7bqpd/video/upload/so_0/v1783539096/Create_a_realistic_cinematic_c_online-video-cutter.com_mkxyst.jpg"
                >
                    <source src="https://res.cloudinary.com/n0c7bqpd/video/upload/v1783539096/Create_a_realistic_cinematic_c_online-video-cutter.com_mkxyst.mp4#t=0.0" type="video/mp4" />
                </video>
            </div>

            {/* Hint Prompt for interactivity */}
            {phase === 'waiting' && (
                <div className="video-intro-prompt">
                    👆
                </div>
            )}
        </div>
    );
}
