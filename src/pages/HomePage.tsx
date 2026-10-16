import React, { useState, useEffect } from 'react';
import { PageTab } from '../components/Header';
import { getBannersData, BannerSlide } from '../data/dataStore';

interface HomePageProps {
  onNavigate: (tab: PageTab) => void;
  onOpenHandout?: (title: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenHandout }) => {
  // Hero Banners from dataStore (Dynamic & Editable in Admin)
  const [banners, setBanners] = useState<BannerSlide[]>(() => {
    const list = getBannersData().filter((b) => b.enabled);
    return list.length > 0 ? list : getBannersData();
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Reload banners when admin makes updates
  useEffect(() => {
    const handleDataUpdate = () => {
      const list = getBannersData().filter((b) => b.enabled);
      setBanners(list.length > 0 ? list : getBannersData());
    };
    window.addEventListener('study_tour_data_updated', handleDataUpdate);
    return () => window.removeEventListener('study_tour_data_updated', handleDataUpdate);
  }, []);

  // Auto-play carousel every 5.5 seconds unless user hovers
  useEffect(() => {
    if (isPaused || banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, banners.length]);

  // Active slide safe reference
  const activeSlide: BannerSlide = banners[currentSlide] || banners[0];

  // Shopping widget city tab
  const [shoppingCityTab, setShoppingCityTab] = useState<'tokyo' | 'osaka'>('tokyo');

  // Audio speech status
  const [playingPhraseId, setPlayingPhraseId] = useState<string | null>(null);

  // Quick Action Modal state
  const [quickModal, setQuickModal] = useState<{
    isOpen: boolean;
    title: string;
    content: React.ReactNode;
  }>({
    isOpen: false,
    title: '',
    content: null
  });

  const playSpeech = (phraseText: string, id: string) => {
    setPlayingPhraseId(id);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phraseText);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.85;
      utterance.onend = () => setPlayingPhraseId(null);
      utterance.onerror = () => setPlayingPhraseId(null);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setPlayingPhraseId(null), 1000);
    }
  };

  const handleOpenQuickModal = (type: 'passport' | 'luggage' | 'esim' | 'weather') => {
    if (type === 'passport') {
      setQuickModal({
        isOpen: true,
        title: 'Паспорт, виз, баримт бичгийн шалгалт',
        content: (
          <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
              <span className="font-bold text-amber-900 block mb-1">
                ⚠️ Паспортын хүчинтэй хугацааг заавал шалгана уу:
              </span>
              <span>Япон улс руу зорчиход паспортын хүчинтэй хугацаа дор хаяж 6 сарын хүчинтэй байх шаардлагатай.</span>
            </div>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Гадаад паспорт:</strong> Эх хувь (гэмтэлгүй, сул хуудастай байх).</li>
              <li><strong>Японы богино хугацааны виз:</strong> Хүчинтэй хугацаа болон олон удаагийн/нэг удаагийн төрлийг шалгах.</li>
              <li><strong>Цээж зураг:</strong> 4.5 × 3.5 см хэмжээтэй 2 хувь цагаан фонтой зураг авч явах.</li>
              <li><strong>Visit Japan Web:</strong> QR кодоо утас дээрээ Screenshot хийж хадгалах.</li>
            </ul>
          </div>
        )
      });
    } else if (type === 'luggage') {
      setQuickModal({
        isOpen: true,
        title: 'Зөөврийн болон бүртгэгдсэн ачааны жин, стандарт',
        content: (
          <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                <span className="font-bold text-blue-900 block mb-1">Гар тээш (Cabin Bag):</span>
                <span>Дээд хязгаар: <strong>10 кг</strong> хүртэл (55 × 40 × 20 см). Нөүтбүүк, цэнэглэгч, эм бэлдмэл гар тээшиндээ авна.</span>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <span className="font-bold text-emerald-900 block mb-1">Энгийн ачаа (Checked):</span>
                <span>МИАТ нислэгт: <strong>23 кг × 2 ширхэг</strong> үнэ төлбөргүй зөвшөөрөгдөнө. Powerbank гар тээшинд байх ёстой!</span>
              </div>
            </div>
            <p className="text-slate-500 text-[11px]">
              * Шингэн зүйлс 100 мл-ээс их бол онгоцны гар тээшинд авч орохыг хатуу хориглоно.
            </p>
          </div>
        )
      });
    } else if (type === 'esim') {
      setQuickModal({
        isOpen: true,
        title: 'Travel eSIM урьдчилан бэлдэх заавар',
        content: (
          <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
            <p>
              Япон улсад буугаад шууд сүлжээнд холбогдохын тулд Улаанбаатараас хөөрөхөөс өмнө <strong>Travel eSIM</strong>-ээ утсандаа суулгаж бэлдэнэ үү.
            </p>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <div><strong>1. Санал болгох үйлчилгээ:</strong> Airalo (Moshi Moshi), Ubigi, эсвэл Sakura Mobile.</div>
              <div><strong>2. Суулгах:</strong> QR кодыг уншуулан &quot;Secondary eSIM&quot; нэрээр суулгана.</div>
              <div><strong>3. Идэвхжүүлэх:</strong> Японы нисэх онгоцны буудалд газардах үед Data Roaming-ийг асаана.</div>
            </div>
          </div>
        )
      });
    } else if (type === 'weather') {
      setQuickModal({
        isOpen: true,
        title: 'Япон дахь цаг агаар ба хувцаслалт (10-р сар)',
        content: (
          <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                <span className="font-bold text-[#002045] block">Кансай / Осака:</span>
                <span className="text-lg font-bold text-amber-900 block my-1">+16°C ... +22°C</span>
                <span>Налгар нартай, дулаахан өдрүүд. Оройдоо сэрүүснэ.</span>
              </div>
              <div className="p-3 bg-sky-50 rounded-xl border border-sky-200">
                <span className="font-bold text-[#002045] block">Токио:</span>
                <span className="text-lg font-bold text-sky-900 block my-1">+14°C ... +20°C</span>
                <span>Бага зэрэг сэрүүн, үүлтэй. Хөнгөн куртка тохиромжтой.</span>
              </div>
            </div>
            <div className="p-2.5 bg-slate-100 rounded-lg text-slate-600">
              👔 <strong>Хувцаслалтын дүрэм:</strong> Бизнес уулзалт, үйлдвэрийн танилцуулгад Smart Casual / Business Suit, чөлөөт өдрүүдэд алхахад эвтэйхэн пүүз, хөнгөн хүрэм сонгоно.
            </div>
          </div>
        )
      });
    }
  };

  // Phrases list
  const commonPhrases = [
    {
      id: 'p1',
      kanji: 'こんにちは',
      romaji: 'Konnichiwa',
      mn: 'Сайн байна уу?'
    },
    {
      id: 'p2',
      kanji: 'ありがとうございます',
      romaji: 'Arigatō gozaimasu',
      mn: 'Баярлалаа.'
    },
    {
      id: 'p3',
      kanji: 'すみません',
      romaji: 'Sumimasen',
      mn: 'Уучлаарай / Өршөөгөөрэй.'
    },
    {
      id: 'p4',
      kanji: 'お願いします',
      romaji: 'Onegaishimasu',
      mn: 'Гуйя / Тусална уу.'
    },
    {
      id: 'p5',
      kanji: '英語を話せますか?',
      romaji: 'Eigo o hanasemasu ka?',
      mn: 'Та англиар ярьдаг уу?'
    },
    {
      id: 'p6',
      kanji: 'これをください',
      romaji: 'Kore o kudasai',
      mn: 'Үүнийг авья.'
    }
  ];

  return (
    <div className="w-full max-w-[1520px] mx-auto p-3 sm:p-5">
      {/* 2-Column Responsive Layout: Left Main Column & Right Panel Column */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* ========================================================= */}
        {/* CENTER MAIN COLUMN (xl:col-span-8 or 9) */}
        {/* ========================================================= */}
        <div className="xl:col-span-8 flex flex-col gap-5">
          {/* 1. HIGH-QUALITY HERO CAROUSEL BANNER (Dynamic from dataStore & Admin) */}
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="relative rounded-2xl overflow-hidden shadow-md bg-slate-950 min-h-[320px] sm:min-h-[380px] lg:min-h-[420px] flex items-center group transition-all"
          >
            {/* Background Image: Dynamic Ultra HD Quality Image */}
            <img
              src={activeSlide.imageUrl}
              alt={activeSlide.title}
              className="absolute inset-0 w-full h-full object-cover opacity-90 transition-all duration-700 group-hover:scale-[1.02]"
            />

            {/* Premium Multi-layer Vignette & Dark Contrast Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#00122e]/95 via-[#001738]/75 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000d20]/80 via-transparent to-[#00122e]/40" />

            {/* Left Info Overlay Content */}
            <div className="relative z-10 p-5 sm:p-8 lg:p-10 max-w-2xl text-white flex flex-col justify-between h-full">
              <div>
                {/* Top Tag & Flight / Topic Pill */}
                <div className="flex items-center gap-2.5 mb-3 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#b52426] text-white text-[11px] font-black uppercase tracking-wider shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                    {activeSlide.tag || 'ОНЦЛОХ'}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-lg bg-white/20 backdrop-blur-md text-[11px] font-bold text-slate-200 border border-white/20">
                    Слайд {currentSlide + 1} / {banners.length}
                  </span>
                  {activeSlide.dateText && (
                    <span className="text-xs text-amber-300 font-bold hidden sm:inline flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">event</span>
                      {activeSlide.dateText}
                    </span>
                  )}
                </div>

                {/* Main Headline */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-[1.15] drop-shadow-md">
                  {activeSlide.title}
                </h1>

                {/* Subtitle */}
                <p className="mt-2 text-xs sm:text-sm text-slate-200 font-medium leading-relaxed max-w-xl line-clamp-2">
                  {activeSlide.subtitle}
                </p>

                {/* Warning / Alert Badge */}
                {activeSlide.alertBadge && (
                  <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#ffdad6] text-[#410003] border border-[#ffb4ab] text-xs sm:text-sm font-bold shadow-sm">
                    <span className="material-symbols-outlined text-[18px] text-[#b52426] shrink-0">warning</span>
                    <span>{activeSlide.alertBadge}</span>
                  </div>
                )}

                {/* Location text */}
                {activeSlide.locationText && (
                  <div className="mt-3.5 flex items-center gap-2 text-xs sm:text-sm text-slate-300 font-semibold">
                    <span className="material-symbols-outlined text-[18px] text-amber-300 shrink-0">location_on</span>
                    <span>{activeSlide.locationText}</span>
                  </div>
                )}
              </div>

              {/* Action Button CTA */}
              {activeSlide.actionTab && (
                <div className="mt-6 flex items-center gap-3">
                  <button
                    onClick={() => onNavigate(activeSlide.actionTab!)}
                    className="px-5 py-2.5 rounded-xl bg-[#1967d2] hover:bg-[#1557b0] text-white text-xs sm:text-sm font-extrabold shadow-md flex items-center gap-2 transition-all active:scale-95 cursor-pointer ring-2 ring-white/20"
                  >
                    <span>{activeSlide.actionText || 'Дэлгэрэнгүй үзэх'}</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                  <button
                    onClick={() => onNavigate('admin')}
                    className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white backdrop-blur-md text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                    title="Баннер өөрчлөх (Админ)"
                  >
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                    <span className="hidden sm:inline">Баннер засах</span>
                  </button>
                </div>
              )}
            </div>

            {/* Carousel Navigation Arrows */}
            {banners.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1))
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md flex items-center justify-center transition-all z-20 cursor-pointer shadow-md hover:scale-105 active:scale-95"
                  aria-label="Өмнөх баннер"
                >
                  <span className="material-symbols-outlined text-[22px]">chevron_left</span>
                </button>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % banners.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md flex items-center justify-center transition-all z-20 cursor-pointer shadow-md hover:scale-105 active:scale-95"
                  aria-label="Дараах баннер"
                >
                  <span className="material-symbols-outlined text-[22px]">chevron_right</span>
                </button>
              </>
            )}

            {/* Pagination Navigation Dots */}
            {banners.length > 1 && (
              <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full">
                {banners.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setCurrentSlide(dotIdx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentSlide === dotIdx
                        ? 'w-7 bg-white shadow-sm'
                        : 'w-2 bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={`Slide ${dotIdx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* 2. FOUR QUICK ACTION CARDS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Card 1: Passports */}
            <div
              onClick={() => handleOpenQuickModal('passport')}
              className="group relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-900 cursor-pointer shadow-sm hover:shadow-md transition-all border border-[#e5eeff]"
            >
              <img
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=500&auto=format&fit=crop"
                alt="Passport & Visa"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end p-3">
                <span className="text-white text-[11px] sm:text-xs font-bold leading-snug flex items-center gap-1">
                  <span>Паспорт, виз, баримт бичгээ шалгаарай</span>
                  <span className="text-slate-300 text-[10px]">&gt;</span>
                </span>
              </div>
            </div>

            {/* Card 2: Luggage Weight */}
            <div
              onClick={() => handleOpenQuickModal('luggage')}
              className="group relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-900 cursor-pointer shadow-sm hover:shadow-md transition-all border border-[#e5eeff]"
            >
              <img
                src="https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=500&auto=format&fit=crop"
                alt="Suitcase Luggage"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end p-3">
                <span className="text-white text-[11px] sm:text-xs font-bold leading-snug flex items-center gap-1">
                  <span>Зөөврийн цүнхний жинг шалгаарай</span>
                  <span className="text-slate-300 text-[10px]">&gt;</span>
                </span>
              </div>
            </div>

            {/* Card 3: Travel eSIM */}
            <div
              onClick={() => handleOpenQuickModal('esim')}
              className="group relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-900 cursor-pointer shadow-sm hover:shadow-md transition-all border border-[#e5eeff]"
            >
              <img
                src="https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?q=80&w=500&auto=format&fit=crop"
                alt="Travel eSIM"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end p-3">
                <span className="text-white text-[11px] sm:text-xs font-bold leading-snug flex items-center gap-1">
                  <span>Travel eSIM-aa урьдчилан бэлдээрэй</span>
                  <span className="text-slate-300 text-[10px]">&gt;</span>
                </span>
              </div>
            </div>

            {/* Card 4: Weather & Clothing */}
            <div
              onClick={() => handleOpenQuickModal('weather')}
              className="group relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-900 cursor-pointer shadow-sm hover:shadow-md transition-all border border-[#e5eeff]"
            >
              <img
                src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=500&auto=format&fit=crop"
                alt="Tokyo Tower Weather"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end p-3">
                <span className="text-white text-[11px] sm:text-xs font-bold leading-snug flex items-center gap-1">
                  <span>Япон дахь цаг агаар, хувцаслалт</span>
                  <span className="text-slate-300 text-[10px]">&gt;</span>
                </span>
              </div>
            </div>
          </div>

          {/* 3. ROW: Авч явах зүйлс (Left) & Хориглох зүйлс (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Авч явах зүйлс */}
            <div className="bg-white rounded-2xl border border-[#e5eeff] p-4 sm:p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-red-50 text-[#b52426] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">backpack</span>
                    </span>
                    <h2 className="text-sm sm:text-base font-extrabold text-[#002045]">
                      Авч явах зүйлс
                    </h2>
                  </div>
                  <button
                    onClick={() => handleOpenQuickModal('passport')}
                    className="text-xs text-[#1967d2] font-bold hover:underline flex items-center gap-0.5"
                  >
                    <span>Дэлгэрэнгүй</span>
                    <span className="text-[10px]">&gt;</span>
                  </button>
                </div>

                {/* Grid of 6 packing items */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 text-center">
                  {/* Item 1: Photos */}
                  <div className="flex flex-col items-center p-2 rounded-xl bg-[#f8faff] border border-[#e9ecf4] hover:bg-[#eff4ff] transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-white shadow-xs p-1 flex items-center justify-center mb-1.5 overflow-hidden">
                      <div className="grid grid-cols-2 gap-0.5 w-full h-full">
                        <div className="bg-slate-200 rounded-xs"></div>
                        <div className="bg-slate-300 rounded-xs"></div>
                        <div className="bg-slate-300 rounded-xs"></div>
                        <div className="bg-slate-200 rounded-xs"></div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-800 leading-tight">
                      Цээж зураг<br />4.5 × 3.5 см 2%
                    </span>
                  </div>

                  {/* Item 2: Laptop */}
                  <div className="flex flex-col items-center p-2 rounded-xl bg-[#f8faff] border border-[#e9ecf4] hover:bg-[#eff4ff] transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-white shadow-xs p-1 flex items-center justify-center mb-1.5">
                      <span className="material-symbols-outlined text-[26px] text-slate-700">laptop_mac</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-800 leading-tight">
                      Нэг даг нэг зөөврийн компьютер
                    </span>
                  </div>

                  {/* Item 3: Suitcase */}
                  <div className="flex flex-col items-center p-2 rounded-xl bg-[#f8faff] border border-[#e9ecf4] hover:bg-[#eff4ff] transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-white shadow-xs p-1 flex items-center justify-center mb-1.5">
                      <span className="material-symbols-outlined text-[26px] text-slate-700">luggage</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-800 leading-tight">
                      Жижиг<br />гар чимодан
                    </span>
                  </div>

                  {/* Item 4: Travel eSIM */}
                  <div className="flex flex-col items-center p-2 rounded-xl bg-[#f8faff] border border-[#e9ecf4] hover:bg-[#eff4ff] transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-[#002045] text-white shadow-xs p-1 flex flex-col items-center justify-center mb-1.5 font-black text-[10px]">
                      <span>SIM</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-800 leading-tight">
                      Travel e-sim
                    </span>
                  </div>

                  {/* Item 5: Cash */}
                  <div className="flex flex-col items-center p-2 rounded-xl bg-[#f8faff] border border-[#e9ecf4] hover:bg-[#eff4ff] transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-amber-100 text-amber-800 shadow-xs p-1 flex items-center justify-center mb-1.5">
                      <span className="material-symbols-outlined text-[24px]">payments</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-800 leading-tight">
                      Бэлэн мөнгө<br />10,000-20,000¥
                    </span>
                  </div>

                  {/* Item 6: Business Cards */}
                  <div className="flex flex-col items-center p-2 rounded-xl bg-[#f8faff] border border-[#e9ecf4] hover:bg-[#eff4ff] transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-white shadow-xs p-1 flex items-center justify-center mb-1.5">
                      <span className="material-symbols-outlined text-[24px] text-slate-700">badge</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-800 leading-tight">
                      Нэрийн хуудас
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Хориглох зүйлс */}
            <div className="bg-white rounded-2xl border border-[#e5eeff] p-4 sm:p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-red-50 text-[#b52426] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">block</span>
                    </span>
                    <h2 className="text-sm sm:text-base font-extrabold text-[#002045]">
                      Хориглох зүйлс
                    </h2>
                  </div>
                  <button
                    onClick={() => onNavigate('khotolbor')}
                    className="text-xs text-[#1967d2] font-bold hover:underline flex items-center gap-0.5"
                  >
                    <span>Дэлгэрэнгүй</span>
                    <span className="text-[10px]">&gt;</span>
                  </button>
                </div>

                {/* 5 Prohibited Items with red circular badges */}
                <div className="grid grid-cols-5 gap-1 sm:gap-2 text-center">
                  {/* Prohibit 1: Meat */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#e52b2b] p-0.5 flex items-center justify-center relative mb-1.5 bg-red-50/50">
                      <span className="material-symbols-outlined text-[19px] sm:text-[22px] text-[#e52b2b]">set_meal</span>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-0.5 bg-[#e52b2b] rotate-45"></div>
                      </div>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-bold text-slate-800 leading-tight">
                      Мах махан бүтээгдэхүүн
                    </span>
                  </div>

                  {/* Prohibit 2: Animal Leather / fur */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#e52b2b] p-0.5 flex items-center justify-center relative mb-1.5 bg-red-50/50">
                      <span className="material-symbols-outlined text-[19px] sm:text-[22px] text-[#e52b2b]">pets</span>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-0.5 bg-[#e52b2b] rotate-45"></div>
                      </div>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-bold text-slate-800 leading-tight">
                      Арьсан эдлэл
                    </span>
                  </div>

                  {/* Prohibit 3: Excessive Alcohol */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#e52b2b] p-0.5 flex items-center justify-center relative mb-1.5 bg-red-50/50">
                      <span className="material-symbols-outlined text-[19px] sm:text-[22px] text-[#e52b2b]">liquor</span>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-0.5 bg-[#e52b2b] rotate-45"></div>
                      </div>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-bold text-slate-800 leading-tight">
                      Алкогол хэтрүүлэх
                    </span>
                  </div>

                  {/* Prohibit 4: Hotel Misconduct */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#e52b2b] p-0.5 flex items-center justify-center relative mb-1.5 bg-red-50/50">
                      <span className="material-symbols-outlined text-[19px] sm:text-[22px] text-[#e52b2b]">bed</span>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-0.5 bg-[#e52b2b] rotate-45"></div>
                      </div>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-bold text-slate-800 leading-tight">
                      Зүй бус үйлдэл
                    </span>
                  </div>

                  {/* Prohibit 5: Lateness */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#e52b2b] p-0.5 flex items-center justify-center relative mb-1.5 bg-red-50/50">
                      <span className="material-symbols-outlined text-[19px] sm:text-[22px] text-[#e52b2b]">schedule</span>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-0.5 bg-[#e52b2b] rotate-45"></div>
                      </div>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-bold text-slate-800 leading-tight">
                      Хичээлээс хоцрох
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. ROW: Маргаашийн хөтөлбөр (Left) & Японы соёлын онцлог (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Маргаашийн хөтөлбөр */}
            <div className="bg-white rounded-2xl border border-[#e5eeff] p-4 sm:p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-blue-50 text-[#1967d2] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                    </span>
                    <div>
                      <h2 className="text-sm sm:text-base font-extrabold text-[#002045]">
                        Маргаашийн хөтөлбөр
                      </h2>
                      <span className="text-[11px] text-slate-500 font-semibold">2026.10.19 (Даваа)</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('khotolbor')}
                    className="text-xs text-[#1967d2] font-bold hover:underline flex items-center gap-0.5"
                  >
                    <span>Дэлгэрэнгүй</span>
                    <span className="text-[10px]">&gt;</span>
                  </button>
                </div>

                {/* Timeline Items */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#f8faff] border border-[#e9ecf4]">
                    <span className="text-xs font-black text-[#002045] w-24 shrink-0 pt-0.5">
                      09:00 - 12:00
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#1967d2]"></span>
                        <span className="text-xs font-bold text-slate-900">Orientation</span>
                      </div>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-[13px]">location_on</span>
                        Osaka, сургалтын танхим
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#f8faff] border border-[#e9ecf4]">
                    <span className="text-xs font-black text-[#002045] w-24 shrink-0 pt-0.5">
                      13:30 - 16:30
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#1967d2]"></span>
                        <span className="text-xs font-bold text-slate-900">Хоттой танилцах хөтөлбөр</span>
                      </div>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-[13px]">location_on</span>
                        Osaka хот
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mini Map Graphic */}
                <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#d3e4fe] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#002045] text-white flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px]">pin_drop</span>
                    </div>
                    <div>
                      <span className="font-extrabold text-[#002045] text-xs block">Osaka</span>
                      <span className="text-[11px] text-slate-600">Osaka, Japan</span>
                    </div>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Osaka+Station,+Japan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-[#d3e4fe] text-[#002045] hover:bg-[#e5eeff] text-xs font-bold transition-all shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[15px] text-[#b52426]">map</span>
                    <span>Google Maps дээр харах</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Японы соёлын онцлог */}
            <div className="bg-white rounded-2xl border border-[#e5eeff] p-4 sm:p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-red-50 text-[#b52426] flex items-center justify-center font-serif font-black text-sm">
                      ⛩
                    </span>
                    <h2 className="text-sm sm:text-base font-extrabold text-[#002045]">
                      Японы соёлын онцлог
                    </h2>
                  </div>
                  <button
                    onClick={() => onNavigate('khel')}
                    className="text-xs text-[#1967d2] font-bold hover:underline flex items-center gap-0.5"
                  >
                    <span>Дэлгэрэнгүй</span>
                    <span className="text-[10px]">&gt;</span>
                  </button>
                </div>

                {/* Cultural Photo Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-semibold text-slate-700 mb-3">
                  {/* Card 1 */}
                  <div className="flex flex-col rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=240&auto=format&fit=crop"
                      alt="Walking side"
                      className="h-16 w-full object-cover"
                    />
                    <span className="p-1.5 leading-snug">
                      Осака-д баруун, Токио-д зүүн талаа барина.
                    </span>
                  </div>

                  {/* Card 2 */}
                  <div className="flex flex-col rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=240&auto=format&fit=crop"
                      alt="Trash bin"
                      className="h-16 w-full object-cover"
                    />
                    <span className="p-1.5 leading-snug">
                      Хогийн сав гудамжинд ховор байдаг.
                    </span>
                  </div>

                  {/* Card 3 */}
                  <div className="flex flex-col rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=240&auto=format&fit=crop"
                      alt="Shoes off"
                      className="h-16 w-full object-cover"
                    />
                    <span className="p-1.5 leading-snug">
                      Зарим газарт гутлаа тайлна.
                    </span>
                  </div>

                  {/* Card 4 */}
                  <div className="flex flex-col rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1554672408-730436b60ede?q=80&w=240&auto=format&fit=crop"
                      alt="No tip"
                      className="h-16 w-full object-cover"
                    />
                    <span className="p-1.5 leading-snug">
                      Цайны мөнгө (tip) үлдээдэггүй.
                    </span>
                  </div>

                  {/* Card 5 */}
                  <div className="flex flex-col rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=240&auto=format&fit=crop"
                      alt="Business card"
                      className="h-16 w-full object-cover"
                    />
                    <span className="p-1.5 leading-snug">
                      Нэрийн хуудсыг 2 гараар өгч, авна.
                    </span>
                  </div>

                  {/* Card 6 */}
                  <div className="flex flex-col rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=240&auto=format&fit=crop"
                      alt="Chopsticks"
                      className="h-16 w-full object-cover"
                    />
                    <span className="p-1.5 leading-snug">
                      Савхыг будаанд босоогоор зоохгүй.
                    </span>
                  </div>

                  {/* Card 7 */}
                  <div className="flex flex-col rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=240&auto=format&fit=crop"
                      alt="Smoking ban"
                      className="h-16 w-full object-cover"
                    />
                    <span className="p-1.5 leading-snug">
                      Гудамжаар тамхи татахыг хориглодог.
                    </span>
                  </div>

                  {/* Card 8 */}
                  <div className="flex flex-col rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1556742049-0a67c5574f73?q=80&w=240&auto=format&fit=crop"
                      alt="Cash preferred"
                      className="h-16 w-full object-cover"
                    />
                    <span className="p-1.5 leading-snug">
                      Жижиг кафенд бэлэн мөнгө хэрэглэнэ.
                    </span>
                  </div>
                </div>

                {/* Additional 2 Etiquette Bullets */}
                <div className="space-y-1.5 text-[11px] text-slate-700">
                  <div className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1967d2] shrink-0"></span>
                    <span>Галт тэрэг, автобус, дэлгүүрт тэмдэглэсэн дараалалд зогсоно.</span>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1967d2] shrink-0"></span>
                    <span>Гудамж, дэлгүүрийн орц, явган хүний замыг бүлгээрээ хааж зогсохгүй.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5. ROW: Нийтлэг үгсийн хэрэглээ (Phrases with Audio) */}
          <div className="bg-white rounded-2xl border border-[#e5eeff] p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-blue-50 text-[#1967d2] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">translate</span>
                </span>
                <h2 className="text-sm sm:text-base font-extrabold text-[#002045]">
                  Нийтлэг үгсийн хэрэглээ
                </h2>
              </div>
              <button
                onClick={() => onNavigate('khel')}
                className="text-xs text-[#1967d2] font-bold hover:underline flex items-center gap-0.5"
              >
                <span>Дэлгэрэнгүй</span>
                <span className="text-[10px]">&gt;</span>
              </button>
            </div>

            {/* 6 audio phrase cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {commonPhrases.map((phrase) => {
                const isPlaying = playingPhraseId === phrase.id;
                return (
                  <div
                    key={phrase.id}
                    className="p-3 rounded-xl bg-[#f8faff] border border-[#e2e8f0] flex flex-col justify-between hover:border-[#1967d2] transition-colors"
                  >
                    <div>
                      <span className="font-extrabold text-slate-900 text-xs block leading-tight">
                        {phrase.kanji}
                      </span>
                      <span className="text-[10px] font-bold text-[#b52426] block mt-0.5">
                        {phrase.romaji}
                      </span>
                      <span className="text-[11px] text-slate-600 block mt-1 leading-snug">
                        {phrase.mn}
                      </span>
                    </div>

                    <button
                      onClick={() => playSpeech(phrase.kanji, phrase.id)}
                      className={`mt-3 self-center p-1.5 rounded-full transition-all flex items-center justify-center ${
                        isPlaying
                          ? 'bg-[#b52426] text-white scale-110 shadow-sm'
                          : 'bg-white text-slate-500 hover:text-[#002045] hover:bg-slate-100 shadow-xs'
                      }`}
                      title="Япон дуудлага сонсох"
                      aria-label="Сонсох"
                    >
                      <span className="material-symbols-outlined text-[16px]">volume_up</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT PANEL COLUMN (xl:col-span-4) */}
        {/* ========================================================= */}
        <div className="xl:col-span-4 flex flex-col gap-5">
          {/* 0. ТӨЛӨӨЛӨГЧИЙН ХУВИЙН КАРТ (Ц. Тогтохсүрэн) */}
          <div className="bg-gradient-to-br from-[#002045] to-[#001026] text-white rounded-2xl p-5 shadow-lg border border-blue-900/40 relative overflow-hidden">
            {/* Subtle background decoration */}
            <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/5 pointer-events-none"></div>

            <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-white/10 relative z-10">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-amber-400 text-[#002045] flex items-center justify-center font-extrabold text-sm shadow-xs">
                  <span className="material-symbols-outlined text-[20px]">badge</span>
                </span>
                <div>
                  <h2 className="text-sm font-black tracking-tight text-white leading-tight">
                    Төлөөлөгчийн Хувийн Карт
                  </h2>
                  <span className="text-[10px] text-amber-300 font-bold">Executive Study Tour 2026</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                Идэвхтэй
              </span>
            </div>

            {/* Delegate Info */}
            <div className="space-y-3 relative z-10 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#1967d2] text-white flex items-center justify-center font-black text-base shadow-inner border border-white/20 shrink-0">
                  ЦТ
                </div>
                <div className="flex-1">
                  <h3 className="font-extrabold text-base text-white leading-tight">
                    Ц. Тогтохсүрэн
                  </h3>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Executive Member • Төлөөлөгч
                  </p>
                </div>
              </div>

              {/* Detail Rows */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-slate-300 font-medium text-[11px] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-blue-300">groups</span>
                    Багийн бүртгэл:
                  </span>
                  <button
                    onClick={() => onNavigate('bagiin-burtgel')}
                    className="font-bold text-white hover:text-amber-300 transition-colors text-right underline decoration-dotted"
                  >
                    Group-1 (Ахлагч Гантигмаа)
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-slate-300 font-medium text-[11px] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-emerald-400">qr_code_2</span>
                    Декларац (VJW):
                  </span>
                  <button
                    onClick={() => onNavigate('deklarats')}
                    className="px-2 py-0.5 rounded-md font-black text-[10px] bg-emerald-500 text-white flex items-center gap-1 cursor-pointer hover:bg-emerald-600 shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[13px]">check_circle</span>
                    <span>QR бэлэн</span>
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-slate-300 font-medium text-[11px] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-amber-300">hotel</span>
                    Осака буудал:
                  </span>
                  <button
                    onClick={() => onNavigate('teever')}
                    className="font-bold text-white hover:text-amber-300 transition-colors text-right"
                  >
                    Hotel Granvia Osaka (#812)
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-slate-300 font-medium text-[11px] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-amber-300">hotel</span>
                    Токио буудал:
                  </span>
                  <button
                    onClick={() => onNavigate('teever')}
                    className="font-bold text-white hover:text-amber-300 transition-colors text-right"
                  >
                    Hotel Metropolitan Tokyo (#504)
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom shortcut buttons */}
            <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
              <button
                onClick={() => onNavigate('kholboo-barikh')}
                className="flex-1 py-1.5 px-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold transition-all text-center"
              >
                Бүх төлөөлөгчид
              </button>
              <button
                onClick={() => onNavigate('deklarats')}
                className="flex-1 py-1.5 px-2 rounded-lg bg-[#1967d2] hover:bg-[#1557b0] text-white text-[11px] font-bold transition-all text-center flex items-center justify-center gap-1"
              >
                <span>VJW QR харах</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* 1. Аяллын хөтөлбөр Card */}
          <div className="bg-white rounded-2xl border border-[#e5eeff] p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-red-50 text-[#b52426] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">assignment</span>
                </span>
                <h2 className="text-sm sm:text-base font-extrabold text-[#002045]">
                  Аяллын хөтөлбөр
                </h2>
              </div>
              <button
                onClick={() => onNavigate('khotolbor')}
                className="text-xs text-[#1967d2] font-bold hover:underline flex items-center gap-0.5"
              >
                <span>Бүгдийг харах</span>
                <span className="text-[10px]">&gt;</span>
              </button>
            </div>

            {/* Itinerary Timeline List */}
            <div className="divide-y divide-slate-100 text-xs">
              {/* Event 1 */}
              <div className="py-2.5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center text-xs shrink-0">
                    ✈️
                  </span>
                  <div>
                    <span className="font-extrabold text-slate-800">10.18 (Ня)</span>
                    <span className="text-slate-600 block text-[11px]">Улаанбаатар -&gt; Осака</span>
                  </div>
                </div>
              </div>

              {/* Event 2 */}
              <div className="py-2.5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center text-xs shrink-0">
                    🏛
                  </span>
                  <div>
                    <span className="font-extrabold text-slate-800">10.19 (Да)</span>
                    <span className="text-slate-600 block text-[11px]">Orientation</span>
                  </div>
                </div>
              </div>

              {/* Event 3: Toshiya Murata */}
              <div className="py-2.5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center text-xs shrink-0">
                    🏛
                  </span>
                  <div>
                    <span className="font-extrabold text-slate-800">10.20 (Мя)</span>
                    <span className="text-slate-600 block text-[11px]">Toshiya Murata (mr.)</span>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-blue-600 font-bold hover:underline"
                    >
                      Facebook
                    </a>
                  </div>
                </div>
                {/* Avatar headshot */}
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop"
                  alt="Toshiya Murata"
                  className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                />
              </div>

              {/* Event 4: Hiro Coffee */}
              <div className="py-2.5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center text-xs shrink-0">
                    ☕
                  </span>
                  <div>
                    <span className="font-extrabold text-slate-800">10.20 (Мя)</span>
                    <span className="text-slate-600 block text-[11px]">Hiro Coffee Co Ltd</span>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-blue-600 font-bold hover:underline"
                    >
                      Facebook
                    </a>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-[9px] shrink-0">
                  HIRO
                </div>
              </div>

              {/* Event 5: Aeru */}
              <div className="py-2.5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center text-xs shrink-0">
                    🏭
                  </span>
                  <div>
                    <span className="font-extrabold text-slate-800">10.21 (Лх)</span>
                    <span className="text-slate-600 block text-[11px]">Aeru company</span>
                    <span className="text-[10px] text-slate-400 block italic leading-tight">
                      aeru: Bringing Japanese traditions to the next generation
                    </span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center font-black text-[9px] shrink-0">
                  aeru
                </div>
              </div>

              {/* Event 6: Amagasaki */}
              <div className="py-2.5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center text-xs shrink-0">
                    🏛
                  </span>
                  <div>
                    <span className="font-extrabold text-slate-800">10.22 (Пү)</span>
                    <span className="text-slate-600 block text-[11px]">
                      Amagasaki city, Amagasaki Shinkin Bank
                    </span>
                  </div>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=120&auto=format&fit=crop"
                  alt="Amagasaki"
                  className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                />
              </div>

              {/* Event 7: Harukado */}
              <div className="py-2.5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center text-xs shrink-0">
                    🏭
                  </span>
                  <div>
                    <span className="font-extrabold text-slate-800">10.23 (Ба)</span>
                    <span className="text-slate-600 block text-[11px]">Harukado Co Ltd</span>
                    <span className="text-[10px] text-slate-400 block font-sans">晴香堂 株式会社</span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-red-50 text-red-700 border border-red-200 flex items-center justify-center font-black text-[8px] shrink-0">
                  晴香
                </div>
              </div>

              {/* Event 8: Tanaka Tec */}
              <div className="py-2.5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center text-xs shrink-0">
                    🏭
                  </span>
                  <div>
                    <span className="font-extrabold text-slate-800">10.23 (Ба)</span>
                    <span className="text-slate-600 block text-[11px]">Tanaka tec Co ltd</span>
                    <span className="text-[10px] text-slate-400 block font-sans">株式会社タナカテック</span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-800 border border-slate-300 flex items-center justify-center font-black text-[7px] shrink-0">
                  TANAKA
                </div>
              </div>

              {/* Event 9: Free Day */}
              <div className="py-2.5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center text-xs shrink-0">
                    🌴
                  </span>
                  <div>
                    <span className="font-extrabold text-slate-800">10.24 (Бя)</span>
                    <span className="text-slate-600 block text-[11px]">Чөлөөт өдөр</span>
                  </div>
                </div>
              </div>

              {/* Event 10: Free Day */}
              <div className="py-2.5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center text-xs shrink-0">
                    🌴
                  </span>
                  <div>
                    <span className="font-extrabold text-slate-800">10.25 (Ня)</span>
                    <span className="text-slate-600 block text-[11px]">Чөлөөт өдөр</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Full Schedule Button */}
            <button
              onClick={() => onNavigate('khotolbor')}
              className="mt-4 w-full py-2.5 rounded-xl bg-[#f0f4fd] hover:bg-[#dce6fa] text-[#1967d2] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Бүрэн хөтөлбөрийг харах</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          {/* 2. Shopping Widget Card */}
          <div className="bg-white rounded-2xl border border-[#e5eeff] p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-red-50 text-[#b52426] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                </span>
                <h2 className="text-sm sm:text-base font-extrabold text-[#002045]">
                  Shopping
                </h2>
              </div>
              <button
                onClick={() => onNavigate('shopping')}
                className="text-xs text-[#1967d2] font-bold hover:underline flex items-center gap-0.5"
              >
                <span>Бүгдийг харах</span>
                <span className="text-[10px]">&gt;</span>
              </button>
            </div>

            {/* City Tabs */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-[#f1f5f9] rounded-xl mb-3 text-xs font-bold">
              <button
                onClick={() => setShoppingCityTab('tokyo')}
                className={`py-1.5 rounded-lg transition-all ${
                  shoppingCityTab === 'tokyo'
                    ? 'bg-[#1967d2] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Токио (6)
              </button>
              <button
                onClick={() => setShoppingCityTab('osaka')}
                className={`py-1.5 rounded-lg transition-all ${
                  shoppingCityTab === 'osaka'
                    ? 'bg-[#1967d2] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Осака (6)
              </button>
            </div>

            {/* Shopping Mall Cards */}
            <div className="space-y-3">
              {shoppingCityTab === 'tokyo' ? (
                <>
                  {/* Mall 1: Isetan Shinjuku */}
                  <div className="p-2.5 rounded-xl border border-slate-100 hover:border-slate-300 transition-colors flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=160&auto=format&fit=crop"
                      alt="Isetan Shinjuku"
                      className="w-14 h-14 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-extrabold text-slate-900 text-xs truncate">
                        Isetan Shinjuku
                      </h3>
                      <span className="text-[11px] text-slate-500 block truncate">
                        📍 Shinjuku Station / Shinjuku-sanchome
                      </span>
                      <a
                        href="https://maps.google.com/?q=Isetan+Shinjuku"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-[#1967d2] font-bold hover:underline inline-flex items-center gap-0.5 mt-0.5"
                      >
                        <span className="material-symbols-outlined text-[13px]">map</span>
                        <span>Google Maps</span>
                      </a>
                    </div>
                    <span className="text-slate-300 text-xs">&gt;</span>
                  </div>

                  {/* Mall 2: Shibuya Scramble Square */}
                  <div className="p-2.5 rounded-xl border border-slate-100 hover:border-slate-300 transition-colors flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=160&auto=format&fit=crop"
                      alt="Shibuya Scramble Square"
                      className="w-14 h-14 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-extrabold text-slate-900 text-xs truncate">
                        Shibuya Scramble Square
                      </h3>
                      <span className="text-[11px] text-slate-500 block truncate">
                        📍 Shibuya Station
                      </span>
                      <div className="flex items-center gap-2 text-[10px] font-bold mt-0.5">
                        <a
                          href="https://www.gotokyo.org"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-600 hover:underline"
                        >
                          TokyoTourism.org
                        </a>
                        <span className="text-slate-300">•</span>
                        <a
                          href="https://maps.google.com/?q=Shibuya+Scramble+Square"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#1967d2] hover:underline inline-flex items-center gap-0.5"
                        >
                          <span className="material-symbols-outlined text-[13px]">map</span>
                          <span>Google Maps</span>
                        </a>
                      </div>
                    </div>
                    <span className="text-slate-300 text-xs">&gt;</span>
                  </div>

                  {/* Mall 3: Ginza Shopping District */}
                  <div className="p-2.5 rounded-xl border border-slate-100 hover:border-slate-300 transition-colors flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=160&auto=format&fit=crop"
                      alt="Ginza"
                      className="w-14 h-14 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-extrabold text-slate-900 text-xs truncate">
                        Ginza Shopping District
                      </h3>
                      <span className="text-[11px] text-slate-500 block truncate">
                        📍 Ginza Station
                      </span>
                      <a
                        href="https://maps.google.com/?q=Ginza+Station,+Tokyo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-[#1967d2] font-bold hover:underline inline-flex items-center gap-0.5 mt-0.5"
                      >
                        <span className="material-symbols-outlined text-[13px]">map</span>
                        <span>Google Maps</span>
                      </a>
                    </div>
                    <span className="text-slate-300 text-xs">&gt;</span>
                  </div>
                </>
              ) : (
                <>
                  {/* Osaka Mall 1: Shinsaibashi-suji */}
                  <div className="p-2.5 rounded-xl border border-slate-100 hover:border-slate-300 transition-colors flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=160&auto=format&fit=crop"
                      alt="Shinsaibashi"
                      className="w-14 h-14 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-extrabold text-slate-900 text-xs truncate">
                        Shinsaibashi-suji Street
                      </h3>
                      <span className="text-[11px] text-slate-500 block truncate">
                        📍 Shinsaibashi Station
                      </span>
                      <a
                        href="https://maps.google.com/?q=Shinsaibashi-suji+Shopping+Street"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-[#1967d2] font-bold hover:underline inline-flex items-center gap-0.5 mt-0.5"
                      >
                        <span className="material-symbols-outlined text-[13px]">map</span>
                        <span>Google Maps</span>
                      </a>
                    </div>
                    <span className="text-slate-300 text-xs">&gt;</span>
                  </div>

                  {/* Osaka Mall 2: Namba Parks */}
                  <div className="p-2.5 rounded-xl border border-slate-100 hover:border-slate-300 transition-colors flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=160&auto=format&fit=crop"
                      alt="Namba Parks"
                      className="w-14 h-14 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-extrabold text-slate-900 text-xs truncate">
                        Namba Parks
                      </h3>
                      <span className="text-[11px] text-slate-500 block truncate">
                        📍 Namba Station
                      </span>
                      <a
                        href="https://maps.google.com/?q=Namba+Parks"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-[#1967d2] font-bold hover:underline inline-flex items-center gap-0.5 mt-0.5"
                      >
                        <span className="material-symbols-outlined text-[13px]">map</span>
                        <span>Google Maps</span>
                      </a>
                    </div>
                    <span className="text-slate-300 text-xs">&gt;</span>
                  </div>

                  {/* Osaka Mall 3: Hankyu Umeda */}
                  <div className="p-2.5 rounded-xl border border-slate-100 hover:border-slate-300 transition-colors flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=160&auto=format&fit=crop"
                      alt="Hankyu Umeda"
                      className="w-14 h-14 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-extrabold text-slate-900 text-xs truncate">
                        Hankyu Umeda Main Store
                      </h3>
                      <span className="text-[11px] text-slate-500 block truncate">
                        📍 Osaka-Umeda Station
                      </span>
                      <a
                        href="https://maps.google.com/?q=Hankyu+Umeda+Main+Store"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-[#1967d2] font-bold hover:underline inline-flex items-center gap-0.5 mt-0.5"
                      >
                        <span className="material-symbols-outlined text-[13px]">map</span>
                        <span>Google Maps</span>
                      </a>
                    </div>
                    <span className="text-slate-300 text-xs">&gt;</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Modal Dialog */}
      {quickModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-[#002045] text-base">
                {quickModal.title}
              </h3>
              <button
                onClick={() => setQuickModal({ isOpen: false, title: '', content: null })}
                className="text-slate-400 hover:text-slate-700"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="py-4">
              {quickModal.content}
            </div>
            <button
              onClick={() => setQuickModal({ isOpen: false, title: '', content: null })}
              className="w-full py-2.5 rounded-xl bg-[#002045] text-white font-bold text-xs hover:bg-[#1a365d] transition-colors"
            >
              Ойлголоо, хаах
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
