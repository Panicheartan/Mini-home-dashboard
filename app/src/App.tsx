import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {
  Router,
  Server,
  HardDrive,
  Monitor,
  Container,
  Activity,
  Play,
  Film,
  Subtitles,
  Home,
  Settings,
  Workflow,
  LogOut,
  Globe,
  Bot,
  Gauge,
  FolderSync,
  Pin,
  PinOff,
  LayoutGrid,
  Layers,
  Cpu,
  Wifi,
  Zap,
  Sun,
  CloudRain,
  Snowflake,
  Pickaxe,
  Shovel,
  Fish,
  Axe,
  Heart,
  Battery,
  Droplets,
} from 'lucide-react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeToggle } from './components/ThemeToggle';
import { HeartHealth } from './components/stardew/HeartHealth';
import { GoldDisplay } from './components/stardew/GoldDisplay';
import { StardewTime, SimpleStardewTime } from './components/stardew/StardewTime';
import { LoginPage } from './components/LoginPage';
import { WebsitesPage } from './components/WebsitesPage';
import { CategoryDetailPage } from './components/CategoryDetailPage';
import { Button } from '@/components/ui/button';
import { allCategories } from '@/data/websites';
import { usePinnedSites } from '@/hooks/usePinnedSites';
import { useMemo, useState, useEffect } from 'react';
import { getSiteColor, getSiteInitial } from '@/lib/utils';
import type { NetworkDevice, AppService, Site } from '@/types';

const APP_VERSION = '2.2.0-Stardew';

// 季节配置
const SEASONS = [
  { name: '春', color: '#7CB342', icon: '🌸' },
  { name: '夏', color: '#F9A825', icon: '☀️' },
  { name: '秋', color: '#D84315', icon: '🍂' },
  { name: '冬', color: '#42A5F5', icon: '❄️' },
];

// 天气类型
const WEATHER_TYPES = [
  { type: 'sunny', icon: Sun, label: '晴朗', color: '#FFD54F' },
  { type: 'rainy', icon: CloudRain, label: '下雨', color: '#64B5F6' },
  { type: 'snowy', icon: Snowflake, label: '下雪', color: '#90CAF9' },
];

// 工具栏项目
const TOOLBAR_ITEMS = [
  { icon: Pickaxe, name: '设备管理', color: '#8B7355', active: true },
  { icon: Shovel, name: 'Docker服务', color: '#4A7C59' },
  { icon: Axe, name: 'NAS管理', color: '#D4A574' },
  { icon: Fish, name: '网站导航', color: '#5C4033' },
];

// Network devices
const networkDevices: NetworkDevice[] = [
  { name: '光猫', address: '192.168.1.1', description: '光纤调制解调器', icon: Router, color: 'from-blue-500 to-cyan-500', href: 'http://192.168.1.1' },
  { name: '软路由', address: '192.168.1.2', description: 'OpenWrt 路由', icon: Server, color: 'from-violet-500 to-purple-500', href: 'http://192.168.1.2' },
  { name: 'NAS', address: '192.168.1.6:8080', description: '群晖存储', icon: HardDrive, color: 'from-emerald-500 to-teal-500', href: 'http://192.168.1.6:8080' },
  { name: '光猫副机', address: '192.168.1.4', description: '光猫备机', icon: Router, color: 'from-blue-400 to-cyan-400', href: 'http://192.168.1.4' },
  { name: 'Mac Studio', address: '192.168.1.102', description: '开发工作站', icon: Monitor, color: 'from-pink-500 to-rose-500', href: 'http://192.168.1.102' },
];

// Docker apps
const dockerApps: AppService[] = [
  { name: 'Portainer', address: '192.168.1.6:9000', description: 'Docker可视化管理', icon: Container, color: 'from-cyan-500 to-blue-500', href: 'http://192.168.1.6:9000' },
  { name: 'Node-RED', address: '192.168.1.6:1880', description: '低代码自动化', icon: Workflow, color: 'from-red-500 to-orange-500', href: 'http://192.168.1.6:1880' },
  { name: 'Uptime Kuma', address: '192.168.1.6:3002', description: '服务监控', icon: Activity, color: 'from-green-500 to-emerald-500', href: 'http://192.168.1.6:3002' },
  { name: 'Sonarr', address: '192.168.1.6:8989', description: '电视剧管理', icon: Play, color: 'from-indigo-500 to-violet-500', href: 'http://192.168.1.6:8989' },
  { name: 'Radarr', address: '192.168.1.6:7878', description: '电影管理', icon: Film, color: 'from-amber-500 to-yellow-500', href: 'http://192.168.1.6:7878' },
  { name: 'Bazarr', address: '192.168.1.6:6767', description: '字幕管理', icon: Subtitles, color: 'from-orange-500 to-red-500', href: 'http://192.168.1.6:6767' },
  { name: 'Home Assistant', address: '192.168.1.6:8123', description: '智能家居', icon: Home, color: 'from-blue-600 to-indigo-600', href: 'http://192.168.1.6:8123' },
  { name: 'Mini-Home', address: '192.168.1.6:3003', description: '家庭导航页', icon: Globe, color: 'from-pink-500 to-rose-500', href: 'http://192.168.1.6:3003' },
  { name: 'n8n', address: '192.168.1.6:3001', description: '工作流自动化', icon: Workflow, color: 'from-orange-600 to-red-500', href: 'http://192.168.1.6:3001' },
];

