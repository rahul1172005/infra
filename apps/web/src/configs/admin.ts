import { Shield, Users, Activity, Terminal } from 'lucide-react';

export const adminConfig = {
    stats: [
        { title: 'SYSTEM INTEGRITY', value: '100%', icon: Shield, color: 'text-[#E81414]' },
        { title: 'ACTIVE NODES', value: '1,204', icon: Users },
        { title: 'SYNC RATE', value: '98.2%', icon: Activity },
        { title: 'TERMINAL ACCESS', value: 'ROOT', icon: Terminal }
    ],
    header: {
        title: "SYSTEM",
        accentTitle: "OVERWATCH.",
        topLabel: "ROOT SUPERVISOR CMD",
        status: {
            label: "OVERWATCH STATUS",
            value: "OPERATIONAL 100%",
            color: "text-[#E81414]"
        }
    }
};
