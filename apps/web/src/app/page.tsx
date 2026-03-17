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
import DotGrid from '@/components/effects/DotGrid';
import Scanlines from '@/components/effects/Scanlines';

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (sessionStorage.getItem('skipZapstersWelcome') === 'true') {
      setEntered(true);
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

  const handleEnter = () => {
    sessionStorage.setItem('skipZapstersWelcome', 'true');
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

      <div className={`min-h-screen bg-black text-white selection:bg-[#E81414] selection:text-white overflow-x-hidden transition-opacity duration-1000 ${entered ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'}`}>
        <Scanlines />
        <Navbar />

        {/* Spacer for fixed nav */}
        <div className="h-16 md:h-20" />

        <main className="w-full">
          {/* ══ HERO SECTION ═══════════════════════════════════════════════ */}
          <section className="relative min-h-[85vh] md:min-h-[90vh] flex flex-col items-center justify-center py-12 md:py-20 overflow-hidden px-5 md:px-8">
            <DotGrid />

            <div className="absolute top-8 left-8 pointer-events-none select-none opacity-[0.06] z-0">
              <span className="font-black text-white text-[100px] leading-none">侍</span>
            </div>
            <div className="absolute bottom-8 right-8 pointer-events-none select-none opacity-[0.05] z-0">
              <span className="font-black text-white text-[80px] leading-none">魂</span>
            </div>
            <div className="absolute top-8 right-8 pointer-events-none select-none z-0 flex flex-col items-end gap-1 opacity-[0.08]">
              {'英雄闘技場'.split('').map((c, i) => (
                <span key={i} className="text-white font-black text-[11px] leading-tight tracking-widest">{c}</span>
              ))}
            </div>

            <div className="relative z-10 max-w-[1400px] w-full text-center space-y-16">
              <div className="flex flex-col items-center gap-12">
                <motion.h1
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl sm:text-5xl md:text-7xl lg:text-[9rem] tracking-[0.02em] uppercase leading-[0.85] font-black text-center"
                >
                  DOMINATE<br />
                  <span className="text-[#E81414]">THE KATANA</span>
                </motion.h1>
                <p className="text-white/10 text-[10px] tracking-[0.6em] font-black uppercase">コードを征服せよ 侍の道</p>
              </div>

              <div className="flex flex-col lg:flex-row items-center justify-center gap-8 max-w-6xl mx-auto border-t border-white/10 pt-8 md:pt-10">
                <div className="flex-1 space-y-4 md:space-y-6 text-center lg:text-left">
                  <p className="text-white/40 text-sm md:text-base lg:text-xl tracking-[0.15em] md:tracking-[0.2em] uppercase font-black leading-[1.8] max-w-2xl">
                    THE PREMIER DOJO FOR <span className="text-white">ELITE CLANS</span>. MANAGE FAMILIES, CONQUER PROVINCES, AND SECURE SHOGUNATE SUPREMACY
                  </p>
                  <div className="flex justify-center lg:justify-start gap-6 md:gap-8">
                    <div className="text-left py-3 md:py-4 border-l border-[#E81414] pl-4 md:pl-6">
                      <div className="text-2xl md:text-3xl font-bold">1.2K+</div>
                      <div className="text-[8px] md:text-[9px] tracking-[0.3em] text-white/20 uppercase font-black">ACTIVE CLANS</div>
                    </div>
                    <div className="text-left py-3 md:py-4 border-l border-white/20 pl-4 md:pl-6">
                      <div className="text-2xl md:text-3xl font-bold">42</div>
                      <div className="text-[8px] md:text-[9px] tracking-[0.3em] text-white/20 uppercase font-black">CONQUERED PROVINCES</div>
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
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-[4rem] lg:text-[6rem] font-black tracking-[0.05em] uppercase leading-[0.85]">
                    CORE<br />PROVINCES
                  </h2>
                </div>
                <p className="max-w-md text-white/40 text-[13px] tracking-wide uppercase font-black leading-loose border-l-2 border-white/10 pl-8">
                  ADVANCED SHOGUNATE MODULES FOR CLAN SYNCHRONIZATION AND MISSION-CRITICAL CODE ANALYSIS.
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <SectorCard
                  title="BUSHIDO"
                  desc="Katana-level research."
                  bgImage="/bushido.png"
                  imageStyle={{ transform: "scale(1.5) translate(6%, 18%)" }}
                />
                <SectorCard
                  title="CASTLE"
                  desc="Fortress hardening."
                  bgImage="/castle.png"
                  imageStyle={{ transform: "scale(1.4) translate(10%, 15%)" }}
                />
                <SectorCard
                  title="NINJA"
                  desc="Ninja decryption."
                  bgImage="/ninja.png"
                  imageStyle={{ transform: "scale(1.4) translate(10%, 14%)" }}
                />
                <SectorCard
                  title="RECON"
                  desc="Territory reconstruction."
                  bgImage="/recon.png"
                  imageStyle={{ transform: "scale(1.6) translate(2%, 18%)" }}
                />
              </div>
            </div>
          </section>

          {/* ══ PROTOCOLS ═══════════════════════════════════════════════════ */}
          <section id="protocols" className="w-full bg-black py-16 md:py-32 overflow-hidden relative border-b border-white/5">
            <div className="max-w-[1400px] mx-auto px-5 md:px-8 relative z-10">
              <div className="mb-24 space-y-8 flex flex-col md:flex-row items-end justify-between">
                <h2 className="text-3xl sm:text-5xl md:text-[7rem] font-black text-white tracking-[0.05em] uppercase leading-[0.8]">
                  GLOBAL<br /><span className="text-[#E81414]">RANKINGS</span>
                </h2>
              </div>

              <div className="space-y-4">
                <ProtocolRow
                  title="SYNDICATE SYNC"
                  desc="Real-time multi-team point aggregation."
                  bgImage="/dragon.png"
                  imageStyle={{ transform: "scale(7.3) translate(4%, 0.5%)" }}
                />
                <ProtocolRow
                  title="DOMAIN MASTERY"
                  desc="Validation of sector-specific supremacy."
                  bgImage="/dragon.png"
                  imageStyle={{ transform: "scale(7.3) translate(4%, 0.5%)" }}
                />
                <ProtocolRow
                  title="CODE TRIALS"
                  desc="Standardized technical evaluation."
                  bgImage="/dragon.png"
                  imageStyle={{ transform: "scale(7.3) translate(4%, 0.5%)" }}
                />
              </div>
            </div>
          </section>

          {/* ══ ACTION BUTTON FEET ════════════════════════════════════════ */}
          <section className="relative py-24 bg-[#E81414] text-white text-center cursor-pointer group hover:bg-white hover:text-black transition-all overflow-hidden">
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
              <img
                src="/clan.png"
                alt="Clan"
                className="w-full h-full object-contain opacity-60 mix-blend-multiply group-hover:opacity-20 transition-opacity duration-500"
                style={{ transform: "scale(3.5) translate(0%, -1%)" }}
              />
            </div>

            <Link href="/dashboard" className="relative z-10 flex flex-col items-center gap-6 px-4">
              <span className="text-[11px] tracking-[0.8em] font-black uppercase opacity-60">READY TO HONOR?</span>
              <h3 className="text-3xl sm:text-5xl md:text-9xl font-black tracking-[0.02em] uppercase transition-transform group-hover:scale-105 duration-500">JOIN THE CLAN</h3>
            </Link>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
