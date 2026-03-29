'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GOTIcon } from '@/components/icons/GOTIcon';
import Link from 'next/link';

/* ── Decorative Elements ─────────────────────────────────────────── */
const DotGrid = () => (
    <div className="absolute inset-0 dot-grid opacity-[0.05] pointer-events-none" />
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
                <Link href="/" className="flex items-center group">
                    <div className="w-16 h-16 flex items-center justify-center">
                        <GOTIcon type="targaryen" size={64} scale={1.6} x={0} y={0} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-black text-xl tracking-tighter uppercase text-white leading-none">ZAPSTERS</span>
                        <span className="text-white/20 text-[7px] tracking-[0.3em] font-black leading-none mt-0.5">PLATFORM</span>
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
                        ENTER YOUR HOUSE CREDENTIALS TO ACCESS THE IRON THRONE SYSTEM
                    </p>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4 p-5 border border-white/10 bg-black rounded-[1.5rem]">
                            <div className="w-2 h-2 rounded-full bg-[#E81414] shrink-0" />
                            <span className="text-[10px] tracking-[0.3em] font-black uppercase text-white/40">VALYRIAN SECURITY ACTIVE</span>
                        </div>
                        <div className="flex items-center gap-4 p-5 border border-white/10 bg-black rounded-[1.5rem]">
                            <div className="w-2 h-2 rounded-full bg-white/30 shrink-0" />
                            <span className="text-[10px] tracking-[0.3em] font-black uppercase text-white/40">ROYAL CLEARANCE REQUIRED</span>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="text-[9px] tracking-[0.3em] font-black uppercase text-white/10">
                    © 2026 ZAPSTERS
                </div>
            </div>

            {/* Right Auth Panel */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative z-10">

                {/* Mobile Logo */}
                <div className="lg:hidden mb-10 flex flex-col items-center gap-3">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-12 h-12 flex items-center justify-center">
                            <GOTIcon type="targaryen" size={48} scale={1.6} x={0} y={0} />
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
                        <GOTIcon type="targaryen" size={24} scale={1.6} x={0} y={0} />
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
                            <label className="text-[9px] font-black uppercase tracking-[0.5em] text-white/40 ml-1">HOUSE ALIAS</label>
                            <div className="relative group">
                                <GOTIcon type="targaryen" size={32} scale={1.6} x={0} y={0} className="absolute left-5 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-60 transition-opacity" />
                                <input
                                    type="text"
                                    placeholder="ENTER HOUSE EMAIL OR TITLE"
                                    className="w-full bg-black border border-white/10 focus:border-white/40 py-4 pl-14 pr-6 text-white placeholder:text-white/20 outline-none transition-all text-[11px] font-black tracking-widest uppercase rounded-full"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-3">
                            <label className="text-[9px] font-black uppercase tracking-[0.5em] text-white/40 ml-1">DIRECT KEY</label>
                            <div className="relative group">
                                <GOTIcon type="lock" size={32} scale={1.6} x={0} y={0} className="absolute left-5 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-60 transition-opacity" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••••••"
                                    className="w-full bg-black border border-white/10 focus:border-white/40 py-4 pl-14 pr-14 text-white placeholder:text-white/20 outline-none transition-all text-[11px] font-black tracking-widest uppercase rounded-full"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/60 transition-colors"
                                >
                                    <GOTIcon type="eye" size={32} scale={1.6} x={0} y={0} />
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button className="w-full bg-white text-black font-black uppercase tracking-[0.5em] text-[11px] py-5 flex items-center justify-center gap-4 hover:bg-[#E81414] hover:text-white transition-all rounded-full active:scale-[0.98]">
                            INITIATE ACCESS <GOTIcon type="zap" size={24} scale={1.6} x={0} y={0} />
                        </button>
                    </form>

                    {/* Footer links */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 text-[10px] tracking-[0.2em] font-black uppercase">
                        <span className="text-white/20">UNRECOGNIZED HOUSE?</span>
                        <Link href="/auth/register" className="text-white hover:text-[#E81414] transition-colors">
                            REGISTER NOW →
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
