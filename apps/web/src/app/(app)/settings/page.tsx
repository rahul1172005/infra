'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    LogOut, Bell, Shield, Eye, Globe, Moon, Zap,
    ChevronRight, Check, ToggleLeft, ArrowRight, Lock, Trash2, AlertTriangle
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const DotGrid = ({ className = '' }: { className?: string }) => (
    <div className={`absolute inset-0 dot-grid opacity-[0.05] pointer-events-none ${className}`} />
);

// Toggle Switch
function ToggleSwitch({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
    return (
        <button
            onClick={onToggle}
            className={`relative w-12 h-6 rounded-full transition-all duration-300 shrink-0 ${enabled ? 'bg-[#E81414]' : 'bg-white/10'}`}
        >
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${enabled ? 'left-7' : 'left-1'}`} />
        </button>
    );
}

// Settings Row
function SettingRow({ label, sub, children }: { label: string; sub?: string; children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between py-5 border-b border-white/5 last:border-0 gap-6">
            <div className="space-y-0.5 min-w-0">
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white">{label}</p>
                {sub && <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">{sub}</p>}
            </div>
            {children}
        </div>
    );
}

// Settings Section
function SettingsSection({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
    return (
        <div className="bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] overflow-hidden">
            <div className="flex items-center gap-4 px-8 md:px-10 py-6 border-b border-white/10">
                <div className="w-10 h-10 bg-black border border-white/10 rounded-[1rem] flex items-center justify-center shrink-0">
                    {icon}
                </div>
                <h3 className="text-sm md:text-base font-black uppercase tracking-[0.3em]">{title}</h3>
            </div>
            <div className="px-8 md:px-10 py-2">
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
            className="bg-black border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full outline-none focus:border-white/30 transition-colors cursor-pointer appearance-none pr-8"
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
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#E81414]/5 blur-[200px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/[0.02] blur-[150px] pointer-events-none" />

            {/* ══ HEADER ══════════════════════════════════════════════ */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end border-b border-white/10 pb-10 md:pb-16 gap-8 relative z-10">
                <div className="space-y-4">
                    <span className="text-[10px] tracking-[0.6em] text-[#E81414] font-black uppercase">ADMINISTRATION</span>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.8] text-white">
                        GLOBAL<br /><span className="text-[#E81414]">CONFIG</span>
                    </h1>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
                    {/* Hardware signature card */}
                    <div className="p-6 md:p-8 border border-white/10 bg-[#0A0A0A] rounded-[2rem] flex flex-col gap-3">
                        <span className="text-[9px] tracking-[0.6em] uppercase font-black text-white/30">HW SIGNATURE</span>
                        <span className="text-[12px] font-black tracking-wider text-white">HID DE292X BETA SYNC V9</span>
                    </div>

                    {/* Save button */}
                    <button
                        onClick={handleSave}
                        className={`flex items-center gap-3 px-8 py-4 text-[11px] font-black uppercase tracking-[0.4em] rounded-full transition-all ${saved ? 'bg-[#E81414] text-white' : 'bg-white text-black hover:bg-[#E81414] hover:text-white'}`}
                    >
                        {saved ? <Check className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                        {saved ? 'SAVED' : 'SAVE CONFIG'}
                    </button>
                </div>
            </div>

            {/* ══ SETTINGS SECTIONS ═══════════════════════════════════ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">

                {/* Notifications */}
                <SettingsSection icon={<Bell className="w-4 h-4 text-white/40" />} title="NOTIFICATIONS">
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
                </SettingsSection>

                {/* Privacy */}
                <SettingsSection icon={<Eye className="w-4 h-4 text-white/40" />} title="PRIVACY">
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
                </SettingsSection>

                {/* Preferences */}
                <SettingsSection icon={<Globe className="w-4 h-4 text-white/40" />} title="PREFERENCES">
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
                </SettingsSection>

                {/* Security */}
                <SettingsSection icon={<Shield className="w-4 h-4 text-white/40" />} title="SECURITY">
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
                </SettingsSection>
            </div>

            {/* ══ SUB-MODULES BAR ════════════════════════════════════ */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                {[
                    { icon: <Shield className="w-5 h-5" />, title: 'SECURITY POLICIES', desc: 'VIEW ENCRYPTION STANDARDS AND ACTIVE PROTOCOLS' },
                    { icon: <Zap className="w-5 h-5" />, title: 'CORE PROCESSING', desc: 'DIAGNOSTIC DATA FOR Z-OS KERNEL ALLOCATION' },
                    { icon: <Lock className="w-5 h-5" />, title: 'DEV TERMINAL', desc: 'LOCAL CLI EMULATOR FOR SYSTEM DEBUGGING' },
                ].map(({ icon, title, desc }) => (
                    <button key={title} className="p-8 bg-[#0A0A0A] border border-white/10 hover:bg-[#E81414] hover:border-[#E81414] transition-all group rounded-[2.5rem] cursor-pointer text-white hover:text-black text-left">
                        <div className="w-12 h-12 border border-white/10 group-hover:border-black/20 rounded-[1.5rem] flex items-center justify-center bg-black group-hover:bg-black/20 transition-all mb-6 text-white group-hover:text-black">
                            {icon}
                        </div>
                        <h3 className="text-[12px] tracking-[0.3em] font-black uppercase mb-3 transition-colors">{title}</h3>
                        <p className="text-[9px] tracking-[0.2em] font-black uppercase text-white/30 group-hover:text-black/60 transition-colors leading-relaxed">{desc}</p>
                    </button>
                ))}
            </div>

            {/* ══ DANGER ZONE ════════════════════════════════════════ */}
            <div className="border border-[#E81414]/20 rounded-[2.5rem] p-6 md:p-10 relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-[#E81414]" />
                    <span className="text-[10px] tracking-[0.6em] font-black uppercase text-[#E81414]">DANGER ZONE</span>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <h3 className="text-lg font-black uppercase tracking-tighter">SESSION TERMINATION</h3>
                        <p className="text-[10px] tracking-[0.2em] font-black uppercase text-white/30">SIGN OUT FROM ALL ACTIVE SESSIONS AND CLEAR SHOGUNATE CREDENTIALS</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className={`flex items-center gap-3 px-8 py-4 text-[11px] font-black uppercase tracking-[0.4em] rounded-full border transition-all shrink-0 ${logoutConfirm ? 'bg-[#E81414] border-[#E81414] text-white' : 'border-[#E81414]/40 text-[#E81414] hover:bg-[#E81414] hover:text-white'}`}
                    >
                        <LogOut className="w-4 h-4" />
                        {logoutConfirm ? 'CLICK AGAIN TO CONFIRM' : 'LOG OUT'}
                    </button>
                </div>
                <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <h3 className="text-lg font-black uppercase tracking-tighter text-[#E81414]">DELETE OPERATIVE</h3>
                        <p className="text-[10px] tracking-[0.2em] font-black uppercase text-white/30">PERMANENTLY REMOVE YOUR ACCOUNT THIS ACTION IS IRREVERSIBLE</p>
                    </div>
                    <button className="flex items-center gap-3 px-8 py-4 text-[11px] font-black uppercase tracking-[0.4em] rounded-full border border-[#E81414]/20 text-[#E81414]/40 hover:border-[#E81414] hover:text-[#E81414] transition-all shrink-0">
                        <Trash2 className="w-4 h-4" />
                        DELETE ACCOUNT
                    </button>
                </div>
            </div>
        </div>
    );
}
