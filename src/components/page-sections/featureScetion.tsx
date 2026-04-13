"use client";
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Rocket, TrendingUp, Zap, ShieldCheck, Globe, Cpu } from 'lucide-react';
import { LuRocket } from 'react-icons/lu';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container, Engine } from "@tsparticles/engine";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

export default function FeaturesSection() {
    const container = useRef<HTMLDivElement>(null);
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine: Engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    useGSAP(() => {
        const subtitleSplit = SplitText.create('.feature-subtitle', { type: 'words' });
        const mob = window.matchMedia('(max-width: 767px)').matches;
        const f = (px: number) => mob ? {} : { filter: `blur(${px}px)` };

        const tl = gsap.timeline({
            scrollTrigger: { trigger: container.current, start: 'top 82%' },
            defaults: { ease: 'power4.out' },
        });

        tl
            .from(['.feature-line-1', '.feature-line-2'], {
                opacity: 0, y: 65, ...f(16), stagger: 0.18, duration: 1.1,
            })
            .from(subtitleSplit.words, {
                opacity: 0, y: 24, ...f(8), stagger: 0.04, duration: 0.85,
            }, '-=0.55')
            .from('.feature-card', {
                opacity: 0, y: 90, rotateX: 18, ...f(10), transformPerspective: 900, stagger: 0.18, duration: 1.2,
            }, '-=0.5')
            .from('.bottom-glare-effect', {
                scale: 0.4,
                opacity: 0,
                duration: 1.6,
                ease: 'power2.out',
            }, '-=1');

        // Interactive Tilt Effect
        const cards = gsap.utils.toArray<HTMLElement>('.feature-card');
        cards.forEach((card) => {
            card.addEventListener('mousemove', (e: MouseEvent) => {
                const rect = card.getBoundingClientRect();
                const rotateX = (e.clientY - rect.top  - rect.height / 2) / 10;
                const rotateY = (rect.width  / 2 - (e.clientX - rect.left)) / 10;
                gsap.to(card, { rotateX, rotateY, duration: 0.5, ease: 'power2.out', transformPerspective: 1000 });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' });
            });
        });

        return () => { try { subtitleSplit.revert(); } catch(e) {} };
    }, { scope: container });



    return (
        <section ref={container} className="relative  pt-32 pb-64">
            {/* Logo Cloud */}
            {/* <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          <div className="feature-logo flex items-center gap-2 text-xl font-bold"><ShieldCheck className="w-6 h-6" /> KHDA</div>
          <div className="feature-logo flex items-center gap-2 text-xl font-bold"><ShieldCheck className="w-6 h-6" />GUINNESS</div>
          <div className="feature-logo flex items-center gap-2 text-xl font-bold"><ShieldCheck className="w-6 h-6" /> International Finance Forum</div>
          <div className="feature-logo flex items-center gap-2 text-xl font-bold"><ShieldCheck className="w-6 h-6" />PROFX </div>
          <div className="feature-logo flex items-center gap-2 text-xl font-bold"><ShieldCheck className="w-6 h-6" />Money Conclave </div>
        </div>
      </div> */}

        

            {/* Heading */}
            <div className="max-w-4xl mx-auto px-6 text-center mb-24">
                <h2 className="font-medium text-4xl sm:text-6xl">
                    <span className="feature-line-1 block bg-gradient-to-b from-blue-100 to-blue-200 bg-clip-text text-transparent">
                        Trading with Delta
                    </span>
                    <span className="feature-line-2 flex items-center justify-center gap-3 bg-gradient-to-b from-blue-100 to-blue-200 bg-clip-text text-transparent">
                        is
                        <span className="inline-flex mt-2 items-center justify-center w-12 h-12 sm:w-10 sm:h-10 md:w-13 md:h-13 bg-linear-30 from-white to-blue-200 rounded-2xl rotate-[-10deg] shadow-2xl flex-shrink-0">
                            <LuRocket className="text-blue-900 font-bold text-2xl" />
                        </span>
                        simple
                    </span>
                </h2>
                <p className="feature-subtitle mt-4 text-blue-200/90 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                    Delta simplifies finding and managing your trades — so you can lead, not micromanage.
                </p>
            </div>

            {/* Feature Cards */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {/* Card 1 */}
                <div className="card feature-card rounded-[2.5rem] p-1 border border-blue-400/15  backdrop-blur-xl">
                    <div className=" group relative rounded-[2.5rem] p-8 border border-blue-400/10 bg-[#050a15]/60 backdrop-blur-xl overflow-hidden flex flex-col items-center">
                        <div className="absolute inset-0 card-glow-bottom opacity-80 transition-opacity duration-700" />

                        <div className="relative h-56 w-full mb-8 flex items-center justify-center">
                            {/* Circular Gauge Graphic */}
                            <div className="relative w-40 h-40 rounded-full border border-white/5 flex items-center justify-center bg-black/20">
                                <div className="absolute inset-2 rounded-full border-2 border-white/5" />
                                <div className="absolute inset-0 rounded-full border-t-2 border-blue-600 shadow-[0_0_30px_rgba(59,130,246,0.3)] animate-spin-slow " />
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="text-3xl font-bold text-white">96%</div>
                                    <div className="text-[8px] uppercase tracking-widest text-brand-blue font-bold">Accuracy</div>
                                </div>
                                {/* Pulse effect */}
                                <div className="absolute inset-0 rounded-full bg-brand-blue/5 animate-pulse" />
                            </div>
                        </div>

                        <div className="relative z-10 text-center">
                            <h3 className="text-xl font-bold mb-4">Analyze Market Trends</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                There are hundreds of tried and tested indicators to analyze within our platform.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="card feature-card rounded-[2.5rem] p-1 border border-blue-400/15  backdrop-blur-xl">
                    <div className=" group relative rounded-[2.5rem] p-8 border border-blue-400/10 bg-[#050a15]/60 backdrop-blur-xl overflow-hidden flex flex-col items-center">
                        <div className="absolute inset-0 card-glow-bottom opacity-80 transition-opacity duration-700" />

                        <div className="relative h-56 w-full mb-8 flex items-center justify-center">
                            {/* Connection Graphic */}
                            <div className="relative flex flex-col items-center">
                                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.2)] mb-6 rotate-[-4deg]">
                                    <TrendingUp className="w-7 h-7 text-black" />
                                </div>
                                <div className="flex gap-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-10 h-10 rounded-xl bg-blue-200/5 border border-blue-400/10 flex items-center justify-center group-hover:border-brand-blue/30 transition-colors">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600/60 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                                        </div>
                                    ))}
                                </div>
                                {/* Connecting lines effect */}
                                <div className="absolute top-14 left-1/2 -translate-x-1/2 w-[1px] h-6 bg-gradient-to-b from-white/20 to-transparent" />
                            </div>
                        </div>

                        <div className="relative z-10 text-center">
                            <h3 className="text-xl font-bold mb-4">Promoting your strategy</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Effective strategies for growth and success without additional costs.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="card feature-card rounded-[2.5rem] p-1 border border-blue-400/15  backdrop-blur-xl">
                    <div className=" group relative rounded-[2.5rem] p-8 border border-blue-400/10 bg-[#050a15]/60 backdrop-blur-xl overflow-hidden flex flex-col items-center">
                        <div className="absolute inset-0 card-glow-bottom opacity-80 transition-opacity duration-700" />

                        <div className="relative h-56 w-full mb-8 flex flex-col justify-center px-4">
                            {/* Progress Graphic */}
                            <div className="bg-black/40 rounded-2xl p-6 border border-white/5 space-y-6">
                                <div className="space-y-3">
                                    <div className="flex justify-between text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500">
                                        <span>Strategy Performance</span>
                                        <span className="text-blue-200 rounded-2xl">84%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-blue-200/5 rounded-full overflow-hidden">
                                        <div className="h-full w-[84%] bg-blue-200 rounded-2xl shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500">
                                        <span>Risk Management</span>
                                        <span className="text-blue-200 rounded-2xl ">40%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full w-[40%] bg-blue-200 rounded-2xl" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 text-center">
                            <h3 className="text-xl font-bold mb-4">Use content to grow</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Manage tasks and priorities to scale your trading without payroll.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
             
            {/* Bottom Glare Effect */}
            <div className="bottom-glare-effect absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bottom-glare pointer-events-none z-0" />
        </section>
    );
}
