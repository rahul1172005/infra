import { useEffect, useRef } from "react";

// ── SIGNAL DATA ──────────────────────────────────────────────────────────────

const JAG_POINTS1: [number, number][] = [
  [0.000, 0.05], [0.008, 0.15], [0.015, 0.08], [0.022, 0.30],
  [0.028, 0.10], [0.035, 0.45], [0.040, 0.18], [0.048, 0.65],
  [0.053, 0.22], [0.060, 0.80], [0.065, 0.30], [0.072, 0.90],
  [0.078, 0.35], [0.085, 1.00], [0.090, 0.40], [0.097, 0.95],
  [0.103, 0.38], [0.110, 0.88], [0.116, 0.42], [0.122, 0.82],
  [0.128, 0.35], [0.135, 0.75], [0.142, 0.28], [0.150, 0.70],
  [0.157, 0.25], [0.165, 0.62], [0.172, 0.55], [0.178, 0.92],
  [0.183, 0.48], [0.190, 0.98], [0.195, 0.52], [0.202, 1.00],
  [0.207, 0.55], [0.213, 0.96], [0.218, 0.58], [0.225, 0.88],
  [0.232, 0.50], [0.238, 0.80], [0.245, 0.45], [0.252, 0.72],
  [0.260, 0.38], [0.268, 0.65], [0.275, 0.32], [0.282, 0.58],
  [0.290, 0.28], [0.298, 0.52], [0.306, 0.22], [0.315, 0.48],
  [0.323, 0.18], [0.332, 0.42], [0.340, 0.15], [0.350, 0.38],
  [0.360, 0.12], [0.370, 0.35], [0.380, 0.10], [0.392, 0.30],
  [0.403, 0.08], [0.415, 0.28], [0.427, 0.06], [0.440, 0.25],
  [0.453, 0.05], [0.466, 0.22], [0.480, 0.04], [0.494, 0.20],
  [0.508, 0.03], [0.523, 0.18], [0.538, 0.03], [0.554, 0.16],
  [0.570, 0.02], [0.587, 0.14], [0.604, 0.02], [0.622, 0.13],
  [0.640, 0.02], [0.658, 0.11], [0.677, 0.01], [0.696, 0.10],
  [0.716, 0.01], [0.736, 0.09], [0.757, 0.01], [0.778, 0.08],
  [0.800, 0.01], [0.822, 0.07], [0.845, 0.01], [0.868, 0.06],
  [0.892, 0.01], [0.916, 0.05], [0.940, 0.01], [0.964, 0.04],
  [0.982, 0.01], [1.000, 0.02],
];

const JAG_POINTS2: [number, number][] = [
  [0.000, 0.03], [0.010, 0.10], [0.018, 0.05], [0.025, 0.20],
  [0.032, 0.08], [0.040, 0.35], [0.047, 0.12], [0.055, 0.50],
  [0.062, 0.18], [0.070, 0.62], [0.077, 0.24], [0.085, 0.72],
  [0.092, 0.28], [0.100, 0.80], [0.107, 0.32], [0.115, 0.75],
  [0.123, 0.30], [0.131, 0.68], [0.140, 0.55], [0.148, 0.82],
  [0.155, 0.40], [0.163, 0.88], [0.170, 0.44], [0.178, 0.82],
  [0.186, 0.40], [0.194, 0.74], [0.202, 0.36], [0.211, 0.66],
  [0.220, 0.30], [0.230, 0.60], [0.240, 0.25], [0.250, 0.55],
  [0.261, 0.20], [0.272, 0.48], [0.283, 0.16], [0.295, 0.42],
  [0.307, 0.13], [0.320, 0.36], [0.333, 0.10], [0.347, 0.32],
  [0.361, 0.08], [0.376, 0.28], [0.392, 0.06], [0.408, 0.24],
  [0.424, 0.05], [0.441, 0.21], [0.459, 0.04], [0.477, 0.18],
  [0.496, 0.03], [0.516, 0.16], [0.537, 0.03], [0.558, 0.14],
  [0.580, 0.02], [0.603, 0.12], [0.627, 0.02], [0.652, 0.10],
  [0.678, 0.01], [0.705, 0.09], [0.733, 0.01], [0.762, 0.08],
  [0.792, 0.01], [0.823, 0.07], [0.855, 0.01], [0.888, 0.05],
  [0.922, 0.01], [0.956, 0.04], [1.000, 0.01],
];

// ── HELPERS ──────────────────────────────────────────────────────────────────