// NAS apps
const nasApps: AppService[] = [
  { name: 'Plex', address: '192.168.1.6:32400', description: '媒体服务器', icon: Play, color: 'from-yellow-400 to-amber-500', href: 'http://192.168.1.6:32400' },
  { name: 'WordPress', address: '192.168.1.6/WordPress', description: '博客系统', icon: Globe, color: 'from-blue-500 to-indigo-500', href: 'http://192.168.1.6/WordPress' },
  { name: '网络测速', address: '192.168.1.2:3200', description: '内网测速', icon: Gauge, color: 'from-green-500 to-teal-500', href: 'http://192.168.1.2:3200' },
];

// Mac Studio apps
const macStudioApps: AppService[] = [
  { name: 'Open WebUI', address: '192.168.1.102:3000', description: 'AI聊天界面', icon: Bot, color: 'from-violet-500 to-purple-600', href: 'http://192.168.1.102:3000' },
  { name: 'InvenTree', address: '192.168.1.102:8090', description: '库存管理系统', icon: FolderSync, color: 'from-amber-500 to-orange-500', href: 'http://192.168.1.102:8090' },
  { name: 'Gitea', address: '192.168.1.102:3001', description: '私有Git仓库', icon: Globe, color: 'from-cyan-500 to-blue-500', href: 'http://192.168.1.102:3001' },
  { name: 'Camunda', address: '192.168.1.102:8091', description: 'BPM工作流', icon: Workflow, color: 'from-orange-500 to-red-500', href: 'http://192.168.1.102:8091' },
  { name: 'Flowable', address: '192.168.1.102:8092', description: '工作流引擎', icon: Activity, color: 'from-emerald-500 to-green-500', href: 'http://192.168.1.102:8092/flowable-ui/' },
  { name: 'Second Brain', address: '192.168.1.102:3456', description: '知识库系统', icon: LayoutGrid, color: 'from-pink-500 to-rose-500', href: 'http://192.168.1.102:3456' },
  { name: 'Mission Control', address: '192.168.1.102:3456/mission-control-live', description: '系统监控仪表板', icon: Gauge, color: 'from-indigo-500 to-violet-500', href: 'http://192.168.1.102:3456/mission-control-live' },
  { name: 'OpenCode', address: '192.168.1.102:8080', description: 'AI编码助手', icon: Cpu, color: 'from-cyan-600 to-blue-600', href: 'http://192.168.1.102:8080' },
];

// 获取当前季节
function getCurrentSeason() {
  const month = new Date().getMonth();
  const seasonIndex = Math.floor(month / 3) % 4;
  return SEASONS[seasonIndex];
}

// 获取模拟天气
function getWeather() {
  const hour = new Date().getHours();
  if (hour < 6 || hour > 20) return WEATHER_TYPES[0]; // 晴天
  return WEATHER_TYPES[0]; // 默认晴天
}

// 顶部状态栏组件
function StatusBar() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const season = getCurrentSeason();
  const weather = getWeather();
  const WeatherIcon = weather.icon;
  
  const [energy, setEnergy] = useState(95);
  const [health, setHealth] = useState(100);

  // 计算总金币
  const totalGold = useMemo(() => {
    return (networkDevices.length * 100) + (dockerApps.length * 50) + (nasApps.length * 30) + (macStudioApps.length * 40);
  }, []);

  return (
    <div className={`stardew-dialog-header px-4 py-3 flex items-center justify-between`}>
      {/* 左侧：日期和季节 */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{season.icon}</span>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#5C4033] dark:text-[#D4C4A8]" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.1)' }}>
              {season.name}季
            </span>
            <SimpleStardewTime />
          </div>
        </div>
        
        {/* 分隔线 */}
        <div className={`w-px h-8 ${isDark ? 'bg-[#5C4A3D]' : 'bg-[#8B7355]/50'}`} />
        
        {/* 天气 */}
        <div className="flex items-center gap-2">
          <WeatherIcon className="w-5 h-5" style={{ color: weather.color }} />
          <span className="text-sm text-[#5C4033] dark:text-[#D4C4A8]">{weather.label}</span>
        </div>
      </div>

      {/* 中间：金币 */}
      <GoldDisplay amount={totalGold} size="md" />

      {/* 右侧：能量和生命值 */}
      <div className="flex items-center gap-4">
        {/* 能量条 */}
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-500" />
          <div className="w-20 h-3 bg-[#D4C4A8] dark:bg-[#2A2520] rounded-sm border-2 border-[#8B7355] overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-500"
              style={{ width: `${energy}%` }}
            />
          </div>
        </div>
        
        {/* 生命值 */}
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-red-500 fill-red-500" />
          <HeartHealth health={health} size="sm" />
        </div>
      </div>
    </div>
  );
}

