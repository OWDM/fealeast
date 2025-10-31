"use client";

import { useEffect, useRef } from "react";

type AnimationType = "waves" | "particles" | "gradient-mesh" | "geometric";

interface AnimatedBackgroundProps {
  type?: AnimationType;
}

/**
 * AnimatedBackground - Provides various animated background effects
 * Supports: waves, particles, gradient-mesh, and geometric patterns
 */
export default function AnimatedBackground({ type = "gradient-mesh" }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log("Canvas not found");
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.log("Context not found");
      return;
    }

    // Set canvas size to match parent element
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
        console.log("Canvas resized:", canvas.width, canvas.height);
      }
    };

    // Initial resize with a slight delay to ensure DOM is ready
    setTimeout(resizeCanvas, 0);
    window.addEventListener("resize", resizeCanvas);

    let animationFrameId: number;
    let time = 0;

    // Gradient Mesh Animation (default - most subtle and professional)
    const animateGradientMesh = () => {
      time += 0.003;

      if (time === 0.003) {
        console.log("Animation started - gradient mesh");
      }

      ctx.fillStyle = "#ED741F"; // primary-600
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create multiple gradient circles that move slowly
      const circles = [
        { x: 0.3, y: 0.5, radius: 0.4, speed: 1 },
        { x: 0.7, y: 0.3, radius: 0.5, speed: -0.8 },
        { x: 0.5, y: 0.7, radius: 0.35, speed: 1.2 },
      ];

      circles.forEach((circle, i) => {
        const x = canvas.width * (circle.x + Math.sin(time * circle.speed) * 0.1);
        const y = canvas.height * (circle.y + Math.cos(time * circle.speed * 0.8) * 0.1);
        const radius = Math.min(canvas.width, canvas.height) * circle.radius;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `rgba(249, 115, 22, 0.6)`); // Lighter orange
        gradient.addColorStop(0.5, `rgba(237, 116, 31, 0.3)`); // primary-600 with opacity
        gradient.addColorStop(1, "rgba(237, 116, 31, 0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      animationFrameId = requestAnimationFrame(animateGradientMesh);
    };

    // Particle Field Animation
    const animateParticles = () => {
      time += 0.01;

      // Background gradient
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      bgGradient.addColorStop(0, "#ED741F"); // primary-600
      bgGradient.addColorStop(1, "#C2410C"); // primary-800
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      const particleCount = 50;
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";

      for (let i = 0; i < particleCount; i++) {
        const x = (canvas.width * ((i * 0.618) % 1)) + Math.sin(time + i) * 30;
        const y = (canvas.height * ((i * 0.382) % 1)) + Math.cos(time + i * 0.5) * 30;
        const size = 2 + Math.sin(time + i) * 1;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animateParticles);
    };

    // Wavy Lines Animation
    const animateWaves = () => {
      time += 0.01;

      // Background gradient
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      bgGradient.addColorStop(0, "#ED741F"); // primary-600
      bgGradient.addColorStop(1, "#C2410C"); // primary-800
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw waves
      const waves = [
        { amplitude: 30, frequency: 0.02, speed: 0.5, opacity: 0.2 },
        { amplitude: 40, frequency: 0.015, speed: -0.3, opacity: 0.15 },
        { amplitude: 25, frequency: 0.025, speed: 0.7, opacity: 0.25 },
      ];

      waves.forEach((wave) => {
        ctx.strokeStyle = `rgba(255, 255, 255, ${wave.opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();

        for (let x = 0; x < canvas.width; x += 5) {
          const y = canvas.height / 2 +
            Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude +
            Math.sin(x * wave.frequency * 0.5 + time * wave.speed * 0.7) * wave.amplitude * 0.5;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(animateWaves);
    };

    // Geometric Pattern Animation
    const animateGeometric = () => {
      time += 0.005;

      // Background gradient
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      bgGradient.addColorStop(0, "#ED741F"); // primary-600
      bgGradient.addColorStop(1, "#C2410C"); // primary-800
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw geometric grid
      const gridSize = 80;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = 1;

      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const offset = Math.sin(time + x * 0.01 + y * 0.01) * 10;

          ctx.beginPath();
          ctx.moveTo(x + offset, y);
          ctx.lineTo(x + gridSize + offset, y);
          ctx.lineTo(x + gridSize + offset, y + gridSize);
          ctx.lineTo(x + offset, y + gridSize);
          ctx.closePath();
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(animateGeometric);
    };

    // Start animation based on type
    switch (type) {
      case "particles":
        animateParticles();
        break;
      case "waves":
        animateWaves();
        break;
      case "geometric":
        animateGeometric();
        break;
      case "gradient-mesh":
      default:
        animateGradientMesh();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [type]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{
        mixBlendMode: "normal",
        width: "100%",
        height: "100%",
        display: "block"
      }}
    />
  );
}
