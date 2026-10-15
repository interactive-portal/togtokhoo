import React, { useState, useMemo } from 'react';
import { ITINERARY_DATA, ItineraryItem } from '../data/itinerary';

interface ItineraryPageProps {
  onOpenHandout: (title: string) => void;
  onOpenDetail: (item: ItineraryItem) => void;
}

export const ItineraryPage: React.FC<ItineraryPageProps> = ({
  onOpenHandout,
  onOpenDetail
}) => {
  const [activeCityTab, setActiveCityTab] = useState<'all' | 'osaka' | 'tokyo'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = useMemo(() => {
    return ITINERARY_DATA.filter((item) => {
      // City filter
      if (activeCityTab !== 'all' && item.city !== activeCityTab) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'company' && item.category !== 'company') return false;
        if (selectedCategory === 'seminar' && item.category !== 'seminar') return false;
        if (selectedCategory === 'culture' && item.category !== 'culture') return false;
        if (selectedCategory === 'free' && item.categoryLabel !== 'Чөлөөт өдөр') return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesSubtitle = item.subtitle?.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesLoc = item.locationName.toLowerCase().includes(q);
        const matchesSpeaker = item.speaker?.name.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSubtitle && !matchesDesc && !matchesLoc && !matchesSpeaker) {
          return false;
        }
      }
      return true;
    });
  }, [activeCityTab, selectedCategory, searchQuery]);

  const handleExportFullSchedule = () => {
    onOpenHandout('Japanese_Executive_Study_Tour_Full_Itinerary_2026.pdf');
  };

  const handleSyncAllCalendar = () => {
    let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Japanese Executive Study Tour 2026//EN
CALSCALE:GREGORIAN
`;
    ITINERARY_DATA.forEach((item) => {
      icsContent += `BEGIN:VEVENT
SUMMARY:${item.title}
DESCRIPTION:${item.description.replace(/\n/g, ' ')}
LOCATION:${item.locationName}
STATUS:CONFIRMED
END:VEVENT
`;
    });
    icsContent += 'END:VCALENDAR';

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Japanese_Study_Tour_2026_All_Events.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 pb-20">
      {/* Header bar matching Image 1 */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#e9ecf1]">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 text-[#002045]">
            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" fillRule="evenodd"/>
            </svg>
          </div>
          <h2 className="text-[#101419] text-xl font-bold leading-tight">Хөтөлбөр</h2>
        </div>

        {/* Search & Tool buttons */}
        <div className="flex flex-1 justify-end items-center gap-3 max-w-xl">
          <div className="relative flex-1 max-w-xs">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#586e8d] text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Хөтөлбөр, компани, илтгэгч хайх..."
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#e9ecf1] text-[#101419] placeholder:text-[#586e8d] text-sm focus:outline-none focus:ring-1 focus:ring-[#002045]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <span className="material-symbols-outlined text-[16px]">cancel</span>
              </button>
            )}
          </div>

          <div className="flex gap-2 shrink-0">
            <button
              onClick={handleSyncAllCalendar}
              title="Бүх хөтөлбөрийг календарт татах (.ics)"
              className="h-9 px-3 rounded-lg bg-[#e9ecf1] hover:bg-[#d6e3ff] text-[#101419] flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            </button>
            <button
              onClick={handleExportFullSchedule}
              title="PDF татах"
              className="h-9 px-3 rounded-lg bg-[#e9ecf1] hover:bg-[#d6e3ff] text-[#101419] flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Japanese Executive Study Tour 2026',
                    url: window.location.href
                  }).catch(() => {});
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Хөтөлбөрийн холбоос санах ойд хуулагдлаа!');
                }
              }}
              title="Хуваалцах"
              className="h-9 px-3 rounded-lg bg-[#e9ecf1] hover:bg-[#d6e3ff] text-[#101419] flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Tour Banner Title & PDF Download Button */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-5">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#101419] tracking-tight">
            Japanese Executive Study Tour 2026
          </h1>
          <p className="text-sm font-medium text-[#586e8d]">
            Осака • Киото • Токио | 2026.10.18 - 10.30
          </p>
        </div>
        <button
          onClick={handleExportFullSchedule}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#e9ecf1] hover:bg-[#d6e3ff] text-[#101419] text-sm font-bold transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
          <span>Татаж авах (PDF)</span>
        </button>
      </div>

      {/* City Tabs - Centered */}
      <div className="border-b border-[#d3dae4] flex items-center justify-center gap-6 sm:gap-8 overflow-x-auto">
        <button
          onClick={() => setActiveCityTab('all')}
          className={`flex flex-col items-center pb-3 pt-3 text-sm font-bold border-b-[3px] transition-all whitespace-nowrap ${
            activeCityTab === 'all'
              ? 'border-b-[#1a365d] text-[#101419]'
              : 'border-b-transparent text-[#586e8d] hover:text-[#101419]'
          }`}
        >
          Бүх өдөр (13 өдөр)
        </button>
        <button
          onClick={() => setActiveCityTab('osaka')}
          className={`flex flex-col items-center pb-3 pt-3 text-sm font-bold border-b-[3px] transition-all whitespace-nowrap ${
            activeCityTab === 'osaka'
              ? 'border-b-[#1a365d] text-[#101419]'
              : 'border-b-transparent text-[#586e8d] hover:text-[#101419]'
          }`}
        >
          Осака (10.18 - 10.25)
        </button>
        <button
          onClick={() => setActiveCityTab('tokyo')}
          className={`flex flex-col items-center pb-3 pt-3 text-sm font-bold border-b-[3px] transition-all whitespace-nowrap ${
            activeCityTab === 'tokyo'
              ? 'border-b-[#1a365d] text-[#101419]'
              : 'border-b-transparent text-[#586e8d] hover:text-[#101419]'
          }`}
        >
          Токио (10.26 - 10.30)
        </button>
      </div>

      {/* Type Filter Pills - Centered */}
      <div className="flex justify-center gap-2 py-4 overflow-x-auto flex-wrap">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`flex h-8 shrink-0 items-center gap-1.5 px-3.5 rounded-lg text-xs font-semibold transition-all ${
            selectedCategory === 'all' ? 'bg-[#002045] text-white' : 'bg-[#e9ecf1] text-[#101419] hover:bg-[#d6e3ff]'
          }`}
        >
          <span>Бүх төрөл</span>
        </button>
        <button
          onClick={() => setSelectedCategory('company')}
          className={`flex h-8 shrink-0 items-center gap-1.5 px-3.5 rounded-lg text-xs font-semibold transition-all ${
            selectedCategory === 'company' ? 'bg-[#002045] text-white' : 'bg-[#e9ecf1] text-[#101419] hover:bg-[#d6e3ff]'
          }`}
        >
          <span>Үйлдвэрийн танилцуулга</span>
        </button>
        <button
          onClick={() => setSelectedCategory('seminar')}
          className={`flex h-8 shrink-0 items-center gap-1.5 px-3.5 rounded-lg text-xs font-semibold transition-all ${
            selectedCategory === 'seminar' ? 'bg-[#002045] text-white' : 'bg-[#e9ecf1] text-[#101419] hover:bg-[#d6e3ff]'
          }`}
        >
          <span>Семинар & Илтгэл</span>
        </button>
        <button
          onClick={() => setSelectedCategory('culture')}
          className={`flex h-8 shrink-0 items-center gap-1.5 px-3.5 rounded-lg text-xs font-semibold transition-all ${
            selectedCategory === 'culture' ? 'bg-[#002045] text-white' : 'bg-[#e9ecf1] text-[#101419] hover:bg-[#d6e3ff]'
          }`}
        >
          <span>Соёлын айлчлал</span>
        </button>
        <button
          onClick={() => setSelectedCategory('free')}
          className={`flex h-8 shrink-0 items-center gap-1.5 px-3.5 rounded-lg text-xs font-semibold transition-all ${
            selectedCategory === 'free' ? 'bg-[#002045] text-white' : 'bg-[#e9ecf1] text-[#101419] hover:bg-[#d6e3ff]'
          }`}
        >
          <span>Чөлөөт өдөр</span>
        </button>
      </div>

      {/* Results Count if searching */}
      {searchQuery && (
        <div className="text-xs text-[#586e8d] pb-2">
          Хайлтын үр дүн: <strong>{filteredItems.length}</strong> арга хэмжээ олдлоо.
        </div>
      )}

      {/* Detailed Timeline Section */}
      <div className="flex flex-col gap-6 pt-2">
        {/* Render sections conditionally based on filtered data */}
        
        {/* Section 1: 10.18 - 10.19 */}
        {filteredItems.some(i => i.dayNumber === 1 || i.dayNumber === 2) && (
          <h2 className="text-[#101419] text-xl font-bold tracking-tight pt-2">
            10.18 (Бямба) - Эхний өдөр
          </h2>
        )}

        {filteredItems.filter(i => i.dayNumber === 1 || i.dayNumber === 2).map((item) => (
          <div
            key={item.id}
            onClick={() => onOpenDetail(item)}
            className="bg-white rounded-xl border border-[#c4c6cf]/40 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e5eeff] pb-4">
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded ${item.categoryBg} font-bold text-xs uppercase tracking-wider`}>
                    <span className="material-symbols-outlined text-[16px] mr-1">{item.categoryIcon}</span>
                    {item.categoryLabel}
                  </span>
                  <span className="text-[#43474e] text-sm font-medium">{item.time}</span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Батлагдсан
                </span>
              </div>

              <div className="mt-4 flex flex-col md:flex-row gap-5 justify-between">
                <div className="flex-1">
                  {item.subtitle && (
                    <span className="text-xs font-bold text-[#b52426] uppercase tracking-wider block mb-1">
                      {item.subtitle}
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-[#0b1c30]">
                    {item.title}
                  </h3>
                  <p className="text-[#43474e] text-sm mt-2 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[#43474e]">
                    <div className="flex items-center gap-1.5 bg-[#eff4ff] px-3 py-1.5 rounded">
                      <span className="material-symbols-outlined text-sm text-[#002045]">location_on</span>
                      <span>{item.locationName}</span>
                    </div>
                    {item.locationDetail && (
                      <div className="flex items-center gap-1.5 bg-[#eff4ff] px-3 py-1.5 rounded">
                        <span className="material-symbols-outlined text-sm text-[#002045]">hotel</span>
                        <span>{item.locationDetail}</span>
                      </div>
                    )}
                  </div>
                </div>

                {item.attachment && (
                  <div className="flex flex-col sm:items-end justify-between gap-3 pt-2 md:pt-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenHandout(item.attachment!.name);
                      }}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded bg-[#e5eeff] hover:bg-[#dce9ff] text-[#002045] font-medium text-xs border border-[#c4c6cf]/30 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">description</span>
                      <span>{item.attachment.name}</span>
                      <span className="material-symbols-outlined text-[14px]">download</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Section 2: 10.20 - 10.23: Бизнес уулзалт, Үйлдвэрийн айлчлалууд */}
        {filteredItems.some(i => i.dayNumber >= 3 && i.dayNumber <= 6) && (
          <div className="pt-4">
            <h2 className="text-[#002045] text-xl font-bold tracking-tight">
              10.20 - 10.23: Бизнес уулзалт, Үйлдвэрийн айлчлалууд
            </h2>
          </div>
        )}

        {/* 10.20 Morning: Toshiya Murata */}
        {filteredItems.filter(i => i.id === 'day-3-morning').map((item) => (
          <div
            key={item.id}
            onClick={() => onOpenDetail(item)}
            className="bg-white rounded-xl border border-[#c4c6cf]/40 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e5eeff] pb-4">
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded ${item.categoryBg} font-bold text-xs uppercase tracking-wider`}>
                    <span className="material-symbols-outlined text-[16px] mr-1">{item.categoryIcon}</span>
                    {item.categoryLabel}
                  </span>
                  <span className="text-[#43474e] text-sm font-medium">10.20 (Даваа) | 09:30 - 12:30</span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Батлагдсан
                </span>
              </div>

              <div className="mt-4 flex flex-col md:flex-row gap-5 items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-11 h-11 rounded-full overflow-hidden bg-[#dce9ff] border border-[#c4c6cf]/50 shrink-0">
                      <img
                        className="w-full h-full object-cover"
                        src={item.speaker?.avatar}
                        alt="Toshiya Murata"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-[#0b1c30] leading-tight">{item.speaker?.name}</h4>
                      <span className="text-xs text-[#43474e] font-medium">{item.speaker?.title}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[#002045] mt-3">
                    {item.title}
                  </h3>
                  <p className="text-[#43474e] text-sm mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
                    <div className="flex items-center gap-1.5 bg-[#eff4ff] px-3 py-1.5 rounded text-[#43474e]">
                      <span className="material-symbols-outlined text-sm text-[#002045]">location_on</span>
                      <span>{item.locationName}</span>
                    </div>
                    <a
                      href={item.externalLink?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">link</span>
                      <span>{item.externalLink?.label}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* 10.20 Afternoon: Hiro Coffee */}
        {filteredItems.filter(i => i.id === 'day-3-afternoon').map((item) => (
          <div
            key={item.id}
            onClick={() => onOpenDetail(item)}
            className="bg-white rounded-xl border border-[#c4c6cf]/40 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e5eeff] pb-4">
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded ${item.categoryBg} font-bold text-xs uppercase tracking-wider`}>
                    <span className="material-symbols-outlined text-[16px] mr-1">{item.categoryIcon}</span>
                    {item.categoryLabel}
                  </span>
                  <span className="text-[#43474e] text-sm font-medium">10.20 (Даваа) | 14:00 - 17:00</span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Батлагдсан
                </span>
              </div>

              <div className="mt-4 flex flex-col md:flex-row gap-5 items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#0b1c30]">Hiro Coffee Co ltd</h3>
                    <a
                      href={item.externalLink?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-xs text-[#002045] font-medium hover:underline"
                    >
                      <span>{item.externalLink?.label}</span>
                      <span className="material-symbols-outlined text-xs">open_in_new</span>
                    </a>
                  </div>
                  <h4 className="text-[#002045] font-semibold text-base mt-2">
                    {item.title}
                  </h4>
                  <p className="text-[#43474e] text-sm mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
                    <div className="flex items-center gap-1.5 bg-[#eff4ff] px-3 py-1.5 rounded text-[#43474e]">
                      <span className="material-symbols-outlined text-sm text-[#002045]">location_on</span>
                      <span>{item.locationName}</span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenHandout(item.attachment!.name);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#e5eeff] hover:bg-[#dce9ff] text-[#002045] font-medium border border-[#c4c6cf]/30 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">attach_file</span>
                      <span>{item.attachment?.name}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* 10.21 Aeru Company */}
        {filteredItems.filter(i => i.id === 'day-4').map((item) => (
          <div
            key={item.id}
            onClick={() => onOpenDetail(item)}
            className="bg-white rounded-xl border border-[#c4c6cf]/40 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e5eeff] pb-4">
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded ${item.categoryBg} font-bold text-xs uppercase tracking-wider`}>
                    <span className="material-symbols-outlined text-[16px] mr-1">{item.categoryIcon}</span>
                    {item.categoryLabel}
                  </span>
                  <span className="text-[#43474e] text-sm font-medium">10.21 (Мягмар) | 10:00 - 15:30</span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Батлагдсан
                </span>
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg font-bold text-[#0b1c30]">Aeru Company (株式会社和える)</h3>
                  <span className="text-xs text-[#43474e] italic font-serif">"Bringing Japanese traditions to the next generation"</span>
                </div>
                <h4 className="text-[#002045] font-semibold text-base mt-2">
                  {item.title}
                </h4>
                <p className="text-[#43474e] text-sm mt-1.5 leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[#43474e]">
                  <div className="flex items-center gap-1.5 bg-[#eff4ff] px-3 py-1.5 rounded">
                    <span className="material-symbols-outlined text-sm text-[#002045]">location_on</span>
                    <span>{item.locationName}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* 10.22 Amagasaki City Hall */}
        {filteredItems.filter(i => i.id === 'day-5').map((item) => (
          <div
            key={item.id}
            onClick={() => onOpenDetail(item)}
            className="bg-white rounded-xl border border-[#c4c6cf]/40 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e5eeff] pb-4">
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded ${item.categoryBg} font-bold text-xs uppercase tracking-wider`}>
                    <span className="material-symbols-outlined text-[16px] mr-1">{item.categoryIcon}</span>
                    {item.categoryLabel}
                  </span>
                  <span className="text-[#43474e] text-sm font-medium">10.22 (Лхагва) | 09:30 - 16:00</span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Батлагдсан
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-bold text-[#0b1c30]">Amagasaki City Hall & Amagasaki Shinkin Bank (尼崎信用金庫)</h3>
                <h4 className="text-[#002045] font-semibold text-base mt-2">
                  {item.title}
                </h4>
                <p className="text-[#43474e] text-sm mt-1.5 leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
                  <div className="flex items-center gap-1.5 bg-[#eff4ff] px-3 py-1.5 rounded text-[#43474e]">
                    <span className="material-symbols-outlined text-sm text-[#002045]">location_on</span>
                    <span>{item.locationName}</span>
                  </div>
                  <a
                    href={item.externalLink?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-[#e5eeff] text-[#002045] font-medium hover:bg-[#dce9ff] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">public</span>
                    <span>{item.externalLink?.label}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* 10.23 Morning: Harukado */}
        {filteredItems.filter(i => i.id === 'day-6-morning').map((item) => (
          <div
            key={item.id}
            onClick={() => onOpenDetail(item)}
            className="bg-white rounded-xl border border-[#c4c6cf]/40 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e5eeff] pb-4">
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded ${item.categoryBg} font-bold text-xs uppercase tracking-wider`}>
                    <span className="material-symbols-outlined text-[16px] mr-1">{item.categoryIcon}</span>
                    {item.categoryLabel}
                  </span>
                  <span className="text-[#43474e] text-sm font-medium">10.23 (Пүрэв) | 09:30 - 12:30</span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Батлагдсан
                </span>
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-[#0b1c30]">Harukado Co ltd (晴香堂 株式会社)</h3>
                  <span className="text-xs bg-[#e5eeff] px-2 py-0.5 rounded text-[#43474e]">Автомашины & өрөөний үнэртүүлэгч</span>
                </div>
                <h4 className="text-[#002045] font-semibold text-base mt-2">
                  {item.title}
                </h4>
                <p className="text-[#43474e] text-sm mt-1.5 leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[#43474e]">
                  <div className="flex items-center gap-1.5 bg-[#eff4ff] px-3 py-1.5 rounded">
                    <span className="material-symbols-outlined text-sm text-[#002045]">location_on</span>
                    <span>{item.locationName}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* 10.23 Afternoon: Tanaka Tec */}
        {filteredItems.filter(i => i.id === 'day-6-afternoon').map((item) => (
          <div
            key={item.id}
            onClick={() => onOpenDetail(item)}
            className="bg-white rounded-xl border border-[#c4c6cf]/40 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e5eeff] pb-4">
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded ${item.categoryBg} font-bold text-xs uppercase tracking-wider`}>
                    <span className="material-symbols-outlined text-[16px] mr-1">{item.categoryIcon}</span>
                    {item.categoryLabel}
                  </span>
                  <span className="text-[#43474e] text-sm font-medium">10.23 (Пүрэв) | 14:00 - 17:30</span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Батлагдсан
                </span>
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-[#0b1c30]">Tanaka Tec Co ltd (株式会社タナカテック)</h3>
                  <span className="text-xs bg-[#e5eeff] px-2 py-0.5 rounded text-[#43474e]">Металл & нимгэн төмөр боловсруулалт</span>
                </div>
                <h4 className="text-[#002045] font-semibold text-base mt-2">
                  {item.title}
                </h4>
                <p className="text-[#43474e] text-sm mt-1.5 leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[#43474e]">
                  <div className="flex items-center gap-1.5 bg-[#eff4ff] px-3 py-1.5 rounded">
                    <span className="material-symbols-outlined text-sm text-[#002045]">location_on</span>
                    <span>{item.locationName}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* 10.24 & 10.25 Grid Pair */}
        {filteredItems.some(i => i.id === 'day-7' || i.id === 'day-8') && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.filter(i => i.id === 'day-7').map(item => (
              <div
                key={item.id}
                onClick={() => onOpenDetail(item)}
                className="bg-white rounded-xl border border-[#c4c6cf]/40 p-5 shadow-sm hover:shadow transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between border-b border-[#e5eeff] pb-3">
                  <span className="text-xs font-bold uppercase text-[#43474e] tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">explore</span> 10.24 (Баасан)
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">Чөлөөт өдөр</span>
                </div>
                <h4 className="text-base font-bold text-[#0b1c30] mt-3">{item.title}</h4>
                <p className="text-xs text-[#43474e] mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
            {filteredItems.filter(i => i.id === 'day-8').map(item => (
              <div
                key={item.id}
                onClick={() => onOpenDetail(item)}
                className="bg-white rounded-xl border border-[#c4c6cf]/40 p-5 shadow-sm hover:shadow transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between border-b border-[#e5eeff] pb-3">
                  <span className="text-xs font-bold uppercase text-[#43474e] tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">train</span> 10.25 (Бямба)
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold">Шинкансэн аялал</span>
                </div>
                <h4 className="text-base font-bold text-[#0b1c30] mt-3">Токио хот руу шилжих аялал</h4>
                <p className="text-xs text-[#43474e] mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Section 3: Tokyo Days */}
        {filteredItems.some(i => i.dayNumber >= 9) && (
          <div className="pt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[#002045] text-xl font-bold tracking-tight">
                10.26 - 10.30: Токио хөтөлбөр & Буцах нислэг
              </h2>
              <span className="text-xs text-[#43474e] font-medium bg-[#e5eeff] px-3 py-1 rounded">
                Токио бүс
              </span>
            </div>
          </div>
        )}

        {/* 10.26 Ribbon Foods */}
        {filteredItems.filter(i => i.id === 'day-9').map((item) => (
          <div
            key={item.id}
            onClick={() => onOpenDetail(item)}
            className="bg-white rounded-xl border border-[#c4c6cf]/40 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e5eeff] pb-4">
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded ${item.categoryBg} font-bold text-xs uppercase tracking-wider`}>
                    <span className="material-symbols-outlined text-[16px] mr-1">{item.categoryIcon}</span>
                    {item.categoryLabel}
                  </span>
                  <span className="text-[#43474e] text-sm font-medium">10.26 (Ням) | 10:00 - 16:00</span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Батлагдсан
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-bold text-[#0b1c30]">Ribbon Foods Co ltd (RIBBON FOODS＜リボン食品株式会社＞)</h3>
                <h4 className="text-[#002045] font-semibold text-base mt-2">
                  {item.title}
                </h4>
                <p className="text-[#43474e] text-sm mt-1.5 leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[#43474e]">
                  <div className="flex items-center gap-1.5 bg-[#eff4ff] px-3 py-1.5 rounded">
                    <span className="material-symbols-outlined text-sm text-[#002045]">location_on</span>
                    <span>{item.locationName}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* 10.27 Morning: Miwa Yamada */}
        {filteredItems.filter(i => i.id === 'day-10-morning').map((item) => (
          <div
            key={item.id}
            onClick={() => onOpenDetail(item)}
            className="bg-white rounded-xl border border-[#c4c6cf]/40 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e5eeff] pb-4">
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded ${item.categoryBg} font-bold text-xs uppercase tracking-wider`}>
                    <span className="material-symbols-outlined text-[16px] mr-1">{item.categoryIcon}</span>
                    {item.categoryLabel}
                  </span>
                  <span className="text-[#43474e] text-sm font-medium">10.27 (Даваа) | 10:00 - 12:30</span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Батлагдсан
                </span>
              </div>
              <div className="mt-4 flex flex-col md:flex-row gap-5 items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-11 h-11 rounded-full overflow-hidden bg-[#dce9ff] border border-[#c4c6cf]/50 shrink-0">
                      <img
                        className="w-full h-full object-cover"
                        src={item.speaker?.avatar}
                        alt="Miwa Yamada"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-[#0b1c30] leading-tight">{item.speaker?.name}</h4>
                      <span className="text-xs text-[#43474e] font-medium">{item.speaker?.title}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[#002045] mt-3">
                    {item.title}
                  </h3>
                  <p className="text-[#43474e] text-sm mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[#43474e]">
                    <div className="flex items-center gap-1.5 bg-[#eff4ff] px-3 py-1.5 rounded">
                      <span className="material-symbols-outlined text-sm text-[#002045]">location_on</span>
                      <span>{item.locationName}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* 10.27 Afternoon: Oi Ocha */}
        {filteredItems.filter(i => i.id === 'day-10-afternoon').map((item) => (
          <div
            key={item.id}
            onClick={() => onOpenDetail(item)}
            className="bg-white rounded-xl border border-[#c4c6cf]/40 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e5eeff] pb-4">
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded ${item.categoryBg} font-bold text-xs uppercase tracking-wider`}>
                    <span className="material-symbols-outlined text-[16px] mr-1">{item.categoryIcon}</span>
                    {item.categoryLabel}
                  </span>
                  <span className="text-[#43474e] text-sm font-medium">10.27 (Даваа) | 14:00 - 17:00</span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Батлагдсан
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-bold text-[#0b1c30]">Oi Ocha Museum Ocha Culture Creation Museum (Ито эн цайны музей)</h3>
                <h4 className="text-[#002045] font-semibold text-base mt-2">
                  {item.title}
                </h4>
                <p className="text-[#43474e] text-sm mt-1.5 leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[#43474e]">
                  <div className="flex items-center gap-1.5 bg-[#eff4ff] px-3 py-1.5 rounded">
                    <span className="material-symbols-outlined text-sm text-[#002045]">location_on</span>
                    <span>{item.locationName}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* 10.28 ThreeHigh */}
        {filteredItems.filter(i => i.id === 'day-11').map((item) => (
          <div
            key={item.id}
            onClick={() => onOpenDetail(item)}
            className="bg-white rounded-xl border border-[#c4c6cf]/40 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e5eeff] pb-4">
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded ${item.categoryBg} font-bold text-xs uppercase tracking-wider`}>
                    <span className="material-symbols-outlined text-[16px] mr-1">{item.categoryIcon}</span>
                    {item.categoryLabel}
                  </span>
                  <span className="text-[#43474e] text-sm font-medium">10.28 (Мягмар) | 10:00 - 15:30</span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Батлагдсан
                </span>
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-[#0b1c30]">ThreeHigh Co., Ltd. (株式会社スリーハイ)</h3>
                  <span className="text-xs bg-[#e5eeff] px-2 py-0.5 rounded text-[#43474e]">Аж үйлдвэрийн тусгай халаагуур</span>
                </div>
                <h4 className="text-[#002045] font-semibold text-base mt-2">
                  {item.title}
                </h4>
                <p className="text-[#43474e] text-sm mt-1.5 leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[#43474e]">
                  <div className="flex items-center gap-1.5 bg-[#eff4ff] px-3 py-1.5 rounded">
                    <span className="material-symbols-outlined text-sm text-[#002045]">location_on</span>
                    <span>{item.locationName}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* 10.29 Fueki Syoyu */}
        {filteredItems.filter(i => i.id === 'day-12').map((item) => (
          <div
            key={item.id}
            onClick={() => onOpenDetail(item)}
            className="bg-white rounded-xl border border-[#c4c6cf]/40 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e5eeff] pb-4">
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded ${item.categoryBg} font-bold text-xs uppercase tracking-wider`}>
                    <span className="material-symbols-outlined text-[16px] mr-1">{item.categoryIcon}</span>
                    {item.categoryLabel}
                  </span>
                  <span className="text-[#43474e] text-sm font-medium">10.29 (Лхагва) | 10:00 - 15:00</span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Батлагдсан
                </span>
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-[#0b1c30]">Fueki Syoyu Brewing Co. Ltd (笛木醤油「金笛」- KINBUE)</h3>
                  <span className="text-xs bg-[#e5eeff] px-2 py-0.5 rounded text-[#43474e]">230 жилийн түүхтэй цуу исгэх үйлдвэр</span>
                </div>
                <h4 className="text-[#002045] font-semibold text-base mt-2">
                  {item.title}
                </h4>
                <p className="text-[#43474e] text-sm mt-1.5 leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[#43474e]">
                  <div className="flex items-center gap-1.5 bg-[#eff4ff] px-3 py-1.5 rounded">
                    <span className="material-symbols-outlined text-sm text-[#002045]">location_on</span>
                    <span>{item.locationName}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* 10.30 Return Flight */}
        {filteredItems.filter(i => i.id === 'day-13').map((item) => (
          <div
            key={item.id}
            onClick={() => onOpenDetail(item)}
            className="bg-white rounded-xl border border-[#c4c6cf]/40 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e5eeff] pb-4">
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded ${item.categoryBg} font-bold text-xs uppercase tracking-wider`}>
                    <span className="material-symbols-outlined text-[16px] mr-1">{item.categoryIcon}</span>
                    {item.categoryLabel}
                  </span>
                  <span className="text-[#43474e] text-sm font-medium">10.30 (Пүрэв) | 10:00 - 19:30</span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Батлагдсан
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-bold text-[#0b1c30]">
                  Токио (Нарита/Ханеда) <span className="text-[#b52426]">✈</span> Улаанбаатар (Чингис Хаан ОУНБ)
                </h3>
                <p className="text-[#43474e] text-sm mt-2 leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[#43474e]">
                  <div className="flex items-center gap-1.5 bg-[#eff4ff] px-3 py-1.5 rounded">
                    <span className="material-symbols-outlined text-sm text-[#002045]">location_on</span>
                    <span>{item.locationName}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
            <span className="material-symbols-outlined text-slate-300 text-[48px] mb-2">search_off</span>
            <h4 className="font-bold text-[#002045] text-base">Илэрц олдсонгүй</h4>
            <p className="text-xs text-slate-500 mt-1">Хайлтын утга эсвэл шүүлтүүрээ өөрчилж үзнэ үү.</p>
            <button
              onClick={() => {
                setActiveCityTab('all');
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-[#002045] text-white text-xs font-bold"
            >
              Бүх шүүлтүүрийг арилгах
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
