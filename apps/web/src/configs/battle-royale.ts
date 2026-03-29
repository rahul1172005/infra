import { Target, Zap, Skull } from 'lucide-react';

export const battleRoyaleConfig = {
    metrics: [
        { title: 'CONQUEST RATE', value: '14.2%', icon: Target },
        { title: 'DRAGON FIRE', value: '92%', icon: Zap },
        { title: 'ENEMIES', value: '2,401', icon: Skull, color: 'text-[#E81414]' },
    ],
    header: {
        title: "BATTLE",
        accentTitle: "ROYALE.",
        topLabel: "THE GREAT BATTLE",
        status: {
            label: "REALM OPS",
            value: "BATTLE ACTIVE",
            color: "text-white"
        }
    },
    action: {
        title: "DRAGON EN ROUTE.",
        backgroundText: "THE LONG NIGHT",
        description: "100 noble warriors enter the field. Survive the winter. Victory awarded to the last warrior standing."
    }
};
