"use client";
import { useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Pause, Quote } from 'lucide-react';
import { MdOutlineVerified } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

const testimonials = [
  {
    name: "Jacob Levinrad",
    role: "Founder, Business Accelerator",
    quote: "If you're looking for expert traders and analysts, I highly recommend you use Delta. Great product, great team. Shoutout to the support!",
    video: "/video/r1.mp4",
    color: "from-blue-600 to-blue-800",
  },
  {
    name: "Luke Lintz",
    role: "CEO, HighKey Agency",
    quote: "Through Delta, we found a strategist who already closed $30k and collected in just 4 weeks. The quality of talent here is unmatched.",
    video: "/video/r2.mp4",
    color: "from-indigo-600 to-blue-800",
  },
  {
    name: "Cooper Matusiak",
    role: "Founder, Sales Guys",
    quote: "Delta filled that gap with high-end trading talent. Our portfolio has never looked better since we started using their sessions.",
    video: "/video/r3.mp4",
    color: "from-blue-700 to-indigo-900",
  },
  {
    name: "Sarah Jenkins",
    role: "Independent Investor",
    quote: "The live sessions are incredible. I've learned more in two weeks with Delta than I did in two years of self-study.",
    video: "/video/r4.mp4",
    color: "from-blue-500 to-blue-700",
  },
  {
    name: "Ahmed Al Rashidi",
    role: "Professional Forex Trader",
    quote: "Delta's live trading room changed everything for me. The signals are accurate, the coaches are world-class, and the community keeps you accountable.",
    video: "/video/r5.mp4",
    color: "from-blue-800 to-indigo-900",
  },
  {
    name: "James Wilson",
    role: "Portfolio Manager",
    quote: "I've tried every trading course out there. Delta is the only one with real-time sessions and a team that actually trades alongside you.",
    video: "/video/r6.mp4",
    color: "from-indigo-700 to-blue-900",
  },
  {
    name: "Elena Rodriguez",
    role: "Commodities Specialist",
    quote: "From my first session I knew this was different. The depth of knowledge, the live trades, the Guinness record — Delta is truly world-class.",
    video: "/video/r7.mp4",
    color: "from-blue-600 to-indigo-800",
  },
];

// ── Lazy video card ────────────────────────────────────────────────────────────
// - preload="none": zero bytes loaded until play pressed
// - src set imperatively on first play (no React re-render needed)
// - IntersectionObserver pauses when card leaves viewport / Swiper slides away
function VideoCard({ src }: { src: string }) {
  const videoRef    = useRef<HTMLVideoElement>(null);
  const wrapRef     = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  // Pause when scrolled away or Swiper pushes card off-screen
  const setupObserver = useCallback((el: HTMLDivElement | null) => {
    (wrapRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && videoRef.current) {
          videoRef.current.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
  }, []);

  const handlePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
    setPlaying(true);
  }, []);

  const handlePause = useCallback(() => {
    videoRef.current?.pause();
    setPlaying(false);
  }, []);

  return (
    <div
      ref={setupObserver}
      className="relative aspect-video rounded-[2rem] overflow-hidden border border-blue-400/10 mb-8 shadow-2xl bg-[#020810] cursor-pointer"
      onClick={playing ? handlePause : handlePlay}
    >
      {/* Actual video — src injected lazily on first play */}
      {/* preload="metadata": browser loads first frame only — shows as thumbnail, no full download */}
      <video
        ref={videoRef}
        src={src}
        preload="metadata"
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        onEnded={() => setPlaying(false)}
      />

      {/* Overlay: dark gradient + play/pause button */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-2 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.1) 100%)',
          opacity: playing ? 0 : 1,
          pointerEvents: playing ? 'none' : 'auto',
        }}
      >
        <div className="w-16 h-16 rounded-full bg-white/10 border border-white/25 flex items-center justify-center hover:scale-110 hover:bg-white/20 transition-all duration-300 shadow-2xl">
          <Play className="w-6 h-6 text-white fill-white ml-1" />
        </div>
        <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold mt-1">Watch Story</span>
      </div>

      {/* Pause button while playing */}
      {playing && (
        <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black/40 border border-white/10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
          <Pause className="w-4 h-4 text-white fill-white" />
        </div>
      )}
    </div>
  );
}

