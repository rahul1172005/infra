'use client';

import { useState } from 'react';
import {
    LogOut, ChevronRight, Check, Trash2, AlertTriangle, Edit3
} from 'lucide-react';
import { GOTIcon } from '@/components/icons/GOTIcon';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ToggleSwitch } from '@/components/ui/ToggleSwitch';
import { SurikenIcon } from '@/components/icons/SurikenIcon';
import { DotGrid } from '@/components/ui/DotGrid';
import { PageHeader } from '@/components/ui/PageHeader';
import { HUDCard } from '@/components/ui/HUDCard';
import { MetaCard } from '@/components/ui/MetaCard';

// Settings Row
function SettingRow({ label, sub, children }: { label: string; sub?: string; children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between py-5 border-b border-white/5 last:border-0 gap-4 sm:gap-6">
            <div className="space-y-0.5 min-w-0 flex-1">
                <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] text-white truncate sm:whitespace-normal">{label}</p>
                {sub && <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-white/30 truncate sm:whitespace-normal">{sub}</p>}
            </div>
            <div className="shrink-0">
                {children}
            </div>
        </div>
    );
}

// Select input styled
function SelectInput({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
    return (
        <div className="relative group">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="bg-black border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] px-5 py-2.5 rounded-full outline-none focus:border-[#E81414]/50 transition-all cursor-pointer appearance-none pr-10"
            >
                {options.map(o => <option key={o} value={o} className="bg-black">{o}</option>)}
            </select>
            <ChevronRight className="w-3 h-3 absolute right-4 top-1/2 -translate-y-1/2 text-white/20 group-hover:text-white transition-colors rotate-90" />
        </div>
    );
}

export default function SettingsPage() {
    const router = useRouter();
    const [logoutConfirm, setLogoutConfirm] = useState(false);
    const [saved, setSaved] = useState(false);

    // Settings state
    const [notifications, setNotifications] = useState({
        emailAlerts: true,
        houseUpdates: true,
        matchReminders: false,
        rankChanges: true,
        systemAlerts: false,
    });
    const [privacy, setPrivacy] = useState({
        publicProfile: true,
        showActivity: true,
        showRank: true,
        allowChallenges: true,
    });
    const [preferences, setPreferences] = useState({
        theme: 'DARK',
        language: 'ENGLISH',
        timezone: 'IST GMT+5:30',
        performanceMode: false,
        reducedMotion: false,
    });

    const toggle = (setter: any, key: string) => {
        setter((prev: any) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleLogout = () => {
        if (!logoutConfirm) {
            setLogoutConfirm(true);
            setTimeout(() => setLogoutConfirm(false), 3000);
            return;
        }
        sessionStorage.removeItem('skipRealmWelcome');
        router.push('/auth/login');
    };

    return (
        <div className="w-full pb-20 space-y-8 md:space-y-10 relative">
            <DotGrid />

            {/* ══ HEADER ══════════════════════════════════════════════ */}
            <PageHeader
                tag="ADMINISTRATION"
                title={<>GLOBAL<br /><span className="text-[#E81414]">CONFIG</span></>}
                actions={
                    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
                        <Button
                            onClick={handleSave}
                            variant={saved ? 'secondary' : 'primary'}
                            icon={saved ? Check : (props: any) => <GOTIcon type="zap" {...props} />}
                            className="py-4 px-10"
                        >
                            {saved ? 'SAVED' : 'SAVE CONFIG'}
                        </Button>
                    </div>
                }
            />

            {/* ══ SETTINGS SECTIONS ═══════════════════════════════════ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">

                {/* Notifications */}
                <HUDCard title="NOTIFICATIONS" icon={<GOTIcon type="bell" size={56} className="opacity-70" />}>
                    <div className="px-2">
                        <SettingRow label="EMAIL ALERTS" sub="RECEIVE ALERTS VIA EMAIL">
                            <ToggleSwitch enabled={notifications.emailAlerts} onToggle={() => toggle(setNotifications, 'emailAlerts')} />
                        </SettingRow>
                        <SettingRow label="HOUSE UPDATES" sub="SYNC REPORTS FROM YOUR HOUSE">
                            <ToggleSwitch enabled={notifications.houseUpdates} onToggle={() => toggle(setNotifications, 'houseUpdates')} />
                        </SettingRow>
                        <SettingRow label="MATCH REMINDERS" sub="UPCOMING COMBAT TRIAL ALERTS">
                            <ToggleSwitch enabled={notifications.matchReminders} onToggle={() => toggle(setNotifications, 'matchReminders')} />
                        </SettingRow>
                        <SettingRow label="RANK CHANGES" sub="LEADERBOARD POSITION SHIFTS">
                            <ToggleSwitch enabled={notifications.rankChanges} onToggle={() => toggle(setNotifications, 'rankChanges')} />
                        </SettingRow>
                        <SettingRow label="SYSTEM ALERTS" sub="MAINTENANCE AND DOWNTIME">
                            <ToggleSwitch enabled={notifications.systemAlerts} onToggle={() => toggle(setNotifications, 'systemAlerts')} />
                        </SettingRow>
                    </div>
                </HUDCard>

                {/* Privacy */}
                <HUDCard title="PRIVACY" icon={<GOTIcon type="eye" size={56} className="opacity-70" />}>
                    <div className="px-2">
                        <SettingRow label="PUBLIC PROFILE" sub="VISIBLE TO THE REALM">
                            <ToggleSwitch enabled={privacy.publicProfile} onToggle={() => toggle(setPrivacy, 'publicProfile')} />
                        </SettingRow>
                        <SettingRow label="SHOW ACTIVITY" sub="DISPLAY YOUR ACTIVITY FEED">
                            <ToggleSwitch enabled={privacy.showActivity} onToggle={() => toggle(setPrivacy, 'showActivity')} />
                        </SettingRow>
                        <SettingRow label="SHOW RANK" sub="DISPLAY LEADERBOARD POSITION">
                            <ToggleSwitch enabled={privacy.showRank} onToggle={() => toggle(setPrivacy, 'showRank')} />
                        </SettingRow>
                        <SettingRow label="ALLOW CHALLENGES" sub="ACCEPT DIRECT COMBAT CHALLENGES">
                            <ToggleSwitch enabled={privacy.allowChallenges} onToggle={() => toggle(setPrivacy, 'allowChallenges')} />
                        </SettingRow>
                    </div>
                </HUDCard>

                {/* Preferences */}
                <HUDCard title="PREFERENCES" icon={<GOTIcon type="globe" size={56} className="opacity-70" />}>
                    <div className="px-2">
                        <SettingRow label="THEME" sub="INTERFACE COLOR SCHEME">
                            <SelectInput options={['DARK', 'DARKER', 'ABYSS']} value={preferences.theme} onChange={(v) => setPreferences(p => ({ ...p, theme: v }))} />
                        </SettingRow>
                        <SettingRow label="LANGUAGE" sub="DISPLAY LANGUAGE">
                            <SelectInput options={['ENGLISH', 'VALYRIAN', 'DOTHRAKI']} value={preferences.language} onChange={(v) => setPreferences(p => ({ ...p, language: v }))} />
                        </SettingRow>
                        <SettingRow label="TIMEZONE" sub="MATCH SCHEDULING ZONE">
                            <SelectInput options={['IST GMT+5:30', 'UTC+0', 'PST GMT-8', 'JST GMT+9']} value={preferences.timezone} onChange={(v) => setPreferences(p => ({ ...p, timezone: v }))} />
                        </SettingRow>
                        <SettingRow label="PERFORMANCE MODE" sub="DISABLE HEAVY ANIMATIONS">
                            <ToggleSwitch enabled={preferences.performanceMode} onToggle={() => toggle(setPreferences, 'performanceMode')} />
                        </SettingRow>
                        <SettingRow label="REDUCED MOTION" sub="MINIMIZE UI TRANSITIONS">
                            <ToggleSwitch enabled={preferences.reducedMotion} onToggle={() => toggle(setPreferences, 'reducedMotion')} />
                        </SettingRow>
                    </div>
                </HUDCard>

                {/* Security */}
                <HUDCard title="SECURITY" icon={<GOTIcon type="shield" size={56} className="opacity-70" />}>
                    <div className="px-2">
                        <SettingRow label="CHANGE PASSWORD" sub="UPDATE DIRECT KEY CREDENTIAL">
                            <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors">
                                UPDATE <ChevronRight className="w-3 h-3" />
                            </button>
                        </SettingRow>
                        <SettingRow label="TWO-FACTOR AUTH" sub="BIOMETRIC DOUBLE LOCK">
                            <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-[#E81414] hover:text-white transition-colors">
                                ENABLE <ChevronRight className="w-3 h-3" />
                            </button>
                        </SettingRow>
                        <SettingRow label="ACTIVE SESSIONS" sub="MANAGE CONNECTED DEVICES">
                            <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors">
                                VIEW <ChevronRight className="w-3 h-3" />
                            </button>
                        </SettingRow>
                        <SettingRow label="ENCRYPTION KEY" sub="256-BIT NODE SIGNATURE">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#E81414]">ACTIVE</span>
                        </SettingRow>
                        <SettingRow label="AUDIT LOG" sub="FULL ACCESS HISTORY">
                            <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors">
                                EXPORT <ChevronRight className="w-3 h-3" />
                            </button>
                        </SettingRow>
                    </div>
                </HUDCard>
            </div>

            {/* ══ SUB-MODULES BAR ════════════════════════════════════ */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                {[
                    { icon: <GOTIcon type="shield" size={64} />, title: 'SECURITY POLICIES', desc: 'ENCRYPTION STANDARDS AND ACTIVE PROTOCOLS' },
                    { icon: <GOTIcon type="zap" size={64} />, title: 'CORE PROCESSING', desc: 'DIAGNOSTIC DATA FOR ROYAL KERNEL ALLOCATION' },
                    { icon: <GOTIcon type="lock" size={64} />, title: 'DEV TERMINAL', desc: 'LOCAL CLI EMULATOR FOR SYSTEM DEBUGGING' },
                ].map(({ icon, title, desc }) => (
                    <HUDCard key={title} padding="none" className="hover:border-[#E81414] group cursor-pointer transition-all">
                        <button className="w-full text-left p-8 md:p-10">
                            <div className="mb-6 flex items-center justify-start">
                                {icon}
                            </div>
                            <h3 className="text-sm md:text-base tracking-[0.2em] font-black uppercase mb-3 text-white transition-colors leading-tight">{title}</h3>
                            <p className="text-[10px] tracking-[0.15em] font-black uppercase text-white/30 group-hover:text-white/50 transition-colors leading-loose">{desc}</p>
                        </button>
                    </HUDCard>
                ))}
            </div>

            {/* ══ DANGER ZONE ════════════════════════════════════════ */}
            <HUDCard variant="danger" className="border-[#E81414]/20 p-6 md:px-10 md:py-8">
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-[#E81414]" />
                        <span className="text-[10px] tracking-[0.6em] font-black uppercase text-[#E81414]">DANGER ZONE</span>
                    </div>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="space-y-2">
                            <h3 className="text-lg font-black uppercase tracking-tighter text-white">SESSION TERMINATION</h3>
                            <p className="text-[10px] tracking-[0.2em] font-black uppercase text-white/30">SIGN OUT FROM ALL ACTIVE SESSIONS AND CLEAR ROYAL CREDENTIALS</p>
                        </div>
                        <Button
                            onClick={handleLogout}
                            icon={LogOut}
                            variant={logoutConfirm ? 'secondary' : 'outline'}
                            className="w-full md:w-auto py-4 px-10"
                        >
                            {logoutConfirm ? 'CLICK AGAIN TO CONFIRM' : 'LOG OUT'}
                        </Button>
                    </div>
                    <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="space-y-2">
                            <h3 className="text-lg font-black uppercase tracking-tighter text-[#E81414]">DELETE IDENTITY</h3>
                            <p className="text-[10px] tracking-[0.2em] font-black uppercase text-white/30">PERMANENTLY REMOVE YOUR ACCOUNT THIS ACTION IS IRREVERSIBLE</p>
                        </div>
                        <Button
                            icon={Trash2}
                            variant="danger"
                            className="w-full md:w-auto"
                        >
                            DELETE ACCOUNT
                        </Button>
                    </div>
                </div>
            </HUDCard>
        </div>
    );
}
