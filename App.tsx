import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Header } from './components/Header';
import { HomeFeed } from './components/HomeFeed';
import { ExploreView } from './components/ExploreView';
import { StatusView } from './components/StatusView';
import { MarketplaceView } from './components/MarketplaceView';
import { CategoryView } from './components/CategoryView';
import { StoreDetailView } from './components/StoreDetailView';
import { CashbackView } from './components/CashbackView';
import { AuthModal } from './components/AuthModal';
import { QuickRegister } from './components/QuickRegister';
import { MenuView } from './components/MenuView';
import { MapPin, Crown } from 'lucide-react';
import { auth } from './lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Category, Store } from './types';
import { useStores } from './hooks/useStores';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Lojas reais da Supabase
  const { stores, loading: storesLoading, error: storesError } = useStores();
  const safeStores: Store[] = stores || [];

  // Controle de perfil rápido
  const [needsProfileSetup, setNeedsProfileSetup] = useState(false);

  // Estado de navegação
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  // Firebase auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Splash de 5s
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Logar erro de lojas (se der ruim)
  useEffect(() => {
    if (storesError) {
      console.error('[APP] Erro ao carregar lojas da Supabase:', storesError);
    }
  }, [storesError]);

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    setActiveTab('category_detail');
  };

  const handleSelectStore = (store: Store) => {
    setSelectedStore(store);
    setActiveTab('store_detail');
  };

  const handleProfileComplete = () => {
    setNeedsProfileSetup(false);
    setActiveTab('home');
  };

  // Tela de splash
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-primary-500 to-orange-700 flex flex-col items-center justify-center text-white z-50">
        <div className="relative flex flex-col items-center justify-center mb-8">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-2xl mb-4 animate-pop-in opacity-0">
            <MapPin className="w-10 h-10 text-primary-600 fill-primary-600" />
          </div>
          <div className="text-5xl font-bold font-display animate-slide-up opacity-0 [animation-delay:500ms]">
            Localizei
          </div>
          <div className="text-sm font-light uppercase mt-2 animate-tracking-expand opacity-0 [animation-delay:1000ms]">
            Freguesia
          </div>
        </div>

        <div className="absolute bottom-12 text-center animate-spin-in opacity-0 [animation-delay:1500ms]">
          <p className="text-[10px] opacity-70 uppercase tracking-widest mb-1">
            Patrocinador Master
          </p>
          <div className="bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full border border-white/20 flex items-center gap-2 shadow-lg">
            <Crown className="w-4 h-4 text-yellow-300 fill-yellow-300 drop-shadow-md" />
            <p className="font-bold text-lg tracking-wide text-white drop-shadow-sm">
              Grupo Esquematiza
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Tela de cadastro rápido
  if (user && needsProfileSetup) {
    return <QuickRegister user={user} onComplete={handleProfileComplete} />;
  }

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex justify-center transition-colors duration-300 relative">
        <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
          {!['category_detail', 'store_detail', 'cashback', 'menu'].includes(activeTab) && (
            <Header
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
              onAuthClick={() => setIsAuthOpen(true)}
              user={user}
            />
          )}

          <main className="animate-in fade-in duration-500">
            {storesError && (
              <div className="mx-5 my-3 px-3 py-2 text-[11px] rounded-md bg-red-50 border border-red-200 text-red-700">
                Erro ao carregar a lista de lojas. Tente novamente mais tarde.
              </div>
            )}

            {activeTab === 'home' && (
              <HomeFeed
                onNavigate={setActiveTab}
                onSelectCategory={handleSelectCategory}
                onStoreClick={handleSelectStore}
                stores={safeStores}
              />
            )}

            {activeTab === 'explore' && (
              <ExploreView
                onSelectCategory={handleSelectCategory}
                onNavigate={setActiveTab}
                onStoreClick={handleSelectStore}
              />
            )}

            {activeTab === 'status' && <StatusView />}

            {activeTab === 'marketplace' && (
              <MarketplaceView onBack={() => setActiveTab('home')} stores={safeStores} />
            )}

            {activeTab === 'category_detail' && selectedCategory && (
              <CategoryView
                category={selectedCategory}
                onBack={() => setActiveTab('home')}
                onStoreClick={handleSelectStore}
                stores={safeStores}
              />
            )}

            {activeTab === 'store_detail' && selectedStore && (
              <StoreDetailView
                store={selectedStore}
                onBack={() => setActiveTab('home')}
                onOpenCashback={() => setActiveTab('cashback')}
              />
            )}

            {activeTab === 'cashback' && <CashbackView onBack={() => setActiveTab('home')} />}

            {activeTab === 'menu' && (
              <MenuView user={user} onAuthClick={() => setIsAuthOpen(true)} />
            )}

            {storesLoading && (
              <div className="fixed bottom-16 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 bg-white/80 dark:bg-gray-900/80 px-3 py-1 rounded-full shadow">
                Atualizando lista de lojas...
              </div>
            )}
          </main>

          <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} user={user} />
        </Layout>
      </div>
    </div>
  );
};

export default App;
