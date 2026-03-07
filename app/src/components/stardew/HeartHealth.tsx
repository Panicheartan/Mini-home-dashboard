// 星露谷物语风格的心形生命值组件
interface HeartHealthProps {
  health: number; // 0-100
  maxHearts?: number; // 默认10颗心
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

export function HeartHealth({ health, maxHearts = 10, size = 'md', showValue = false }: HeartHealthProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const containerClasses = {
    sm: 'gap-0.5',
    md: 'gap-1',
    lg: 'gap-1.5'
  };

  const hearts = [];
  const heartsPerRow = Math.min(maxHearts, 10);
  const rows = Math.ceil(maxHearts / heartsPerRow);
  
  for (let row = 0; row < rows; row++) {
    const rowHearts = [];
    const heartsInThisRow = Math.min(heartsPerRow, maxHearts - row * heartsPerRow);
    
    for (let i = 0; i < heartsInThisRow; i++) {
      const heartIndex = row * heartsPerRow + i;
      const heartValue = Math.min(Math.max(health - heartIndex * 10, 0), 10);
      
      let heartIcon = '♥';
      let heartColor = '';
      
      if (heartValue >= 10) {
        heartColor = 'text-red-500';
      } else if (heartValue >= 5) {
        heartIcon = '♥';
        heartColor = 'text-yellow-500';
      } else if (heartValue > 0) {
        heartIcon = '♥';
        heartColor = 'text-orange-500';
      } else {
        heartIcon = '♡';
        heartColor = 'text-gray-400';
      }
      
      rowHearts.push(
        <span
          key={heartIndex}
          className={`${sizeClasses[size]} ${heartColor} inline-flex items-center justify-center leading-none`}
          style={{ 
            textShadow: '1px 1px 0 rgba(0,0,0,0.3)',
            fontSize: size === 'sm' ? '12px' : size === 'md' ? '16px' : '20px'
          }}
        >
          {heartIcon}
        </span>
      );
    }
    
    hearts.push(
      <div key={row} className={`flex ${containerClasses[size]} flex-wrap`}>
        {rowHearts}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col gap-1">{hearts}</div>
      {showValue && (
        <span className="text-xs font-bold text-amber-700 dark:text-amber-400">
          {health}/{maxHearts * 10} HP
        </span>
      )}
    </div>
  );
}

// 服务状态指示器（使用心形）
interface ServiceHeartStatusProps {
  status: 'healthy' | 'warning' | 'error' | 'unknown';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ServiceHeartStatus({ status, label, size = 'md' }: ServiceHeartStatusProps) {
  const statusConfig = {
    healthy: { icon: '♥', color: 'text-green-500', bgColor: 'bg-green-500/20', label: '满血' },
    warning: { icon: '♥', color: 'text-yellow-500', bgColor: 'bg-yellow-500/20', label: '半血' },
    error: { icon: '♡', color: 'text-red-500', bgColor: 'bg-red-500/20', label: '空血' },
    unknown: { icon: '♡', color: 'text-gray-400', bgColor: 'bg-gray-400/20', label: '未知' }
  };

  const config = statusConfig[status];
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl'
  };

  return (
    <div className="flex items-center gap-2">
      <span 
        className={`${config.color} ${sizeClasses[size]}`}
        style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3)' }}
      >
        {config.icon}
      </span>
      {label && (
        <span className="text-xs text-amber-800 dark:text-amber-300">{label}</span>
      )}
    </div>
  );
}

// 服务状态条（多个心形）
interface ServiceHealthBarProps {
  services: { name: string; status: 'healthy' | 'warning' | 'error' | 'unknown' }[];
  maxDisplay?: number;
}

export function ServiceHealthBar({ services, maxDisplay = 8 }: ServiceHealthBarProps) {
  const displayServices = services.slice(0, maxDisplay);
  
  return (
    <div className="flex flex-wrap gap-3">
      {displayServices.map((service, index) => (
        <div key={index} className="flex items-center gap-1.5 bg-black/5 dark:bg-white/5 px-2 py-1 rounded inventory-slot">
          <ServiceHeartStatus status={service.status} size="sm" />
          <span className="text-xs text-amber-900 dark:text-amber-200 truncate max-w-[80px]">
            {service.name}
          </span>
        </div>
      ))}
      {services.length > maxDisplay && (
        <span className="text-xs text-amber-700 dark:text-amber-400 self-center">
          +{services.length - maxDisplay} 更多
        </span>
      )}
    </div>
  );
}