// 背包格子组件
function InventorySlot({ 
  children, 
  className = '', 
  selected = false,
  onClick,
  tooltip
}: { 
  children?: React.ReactNode; 
  className?: string;
  selected?: boolean;
  onClick?: () => void;
  tooltip?: string;
}) {
  return (
    <div
      onClick={onClick}
      title={tooltip}
      className={`inventory-slot relative flex items-center justify-center p-2 cursor-pointer transition-all duration-100 ${selected ? 'selected' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

// 设备卡片（格子形式）
function DeviceInventoryItem({ device, index }: { device: NetworkDevice; index: number }) {
  const Icon = device.icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={device.href}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <InventorySlot selected={isHovered} tooltip={`${device.name} - ${device.description}`}>
        <div className="flex flex-col items-center gap-1 w-full">
          <div className={`w-10 h-10 rounded flex items-center justify-center bg-gradient-to-br ${device.color}`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs font-bold text-[#5C4033] dark:text-[#D4C4A8] truncate w-full text-center">
            {device.name}
          </span>
          <span className="text-[10px] text-[#8B7355] dark:text-[#8B7355] truncate w-full text-center">
            {device.address}
          </span>
        </div>
      </InventorySlot>
    </a>
  );
}

// 应用卡片（格子形式）
function AppInventoryItem({ app, index }: { app: AppService; index: number }) {
  const Icon = app.icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={app.href}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <InventorySlot selected={isHovered} tooltip={`${app.name} - ${app.description}`}>
        <div className="flex flex-col items-center gap-1 w-full">
          <div className={`w-9 h-9 rounded flex items-center justify-center bg-gradient-to-br ${app.color}`}>
            <Icon className="w-4 h-4 text-white" />
          </div>
          <span className="text-xs font-bold text-[#5C4033] dark:text-[#D4C4A8] truncate w-full text-center">
            {app.name}
          </span>
        </div>
      </InventorySlot>
    </a>
  );
}

// 网站卡片（格子形式）
function SiteInventoryItem({ site, categoryId, index }: { site: Site; categoryId: string; index: number }) {
  const color = getSiteColor(site.url);
  const { isPinned, pinSite, unpinSite } = usePinnedSites();
  const pinned = isPinned(site.url, categoryId);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative group">
      <a
        href={site.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <InventorySlot selected={isHovered} tooltip={site.name}>
          <div className="flex flex-col items-center gap-1 w-full">
            <div className={`w-9 h-9 rounded flex items-center justify-center bg-gradient-to-br ${color}`}>
              <span className="text-sm font-bold text-white">{getSiteInitial(site.name)}</span>
            </div>
            <span className="text-[10px] font-bold text-[#5C4033] dark:text-[#D4C4A8] truncate w-full text-center">
              {site.name}
            </span>
          </div>
        </InventorySlot>
      </a>
      {/* 固定按钮 */}
      <button
        onClick={(e) => {
          e.preventDefault();
          if (pinned) unpinSite(site.url, categoryId);
          else pinSite({ name: site.name, url: site.url, categoryId, subCategoryId: '' });
        }}
        className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center transition-all ${
          pinned 
            ? 'bg-amber-500 text-white opacity-100' 
            : 'bg-[#8B7355] text-white opacity-0 group-hover:opacity-100'
        }`}
        style={{ fontSize: '10px' }}
      >
        {pinned ? '★' : '☆'}
      </button>
    </div>
  );
}

// 背包面板标题
function InventoryPanelTitle({ icon: Icon, title, count }: { icon: React.ElementType; title: string; count?: number }) {
  return (
    <div className="flex items-center gap-2 mb-3 px-1">
      <Icon className="w-4 h-4 text-[#8B7355] dark:text-[#D4A574]" />
      <span className="text-sm font-bold text-[#5C4033] dark:text-[#D4C4A8]">{title}</span>
      {count !== undefined && (
        <span className="text-xs px-1.5 py-0.5 rounded bg-[#D4C4A8] dark:bg-[#3A3530] text-[#8B7355] dark:text-[#A68B6A]">
          {count}
        </span>
      )}
    </div>
  );
}

