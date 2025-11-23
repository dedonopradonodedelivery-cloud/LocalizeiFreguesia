import React, { useState } from 'react';
import { LEADS } from '../constants';
import { Lock, Wallet } from 'lucide-react';

export const ExploreView: React.FC = () => {
  const [balance, setBalance] = useState(0);

  return (
    <div className="p-5 pt-0 min-h-full">
      <div className="bg-blue-900 dark:bg-blue-950 rounded-3xl p-6 text-white mb-8 relative overflow-hidden shadow-lg mt-4">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
        <h2 className="text-xl font-bold mb-2 relative z-10">Área do Profissional</h2>
        <p className="text-blue-200 text-sm mb-4 relative z-10">Encontre novos clientes na Freguesia agora mesmo.</p>
        
        <div className="flex items-center gap-4 relative z-10 bg-white/10 p-3 rounded-xl backdrop-blur-sm">
             <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <Wallet className="w-5 h-5 text-white" />
             </div>
             <div>
                 <p className="text-xs text-blue-200">Seu Saldo (Demo)</p>
                 <p className="font-bold text-lg">R$ {balance.toFixed(2)}</p>
             </div>
             <button onClick={() => setBalance(prev => prev + 50)} className="ml-auto bg-green-500 hover:bg-green-400 text-xs font-bold px-3 py-2 rounded-lg transition-colors">
                Recarregar
             </button>
        </div>
      </div>

      <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-4 text-lg">Pedidos Recentes (Leads)</h3>

      <div className="space-y-4">
        {LEADS.map((lead) => (
          <div key={lead.id} className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden">
             <div className="flex justify-between items-start mb-3">
                 <div>
                     <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide ${lead.urgency === 'Alta' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                        Urgência: {lead.urgency}
                     </span>
                     <h4 className="font-bold text-gray-800 dark:text-gray-100 mt-2 text-lg">{lead.title}</h4>
                     <p className="text-xs text-gray-500 dark:text-gray-400">{lead.district} • {lead.category}</p>
                 </div>
             </div>

             <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center text-center gap-2">
                 <Lock className="w-6 h-6 text-gray-400" />
                 <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                    Cliente: {lead.maskedName} *****
                 </p>
                 <button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 rounded-xl shadow-md shadow-orange-200 dark:shadow-none transition-all active:scale-95 flex items-center justify-center gap-2 mt-1">
                    <span>Liberar Contato por R$ {lead.priceToUnlock.toFixed(2)}</span>
                 </button>
                 <p className="text-[10px] text-gray-400">Apenas 3 profissionais podem comprar este lead.</p>
             </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-3xl text-center">
          <h4 className="font-bold text-gray-800 dark:text-white mb-2">Quer anunciar sua loja?</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Aumente suas vendas com o ADS Localizei.</p>
          <button className="bg-gray-900 dark:bg-black text-white px-6 py-3 rounded-xl text-sm font-medium w-full border border-gray-700">
              Ver Planos ADS
          </button>
      </div>
    </div>
  );
};