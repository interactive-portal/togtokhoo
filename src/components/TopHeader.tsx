import React, { useState, useMemo, useEffect } from 'react';
import { PageTab } from './Header';
import { ITINERARY_DATA } from '../data/itinerary';
import { SHOPPING_MALLS } from '../data/shopping';
import { STUDY_TOUR_TEAMS } from '../data/teams';
import { getMenusData, MenuItemConfig } from '../data/dataStore';

interface TopHeaderProps {
  currentTab: PageTab;
  onSelectTab: (tab: PageTab) => void;
  onOpenMobileMenu?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenMobileMenu
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Dynamic menus loaded from dataStore (managed via Admin)
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

  const notifications = [
    {
      id: 1,
      title: 'Нислэгийн бүртгэлийн цаг',
      time: '10 минутын өмнө',
      text: '10.18-ны 13:00 цагийн нислэгийн бүртгэл 10:30-д Чингис Хаан ОУНБ-д эхэлнэ. Паспорт, цээж зургаа бэлдэнэ үү.',
      unread: true
    },
    {
      id: 2,
      title: 'Visit Japan Web Декларац',
      time: '30 минутын өмнө',
      text: 'services.digital.go.jp хаягаар цагаачлалын карт болон гаалийн мэдүүлгээ урьдчилан бөглөж QR бэлдэнэ үү.',
      unread: true
    },
    {
      id: 3,
      title: '5 Багийн бүртгэл зарлагдлаа',
      time: '1 цагийн өмнө',
      text: 'Багийн бүртгэл хэсгээс өөрийн хуваарилагдсан баг, ахлагч, кейс шинжилгээний сэдвээ шалгана уу.',
      unread: false
    }
  ];

  // Quick mobile pill shortcuts (Dynamic from enabled menus except Home)
  const mobilePills = menus.filter((m) => m.key !== 'nuur');

  // Instant Search Results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();