function envelope(n: number): number {
  const rise1 = n < 0.13 ? n / 0.13 : 1.0;
  const peak1 = n < 0.13 ? rise1 : Math.max(0, 1 - (n - 0.13) / 0.10);
  const peak2 = Math.max(0, 1 - Math.abs(n - 0.22) / 0.10);
  const combined = Math.max(peak1 * 0.78, peak2 * 0.95);
  const tail = n > 0.30 ? Math.max(0, 1 - (n - 0.30) / 0.72) : 1.0;
  return combined * (n < 0.30 ? 1.0 : tail) * 0.96;
}

function jagSample(pts: [number, number][], n: number): number {
  for (let i = 0; i < pts.length - 1; i++) {
    if (n >= pts[i][0] && n <= pts[i + 1][0]) {
      const tt = (n - pts[i][0]) / (pts[i + 1][0] - pts[i][0]);
      return pts[i][1] + tt * (pts[i + 1][1] - pts[i][1]);
    }
  }
  return 0;
}

function sig1(x: number, W: number): number {
  const n = x / W;
  return Math.max(0, envelope(n) * jagSample(JAG_POINTS1, n));
}

function sig2(x: number, W: number): number {
  const n = x / W;
  return Math.max(0, envelope(n) * 0.72 * jagSample(JAG_POINTS2, n));
}

// ── PARTICLE CLASS ───────────────────────────────────────────────────────────

const CHART_TOP_R = 0.09;
const CHART_BOT_R = 0.85;
const NPTS = 5000;

class Particle {
  xr = 0; layer = 1; scatter = 0; speed = 0;
  size = 1; alpha = 1; maxLife = 300; life = 0;
  tw = 0; tws = 0; isBig = false;

  constructor() {
    this.born();
    this.life = Math.random() * this.maxLife;
  }

  born() {
    const r = Math.random();
    this.xr      = r < 0.75 ? Math.pow(Math.random(), 1.6) * 0.65 : Math.random();
    this.layer   = Math.random() < 0.70 ? 1 : 2;
    this.scatter = (Math.random() - 0.5) * 0.012 * (1 + Math.random() * 2);
    this.speed   = 0.00004 + Math.random() * 0.00014;
    this.size    = 0.3 + Math.pow(Math.random(), 3) * 1.8;
    this.alpha   = 0.25 + Math.random() * 0.75;
    this.maxLife = 200 + Math.random() * 300;
    this.life    = 0;
    this.tw      = Math.random() * Math.PI * 2;
    this.tws     = 0.01 + Math.random() * 0.04;
    this.isBig   = Math.random() < 0.04;
    if (this.isBig) { this.size = 1.8 + Math.random() * 2.2; this.alpha = 1; }
  }

  tick() {
    this.life++;
    this.xr += this.speed;
    this.tw  += this.tws;
    if (this.xr > 1.02 || this.life > this.maxLife) this.born();
  }

  pos(W: number, H: number): { x: number; y: number } {
    const x  = this.xr * W;
    const sv = this.layer === 1 ? sig1(x, W) : sig2(x, W);
    const cH = H * (CHART_BOT_R - CHART_TOP_R);
    const y  = H * CHART_BOT_R - sv * cH + this.scatter * cH;
    return { x, y };
  }
}

// ── COMPONENT ────────────────────────────────────────────────────────────────

