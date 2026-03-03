import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export function UnifiedBackground({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  // Stellar particle animation - only in dark mode
  useEffect(() => {
    if (!mounted || !isDark) return;

    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('Canvas ref is null');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Could not get canvas context');
      return;
    }

    let animationId: number;
    let particles: Particle[] = [];
    let stars: Star[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      pulsePhase: number;

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.size = Math.random() * 3 + 2;
        this.opacity = Math.random() * 0.5 + 0.5;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = canvasWidth;
        if (this.x > canvasWidth) this.x = 0;
        if (this.y < 0) this.y = canvasHeight;
        if (this.y > canvasHeight) this.y = 0;

        this.pulsePhase += 0.03;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const pulseOpacity = this.opacity * (0.7 + 0.3 * Math.sin(this.pulsePhase));

        // Glow effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 3
        );
        gradient.addColorStop(0, `rgba(100, 200, 255, ${pulseOpacity})`);
        gradient.addColorStop(0.5, `rgba(100, 200, 255, ${pulseOpacity * 0.3})`);
        gradient.addColorStop(1, 'rgba(100, 200, 255, 0)');

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core - bright white
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, pulseOpacity + 0.5)})`;
        ctx.fill();
      }
    }

    class Star {
      x: number;
      y: number;
      size: number;
      opacity: number;
      twinkleSpeed: number;
      phase: number;

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.6 + 0.4;
        this.twinkleSpeed = Math.random() * 0.05 + 0.02;
        this.phase = Math.random() * Math.PI * 2;
      }

      update() {
        this.phase += this.twinkleSpeed;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const twinkle = 0.5 + 0.5 * Math.sin(this.phase);
        const alpha = this.opacity * twinkle;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }
    }

    const init = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      particles = [];
      stars = [];

      const particleCount = Math.min(60, Math.floor((width * height) / 25000));
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(width, height));
      }

      const starCount = Math.min(200, Math.floor((width * height) / 8000));
      for (let i = 0; i < starCount; i++) {
        stars.push(new Star(width, height));
      }

      console.log(`Created ${particles.length} particles and ${stars.length} stars`);
    };

    const drawConnections = (ctx: CanvasRenderingContext2D) => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 180) {
            const opacity = 0.6 * (1 - distance / 180);

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(100, 200, 255, ${opacity})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw stars (background)
      stars.forEach(star => {
        star.update();
        star.draw(ctx);
      });

      // Draw connections
      drawConnections(ctx);

      // Draw particles
      particles.forEach(particle => {
        particle.update(width, height);
        particle.draw(ctx);
      });

      animationId = requestAnimationFrame(animate);
    };

    // Initialize
    resize();
    init();
    animate();

    const handleResize = () => {
      resize();
      init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mounted, isDark]);

  if (!mounted) return null;

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Light mode background */}
      {!isDark && (
        <>
          {/* Soft gradient base */}
          <div
            className="fixed inset-0 pointer-events-none z-0"
            style={{
              background: `
                linear-gradient(135deg, rgba(224, 231, 255, 0.6) 0%, rgba(243, 232, 255, 0.4) 50%, rgba(254, 226, 226, 0.3) 100%)
              `,
            }}
          />
          {/* Top glow */}
          <div
            className="fixed inset-0 pointer-events-none z-[1]"
            style={{
              background: `
                radial-gradient(ellipse at 30% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
                radial-gradient(ellipse at 70% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)
              `,
            }}
          />
          {/* Subtle grid */}
          <div
            className="fixed inset-0 pointer-events-none z-[2] opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(99, 102, 241, 0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(99, 102, 241, 0.5) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
        </>
      )}

      {/* Dark mode background with particles */}
      {isDark && (
        <>
          {/* Base dark background */}
          <div className="fixed inset-0 bg-slate-950 z-0" />

          {/* Gradient overlays for depth */}
          <div
            className="fixed inset-0 pointer-events-none z-[1]"
            style={{
              background: `
                radial-gradient(ellipse at 20% 80%, rgba(30, 58, 138, 0.3) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 20%, rgba(76, 29, 149, 0.2) 0%, transparent 50%)
              `,
            }}
          />

          {/* Particle canvas */}
          <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[5] w-full h-full"
          />
        </>
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
