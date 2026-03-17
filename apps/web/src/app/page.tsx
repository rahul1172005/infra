'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowRight, Activity, Server, Database, ShieldAlert, Globe, Lock, Cpu, ChevronRight, Target, Users, Layers, Trophy } from 'lucide-react';
import Link from 'next/link';

// Google Icon SVG
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M47.532 24.552c0-1.636-.147-3.2-.42-4.704H24.48v9.02h12.972c-.564 2.964-2.244 5.48-4.764 7.164v5.952h7.704c4.512-4.152 7.14-10.272 7.14-17.432z" fill="#4285F4"/>
    <path d="M24.48 48c6.48 0 11.916-2.148 15.888-5.82l-7.704-5.952c-2.148 1.44-4.896 2.292-8.184 2.292-6.3 0-11.628-4.248-13.536-9.96H3.012v6.156C6.972 42.876 15.144 48 24.48 48z" fill="#34A853"/>
    <path d="M10.944 28.56A14.4 14.4 0 0 1 10.2 24c0-1.584.276-3.12.744-4.56v-6.156H3.012A23.952 23.952 0 0 0 .48 24c0 3.852.924 7.5 2.532 10.716l7.932-6.156z" fill="#FBBC05"/>
    <path d="M24.48 9.492c3.54 0 6.72 1.212 9.216 3.6l6.888-6.888C36.384 2.34 30.96 0 24.48 0 15.144 0 6.972 5.124 3.012 13.284l7.932 6.156c1.908-5.712 7.236-9.948 13.536-9.948z" fill="#EA4335"/>
  </svg>
);

/* ── Decorative Elements ─────────────────────────────────────────────── */
const DotGrid = () => (
  <div className="absolute inset-0 dot-grid pointer-events-none opacity-[0.05]" />
);

const Scanlines = () => (
  <div className="absolute inset-0 scanlines pointer-events-none opacity-[0.02]" />
);

