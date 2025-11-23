import React, { useState, useEffect } from 'react';
import { ChevronLeft, Search } from 'lucide-react';
import { Category } from '../types';
import { SUBCATEGORIES } from '../constants';

interface CategoryViewProps {
  category: Category;
  onBack: () => void;
}

const BANNERS = [
  'https://picsum.photos/800/300?random=101',
  'https://picsum.photos/800/300?random=102',
  'https://picsum.photos/800/300?random=103',
  'https://picsum.photos/800/300?random=104',
  'https://picsum.photos/800/300?random=105',
];

export const CategoryView: React.FC<CategoryViewProps> = ({ category, onBack }) => {
  const [currentBanner, setCurrentBanner] = useState(0);

  // Get subcategories or fallback to default
  const subcategories = SUBCATEGORIES[category.name] || SUBCATEGORIES['default'];

  // Carousel Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % BANNERS.length);
    }, 4000); // 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-24 animate-in slide-in-from-right duration-300">
      
      {/* Header */}
      <div className="sticky top-0 z-30 bg-gray-50 dark:bg-gray-900 px-5 py-4 flex items-center justify-between shadow-sm dark:shadow-none">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>
        
        <h2 className="text-lg font-bold text-gray-900 dark:text-white font-display">
          {category.name}
        </h2>

        <button className="p-2 -mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
          <Search className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>
      </div>

      {/* Content Scrollable Area */}
      <div className="p-5 space-y-6">
        
        {/* Carousel (5 Banners, 4s auto) */}
        <div className="w-full aspect-[2/1] rounded-3xl overflow-hidden relative shadow-md">
          {BANNERS.map((img, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentBanner ? 'opacity-100' : 'opacity-0'}`}
            >
              <img src={img} alt="Banner" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          ))}
          {/* Dots Indicator */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {BANNERS.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentBanner ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`}
              />
            ))}
          </div>
        </div>

        {/* Subcategories Grid */}
        <div className="grid grid-cols-2 gap-4">
          {subcategories.map((sub, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-[2rem] p-6 flex flex-col items-center justify-center gap-4 shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95 border border-transparent dark:border-gray-700"
            >
              <div className="w-20 h-20 rounded-full bg-orange-50 dark:bg-gray-700 flex items-center justify-center">
                {sub.icon}
              </div>
              <span className="text-gray-800 dark:text-white font-medium text-base text-center">
                {sub.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
