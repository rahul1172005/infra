import { motion } from 'framer-motion';

const words = ["BUSHIDO", "HONOR", "LOYALTY", "KATANA", "SHOGUNATE", "RONIN", "DOJO", "DISCIPLINE", "ZEN", "MASTERY", "PROWESS"];

export function TickerTape() {
    return (
        <div className="w-full overflow-hidden border-y border-[#FFD700] py-3 bg-black flex whitespace-nowrap mb-32 z-20 relative">
            <motion.div
                animate={{ x: [0, -2000] }}
                transition={{ ease: "linear", duration: 30, repeat: Infinity }}
                className="flex gap-8 items-center pl-8 w-max"
            >
                {[...words, ...words, ...words, ...words, ...words, ...words].map((word, i) => (
                    <div key={i} className="flex items-center gap-8">
                        <span className="text-[#FFD700] text-[10px] font-bold tracking-[0.2em]">{word}</span>
                        <div className="w-1.5 h-1.5 bg-[#FFD700] shrink-0" />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
