'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

// Components
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import WelcomeScreen from '@/components/landing/WelcomeScreen';
import EnterButtons from '@/components/landing/EnterButtons';
import SectorCard from '@/components/landing/SectorCard';
import ProtocolRow from '@/components/landing/ProtocolRow';

// Effects
import { DotGrid } from '@/components/ui/DotGrid';
import { SurikenIcon } from '@/components/icons/SurikenIcon';
import Scanlines from '@/components/effects/Scanlines';

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      if (sessionStorage.getItem('skipZapstersWelcome') === 'true') {
        setEntered(true);
      }
    } catch (e) {
      console.warn('Session storage not available', e);
    }
  }, []);

  // Prevent scrolling when on the welcome screen
  useEffect(() => {
    if (!isMounted) return;
    if (!entered) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [entered, isMounted]);

  // Scroll to top AFTER DOM settles when entering home page
  useEffect(() => {
    if (!entered || !isMounted) return;
    // Double requestAnimationFrame ensures we run after paint
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });
    });
  }, [entered, isMounted]);

  const handleEnter = () => {
    try {
      sessionStorage.setItem('skipZapstersWelcome', 'true');
    } catch (e) {
      console.warn('Session storage not available', e);
    }
    setEntered(true);
  };

  if (!isMounted) return null;

  return (
    <>
      <AnimatePresence mode="wait">
        {!entered && (
          <WelcomeScreen key="welcome" onEnter={handleEnter} />
        )}
      </AnimatePresence>

      <div className={`min-h-screen bg-black text-white selection:bg-[#E81414] selection:text-white overflow-x-hidden transition-opacity duration-700 ${entered ? 'opacity-100' : 'opacity-0 pointer-events-none select-none'}`} aria-hidden={!entered}>
        <Scanlines />
        <Navbar />

        {/* Spacer for fixed nav */}
        <div className="h-16 md:h-20" />

        <main className="w-full">
          {/* ══ HERO SECTION ═══════════════════════════════════════════════ */}
          <section className="relative min-h-[85vh] md:min-h-[90vh] flex flex-col items-center justify-center py-12 md:py-20 overflow-hidden px-5 md:px-8">
            <DotGrid />

            {/* Background decorations removed */}

            <div className="relative z-10 max-w-[1400px] w-full text-center space-y-16">
              <div className="flex flex-col items-center gap-12 relative">



                <motion.h1
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-[6rem] tracking-[0.1em] uppercase leading-[1.1] font-black text-center"
                >
                  DOMINATE<br />
                  <span className="text-[#E81414]">THE REALM</span>
                </motion.h1>
                <div className="flex items-center gap-4">
                  <div className="h-0.5 w-12 bg-[#E81414] opacity-50" />
                  <p className="text-white/10 text-[10px] tracking-[0.6em] font-black uppercase">VALYRIAN FIRE AND BLOOD</p>
                  <div className="h-0.5 w-12 bg-[#E81414] opacity-50" />
                </div>
                <button
                  onClick={() => {
                    typeof window !== 'undefined' && sessionStorage.removeItem('skipZapstersWelcome');
                    typeof window !== 'undefined' && (window.location.href = '/');
                  }}
                  className="mt-[-1rem] px-6 py-2 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-white/40 hover:bg-white hover:text-black hover:border-white transition-all inline-flex items-center gap-2 relative z-20"
                >
                  <span>HOME</span>
                </button>
              </div>

              <div className="flex flex-col lg:flex-row items-center justify-center gap-8 max-w-6xl mx-auto border-t border-white/10 pt-8 md:pt-10">
                <div className="flex-1 space-y-4 md:space-y-6 text-center lg:text-left">
                  <div className="flex items-center gap-3 justify-center lg:justify-start">
                    <SurikenIcon size="xs" className="opacity-40" />
                    <p className="text-white/40 text-sm md:text-base lg:text-xl tracking-[0.15em] md:tracking-[0.2em] uppercase font-black leading-[1.8] max-w-2xl">
                      THE PREMIER CITADEL FOR <span className="text-white">ELITE HOUSES</span>. MANAGE DYNASTIES, CONQUER KINGDOMS, AND SECURE IRON THRONE SUPREMACY
                    </p>
                  </div>
                  <div className="flex justify-center lg:justify-start gap-6 md:gap-8">
                    <div className="text-left py-3 md:py-4 border-l border-[#E81414] pl-4 md:pl-6">
                      <div className="text-2xl md:text-3xl font-bold">1.2K+</div>
                      <div className="text-[8px] md:text-[9px] tracking-[0.3em] text-white/20 uppercase font-black">ACTIVE HOUSES</div>
                    </div>
                    <div className="text-left py-3 md:py-4 border-l border-white/20 pl-4 md:pl-6">
                      <div className="text-2xl md:text-3xl font-bold">42</div>
                      <div className="text-[8px] md:text-[9px] tracking-[0.3em] text-white/20 uppercase font-black">CONQUERED KINGDOMS</div>
                    </div>
                  </div>
                </div>

                <EnterButtons onEnter={handleEnter} variant="hero" />
              </div>
            </div>
          </section>

          {/* ══ SECTORS ════════════════════════════════════════════════════ */}
          <section id="sectors" className="w-full bg-black text-white py-16 md:py-32 border-b border-white/5">
            <div className="max-w-[1440px] mx-auto px-5 md:px-8">
              <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end text-center lg:text-left gap-8 mb-16 relative">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-[3rem] lg:text-[4.5rem] font-black tracking-[0.1em] uppercase leading-[1.1]">
                    CORE<br />KINGDOMS
                  </h2>
                </div>
                {/* Decorative icon removed */}
                <p className="max-w-md text-white/40 text-[13px] tracking-wide uppercase font-black leading-loose border-l-0 lg:border-l-2 border-white/10 px-0 lg:pl-8">
                  ADVANCED ROYAL MODULES FOR HOUSE SYNCHRONIZATION AND QUEST-CRITICAL CODE ANALYSIS.
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <SectorCard
                  title="DRAGON"
                  desc="Valyrian-level research."
                  imgSrc="/bushido.png"
                  scale={1.3}
                  x={10}
                  y={20}

                  mobileScale={1.5}
                  mobileX={10}
                  mobileY={40}
                />
                <SectorCard
                  title="CASTLE"
                  desc="Fortress hardening."
                  imgSrc="/castle.png"
                  scale={1.2}
                  x={-10}
                  y={40}

                  mobileScale={1.5}
                  mobileX={10}
                  mobileY={50}
                />
                <SectorCard
                  title="VALYRIA"
                  desc="Dragon decryption."
                  imgSrc="/ninja.png"
                  scale={1.2}
                  x={0}
                  y={50}
                />
                <SectorCard
                  title="RECON"
                  desc="Territory reconstruction."
                  imgSrc="/recon.png"
                  scale={1.1}
                  x={0}
                  y={90}
                />
              </div>
            </div>
          </section>

          {/* ══ PROTOCOLS ═══════════════════════════════════════════════════ */}
          <section id="protocols" className="w-full bg-black py-16 md:py-32 overflow-hidden relative border-b border-white/5">
            <div className="max-w-[1400px] mx-auto px-5 md:px-8 relative z-10">
              <div className="mb-24 space-y-8 flex flex-col md:flex-row items-center md:items-end justify-center md:justify-between text-center md:text-left relative">
                <h2 className="text-3xl sm:text-4xl md:text-[4rem] font-black text-white tracking-[0.1em] uppercase leading-[1.1]">
                  GLOBAL<br /><span className="text-[#E81414]">RANKINGS</span>
                </h2>
                {/* Decorative icon removed */}
              </div>

              <div className="space-y-4">
                <ProtocolRow
                  title="SYNDICATE SYNC"
                  desc="Real-time multi-team point aggregation."
                  imgSrc="/logo.png"
                  scale={0.15}
                  x={3800}
                  y={60}
                />
                <ProtocolRow
                  title="DOMAIN MASTERY"
                  desc="Validation of sector-specific supremacy."
                  imgSrc="/logo.png"
                  scale={0.15}
                  x={3800}
                  y={60}
                />
                <ProtocolRow
                  title="CODE TRIALS"
                  desc="Standardized technical evaluation."
                  imgSrc="/logo.png"
                  scale={0.15}
                  x={3800}
                  y={60}
                />
              </div>
            </div>
          </section>

          {/* ══ ACTION BUTTON FEET ════════════════════════════════════════ */}
          <section className="relative py-24 bg-[#E81414] text-white text-center cursor-pointer group hover:bg-white hover:text-black transition-all overflow-hidden">
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
              <img
                src="/throne.png"
                alt="House"
                className="w-full h-full object-contain opacity-0 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500"
                style={{ transform: "scale(1.0)" }}
              />
            </div>

            <Link href="/dashboard" className="relative z-10 flex flex-col items-center gap-6 px-4">
              <span className="text-[11px] tracking-[0.8em] font-black uppercase opacity-60">READY TO BEGIN?</span>
              <h3 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-[0.1em] leading-relaxed uppercase transition-transform group-hover:scale-105 duration-500">JOIN ZAPSTERS</h3>
            </Link>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
