import React, { useState, useEffect } from 'react';
import { PageTab } from './Header';
import { getMenusData, MenuItemConfig } from '../data/dataStore';

interface MobileMenuSheetProps {
  isOpen: boolean;
  onClose: () => void;
  currentTab: PageTab;
  onSelectTab: (tab: PageTab) => void;
  onOpenHandout?: (title: string) => void;
}

export const MobileMenuSheet: React.FC<MobileMenuSheetProps> = ({
  isOpen,
  onClose,
  currentTab,
  onSelectTab,
  onOpenHandout
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

  if (!isOpen) return null;

  const primaryItems = menus.filter((m) => m.category === 'primary');
  const secondaryItems = menus.filter((m) => m.category === 'secondary');

  const handleItemSelect = (key: PageTab) => {
    onSelectTab(key);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      {/* Sheet Modal */}
      <div className="relative bg-white w-full rounded-t-3xl max-h-[88vh] flex flex-col shadow-2xl z-10 overflow-hidden animate-slide-up">
        {/* Top Drag Handle Bar */}
        <div className="pt-3 pb-2 flex flex-col items-center justify-center shrink-0 border-b border-slate-100">
          <div className="w-12 h-1.5 rounded-full bg-slate-300 mb-2" />
          <div className="w-full px-5 flex items-center justify-between">
            <span className="font-extrabold text-[#002045] text-base">
              Бүх Цэс & Хэрэгслүүд
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 cursor-pointer"
              aria-label="Хаах"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
          {/* Tour Branding Header */}
          <div className="p-3 rounded-2xl bg-[#002045] text-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#b52426] flex items-center justify-center text-white shrink-0">
                <span className="material-symbols-outlined text-[18px]">flight_takeoff</span>
              </div>
              <div>
                <span className="font-extrabold text-xs block leading-tight">JAPAN TRIP 2026</span>
                <span className="text-[10px] text-slate-300">Executive Study Tour • 2026.10.18 - 10.30</span>
              </div>
            </div>
            <button
              onClick={() => {
                onSelectTab('admin');
                onClose();
              }}
              className="px-2.5 py-1 rounded-lg bg-amber-400 text-[#002045] hover:bg-amber-300 text-[10px] font-extrabold flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[13px]">admin_panel_settings</span>
              <span>Админ төв</span>
            </button>
          </div>

          {/* Quick PDF Schedule Download Button */}
          <button
            onClick={() => {
              if (onOpenHandout) onOpenHandout('Japanese_Executive_Study_Tour_Full_Itinerary_2026.pdf');
              onClose();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-[#eff4ff] border border-[#d3e4fe] text-[#002045] font-bold text-xs flex items-center justify-between hover:bg-[#e0ecff] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#b52426]">picture_as_pdf</span>
              <span>Хөтөлбөрийг PDF татаж авах (Offline)</span>
            </div>
            <span className="material-symbols-outlined text-[16px] text-slate-400">download</span>
          </button>

          {/* Primary Menus Group */}
          {primaryItems.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-black tracking-wider text-slate-400 px-2 uppercase">
                ҮНДСЭН ХЭСЭГ
              </span>
              <div className="bg-slate-50 rounded-2xl border border-slate-200/70 divide-y divide-slate-100 overflow-hidden">
                {primaryItems.map((item) => {
                  const isActive = currentTab === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => handleItemSelect(item.key)}
                      className={`w-full p-3 flex items-center justify-between text-left transition-colors active:bg-slate-200 cursor-pointer ${
                        isActive ? 'bg-[#e8f0fe]' : 'hover:bg-slate-100/80'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            isActive
                              ? 'bg-[#1967d2] text-white shadow-xs'
                              : 'bg-white text-slate-700 border border-slate-200'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                        </div>
                        <div className="min-w-0">
                          <span
                            className={`text-xs font-bold block truncate leading-tight ${
                              isActive ? 'text-[#1967d2]' : 'text-slate-900'
                            }`}
                          >
                            {item.label}
                          </span>
                          <span className="text-[11px] text-slate-500 block truncate mt-0.5">
                            {item.description || item.label}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 ml-2">
                        {item.badge && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800">
                            {item.badge}
                          </span>
                        )}
                        <span className="material-symbols-outlined text-[18px] text-slate-400">chevron_right</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Secondary Menus Group */}
          {secondaryItems.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-black tracking-wider text-slate-400 px-2 uppercase">
                ХЭРЭГЛЭГДЭХҮҮН & БЭЛТГЭЛ
              </span>
              <div className="bg-slate-50 rounded-2xl border border-slate-200/70 divide-y divide-slate-100 overflow-hidden">
                {secondaryItems.map((item) => {
                  const isActive = currentTab === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => handleItemSelect(item.key)}
                      className={`w-full p-3 flex items-center justify-between text-left transition-colors active:bg-slate-200 cursor-pointer ${
                        isActive ? 'bg-[#e8f0fe]' : 'hover:bg-slate-100/80'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            isActive
                              ? 'bg-[#1967d2] text-white shadow-xs'
                              : 'bg-white text-slate-700 border border-slate-200'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                        </div>
                        <div className="min-w-0">
                          <span
                            className={`text-xs font-bold block truncate leading-tight ${
                              isActive ? 'text-[#1967d2]' : 'text-slate-900'
                            }`}
                          >
                            {item.label}
                          </span>
                          <span className="text-[11px] text-slate-500 block truncate mt-0.5">
                            {item.description || item.label}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 ml-2">
                        {item.badge && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                            {item.badge}
                          </span>
                        )}
                        <span className="material-symbols-outlined text-[18px] text-slate-400">chevron_right</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Emergency Hotlines Box */}
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs">
            <div className="flex items-center gap-2 mb-2 font-bold text-red-900">
              <span className="material-symbols-outlined text-[18px] text-red-600">emergency</span>
              <span>Яаралтай холбоо барих (Япон улс)</span>
            </div>
            <div className="space-y-1 text-[11px] text-slate-700">
              <div className="flex justify-between">
                <span>Монгол Улсын ЭСЯ (Токио):</span>
                <a href="tel:+81334692088" className="font-bold text-red-800 underline">+81-3-3469-2088</a>
              </div>
              <div className="flex justify-between">
                <span>Консулын 24/7 тусламж:</span>
                <a href="tel:+818041002088" className="font-bold text-red-800 underline">+81-80-4100-2088</a>
              </div>
              <div className="flex justify-between pt-1 border-t border-red-200/60 text-slate-500">
                <span>Цагдаа: 110</span>
                <span>Түргэн тусламж: 119</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
