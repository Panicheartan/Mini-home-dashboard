import { useState, useCallback } from 'react';
import type { PinnedSite } from '@/types';

// 为了保持向后兼容，重新导出类型
export type { PinnedSite } from '@/types';

const STORAGE_KEY = 'pinned-sites';

export function usePinnedSites() {
  const [pinnedSites, setPinnedSites] = useState<PinnedSite[]>(() => {
    // 从 localStorage 加载初始数据
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  // Save to localStorage when pinnedSites changes
  const savePinnedSites = useCallback((sites: PinnedSite[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sites));
    setPinnedSites(sites);
  }, []);

  const pinSite = useCallback((site: PinnedSite) => {
    const exists = pinnedSites.some(
      s => s.url === site.url && s.categoryId === site.categoryId
    );
    if (!exists) {
      savePinnedSites([...pinnedSites, site]);
    }
  }, [pinnedSites, savePinnedSites]);

  const unpinSite = useCallback((url: string, categoryId: string) => {
    const newSites = pinnedSites.filter(
      s => !(s.url === url && s.categoryId === categoryId)
    );
    savePinnedSites(newSites);
  }, [pinnedSites, savePinnedSites]);

  const isPinned = useCallback((url: string, categoryId: string) => {
    return pinnedSites.some(
      s => s.url === url && s.categoryId === categoryId
    );
  }, [pinnedSites]);

  const getPinnedSitesByCategory = useCallback((categoryId: string) => {
    return pinnedSites.filter(s => s.categoryId === categoryId);
  }, [pinnedSites]);

  return {
    pinnedSites,
    pinSite,
    unpinSite,
    isPinned,
    getPinnedSitesByCategory,
  };
}

// getRandomSites 已移至 '@/lib/utils'，从此处重新导出以保持向后兼容
export { getRandomSites } from '@/lib/utils';
