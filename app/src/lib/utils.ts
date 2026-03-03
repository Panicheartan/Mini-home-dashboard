import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * 合并 Tailwind CSS 类名
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ============================================
// 网站工具函数
// ============================================

/**
 * 网站卡片颜色调色板
 */
export const colorPalettes = [
  'from-pink-500 to-rose-500',
  'from-violet-500 to-purple-500',
  'from-indigo-500 to-blue-500',
  'from-cyan-500 to-teal-500',
  'from-emerald-500 to-green-500',
  'from-amber-500 to-orange-500',
  'from-red-500 to-pink-500',
  'from-blue-500 to-cyan-500',
] as const;

/**
 * 根据 URL 生成一致的颜色
 * @param url - 网站 URL
 * @returns 渐变色类名
 */
export function getSiteColor(url: string): string {
  const hash = url.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colorPalettes[hash % colorPalettes.length];
}

/**
 * 获取网站名称的首字母
 * @param name - 网站名称
 * @returns 首字母大写
 */
export function getSiteInitial(name: string): string {
  return name.charAt(0).toUpperCase();
}

// ============================================
// 数组工具函数
// ============================================

/**
 * Fisher-Yates 洗牌算法 - 比 sort(() => Math.random() - 0.5) 更高效且均匀
 * @param array - 需要打乱的数组
 * @returns 打乱后的新数组
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * 从数组中随机获取指定数量的元素
 * @param sites - 网站数组
 * @param count - 需要获取的数量
 * @param excludeUrls - 需要排除的 URL 列表
 * @returns 随机选择的网站
 */
export function getRandomSites<T extends { url: string }>(
  sites: T[],
  count: number,
  excludeUrls: string[] = []
): T[] {
  const available = sites.filter(s => !excludeUrls.includes(s.url));
  const shuffled = shuffleArray(available);
  return shuffled.slice(0, count);
}
