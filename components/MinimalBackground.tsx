"use client";

import { useEffect, useRef } from "react";

/**
 * MinimalBackground - Very subtle, elegant animated gradient
 * Smooth flowing colors with minimal distraction
 */
export default function MinimalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };

    setTimeout(resizeCanvas, 0);
    window.addEventListener("resize", resizeCanvas);

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += 0.002;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create smooth flowing gradient blobs
      const blob1X = canvas.width * (0.5 + Math.sin(time * 0.5) * 0.15);
      const blob1Y = canvas.height * (0.5 + Math.cos(time * 0.3) * 0.15);

      const blob2X = canvas.width * (0.5 + Math.sin(time * 0.7 + Math.PI) * 0.2);
      const blob2Y = canvas.height * (0.5 + Math.cos(time * 0.5 + Math.PI) * 0.2);

      const blob3X = canvas.width * (0.5 + Math.cos(time * 0.4) * 0.18);
      const blob3Y = canvas.height * (0.5 + Math.sin(time * 0.6) * 0.18);

      // Base gradient
      const baseGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      baseGradient.addColorStop(0, "#ED741F");
      baseGradient.addColorStop(1, "#C2410C");
      ctx.fillStyle = baseGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Blob 1
      const gradient1 = ctx.createRadialGradient(
        blob1X, blob1Y, 0,
        blob1X, blob1Y, canvas.width * 0.5
      );
      gradient1.addColorStop(0, "rgba(251, 146, 60, 0.4)");
      gradient1.addColorStop(1, "rgba(237, 116, 31, 0)");
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Blob 2
      const gradient2 = ctx.createRadialGradient(
        blob2X, blob2Y, 0,
        blob2X, blob2Y, canvas.width * 0.6
      );
      gradient2.addColorStop(0, "rgba(234, 88, 12, 0.4)");
      gradient2.addColorStop(1, "rgba(237, 116, 31, 0)");
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Blob 3
      const gradient3 = ctx.createRadialGradient(
        blob3X, blob3Y, 0,
        blob3X, blob3Y, canvas.width * 0.55
      );
      gradient3.addColorStop(0, "rgba(194, 65, 12, 0.4)");
      gradient3.addColorStop(1, "rgba(237, 116, 31, 0)");
      ctx.fillStyle = gradient3;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}
