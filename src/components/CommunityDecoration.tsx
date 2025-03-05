
import React, { useEffect, useRef } from "react";

const CommunityDecoration: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = 320;
    canvas.height = 320;

    // Particles array
    const particles: Particle[] = [];
    const connectionDistance = 100;
    const particleCount = 40;

    // Create particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        
        // Random color from blue/purple palette
        const colors = [
          "#4f46e5", // indigo-600
          "#6366f1", // indigo-500
          "#818cf8", // indigo-400
          "#7c3aed", // violet-600
          "#8b5cf6", // violet-500
          "#a78bfa", // violet-400
          "#3b82f6", // blue-500
          "#60a5fa"  // blue-400
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        // Update position
        this.x += this.speedX;
        this.y += this.speedY;

        // Boundary check
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx!.fillStyle = this.color;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Function to draw connections between particles
    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            // Make opacity based on distance
            const opacity = 1 - distance / connectionDistance;
            ctx!.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.5})`; // indigo with varying opacity
            ctx!.lineWidth = 0.8;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (const particle of particles) {
        particle.update();
        particle.draw();
      }
      
      // Draw connections
      connectParticles();
      
      // Call the next frame
      requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      // Cancel animation frame if component unmounts
      // (No direct way to cancel a specific requestAnimationFrame)
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-xl"
        style={{ maxWidth: "320px", maxHeight: "320px" }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 animate-pulse-slow opacity-30"></div>
      </div>
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-12 h-12 rounded-full bg-blue-500/20 animate-float-slow"></div>
        <div className="absolute bottom-20 left-14 w-8 h-8 rounded-full bg-purple-500/20 animate-float-medium"></div>
      </div>
    </div>
  );
};

export default CommunityDecoration;
