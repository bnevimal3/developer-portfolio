
import React, { useEffect, useRef } from 'react';

interface Particle3D {
  x: number;
  y: number;
  z: number;
  px: number;
  py: number;
  size: number;
  opacity: number;
}

const ParticleBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // High density for the "Design Intelligence" look
    const particleCount = 5000;
    const particles: Particle3D[] = [];
    const radius = Math.min(width, height) * 0.45; 

    // Generate points on a sphere using Fibonacci sphere or random spherical distribution
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      // Randomize distance slightly for a "cloud" rather than a perfect shell
      const r = radius * (0.85 + Math.random() * 0.15); 
      
      particles.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        px: 0,
        py: 0,
        size: Math.random() * 1.2 + 0.2,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    let rotationX = 0;
    let rotationY = 0;
    let targetRotationX = 0.001;
    let targetRotationY = 0.002;
    let animationFrame: number;

    const handleMouseMove = (e: MouseEvent) => {
      // Subtle tilt based on mouse position
      targetRotationY = (e.clientX - width / 2) * 0.00001;
      targetRotationX = (e.clientY - height / 2) * 0.00001;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const project = (p: Particle3D) => {
      // Projection math for 3D to 2D
      const perspective = 800;
      const scale = perspective / (perspective + p.z);
      
      // Center the sphere behind the Name/Title area (slightly above center of screen)
      const centerYAdjustment = height * 0.35; 
      
      p.px = (p.x * scale) + (width / 2);
      p.py = (p.y * scale) + centerYAdjustment;
      return scale;
    };

    const rotate = (p: Particle3D, rx: number, ry: number) => {
      // Y-axis rotation
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x1 = p.x * cosY - p.z * sinY;
      const z1 = p.x * sinY + p.z * cosY;
      
      // X-axis rotation
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const y1 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;
      
      p.x = x1;
      p.y = y1;
      p.z = z2;
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Gradually interpolate rotation speed
      rotationX += (targetRotationX - rotationX) * 0.05;
      rotationY += (targetRotationY - rotationY) * 0.05;
      
      // Base auto-rotation
      const stepX = rotationX + 0.0005;
      const stepY = rotationY + 0.0015;

      // Sort particles by Z so we draw back-to-front for realistic depth
      particles.sort((a, b) => b.z - a.z);

      particles.forEach(p => {
        rotate(p, stepX, stepY);
        const scale = project(p);

        // Twinkle effect
        const twinkle = Math.sin(Date.now() * 0.001 + p.x) * 0.2;
        const finalOpacity = Math.max(0, (p.opacity + twinkle) * (p.z + radius) / (radius * 2));

        ctx.beginPath();
        ctx.arc(p.px, p.py, p.size * scale, 0, Math.PI * 2);
        
        // Use bright white with a gold tint for depth
        const colorWeight = (p.z + radius) / (radius * 2); // 0 to 1
        if (colorWeight > 0.7) {
            ctx.fillStyle = `rgba(255, 255, 255, ${finalOpacity})`; // Front: White
        } else {
            ctx.fillStyle = `rgba(212, 175, 55, ${finalOpacity * 0.6})`; // Back: Gold tint
        }
        
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none opacity-80">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ParticleBackground;
