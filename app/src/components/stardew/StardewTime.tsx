import { useState, useEffect } from 'react';

// 星露谷游戏时间 (6:00 AM - 2:00 AM)
interface StardewTimeProps {
  showRealTime?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function StardewTime({ showRealTime = false, size = 'md' }: StardewTimeProps) {
  const [gameTime, setGameTime] = useState('');
  const [realTime, setRealTime] = useState('');
  const [dayNumber, setDayNumber] = useState(1);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // 真实时间
      setRealTime(now.toLocaleTimeString('zh-CN', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }));
      
      // 计算游戏时间（将真实时间映射到星露谷时间）
      // 真实24小时 = 游戏20小时 (6:00 AM - 2:00 AM)
      const hours = now.getHours();
      const minutes = now.getMinutes();
      
      // 映射到游戏时间 (6:00 AM 开始)
      let gameHours = ((hours + 18) % 24) + 6;
      if (gameHours >= 26) gameHours -= 24;
      
      // 当超过 2:00 AM 时，显示为深夜
      if (gameHours >= 2 && gameHours < 6) {
        setGameTime(`${gameHours}:00 AM`);
      } else {
        const period = gameHours >= 12 ? 'PM' : 'AM';
        const displayHours = gameHours > 12 ? gameHours - 12 : gameHours === 0 ? 12 : gameHours;
        setGameTime(`${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`);
      }
      
      // 计算"第几天"（基于年份的第几天）
      const startOfYear = new Date(now.getFullYear(), 0, 0);
      const diff = now.getTime() - startOfYear.getTime();
      const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
      setDayNumber(dayOfYear);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl'
  };

  const clockSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`flex flex-col items-center ${sizeClasses[size]}`}>
      <div className="flex items-center gap-2">
        <span className={clockSizes[size]}>🕐</span>
        <div className="flex flex-col">
          <span className="font-bold text-amber-800 dark:text-amber-300" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.2)' }}>
            {gameTime}
          </span>
          <span className="text-xs text-amber-700 dark:text-amber-500">
            第 {dayNumber} 天
          </span>
        </div>
      </div>
      
      {showRealTime && (
        <span className="text-xs text-amber-600/70 dark:text-amber-400/70 mt-1">
          现实时间: {realTime}
        </span>
      )}
    </div>
  );
}

// 简单的游戏时间显示（仅时间）
interface SimpleStardewTimeProps {
  className?: string;
}

export function SimpleStardewTime({ className = '' }: SimpleStardewTimeProps) {
  const [time, setTime] = useState('');
  const [day, setDay] = useState(1);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      
      let gameHours = ((hours + 18) % 24) + 6;
      if (gameHours >= 26) gameHours -= 24;
      
      const period = gameHours >= 12 ? 'PM' : 'AM';
      const displayHours = gameHours > 12 ? gameHours - 12 : gameHours === 0 ? 12 : gameHours;
      setTime(`${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`);
      
      const startOfYear = new Date(now.getFullYear(), 0, 0);
      const diff = now.getTime() - startOfYear.getTime();
      setDay(Math.floor(diff / (1000 * 60 * 60 * 24)));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm">📅</span>
      <span className="text-sm font-bold text-amber-800 dark:text-amber-300">
        第 {day} 天 {time}
      </span>
    </div>
  );
}

// 时间进度条（显示游戏时间的进度）
interface TimeProgressProps {
  className?: string;
}

export function TimeProgress({ className = '' }: TimeProgressProps) {
  const [progress, setProgress] = useState(50);

  useEffect(() => {
    const updateProgress = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      
      // 将真实时间映射到游戏进度 (6:00 AM = 0%, 2:00 AM = 100%)
      let totalMinutes = ((hours + 18) % 24) * 60 + minutes;
      if (totalMinutes > 1200) totalMinutes -= 1440; // 超过 2:00 AM
      
      const gameProgress = (totalMinutes / 1200) * 100;
      setProgress(Math.min(Math.max(gameProgress, 0), 100));
    };

    updateProgress();
    const interval = setInterval(updateProgress, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between text-xs text-amber-700 dark:text-amber-400 mb-1">
        <span>6:00 AM</span>
        <span>12:00 PM</span>
        <span>6:00 PM</span>
        <span>2:00 AM</span>
      </div>
      <div className="h-3 bg-amber-900/20 rounded-full overflow-hidden border-2 border-amber-700/30">
        <div 
          className="h-full bg-gradient-to-r from-yellow-400 via-orange-400 to-purple-500 transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
