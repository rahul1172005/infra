'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowRight, Activity, Server, Database, ShieldAlert, Globe, Lock, Cpu, ChevronRight, Target, Users, Layers, Trophy } from 'lucide-react';
import Link from 'next/link';

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
                        <FallingParticles />

                        {/* Background Image — covers full on mobile, contains on desktop */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-100 pointer-events-none overflow-hidden mix-blend-lighten">
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
                        <div className="relative z-[60] flex flex-col md:hidden h-full p-6 pt-10">
                            {/* Brand */}
                            <h1 className="text-[11vw] leading-none font-black uppercase tracking-[0.04em] text-black drop-shadow-sm">
                                ZAPSTERS
                            </h1>

                            {/* Quote */}
                            <p className="mt-3 text-[5vw] font-black uppercase leading-[1.15] tracking-[0.02em] text-black max-w-[260px]">
                                MY LOYAL KATANA.<br />AND CHAMPION<br />OF THE SHOGUNATE.
                            </p>

                            {/* Solid CTA button — no glass */}
                            <button
                                onClick={handleEnter}
                                className="mt-8 self-start px-8 py-4 bg-white !text-black text-[14px] font-black uppercase tracking-[0.4em] flex items-center gap-4 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-transform active:scale-95"
                            >
                                <span className="!text-black">ENTER THE DOJO</span>
                                <ArrowRight className="w-5 h-5 !text-black" strokeWidth={4} />
                            </button>

                            {/* Fine print */}
                            <p className="mt-5 text-[7px] font-black uppercase tracking-[0.4em] text-black leading-[1.8] max-w-[260px]">
                                ZAPSTERS IS A COLOSSAL ARENA FOR ELITE ENGINEERS TO MASTER THE ARTS OF CODE.
                            </p>
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
                                <button
                                    onClick={handleEnter}
                                    className="group shrink-0 px-10 py-5 bg-white !text-black text-[14px] font-black uppercase tracking-[0.4em] hover:bg-[#E81414] hover:text-white transition-all flex items-center gap-5 rounded-full shadow-2xl active:scale-95"
                                >
                                    <span className="!text-black group-hover:text-white">ENTER THE DOJO</span>
                                    <ArrowRight className="w-6 h-6 !text-black group-hover:text-white" strokeWidth={4} />
                                </button>
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
                    <div className="max-w-[1440px] mx-auto px-4 md:px-12 h-20 flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2 md:gap-4 group shrink-0">
                            <div className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center transition-transform">
                                <img
                                    src="/logo.png"
                                    alt="Zapsters Logo"
                                    className="w-full h-full object-contain"
                                    style={{ transform: "scale(2.2) translate(7px, 1px)" }}
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-black text-lg md:text-2xl tracking-tighter uppercase text-white leading-none">ZAPSTERS</span>
                                <span className="text-white/20 text-[7px] md:text-[8px] tracking-[0.3em] font-black leading-none mt-0.5">闘技場</span>
                            </div>
                        </Link>

                        <div className="hidden lg:flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
                            <Link href="#sectors" className="hover:text-white transition-colors">SECTORS</Link>
                            <Link href="#protocols" className="hover:text-white transition-colors">PROTOCOLS</Link>
                        </div>

                        <div className="flex items-center gap-3 md:gap-6">
                            <Link href="/dashboard" className="px-5 md:px-8 py-2 md:py-3 bg-white text-black text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] hover:bg-[#E81414] hover:text-white transition-all rounded-full whitespace-nowrap">
                                ENTER OPERATIONS
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Spacer for fixed nav */}
                <div className="h-20" />

                <main className="w-full">

                    {/* ══ HERO SECTION ═══════════════════════════════════════════════ */}
                    <section className="relative min-h-[90vh] flex flex-col items-center justify-center py-20 overflow-hidden px-8">
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
                                    className="text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] tracking-[0.02em] uppercase leading-[0.85] font-black"
                                >
                                    DOMINATE<br />
                                    <span className="text-[#E81414]">THE KATANA</span>
                                </motion.h1>
                                {/* Japanese title translation */}
                                <p className="text-white/10 text-[10px] tracking-[0.6em] font-black uppercase">コードを征服せよ · 侍の道</p>
                            </div>

                            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 max-w-6xl mx-auto border-t border-white/10 pt-10">
                                <div className="flex-1 space-y-6 text-center lg:text-left">
                                    <p className="text-white/40 text-base md:text-xl tracking-[0.2em] uppercase font-black leading-[1.8] max-w-2xl">
                                        THE PREMIER DOJO FOR <span className="text-white">ELITE CLANS</span>. MANAGE FAMILIES, CONQUER PROVINCES, AND SECURE SHOGUNATE SUPREMACY.
                                    </p>
                                    <div className="flex justify-center lg:justify-start gap-8">
                                        <div className="text-left py-4 border-l border-[#E81414] pl-6">
                                            <div className="text-3xl font-bold">1.2K+</div>
                                            <div className="text-[9px] tracking-[0.3em] text-white/20 uppercase font-black">ACTIVE CLANS</div>
                                        </div>
                                        <div className="text-left py-4 border-l border-white/20 pl-6">
                                            <div className="text-3xl font-bold">42</div>
                                            <div className="text-[9px] tracking-[0.3em] text-white/20 uppercase font-black">CONQUERED PROVINCES</div>
                                        </div>
                                    </div>
                                </div>

                                <Link href="/dashboard" className="group relative w-full lg:w-auto px-10 py-6 bg-white text-black text-[11px] font-black uppercase tracking-[0.4em] hover:bg-[#E81414] hover:text-white transition-all flex items-center justify-center gap-6 overflow-hidden rounded-full shadow-2xl">
                                    <span className="relative z-10">INITIALIZE SESSION</span>
                                    <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* ══ SECTORS ════════════════════════════════════════════════════ */}
                    <section id="sectors" className="w-full bg-black text-white py-32 border-b border-white/5">
                        <div className="max-w-[1440px] mx-auto px-8">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
                                <div className="space-y-4">
                                    <span className="text-[11px] tracking-[0.6em] text-[#E81414] font-black uppercase"></span>
                                    <h2 className="text-4xl md:text-[5rem] lg:text-[6rem] font-black tracking-[0.05em] uppercase leading-[0.85]">
                                        CORE<br />PROVINCES.
                                    </h2>
                                </div>
                                <p className="max-w-md text-white/40 text-[13px] tracking-wide uppercase font-black leading-loose border-l-2 border-white/10 pl-8">
                                    ADVANCED SHOGUNATE MODULES FOR CLAN SYNCHRONIZATION AND MISSION-CRITICAL CODE ANALYSIS.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    <section id="protocols" className="w-full bg-black py-32 overflow-hidden relative border-b border-white/5">
                        <div className="max-w-[1400px] mx-auto px-8 relative z-10">
                            <div className="mb-24 space-y-8 flex flex-col md:flex-row items-end justify-between">
                                <h2 className="text-4xl sm:text-6xl md:text-[8rem] font-black text-white tracking-[0.05em] uppercase leading-[0.8]">
                                    GLOBAL<br /><span className="text-[#E81414]">RANKINGS.</span>
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
                            <span className="text-[11px] tracking-[0.8em] font-black uppercase opacity-60">Ready to Honor?</span>
                            <h3 className="text-4xl sm:text-6xl md:text-9xl font-black tracking-[0.02em] uppercase transition-transform group-hover:scale-105 duration-500">JOIN THE CLAN</h3>
                        </Link>
                    </section>
                </main>

                <footer className="bg-black py-32 px-8 border-t border-white/10 relative overflow-hidden">
                    <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
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
