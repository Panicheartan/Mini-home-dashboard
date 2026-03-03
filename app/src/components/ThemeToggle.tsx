import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full w-10 h-10 border-border bg-card hover:bg-primary/10 hover:border-primary/30 transition-all"
      title={theme === 'light' ? '切换到暗色主题' : '切换到亮色主题'}
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 text-primary" />
      ) : (
        <Sun className="h-5 w-5 text-primary" />
      )}
    </Button>
  );
}
