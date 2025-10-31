"use client";

import { useEffect, useRef } from "react";

interface Bubble {
  x: number;
  y: number;
  radius: number;
  speed: number;
  wobble: number;
  wobbleSpeed: number;
}

interface Molecule {
  x: number;
  y: number;
  radius: number;
  speed: number;
  angle: number;
  rotationSpeed: number;
}

/**
 * ChemistryBackground - Animated background with bubbles and molecular structures
 * Perfect for a scientific/chemistry company
 */
export default function ChemistryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };

    setTimeout(resizeCanvas, 0);
    window.addEventListener("resize", resizeCanvas);

    // Initialize bubbles
    const bubbles: Bubble[] = [];
    const bubbleCount = 25;

    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 200,
        radius: 5 + Math.random() * 25,
        speed: 0.3 + Math.random() * 0.8,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.02 + Math.random() * 0.03,
      });
    }

    // Initialize molecules (simple atomic structures)
    const molecules: Molecule[] = [];
    const moleculeCount = 15;

    for (let i = 0; i < moleculeCount; i++) {
      molecules.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 8 + Math.random() * 12,
        speed: 0.2 + Math.random() * 0.4,
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: 0.005 + Math.random() * 0.01,
      });
    }

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += 0.01;

      // Create gradient background (water/liquid effect)
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#ED741F"); // primary-600
      gradient.addColorStop(0.5, "#EA580C"); // primary-700
      gradient.addColorStop(1, "#C2410C"); // primary-800
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add flowing liquid effect (waves)
      ctx.save();
      ctx.globalAlpha = 0.1;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        ctx.lineWidth = 2;

        for (let x = 0; x < canvas.width; x += 5) {
          const y =
            canvas.height * (0.3 + i * 0.2) +
            Math.sin((x * 0.01 + time + i) * 0.5) * 30 +
            Math.cos((x * 0.008 + time * 0.7) * 0.5) * 20;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }
      ctx.restore();

      // Draw and update molecules
      molecules.forEach((molecule) => {
        // Update position
        molecule.angle += molecule.rotationSpeed;
        molecule.x += Math.cos(molecule.angle) * molecule.speed;
        molecule.y += Math.sin(molecule.angle) * molecule.speed;

        // Wrap around edges
        if (molecule.x < -50) molecule.x = canvas.width + 50;
        if (molecule.x > canvas.width + 50) molecule.x = -50;
        if (molecule.y < -50) molecule.y = canvas.height + 50;
        if (molecule.y > canvas.height + 50) molecule.y = -50;

        // Draw molecule (atom with electrons)
        ctx.save();

        // Draw electron orbits
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.lineWidth = 1;

        // First orbit
        ctx.beginPath();
        ctx.arc(molecule.x, molecule.y, molecule.radius * 2, 0, Math.PI * 2);
        ctx.stroke();

        // Second orbit (tilted)
        ctx.beginPath();
        ctx.ellipse(
          molecule.x,
          molecule.y,
          molecule.radius * 2,
          molecule.radius * 1.2,
          Math.PI / 4,
          0,
          Math.PI * 2
        );
        ctx.stroke();

        // Draw electrons
        const electronAngle1 = time * 2 + molecule.x * 0.01;
        const electronAngle2 = time * 2 + molecule.x * 0.01 + Math.PI;

        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.beginPath();
        ctx.arc(
          molecule.x + Math.cos(electronAngle1) * molecule.radius * 2,
          molecule.y + Math.sin(electronAngle1) * molecule.radius * 2,
          2,
          0,
          Math.PI * 2
        );
        ctx.fill();

        ctx.beginPath();
        ctx.arc(
          molecule.x + Math.cos(electronAngle2) * molecule.radius * 2,
          molecule.y + Math.sin(electronAngle2) * molecule.radius * 2,
          2,
          0,
          Math.PI * 2
        );
        ctx.fill();

        // Draw nucleus (center atom)
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.beginPath();
        ctx.arc(molecule.x, molecule.y, molecule.radius * 0.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      // Draw and update bubbles
      bubbles.forEach((bubble) => {
        // Update bubble position
        bubble.y -= bubble.speed;
        bubble.wobble += bubble.wobbleSpeed;
        bubble.x += Math.sin(bubble.wobble) * 0.5;

        // Reset bubble when it reaches the top
        if (bubble.y + bubble.radius < -50) {
          bubble.y = canvas.height + bubble.radius + 50;
          bubble.x = Math.random() * canvas.width;
        }

        // Draw bubble with gradient
        const bubbleGradient = ctx.createRadialGradient(
          bubble.x - bubble.radius * 0.3,
          bubble.y - bubble.radius * 0.3,
          0,
          bubble.x,
          bubble.y,
          bubble.radius
        );
        bubbleGradient.addColorStop(0, "rgba(255, 255, 255, 0.4)");
        bubbleGradient.addColorStop(0.5, "rgba(255, 255, 255, 0.2)");
        bubbleGradient.addColorStop(1, "rgba(255, 255, 255, 0.05)");

        ctx.fillStyle = bubbleGradient;
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw bubble highlight
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.beginPath();
        ctx.arc(
          bubble.x - bubble.radius * 0.3,
          bubble.y - bubble.radius * 0.3,
          bubble.radius * 0.2,
          0,
          Math.PI * 2
        );
        ctx.fill();

        // Draw bubble outline
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.stroke();
      });

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
