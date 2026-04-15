import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Play, ArrowRight, ShieldCheck, User, Users } from 'lucide-react';
import { motion } from 'motion/react';

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

export default function PricingSection() {
    const container = useRef<HTMLDivElement>(null);
    const [plan, setPlan] = useState<'traders' | 'teams'>('traders');

    useGSAP(() => {
        const subtitleSplit = SplitText.create('.pricing-subtitle', { type: 'words' });
        const mob = window.matchMedia('(max-width: 767px)').matches;
        const f = (px: number) => mob ? {filter: `blur(${px}px)`} : { filter: `blur(${px}px)` };

        const tl = gsap.timeline({
            scrollTrigger: { trigger: container.current, start: 'top 82%' },
            defaults: { ease: 'power4.out' },
        });

        tl
            .from(['.pricing-line-1', '.pricing-line-2'], {
                opacity: 0, y: 65, ...f(16), stagger: 0.18, duration: 1.1,
            })
            .from(subtitleSplit.words, {
                opacity: 0, y: 24, ...f(8), stagger: 0.04, duration: 0.85,
            }, '-=0.55')
            .from('.pricing-toggle', {
                opacity: 0, y: 24, ...f(8), duration: 0.8,
            }, '-=0.4')
            .from('.pricing-card', {
                opacity: 0, y: 90, rotateX: 16, ...f(10), transformPerspective: 900, stagger: 0.18, duration: 1.2,
            }, '-=0.5');

        return () => { try { subtitleSplit.revert(); } catch(e) {} };
    }, { scope: container });

    const features = [
        "Get immediate access to the Delta trade pool",
        "Over 25+ hours of trading training",
        "Weekly live trading calls",
        "Land a quality trading job and get better"
    ];

    return (
        <section ref={container} className="relative bg-black py-10 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-[600px] bg-brand-blue/5 blur-[120px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    {/* <div className="pricing-badge inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Flat Price Trading
          </div> */}
                    <h2 className="font-medium mb-8 text-4xl sm:text-6xl">
                        <span className="pricing-line-1 block bg-gradient-to-b from-blue-100 to-blue-200 bg-clip-text text-transparent">
                            One Price
                        </span>
                        <span className="pricing-line-2 flex items-center justify-center gap-3 bg-gradient-to-b from-blue-100 to-blue-200 bg-clip-text text-transparent">
                            Full
                            <span className="inline-flex items-center justify-center w-12 h-12 sm:w-10 sm:h-10 md:w-13 md:h-13 bg-linear-30 from-white to-blue-200 rounded-2xl rotate-[-10deg] shadow-2xl flex-shrink-0">
                                <ShieldCheck className="text-blue-900 font-bold text-2xl" />
                            </span>
                            Access
                        </span>
                    </h2>
                    <p className="pricing-subtitle text-blue-200/90 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                        Delta connects you to expert traders and real-time sessions — no hidden fees, no surprises.
                    </p>
                </div>

                {/* Toggle */}
                <div className="pricing-toggle flex justify-center mb-16">
                    <div className="bg-blue-600/5 border md:backdrop-blur-3xl border-blue-200/10 p-1.5 rounded-full flex items-center gap-2">
                        <button
                            onClick={() => setPlan('traders')}
                            className={`relative px-6 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 z-10 ${plan === 'traders' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                            {plan === 'traders' && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-linear-to-bl to-blue-700/60 from-blue-800 rounded-full shadow-[0_0_10px_4px_#193cb885] -z-10"
                                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <User className="w-3.5 h-3.5" />
                            Traders
                        </button>
                        <button
                            onClick={() => setPlan('teams')}
                            className={`relative px-6 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 z-10 ${plan === 'teams' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                            {plan === 'teams' && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-linear-to-bl to-blue-700/60 from-blue-800 rounded-full shadow-[0_0_10px_4px_#193cb885] -z-10"
                                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <Users className="w-3.5 h-3.5" />
                            Teams
                        </button>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    {/* Left Card: Pricing */}
                    <div className="p-1 pricing-card  rounded-[3rem] border border-blue-500/15 bg-[#050a15]/60 md:backdrop-blur-2xl">
                        <div className="group relative rounded-[3rem] p-10 md:p-10 border border-blue-600/10 bg-[#050a15]/60 md:backdrop-blur-2xl overflow-hidden flex flex-col card-rim-light">
                            {/* Grid Background */}
                            <div className="absolute inset-0 card-grid-pattern animate-grid-move opacity-20 pointer-events-none" />

                            {/* Card Glare */}
                            <div className="absolute inset-0 card-glare pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-700" />

                            <div className="relative z-10 flex-1">
                                <div className="text-gray-400 font-bold text-[13px] mb-4 uppercase tracking-[0.2em]">
                                    {plan === 'traders' ? 'Individual Traders' : 'Trading Teams'}
                                </div>
                                <div className="flex items-baseline gap-2 mb-12">
                                    <span className="text-6xl  font-bold tracking-tighter text-blue-100">${plan === 'traders' ? '297' : '997'}</span>
                                    <span className="text-blue-200 font-medium text-lg">/mo</span>
                                </div>

                                <div className="space-y-6 mb-14">
                                    {features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-5 group/item">
                                            <div className="w-6 h-6 rounded-full bg-blue-800/10 border border-brand-blue/30 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-brand-blue/30 transition-all duration-300">
                                                <Check className="w-3.5 h-3.5 text-brand-blue stroke-[3]" />
                                            </div>
                                            <span className="text-blue-200 text-[15px] leading-relaxed group-hover/item:text-gray-200 transition-colors">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative z-10">
                                <button className="w-3/4 mx-auto py-3 rounded-full relative cursor-pointer bg-linear-to-b from-white to-blue-200  text-black font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(255,255,255,0.1)]">
                                    Join Delta Now
                                    <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center">
                                        <ArrowRight className="w-4 h-4 text-white" />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Right Card: Testimonial/Video */}
                     <div className="p-1 pricing-card rounded-[3rem] border border-blue-500/15 bg-[#050a15]/60 md:backdrop-blur-2xl">
                    <div className=" group relative rounded-[3rem]  p-4 border border-white/10 bg-[#050a15]/60 md:backdrop-blur-2xl overflow-hidden flex flex-col card-rim-light">
                        {/* Grid Background */}
                        <div className="absolute inset-0 card-grid-pattern animate-grid-move opacity-20 pointer-events-none" />

                        {/* Card Glare */}
                        <div className="absolute inset-0 card-glare pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="relative  z-10 flex-1">
                            {/* Video Thumbnail */}
                            <div className="relative aspect-video rounded-4xl overflow-hidden border border-blue-400/10 mb-12 group/video shadow-2xl">
                                <video
                                    src="/video/hero.mp4"
                                    loop
                                    controls={false}
                                    muted
                                    autoPlay
                                    playsInline
                                    preload="none"
                                    className="w-full h-full object-cover opacity-70 group-hover/video:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <button className="w-20 h-20 rounded-full bg-white/10 md:backdrop-blur-2xl border border-white/20 flex items-center justify-center group/btn hover:scale-110 transition-all duration-500 shadow-2xl">
                                        <Play className="w-8 h-8 text-white fill-white ml-1" />
                                    </button>
                                </div>
                            </div>

                            {/* Quote */}
                            <blockquote className="mb-4 px-4">
                                <p className="text-lg    text-gray-200 italic tracking-tight">
                                    "I joined Delta and hit my first $10k month within 30 days. The live sessions are a game changer for anyone serious about trading."
                                </p>
                            </blockquote>
                        </div>

                        {/* Author */}
                        <div className="relative px-4 z-10 flex items-center gap-5 py-1 border-t border-blue-200/5">
                            <div className="relative">
                                <div className="absolute inset-0 bg-brand-blue/20 blur-lg rounded-full" />
                                <img
                                    src="https://picsum.photos/seed/trader-avatar/100/100"
                                    alt="KT Hustles"
                                    className="relative w-14 h-14 rounded-full border-2 border-blue-200/10 object-cover"
                                    referrerPolicy="no-referrer"
                                />
                            </div>
                            <div>
                                <div className="font-bold text-white text-lg">KT Hustles</div>
                                <div className="text-[11px] text-gray-500 font-bold uppercase tracking-[0.2em]">Independent Trader</div>
                            </div>
                        </div>
                    </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
