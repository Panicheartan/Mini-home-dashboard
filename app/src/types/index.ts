/**
 * 家庭网络仪表板 - 统一类型定义
 */

import type { LucideIcon } from 'lucide-react';

// ============================================
// 网站相关类型
// ============================================

/**
 * 网站基本信息
 */
export interface Site {
  name: string;
  url: string;
  description?: string;
  icon?: string;
}

/**
 * 网站分类
 */
export interface SiteCategory {
  id: string;
  name: string;
  sites: Site[];
}

/**
 * 网站大类
 */
export interface SiteGroup {
  id: string;
  name: string;
  icon: string;
  data: SiteCategory[];
}

// ============================================
// 设备相关类型
// ============================================

/**
 * 网络设备
 */
export interface NetworkDevice {
  name: string;
  address: string;
  description: string;
  icon: LucideIcon;
  color: string;
  href: string;
}

/**
 * 应用（Docker/NAS/Mac Studio等）
 */
export interface AppService {
  name: string;
  address: string;
  description: string;
  icon: LucideIcon;
  color: string;
  href: string;
}

// ============================================
// 用户相关类型
// ============================================

/**
 * 固定网站
 */
export interface PinnedSite {
  name: string;
  url: string;
  categoryId: string;
  subCategoryId: string;
}

// ============================================
// 组件 Props 类型
// ============================================

/**
 * 设备卡片 Props
 */
export interface DeviceCardProps {
  device: NetworkDevice;
  index: number;
}

/**
 * 应用卡片 Props
 */
export interface AppCardProps {
  app: AppService;
  index: number;
}

/**
 * 网站卡片 Props
 */
export interface SiteCardProps {
  site: Site;
  categoryId: string;
  subCategoryId?: string;
  isPinned: boolean;
  onPin: () => void;
  onUnpin: () => void;
}
