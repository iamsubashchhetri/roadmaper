
import React, { useRef, useEffect } from "react";

const ProjectFeatureShowcase: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = 640;
    canvas.height = 320;
    
    // Nodes in our learning path visualization
    const nodes = [
      { id: 1, x: 100, y: 70, radius: 15, label: "HTML", color: "#3b82f6" },
      { id: 2, x: 200, y: 100, radius: 15, label: "CSS", color: "#8b5cf6" },
      { id: 3, x: 300, y: 70, radius: 15, label: "JavaScript", color: "#6366f1" },
      { id: 4, x: 400, y: 100, radius: 15, label: "React", color: "#3b82f6" },
      { id: 5, x: 500, y: 70, radius: 15, label: "Next.js", color: "#8b5cf6" },
      { id: 6, x: 180, y: 180, radius: 15, label: "Node.js", color: "#6366f1" },
      { id: 7, x: 300, y: 220, radius: 15, label: "Express", color: "#3b82f6" },
      { id: 8, x: 420, y: 180, radius: 15, label: "MongoDB", color: "#8b5cf6" },
    ];
    
    // Connections between nodes
    const connections = [
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 3, to: 4 },
      { from: 4, to: 5 },
      { from: 3, to: 6 },
      { from: 6, to: 7 },
      { from: 7, to: 8 },
      { from: 4, to: 8 },
    ];
    
    // Floating particles
    const particles: Array<{x: number, y: number, size: number, speedX: number, speedY: number, color: string}> = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.8,
        color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 255)}, ${Math.random() * 0.5 + 0.1})`
      });
    }
    
    // Animation variables
    let animationProgress = 0;
    const animationSpeed = 0.005;
    let activeNodeIndex = 0;
    let lastTime = 0;
    
    // Animate function
    const animate = (timestamp: number) => {
      if (!ctx) return;
      
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update animation progress
      animationProgress += animationSpeed;
      if (animationProgress >= 1) {
        animationProgress = 0;
        activeNodeIndex = (activeNodeIndex + 1) % nodes.length;
      }
      
      // Draw connections
      connections.forEach(conn => {
        const fromNode = nodes.find(n => n.id === conn.from);
        const toNode = nodes.find(n => n.id === conn.to);
        
        if (fromNode && toNode) {
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          ctx.strokeStyle = "rgba(107, 114, 128, 0.3)";
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });
      
      // Draw pulse along connections
      connections.forEach(conn => {
        const fromNode = nodes.find(n => n.id === conn.from);
        const toNode = nodes.find(n => n.id === conn.to);
        
        if (fromNode && toNode) {
          const progress = (animationProgress * 2) % 1;
          const x = fromNode.x + (toNode.x - fromNode.x) * progress;
          const y = fromNode.y + (toNode.y - fromNode.y) * progress;
          
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = "#4f46e5";
          ctx.fill();
        }
      });
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
      
      // Draw nodes
      nodes.forEach((node, index) => {
        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
        
        // Draw label
        ctx.font = "12px Arial";
        ctx.fillStyle = "#1f2937";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.label, node.x, node.y);
        
        // Highlight active node
        if (index === activeNodeIndex) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 5, 0, Math.PI * 2);
          ctx.strokeStyle = node.color;
          ctx.lineWidth = 2;
          ctx.stroke();
          
          // Pulse effect
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 10 + Math.sin(animationProgress * 10) * 5, 0, Math.PI * 2);
          ctx.strokeStyle = `${node.color}44`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });
      
      requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
    
    return () => {
      // Cleanup
    };
  }, []);
  
  return (
    <div className="feature-showcase-container">
      <div className="text-center mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 dark:from-indigo-400 dark:via-purple-400 dark:to-blue-400">
          Interactive Learning Paths
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Visualize personalized roadmaps that adapt to your learning journey
        </p>
      </div>
      
      <div className="canvas-container relative bg-gradient-to-b from-white/50 to-indigo-50/50 dark:from-gray-800/50 dark:to-indigo-900/20 rounded-xl shadow-lg overflow-hidden border border-indigo-100/30 dark:border-indigo-800/30">
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
        
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap justify-center gap-3 text-sm">
          <div className="feature-pill">
            <span className="text-indigo-700 dark:text-indigo-300 font-medium">AI-Powered</span>
          </div>
          <div className="feature-pill">
            <span className="text-indigo-700 dark:text-indigo-300 font-medium">Personalized</span>
          </div>
          <div className="feature-pill">
            <span className="text-indigo-700 dark:text-indigo-300 font-medium">Interactive</span>
          </div>
          <div className="feature-pill">
            <span className="text-indigo-700 dark:text-indigo-300 font-medium">Comprehensive</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        <div className="stat-card">
          <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400 stat-number">100+</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Technologies</div>
        </div>
        <div className="stat-card">
          <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400 stat-number">50+</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Career Paths</div>
        </div>
        <div className="stat-card">
          <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400 stat-number">1000+</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Learning Resources</div>
        </div>
        <div className="stat-card">
          <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400 stat-number">24/7</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">AI Assistance</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectFeatureShowcase;
