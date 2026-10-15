import React, { useState } from 'react';

export type PageTab =
  | 'nuur'
  | 'khotolbor'
  | 'bagiin-burtgel'
  | 'beleg'
  | 'shopping'
  | 'deklarats'
  | 'teever'
  | 'khel'
  | 'surgaltyn-irts'
  | 'zurgiin-san'
  | 'kholboo-barikh';

interface HeaderProps {
  currentTab: PageTab;
  onSelectTab: (tab: PageTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onSelectTab }) => {
  const [lang, setLang] = useState<'MN' | 'JP'>('MN');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'Нислэгийн бүртгэлийн цаг',
      time: '10 минутын өмнө',
      text: '10.18-ны өдрийн нислэгийн бүртгэл 10:30-д Чингис Хаан ОУНБ-д эхэлнэ. Цээж зураг, паспортоо бэлэн байлгана уу.',
      unread: true
    },
    {
      id: 2,
      title: 'Visit Japan Web Декларац',
      time: '30 минутын өмнө',
      text: 'services.digital.go.jp хаягаар орж цагаачлалын карт, гаалийн мэдүүлгээ урьдчилан бөглөнө үү.',
      unread: true
    },
    {
      id: 3,
      title: '5 Багийн бүртгэл зарлагдлаа',
      time: '1 цагийн өмнө',
      text: 'Багийн бүртгэл хэсгээс хуваарилагдсан баг, даалгавар, кейс шинжилгээний сэдвээ шалгана уу.',
      unread: false
    }
  ];

  const primaryNavItems: { key: PageTab; label: string; icon?: string }[] = [
    { key: 'nuur', label: 'Нүүр' },
    { key: 'khotolbor', label: 'Хөтөлбөр' },
    { key: 'bagiin-burtgel', label: 'Багийн бүртгэл' },
    { key: 'beleg', label: 'Бэлэг' },
    { key: 'shopping', label: 'Shopping' },
    { key: 'deklarats', label: 'Декларац' }
  ];

  const secondaryNavItems: { key: PageTab; label: string; icon: string }[] = [
    { key: 'teever', label: 'Тээвэр, чиглэл, байршил', icon: 'train' },
    { key: 'khel', label: 'Япон хэлний түргэн туслах', icon: 'translate' },
    { key: 'surgaltyn-irts', label: 'Сургалтын ирц', icon: 'checklist' },
    { key: 'zurgiin-san', label: 'Зургийн сан', icon: 'photo_library' },
    { key: 'kholboo-barikh', label: 'Холбоо барих', icon: 'call' }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full z-40 bg-white/95 backdrop-blur-md shadow-[0_1px_8px_rgba(26,54,93,0.06)] border-b border-[#e5eeff]">
        {/* Top Emergency Flight Announcement Ticker */}
        <div className="w-full bg-[#002045] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="inline-flex items-center gap-1 text-[#ffdad6] bg-[#b52426]/90 px-2 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase shrink-0">
                <span className="material-symbols-outlined text-[14px]">warning</span> ШУУРХАЙ
              </span>
              <span className="truncate text-[#dce9ff]">
                2026.10.18 өдрийн 13:00 цагийн нислэгийн бүртгэл 10:30 цагт Чингис Хаан ОУНБ-д эхэлнэ.
              </span>
            </div>
            <div className="hidden lg:flex items-center gap-4 shrink-0 text-[#d3e4fe] text-xs">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-amber-300">wb_sunny</span>
                Кансай (Осака): +17°C Цэлмэг
              </span>
              <span className="inline-block w-1 h-1 rounded-full bg-white/30"></span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-slate-300">cloud</span>
                Токио: +19°C Үүлтэй
              </span>
              <span className="inline-block w-1 h-1 rounded-full bg-white/30"></span>
              <span className="text-[#ffdcc3] font-semibold bg-white/10 px-2 py-0.5 rounded">1 JPY ≈ 22.8 MNT</span>
            </div>
          </div>
        </div>

        {/* Main Nav Bar */}
        <div className="h-18 max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Logo & Brand (Left) */}
          <div className="flex-1 flex justify-start items-center min-w-0">
            <div
              onClick={() => onSelectTab('nuur')}
              className="flex items-center gap-2.5 cursor-pointer group shrink-0"
            >
              <div className="w-9 h-9 rounded-xl bg-[#002045] flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:bg-[#1a365d] transition-colors">
                <span className="material-symbols-outlined text-[20px]">flight_takeoff</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-[#002045] text-base tracking-tight">ЯПОН БИЗНЕС СУРГАЛТ</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#ffdad6] text-[#920212] font-black">2026</span>
                </div>
                <span className="text-[11px] text-[#586e8d] truncate">Осака • Киото • Токио</span>
              </div>
            </div>
          </div>

          {/* Navigation Items (Desktop) - Perfectly centered in the middle */}
          <div className="hidden lg:flex items-center justify-center shrink-0">
            <nav className="flex items-center gap-1 p-1 bg-[#eff4ff] rounded-xl border border-[#d3e4fe]/60 shadow-xs">
              {primaryNavItems.map(item => (
                <button
                  key={item.key}
                  onClick={() => onSelectTab(item.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    currentTab === item.key
                      ? 'bg-[#002045] text-white shadow-sm'
                      : 'text-[#43474e] hover:text-[#002045] hover:bg-[#e5eeff]'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {/* More Menu Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    secondaryNavItems.some(i => i.key === currentTab)
                      ? 'bg-[#002045] text-white shadow-sm'
                      : 'text-[#43474e] hover:text-[#002045] hover:bg-[#e5eeff]'
                  }`}
                >
                  <span>Бусад</span>
                  <span className="material-symbols-outlined text-[16px]">
                    {isMoreMenuOpen ? 'arrow_drop_up' : 'arrow_drop_down'}
                  </span>
                </button>

                {isMoreMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50">
                    {secondaryNavItems.map(item => (
                      <button
                        key={item.key}
                        onClick={() => {
                          onSelectTab(item.key);
                          setIsMoreMenuOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-xs font-bold flex items-center gap-2.5 transition-colors ${
                          currentTab === item.key
                            ? 'bg-[#eff4ff] text-[#002045]'
                            : 'text-slate-700 hover:bg-[#f8f9ff]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px] text-[#b52426]">{item.icon}</span>
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Right Tools: VJW link, notification, lang, profile (Right) */}
          <div className="flex-1 flex justify-end items-center gap-2 min-w-0">
            {/* Quick Digital Declaration Pill */}
            <button
              onClick={() => onSelectTab('deklarats')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ffdad6]/60 border border-[#ffdad6] text-[#920212] hover:bg-[#ffdad6] text-xs font-bold transition-all shrink-0"
              title="services.digital.go.jp"
            >
              <span className="material-symbols-outlined text-[16px]">qr_code_2</span>
              <span>Декларац</span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg text-[#586e8d] hover:text-[#002045] hover:bg-[#eff4ff] transition-colors"
                aria-label="Мэдэгдэл"
              >
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#b52426] ring-2 ring-white"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-[#d3dae4] z-50 p-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#e5eeff]">
                    <span className="font-bold text-[#002045] text-sm">Шуурхай мэдэгдлүүд</span>
                    <span className="text-xs text-[#586e8d]">{notifications.filter(n => n.unread).length} шинэ</span>
                  </div>
                  <div className="divide-y divide-[#f1f5f9] max-h-80 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className="py-2.5">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-bold text-[#002045]">{n.title}</span>
                          <span className="text-slate-400 text-[11px]">{n.time}</span>
                        </div>
                        <p className="text-xs text-[#43474e] leading-relaxed">{n.text}</p>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-[#e5eeff] text-center">
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

            {/* Language Switch */}
            <div className="flex items-center bg-[#eff4ff] rounded-lg p-0.5 text-xs font-semibold text-[#586e8d]">
              <button
                onClick={() => setLang('MN')}
                className={`px-2 py-1 rounded ${lang === 'MN' ? 'bg-white text-[#002045] shadow-sm font-bold' : 'hover:text-[#002045]'}`}
              >
                MN
              </button>
              <button
                onClick={() => setLang('JP')}
                className={`px-2 py-1 rounded ${lang === 'JP' ? 'bg-white text-[#002045] shadow-sm font-bold' : 'hover:text-[#002045]'}`}
              >
                JP
              </button>
            </div>

            {/* User Avatar */}
            <button
              onClick={() => setShowProfileModal(true)}
              className="w-8 h-8 rounded-full bg-cover bg-center border-2 border-white shadow-sm ring-1 ring-[#d3e4fe] hover:ring-[#002045] transition-all cursor-pointer"
              style={{
                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAX9PGNzIiYjTRT7EM5Y6GCA3R0aVykcYq-dQJA5GFyLhiDCKRdGuzuVk_GmsOy9bv0tsCl9JKXfJ_2PslM3MglpBahQdH0po2U9hqW47EgmcLdGnVbJ9nVU3W0cAAjvDC1ZH_8LpnR5C_mcRj9_PmGRycg_6eRqQwoCmL7dNZ-JtdbxzwJKBj3a-DNY8PoMFNDMXFcUBfxYR9Yc1Ax7z__OB_wzuURNe7cEySjBX35gPDGbxRTF8zw")`
              }}
              aria-label="Хэрэглэгчийн мэдээлэл"
            />
          </div>
        </div>

        {/* Sub-bar for all menus - centered in the middle */}
        <div className="w-full border-t border-[#e5eeff] bg-[#f8f9ff] overflow-x-auto scrollbar-none">
          <div className="flex items-center justify-center min-w-max mx-auto px-4 py-2 gap-2 text-xs font-bold">
            {primaryNavItems.map(item => (
              <button
                key={item.key}
                onClick={() => onSelectTab(item.key)}
                className={`px-3 py-1.5 rounded-lg shrink-0 transition-all font-semibold ${
                  currentTab === item.key
                    ? 'bg-[#002045] text-white shadow-xs'
                    : 'text-[#43474e] hover:bg-[#e5eeff] hover:text-[#002045]'
                }`}
              >
                {item.label}
              </button>
            ))}
            <span className="w-px h-4 bg-slate-300 shrink-0 mx-0.5"></span>
            {secondaryNavItems.map(item => (
              <button
                key={item.key}
                onClick={() => onSelectTab(item.key)}
                className={`px-3 py-1.5 rounded-lg shrink-0 transition-all flex items-center gap-1.5 font-semibold ${
                  currentTab === item.key
                    ? 'bg-[#002045] text-white shadow-xs'
                    : 'text-[#43474e] hover:bg-[#e5eeff] hover:text-[#002045]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
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
