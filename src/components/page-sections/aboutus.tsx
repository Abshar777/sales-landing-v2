"use client";
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp } from 'lucide-react';
import { MdArrowOutward } from 'react-icons/md';

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

const stats = [
  { value: '7,000+', label: 'Students' },
  { value: 'Since 2017', label: 'Established' },
  { value: 'KHDA', label: 'Accredited' },
  { value: 'Guinness', label: 'World Record' },
];

export default function TradingTeamSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const subtitleSplit = SplitText.create('.team-subtitle', { type: 'words' });
    const mob = window.matchMedia('(max-width: 767px)').matches;
    const f = (px: number) => mob ? {filter: `blur(${px}px)`} : { filter: `blur(${px}px)` };

    const tl = gsap.timeline({
      scrollTrigger: { trigger: container.current, start: 'top 82%' },
      defaults: { ease: 'power4.out' },
    });

    tl
      .from(['.team-line-1', '.team-line-2'], {
        opacity: 0, y: 65, ...f(16), stagger: 0.18, duration: 1.1,
      })
      .from(subtitleSplit.words, {
        opacity: 0, y: 24, ...f(8), stagger: 0.04, duration: 0.85,
      }, '-=0.55')
      .from('.team-card', {
        opacity: 0, y: 80, ...f(12), rotateX: 14, duration: 1.3,
      }, '-=0.5')
      .from('.stat-item', {
        opacity: 0, y: 20, ...f(8), stagger: 0.1, duration: 0.7,
      }, '-=0.6')
      .from('.team-footer', {
        opacity: 0, y: 30, ...f(8), duration: 0.9,
      }, '-=0.5');

    return () => { try { subtitleSplit.revert(); } catch(e) {} };
  }, { scope: container });

  return (
    <section ref={container} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[600px] bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 md:px-6 relative z-10">

        {/* Header */}
        <div className="text-center flex flex-col items-center mb-14 md:mb-20">
          <h2 className="font-medium mt-6 mb-6 text-4xl sm:text-5xl md:text-6xl">
            <span className="team-line-1 block bg-gradient-to-b from-blue-100 to-blue-200 bg-clip-text text-transparent">
              Build Your Dream
            </span>
            <span className="team-line-2 flex items-center justify-center gap-3 bg-gradient-to-b from-blue-100 to-blue-200 bg-clip-text text-transparent">
              Trading
              <span className="inline-flex mt-1 items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-linear-30 from-white to-blue-200 rounded-2xl rotate-[-10deg] shadow-2xl flex-shrink-0">
                <TrendingUp className="text-blue-900 font-bold w-5 h-5 sm:w-6 sm:h-6" />
              </span>
              Team
            </span>
          </h2>
          <p className="team-subtitle text-blue-200/70 text-sm md:text-base max-w-md mx-auto leading-relaxed">
            Hire expert traders to manage your portfolio — fast, proven, and ready to scale.
          </p>
        </div>

        {/* Card */}
        <div className="team-card p-[1px] rounded-[2.5rem] bg-gradient-to-b from-blue-400/20 to-blue-400/5">
          <div className="rounded-[2.5rem] bg-[#050a15]/95 md:backdrop-blur-xl overflow-hidden border border-white/5">

            <div className="flex flex-col lg:flex-row">

              {/* Image panel */}
              <div className="relative w-full lg:w-[45%] flex-shrink-0 min-h-[260px] sm:min-h-[320px] lg:min-h-0">
                <img
                  src="/g4.webp"
                  alt="Delta International Institute"
                  className="w-full h-full object-cover object-top"
                />
                {/* Gradient fade — bottom on mobile, right on desktop */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050a15] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#050a15]" />
                {/* Accent badge */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 md:backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                  <span className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">Est. 2017</span>
                </div>
              </div>

              {/* Content panel */}
              <div className="flex-1 flex flex-col justify-between p-6 sm:p-8 lg:p-10">

                {/* Top: title + bio */}
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-400/20">
                      <img src="/logo.webp" alt="Delta" className="w-7 h-7 object-contain" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold leading-tight">Delta International Institute</h3>
                      <p className="text-[10px] text-blue-400/70 uppercase tracking-widest font-bold">Guinness World Record Holder</p>
                    </div>
                  </div>

                  <p className="text-sm md:text-[15px] text-blue-100/60 leading-relaxed mb-8">
                    Since 2017, Delta International Institute has been transforming complete beginners into confident, profitable forex traders — backed by KHDA accreditation, a Guinness World Record, and a community of 7,000+ students across India and the UAE. Our expert mentors bring real market experience into every live session, equipping you with proprietary strategies and the mindset to trade independently.
                  </p>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                  {stats.map((s) => (
                    <div key={s.label} className="stat-item rounded-2xl p-3 bg-blue-500/5 border border-blue-400/10 text-center">
                      <div className="text-sm md:text-base font-bold text-blue-100">{s.value}</div>
                      <div className="text-[9px] text-blue-300/50 uppercase tracking-widest mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button className="self-start flex items-center gap-3 px-7 py-3 bg-gradient-to-b from-white to-blue-200 text-black rounded-full font-bold text-sm whitespace-nowrap transition-transform hover:scale-105 active:scale-95 shadow-xl">
                  Start now
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <MdArrowOutward className="text-white text-sm" />
                  </div>
                </button>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
