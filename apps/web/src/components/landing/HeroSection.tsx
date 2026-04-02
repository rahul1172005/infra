import { motion } from'framer-motion';
import Link from'next/link';

export function HeroSection() {
 return (
 <section className="relative pt-32 pb-48 px-6 md:px-12 flex flex-col items-center text-center md:items-start md:text-left justify-start z-10">
  <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut"}}
  className="max-w-4xl flex flex-col items-center md:items-start"
  >
  <h1 className="text-[#FFD700] text-5xl sm:text-6xl md:text-8xl lg:text-[100px] font-bold leading-[1.4] tracking-wider mb-10">
  FIRE AND BLOOD, <br />
  ONLY DRAGONS RULE
  </h1>
  <p className="text-[#FFD700] text-[10px] md:text-xs tracking-widest leading-relaxed max-w-[400px] mb-12 opacity-80 uppercase mx-auto md:mx-0">
  We empower you to take bold actions that secure your digital world and eliminate threats.
  </p>

 <div className="flex flex-wrap items-center gap-4 relative z-20 mt-8">
 <Link href="/dashboard"className="bg-[#FFD700] text-black font-bold text-xs px-6 py-3 tracking-widest uppercase hover:bg-white hover:text-black transition-colors rounded-sm border border-[#FFD700]">
 BOOST SECURITY
 </Link>
  <Link href="/dashboard"className="bg-transparent text-[#FFD700] font-bold text-xs px-6 py-3 tracking-widest uppercase hover:bg-[#FFD700]/10 transition-colors rounded-sm border border-[#FFD700]">
 ABOUT CIPHER
 </Link>
 </div>
 </motion.div>

 {/* Futuristic Globe graphic representation (using CSS radial dots) */}
 <div className="absolute right-0 bottom-0 pointer-events-none w-[600px] h-[400px] sm:w-[800px] sm:h-[500px] lg:w-[1000px] lg:h-[600px] translate-x-1/4 translate-y-1/4 mix-blend-screen opacity-90 overflow-hidden">
 <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,#856a00_0%,transparent_70%)] opacity-30"/>
 <div className="absolute inset-0 right-0 top-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.1)_1px,transparent_1px)] bg-[size:10px_10px] [mask-image:radial-gradient(ellipse_50%_100%_at_50%_0%,#000_10%,transparent_80%)] delay-200 duration-1000 animate-pulse"/>
 </div>
 </section>
 );
}
