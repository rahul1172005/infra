import { Shield, Swords, Activity } from 'lucide-react';

export const tournamentsConfig = {
    stats: [
        { title: 'TREASURY', value: '$120,402', icon: Shield, color: 'text-[#E81414]' },
        { title: 'HOUSES', value: '4,204', icon: Swords },
        { title: 'DUELS', value: '18.4K', icon: Activity },
    ],
    history: [
        { season: 'ERA 03', winner: 'TEAM TARGARYEN', prize: '$40K' },
        { season: 'ERA 02', winner: 'TEAM STARK', prize: '$35K' },
        { season: 'ERA 01', winner: 'TEAM LANNISTER', prize: '$25K' },
    ],
    requirements: [
        { label: 'KNIGHTHOOD VERIFIED', active: true },
        { label: 'HONOR LEVEL 10', active: false },
        { label: 'HOUSE DEPLOYED', active: true },
    ],
    header: {
        title: "THE",
        accentTitle: "TOURNEY.",
        topLabel: "ROYAL COMMAND",
        status: {
            label: "ERA OF THE DRAGON",
            value: "KINGS SYNC",
            color: "text-white"
        }
    },
    action: {
        title: "THE TOURNEY BREAK.",
        backgroundText: "INACTIVE",
        description: "SEASON 03 HAS BEEN CONCLUDED. FINAL RANKINGS VERIFIED. THE NEXT TOURNEY INITIATES IN 14 DAYS."
    }
};