    const matchedEvents = ITINERARY_DATA.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.locationName.toLowerCase().includes(q)
    ).slice(0, 3);

    const matchedMalls = SHOPPING_MALLS.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.station.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q)
    ).slice(0, 3);

    const matchedMembers: { name: string; groupName: string }[] = [];
    STUDY_TOUR_TEAMS.forEach((team) => {
      team.members.forEach((mem) => {
        if (mem.name.toLowerCase().includes(q)) {
          matchedMembers.push({ name: mem.name, groupName: team.name });
        }
      });
    });

    return {
      events: matchedEvents,
      malls: matchedMalls,
      members: matchedMembers.slice(0, 3)
    };
  }, [searchQuery]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#e5eeff] shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        {/* Main Header Row */}
        <div className="px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Menu toggle (desktop/mobile) & Brand Logo */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-1.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors active:scale-95"
              aria-label="Цэс нээх"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>

            <div
              onClick={() => onSelectTab('nuur')}
              className="flex items-center gap-2 cursor-pointer group select-none active:opacity-80"
            >
              {/* Mt Fuji & Red Sun Emblem */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#b52426] flex items-center justify-center relative overflow-hidden shadow-xs shrink-0">
                <svg viewBox="0 0 40 40" className="w-7 h-7 sm:w-9 sm:h-9" fill="none">
                  <circle cx="20" cy="20" r="18" fill="#d92d20" />
                  <path d="M4 35 L20 12 L36 35 Z" fill="#0f172a" />
                  <path d="M14 20.5 L20 12 L26 20.5 L23 18.5 L20 21 L17 18.5 Z" fill="#ffffff" />
                </svg>
              </div>

              <div className="flex flex-col">
                <span className="font-black text-[#0f172a] text-sm sm:text-base tracking-wider leading-none">
                  JAPAN TRIP 2026
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-[#64748b] tracking-tight mt-0.5">
                  Learn • Connect • Explore
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Search bar */}
          <div className="flex-1 max-w-xl mx-2 hidden md:block relative">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[19px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Хайх... (хөтөлбөр, байршил, компани, гишүүн гэх мэт)"
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#f4f7fb] border border-[#e2e8f0] text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#002045] focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              )}
            </div>

            {/* Desktop Instant Search Dropdown */}
            {searchResults && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 max-h-96 overflow-y-auto">
                <div className="text-xs space-y-3">
                  {searchResults.events.length > 0 && (
                    <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">
                        Хөтөлбөр ({searchResults.events.length})
                      </span>
                      {searchResults.events.map((e) => (
                        <div
                          key={e.id}
                          onClick={() => {
                            onSelectTab('khotolbor');
                            setSearchQuery('');
                          }}
                          className="p-2 rounded-lg hover:bg-slate-50 cursor-pointer flex items-center justify-between"
                        >
                          <div>
                            <span className="font-bold text-[#002045] block">{e.title}</span>
                            <span className="text-[11px] text-slate-500">{e.locationName}</span>
                          </div>
                          <span className="text-[10px] font-semibold text-slate-400">{e.dateStr}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {searchResults.malls.length > 0 && (
                    <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">
                        Shopping ({searchResults.malls.length})
                      </span>
                      {searchResults.malls.map((m) => (
                        <div
                          key={m.id}
                          onClick={() => {
                            onSelectTab('shopping');
                            setSearchQuery('');
                          }}
                          className="p-2 rounded-lg hover:bg-slate-50 cursor-pointer flex items-center justify-between"
                        >
                          <div>
                            <span className="font-bold text-[#002045] block">{m.name}</span>
                            <span className="text-[11px] text-slate-500">📍 {m.station}</span>
                          </div>
                          <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                            {m.city.toUpperCase()}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {searchResults.members.length > 0 && (
                    <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">
                        Багийн гишүүд ({searchResults.members.length})
                      </span>
                      {searchResults.members.map((mem, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            onSelectTab('bagiin-burtgel');
                            setSearchQuery('');
                          }}
                          className="p-2 rounded-lg hover:bg-slate-50 cursor-pointer flex items-center justify-between"
                        >
                          <span className="font-bold text-[#002045]">{mem.name}</span>
                          <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                            {mem.groupName}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {searchResults.events.length === 0 &&
                    searchResults.malls.length === 0 &&
                    searchResults.members.length === 0 && (
                      <div className="p-4 text-center text-slate-400 text-xs">
                        Тохирох үр дүн олдсонгүй.
                      </div>
                    )}
                </div>
              </div>
            )}
          </div>

          {/* Right Actions: Mobile search button, badges, notification, profile */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Mobile Search Toggle Icon Button */}
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors active:scale-95"
              aria-label="Хайлт"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isMobileSearchOpen ? 'close' : 'search'}
              </span>
            </button>

            {/* Date range pill (Desktop) */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#f8faff] border border-[#e2e8f0] text-xs font-bold text-slate-700">
              <span className="material-symbols-outlined text-[17px] text-slate-500">calendar_month</span>
              <div className="flex flex-col leading-tight">
                <span className="text-slate-900 font-extrabold text-[12px]">2026.10.18 - 10.30</span>
                <span className="text-[10px] text-slate-500 font-medium">Osaka • Tokyo</span>
              </div>
            </div>

            {/* Travelers Count (Desktop) */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f8faff] border border-[#e2e8f0] text-xs font-bold text-slate-800">
              <span className="material-symbols-outlined text-[18px] text-[#002045]">groups</span>
              <span>20 Аялагч</span>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-1.5 sm:p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-[#f1f5f9] transition-colors relative active:scale-95"
                aria-label="Мэдэгдэл"
              >
                <span className="material-symbols-outlined text-[20px] sm:text-[21px]">notifications</span>
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#e52b2b] ring-2 ring-white"></span>
              </button>

              {showNotifications && (
                <div className="fixed sm:absolute right-2 sm:right-0 top-14 sm:top-full mt-1 w-[calc(100vw-16px)] sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 p-4 max-w-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="font-bold text-[#002045] text-sm">Шуурхай мэдэгдлүүд</span>
                    <span className="text-xs text-[#586e8d]">
                      {notifications.filter((n) => n.unread).length} шинэ
                    </span>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className="py-2.5">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-bold text-[#002045]">{n.title}</span>
                          <span className="text-slate-400 text-[11px]">{n.time}</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{n.text}</p>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-slate-100 text-center">
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-xs text-[#002045] font-semibold hover:underline"
                    >
                      Хаах
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Mobile Search Bar Expansion (when search icon is tapped on mobile) */}
        {isMobileSearchOpen && (
          <div className="px-3 pb-2.5 md:hidden animate-fade-in">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                search
              </span>
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Хөтөлбөр, дэлгүүр, гишүүн хайх..."
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-100 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#002045] focus:bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              )}
            </div>

            {/* Mobile Search Results */}
            {searchResults && (
              <div className="mt-2 bg-white rounded-xl shadow-lg border border-slate-200 p-2.5 max-h-72 overflow-y-auto text-xs space-y-2">
                {searchResults.events.map((e) => (
                  <div
                    key={e.id}
                    onClick={() => {
                      onSelectTab('khotolbor');
                      setIsMobileSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="p-1.5 rounded-lg active:bg-slate-100 flex items-center justify-between"
                  >
                    <span className="font-bold text-[#002045] truncate">{e.title}</span>
                    <span className="text-[10px] text-slate-400 shrink-0">{e.dateStr}</span>
                  </div>
                ))}
                {searchResults.malls.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => {
                      onSelectTab('shopping');
                      setIsMobileSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="p-1.5 rounded-lg active:bg-slate-100 flex items-center justify-between"
                  >
                    <span className="font-bold text-[#002045] truncate">{m.name}</span>
                    <span className="text-[10px] text-amber-700">{m.city}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Mobile Horizontal Quick-Pill Shortcut Bar (Sticky & Horizontal Scroll) */}
        <div className="lg:hidden border-t border-[#eef2f6] px-2 py-1.5 bg-[#fbfcfe] overflow-x-auto scrollbar-none flex items-center gap-1.5 text-xs font-bold">
          {mobilePills.map((pill) => {
            const isActive = currentTab === pill.key;
            return (
              <button
                key={pill.key}
                onClick={() => onSelectTab(pill.key)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg shrink-0 transition-all active:scale-95 cursor-pointer ${
                  isActive
                    ? 'bg-[#002045] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[15px] ${
                    isActive ? 'text-white' : 'text-[#b52426]'
                  }`}
                >
                  {pill.icon}
                </span>
                <span className="whitespace-nowrap">{pill.label}</span>
                {pill.badge && !isActive && (
                  <span className="px-1 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[9px] font-black">
                    {pill.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

    </>
  );
};
