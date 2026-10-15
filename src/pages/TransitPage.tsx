import React from 'react';

export const TransitPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-20 w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#e5eeff]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#002045]"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#74777f]">
              ЛОГИСТИК, ХУРДАН ГАЛТ ТЭРЭГ & БАЙРШИЛ
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002045] tracking-tight">
            Тээвэр, Чиглэл & Байршил
          </h1>
          <p className="text-xs sm:text-sm text-[#586e8d] mt-1 leading-relaxed">
            Шинкансэн хурдан галт тэрэг, метроны сүлжээ, ICOCA/Suica тээврийн карт болон зочид буудлын байршлын мэдээлэл.
          </p>
        </div>
      </div>

      {/* Transit Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        {/* Shinkansen */}
        <div className="bg-white rounded-2xl p-6 border border-[#e5eeff] shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#eff4ff] text-[#002045] flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[28px]">train</span>
            </div>
            <span className="text-xs font-bold text-[#b52426] uppercase tracking-wider">10.25 Шилжилт</span>
            <h3 className="text-lg font-bold text-[#002045] mt-1 mb-2">Шинкансэн (Син-Осака → Токио)</h3>
            <p className="text-xs text-[#586e8d] leading-relaxed mb-4">
              Токайдо Шинкансэн (Nozomi / Hikari) хурдан галт тэргээр 515 км замыг ердөө <strong>2 цаг 30 минутад</strong> туулна. Бүх суудал урьдчилан захиалгатай (Reserved Seat) байх тул ачааг вагоны зориулалтын хэсэгт байрлуулна.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-[#f8f9ff] border border-slate-100 text-xs">
            <span className="font-bold text-[#002045] block">Хурд: 285 км/цаг</span>
            <span className="text-slate-500 text-[11px]">Shin-Osaka St. → Tokyo St.</span>
          </div>
        </div>

        {/* IC Cards */}
        <div className="bg-white rounded-2xl p-6 border border-[#e5eeff] shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#ffdad6] text-[#b52426] flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[28px]">contactless</span>
            </div>
            <span className="text-xs font-bold text-[#002045] uppercase tracking-wider">Төлбөрийн карт</span>
            <h3 className="text-lg font-bold text-[#002045] mt-1 mb-2">ICOCA & Suica Тээврийн Карт</h3>
            <p className="text-xs text-[#586e8d] leading-relaxed mb-4">
              Осака-д <strong>ICOCA</strong>, Токио-д <strong>Suica</strong> картыг ашиглана. Аль аль нь нийтийн тээвэр, такси, конбини (7-Eleven, Lawson), ундааны автомат машинд шууд хүрэлцэх замаар төлбөр төлөх боломжтой.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-[#f8f9ff] border border-slate-100 text-xs">
            <span className="font-bold text-[#002045] block">Цэнэглэлт: Бэлэн иенээр</span>
            <span className="text-slate-500 text-[11px]">Apple Wallet дээр Suica шууд үүсгэж болно</span>
          </div>
        </div>

        {/* Airport Express */}
        <div className="bg-white rounded-2xl p-6 border border-[#e5eeff] shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#d6e3ff] text-[#001b3c] flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[28px]">flight</span>
            </div>
            <span className="text-xs font-bold text-[#002045] uppercase tracking-wider">Нисэх буудлын экспресс</span>
            <h3 className="text-lg font-bold text-[#002045] mt-1 mb-2">Харука & Нарита Экспресс</h3>
            <p className="text-xs text-[#586e8d] leading-relaxed mb-4">
              Кансай ОУНБ-аас Осака хотын төв рүү <strong>JR Haruka Express</strong>-ээр 45 минут зорчино. Харин Токио хотоос буцах өдөр Нарита нисэх онгоцны буудал руу Нарита Экспресс (N'EX)-ээр шууд очно.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-[#f8f9ff] border border-slate-100 text-xs">
            <span className="font-bold text-[#002045] block">Тусгай автобус & Экспресс галт тэрэг</span>
            <span className="text-slate-500 text-[11px]">Штабын баг чиглүүлэг хийнэ</span>
          </div>
        </div>
      </div>

      {/* Hotel & Key Venue Locations with Direct Map Links */}
      <div>
        <h2 className="text-xl font-bold text-[#002045] mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#b52426]">apartment</span>
          Зочид буудал & Гол танхимуудын байршил
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Hotel 1: Osaka */}
          <div className="bg-white rounded-2xl p-6 border border-[#d3e4fe] shadow-sm flex flex-col justify-between">
            <div>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#e5eeff] text-[#002045] uppercase">
                Осака зочид буудал (10.18 - 10.25)
              </span>
              <h3 className="text-lg font-bold text-[#002045] mt-2 mb-1">Hotel Granvia Osaka</h3>
              <p className="text-xs text-[#586e8d] mb-4">
                3-1-1 Umeda, Kita-ku, Osaka, 530-0001 Japan. JR Osaka Station төв өртөөтэй шууд холбогдсон 4 одтой люкс зочид буудал.
              </p>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Hotel+Granvia+Osaka"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-[#002045] text-white hover:bg-[#1a365d] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">pin_drop</span>
              <span>Google Maps дээр харах</span>
            </a>
          </div>

          {/* Hotel 2: Tokyo */}
          <div className="bg-white rounded-2xl p-6 border border-[#d3e4fe] shadow-sm flex flex-col justify-between">
            <div>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#ffdad6] text-[#410003] uppercase">
                Токио зочид буудал (10.25 - 10.30)
              </span>
              <h3 className="text-lg font-bold text-[#002045] mt-2 mb-1">Hotel Metropolitan Tokyo</h3>
              <p className="text-xs text-[#586e8d] mb-4">
                1-6-1 Nishi-Ikebukuro, Toshima-ku, Tokyo, 171-8505 Japan. Метро болон Yamanote тойрог шугамын буудалтай шууд залгаа.
              </p>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Hotel+Metropolitan+Tokyo+Ikebukuro"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-[#002045] text-white hover:bg-[#1a365d] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">pin_drop</span>
              <span>Google Maps дээр харах</span>
            </a>
          </div>

          {/* Venue: Osaka Convention Center */}
          <div className="bg-white rounded-2xl p-6 border border-[#d3e4fe] shadow-sm flex flex-col justify-between">
            <div>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#ffdcc3] text-[#2f1500] uppercase">
                Сургалтын танхим (Day 1)
              </span>
              <h3 className="text-lg font-bold text-[#002045] mt-2 mb-1">Grand Cube Osaka</h3>
              <p className="text-xs text-[#586e8d] mb-4">
                Osaka International Convention Center, 5-3-51 Nakanoshima, Kita-ku, Osaka. Kaizen ба нээлтийн orientation семинар зохион байгуулагдана.
              </p>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Osaka+International+Convention+Center"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-[#002045] text-white hover:bg-[#1a365d] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">pin_drop</span>
              <span>Google Maps дээр харах</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
