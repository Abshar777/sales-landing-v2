"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CANDLES = [
  { x: 55,  open: 148, close: 132, high: 154, low: 128 },
  { x: 105, open: 132, close: 142, high: 148, low: 128 },
  { x: 155, open: 142, close: 124, high: 147, low: 120 },
  { x: 205, open: 124, close: 136, high: 140, low: 120 },
  { x: 255, open: 136, close: 118, high: 141, low: 114 },
  { x: 305, open: 118, close: 106, high: 122, low: 102 },
  { x: 355, open: 106, close: 120, high: 125, low: 102 },
  { x: 405, open: 120, close: 108, high: 126, low: 104 },
  { x: 455, open: 108, close:  90, high: 112, low:  86 },
  { x: 505, open:  90, close:  78, high:  94, low:  74 },
  { x: 555, open:  78, close:  92, high:  96, low:  74 },
  { x: 605, open:  92, close:  72, high:  96, low:  68 },
  { x: 655, open:  72, close:  58, high:  76, low:  54 },
  { x: 705, open:  58, close:  48, high:  62, low:  44 },
  { x: 755, open:  48, close:  36, high:  52, low:  32 },
];

const LINE_PATH =
  "M 30,152 C 55,148 80,138 105,142 C 130,146 155,130 180,128 " +
  "C 205,126 230,132 255,122 C 280,112 305,108 330,112 " +
  "C 355,116 380,114 405,112 C 430,110 455,96 480,88 " +
  "C 505,80 530,76 555,84 C 580,92 605,78 630,70 " +
  "C 655,62 680,52 705,50 C 730,48 755,40 780,36";

const TICKERS = [
  { pair: "XAUUSD", price: "2,341.50", change: "+2.41%", bull: true },
  { pair: "EURUSD", price: "1.0842",   change: "−0.32%", bull: false },
  { pair: "BTC/USD", price: "67,420",  change: "+4.18%", bull: true },
  { pair: "GBPUSD", price: "1.2714",   change: "+0.87%", bull: true },
  { pair: "US30",   price: "38,950",   change: "+1.23%", bull: true },
  { pair: "NASDAQ", price: "17,842",   change: "+2.05%", bull: true },
  { pair: "USOIL",  price: "82.14",    change: "−1.14%", bull: false },
  { pair: "USDJPY", price: "151.34",   change: "+0.56%", bull: true },
];

const SESSIONS = [
  { name: "Tokyo",  time: "09:45", status: "open" },
  { name: "London", time: "01:45", status: "open" },
  { name: "New York", time: "20:45", status: "closed" },
];

interface Props {
  onExitStart: () => void;
  onComplete: () => void;
}

