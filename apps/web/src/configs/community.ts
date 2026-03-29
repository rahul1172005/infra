import { MessageCircle, Heart, Share2, Terminal } from 'lucide-react';

export const communityConfig = {
    stats: [
        { title: 'ACTIVE WHISPERS', value: '42,012', icon: MessageCircle },
        { title: 'LOYALTY', value: '98%', icon: Heart },
        { title: 'BANNERS', value: '1,204', icon: Share2 },
        { title: 'HOUSES', value: '1,421', icon: Terminal },
    ],
    header: {
        title: "REALM",
        accentTitle: "COMMUNITY.",
        topLabel: "ROYAL COUNCIL NEXUS",
        status: {
            label: "REALM LOAD",
            value: "CRITICAL 100%",
            color: "text-[#E81414]"
        }
    },
    action: {
        title: "COUNCIL SILENT.",
        backgroundText: "BLACKWATER DEFENSE",
        description: "The royal council is currently under heavy raven rotation. The council will reopen once the Blackwater defense stabilizes."
    }
};