// ── Avatar initials ────────────────────────────────────────────────────────────
function Avatar({ name, gradient }: { name: string; gradient: string }) {
  const initials = name.split(' ').slice(0, 2).map(n => n[0]).join('');
  return (
    <div className={`relative w-10 h-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(59,130,246,0.4)]`}>
      <span className="text-[11px] font-bold text-white">{initials}</span>
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────────
export default function TestimonialsSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const subtitleSplit = SplitText.create('.test-subtitle', { type: 'words' });
    const mob = window.matchMedia('(max-width: 767px)').matches;
    const f   = (px: number) => mob ? {} : { filter: `blur(${px}px)` };

    const tl = gsap.timeline({
      scrollTrigger: { trigger: container.current, start: 'top 82%' },
      defaults: { ease: 'power4.out' },
    });

    tl
      .from(['.test-line-1', '.test-line-2'], {
        opacity: 0, y: 65, ...f(16), stagger: 0.18, duration: 1.1,
      })
      .from(subtitleSplit.words, {
        opacity: 0, y: 24, ...f(8), stagger: 0.04, duration: 0.85,
      }, '-=0.55')
      .from('.test-card', {
        opacity: 0, y: 80, rotateX: 16, ...f(10), transformPerspective: 900, stagger: 0.12, duration: 1.1,
      }, '-=0.5');

    return () => { try { subtitleSplit.revert(); } catch (e) { } };
  }, { scope: container });

  return (
    <section ref={container} className="relative py-32 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-[600px] bg-brand-blue/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto px-6 text-center mb-24">
          <h2 className="font-medium text-4xl sm:text-6xl mb-8">
            <span className="test-line-1 block bg-gradient-to-b from-blue-100 to-blue-200 bg-clip-text text-transparent">
              What Our
            </span>
            <span className="test-line-2 flex items-center justify-center gap-3 bg-gradient-to-b from-blue-100 to-blue-200 bg-clip-text text-transparent">
              Clients
              <span className="inline-flex mt-2 items-center justify-center w-12 h-12 sm:w-10 sm:h-10 md:w-13 md:h-13 bg-linear-30 from-white to-blue-200 rounded-2xl rotate-[-10deg] shadow-2xl flex-shrink-0">
                <MdOutlineVerified className="text-blue-900 font-bold text-2xl" />
              </span>
              Say
            </span>
          </h2>
          <p className="test-subtitle text-blue-200/90 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Hear from founders and traders who&apos;ve scaled faster with Delta.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative group">
          <div className="absolute left-0 hidden md:block top-0 bottom-0 w-32 bg-gradient-to-r from-[#010406] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 hidden md:block top-0 bottom-0 w-32 bg-gradient-to-l from-[#010406] to-transparent z-20 pointer-events-none" />

          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            slidesPerView="auto"
            centeredSlides={true}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            className="pb-12 !px-12"
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index} className="!w-[280px] sm:!w-[340px] md:!w-[440px]">
                <div className="test-card rounded-[2.5rem] p-[1px] border border-blue-400/15 h-full bg-gradient-to-b from-blue-400/10 to-transparent">
                  <div className="relative rounded-[2.5rem] p-4 sm:p-6 md:p-8 border border-blue-400/10 bg-[#050a15]/90 overflow-hidden card-rim-light h-full flex flex-col">
                    {/* Bottom glow */}
                    <div className="absolute inset-0 card-glow-bottom opacity-60 pointer-events-none" />

                    <div className="relative z-10 flex flex-col h-full">
                      {/* Lazy video */}
                      <VideoCard src={item.video} />

                      {/* Quote */}
                      <div className="mb-8 relative flex-1">
                        <Quote className="absolute -top-4 -left-2 w-8 h-8 text-blue-400/10 -z-10" />
                        <p className="text-sm md:text-base text-blue-200/80 leading-relaxed italic">
                          &ldquo;{item.quote}&rdquo;
                        </p>
                      </div>

                      {/* Author */}
                      <div className="flex items-center gap-4 pt-6 border-t border-blue-200/5">
                        <Avatar name={item.name} gradient={item.color} />
                        <div>
                          <div className="font-bold text-white text-sm">{item.name}</div>
                          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">{item.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
