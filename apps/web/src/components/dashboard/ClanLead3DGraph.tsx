'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

// ─── Data ────────────────────────────────────────────────────────────────────
const TEAMS = [
    { name: 'ALPHA CLAN', pts: 4500, col: [1.0, 0.08, 0.08] as [number, number, number] },
    { name: 'SIGMA SHADOW', pts: 3800, col: [0.4, 0.7, 1.0] as [number, number, number] },
    { name: 'DELTA RONIN', pts: 3200, col: [0.4, 1.0, 0.6] as [number, number, number] },
    { name: 'OMEGA BLADE', pts: 2900, col: [1.0, 0.8, 0.2] as [number, number, number] },
    { name: 'ZETA SPIRIT', pts: 2100, col: [0.7, 0.4, 1.0] as [number, number, number] },
];
const MAXP = Math.max(...TEAMS.map(t => t.pts));
const MAX_H = 26;
const LAYOUT_X = [0, 7, -7, 14, -14];

// ─── HUD Component ────────────────────────────────────────────────────────────
function HUD({
    tipEls,
    vis,
}: {
    tipEls: React.ReactNode;
    vis: boolean;
}) {
    const [time, setTime] = useState('--:--:--');

    useEffect(() => {
        const tick = () => {
            const d = new Date();
            setTime(
                [d.getHours(), d.getMinutes(), d.getSeconds()]
                    .map(n => String(n).padStart(2, '0'))
                    .join(':')
            );
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <>
            {/* Tip labels overlay */}
            <div id="tip-labels" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 20 }}>
                {tipEls}
            </div>

            {/* HUD Grid */}
            <div
                id="hud"
                className="hud-layout"
                style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    zIndex: 10,
                    display: 'grid',
                    fontFamily: "'Share Tech Mono', monospace",
                }}
            >
                <style>{`
                    .hud-layout {
                        grid-template-columns: 160px 1fr 160px;
                        grid-template-rows: 50px 1fr 130px;
                    }
                    @media (max-width: 768px) {
                        .hud-layout {
                            grid-template-columns: 75px 1fr 75px;
                            grid-template-rows: 35px 1fr 85px;
                        }
                        #lp, #rp { padding: 6px 4px !important; gap: 4px !important; }
                        #lp > div, #rp > div { gap: 3px !important; }
                        .rank-text { font-size: 5px !important; }
                        .team-name { font-size: 7.5px !important; }
                        .pts-text { font-size: 6.5px !important; }
                        .score-val { font-size: 16px !important; }
                        .bb-item { gap: 1px !important; }
                        .bb-name { font-size: 6px !important; maxWidth: 45px !important; }
                        .bb-val { font-size: 5.5px !important; }
                        .top-bar { padding: 0 10px !important; height: 35px !important; }
                        .season-stats-label { font-size: 6px !important; }
                        .stats-row { font-size: 6.5px !important; }
                    }
                `}</style>
                {/* Clan Leaderboard Title only */}
                <div
                    className="top-bar"
                    style={{
                        gridColumn: '1/-1',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '0 18px',
                        background: 'transparent',
                    }}
                >
                    <span
                        style={{
                            fontFamily: "'Rajdhani', sans-serif",
                            fontSize: '12px',
                            fontWeight: 700,
                            letterSpacing: '.45em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,.22)',
                        }}
                    >
                        Clan Leaderboard
                    </span>
                </div>

                {/* Left Panel — always visible */}
                <div
                    id="lp"
                    style={{
                        padding: '12px 8px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        background: 'rgba(0,0,0,.25)',
                        borderRight: '1px solid rgba(255,255,255,.05)',
                        overflow: 'hidden',
                    }}
                >
                    <div style={{ fontSize: '6.5px', letterSpacing: '.2em', color: 'rgba(255,255,255,.18)', textTransform: 'uppercase' }}>
                        Participants
                    </div>
                    {TEAMS.map((t, i) => {
                        const isL = i === 0;
                        const pct = Math.round((t.pts / MAXP) * 100);
                        const rgb = t.col.map(v => (v * 255) | 0);
                        const clr = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
                        return (
                            <div
                                key={t.name}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '2px',
                                    padding: '5px 6px',
                                    border: isL ? '1px solid rgba(232,20,20,.32)' : '1px solid rgba(255,255,255,.06)',
                                    background: isL ? 'rgba(232,20,20,.045)' : 'rgba(255,255,255,.015)',
                                    position: 'relative',
                                    borderRadius: '6px',
                                }}
                            >
                                <span className="rank-text" style={{ fontSize: '6px', letterSpacing: '.12em', color: isL ? 'rgba(232,20,20,.55)' : 'rgba(255,255,255,.18)' }}>
                                    #{i + 1} RANK
                                </span>
                                <span
                                    className="team-name"
                                    style={{
                                        fontFamily: "'Rajdhani', sans-serif",
                                        fontSize: '10px',
                                        fontWeight: 700,
                                        letterSpacing: '.05em',
                                        color: isL ? '#ff3333' : 'rgba(255,255,255,.8)',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {t.name}
                                </span>
                                <span className="pts-text" style={{ fontSize: '8px', color: isL ? 'rgba(232,20,20,.72)' : 'rgba(255,255,255,.32)' }}>
                                    {t.pts.toLocaleString()}
                                </span>
                                <div
                                    style={{
                                        width: '100%',
                                        height: '2px',
                                        background: 'rgba(255,255,255,.06)',
                                        marginTop: '3px',
                                        borderRadius: '2px',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: `${pct}%`,
                                            height: '100%',
                                            background: clr,
                                            borderRadius: '2px',
                                            opacity: 0.75,
                                        }}
                                    />
                                </div>
                                <span
                                    style={{
                                        position: 'absolute',
                                        right: '5px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        fontSize: '6px',
                                        color: isL ? 'rgba(232,20,20,.4)' : 'rgba(255,255,255,.18)',
                                    }}
                                >
                                    ▲{pct}%
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Center (empty) */}
                <div />

                {/* Right Panel — always visible */}
                <div
                    id="rp"
                    style={{
                        padding: '12px 8px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '7px',
                        background: 'rgba(0,0,0,.25)',
                        borderLeft: '1px solid rgba(255,255,255,.05)',
                        overflow: 'hidden',
                    }}
                >
                    <div className="season-stats-label" style={{ fontSize: '7.5px', letterSpacing: '.2em', color: 'rgba(255,255,255,.18)', textTransform: 'uppercase' }}>
                        Season Stats
                    </div>
                    <div style={{ fontSize: '7.5px', letterSpacing: '.15em', color: 'rgba(255,255,255,.18)', textTransform: 'uppercase' }}>
                        Leader Score
                    </div>
                    <div className="score-val" style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '30px', fontWeight: 700, color: '#ff2828', lineHeight: 1 }}>
                        4,500
                    </div>
                    <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,.05)' }} />
                    {[
                        ['Total Clans', '5'],
                        ['Active Players', '2,841'],
                        ['Matches Played', '14,203'],
                        ['Season End', '14d 07h'],
                    ].map(([k, v]) => (
                        <div key={k} className="stats-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px' }}>
                            <span style={{ color: 'rgba(255,255,255,.2)' }}>{k}</span>
                            <span style={{ color: 'rgba(255,255,255,.5)' }}>{v}</span>
                        </div>
                    ))}
                    <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,.05)' }} />
                    {[
                        ['Mode', 'PALACE'],
                        ['FX', 'VOLUMETRIC'],
                    ].map(([k, v]) => (
                        <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px' }}>
                            <span style={{ color: 'rgba(255,255,255,.2)' }}>{k}</span>
                            <span style={{ color: 'rgba(255,255,255,.5)' }}>{v}</span>
                        </div>
                    ))}
                    <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,.05)' }} />
                    <div style={{ fontSize: '7.5px', letterSpacing: '.2em', color: 'rgba(255,255,255,.18)', textTransform: 'uppercase' }}>
                        Gap Analysis
                    </div>
                    {TEAMS.slice(1).map(t => (
                        <div key={t.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '7.5px' }}>
                            <span style={{ color: 'rgba(255,255,255,.2)', fontSize: '7.5px' }}>{t.name}</span>
                            <span style={{ color: 'rgba(255,90,90,.55)', fontSize: '7.5px' }}>-{(TEAMS[0].pts - t.pts).toLocaleString()}</span>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div
                    id="bb"
                    style={{
                        gridColumn: '1/-1',
                        borderTop: '1px solid rgba(255,255,255,.05)',
                        background: 'rgba(0,0,0,.62)',
                        backdropFilter: 'blur(12px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 20px',
                        opacity: vis ? 1 : 0,
                        transition: 'opacity .38s',
                    }}
                >
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                        {TEAMS.map((t, i) => {
                            const isL = i === 0;
                            const rgb = t.col.map(v => (v * 255) | 0);
                            const clr = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
                            return (
                                <div
                                    key={t.name}
                                    className="bb-item"
                                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}
                                >
                                    <div
                                        style={{
                                            width: '2px',
                                            height: '10px',
                                            marginBottom: '2px',
                                            borderRadius: '2px',
                                            background: clr,
                                            boxShadow: isL ? `0 0 7px ${clr}` : undefined,
                                        }}
                                    />
                                    <div
                                        className="bb-name"
                                        style={{
                                            fontFamily: "'Rajdhani', sans-serif",
                                            fontSize: '7px',
                                            fontWeight: 600,
                                            letterSpacing: '.05em',
                                            color: isL ? '#ff3333' : 'rgba(255,255,255,.38)',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            maxWidth: '60px',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {t.name}
                                    </div>
                                    <div className="bb-val" style={{ fontSize: '6.5px', color: isL ? 'rgba(232,20,20,.5)' : 'rgba(255,255,255,.18)' }}>
                                        {t.pts.toLocaleString()}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <span style={{ fontSize: '8px', letterSpacing: '.1em', color: 'rgba(255,255,255,.14)' }}>
                        PALACE PARTICLE · SEASON III
                    </span>
                </div>
            </div>

            {/* Scan line */}
            <div
                className="scan"
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.025),transparent)',
                    animation: 'scn 13s linear infinite',
                    pointerEvents: 'none',
                    zIndex: 300,
                }}
            />
        </>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ClanTerrainLeaderboard() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [tipElements, setTipElements] = useState<React.ReactNode[]>([]);
    const [vis, setVis] = useState<boolean>(true);
    const tipRefs = useRef<{ el: HTMLDivElement; cx: number; tipY: number }[]>([]);
    const tipContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;

        // ── Scene setup ──
        const scene = new THREE.Scene();
        const container = canvas.parentElement as HTMLElement;
        let cw2 = container ? container.clientWidth : window.innerWidth;
        let ch2 = container ? container.clientHeight : window.innerHeight;

        const isMobile = cw2 < 768;
        const cam = new THREE.PerspectiveCamera(isMobile ? 82 : 67, cw2 / ch2, 0.1, 2000);
        if (isMobile) {
            cam.position.set(0, 18, 95);
            cam.lookAt(0, 10, 0);
        } else {
            cam.position.set(0, 12, 70);
            cam.lookAt(0, 12, 0);
        }

        const rndr = new THREE.WebGLRenderer({ canvas, antialias: true });
        rndr.setSize(cw2, ch2, false);
        rndr.setPixelRatio(Math.min(devicePixelRatio, 2));
        rndr.setClearColor(0x000000, 1);

        // ── Particle arrays ──
        const PX: number[] = [], PY: number[] = [], PZ: number[] = [];
        const PR: number[] = [], PG: number[] = [], PB: number[] = [];
        const PVY: number[] = [], PPH: number[] = [], PTI: number[] = [];

        function addPt(x: number, y: number, z: number, r: number, g: number, b: number, ti: number) {
            PX.push(x); PY.push(y); PZ.push(z);
            PR.push(r); PG.push(g); PB.push(b);
            PVY.push(ti >= 0 ? 0.006 + Math.random() * 0.02 : 0.0008 + Math.random() * 0.003);
            PPH.push(Math.random() * Math.PI * 2);
            PTI.push(ti);
        }

        // ── Helpers ──
        function wall(cx: number, cz: number, w: number, d: number, h: number, yBase: number, c: number[], density: number, ti: number) {
            const n = Math.floor((w * h * 2 + d * h * 2) * density);
            for (let i = 0; i < n; i++) {
                const face = i % 4;
                let x: number, z: number;
                const y = yBase + Math.random() * h;
                const br = 0.3 + 0.65 * (y - yBase) / h;
                if (face === 0) { x = cx - w / 2; z = cz + (Math.random() - .5) * d; }
                else if (face === 1) { x = cx + w / 2; z = cz + (Math.random() - .5) * d; }
                else if (face === 2) { z = cz - d / 2; x = cx + (Math.random() - .5) * w; }
                else { z = cz + d / 2; x = cx + (Math.random() - .5) * w; }
                addPt(x!, y, z!, c[0] * br, c[1] * br, c[2] * br, ti);
            }
        }

        function ring(cx: number, cz: number, r1: number, r2: number, y: number, c: number[], density: number, ti: number) {
            const n = Math.floor(Math.PI * (r1 + r2) * density * 3);
            for (let i = 0; i < n; i++) {
                const a = Math.random() * Math.PI * 2;
                const rv = r1 + Math.random() * (r2 - r1);
                const br = 0.6 + Math.random() * 0.35;
                addPt(cx + Math.cos(a) * rv, y + (Math.random() - .5) * .08, cz + Math.sin(a) * rv * 0.65, c[0] * br, c[1] * br, c[2] * br, ti);
            }
        }

        function cylinder(cx: number, cz: number, rx: number, rz: number, h: number, yBase: number, c: number[], density: number, ti: number) {
            const n = Math.floor(2 * Math.PI * Math.max(rx, rz) * h * density);
            for (let i = 0; i < n; i++) {
                const a = Math.random() * Math.PI * 2;
                const y = yBase + Math.random() * h;
                const br = 0.3 + 0.65 * (y - yBase) / h;
                addPt(cx + Math.cos(a) * rx, y, cz + Math.sin(a) * rz, c[0] * br, c[1] * br, c[2] * br, ti);
            }
        }

        function spire(cx: number, cz: number, baseR: number, h: number, yBase: number, c: number[], density: number, ti: number) {
            const n = Math.floor(h * baseR * density * 90);
            for (let i = 0; i < n; i++) {
                const t = Math.random();
                const y = yBase + t * h;
                const r = baseR * (1 - Math.pow(t, 0.6));
                const a = Math.random() * Math.PI * 2;
                const br = 0.4 + t * 0.58;
                addPt(cx + Math.cos(a) * r, y, cz + Math.sin(a) * r * 0.6, c[0] * br, c[1] * br, c[2] * br, ti);
            }
        }

        function driftCloud(cx: number, cz: number, spread: number, h: number, yBase: number, c: number[], n: number, ti: number) {
            for (let i = 0; i < n; i++) {
                const t = Math.pow(Math.random(), 0.4);
                const y = yBase + t * h;
                const sp = spread * (1 - t * 0.7);
                const a = Math.random() * Math.PI * 2;
                const rv = Math.random() * sp;
                const br = (1 - t * 0.65) * 0.55;
                addPt(cx + Math.cos(a) * rv, y, cz + Math.sin(a) * rv * 0.5, c[0] * br, c[1] * br, c[2] * br, ti);
            }
        }

        // ── Build Palace ──
        const tipPositions: { cx: number; tipY: number; team: typeof TEAMS[0]; ti: number }[] = [];

        TEAMS.forEach((team, ti) => {
            const c = team.col;
            const sr = team.pts / MAXP;
            const TH = sr * MAX_H;
            const cx = LAYOUT_X[ti];
            const cz = 0;
            const bw = 1.5 + sr * 0.4;

            for (let s = 1; s <= 3; s++) {
                wall(cx, cz, bw + s * 0.9, bw + s * 0.7, 0.22, -s * 0.22, [c[0] * 0.4, c[1] * 0.4, c[2] * 0.4], 0.5, ti);
            }
            ring(cx, cz, 0, bw * 0.75, 0, c, 4, ti);

            const bodyH = TH * 0.52;
            wall(cx, cz, bw, bw, bodyH, 0, c, 2.5, ti);

            for (let wh = 2; wh < bodyH - 1; wh += 2.6) {
                ring(cx, cz, bw * 0.48, bw * 0.52, wh, c, 5, ti);
                for (let wi = 0; wi < 4; wi++) {
                    const a0 = wi * Math.PI * 0.5;
                    for (let k = 0; k < 20; k++) {
                        const t2 = Math.random();
                        const ax = Math.cos(a0) * (bw * 0.5 + 0.04);
                        const az = Math.sin(a0) * (bw * 0.5 + 0.04);
                        const wy = wh + Math.sin(t2 * Math.PI) * 0.8;
                        const off = (Math.random() - .5) * 0.6;
                        const br = 0.45 + Math.random() * 0.45;
                        addPt(cx + ax + (wi % 2 === 0 ? off : 0), wy, cz + az + (wi % 2 === 1 ? off : 0), c[0] * br, c[1] * br, c[2] * br, ti);
                    }
                }
            }
            ring(cx, cz, 0, bw * 0.75, bodyH, c, 4, ti);

            const TO = bw * 0.62;
            ([[-TO, -TO], [TO, -TO], [-TO, TO], [TO, TO]] as [number, number][]).forEach(([ox, oz]) => {
                const tH2 = TH * 0.3;
                cylinder(cx + ox, cz + oz, 0.4, 0.32, tH2 * 0.8, 0, c, 2, ti);
                ring(cx + ox, cz + oz, 0, 0.42, tH2 * 0.8, c, 5, ti);
                spire(cx + ox, cz + oz, 0.38, tH2 * 0.2, tH2 * 0.8, c, 3, ti);
            });

            const midBase = bodyH;
            const midH = TH * 0.08;
            for (let i = 0; i < 8; i++) {
                const a0 = (i / 8) * Math.PI * 2, a1 = ((i + 1) / 8) * Math.PI * 2;
                for (let j = 0; j < 50; j++) {
                    const a = a0 + (a1 - a0) * Math.random();
                    const fr = Math.random();
                    addPt(cx + Math.cos(a) * bw * 0.5, midBase + fr * midH, cz + Math.sin(a) * bw * 0.5,
                        c[0] * (0.5 + fr * 0.45), c[1] * (0.5 + fr * 0.45), c[2] * (0.5 + fr * 0.45), ti);
                }
            }

            const upBase = midBase + midH;
            const uw = bw * 0.65;
            const upH = TH * 0.18;
            wall(cx, cz, uw, uw, upH, upBase, c, 3, ti);
            ring(cx, cz, 0, uw * 0.72, upBase, c, 5, ti);
            ring(cx, cz, 0, uw * 0.72, upBase + upH, c, 5, ti);

            const domeBase = upBase + upH;
            const dR = uw * 0.6;
            const domeN = Math.floor(dR * dR * Math.PI * 18);
            for (let i = 0; i < domeN; i++) {
                const phi = Math.random() * Math.PI * 0.5;
                const theta = Math.random() * Math.PI * 2;
                addPt(
                    cx + dR * Math.sin(phi) * Math.cos(theta),
                    domeBase + dR * Math.cos(phi) * 0.6,
                    cz + dR * Math.sin(phi) * Math.sin(theta) * 0.65,
                    c[0] * (0.4 + Math.cos(phi) * 0.55), c[1] * (0.4 + Math.cos(phi) * 0.55), c[2] * (0.4 + Math.cos(phi) * 0.55),
                    ti
                );
            }

            const spireBase = domeBase + dR * 0.52;
            const spireH = TH * 0.22;
            spire(cx, cz, uw * 0.38, spireH, spireBase, c, 3.5, ti);

            const tipY = spireBase + spireH;
            driftCloud(cx, cz, 0.5, TH * 0.5, tipY, c, 500, ti);

            if (ti < TEAMS.length - 1) {
                const nx2 = LAYOUT_X[ti + 1];
                const wLen = Math.abs(nx2 - cx) - bw * 1.1;
                const wCx = (cx + nx2) / 2;
                const nsr = TEAMS[ti + 1].pts / MAXP;
                const wH = Math.min(sr, nsr) * MAX_H * 0.18;
                wall(wCx, cz, wLen, 0.65, wH, 0, [c[0] * 0.55, c[1] * 0.55, c[2] * 0.55], 0.7, ti);
                const nc = Math.max(2, Math.floor(wLen / 1.1));
                for (let cr = 0; cr < nc; cr++) {
                    const crx = wCx - wLen / 2 + (cr + 0.5) * (wLen / nc);
                    wall(crx, cz, 0.3, 0.5, 0.45, wH, [c[0] * 0.6, c[1] * 0.6, c[2] * 0.6], 1.5, ti);
                }
            }

            tipPositions.push({ cx, tipY: tipY + TH * 0.35, team, ti });
        });

        // Atmospheric haze
        for (let i = 0; i < 2000; i++) {
            const x = (Math.random() - .5) * 70, y = 1 + Math.random() * MAX_H * 0.5, z = (Math.random() - .5) * 22;
            const b = 0.012 + Math.random() * 0.018;
            addPt(x, y, z, b * 0.7, b, b * 0.8, -1);
        }

        // ── Forest helpers ──
        function hash(n: number) { return Math.abs(Math.sin(n) * 43758.5453) % 1; }
        function noiseXZ(x: number, z: number) {
            const ix = Math.floor(x), iz = Math.floor(z);
            const fx = x - ix, fz = z - iz;
            const ux = fx * fx * (3 - 2 * fx), uz = fz * fz * (3 - 2 * fz);
            return (
                hash(ix + iz * 57) * (1 - ux) * (1 - uz) +
                hash(ix + 1 + iz * 57) * ux * (1 - uz) +
                hash(ix + (iz + 1) * 57) * (1 - ux) * uz +
                hash(ix + 1 + (iz + 1) * 57) * ux * uz
            );
        }
        function fbmGround(x: number, z: number) {
            return noiseXZ(x * 0.4, z * 0.4) * 0.5
                + noiseXZ(x * 0.9, z * 0.9) * 0.3
                + noiseXZ(x * 2.1, z * 2.1) * 0.15
                + noiseXZ(x * 5.0, z * 5.0) * 0.05;
        }
        function groundY(x: number, z: number) { return (fbmGround(x, z) - 0.5) * 1.4; }
        function inPalaceFoot(x: number, z: number, pad: number) {
            return LAYOUT_X.some(lx => Math.abs(x - lx) < pad && Math.abs(z) < pad);
        }
        function onPath(x: number, z: number) { return Math.abs(z) < 1.1 && Math.abs(x) < 22; }

        function addPine(tx: number, tz: number, h: number) {
            const gy = groundY(tx, tz);
            const trunkH = h * 0.35;
            for (let i = 0; i < Math.floor(h * 12); i++) {
                const t = i / (h * 12);
                const y = gy + t * trunkH;
                const rad = 0.06 * (1 - t * 0.3);
                const a = Math.random() * Math.PI * 2;
                const rv = Math.random() * rad;
                const br = 0.07 + t * 0.05;
                addPt(tx + Math.cos(a) * rv, y, tz + Math.sin(a) * rv, br * 0.7, br * 0.45, br * 0.2, -1);
            }
            for (let L = 0; L < 4; L++) {
                const lf = L / 3;
                const cb = gy + trunkH + L * (h * 0.17);
                const ch = h * (0.28 - lf * 0.06);
                const cr = h * (0.18 + lf * 0.04) * (0.5 + Math.random() * 0.2);
                const cn = Math.floor(cr * ch * 80);
                for (let i = 0; i < cn; i++) {
                    const t = Math.pow(Math.random(), 0.65);
                    const cy = cb + t * ch;
                    const r = cr * (1 - Math.pow(t, 0.8));
                    const a = Math.random() * Math.PI * 2;
                    const jit = Math.random() * r * 0.35;
                    const br = 0.28 + t * 0.5 + Math.random() * 0.12;
                    addPt(tx + Math.cos(a) * (r + jit), cy, tz + Math.sin(a) * (r + jit) * 0.9, br * 0.08, br * 0.55, br * 0.12, -1);
                }
            }
            addPt(tx, gy + h, tz, 0.1, 0.9, 0.25, -1);
        }

        function addOak(tx: number, tz: number, h: number) {
            const gy = groundY(tx, tz);
            const trunkH = h * 0.45;
            for (let i = 0; i < Math.floor(h * 14); i++) {
                const t = i / (h * 14);
                const y = gy + t * trunkH;
                const rad = 0.1 * (1 - t * 0.5);
                const a = Math.random() * Math.PI * 2;
                const br = 0.08 + t * 0.04;
                addPt(tx + Math.cos(a) * Math.random() * rad, y, tz + Math.sin(a) * Math.random() * rad, br * 0.6, br * 0.4, br * 0.18, -1);
            }
            const cr = h * 0.38;
            const candleY = gy + trunkH + cr * 0.5;
            const cn = Math.floor(cr * cr * cr * 55);
            for (let i = 0; i < cn; i++) {
                const u = Math.random() * 2 - 1, v = Math.random() * 2 - 1, w = Math.random() * 2 - 1;
                const len = Math.sqrt(u * u + v * v + w * w);
                if (len > 1) continue;
                const shade = Math.random();
                const br = 0.2 + len * 0.55 + Math.random() * 0.15;
                let rv: number, gv: number, bv: number;
                if (shade < 0.5) { rv = br * 0.1; gv = br * 0.6; bv = br * 0.12; }
                else if (shade < 0.8) { rv = br * 0.2; gv = br * 0.65; bv = br * 0.08; }
                else { rv = br * 0.3; gv = br * 0.7; bv = br * 0.05; }
                addPt(tx + u * cr, candleY + v * cr * 0.75, tz + w * cr * 0.9, rv, gv, bv, -1);
            }
        }

        function addBirch(tx: number, tz: number, h: number) {
            const gy = groundY(tx, tz);
            const trunkH = h * 0.6;
            for (let i = 0; i < Math.floor(h * 18); i++) {
                const t = i / (h * 18);
                const y = gy + t * trunkH;
                const rad = 0.045 * (1 - t * 0.2);
                const a = Math.random() * Math.PI * 2;
                const isDark = Math.random() < 0.25;
                const br = isDark ? 0.15 : 0.45 + Math.random() * 0.3;
                addPt(tx + Math.cos(a) * Math.random() * rad, y, tz + Math.sin(a) * Math.random() * rad, br * 0.9, br * 0.92, br * 0.85, -1);
            }
            const cr = h * 0.22;
            const baseC2 = gy + trunkH * 0.8;
            const cn = Math.floor(cr * cr * 60);
            for (let i = 0; i < cn; i++) {
                const a = Math.random() * Math.PI * 2, rv2 = Math.random() * cr;
                const cy = baseC2 + Math.random() * h * 0.35;
                const br = 0.25 + Math.random() * 0.45;
                addPt(tx + Math.cos(a) * rv2, cy, tz + Math.sin(a) * rv2 * 0.85, br * 0.45, br * 0.72, br * 0.18, -1);
            }
        }

        function addBush(tx: number, tz: number) {
            const gy = groundY(tx, tz);
            const h = 0.4 + Math.random() * 0.6;
            const cr = 0.3 + Math.random() * 0.35;
            const cn = Math.floor(cr * cr * cr * 120);
            for (let i = 0; i < cn; i++) {
                const u = Math.random() * 2 - 1, v = Math.random(), w = Math.random() * 2 - 1;
                const len = Math.sqrt(u * u + v * v * 0.5 + w * w);
                if (len > 1) continue;
                const br = 0.18 + Math.random() * 0.3;
                addPt(tx + u * cr, gy + v * h, tz + w * cr, br * 0.1, br * 0.55, br * 0.1, -1);
            }
        }

        function addDeadTree(tx: number, tz: number, h: number) {
            const gy = groundY(tx, tz);
            for (let i = 0; i < Math.floor(h * 10); i++) {
                const t = i / (h * 10);
                const y = gy + t * h * 0.7;
                const br = 0.06 + Math.random() * 0.04;
                addPt(tx + (Math.random() - .5) * 0.06, y, tz + (Math.random() - .5) * 0.06, br * 0.6, br * 0.55, br * 0.45, -1);
            }
            const nBranch = 3 + Math.floor(Math.random() * 3);
            for (let b = 0; b < nBranch; b++) {
                const ba = Math.random() * Math.PI * 2;
                const by = gy + h * (0.4 + Math.random() * 0.3);
                const blen = h * (0.2 + Math.random() * 0.25);
                for (let k = 0; k < Math.floor(blen * 12); k++) {
                    const bt = k / (blen * 12);
                    const bry = by + bt * blen * 0.4;
                    const brx = tx + Math.cos(ba) * bt * blen;
                    const brz = tz + Math.sin(ba) * bt * blen;
                    const br = 0.05 + Math.random() * 0.04;
                    addPt(brx + (Math.random() - .5) * 0.04, bry, brz + (Math.random() - .5) * 0.04, br * 0.55, br * 0.5, br * 0.4, -1);
                }
            }
        }

        // Stone paths
        for (let pz = 5; pz < 22; pz += 0.28) {
            const spread = 1.0 + Math.abs(pz - 5) * 0.04;
            for (let k = 0; k < 8; k++) {
                const px = (Math.random() - .5) * spread * 2;
                const gy = groundY(px, pz) + 0.02;
                const br = 0.09 + Math.random() * 0.07;
                addPt(px, gy, pz, br * 0.65, br * 0.62, br * 0.6, -1);
            }
        }
        for (let pz = -5; pz > -22; pz -= 0.28) {
            for (let k = 0; k < 7; k++) {
                const px = (Math.random() - .5) * 1.8;
                const gy = groundY(px, pz) + 0.02;
                const br = 0.07 + Math.random() * 0.06;
                addPt(px, gy, pz, br * 0.6, br * 0.58, br * 0.56, -1);
            }
        }

        // Ground surface
        for (let xi = -40; xi <= 40; xi += 0.75) {
            for (let zi = -22; zi <= 22; zi += 0.75) {
                const jx = (Math.random() - .5) * 0.45, jz = (Math.random() - .5) * 0.45;
                const x = xi + jx, z = zi + jz;
                if (inPalaceFoot(x, z, 2.4)) continue;
                if (onPath(x, z)) continue;
                const gy = groundY(x, z);
                const g = Math.random();
                let gr: number, gg: number, gb: number;
                const br = 0.03 + Math.random() * 0.05;
                if (g < 0.4) { gr = br * 0.5; gg = br * 0.85; gb = br * 0.35; }
                else if (g < 0.7) { gr = br * 0.65; gg = br * 0.5; gb = br * 0.25; }
                else { gr = br * 0.55; gg = br * 0.6; gb = br * 0.4; }
                addPt(x, gy, z, gr, gg, gb, -1);
            }
        }

        // Ground fog
        for (let i = 0; i < 5000; i++) {
            const x = (Math.random() - .5) * 78, z = (Math.random() - .5) * 30;
            const gy = groundY(x, z);
            const fogH = Math.random() * 1.2;
            const dist = Math.sqrt(x * x + z * z);
            const density = Math.max(0, 1 - dist / 40) * 0.08 + 0.02;
            const br = density * 0.6;
            const greenTint = density * 0.4;
            addPt(x, gy + fogH, z, br * 0.6, br + greenTint, br * 0.7, -1);
        }

        // Trees
        const treePts: [number, number, number][] = [];
        const SPECIES = [
            { fn: 'pine', w: 0.40, minH: 2.2, maxH: 5.0, minGap: 1.4 },
            { fn: 'oak', w: 0.28, minH: 2.0, maxH: 4.0, minGap: 2.0 },
            { fn: 'birch', w: 0.18, minH: 1.8, maxH: 3.5, minGap: 1.0 },
            { fn: 'bush', w: 0.10, minH: 0, maxH: 0, minGap: 0.5 },
            { fn: 'dead', w: 0.04, minH: 1.5, maxH: 3.0, minGap: 1.0 },
        ];

        for (let attempt = 0; attempt < 1400; attempt++) {
            let tx: number, tz: number;
            const zone = Math.random();
            if (zone < 0.3) { tx = (Math.random() > .5 ? 1 : -1) * (18 + Math.random() * 18); tz = (Math.random() - .5) * 28; }
            else if (zone < 0.55) { tx = (Math.random() - .5) * 52; tz = (Math.random() > .5 ? 1 : -1) * (9 + Math.random() * 16); }
            else if (zone < 0.75) { tx = (Math.random() - .5) * 32; tz = 3 + Math.random() * 10 * (Math.random() > .5 ? 1 : -1); }
            else { tx = (Math.random() - .5) * 60; tz = (Math.random() - .5) * 28; }

            if (inPalaceFoot(tx, tz, 4.2)) continue;
            if (onPath(tx, tz)) continue;

            let sp = SPECIES[0];
            const rw = Math.random();
            let acc = 0;
            for (const s of SPECIES) { acc += s.w; if (rw < acc) { sp = s; break; } }

            if (treePts.some(([ex, ez, eg]) => Math.hypot(tx - ex, tz - ez) < eg)) continue;
            treePts.push([tx, tz, sp.minGap]);

            const h = sp.minH + (sp.maxH - sp.minH) * Math.random();
            if (sp.fn === 'pine') addPine(tx, tz, h);
            else if (sp.fn === 'oak') addOak(tx, tz, h);
            else if (sp.fn === 'birch') addBirch(tx, tz, h);
            else if (sp.fn === 'bush') addBush(tx, tz);
            else addDeadTree(tx, tz, h);
        }

        // Fireflies
        const FIREFLY_COLORS: [number, number, number][] = [[0.2, 0.9, 0.3], [0.5, 1.0, 0.3], [0.1, 0.8, 0.5], [0.7, 1.0, 0.2]];
        for (let i = 0; i < 280; i++) {
            const tx = (Math.random() - .5) * 68, tz = (Math.random() - .5) * 28;
            if (inPalaceFoot(tx, tz, 3.5)) continue;
            const gy = groundY(tx, tz);
            const fy = gy + 0.3 + Math.random() * 2.5;
            const fc = FIREFLY_COLORS[Math.floor(Math.random() * FIREFLY_COLORS.length)];
            const br = 0.55 + Math.random() * 0.4;
            for (let k = 0; k < 3; k++) {
                addPt(tx + (Math.random() - .5) * 0.08, fy + (Math.random() - .5) * 0.06, tz + (Math.random() - .5) * 0.08,
                    fc[0] * br, fc[1] * br, fc[2] * br, -1);
            }
        }

        // God rays
        for (let i = 0; i < 18; i++) {
            const sx = (Math.random() - .5) * 55, sz = (Math.random() - .5) * 24;
            if (inPalaceFoot(sx, sz, 4)) continue;
            const shaftH = 4 + Math.random() * 6;
            for (let k = 0; k < 60; k++) {
                const t = Math.random();
                const sy = groundY(sx, sz) + t * shaftH;
                const spread = 0.15 * (1 - t);
                const a = Math.random() * Math.PI * 2;
                const br = (1 - t) * 0.06 + 0.01;
                addPt(sx + Math.cos(a) * spread * Math.random(), sy, sz + Math.sin(a) * spread * Math.random(), br * 0.8, br * 1.0, br * 0.65, -1);
            }
        }

        // ── Build GPU Buffers ──
        const N = PX.length;
        const posArr = new Float32Array(N * 3);
        const colArr = new Float32Array(N * 3);
        const sizeArr = new Float32Array(N);
        const baseYArr = new Float32Array(N);
        const phaseArr = new Float32Array(N);
        const vyArr = new Float32Array(N);
        const driftArr = new Float32Array(N);
        const rangeArr = new Float32Array(N);

        for (let i = 0; i < N; i++) {
            posArr[i * 3] = PX[i];
            posArr[i * 3 + 1] = PY[i];
            posArr[i * 3 + 2] = PZ[i];
            colArr[i * 3] = PR[i];
            colArr[i * 3 + 1] = PG[i];
            colArr[i * 3 + 2] = PB[i];
            sizeArr[i] = 0.65 + (PY[i] / MAX_H) * 0.95;
            baseYArr[i] = PY[i];
            phaseArr[i] = PPH[i];
            vyArr[i] = PVY[i];
            const ti = PTI[i];
            rangeArr[i] = (ti >= 0) ? (TEAMS[ti].pts / MAXP) * MAX_H * 0.42 : 0.4 + Math.random() * 0.6;
            driftArr[i] = Math.random() * rangeArr[i];
        }

        const baseColArr = colArr.slice();

        // ── Geometry + Shader ──
        const geo = new THREE.BufferGeometry();
        const posAttr = new THREE.BufferAttribute(posArr, 3);
        const colAttr = new THREE.BufferAttribute(colArr, 3);
        geo.setAttribute('position', posAttr);
        geo.setAttribute('aCol', colAttr);
        geo.setAttribute('aSize', new THREE.BufferAttribute(sizeArr, 1));

        const VS = `
attribute float aSize;
attribute vec3 aCol;
varying vec3 vCol;
varying float vAlpha;
void main(){
  vCol = aCol;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  float dist = length(mv.xyz);
  gl_PointSize = clamp(aSize * (400.0 / dist), 1.0, 20.0);
  vAlpha = clamp(length(aCol) * 1.5, 0.04, 1.0);
}`;

        const FS = `
varying vec3 vCol;
varying float vAlpha;
void main(){
  vec2 uv = gl_PointCoord * 2.0 - 1.0;
  float d = dot(uv, uv);
  if(d > 1.0) discard;
  float core = exp(-d * 6.0) * 1.7;
  float halo = exp(-d * 1.5) * 0.5;
  float glow = core + halo;
  gl_FragColor = vec4(vCol * glow, vAlpha * glow);
}`;

        const mat = new THREE.ShaderMaterial({
            vertexShader: VS,
            fragmentShader: FS,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });

        scene.add(new THREE.Points(geo, mat));

        // ── Tip labels (positioned via CSS, updated in loop) ──
        // Stagger vertical offset per index so labels never overlap
        const STAGGER = [0, 8, 16, 24, 32]; // small px stagger so adjacent labels don't collide
        const labData: { cx: number; tipY: number; team: typeof TEAMS[0]; stagger: number }[] = tipPositions.map(({ cx, tipY, team, ti }) => ({
            cx, tipY, team, stagger: STAGGER[ti % STAGGER.length],
        }));

        // Build React tip elements
        const newTipEls = labData.map(({ cx: _cx, tipY: _tipY, team, stagger }, idx) => {
            const rgb = team.col.map((v: number) => (v * 255) | 0);
            const clr = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
            return (
                <div
                    key={idx}
                    ref={(el) => {
                        if (el) {
                            tipRefs.current[idx] = { el, cx: _cx, tipY: _tipY };
                        }
                    }}
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, calc(-100% - ${stagger}px))`,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '2px',
                        whiteSpace: 'nowrap',
                    }}
                >
                    <div
                        style={{
                            fontFamily: "'Rajdhani', sans-serif",
                            fontSize: '9px',
                            fontWeight: 700,
                            letterSpacing: '.12em',
                            textTransform: 'uppercase',
                            color: clr,
                            textShadow: `0 0 8px ${clr}`,
                            padding: '2px 6px',
                            borderRadius: '3px',
                            border: `1px solid ${clr}44`,
                            background: 'rgba(0,0,0,.65)',
                        }}
                    >
                        {team.name}
                    </div>
                    <div
                        style={{
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: '7px',
                            color: 'rgba(255,255,255,.35)',
                            letterSpacing: '.06em',
                        }}
                    >
                        {team.pts.toLocaleString()} PTS
                    </div>
                    {/* connector line from label down to spire */}
                    {stagger > 0 && (
                        <div style={{ width: '1px', height: `${stagger + 4}px`, background: `linear-gradient(to bottom, ${clr}66, transparent)`, marginTop: '-2px' }} />
                    )}
                    {stagger === 0 && (
                        <div style={{ width: '1px', height: '4px', background: clr, opacity: 0.4 }} />
                    )}
                </div>
            );
        });
        setTipElements(newTipEls);

        // ── Animation loop ──
        let T = 0;
        const pa = posAttr.array as Float32Array;
        const ca = colAttr.array as Float32Array;
        const _v = new THREE.Vector3();
        let animId: number;

        let cw = window.innerWidth;
        let ch = window.innerHeight;

        function loop() {
            animId = requestAnimationFrame(loop);
            T += 0.009;

            for (let i = 0; i < N; i++) {
                driftArr[i] += vyArr[i];
                if (driftArr[i] > rangeArr[i]) driftArr[i] = 0;
                const d = driftArr[i];
                pa[i * 3] = PX[i] + Math.sin(T * 0.7 + phaseArr[i] * 3.1) * 0.01 * d;
                pa[i * 3 + 1] = baseYArr[i] + d;
                pa[i * 3 + 2] = PZ[i] + Math.cos(T * 0.5 + phaseArr[i] * 2.4) * 0.007 * d;
            }
            posAttr.needsUpdate = true;

            const pulse = 0.76 + 0.24 * Math.sin(T * 1.1);
            const flick = 0.97 + 0.03 * Math.sin(T * 14.0);
            for (let i = 0; i < N; i++) {
                const mx = Math.max(baseColArr[i * 3], baseColArr[i * 3 + 1], baseColArr[i * 3 + 2]);
                if (mx < 0.001) continue;
                const hb = 1.0 + (baseYArr[i] / MAX_H) * 0.55;
                const tw = 0.9 + 0.1 * Math.sin(T * 4.5 + phaseArr[i] * 8.0);
                const sc = Math.min((0.2 + baseYArr[i] / MAX_H) * pulse * flick * hb * tw / mx, 1.6);
                ca[i * 3] = baseColArr[i * 3] * sc;
                ca[i * 3 + 1] = baseColArr[i * 3 + 1] * sc;
                ca[i * 3 + 2] = baseColArr[i * 3 + 2] * sc;
            }
            colAttr.needsUpdate = true;

            // Update tip label positions
            tipRefs.current.forEach(({ el, cx, tipY }) => {
                _v.set(cx, tipY, 0);
                _v.project(cam);
                el.style.left = ((_v.x * 0.5 + 0.5) * cw) + 'px';
                el.style.top = ((-_v.y * 0.5 + 0.5) * ch) + 'px';
            });

            rndr.render(scene, cam);
        }
        loop();

        // ── Resize handler ──
        const onResize = () => {
            if (canvasRef.current && canvasRef.current.parentElement) {
                cw = canvasRef.current.parentElement.clientWidth;
                ch = canvasRef.current.parentElement.clientHeight;
                cw2 = cw;
                ch2 = ch;
            } else {
                cw = window.innerWidth;
                ch = window.innerHeight;
                cw2 = cw;
                ch2 = ch;
            }
            cam.aspect = cw / ch;
            const isM = cw < 768;
            cam.fov = isM ? 82 : 67;
            if (isM) {
                cam.position.set(0, 18, 95);
                cam.lookAt(0, 10, 0);
            } else {
                cam.position.set(0, 12, 70);
                cam.lookAt(0, 12, 0);
            }
            cam.updateProjectionMatrix();
            rndr.setSize(cw, ch, false);
        };
        onResize(); // initial size
        window.addEventListener('resize', onResize);

        let resizeObserver: ResizeObserver | null = null;
        if (canvasRef.current && canvasRef.current.parentElement) {
            resizeObserver = new ResizeObserver(onResize);
            resizeObserver.observe(canvasRef.current.parentElement);
        }

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', onResize);
            if (resizeObserver) resizeObserver.disconnect();
            rndr.dispose();
            geo.dispose();
            mat.dispose();
        };
    }, []);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {/* Google Fonts */}
            <link
                href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@300;400;600;700&display=swap"
                rel="stylesheet"
            />

            <style>{`
        @keyframes pdot {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(232,20,20,.6); }
          60% { box-shadow: 0 0 0 5px rgba(232,20,20,0); }
        }
        @keyframes scn {
          0% { top: 0; }
          100% { top: 100%; }
        }
        /* ── Responsive HUD side panels ── */
        @media (max-width: 520px) {
          #hud { grid-template-columns: 80px 1fr 80px !important; grid-template-rows: 40px 1fr 110px !important; }
          #lp, #rp { padding: 6px 4px !important; gap: 4px !important; }
          #bb { padding: 0 6px !important; }
          .score-val { font-size: 22px !important; }
          .team-name { font-size: 8px !important; }
          .pts-text { font-size: 7px !important; }
          .season-stats-label { font-size: 6px !important; }
          .stats-row { font-size: 7px !important; }
        }
        @media (max-width: 380px) {
          #hud { grid-template-columns: 65px 1fr 65px !important; }
          #lp, #rp { padding: 4px 2px !important; gap: 3px !important; }
          .score-val { font-size: 16px !important; }
          .team-name { font-size: 7px !important; }
          .pts-text { font-size: 6px !important; }
        }
      `}</style>

            {/* Canvas */}
            <canvas
                ref={canvasRef}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
            />

            {/* Vignette */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    zIndex: 1,
                    background: 'radial-gradient(ellipse 92% 82% at 50% 50%, transparent 38%, rgba(0,0,0,.6) 100%)',
                }}
            />

            {/* HUD */}
            <HUD
                tipEls={tipElements}
                vis={vis}
            />
        </div>
    );
}

