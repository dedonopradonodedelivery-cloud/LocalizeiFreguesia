import React from 'react';
import { User, MapPin, Sun, Moon } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  onAuthClick: () => void;
  user: FirebaseUser | null;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleTheme, onAuthClick, user }) => {
  return (
    <div className="pt-12 pb-4 px-5 bg-white dark:bg-gray-900 flex justify-between items-center sticky top-0 z-30 shadow-sm dark:shadow-gray-800 border-b border-transparent dark:border-gray-800 transition-colors duration-300 relative">
      
      {/* Left: Logo & Location */}
      <div className="flex items-center gap-3 z-10">
        <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold shadow-md flex-shrink-0">
          F
        </div>
        <div className="flex flex-col justify-center h-10">
          <h1 className="text-lg font-bold text-gray-800 dark:text-white leading-none mb-1">Localizei</h1>
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
            <MapPin className="w-3 h-3 mr-1" />
            <span>Freguesia</span>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex gap-3 items-center z-10">
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className={`w-12 h-7 rounded-full p-1 relative flex items-center transition-colors duration-300 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
          aria-label="Alternar tema"
        >
           <div className={`w-5 h-5 bg-white rounded-full shadow-sm flex items-center justify-center transition-transform duration-300 ${isDarkMode ? 'translate-x-5' : 'translate-x-0'}`}>
             {isDarkMode ? (
                <Moon className="w-3 h-3 text-indigo-500 fill-indigo-500" />
             ) : (
                <Sun className="w-3 h-3 text-orange-500 fill-orange-500" />
             )}
           </div>
        </button>
        
        <button 
          onClick={onAuthClick}
          className="rounded-full transition-all active:scale-95 cursor-pointer relative"
          title={user ? `Logado como ${user.displayName || user.email}` : "Entrar / Cadastrar"}
        >
          {user ? (
             <div className="w-10 h-10 rounded-full bg-primary-500 p-0.5 border border-primary-300">
                 {user.photoURL ? (
                     <img src={user.photoURL} alt="Perfil" className="w-full h-full rounded-full object-cover" />
                 ) : (
                     <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-primary-500 font-bold">
                        {user.email?.charAt(0).toUpperCase()}
                     </div>
                 )}
                 <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
             </div>
          ) : (
             <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                <User className="w-6 h-6 text-gray-700 dark:text-gray-300" />
             </div>
          )}
        </button>
      </div>
    </div>
  );
};