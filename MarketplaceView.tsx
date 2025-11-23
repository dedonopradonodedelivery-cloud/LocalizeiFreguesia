import React from 'react';
import { STORES } from '../constants';
import { ChevronLeft, ShoppingBag, Search, SlidersHorizontal } from 'lucide-react';

interface MarketplaceViewProps {
  onBack: () => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({ onBack }) => {
  // Filter all stores that are part of the marketplace
  const marketplaceItems = STORES.filter(store => store.isMarketplace);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24 animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-5 py-4 flex items-center gap-4 shadow-sm">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-white" />
        </button>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white font-display">Achadinhos</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">As melhores ofertas da Freguesia</p>
        </div>
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <Search className="w-5 h-5 text-gray-700 dark:text-white" />
        </button>
      </div>

      {/* Filters Row (Visual Only) */}
      <div className="px-5 py-4 flex gap-2 overflow-x-auto no-scrollbar">
        <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-full text-xs font-bold shadow-md shadow-primary-500/20">
          <SlidersHorizontal className="w-3 h-3" />
          Filtrar
        </button>
        <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium whitespace-nowrap">
          Alimentos
        </button>
        <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium whitespace-nowrap">
          Moda
        </button>
        <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium whitespace-nowrap">
          Serviços
        </button>
      </div>

      {/* Grid Content */}
      <div className="px-5 grid grid-cols-2 gap-4">
        {marketplaceItems.map((item) => (
          <div key={item.id} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 group cursor-pointer">
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 dark:bg-gray-700">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                 {item.cashback && (
                    <div className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
                      {item.cashback}% OFF
                    </div>
                 )}
              </div>
              <button className="absolute bottom-2 right-2 bg-white dark:bg-gray-900 p-2 rounded-full shadow-md hover:scale-110 transition-transform">
                <ShoppingBag className="w-4 h-4 text-primary-500" />
              </button>
            </div>
            
            <div className="p-3">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-sm font-bold text-gray-800 dark:text-white line-clamp-2 leading-tight h-9">
                    {item.name}
                </h3>
              </div>
              
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 line-clamp-1">{item.description}</p>
              
              <div className="flex items-end justify-between">
                <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 line-through">R$ {(item.price ? item.price * 1.2 : 100).toFixed(2)}</span>
                    <span className="text-lg font-bold text-green-600 dark:text-green-400 leading-none">
                        R$ {item.price ? item.price.toFixed(2).replace('.', ',') : 'Consultar'}
                    </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};