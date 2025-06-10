import { useLocalStorage } from './useLocalStorage';

export type ThemeMode = 'light' | 'dark';
export type AccentColor = 'blue' | 'purple' | 'green' | 'orange' | 'pink';

export const accentColors = {
  blue: 'from-blue-500 to-blue-600',
  purple: 'from-purple-500 to-purple-600',
  green: 'from-green-500 to-green-600',
  orange: 'from-orange-500 to-orange-600',
  pink: 'from-pink-500 to-pink-600',
};

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<ThemeMode>('flow-theme', 'light');
  const [accentColor, setAccentColor] = useLocalStorage<AccentColor>('flow-accent', 'blue');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const changeAccentColor = (color: AccentColor) => {
    setAccentColor(color);
  };

  return {
    theme,
    accentColor,
    toggleTheme,
    changeAccentColor,
    isDark: theme === 'dark',
  };
}