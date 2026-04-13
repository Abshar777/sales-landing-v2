"use client";
"use client";
import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus } from 'lucide-react';
import { LuHeadphones } from 'react-icons/lu';
import { motion, AnimatePresence } from 'motion/react';

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

const faqs = [
  {
    question: "Are The Trading Sessions Completely Live?",
    answer: "Yes. Our traders come into the platform expecting real-time, live sessions with expert analysts. Recorded replays are also available, but our clients are here to trade in the moment.",
  },
  {
    question: "Can We Join More Than One Program?",
    answer: "Absolutely. Many of our members enroll in multiple programs through Delta, giving them the flexibility to grow their skills and adapt their strategy as their trading journey evolves.",
  },
  {
    question: "What if I'm Unhappy With Delta?",
    answer: "We stand behind our service. If you're not satisfied within the first 30 days, we'll work with you to find a resolution or provide a full refund — no questions asked.",
  },
  {
    question: "What makes you different from other trading educators?",
    answer: "Delta combines live sessions, certified expert analysts, and a Guinness World Record-backed track record. We don't just teach trading — we trade alongside you.",
  },
];

export default function FAQSection() {
  const container = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number>(0);

  useGSAP(() => {
    const subSplit = SplitText.create('.faq-sub', { type: 'words' });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: container.current, start: 'top 82%' },
      defaults: { ease: 'power4.out' },
    });

    tl
      .from(['.faq-line-1', '.faq-line-2'], {
        opacity: 0,
        y: 65,
        filter: 'blur(16px)',
        stagger: 0.18,
        duration: 1.1,
      })
      .from(subSplit.words, {
        opacity: 0,
        y: 24,
        filter: 'blur(8px)',
        stagger: 0.04,
        duration: 0.85,
      }, '-=0.5')
      .from('.faq-item', {
        opacity: 0,
        y: 50,
        filter: 'blur(10px)',
        stagger: 0.1,
        duration: 0.9,
      }, '-=0.5');

    return () => { try { subSplit.revert(); } catch(e) {} };
  }, { scope: container });

  return (
    <section ref={container} className="relative pt-24 pb-0 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-blue-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 relative z-10 pb-48">
        {/* Badge */}
        {/* <div className="faq-badge flex justify-center mb-7">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-400/20 bg-blue-500/5 backdrop-blur-md text-[10px] font-bold text-blue-300 uppercase tracking-widest">
            New Design?
          </div>
        </div> */}

        {/* Heading */}
        <div className="text-center mb-5">
          <h2 className="font-medium text-5xl sm:text-7xl leading-[1.1] tracking-tight">
            <span className="faq-line-1 flex items-center justify-center gap-3 bg-gradient-to-b from-blue-100 to-blue-200 bg-clip-text text-transparent">
              We&apos;ve
              <span className="inline-flex mt-2 items-center justify-center w-12 h-12 sm:w-10 sm:h-10 md:w-13 md:h-13 bg-linear-30 from-white to-blue-200 rounded-2xl rotate-[-10deg] shadow-2xl flex-shrink-0">
                <LuHeadphones className="text-blue-900 font-bold text-2xl" />
              </span>
              Heard
            </span>
            <span className="faq-line-2 block bg-gradient-to-b from-blue-100 to-blue-200 bg-clip-text text-transparent">
              It All Before.
            </span>
          </h2>
        </div>

        {/* Sub */}
        <p className="faq-sub text-blue-200/50 text-sm text-center max-w-sm mx-auto mb-14 leading-relaxed">
          Answers to the most common questions from founders and clients.
        </p>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="faq-item rounded-[1.4rem] border border-blue-400/15 bg-[#050a15]/70 backdrop-blur-xl overflow-hidden card-rim-light transition-colors duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 cursor-pointer"
                >
                  <span
                    className={`text-sm sm:text-[15px] font-medium leading-snug transition-colors duration-300 ${
                      isOpen ? 'text-white' : 'text-blue-100/75'
                    }`}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={`flex-shrink-0 w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? 'bg-blue-500/20 border-blue-400/40 text-white rotate-0'
                        : 'border-blue-400/20 bg-blue-500/5 text-blue-300'
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="px-6 pb-6 border-t border-blue-400/10">
                        <p className="text-blue-200/55 text-sm leading-relaxed pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom cone / beam gradient — matches the dramatic spotlight in the reference image */}
      <div className="absolute bottom-0 left-0 right-0 h-[420px] pointer-events-none overflow-hidden">
        {/* Cone beam */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full"
          style={{
            background:
              'conic-gradient(from 258deg at 50% 100%, transparent 0deg, rgba(59,130,246,0.04) 10deg, rgba(59,130,246,0.25) 17deg, rgba(59,130,246,0.55) 20deg, rgba(59,130,246,0.25) 23deg, rgba(59,130,246,0.04) 30deg, transparent 40deg)',
          }}
        />
        {/* Inner bright beam core */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full"
          style={{
            background:
              'conic-gradient(from 261deg at 50% 100%, transparent 0deg, rgba(147,197,253,0.08) 5deg, rgba(147,197,253,0.35) 9deg, rgba(147,197,253,0.6) 10deg, rgba(147,197,253,0.35) 11deg, rgba(147,197,253,0.08) 15deg, transparent 20deg)',
          }}
        />
        {/* Glow at the base of the beam */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-10 bg-blue-400/50 blur-2xl rounded-full" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-blue-200/60 blur-xl rounded-full" />
        {/* Fade bottom to page bg */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#010406] to-transparent" />
      </div>
    </section>
  );
}
