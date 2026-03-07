
interface GoldDisplayProps {
  amount: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animate?: boolean;
}

export function GoldDisplay({ amount, size = 'md', showLabel = true, animate = false }: GoldDisplayProps) {
  const sizeClasses = {
    sm: 'text-sm gap-1',
    md: 'text-base gap-2',
    lg: 'text-xl gap-2'
  };

  const iconSizes = {
    sm: '14px',
    md: '18px',
    lg: '24px'
  };

  const formattedAmount = amount.toLocaleString('zh-CN');

  return (
    <div className={`flex items-center ${sizeClasses[size]} font-bold`}>
      <span 
        className={`${animate ? 'animate-bounce' : ''}`}
        style={{ fontSize: iconSizes[size] }}
      >
        🪙
      </span>
      <span className="text-amber-600 dark:text-amber-400" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.2)' }}>
        {formattedAmount}
      </span>
      {showLabel && (
        <span className="text-amber-700 dark:text-amber-500 text-xs">g</span>
      )}
    </div>
  );
}

// 金币统计卡片
interface GoldStatsCardProps {
  totalGold: number;
  dailyIncome?: number;
  title?: string;
}

export function GoldStatsCard({ totalGold, dailyIncome = 0, title = '总资产' }: GoldStatsCardProps) {
  const isProfit = dailyIncome >= 0;
  
  return (
    <div className="stardew-card p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">💰</span>
        <span className="text-sm font-bold text-amber-800 dark:text-amber-300">{title}</span>
      </div>
      
      <div className="mb-2">
        <GoldDisplay amount={totalGold} size="lg" showLabel={false} />
      </div>
      
      {dailyIncome !== 0 && (
        <div className={`flex items-center gap-1 text-xs ${isProfit ? 'text-green-600' : 'text-red-500'}`}>
          <span>{isProfit ? '+' : ''}{dailyIncome.toLocaleString('zh-CN')}g</span>
          <span>{isProfit ? '📈' : '📉'}</span>
        </div>
      )}
    </div>
  );
}

// 资源显示（多种资源）
interface ResourceDisplayProps {
  gold?: number;
  wood?: number;
  stone?: number;
  fiber?: number;
}

export function ResourceDisplay({ gold = 0, wood = 0, stone = 0, fiber = 0 }: ResourceDisplayProps) {
  const resources = [
    { icon: '🪙', value: gold, label: '金币', color: 'text-amber-600' },
    { icon: '🪵', value: wood, label: '木材', color: 'text-amber-700' },
    { icon: '🪨', value: stone, label: '石头', color: 'text-gray-600' },
    { icon: '🌾', value: fiber, label: '纤维', color: 'text-green-600' }
  ].filter(r => r.value > 0);

  return (
    <div className="flex flex-wrap gap-2">
      {resources.map((resource, index) => (
        <div key={index} className="inventory-slot px-2 py-1 flex items-center gap-1.5">
          <span className="text-sm">{resource.icon}</span>
          <span className={`text-xs font-bold ${resource.color}`}>
            {resource.value.toLocaleString('zh-CN')}
          </span>
        </div>
      ))}
    </div>
  );
}
