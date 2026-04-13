"use client";
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

export default function Footer() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const brandSplit = SplitText.create('.footer-brand', { type: 'chars' });
    const mob = window.matchMedia('(max-width: 767px)').matches;
    const f = (px: number) => mob ? {} : { filter: `blur(${px}px)` };

    const tl = gsap.timeline({
      scrollTrigger: { trigger: container.current, start: 'top 92%' },
      defaults: { ease: 'power4.out' },
    });

    tl
      .from('.footer-card', {
        opacity: 0, y: 60, rotateX: 12, ...f(14), transformPerspective: 900, duration: 1.2,
      })
      .from(brandSplit.chars, {
        opacity: 0, y: 30, ...f(8), stagger: { amount: 0.35 }, duration: 0.9,
      }, '-=0.7')
      .from('.footer-btn', {
        opacity: 0, y: 20, ...f(6), duration: 0.7,
      }, '-=0.5')
      .from('.footer-link', {
        opacity: 0, x: -16, ...f(6), stagger: 0.07, duration: 0.65,
      }, '-=0.55');

    return () => { try { brandSplit.revert(); } catch(e) {} };
  }, { scope: container });

  return (
    <footer ref={container} className="relative px-4 pb-6 overflow-hidden">
      {/* Cone beam — apex pointing up, blending down into the footer card */}
    

      {/* Footer card */}
      <div className="footer-card relative max-w-6xl mx-auto rounded-[2.2rem] border border-blue-400/15 bg-[#050a15]/80 backdrop-blur-2xl overflow-hidden card-rim-light">
        {/* Subtle card glare */}
        <div className="absolute inset-0 card-glare pointer-events-none opacity-40" />
        {/* Animated grid overlay */}
        <div className="absolute inset-0 card-grid-pattern animate-grid-move opacity-[0.06] pointer-events-none" />
        {/* Bottom glow */}
        <div className="absolute inset-0 card-glow-bottom opacity-60 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-10 px-10 py-10">

          {/* LEFT — Brand + CTA */}
          <div className="flex flex-col gap-5 min-w-[180px]">
            <div className="flex items-center gap-3">
              <img src="/logo.webp" alt="Delta" className="w-10 h-10 object-contain" />
              <span className="footer-brand text-3xl font-bold tracking-tight text-white">Delta</span>
            </div>
            <a
              href="#"
              className="footer-btn inline-flex items-center gap-2.5 self-start px-5 py-2.5 rounded-full border border-blue-400/20 bg-blue-500/5 backdrop-blur-md text-sm font-semibold text-white hover:bg-blue-500/15 hover:border-blue-400/40 transition-colors duration-300 group"
            >
              Join Delta
              <span className="w-5 h-5 rounded-full bg-white/10 border border-white/10 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors duration-300">
                <ArrowRight className="w-3 h-3 text-white" />
              </span>
            </a>
          </div>

          {/* CENTER — Legal + Contact */}
          <div className="flex flex-col gap-3">
            {[
              { label: 'Terms of Use',   href: '#' },
              { label: 'Privacy Policy', href: '#' },
              { label: 'hello@deltainstitutions.com', href: 'mailto:hello@deltainstitutions.com' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="footer-link text-sm text-blue-200/50 hover:text-blue-200/90 transition-colors duration-200 leading-none"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* RIGHT — Site links */}
          <div className="flex flex-col gap-3">
            {[
              { label: 'Testimonials', href: '#' },
              { label: 'About Us',     href: '#' },
              { label: 'Courses',      href: '#' },
              { label: 'FAQ',          href: '#' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="footer-link text-sm text-blue-200/50 hover:text-blue-200/90 transition-colors duration-200 leading-none"
              >
                {link.label}
              </a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}
