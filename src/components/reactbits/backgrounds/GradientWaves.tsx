"use client";

import { useEffect, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";

interface GradientWavesProps {
  className?: string;
  colors?: string[];
  speed?: number;
  opacity?: number;
  waveCount?: number;
  amplitude?: number;
  frequency?: number;
}

export function GradientWaves({
  className,
  colors = ["#ED7D1E", "#D946EF", "#3B82F6"],
  speed = 0.1,
  opacity = 0.3,
  waveCount = 3,
  amplitude = 60,
  frequency = 0.008,
}: GradientWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  const gradients = useMemo(() => {
    return colors.map((color) => {
      const canvas = canvasRef.current;
      if (!canvas) return null;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, "transparent");
      return gradient;
    }).filter(Boolean) as CanvasGradient[];
  }, [colors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    const container = canvas.parentElement!;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: 0.5, y: 0.5 };
    const targetMouse = { x: 0.5, y: 0.5 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouse.x = (e.clientX - rect.left) / rect.width;
      targetMouse.y = (e.clientY - rect.top) / rect.height;
    };

    container.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      timeRef.current += 0.01 * speed;
      mouse.x += (targetMouse.x - mouse.x) * 0.02;
      mouse.y += (targetMouse.y - mouse.y) * 0.02;

      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = opacity;

      for (let w = 0; w < waveCount; w++) {
        const gradient = gradients[w % gradients.length];
        if (!gradient) continue;

        const phase = (w / waveCount) * Math.PI * 2;
        const waveAmplitude = amplitude * (0.5 + w * 0.3);
        const waveFrequency = frequency * (1 + w * 0.5);
        const waveSpeed = speed * (0.8 + w * 0.2);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 10) {
          const y = height * 0.5 +
            Math.sin(x * waveFrequency + timeRef.current * waveSpeed + phase) * waveAmplitude +
            Math.sin(x * waveFrequency * 0.7 + timeRef.current * waveSpeed * 1.3 + phase * 1.5) * waveAmplitude * 0.3 +
            (mouse.y - 0.5) * 40 * (1 - w * 0.15);

          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [colors, speed, opacity, waveCount, amplitude, frequency, gradients]);

  return (
    <div
      className={cn("absolute inset-0 overflow-hidden -z-10", className)}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}