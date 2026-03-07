import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {
  Router,
  Server,
  HardDrive,
  Wifi,
  Monitor,
  Container,
  Activity,
  Play,
  Film,
  Subtitles,
  Search,
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
} from 'lucide-react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeToggle } from './components/ThemeToggle';
import { LoginPage } from './components/LoginPage';
import { WebsitesPage } from './components/WebsitesPage';
import { CategoryDetailPage } from './components/CategoryDetailPage';
import { Button } from '@/components/ui/button';
import { allCategories } from '@/data/websites';
import { usePinnedSites } from '@/hooks/usePinnedSites';
import { useMemo, useState } from 'react';
import { getSiteColor, getSiteInitial } from '@/lib/utils';
import type { NetworkDevice, AppService, Site } from '@/types';
import { UnifiedBackground } from './components/UnifiedBackground';

const APP_VERSION = '2.0.0';

// Network devices
const networkDevices: NetworkDevice[] = [
  { name: '光猫', address: '192.168.1.1', description: '光纤调制解调器', icon: Router, color: 'from-blue-500 to-blue-600', href: 'http://192.168.1.1' },
  { name: '软路由', address: '192.168.1.2', description: 'OpenWrt 路由', icon: Server, color: 'from-violet-500 to-violet-600', href: 'http://192.168.1.2' },
  { name: 'NAS', address: '192.168.1.6:8080', description: '群晖存储', icon: HardDrive, color: 'from-emerald-500 to-emerald-600', href: 'http://192.168.1.6:8080' },
  { name: '光猫副机', address: '192.168.1.4', description: '光猫备机', icon: Router, color: 'from-blue-400 to-blue-500', href: 'http://192.168.1.4' },
  { name: 'Mac Studio', address: '192.168.1.102', description: '开发工作站', icon: Monitor, color: 'from-pink-500 to-pink-600', href: 'http://192.168.1.102' },
];

// Docker apps
const dockerApps: AppService[] = [
  { name: 'Portainer', address: '192.168.1.6:9000', description: 'Docker可视化管理', icon: Container, color: 'from-cyan-500 to-cyan-600', href: 'http://192.168.1.6:9000' },
  { name: 'Node-RED', address: '192.168.1.6:1880', description: '低代码自动化', icon: Workflow, color: 'from-red-500 to-red-600', href: 'http://192.168.1.6:1880' },
  { name: 'Uptime Kuma', address: '192.168.1.6:3002', description: '服务监控', icon: Activity, color: 'from-green-500 to-green-600', href: 'http://192.168.1.6:3002' },
  { name: 'Sonarr', address: '192.168.1.6:8989', description: '电视剧管理', icon: Play, color: 'from-indigo-500 to-indigo-600', href: 'http://192.168.1.6:8989' },
  { name: 'Radarr', address: '192.168.1.6:7878', description: '电影管理', icon: Film, color: 'from-yellow-500 to-yellow-600', href: 'http://192.168.1.6:7878' },
  { name: 'Bazarr', address: '192.168.1.6:6767', description: '字幕管理', icon: Subtitles, color: 'from-orange-500 to-orange-600', href: 'http://192.168.1.6:6767' },
  { name: 'Home Assistant', address: '192.168.1.6:8123', description: '智能家居', icon: Home, color: 'from-blue-600 to-blue-700', href: 'http://192.168.1.6:8123' },
  { name: 'Mini-Home', address: '192.168.1.6:3003', description: '家庭导航页', icon: Globe, color: 'from-pink-500 to-rose-500', href: 'http://192.168.1.6:3003' },
  { name: 'n8n', address: '192.168.1.6:3001', description: '工作流自动化', icon: Workflow, color: 'from-orange-600 to-red-600', href: 'http://192.168.1.6:3001' },
];

// NAS apps
const nasApps: AppService[] = [
  { name: 'Plex', address: '192.168.1.6:32400', description: '媒体服务器', icon: Play, color: 'from-yellow-400 to-yellow-500', href: 'http://192.168.1.6:32400' },
  { name: 'WordPress', address: '192.168.1.6/WordPress', description: '博客系统', icon: Globe, color: 'from-blue-500 to-blue-600', href: 'http://192.168.1.6/WordPress' },
  { name: '网络测速', address: '192.168.1.2:3200', description: '内网测速', icon: Gauge, color: 'from-green-500 to-green-600', href: 'http://192.168.1.2:3200' },
];

