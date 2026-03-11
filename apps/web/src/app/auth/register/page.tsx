'use client';

import { motion } from 'framer-motion';
import { Terminal, Lock, ArrowRight, Github, Zap, Shield, User } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-8 relative overflow-hidden selection:bg-[#E81414] selection:text-white">
            {/* Background Texture */}
            <div className="absolute inset-0 dot-grid opacity-[0.03] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[500px] relative z-10 space-y-12"
            >
                {/* Brand Header */}
                <div className="flex flex-col items-center gap-6">
                    <Link href="/">
                        <div className="w-16 h-16 flex items-center justify-center cursor-pointer transition-transform hover:scale-110">
                            <img
                                src="/logo.png"
                                alt="Zapsters Logo"
                                className="w-full h-full object-contain"
                                style={{ transform: "scale(2.5) translate(0px, 0px)" }}
                            />
                        </div>
                    </Link>
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-black uppercase leading-[0.9]">
                            ENLIST OPS
                        </h1>
                        <p className="text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] font-black text-[#AAAAAA] uppercase">New_Operative_Initialization</p>
                    </div>
                </div>

                {/* Form Container */}
                <div className="bg-white border-2 border-black p-10 md:p-12 space-y-8 relative">
                    <div className="absolute -top-0.5 -right-0.5 w-8 h-8 border-t-4 border-r-4 border-[#E81414] pointer-events-none" />
                    <div className="absolute -bottom-0.5 -left-0.5 w-8 h-8 border-b-4 border-l-4 border-black pointer-events-none" />

                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[#888888] ml-1">Alias</label>
                                <div className="relative">
                                    <Terminal className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#CCCCCC]" />
                                    <input
                                        type="text"
                                        placeholder="HANDLE"
                                        className="w-full bg-[#F9F9F9] border-2 border-black py-4 pl-12 pr-6 text-black placeholder:text-[#BBBBBB] outline-none focus:bg-white transition-all text-[12px] font-black uppercase tracking-widest"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[#888888] ml-1">Email_Node</label>
                                <div className="relative">
                                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#CCCCCC]" />
                                    <input
                                        type="email"
                                        placeholder="NET ADDR"
                                        className="w-full bg-[#F9F9F9] border-2 border-black py-4 pl-12 pr-6 text-black placeholder:text-[#BBBBBB] outline-none focus:bg-white transition-all text-[12px] font-black uppercase tracking-widest"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[#888888] ml-1">System_Key</label>
                            <div className="relative">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#CCCCCC]" />
                                <input
                                    type="password"
                                    placeholder="••••••••••••"
                                    className="w-full bg-[#F9F9F9] border-2 border-black py-4 pl-12 pr-6 text-black placeholder:text-[#BBBBBB] outline-none focus:bg-white transition-all text-[12px] font-black uppercase tracking-widest"
                                />
                            </div>
                        </div>

                        <div className="p-6 bg-[#F9F9F9] border-2 border-black flex items-start gap-4 mt-6">
                            <Shield className="w-5 h-5 text-[#E81414] mt-0.5 shrink-0" />
                            <p className="text-[10px] tracking-[0.1em] text-[#888888] font-black uppercase leading-relaxed">
                                By initializing, you agree to official rules of engagement. unauthorized kernel-level intrusion is strictly prohibited.
                            </p>
                        </div>

                        <button className="w-full bg-black text-white font-black uppercase tracking-[0.5em] text-[12px] py-6 flex items-center justify-center gap-4 hover:bg-[#E81414] transition-all transform active:scale-[0.98]">
                            ENLIST NOW <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>

                    <div className="flex items-center gap-6">
                        <div className="h-px bg-black opacity-10 flex-1" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#CCCCCC]">OR</span>
                        <div className="h-px bg-black opacity-10 flex-1" />
                    </div>

                    <button className="w-full border-2 border-black text-black font-black uppercase tracking-[0.5em] text-[11px] py-6 flex items-center justify-center gap-4 hover:bg-[#F9F9F9] transition-all">
                        <Github className="w-5 h-5" /> GITHUB AUTH
                    </button>
                </div>

                <div className="text-center text-[11px] tracking-[0.2em] font-black uppercase">
                    <span className="text-[#AAAAAA]">Valid Operative?</span> <Link href="/auth/login" className="text-black hover:text-[#E81414] transition-colors border-b-2 border-black/5 pb-0.5">RESUME AUTH</Link>
                </div>
            </motion.div>
        </div>
    );
}
