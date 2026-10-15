import React, { useState, useMemo } from 'react';
import { SHOPPING_MALLS, ShoppingMall } from '../data/shopping';

export const ShoppingPage: React.FC = () => {
  const [cityTab, setCityTab] = useState<'all' | 'tokyo' | 'osaka'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredMalls = useMemo(() => {
    return SHOPPING_MALLS.filter(mall => {
      if (cityTab !== 'all' && mall.city !== cityTab) return false;
      if (categoryFilter !== 'all' && mall.category !== categoryFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = mall.name.toLowerCase().includes(q);
        const matchesStation = mall.station.toLowerCase().includes(q);
        const matchesDesc = mall.description.toLowerCase().includes(q);
        const matchesHigh = mall.highlights.toLowerCase().includes(q);
        if (!matchesName && !matchesStation && !matchesDesc && !matchesHigh) return false;
      }
      return true;
    });
  }, [cityTab, categoryFilter, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-20 w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#e5eeff]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#b52426]"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#74777f]">
              ХУДАЛДАА, БЭЛЭГ ДУРСГАЛ & АЯЛАЛ ЖУУЛЧЛАЛ
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002045] tracking-tight">
            Shopping & Худалдааны Төвүүд
          </h1>
          <p className="text-xs sm:text-sm text-[#586e8d] mt-1 leading-relaxed">
            Токио болон Осака хотуудын алдартай худалдааны төвүүд, их дэлгүүрүүд, метроны буудлын байршил ба Google Maps чиглэл.
          </p>
        </div>

        {/* City Filter Switcher Tabs */}
        <div className="flex items-center p-1 bg-[#eff4ff] rounded-2xl border border-[#d3e4fe] shrink-0">
          <button
            onClick={() => setCityTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              cityTab === 'all'
                ? 'bg-[#002045] text-white shadow-sm'
                : 'text-[#43474e] hover:text-[#002045]'
            }`}
          >
            Бүгд ({SHOPPING_MALLS.length})
          </button>
          <button
            onClick={() => setCityTab('tokyo')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              cityTab === 'tokyo'
                ? 'bg-[#002045] text-white shadow-sm'
                : 'text-[#43474e] hover:text-[#002045]'
            }`}
          >
            Токио (6)
          </button>
          <button
            onClick={() => setCityTab('osaka')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              cityTab === 'osaka'
                ? 'bg-[#002045] text-white shadow-sm'
                : 'text-[#43474e] hover:text-[#002045]'
            }`}
          >
            Осака (6)
          </button>
        </div>
      </div>

      {/* Search & Category Chips */}
      <div className="py-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {['all', 'Их дэлгүүр', 'Загвар & Lifestyle', 'Электроник', 'Бэлэг дурсгал & Гоо сайхан', 'Outlet'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                categoryFilter === cat
                  ? 'bg-[#002045] text-white shadow-sm'
                  : 'bg-white border border-[#d3e4fe] text-[#43474e] hover:bg-[#eff4ff]'
              }`}
            >
              {cat === 'all' ? 'Бүх ангилал' : cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative max-w-xs w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Дэлгүүр, буудлын нэрээр хайх..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-[#d3e4fe] focus:outline-none focus:ring-1 focus:ring-[#002045]"
          />
        </div>
      </div>

      {/* Tokyo Section if visible */}
      {(cityTab === 'all' || cityTab === 'tokyo') && (
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200">
            <span className="w-3 h-3 rounded-full bg-[#002045]"></span>
            <h2 className="text-xl font-extrabold text-[#002045]">
              Токио хотын худалдааны төвүүд
            </h2>
            <span className="text-xs text-slate-500 font-semibold">(Tokyo Shopping Centers)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMalls.filter(m => m.city === 'tokyo').map((mall, idx) => (
              <div
                key={mall.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-[#e5eeff] p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="w-7 h-7 rounded-lg bg-[#eff4ff] text-[#002045] font-extrabold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#e5eeff] text-[#002045]">
                      {mall.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-[#002045] mb-1.5 leading-snug">
                    {mall.name}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-[#b52426] font-bold mb-3">
                    <span className="material-symbols-outlined text-[16px]">train</span>
                    <span>{mall.station}</span>
                  </div>

                  <p className="text-xs text-[#586e8d] leading-relaxed mb-4">
                    {mall.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  {mall.tourismUrl ? (
                    <a
                      href={mall.tourismUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#002045] font-bold hover:underline"
                    >
                      <span className="material-symbols-outlined text-[15px]">travel_explore</span>
                      <span>{mall.tourismLabel || 'TokyoTourism.org'}</span>
                    </a>
                  ) : (
                    <span className="text-[11px] text-slate-400 font-medium">Татваргүй худалдаа (Tax-Free)</span>
                  )}

                  <a
                    href={mall.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#002045] hover:bg-[#1a365d] text-white text-xs font-bold transition-colors shadow-sm ml-auto"
                  >
                    <span className="material-symbols-outlined text-[15px]">map</span>
                    <span>Google Maps дээр харах</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Osaka Section if visible */}
      {(cityTab === 'all' || cityTab === 'osaka') && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200">
            <span className="w-3 h-3 rounded-full bg-[#b52426]"></span>
            <h2 className="text-xl font-extrabold text-[#002045]">
              Osaka хотын худалдааны төвүүд
            </h2>
            <span className="text-xs text-slate-500 font-semibold">(Osaka Shopping Centers)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMalls.filter(m => m.city === 'osaka').map((mall, idx) => (
              <div
                key={mall.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-[#e5eeff] p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="w-7 h-7 rounded-lg bg-[#ffdad6] text-[#b52426] font-extrabold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#eff4ff] text-[#002045]">
                      {mall.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-[#002045] mb-1.5 leading-snug">
                    {mall.name}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-[#b52426] font-bold mb-3">
                    <span className="material-symbols-outlined text-[16px]">train</span>
                    <span>{mall.station}</span>
                  </div>

                  <p className="text-xs text-[#586e8d] leading-relaxed mb-4">
                    {mall.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-400 font-medium">Passport Tax-Free</span>
                  <a
                    href={mall.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#002045] hover:bg-[#1a365d] text-white text-xs font-bold transition-colors shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[15px]">map</span>
                    <span>Google Maps дээр харах</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tax Free Guide Banner */}
      <div className="p-5 rounded-2xl bg-[#eff4ff] border border-[#d3e4fe] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#002045] text-white flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">percent</span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#002045]">Японд Tax-Free (Татваргүй худалдаа) авах заавар</h4>
            <p className="text-xs text-[#43474e] mt-0.5">
              5,000¥-с дээш үнийн дүнтэй худалдан авалтад паспортоо (эсвэл Visit Japan Web татваргүй худалдааны QR) үзүүлснээр 10%-ийн хэрэглээний татвараас шууд чөлөөлөгдөнө.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
