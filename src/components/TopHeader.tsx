import React, { useState } from 'react';
import { PageTab } from './Header';

interface TopHeaderProps {
  currentTab: PageTab;
  onSelectTab: (tab: PageTab) => void;
  onOpenMobileMenu?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentTab: _currentTab,
  onSelectTab,
  onOpenMobileMenu
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

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

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white border-b border-[#e5eeff] px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        {/* Left: Mobile Menu Toggle & Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Цэс нээх"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>

          <div
            onClick={() => onSelectTab('nuur')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            {/* Mt Fuji & Red Sun Emblem */}
            <div className="w-10 h-10 rounded-full bg-[#b52426] flex items-center justify-center relative overflow-hidden shadow-sm shrink-0">
              {/* White Snow Peak */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none">
                  {/* Sun */}
                  <circle cx="20" cy="20" r="18" fill="#d92d20" />
                  {/* Mountain Base */}
                  <path d="M4 35 L20 12 L36 35 Z" fill="#0f172a" />
                  {/* Snow Peak */}
                  <path d="M14 20.5 L20 12 L26 20.5 L23 18.5 L20 21 L17 18.5 Z" fill="#ffffff" />
                </svg>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-black text-[#0f172a] text-base tracking-wider leading-none">
                JAPAN TRIP 2026
              </span>
              <span className="text-[11px] font-semibold text-[#64748b] tracking-tight mt-0.5">
                Learn • Connect • Explore
              </span>
            </div>
          </div>
        </div>

        {/* Center: Search input */}
        <div className="flex-1 max-w-xl mx-2 hidden md:block">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[19px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Хайх... (хөтөлбөр, байршил, компани гэх мэт)"
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
        </div>

        {/* Right: Date range pill, Travelers count, Notification, Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Date range pill */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#f8faff] border border-[#e2e8f0] text-xs font-bold text-slate-700">
            <span className="material-symbols-outlined text-[17px] text-slate-500">calendar_month</span>
            <div className="flex flex-col leading-tight">
              <span className="text-slate-900 font-extrabold text-[12px]">2026.10.18 - 10.30</span>
              <span className="text-[10px] text-slate-500 font-medium">Osaka • Tokyo</span>
            </div>
          </div>

          {/* Travelers Count */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f8faff] border border-[#e2e8f0] text-xs font-bold text-slate-800">
            <span className="material-symbols-outlined text-[18px] text-[#002045]">groups</span>
            <span>20 Аялагч</span>
          </div>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-[#f1f5f9] transition-colors relative"
              aria-label="Мэдэгдэл"
            >
              <span className="material-symbols-outlined text-[21px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#e52b2b] ring-2 ring-white"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 p-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="font-bold text-[#002045] text-sm">Шуурхай мэдэгдлүүд</span>
                  <span className="text-xs text-[#586e8d]">
                    {notifications.filter(n => n.unread).length} шинэ
                  </span>
                </div>
                <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                  {notifications.map(n => (
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

          {/* Profile Avatar Photo */}
          <button
            onClick={() => setShowProfileModal(true)}
            className="w-9 h-9 rounded-full bg-cover bg-center border-2 border-white shadow-sm ring-1 ring-slate-300 hover:ring-[#002045] transition-all cursor-pointer"
            style={{
              backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAX9PGNzIiYjTRT7EM5Y6GCA3R0aVykcYq-dQJA5GFyLhiDCKRdGuzuVk_GmsOy9bv0tsCl9JKXfJ_2PslM3MglpBahQdH0po2U9hqW47EgmcLdGnVbJ9nVU3W0cAAjvDC1ZH_8LpnR5C_mcRj9_PmGRycg_6eRqQwoCmL7dNZ-JtdbxzwJKBj3a-DNY8PoMFNDMXFcUBfxYR9Yc1Ax7z__OB_wzuURNe7cEySjBX35gPDGbxRTF8zw")`
            }}
            aria-label="Хэрэглэгчийн мэдээлэл"
          />
        </div>
      </header>

      {/* User Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-bold text-[#002045] text-lg">Төлөөлөгчийн Хувийн Карт</h3>
              <button
                onClick={() => setShowProfileModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="py-5 flex flex-col items-center text-center">
              <div
                className="w-20 h-20 rounded-full bg-cover bg-center border-4 border-[#d6e3ff] shadow-md mb-3"
                style={{
                  backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAX9PGNzIiYjTRT7EM5Y6GCA3R0aVykcYq-dQJA5GFyLhiDCKRdGuzuVk_GmsOy9bv0tsCl9JKXfJ_2PslM3MglpBahQdH0po2U9hqW47EgmcLdGnVbJ9nVU3W0cAAjvDC1ZH_8LpnR5C_mcRj9_PmGRycg_6eRqQwoCmL7dNZ-JtdbxzwJKBj3a-DNY8PoMFNDMXFcUBfxYR9Yc1Ax7z__OB_wzuURNe7cEySjBX35gPDGbxRTF8zw")`
                }}
              />
              <h4 className="font-bold text-lg text-[#002045]">Ц. Тогтохсүрэн</h4>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#e5eeff] text-[#002045] font-semibold mt-1">
                Бизнес Төлөөлөгч • VIP Делегат
              </span>
              <p className="text-xs text-slate-500 mt-2">Имэйл: ts.togtokhsuren@gmail.com</p>

              <div className="w-full mt-6 bg-[#eff4ff] rounded-xl p-3 text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Багийн бүртгэл:</span>
                  <span className="font-bold text-[#002045]">Group-1 (Ахлагч Гантигмаа)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Декларац (VJW):</span>
                  <span className="font-bold text-emerald-700">QR бэлэн</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Осака зочид буудал:</span>
                  <span className="font-semibold text-slate-800">Hotel Granvia Osaka (Room #812)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Токио зочид буудал:</span>
                  <span className="font-semibold text-slate-800">Hotel Metropolitan Tokyo (Room #504)</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowProfileModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#002045] text-white font-bold text-sm hover:bg-[#1a365d] transition-colors"
            >
              Хаах
            </button>
          </div>
        </div>
      )}
    </>
  );
};
