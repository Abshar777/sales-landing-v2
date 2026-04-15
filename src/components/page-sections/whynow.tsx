"use client";
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe2, Clock3, TrendingDown, ArrowRight, Flame, Lock } from 'lucide-react';
import { MdOutlineTimer } from 'react-icons/md';

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

const reasons = [
    {
        icon: Globe2,
        title: 'Geopolitical Uncertainty = Trading Opportunity',
        body: 'Opportunities are there whether you are ready or not. The question is — will you profit from them?',
        accent: 'from-blue-500/20 to-blue-700/5',
        border: 'border-blue-400/20',
        glow: 'rgba(59,130,246,0.15)',
    },
    {
        icon: Clock3,
        title: 'Forex Runs 24 Hours a Day',
        body: 'Your income is not limited by time or location. Trade from anywhere, any time, on your own terms.',
        accent: 'from-indigo-500/20 to-indigo-700/5',
        border: 'border-indigo-400/20',
        glow: 'rgba(99,102,241,0.15)',
    },
    {
        icon: TrendingDown,
        title: 'Your Savings Are Losing Value',
        body: 'Inflation erodes your cash daily. Trading gives you a way to grow it with skill — not just hope.',
        accent: 'from-blue-600/20 to-blue-800/5',
        border: 'border-blue-300/20',
        glow: 'rgba(147,197,253,0.1)',
    },
];

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
                opacity: 0, y: 80, rotateX: 14, ...f(10), transformPerspective: 900, stagger: 0.15, duration: 1.1,
            }, '-=0.55')
            .from('.wn-urgency', {
                opacity: 0, y: 60, ...f(14), duration: 1.1,
            }, '-=0.5')
            .from(['.wn-u-line', '.wn-u-badge'], {
                opacity: 0, y: 28, ...f(8), stagger: 0.1, duration: 0.8,
            }, '-=0.7')
            .from('.wn-cta', {
                opacity: 0, scale: 0.92, ...f(8), duration: 0.75,
            }, '-=0.5');

        // Tilt on cards
        const cards = gsap.utils.toArray<HTMLElement>('.wn-card');
        cards.forEach((card) => {
            card.addEventListener('mousemove', (e: MouseEvent) => {
                const rect = card.getBoundingClientRect();
                const rotateX = ((e.clientY - rect.top) - rect.height / 2) / 14;
                const rotateY = (rect.width / 2 - (e.clientX - rect.left)) / 14;
                gsap.to(card, { rotateX, rotateY, duration: 0.5, ease: 'power2.out', transformPerspective: 1000 });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' });
            });
        });

        return () => { try { ScrollTrigger.getAll().forEach(t => t.kill()); } catch (e) { } };
    }, { scope: container });

    return (
        <section ref={container} className="relative py-32 overflow-hidden">
            {/* Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140%] h-[600px] bg-[radial-gradient(ellipse,rgba(37,99,235,0.12),transparent_70%)] pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-[radial-gradient(ellipse,rgba(37,99,235,0.08),transparent_70%)] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">

                {/* Heading */}
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <div className="wn-tag inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-[10px] font-bold text-blue-300 uppercase tracking-[0.18em]">
                        <Flame className="w-3 h-3 text-orange-400" />
                        Limited Time Offer
                    </div>
                    <h2 className="font-medium text-4xl sm:text-5xl md:text-6xl leading-[1.1] mb-6">
                        <span className="wn-line-1 block bg-gradient-to-b from-blue-100 to-blue-200 bg-clip-text text-transparent">
                            Why Now Is The Right
                        </span>
                        <span className="wn-line-2 flex flex-wrap items-center justify-center gap-3 bg-gradient-to-b from-blue-100 to-blue-200 bg-clip-text text-transparent">
                            Time To
                            <span className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-linear-30 from-white to-blue-200 rounded-2xl rotate-[-10deg] shadow-2xl flex-shrink-0">
                                <MdOutlineTimer className="text-blue-900 font-bold text-2xl md:text-3xl" />
                            </span>
                            Invest
                        </span>
                    </h2>
                </div>

                {/* Reason Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {reasons.map((r, i) => {
                        const Icon = r.icon;
                        return (
                            <div key={i} className="wn-card rounded-[2rem] p-[1px] border border-blue-400/15">
                                <div className={`group relative rounded-[2rem] p-7 border ${r.border} bg-[#050a15]/80 md:backdrop-blur-xl overflow-hidden h-full flex flex-col`}>
                                    {/* Inner glow */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${r.accent} opacity-60 pointer-events-none`} />
                                    <div className="absolute inset-0 card-glow-bottom opacity-70 pointer-events-none" />

                                    <div className="relative z-10 flex flex-col h-full">
                                        {/* Number */}
                                        <div className="text-[10px] font-bold text-blue-400/50 uppercase tracking-[0.25em] mb-5">
                                            0{i + 1}
                                        </div>

                                        {/* Icon */}
                                        <div className="w-11 h-11 rounded-2xl bg-blue-600/15 border border-blue-400/20 flex items-center justify-center mb-6 group-hover:bg-blue-600/25 group-hover:border-blue-400/40 transition-all duration-300">
                                            <Icon className="w-5 h-5 text-blue-300" />
                                        </div>

                                        {/* Text */}
                                        <h3 className="font-bold text-base md:text-lg text-blue-50 leading-snug mb-3">
                                            {r.title}
                                        </h3>
                                        <p className="text-sm text-blue-200/60 leading-relaxed flex-1">
                                            {r.body}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Urgency block */}
                <div className="wn-urgency rounded-[2.5rem] p-[1px] border border-blue-400/20 bg-gradient-to-b from-blue-400/15 to-transparent">
                    <div className="relative rounded-[2.5rem] overflow-hidden border border-blue-400/10 bg-[#050a15]/90 md:backdrop-blur-2xl">

                        {/* Top grid decoration */}
                        <div className="absolute inset-0 card-grid-pattern animate-grid-move opacity-10 pointer-events-none" />
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />

                        <div className="relative z-10 px-6 md:px-14 py-12 md:py-14 flex flex-col items-center text-center gap-8">

                            {/* Headline */}
                            <div className="space-y-3">
                                <div className="wn-u-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-400/20 text-[10px] font-bold text-orange-300 uppercase tracking-[0.18em]">
                                    <Lock className="w-3 h-3" />
                                    Price Has Never Been Offered Before
                                </div>
                                <h3 className="wn-u-line text-3xl md:text-4xl font-bold text-white leading-tight">
                                    This Price Has Never Been Offered Before
                                </h3>
                                <p className="wn-u-line text-blue-200/70 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                                    Delta has never offered this level of discount before. <br className="hidden md:block" />
                                    Once it ends, it&apos;s gone — forever.
                                </p>
                            </div>

                            {/* Deadline chip */}
                            <div className="wn-u-badge flex items-center gap-3 px-5 py-3 rounded-2xl bg-blue-600/10 border border-blue-300/15">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                                    <span className="text-xs font-bold text-red-300 uppercase tracking-widest">Deadline</span>
                                </div>
                                <div className="w-px h-4 bg-blue-400/20" />
                                <span className="text-sm font-bold text-blue-100">Secure your seat before <span className="text-white">March 31</span></span>
                            </div>

                            {/* Divider */}
                            <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />

                            {/* CTA */}
                            <div className="wn-cta flex flex-col sm:flex-row items-center gap-4">
                                <button className="cursor-pointer bg-linear-to-b from-white to-blue-200 text-black font-bold text-sm px-10 py-4 rounded-full flex items-center gap-3 hover:scale-105 active:scale-95 transition-transform shadow-[0_20px_60px_rgba(255,255,255,0.15)]">
                                    Start Now
                                    <span className="w-7 h-7 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                                        <ArrowRight className="w-4 h-4 text-white" />
                                    </span>
                                </button>
                                <span className="text-xs text-blue-300/50 font-medium">No hidden fees · Cancel anytime</span>
                            </div>
                        </div>

                        {/* Bottom rim glow */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
                    </div>
                </div>

            </div>
        </section>
    );
}
