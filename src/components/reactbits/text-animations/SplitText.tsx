"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { cn } from "@/lib/utils";

interface SplitTextProps {
  children: React.ReactNode;
  className?: string;
  split?: "chars" | "words" | "lines";
  delay?: number;
  duration?: number;
  stagger?: number;
  easing?: string;
  from?: {
    opacity?: number;
    y?: number;
    x?: number;
    rotateX?: number;
    rotateY?: number;
    scale?: number;
    filter?: string;
  };
  to?: {
    opacity?: number;
    y?: number;
    x?: number;
    rotateX?: number;
    rotateY?: number;
    scale?: number;
    filter?: string;
  };
  onComplete?: () => void;
}

function flattenChildren(children: React.ReactNode): React.ReactNode[] {
  const result: React.ReactNode[] = [];
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      result.push(child);
    } else if (typeof child === "string" || typeof child === "number") {
      result.push(String(child));
    } else if (Array.isArray(child)) {
      result.push(...flattenChildren(child));
    }
  });
  return result;
}

function splitTextNodes(nodes: React.ReactNode[], split: "chars" | "words"): React.ReactNode[] {
  const result: React.ReactNode[] = [];

  nodes.forEach((node) => {
    if (typeof node === "string") {
      const text = node;
      if (split === "chars") {
        text.split("").forEach((char, i) => {
          result.push(<span key={`${text}-char-${i}`} className="inline-block">{char === " " ? " " : char}</span>);
        });
      } else if (split === "words") {
        // Split by words but preserve whitespace
        const words = text.match(/\S+|\s+/g) || [];
        words.forEach((word, i) => {
          result.push(<span key={`${text}-word-${i}`} className="inline-block">{word}</span>);
        });
      }
    } else if (React.isValidElement(node)) {
      // Preserve React elements as-is (they'll be animated as single units)
      result.push(node);
    }
  });

  return result;
}

export function SplitText({
  children,
  className,
  split = "words",
  delay = 0,
  duration = 800,
  stagger = 50,
  easing = "cubic-bezier(0.16, 1, 0.3, 1)",
  from = { opacity: 0, y: 30 },
  to = { opacity: 1, y: 0 },
  onComplete,
}: SplitTextProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStyles, setAnimatedStyles] = useState<string[]>([]);
  const elementRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);

  const processedNodes = useMemo(() => {
    const flatChildren = flattenChildren(children);
    if (split === "chars" || split === "words") {
      return splitTextNodes(flatChildren, split);
    }
    return flatChildren;
  }, [children, split]);

  // Count only the animated items (strings that were split)
  const animatedCount = useMemo(() => {
    let count = 0;
    processedNodes.forEach((node) => {
      if (typeof node === "string") return;
      if (React.isValidElement(node)) {
        const child = node as React.ReactElement;
        if (child.props.className?.includes("inline-block")) {
          count++;
        }
      }
    });
    return count;
  }, [processedNodes]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const timeout = setTimeout(() => {
      const styles: string[] = [];

      for (let i = 0; i < animatedCount; i++) {
        const itemDelay = delay + i * stagger;
        const transformParts: string[] = [];

        if (from.x !== undefined || to.x !== undefined) {
          transformParts.push(`translateX(${from.x || 0}px)`);
        }
        if (from.y !== undefined || to.y !== undefined) {
          transformParts.push(`translateY(${from.y || 0}px)`);
        }
        if (from.rotateX !== undefined) {
          transformParts.push(`rotateX(${from.rotateX}deg)`);
        }
        if (from.rotateY !== undefined) {
          transformParts.push(`rotateY(${from.rotateY}deg)`);
        }
        if (from.scale !== undefined) {
          transformParts.push(`scale(${from.scale})`);
        }

        const fromTransform = transformParts.join(" ") || "none";
        const toTransform = "translateX(0) translateY(0) rotateX(0) rotateY(0) scale(1)";

        styles.push(`
          animation: splitTextReveal${i} ${duration}ms ${easing} forwards;
          animation-delay: ${itemDelay}ms;
          opacity: ${from.opacity ?? 0};
          transform: ${fromTransform};
        `);
      }

      setAnimatedStyles(styles);

      const totalDelay = delay + (animatedCount - 1) * stagger + duration;
      setTimeout(() => {
        if (!completedRef.current) {
          completedRef.current = true;
          onComplete?.();
        }
      }, totalDelay);
    }, 0);

    return () => clearTimeout(timeout);
  }, [isVisible, delay, duration, stagger, easing, from, to, animatedCount, onComplete]);

  const styleSheet = useMemo(() => {
    if (animatedStyles.length === 0) return null;
    return (
      <style jsx>{`
        ${animatedStyles
          .map(
            (style, i) => `
          .split-text-item-${i} {
            ${style}
          }
        `
          )
          .join("")}
        @keyframes splitTextReveal0 {
          to {
            opacity: ${to.opacity ?? 1};
            transform: translateX(0) translateY(0) rotateX(0) rotateY(0) scale(1);
          }
        }
      `}</style>
    );
  }, [animatedStyles, to]);

  // Render with proper classNames for animated items
  const renderedNodes = useMemo(() => {
    let animIndex = 0;
    return processedNodes.map((node, index) => {
      if (typeof node === "string") {
        return <React.Fragment key={`string-${index}`}>{node}</React.Fragment>;
      }
      if (React.isValidElement(node)) {
        const child = node as React.ReactElement;
        const className = child.props.className as string | undefined;
        const isAnimated = className?.includes("inline-block");
        return React.cloneElement(child, {
          key: child.key ?? `element-${index}`,
          className: cn(className, isAnimated ? `split-text-item-${animIndex++}` : ""),
        });
      }
      return <React.Fragment key={`other-${index}`}>{node}</React.Fragment>;
    });
  }, [processedNodes]);

  return (
    <div
      ref={elementRef}
      className={cn("inline-block", className)}
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      {styleSheet}
      {renderedNodes}
    </div>
  );
}

export function RevealText({
  children,
  className,
  split = "words",
  delay = 0,
  duration = 800,
  stagger = 50,
  easing = "cubic-bezier(0.16, 1, 0.3, 1)",
  from = { opacity: 0, y: 20, filter: "blur(8px)" },
  to = { opacity: 1, y: 0, filter: "blur(0px)" },
  onComplete,
}: Omit<SplitTextProps, "split" | "stagger"> & { split?: SplitTextProps["split"]; stagger?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const timeout = setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete?.();
      }
    }, delay + duration);

    return () => clearTimeout(timeout);
  }, [isVisible, delay, duration, onComplete]);

  const style = isVisible
    ? {
        opacity: to.opacity,
        transform: `translateY(${to.y ?? 0}px)`,
        filter: to.filter,
        transition: `all ${duration}ms ${easing} ${delay}ms`,
      }
    : {
        opacity: from.opacity,
        transform: `translateY(${from.y ?? 0}px)`,
        filter: from.filter,
      };

  return (
    <div
      ref={elementRef}
      className={cn(className)}
      style={style}
    >
      {children}
    </div>
  );
}