export default function Preloader({ onExitStart, onComplete }: Props) {
  const wrapRef    = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const pathRef    = useRef<SVGPathElement>(null);
  const dotRef     = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const wrap    = wrapRef.current;
    const counter = counterRef.current;
    const path    = pathRef.current;
    const dot     = dotRef.current;
    if (!wrap || !counter || !path || !dot) return;

    const pathLen = path.getTotalLength();
    gsap.set(path, { strokeDasharray: pathLen, strokeDashoffset: pathLen });

    const mob = window.matchMedia('(max-width: 767px)').matches;
    const f = (px: number) => mob ? {} : { filter: `blur(${px}px)` };

    gsap.set(".pre-logo",      { opacity: 0, y: 30, ...f(20) });
    gsap.set(".pre-counter",   { opacity: 0 });
    gsap.set(".pre-label",     { opacity: 0 });
    gsap.set(".pre-candle",    { scaleY: 0, transformOrigin: "bottom center" });
    gsap.set(".pre-ticker",    { opacity: 0, x: 20 });
    gsap.set(".pre-chart",     { opacity: 0 });
    gsap.set(".pre-grid-line", { scaleX: 0, transformOrigin: "left center" });
    gsap.set(".pre-status",    { opacity: 0, y: -10 });
    gsap.set(".pre-session",   { opacity: 0, y: 8 });
    gsap.set(dot,              { opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        // Notify page to mount Hero BEFORE wipe starts
        onExitStart();
        const exitTl = gsap.timeline({ onComplete });
        exitTl.to(wrap, {
          clipPath: "inset(100% 0% 0% 0%)",
          duration: 0.85,
          ease: "power4.inOut",
        });
      },
    });

    // grid lines
    tl.to(".pre-grid-line", { scaleX: 1, stagger: 0.05, duration: 0.5, ease: "power2.out" }, 0);
    // status bar
    tl.to(".pre-status",  { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: "power3.out" }, 0.1);
    tl.to(".pre-session", { opacity: 1, y: 0, stagger: 0.1,  duration: 0.5, ease: "power3.out" }, 0.2);
    // ticker items
    tl.to(".pre-ticker",  { opacity: 1, x: 0, stagger: 0.07, duration: 0.5, ease: "power3.out" }, 0.3);
    // logo
    tl.to(".pre-logo",    { opacity: 1, y: 0, ...f(0), duration: 1, ease: "power4.out" }, 0.4);
    // chart
    tl.to(".pre-chart",   { opacity: 1, duration: 0.4 }, 0.7);
    // chart line draw
    tl.to(path, { strokeDashoffset: 0, duration: 2, ease: "power2.inOut" }, 0.8);
    // candles
    tl.to(".pre-candle",  { scaleY: 1, stagger: 0.08, duration: 0.5, ease: "back.out(1.4)" }, 1.0);
    // counter
    tl.to(".pre-counter", { opacity: 1, duration: 0.3 }, 0.8);
    tl.to(".pre-label",   { opacity: 1, duration: 0.4 }, 0.9);

    const countObj = { val: 0 };
    tl.to(countObj, {
      val: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counter) counter.textContent = String(Math.round(countObj.val)).padStart(3, "0");
      },
    }, 0.8);

    // dot at end of path
    tl.to(dot, { opacity: 1, duration: 0.3 }, 2.6);
    tl.to(dot, { attr: { r: 8 }, opacity: 0.6, duration: 0.35, repeat: 1, yoyo: true }, 2.7);
    tl.to(dot, { attr: { r: 5 }, opacity: 1,   duration: 0.2 }, 3.3);

    // flash at 100%
    tl.to(".pre-counter", { scale: 1.05, duration: 0.15 }, 2.75);
    tl.to(".pre-counter", { scale: 1,    duration: 0.2  }, 2.9);

    // brief pause
    tl.to({}, { duration: 0.25 }, 3.3);

    return () => { tl.kill(); };
  }, [onExitStart, onComplete]);

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[200] flex flex-col overflow-hidden"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(37,99,235,0.18) 0%, transparent 70%), #010406",
        clipPath: "inset(0% 0% 0% 0%)",
      }}
    >
      {/* Horizontal grid lines */}
      <div className="absolute inset-0 flex flex-col justify-around pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="pre-grid-line h-[1px] w-full bg-blue-400/[0.06]" />
        ))}
      </div>
      {/* Vertical grid lines */}
      <div className="absolute inset-0 flex flex-row justify-around pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="pre-grid-line w-[1px] h-full bg-blue-400/[0.06]"
            style={{ transformOrigin: "top center" }} />
        ))}
      </div>

      {/* ── TOP BAR ── */}
      <div className="relative z-10 border-b border-blue-400/10 flex flex-col w-full">

        {/* Row 1 — status left · sessions center · badges right — full width */}
        <div className="w-full flex items-center justify-between px-4 md:px-8 py-2 border-b border-blue-400/[0.06]">
          {/* Left: Live pulse */}
          <div className="pre-status flex items-center gap-2 flex-shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400" />
            </span>
            <span className="text-[10px] font-bold text-blue-300/70 uppercase tracking-widest">Market Live</span>
          </div>

          {/* Center: trading sessions — spread evenly */}
          <div className="flex items-center gap-4 md:gap-8">
            {/* {SESSIONS.map((s) => (
              <div key={s.name} className="pre-session flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"
                  style={{ opacity: s.status === "open" ? 0.9 : 0.25 }} />
                <span className="text-[9px] font-bold uppercase tracking-widest text-blue-200/60">{s.name}</span>
                <span className="hidden sm:inline text-[9px] tabular-nums text-blue-300/35 font-medium">{s.time} UTC</span>
                <span className="text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border"
                  style={{
                    color: s.status === "open" ? "rgba(147,197,253,0.7)" : "rgba(147,197,253,0.25)",
                    borderColor: s.status === "open" ? "rgba(147,197,253,0.2)" : "rgba(147,197,253,0.08)",
                  }}>
                  {s.status}
                </span>
              </div>
            ))} */}
          </div>

          {/* Right: badges */}
          <div className="pre-status flex items-center gap-3 flex-shrink-0">
            <span className="hidden md:inline text-[9px] font-bold text-blue-300/40 uppercase tracking-widest px-2.5 py-1 rounded-full border border-blue-400/10">
              KHDA Accredited
            </span>
            <span className="hidden md:inline text-[9px] font-bold text-blue-300/40 uppercase tracking-widest px-2.5 py-1 rounded-full border border-blue-400/10">
              Guinness Record
            </span>
            <span className="text-[9px] font-bold text-blue-300/40 uppercase tracking-widest">Est. 2017</span>
          </div>
        </div>

        {/* Row 2 — tickers spread full width */}
        {/* <div className="w-full flex items-center justify-between px-4 md:px-8 py-2">
          {TICKERS.map((t) => (
            <div key={t.pair} className="pre-ticker flex items-center gap-1.5 flex-shrink-0">
              <span className="text-[10px] font-bold text-blue-100/55 uppercase tracking-wide">{t.pair}</span>
              <span className="hidden sm:inline text-[10px] tabular-nums text-blue-300/35">{t.price}</span>
              <span className="text-[9px] font-bold text-blue-300/50 px-1.5 py-0.5 rounded border border-blue-400/15 bg-blue-500/5">
                {t.change}
              </span>
            </div>
          ))}
        </div> */}
      </div>

      {/* ── MAIN BODY ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-6 px-6">

        {/* Logo */}
        <div className="pre-logo flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-400/20 shadow-[0_0_40px_rgba(59,130,246,0.15)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.webp" alt="Delta" width={40} height={40} className="object-contain" />
          </div>
          <div>
            <div className="text-xl md:text-2xl font-bold tracking-tight text-white">Delta</div>
            <div className="text-[9px] text-blue-300/50 uppercase tracking-[0.2em] font-bold">International Institute</div>
          </div>
        </div>

        {/* Counter */}
        <div className="flex flex-col items-center gap-1">
          <div className="pre-counter flex items-start leading-none">
            <span
              ref={counterRef}
              className="text-[clamp(4.5rem,16vw,10rem)] font-bold tabular-nums text-white"
              style={{ letterSpacing: "-0.04em", lineHeight: 1 }}
            >000</span>
            <span className="text-[clamp(1.2rem,3.5vw,3rem)] font-bold text-blue-300/50 mt-2 ml-1">%</span>
          </div>
          <p className="pre-label text-[10px] text-blue-300/35 uppercase tracking-[0.25em] font-bold">
            Loading Market Data
          </p>
        </div>

        {/* Chart */}
        <div className="pre-chart w-full max-w-[820px]">
          <svg viewBox="0 0 820 180" className="w-full h-auto overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(59,130,246,0.25)" />
                <stop offset="100%" stopColor="rgba(59,130,246,0)" />
              </linearGradient>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(59,130,246,0.4)" />
                <stop offset="100%" stopColor="rgba(147,197,253,1)" />
              </linearGradient>
            </defs>
            <path d={LINE_PATH + " L 780,180 L 30,180 Z"} fill="url(#chartFill)" opacity="0.5" />
            {CANDLES.map((c, i) => {
              const bull  = c.close >= c.open;
              const bodyY = Math.min(c.open, c.close);
              const bodyH = Math.abs(c.close - c.open) || 2;
              const color = bull ? "rgba(147,197,253,0.9)" : "rgba(59,130,246,0.5)";
              return (
                <g key={i} className="pre-candle">
                  <line x1={c.x} y1={c.high} x2={c.x} y2={c.low} stroke={color} strokeWidth="1" />
                  <rect x={c.x - 7} y={bodyY} width={14} height={bodyH} fill={color} rx="1" />
                </g>
              );
            })}
            <path
              ref={pathRef}
              d={LINE_PATH}
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 6px rgba(147,197,253,0.7))" }}
            />
            <circle
              ref={dotRef}
              cx="780" cy="36" r="5"
              fill="rgba(147,197,253,1)"
              style={{ filter: "drop-shadow(0 0 8px rgba(147,197,253,0.9))" }}
            />
          </svg>
        </div>

      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="relative z-10 border-t border-blue-400/10 py-2.5 px-4 md:px-6 flex items-center justify-between">
        <span className="text-[9px] text-blue-300/25 uppercase tracking-widest font-bold">
          Guinness World Record Holder
        </span>
        <span className="text-[9px] text-blue-300/25 uppercase tracking-widest font-bold">
          Delta International Institute · Est. 2017
        </span>
      </div>
    </div>
  );
}
