"use client";

import { useEffect, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";

interface SilkProps {
  className?: string;
  colors?: string[];
  speed?: number;
  opacity?: number;
  layers?: number;
  curvature?: number;
}

export function Silk({
  className,
  colors = ["#ED7D1E", "#D946EF", "#3B82F6", "#06B6D4"],
  speed = 0.1,
  opacity = 0.3,
  layers = 4,
  curvature = 0.5,
}: SilkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  const gradients = useMemo(() => {
    return colors.map((color) => {
      const canvas = canvasRef.current;
      if (!canvas) return null;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, color);
      gradient.addColorStop(0.5, color + "80");
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

    const silkLayers = Array.from({ length: layers }, (_, i) => ({
      offset: (i / layers) * Math.PI * 2,
      amplitude: 30 + i * 15,
      frequency: 0.003 + i * 0.001,
      speed: speed * (0.8 + i * 0.15),
      colorIndex: i % gradients.length,
      phase: i * 0.5,
      yOffset: (i / (layers - 1)) * 0.6 + 0.2,
    }));

    const animate = () => {
      timeRef.current += 0.008;
      mouse.x += (targetMouse.x - mouse.x) * 0.03;
      mouse.y += (targetMouse.y - mouse.y) * 0.03;

      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = opacity;

      silkLayers.forEach((layer) => {
        const gradient = gradients[layer.colorIndex % gradients.length];
        if (!gradient) return;

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 5) {
          const normalizedX = x / width;
          const wave1 = Math.sin(normalizedX * Math.PI * 2 * layer.frequency * width + timeRef.current * layer.speed + layer.offset) * layer.amplitude;
          const wave2 = Math.sin(normalizedX * Math.PI * 2 * layer.frequency * width * 1.7 + timeRef.current * layer.speed * 1.3 + layer.offset + layer.phase) * layer.amplitude * 0.4;
          const wave3 = Math.sin(normalizedX * Math.PI * 2 * layer.frequency * width * 0.6 + timeRef.current * layer.speed * 0.7 + layer.offset - layer.phase) * layer.amplitude * 0.25;

          const mouseInfluenceX = (mouse.x - 0.5) * 40 * curvature;
          const mouseInfluenceY = (mouse.y - layer.yOffset) * 60 * curvature;

          const y = height * layer.yOffset + wave1 + wave2 + wave3 + mouseInfluenceY;

          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fill();
      });

      ctx.globalAlpha = 1;

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [colors, speed, opacity, layers, curvature, gradients]);

  return (
    <div
      className={cn("absolute inset-0 overflow-hidden -z-10", className)}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}