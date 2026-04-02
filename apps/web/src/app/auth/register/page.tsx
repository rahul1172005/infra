'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GOTIcon } from '@/components/icons/GOTIcon';
import Link from 'next/link';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { useRouter } from 'next/navigation';

const DotGrid = () => (
    <div className="absolute inset-0 dot-grid opacity-[0.05] pointer-events-none" />
);



export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuthStore();
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name })
            });

            const data = await res.json();

            if (res.ok && data.user) {
                if (login) login(data.user, data.access_token);
                router.push('/dashboard');
            } else {
                alert(data.message || 'Registration failed');
            }
        } catch (err) {
            console.error('Registration error:', err);
            alert('Connection failure');
        } finally {
            setIsLoading(false);
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setIsLoading(true);
            try {
                // Requirement 3 & 9: Use our local Next.js API route
                const response = await fetch('/api/auth/google', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token: tokenResponse.access_token }),
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    console.log('--- REGISTRATION/LOGIN SUCCESSFUL ---', result.user.email);
                    if (login) login(result.user, result.access_token);
                    router.push('/');
                } else {
                    console.error('CRITICAL: Registration failed:', result.message || 'Unknown error');
                    alert(`Initialization failed: ${result.message || 'Verification error'}`);
                }
            } catch (err) {
                console.error('CRITICAL: Fetch failed for Google registration:', {
                    error: err,
                    message: err instanceof Error ? err.message : String(err)
                });
                alert('Connection error during initialization');
            } finally {
                setIsLoading(false);
            }
        },
        onError: () => {
            console.error('Google Registration Failed');
            setIsLoading(false);
        }
    });

    return (
        <div className="min-h-screen bg-black text-white flex selection:bg-[#E81414] selection:text-white relative overflow-hidden">
            <DotGrid />
            {/* Background red glow removed */}

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
                        <span className="text-[10px] tracking-[0.6em] text-[#E81414] font-black uppercase">NEW RECRUIT</span>
                        <h2 className="text-5xl xl:text-6xl font-black uppercase leading-[1.3] tracking-tighter">
                            SQUIRE<br /><span className="text-[#E81414]">REALM</span>
                        </h2>
                    </div>
                    <p className="text-[12px] tracking-[0.15em] font-black uppercase text-white/30 leading-loose border-l-2 border-white/10 pl-6">
                        REGISTER YOUR HOUSE IDENTITY AND JOIN THE ROYAL RANKS
                    </p>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4 p-5 border border-white/10 bg-black rounded-[1.5rem]">
                            <div className="w-2 h-2 rounded-full bg-[#E81414] shrink-0" />
                            <span className="text-[10px] tracking-[0.3em] font-black uppercase text-white/40">RECRUITMENT OPEN</span>
                        </div>
                        <div className="flex items-center gap-4 p-5 border border-white/10 bg-black rounded-[1.5rem]">
                            <div className="w-2 h-2 rounded-full bg-white/30 shrink-0" />
                            <span className="text-[10px] tracking-[0.3em] font-black uppercase text-white/40">HOUSE ASSIGNMENT AUTO</span>
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
                    className="w-full max-w-[500px] space-y-8"
                >
                    {/* Header */}
                    <div className="space-y-3 border-b border-white/10 pb-8">
                        <span className="text-[10px] tracking-[0.6em] text-[#E81414] font-black uppercase">INITIALIZATION</span>
                        <h1 className="text-4xl md:text-5xl font-black uppercase leading-[1.3] tracking-tighter">
                            SQUIRE REGISTRATION
                        </h1>
                        <p className="text-[10px] tracking-[0.3em] font-black uppercase text-white/30">
                            NEW HOUSE INITIALIZATION
                        </p>
                    </div>

                    {/* Google Sign In — Primary */}
                    <button
                        className="w-full flex items-center justify-center gap-4 px-8 py-5 bg-white text-black text-[11px] font-black uppercase tracking-[0.5em] hover:bg-[#E81414] hover:text-white transition-all group rounded-full shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => googleLogin()}
                        disabled={isLoading}
                    >
                        {isLoading ? 'INITIATING...' : 'REGISTER WITH GOOGLE'}
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-6">
                        <div className="h-px bg-white/10 flex-1" />
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">OR</span>
                        <div className="h-px bg-white/10 flex-1" />
                    </div>

                    {/* Registration Form */}
                    <form className="space-y-8" onSubmit={handleRegister}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <label className="text-[9px] font-black uppercase tracking-[0.5em] text-white/40 ml-1">HOUSE TITLE</label>
                                <div className="relative group">
                                    <input 
                                        type="text" 
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="TITLE" 
                                        className="w-full bg-black border border-white/10 focus:border-white/40 py-5 px-10 text-white placeholder:text-white/20 outline-none transition-all text-[11px] font-black tracking-widest uppercase rounded-full" 
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="text-[9px] font-black uppercase tracking-[0.5em] text-white/40 ml-1">BATTLE NODE</label>
                                <div className="relative group">
                                    <input 
                                        type="email" 
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="NODE ADDR" 
                                        className="w-full bg-black border border-white/10 focus:border-white/40 py-5 px-10 text-white placeholder:text-white/20 outline-none transition-all text-[11px] font-black tracking-widest uppercase rounded-full" 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-4">
                            <label className="text-[9px] font-black uppercase tracking-[0.5em] text-white/40 ml-1">ROYAL PASS</label>
                            <div className="relative group">
                                <input 
                                    type={showPassword ? 'text' : 'password'} 
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••" 
                                    className="w-full bg-black border border-white/10 focus:border-white/40 py-5 px-10 pr-16 text-white placeholder:text-white/20 outline-none transition-all text-[11px] font-black tracking-widest uppercase rounded-full" 
                                />
                                <button 
                                    type="button" 
                                    onClick={() => setShowPassword(!showPassword)} 
                                    className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/60 transition-colors"
                                >
                                    <GOTIcon type="eye" size={28} scale={1.6} x={0} y={0} />
                                </button>
                            </div>
                        </div>

                        {/* Terms */}
                        <div className="flex items-start gap-5 p-5 bg-black border border-white/10 rounded-[1.5rem]">
                            <div className="mt-1">
                                <div className="w-2 h-2 rounded-full bg-[#E81414]" />
                            </div>
                            <p className="text-[10px] tracking-[0.15em] text-white/30 font-black uppercase leading-relaxed">
                                BY INITIALIZING YOU AGREE TO THE CODE OF CHIVALRY.
                                UNAUTHORIZED REALM INTRUSION IS PUNISHABLE BY THE NIGHT'S WATCH.
                            </p>
                        </div>

                        {/* Submit */}
                        <button 
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-white text-black font-black uppercase tracking-[0.5em] text-[11px] py-6 flex items-center justify-center gap-4 hover:bg-[#E81414] hover:text-white transition-all rounded-full active:scale-[0.98] shadow-2xl disabled:opacity-50"
                        >
                            {isLoading ? 'INITIATING...' : 'INITIALIZE SQUIRE'}
                        </button>
                    </form>

                    {/* Footer links */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 text-[10px] tracking-[0.2em] font-black uppercase">
                        <span className="text-white/20">RECOGNIZED HOUSE?</span>
                        <Link href="/auth/login" className="text-white hover:text-[#E81414] transition-colors">
                            RESUME ACCESS →
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
