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
} from 'lucide-react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeToggle } from './components/ThemeToggle';
import { HeartHealth } from './components/stardew/HeartHealth';
import { GoldDisplay } from './components/stardew/GoldDisplay';
import { StardewTime } from './components/stardew/StardewTime';
import { LoginPage } from './components/LoginPage';
import { WebsitesPage } from './components/WebsitesPage';
import { CategoryDetailPage } from './components/CategoryDetailPage';
import { Button } from '@/components/ui/button';
import { allCategories } from '@/data/websites';
import { usePinnedSites } from '@/hooks/usePinnedSites';
import { useMemo, useState, useEffect } from 'react';
import { getSiteColor, getSiteInitial } from '@/lib/utils';
import type { NetworkDevice, AppService, Site } from '@/types';
import { UnifiedBackground } from './components/UnifiedBackground';

const APP_VERSION = '2.1.0';

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

// Animation wrapper component
function AnimatedCard({ children, index, className = '' }: { children: React.ReactNode; index: number; className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 50);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`transition-all duration-500 ease-out ${className} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${index * 30}ms` }}
    >
      {children}
    </div>
  );
}

// Device card - unified spacing and sizing
function DeviceCard({ device, index }: { device: NetworkDevice; index: number }) {
  const Icon = device.icon;
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <AnimatedCard index={index}>
      <a
        href={device.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`card-hover group relative flex items-center gap-4 p-4 rounded-2xl overflow-hidden hover:-translate-y-0.5`}
      >
        {/* Gradient overlay on hover */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          isDark ? 'bg-gradient-to-r from-slate-800/50 to-transparent' : 'bg-gradient-to-r from-slate-50/50 to-transparent'
        }`} />
        
        {/* Icon container - unified size */}
        <div className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${device.color} shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300`}>
          <Icon className="h-6 w-6 text-white" />
          {/* Status indicator */}
          <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white dark:border-slate-900" />
        </div>
        
        <div className="relative flex-1 min-w-0">
          <h3 className={`text-sm font-semibold leading-tight truncate ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
            {device.name}
          </h3>
          <p className={`text-xs leading-tight truncate mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {device.description}
          </p>
          <p className={`text-xs font-mono leading-tight truncate mt-0.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            {device.address}
          </p>
        </div>
        
        {/* Arrow indicator */}
        <div className={`opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 ${
          isDark ? 'text-slate-400' : 'text-slate-400'
        }`}>
          <Zap className="h-4 w-4" />
        </div>
      </a>
    </AnimatedCard>
  );
}

// App card - unified sizing and spacing
function AppCard({ app, index }: { app: AppService; index: number }) {
  const Icon = app.icon;
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <AnimatedCard index={index}>
      <a
        href={app.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`card-hover group relative flex items-center gap-3 p-4 rounded-xl overflow-hidden hover:-translate-y-0.5`}
      >
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          isDark ? 'bg-gradient-to-r from-slate-800/50 to-transparent' : 'bg-gradient-to-r from-slate-50/50 to-transparent'
        }`} />
        
        <div className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${app.color} shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        
        <div className="relative flex-1 min-w-0">
          <h3 className={`text-sm font-medium leading-tight truncate ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
            {app.name}
          </h3>
          <p className={`text-xs leading-tight truncate mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {app.description}
          </p>
        </div>
      </a>
    </AnimatedCard>
  );
}

