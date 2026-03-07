import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type Season = 'spring' | 'summer' | 'fall' | 'winter';
export type Weather = 'sunny' | 'rainy' | 'snowy' | 'stormy' | 'cloudy';

export interface SeasonTheme {
  season: Season;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  bgColor: string;
  emoji: string;
  description: string;
}

export const seasonThemes: Record<Season, SeasonTheme> = {
  spring: {
    season: 'spring',
    name: '春季',
    primaryColor: '#4A7C59',
    secondaryColor: '#F4A7B9',
    accentColor: '#FFB7C5',
    bgColor: '#E8F5E9',
    emoji: '🌸',
    description: '樱花盛开，新芽萌发'
  },
  summer: {
    season: 'summer',
    name: '夏季',
    primaryColor: '#D4A574',
    secondaryColor: '#4A90A4',
    accentColor: '#FFD700',
    bgColor: '#FFF8E1',
    emoji: '☀️',
    description: '阳光灿烂，海洋碧蓝'
  },
  fall: {
    season: 'fall',
    name: '秋季',
    primaryColor: '#D2691E',
    secondaryColor: '#8B4513',
    accentColor: '#FF8C00',
    bgColor: '#FFF3E0',
    emoji: '🍂',
    description: '落叶纷飞，南瓜丰收'
  },
  winter: {
    season: 'winter',
    name: '冬季',
    primaryColor: '#4A90A4',
    secondaryColor: '#B0C4DE',
    accentColor: '#E0FFFF',
    bgColor: '#E3F2FD',
    emoji: '❄️',
    description: '雪花飘落，冰霜覆盖'
  }
};

export const weatherTypes: Record<Weather, { name: string; emoji: string; description: string }> = {
  sunny: { name: '晴天', emoji: '☀️', description: '阳光明媚' },
  rainy: { name: '雨天', emoji: '🌧️', description: '细雨绵绵' },
  snowy: { name: '雪天', emoji: '❄️', description: '雪花纷飞' },
  stormy: { name: '雷暴', emoji: '⛈️', description: '雷电交加' },
  cloudy: { name: '多云', emoji: '☁️', description: '云层密布' }
};

interface SeasonContextType {
  currentSeason: Season;
  currentWeather: Weather;
  seasonTheme: SeasonTheme;
  setSeason: (season: Season) => void;
  setWeather: (weather: Weather) => void;
  autoUpdateSeason: boolean;
  setAutoUpdateSeason: (auto: boolean) => void;
}

const SeasonContext = createContext<SeasonContextType | undefined>(undefined);

function getCurrentSeason(): Season {
  const month = new Date().getMonth() + 1;
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'fall';
  return 'winter';
}

function getRandomWeather(season: Season): Weather {
  const weatherMap: Record<Season, Weather[]> = {
    spring: ['sunny', 'rainy', 'cloudy'],
    summer: ['sunny', 'rainy', 'stormy', 'cloudy'],
    fall: ['sunny', 'rainy', 'cloudy'],
    winter: ['sunny', 'snowy', 'cloudy']
  };
  const options = weatherMap[season];
  return options[Math.floor(Math.random() * options.length)];
}

export function SeasonProvider({ children }: { children: ReactNode }) {
  const [currentSeason, setCurrentSeason] = useState<Season>(getCurrentSeason());
  const [currentWeather, setCurrentWeather] = useState<Weather>('sunny');
  const [autoUpdateSeason, setAutoUpdateSeason] = useState(true);

  useEffect(() => {
    // Initialize weather based on season
    setCurrentWeather(getRandomWeather(currentSeason));
  }, []);

  useEffect(() => {
    if (!autoUpdateSeason) return;
    
    const actualSeason = getCurrentSeason();
    if (actualSeason !== currentSeason) {
      setCurrentSeason(actualSeason);
      setCurrentWeather(getRandomWeather(actualSeason));
    }
  }, [autoUpdateSeason, currentSeason]);

  const setSeason = (season: Season) => {
    setCurrentSeason(season);
    setCurrentWeather(getRandomWeather(season));
  };

  const setWeather = (weather: Weather) => {
    setCurrentWeather(weather);
  };

  const seasonTheme = seasonThemes[currentSeason];

  return (
    <SeasonContext.Provider value={{
      currentSeason,
      currentWeather,
      seasonTheme,
      setSeason,
      setWeather,
      autoUpdateSeason,
      setAutoUpdateSeason
    }}>
      {children}
    </SeasonContext.Provider>
  );
}

export function useSeason() {
  const context = useContext(SeasonContext);
  if (context === undefined) {
    throw new Error('useSeason must be used within a SeasonProvider');
  }
  return context;
}
