import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Header } from './components/Header';
import { HomeFeed } from './components/HomeFeed';
import { ExploreView } from './components/ExploreView';
import { StatusView } from './components/StatusView';
import { MarketplaceView } from './components/MarketplaceView';
import { CategoryView } from './components/CategoryView';
import { AuthModal } from './components/AuthModal';
import { MapPin, Crown } from 'lucide-react';
import { useAuth } from './lib/authContext';
import { Category } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const { user } = useAuth();

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    setActiveTab('category_detail');
  };

  // --------------------------------------------------------
  // ⚡ SPLASH SCREEN (agora com gradiente fixo, sem depender do Tailwind)
  // --------------------------------------------------------
  if (isLoading) {
    return (
      <div
        className="fixed inset-0 flex flex-col items-center justify-center text-white z-50"
        style={{
          background: 'linear-gradient(135deg, #FF6600 0%, #FF9933 100%)',
        }}
      >
        <div className="relative flex flex-col items-center justify-center mb-8">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-2xl mb-4 animate-pop-in opacity-0">
            <MapPin className="w-10 h-10 text-orange-500 fill-orange-500" />
          </div>

          <div className="text-center space-y-2 animate-slide-up opacity-0">
            <h1 className="text-3xl font-black tracking-tight drop-shadow-md">
              Localizei
            </h1>
            <p className="text-sm text-orange-100 font-medium tracking-wide">
              Freguesia • Jacarepaguá - RJ
            </p>
          </div>

          <div className="mt-6 flex flex-col items-center gap-2 animate-fade-in opacity-0">
            <span className="text-xs uppercase tracking-[0.2em] text-orange-100/90">
              Patrocinador Master
            </span>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/40 backdrop-blur-sm shadow-lg">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-amber-300/70 bg-amber-400/90 text-xs font-extrabold shadow-inner">
                W
              </span>
              <span className="text-xs font-semibold text-white">
                Grupo Esquematiza
              </span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-16 flex flex-col items-center gap-3 px-4 text-center">
          <div className="flex items-center gap-2 text-xs text-orange-50/95">
            <span className="inline-flex w-8 h-[2px] bg-white/80 rounded-full animate-pulse" />
            <span>Carregando experiências da Freguesia...</span>
          </div>

          <div className="text-[10px] text-orange-50/90 uppercase tracking-[0.25em] font-medium flex items-center gap-1">
            <Crown className="w-3 h-3 text-amber-300" />
            <span>Powered by Localizei Freguesia</span>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------
  // ⚡ APP WRAPPER (Desktop + Mobile)
  // --------------------------------------------------------
  return (
    <>
      <div className={isDarkMode ? 'dark' : ''}>
        {/* Fundo geral: escuro no desktop, neutro no mobile */}
        <div className="min-h-screen bg-slate-900 md:bg-slate-900 flex justify-center md:items-start md:pt-10">
          {/* “Celular” centralizado, mais largo no desktop */}
          <div
            className="
              w-full
              max-w-lg
              md:h-[calc(100vh-5rem)]
              bg-gray-50
              dark:bg-gray-950
              transition-colors
              duration-300
              pb-24
              md:rounded-3xl
              md:shadow-2xl
              md:overflow-hidden
              md:border
              md:border-slate-800
            "
          >
            <Header
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
              onAuthClick={() => setIsAuthOpen(true)}
              user={user}
            />

            <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
              {activeTab === 'home' && (
                <HomeFeed onSelectCategory={handleSelectCategory} />
              )}
              {activeTab === 'explore' && (
                <ExploreView onSelectCategory={handleSelectCategory} />
              )}
              {activeTab === 'status' && <StatusView />}
              {activeTab === 'marketplace' && <MarketplaceView />}
              {activeTab === 'category_detail' && selectedCategory && (
                <CategoryView
                  category={selectedCategory}
                  onBack={() => setActiveTab('home')}
                />
              )}
            </Layout>
          </div>
        </div>
      </div>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};

export default App;
