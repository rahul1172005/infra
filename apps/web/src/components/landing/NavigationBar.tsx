import { motion } from'framer-motion';
import Link from'next/link';
import { Square } from'lucide-react';

export function NavigationBar() {
 return (
 <motion.header
 initial={{ y: -20, opacity: 0 }}
 animate={{ y: 0, opacity: 1 }}
 transition={{ duration: 0.6 }}
 className="sticky top-6 z-50 flex justify-between items-center px-4 py-3 mx-6 bg-[#FFD700] text-black text-[10px] lg:text-sm tracking-wide font-bold uppercase rounded-sm border border-[#FFD700] shadow-2xl"
 >
 <div className="flex items-center gap-3">
 <Square className="w-5 h-5 fill-black"/>
 <span className="text-base tracking-widest">CIPHER</span>
 </div>

 <nav className="hidden xl:flex items-center gap-6">
 <Link href="#about"className="hover:opacity-70 transition-opacity">ABOUT</Link>
 <Link href="#solutions"className="hover:opacity-70 transition-opacity">SOLUTIONS</Link>
 <div className="w-px h-4 bg-black/20 mx-2"/>
 <Link href="/arena"className="hover:opacity-70 transition-opacity">ARENA</Link>
 <Link href="/threat-map"className="hover:opacity-70 transition-opacity">THREAT MAP</Link>
 <Link href="/workspace"className="hover:opacity-70 transition-opacity">WORKSPACE</Link>
 <Link href="/api-keys"className="hover:opacity-70 transition-opacity">APIS</Link>
 </nav>

 <div className="flex items-center">
 <Link href="/dashboard"className="bg-black text-[#FFD700] px-6 py-2 border border-black hover:bg-zinc-900 transition-colors uppercase tracking-[0.2em] text-[10px] font-bold">
 BOOST SECURITY
 </Link>
 </div>
 </motion.header>
 );
}
