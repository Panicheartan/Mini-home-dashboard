import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 从环境变量获取密码 (Vite 环境变量需要以 VITE_ 开头)
const DEFAULT_PASSWORD = import.meta.env.VITE_DASHBOARD_PASSWORD;
const AUTH_KEY = 'home_dashboard_auth';

// 密码验证函数 - 生产环境应该使用更安全的哈希比较
function validatePassword(input: string): boolean {
  if (!DEFAULT_PASSWORD) {
    console.error('VITE_DASHBOARD_PASSWORD environment variable is not set');
    return false;
  }
  return input === DEFAULT_PASSWORD;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // 检查 sessionStorage 中是否有登录状态
    const auth = sessionStorage.getItem(AUTH_KEY);
    return auth === 'true';
  });

  const login = (password: string): boolean => {
    if (validatePassword(password)) {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_KEY);
  };

  // 监听其他标签页的登出操作
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === AUTH_KEY && e.newValue === null) {
        setIsAuthenticated(false);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
