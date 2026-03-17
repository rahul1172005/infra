'use client';

import { useRef, useEffect } from 'react';

export default function MistWind() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let animId: number;
    let w = 0, h = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // ── Mist blob layer ──────────────────────────────────────────
    interface Blob {
      x: number; y: number; r: number;
      vx: number; phase: number;
      alpha: number; scaleY: number;
    }
    interface LayerOpts {
      count: number; speedX: number; baseRadius: number;
      alpha: number; yBand: [number, number];
      color: string; wobble: number;
    }

    class MistLayer {
      blobs: Blob[] = [];
      constructor(private opts: LayerOpts) { this.init(); }

      init() {
        this.blobs = Array.from({ length: this.opts.count }, () => ({
          x: Math.random() * w * 1.6 - w * 0.3,
          y: this.opts.yBand[0] * h + Math.random() * (this.opts.yBand[1] - this.opts.yBand[0]) * h,
          r: this.opts.baseRadius * (0.55 + Math.random() * 0.9),
          vx: this.opts.speedX * (0.55 + Math.random() * 0.9),
          phase: Math.random() * Math.PI * 2,
          alpha: this.opts.alpha * (0.45 + Math.random() * 0.9),
          scaleY: 0.22 + Math.random() * 0.28,
        }));
      }

      update(t: number) {
        for (const b of this.blobs) {
          b.x += b.vx;
          b.y += Math.sin(t * 0.00045 + b.phase) * this.opts.wobble * 0.28;
          if (b.x - b.r * 2.5 > w) {
            b.x = -b.r * 2;
            b.y = this.opts.yBand[0] * h + Math.random() * (this.opts.yBand[1] - this.opts.yBand[0]) * h;
          }
        }
      }

      draw() {
        for (const b of this.blobs) {
          ctx.save();
          ctx.translate(b.x, b.y);
          ctx.scale(1, b.scaleY);
          const g = ctx.createRadialGradient(0, 0, 0, 0, 0, b.r);
          g.addColorStop(0, `rgba(${this.opts.color},${b.alpha})`);
          g.addColorStop(0.45, `rgba(${this.opts.color},${b.alpha * 0.38})`);
          g.addColorStop(0.78, `rgba(${this.opts.color},${b.alpha * 0.1})`);
          g.addColorStop(1, `rgba(${this.opts.color},0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(0, 0, b.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
    }

    // ── Wind streaks ─────────────────────────────────────────────
    interface Streak {
      x: number; y: number; len: number;
      vx: number; alpha: number; lw: number;
      yDrift: number; yPhase: number;
    }

    const streaks: Streak[] = Array.from({ length: 28 }, () => ({
      x: Math.random() * w,
      y: h * (0.05 + Math.random() * 0.9),
      len: 35 + Math.random() * 160,
      vx: 0.35 + Math.random() * 1.1,
      alpha: 0.012 + Math.random() * 0.032,
      lw: 0.4 + Math.random() * 1.4,
      yDrift: (Math.random() - 0.5) * 0.18,
      yPhase: Math.random() * Math.PI * 2,
    }));

    const drawStreaks = (t: number) => {
      for (const s of streaks) {
        s.x += s.vx;
        s.y += Math.sin(t * 0.0004 + s.yPhase) * 0.15;
        if (s.x > w + s.len) { s.x = -s.len * 1.8; }

        const g = ctx.createLinearGradient(s.x - s.len, s.y, s.x + s.len * 0.15, s.y);
        g.addColorStop(0, `rgba(255,255,255,0)`);
        g.addColorStop(0.35, `rgba(255,255,255,${s.alpha})`);
        g.addColorStop(0.72, `rgba(255,255,255,${s.alpha * 0.55})`);
        g.addColorStop(1, `rgba(255,255,255,0)`);
        ctx.strokeStyle = g;
        ctx.lineWidth = s.lw;
        ctx.beginPath();
        ctx.moveTo(s.x - s.len, s.y);
        ctx.lineTo(s.x + s.len * 0.15, s.y);
        ctx.stroke();
      }
    };

    // ── Vignette ─────────────────────────────────────────────────
    const drawVignette = () => {
      // bottom fog pool
      const b1 = ctx.createLinearGradient(0, h * 0.55, 0, h);
      b1.addColorStop(0, 'rgba(5,5,5,0)');
      b1.addColorStop(1, 'rgba(5,5,5,0.62)');
      ctx.fillStyle = b1;
      ctx.fillRect(0, 0, w, h);
      // top fade
      const t1 = ctx.createLinearGradient(0, 0, 0, h * 0.38);
      t1.addColorStop(0, 'rgba(5,5,5,0.48)');
      t1.addColorStop(1, 'rgba(5,5,5,0)');
      ctx.fillStyle = t1;
      ctx.fillRect(0, 0, w, h);
      // left edge
      const gl = ctx.createLinearGradient(0, 0, w * 0.12, 0);
      gl.addColorStop(0, 'rgba(5,5,5,0.38)');
      gl.addColorStop(1, 'rgba(5,5,5,0)');
      ctx.fillStyle = gl;
      ctx.fillRect(0, 0, w, h);
      // right edge
      const gr = ctx.createLinearGradient(w, 0, w * 0.88, 0);
      gr.addColorStop(0, 'rgba(5,5,5,0.38)');
      gr.addColorStop(1, 'rgba(5,5,5,0)');
      ctx.fillStyle = gr;
      ctx.fillRect(0, 0, w, h);
    };

    // Layer config — 5 depth planes, alternating tints
    const layers = [
      new MistLayer({ count: 7, speedX: 0.055, baseRadius: 420, alpha: 0.062, yBand: [0.55, 1.08], color: '210,215,255', wobble: 0.45 }),
      new MistLayer({ count: 8, speedX: 0.10, baseRadius: 310, alpha: 0.048, yBand: [0.32, 0.88], color: '255,255,255', wobble: 0.38 }),
      new MistLayer({ count: 6, speedX: 0.17, baseRadius: 230, alpha: 0.038, yBand: [0.15, 0.72], color: '195,208,255', wobble: 0.55 }),
      new MistLayer({ count: 5, speedX: 0.26, baseRadius: 155, alpha: 0.028, yBand: [0.05, 0.55], color: '255,255,255', wobble: 0.7 }),
      new MistLayer({ count: 4, speedX: 0.40, baseRadius: 95, alpha: 0.018, yBand: [0.0, 0.38], color: '230,235,255', wobble: 0.9 }),
    ];

    const animate = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      // Back layers first (slowest / biggest)
      for (const layer of layers) {
        layer.update(t);
        layer.draw();
      }

      // Wind streaks on top of mist, below vignette
      drawStreaks(t);

      // Vignette last to bind edges
      drawVignette();

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%', zIndex: 20 }}
    />
  );
}
