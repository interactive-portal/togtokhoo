import React, { useState, useEffect } from 'react';
import { CHECKLIST_ITEMS, PROHIBITIONS, ETIQUETTE_RULES, JAPANESE_PHRASES } from '../data/rulesAndEtiquette';
import { PageTab } from '../components/Header';

interface HomePageProps {
  onNavigate: (tab: PageTab) => void;
  onOpenHandout: (title: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenHandout }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  // Checklist state stored in localStorage
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem('study_tour_checklist');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  // Audio speech status
  const [playingPhraseId, setPlayingPhraseId] = useState<string | null>(null);

  // Auto-advance hero carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const toggleCheck = (id: string) => {
    const updated = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(updated);
    try {
      localStorage.setItem('study_tour_checklist', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

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

  return (
    <div className="flex flex-col w-full">
      {/* Hero Banner Carousel Section */}
      <section className="relative w-full bg-[#eff4ff] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
          <div className="relative rounded-2xl overflow-hidden bg-white shadow-md border-t-4 border-[#b52426]">
            {/* Slide 1: Flight Alert */}
            {currentSlide === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px] transition-all duration-500">
                <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded bg-[#ffdad6] text-[#410003] font-bold text-xs tracking-wide uppercase flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">priority_high</span> АНХААРУУЛГА: НИСЛЭГИЙН ЦАГ
                      </span>
                      <span className="px-2.5 py-1 rounded bg-[#e5eeff] text-[#002045] text-xs font-semibold">
                        МИАТ OM501 • Шууд нислэг
                      </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002045] tracking-tight mb-2">
                      Улаанбаатар (UBN) → Кансай, Осака (KIX)
                    </h1>
                    <p className="text-sm text-[#43474e] mb-5 max-w-xl leading-relaxed">
                      Нисэх өдөр: <strong className="text-[#002045] font-bold">2026 оны 10-р сарын 18 (Ням), 13:00 цаг</strong>. 
                      Нислэгээс 2.5 цагийн өмнө буюу хамгийн оройтоход <span className="text-[#b52426] font-bold underline decoration-[#b52426] decoration-2 underline-offset-4">10:30 цагт</span> Чингис Хаан ОУНБ-ын 2-р давхар, олон улсын бүртгэлийн B танхимд бэлэн ирсэн байх шаардлагатай!
                    </p>
                  </div>

                  {/* Transit Visual Strip */}
                  <div className="p-4 rounded-xl bg-[#f8f9ff] border border-[#d3e4fe]/60 mb-5">
                    <div className="grid grid-cols-3 items-center text-center">
                      <div className="flex flex-col items-start">
                        <span className="text-xl sm:text-2xl font-bold text-[#002045]">13:00</span>
                        <span className="text-xs text-[#43474e] font-semibold">UBN (Чингис Хаан)</span>
                        <span className="text-[11px] text-[#74777f]">Terminal 1</span>
                      </div>
                      <div className="flex flex-col items-center justify-center px-2">
                        <span className="text-xs text-[#b52426] font-bold">4 цаг 20 мин</span>
                        <div className="w-full flex items-center my-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#002045] shrink-0"></span>
                          <span className="h-0.5 flex-1 bg-[#d3e4fe]"></span>
                          <span className="material-symbols-outlined text-[#b52426] text-[20px] mx-1">flight</span>
                          <span className="h-0.5 flex-1 bg-[#d3e4fe]"></span>
                          <span className="w-2.5 h-2.5 rounded-full bg-[#b52426] shrink-0"></span>
                        </div>
                        <span className="text-[11px] text-[#43474e]">Шууд (Non-stop)</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xl sm:text-2xl font-bold text-[#002045]">18:20</span>
                        <span className="text-xs text-[#43474e] font-semibold">KIX (Кансай, Осака)</span>
                        <span className="text-[11px] text-[#74777f]">Terminal 1 / JST</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href="#packing-checklist"
                      className="px-5 py-2.5 rounded-xl bg-[#002045] text-white text-sm font-bold hover:bg-[#1a365d] transition-all flex items-center gap-2 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[18px]">checklist</span>
                      Цүнхний шалгах хуудас үзэх
                    </a>
                    <span className="text-xs text-[#b52426] flex items-center gap-1 font-bold">
                      <span className="material-symbols-outlined text-[16px]">schedule</span> 
                      Бэлтгэл хангагдах хугацаа: 7 хоног
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBffih9LwpXegAWwdJDBMqAyfAQv-eN8eDNosMWfnzkC7cCd4X0V3nwu3TmV2OQCaifgQGxph6OyP0MZua8-LBf9FSabaS7B4RPS-Exqcmdj2A819a0LqsLmSVURbvqQ5LzHTG5B2fsoWrqcRGz4oEp45gKy9IWjVckz_-LjP3YdzjgGqmaxRMwo16zjqLMWjQpDdwHXXwctTso1qVif5dTffoU2ZPgmoRjoBdp6pKlqRkgZT13wbYz')`
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002045]/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-white/20 lg:via-transparent lg:to-transparent"></div>
                  <div className="absolute bottom-4 right-4 p-3 rounded-xl bg-white/95 backdrop-blur-md shadow-lg max-w-xs border border-white">
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[#b52426] text-[24px]">luggage</span>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#002045]">Ачааны лимит:</span>
                        <span className="text-xs text-[#43474e]">Гар тээш 8кг + Энгийн ачаа 23кг (1ш)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 2: Factory & Enterprise Visits */}
            {currentSlide === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px] transition-all duration-500">
                <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded bg-[#e5eeff] text-[#002045] font-bold text-xs tracking-wide uppercase">
                        ҮЙЛДВЭРИЙН ЭКСПЕДИЦ
                      </span>
                      <span className="px-2.5 py-1 rounded bg-[#d3e4fe] text-[#43474e] text-xs font-semibold">
                        Осака • Киото • Токио
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002045] tracking-tight mb-2">
                      Дэлхийн түвшний менежмент ба Kaizen технологи
                    </h2>
                    <p className="text-sm text-[#43474e] mb-5 max-w-xl leading-relaxed">
                      Японы тэргүүлэх автоматжуулалт, өндөр бүтээмжийн соёлтой газар дээр нь танилцана. Hiro Coffee, үйлдвэрлэлийн кластер, Panasonic Eco Technology төв болон олон улсын B2B уулзалтууд багтсан цогц аялал.
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#eff4ff] mb-5 border border-[#d3e4fe]">
                    <div className="flex flex-col">
                      <span className="text-xl sm:text-2xl font-bold text-[#002045]">12+</span>
                      <span className="text-xs text-[#586e8d]">Байгууллагын танилцуулга</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xl sm:text-2xl font-bold text-[#b52426]">6</span>
                      <span className="text-xs text-[#586e8d]">Мэргэшсэн сургалт</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xl sm:text-2xl font-bold text-[#002045]">3 Хот</span>
                      <span className="text-xs text-[#586e8d]">Осака, Киото, Токио</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onNavigate('khotolbor')}
                      className="px-5 py-2.5 rounded-xl bg-[#002045] text-white text-sm font-bold hover:bg-[#1a365d] transition-all flex items-center gap-2 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                      Аяллын хөтөлбөр үзэх
                    </button>
                  </div>
                </div>
                <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuADhXBK9KGA5Pkst6_f7LdOBEBFpM_9bp9P891fBM6owRrf1FGfk-EQ7N-v-M45tWdFJXVoI2RHAiAw1uohkz0bqW6eNEHV9TlOQYxKkTxkgaSsY4-JguIltqqu9OenW__mGWpA5zMMNbZCSQFHn9fkeTwCBcfm1-crfVES4DrvldNAkZAW4K2hjdj1V6WylTxRHagWHMUbpBMYWtChnTnsL34UAr1sNuAzw5MJa0dUBMDd6KzG4iro')`
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002045]/60 via-transparent to-transparent"></div>
                </div>
              </div>
            )}

            {/* Slide 3: Cultural Etiquette */}
            {currentSlide === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px] transition-all duration-500">
                <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded bg-[#ffdcc3] text-[#2f1500] font-bold text-xs tracking-wide uppercase">
                        OMOTENASHI • БИЗНЕС СОЁЛ
                      </span>
                      <span className="px-2.5 py-1 rounded bg-[#e5eeff] text-[#002045] text-xs font-semibold">
                        Ёс зүй & Санамж
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002045] tracking-tight mb-2">
                      Японы бизнесийн харилцааны дүрмийг чанд баримтлах санамж
                    </h2>
                    <p className="text-sm text-[#43474e] mb-5 max-w-xl leading-relaxed">
                      Цаг баримтлах хатуу зарчим (10 минутын өмнө бэлэн байх), нэрийн хуудас хоёр гараар солилцох уламжлал болон нийтийн ёс зүйн хэм хэмжээг төлөөлөгч нэг бүр чанд сахин ажиллана.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#eff4ff] mb-5 flex items-center gap-4 border border-[#d3e4fe]">
                    <div className="w-12 h-12 rounded-xl bg-[#ffdad6] text-[#b52426] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[28px]">handshake</span>
                    </div>
                    <div>
                      <span className="text-sm font-bold text-[#002045] block">Бизнесийн нэр хүнд & Харилцаа</span>
                      <span className="text-xs text-[#586e8d]">Бид Монгол улсын бизнесийн тэргүүлэх манлайлагчдыг төлөөлж буй тул зохион байгуулалттай, дэг журамтай оролцоно.</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href="#etiquette-section"
                      className="px-5 py-2.5 rounded-xl bg-[#002045] text-white text-sm font-bold hover:bg-[#1a365d] transition-all flex items-center gap-2 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[18px]">verified</span>
                      Ёс зүйн 10 дүрмийг унших
                    </a>
                  </div>
                </div>
                <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDAHA8TXq1G9SzKMdPWwDO_YwokymI2NuJpsFZLzsAC1aAXtR4q4b7fx0FAb1nYNbZnwqqptLuI13MNbeI2rznubhRylfclHTRYqj3Jp27GfKnpxNQYDCozr_xDQFyD_0Hok-SjKGR77h_uqacA2RMeZUBuUUJXu6vqTwIEBIlpOIUUjxsTZ79-ZU3Zsi2sYjfXLKRp6jGGupkXixZVND14ls81Zxg_9hpkSv0_CePU1rh4R6qnDmrg')`
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002045]/60 via-transparent to-transparent"></div>
                </div>
              </div>
            )}

            {/* Carousel Controls */}
            <div className="px-6 py-3 bg-[#eff4ff] flex items-center justify-between border-t border-[#d3e4fe]/50">
              <div className="flex items-center gap-2">
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      currentSlide === idx ? 'w-8 bg-[#002045]' : 'w-2.5 bg-[#c4c6cf] hover:bg-[#002045]/50'
                    }`}
                    aria-label={`Слайд ${idx + 1}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)}
                  className="p-1.5 rounded-lg hover:bg-white text-[#43474e] hover:text-[#002045] transition-colors"
                  aria-label="Өмнөх"
                >
                  <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                </button>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % totalSlides)}
                  className="p-1.5 rounded-lg hover:bg-white text-[#43474e] hover:text-[#002045] transition-colors"
                  aria-label="Дараах"
                >
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1 & 2: Grid Split Layout (Packing Checklist & Strict Prohibitions) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full" id="packing-checklist">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Section 1: Checklist (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#002045]"></span>
                  <span className="text-xs uppercase tracking-wider text-[#74777f] font-bold">БЭЛТГЭЛ ХАНГАЛТ</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#d6e3ff] text-[#001b3c]">
                    {checkedCount} / {CHECKLIST_ITEMS.length} бэлэн
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#002045] tracking-tight">Авч явах зүйлсийн жагсаалт</h2>
              </div>
              <button
                type="button"
                onClick={() => onOpenHandout('Аяллын_Тээш_Санамж.pdf')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#e5eeff] hover:bg-[#d6e3ff] text-[#002045] text-xs font-bold transition-colors self-start sm:self-auto"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span>Татах (PDF Санамж)</span>
              </button>
            </div>
            <p className="text-sm text-[#43474e] mb-5 leading-relaxed">
              Аялалд гарахаас өмнө доорх 6 гол зүйлийг бүрэн бэлтгэж шалгана уу. Тэмдэглэгээ дээр дарж хувийн бэлтгэлээ хянаарай.
            </p>

            {/* Checklist Interactive Cards */}
            <div className="space-y-3 flex-1">
              {CHECKLIST_ITEMS.map((item) => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                      isChecked
                        ? 'bg-[#f0fdf4] border-emerald-300 shadow-sm'
                        : 'bg-white border-[#e5eeff] hover:border-[#d3e4fe] shadow-sm hover:shadow'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isChecked ? 'bg-emerald-100 text-emerald-800' : 'bg-[#e5eeff] text-[#002045]'
                      }`}>
                        <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-sm font-bold ${isChecked ? 'text-emerald-950 line-through' : 'text-[#002045]'}`}>
                            {item.title}
                          </span>
                          {item.tag && (
                            <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${item.tagColor}`}>
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-[#586e8d] mt-1 leading-relaxed">
                          {item.description}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCheck(item.id);
                      }}
                      className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                        isChecked
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#eff4ff] text-[#74777f] hover:text-[#002045]'
                      }`}
                      aria-label="Шалгах"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {isChecked ? 'check_box' : 'check_box_outline_blank'}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Prohibitions & Rules (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#b52426]"></span>
                <span className="text-xs uppercase tracking-wider text-[#b52426] font-bold">ХАТУУ ДҮРЭМ ЖУРАМ</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#002045] tracking-tight">Хориглох зүйлс & Хууль</h2>
              <p className="text-sm text-[#43474e] mt-1">
                Япон улсын хилийн хорио цээр болон аяллын дотоод журмыг чанд мөрдөнө.
              </p>
            </div>
            
            <div className="space-y-3 flex-1">
              {PROHIBITIONS.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-white shadow-sm border-l-4 border-[#b52426] border-y border-r border-[#e5eeff] flex items-start gap-3.5"
                >
                  <div className="w-9 h-9 rounded-full bg-[#ffdad6] text-[#920212] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#002045]">{item.title}</span>
                    <p className="text-xs text-[#586e8d] mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Warning banner */}
            <div className="mt-4 p-4 rounded-xl bg-[#ffdad6]/60 text-[#410003] flex items-center gap-3 border border-[#ffdad6]">
              <span className="material-symbols-outlined text-[24px] text-[#b52426] shrink-0">gavel</span>
              <span className="text-xs leading-relaxed">
                <strong>Хуулийн анхааруулга:</strong> Японы гаалийн алба бүх тээшийг тусгай нохой болон рентгенээр нэг бүрчлэн шалгадаг тул эрсдэлээс сэргийлнэ үү.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Upcoming Training / Day 1 Highlight Bento Card */}
      <section className="w-full bg-[#eff4ff] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#ffdad6] text-[#410003] tracking-wider uppercase">
                  ОЙРЫН ХӨТӨЛБӨР
                </span>
                <span className="text-xs text-[#74777f] font-semibold">2026.10.19 (Даваа)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#002045] tracking-tight">Эхний өдрийн сургалт ба чиглүүлэг</h2>
            </div>
            <button
              onClick={() => onNavigate('khotolbor')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#002045] text-white text-sm font-bold hover:bg-[#1a365d] transition-all self-start md:self-auto shadow-sm"
            >
              <span>Бүх өдрийн хөтөлбөр үзэх</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Day 1 Master Card (8 Cols) */}
            <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#d3e4fe] flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 bg-[#f8f9ff] p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="w-12 h-12 rounded-xl bg-[#002045] text-white flex flex-col items-center justify-center font-bold">
                      <span className="text-[10px] leading-tight text-[#adc7f7] uppercase">Өдөр</span>
                      <span className="text-lg leading-none">01</span>
                    </span>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-[#002045]">Нээлтийн Orientation & Kaizen Семинар</h3>
                      <span className="text-xs text-[#586e8d]">Осака хотын Олон улсын сургалтын танхим (4-р давхар)</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#e5eeff] text-[#002045] text-xs font-bold">
                    <span className="material-symbols-outlined text-[16px] text-[#b52426]">location_on</span> Төв танхим
                  </span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                    <div className="w-28 shrink-0 flex flex-col">
                      <span className="text-base font-bold text-[#002045]">09:30 - 12:30</span>
                      <span className="text-xs text-[#b52426] font-semibold">Үдээс өмнө</span>
                    </div>
                    <div className="flex-1 p-3.5 rounded-xl bg-[#f8f9ff] border border-slate-100">
                      <span className="text-sm font-bold text-[#002045] block">Сэдэв: "Японы менежментийн онцлог ба Kaizen философи"</span>
                      <p className="text-xs text-[#586e8d] mt-1 leading-relaxed">
                        Японы эдийн засгийн үсрэнгүй хөгжлийн суурь зарчим, тасралтгүй сайжруулалтын практик хэрэглээ, 5S аргачлал.
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#74777f] text-[16px]">person</span>
                        <span className="text-xs text-[#002045] font-semibold">Илтгэгч: Проф. Кэнжи Сато (Осака Эдийн Засгийн Их Сургууль)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                    <div className="w-28 shrink-0 flex flex-col">
                      <span className="text-base font-bold text-[#002045]">14:00 - 17:00</span>
                      <span className="text-xs text-[#74777f] font-semibold">Үдээс хойш</span>
                    </div>
                    <div className="flex-1 p-3.5 rounded-xl bg-[#f8f9ff] border border-slate-100">
                      <span className="text-sm font-bold text-[#002045] block">Багийн кейс дадлага & Үйлдвэрлэлийн бүтээмжийн симуляци</span>
                      <p className="text-xs text-[#586e8d] mt-1 leading-relaxed">
                        Бодит бизнесийн кейс дээр багуудаар хуваагдан дүн шинжилгээ хийх, удирдах ажилтнуудын асуудал шийдвэрлэх хандлага.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Bar */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#b52426] text-[22px]">map</span>
                  <div>
                    <span className="text-xs font-bold text-[#002045] block">Хаяг: Osaka International Convention Center (Grand Cube)</span>
                    <span className="text-[11px] text-[#586e8d]">5-3-51 Nakanoshima, Kita-ku, Osaka, 530-0005 Japan</span>
                  </div>
                </div>
                <a
                  href="https://maps.google.com/?q=Osaka+International+Convention+Center"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 rounded-lg bg-[#e5eeff] hover:bg-[#d6e3ff] text-[#002045] text-xs font-bold transition-colors flex items-center gap-1 shrink-0"
                >
                  <span>Google Maps нээх</span>
                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                </a>
              </div>
            </div>

            {/* Next Day Teaser & Quick Briefing (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border-t-4 border-[#002045] border-x border-b border-[#d3e4fe]">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#e5eeff] text-[#002045] uppercase">
                    МАРГААШИЙН САНАМЖ
                  </span>
                  <span className="text-xs text-[#586e8d]">10.20 (Мягмар)</span>
                </div>
                <h3 className="text-base font-bold text-[#002045] mb-2">Hiro Coffee Co., Ltd зочлох уулзалт</h3>
                <p className="text-xs text-[#586e8d] mb-4 leading-relaxed">
                  Японы кофе үйлдвэрлэл, ханган нийлүүлэлтийн сүлжээний тэргүүлэгч байгууллагатай танилцах хөтөлбөр.
                </p>
                <div className="p-3 rounded-xl bg-[#f8f9ff] mb-4 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#b52426] text-[18px]">groups</span>
                    <span className="font-bold text-[#002045]">Уулзалт: Ноён Тошия Мурата (CEO)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#002045] text-[18px]">checkroom</span>
                    <span className="text-[#586e8d]">Хувцаслалт: Smart Business / Албаны</span>
                  </div>
                </div>
                <span className="text-xs text-[#b52426] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">schedule</span> Буудлаас хөдлөх: 08:30 цагт яг автобусанд сууна
                </span>
              </div>

              {/* Map Preview widget */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#d3e4fe] flex-1 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2 text-xs">
                  <span className="font-bold text-[#002045]">Байршил харах</span>
                  <span className="text-slate-400">Nakanoshima, Osaka</span>
                </div>
                <div
                  className="w-full h-36 bg-cover bg-center rounded-xl relative overflow-hidden"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA5MSfYuDxrJtIJJNKC04f824u16PhVWfrJOtQ24CLG486BtzoqRSfqoARoMRoThHdEQMO_iUGTJNe0uct_9JVS78c_9lauwh0XgU9X6ECPS0UETQjF1vhxL_ZOhIOBBMRLODsTjXXxl6o1QAdhtTOIWVyToRKWNrcoR3GRTigpWkf84M4iKI_UOib9axwHex1Rq7cIXZh0Q4BZkGEkwCNODrkZCribl8YKGf3MQHyFyGrRY9uGFhX7')`
                  }}
                >
                  <div className="absolute inset-0 bg-[#002045]/20 flex items-center justify-center">
                    <span className="px-3 py-1 rounded-lg bg-white/95 text-xs font-bold text-[#002045] shadow flex items-center gap-1">
                      <span className="material-symbols-outlined text-[#b52426] text-[16px]">pin_drop</span> Төв танхим
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Cultural Etiquette in Japan (10 Essential Rules) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 w-full" id="etiquette-section">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e5eeff] text-[#002045] text-xs font-bold uppercase mb-2">
            <span className="material-symbols-outlined text-[16px] text-[#b52426]">temple_buddhist</span>
            Японы соёл, ёс заншил
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002045] tracking-tight mb-2">
            Бизнес төлөөлөгчдийн мөрдөх 10 дүрэм
          </h2>
          <p className="text-sm text-[#586e8d] leading-relaxed">
            Япон улсад зорчих үед нутгийн соёл уламжлалыг хүндэтгэх, зүй бус үл ойлголцлоос сэргийлэх практик санамжууд.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {ETIQUETTE_RULES.map((rule) => (
            <div
              key={rule.number}
              className={`p-5 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between border ${
                rule.highlightBorder ? 'border-t-4 border-t-[#b52426] border-[#d3e4fe]' : 'border-[#e5eeff]'
              }`}
            >
              <div>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold mb-3 ${
                  rule.highlightBorder ? 'bg-[#ffdad6] text-[#410003]' : 'bg-[#eff4ff] text-[#002045]'
                }`}>
                  {rule.number}
                </div>
                <h3 className="text-sm font-bold text-[#002045] mb-1.5">{rule.title}</h3>
                <p className="text-xs text-[#586e8d] leading-relaxed">
                  {rule.description}
                </p>
              </div>
              <span className={`mt-4 pt-2 text-[11px] font-bold flex items-center gap-1 border-t border-slate-100 ${
                rule.highlightBorder ? 'text-[#b52426]' : 'text-[#74777f]'
              }`}>
                <span className="material-symbols-outlined text-[15px]">{rule.badgeIcon}</span>
                {rule.badgeText}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Useful Japanese Phrases (Interactive Audio / Flashcards) */}
      <section className="w-full bg-[#eff4ff] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#002045] text-white tracking-wider uppercase">
                  ХЭЛНИЙ ХӨТӨЧ
                </span>
                <span className="text-xs text-[#74777f] font-semibold">Өдөр тутмын хэрэгцээ</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#002045] tracking-tight">Нийтлэг хэрэглэгдэх япон үгс</h2>
              <p className="text-sm text-[#586e8d] mt-1">
                Товч үгсийг дуудаж сурснаар дэлгүүр, зочид буудал болон уулзалтын үеэр халуун дулаан уур амьсгал бүрдүүлнэ.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#586e8d] self-start md:self-auto font-medium">
              <span className="material-symbols-outlined text-[18px] text-[#002045]">record_voice_over</span>
              <span>Дуудлага сонсохын тулд карт дээр дарна уу</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {JAPANESE_PHRASES.map((phrase) => {
              const isPlaying = playingPhraseId === phrase.id;
              return (
                <div
                  key={phrase.id}
                  onClick={() => playSpeech(phrase.japanese, phrase.id)}
                  className={`p-5 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer border ${
                    isPlaying ? 'border-[#b52426] ring-2 ring-[#ffdad6]' : 'border-[#e5eeff] hover:border-[#d3e4fe]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-[#b52426] uppercase tracking-wider">{phrase.category}</span>
                      <button
                        type="button"
                        className={`p-2 rounded-full transition-colors ${
                          isPlaying ? 'bg-[#b52426] text-white' : 'bg-[#eff4ff] text-[#002045] group-hover:bg-[#002045] group-hover:text-white'
                        }`}
                        aria-label="Дуудах"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {isPlaying ? 'volume_up' : 'play_arrow'}
                        </span>
                      </button>
                    </div>
                    <div className="text-2xl font-extrabold text-[#002045] mb-1 font-sans">{phrase.japanese}</div>
                    <div className="text-xs font-bold text-[#b52426] tracking-wide">{phrase.romaji}</div>
                    <p className="text-sm font-bold text-[#0b1c30] mt-2.5">{phrase.mongolian}</p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-slate-100 text-[#74777f] text-xs">
                    {phrase.usage}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Delegations Emergency Help Desk Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full">
        <div className="p-6 sm:p-10 rounded-2xl bg-[#002045] text-white flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#b52426] text-white flex items-center justify-center shrink-0 shadow">
              <span className="material-symbols-outlined text-[32px]">support_agent</span>
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold block">Шуурхай дэмжлэг, холбоо барих хэрэгтэй байна уу?</span>
              <p className="text-xs sm:text-sm text-[#d3e4fe] max-w-xl mt-1 leading-relaxed">
                Аяллын туршид Монгол-Япон зохион байгуулах баг, орчуулагч хөтөч, ЭСЯ-ны 24/7 штаб танд туслахад бэлэн байна.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0 w-full lg:w-auto">
            <button
              onClick={() => onNavigate('kholboo-barikh')}
              className="flex-1 lg:flex-initial text-center px-5 py-3 rounded-xl bg-white text-[#002045] text-sm font-bold hover:bg-[#eff4ff] transition-colors shadow-sm"
            >
              Төлөөлөгчдийн лавлах руу очих
            </button>
            <a
              href="tel:+818049201122"
              className="flex-1 lg:flex-initial text-center px-5 py-3 rounded-xl bg-[#b52426] text-white text-sm font-bold hover:bg-[#920212] transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span>+81 80-4920-1122</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
