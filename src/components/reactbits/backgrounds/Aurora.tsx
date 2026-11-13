"use client";

import { useEffect, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";

interface AuroraProps {
  className?: string;
  colors?: string[];
  speed?: number;
  intensity?: number;
  blur?: number;
  opacity?: number;
}

export function Aurora({
  className,
  colors = ["#014e15", "#87966A", "#3B82F6", "#06B6D4"],
  speed = 0.15,
  intensity = 1,
  blur = 80,
  opacity = 0.6,
}: AuroraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  const gradients = useMemo(() => {
    return colors.map((color, i) => {
      const canvas = canvasRef.current;
      if (!canvas) return null;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(canvas.width, canvas.height));
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
      timeRef.current += 0.008 * speed;
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = opacity;
      ctx.filter = `blur(${blur}px)`;

      const layers = [
        { x: 0.2, y: 0.3, scale: 1.5, phase: 0, colorIndex: 0 },
        { x: 0.8, y: 0.7, scale: 1.2, phase: Math.PI / 2, colorIndex: 1 },
        { x: 0.5, y: 0.5, scale: 2, phase: Math.PI, colorIndex: 2 },
        { x: 0.3, y: 0.8, scale: 1, phase: Math.PI * 1.5, colorIndex: 3 },
      ];

      layers.forEach((layer, i) => {
        const gradient = gradients[i % gradients.length];
        if (!gradient) return;

        const x = width * (layer.x + Math.sin(timeRef.current + layer.phase) * 0.15 * intensity);
        const y = height * (layer.y + Math.cos(timeRef.current * 0.7 + layer.phase) * 0.1 * intensity);
        const radius = Math.max(width, height) * layer.scale * 0.4;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(timeRef.current * 0.05 * (i % 2 === 0 ? 1 : -1));
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(0, 0, radius, radius * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      ctx.filter = "none";
      ctx.globalAlpha = 1;

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [colors, speed, intensity, blur, opacity, gradients]);

  return (
    <div
      className={cn("absolute inset-0 overflow-hidden -z-10", className)}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}