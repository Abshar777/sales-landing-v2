"use client";
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Trophy, ShieldCheck, Unlink, UserCheck, Lightbulb,
    MonitorPlay, Signal, Bell, Infinity, Calendar,
    Star, Languages, HeartHandshake, Clock, History, Users
} from 'lucide-react';
import { MdOutlineBalance } from 'react-icons/md';

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

const rows = [
    { icon: Trophy,          label: 'Guinness World Record',       delta: 'Yes',             others: 'No' },
    { icon: ShieldCheck,     label: 'KHDA Accreditation',          delta: 'Yes',             others: 'Rare' },
    { icon: Unlink,          label: 'Broker Independent',          delta: '100%',            others: 'Often tied' },
    { icon: UserCheck,       label: 'SEBI Registered Mentor',      delta: 'Yes',             others: 'No' },
    { icon: Lightbulb,       label: 'Proprietary Strategies',      delta: 'Exclusive',       others: 'Generic content' },
    { icon: MonitorPlay,     label: 'Live Trading Sessions',       delta: 'Daily',           others: 'Occasional' },
    { icon: Signal,          label: 'Signal Accuracy Rate',        delta: '80–83%',          others: 'Unverified' },
    { icon: Bell,            label: 'Exclusive Signal Groups',     delta: 'Daily',           others: 'Rarely offered' },
    { icon: Infinity,        label: 'Lifetime Community Access',   delta: 'Lifetime',        others: 'Limited period' },
    { icon: Calendar,        label: 'Student Engagement Activities', delta: 'Monthly',       others: 'Rarely offered' },
    { icon: Star,            label: 'Gann Astro Program',          delta: 'Exclusive',       others: 'Not available' },
    { icon: Languages,       label: 'Multilingual Mentors',        delta: '5+ languages',    others: 'Usually 1–2' },
    { icon: HeartHandshake,  label: 'Loss Recovery Support',       delta: 'Available',       others: 'Rarely offered' },
    { icon: Clock,           label: '16-hour Daily Class Window',  delta: 'Yes',             others: 'Restricted hours' },
    { icon: History,         label: 'Years of Service',            delta: '8+ years',        others: 'Varies' },
    { icon: Users,           label: 'Students Enrolled',           delta: '7,000+',          others: 'Much fewer' },
];

// Values that are clearly negative for "others"
const negativeOthers = new Set(['No', 'Often tied', 'Generic content', 'Occasional', 'Unverified', 'Rarely offered', 'Limited period', 'Not available', 'Usually 1–2', 'Restricted hours', 'Varies', 'Much fewer']);