// Site card - consistent compact layout
function SiteCard({ site, categoryId, index }: { site: Site; categoryId: string; index: number }) {
  const color = getSiteColor(site.url);
  const { isPinned, pinSite, unpinSite } = usePinnedSites();
  const pinned = isPinned(site.url, categoryId);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <AnimatedCard index={index}>
      <div className="group relative">
        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`card-hover flex items-center gap-3 p-3 rounded-xl hover:-translate-y-0.5`}
        >
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${color} shadow-md`}>
            <span className="text-xs font-bold text-white">{getSiteInitial(site.name)}</span>
          </div>
          <span className={`text-sm leading-tight truncate ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
            {site.name}
          </span>
        </a>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (pinned) unpinSite(site.url, categoryId);
            else pinSite({ name: site.name, url: site.url, categoryId, subCategoryId: '' });
          }}
          className={`absolute top-2 right-2 p-1.5 rounded-lg transition-all duration-200 ${
            pinned
              ? 'text-indigo-500 opacity-100'
              : `${isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'} opacity-0 group-hover:opacity-100`
          }`}
        >
          {pinned ? <PinOff className="h-3.5 w-3.5" /> : <Pin className="h-3.5 w-3.5" />}
        </button>
      </div>
    </AnimatedCard>
  );
}

// Section header component - unified spacing
function SectionHeader({ icon: Icon, title, count, className = '' }: { icon: React.ElementType; title: string; count?: number; className?: string }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`flex items-center gap-3 mb-4 ${className}`}>
      <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${
        isDark 
          ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50' 
          : 'bg-gradient-to-br from-slate-100 to-white border border-slate-200/80'
      } shadow-sm`}>
        <Icon className={`h-4 w-4 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
      </div>
      <div className="flex items-center gap-2">
        <h2 className={`text-sm font-semibold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{title}</h2>
        {count !== undefined && (
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            isDark ? 'bg-slate-800/80 text-slate-400 border border-slate-700/50' : 'bg-slate-100 text-slate-500 border border-slate-200/80'
          }`}>
            {count}
          </span>
        )}
      </div>
    </div>
  );
}

// Stats card component - unified sizing
function StatsCard({ icon: Icon, label, value, color, index }: {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
  index: number;
}) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <AnimatedCard index={index}>
      <div className="card-hover group p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${color} shadow-md group-hover:shadow-lg transition-all duration-300`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className={`text-xs leading-tight ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</p>
            <p className={`text-lg font-bold leading-tight mt-0.5 ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>{value}</p>
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
}

// Main dashboard
function Dashboard() {
  const { logout } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [currentDate] = useState(new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  }));
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit'
  }));

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit'
      }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Get all sites for favorites
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

  // Calculate totals for stats
  const totalDevices = networkDevices.length;
  const totalDockerApps = dockerApps.length;
  const totalApps = nasApps.length + macStudioApps.length;

  return (
    <UnifiedBackground>
      <div className="min-h-screen">
        {/* Header - enhanced with glass effect */}
        <header className={`sticky top-0 z-50 backdrop-blur-xl border-b ${
          isDark 
            ? 'bg-slate-950/80 border-slate-800/50' 
            : 'bg-white/80 border-slate-200/80'
        }`}>
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
                  <Wifi className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    家庭网络
                  </h1>
                  <div className="flex items-center gap-2">
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {currentDate}
                    </p>
                    <span className={`text-xs ${isDark ? 'text-slate-600' : 'text-slate-300'}`}>·</span>
                    <p className={`text-xs font-mono ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                      {currentTime}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link to="/websites">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`gap-2 rounded-lg ${
                      isDark 
                        ? 'text-slate-300 hover:text-indigo-400 hover:bg-slate-800/80' 
                        : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-100/80'
                    }`}
                  >
                    <Globe className="h-4 w-4" />
                    <span className="hidden sm:inline">网址导航</span>
                  </Button>
                </Link>
                <div className={`w-px h-6 ${isDark ? 'bg-slate-700/50' : 'bg-slate-200/80'}`} />
                <ThemeToggle />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className={`gap-2 rounded-lg ${
                    isDark 
                      ? 'text-slate-300 hover:text-red-400 hover:bg-slate-800/80' 
                      : 'text-slate-600 hover:text-red-600 hover:bg-slate-100/80'
                  }`}
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">退出</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content - Bento Grid Layout */}
        <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <StatsCard 
              icon={LayoutGrid} 
              label="网络设备" 
              value={totalDevices.toString()} 
              color="from-blue-500 to-cyan-500"
              index={0}
            />
            <StatsCard 
              icon={Layers} 
              label="Docker服务" 
              value={totalDockerApps.toString()} 
              color="from-violet-500 to-purple-500"
              index={1}
            />
            <StatsCard 
              icon={Monitor} 
              label="应用服务" 
              value={totalApps.toString()} 
              color="from-emerald-500 to-teal-500"
              index={2}
            />
            <StatsCard 
              icon={Globe} 
              label="常用网站" 
              value={allSites.length.toString()} 
              color="from-pink-500 to-rose-500"
              index={3}
            />
          </div>

          {/* Stardew Valley Status Bar */}
          <div className={`flex flex-wrap items-center justify-between gap-4 p-4 mb-8 rounded-2xl border-2 ${
            isDark 
              ? 'bg-gradient-to-r from-amber-900/30 to-orange-900/30 border-amber-700/50' 
              : 'bg-gradient-to-r from-amber-100 to-orange-100 border-amber-300'
          }`}>
            <div className="flex items-center gap-4">
              <GoldDisplay amount={totalDockerApps * 100 + totalApps * 50} />
              <div className={`w-px h-8 ${isDark ? 'bg-amber-700/50' : 'bg-amber-300'}`} />
              <StardewTime />
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-sm ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>系统健康度</span>
              <HeartHealth health={95} size="md" />
            </div>
          </div>

          {/* Main Bento Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Left column - Network Devices (xl:col-span-3) */}
            <div className="xl:col-span-3 space-y-6">
              <section className="card-bento p-5">
                <SectionHeader icon={LayoutGrid} title="网络设备" count={networkDevices.length} />
                <div className="space-y-3">
                  {networkDevices.map((device, index) => (
                    <DeviceCard key={device.name} device={device} index={index} />
                  ))}
                </div>
              </section>

              {/* Quick Links - Compact */}
              <section className="card-bento p-5">
                <div className="flex items-center justify-between mb-4">
                  <SectionHeader icon={Globe} title="常用网站" className="mb-0" />
                  <Link to="/websites" className={`text-xs font-medium ${
                    isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-500'
                  }`}>
                    全部 →
                  </Link>
                </div>
                <div className="space-y-2">
                  {allSites.slice(0, 6).map(({ site, categoryId }, index) => (
                    <SiteCard key={site.url} site={site} categoryId={categoryId} index={index} />
                  ))}
                </div>
              </section>
            </div>

            {/* Middle column - Docker Apps (xl:col-span-5) */}
            <div className="xl:col-span-5 space-y-6">
              <section className="card-bento p-5">
                <SectionHeader icon={Layers} title="Docker 服务" count={dockerApps.length} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {dockerApps.map((app, index) => (
                    <AppCard key={app.name} app={app} index={index} />
                  ))}
                </div>
              </section>

              {/* NAS & Mac Studio - Side by side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <section className="card-bento p-5">
                  <SectionHeader icon={HardDrive} title="NAS" count={nasApps.length} />
                  <div className="space-y-2">
                    {nasApps.map((app, index) => (
                      <AppCard key={app.name} app={app} index={index} />
                    ))}
                  </div>
                </section>

                <section className="card-bento p-5">
                  <SectionHeader icon={Monitor} title="Mac Studio" count={macStudioApps.length} />
                  <div className="space-y-2">
                    {macStudioApps.map((app, index) => (
                      <AppCard key={app.name} app={app} index={index} />
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* Right column - Extended Quick Links or additional info (xl:col-span-4) */}
            <div className="xl:col-span-4 space-y-6">
              {/* System Status Panel */}
              <section className="card-feature p-5">
                <SectionHeader icon={Activity} title="系统状态" />
                <div className="space-y-4">
                  <div className={`p-4 rounded-2xl ${
                    isDark ? 'bg-slate-800/50' : 'bg-slate-100/80'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>网络状态</span>
                      <span className="flex items-center gap-1.5 text-xs text-emerald-500 font-medium">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        正常
                      </span>
                    </div>
                    <div className={`h-2 rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-200'} overflow-hidden`}>
                      <div className="h-full w-[95%] bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-2xl ${
                    isDark ? 'bg-slate-800/50' : 'bg-slate-100/80'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>存储空间</span>
                      <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>72%</span>
                    </div>
                    <div className={`h-2 rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-200'} overflow-hidden`}>
                      <div className="h-full w-[72%] bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-2xl ${
                    isDark ? 'bg-slate-800/50' : 'bg-slate-100/80'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>服务运行</span>
                      <span className={`text-xs ${isDark ? 'text-indigo-400' : 'text-indigo-600'} font-medium`}>
                        {dockerApps.length + nasApps.length + macStudioApps.length} 个服务
                      </span>
                    </div>
                    <div className="flex gap-1.5 mt-2">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div 
                          key={i} 
                          className={`flex-1 h-8 rounded-lg ${
                            isDark 
                              ? 'bg-gradient-to-b from-indigo-500/30 to-indigo-600/10 border border-indigo-500/20' 
                              : 'bg-gradient-to-b from-indigo-500/20 to-indigo-600/5 border border-indigo-500/10'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* More Quick Links */}
              <section className="card-bento p-5">
                <div className="flex items-center justify-between mb-4">
                  <SectionHeader icon={Globe} title="更多网站" className="mb-0" />
                  <Link to="/websites" className={`text-xs font-medium ${
                    isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-500'
                  }`}>
                    全部 →
                  </Link>
                </div>
                <div className="space-y-2">
                  {allSites.slice(6, 14).map(({ site, categoryId }, index) => (
                    <SiteCard key={site.url} site={site} categoryId={categoryId} index={index} />
                  ))}
                </div>
              </section>
            </div>
          </div>
        </main>

        {/* Footer - enhanced */}
        <footer className={`border-t mt-12 ${
          isDark ? 'border-slate-800/50' : 'border-slate-200/80'
        }`}>
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 text-sm ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                  isDark ? 'bg-slate-800/80' : 'bg-slate-100'
                }`}>
                  <Settings className="h-4 w-4" />
                </div>
                <div>
                  <p className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                    家庭网络仪表板
                  </p>
                  <p className="text-xs">v{APP_VERSION} · {currentDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  系统正常运行
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </UnifiedBackground>
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
