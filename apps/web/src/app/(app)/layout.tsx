'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useMusicStore } from '@/lib/store/useMusicStore';
import { Music } from 'lucide-react';

// Google Icon SVG
const GoogleIcon = ({ size = 16 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M47.532 24.552c0-1.636-.147-3.2-.42-4.704H24.48v9.02h12.972c-.564 2.964-2.244 5.48-4.764 7.164v5.952h7.704c4.512-4.152 7.14-10.272 7.14-17.432z" fill="#4285F4" />
        <path d="M24.48 48c6.48 0 11.916-2.148 15.888-5.82l-7.704-5.952c-2.148 1.44-4.896 2.292-8.184 2.292-6.3 0-11.628-4.248-13.536-9.96H3.012v6.156C6.972 42.876 15.144 48 24.48 48z" fill="#34A853" />
        <path d="M10.944 28.56A14.4 14.4 0 0 1 10.2 24c0-1.584.276-3.12.744-4.56v-6.156H3.012A23.952 23.952 0 0 0 .48 24c0 3.852.924 7.5 2.532 10.716l7.932-6.156z" fill="#FBBC05" />
        <path d="M24.48 9.492c3.54 0 6.72 1.212 9.216 3.6l6.888-6.888C36.384 2.34 30.96 0 24.48 0 15.144 0 6.972 5.124 3.012 13.284l7.932 6.156c1.908-5.712 7.236-9.948 13.536-9.948z" fill="#EA4335" />
    </svg>
);

// Game of Thrones Lore for navigation
const GOT_LORE = {
    COMMAND: 'SMALL COUNCIL',
    OPERATIONS: 'DRAGONSTONE',
    SYSTEM: 'WINTERFELL',
    WESTEROS: 'TARGARYEN',
    ARENA: 'IRON THRONE',
};

const NAV_GROUPS = [
    {
        group: 'COMMAND',
        items: [
            { href: '/dashboard', label: 'DASHBOARD' },
            { href: '/workspace', label: 'WORKSPACE' },
            { href: '/analytics', label: 'ANALYTICS' },
            { href: '/challenges', label: 'CHALLENGES' },
        ]
    },
    {
        group: 'OPERATIONS',
        items: [
            { href: '/teams', label: 'HOUSES' },
            { href: '/operations/scores', label: 'BATTLE SCORES' },
            { href: '/domains', label: 'DOMAINS' },
            { href: '/leaderboard', label: 'LEADERBOARD' },
        ]
    },
    {
        group: 'SYSTEM',
        items: [
            { href: '/settings', label: 'SETTINGS' },
            { href: '/profile', label: 'PROFILE' },
        ]
    }
];

function NavContent({ pathname, onClose, userProfile }: { pathname: string; onClose?: () => void; userProfile: any }) {
    return (
        <div className="flex flex-col h-full bg-black border-r-2 border-white/10 relative overflow-hidden">
            {/* Header / Logo */}
            <div className="h-20 border-b-2 border-white/10 flex items-center px-8 bg-black group hover:bg-white transition-all duration-300 relative z-10">
                <Link href="/" onClick={onClose} className="flex items-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center transition-transform">
                        <img
                            src="/logo.png"
                            alt="Zapsters Logo"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white group-hover:text-black text-[12px] tracking-[0.5em] font-black uppercase transition-colors ">ZAPSTERS</span>
                        <span className="text-white/40 group-hover:text-black/30 text-[8px] tracking-[0.3em] font-black transition-colors  mt-0.5">PLATFORM</span>
                    </div>
                </Link>
            </div>

            {/* Navigation Scroll Area */}
            <div className="flex-1 overflow-y-auto pt-10 px-6 space-y-12 no-scrollbar relative z-10">
                {NAV_GROUPS.map(({ group, items }) => (
                    <div key={group}>
                        <div className="flex items-center gap-3 mb-6 pl-2">
                            <p className="text-white/20 text-[10px] tracking-[0.6em] uppercase font-black">{group}</p>
                            <span className="text-white/10 text-[9px] font-black">{GOT_LORE[group as keyof typeof GOT_LORE]}</span>
                        </div>
                        <div className="space-y-1">
                            {items.map(({ href, label }) => {
                                const active = pathname === href;
                                return (
                                    <Link
                                        key={href}
                                        href={href}
                                        onClick={onClose}
                                        className={`flex items-center gap-5 px-5 py-4 text-[11px] tracking-[0.3em] font-black uppercase transition-all rounded-full
 ${active
                                                ? 'bg-white text-black'
                                                : 'text-white/40 hover:text-black hover:bg-white'
                                            }`}
                                    >
                                        <span className="flex-1 truncate">{label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* User Footer */}
            <div className="p-4 md:p-6 relative z-10 space-y-3">
                <Link
                    href="/auth/login"
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-[2rem] hover:border-white/30 transition-all group"
                >
                    <GoogleIcon size={15} />
                    <span className="text-[10px] tracking-[0.3em] font-black uppercase text-white/50 group-hover:text-white transition-colors">SIGN IN WITH GOOGLE</span>
                </Link>
                <div
                    onClick={() => {
                        window.location.href = '/profile';
                    }}
                    className="bg-black border border-white/10 p-4 flex items-center gap-4 group cursor-pointer hover:border-[#E81414]/50 transition-all rounded-[2.5rem]"
                >
                    <div className="w-10 h-10 bg-white flex items-center justify-center shrink-0 rounded-full text-black font-black text-xs overflow-hidden">
                        {userProfile.avatar ? (
                            <img src={userProfile.avatar} alt="P" className="w-full h-full object-cover" />
                        ) : (
                            userProfile.initials
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-white text-[11px] tracking-[0.05em] font-black uppercase group-hover:text-[#E81414] transition-colors leading-tight">{userProfile.name}</p>
                        <p className="text-[#E81414] text-[9px] tracking-[0.2em] font-black uppercase mt-0.5">{userProfile.class}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [userProfile, setUserProfile] = useState({
        name: 'HOUSE TARGARYEN',
        house: 'TARGARYEN',
        class: 'DRAGONBORN',
        avatar: null as string | null,
        initials: 'RS'
    });

    const { isOpen, toggleOpen, isPlaying } = useMusicStore();

    useEffect(() => {
        const loadProfile = () => {
            const up = localStorage.getItem('user_profile');
            if (up) {
                try {
                    const parsed = JSON.parse(up);
                    setUserProfile({
                        name: parsed.name || 'HOUSE TARGARYEN',
                        house: parsed.house || 'TARGARYEN',
                        class: parsed.class || 'DRAGONBORN',
                        avatar: parsed.avatar || null,
                        initials: (parsed.name || 'H T').split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()
                    });
                } catch (e) { }
            }
        };

        loadProfile();

        const handleSync = () => {
            loadProfile();
        };

        window.addEventListener('profile_update', handleSync);
        return () => window.removeEventListener('profile_update', handleSync);
    }, []);

    const currentLabel = NAV_GROUPS.flatMap(g => g.items).find(i => i.href === pathname)?.label ?? 'System';

    return (
        <div className="min-h-screen flex bg-black text-white selection:bg-[#E81414] selection:text-white flex-col font-['Game of Thrones']">

            {/* Mobile Sidebar Overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/90 z-40 lg:hidden backdrop-blur-md"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Mobile Sidebar Drawer */}
            <aside className={`fixed top-0 left-0 h-full w-72 z-50 transition-transform duration-500 ease-out lg:hidden bg-black shadow-none border-r-2 border-white/10
 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="absolute top-6 right-6 lg:hidden z-10">
                    <button
                        onClick={() => setOpen(false)}
                        className="w-10 h-10 flex items-center justify-center text-white hover:text-[#E81414] transition-colors font-black text-2xl border border-white/10 rounded-full"
                    >
                        ✕
                    </button>
                </div>
                <NavContent pathname={pathname} onClose={() => setOpen(false)} userProfile={userProfile} />
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-h-screen min-w-0 overflow-x-hidden">

                {/* Global Header */}
                <header className="fixed top-0 left-0 right-0 h-20 border-b border-white/10 flex items-center justify-between px-6 xl:px-10 bg-black z-[100] shrink-0">
                    <div className="flex items-center gap-6 xl:gap-8">
                        {/* Desktop Logo */}
                        <Link href="/" className="hidden lg:flex items-center gap-3 border-r border-white/10 pr-6 xl:pr-8 shrink-0 group/logo">
                            <div className="w-12 h-12 flex items-center justify-center transition-transform">
                                <img
                                    src="/logo.png"
                                    alt="Zapsters Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white text-[12px] tracking-[0.5em] font-black uppercase ">ZAPSTERS</span>
                                <span className="text-white/40 text-[8px] tracking-[0.3em] font-black  mt-0.5">PLATFORM</span>
                            </div>
                        </Link>

                        {/* Mobile Toggle & Logo replacement */}
                        <button
                            className="lg:hidden p-3 -ml-3 hover:bg-white/5 transition-colors text-white shrink-0 font-black text-xl "
                            onClick={() => setOpen(true)}
                        >
                            ☰
                        </button>
                        <Link href="/" className="flex flex-col min-w-0 lg:hidden shrink-0 translate-y-1 group/mobile-logo">
                            <span className="text-[20px] font-black tracking-tight uppercase  truncate group-hover/mobile-logo:text-[#E81414] transition-colors">{currentLabel}</span>
                            <div className="flex items-center gap-3 mt-1.5">
                                <span className="text-[10px] tracking-[0.4em] text-white/30 uppercase font-black">RETURN HOME</span>
                            </div>
                        </Link>

                        {/* Desktop Navigation Links (Dropdown) */}
                        <nav className="hidden lg:flex items-center gap-1">
                            {NAV_GROUPS.map((navGroup) => {
                                const isActiveGroup = navGroup.items.some(i => i.href === pathname);
                                return (
                                    <div key={navGroup.group} className="relative group/dropdown">
                                        <div className={`px-6 py-3 cursor-pointer text-[10px] tracking-[0.2em] font-black uppercase transition-all rounded-full flex items-center gap-2 ${isActiveGroup ? 'text-white' : 'text-white/40 hover:text-white'}`}>
                                            {navGroup.group}
                                            <span className="text-[8px] text-white/20 font-black">{GOT_LORE[navGroup.group as keyof typeof GOT_LORE]}</span>
                                            <span className="text-[10px] opacity-40 group-hover/dropdown:opacity-100 transition-opacity">v</span>
                                        </div>

                                        {/* Dropdown Menu */}
                                        <div className="absolute top-full left-0 mt-2 w-56 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-300 translate-y-2 group-hover/dropdown:translate-y-0 z-[200]">
                                            <div className="bg-black border border-white/10 p-2 rounded-3xl flex flex-col gap-1 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
                                                {navGroup.items.map((item) => {
                                                    const active = pathname === item.href;
                                                    return (
                                                        <Link
                                                            key={item.href}
                                                            href={item.href}
                                                            className={`px-4 py-3 text-[10px] tracking-[0.2em] font-black uppercase transition-all rounded-full flex items-center gap-3 ${active ? 'bg-white text-black' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                                                        >
                                                            <span>{item.label}</span>
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 xl:gap-5 shrink-0 pl-1 sm:pl-4">
                        {/* Music Toggle Button */}
                        <button
                            onClick={toggleOpen}
                            className={`flex items-center justify-center gap-3 px-3 sm:px-4 h-10 border rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all group shrink-0 ${isOpen ? 'bg-[#E81414] border-[#E81414] text-white' : 'border-white/10 text-white/50 hover:text-white hover:border-white/30'}`}
                        >
                            <div className={`w-3.5 h-3.5 flex items-center justify-center shrink-0`}>
                                <img
                                    src="/logo.png"
                                    alt=""
                                    className="w-full h-full object-contain brightness-0 invert"
                                    style={{
                                        transform: 'scale(3) translateX(0px) translateY(0px)' // CUSTOM SCALE AND POS FOR DASHBOARD
                                    }}
                                />
                            </div>
                            <span className="hidden lg:inline">SONIC</span>
                            {isPlaying && (
                                <div className="flex gap-0.5 items-end h-3 mb-0.5">
                                    <div className="w-0.5 bg-current animate-[music-bar_0.8s_ease-in-out_infinite]" />
                                    <div className="w-0.5 bg-current animate-[music-bar_1.2s_ease-in-out_infinite]" />
                                    <div className="w-0.5 bg-current animate-[music-bar_1.0s_ease-in-out_infinite]" />
                                </div>
                            )}
                        </button>

                        {/* Google Sign In button — desktop */}
                        <Link
                            href="/auth/login"
                            className="hidden md:flex items-center gap-2 px-4 py-2 border border-white/15 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-white/50 transition-none whitespace-nowrap"
                        >
                            <GoogleIcon size={14} />
                            <span className="hidden lg:inline">SIGN IN</span>
                        </Link>
                        <div
                            onClick={() => router.push('/profile')}
                            className="hidden sm:flex items-center border-l border-white/10 pl-4 xl:pl-6 h-10 gap-4 cursor-pointer group hover:text-white text-white/40 transition-colors"
                        >
                            <div className="w-9 h-9 bg-white flex items-center justify-center shrink-0 rounded-full text-black font-black text-xs overflow-hidden">
                                {userProfile.avatar ? (
                                    <img src={userProfile.avatar} alt="P" className="w-full h-full object-cover" />
                                ) : (
                                    userProfile.initials
                                )}
                            </div>
                            <div className="hidden xl:flex flex-col items-start translate-y-0.5 min-w-0">
                                <span className="text-[10px] tracking-[0.1em] font-black uppercase text-white whitespace-nowrap">{userProfile.name}</span>
                                <span className="text-[8px] tracking-[0.1em] font-black uppercase text-[#E81414]">{userProfile.class}</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Viewport */}
                <main className="flex-1 relative bg-black pt-20">
                    <div className="absolute inset-0 dot-grid opacity-[0.05]" />
                    <div className="relative z-10 p-3 sm:p-4 md:p-10 lg:p-14 xl:p-20 max-w-[1800px] mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
