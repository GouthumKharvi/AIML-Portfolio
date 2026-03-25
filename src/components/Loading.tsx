/**
 * Loading — "UNIT GK-01 BOOT SEQUENCE"
 * ─────────────────────────────────────────────────────────────
 * A cinematic AI-robot boot sequence loading screen.
 *
 * Visuals:
 *  • Canvas-drawn robot head that assembles from circuit fragments
 *  • Animated scanning eyes with beam sweep
 *  • Hex/binary boot log lines that scroll up
 *  • Circuit traces that spread outward as progress increases
 *  • Segmented progress ring around the robot face
 *  • Name + AIML DEVELOPER slam-reveal at completion
 *  • Nothing else — no nav, no buttons, no email
 *
 * Zero external deps beyond React. All canvas + inline styles.
 */

import { useEffect, useRef, useState } from "react";
import { useLoading } from "../context/LoadingProvider";

/* ══════════════════════════════════════════════════════════
   BOOT LOG LINES  (pure flavour — no real info leaked)
══════════════════════════════════════════════════════════ */
const BOOT_LINES = [
  "BIOS v4.1.0 ... OK",
  "Loading kernel modules ......... OK",
  "Mounting neural filesystem ....... OK",
  "Initialising tensor cores [████████] OK",
  "Loading transformer weights ....... OK",
  "Calibrating attention heads ........ OK",
  "Warming inference engine ........... OK",
  "Activating vision subsystem ........ OK",
  "Connecting to knowledge base ....... OK",
  "Syncing gradient memory ............ OK",
  "Running self-diagnostics ........... OK",
  "Booting language model ............. OK",
  "UNIT GK-01 ONLINE",
];

