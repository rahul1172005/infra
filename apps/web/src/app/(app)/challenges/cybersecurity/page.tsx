'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShieldAlert, Key, LockOpen, Terminal as TerminalIcon } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { DotGrid } from '@/components/ui/DotGrid';
import { Button } from '@/components/ui/Button';
import { HUDCard } from '@/components/ui/HUDCard';
import { GOTIcon } from '@/components/icons/GOTIcon';

export default function CybersecurityArena() {
    const [status, setStatus] = useState<'brief' | 'hacking' | 'breached'>('brief');
    const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
    const [command, setCommand] = useState('');
    const [hackProgress, setHackProgress] = useState(0);

    const startHack = () => {
        setStatus('hacking');
        setTerminalOutput([
            'INITIATING SHADOW PROTOCOL...',
            'ESTABLISHING SECURE SSH TUNNEL...',
            'VULCAN CORE DETECTED. BYPASSING IDS...',
            'ROOT ACCESS GRANTED. TYPE "help" FOR COMMANDS.'
        ]);
        setHackProgress(0);
    };

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = command.trim().toLowerCase();
        if (!cmd) return;

        const newOutput = [...terminalOutput, `root@vulcan:~# ${command}`];
        
        switch(cmd) {
            case 'help':
                newOutput.push('AVAILABLE COMMANDS:', '  scan    - PERFORM NETWORK ANALYSIS', '  ls      - LIST DIRECTORY CONTENTS', '  cat     - READ FILE CONTENT', '  exploit - EXECUTE SYSTEM BREACH');
                break;
            case 'scan':
                newOutput.push('SCANNING NETWORK...', 'PORT 22   [SSH]      : OPEN', 'PORT 80   [HTTP]     : OPEN', 'PORT 443  [HTTPS]    : OPEN', 'PORT 3306 [MYSQL]    : FILTERED');
                break;
            case 'ls':
                newOutput.push('bin/  etc/  home/  root/  tmp/  vault.key');
                break;
            case 'cat vault.key':
                newOutput.push('DECRYPTING VAULT KEY...', 'CONTENT: [ REDACTED ]', 'HINT: USE KEY TO EXPLOIT CORE.');
                break;
            case 'exploit':
                newOutput.push('LAUNCHING PAYLOAD...', '[+] BYPASSING FIREWALL...', '[+] INJECTING SHELLCODE...', '[+] ESCALATING PRIVILEGES...');
                setHackProgress(100);
                setTimeout(() => setStatus('breached'), 2000);
                break;
            default:
                newOutput.push(`COMMAND NOT FOUND: ${cmd}`);
        }

        setTerminalOutput(newOutput);
        setCommand('');
        
        // Auto-scroll logic would be nice but this is a controlled component
    };

    return (
        <div className="w-full pb-20 space-y-8 md:space-y-12 relative overflow-hidden text-white font-mono min-h-screen">
            <DotGrid />

            <div className="flex items-center gap-4 relative z-10">
                <Link href="/challenges">
                    <Button variant="outline" className="p-2 border-white/20 text-white hover:bg-[#E81414] hover:text-white hover:border-[#E81414] transition-colors rounded-xl">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <div className="px-4 py-1.5 rounded-full border border-[#E81414]/30 bg-[#E81414]/10 text-[#E81414] text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
                    EXTREME THREAT LEVEL
                </div>
            </div>

            <PageHeader
                tag={status === 'brief' ? "ARENA INITIALIZED: SECURITY" : "DEFCON 1 INTERFACE"}
                title={<>CYBER <span className="text-[#E81414]">THREATS</span></>}
            />

            <AnimatePresence mode="wait">
                {status === 'brief' && (
                    <motion.div key="brief" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
                        <HUDCard title="THREAT INTEL" tag="RED TEAM" className="lg:col-span-2" padding="p-6 md:p-10">
                            <div className="space-y-6">
                                <p className="text-white/60 text-sm md:text-base leading-relaxed uppercase tracking-widest font-bold">
                                    ENGAGE IN FULL-SPECTRUM PENETRATION TESTING, SHATTER CRYPTOGRAPHIC LOCKS, AND MITIGATE EXPLOITATION ATTEMPTS BEFORE DATA LOSS OCCURS.
                                </p>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10 pt-6">
                                    <div className="p-4 bg-[#E81414]/5 rounded-xl border border-[#E81414]/20 flex flex-col items-center justify-center text-center gap-2">
                                        <GOTIcon variant="white" size={24} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-[#E81414]/80">PEN TESTING</span>
                                    </div>
                                    <div className="p-4 bg-[#E81414]/5 rounded-xl border border-[#E81414]/20 flex flex-col items-center justify-center text-center gap-2">
                                        <GOTIcon variant="white" size={24} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-[#E81414]/80">CRYPTOGRAPHY</span>
                                    </div>
                                    <div className="p-4 bg-[#E81414]/5 rounded-xl border border-[#E81414]/20 flex flex-col items-center justify-center text-center gap-2">
                                        <GOTIcon variant="white" size={24} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-[#E81414]/80">EXPLOIT MITIGATION</span>
                                    </div>
                                </div>
                            </div>
                        </HUDCard>

                        <HUDCard title="BOUNTY TARGET" tag="REWARD" className="flex flex-col justify-between" padding="p-6 md:p-10">
                            <div className="space-y-8 flex-1 flex flex-col justify-center">
                                <div>
                                    <p className="text-4xl font-black tracking-tighter text-[#E81414] tabular-nums leading-none">+3000 XP</p>
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#E81414]/50 mt-3 leading-relaxed">MAXIMUM YIELD</p>
                                </div>
                                <Button variant="primary" onClick={startHack} fullWidth className="py-6 text-xs font-black tracking-[0.4em] group bg-[#E81414] hover:bg-black hover:text-[#E81414] border border-[#E81414]">
                                    BREACH PROTOCOL
                                </Button>
                            </div>
                        </HUDCard>
                    </motion.div>
                )}

                {status === 'hacking' && (
                    <motion.div key="hacking" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 w-full h-[500px] flex flex-col border border-[#E81414]/30 bg-black rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(232,20,20,0.1)]">
                        {/* Terminal Header */}
                        <div className="h-12 border-b border-[#E81414]/20 flex items-center justify-between px-4 bg-[#E81414]/5">
                            <div className="flex items-center gap-3">
                                <TerminalIcon className="w-4 h-4 text-[#E81414]" />
                                <span className="text-xs font-black tracking-[0.3em] text-[#E81414]">KALI_LINUX_KERNEL_v6.1</span>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-white/20"></div>
                                <div className="w-3 h-3 rounded-full bg-[#E81414]/50"></div>
                            </div>
                        </div>

                        {/* Terminal Body */}
                        <div className="flex-1 p-6 overflow-y-auto space-y-2 text-sm text-[#E81414]/80 font-mono tracking-wider custom-scrollbar scroll-smooth">
                            {terminalOutput.map((line, i) => (
                                <motion.div 
                                    initial={{ opacity: 0, x: -10 }} 
                                    animate={{ opacity: 1, x: 0 }} 
                                    key={i}
                                >
                                    {line}
                                </motion.div>
                            ))}
                            <div className="animate-pulse">_</div>
                        </div>

                        {/* Terminal Input */}
                        <form onSubmit={handleCommand} className="border-t border-[#E81414]/20 bg-black flex p-4 items-center">
                            <span className="text-[#E81414] mr-3 font-bold font-mono">root@vulcan:~#</span>
                            <input 
                                type="text" 
                                value={command}
                                onChange={(e) => setCommand(e.target.value)}
                                className="flex-1 bg-transparent border-none outline-none text-[#E81414] font-mono tracking-widest placeholder:text-[#E81414]/30"
                                placeholder="ENTER COMMAND..."
                                autoFocus
                            />
                        </form>
                    </motion.div>
                )}

                {status === 'breached' && (
                    <motion.div key="breached" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 w-full min-h-[400px] flex flex-col items-center justify-center border border-[#E81414] bg-[#E81414]/10 rounded-[2rem] p-8 overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(232,20,20,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(232,20,20,0.2)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40"></div>
                        <div className="text-center space-y-6 relative z-10">
                            <LockOpen className="w-24 h-24 mx-auto text-[#E81414] drop-shadow-[0_0_20px_rgba(232,20,20,0.8)]" />
                            <h3 className="text-4xl font-black uppercase tracking-widest text-white text-shadow-lg">SYSTEM BREACHED</h3>
                            <p className="text-sm font-black tracking-[0.4em] text-white/80 uppercase">Root access acquired. +3000 XP Transferred.</p>
                            
                            <div className="pt-8">
                                <Link href="/challenges">
                                    <Button className="bg-[#E81414] text-white hover:bg-white hover:text-[#E81414] font-black uppercase tracking-widest text-xs px-12 py-4 shadow-[0_0_20px_rgba(232,20,20,0.5)]">
                                        EXTRACT FUNDS
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
