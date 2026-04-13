"use client"
import React, { useRef } from 'react'
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LuTrendingUp } from "react-icons/lu";
import { MdArrowOutward, MdPlayArrow } from 'react-icons/md';

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

const Hero = () => {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // ─── NOTE ────────────────────────────────────────────────────────────
        // SplitText MUST NOT be used on elements with bg-clip-text + color-transparent.
        // SplitText wraps words in display:inline-block spans which breaks
        // -webkit-background-clip:text on the parent. Instead we animate each
        // heading line as a single block (the real Awwwards approach for
        // gradient headings). SplitText is only used on plain-colour text.
        // ─────────────────────────────────────────────────────────────────────
        const subtitleSplit = SplitText.create('.hero-subtitle', { type: 'words' });
        const mob = window.matchMedia('(max-width: 767px)').matches;
        const f = (px: number) => mob ? {} : { filter: `blur(${px}px)` };

        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        tl
            // Badge fades down
            .from('.hero-badge', {
                opacity: 0, y: -24, ...f(12), duration: 0.8,
            })
            // Line 1: "From Beginner To" — whole line block reveal
            .from('.hero-line-1', {
                opacity: 0, y: 60, ...f(16), duration: 1.0,
            }, '-=0.4')
            // Line 2: "Profitable [icon] Trader" — slight stagger after line 1
            .from('.hero-line-2', {
                opacity: 0, y: 70, ...f(16), duration: 1.0,
            }, '-=0.7')
            // Subtitle: SplitText word blur-in (safe — no bg-clip-text)
            .from(subtitleSplit.words, {
                opacity: 0, y: 24, ...f(8), stagger: 0.045, duration: 0.85,
            }, '-=0.6')
            // CTA lines extend outward
            .from('.cta-line', {
                scaleX: 0, opacity: 0, duration: 0.9, stagger: 0.12,
            }, '-=0.55')
            // CTA button pops up
            .from('.hero-cta-btn', {
                opacity: 0, y: 20, scale: 0.92, ...f(6), duration: 0.7,
            }, '-=0.75')
            // Floating badge slides down
            .from('.floating-badge', {
                opacity: 0, y: -28, ...f(10), duration: 0.9,
            }, '-=0.5')
            // Video container rises from below
            .from('.hero-video-container', {
                opacity: 0, y: 100, ...f(18), duration: 1.4, ease: 'power3.out',
            }, '-=0.65');

        // Subtle parallax — video drifts up as you scroll
        gsap.to('.hero-video-container', {
            y: -70,
            ease: 'none',
            // scrollTrigger: {
            //     trigger: container.current,
            //     start: 'top top',
            //     end: 'bottom top',
            //     scrub: 2,
            // },
        });

        return () => { try { subtitleSplit.revert(); } catch(e) {} };
    }, { scope: container });

    return (
        <div ref={container} className='w-full min-h-[100vh] py-2 px-2'>
            <div className="rounded-3xl flex flex-col pb-10 overflow-hidden relative h-full w-full">
                {/* Background blobs */}
                <div className="absolute inset-0 h-[70vh] w-[120vw] bg-[radial-gradient(circle,_rgba(37,99,235,0.5),_rgba(37,99,235,0.2))] top-[-30%] rounded-full blur-[12rem]" />
                <div className="absolute inset-0 h-[40vh] w-[40vw] bg-[radial-gradient(circle,_rgba(37,99,235,0.5),_rgba(37,99,235,0.2))] top-[100%] left-[-20%] rounded-full blur-[12rem]" />
                <div className="absolute inset-0 h-[40vh] w-[40vw] bg-[radial-gradient(circle,_rgba(37,99,235,0.5),_rgba(37,99,235,0.2))] top-[100%] left-[80%] rounded-full blur-[12rem]" />

                <main className="relative z-10 flex flex-col pt-36 md:pt-50 items-center text-center w-full max-w-4xl mx-auto px-4">
                    {/* Badge */}
                    <div className="hero-badge mb-6 md:mb-8 px-4 py-2.5 rounded-full bg-gradient-to-b from-white/10 to-white/3 backdrop-blur-md text-[10px] text-white/5 uppercase tracking-[0.15em]">
                        <span className="text-white">Guinness Record Holder</span>
                    </div>

                    {/* Heading */}
                    <h1 className="font-medium text-[2.2rem] sm:text-5xl md:text-[52px] lg:text-[80px] tracking-tight leading-[1.1] lg:leading-[1] mb-6 md:mb-8 w-full">
                        {/* Line 1 */}
                        <span className="hero-line-1 block bg-gradient-to-b from-blue-100 to-blue-200 bg-clip-text text-transparent">
                            From Beginner To
                        </span>

                        {/* Line 2 */}
                        <span className="hero-line-2 w-full flex items-center justify-center gap-2 md:gap-3 lg:gap-4 bg-gradient-to-b from-blue-100 to-blue-200 bg-clip-text text-transparent">
                            Profitable
                            <span className="inline-flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12 md:w-13 md:h-13 lg:w-15 lg:h-15 bg-linear-30 from-white to-blue-200 rounded-2xl rotate-[-10deg] shadow-2xl flex-shrink-0 text-blue-900">
                                <LuTrendingUp className="text-blue-900 font-bold text-xl sm:text-3xl lg:text-4xl" />
                            </span>
                            Trader
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="hero-subtitle text-sm md:text-lg text-blue-200/80 mb-10 md:mb-12 max-w-sm md:max-w-lg leading-relaxed font-medium px-2">
                        Gain confidence with real time trading sessions
                    </p>

                    {/* CTA row */}
                    <div className="hero-cta relative flex items-center gap-3 md:gap-10">
                        <div className="cta-line hidden sm:block h-[1px] w-24 xl:w-48 bg-gradient-to-l from-blue-400/30 to-transparent origin-right" />
                        <button className="hero-cta-btn relative -mt-10 cursor-pointer bg-linear-to-b from-white to-blue-200 flex items-center gap-3 px-8 md:px-10 py-3 text-black rounded-full font-bold text-sm whitespace-nowrap transition-transform hover:scale-105 active:scale-95 shadow-2xl">
                            Start now
                            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                                <MdArrowOutward className="text-md text-white" />
                            </div>
                        </button>
                        <div className="cta-line hidden sm:block h-[1px] w-24 xl:w-48 bg-gradient-to-r from-blue-400/30 to-transparent origin-left" />
                    </div>

                    {/* Video section */}
                    <div className="relative mt-20 md:mt-24 w-full flex items-center justify-center">
                        {/* Floating badge */}
                        <div className="floating-badge absolute -top-7 left-1/2 -translate-x-1/2 z-20 px-3 md:px-5 py-2 md:py-2.5 rounded-[1.25rem] bg-blue-600/10 border border-blue-200/10 backdrop-blur-md flex items-center gap-2 md:gap-3 shadow-2xl w-[max-content] max-w-[90vw]">
                            <div className="border rounded-xl p-1.5 md:p-2 border-white/10">
                                <img src="/logo.webp" alt="Delta" className="w-7 md:w-10 object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <div className="text-left">
                                <div className="text-xs md:text-sm font-bold">Delta International Institute</div>
                                <div className="text-[8px] md:text-[9px] text-gray-500 uppercase tracking-widest font-bold leading-tight">Guinness World Record Holder</div>
                            </div>
                        </div>

                        <div className="hero-video-container p-1.5 md:p-2 bg-blue-600/10 border border-blue-200/10 relative w-full md:w-[80vw] max-w-5xl rounded-3xl md:rounded-4xl overflow-hidden">
                            <img src="/aboutus.png" alt="Studio" className="w-full h-full rounded-3xl md:rounded-4xl object-cover opacity-80" referrerPolicy="no-referrer" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <button className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:scale-110 transition-transform duration-700">
                                    <MdPlayArrow className="w-6 h-6 md:w-8 md:h-8 text-white fill-white ml-1" />
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Hero;