// Mac Studio apps
const macStudioApps: AppService[] = [
  { name: 'Open WebUI', address: '192.168.1.102:3000', description: 'AI聊天界面', icon: Bot, color: 'from-violet-500 to-purple-500', href: 'http://192.168.1.102:3000' },
  { name: 'InvenTree', address: '192.168.1.102:8090', description: '库存管理系统', icon: FolderSync, color: 'from-amber-500 to-orange-500', href: 'http://192.168.1.102:8090' },
  { name: 'Gitea', address: '192.168.1.102:3001', description: '私有Git仓库', icon: Globe, color: 'from-blue-500 to-cyan-500', href: 'http://192.168.1.102:3001' },
  { name: 'Camunda', address: '192.168.1.102:8091', description: 'BPM工作流', icon: Workflow, color: 'from-orange-500 to-red-500', href: 'http://192.168.1.102:8091' },
  { name: 'Flowable', address: '192.168.1.102:8092', description: '工作流引擎', icon: Activity, color: 'from-green-500 to-emerald-500', href: 'http://192.168.1.102:8092/flowable-ui/' },
  // Second Brain & OpenCode
  { name: 'Second Brain', address: '192.168.1.102:3456', description: '知识库系统', icon: LayoutGrid, color: 'from-pink-500 to-rose-500', href: 'http://192.168.1.102:3456' },
  { name: 'Mission Control', address: '192.168.1.102:3456/mission-control-live', description: '系统监控仪表板', icon: Gauge, color: 'from-indigo-500 to-violet-500', href: 'http://192.168.1.102:3456/mission-control-live' },
  { name: 'OpenCode', address: '192.168.1.102:8080', description: 'AI编码助手', icon: Monitor, color: 'from-cyan-600 to-blue-600', href: 'http://192.168.1.102:8080' },
];

