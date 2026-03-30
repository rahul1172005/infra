'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Scanlines from '@/components/effects/Scanlines';
import { DotGrid } from '@/components/ui/DotGrid';
import { GoogleIcon } from '@/components/ui/GoogleIcon';
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
      className="fixed inset-0 z-[9999] bg-black text-white overflow-hidden font-title"
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

      {/* Side 1 — Left 
      <img
        src="/side12.png"
        alt="Side Left"
        className="absolute pointer-events-none"
        style={{
          zIndex: 20,
          left: 0,
          top: '50%',
          transform: 'translateY(-50%) translateX(-10%) scale(3.8)',
          width: '22vw',
          maxWidth: '320px',
          height: 'auto',
          objectFit: 'contain',
        }}
      />*/}

      {/* Side 2 — Right 
      <img
        src="/side222.png"
        alt="Side Right"
        className="absolute pointer-events-none"
        style={{
          zIndex: 20,
          right: 0,
          top: '50%',
          transform: 'translateY(-10%) translateX(-18%) scale(3.9)',
          width: '22vw',
          maxWidth: '320px',
          height: 'auto',
          objectFit: 'contain',
        }}
      />*/}

      <style>{`
        .bg-image-layer-1 {
            transform: scale(1.2) translate(0px, 20px);
        }
        @media (min-width: 768px) {
            .bg-image-layer-1 {
                transform: scale(1.4) translate(0px, 70px);
            }
        }
        .home-image-layer-top {
            transform: scale(1.7) translate(10px, 90px);
        }
        @media (min-width: 768px) {
            .home-image-layer-top {
                transform: scale(1.1) translate(10px, 75px);
            }
        }
      `}</style>

      {/* ── MOBILE CONTENT ── */}
      <div className="relative z-[60] flex flex-col md:hidden h-full p-8 pt-16 pb-12">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-10 h-10">
              <img
                src="/logo.png"
                alt="Zapsters Logo"
                className="w-full h-full object-contain"
                style={{
                  transform: 'scale(3.0) translate(0px, -50px)',
                  filter: 'brightness(0) saturate(100%)'
                }}
              />
            </div>
            <h1
              className="text-2xl font-black uppercase leading-[5] tracking-widest text-black"
              style={{
                transform: "translate(-8px, -15px) scale(1.0)"
              }}
            >
              ZAPSTERS
            </h1>
          </div>
          <p
            className="mt-0 text-[7vw] font-black uppercase leading-[1.1] tracking-tight text-black w-full drop-shadow-sm text-center"
            style={{
              transform: "translateY(-69px)"
            }}
          >
            THE DRAGON&apos;S FIRE.<br />AND HEIR<br />
          </p>
        </div>

        <div className="mt-auto flex flex-col gap-6 w-full">
          <EnterButtons onEnter={onEnter} variant="mobile" />
          <p className="text-[10px] text-center font-black uppercase tracking-[0.3em] text-white/70 leading-relaxed max-w-[280px] mx-auto">
            THE IRON THRONE IS THE SEAT OF POWER IN WESTEROS.<br />
            CLAIM YOUR BIRTHRIGHT<br />
            THROUGH FIRE AND BLOOD.
          </p>
        </div>
      </div>

      {/* ── DESKTOP CONTENT (MATCHED TO IMAGE) ── */}
      <div className="relative z-[60] hidden md:block h-full w-full overflow-hidden p-0">

        {/* TOP LEFT: ZAPSTERS + LOGO */}
        <div className="absolute flex items-center gap-6"
          style={{
            left: '40px',
            top: '50px',
            transform: 'translate(0px, 0px) scale(1.15)',
            transformOrigin: 'left top'
          }}>
          <div className="shrink-0" style={{ transform: 'translate(-10px, 15.5px) scale(3.80)' }}>
            <div className="w-24 h-28 lg:w-28 lg:h-28">
              <img src="/logo.png" alt="Zapsters Logo" className="w-full h-full object-contain" style={{ filter: 'brightness(0)' }} />
            </div>
          </div>
          <h1 className="font-black uppercase tracking-tighter text-black"
            style={{
              fontSize: '110px',
              lineHeight: '0.8',
              transform: 'translate(-40px, 15px) scale(0.6)',
              marginLeft: '-80px'
            }}>
            ZAPSTERS
          </h1>
        </div>

        {/* MID LEFT: SHOGUNATE TEXT */}
        <div className="absolute max-w-lg"
          style={{
            left: '44px',
            top: '42%',
            transform: 'translate(0px, -50%) scale(1.1)',
            transformOrigin: 'left center'
          }}>
          <p className="text-[32px] font-black uppercase leading-[1.1] tracking-tight text-black drop-shadow-sm">
            THE IRON THRONE IS THE SEAT OF POWER IN WESTEROS.<br />

          </p>
        </div>

        {/* BOTTOM LEFT: COLOSSAL ARENA TEXT */}
        <div className="absolute max-w-md"
          style={{
            left: '44px',
            bottom: '60px',
            transform: 'translate(0px, 0px) scale(0.95)',
            transformOrigin: 'left bottom'
          }}>

        </div>

        {/* TOP RIGHT: THE PROMISED ARENA */}
        <div className="absolute text-right"
          style={{
            right: '50px',
            top: '65px',
            transform: 'translate(0px, 0px) scale(1.0)',
            transformOrigin: 'right top'
          }}>
          <h2 className="text-[20px] font-black uppercase tracking-widest text-black leading-tight">
            THE PROMISED<br />ARENA
          </h2>
          <p className="mt-4 text-[9px] font-black uppercase text-black opacity-100"
            style={{
              letterSpacing: '0.4em',
              lineHeight: '2.2',
              transform: 'translate(0px, 0px) scale(1.0)'
            }}>
            CLAIM YOUR BIRTHRIGHT<br />
            THROUGH FIRE AND BLOOD.
          </p>
        </div>

        {/* MID RIGHT: VERTICAL JAPANESE TEXT */}
        <div className="absolute flex flex-col items-center gap-2"
          style={{
            right: '110px',
            top: '45%',
            transform: 'translate(0px, -50%) scale(1.4)',
            opacity: 0.6
          }}>
          {"".split('').map((char, i) => (
            <span key={i} className="text-2xl font-black text-neutral-800 leading-none">{char}</span>
          ))}
        </div>

        {/* BOTTOM RIGHT: BUTTONS */}
        <div className="absolute flex flex-col gap-4 items-end"
          style={{
            right: '50px',
            bottom: '60px',
            transform: 'translate(0px, 0px) scale(1.1)',
            transformOrigin: 'right bottom'
          }}>
          {/* Custom style for buttons to match the image precisely */}
          <style jsx global>{`
            .welcome-btn-wrap button {
              border-radius: 9999px !important;
              background-color: #FFFFFF !important;
              color: #000000 !important;
              font-family: 'Adieu', 'Game of Thrones', sans-serif !important;
              font-weight: 900 !important;
              text-transform: uppercase !important;
              padding-left: 2rem !important;
              padding-right: 2rem !important;
              height: 48px !important;
              font-size: 11px !important;
              letter-spacing: 0.1em !important;
              border: none !important;
              box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) !important;
            }
            .welcome-btn-wrap button:hover {
              background-color: #F3F3F3 !important;
              transform: translateY(-1px);
            }
          `}</style>
          <div className="welcome-btn-wrap flex flex-col gap-3">
            <button onClick={onEnter} className="flex items-center justify-between gap-4">
              <span>ENTER THE REALM</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
            <Link href="/auth/login">
              <button className="flex items-center gap-4">
                <GoogleIcon className="w-4 h-4" />
                <span>SIGN IN WITH GOOGLE</span>
              </button>
            </Link>
          </div>
        </div>

      </div>

      {/* Corner decorations hidden for high fidelity to the image */}
    </motion.div>
  );
}
