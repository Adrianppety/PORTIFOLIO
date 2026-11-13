"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassSurfaceProps {
  children: ReactNode;
  className?: string;
  blur?: number;
  opacity?: number;
  borderOpacity?: number;
  hoverScale?: number;
  interactive?: boolean;
  shape?: "rounded" | "circle" | "custom";
  customBorderRadius?: string;
}

export function GlassSurface({
  children,
  className,
  blur = 20,
  opacity = 0.1,
  borderOpacity = 0.2,
  hoverScale = 1.02,
  interactive = true,
  shape = "rounded",
  customBorderRadius,
}: GlassSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!interactive) return;

    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };

    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [interactive]);

  const borderRadius = shape === "circle" ? "50%" : shape === "custom" ? customBorderRadius : "1.5rem";

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden backdrop-blur-xl",
        interactive && "transition-all duration-300 cursor-pointer",
        className
      )}
      style={{
        borderRadius,
        background: `rgba(255, 255, 255, ${opacity})`,
        border: `1px solid rgba(255, 255, 255, ${borderOpacity})`,
        boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.08),
          inset 0 1px 0 rgba(255, 255, 255, 0.2),
          inset 0 -1px 0 rgba(0, 0, 0, 0.05)
        `,
        transform: hovered && interactive ? `scale(${hoverScale})` : "scale(1)",
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
      } as React.CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse at ${mousePos.x * 100}% ${mousePos.y * 100}%,
              rgba(237, 125, 30, 0.08) 0%,
              rgba(217, 70, 239, 0.05) 30%,
              transparent 60%
            )
          `,
          opacity: hovered ? 1 : 0.3,
          transition: "opacity 0.5s ease, background 0.3s ease",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.1) 0%,
              transparent 50%,
              rgba(0, 0, 0, 0.02) 100%
            )
          `,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 p-6">{children}</div>

      <style jsx>{`
        .dark & {
          background: rgba(15, 23, 42, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}

interface GlassMorphismCardProps {
  children: ReactNode;
  className?: string;
  image?: string;
  title?: string;
  description?: string;
  action?: ReactNode;
  interactive?: boolean;
}

export function GlassMorphismCard({
  children,
  className,
  image,
  title,
  description,
  action,
  interactive = true,
}: GlassMorphismCardProps) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className={cn("group relative overflow-hidden", className)}
      style={{
        borderRadius: "1.5rem",
        background: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(226, 232, 240, 0.5)",
        boxShadow: hovered
          ? `
            0 20px 48px rgba(0, 0, 0, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.3),
            0 0 0 1px rgba(237, 125, 30, 0.2)
          `
          : `
            0 4px 24px rgba(0, 0, 0, 0.06),
            inset 0 1px 0 rgba(255, 255, 255, 0.3)
          `,
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: hovered ? "translateY(-8px) scale(1.01)" : "none",
      } as React.CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {image && (
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(30px) saturate(1.5)",
            opacity: 0.3,
            transform: hovered ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.6s ease, opacity 0.3s ease",
          }}
          aria-hidden="true"
        />
      )}

      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.15) 0%,
              transparent 40%,
              rgba(237, 125, 30, 0.05) 100%
            )
          `,
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 0.3s ease",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 p-6 flex flex-col h-full">
        {title && (
          <h3 className="font-display text-xl font-bold text-dark-950 dark:text-white mb-2 group-hover:text-primary-500 transition-colors">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-dark-600 dark:text-white/75 leading-relaxed flex-1 mb-4">
            {description}
          </p>
        )}
        {action && (
          <div className="mt-auto pt-4">
            {action}
          </div>
        )}
        {children}
      </div>

      <style jsx>{`
        .dark & {
          background: rgba(15, 23, 42, 0.7);
          border: 1px solid rgba(51, 65, 85, 0.5);
          box-shadow:
            0 4px 24px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }
        .dark &:hover {
          box-shadow:
            0 20px 48px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            0 0 0 1px rgba(237, 125, 30, 0.3);
        }
      `}</style>
    </div>
  );
}