// Device card
function DeviceCard({ device }: { device: NetworkDevice }) {
  const Icon = device.icon;
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <a
      href={device.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-3 p-4 rounded-xl backdrop-blur-sm border transition-all group h-[76px] ${
        isDark
          ? 'bg-slate-900/80 border-slate-700/50 hover:border-indigo-500/50 hover:bg-slate-800/80'
          : 'bg-white/80 border-slate-200 hover:border-indigo-300 hover:bg-white'
      }`}
    >
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${device.color} shadow-md`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className={`text-sm font-semibold truncate ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>{device.name}</h3>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
        </div>
        <p className={`text-xs truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{device.address}</p>
      </div>
    </a>
  );
}

// App card - horizontal layout
function AppCard({ app }: { app: AppService }) {
  const Icon = app.icon;
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <a
      href={app.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-3 p-3 rounded-xl backdrop-blur-sm border transition-all group h-[64px] ${
        isDark
          ? 'bg-slate-900/80 border-slate-700/50 hover:border-indigo-500/50 hover:bg-slate-800/80'
          : 'bg-white/80 border-slate-200 hover:border-indigo-300 hover:bg-white'
      }`}
    >
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${app.color} shadow-md`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className={`text-sm font-medium truncate ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>{app.name}</h3>
        <p className={`text-xs truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{app.description}</p>
      </div>
    </a>
  );
}

// Site card
function SiteCard({ site, categoryId }: { site: Site; categoryId: string }) {
  const color = getSiteColor(site.url);
  const { isPinned, pinSite, unpinSite } = usePinnedSites();
  const pinned = isPinned(site.url, categoryId);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="group relative">
      <a
        href={site.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-3 p-3 rounded-xl backdrop-blur-sm border transition-all h-[56px] ${
          isDark
            ? 'bg-slate-900/80 border-slate-700/50 hover:border-indigo-500/50 hover:bg-slate-800/80'
            : 'bg-white/80 border-slate-200 hover:border-indigo-300 hover:bg-white'
        }`}
      >
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${color}`}>
          <span className="text-xs font-bold text-white">{getSiteInitial(site.name)}</span>
        </div>
        <span className={`text-sm truncate ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{site.name}</span>
      </a>
      <button
        onClick={(e) => {
          e.preventDefault();
          if (pinned) unpinSite(site.url, categoryId);
          else pinSite({ name: site.name, url: site.url, categoryId, subCategoryId: '' });
        }}
        className={`absolute top-1.5 right-1.5 p-1.5 rounded-lg transition-all ${
          pinned
            ? 'text-indigo-500 opacity-100'
            : `${isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'} opacity-0 group-hover:opacity-100`
        }`}
      >
        {pinned ? <PinOff className="h-3.5 w-3.5" /> : <Pin className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}

// Section header component
function SectionHeader({ icon: Icon, title, count }: { icon: React.ElementType; title: string; count?: number }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="flex items-center gap-3 mb-4">
      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
        <Icon className={`h-4 w-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
      </div>
      <h2 className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{title}</h2>
      {count !== undefined && (
        <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
          {count}
        </span>
      )}
    </div>
  );
}

// Main dashboard
function Dashboard() {
  const { logout } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [currentDate] = useState(new Date().toLocaleDateString('zh-CN'));

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

  return (
    <UnifiedBackground>
      <div className="min-h-screen">
        {/* Header */}
        <header className={`sticky top-0 z-50 backdrop-blur-xl border-b ${isDark ? 'bg-slate-950/80 border-slate-800/50' : 'bg-white/80 border-slate-200'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600">
                  <Settings className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>家庭网络</h1>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{currentDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link to="/websites">
                  <Button variant="ghost" size="sm" className={`gap-2 ${isDark ? 'text-slate-400 hover:text-indigo-400' : 'text-slate-600 hover:text-indigo-600'}`}>
                    <Globe className="h-4 w-4" />
                    <span className="hidden sm:inline">网址导航</span>
                  </Button>
                </Link>
                <ThemeToggle />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className={`gap-2 ${isDark ? 'text-slate-400 hover:text-red-400' : 'text-slate-600 hover:text-red-600'}`}
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">退出</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left column - Network Devices */}
            <div className="lg:col-span-4 space-y-6">
              <section>
                <SectionHeader icon={LayoutGrid} title="网络设备" count={networkDevices.length} />
                <div className="grid grid-cols-1 gap-3">
                  {networkDevices.map(device => (
                    <DeviceCard key={device.name} device={device} />
                  ))}
                </div>
              </section>
            </div>

            {/* Middle column - Docker Apps */}
            <div className="lg:col-span-5 space-y-6">
              <section>
                <SectionHeader icon={Layers} title="Docker 服务" count={dockerApps.length} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {dockerApps.map(app => (
                    <AppCard key={app.name} app={app} />
                  ))}
                </div>
              </section>

              {/* NAS & Mac Studio Apps - 2x2 grid */}
              <div className="grid grid-cols-2 gap-4">
                <section>
                  <SectionHeader icon={HardDrive} title="NAS" count={nasApps.length} />
                  <div className="space-y-2">
                    {nasApps.map(app => (
                      <AppCard key={app.name} app={app} />
                    ))}
                  </div>
                </section>

                <section>
                  <SectionHeader icon={Monitor} title="Mac Studio" count={macStudioApps.length} />
                  <div className="space-y-2">
                    {macStudioApps.map(app => (
                      <AppCard key={app.name} app={app} />
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* Right column - Quick Links */}
            <div className="lg:col-span-3 space-y-6">
              <section>
                <div className="flex items-center justify-between mb-4">
                  <SectionHeader icon={Globe} title="常用网站" />
                  <Link to="/websites" className={`text-xs ${isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-500'}`}>
                    全部
                  </Link>
                </div>
                <div className="space-y-2">
                  {allSites.slice(0, 8).map(({ site, categoryId }) => (
                    <SiteCard key={site.url} site={site} categoryId={categoryId} />
                  ))}
                </div>
              </section>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className={`border-t mt-12 ${isDark ? 'border-slate-800/50' : 'border-slate-200'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <p>家庭网络仪表板 · v{APP_VERSION} · {currentDate}</p>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                系统正常运行
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
