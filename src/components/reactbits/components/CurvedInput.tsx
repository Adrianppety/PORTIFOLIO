"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CurvedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  curveIntensity?: number;
  onChange?: (value: string) => void;
}

export function CurvedInput({
  label,
  error,
  icon,
  curveIntensity = 0.15,
  className,
  onChange,
  ...props
}: CurvedInputProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState(props.defaultValue || "");
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (props.value !== undefined) {
      setValue(props.value);
    }
  }, [props.value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(newValue);
  };

  const curveStyle = {
    "--curve-intensity": curveIntensity,
    "--border-radius": `${24 + curveIntensity * 40}px`,
  } as React.CSSProperties;

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
      style={curveStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 400 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <filter id="goo" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
        <path
          d={`
            M 0,40
            Q 100,${40 - curveIntensity * 80} 200,40
            Q 300,${40 + curveIntensity * 80} 400,40
            L 400,80
            L 0,80
            Z
          `}
          fill="url(#inputGradient)"
          filter="url(#goo)"
          style={{
            fill: focused || hovered ? "rgba(135, 150, 106, 0.18)" : "rgba(255, 255, 255, 0.94)",
            transition: "fill 0.3s ease",
            transform: "translateY(0px)",
          }}
        />
        <linearGradient id="inputGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F8F9F7" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#EFF2EC" stopOpacity="0.98" />
          <stop offset="100%" stopColor="#F8F9F7" stopOpacity="0.95" />
        </linearGradient>
      </svg>

      <div className="relative z-10 flex items-center h-[62px]" style={{ borderRadius: `var(--border-radius)` }}>
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400 dark:text-dark-500 transition-colors duration-200" style={{ color: focused ? "#87966A" : undefined }}>
            {icon}
          </div>
        )}

        <label
          htmlFor={props.id}
          className={cn(
            "absolute left-12 top-1/2 -translate-y-1/2 text-sm font-medium transition-all duration-200 pointer-events-none",
            focused || value
              ? "top-2.5 -translate-y-0 text-[11px] text-primary-500"
              : "text-dark-500 dark:text-dark-400"
          )}
          style={{ left: icon ? "48px" : "16px" }}
        >
          {label}
        </label>

        <input
          ref={inputRef}
          {...props}
          value={value}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            "w-full bg-transparent border-none outline-none px-4 py-4 text-dark-900 dark:text-white placeholder-transparent",
            "transition-colors duration-200",
            icon ? "pl-12" : "pl-4",
            "h-[62px]"
          )}
          style={{
            fontSize: focused || value ? "0.875rem" : "1rem",
            borderRadius: `var(--border-radius)`,
            lineHeight: "1.4",
          }}
        />

        <div
          className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300"
          style={{
            width: focused ? "100%" : "0",
            left: focused ? "0" : "50%",
            transform: focused ? "none" : "translateX(-50%)",
          }}
          aria-hidden="true"
        />
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-500 flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </motion.p>
      )}
    </div>
  );
}

interface CurvedTextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  curveIntensity?: number;
  onChange?: (value: string) => void;
}

import { motion } from "framer-motion";

export function CurvedTextarea({
  label,
  error,
  icon,
  curveIntensity = 0.15,
  className,
  onChange,
  ...props
}: CurvedTextareaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState(props.defaultValue || "");
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (props.value !== undefined) {
      setValue(props.value);
    }
  }, [props.value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(newValue);
  };

  const curveStyle = {
    "--curve-intensity": curveIntensity,
    "--border-radius": `${24 + curveIntensity * 40}px`,
  } as React.CSSProperties;

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
      style={curveStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 400 160"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <filter id="gooTextarea" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
        <path
          d={`
            M 0,80
            Q 100,${80 - curveIntensity * 120} 200,80
            Q 300,${80 + curveIntensity * 120} 400,80
            L 400,160
            L 0,160
            Z
          `}
          fill="url(#textareaGradient)"
          filter="url(#gooTextarea)"
          style={{
            fill: focused || hovered ? "rgba(135, 150, 106, 0.18)" : "rgba(255, 255, 255, 0.94)",
            transition: "fill 0.3s ease",
          }}
        />
        <linearGradient id="textareaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F8F9F7" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#EFF2EC" stopOpacity="0.98" />
          <stop offset="100%" stopColor="#F8F9F7" stopOpacity="0.95" />
        </linearGradient>
      </svg>

      <div className="relative z-10 flex items-start" style={{ borderRadius: `var(--border-radius)`, minHeight: "120px" }}>
        {icon && (
          <div className="absolute left-4 top-5 text-dark-400 dark:text-dark-500 transition-colors duration-200" style={{ color: focused ? "#87966A" : undefined }}>
            {icon}
          </div>
        )}

        <label
          htmlFor={props.id}
          className={cn(
            "absolute left-12 top-4 text-sm font-medium transition-all duration-200 pointer-events-none",
            focused || value
              ? "top-2.5 text-[11px] text-primary-500"
              : "text-dark-500 dark:text-dark-400"
          )}
          style={{ left: icon ? "48px" : "16px" }}
        >
          {label}
        </label>

        <textarea
          ref={textareaRef}
          {...props}
          value={value}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            "w-full bg-transparent border-none outline-none px-4 py-4 text-dark-900 dark:text-white placeholder-transparent resize-none",
            "transition-colors duration-200",
            icon ? "pl-12" : "pl-4",
            "pt-8"
          )}
          style={{
            fontSize: focused || value ? "0.875rem" : "1rem",
            borderRadius: `var(--border-radius)`,
            minHeight: "120px",
            fontFamily: "inherit",
            lineHeight: "1.6",
          }}
        />

        <div
          className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300"
          style={{
            width: focused ? "100%" : "0",
            left: focused ? "0" : "50%",
            transform: focused ? "none" : "translateX(-50%)",
          }}
          aria-hidden="true"
        />
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-500 flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </motion.p>
      )}
    </div>
  );
}