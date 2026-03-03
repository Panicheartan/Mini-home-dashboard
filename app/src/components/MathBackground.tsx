import { useEffect, useRef } from 'react';

interface Formula {
  text: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  direction: number;
}

export function MathBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const formulasRef = useRef<Formula[]>([]);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initFormulas();
    };

    const mathFormulas = [
      'e^(iπ) + 1 = 0',
      '∫ f(x) dx',
      '∑ n=1^∞',
      'lim x→∞',
      '∂f/∂x',
      '√2',
      'π ≈ 3.14159',
      'φ = (1+√5)/2',
      'a² + b² = c²',
      'E = mc²',
      'F = ma',
      '∇ × F',
      'δ(x)',
      'ℏ = h/2π',
      'Gμν = 8πTμν',
      'ψ(x,t)',
      'iℏ ∂ψ/∂t',
      'e^x',
      'ln(x)',
      'sin²θ + cos²θ = 1',
      '∞',
      '∮',
      '∯',
      '∰',
      'ℵ₀',
      '∃',
      '∀',
      '∈',
      '⊂',
      '∪',
      '∩',
      'ℝ',
      'ℂ',
      'ℚ',
      'ℤ',
      'ℕ',
    ];

    const initFormulas = () => {
      formulasRef.current = Array.from({ length: 20 }, () => ({
        text: mathFormulas[Math.floor(Math.random() * mathFormulas.length)],
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 16 + 12,
        opacity: Math.random() * 0.15 + 0.05,
        speed: Math.random() * 0.3 + 0.1,
        direction: Math.random() * Math.PI * 2,
      }));
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      formulasRef.current.forEach((formula) => {
        // 更新位置
        formula.x += Math.cos(formula.direction) * formula.speed;
        formula.y += Math.sin(formula.direction) * formula.speed;

        // 边界处理
        if (formula.x < -100) formula.x = canvas.width + 100;
        if (formula.x > canvas.width + 100) formula.x = -100;
        if (formula.y < -50) formula.y = canvas.height + 50;
        if (formula.y > canvas.height + 50) formula.y = -50;

        // 绘制公式
        ctx.save();
        ctx.font = `${formula.size}px 'Times New Roman', serif`;
        ctx.fillStyle = `rgba(147, 197, 253, ${formula.opacity})`;
        ctx.textAlign = 'center';
        ctx.fillText(formula.text, formula.x, formula.y);
        ctx.restore();
      });

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
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

// 几何图形装饰
export function GeometricDecorations() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {/* 三角形 */}
      <svg className="absolute top-[10%] left-[5%] w-16 h-16 opacity-10" viewBox="0 0 100 100">
        <polygon points="50,10 90,90 10,90" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400" />
      </svg>

      <svg className="absolute bottom-[15%] right-[8%] w-12 h-12 opacity-10" viewBox="0 0 100 100">
        <polygon points="50,10 90,90 10,90" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-400" />
      </svg>

      {/* 六边形 */}
      <svg className="absolute top-[30%] right-[12%] w-14 h-14 opacity-10" viewBox="0 0 100 100">
        <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-400" />
      </svg>

      <svg className="absolute bottom-[25%] left-[15%] w-10 h-10 opacity-10" viewBox="0 0 100 100">
        <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="currentColor" strokeWidth="2" className="text-indigo-400" />
      </svg>

      {/* 正方形旋转 */}
      <div className="absolute top-[60%] left-[8%] w-8 h-8 border-2 border-blue-400/20 rotate-45 animate-spin-slow" />
      <div className="absolute bottom-[40%] right-[15%] w-6 h-6 border-2 border-purple-400/20 rotate-12 animate-spin-slow" style={{ animationDirection: 'reverse' }} />

      {/* 圆环 */}
      <div className="absolute top-[20%] left-[20%] w-24 h-24 border-2 border-dashed border-blue-400/15 rounded-full animate-spin-slow" />
      <div className="absolute bottom-[30%] right-[25%] w-20 h-20 border-2 border-dashed border-purple-400/15 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }} />
      <div className="absolute top-[70%] right-[10%] w-16 h-16 border border-cyan-400/10 rounded-full" />
      <div className="absolute bottom-[20%] left-[30%] w-12 h-12 border border-indigo-400/10 rounded-full" />

      {/* 虚线圆环 */}
      <div className="absolute top-[45%] left-[3%] w-20 h-20 border-2 border-dotted border-blue-400/10 rounded-full animate-pulse-slow" />
      <div className="absolute top-[55%] right-[5%] w-14 h-14 border-2 border-dotted border-purple-400/10 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }} />

      {/* 十字 */}
      <div className="absolute top-[15%] right-[30%] w-8 h-8 opacity-20">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-blue-400 -translate-y-1/2" />
        <div className="absolute top-0 left-1/2 w-0.5 h-full bg-blue-400 -translate-x-1/2" />
      </div>

      <div className="absolute bottom-[35%] left-[25%] w-6 h-6 opacity-20">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-purple-400 -translate-y-1/2" />
        <div className="absolute top-0 left-1/2 w-0.5 h-full bg-purple-400 -translate-x-1/2" />
      </div>

      {/* 小点阵 */}
      <div className="absolute top-[25%] left-[35%] grid grid-cols-3 gap-2 opacity-30">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full bg-blue-400/40" />
        ))}
      </div>

      <div className="absolute bottom-[45%] right-[20%] grid grid-cols-3 gap-2 opacity-30">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full bg-purple-400/40" />
        ))}
      </div>
    </div>
  );
}

