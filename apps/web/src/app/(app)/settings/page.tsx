'use client';

import { motion } from'framer-motion';

const LockIcon = (props: any) => <img src="/suriken.png" alt="icon" {...props} className={`object-contain ${props.className || ''}`} style={{ transform: "scale(2.2) translate(0px, 0px)" }} />;
const KeyIcon = (props: any) => <img src="/suriken.png" alt="icon" {...props} className={`object-contain ${props.className || ''}`} style={{ transform: "scale(2.2) translate(0px, 0px)" }} />;
const ShieldCheckIcon = (props: any) => <img src="/suriken.png" alt="icon" {...props} className={`object-contain ${props.className || ''}`} style={{ transform: "scale(2.2) translate(0px, 0px)" }} />;
const CpuIcon = (props: any) => <img src="/suriken.png" alt="icon" {...props} className={`object-contain ${props.className || ''}`} style={{ transform: "scale(2.2) translate(0px, 0px)" }} />;
const TerminalIcon = (props: any) => <img src="/suriken.png" alt="icon" {...props} className={`object-contain ${props.className || ''}`} style={{ transform: "scale(2.2) translate(0px, 0px)" }} />;
/* ── Decorative Elements ─────────────────────────────────────────────── */
const DotGrid = ({ className = ""}: { className?: string }) => (
 <div className={`absolute inset-0 dot-grid opacity-[0.05] pointer-events-none ${className}`} />
);

export default function SettingsPage() {
 return (
 <div className="w-full pb-16 space-y-8 md:space-y-12 lg:space-y-16 relative overflow-hidden">
 {/* Background Glows */}
 <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#E81414]/5 blur-[200px] pointer-events-none"/>
 <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/[0.02] blur-[150px] pointer-events-none"/>

 {/* Header Module */}
 <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end border-b border-white/10 pb-16 gap-12 relative z-10">
 <div className="space-y-8">
 <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.8] text-white">
  GLOBAL<br /><span className="text-[#E81414]">CONFIG</span>
 </h1>
 </div>

 <div className="w-full xl:w-auto p-5 md:p-10 border border-white/10 bg-[#0A0A0A] rounded-2xl md:rounded-[2.5rem] flex flex-col gap-3 md:gap-4 group hover:bg-[#E81414] hover:border-[#E81414] transition-all text-white hover:text-black">
 <div className="flex items-center justify-between border-b border-white/10 group-hover:border-black/20 pb-4 transition-colors">
 <span className="text-[9px] tracking-[0.6em] uppercase font-black text-white/30 group-hover:text-black/50 transition-colors">HW SIGNATURE</span>
 
 </div>
 <span className="text-[12px] break-all line-clamp-1 font-black transition-colors mt-2">HID DE292X BETA SYNC V9</span>
 </div>
 </div>

 {/* Config Locked State */}
 <div className="bg-[#050505] border border-white/10 rounded-2xl md:rounded-[3rem] relative min-h-[400px] md:min-h-[600px] lg:min-h-[750px] flex flex-col items-center justify-center p-8 md:p-16 overflow-hidden text-center group/stage hover:bg-[#E81414] hover:border-[#E81414] transition-colors duration-500">
 <DotGrid />
 <div className="absolute inset-0 scanlines opacity-5 mix-blend-overlay pointer-events-none group-hover/stage:opacity-10 transition-opacity"/>

 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/[0.01] uppercase select-none pointer-events-none whitespace-nowrap group-hover:tracking-[0.1em] transition-all duration-1000">
 SYSTEM ENCRYPTION
 </div>

 <div className="relative z-10 flex flex-col items-center gap-16 max-w-4xl px-8">
 <div className="w-32 h-32 border border-white/10 rounded-[2.5rem] bg-black flex items-center justify-center relative hover:bg-black group/icon transition-all duration-500 overflow-hidden">
 <LockIcon className="w-12 h-12 text-white group-hover/stage:text-[#E81414] group-hover/icon:scale-110 transition-transform z-10"/>
 </div>

  <div className="space-y-6 md:space-y-10 group/text">
  <h2 className="text-3xl md:text-7xl font-black uppercase text-white group-hover/stage:text-black tracking-tighter md:tracking-widest leading-tight md:leading-none border-b border-white/10 group-hover/stage:border-black/20 pb-4 md:pb-8 transition-colors inline-block">
  AUTHORIZATION<br className="md:hidden"/> REQUIRED
  </h2>
 <div className="p-10 border border-white/10 bg-black max-w-2xl mx-auto backdrop-blur-sm rounded-[2rem] group-hover/stage:bg-white/10 group-hover/stage:border-black/10 transition-colors">
 <p className="text-[12px] tracking-[0.2em] font-black uppercase leading-loose text-white/40 group-hover/stage:text-black/70 transition-colors duration-500">
 ADVANCED SYSTEM CONFIGURATIONS ARE CURRENTLY LOCKED BY PRIMARY SYNDICATE DIRECTIVES.
 ELEVATED CLEARANCE IS REQUIRED FOR MODIFICATION.
 </p>
 </div>
 </div>

 <div className="flex flex-col items-center gap-6 mt-8">
 <button className="px-14 py-6 bg-white text-black text-[11px] tracking-[0.6em] font-black uppercase hover:bg-black hover:text-white transition-all transform hover:scale-105 active:scale-95 flex items-center gap-6 rounded-full group-hover/stage:bg-black group-hover/stage:text-white group-hover/stage:hover:bg-white group-hover/stage:hover:text-black">
 REQUEST CLEARANCE <KeyIcon className="w-5 h-5"/>
 </button>
 <p className="text-[10px] tracking-[0.4em] font-black uppercase text-[#E81414] group-hover/stage:text-black/60 transition-colors">
 CURRENT LEVEL: OPERATIVE
 </p>
 </div>
 </div>
 </div>

 {/* Sub-modules */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
 <SubModule icon={<ShieldCheckIcon className="w-6 h-6"/>} title="SECURITY POLICIES"desc="VIEW ENCRYPTION STANDARDS AND ACTIVE PROTOCOLS"/>
 <SubModule icon={<CpuIcon className="w-6 h-6"/>} title="CORE PROCESSING"desc="DIAGNOSTIC DATA FOR Z-OS KERNEL ALLOCATION"/>
 <SubModule icon={<TerminalIcon className="w-6 h-6"/>} title="DEV TERMINAL"desc="LOCAL CLI EMULATOR FOR SYSTEM DEBUGGING"/>
 </div>
 </div>
 );
}

function SubModule({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
 return (
 <div className="p-10 bg-[#0A0A0A] border border-white/10 hover:bg-[#E81414] hover:border-[#E81414] transition-all group/sub rounded-[2.5rem] cursor-pointer text-white hover:text-black">
 <div className="w-14 h-14 border border-white/10 rounded-[1.5rem] flex items-center justify-center bg-black group-hover:bg-black group-hover:border-black transition-all mb-8 text-white">
 {icon}
 </div>
 <h3 className="text-[14px] tracking-[0.4em] font-black uppercase mb-4 transition-colors">
 {title}
 </h3>
 <p className="text-[10px] tracking-[0.2em] font-black uppercase text-white/30 group-hover/sub:text-black/60 transition-colors leading-relaxed">
 {desc}
 </p>
 </div>
 );
}
