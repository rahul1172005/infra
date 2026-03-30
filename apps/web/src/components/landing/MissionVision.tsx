import { motion } from'framer-motion';

export function MissionVision() {
 return (
 <section className="px-6 md:px-12 w-full max-w-[1600px] mx-auto z-20 relative pb-24">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#FFD700] border border-[#FFD700]">

 {/* Mission */}
 <div className="bg-black relative overflow-hidden group p-8 md:p-12 h-[350px] md:h-[450px] flex flex-col items-center text-center md:items-start md:text-left justify-between hover:bg-[#FFD700]/5 transition-colors cursor-pointer">
 <div className="absolute inset-0 bg-[linear-gradient(rgba(255,215,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,215,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity"/>

 <h3 className="text-[#FFD700] text-2xl md:text-3xl font-bold tracking-widest uppercase relative z-10 flex items-center justify-center md:justify-start gap-3">
 <span>/</span> MISSION
 </h3>

 <p className="text-[#FFD700]/90 text-[10px] sm:text-xs tracking-widest uppercase leading-loose relative z-10 max-w-[500px]">
 AT CIPHER, OUR MISSION IS TO PROVIDE INNOVATIVE CYBERSECURITY SOLUTIONS THAT PROTECT BUSINESSES AND ENSURE DATA RESILIENCE IN A DYNAMIC CYBER LANDSCAPE.
 </p>
 </div>

 {/* Vision */}
 <div className="bg-black relative overflow-hidden group p-8 md:p-12 h-[350px] md:h-[450px] flex flex-col items-center text-center md:items-start md:text-left justify-between hover:bg-[#FFD700]/5 transition-colors cursor-pointer">
 <div className="absolute inset-0 bg-[linear-gradient(rgba(255,215,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,215,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity"/>

 <h3 className="text-[#FFD700] text-2xl md:text-3xl font-bold tracking-widest uppercase relative z-10 flex items-center justify-center md:justify-start gap-3">
 <span>/</span> VISION
 </h3>

 <p className="text-[#FFD700]/90 text-[10px] sm:text-xs tracking-widest uppercase leading-loose relative z-10 max-w-[500px]">
 OUR VISION IS TO BE A GLOBAL LEADER IN CYBERSECURITY, CREATING A SECURE DIGITAL FUTURE FOR BUSINESSES THROUGH INNOVATION AND RESILIENCE AGAINST CYBER THREATS.
 </p>
 </div>

 </div>
 </section>
 );
}