// 连接线装饰
export function ConnectionLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0.5 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
          <stop offset="50%" stopColor="rgba(147, 51, 234, 0.15)" />
          <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
        </linearGradient>
        <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(147, 51, 234, 0.2)" />
          <stop offset="50%" stopColor="rgba(59, 130, 246, 0.15)" />
          <stop offset="100%" stopColor="rgba(147, 51, 234, 0.1)" />
        </linearGradient>
      </defs>

      {/* 主对角线 */}
      <line x1="0" y1="0" x2="100%" y2="100%" stroke="url(#grad1)" strokeWidth="1" strokeDasharray="10,5" className="animate-pulse" />

      {/* 反对角线 */}
      <line x1="100%" y1="0" x2="0" y2="100%" stroke="url(#grad2)" strokeWidth="1" strokeDasharray="10,5" className="animate-pulse" style={{ animationDelay: '1s' }} />

      {/* 水平线 */}
      <line x1="0" y1="25%" x2="35%" y2="25%" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="1" strokeDasharray="5,5" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
      <line x1="65%" y1="25%" x2="100%" y2="25%" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="1" strokeDasharray="5,5" className="animate-pulse" style={{ animationDelay: '0.6s' }} />

      <line x1="0" y1="75%" x2="30%" y2="75%" stroke="rgba(147, 51, 234, 0.15)" strokeWidth="1" strokeDasharray="5,5" className="animate-pulse" style={{ animationDelay: '0.9s' }} />
      <line x1="70%" y1="75%" x2="100%" y2="75%" stroke="rgba(147, 51, 234, 0.15)" strokeWidth="1" strokeDasharray="5,5" className="animate-pulse" style={{ animationDelay: '1.2s' }} />

      {/* 垂直线 */}
      <line x1="25%" y1="0" x2="25%" y2="30%" stroke="rgba(59, 130, 246, 0.12)" strokeWidth="1" strokeDasharray="5,5" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
      <line x1="25%" y1="70%" x2="25%" y2="100%" stroke="rgba(59, 130, 246, 0.12)" strokeWidth="1" strokeDasharray="5,5" className="animate-pulse" style={{ animationDelay: '0.8s' }} />

      <line x1="75%" y1="0" x2="75%" y2="25%" stroke="rgba(147, 51, 234, 0.12)" strokeWidth="1" strokeDasharray="5,5" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
      <line x1="75%" y1="75%" x2="75%" y2="100%" stroke="rgba(147, 51, 234, 0.12)" strokeWidth="1" strokeDasharray="5,5" className="animate-pulse" style={{ animationDelay: '1.1s' }} />

      {/* 弧线 */}
      <path d="M 0 50% Q 25% 30%, 50% 50%" fill="none" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '0.7s' }} />
      <path d="M 50% 50% Q 75% 70%, 100% 50%" fill="none" stroke="rgba(147, 51, 234, 0.1)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '1.3s' }} />

      <path d="M 50% 0 Q 70% 25%, 50% 50%" fill="none" stroke="rgba(59, 130, 246, 0.08)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
      <path d="M 50% 50% Q 30% 75%, 50% 100%" fill="none" stroke="rgba(147, 51, 234, 0.08)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '1.5s' }} />

      {/* 斜线 */}
      <line x1="10%" y1="40%" x2="25%" y2="55%" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="1" strokeDasharray="3,3" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
      <line x1="75%" y1="45%" x2="90%" y2="60%" stroke="rgba(147, 51, 234, 0.1)" strokeWidth="1" strokeDasharray="3,3" className="animate-pulse" style={{ animationDelay: '0.8s' }} />
      <line x1="15%" y1="60%" x2="30%" y2="75%" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="1" strokeDasharray="3,3" className="animate-pulse" style={{ animationDelay: '1.1s' }} />
      <line x1="70%" y1="30%" x2="85%" y2="45%" stroke="rgba(147, 51, 234, 0.1)" strokeWidth="1" strokeDasharray="3,3" className="animate-pulse" style={{ animationDelay: '1.4s' }} />
    </svg>
  );
}
