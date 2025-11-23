import React, { useMemo, useEffect, useState } from 'react';
import { Home, Search, Menu, CircleDashed } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const tabs = useMemo(() => [
    { id: 'home', icon: Home, label: 'Início' },
    { id: 'explore', icon: Search, label: 'Explorar' },
    { id: 'status', icon: CircleDashed, label: 'Status' },
    { id: 'menu', icon: Menu, label: 'Menu' },
  ], []);

  const activeIndex = tabs.findIndex(tab => tab.id === activeTab);

  // Trigger the jelly animation whenever the active tab changes
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 600); // Duration of 'jelly' animation
    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <div className="fixed bottom-6 left-0 right-0 px-6 z-40 flex justify-center">
      {/* Main Container - Decreased height to h-[60px] for compact look */}
      <div className="w-full max-w-xs sm:max-w-sm bg-gradient-to-r from-orange-500 to-orange-600 h-[60px] rounded-[2rem] shadow-2xl shadow-orange-500/30 relative flex items-center px-2 isolate overflow-hidden border border-white/10">
        
        {/* The "Water Bubble" Sliding Background */}
        <div 
          className={`absolute h-[80%] w-[calc(25%-12px)] rounded-[1.5rem] transition-all duration-500 cubic-bezier(0.25, 1.5, 0.5, 1) ${isAnimating ? 'animate-jelly' : ''}`}
          style={{ 
            left: `calc(${activeIndex * 25}% + 6px)`, 
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.01) 100%)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.5), inset 0 4px 12px rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(8px)',
          }}
        >
           {/* Specular Highlights for Liquid Effect */}
           <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-5 h-1.5 bg-white/70 rounded-full blur-[1px]"></div>
           <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-1 bg-white/20 rounded-full blur-[0.5px]"></div>
        </div>

        {/* Navigation Items */}
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          // Render clone to ensure props are correct type
          const renderIcon = () => {
             return (
                <Icon 
                  className={`w-6 h-6 transition-all duration-300 ${
                    isActive 
                      ? 'text-white drop-shadow-md stroke-[2.5px]' 
                      : 'text-orange-100 group-hover:text-white stroke-[2px]'
                  }`} 
                />
             )
          }

          return (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 relative z-10 h-full flex flex-col items-center justify-center gap-0.5 transition-colors duration-300 group pb-0.5"
            >
              <div className={`transition-all duration-300 ${isActive ? '-translate-y-0.5 scale-105' : 'translate-y-0'}`}>
                {renderIcon()}
              </div>
              
              <span className={`text-[10px] font-bold transition-all duration-300 absolute bottom-2 ${
                isActive 
                  ? 'text-white opacity-100 drop-shadow-sm' 
                  : 'text-orange-100 opacity-90'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}

      </div>
    </div>
  );
};