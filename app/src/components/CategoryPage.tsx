import { useParams, Link } from 'react-router-dom';
import { useMemo } from 'react';
import { 
  Bot, 
  Sparkles, 
  BookOpen, 
  Wrench, 
  Pin, 
  PinOff,
  ArrowLeft,

} from 'lucide-react';
import { allCategories } from '@/data/websites';
import { usePinnedSites } from '@/hooks/usePinnedSites';
import { getSiteColor, getSiteInitial } from '@/lib/utils';
import type { Site } from '@/types';

// 工具函数已从 '@/lib/utils' 导入

// 分类配置
const categoryConfig: Record<string, { icon: React.ElementType; color: string; bgColor: string }> = {
  ai: { icon: Bot, color: 'from-pink-500 to-rose-500', bgColor: 'from-pink-500/10 to-rose-500/10' },
  entertainment: { icon: Sparkles, color: 'from-violet-500 to-purple-500', bgColor: 'from-violet-500/10 to-purple-500/10' },
  knowledge: { icon: BookOpen, color: 'from-cyan-500 to-teal-500', bgColor: 'from-cyan-500/10 to-teal-500/10' },
  tools: { icon: Wrench, color: 'from-amber-500 to-orange-500', bgColor: 'from-amber-500/10 to-orange-500/10' },
};

// 网站卡片组件
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
  
  return (
    <div className="group relative flex flex-col items-center justify-center gap-2 rounded-xl bg-card p-4 card-hover transition-all hover:scale-105">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (isPinned) onUnpin(); else onPin();
        }}
        className={`absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-muted z-10 ${isPinned ? 'opacity-100' : ''}`}
        title={isPinned ? '取消固定' : '固定到首页'}
      >
        {isPinned ? (
          <PinOff className="h-3.5 w-3.5 text-primary" />
        ) : (
          <Pin className="h-3.5 w-3.5 text-muted-foreground" />
        )}
      </button>
      
      <a
        href={site.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-2 w-full"
      >
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${color} shadow-lg`}>
          <span className="text-xl font-bold text-white">{getSiteInitial(site.name)}</span>
        </div>
        <div className="text-center w-full">
          <p className="text-sm font-medium text-card-foreground truncate">{site.name}</p>
          {site.description && (
            <p className="text-xs text-muted-foreground truncate mt-0.5">{site.description}</p>
          )}
        </div>
      </a>
    </div>
  );
}

// 子分类区块
function SubCategorySection({ 
  categoryId, 
  subCategory 
}: { 
  categoryId: string; 
  subCategory: { id: string; name: string; sites: Site[] } 
}) {
  const { pinSite, unpinSite, isPinned } = usePinnedSites();
  
  if (subCategory.sites.length === 0) return null;
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground border-l-4 border-primary pl-3">{subCategory.name}</h3>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
        {subCategory.sites.map((site) => (
          <SiteCard
            key={`${categoryId}-${subCategory.id}-${site.url}`}
            site={site}
            categoryId={categoryId}
            subCategoryId={subCategory.id}
            isPinned={isPinned(site.url, categoryId)}
            onPin={() => pinSite({ name: site.name, url: site.url, categoryId, subCategoryId: subCategory.id })}
            onUnpin={() => unpinSite(site.url, categoryId)}
          />
        ))}
      </div>
    </div>
  );
}

// 大类详情页面
export function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  const category = useMemo(() => {
    return allCategories.find(c => c.id === categoryId);
  }, [categoryId]);
  
  const config = category ? (categoryConfig[category.id] || { icon: Bot, color: 'from-gray-500 to-gray-600', bgColor: 'from-gray-500/10 to-gray-600/10' }) : { icon: Bot, color: 'from-gray-500 to-gray-600', bgColor: 'from-gray-500/10 to-gray-600/10' };
  const { icon: Icon, color, bgColor } = config;
  
  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">分类不存在</p>
          <Link to="/" className="text-primary hover:underline mt-2 inline-block">
            返回首页
          </Link>
        </div>
      </div>
    );
  }
  
  // 获取总网站数
  const totalSites = category.data.reduce((acc, sub) => acc + sub.sites.length, 0);
  
  return (
    <div className="min-h-screen bg-background">
      {/* 头部 */}
      <header className={`sticky top-0 z-50 bg-gradient-to-br ${bgColor} backdrop-blur-md border-b border-border shadow-sm`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link 
              to="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors bg-background/50 p-2 rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            
            <div className="flex items-center gap-3">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${color} shadow-lg`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{category.name}</h1>
                <p className="text-sm text-muted-foreground">{category.data.length} 个子分类 · {totalSites} 个网站</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-8 space-y-10">
        {category.data.map((subCategory) => (
          <SubCategorySection
            key={subCategory.id}
            categoryId={category.id}
            subCategory={subCategory}
          />
        ))}
      </main>

      {/* 页脚 */}
      <footer className="border-t border-border py-8 mt-8 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            {category.name} · 共 {totalSites} 个网站
          </p>
        </div>
      </footer>
    </div>
  );
}

export default CategoryPage;
