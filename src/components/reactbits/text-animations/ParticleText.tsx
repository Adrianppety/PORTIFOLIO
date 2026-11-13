"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

interface ParticleTextProps {
  text: string;
  className?: string;
  particleCount?: number;
  particleSize?: number;
  colors?: string[];
  speed?: number;
  ease?: number;
  fontSize?: string;
  fontWeight?: string;
  onComplete?: () => void;
}

export function ParticleText({
  text,
  className,
  particleCount = 150,
  particleSize = 2,
  colors = ["#87966A", "#A4B487", "#E7E9DE"],
  speed = 0.08,
  ease = 0.12,
  fontSize = "clamp(3rem, 8vw, 7rem)",
  fontWeight = "800",
  onComplete,
}: ParticleTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const targetPositionsRef = useRef<{ x: number; y: number }[]>([]);
  const [isAssembled, setIsAssembled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const assembledNotified = useRef(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const container = containerRef.current!;
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = rect.width * pixelRatio;
      canvas.height = rect.height * pixelRatio;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const textCanvas = document.createElement("canvas");
      textCanvas.width = Math.ceil(rect.width);
      textCanvas.height = Math.ceil(rect.height);
      const textCtx = textCanvas.getContext("2d");
      if (!textCtx) return;

      textCtx.font = `${fontWeight} ${window.getComputedStyle(container).fontSize} system-ui, sans-serif`;
      textCtx.textAlign = "center";
      textCtx.textBaseline = "middle";
      textCtx.fillStyle = "#fff";
      textCtx.fillText(text, rect.width / 2, rect.height / 2, Math.max(0, rect.width - 16));

      const imageData = textCtx.getImageData(0, 0, textCanvas.width, textCanvas.height);
      const gap = Math.max(1, Math.floor(Math.sqrt((rect.width * rect.height) / particleCount)));
      const targets: { x: number; y: number }[] = [];

      for (let y = 0; y < imageData.height; y += gap) {
        for (let x = 0; x < imageData.width; x += gap) {
          const index = (y * imageData.width + x) * 4 + 3;
          if (imageData.data[index] > 128) {
            targets.push({ x, y });
          }
        }
      }

      targetPositionsRef.current = targets;
      particlesRef.current.forEach((particle, index) => {
        const target = targets[index % targets.length] || { x: rect.width / 2, y: rect.height / 2 };
        particle.targetX = target.x;
        particle.targetY = target.y;
      });
    };

    resize();
    const rect = container.getBoundingClientRect();
    const targets = targetPositionsRef.current;

    particlesRef.current = Array.from({ length: particleCount }, (_, i) => {
      const target = targets[i % targets.length] || { x: rect.width / 2, y: rect.height / 2 };
      return {
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        targetX: target.x,
        targetY: target.y,
        vx: 0,
        vy: 0,
        size: particleSize * (0.5 + Math.random() * 1.5),
        opacity: 0.3 + Math.random() * 0.7,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });

    window.addEventListener("resize", resize);

    let assembled = false;
    canvas.style.opacity = "1";

    const animate = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / pixelRatio, canvas.height / pixelRatio);

      let allAssembled = true;

      particlesRef.current.forEach((p) => {
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 1) {
          allAssembled = false;
          p.vx += dx * speed;
          p.vy += dy * speed;
        } else {
          p.vx *= 0.9;
          p.vy *= 0.9;
        }

        p.vx *= 1 - ease;
        p.vy *= 1 - ease;
        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      if (allAssembled && !assembled) {
        assembled = true;
        canvas.style.opacity = "0";
        setIsAssembled(true);
        if (onComplete && !assembledNotified.current) {
          assembledNotified.current = true;
          setTimeout(onComplete, 500);
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [text, fontSize, fontWeight, particleCount, particleSize, colors, speed, ease, isMounted, onComplete]);

  if (!isMounted) {
    return (
      <div
        ref={containerRef}
        className={cn("relative min-h-[200px] w-full", className)}
        style={{ minHeight: "200px", fontSize, fontWeight }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
      style={{ minHeight: "200px", fontSize, fontWeight }}
      aria-label={text}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />
      {isAssembled && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
          style={{
            fontSize,
            fontWeight,
            background: "linear-gradient(135deg, #1f2a1c 0%, #3e4f2e 35%, #6b7c52 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            whiteSpace: "nowrap",
            textShadow: "none",
            filter: "saturate(0.9)",
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
}