import { useEffect, useState } from 'react';

// 优雅的浮动几何图形
export function FloatingShapes() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const shapes = [
    // 大圆环
    { type: 'ring', size: 120, x: '8%', y: '15%', delay: 0, duration: 20 },
    { type: 'ring', size: 80, x: '90%', y: '25%', delay: 2, duration: 25 },
    { type: 'ring', size: 100, x: '85%', y: '75%', delay: 4, duration: 22 },
    { type: 'ring', size: 60, x: '5%', y: '70%', delay: 1, duration: 18 },

    // 方形
    { type: 'square', size: 40, x: '15%', y: '35%', delay: 0.5, duration: 15 },
    { type: 'square', size: 30, x: '80%', y: '45%', delay: 1.5, duration: 18 },
    { type: 'square', size: 50, x: '75%', y: '85%', delay: 3, duration: 20 },

    // 圆形
    { type: 'circle', size: 25, x: '25%', y: '80%', delay: 2.5, duration: 16 },
    { type: 'circle', size: 35, x: '70%', y: '15%', delay: 0.8, duration: 19 },
    { type: 'circle', size: 20, x: '92%', y: '60%', delay: 3.5, duration: 17 },

    // 装饰点
    { type: 'dot', size: 8, x: '30%', y: '20%', delay: 0, duration: 4 },
    { type: 'dot', size: 6, x: '60%', y: '30%', delay: 1, duration: 5 },
    { type: 'dot', size: 10, x: '45%', y: '75%', delay: 2, duration: 4.5 },
    { type: 'dot', size: 5, x: '88%', y: '40%', delay: 0.5, duration: 3.5 },
    { type: 'dot', size: 7, x: '12%', y: '55%', delay: 1.5, duration: 4.2 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {shapes.map((shape, index) => (
        <div
          key={index}
          className="absolute animate-float-elegant"
          style={{
            left: shape.x,
            top: shape.y,
            animationDelay: `${shape.delay}s`,
            animationDuration: `${shape.duration}s`,
          }}
        >
          {shape.type === 'ring' && (
            <div
              className="rounded-full border-2 border-blue-500/20 animate-pulse-slow"
              style={{
                width: shape.size,
                height: shape.size,
              }}
            />
          )}
          {shape.type === 'square' && (
            <div
              className="rounded-lg border border-purple-500/15 rotate-45 animate-spin-slow"
              style={{
                width: shape.size,
                height: shape.size,
              }}
            />
          )}
          {shape.type === 'circle' && (
            <div
              className="rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10"
              style={{
                width: shape.size,
                height: shape.size,
              }}
            />
          )}
          {shape.type === 'dot' && (
            <div
              className="rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-ping"
              style={{
                width: shape.size,
                height: shape.size,
                animationDuration: '3s',
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// 优雅的线条装饰
export function ElegantLines() {
  return (
    <svg
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0.4 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
          <stop offset="50%" stopColor="rgba(147, 51, 234, 0.2)" />
          <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
        </linearGradient>
        <linearGradient id="lineGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(147, 51, 234, 0.3)" />
          <stop offset="50%" stopColor="rgba(59, 130, 246, 0.2)" />
          <stop offset="100%" stopColor="rgba(147, 51, 234, 0.1)" />
        </linearGradient>
      </defs>

      {/* 主对角线 */}
      <line
        x1="0"
        y1="0"
        x2="100%"
        y2="100%"
        stroke="url(#lineGradient1)"
        strokeWidth="1"
        strokeDasharray="8,8"
        className="animate-pulse"
      />

      {/* 反对角线 */}
      <line
        x1="100%"
        y1="0"
        x2="0"
        y2="100%"
        stroke="url(#lineGradient2)"
        strokeWidth="1"
        strokeDasharray="8,8"
        className="animate-pulse"
        style={{ animationDelay: '1s' }}
      />

      {/* 水平装饰线 */}
      <line
        x1="10%"
        y1="30%"
        x2="40%"
        y2="30%"
        stroke="rgba(59, 130, 246, 0.15)"
        strokeWidth="1"
        strokeDasharray="4,4"
        className="animate-pulse"
        style={{ animationDelay: '0.5s' }}
      />
      <line
        x1="60%"
        y1="70%"
        x2="90%"
        y2="70%"
        stroke="rgba(147, 51, 234, 0.15)"
        strokeWidth="1"
        strokeDasharray="4,4"
        className="animate-pulse"
        style={{ animationDelay: '1.5s' }}
      />

      {/* 垂直装饰线 */}
      <line
        x1="25%"
        y1="10%"
        x2="25%"
        y2="40%"
        stroke="rgba(59, 130, 246, 0.12)"
        strokeWidth="1"
        strokeDasharray="4,4"
        className="animate-pulse"
        style={{ animationDelay: '0.8s' }}
      />
      <line
        x1="75%"
        y1="60%"
        x2="75%"
        y2="90%"
        stroke="rgba(147, 51, 234, 0.12)"
        strokeWidth="1"
        strokeDasharray="4,4"
        className="animate-pulse"
        style={{ animationDelay: '1.2s' }}
      />

      {/* 弧线装饰 */}
      <path
        d="M 0 50 Q 50% 20%, 100% 50"
        fill="none"
        stroke="rgba(59, 130, 246, 0.08)"
        strokeWidth="1"
        className="animate-pulse"
        style={{ animationDelay: '2s' }}
      />
      <path
        d="M 0 70 Q 50% 40%, 100% 70"
        fill="none"
        stroke="rgba(147, 51, 234, 0.08)"
        strokeWidth="1"
        className="animate-pulse"
        style={{ animationDelay: '2.5s' }}
      />
    </svg>
  );
}

// 光晕效果
export function GlowEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* 顶部光晕 */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] animate-pulse-slow"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
        }}
      />

      {/* 左侧光晕 */}
      <div
        className="absolute top-1/3 left-0 w-[300px] h-[600px] animate-pulse-slow"
        style={{
          background: 'radial-gradient(ellipse at left, rgba(147, 51, 234, 0.06) 0%, transparent 60%)',
          animationDelay: '2s',
        }}
      />

      {/* 右侧光晕 */}
      <div
        className="absolute bottom-1/4 right-0 w-[400px] h-[500px] animate-pulse-slow"
        style={{
          background: 'radial-gradient(ellipse at right, rgba(59, 130, 246, 0.06) 0%, transparent 60%)',
          animationDelay: '4s',
        }}
      />

      {/* 底部光晕 */}
      <div
        className="absolute bottom-0 left-1/4 w-[600px] h-[300px] animate-pulse-slow"
        style={{
          background: 'radial-gradient(ellipse at bottom, rgba(147, 51, 234, 0.05) 0%, transparent 60%)',
          animationDelay: '3s',
        }}
      />
    </div>
  );
}
