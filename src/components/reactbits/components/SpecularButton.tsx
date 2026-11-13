"use client";

import { useRef, useState, useEffect, forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SpecularButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  children: React.ReactNode;
}

export const SpecularButton = forwardRef<HTMLButtonElement, SpecularButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);
    const [pressed, setPressed] = useState(false);
    const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);

    const baseStyles = "relative overflow-hidden rounded-xl font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary: "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 focus-visible:ring-primary-500 dark:focus-visible:ring-offset-dark-950",
      secondary: "bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm text-dark-900 dark:text-dark-50 border border-dark-200 dark:border-dark-700 hover:bg-dark-50 dark:hover:bg-dark-700/50 focus-visible:ring-primary-500 dark:focus-visible:ring-offset-dark-950",
      outline: "border-2 border-primary-500 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 focus-visible:ring-primary-500 dark:focus-visible:ring-offset-dark-950",
      ghost: "text-dark-600 dark:text-dark-400 hover:bg-dark-100 dark:hover:bg-dark-800 focus-visible:ring-dark-500 dark:focus-visible:ring-offset-dark-950",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm gap-1.5",
      md: "px-6 py-3 text-base gap-2",
      lg: "px-8 py-4 text-lg gap-2.5",
    };

    useEffect(() => {
      const button = buttonRef.current;
      if (!button) return;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = button.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      };

      const handleMouseEnter = () => setHovered(true);
      const handleMouseLeave = () => {
        setHovered(false);
        setMousePos({ x: 0, y: 0 });
      };
      const handleMouseDown = () => setPressed(true);
      const handleMouseUp = () => setPressed(false);
      const handleClick = (e: MouseEvent) => {
        const rect = button.getBoundingClientRect();
        setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setTimeout(() => setRipple(null), 600);
      };

      button.addEventListener("mousemove", handleMouseMove);
      button.addEventListener("mouseenter", handleMouseEnter);
      button.addEventListener("mouseleave", handleMouseLeave);
      button.addEventListener("mousedown", handleMouseDown);
      button.addEventListener("mouseup", handleMouseUp);
      button.addEventListener("click", handleClick);

      return () => {
        button.removeEventListener("mousemove", handleMouseMove);
        button.removeEventListener("mouseenter", handleMouseEnter);
        button.removeEventListener("mouseleave", handleMouseLeave);
        button.removeEventListener("mousedown", handleMouseDown);
        button.removeEventListener("mouseup", handleMouseUp);
        button.removeEventListener("click", handleClick);
      };
    }, []);

    return (
      <button
        ref={ref}
        {...props}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        style={{
          "--mouse-x": `${mousePos.x}px`,
          "--mouse-y": `${mousePos.y}px`,
          "--ripple-x": ripple ? `${ripple.x}px` : "50%",
          "--ripple-y": ripple ? `${ripple.y}px` : "50%",
        } as React.CSSProperties}
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{
            transform: `translateX(${hovered ? "0" : "-100%"}) skewX(-20deg)`,
            transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            opacity: hovered ? 1 : 0,
          }}
          aria-hidden="true"
        />

        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.15) 0%, transparent 50%)`,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />

        {ripple && (
          <div
            className="absolute rounded-full bg-white/30 pointer-events-none"
            style={{
              left: `var(--ripple-x)`,
              top: `var(--ripple-y)`,
              width: "0",
              height: "0",
              transform: "translate(-50%, -50%)",
              animation: "ripple 0.6s ease-out forwards",
            }}
            aria-hidden="true"
          />
        )}

        <span className="relative flex items-center justify-center gap-2" style={{ transform: pressed ? "scale(0.98)" : "none", transition: "transform 0.1s ease" }}>
          {isLoading && (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          )}
          {children}
        </span>

        <style jsx>{`
          @keyframes ripple {
            to {
              width: 300px;
              height: 300px;
              opacity: 0;
            }
          }
        `}</style>
      </button>
    );
  }
);

SpecularButton.displayName = "SpecularButton";