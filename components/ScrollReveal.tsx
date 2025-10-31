"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale-up";
  delay?: number;
  duration?: number;
}

/**
 * ScrollReveal - Animates elements when they scroll into view
 * Uses Intersection Observer for performance
 */
export default function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 800,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Once visible, stop observing
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: "0px 0px -50px 0px", // Trigger slightly before element enters viewport
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  // Animation variants
  const animations = {
    "fade-up": {
      initial: { opacity: 0, transform: "translateY(60px)" },
      animate: { opacity: 1, transform: "translateY(0)" },
    },
    "fade-in": {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    "slide-left": {
      initial: { opacity: 0, transform: "translateX(60px)" },
      animate: { opacity: 1, transform: "translateX(0)" },
    },
    "slide-right": {
      initial: { opacity: 0, transform: "translateX(-60px)" },
      animate: { opacity: 1, transform: "translateX(0)" },
    },
    "scale-up": {
      initial: { opacity: 0, transform: "scale(0.9)" },
      animate: { opacity: 1, transform: "scale(1)" },
    },
  };

  const selectedAnimation = animations[animation];

  return (
    <div
      ref={elementRef}
      style={{
        opacity: isVisible ? selectedAnimation.animate.opacity : selectedAnimation.initial.opacity,
        transform: isVisible ? selectedAnimation.animate.transform : selectedAnimation.initial.transform,
        transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
