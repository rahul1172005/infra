'use client';

import { useEffect, useRef } from 'react';

const KANJI_LIST = ['T', 'S', 'L', 'B', 'G', 'M', 'A', 'N', 'D', 'H'];
const RANK_LIST = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

export default function OrbitalRadar({ teams = [] }: { teams?: any[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!canvas || !container) return;
        const ctx = canvas.getContext('2d')!;

        let W: number, H: number, DPR: number, CX: number, CY: number, R: number;
        let sweepAngle = -Math.PI / 2;
        const SPD = 0.006;
        let activeIdx = 0;
        let activeTimer = 0;
        let tt = 0;

        const particles: any[] = [];
        const slashes: any[] = [];
        const motes: any[] = [];

        // Map teams to internal representation
        const internalTeams = teams.map((t, i) => {
            const angle = (i / teams.length) * Math.PI * 2 - Math.PI / 2;
            const strength = 0.26 + (Math.random() * 0.58); // Random but deterministic for now
            const trail: any[] = [];
            for (let j = 0; j < 44; j++) {
                const frac = j / 44;
                trail.push({
                    a: angle + (frac - 0.5) * 1.6 + (Math.random() - 0.5) * 0.35,
                    r: strength * (0.20 + Math.random() * 0.80),
                    life: Math.random(),
                    decay: 0.0018 + Math.random() * 0.0028,
                    sz: 0.7 + Math.random() * 1.6,
                });
            }
            return {
                ...t,
                angle,
                strength,
                trail,
                pingLife: 0,
                active: i === 0,
                labelAlpha: 0,
                kanji: KANJI_LIST[i % KANJI_LIST.length],
                rank: RANK_LIST[i % RANK_LIST.length],
                score: 80000 + Math.random() * 20000
            };
        });

        const spawnPing = (x: number, y: number) => {
            for (let i = 0; i < 14; i++) {
                const spd = 1.5 + Math.random() * 3.5;
                const ang = Math.random() * Math.PI * 2;
                particles.push({
                    x, y, vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd,
                    life: 1, decay: 0.013 + Math.random() * 0.016, sz: Math.random() * 2.2 + 0.3
                });
            }
        };

        const spawnSlash = (x: number, y: number) => {
            [-Math.PI / 4, Math.PI / 4].forEach(base => {
                slashes.push({
                    x, y, angle: base + (Math.random() - 0.5) * 0.3,
                    len: 38 + Math.random() * 55, life: 1, decay: 0.020 + Math.random() * 0.014
                });
            });
        };

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 3);
            const size = container.clientWidth || 400;
            
            if (size > 0) {
                W = size;
                H = size;
                DPR = dpr;
                canvas.width = size * dpr;
                canvas.height = size * dpr;
                canvas.style.width = `${size}px`;
                canvas.style.height = `${size}px`;
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                CX = size * 0.5;
                CY = size * 0.5;
                R = size * 0.38;
            }
        };

        const timer = setTimeout(resize, 100);
        const ro = new ResizeObserver(resize);
        ro.observe(container);

        // Populate motes with stable X positions
        for (let i = 0; i < 65; i++) {
            motes.push({
                x: Math.random() * 1000, // Normalized X
                y: Math.random() * 1000, // Normalized Y
                vx: (Math.random() - 0.5) * 0.14, 
                vy: -0.07 - Math.random() * 0.20,
                sz: Math.random() * 0.9 + 0.15, 
                alpha: Math.random() * 0.08 + 0.01, 
                life: Math.random()
            });
        }

        const drawThroneLabel = (team: any, px: number, py: number, alpha: number) => {
            if (alpha <= 0.01) return;
            const isActive = team.active;
            const baseAlpha = alpha * (isActive ? 1.0 : 0.55);
            const outDist = 38 + (isActive ? 8 : 0);
            const ang = team.angle;
            let lx = px + Math.cos(ang) * outDist;
            let ly = py + Math.sin(ang) * outDist;
            const onRight = lx >= CX;
            const align = onRight ? 'left' : 'right';

            ctx.save();
            ctx.globalAlpha = baseAlpha;
            const kanjiSize = Math.max(18, W * 0.04) * (isActive ? 1.15 : 1.0);
            ctx.font = `700 ${kanjiSize}px "Share Tech Mono", monospace`;
            ctx.textAlign = align;
            ctx.textBaseline = 'middle';
            ctx.shadowBlur = isActive ? 24 : 8;
            ctx.shadowColor = isActive ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.4)';
            ctx.fillStyle = isActive ? 'rgba(255,255,255,0.96)' : 'rgba(200,200,215,0.65)';
            ctx.fillText(team.kanji || 'T', lx, ly);

            const nameSize = Math.max(8, W * 0.015);
            ctx.font = `${nameSize}px "Share Tech Mono", monospace`;
            ctx.textAlign = align;
            ctx.textBaseline = 'top';
            ctx.fillStyle = isActive ? 'rgba(255,255,255,0.75)' : 'rgba(180,180,200,0.42)';
            const nameY = ly + kanjiSize * 0.52;
            ctx.fillText(team.team?.replace(/_/g, ' ') || team.name?.replace(/_/g, ' '), lx, nameY);

            const rankSize = Math.max(8, W * 0.015);
            ctx.font = `300 ${rankSize}px "Share Tech Mono", monospace`;
            ctx.textAlign = align;
            ctx.textBaseline = 'bottom';
            ctx.fillStyle = isActive ? 'rgba(255,255,255,0.50)' : 'rgba(160,160,180,0.28)';
            ctx.fillText(team.rank || 'I', lx, ly - kanjiSize * 0.52);

            const barW = Math.max(22, W * 0.05);
            const barH = 1.5;
            const barFrac = (team.score || 50000) / 98420;
            const barX = onRight ? lx : lx - barW;
            const barY = nameY + nameSize + 4;
            ctx.fillStyle = 'rgba(255,255,255,0.08)';
            ctx.fillRect(barX, barY, barW, barH);
            ctx.fillStyle = isActive ? 'rgba(255,255,255,0.72)' : 'rgba(200,200,215,0.35)';
            ctx.fillRect(barX, barY, barW * barFrac, barH);

            ctx.globalAlpha = baseAlpha * 0.35;
            ctx.strokeStyle = 'rgba(255,255,255,0.5)';
            ctx.lineWidth = 0.5;
            ctx.setLineDash([2, 5]);
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(lx - (onRight ? 4 : -4), ly);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.restore();
        };

        const loop = (timestamp: number) => {
            if (!W || !H) {
                animRef.current = requestAnimationFrame(loop);
                return;
            }

            tt += 0.008;
            sweepAngle += SPD;
            if (++activeTimer > 270) {
                activeTimer = 0;
                internalTeams[activeIdx].active = false;
                activeIdx = (activeIdx + 1) % internalTeams.length;
                internalTeams[activeIdx].active = true;
                internalTeams[activeIdx].pingLife = 1;
            }

            // Draw logic
            ctx.clearRect(0, 0, W, H);
            
            // Background
            ctx.save();
            const bg = ctx.createRadialGradient(CX, CY, 0, CX, CY, R * 1.5);
            bg.addColorStop(0, 'rgba(18,18,24,1)');
            bg.addColorStop(1, 'rgba(2,2,4,1)');
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, W, H);
            ctx.restore();

            // Motes
            motes.forEach(m => {
                m.y -= 0.5;
                if(m.y < 0) m.y = 1000;
                ctx.globalAlpha = m.alpha;
                ctx.fillStyle = '#fff';
                ctx.beginPath(); 
                ctx.arc((m.x / 1000) * W, (m.y / 1000) * H, m.sz, 0, Math.PI * 2); 
                ctx.fill();
            });

            // Bezels
            [R+40, R+24, R+10].forEach((br, bi) => {
                ctx.beginPath(); ctx.arc(CX, CY, br, 0, Math.PI*2);
                ctx.strokeStyle = `rgba(100,100,120,${0.1 - bi*0.03})`;
                ctx.lineWidth = 1; ctx.stroke();
            });

            // Degree ring
            for (let i=0;i<360;i+=5) {
                const a=(i/360)*Math.PI*2-Math.PI/2;
                const is30 = i%30 === 0;
                const len = is30 ? 12 : 5;
                ctx.beginPath();
                ctx.moveTo(CX+Math.cos(a)*(R-len),CY+Math.sin(a)*(R-len));
                ctx.lineTo(CX+Math.cos(a)*R,CY+Math.sin(a)*R);
                ctx.strokeStyle = is30 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)';
                ctx.lineWidth = is30 ? 1 : 0.5; ctx.stroke();
            }

            // Cardinals
            [{l:'N',a:-Math.PI/2},{l:'E',a:0},{l:'S',a:Math.PI/2},{l:'W',a:Math.PI}].forEach(c=>{
                ctx.save();
                ctx.font=`600 ${Math.max(12,W*0.03)}px "Share Tech Mono", monospace`;
                ctx.fillStyle=c.l==='N'?'rgba(255,255,255,0.95)':'rgba(200,200,215,0.45)';
                ctx.textAlign='center'; ctx.textBaseline='middle';
                ctx.fillText(c.l,CX+Math.cos(c.a)*(R+35),CY+Math.sin(c.a)*(R+35));
                ctx.restore();
            });

            // Sweep fan
            ctx.save();
            ctx.beginPath(); ctx.moveTo(CX,CY);
            ctx.arc(CX,CY,R,sweepAngle-1.10,sweepAngle); ctx.closePath();
            const sfg=ctx.createLinearGradient(CX+Math.cos(sweepAngle)*R,CY+Math.sin(sweepAngle)*R,CX,CY);
            sfg.addColorStop(0,'rgba(255,255,255,0.15)');
            sfg.addColorStop(1,'transparent');
            ctx.fillStyle=sfg; ctx.fill(); ctx.restore();

            // Sweep line
            ctx.save();
            ctx.beginPath(); ctx.moveTo(CX,CY);
            ctx.lineTo(CX+Math.cos(sweepAngle)*R,CY+Math.sin(sweepAngle)*R);
            ctx.strokeStyle='rgba(255,255,255,0.8)'; ctx.lineWidth=1.5; ctx.stroke();
            ctx.restore();

            // Blips
            internalTeams.forEach((team, ti) => {
                const px = CX + Math.cos(team.angle)*R*team.strength;
                const py = CY + Math.sin(team.angle)*R*team.strength;

                // Trails
                team.trail.forEach((pt: any) => {
                    const dx=CX+Math.cos(pt.a)*R*pt.r, dy=CY+Math.sin(pt.a)*R*pt.r;
                    ctx.globalAlpha = pt.life * (team.active?0.5:0.2);
                    ctx.fillStyle = '#fff';
                    ctx.beginPath(); ctx.arc(dx, dy, pt.sz, 0, Math.PI*2); ctx.fill();
                });

                const diff = ((sweepAngle-team.angle)%(Math.PI*2)+Math.PI*2)%(Math.PI*2);
                if (diff < SPD*4) {
                    team.pingLife = 1;
                    team.labelAlpha = 1;
                    spawnPing(px, py);
                    spawnSlash(px, py);
                }
                
                if (team.labelAlpha > 0) team.labelAlpha -= 0.002;
                const labelA = team.active ? Math.max(team.labelAlpha, 0.8) : team.labelAlpha;

                // Ping rings
                if (team.pingLife > 0) {
                    ctx.save(); ctx.beginPath(); ctx.arc(px,py, (1-team.pingLife)*40, 0, Math.PI*2);
                    ctx.strokeStyle=`rgba(255,255,255,${team.pingLife})`; ctx.stroke(); ctx.restore();
                    team.pingLife -= 0.01;
                }

                // Blip
                ctx.save();
                ctx.fillStyle = team.active ? '#fff' : 'rgba(255,255,255,0.5)';
                ctx.shadowBlur = team.active ? 15 : 5; ctx.shadowColor = '#fff';
                ctx.beginPath(); ctx.arc(px, py, team.active?5:3,0,Math.PI*2); ctx.fill();
                ctx.restore();

                drawThroneLabel(team, px, py, labelA);
            });

            // Slashes
            for (let i=slashes.length-1;i>=0;i--) {
                const s=slashes[i]; s.life-=s.decay;
                if(s.life<=0){slashes.splice(i,1);continue;}
                ctx.save(); ctx.globalAlpha=s.life;
                ctx.strokeStyle='#fff'; ctx.lineWidth=s.life*2;
                ctx.beginPath();
                ctx.moveTo(s.x-Math.cos(s.angle)*s.len*0.5,s.y-Math.sin(s.angle)*s.len*0.5);
                ctx.lineTo(s.x+Math.cos(s.angle)*s.len*0.5,s.y+Math.sin(s.angle)*s.len*0.5);
                ctx.stroke(); ctx.restore();
            }

            // Particles
            for (let i=particles.length-1;i>=0;i--) {
                const p=particles[i]; p.x+=p.vx; p.y+=p.vy; p.life-=p.decay;
                if(p.life<=0){particles.splice(i,1);continue;}
                ctx.fillStyle='#fff'; ctx.globalAlpha=p.life;
                ctx.beginPath(); ctx.arc(p.x,p.y,p.sz,0,Math.PI*2); ctx.fill();
            }

            animRef.current = requestAnimationFrame(loop);
        };

        animRef.current = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(animRef.current);
            ro.disconnect();
        };
    }, [teams]);

    return (
        <div className="relative border border-white/5 bg-[#040404] p-4 sm:p-6 md:p-8 rounded-2xl overflow-hidden min-h-[400px]">
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@300;400;600;700&family=Noto+Serif+JP:wght@300;400;700&display=swap');
                
                .samurai-grain {
                    position: absolute; inset: 0; pointer-events: none; z-index: 5; opacity: 0.04;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E");
                }
                .samurai-vignette {
                    position: absolute; inset: 0; pointer-events: none; z-index: 6;
                    background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%);
                }
                .samurai-scanlines {
                    position: absolute; inset: 0; pointer-events: none; z-index: 7;
                    background: repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px);
                }
                .samurai-kanji-bg {
                    position: absolute; font-weight: 900; font-family: 'Rajdhani', sans-serif;
                    user-select: none; pointer-events: none; line-height: 1; color: rgba(255,255,255,0.01);
                }
            `}</style>

            <div className="samurai-grain"></div>
            <div className="samurai-vignette"></div>
            <div className="samurai-scanlines"></div>

            <div className="samurai-kanji-bg top-5 right-[-5%] text-[150px]">T</div>
            <div className="samurai-kanji-bg bottom-2 left-[0%] text-[100px]">G</div>

            {/* Header */}
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between mb-3 sm:mb-6 md:mb-8 border-b border-white/5 pb-5 gap-4">
                <div className="flex items-center gap-4">
                    <img style={{ transform: "scale(1.6)" }}
                        src="/logo.png"
                        alt="icon"
                        className="w-10 h-10 object-contain opacity-70"
                    />
                    <div className="space-y-1">
                        <p className="text-[11px] font-black tracking-[0.3em] text-white uppercase leading-none font-mono">DYNASTY RADAR</p>
                        <p className="text-[8px] font-black tracking-[0.4em] text-white/20 uppercase leading-none font-mono">DRAGON EYE — TACTICAL</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-[8px] font-black tracking-[0.2em] text-white/10 uppercase font-mono">
                    IRON THRONE · TACTICAL · CLASSIFIED
                </div>
            </div>

            <div className="relative z-10 w-full flex justify-center items-center py-4">
                <canvas ref={canvasRef} className="block" />
            </div>

            {/* Legend */}
            <div className="relative z-10 flex gap-5 pt-6 border-t border-white/5 mt-6 flex-wrap">
                <div className="flex items-center gap-2 text-[8px] font-black tracking-widest text-white/30 font-mono uppercase">
                    <div className="w-2 h-2 rounded-full bg-white/80" /> ACTIVE BLIP
                </div>
                <div className="flex items-center gap-2 text-[8px] font-black tracking-widest text-white/30 font-mono uppercase">
                    <div className="w-6 h-[1px] bg-white/30" /> INK TRAIL
                </div>
                <div className="flex items-center gap-2 text-[8px] font-black tracking-widest text-white/30 font-mono uppercase">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10" /> MINOR SIG
                </div>
            </div>
        </div>
    );
}