export default function ECGViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    let animId = 0;
    let timeVal = 0;
    let frame = 0;

    // Particles
    const pts: Particle[] = Array.from({ length: NPTS }, () => new Particle());

    function resize() {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();
      W = rect.width || parent.clientWidth || 800;
      H = rect.height || parent.clientHeight || 400;
      
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    function draw() {
      frame++;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);

      const cTop = H * CHART_TOP_R;
      const cBot = H * CHART_BOT_R;
      const cH   = cBot - cTop;

      // ── GRID ──
      ctx.save();
      ctx.setLineDash([1, 8]);
      for (let i = 1; i <= 4; i++) {
        const y = cTop + cH * i / 5;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y);
        ctx.strokeStyle = "rgba(255,255,255,0.03)"; ctx.lineWidth = 0.5; ctx.stroke();
      }
      ctx.setLineDash([]);
      for (let i = 0; i <= 12; i++) {
        const x = W * 0.02 + W * 0.96 * i / 12;
        ctx.beginPath(); ctx.moveTo(x, cTop); ctx.lineTo(x, cBot);
        ctx.strokeStyle = "rgba(255,255,255,0.02)"; ctx.lineWidth = 0.5; ctx.stroke();
      }
      ctx.restore();

      // ── FIND LOCAL MAXIMA ──
      const peaks: { x: number; y: number; v: number }[] = [];
      for (let x = 3; x < W - 3; x += 1) {
        const v  = sig1(x, W);
        const vL = sig1(x - 2, W);
        const vR = sig1(x + 2, W);
        if (v > vL && v > vR && v > 0.015) {
          peaks.push({ x, y: cBot - v * cH, v });
        }
      }

      // ── ATMOSPHERIC HALOS ──
      peaks.forEach(pk => {
        if (pk.v < 0.05) return;
        const rg = ctx.createRadialGradient(pk.x, pk.y, 0, pk.x, pk.y + cH * 0.1, cH * 0.45 * pk.v);
        rg.addColorStop(0,   `rgba(255,255,255,${0.07 * pk.v})`);
        rg.addColorStop(0.3, `rgba(200,210,255,${0.025 * pk.v})`);
        rg.addColorStop(1,   "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.ellipse(pk.x, pk.y + cH * 0.1, W * 0.12 * pk.v, cH * 0.40 * pk.v, 0, 0, Math.PI * 2);
        ctx.fillStyle = rg; ctx.fill();
      });

      // ── FILL sig2 ──
      ctx.beginPath();
      ctx.moveTo(0, cBot);
      for (let x = 0; x <= W; x++) ctx.lineTo(x, cBot - sig2(x, W) * cH);
      ctx.lineTo(W, cBot); ctx.closePath();
      const gf2 = ctx.createLinearGradient(0, cTop, 0, cBot);
      gf2.addColorStop(0,   "rgba(255,255,255,0.04)");
      gf2.addColorStop(0.7, "rgba(255,255,255,0.01)");
      gf2.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.fillStyle = gf2; ctx.fill();

      // ── FILL sig1 ──
      ctx.beginPath();
      ctx.moveTo(0, cBot);
      for (let x = 0; x <= W; x++) ctx.lineTo(x, cBot - sig1(x, W) * cH);
      ctx.lineTo(W, cBot); ctx.closePath();
      const gf1 = ctx.createLinearGradient(0, cTop, 0, cBot);
      gf1.addColorStop(0,    "rgba(255,255,255,0.11)");
      gf1.addColorStop(0.35, "rgba(255,255,255,0.04)");
      gf1.addColorStop(1,    "rgba(0,0,0,0)");
      ctx.fillStyle = gf1; ctx.fill();

      // ── SIGNAL LINE — 6-pass bloom ──
      const linePasses = [
        { w: 28, a: 0.010 },
        { w: 14, a: 0.028 },
        { w:  7, a: 0.07  },
        { w:  3, a: 0.22  },
        { w:  1.2, a: 0.75 },
        { w:  0.5, a: 1.00 },
      ];
      linePasses.forEach(({ w, a }) => {
        ctx.beginPath();
        for (let x = 0; x <= W; x++) {
          const y = cBot - sig1(x, W) * cH;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(255,255,255,${a})`;
        ctx.lineWidth = w; ctx.lineJoin = "round"; ctx.lineCap = "round"; ctx.stroke();
      });

      // ── sig2 line ──
      ([{ w: 4, a: 0.025 }, { w: 1.2, a: 0.10 }, { w: 0.5, a: 0.22 }] as { w: number; a: number }[])
        .forEach(({ w, a }) => {
          ctx.beginPath();
          for (let x = 0; x <= W; x++) {
            const y = cBot - sig2(x, W) * cH;
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.strokeStyle = `rgba(255,255,255,${a})`;
          ctx.lineWidth = w; ctx.stroke();
        });

      // ── SHARP SPIKE NEEDLES ──
      peaks.forEach(pk => {
        if (pk.v < 0.025) return;
        const spikeH = cH * pk.v * 0.22;

        // Wide soft bloom
        const sg3 = ctx.createLinearGradient(pk.x, pk.y, pk.x, pk.y - spikeH * 0.5);
        sg3.addColorStop(0, `rgba(255,255,255,${0.18 * pk.v})`);
        sg3.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath(); ctx.moveTo(pk.x, pk.y); ctx.lineTo(pk.x, pk.y - spikeH * 0.5);
        ctx.strokeStyle = sg3; ctx.lineWidth = 9; ctx.stroke();

        // Mid spike
        const sg2 = ctx.createLinearGradient(pk.x, pk.y, pk.x, pk.y - spikeH * 0.9);
        sg2.addColorStop(0,   `rgba(255,255,255,${0.80 * pk.v})`);
        sg2.addColorStop(0.6, `rgba(255,255,255,${0.30 * pk.v})`);
        sg2.addColorStop(1,   "rgba(255,255,255,0)");
        ctx.beginPath(); ctx.moveTo(pk.x, pk.y); ctx.lineTo(pk.x, pk.y - spikeH * 0.9);
        ctx.strokeStyle = sg2; ctx.lineWidth = 1.5; ctx.stroke();

        // Razor needle
        const sg1 = ctx.createLinearGradient(pk.x, pk.y, pk.x, pk.y - spikeH * 1.35);
        sg1.addColorStop(0,   "rgba(255,255,255,1)");
        sg1.addColorStop(0.4, `rgba(255,255,255,${0.65 * pk.v})`);
        sg1.addColorStop(1,   "rgba(255,255,255,0)");
        ctx.beginPath(); ctx.moveTo(pk.x, pk.y); ctx.lineTo(pk.x, pk.y - spikeH * 1.35);
        ctx.strokeStyle = sg1; ctx.lineWidth = 0.6; ctx.stroke();

        // Ultra-thin pixel needle
        ctx.beginPath(); ctx.moveTo(pk.x, pk.y); ctx.lineTo(pk.x, pk.y - spikeH * 1.6);
        ctx.strokeStyle = `rgba(255,255,255,${0.45 * pk.v})`;
        ctx.lineWidth = 0.3; ctx.stroke();

        // Corona at tip
        const corona = ctx.createRadialGradient(pk.x, pk.y, 0, pk.x, pk.y, 9 * Math.min(pk.v, 1));
        corona.addColorStop(0,   "rgba(255,255,255,1)");
        corona.addColorStop(0.3, `rgba(255,255,255,${0.55 * pk.v})`);
        corona.addColorStop(1,   "rgba(255,255,255,0)");
        ctx.beginPath(); ctx.arc(pk.x, pk.y, 9 * Math.min(pk.v, 1), 0, Math.PI * 2);
        ctx.fillStyle = corona; ctx.fill();

        // White apex dot
        ctx.beginPath(); ctx.arc(pk.x, pk.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = "#fff"; ctx.fill();

        // Crosshair ticks on major peaks
        if (pk.v > 0.20) {
          ctx.save();
          ctx.globalAlpha = 0.35 * pk.v;
          ctx.strokeStyle = "#fff"; ctx.lineWidth = 0.4;
          ctx.setLineDash([1, 4]);
          ctx.beginPath();
          ctx.moveTo(pk.x - 15, pk.y); ctx.lineTo(pk.x + 15, pk.y);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.restore();
        }
      });

      // ── PARTICLES & MESH (Optimized) ──
      const activePts: { p: Particle, x: number, y: number }[] = [];
      pts.forEach(p => {
        p.tick();
        const { x, y } = p.pos(W, H);
        if (y < cTop - 20 || y > cBot + 15) return;
        
        activePts.push({ p, x, y });

        const fade = Math.min(1, p.life / 20) * Math.min(1, (p.maxLife - p.life) / 20);
        const tw   = 0.5 + 0.5 * Math.sin(p.tw);
        const a    = fade * p.alpha * tw;

        if (p.isBig) {
          const rg = ctx.createRadialGradient(x, y, 0, x, y, p.size * 6);
          rg.addColorStop(0,    `rgba(255,255,255,${a})`);
          rg.addColorStop(0.25, `rgba(255,255,255,${a * 0.4})`);
          rg.addColorStop(1,    "rgba(255,255,255,0)");
          ctx.beginPath(); ctx.arc(x, y, p.size * 6, 0, Math.PI * 2);
          ctx.fillStyle = rg; ctx.fill();
          ctx.beginPath(); ctx.arc(x, y, p.size * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${a})`; ctx.fill();
        } else {
          ctx.beginPath(); ctx.arc(x, y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${a})`; ctx.fill();
        }
      });

      // Mesh on subset
      const meshSubset = activePts.filter((item, i) => i % 5 === 0 && item.p.layer === 1);
      for (let i = 0; i < meshSubset.length; i++) {
        const p1 = meshSubset[i];
        for (let j = i + 1; j < Math.min(i + 6, meshSubset.length); j++) {
          const p2 = meshSubset[j];
          const d = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (d < 35) {
            ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255,255,255,${0.07 * (1 - d / 35)})`;
            ctx.lineWidth = 0.3; ctx.stroke();
          }
        }
      }

      timeVal += 0.006;
      frame++;
      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        background: "#000",
        borderRadius: "12px",
      }}
    />
  );
}