// Falling Particles Effect
const FallingParticles = () => {
  const particles = Array.from({ length: 120 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 150}%`,
    delay: `${Math.random() * 4}s`,
    duration: `${4 + Math.random() * 8}s`,
    size: `${1 + Math.random() * 3.5}px`,
    opacity: 0.2 + Math.random() * 1.6,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute top-[-10px] rounded-full bg-white"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animation: `particleFall ${p.duration} ${p.delay} linear infinite`,
          }}
        />
      ))}
      <style>{`
                @keyframes particleFall {
                    0%   { transform: translateY(-10px) translateX(0px); opacity: 0; }
                    10%  { opacity: 1; }
                    90%  { opacity: 1; }
                    100% { transform: translateY(110vh) translateX(20px); opacity: 0; }
                }
            `}</style>
    </div>
  );
};

/* ── Mist Wind Effect ────────────────────────────────────────────────── */
const MistWind = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let animId: number;
    let w = 0, h = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // ── Mist blob layer ──────────────────────────────────────────
    interface Blob {
      x: number; y: number; r: number;
      vx: number; phase: number;
      alpha: number; scaleY: number;
    }
    interface LayerOpts {
      count: number; speedX: number; baseRadius: number;
      alpha: number; yBand: [number, number];
      color: string; wobble: number;
    }

    class MistLayer {
      blobs: Blob[] = [];
      constructor(private opts: LayerOpts) { this.init(); }

      init() {
        this.blobs = Array.from({ length: this.opts.count }, () => ({
          x: Math.random() * w * 1.6 - w * 0.3,
          y: this.opts.yBand[0] * h + Math.random() * (this.opts.yBand[1] - this.opts.yBand[0]) * h,
          r: this.opts.baseRadius * (0.55 + Math.random() * 0.9),
          vx: this.opts.speedX * (0.55 + Math.random() * 0.9),
          phase: Math.random() * Math.PI * 2,
          alpha: this.opts.alpha * (0.45 + Math.random() * 0.9),
          scaleY: 0.22 + Math.random() * 0.28,
        }));
      }

      update(t: number) {
        for (const b of this.blobs) {
          b.x += b.vx;
          b.y += Math.sin(t * 0.00045 + b.phase) * this.opts.wobble * 0.28;
          if (b.x - b.r * 2.5 > w) {
            b.x = -b.r * 2;
            b.y = this.opts.yBand[0] * h + Math.random() * (this.opts.yBand[1] - this.opts.yBand[0]) * h;
          }
        }
      }

      draw() {
        for (const b of this.blobs) {
          ctx.save();
          ctx.translate(b.x, b.y);
          ctx.scale(1, b.scaleY);
          const g = ctx.createRadialGradient(0, 0, 0, 0, 0, b.r);
          g.addColorStop(0, `rgba(${this.opts.color},${b.alpha})`);
          g.addColorStop(0.45, `rgba(${this.opts.color},${b.alpha * 0.38})`);
          g.addColorStop(0.78, `rgba(${this.opts.color},${b.alpha * 0.1})`);
          g.addColorStop(1, `rgba(${this.opts.color},0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(0, 0, b.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
    }

    // ── Wind streaks ─────────────────────────────────────────────
    interface Streak {
      x: number; y: number; len: number;
      vx: number; alpha: number; lw: number;
      yDrift: number; yPhase: number;
    }

    const streaks: Streak[] = Array.from({ length: 28 }, () => ({
      x: Math.random() * w,
      y: h * (0.05 + Math.random() * 0.9),
      len: 35 + Math.random() * 160,
      vx: 0.35 + Math.random() * 1.1,
      alpha: 0.012 + Math.random() * 0.032,
      lw: 0.4 + Math.random() * 1.4,
      yDrift: (Math.random() - 0.5) * 0.18,
      yPhase: Math.random() * Math.PI * 2,
    }));

    const drawStreaks = (t: number) => {
      for (const s of streaks) {
        s.x += s.vx;
        s.y += Math.sin(t * 0.0004 + s.yPhase) * 0.15;
        if (s.x > w + s.len) { s.x = -s.len * 1.8; }

        const g = ctx.createLinearGradient(s.x - s.len, s.y, s.x + s.len * 0.15, s.y);
        g.addColorStop(0, `rgba(255,255,255,0)`);
        g.addColorStop(0.35, `rgba(255,255,255,${s.alpha})`);
        g.addColorStop(0.72, `rgba(255,255,255,${s.alpha * 0.55})`);
        g.addColorStop(1, `rgba(255,255,255,0)`);
        ctx.strokeStyle = g;
        ctx.lineWidth = s.lw;
        ctx.beginPath();
        ctx.moveTo(s.x - s.len, s.y);
        ctx.lineTo(s.x + s.len * 0.15, s.y);
        ctx.stroke();
      }
    };

    // ── Vignette ─────────────────────────────────────────────────
    const drawVignette = () => {
      // bottom fog pool
      const b1 = ctx.createLinearGradient(0, h * 0.55, 0, h);
      b1.addColorStop(0, 'rgba(5,5,5,0)');
      b1.addColorStop(1, 'rgba(5,5,5,0.62)');
      ctx.fillStyle = b1;
      ctx.fillRect(0, 0, w, h);
      // top fade
      const t1 = ctx.createLinearGradient(0, 0, 0, h * 0.38);
      t1.addColorStop(0, 'rgba(5,5,5,0.48)');
      t1.addColorStop(1, 'rgba(5,5,5,0)');
      ctx.fillStyle = t1;
      ctx.fillRect(0, 0, w, h);
      // left edge
      const gl = ctx.createLinearGradient(0, 0, w * 0.12, 0);
      gl.addColorStop(0, 'rgba(5,5,5,0.38)');
      gl.addColorStop(1, 'rgba(5,5,5,0)');
      ctx.fillStyle = gl;
      ctx.fillRect(0, 0, w, h);
      // right edge
      const gr = ctx.createLinearGradient(w, 0, w * 0.88, 0);
      gr.addColorStop(0, 'rgba(5,5,5,0.38)');
      gr.addColorStop(1, 'rgba(5,5,5,0)');
      ctx.fillStyle = gr;
      ctx.fillRect(0, 0, w, h);
    };

    // Layer config — 5 depth planes, alternating tints
    const layers = [
      new MistLayer({ count: 7, speedX: 0.055, baseRadius: 420, alpha: 0.062, yBand: [0.55, 1.08], color: '210,215,255', wobble: 0.45 }),
      new MistLayer({ count: 8, speedX: 0.10, baseRadius: 310, alpha: 0.048, yBand: [0.32, 0.88], color: '255,255,255', wobble: 0.38 }),
      new MistLayer({ count: 6, speedX: 0.17, baseRadius: 230, alpha: 0.038, yBand: [0.15, 0.72], color: '195,208,255', wobble: 0.55 }),
      new MistLayer({ count: 5, speedX: 0.26, baseRadius: 155, alpha: 0.028, yBand: [0.05, 0.55], color: '255,255,255', wobble: 0.7 }),
      new MistLayer({ count: 4, speedX: 0.40, baseRadius: 95, alpha: 0.018, yBand: [0.0, 0.38], color: '230,235,255', wobble: 0.9 }),
    ];

    const animate = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      // Back layers first (slowest / biggest)
      for (const layer of layers) {
        layer.update(t);
        layer.draw();
      }

      // Wind streaks on top of mist, below vignette
      drawStreaks(t);

      // Vignette last to bind edges
      drawVignette();

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%', zIndex: 20 }}
    />
  );
};


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
      <AnimatePresence>
        {!entered && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-[#050505] text-white overflow-hidden font-title"
          >
            <Scanlines />
            <DotGrid />

            {/* ── MIST WIND — sits z-20, above bg image, below Home.png ── */}
            <MistWind />

            <FallingParticles />

            {/* Background Image — covers full on mobile, contains on desktop */}
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

            {/* Cloud layer */}
            <div className="absolute inset-0 pointer-events-none z-[45]">
              <img src="/cloud1.png" alt="Cloud Layer" className="absolute"
                style={{ transform: "scale(1) translate(0px,0px)", opacity: 0, bottom: 0, left: 0, width: "100%" }} />
            </div>

            {/* ── MOBILE CONTENT: stacked top ── */}
            <div className="relative z-[60] flex flex-col md:hidden h-full p-5 pt-8 pb-10">
              {/* Brand and Quote wrapped to group at top */}
              <div>
                <h1 className="text-[10vw] leading-none font-black uppercase tracking-[0.04em] text-black drop-shadow-sm">
                  ZAPSTERS
                </h1>
                <p className="mt-2 text-[4.5vw] font-black uppercase leading-[1.15] tracking-[0.02em] text-black max-w-[240px]">
                  MY LOYAL KATANA.<br />AND CHAMPION<br />OF THE SHOGUNATE.
                </p>
              </div>

              {/* Buttons stack pushed to bottom */}
              <div className="mt-auto flex flex-col gap-3 w-full">
                {/* Main CTA */}
                <button
                  onClick={handleEnter}
                  className="w-full justify-center px-5 py-3.5 bg-white !text-black text-[10px] font-black uppercase tracking-[0.35em] flex items-center gap-3 rounded-full shadow-lg transition-transform active:scale-95"
                >
                  <span className="!text-black">ENTER THE DOJO</span>
                  <ArrowRight className="w-3.5 h-3.5 !text-black" strokeWidth={4} />
                </button>
                {/* Google Sign In - Now Solid */}
                <Link
                  href="/auth/login"
                  className="w-full justify-center px-5 py-3.5 bg-white !text-black text-[10px] font-black uppercase tracking-[0.35em] flex items-center gap-3 rounded-full shadow-md border-none transition-transform active:scale-95"
                >
                  <GoogleIcon />
                  <span className="!text-black">SIGN IN WITH GOOGLE</span>
                </Link>

                {/* Fine print */}
                <p className="mt-2 text-[7px] text-center font-black uppercase tracking-[0.4em] text-black/70 leading-[1.8] max-w-[280px] mx-auto">
                  ZAPSTERS ARENA FOR ELITE ENGINEERS
                </p>
              </div>
            </div>

            {/* ── DESKTOP CONTENT: original layout ── */}
            <div className="relative z-[60] hidden md:flex flex-col justify-between h-full p-12">
              {/* Top */}
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

              {/* Middle quote */}
              <div className="max-w-sm mt-auto mb-32 text-black">
                <p className="text-3xl font-black uppercase leading-[1.2] tracking-[0.02em] drop-shadow-md">
                  MY LOYAL KATANA.<br />AND CHAMPION<br />OF THE SHOGUNATE.
                </p>
              </div>

              {/* Bottom */}
              <div className="w-full flex flex-row items-end justify-between gap-8 mb-4">
                <p className="text-[11px] text-left font-black uppercase tracking-[0.5em] text-black max-w-sm leading-[1.8]">
                  ZAPSTERS IS A COLOSSAL ARENA FOR ELITE ENGINEERS TO MASTER THE ARTS OF CODE. ENTER THE REALM WHERE YOUR LEGACIES ARE FORGED.
                </p>
                <div className="flex flex-col gap-3 items-end shrink-0">
                  <button
                    onClick={handleEnter}
                    className="group px-6 py-3.5 bg-white !text-black text-[11px] font-black uppercase tracking-[0.35em] hover:bg-[#E81414] hover:text-white transition-all flex items-center gap-4 rounded-full shadow-2xl active:scale-95"
                  >
                    <span className="!text-black group-hover:text-white">ENTER THE DOJO</span>
                    <ArrowRight className="w-5 h-5 !text-black group-hover:text-white" strokeWidth={4} />
                  </button>
                  <Link
                    href="/auth/login"
                    className="group px-6 py-3.5 bg-white/90 !text-black text-[11px] font-black uppercase tracking-[0.35em] hover:bg-white transition-all flex items-center gap-4 rounded-full border border-black/10 shadow-lg active:scale-95"
                  >
                    <GoogleIcon />
                    <span className="!text-black">SIGN IN WITH GOOGLE</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Japanese corner decorations — desktop only, hidden on mobile to avoid clutter */}
            <div className="hidden md:flex absolute top-6 right-8 pointer-events-none select-none z-[55] flex-col items-end gap-1">
              {'ザプスターズ'.split('').map((c, i) => (
                <span key={i} className="text-neutral-600/40 font-black text-[13px] leading-tight">{c}</span>
              ))}
            </div>
            <div className="hidden md:block absolute bottom-24 right-8 pointer-events-none select-none z-[55] opacity-20">
              <span className="font-black text-neutral-500 text-[80px] leading-none">侍</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`min-h-screen bg-black text-white selection:bg-[#E81414] selection:text-white overflow-x-hidden transition-opacity duration-1000 ${entered ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'}`}>
        <Scanlines />

        {/* ── Navigation ── */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/5">
          <div className="max-w-[1440px] mx-auto px-4 md:px-12 h-16 md:h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 md:gap-4 group shrink-0">
              <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-transform">
                <img
                  src="/logo.png"
                  alt="Zapsters Logo"
                  className="w-full h-full object-contain"
                  style={{ transform: "scale(2.2) translate(7px, 1px)" }}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-base md:text-xl tracking-tighter uppercase text-white leading-none">ZAPSTERS</span>
                <span className="text-white/20 text-[7px] tracking-[0.3em] font-black leading-none mt-0.5">闘技場</span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
              <Link href="#sectors" className="hover:text-white transition-colors">SECTORS</Link>
              <Link href="#protocols" className="hover:text-white transition-colors">PROTOCOLS</Link>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <Link
                href="/auth/login"
                className="hidden sm:flex items-center gap-2 px-4 py-2 border border-white/20 text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] hover:border-white transition-all rounded-full whitespace-nowrap"
              >
                <GoogleIcon />
                <span className="hidden md:inline">SIGN IN</span>
                <span className="md:hidden">LOGIN</span>
              </Link>
              <Link href="/dashboard" className="px-4 md:px-6 py-2 bg-white text-black text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.25em] hover:bg-[#E81414] hover:text-white transition-all rounded-full whitespace-nowrap">
                <span className="hidden sm:inline">ENTER OPERATIONS</span>
                <span className="sm:hidden">ENTER</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* Spacer for fixed nav */}
        <div className="h-16 md:h-20" />

        <main className="w-full">

          {/* ══ HERO SECTION ═══════════════════════════════════════════════ */}
          <section className="relative min-h-[85vh] md:min-h-[90vh] flex flex-col items-center justify-center py-12 md:py-20 overflow-hidden px-5 md:px-8">
            <DotGrid />

            {/* Japanese corner ghost characters */}
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
                {/* Japanese title translation */}
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

                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
                  <Link href="/dashboard" className="group relative flex-1 lg:flex-none px-7 py-3.5 bg-white text-black text-[10px] font-black uppercase tracking-[0.35em] hover:bg-[#E81414] hover:text-white transition-all flex items-center justify-center gap-4 overflow-hidden rounded-full shadow-2xl">
                    <span className="relative z-10">INITIALIZE SESSION</span>
                    <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link href="/auth/login" className="group relative flex-1 lg:flex-none px-7 py-3.5 bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.35em] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 rounded-full">
                    <GoogleIcon />
                    <span>SIGN IN WITH GOOGLE</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ══ SECTORS ════════════════════════════════════════════════════ */}
          <section id="sectors" className="w-full bg-black text-white py-16 md:py-32 border-b border-white/5">
            <div className="max-w-[1440px] mx-auto px-5 md:px-8">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
                <div className="space-y-4">
                  <span className="text-[11px] tracking-[0.6em] text-[#E81414] font-black uppercase"></span>
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
            {/* Background Image Layer */}
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

        <footer className="bg-black py-16 md:py-32 px-5 md:px-8 border-t border-white/10 relative overflow-hidden">
          <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start gap-10 md:gap-16">
            <div className="space-y-8 max-w-lg">
              <div className="text-3xl font-black uppercase tracking-tighter flex items-center gap-6">
                <div className="w-16 h-16 flex items-center justify-center">
                  <img
                    src="/logo.png"
                    alt="Zapsters Logo"
                    className="w-full h-full object-contain"
                    style={{ transform: "scale(2.2) translate(10px, 0px)" }}
                  />
                </div>
                ZAPSTERS CORE
              </div>
              <p className="text-[12px] text-white/30 font-black uppercase tracking-[0.2em] leading-loose">
                REDEFINING THE BOUNDARIES OF COMPETITIVE ENGINEERING. GROUP YOUR TEAMS. CONQUER THE CODE. NO GLOWS. NO MERCY.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-16 md:gap-32">
              <div className="space-y-8">
                <span className="text-[14px] tracking-[0.5em] font-black uppercase text-white">Management</span>
                <div className="flex flex-col gap-5 text-[11px] font-black uppercase tracking-widest text-white/20">
                  <Link href="/teams" className="hover:text-[#E81414] transition-colors">Groups Setup</Link>
                  <Link href="/domains" className="hover:text-[#E81414] transition-colors">Domain Selection</Link>
                  <Link href="/challenges" className="hover:text-[#E81414] transition-colors">Lab Access</Link>
                </div>
              </div>
              <div className="space-y-8">
                <span className="text-[14px] tracking-[0.5em] font-black uppercase text-white">Technical</span>
                <div className="flex flex-col gap-5 text-[11px] font-black uppercase tracking-widest text-white/20">
                  <Link href="/leaderboard" className="hover:text-[#E81414] transition-colors">Leaderboard</Link>
                  <Link href="/analytics" className="hover:text-[#E81414] transition-colors">Analytics</Link>
                  <Link href="/legal" className="hover:text-[#E81414] transition-colors">Protocols</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-[1440px] mx-auto mt-32 text-[10px] tracking-[0.6em] font-black uppercase text-white/5 flex justify-between items-center border-t border-white/5 pt-12">
            <span>© 2026 ZAPSTERS CORE MANAGEMENT</span>
            <div className="flex gap-10 text-white/10 uppercase font-black">

            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

