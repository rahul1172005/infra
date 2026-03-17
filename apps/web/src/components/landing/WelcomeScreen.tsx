'use client';

import { motion } from 'framer-motion';
import Scanlines from '@/components/effects/Scanlines';
import DotGrid from '@/components/effects/DotGrid';
import dynamic from 'next/dynamic';
import EnterButtons from '@/components/landing/EnterButtons';

const MistWind = dynamic(() => import('@/components/effects/MistWind'), { ssr: false });
const FallingParticles = dynamic(() => import('@/components/effects/FallingParticles'), { ssr: false });

interface WelcomeScreenProps {
  onEnter: () => void;
}

export default function WelcomeScreen({ onEnter }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-[#050505] text-white overflow-hidden font-title"
    >
      <Scanlines />
      <DotGrid />

      {/* ── MIST WIND ── */}
      <MistWind />
      <FallingParticles />

      {/* Background Image */}
      <div className="absolute inset-0 flex items-center justify-center opacity-100 pointer-events-none overflow-hidden mix-blend-lighten" style={{ zIndex: 10 }}>
        <img
          src="/image11.png"
          alt="Background"
          className="w-full h-full object-cover md:object-contain bg-image-layer-1"
        />
      </div>

      {/* Top Layer Custom Home Image */}
      <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center">
        <img
          src="/Home.png"
          alt="Home Top Layer"
          className="w-full h-full object-contain home-image-layer-top"
        />
      </div>

      <style>{`
        .bg-image-layer-1 {
            transform: scale(1.2) translate(0px, 20px);
        }
        @media (min-width: 768px) {
            .bg-image-layer-1 {
                transform: scale(1.44) translate(10px, 60px);
            }
        }
        .home-image-layer-top {
            transform: scale(1.2) translate(0px, 100px);
        }
        @media (min-width: 768px) {
            .home-image-layer-top {
                transform: scale(1.6) translate(0px, 180px);
            }
        }
      `}</style>

      {/* ── MOBILE CONTENT ── */}
      <div className="relative z-[60] flex flex-col md:hidden h-full p-5 pt-8 pb-10">
        <div>
          <h1 className="text-[10vw] leading-none font-black uppercase tracking-[0.04em] text-black drop-shadow-sm">
            ZAPSTERS
          </h1>
          <p className="mt-2 text-[4.5vw] sm:text-[4vw] font-black uppercase leading-[1.15] tracking-[0.02em] text-black w-full">
            MY LOYAL KATANA.<br />AND CHAMPION<br />OF THE SHOGUNATE.
          </p>
        </div>

        <div className="mt-auto flex flex-col gap-3 w-full">
          <EnterButtons onEnter={onEnter} variant="mobile" />
          <p className="mt-2 text-[7px] text-center font-black uppercase tracking-[0.4em] text-white/55 leading-[1.8] max-w-[280px] mx-auto">
            ZAPSTERS IS A COLOSSAL ARENA FOR ELITE ENGINEERS TO MASTER THE ARTS OF CODE. ENTER THE REALM WHERE YOUR LEGACIES ARE FORGED.
          </p>
        </div>
      </div>

      {/* ── DESKTOP CONTENT ── */}
      <div className="relative z-[60] hidden md:flex flex-col justify-between h-full p-12">
        <div className="w-full flex justify-between items-start mt-4 text-neutral-700">
          <h1 className="text-7xl lg:text-9xl leading-none font-black uppercase tracking-[0.05em] text-black">
            ZAPSTERS
          </h1>
          <div className="text-right max-w-[200px] mt-4 text-black">
            <h2 className="text-2xl font-black uppercase leading-[0.9]">
              THE PROMISED<br />ARENA
            </h2>
          </div>
        </div>

        <div className="max-w-sm mt-auto mb-32 text-black">
          <p className="text-3xl font-black uppercase leading-[1.2] tracking-[0.02em] drop-shadow-md">
            MY LOYAL KATANA.<br />AND CHAMPION<br />OF THE SHOGUNATE.
          </p>
        </div>

        <div className="w-full flex flex-row items-end justify-between gap-8 mb-4">
          <p className="text-[11px] text-left font-black uppercase tracking-[0.5em] text-black max-w-sm leading-[1.8]">
            ZAPSTERS IS A COLOSSAL ARENA FOR ELITE ENGINEERS TO MASTER THE ARTS OF CODE. ENTER THE REALM WHERE YOUR LEGACIES ARE FORGED.
          </p>
          <EnterButtons onEnter={onEnter} variant="desktop" />
        </div>
      </div>

      {/* Japanese corner decorations */}
      <div className="hidden md:flex absolute top-6 right-8 pointer-events-none select-none z-[55] flex-col items-end gap-1">
        {'ザプスターズ'.split('').map((c, i) => (
          <span key={i} className="text-neutral-600/40 font-black text-[13px] leading-tight">{c}</span>
        ))}
      </div>
      <div className="hidden md:block absolute bottom-24 right-8 pointer-events-none select-none z-[55] opacity-20">
        <span className="font-black text-neutral-500 text-[80px] leading-none">侍</span>
      </div>
    </motion.div>
  );
}
