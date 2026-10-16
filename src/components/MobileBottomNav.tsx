import React, { useState, useEffect } from 'react';
import { PageTab } from './Header';
import { getMenusData, MenuItemConfig } from '../data/dataStore';

interface MobileBottomNavProps {
  currentTab: PageTab;
  onSelectTab: (tab: PageTab) => void;
  onOpenMenu: () => void;
  isMenuOpen: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onSelectTab,
  onOpenMenu,
  isMenuOpen
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

  // Primary 4 tabs for mobile bottom navigation
  const primaryTabs = menus.slice(0, 4);

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#e2e8f0] px-2 py-1.5 shadow-[0_-2px_10px_rgba(0,0,0,0.06)]"
      style={{ paddingBottom: 'calc(0.375rem + env(safe-area-inset-bottom, 0px))' }}
      aria-label="Мобайл үндсэн цэс"
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {primaryTabs.map((tab) => {
          const isActive = currentTab === tab.key && !isMenuOpen;
          return (
            <button
              key={tab.key}
              onClick={() => onSelectTab(tab.key)}
              className={`flex-1 flex flex-col items-center justify-center py-1 rounded-xl transition-all active:scale-95 cursor-pointer ${
                isActive ? 'text-[#1967d2]' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div
                className={`w-9 h-7 flex items-center justify-center rounded-full transition-colors ${
                  isActive ? 'bg-[#e8f0fe]' : 'bg-transparent'
                }`}
              >
                <span className={`material-symbols-outlined text-[22px] ${isActive ? 'font-bold' : ''}`}>
                  {tab.icon}
                </span>
              </div>
              <span
                className={`text-[11px] font-bold mt-0.5 leading-none truncate max-w-[64px] ${
                  isActive ? 'text-[#1967d2]' : 'text-slate-600'
                }`}
              >
                {tab.label.split(' ')[0]}
              </span>
            </button>
          );
        })}

        {/* 5th Tab: All Menus (Цэс) */}
        <button
          onClick={onOpenMenu}
          className={`flex-1 flex flex-col items-center justify-center py-1 rounded-xl transition-all active:scale-95 cursor-pointer ${
            isMenuOpen ? 'text-[#1967d2]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div
            className={`w-9 h-7 flex items-center justify-center rounded-full transition-colors ${
              isMenuOpen ? 'bg-[#e8f0fe]' : 'bg-transparent'
            }`}
          >
            <span className={`material-symbols-outlined text-[22px] ${isMenuOpen ? 'font-bold' : ''}`}>
              grid_view
            </span>
          </div>
          <span
            className={`text-[11px] font-bold mt-0.5 leading-none ${
              isMenuOpen ? 'text-[#1967d2]' : 'text-slate-600'
            }`}
          >
            Цэс
          </span>
        </button>
      </div>
    </nav>
  );
};
