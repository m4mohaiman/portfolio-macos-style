import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const FONT_WEIGHTS = {
    subtitle: { min: 100, max: 400, default: 100 },
    title: { min: 400, max: 900, default: 400 },
};

const renderText = (text, className, baseWeight = 400) => {
    return [...text].map((char, i) => (
        <span
            key={i}
            className={`${className} font-bold inline-block`}
            style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
        >
      {char === ' ' ? '\u00A0' : char}
    </span>
    ));
};

const setupTextHover = (container, type) => {
    if (!container) return;
    const letters = Array.from(container.querySelectorAll('span'));
    if (!letters.length) return;

    const { min, max, default: base } = FONT_WEIGHTS[type] ?? FONT_WEIGHTS.title;

    // Each letter gets a numeric proxy we can tween.
    const proxies = letters.map(() => ({ w: base }));
    const applyWeight = (el, w) => {
        el.style.fontVariationSettings = `'wght' ${Math.round(w)}`;
    };

    // Initialize to base weight
    letters.forEach((el, i) => applyWeight(el, proxies[i].w));

    const getCenterX = (el) => {
        const r = el.getBoundingClientRect();
        return r.left + r.width / 2;
    };

    const onMove = (e) => {
        const mouseX = e.clientX;
        const falloff = 220; // px distance where effect fades

        letters.forEach((el, i) => {
            const dx = Math.abs(mouseX - getCenterX(el));
            const influence = Math.max(0, 1 - dx / falloff); // 0..1
            const target = base + influence * (max - base);

            gsap.to(proxies[i], {
                w: target,
                duration: 0.25,
                ease: 'power2.out',
                onUpdate: () => applyWeight(el, proxies[i].w),
            });
        });
    };

    const onLeave = () => {
        letters.forEach((el, i) => {
            gsap.to(proxies[i], {
                w: base,
                duration: 0.35,
                ease: 'power2.out',
                onUpdate: () => applyWeight(el, proxies[i].w),
            });
        });
    };

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);

    // Optional: return a cleanup function if you need it from outside
    return () => {
        container.removeEventListener('mousemove', onMove);
        container.removeEventListener('mouseleave', onLeave);
    };
};

const Welcome = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useGSAP(() => {
        setupTextHover(titleRef.current, 'title');
        setupTextHover(subtitleRef.current, 'subtitle');
    }, []);

    return (
        <section id="welcome">
            <p ref={subtitleRef}>
                {renderText("Hey, I'm Mohaiman! Welcome to my", 'text-3xl font-georama', 100)}
            </p>
            <h1 ref={titleRef} className="mt-7">
                {renderText('portfolio', 'text-9xl italic font-georama')}
            </h1>
            <div className="small-screen">
                <p>This Portfolio is designed for desktop/tablets screens only.</p>
            </div>
        </section>
    );
};

export default Welcome;