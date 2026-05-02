"use client";
import { useRef, useEffect, useCallback, useState, FC, ReactNode } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  r: number;
  color: string;
  phase: number;
}

const COLORS = [
  "#ffffff",
  "#ffe066",
  "#66d9ff",
  "#ff88cc",
  "#aaffaa",
  "#ffaa55",
];

export const ScratchCard: FC<{
  width?: number;
  height?: number;
  image?: string;
  finishPercent?: number;
  onComplete?: () => void;
  brushSize?: number;
  children?: ReactNode;
  color?: string;
}> = ({
  width = 300,
  height = 150,
  image = "",
  finishPercent = 60,
  onComplete = () => {},
  brushSize = 30,
  children,
  color,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparkCanvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef<boolean>(false);
  const lastPositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const autoRevealedRef = useRef<boolean>(false);
  const [canvasLoaded, setCanvasLoaded] = useState<boolean>(false);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);

  // --- Sparkle helpers ---

  const spawnParticle = useCallback((x: number, y: number, burst = false) => {
    const angle = Math.random() * Math.PI * 2;
    const spd = (0.5 + Math.random()) * (burst ? 5 : 2.5);
    particlesRef.current.push({
      x,
      y,
      vx: Math.cos(angle) * spd,
      vy: Math.sin(angle) * spd - (burst ? 2 : 0.5),
      life: 1,
      decay: burst
        ? 0.018 + Math.random() * 0.012
        : 0.012 + Math.random() * 0.01,
      r: (0.5 + Math.random()) * (burst ? 3 : 1.8),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      phase: Math.random() * Math.PI * 2,
    });
  }, []);

  const spawnBurst = useCallback(
    (x: number, y: number, count = 40) => {
      for (let i = 0; i < count; i++) spawnParticle(x, y, true);
    },
    [spawnParticle],
  );

  const drawStar = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    r: number,
  ) => {
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2;
      ctx.lineTo(x + Math.cos(a) * r * 3, y + Math.sin(a) * r * 3);
      ctx.lineTo(
        x + Math.cos(a + Math.PI / 4) * r,
        y + Math.sin(a + Math.PI / 4) * r,
      );
    }
    ctx.closePath();
    ctx.fill();
  };

  useEffect(() => {
    const sc = sparkCanvasRef.current;
    if (!sc) return;
    sc.width = width;
    sc.height = height;
    const ctx = sc.getContext("2d")!;
    let t = 0;

    // Ambient ambient idle sparks
    const ambientTimer = setInterval(() => {
      if (!autoRevealedRef.current) {
        spawnParticle(Math.random() * width, Math.random() * height);
      }
    }, 80);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      t++;
      const alive: Particle[] = [];
      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04;
        p.life -= p.decay;
        if (p.life <= 0) continue;
        const twinkle = 0.5 + 0.5 * Math.sin(t * 0.15 + p.phase);
        ctx.save();
        ctx.globalAlpha = p.life * twinkle;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.r * 5;
        drawStar(ctx, p.x, p.y, p.r);
        ctx.restore();
        alive.push(p);
      }
      particlesRef.current = alive;
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      clearInterval(ambientTimer);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [width, height, spawnParticle]);

  // --- Original ScratchCard logic (unchanged) ---

  const getMousePosition = (
    canvas: HTMLCanvasElement | null,
    event: MouseEvent | TouchEvent,
  ) => {
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ("clientX" in event) {
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    }
    return {
      x: event.touches[0].clientX - rect.left,
      y: event.touches[0].clientY - rect.top,
    };
  };

  const startDrawing = useCallback((event: MouseEvent | TouchEvent) => {
    const ctx = canvasRef.current?.getContext("2d");
    const imageData = ctx?.getImageData(0, 0, width, height);
    const pct = getClearedCanvasPercentage(imageData?.data, width, height);
    if (pct < finishPercent) {
      event.preventDefault();
    }
    isDrawingRef.current = true;
    lastPositionRef.current = getMousePosition(canvasRef.current, event);
  }, []);

  const checkReveal = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const imageData = ctx.getImageData(0, 0, width, height);
      const pct = getClearedCanvasPercentage(imageData.data, width, height);
      // const pixels = imageData.data;
      // let transparentPixels = 0;
      // for (let i = 0; i < pixels.length; i += 4) {
      //   if (pixels[i + 3] === 0) transparentPixels++;
      // }
      // const pct = (transparentPixels / (width * height)) * 100;
      if (pct >= finishPercent && !autoRevealedRef.current) {
        autoRevealedRef.current = true;
        ctx.clearRect(0, 0, width, height);
        // 🎉 Celebratory burst from center
        spawnBurst(width / 2, height / 2, 60);
        onComplete();
      }
    },
    [finishPercent, width, height, onComplete, spawnBurst],
  );

  const draw = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (
        !isDrawingRef.current ||
        autoRevealedRef.current ||
        !canvasRef.current
      )
        return;
      event.preventDefault();
      const ctx = canvasRef.current.getContext("2d");
      const newPosition = getMousePosition(canvasRef.current, event);
      if (ctx) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = brushSize;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(lastPositionRef.current.x, lastPositionRef.current.y);
        ctx.lineTo(newPosition.x, newPosition.y);
        ctx.stroke();
        lastPositionRef.current = newPosition;

        // ✨ Sparks follow the brush
        for (let i = 0; i < 3; i++) {
          spawnParticle(newPosition.x, newPosition.y);
        }

        checkReveal(ctx);
      }
    },
    [brushSize, checkReveal, spawnParticle],
  );

  const stopDrawing = useCallback(() => {
    isDrawingRef.current = false;
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return () => {};
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      if (image) {
        const bg = new Image();
        bg.crossOrigin = "anonymous";
        bg.src = image;
        bg.onload = () => {
          ctx.drawImage(bg, 0, 0, width, height);
          ctx.globalCompositeOperation = "source-over";
          setCanvasLoaded(true);
        };
        bg.onerror = () => console.error("Failed to load image");
      } else {
        ctx.fillStyle = color ?? "#000";
        ctx.fillRect(0, 0, width, height);
        setCanvasLoaded(true);
      }
      canvas.addEventListener("mousedown", startDrawing);
      canvas.addEventListener("mousemove", draw);
      canvas.addEventListener("mouseup", stopDrawing);
      canvas.addEventListener("mouseout", stopDrawing);
      canvas.addEventListener("touchstart", startDrawing, { passive: false });
      canvas.addEventListener("touchmove", draw, { passive: false });
      canvas.addEventListener("touchend", stopDrawing);
    }
    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseout", stopDrawing);
      canvas.removeEventListener("touchstart", startDrawing);
      canvas.removeEventListener("touchmove", draw);
      canvas.removeEventListener("touchend", stopDrawing);
    };
  }, [startDrawing, draw, stopDrawing, image, width, height]);

  return (
    <div className="relative" style={{ width, height }}>
      {/* Sparkle layer — sits behind everything */}
      <canvas
        ref={sparkCanvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 998,
          pointerEvents: "none",
        }}
      />
      {/* Scratch overlay — on top */}
      <div style={{ position: "absolute", zIndex: 999, width, height }}>
        <canvas ref={canvasRef} />
      </div>
      {canvasLoaded && (
        <div style={{ position: "relative", width, height }}>{children}</div>
      )}
    </div>
  );
};

const getClearedCanvasPercentage = (
  pixels: ImageDataArray | undefined,
  width: number,
  height: number,
) => {
  if (!pixels) return 0;
  let transparentPixels = 0;
  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] === 0) transparentPixels++;
  }
  const pct = (transparentPixels / (width * height)) * 100;
  return pct;
};
