import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  Sparkles, 
  BookOpen, 
  Wrench,
  ChevronRight,
  MoreHorizontal,
  ExternalLink,
  Pin,
  PinOff
} from 'lucide-react';
import { allCategories } from '@/data/websites';
import { usePinnedSites } from '@/hooks/usePinnedSites';
import { getRandomSites } from '@/lib/utils';
import type { Site } from '@/types';

// 分类图标和颜色配置
const categoryConfig: Record<string, { icon: React.ElementType; color: string; bgColor: string; borderColor: string }> = {
  ai: { 
    icon: Bot, 
    color: 'from-pink-500 to-rose-500',
    bgColor: 'from-pink-500/10 to-rose-500/10',
    borderColor: 'border-pink-500/20 hover:border-pink-500/40'
  },
  entertainment: { 
    icon: Sparkles, 
    color: 'from-violet-500 to-purple-500',
    bgColor: 'from-violet-500/10 to-purple-500/10',
    borderColor: 'border-violet-500/20 hover:border-violet-500/40'
  },
  knowledge: { 
    icon: BookOpen, 
    color: 'from-cyan-500 to-teal-500',
    bgColor: 'from-cyan-500/10 to-teal-500/10',
    borderColor: 'border-cyan-500/20 hover:border-cyan-500/40'
  },
  tools: { 
    icon: Wrench, 
    color: 'from-amber-500 to-orange-500',
    bgColor: 'from-amber-500/10 to-orange-500/10',
    borderColor: 'border-amber-500/20 hover:border-amber-500/40'
  },
};

// 工具函数已从 '@/lib/utils' 导入
import { getSiteColor, getSiteInitial } from '@/lib/utils';

// 网站卡片组件
interface SiteCardProps {
  site: Site;
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

// 固定网站卡片
function PinnedSiteCard({ site, onUnpin }: { site: { name: string; url: string }; onUnpin: () => void }) {
  const color = getSiteColor(site.url);
  
  return (
    <div className="group relative flex flex-col items-center justify-center gap-2 rounded-xl bg-card p-4 card-hover border-2 border-primary/30 transition-all hover:scale-105">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onUnpin();
        }}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-muted z-10"
        title="取消固定"
      >
        <PinOff className="h-3.5 w-3.5 text-destructive" />
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
        <p className="text-sm font-medium text-card-foreground truncate w-full text-center">{site.name}</p>
      </a>
    </div>
  );
}

// 分类区块组件
interface CategorySectionProps {
  categoryId: string;
  categoryName: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
}

function CategorySection({ categoryId, categoryName, icon: Icon, color, bgColor, borderColor }: CategorySectionProps) {
  const { pinSite, unpinSite, isPinned, getPinnedSitesByCategory } = usePinnedSites();
  
  // 获取该分类下的所有网站
  const category = useMemo(() => {
    return allCategories.find(c => c.id === categoryId);
  }, [categoryId]);
  
  // 获取所有网站扁平化列表
  const allSites = useMemo(() => {
    if (!category) return [];
    return category.data.flatMap(sub => sub.sites);
  }, [category]);
  
  // 获取已固定的网站
  const pinnedSites = useMemo(() => {
    return getPinnedSitesByCategory(categoryId);
  }, [categoryId, getPinnedSitesByCategory]);
  
  // 计算显示的网站：固定2个 + 2个随机
  const { fixedSites, randomSites, hasMore } = useMemo(() => {
    const pinned = pinnedSites.slice(0, 2); // 最多显示2个固定的
    const pinnedCount = pinned.length;
    const fixedCount = Math.max(0, 2 - pinnedCount); // 需要补充的固定数量
    
    // 获取未固定的网站
    const pinnedUrls = pinned.map(s => s.url);
    const unpinnedSites = allSites.filter(s => !pinnedUrls.includes(s.url));
    
    // 固定显示前 fixedCount 个
    const fixed = unpinnedSites.slice(0, fixedCount);
    const fixedUrls = fixed.map(s => s.url);
    
    // 从剩余的中随机选2个
    const remaining = unpinnedSites.filter(s => !fixedUrls.includes(s.url));
    const random = getRandomSites(remaining, 2);
    
    return {
      fixedSites: [...pinned, ...fixed],
      randomSites: random,
      hasMore: remaining.length > random.length
    };
  }, [allSites, pinnedSites]);
  
  if (!category || allSites.length === 0) return null;
  
  const displaySites = [...fixedSites, ...randomSites];
  
  return (
    <div className={`group relative rounded-2xl bg-gradient-to-br ${bgColor} p-6 border ${borderColor} transition-all hover:shadow-lg`}>
      {/* 标题区域 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${color} shadow-lg`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">{categoryName}</h3>
            <p className="text-xs text-muted-foreground">{allSites.length} 个网站</p>
          </div>
        </div>
        
        {hasMore && (
          <Link 
            to={`/category/${categoryId}`}
            className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors bg-background/50 px-3 py-1.5 rounded-full"
          >
            查看更多 <ChevronRight className="h-4 w-4" />
          </Link>
        )}
      </div>
      
      {/* 网站网格 - 4列（2固定 + 2随机） */}
      <div className="grid grid-cols-4 gap-3">
        {/* 固定网站 */}
        {fixedSites.map((site) => (
          <PinnedSiteCard
            key={`fixed-${site.url}`}
            site={site}
            onUnpin={() => unpinSite(site.url, categoryId)}
          />
        ))}
        
        {/* 随机网站 */}
        {randomSites.map((site) => (
          <SiteCard
            key={`random-${site.url}`}
            site={site}
            isPinned={isPinned(site.url, categoryId)}
            onPin={() => pinSite({ name: site.name, url: site.url, categoryId, subCategoryId: '' })}
            onUnpin={() => unpinSite(site.url, categoryId)}
          />
        ))}
        
        {/* 占位符 */}
        {displaySites.length < 4 && Array.from({ length: 4 - displaySites.length }).map((_, i) => (
          <div key={`placeholder-${i}`} className="flex items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/20 p-4 min-h-[100px]">
            <MoreHorizontal className="h-6 w-6 text-muted-foreground/30" />
          </div>
        ))}
      </div>
    </div>
  );
}

// 主组件
export function FavoriteWebsitesSection() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <ExternalLink className="h-4 w-4 text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">常用网站</h2>
      </div>
      
      {/* 四大分类 - 2x2 网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allCategories.map((category) => {
          const config = categoryConfig[category.id];
          if (!config) return null;
          
          return (
            <CategorySection
              key={category.id}
              categoryId={category.id}
              categoryName={category.name}
              icon={config.icon}
              color={config.color}
              bgColor={config.bgColor}
              borderColor={config.borderColor}
            />
          );
        })}
      </div>
      
      {/* 查看全部链接 */}
      <div className="flex justify-center">
        <Link 
          to="/websites"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium"
        >
          <ExternalLink className="h-5 w-5" />
          <span>查看全部网址</span>
        </Link>
      </div>
    </section>
  );
}

export default FavoriteWebsitesSection;
