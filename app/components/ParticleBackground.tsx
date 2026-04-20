"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    // ── Theme colors from globals.css ─────────────────────────────────
    const CYAN = { r: 6, g: 182, b: 212 };      // --accent-cyan: #06b6d4
    const VIOLET = { r: 139, g: 92, b: 246 };   // --accent-violet: #8b5cf6
    const BLUE = { r: 59, g: 130, b: 246 };     // --accent-blue: #3b82f6

    // ── Neural network nodes ──────────────────────────────────────────
    interface Node {
      x: number; y: number; vx: number; vy: number;
    }

    const NODES: Node[] = [];
    const NODE_COUNT = 35;
    const MAX_DIST = 200;

    for (let i = 0; i < NODE_COUNT; i++) {
      NODES.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      });
    }

    // ── Floating code symbols (matching theme) ────────────────────────
    const CODE_CHARS = ["{ }", "< >", "[ ]", "λ", "∫", "∇"];
    interface Symbol {
      char: string; x: number; y: number; vy: number; opacity: number;
    }
    const SYMBOLS: Symbol[] = [];
    for (let i = 0; i < 12; i++) {
      SYMBOLS.push({
        char: CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)],
        x: Math.random() * W,
        y: Math.random() * H,
        vy: 0.08 + Math.random() * 0.12,
        opacity: 0.04 + Math.random() * 0.06,
      });
    }

    // ── Ambient gradient orbs (theme colors) ──────────────────────────
    interface Orb {
      x: number; y: number; r: number; color: { r: number; g: number; b: number }; vx: number; vy: number;
    }
    const ORBS: Orb[] = [
      { x: W * 0.15, y: H * 0.25, r: 220, color: CYAN, vx: 0.04, vy: 0.03 },
      { x: W * 0.85, y: H * 0.75, r: 250, color: VIOLET, vx: -0.03, vy: -0.04 },
    ];

    // ── Mouse interaction ─────────────────────────────────────────────
    let mouseX = -999, mouseY = -999;
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    // ── Animation loop ────────────────────────────────────────────────
    const ticker = gsap.ticker.add(() => {
      W = canvas.width;
      H = canvas.height;

      // Fade trail (matches --background: #050508)
      ctx.fillStyle = "rgba(5,5,8,0.12)";
      ctx.fillRect(0, 0, W, H);

      // ── Draw ambient orbs ───────────────────────────────────────────
      for (const orb of ORBS) {
        orb.x += orb.vx;
        orb.y += orb.vy;
        if (orb.x < -orb.r || orb.x > W + orb.r) orb.vx *= -1;
        if (orb.y < -orb.r || orb.y > H + orb.r) orb.vy *= -1;

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        grad.addColorStop(0, `rgba(${orb.color.r},${orb.color.g},${orb.color.b},0.05)`);
        grad.addColorStop(0.5, `rgba(${orb.color.r},${orb.color.g},${orb.color.b},0.02)`);
        grad.addColorStop(1, `rgba(${orb.color.r},${orb.color.g},${orb.color.b},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Update nodes ────────────────────────────────────────────────
      for (const node of NODES) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > W) node.vx *= -1;
        if (node.y < 0 || node.y > H) node.vy *= -1;
      }

      // ── Draw connections (cyan → blue → violet gradient) ───────────
      for (let i = 0; i < NODES.length; i++) {
        for (let j = i + 1; j < NODES.length; j++) {
          const dx = NODES[i].x - NODES[j].x;
          const dy = NODES[i].y - NODES[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.15;

            const grad = ctx.createLinearGradient(NODES[i].x, NODES[i].y, NODES[j].x, NODES[j].y);
            grad.addColorStop(0, `rgba(${CYAN.r},${CYAN.g},${CYAN.b},${alpha})`);
            grad.addColorStop(0.5, `rgba(${BLUE.r},${BLUE.g},${BLUE.b},${alpha * 0.8})`);
            grad.addColorStop(1, `rgba(${VIOLET.r},${VIOLET.g},${VIOLET.b},${alpha})`);

            ctx.beginPath();
            ctx.moveTo(NODES[i].x, NODES[i].y);
            ctx.lineTo(NODES[j].x, NODES[j].y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // ── Draw nodes (cyan theme color) ──────────────────────────────
      for (const node of NODES) {
        const dx = node.x - mouseX;
        const dy = node.y - mouseY;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        const isNear = distToMouse < 150;

        // Glow (matches --accent-cyan)
        const glowGrad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, isNear ? 10 : 6);
        glowGrad.addColorStop(0, `rgba(${CYAN.r},${CYAN.g},${CYAN.b},${isNear ? 0.25 : 0.12})`);
        glowGrad.addColorStop(1, `rgba(${CYAN.r},${CYAN.g},${CYAN.b},0)`);
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(node.x, node.y, isNear ? 10 : 6, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, isNear ? 2.5 : 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${CYAN.r},${CYAN.g},${CYAN.b},${isNear ? 0.8 : 0.5})`;
        ctx.fill();
      }

      // ── Draw floating symbols (violet theme color) ─────────────────
      ctx.font = "14px 'JetBrains Mono', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (const sym of SYMBOLS) {
        sym.y -= sym.vy;
        if (sym.y < -30) {
          sym.y = H + 30;
          sym.x = Math.random() * W;
        }
        ctx.fillStyle = `rgba(${VIOLET.r},${VIOLET.g},${VIOLET.b},${sym.opacity})`;
        ctx.fillText(sym.char, sym.x, sym.y);
      }

      // ── Mouse cursor glow (cyan theme) ─────────────────────────────
      if (mouseX > 0 && mouseY > 0) {
        const cursorGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 80);
        cursorGrad.addColorStop(0, `rgba(${CYAN.r},${CYAN.g},${CYAN.b},0.04)`);
        cursorGrad.addColorStop(1, `rgba(${CYAN.r},${CYAN.g},${CYAN.b},0)`);
        ctx.fillStyle = cursorGrad;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 80, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener("resize", onResize);

    return () => {
      gsap.ticker.remove(ticker);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
      />

      {/* Scan line (cyan theme) */}
      <div
        className="scan-line"
        style={{
          position: "fixed", left: 0, right: 0, height: 1,
          background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.15), transparent)",
          zIndex: 2, pointerEvents: "none", opacity: 0.6,
        }}
      />

      {/* Grid overlay (cyan theme) */}
      <div
        style={{
          position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(6,182,212,0.015) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(6,182,212,0.015) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />
    </>
  );
}