/* ══════════════════════════════════════════════════════════
   CSS INJECTION
══════════════════════════════════════════════════════════ */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');

  @keyframes gk-blink  { 0%,100%{opacity:1} 48%,52%{opacity:0} }
  @keyframes gk-scan   { 0%{transform:translateY(-100%)} 100%{transform:translateY(100%)} }
  @keyframes gk-fadein { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
  @keyframes gk-name   {
    0%  { opacity:0; letter-spacing:.8em; clip-path:polygon(0 0,0 0,0 100%,0 100%); }
    40% { opacity:1; letter-spacing:.08em; clip-path:polygon(0 0,60% 0,60% 100%,0 100%); }
    100%{ opacity:1; letter-spacing:.06em; clip-path:polygon(0 0,100% 0,100% 100%,0 100%); }
  }
  @keyframes gk-role   {
    0%  { opacity:0; transform:translateX(-18px); }
    100%{ opacity:1; transform:translateX(0); }
  }
  @keyframes gk-exit {
    to { opacity:0; transform:scale(1.06); }
  }
  @keyframes gk-logline {
    from { opacity:0; transform:translateX(-8px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes gk-ring {
    from { stroke-dashoffset: 565; }
  }
  @keyframes gk-pulse {
    0%,100% { opacity:.6; transform:scale(1); }
    50%     { opacity:1;  transform:scale(1.04); }
  }
  @keyframes gk-circuit {
    from { stroke-dashoffset: 300; opacity:0; }
    to   { stroke-dashoffset:   0; opacity:.55; }
  }
  @keyframes gk-assemble {
    from { opacity:0; transform:scale(.85) translateY(8px); }
    to   { opacity:1; transform:scale(1)   translateY(0); }
  }
  @keyframes gk-eye-on {
    0%   { opacity:0; transform:scale(0); }
    60%  { opacity:1; transform:scale(1.15); }
    100% { opacity:1; transform:scale(1); }
  }
  @keyframes gk-ticker {
    from { transform:translateX(0); }
    to   { transform:translateX(-50%); }
  }
`;

function inject() {
  if (document.getElementById("gk-boot-css")) return;
  const s = document.createElement("style");
  s.id = "gk-boot-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}

/* ══════════════════════════════════════════════════════════
   setProgress  (unchanged public API)
══════════════════════════════════════════════════════════ */
export const setProgress = (setLoading: (v: number) => void) => {
  let percent = 0;
  let interval = setInterval(() => {
    if (percent <= 50) {
      percent += Math.round(Math.random() * 5);
      setLoading(percent);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent += Math.round(Math.random());
        setLoading(percent);
        if (percent > 91) clearInterval(interval);
      }, 2000);
    }
  }, 100);

  const clear = () => { clearInterval(interval); setLoading(100); };
  const loaded = () =>
    new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) { percent++; setLoading(percent); }
        else { resolve(percent); clearInterval(interval); }
      }, 2);
    });

  return { loaded, percent, clear };
};

/* ══════════════════════════════════════════════════════════
   CANVAS ROBOT FACE
══════════════════════════════════════════════════════════ */
function drawRobot(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  t: number,
  progress: number  // 0–1
) {
  const p   = Math.min(1, progress);
  const s   = size;
  const ac  = "#00e6b2";
  const ac2 = "#0a84ff";
  const dim = "rgba(0,230,178,";

  ctx.save();
  ctx.translate(cx, cy);

  /* ── HEAD outline ── */
  const hw = s * 0.72, hh = s * 0.82;
  ctx.beginPath();
  ctx.roundRect(-hw / 2, -hh / 2, hw, hh, s * 0.1);
  ctx.strokeStyle = `rgba(0,230,178,${0.15 + p * 0.55})`;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  /* head fill */
  ctx.fillStyle = `rgba(2,6,22,${0.75 + p * 0.2})`;
  ctx.fill();

  /* ── PANEL LINES on face ── */
  const panelAlpha = p * 0.18;
  [[-hw * 0.25, -hh * 0.35], [hw * 0.25, -hh * 0.35]].forEach(([x]) => {
    ctx.beginPath();
    ctx.moveTo(x, -hh * 0.5);
    ctx.lineTo(x, hh * 0.5);
    ctx.strokeStyle = `rgba(0,230,178,${panelAlpha})`;
    ctx.lineWidth = 0.6;
    ctx.stroke();
  });
  ctx.beginPath();
  ctx.moveTo(-hw * 0.5, 0);
  ctx.lineTo(hw * 0.5, 0);
  ctx.strokeStyle = `rgba(0,230,178,${panelAlpha})`;
  ctx.lineWidth = 0.6;
  ctx.stroke();

  /* ── ANTENNA ── */
  const antAlpha = Math.min(1, p * 3);
  ctx.beginPath();
  ctx.moveTo(0, -hh / 2);
  ctx.lineTo(0, -hh / 2 - s * 0.18);
  ctx.strokeStyle = `rgba(0,230,178,${antAlpha * 0.7})`;
  ctx.lineWidth = 1.2;
  ctx.stroke();
  /* antenna tip pulse */
  const tipR = s * 0.025 * (1 + 0.25 * Math.sin(t * 3));
  const tipGl = ctx.createRadialGradient(0, -hh / 2 - s * 0.18, 0, 0, -hh / 2 - s * 0.18, tipR * 3);
  tipGl.addColorStop(0, `rgba(0,255,190,${antAlpha * 0.9})`);
  tipGl.addColorStop(1, "rgba(0,255,190,0)");
  ctx.beginPath();
  ctx.arc(0, -hh / 2 - s * 0.18, tipR * 3, 0, Math.PI * 2);
  ctx.fillStyle = tipGl;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(0, -hh / 2 - s * 0.18, tipR, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(0,255,190,${antAlpha})`;
  ctx.fill();

  /* ── EYES ── */
  const eyeY    = -hh * 0.12;
  const eyeW    = s * 0.17;
  const eyeH    = s * 0.095;
  const eyeGap  = s * 0.22;
  const eyeAlpha = Math.min(1, p * 2.5);

  [-1, 1].forEach((side) => {
    const ex = side * eyeGap / 2;

    /* eye socket */
    ctx.beginPath();
    ctx.roundRect(ex - eyeW / 2, eyeY - eyeH / 2, eyeW, eyeH, eyeH * 0.35);
    ctx.strokeStyle = `rgba(0,230,178,${eyeAlpha * 0.55})`;
    ctx.lineWidth = 1;
    ctx.stroke();

    /* eye fill gradient */
    const eyeFill = ctx.createLinearGradient(ex - eyeW / 2, eyeY, ex + eyeW / 2, eyeY);
    eyeFill.addColorStop(0, `rgba(10,80,200,${eyeAlpha * 0.6})`);
    eyeFill.addColorStop(0.5, `rgba(0,230,178,${eyeAlpha * 0.85})`);
    eyeFill.addColorStop(1, `rgba(10,80,200,${eyeAlpha * 0.6})`);
    ctx.beginPath();
    ctx.roundRect(ex - eyeW / 2 + 1, eyeY - eyeH / 2 + 1, eyeW - 2, eyeH - 2, eyeH * 0.3);
    ctx.fillStyle = eyeFill;
    ctx.fill();

    /* scan beam — vertical sweep across eye */
    if (p > 0.3) {
      const scanX = ex - eyeW / 2 + (Math.sin(t * 1.8 + side * 0.9) * 0.5 + 0.5) * eyeW;
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(ex - eyeW / 2, eyeY - eyeH / 2, eyeW, eyeH, eyeH * 0.35);
      ctx.clip();
      const beam = ctx.createLinearGradient(scanX - eyeW * 0.15, eyeY, scanX + eyeW * 0.15, eyeY);
      beam.addColorStop(0, "rgba(255,255,255,0)");
      beam.addColorStop(0.5, `rgba(200,255,240,${eyeAlpha * 0.55})`);
      beam.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = beam;
      ctx.fillRect(ex - eyeW / 2, eyeY - eyeH / 2, eyeW, eyeH);
      ctx.restore();
    }

    /* eye centre dot */
    ctx.beginPath();
    ctx.arc(ex, eyeY, eyeH * 0.22, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${eyeAlpha * 0.9})`;
    ctx.fill();
  });

  /* ── EYE GLOW (external) ── */
  if (p > 0.4) {
    [-1, 1].forEach((side) => {
      const ex  = side * eyeGap / 2;
      const glR = eyeW * 0.9;
      const gl  = ctx.createRadialGradient(ex, eyeY, 0, ex, eyeY, glR);
      gl.addColorStop(0, `rgba(0,230,178,${(p - 0.4) * 0.25})`);
      gl.addColorStop(1, "rgba(0,230,178,0)");
      ctx.beginPath();
      ctx.arc(ex, eyeY, glR, 0, Math.PI * 2);
      ctx.fillStyle = gl;
      ctx.fill();
    });
  }

  /* ── NOSE VENT ── */
  const ventAlpha = Math.min(1, p * 4) * 0.55;
  ctx.beginPath();
  ctx.roundRect(-s * 0.055, hh * 0.04, s * 0.11, s * 0.06, 2);
  ctx.strokeStyle = `rgba(0,230,178,${ventAlpha})`;
  ctx.lineWidth = 0.8;
  ctx.stroke();

  /* ── MOUTH / SPEAKER GRILLE ── */
  const mouthY = hh * 0.22;
  const mouthW = s * 0.38;
  const mouthH = s * 0.09;
  const grillAlpha = Math.min(1, p * 3) * 0.6;

  ctx.beginPath();
  ctx.roundRect(-mouthW / 2, mouthY - mouthH / 2, mouthW, mouthH, 3);
  ctx.strokeStyle = `rgba(0,230,178,${grillAlpha})`;
  ctx.lineWidth = 1;
  ctx.stroke();

  /* grille bars */
  const bars = 7;
  for (let b = 0; b < bars; b++) {
    const bx = -mouthW / 2 + (b + 0.5) * (mouthW / bars);
    /* animated bar height — like a voice waveform */
    const bh = (mouthH - 4) * (0.3 + 0.7 * Math.abs(Math.sin(t * 3.5 + b * 0.8)));
    ctx.beginPath();
    ctx.moveTo(bx, mouthY - bh / 2);
    ctx.lineTo(bx, mouthY + bh / 2);
    ctx.strokeStyle = `rgba(0,230,178,${grillAlpha * 1.4})`;
    ctx.lineWidth = mouthW / bars * 0.45;
    ctx.lineCap = "round";
    ctx.stroke();
  }

  /* ── CHEEK VENTS ── */
  const checkAlpha = Math.min(1, p * 4) * 0.45;
  [-1, 1].forEach((side) => {
    for (let v = 0; v < 3; v++) {
      const vx = side * (hw * 0.39 + (side < 0 ? 0 : -0));
      const vy = -s * 0.05 + v * s * 0.055;
      ctx.beginPath();
      ctx.moveTo(vx - s * 0.05 * side, vy);
      ctx.lineTo(vx - s * 0.13 * side, vy);
      ctx.strokeStyle = `rgba(0,230,178,${checkAlpha})`;
      ctx.lineWidth = 1.2;
      ctx.lineCap = "round";
      ctx.stroke();
    }
  });

  /* ── NECK ── */
  const neckAlpha = Math.min(1, p * 3) * 0.5;
  const neckW = s * 0.24;
  ctx.beginPath();
  ctx.moveTo(-neckW / 2, hh / 2);
  ctx.lineTo(-neckW / 2 - s * 0.04, hh / 2 + s * 0.1);
  ctx.lineTo(neckW / 2 + s * 0.04, hh / 2 + s * 0.1);
  ctx.lineTo(neckW / 2, hh / 2);
  ctx.strokeStyle = `rgba(0,230,178,${neckAlpha})`;
  ctx.lineWidth = 1;
  ctx.stroke();

  /* ── FOREHEAD DISPLAY ── */
  const fdW = s * 0.32, fdH = s * 0.055;
  const fdAlpha = Math.min(1, p * 4) * 0.7;
  ctx.beginPath();
  ctx.roundRect(-fdW / 2, -hh * 0.4, fdW, fdH, 2);
  ctx.strokeStyle = `rgba(0,230,178,${fdAlpha * 0.6})`;
  ctx.lineWidth = 0.8;
  ctx.stroke();
  /* scrolling hex text in forehead display */
  if (p > 0.25) {
    const hexVal = Math.floor(p * 255 * 255).toString(16).toUpperCase().padStart(4, "0");
    ctx.fillStyle = `rgba(0,230,178,${fdAlpha})`;
    ctx.font = `${fdH * 0.75}px 'Share Tech Mono', monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`0x${hexVal}`, 0, -hh * 0.4 + fdH / 2);
  }

  ctx.restore();
}

/* ══════════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════════ */
const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef(0);
  const pRef      = useRef(percent);
  pRef.current    = percent;

  const [logLines,  setLogLines]  = useState<string[]>([]);
  const [loaded,    setLoaded]    = useState(false);
  const [exiting,   setExiting]   = useState(false);
  const [showName,  setShowName]  = useState(false);

  const p = Math.min(100, Math.max(0, percent));

  useEffect(() => { inject(); }, []);

  /* Boot log pump — one line every ~350ms scaled to progress */
  useEffect(() => {
    const maxLines = Math.floor((p / 100) * BOOT_LINES.length);
    setLogLines(BOOT_LINES.slice(0, maxLines));
  }, [p]);

  /* Completion */
  useEffect(() => {
    if (percent >= 100 && !loaded) {
      setLoaded(true);
      setTimeout(() => setShowName(true), 300);
      setTimeout(() => {
        setExiting(true);
        setTimeout(() => {
          import("./utils/initialFX").then((m) => {
            m.initialFX?.();
            setIsLoading(false);
          });
        }, 1100);
      }, 2200);
    }
  }, [percent, loaded]);

  /* Canvas loop */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* ── circuit traces (static positions, drawn progressively) ── */
    type Seg = { x1: number; y1: number; x2: number; y2: number };
    const buildCircuits = (W: number, H: number): Seg[] => {
      const segs: Seg[] = [];
      const cx = W / 2, cy = H / 2;
      const addHV = (x: number, y: number, len: number, horiz: boolean) => {
        segs.push(horiz
          ? { x1: x, y1: y, x2: x + len, y2: y }
          : { x1: x, y1: y, x2: x, y2: y + len });
      };
      /* radiate outward from centre */
      const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1],
                    [-1, -1], [1, -1], [-1, 1], [1, 1]];
      dirs.forEach(([dx, dy]) => {
        let x = cx, y = cy;
        for (let i = 0; i < 6; i++) {
          const len = 30 + Math.random() * 80;
          const horiz = Math.random() > 0.5;
          const nx = x + dx * len * (horiz ? 1 : 0.4);
          const ny = y + dy * len * (horiz ? 0.4 : 1);
          segs.push({ x1: x, y1: y, x2: nx, y2: ny });
          /* add a dot at branch points */
          x = nx; y = ny;
        }
      });
      return segs;
    };

    let circuits: Seg[] = [];
    let t = 0;

    const frame = () => {
      const W = canvas.width, H = canvas.height;
      if (circuits.length === 0) circuits = buildCircuits(W, H);
      const cx = W / 2, cy = H / 2;
      const glow = pRef.current / 100;

      /* background */
      ctx.fillStyle = "rgba(2, 4, 18, 0.22)";
      ctx.fillRect(0, 0, W, H);

      /* ── circuit board traces ── */
      const visibleCount = Math.floor(circuits.length * glow);
      circuits.slice(0, visibleCount).forEach((seg, i) => {
        const age = (visibleCount - i) / Math.max(1, visibleCount);
        ctx.beginPath();
        ctx.moveTo(seg.x1, seg.y1);
        ctx.lineTo(seg.x2, seg.y2);
        ctx.strokeStyle = `rgba(0,230,178,${age * 0.12})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        /* node dot at end */
        ctx.beginPath();
        ctx.arc(seg.x2, seg.y2, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,230,178,${age * 0.25})`;
        ctx.fill();
      });

      /* ── progress ring ── */
      const RING_R = Math.min(W, H) * 0.235;
      const segs   = 60;
      for (let i = 0; i < segs; i++) {
        const frac  = i / segs;
        const filled = frac * 100 <= pRef.current;
        const startA = (frac * Math.PI * 2) - Math.PI / 2;
        const endA   = startA + (Math.PI * 2 / segs) * 0.82;
        ctx.beginPath();
        ctx.arc(cx, cy, RING_R, startA, endA);
        ctx.strokeStyle = filled
          ? `rgba(0,230,178,${0.45 + 0.35 * Math.sin(t * 2 + i * 0.1)})`
          : "rgba(255,255,255,0.04)";
        ctx.lineWidth = 2.8;
        ctx.stroke();
      }

      /* ── robot face ── */
      const faceSize = Math.min(W, H) * 0.32;
      drawRobot(ctx, cx, cy, faceSize, t, glow);

      /* ── percentage text below face ── */
      const pctY = cy + faceSize * 0.55 + 28;
      ctx.fillStyle = `rgba(0,230,178,${0.3 + glow * 0.5})`;
      ctx.font = `700 ${Math.min(W, H) * 0.028}px 'Orbitron', monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${String(Math.floor(pRef.current)).padStart(3, "0")} %`, cx, pctY);

      t += 0.018;
      rafRef.current = requestAnimationFrame(frame);
    };

    rafRef.current = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* ════════════════════════════════════════════
     RENDER
  ════════════════════════════════════════════ */
  return (
    <div
      style={{
        position:      "fixed",
        inset:         0,
        zIndex:        9999,
        background:    "#02040e",
        overflow:      "hidden",
        fontFamily:    "'Share Tech Mono', 'Courier New', monospace",
        transition:    "opacity 1s ease, transform 1s cubic-bezier(.76,0,.24,1)",
        ...(exiting && { opacity: 0, transform: "scale(1.06)", pointerEvents: "none" }),
      }}
    >
      {/* ── Canvas (robot + ring + circuits) ── */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, zIndex: 0 }} />

      {/* ── CRT scanlines ── */}
      <div
        aria-hidden
        style={{
          position:        "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.022) 2px,rgba(0,0,0,.022) 4px)",
        }}
      />

      {/* ── vignette ── */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          background: "radial-gradient(ellipse at center,transparent 38%,rgba(0,0,0,.78) 100%)",
        }}
      />

      {/* ── Unit ID top-left ── */}
      <div
        style={{
          position: "absolute", top: 24, left: 32, zIndex: 5,
          fontFamily: "'Orbitron', monospace",
          fontSize: ".65rem", letterSpacing: ".3em",
          color: "rgba(0,230,178,.45)",
        }}
      >
        UNIT GK-01
      </div>

      {/* ── Status top-right ── */}
      <div
        style={{
          position: "absolute", top: 24, right: 32, zIndex: 5,
          fontSize: ".55rem", letterSpacing: ".2em",
          color: "rgba(0,230,178,.3)",
          display: "flex", alignItems: "center", gap: 10,
        }}
      >
        <span
          style={{
            width: 6, height: 6, borderRadius: "50%",
            background: p >= 100 ? "#00e6b2" : "#ff6b35",
            boxShadow: `0 0 8px ${p >= 100 ? "#00e6b2" : "#ff6b35"}`,
            display: "inline-block",
            animation: "gk-blink 1.2s step-end infinite",
          }}
        />
        {p >= 100 ? "ONLINE" : "BOOTING"}
      </div>

      {/* ── Boot log — left column ── */}
      <div
        style={{
          position: "absolute", left: 32, bottom: 80, zIndex: 5,
          width: "clamp(220px, 22vw, 340px)",
          display: "flex", flexDirection: "column", gap: 3,
          maxHeight: "40vh", overflow: "hidden",
        }}
      >
        {logLines.map((line, i) => (
          <div
            key={i}
            style={{
              fontSize: ".5rem", letterSpacing: ".12em",
              color: line.includes("UNIT GK-01 ONLINE")
                ? "#00e6b2"
                : "rgba(0,230,178,.38)",
              fontWeight: line.includes("UNIT GK-01 ONLINE") ? 700 : 400,
              animation: "gk-logline .3s ease both",
              whiteSpace: "nowrap",
            }}
          >
            {i === logLines.length - 1 && !line.includes("ONLINE") ? (
              <>
                {line}&nbsp;
                <span style={{ animation: "gk-blink .8s step-end infinite", color: "#00e6b2" }}>█</span>
              </>
            ) : (
              line
            )}
          </div>
        ))}
      </div>

      {/* ── AIML specs — right column ── */}
      <div
        style={{
          position: "absolute", right: 32, bottom: 80, zIndex: 5,
          display: "flex", flexDirection: "column", gap: 5, alignItems: "flex-end",
        }}
      >
        {[
          ["MODEL",    "TRANSFORMER v9"],
          ["PARAMS",   "7B"],
          ["CONTEXT",  "128K TOKENS"],
          ["TASK",     "AIML / GENAI"],
        ].map(([k, v], i) => (
          <div
            key={k}
            style={{
              fontSize: ".48rem", letterSpacing: ".18em",
              color: "rgba(0,230,178,.28)",
              opacity: p > i * 25 ? 1 : 0,
              transition: "opacity .4s",
              textAlign: "right",
            }}
          >
            <span style={{ color: "rgba(0,230,178,.15)" }}>{k} </span>
            {v}
          </div>
        ))}
      </div>

      {/* ── Bottom ticker ── */}
      <div
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 5,
          borderTop: "1px solid rgba(0,230,178,.07)",
          padding: "10px 0", overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex", whiteSpace: "nowrap",
            animation: "gk-ticker 20s linear infinite",
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              style={{
                fontSize: ".45rem", letterSpacing: ".22em",
                color: "rgba(0,230,178,.15)", flexShrink: 0,
              }}
            >
              DEEP LEARNING &nbsp;·&nbsp; TRANSFORMERS &nbsp;·&nbsp; COMPUTER VISION &nbsp;·&nbsp; NLP &nbsp;·&nbsp; GENAI &nbsp;·&nbsp; RAG &nbsp;·&nbsp; LLM &nbsp;·&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ════ COMPLETION — NAME REVEAL ════ */}
      {showName && (
        <div
          style={{
            position: "absolute", inset: 0, zIndex: 20,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            background: "rgba(2,4,14,.94)",
            backdropFilter: "blur(14px)",
            animation: "gk-fadein .5s ease both",
          }}
        >
          {/* scan line sweep */}
          <div
            style={{
              position: "absolute", left: 0, right: 0, height: "2px",
              background: "linear-gradient(90deg,transparent,rgba(0,230,178,.5),transparent)",
              animation: "gk-scan .8s ease both",
            }}
          />

          {/* NAME */}
          <div
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "clamp(2rem, 7vw, 6rem)",
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: ".06em",
              lineHeight: 1,
              animation: "gk-name 1s cubic-bezier(.22,1,.36,1) both",
              textShadow: "0 0 40px rgba(0,230,178,.3)",
            }}
          >
            GOUTHUM
          </div>
          <div
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "clamp(2rem, 7vw, 6rem)",
              fontWeight: 900,
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(0,230,178,.7)",
              letterSpacing: ".06em",
              lineHeight: 1,
              animation: "gk-name 1s .15s cubic-bezier(.22,1,.36,1) both",
            }}
          >
            KHARVI
          </div>

          {/* ROLE */}
          <div
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "clamp(.7rem, 1.8vw, 1.3rem)",
              letterSpacing: ".55em",
              color: "#00e6b2",
              marginTop: 20,
              fontWeight: 400,
              animation: "gk-role .7s .6s ease both",
              opacity: 0,
            }}
          >
            AIML DEVELOPER
          </div>

          {/* unit badge */}
          <div
            style={{
              marginTop: 28,
              fontSize: ".5rem", letterSpacing: ".28em",
              color: "rgba(0,230,178,.3)",
              border: "1px solid rgba(0,230,178,.15)",
              padding: "5px 18px", borderRadius: "2px",
              animation: "gk-fadein .5s 1s ease both",
              opacity: 0,
            }}
          >
            UNIT GK-01 · NEURAL SYSTEMS ACTIVE
          </div>
        </div>
      )}
    </div>
  );
};

export default Loading;