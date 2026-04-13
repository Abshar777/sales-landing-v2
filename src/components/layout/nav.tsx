"use client";
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const links = [
  { label: 'Home',    href: '#' },
  { label: 'About',   href: '#' },
  { label: 'Courses', href: '#' },
  { label: 'Contact', href: '#' },
];

const Nav = () => {
  const pillRef  = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const hidden   = useRef(false);
  const stRef    = useRef<ScrollTrigger | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const pill = pillRef.current;
    if (!pill) return;

    stRef.current = ScrollTrigger.create({
      start: 80,
      onEnter: () => {
        gsap.to(pill, {
          backgroundColor: 'rgba(5, 10, 21, 0.85)',
          backdropFilter: 'blur(20px)',
          borderColor: 'rgba(147, 197, 253, 0.12)',
          paddingLeft: '1.25rem',
          paddingRight: '1.25rem',
          paddingTop: '0.45rem',
          paddingBottom: '0.45rem',
          maxWidth: '680px',
          borderRadius: '9999px',
          duration: 0.5,
          ease: 'power3.out',
        });
      },
      onLeaveBack: () => {
        gsap.to(pill, {
          backgroundColor: 'rgba(0,0,0,0)',
          backdropFilter: 'blur(0px)',
          borderColor: 'rgba(0,0,0,0)',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          paddingTop: '1rem',
          paddingBottom: '1rem',
          maxWidth: '100%',
          borderRadius: '0px',
          duration: 0.5,
          ease: 'power3.out',
        });
        gsap.to(pill, { y: 0, duration: 0.4, ease: 'power3.out' });
        hidden.current = false;
      },
    });

    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 80) { lastScrollY.current = currentY; return; }
      const goingDown = currentY > lastScrollY.current + 4;
      const goingUp   = currentY < lastScrollY.current - 4;

      if (goingDown && !hidden.current) {
        gsap.to(pill, { y: '-140%', duration: 0.45, ease: 'power3.inOut' });
        hidden.current = true;
      } else if (goingUp && hidden.current) {
        gsap.to(pill, { y: 0, duration: 0.45, ease: 'power3.out' });
        hidden.current = false;
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      stRef.current?.kill();
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: '12px',
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <div
        ref={pillRef}
        style={{
          width: '100%',
          maxWidth: '100%',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          paddingTop: '1rem',
          paddingBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid transparent',
          willChange: 'transform',
          pointerEvents: 'auto',
        }}
      >
        {/* Logo */}
        <div className="flex-shrink-0">
          <img src="/logo.webp" alt="logo" className="w-10 md:w-12" />
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex text-sm items-center gap-6 text-white/70">
          {links.map(l => (
            <a key={l.label} href={l.href} className="hover:text-white transition-colors duration-200">
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          <button className="text-sm text-white/70 hover:text-white transition-colors duration-200">Login</button>
          <button className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md text-sm text-white px-4 py-2 rounded-full border border-white/10 hover:border-white/20 transition-colors duration-200">
            Register
          </button>
        </div>

        {/* Mobile: Register + Hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <button className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md text-xs text-white px-4 py-2 rounded-full border border-white/10">
            Register
          </button>
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown — hidden at md+ */}
      {menuOpen && (
        <div
          className="md:hidden absolute top-[72px] left-4 right-4 rounded-2xl border border-blue-400/15 bg-[#050a15]/95 backdrop-blur-2xl py-4 flex flex-col gap-1"
          style={{ pointerEvents: 'auto' }}
        >
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="px-6 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors duration-200 rounded-xl mx-2"
            >
              {l.label}
            </a>
          ))}
          <div className="mx-4 mt-2 pt-3 border-t border-white/10">
            <button className="w-full text-sm text-white/70 hover:text-white py-2 transition-colors duration-200">
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
