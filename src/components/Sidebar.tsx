import React, { useState, useEffect } from 'react';
import { PageTab } from './Header';
import { getMenusData, MenuItemConfig } from '../data/dataStore';

interface SidebarProps {
  currentTab: PageTab;
  onSelectTab: (tab: PageTab) => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isMobileOpen = false,
  onCloseMobile
}) => {
  const [menus, setMenus] = useState<MenuItemConfig[]>(() =>
    getMenusData().filter((m) => m.enabled)
  );

  useEffect(() => {
    const handleUpdate = () => {
      setMenus(getMenusData().filter((m) => m.enabled));
    };
    window.addEventListener('study_tour_data_updated', handleUpdate);
    return () => window.removeEventListener('study_tour_data_updated', handleUpdate);
  }, []);

  const handleItemClick = (key: PageTab) => {
    onSelectTab(key);
    if (onCloseMobile) onCloseMobile();
  };

  const content = (
    <div className="w-64 bg-white min-h-full flex flex-col justify-between p-3.5 border-r border-[#e5eeff] shrink-0">
      {/* Navigation List */}
      <nav className="flex flex-col gap-1 w-full">
        {menus.map((item) => {
          const isActive = currentTab === item.key;
          return (
            <button
              key={item.key}
              onClick={() => handleItemClick(item.key)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#1967d2] text-white shadow-sm font-extrabold'
                  : 'text-slate-700 hover:bg-[#f1f5f9] hover:text-[#002045]'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`material-symbols-outlined text-[20px] shrink-0 ${
                    isActive ? 'text-white' : 'text-slate-500'
                  }`}
                >
                  {item.icon}
                </span>
                <span className="leading-snug break-words">{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full shrink-0 ${
                    isActive ? 'bg-white text-[#1967d2]' : 'bg-red-500 text-white'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Poster: JAPAN - A new experience awaits */}
      <div className="mt-6 pt-3">
        <div
          onClick={() => handleItemClick('nuur')}
          className="relative rounded-2xl overflow-hidden shadow-md aspect-[3/4] group select-none cursor-pointer"
        >
          <img
            src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=85&w=800&auto=format&fit=crop"
            alt="Japan Travel"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {/* Subtle airplane graphic indicator */}
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-1.5 rounded-full text-white">
            <span className="material-symbols-outlined text-[16px] -rotate-45">flight</span>
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#001026]/90 via-[#001026]/30 to-transparent flex flex-col justify-end p-4 text-white">
            <span className="font-serif text-2xl font-bold tracking-[0.2em] text-white leading-tight">
              JAPAN
            </span>
            <span className="text-[11px] text-white/90 font-medium tracking-wide mt-1">
              A new experience awaits
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block shrink-0 sticky top-[61px] h-[calc(100vh-61px)] overflow-y-auto scrollbar-none">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          />
          {/* Drawer content */}
          <div className="relative w-64 max-w-xs bg-white h-full z-10 shadow-2xl flex flex-col overflow-y-auto">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <span className="font-extrabold text-[#002045] text-sm tracking-wide">ЦЭСҮҮД</span>
              <button
                onClick={onCloseMobile}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
};
