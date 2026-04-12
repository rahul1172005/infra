import { useEffect, useRef } from "react";

// ── Types ─────────────────────────────────────────────────────────────
interface TrailDot {
  a: number; r: number; life: number; decay: number; sz: number;
}
interface Team {
  name: string; kanji?: string; rank?: string; score: number;
  angle: number; strength: number; trail: TrailDot[];
  pingLife: number; active: boolean; labelAlpha: number;
}
interface Particle {
  x: number; y: number; vx: number; vy: number;
  life: number; decay: number; sz: number;
}
interface Slash {
  x: number; y: number; angle: number; len: number; life: number; decay: number;
}
interface Mote {
  x: number; y: number; vx: number; vy: number;
  sz: number; alpha: number; life: number;
}

// ── Static team data ──────────────────────────────────────────────────


// ── Constants ─────────────────────────────────────────────────────────
const SPD = 0.0075;

function buildTeams(teamsProp: any[]): Team[] {
  const data = teamsProp;

  return data.map((t, i) => {
    const angle = (i / data.length) * Math.PI * 2 - Math.PI / 2;
    const scoreVal = t.points || t.score || 0;
    const strength = 0.26 + (Math.min(scoreVal, 100000) / 100000) * 0.58;
    const trail: TrailDot[] = [];
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
      name: t.team || t.name || t.id || "UNKNOWN",
      score: scoreVal,
      angle, strength, trail, pingLife: 0, active: false, labelAlpha: 0 
    };
  });
}

