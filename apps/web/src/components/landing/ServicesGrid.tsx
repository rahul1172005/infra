import { motion } from'framer-motion';
import { Activity, ShieldAlert, Binary } from'lucide-react';
import Link from'next/link';

const services = [
 {
 icon: <Activity className="w-5 h-5 text-[#FFD700]"/>,
 title: "NETWORK SECURITY",
 description: "SAFEGUARD YOUR NETWORK INFRASTRUCTURE AGAINST UNAUTHORIZED ACCESS AND ATTACKS.",
 href: "/arena"
 },
 {
 icon: <ShieldAlert className="w-5 h-5 text-[#FFD700]"/>,
 title: "SECURITY AUDITS",
 description: "COMPREHENSIVE SECURITY REVIEWS TO ENSURE COMPLIANCE, PROTECTION, AND EFFICIENCY.",
 href: "/code-review"
 },
 {
 icon: <Binary className="w-5 h-5 text-[#FFD700]"/>,
 title: "FORENSICS ANALYSIS",
 description: "IN-DEPTH INVESTIGATIONS TO UNDERSTAND BREACHES AND PREVENT FUTURE OCCURRENCES.",
 href: "/threat-map"
 }
];

export function ServicesGrid() {
 return (
 <section className="px-6 md:px-12 w-full max-w-[1600px] mx-auto z-20 relative">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#FFD700] border-y border-x border-[#FFD700]">
 {services.map((svc, i) => (
 <Link href={svc.href} key={i} className={`p-8 md:p-12 relative overflow-hidden bg-black hover:bg-[#FFD700]/5 transition-colors cursor-pointer group block`}>
 {/* Grid background effect */}
 <div className="absolute inset-0 bg-[linear-gradient(rgba(255,215,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,215,0,0.1)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity"/>

 <div className="relative z-10 flex flex-col gap-6">
 {svc.icon}
 <div className="mt-8">
 <h3 className="text-[#FFD700] font-bold text-sm md:text-base mb-3 uppercase tracking-widest">{svc.title}</h3>
 <p className="text-[#FFD700]/70 text-[9px] md:text-[10px] uppercase tracking-widest leading-relaxed">
 {svc.description}
 </p>
 </div>
 </div>
 </Link>
 ))}
 </div>
 </section>
 );
}
