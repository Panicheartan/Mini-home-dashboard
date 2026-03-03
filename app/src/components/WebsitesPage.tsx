import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bot,
  Sparkles,
  BookOpen,
  Wrench,
  Pin,
  PinOff,
  Home,
  LogOut,
  Globe,
} from 'lucide-react';
import { allCategories } from '@/data/websites';
import { usePinnedSites } from '@/hooks/usePinnedSites';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getSiteColor, getSiteInitial } from '@/lib/utils';
import { UnifiedBackground } from './UnifiedBackground';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';
import type { Site } from '@/types';

// Category icon mapping
const categoryIcons: Record<string, React.ElementType> = {
  ai: Bot,
  entertainment: Sparkles,
  knowledge: BookOpen,
  tools: Wrench,
};

// Category colors
const categoryColors: Record<string, string> = {
  ai: 'from-blue-500 to-indigo-600',
  entertainment: 'from-pink-500 to-rose-600',
  knowledge: 'from-emerald-500 to-teal-600',
  tools: 'from-amber-500 to-orange-600',
};

// Site card component
interface SiteCardProps {
  site: Site;
  categoryId: string;
  isPinned: boolean;
  onPin: () => void;
  onUnpin: () => void;
}

function SiteCard({ site, isPinned, onPin, onUnpin }: SiteCardProps) {
  const color = getSiteColor(site.url);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="group relative h-[68px]">
      <a
        href={site.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-3 p-3 rounded-xl backdrop-blur-sm border transition-all h-full ${
          isDark
            ? 'bg-slate-900/80 border-slate-700/50 hover:border-indigo-500/50 hover:bg-slate-800/80'
            : 'bg-white/80 border-slate-200 hover:border-indigo-300 hover:bg-white'
        }`}
      >
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${color} shrink-0`}>
          <span className="text-sm font-semibold text-white">{getSiteInitial(site.name)}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium truncate ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>{site.name}</p>
          <p className={`text-xs truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{site.description || ' '}</p>
        </div>
      </a>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (isPinned) onUnpin(); else onPin();
        }}
        className={`absolute top-2 right-2 p-1.5 rounded-lg transition-all ${
          isPinned
            ? 'text-indigo-500'
            : `${isDark ? 'text-slate-500 hover:text-slate-300 hover:bg-slate-700/50' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200/50'} opacity-0 group-hover:opacity-100`
        }`}
      >
        {isPinned ? <PinOff className="h-3.5 w-3.5" /> : <Pin className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}

// Category section component
interface CategorySectionProps {
  categoryId: string;
  categoryName: string;
  sites: Site[];
}

function CategorySection({ categoryId, categoryName, sites }: CategorySectionProps) {
  const Icon = categoryIcons[categoryId] || Bot;
  const { pinSite, unpinSite, isPinned } = usePinnedSites();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const { pinned, unpinned } = useMemo(() => {
    const pinned: Site[] = [];
    const unpinned: Site[] = [];
    sites.forEach(site => {
      if (isPinned(site.url, categoryId)) {
        pinned.push(site);
      } else {
        unpinned.push(site);
      }
    });
    return { pinned, unpinned };
  }, [sites, categoryId, isPinned]);

  if (sites.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${categoryColors[categoryId] || 'from-blue-500 to-indigo-600'}`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className={`text-lg font-semibold ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>{categoryName}</h2>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{sites.length} 个网站</p>
          </div>
        </div>
        {pinned.length > 0 && (
          <span className={`text-xs font-medium px-3 py-1 rounded-full ${isDark ? 'text-indigo-300 bg-indigo-500/20' : 'text-indigo-600 bg-indigo-100'}`}>
            {pinned.length} 已固定
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {[...pinned, ...unpinned].map((site) => (
          <SiteCard
            key={`${categoryId}-${site.url}`}
            site={site}
            categoryId={categoryId}
            isPinned={isPinned(site.url, categoryId)}
            onPin={() => pinSite({ name: site.name, url: site.url, categoryId, subCategoryId: '' })}
            onUnpin={() => unpinSite(site.url, categoryId)}
          />
        ))}
      </div>
    </section>
  );
}

// Main page component
export function WebsitesPage() {
  const { logout } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [currentDate] = useState(new Date().toLocaleDateString('zh-CN'));

  const totalSites = useMemo(() => {
    return allCategories.reduce((acc, cat) => acc + cat.data.flatMap(sub => sub.sites).length, 0);
  }, []);

  return (
    <UnifiedBackground>
      <div className="min-h-screen">
        {/* Header */}
        <header className={`sticky top-0 z-50 backdrop-blur-xl border-b ${isDark ? 'bg-slate-950/80 border-slate-800/50' : 'bg-white/80 border-slate-200'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <Link
                  to="/"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  <Home className="h-5 w-5" />
                </Link>
                <div>
                  <h1 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>网址导航</h1>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{totalSites} 个网站</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
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
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
          {allCategories.map(category => (
            <CategorySection
              key={category.id}
              categoryId={category.id}
              categoryName={category.name}
              sites={category.data.flatMap(sub => sub.sites)}
            />
          ))}
        </main>

        {/* Footer */}
        <footer className={`border-t mt-12 ${isDark ? 'border-slate-800/50' : 'border-slate-200'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <p>网址导航 · v2.0.0 · {currentDate}</p>
              <Link to="/" className={`flex items-center gap-2 transition-colors ${isDark ? 'hover:text-indigo-400' : 'hover:text-indigo-600'}`}>
                <Globe className="h-4 w-4" />
                返回仪表板
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </UnifiedBackground>
  );
}

export default WebsitesPage;
