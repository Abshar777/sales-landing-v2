import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Quote } from 'lucide-react';
import { MdOutlineVerified } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

const testimonials = [
  {
    name: "Jacob Levinrad",
    role: "Founder, Business Accelerator",
    quote: "If you're looking for expert traders and analysts, I highly recommend you use Delta. Great product, great team. Shoutout to the support!",
    video: "https://picsum.photos/seed/test1/800/450",
    avatar: "https://picsum.photos/seed/av1/100/100"
  },
  {
    name: "Luke Lintz",
    role: "CEO, HighKey Agency",
    quote: "Through Delta, we found a strategist who already closed $30k and collected in just 4 weeks. The quality of talent here is unmatched.",
    video: "https://picsum.photos/seed/test2/800/450",
    avatar: "https://picsum.photos/seed/av2/100/100"
  },
  {
    name: "Cooper Matusiak",
    role: "Founder, Sales Guys",
    quote: "Delta filled that gap with high-end trading talent. Our portfolio has never looked better since we started using their sessions.",
    video: "https://picsum.photos/seed/test3/800/450",
    avatar: "https://picsum.photos/seed/av3/100/100"
  },
  {
    name: "Sarah Jenkins",
    role: "Independent Investor",
    quote: "The live sessions are incredible. I've learned more in two weeks with Delta than I did in two years of self-study.",
    video: "https://picsum.photos/seed/test4/800/450",
    avatar: "https://picsum.photos/seed/av4/100/100"
  },
  {
    name: "Jacob Levinrad",
    role: "Founder, Business Accelerator",
    quote: "If you're looking for expert traders and analysts, I highly recommend you use Delta. Great product, great team. Shoutout to the support!",
    video: "https://picsum.photos/seed/test1/800/450",
    avatar: "https://picsum.photos/seed/av1/100/100"
  },
  {
    name: "Luke Lintz",
    role: "CEO, HighKey Agency",
    quote: "Through Delta, we found a strategist who already closed $30k and collected in just 4 weeks. The quality of talent here is unmatched.",
    video: "https://picsum.photos/seed/test2/800/450",
    avatar: "https://picsum.photos/seed/av2/100/100"
  },
  {
    name: "Cooper Matusiak",
    role: "Founder, Sales Guys",
    quote: "Delta filled that gap with high-end trading talent. Our portfolio has never looked better since we started using their sessions.",
    video: "https://picsum.photos/seed/test3/800/450",
    avatar: "https://picsum.photos/seed/av3/100/100"
  },
  {
    name: "Sarah Jenkins",
    role: "Independent Investor",
    quote: "The live sessions are incredible. I've learned more in two weeks with Delta than I did in two years of self-study.",
    video: "https://picsum.photos/seed/test4/800/450",
    avatar: "https://picsum.photos/seed/av4/100/100"
  }
];

export default function TestimonialsSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const subtitleSplit = SplitText.create('.test-subtitle', { type: 'words' });
    const mob = window.matchMedia('(max-width: 767px)').matches;
    const f = (px: number) => mob ? {} : { filter: `blur(${px}px)` };

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

    return () => { try { subtitleSplit.revert(); } catch(e) {} };
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

        {/* Carousel Container */}
        <div className="relative group">
          {/* Side Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#010406] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#010406] to-transparent z-20 pointer-events-none" />

          {/* Swiper Carousel */}
          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            slidesPerView={'auto'}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="pb-12 !px-12"
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index} className="!w-[350px] md:!w-[450px]">
                <div className="test-card rounded-[2.5rem] p-1 border border-blue-400/15 backdrop-blur-xl h-full">
                <div className="group/card relative rounded-[2.5rem] p-6 md:p-8 border border-blue-400/10 bg-[#050a15]/60 backdrop-blur-xl overflow-hidden card-rim-light h-full flex flex-col">
                  {/* Card Glare */}
                  <div className="absolute inset-0 card-glare pointer-events-none opacity-60 group-hover/card:opacity-100 transition-opacity duration-700" />

                  {/* Grid Background */}
                  <div className="absolute inset-0 card-grid-pattern animate-grid-move opacity-10 pointer-events-none" />

                  {/* Bottom glow */}
                  <div className="absolute inset-0 card-glow-bottom opacity-80 transition-opacity duration-700 pointer-events-none" />

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Video Thumbnail */}
                    <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-blue-400/10 mb-8 group/video shadow-2xl">
                      <img
                        src={item.video}
                        alt={item.name}
                        className="w-full h-full object-cover opacity-70 group-hover/video:scale-105 transition-transform duration-1000"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 flex items-center justify-center hover:scale-110 transition-all duration-500 shadow-2xl">
                          <Play className="w-6 h-6 text-white fill-white ml-1" />
                        </button>
                      </div>
                    </div>

                    {/* Quote */}
                    <div className="mb-8 relative flex-1">
                      <Quote className="absolute -top-4 -left-2 w-8 h-8 text-blue-400/10 -z-10" />
                      <p className="text-sm md:text-base text-blue-200/80 leading-relaxed italic">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-4 pt-6 border-t border-blue-200/5">
                      <div className="relative">
                        <div className="absolute inset-0 bg-blue-500/20 blur-md rounded-full" />
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="relative w-10 h-10 rounded-full border border-blue-200/10 object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
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
