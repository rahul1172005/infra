'use client';

import { useState } from 'react';
import {
    LogOut, Bell, Shield, Eye, Globe, Zap,
    ChevronRight, Check, Lock, Trash2, AlertTriangle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { DotGrid } from '@/components/ui/Decorative';
import { ToggleSwitch } from '@/components/ui/ToggleSwitch';
import { PageHeader } from '@/components/ui/PageHeader';
import { HUDFrame } from '@/components/ui/HUDFrame';
import { Suriken } from '@/components/ui/Suriken';

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
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-black border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full outline-none focus:border-[#E81414]/50 transition-colors cursor-pointer appearance-none pr-8"
            style={{ backgroundImage: 'none' }}
        >
            {options.map(o => <option key={o} value={o} className="bg-black">{o}</option>)}
        </select>
    );
}

export default function SettingsPage() {
    const router = useRouter();
    const [logoutConfirm, setLogoutConfirm] = useState(false);
    const [saved, setSaved] = useState(false);

    // Settings state
    const [notifications, setNotifications] = useState({
        emailAlerts: true,
        clanUpdates: true,
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

    const toggle = (group: any, setter: any, key: string) => {
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
        sessionStorage.removeItem('skipZapstersWelcome');
        router.push('/auth/login');
    };

    return (
        <div className="w-full pb-20 space-y-8 md:space-y-10 relative overflow-hidden">
            <DotGrid />

            {/* ══ HEADER ══════════════════════════════════════════════ */}
            <PageHeader
                title={<>GLOBAL<br /><span className="text-[#E81414]">CONFIG</span></>}
                stats={{
                    label: "HW SIGNATURE",
                    value: "DE292X BETA",
                    subValue: "SYNC V9"
                }}
                action={
                    <Button
                        onClick={handleSave}
                        variant={saved ? 'secondary' : 'primary'}
                        icon={saved ? Check : Zap}
                        className="py-4 px-8"
                    >
                        {saved ? 'SAVED' : 'SAVE CONFIG'}
                    </Button>
                }
            />

            {/* ══ SETTINGS SECTIONS ═══════════════════════════════════ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">

                {/* Notifications */}
                <HUDFrame title="NOTIFICATIONS" subtitle="ALERTS & UPDATES">
                    <SettingRow label="EMAIL ALERTS" sub="RECEIVE ALERTS VIA EMAIL">
                        <ToggleSwitch enabled={notifications.emailAlerts} onToggle={() => toggle(notifications, setNotifications, 'emailAlerts')} />
                    </SettingRow>
                    <SettingRow label="CLAN UPDATES" sub="SYNC REPORTS FROM YOUR CLAN">
                        <ToggleSwitch enabled={notifications.clanUpdates} onToggle={() => toggle(notifications, setNotifications, 'clanUpdates')} />
                    </SettingRow>
                    <SettingRow label="MATCH REMINDERS" sub="UPCOMING KATA TRIAL ALERTS">
                        <ToggleSwitch enabled={notifications.matchReminders} onToggle={() => toggle(notifications, setNotifications, 'matchReminders')} />
                    </SettingRow>
                    <SettingRow label="RANK CHANGES" sub="LEADERBOARD POSITION SHIFTS">
                        <ToggleSwitch enabled={notifications.rankChanges} onToggle={() => toggle(notifications, setNotifications, 'rankChanges')} />
                    </SettingRow>
                    <SettingRow label="SYSTEM ALERTS" sub="MAINTENANCE AND DOWNTIME">
                        <ToggleSwitch enabled={notifications.systemAlerts} onToggle={() => toggle(notifications, setNotifications, 'systemAlerts')} />
                    </SettingRow>
                </HUDFrame>

                {/* Privacy */}
                <HUDFrame title="PRIVACY" subtitle="VISIBILITY CONTROL">
                    <SettingRow label="PUBLIC PROFILE" sub="VISIBLE TO ALL OPERATIVES">
                        <ToggleSwitch enabled={privacy.publicProfile} onToggle={() => toggle(privacy, setPrivacy, 'publicProfile')} />
                    </SettingRow>
                    <SettingRow label="SHOW ACTIVITY" sub="DISPLAY YOUR ACTIVITY FEED">
                        <ToggleSwitch enabled={privacy.showActivity} onToggle={() => toggle(privacy, setPrivacy, 'showActivity')} />
                    </SettingRow>
                    <SettingRow label="SHOW RANK" sub="DISPLAY LEADERBOARD POSITION">
                        <ToggleSwitch enabled={privacy.showRank} onToggle={() => toggle(privacy, setPrivacy, 'showRank')} />
                    </SettingRow>
                    <SettingRow label="ALLOW CHALLENGES" sub="ACCEPT DIRECT KATA CHALLENGES">
                        <ToggleSwitch enabled={privacy.allowChallenges} onToggle={() => toggle(privacy, setPrivacy, 'allowChallenges')} />
                    </SettingRow>
                </HUDFrame>

                {/* Preferences */}
                <HUDFrame title="PREFERENCES" subtitle="INTERFACE OPTIMIZATION">
                    <SettingRow label="THEME" sub="INTERFACE COLOR SCHEME">
                        <SelectInput options={['DARK', 'DARKER', 'ABYSS']} value={preferences.theme} onChange={(v) => setPreferences(p => ({ ...p, theme: v }))} />
                    </SettingRow>
                    <SettingRow label="LANGUAGE" sub="DISPLAY LANGUAGE">
                        <SelectInput options={['ENGLISH', 'JAPANESE', 'KOREAN']} value={preferences.language} onChange={(v) => setPreferences(p => ({ ...p, language: v }))} />
                    </SettingRow>
                    <SettingRow label="TIMEZONE" sub="MATCH SCHEDULING ZONE">
                        <SelectInput options={['IST GMT+5:30', 'UTC+0', 'PST GMT-8', 'JST GMT+9']} value={preferences.timezone} onChange={(v) => setPreferences(p => ({ ...p, timezone: v }))} />
                    </SettingRow>
                    <SettingRow label="PERFORMANCE MODE" sub="DISABLE HEAVY ANIMATIONS">
                        <ToggleSwitch enabled={preferences.performanceMode} onToggle={() => toggle(preferences, setPreferences, 'performanceMode')} />
                    </SettingRow>
                    <SettingRow label="REDUCED MOTION" sub="MINIMIZE UI TRANSITIONS">
                        <ToggleSwitch enabled={preferences.reducedMotion} onToggle={() => toggle(preferences, setPreferences, 'reducedMotion')} />
                    </SettingRow>
                </HUDFrame>

                {/* Security */}
                <HUDFrame title="SECURITY" subtitle="CREDENTIAL VAULT">
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
                </HUDFrame>
            </div>

            {/* ══ SUB-MODULES BAR ════════════════════════════════════ */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                {[
                    { icon: <Shield className="w-5 h-5" />, title: 'SECURITY POLICIES', desc: 'VIEW ENCRYPTION STANDARDS AND ACTIVE PROTOCOLS' },
                    { icon: <Zap className="w-5 h-5" />, title: 'CORE PROCESSING', desc: 'DIAGNOSTIC DATA FOR Z-OS KERNEL ALLOCATION' },
                    { icon: <Lock className="w-5 h-5" />, title: 'DEV TERMINAL', desc: 'LOCAL CLI EMULATOR FOR SYSTEM DEBUGGING' },
                ].map(({ icon, title, desc }) => (
                    <button key={title} className="p-8 bg-[#0A0A0A] border border-white/10 hover:bg-[#E81414] hover:border-[#E81414] transition-all group rounded-[2.5rem] cursor-pointer text-white hover:text-black text-left">
                        <div className="w-12 h-12 border border-white/10 group-hover:border-black/20 rounded-full flex items-center justify-center bg-black group-hover:bg-black/20 transition-all mb-6 text-white group-hover:text-black">
                            {icon}
                        </div>
                        <h3 className="text-[12px] tracking-[0.3em] font-black uppercase mb-3 transition-colors">{title}</h3>
                        <p className="text-[9px] tracking-[0.2em] font-black uppercase text-white/30 group-hover:text-black/60 transition-colors leading-relaxed">{desc}</p>
                    </button>
                ))}
            </div>

            {/* ══ DANGER ZONE ════════════════════════════════════════ */}
            <HUDFrame title="DANGER ZONE" subtitle="TERMINAL OVERRIDE">
                <div className="space-y-8 py-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/5 pb-8">
                        <div className="space-y-2">
                            <h3 className="text-lg font-black uppercase tracking-tighter">SESSION TERMINATION</h3>
                            <p className="text-[10px] tracking-[0.2em] font-black uppercase text-white/30">SIGN OUT FROM ALL ACTIVE SESSIONS AND CLEAR SHOGUNATE CREDENTIALS</p>
                        </div>
                        <Button
                            onClick={handleLogout}
                            icon={LogOut}
                            variant={logoutConfirm ? 'secondary' : 'outline'}
                            fullWidth
                            className="md:w-auto py-4 px-10"
                        >
                            {logoutConfirm ? 'CLICK AGAIN TO CONFIRM' : 'LOG OUT'}
                        </Button>
                    </div>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="space-y-2">
                            <h3 className="text-lg font-black uppercase tracking-tighter text-[#E81414]">DELETE OPERATIVE</h3>
                            <p className="text-[10px] tracking-[0.2em] font-black uppercase text-white/30">PERMANENTLY REMOVE YOUR ACCOUNT THIS ACTION IS IRREVERSIBLE</p>
                        </div>
                        <Button
                            icon={Trash2}
                            variant="danger"
                            fullWidth
                            className="md:w-auto px-10 py-4"
                        >
                            DELETE ACCOUNT
                        </Button>
                    </div>
                </div>
            </HUDFrame>
        </div>
    );
}
