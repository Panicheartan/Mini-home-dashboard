import { useEffect, useRef } from 'react';

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
  speed: number;
}

interface Circle {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  pulseSpeed: number;
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const linesRef = useRef<Line[]>([]);
  const circlesRef = useRef<Circle[]>([]);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initElements();
    };

    const initElements = () => {
      // 初始化线条 - 优雅的连接线
      linesRef.current = Array.from({ length: 15 }, () => ({
        x1: Math.random() * canvas.width,
        y1: Math.random() * canvas.height,
        x2: Math.random() * canvas.width,
        y2: Math.random() * canvas.height,
        opacity: Math.random() * 0.3 + 0.1,
        speed: Math.random() * 0.02 + 0.01,
      }));

      // 初始化圆形 - 装饰性圆环
      circlesRef.current = Array.from({ length: 8 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 100 + 50,
        opacity: Math.random() * 0.2 + 0.05,
        pulseSpeed: Math.random() * 0.002 + 0.001,
      }));
    };

    resize();
    window.addEventListener('resize', resize);

    let time = 0;
    const animate = () => {
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 绘制渐变背景
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.03)');
      gradient.addColorStop(0.5, 'rgba(147, 51, 234, 0.02)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0.03)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 绘制线条
      linesRef.current.forEach((line) => {
        // 动画效果 - 缓慢移动
        line.x1 += Math.sin(time * line.speed) * 0.5;
        line.y1 += Math.cos(time * line.speed) * 0.5;
        line.x2 += Math.sin(time * line.speed + Math.PI) * 0.5;
        line.y2 += Math.cos(time * line.speed + Math.PI) * 0.5;

        // 绘制线条
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);

        // 创建渐变线条
        const lineGradient = ctx.createLinearGradient(line.x1, line.y1, line.x2, line.y2);
        lineGradient.addColorStop(0, `rgba(59, 130, 246, ${line.opacity})`);
        lineGradient.addColorStop(0.5, `rgba(147, 51, 234, ${line.opacity * 1.5})`);
        lineGradient.addColorStop(1, `rgba(59, 130, 246, ${line.opacity})`);

        ctx.strokeStyle = lineGradient;
        ctx.lineWidth = 1;
        ctx.stroke();

        // 绘制端点
        ctx.beginPath();
        ctx.arc(line.x1, line.y1, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${line.opacity * 2})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(line.x2, line.y2, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 51, 234, ${line.opacity * 2})`;
        ctx.fill();
      });

      // 绘制装饰圆形
      circlesRef.current.forEach((circle) => {
        const pulse = Math.sin(time * circle.pulseSpeed) * 0.5 + 0.5;
        const currentRadius = circle.radius * (1 + pulse * 0.1);
        const currentOpacity = circle.opacity * (0.8 + pulse * 0.4);

        ctx.beginPath();
        ctx.arc(circle.x, circle.y, currentRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(59, 130, 246, ${currentOpacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // 内部小圆点
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 51, 234, ${currentOpacity * 2})`;
        ctx.fill();
      });

      // 绘制网格线 - 优雅的细线
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.05)';
      ctx.lineWidth = 0.5;
      const gridSize = 60;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