function SectorCard({ num, title, desc, bgImage, imageStyle }: any) {
  return (
    <div className="group bg-[#0A0A0A] text-white border border-white/10 p-8 flex flex-col justify-between min-h-[300px] hover:border-transparent cursor-pointer relative overflow-hidden rounded-[2.5rem] transition-all duration-300">
      {/* Hover Background Overlay */}
      <div className="absolute inset-0 bg-[#E81414] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />

      {/* Top Layer Image (Behind wordings) */}
      {bgImage && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-100 group-hover:opacity-100 transition-opacity duration-500 z-[1]">
          <img
            src={bgImage}
            alt=""
            className="w-full h-full object-cover mix-blend-luminosity group-hover:mix-blend-normal"
            style={imageStyle}
          />
        </div>
      )}

      {/* Wordings Layer */}
      <div className="relative z-[10] h-full flex flex-col justify-between">
        <span className="text-[9px] tracking-[0.4em] font-black text-white/20 group-hover:text-black transition-colors uppercase">{num}</span>

        <div className="space-y-2 -translate-y-6 group-hover:-translate-y-20 transition-transform duration-500">
          <h4 className="text-xl font-black tracking-tighter uppercase leading-none group-hover:text-black transition-colors">
            {title}
          </h4>
          <p className="text-[10px] tracking-widest font-black uppercase text-white/30 group-hover:text-black/70 leading-relaxed transition-colors">
            {desc}
          </p>
        </div>

        <div className="flex justify-start opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100">
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProtocolRow({ title, desc, bgImage, imageStyle }: any) {
  return (
    <div className="group flex flex-col md:flex-row md:items-center justify-between py-10 transition-all cursor-pointer px-10 relative rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-transparent">
      {/* Hover Background Overlay */}
      <div className="absolute inset-0 bg-[#E81414] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />

      {/* Background Image Layer */}
      {bgImage && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-500 z-[1] flex items-center justify-center">
          <img
            src={bgImage}
            alt=""
            className="w-full h-full object-contain mix-blend-luminosity group-hover:mix-blend-normal opacity-20 group-hover:opacity-40 transition-all duration-500"
            style={imageStyle}
          />
        </div>
      )}

      <div className="relative z-[10] flex flex-col md:flex-row md:items-center justify-between w-full">
        <div className="space-y-3">
          <h3 className="text-3xl md:text-5xl font-black text-white tracking-widest uppercase transition-colors group-hover:text-black">
            {title}
          </h3>
          <p className="text-[10px] tracking-[0.15em] font-black uppercase text-white/15 group-hover:text-black/70 transition-colors">{desc}</p>
        </div>
        <div className="w-14 h-14 border border-white/10 rounded-full flex items-center justify-center group-hover:border-black group-hover:bg-black transition-all mt-8 md:mt-0 shadow-lg">
          <ArrowRight className="w-5 h-5 text-white transition-all transform" />
        </div>
      </div>
    </div>
  );
}
