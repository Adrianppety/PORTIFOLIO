"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { cn } from "@/lib/utils";

interface TechTextProps {
  text: string;
  className?: string;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  dashColor?: string;
  dashLength?: number;
  gapLength?: number;
  animationSpeed?: number;
  interactRadius?: number;
}

interface CharData {
  char: string;
  x: number;
  y: number;
  width: number;
  paths: Path2D[];
  isHovered: boolean;
  hoverProgress: number;
}

export function TechText({
  text,
  className,
  fontSize = "clamp(1.5rem, 4vw, 3rem)",
  fontWeight = "600",
  color = "#ffffff",
  dashColor = "#ED7D1E",
  dashLength = 8,
  gapLength = 4,
  animationSpeed = 0.5,
  interactRadius = 100,
}: TechTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const charsRef = useRef<CharData[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const timeRef = useRef(0);

  const fontString = useMemo(() => `${fontWeight} ${fontSize} system-ui, sans-serif`, [fontSize, fontWeight]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const container = containerRef.current;

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

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) * window.devicePixelRatio;
      mouseRef.current.y = (e.clientY - rect.top) * window.devicePixelRatio;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    ctx.font = fontString;
    const textWidth = ctx.measureText(text).width;
    const textHeight = parseInt(fontSize.replace("rem", "")) * 16 || 48;

    const centerX = canvas.width / window.devicePixelRatio / 2;
    const centerY = canvas.height / window.devicePixelRatio / 2;
    const startX = centerX - textWidth / 2;
    const baselineY = centerY + textHeight / 3;

    const chars: CharData[] = [];
    let currentX = startX;

    text.split("").forEach((char) => {
      const metrics = ctx.measureText(char);
      const charWidth = metrics.width;

      const path = new Path2D();
      ctx.font = fontString;
      path.addPath(new Path2D(), new DOMMatrix());
      const textPath = new Path2D();
      // Create a path for the character by drawing it
      ctx.save();
      ctx.translate(currentX, baselineY);
      const glyphPath = new Path2D();
      // We'll approximate with rect for now, but ideally use actual glyph paths
      glyphPath.rect(0, -textHeight * 0.8, charWidth, textHeight);
      ctx.restore();

      chars.push({
        char,
        x: currentX,
        y: baselineY,
        width: charWidth,
        paths: [glyphPath],
        isHovered: false,
        hoverProgress: 0,
      });

      currentX += charWidth;
    });

    charsRef.current = chars;

    const animate = () => {
      timeRef.current += 0.016 * animationSpeed;
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, width, height);

      charsRef.current.forEach((charData) => {
        const dx = mouseRef.current.x / window.devicePixelRatio - charData.x - charData.width / 2;
        const dy = mouseRef.current.y / window.devicePixelRatio - charData.y + textHeight * 0.4;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const isHovered = dist < interactRadius;
        charData.isHovered = isHovered;

        if (isHovered) {
          charData.hoverProgress = Math.min(1, charData.hoverProgress + 0.1);
        } else {
          charData.hoverProgress = Math.max(0, charData.hoverProgress - 0.05);
        }

        ctx.save();
        ctx.translate(charData.x, charData.y);
        ctx.font = fontString;

        if (charData.hoverProgress > 0) {
          const progress = charData.hoverProgress;
          const offset = timeRef.current * 20;

          ctx.strokeStyle = dashColor;
          ctx.lineWidth = 2;
          ctx.setLineDash([dashLength, gapLength]);
          ctx.lineDashOffset = -offset;

          ctx.beginPath();
          ctx.rect(0, -textHeight * 0.8, charData.width, textHeight);
          ctx.stroke();

          ctx.setLineDash([]);
        } else {
          ctx.fillStyle = color;
          ctx.fillText(charData.char, 0, 0);
        }

        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [text, fontSize, fontWeight, color, dashColor, dashLength, gapLength, animationSpeed, interactRadius, fontString, isMounted]);

  if (!isMounted) {
    return (
      <div
        ref={containerRef}
        className={cn("relative min-h-[80px] w-full", className)}
        aria-label={text}
      >
        <div className="absolute inset-0 flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-accent-500 to-primary-700" style={{ fontSize, fontWeight }}>
          {text}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full cursor-crosshair", className)}
      style={{ minHeight: "80px" }}
      aria-label={text}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />
    </div>
  );
}