// ── Component ─────────────────────────────────────────────────────────
export default function DynastyRadar({ teams: teamsProp = [] }: { teams?: any[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const propRef = useRef(teamsProp);
  const teamsRef = useRef<Team[]>([]);

  useEffect(() => {
    propRef.current = teamsProp;
    if (stateRef.current.initialized) {
      // Partially rebuild only necessary parts to avoid jumpy animation
      const newTeams = buildTeams(teamsProp);
      teamsRef.current.forEach((t, i) => {
        if (newTeams[i]) {
          t.score = newTeams[i].score;
          t.strength = newTeams[i].strength;
          t.name = newTeams[i].name;
        }
      });
      // If team count changed, rebuild entirely
      if (newTeams.length !== teamsRef.current.length) {
        teamsRef.current = newTeams;
      }
    }
  }, [teamsProp]);

  const stateRef = useRef({
    sweepAngle: -Math.PI / 2,
    tt: 0,
    activeIdx: 0,
    activeTimer: 0,
    particles: [] as Particle[],
    slashes: [] as Slash[],
    motes: [] as Mote[],
    initialized: false
  });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let W = 0, H = 0, DPR = 1, CX = 0, CY = 0, R = 0;
    let animId = 0;

    const s = stateRef.current;
    if (!s.initialized) {
      for (let i = 0; i < 65; i++) {
        s.motes.push({
          x: Math.random() * 1920, y: Math.random() * 1080,
          vx: (Math.random() - 0.5) * 0.14, vy: -0.07 - Math.random() * 0.20,
          sz: Math.random() * 0.9 + 0.15,
          alpha: Math.random() * 0.08 + 0.01,
          life: Math.random(),
        });
      }
      teamsRef.current = buildTeams(teamsProp);
      s.initialized = true;
    }

    const teams = teamsRef.current;
    if (teams.length > 0 && teams[s.activeIdx]) {
      teams[s.activeIdx].active = true;
    } else if (teams.length > 0) {
      s.activeIdx = 0;
      teams[0].active = true;
    }

    const SPD = 0.006;

    // ── Resize ──────────────────────────────────────────────────────
    function resize() {
      const parent = canvas.parentElement;
      if (!parent) return;
      DPR = Math.min(window.devicePixelRatio || 1, 3);
      W = parent.clientWidth || 400;
      H = parent.clientHeight || 450;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      CX = W * 0.50;
      CY = H * 0.50;
      R = Math.min(W * 0.25, H * 0.28);
    }

    // ── Helpers ──────────────────────────────────────────────────────
    function spawnPing(x: number, y: number) {
      for (let i = 0; i < 14; i++) {
        const spd = 1.5 + Math.random() * 3.5;
        const ang = Math.random() * Math.PI * 2;
        s.particles.push({
          x, y, vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd,
          life: 1, decay: 0.013 + Math.random() * 0.016, sz: Math.random() * 2.2 + 0.3
        });
      }
    }

    function spawnSlash(x: number, y: number) {
      ([-Math.PI / 4, Math.PI / 4] as number[]).forEach(base => {
        s.slashes.push({
          x, y, angle: base + (Math.random() - 0.5) * 0.3,
          len: 38 + Math.random() * 55, life: 1, decay: 0.020 + Math.random() * 0.014
        });
      });
    }

    // ── Draw helpers ─────────────────────────────────────────────────
    function drawBg() {
      ctx.save();
      ctx.fillStyle = "#000"; ctx.fillRect(0, 0, W, H);
      ctx.restore();
    }

    function drawBezel(cx: number, cy: number, r: number, w: number) {
      ctx.save();
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(2,2,4,1)"; ctx.lineWidth = w; ctx.stroke();
      for (let s = 0; s < 10; s++) {
        const f = s / 10, lv = 8 + f * 55, a = 0.02 + f * 0.16;
        ctx.beginPath(); ctx.arc(cx, cy, r - s * (w / 10) * 0.45, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${lv + 50},${lv + 50},${lv + 58},${a})`;
        ctx.lineWidth = w / 10; ctx.stroke();
      }
      ctx.beginPath(); ctx.arc(cx, cy, r, Math.PI * 0.95, Math.PI * 1.70);
      ctx.strokeStyle = "rgba(255,255,255,0.52)"; ctx.lineWidth = w * 0.22; ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, r, -0.12, 0.38);
      ctx.strokeStyle = "rgba(255,255,255,0.20)"; ctx.lineWidth = w * 0.12; ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, r - w / 2 + 1.5, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,2,0.92)"; ctx.lineWidth = 2; ctx.stroke();
      ctx.restore();
    }

    function drawSlashEffects() {
      for (let i = s.slashes.length - 1; i >= 0; i--) {
        const sl = s.slashes[i]; sl.life -= sl.decay;
        if (sl.life <= 0) { s.slashes.splice(i, 1); continue; }
        ctx.save(); ctx.globalAlpha = sl.life * 0.72;
        ctx.strokeStyle = `rgba(255,255,255,${sl.life * 0.9})`; ctx.lineWidth = sl.life * 1.8;
        ctx.shadowBlur = sl.life * 22; ctx.shadowColor = "rgba(255,255,255,0.85)"; ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(sl.x - Math.cos(sl.angle) * sl.len * 0.4, sl.y - Math.sin(sl.angle) * sl.len * 0.4);
        ctx.lineTo(sl.x + Math.cos(sl.angle) * sl.len * 0.6, sl.y + Math.sin(sl.angle) * sl.len * 0.6);
        ctx.stroke(); ctx.restore();
      }
    }

    function drawMotes() {
      s.motes.forEach(m => {
        m.x += m.vx * (W / 1920); m.y += m.vy * (H / 1080); m.life += 0.0025;
        if (m.y < -5 || m.life > 1) { m.x = Math.random() * W; m.y = H + 5; m.life = 0; }
        const a = m.alpha * Math.sin(m.life * Math.PI);
        ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = "#fff";
        ctx.beginPath(); ctx.arc(m.x, m.y, m.sz, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      });
    }

    function drawLightRing() {
      // Outer falloff — cubic decay spreading outward
      ctx.save();
      ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2); ctx.clip();
      for (let sp = 18; sp >= 1; sp--) {
        const t2 = sp / 18;
        const alpha = 0.06 * (1 - t2) * (1 - t2) * (1 - t2);
        ctx.beginPath(); ctx.arc(CX, CY, R + sp * 1.4, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`; ctx.lineWidth = 2.2; ctx.stroke();
      }
      ctx.restore();

      // Inward falloff
      ctx.save();
      for (let sp = 16; sp >= 1; sp--) {
        const t2 = sp / 16;
        const alpha = 0.055 * (1 - t2) * (1 - t2) * (1 - t2);
        ctx.beginPath(); ctx.arc(CX, CY, R - sp * 1.2, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`; ctx.lineWidth = 2; ctx.stroke();
      }
      ctx.restore();

      // Corona band
      ctx.save();
      ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,0.18)"; ctx.lineWidth = 9; ctx.stroke(); ctx.restore();

      ctx.save();
      ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,0.38)"; ctx.lineWidth = 4.5; ctx.stroke(); ctx.restore();

      // Emitting line
      ctx.save();
      ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,0.95)"; ctx.lineWidth = 1.2;
      ctx.shadowBlur = 6; ctx.shadowColor = "rgba(255,255,255,0.9)"; ctx.stroke(); ctx.restore();

      // Hot spot — specular glint
      ctx.save();
      ctx.beginPath(); ctx.arc(CX, CY, R, -0.65, -0.05);
      ctx.strokeStyle = "rgba(255,255,255,1)"; ctx.lineWidth = 2.5; ctx.shadowBlur = 0; ctx.stroke(); ctx.restore();

      // Hot spot bloom
      ctx.save();
      ctx.beginPath(); ctx.arc(CX, CY, R, -0.58, -0.08);
      ctx.strokeStyle = "rgba(255,255,255,0.22)"; ctx.lineWidth = 22;
      ctx.shadowBlur = 35; ctx.shadowColor = "rgba(255,255,255,0.55)"; ctx.stroke(); ctx.restore();

      // Reflected secondary
      ctx.save();
      ctx.beginPath(); ctx.arc(CX, CY, R, Math.PI + 0.25, Math.PI + 0.70);
      ctx.strokeStyle = "rgba(255,255,255,0.55)"; ctx.lineWidth = 1.4;
      ctx.shadowBlur = 10; ctx.shadowColor = "rgba(255,255,255,0.6)"; ctx.stroke(); ctx.restore();
    }

    function drawDynastyLabel(team: Team, px: number, py: number, alpha: number) {
      if (alpha <= 0.01) return;
      const isActive = team.active;
      const baseAlpha = alpha * (isActive ? 1.0 : 0.45);
      const outDist = 42 + (isActive ? 10 : 0);
      const lx = px + Math.cos(team.angle) * outDist;
      const ly = py + Math.sin(team.angle) * outDist;
      const onRight = lx >= CX;
      const align = onRight ? "left" : "right" as CanvasTextAlign;

      ctx.save();
      ctx.globalAlpha = baseAlpha;

      // Team Identity
      const primaryName = team.name?.replace(/_/g, ' ') || "ACTIVE_NODE";
      const nameSize = Math.max(12, W * 0.014);
      ctx.font = `black ${nameSize}px 'Rajdhani', sans-serif`;
      ctx.textAlign = align;
      ctx.textBaseline = "middle";
      ctx.shadowBlur = isActive ? 15 : 0;
      ctx.shadowColor = "rgba(232, 20, 20, 0.4)";
      ctx.fillStyle = isActive ? "#fff" : "rgba(255,255,255,0.7)";
      ctx.fillText(primaryName, lx + (onRight ? 8 : -8), ly - 10);

      // Score Indicator
      const subSize = Math.max(8, W * 0.009);
      ctx.font = `bold ${subSize}px 'Share Tech Mono', monospace`;
      ctx.fillStyle = "#E81414";
      ctx.fillText(`${team.score} HONOR`, lx + (onRight ? 8 : -8), ly + 6);

      // Connector Dash
      ctx.strokeStyle = "rgba(255,255,255,0.15)";
      ctx.setLineDash([2, 4]);
      ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(lx, ly); ctx.stroke();
      ctx.restore();
    }

    // ── Main draw loop ────────────────────────────────────────────────
    function draw() {
      animId = requestAnimationFrame(draw);
      s.tt += 0.008; s.sweepAngle += SPD;

      const teams = teamsRef.current;
      // ── Sync with Props without restarting ──────────────────
      const currentProps = propRef.current;
      if (currentProps && currentProps.length > 0) {
        // Late initialization if started empty
        if (teams.length === 0) {
          teamsRef.current = buildTeams(currentProps);
        }
        
        currentProps.forEach((p: any) => {
          const nameMatch = p.team || p.name || p.id;
          const target = teamsRef.current.find(t => t.name === nameMatch);
          if (target) {
            const rawScore = p.points || p.score || p.value || 0;
            target.score = rawScore;
            const maxVal = rawScore > 1000 ? 100000 : 100;
            target.strength = 0.26 + (Math.min(rawScore, maxVal) / maxVal) * 0.58;
          }
        });
      }

      if (++s.activeTimer > 270) {
        s.activeTimer = 0;
        if (teamsRef.current[s.activeIdx]) teamsRef.current[s.activeIdx].active = false;
        s.activeIdx = (s.activeIdx + 1) % teamsRef.current.length;
        if (teamsRef.current[s.activeIdx]) {
          teamsRef.current[s.activeIdx].active = true;
          teamsRef.current[s.activeIdx].pingLife = 1;
        }
      }

      // Phosphor persistence clear (allows transparency)
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fillRect(0, 0, W, H);
      ctx.restore();

      // Phosphor persistence
      ctx.save();
      ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2); ctx.clip();
      ctx.fillStyle = "rgba(4,4,4,0.14)"; ctx.fillRect(CX - R, CY - R, R * 2, R * 2);
      ctx.restore();

      // Bezels
      drawBezel(CX, CY, R + 62, 20);
      drawBezel(CX, CY, R + 40, 11);
      drawBezel(CX, CY, R + 24, 7);
      drawBezel(CX, CY, R + 10, 4);

      // Degree ticks
      for (let i = 0; i < 360; i++) {
        const a = (i / 360) * Math.PI * 2 - Math.PI / 2;
        const is30 = i % 30 === 0, is10 = i % 10 === 0, is5 = i % 5 === 0;
        const ro = R + 10;
        const len = is30 ? 18 : is10 ? 12 : is5 ? 7 : 3.5;
        ctx.beginPath();
        ctx.moveTo(CX + Math.cos(a) * (ro - len), CY + Math.sin(a) * (ro - len));
        ctx.lineTo(CX + Math.cos(a) * ro, CY + Math.sin(a) * ro);
        ctx.strokeStyle = is30 ? "rgba(255,255,255,0.72)" : is10 ? "rgba(220,220,232,0.36)" : is5 ? "rgba(180,180,200,0.16)" : "rgba(130,130,155,0.08)";
        ctx.lineWidth = is30 ? 1.5 : is10 ? 0.9 : 0.5; ctx.stroke();
        if (is30) {
          const lr = ro - 30;
          ctx.save(); ctx.translate(CX + Math.cos(a) * lr, CY + Math.sin(a) * lr); ctx.rotate(a + Math.PI / 2);
          ctx.font = `${Math.max(7, W * 0.0075)}px 'Share Tech Mono'`;
          ctx.fillStyle = "rgba(210,210,228,0.48)"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
          ctx.fillText(i === 0 ? "360" : String(i), 0, 0); ctx.restore();
        }
      }

      // Cardinals
      ([["N", -Math.PI / 2], ["E", 0], ["S", Math.PI / 2], ["W", Math.PI]] as [string, number][]).forEach(([l, a]) => {
        ctx.save();
        ctx.font = `900 ${Math.max(14, W * 0.016)}px 'Cinzel', serif`;
        ctx.fillStyle = l === "N" ? "rgba(255,255,255,0.95)" : "rgba(200,200,215,0.45)";
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        if (l === "N") { ctx.shadowBlur = 20; ctx.shadowColor = "rgba(255,255,255,0.60)"; }
        ctx.fillText(l, CX + Math.cos(a) * (R + 50), CY + Math.sin(a) * (R + 50));
        ctx.restore();
      });

      // Radar face (Pure Black Minimalist)
      ctx.save();
      ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2); 
      ctx.fillStyle = "#000"; ctx.fill(); 
      ctx.restore();

      // Glass sheen
      ctx.save();
      const sheen = ctx.createRadialGradient(CX - R * 0.35, CY - R * 0.42, 0, CX - R * 0.1, CY - R * 0.1, R * 0.9);
      sheen.addColorStop(0, "rgba(255,255,255,0.042)");
      sheen.addColorStop(0.4, "rgba(255,255,255,0.010)");
      sheen.addColorStop(1, "rgba(255,255,255,0)");
      ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2); ctx.fillStyle = sheen; ctx.fill(); ctx.restore();

      // Range rings — dashed
      // Range rings — dashed
      ([0.75, 0.50, 0.25] as number[]).forEach((rr, ri) => {
        ctx.save();
        ctx.beginPath(); ctx.arc(CX, CY, R * rr, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(200,200,218,${0.13 - ri * 0.03})`; ctx.lineWidth = 0.65;
        ctx.setLineDash([3, 7]); ctx.stroke(); ctx.restore();
        ctx.save();
        ctx.font = `${Math.max(5, W * 0.0055)}px 'Share Tech Mono'`;
        ctx.fillStyle = "rgba(200,200,218,0.18)"; ctx.textAlign = "left"; ctx.textBaseline = "middle";
        ctx.fillText(`${(3 - ri) * 8}nm`, CX + R * rr + 4, CY - 5); ctx.restore();
      });

      // Neon light ring
      drawLightRing();

      // Spokes
      for (let i = 0; i < 72; i++) {
        const a = (i / 72) * Math.PI * 2;
        ctx.beginPath(); ctx.moveTo(CX, CY); ctx.lineTo(CX + Math.cos(a) * R, CY + Math.sin(a) * R);
        ctx.strokeStyle = i % 18 === 0 ? "rgba(200,200,215,0.11)" : i % 9 === 0 ? "rgba(180,180,205,0.048)" : "rgba(150,150,180,0.016)";
        ctx.lineWidth = 0.4; ctx.stroke();
      }

      // Crosshairs
      ctx.save(); ctx.strokeStyle = "rgba(220,220,235,0.16)"; ctx.lineWidth = 0.55;
      ctx.setLineDash([2, 9]);
      ctx.beginPath(); ctx.moveTo(CX - R, CY); ctx.lineTo(CX + R, CY); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(CX, CY - R); ctx.lineTo(CX, CY + R); ctx.stroke();
      ctx.setLineDash([]); ctx.restore();

      // Sweep fan
      ctx.save();
      ctx.beginPath(); ctx.moveTo(CX, CY);
      ctx.arc(CX, CY, R, s.sweepAngle - 1.10, s.sweepAngle); ctx.closePath();
      const sfg = ctx.createLinearGradient(CX + Math.cos(s.sweepAngle) * R, CY + Math.sin(s.sweepAngle) * R, CX, CY);
      sfg.addColorStop(0, "rgba(255,255,255,0.17)");
      sfg.addColorStop(0.28, "rgba(240,240,255,0.06)");
      sfg.addColorStop(0.7, "rgba(220,220,245,0.015)");
      sfg.addColorStop(1, "rgba(200,200,230,0)");
      ctx.fillStyle = sfg; ctx.fill(); ctx.restore();

      // Sweep line
      ctx.save();
      ctx.beginPath(); ctx.moveTo(CX, CY);
      ctx.lineTo(CX + Math.cos(s.sweepAngle) * R, CY + Math.sin(s.sweepAngle) * R);
      ctx.strokeStyle = "rgba(255,255,255,0.97)"; ctx.lineWidth = 1.8; ctx.shadowBlur = 0; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(CX, CY);
      ctx.lineTo(CX + Math.cos(s.sweepAngle) * R, CY + Math.sin(s.sweepAngle) * R);
      ctx.strokeStyle = "rgba(255,255,255,0.45)"; ctx.lineWidth = 6;
      ctx.shadowBlur = 28; ctx.shadowColor = "rgba(255,255,255,0.85)"; ctx.stroke();
      const tx = CX + Math.cos(s.sweepAngle) * R, ty = CY + Math.sin(s.sweepAngle) * R;
      ctx.beginPath(); ctx.arc(tx, ty, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#fff"; ctx.shadowBlur = 18; ctx.fill(); ctx.restore();

      drawSlashEffects();

      // Blips + trails + labels
      teamsRef.current.forEach((team, ti) => {
        const px = CX + Math.cos(team.angle) * R * team.strength;
        const py = CY + Math.sin(team.angle) * R * team.strength;
        const br = team.active ? 1.0 : 0.4 + 0.5 * (team.score / 98420);

        team.trail.forEach((pt: TrailDot, pi: number) => {
          pt.life -= pt.decay;
          if (pt.life <= 0) {
            pt.life = 0.15 + Math.random() * 0.85;
            const f = pi / team.trail.length;
            pt.a = team.angle + (f - 0.5) * 1.6 + (Math.random() - 0.5) * 0.32;
            pt.r = team.strength * (0.18 + Math.random() * 0.82);
            pt.sz = 0.7 + Math.random() * 1.5;
          }
          const dx = CX + Math.cos(pt.a) * R * pt.r;
          const dy = CY + Math.sin(pt.a) * R * pt.r;
          const alpha = pt.life * (team.active ? 0.72 : 0.22) * br;
          ctx.save(); ctx.globalAlpha = alpha; ctx.fillStyle = "rgba(255,255,255,1)";
          ctx.shadowBlur = team.active ? 6 : 1.5; ctx.shadowColor = "rgba(255,255,255,0.7)";
          ctx.beginPath(); ctx.arc(dx, dy, pt.sz * (team.active ? 1.0 : 0.5), 0, Math.PI * 2); ctx.fill();
          ctx.restore();
        });

        const diff = ((s.sweepAngle - team.angle) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        if (diff < SPD * 4) {
          team.pingLife = 1;
          team.labelAlpha = 1;
          spawnPing(px, py);
          spawnSlash(px, py);
        }

        if (team.labelAlpha > 0) team.labelAlpha = Math.max(0, team.labelAlpha - 0.0015);
        const labelA = team.active ? Math.max(team.labelAlpha, 0.82) : team.labelAlpha;

        if (team.pingLife > 0) {
          ([46, 28, 14] as number[]).forEach((maxR, ri2) => {
            const pr = (1 - team.pingLife) * maxR;
            ctx.save(); ctx.beginPath(); ctx.arc(px, py, pr, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(255,255,255,1)";
            ctx.globalAlpha = team.pingLife * (0.70 - ri2 * 0.20);
            ctx.lineWidth = 1.2 - ri2 * 0.2; ctx.shadowBlur = 16; ctx.shadowColor = "rgba(255,255,255,0.8)";
            ctx.stroke(); ctx.restore();
          });
          team.pingLife -= 0.011;
        }

        const pulse = team.active ? 5.0 + 2.0 * Math.sin(s.tt * 5 + ti) : 3.0;
        ctx.save();
        const halo = ctx.createRadialGradient(px, py, 0, px, py, 28);
        halo.addColorStop(0, `rgba(255,255,255,${team.active ? 0.30 : 0.10})`);
        halo.addColorStop(0.5, `rgba(255,255,255,${team.active ? 0.07 : 0.025})`);
        halo.addColorStop(1, "transparent");
        ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(px, py, 28, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#fff"; ctx.shadowBlur = team.active ? 30 : 10; ctx.shadowColor = "rgba(255,255,255,0.9)";
        ctx.beginPath(); ctx.arc(px, py, pulse, 0, Math.PI * 2); ctx.fill();

        if (team.active) {
          ctx.shadowBlur = 0; ctx.strokeStyle = "rgba(255,255,255,0.58)"; ctx.lineWidth = 0.9;
          const ck = 13;
          ctx.beginPath(); ctx.moveTo(px - ck, py); ctx.lineTo(px + ck, py); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(px, py - ck); ctx.lineTo(px, py + ck); ctx.stroke();
          ctx.beginPath(); ctx.arc(px, py, 20, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(255,255,255,0.22)"; ctx.setLineDash([2, 5]); ctx.stroke(); ctx.setLineDash([]);
          const bk = 7, bd = 24;
          ([[px - bd, py - bd, 1, 1], [px + bd, py - bd, -1, 1], [px + bd, py + bd, -1, -1], [px - bd, py + bd, 1, -1]] as [number, number, number, number][]).forEach(([bx, by, sx, sy]) => {
            ctx.strokeStyle = "rgba(255,255,255,0.52)"; ctx.lineWidth = 1.0;
            ctx.beginPath(); ctx.moveTo(bx, by + sy * bk); ctx.lineTo(bx, by); ctx.lineTo(bx + sx * bk, by); ctx.stroke();
          });
        }
        ctx.restore();
        drawDynastyLabel(team, px, py, labelA);
      });

      // Particles
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const p = s.particles[i];
        p.x += p.vx; p.y += p.vy; p.vx *= 0.88; p.vy *= 0.88; p.life -= p.decay;
        if (p.life <= 0) { s.particles.splice(i, 1); continue; }
        ctx.save(); ctx.globalAlpha = p.life * 0.78; ctx.fillStyle = "#fff";
        ctx.shadowBlur = 8; ctx.shadowColor = "rgba(255,255,255,0.6)";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.sz * p.life, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      }

      // Tsuba pivot
      ctx.save();
      const glowR = 16 + 2 * Math.sin(s.tt * 2);
      const cg = ctx.createRadialGradient(CX, CY, 0, CX, CY, glowR);
      cg.addColorStop(0, "rgba(255,255,255,0.80)");
      cg.addColorStop(0.45, "rgba(210,215,228,0.38)");
      cg.addColorStop(1, "transparent");
      ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(CX, CY, glowR, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(CX, CY, 13, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,2,0.95)"; ctx.lineWidth = 2.5; ctx.stroke();
      const tsuba = ctx.createRadialGradient(CX - 4.5, CY - 4.5, 0, CX, CY, 13);
      tsuba.addColorStop(0, "rgba(245,248,255,1)");
      tsuba.addColorStop(0.30, "rgba(160,165,185,0.95)");
      tsuba.addColorStop(0.60, "rgba(60,64,80,0.95)");
      tsuba.addColorStop(0.85, "rgba(20,22,30,0.98)");
      tsuba.addColorStop(1, "rgba(4,4,8,1)");
      ctx.fillStyle = tsuba; ctx.shadowBlur = 0;
      ctx.beginPath(); ctx.arc(CX, CY, 13, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(CX, CY, 13, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,0.11)"; ctx.lineWidth = 0.8; ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,0.62)";
      ctx.beginPath(); ctx.arc(CX - 4, CY - 4, 3.8, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.beginPath(); ctx.arc(CX, CY, 1.2, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }

    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    draw();
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "450px", background: "#040404", overflow: "hidden", position: "relative" }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@300;400;600;700&family=Cinzel:wght@400;700;900&display=swap');
      `}</style>

      {/* Canvas */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, display: "block" }} />
    </div>
  );
}