export default function ComparisonSection() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const subtitleSplit = SplitText.create('.cmp-subtitle', { type: 'words' });
        const mob = window.matchMedia('(max-width: 767px)').matches;
        const f = (px: number) => mob ? {} : { filter: `blur(${px}px)` };

        const tl = gsap.timeline({
            scrollTrigger: { trigger: container.current, start: 'top 82%' },
            defaults: { ease: 'power4.out' },
        });

        tl
            .from(['.cmp-line-1', '.cmp-line-2'], {
                opacity: 0, y: 65, ...f(16), stagger: 0.18, duration: 1.1,
            })
            .from(subtitleSplit.words, {
                opacity: 0, y: 24, ...f(8), stagger: 0.04, duration: 0.85,
            }, '-=0.55')
            .from('.cmp-header', {
                opacity: 0, y: 30, ...f(8), duration: 0.8,
            }, '-=0.4')
            .from('.cmp-row', {
                opacity: 0, y: 40, ...f(6),
                stagger: 0.055,
                duration: 0.7,
            }, '-=0.4');

        return () => { try { subtitleSplit.revert(); } catch (e) { } };
    }, { scope: container });

    return (
        <section ref={container} className="relative py-32 overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[700px] bg-blue-600/5 blur-[140px] pointer-events-none" />
            <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-700/8 blur-[100px] pointer-events-none rounded-full" />
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500/6 blur-[100px] pointer-events-none rounded-full" />

            <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">

                {/* Header */}
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <h2 className="font-medium text-4xl sm:text-6xl mb-8">
                        <span className="cmp-line-1 block bg-gradient-to-b from-blue-100 to-blue-200 bg-clip-text text-transparent">
                            What Sets Delta
                        </span>
                        <span className="cmp-line-2 flex items-center justify-center gap-3 bg-gradient-to-b from-blue-100 to-blue-200 bg-clip-text text-transparent">
                            Apart
                            <span className="inline-flex mt-2 items-center justify-center w-12 h-12 sm:w-10 sm:h-10 md:w-13 md:h-13 bg-linear-30 from-white to-blue-200 rounded-2xl rotate-[-10deg] shadow-2xl flex-shrink-0">
                                <MdOutlineBalance className="text-blue-900 font-bold text-2xl" />
                            </span>
                        </span>
                    </h2>
                    <p className="cmp-subtitle text-blue-200/90 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                        See how Delta stacks up against typical trading academies — the difference is clear.
                    </p>
                </div>

                {/* Table card */}
                <div className="rounded-[2.5rem] p-[1px] border border-blue-400/15 bg-gradient-to-b from-blue-400/10 to-transparent">
                    <div className="rounded-[2.5rem] overflow-hidden border border-blue-400/10 bg-[#050a15]/90 md:backdrop-blur-2xl">

                        {/* Column headers */}
                        <div className="cmp-header grid grid-cols-[1fr_80px_80px] sm:grid-cols-[1fr_130px_130px] md:grid-cols-[1fr_180px_180px] px-4 sm:px-6 md:px-10 py-5 border-b border-blue-200/8 bg-blue-600/5">
                            <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-blue-300/60">Feature</div>
                            <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-blue-300 text-center">
                                <span className="inline-flex items-center gap-1.5">
                                    <span className="hidden md:inline w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                                    Delta
                                </span>
                            </div>
                            <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-gray-500 text-center">Others</div>
                        </div>

                        {/* Rows */}
                        <div className="divide-y divide-blue-200/5">
                            {rows.map((row, i) => {
                                const Icon = row.icon;
                                const isNeg = negativeOthers.has(row.others);
                                return (
                                    <div
                                        key={i}
                                        className="cmp-row group grid grid-cols-[1fr_80px_80px] sm:grid-cols-[1fr_130px_130px] md:grid-cols-[1fr_180px_180px] items-center px-4 sm:px-6 md:px-10 py-4 md:py-5 hover:bg-blue-600/5 transition-colors duration-300"
                                    >
                                        {/* Feature label */}
                                        <div className="flex items-center gap-2 md:gap-3 pr-2 md:pr-4">
                                            <div className="flex-shrink-0 w-7 h-7 md:w-9 md:h-9 rounded-xl bg-blue-600/10 border border-blue-400/15 flex items-center justify-center group-hover:bg-blue-600/20 group-hover:border-blue-400/30 transition-all duration-300">
                                                <Icon className="w-3 h-3 md:w-4 md:h-4 text-blue-300/70 group-hover:text-blue-300 transition-colors" />
                                            </div>
                                            <span className="text-[12px] md:text-sm text-blue-100/80 font-medium leading-snug group-hover:text-blue-100 transition-colors">
                                                {row.label}
                                            </span>
                                        </div>

                                        {/* Delta value */}
                                        <div className="flex justify-center">
                                            <span className="inline-flex items-center justify-center gap-1 px-2 md:px-3.5 py-1 md:py-1.5 rounded-full bg-blue-500/15 border border-blue-400/25 text-[10px] md:text-xs font-bold text-blue-200 text-center leading-tight">
                                                <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                                                {row.delta}
                                            </span>
                                        </div>

                                        {/* Others value */}
                                        <div className="flex justify-center">
                                            <span className={`inline-flex items-center justify-center gap-1 px-2 md:px-3.5 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold text-center leading-tight ${isNeg
                                                    ? 'bg-red-500/8 border border-red-400/15 text-red-400/70'
                                                    : 'bg-white/5 border border-white/8 text-gray-500'
                                                }`}>
                                                {isNeg && <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-red-400/60 flex-shrink-0" />}
                                                {row.others}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Footer CTA */}
                        <div className="cmp-header px-5 md:px-10 py-6 border-t border-blue-200/8 bg-gradient-to-r from-blue-600/8 to-transparent flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <div className="text-sm font-bold text-blue-100">Ready to join the #1 trading academy?</div>
                                <div className="text-xs text-blue-300/50 mt-0.5">7,000+ students worldwide. Guinness World Record holder.</div>
                            </div>
                            <button className="flex-shrink-0 cursor-pointer bg-linear-to-b from-white to-blue-200 text-black font-bold text-xs px-6 py-3 rounded-full flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform shadow-xl">
                                Start with Delta
                                <span className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
