"use client";
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Flame, Lock, TrendingUp } from 'lucide-react';
import { MdOutlineTimer } from 'react-icons/md';

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

export default function WhyNowSection() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const mob = window.matchMedia('(max-width: 767px)').matches;
        const f = (px: number) => mob ? {} : { filter: `blur(${px}px)` };

        const tl = gsap.timeline({
            scrollTrigger: { trigger: container.current, start: 'top 82%' },
            defaults: { ease: 'power4.out' },
        });

        tl
            .from(['.wn-tag', '.wn-line-1', '.wn-line-2'], {
                opacity: 0, y: 55, ...f(14), stagger: 0.16, duration: 1.0,
            })
            .from('.wn-card', {
                opacity: 0, y: 90, ...f(10), stagger: 0.18, duration: 1.2,
            }, '-=0.55')
            .from('.wn-urgency', {
                opacity: 0, y: 60, ...f(12), duration: 1.1,
            }, '-=0.5')
            .from('.wn-cta', {
                opacity: 0, scale: 0.92, duration: 0.7,
            }, '-=0.4');

        // Tilt — scoped to container, RAF-throttled
        // const cards = gsap.utils.toArray<HTMLElement>('.wn-card', container.current);
        // const cleanups: (() => void)[] = [];
        // cards.forEach((card) => {
        //     let rafId = 0;
        //     const onMove = (e: MouseEvent) => {
        //         cancelAnimationFrame(rafId);
        //         rafId = requestAnimationFrame(() => {
        //             const rect = card.getBoundingClientRect();
        //             const rotateX = ((e.clientY - rect.top) - rect.height / 2) / 18;
        //             const rotateY = (rect.width / 2 - (e.clientX - rect.left)) / 18;
        //             gsap.to(card, { rotateX, rotateY, duration: 0.5, ease: 'power2.out', transformPerspective: 1000 });
        //         });
        //     };
        //     const onLeave = () => {
        //         cancelAnimationFrame(rafId);
        //         gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power2.out' });
        //     };
        //     card.addEventListener('mousemove', onMove);
        //     card.addEventListener('mouseleave', onLeave);
        //     cleanups.push(() => {
        //         card.removeEventListener('mousemove', onMove);
        //         card.removeEventListener('mouseleave', onLeave);
        //     });
        // });

        // return () => { 
        //     tl.kill();
        //  };
    }, { scope: container });

    return (
        <section ref={container} className="relative pt-32 pb-24 overflow-hidden">
            {/* Red ambient glows */}
            {/* <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] rounded-full bg-red-600/15 blur-[120px] pointer-events-none" />
            <div className="absolute top-[30%] right-[-8%] w-[400px] h-[400px] rounded-full bg-red-500/10 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[10%] left-[20%] w-[350px] h-[350px] rounded-full bg-red-700/12 blur-[90px] pointer-events-none" /> */}

            {/* Heading */}
            <div className="max-w-4xl mx-auto px-6 text-center mb-24">
                {/* <div className="wn-tag inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-[10px] font-bold text-blue-300 uppercase tracking-[0.18em]">
                    <Flame className="w-3 h-3 text-orange-400" />
                    Limited Time Offer
                </div> */}
                <h2 className="font-medium text-[2.2rem] sm:text-5xl md:text-6xl leading-[1.1]">
                    <span className="wn-line-1 block bg-gradient-to-b from-blue-100 to-blue-200 bg-clip-text text-transparent">
                        Why Now Is The
                    </span>
                    <span className="wn-line-2 flex items-center justify-center gap-3 bg-gradient-to-b from-blue-100 to-blue-200 bg-clip-text text-transparent">
                        Right
                        <span className="inline-flex mt-2 items-center justify-center w-12 h-12 sm:w-10 sm:h-10 md:w-13 md:h-13 bg-linear-30 from-white to-blue-200 rounded-2xl rotate-[-10deg] shadow-2xl flex-shrink-0">
                            <MdOutlineTimer className="text-blue-900 font-bold text-2xl" />
                        </span>
                        Time 
                    </span>
                </h2>
            </div>

            {/* Cards — exact same structure as FeaturesSection */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative z-10">

                {/* Card 1: Geopolitical Uncertainty */}
                <div className="card h-full wn-card rounded-[2.5rem] p-1 border border-blue-400/15 md:backdrop-blur-xl">
                    <div className="group h-full relative rounded-[2.5rem] p-8 border border-blue-400/10 bg-[#050a15]/60 md:backdrop-blur-xl overflow-hidden flex flex-col items-center">
                        <div className="absolute inset-0 card-glow-bottom opacity-80 transition-opacity duration-700" />

                        {/* Geo-event graphic */}
                        <div className="relative h-56 w-full mb-8 flex items-center justify-center">
                            <div className="relative w-full max-w-[200px]">
                                {/* Central globe ring */}
                                <div className="relative w-20 h-20 rounded-full border border-blue-400/20 bg-blue-600/10 flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                                    <div className="absolute inset-0 rounded-full border-t border-blue-400/40 animate-spin-slow" />
                                    <span className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">Global</span>
                                </div>
                                {/* Event chips */}
                                <div className="flex flex-wrap justify-center gap-2">
                                    {[
                                        { label: 'OPEC ↓', color: 'border-orange-400/30 text-orange-300/80 bg-orange-500/8' },
                                        { label: 'FED ↑', color: 'border-blue-400/30 text-blue-300 bg-blue-500/10' },
                                        { label: 'CONFLICT', color: 'border-red-400/30 text-red-300/80 bg-red-500/8' },
                                    ].map(({ label, color }) => (
                                        <div key={label} className={`px-2.5 py-1 rounded-full border text-[9px] font-bold uppercase tracking-widest ${color}`}>
                                            {label}
                                        </div>
                                    ))}
                                </div>
                                {/* Opportunity arrow */}
                                <div className="mt-4 flex items-center justify-center gap-2">
                                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-400/40" />
                                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/20">
                                        <TrendingUp className="w-3 h-3 text-blue-300" />
                                        <span className="text-[9px] font-bold text-blue-300 uppercase tracking-widest">Opportunity</span>
                                    </div>
                                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-400/40" />
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 text-center">
                            <h3 className="text-xl font-bold mb-4">Geopolitical Uncertainty = Opportunity</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Opportunities are there whether you are ready or not. The question is — will you profit from them?
                            </p>
                        </div>
                    </div>
                </div>

                {/* Card 2: Forex 24 hours */}
                <div className="card h-full wn-card rounded-[2.5rem] p-1 border border-blue-400/15 md:backdrop-blur-xl">
                    <div className="group h-full relative rounded-[2.5rem] p-8 border border-blue-400/10 bg-[#050a15]/60 md:backdrop-blur-xl overflow-hidden flex flex-col items-center">
                        <div className="absolute inset-0 card-glow-bottom opacity-80 transition-opacity duration-700" />

                        {/* 24h timezone graphic */}
                        <div className="relative h-56 w-full mb-8 flex items-center justify-center">
                            <div className="relative flex flex-col items-center gap-4">
                                {/* Clock face */}
                                <div className="relative w-20 h-20 rounded-full border border-blue-400/20 bg-black/30 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.25)]">
                                    <div className="absolute inset-0 rounded-full border-t-2 border-blue-500/60 " />
                                    <div className="text-center">
                                        <div className="text-xl font-bold text-white leading-none">24</div>
                                        <div className="text-[8px] text-blue-300/60 font-bold uppercase tracking-widest">Hours</div>
                                    </div>
                                </div>
                                {/* Timezone row */}
                                <div className="flex gap-2">
                                    {['TOKYO', 'DUBAI', 'LONDON', 'NY'].map((city, i) => (
                                        <div key={city} className="flex flex-col items-center gap-1">
                                            <div className={`w-1.5 h-1.5 rounded-full ${i === 1 ? 'bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]' : 'bg-blue-400/30'}`} />
                                            <span className="text-[7px] font-bold text-blue-300/50 uppercase">{city}</span>
                                        </div>
                                    ))}
                                </div>
                                {/* Connecting lines */}
                                <div className="absolute top-14 left-1/2 -translate-x-1/2 w-[1px] h-5 bg-gradient-to-b from-white/20 to-transparent" />
                            </div>
                        </div>

                        <div className="relative z-10 text-center">
                            <h3 className="text-xl font-bold mb-4">Forex Runs 24 Hours a Day</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Your income is not limited by time or location. Trade from anywhere, any time, on your own terms.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Card 3: Savings losing value */}
                <div className="card h-full wn-card rounded-[2.5rem] p-1 border border-blue-400/15 md:backdrop-blur-xl">
                    <div className="group h-full relative rounded-[2.5rem] p-8 border border-blue-400/10 bg-[#050a15]/60 md:backdrop-blur-xl overflow-hidden flex flex-col items-center">
                        <div className="absolute inset-0 card-glow-bottom opacity-80 transition-opacity duration-700" />

                        {/* Savings vs trading graphic — matches feature card 3 progress style */}
                        <div className="relative h-56 w-full mb-8 flex flex-col justify-center px-4">
                            <div className="bg-black/40 rounded-2xl p-6 border border-white/5 space-y-6">
                                <div className="space-y-3">
                                    <div className="flex justify-between text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500">
                                        <span>Savings (inflation)</span>
                                        <span className="text-red-400/80">-3.2%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full w-[22%] bg-gradient-to-r from-red-500/60 to-red-400/40 rounded-full" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500">
                                        <span>Trading with Delta</span>
                                        <span className="text-blue-200">+83%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-blue-200/5 rounded-full overflow-hidden">
                                        <div className="h-full w-[83%] bg-blue-200 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 text-center">
                            <h3 className="text-xl font-bold mb-4">Your Savings Are Losing Value</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Inflation erodes your cash daily. Trading gives you a way to grow it with skill — not just hope.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Urgency CTA block — immersive full-bleed */}
            <div className="wn-urgency mt-12 p-2 md:mt-20 relative z-10 overflow-hidden">
                {/* Deep gradient backdrop */}
                <div className="relative bg-gradient-to-br rounded-4xl from-[#0a1628] via-[#060d1f] to-[#010406] border-y border-blue-400/10 py-16 md:py-24 px-4 md:px-10 overflow-hidden">
                    {/* Ambient orbs */}
                    <div className="absolute -top-32 left-1/4 w-80 h-80 rounded-full bg-blue-600/20 blur-[80px] pointer-events-none" />
                    <div className="absolute -bottom-32 right-1/4 w-72 h-72 rounded-full bg-indigo-600/15 blur-[80px] pointer-events-none" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-blue-500/8 blur-[60px] pointer-events-none" />

                    {/* Top rim light */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

                    <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center gap-7">
                        {/* Urgency badge */}
                        {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/15 border border-orange-400/30 text-[10px] font-bold text-orange-300 uppercase tracking-[0.2em]">
                            <Lock className="w-3 h-3" />
                            Price Has Never Been Offered Before
                        </div> */}

                        {/* Headline */}
                        <div className="space-y-2">
                            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                                <span className="bg-gradient-to-b from-white to-blue-100 bg-clip-text text-transparent">
                                    This Discount Ends
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-orange-300 via-orange-200 to-yellow-200 bg-clip-text text-transparent">
                                    March 31 — Forever.
                                </span>
                            </h3>
                            <p className="text-blue-200/60 text-sm md:text-base leading-relaxed max-w-lg mx-auto pt-2">
                                Delta has never offered this level of discount before. Once it ends, it&apos;s gone — no extensions, no exceptions.
                            </p>
                        </div>

                        {/* Deadline pill */}
                        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/4 border border-white/8 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-red-900 animate-pulse flex-shrink-0" />
                            <span className="text-xs md:text-sm font-semibold text-blue-100">
                                Secure your seat before <span className="text-white font-bold">March 31</span>
                            </span>
                        </div>

                        {/* CTA */}
                        <div className="wn-cta flex flex-col sm:flex-row items-center gap-4 pt-2">
                            <button className="cursor-pointer bg-gradient-to-b from-white to-blue-100 text-black font-bold text-sm px-10 py-4 rounded-full flex items-center gap-3 hover:scale-105 active:scale-95 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.2),0_20px_60px_rgba(59,130,246,0.3)]">
                                Start Now
                                <span className="w-7 h-7 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                                    <ArrowRight className="w-4 h-4 text-white" />
                                </span>
                            </button>
                            <span className="text-xs text-blue-300/40 font-medium">No hidden fees · Cancel anytime</span>
                        </div>
                    </div>

                    {/* Bottom rim */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
                </div>
            </div>
        </section>
    );
}
