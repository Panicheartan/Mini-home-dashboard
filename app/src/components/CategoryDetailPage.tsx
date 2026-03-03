import { useParams, Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import {
  Bot,
  Sparkles,
  BookOpen,
  Wrench,
  Pin,
  PinOff,
  ArrowLeft,
  Home,
  LogOut,
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
  subCategoryId: string;
  isPinned: boolean;
  onPin: () => void;
  onUnpin: () => void;
}

function SiteCard({ site, isPinned, onPin, onUnpin }: SiteCardProps) {
  const color = getSiteColor(site.url);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="group relative h-[132px]">
      <a
        href={site.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl backdrop-blur-sm border transition-all h-full ${
          isDark
            ? 'bg-slate-900/80 border-slate-700/50 hover:border-indigo-500/50 hover:bg-slate-800/80'
            : 'bg-white/80 border-slate-200 hover:border-indigo-300 hover:bg-white'
        }`}
      >
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${color} shadow-md`}>
          <span className="text-base font-bold text-white">{getSiteInitial(site.name)}</span>
        </div>
        <div className="text-center">
          <p className={`text-sm font-semibold truncate max-w-[120px] ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>{site.name}</p>
          <p className={`text-xs truncate max-w-[120px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{site.description || ' '}</p>
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

// Detail page component
export function CategoryDetailPage() {
  const { categoryId, subCategoryId } = useParams<{ categoryId: string; subCategoryId: string }>();
  const { logout } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const categoryInfo = useMemo(() => {
    const category = allCategories.find(c => c.id === categoryId);
    if (!category) return null;
    const subCategory = category.data.find(sc => sc.id === subCategoryId);
    return { category, subCategory };
  }, [categoryId, subCategoryId]);

  if (!categoryInfo || !categoryInfo.subCategory) {
    return (
      <UnifiedBackground>
        <div className="min-h-screen flex items-center justify-center">
          <div className={`text-center rounded-2xl p-8 border shadow-lg ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <p className={`mb-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>分类不存在</p>
            <Link to="/" className="text-indigo-600 hover:text-indigo-500 transition-colors">
              返回首页
            </Link>
          </div>
        </div>
      </UnifiedBackground>
    );
  }

  const { category, subCategory } = categoryInfo;
  const Icon = categoryIcons[category.id] || Bot;
  const categoryColor = categoryColors[category.id] || 'from-blue-500 to-indigo-600';
  const [currentDate] = useState(new Date().toLocaleDateString('zh-CN'));

  return (
    <UnifiedBackground>
      <div className="min-h-screen">
        {/* Header */}
        <header className={`sticky top-0 z-50 backdrop-blur-xl border-b ${isDark ? 'bg-slate-950/80 border-slate-800/50' : 'bg-white/80 border-slate-200'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <Link
                  to="/websites"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Link>
                <Link
                  to="/"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors"
                >
                  <Home className="h-5 w-5 text-white" />
                </Link>
                <div className="flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${categoryColor}`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h1 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{subCategory.name}</h1>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{category.name}</p>
                  </div>
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
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Info Card */}
          <div className={`mb-8 p-6 rounded-2xl border ${isDark ? 'bg-slate-900/50 border-slate-700/50' : 'bg-white/80 border-slate-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className={`text-xl font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{subCategory.name}</h2>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  共 {subCategory.sites.length} 个网站
                </p>
              </div>
              <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${categoryColor} shadow-lg`}>
                <Icon className="h-7 w-7 text-white" />
              </div>
            </div>
          </div>

          {/* Sites Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {subCategory.sites.map((site) => (
              <SiteCard
                key={`${category.id}-${subCategory.id}-${site.url}`}
                site={site}
                categoryId={category.id}
                subCategoryId={subCategory.id}
                isPinned={usePinnedSites().isPinned(site.url, category.id)}
                onPin={() => usePinnedSites().pinSite({ name: site.name, url: site.url, categoryId: category.id, subCategoryId: subCategory.id })}
                onUnpin={() => usePinnedSites().unpinSite(site.url, category.id)}
              />
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className={`border-t mt-12 ${isDark ? 'border-slate-800/50' : 'border-slate-200'}`}>
          <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            网址导航 · v2.0.0 · {currentDate}
          </div>
        </footer>
      </div>
    </UnifiedBackground>
  );
}

export default CategoryDetailPage;
