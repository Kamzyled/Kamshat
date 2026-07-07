import { useState, useCallback, useEffect } from 'react';
import { Home, Heart, Shuffle, Settings } from 'lucide-react';
import SplashScreen from './components/SplashScreen';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import RandomPage from './pages/RandomPage';
import SettingsPage from './pages/SettingsPage';
import { getSettings, saveSettings } from './database/storage';

type Page = 'home' | 'favorites' | 'random' | 'settings';

const navItems: { key: Page; label: string; icon: typeof Home }[] = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'favorites', label: 'Favorites', icon: Heart },
  { key: 'random', label: 'Random', icon: Shuffle },
  { key: 'settings', label: 'Settings', icon: Settings },
];

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [darkMode, setDarkMode] = useState(() => getSettings().dark_mode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => {
      const next = !prev;
      saveSettings({ dark_mode: next });
      return next;
    });
  }, []);

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  const handleNavigate = useCallback((page: string, _data?: Record<string, string>) => {
    setCurrentPage(page as Page);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'favorites':
        return <FavoritesPage />;
      case 'random':
        return <RandomPage />;
      case 'settings':
        return <SettingsPage darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark-bg' : 'bg-gray-50'} transition-colors duration-300`}>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}

      {!showSplash && (
        <>
          {/* Main Content */}
          <main className="max-w-lg mx-auto px-4 pt-4 pb-24">
            {renderPage()}
          </main>

          {/* Bottom Navigation */}
          <nav className="fixed bottom-0 left-0 right-0 z-40">
            <div className="max-w-lg mx-auto">
              <div className={`mx-3 mb-3 rounded-2xl ${darkMode ? 'bg-dark-card/95' : 'bg-white/95'} backdrop-blur-xl card-shadow-lg border ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
                <div className="flex items-center justify-around py-2">
                  {navItems.map(item => {
                    const isActive = currentPage === item.key;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.key}
                        onClick={() => setCurrentPage(item.key)}
                        className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 ${
                          isActive
                            ? 'text-primary'
                            : `${darkMode ? 'text-gray-500' : 'text-gray-400'} hover:text-gray-600`
                        }`}
                      >
                        <div className={`p-1.5 rounded-xl transition-all duration-200 ${
                          isActive ? 'bg-primary/10' : ''
                        }`}>
                          <Icon
                            size={20}
                            className={`transition-all ${isActive ? 'scale-110' : ''}`}
                            fill={isActive && item.key === 'favorites' ? 'currentColor' : 'none'}
                          />
                        </div>
                        <span className={`text-[10px] font-semibold transition-all ${
                          isActive ? 'text-primary' : ''
                        }`}>
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
