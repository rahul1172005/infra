'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

/* ── Decorative Elements ─────────────────────────────────────────── */
const DotGrid = () => (
    <div className="absolute inset-0 dot-grid opacity-[0.05] pointer-events-none" />
);

const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M47.532 24.552c0-1.636-.147-3.2-.42-4.704H24.48v9.02h12.972c-.564 2.964-2.244 5.48-4.764 7.164v5.952h7.704c4.512-4.152 7.14-10.272 7.14-17.432z" fill="#4285F4"/>
        <path d="M24.48 48c6.48 0 11.916-2.148 15.888-5.82l-7.704-5.952c-2.148 1.44-4.896 2.292-8.184 2.292-6.3 0-11.628-4.248-13.536-9.96H3.012v6.156C6.972 42.876 15.144 48 24.48 48z" fill="#34A853"/>
        <path d="M10.944 28.56A14.4 14.4 0 0 1 10.2 24c0-1.584.276-3.12.744-4.56v-6.156H3.012A23.952 23.952 0 0 0 .48 24c0 3.852.924 7.5 2.532 10.716l7.932-6.156z" fill="#FBBC05"/>
        <path d="M24.48 9.492c3.54 0 6.72 1.212 9.216 3.6l6.888-6.888C36.384 2.34 30.96 0 24.48 0 15.144 0 6.972 5.124 3.012 13.284l7.932 6.156c1.908-5.712 7.236-9.948 13.536-9.948z" fill="#EA4335"/>
    </svg>
);

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen bg-black text-white flex selection:bg-[#E81414] selection:text-white relative overflow-hidden">
            <DotGrid />
            {/* Background red glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E81414]/5 blur-[180px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/[0.02] blur-[120px] pointer-events-none" />

            {/* Left Brand Panel — hidden on mobile */}
            <div className="hidden lg:flex flex-col justify-between w-[420px] xl:w-[500px] shrink-0 border-r border-white/10 p-12 xl:p-16 relative z-10">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-4 group">
                    <div className="w-10 h-10 flex items-center justify-center">
                        <img src="/logo.png" alt="Zapsters Logo" className="w-full h-full object-contain" style={{ transform: "scale(2.2) translate(7px, 1px)" }} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-black text-xl tracking-tighter uppercase text-white leading-none">ZAPSTERS</span>
                        <span className="text-white/20 text-[7px] tracking-[0.3em] font-black leading-none mt-0.5">闘技場</span>
                    </div>
                </Link>

                {/* Mid text */}
                <div className="space-y-10">
                    <div className="space-y-4">
                        <span className="text-[10px] tracking-[0.6em] text-[#E81414] font-black uppercase">SECURE NODE</span>
                        <h2 className="text-5xl xl:text-6xl font-black uppercase leading-[0.85] tracking-tighter">
                            AUTH<br /><span className="text-[#E81414]">GATE</span>
                        </h2>
                    </div>
                    <p className="text-[12px] tracking-[0.15em] font-black uppercase text-white/30 leading-loose border-l-2 border-white/10 pl-6">
                        ENTER YOUR OPERATIVE CREDENTIALS TO ACCESS THE SHOGUNATE COMMAND SYSTEM
                    </p>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4 p-5 border border-white/10 bg-[#0A0A0A] rounded-[1.5rem]">
                            <div className="w-2 h-2 rounded-full bg-[#E81414] shrink-0" />
                            <span className="text-[10px] tracking-[0.3em] font-black uppercase text-white/40">256-BIT ENCRYPTION ACTIVE</span>
                        </div>
                        <div className="flex items-center gap-4 p-5 border border-white/10 bg-[#0A0A0A] rounded-[1.5rem]">
                            <div className="w-2 h-2 rounded-full bg-white/30 shrink-0" />
                            <span className="text-[10px] tracking-[0.3em] font-black uppercase text-white/40">SHOGUNATE CLEARANCE REQUIRED</span>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="text-[9px] tracking-[0.3em] font-black uppercase text-white/10">
                    © 2026 ZAPSTERS CORE
                </div>
            </div>

            {/* Right Auth Panel */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative z-10">

                {/* Mobile Logo */}
                <div className="lg:hidden mb-10 flex flex-col items-center gap-3">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center">
                            <img src="/logo.png" alt="Zapsters Logo" className="w-full h-full object-contain" style={{ transform: "scale(2.2) translate(7px, 1px)" }} />
                        </div>
                        <span className="font-black text-lg tracking-tighter uppercase text-white">ZAPSTERS</span>
                    </Link>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-[460px] space-y-8"
                >
                    {/* Header */}
                    <div className="space-y-3 border-b border-white/10 pb-8">
                        <span className="text-[10px] tracking-[0.6em] text-[#E81414] font-black uppercase">AUTHORIZATION</span>
                        <h1 className="text-4xl md:text-5xl font-black uppercase leading-[0.85] tracking-tighter">
                            SIGN IN
                        </h1>
                        <p className="text-[10px] tracking-[0.3em] font-black uppercase text-white/30">
                            NODE AUTHORIZATION REQUIRED
                        </p>
                    </div>

                    {/* Google Sign In — Primary */}
                    <button
                        className="w-full flex items-center justify-center gap-4 px-6 py-5 bg-white text-black text-[11px] font-black uppercase tracking-[0.4em] hover:bg-[#E81414] hover:text-white transition-all group rounded-full shadow-xl"
                        onClick={() => { /* TODO: Google Auth */ }}
                    >
                        <span className="group-hover:hidden"><GoogleIcon /></span>
                        <span className="hidden group-hover:flex items-center"><ArrowRight className="w-4 h-4" /></span>
                        SIGN IN WITH GOOGLE
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-6">
                        <div className="h-px bg-white/10 flex-1" />
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">OR</span>
                        <div className="h-px bg-white/10 flex-1" />
                    </div>

                    {/* Credential Form */}
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        {/* Email */}
                        <div className="space-y-3">
                            <label className="text-[9px] font-black uppercase tracking-[0.5em] text-white/40 ml-1">OPERATIVE ALIAS</label>
                            <div className="relative group">
                                <Terminal className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-white/60 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="ENTER EMAIL OR HANDLE"
                                    className="w-full bg-[#0A0A0A] border border-white/10 focus:border-white/40 py-4 pl-14 pr-6 text-white placeholder:text-white/20 outline-none transition-all text-[11px] font-black tracking-widest uppercase rounded-full"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-3">
                            <label className="text-[9px] font-black uppercase tracking-[0.5em] text-white/40 ml-1">DIRECT KEY</label>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-white/60 transition-colors" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••••••"
                                    className="w-full bg-[#0A0A0A] border border-white/10 focus:border-white/40 py-4 pl-14 pr-14 text-white placeholder:text-white/20 outline-none transition-all text-[11px] font-black tracking-widest uppercase rounded-full"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/60 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button className="w-full bg-white text-black font-black uppercase tracking-[0.5em] text-[11px] py-5 flex items-center justify-center gap-4 hover:bg-[#E81414] hover:text-white transition-all rounded-full active:scale-[0.98]">
                            INITIATE AUTH <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>

                    {/* Footer links */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 text-[10px] tracking-[0.2em] font-black uppercase">
                        <span className="text-white/20">UNAUTHORIZED OPERATIVE?</span>
                        <Link href="/auth/register" className="text-white hover:text-[#E81414] transition-colors">
                            REGISTER NOW →
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