// 底部工具栏
function BottomToolbar() {
  const [activeTool, setActiveTool] = useState(0);

  return (
    <div className="stardew-toolbar px-4 py-2 flex items-center justify-center gap-2">
      {TOOLBAR_ITEMS.map((tool, index) => {
        const Icon = tool.icon;
        const isActive = activeTool === index;
        return (
          <button
            key={index}
            onClick={() => setActiveTool(index)}
            className={`toolbar-slot ${isActive ? 'active' : ''}`}
            title={tool.name}
          >
            <Icon className="w-5 h-5" style={{ color: isActive ? '#fff' : tool.color }} />
            {isActive && (
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap px-2 py-0.5 rounded bg-[#5C4033] text-white">
                {tool.name}
              </span>
            )}
          </button>
        );
      })}
      
      {/* 分隔 */}
      <div className="w-px h-8 bg-[#8B7355]/30 mx-2" />
      
      {/* 系统按钮 */}
      <button className="toolbar-slot" title="设置">
        <Settings className="w-5 h-5 text-[#8B7355]" />
      </button>
    </div>
  );
}

// 主面板
function MainPanel() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // 获取所有网站
  const allSites = useMemo(() => {
    const sites: { site: Site; categoryId: string }[] = [];
    allCategories.forEach(cat => {
      cat.data.forEach(sub => {
        sub.sites.forEach(site => {
          sites.push({ site, categoryId: cat.id });
        });
      });
    });
    return sites;
  }, []);

  return (
    <div className="flex-1 overflow-auto p-4">
      {/* 背包区域 */}
      <div className="stardew-inventory-panel p-4">
        {/* 网络设备背包 */}
        <div className="mb-6">
          <InventoryPanelTitle icon={Router} title="网络设备" count={networkDevices.length} />
          <div className="inventory-grid">
            {networkDevices.map((device, index) => (
              <DeviceInventoryItem key={device.name} device={device} index={index} />
            ))}
          </div>
        </div>

        {/* Docker服务背包 */}
        <div className="mb-6">
          <InventoryPanelTitle icon={Layers} title="Docker 服务" count={dockerApps.length} />
          <div className="inventory-grid">
            {dockerApps.map((app, index) => (
              <AppInventoryItem key={app.name} app={app} index={index} />
            ))}
          </div>
        </div>

        {/* NAS和Mac Studio背包（并排） */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <InventoryPanelTitle icon={HardDrive} title="NAS 应用" count={nasApps.length} />
            <div className="inventory-grid">
              {nasApps.map((app, index) => (
                <AppInventoryItem key={app.name} app={app} index={index} />
              ))}
            </div>
          </div>
          
          <div>
            <InventoryPanelTitle icon={Monitor} title="Mac Studio" count={macStudioApps.length} />
            <div className="inventory-grid">
              {macStudioApps.map((app, index) => (
                <AppInventoryItem key={app.name} app={app} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* 常用网站背包 */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3 px-1">
            <InventoryPanelTitle icon={Globe} title="常用网站" count={allSites.length} />
            <Link to="/websites" className="text-xs text-[#4A7C59] hover:text-[#5A8C69] font-medium">
              查看全部 →
            </Link>
          </div>
          <div className="inventory-grid">
            {allSites.slice(0, 12).map(({ site, categoryId }, index) => (
              <SiteInventoryItem key={site.url} site={site} categoryId={categoryId} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// 主仪表板
function Dashboard() {
  const { logout } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="stardew-game-container min-h-screen flex flex-col">
      {/* 游戏背景 */}
      <div className="stardew-bg-pattern absolute inset-0 pointer-events-none" />
      
      {/* 顶部状态栏 */}
      <header className="relative z-10">
        <StatusBar />
      </header>

      {/* 主内容区 */}
      <MainPanel />

      {/* 底部工具栏 */}
      <footer className="relative z-10 pb-4">
        <BottomToolbar />
        
        {/* 版本信息 */}
        <div className="text-center mt-2">
          <span className="text-[10px] text-[#8B7355] dark:text-[#5C4A3D]">
            Mini-Home Dashboard v{APP_VERSION}
          </span>
        </div>
      </footer>

      {/* 退出按钮（悬浮） */}
      <button
        onClick={logout}
        className="fixed top-4 right-4 z-50 stardew-btn-sm flex items-center gap-1 px-3 py-1.5"
        title="退出登录"
      >
        <LogOut className="w-4 h-4" />
        <span className="text-xs">退出</span>
      </button>
    </div>
  );
}

// App content wrapper
function AppContent() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/websites" element={<WebsitesPage />} />
      <Route path="/websites/:categoryId/:subCategoryId" element={<CategoryDetailPage />} />
      <Route path="/category/:categoryId/:subCategoryId" element={<CategoryDetailPage />} />
    </Routes>
  );
}

// Main app
function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
