import { useState, useEffect } from 'react';
import { Shield, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UnifiedBackground } from './UnifiedBackground';

export function LoginPage() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('请输入密码');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));

    const success = login(password);
    if (!success) {
      setError('密码错误，请重试');
      setIsLoading(false);
    }
  };

  return (
    <UnifiedBackground>
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-500/25 mb-6">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className={`text-2xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              家庭网络仪表板
            </h1>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              安全访问您的智能家庭
            </p>
          </div>

          {/* 登录表单 */}
          <div className={`backdrop-blur-sm rounded-2xl border p-8 ${isDark ? 'bg-slate-900/90 border-slate-700/50' : 'bg-white/90 border-slate-200'}`}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  访问密码
                </label>
                <div className="relative">
                  <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="请输入密码"
                    className={`pl-10 pr-10 h-11 rounded-xl text-sm transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-slate-100 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500'}`}
                    disabled={isLoading}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className={`text-sm px-3 py-2 rounded-lg ${isDark ? 'text-red-400 bg-red-500/10' : 'text-red-600 bg-red-50'}`}>
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30 active:scale-[0.98] disabled:opacity-70"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    验证中...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    安全登录
                  </span>
                )}
              </Button>
            </form>
          </div>

          {/* 底部安全提示 */}
          <div className="mt-6 text-center">
            <span className={`inline-flex items-center gap-1.5 text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              SSL 加密连接
            </span>
          </div>
        </div>
      </div>
    </UnifiedBackground>
  );
}

export default LoginPage;
