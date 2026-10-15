import React, { useState } from 'react';

interface GalleryPhoto {
  id: string;
  title: string;
  category: 'osaka' | 'kyoto' | 'tokyo' | 'factory';
  categoryLabel: string;
  location: string;
  imageUrl: string;
  description: string;
}

export const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  const photos: GalleryPhoto[] = [
    {
      id: 'g-1',
      title: 'Осака хотын бизнес төв & Umeda Center',
      category: 'osaka',
      categoryLabel: 'Осака',
      location: 'Osaka Grand Cube & Nakanoshima',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5MSfYuDxrJtIJJNKC04f824u16PhVWfrJOtQ24CLG486BtzoqRSfqoARoMRoThHdEQMO_iUGTJNe0uct_9JVS78c_9lauwh0XgU9X6ECPS0UETQjF1vhxL_ZOhIOBBMRLODsTjXXxl6o1QAdhtTOIWVyToRKWNrcoR3GRTigpWkf84M4iKI_UOib9axwHex1Rq7cIXZh0Q4BZkGEkwCNODrkZCribl8YKGf3MQHyFyGrRY9uGFhX7',
      description: 'Orientation семинар болон анхны өдрийн уулзалтууд зохион байгуулагдах Осака хотын эдийн засаг, технологийн төв бүс.'
    },
    {
      id: 'g-2',
      title: 'Үйлдвэрлэлийн автоматжуулалт & QC хяналтын танхим',
      category: 'factory',
      categoryLabel: 'Үйлдвэрлэл',
      location: 'Osaka / Hyogo Manufacturing Plant',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADhXBK9KGA5Pkst6_f7LdOBEBFpM_9bp9P891fBM6owRrf1FGfk-EQ7N-v-M45tWdFJXVoI2RHAiAw1uohkz0bqW6eNEHV9TlOQYxKkTxkgaSsY4-JguIltqqu9OenW__mGWpA5zMMNbZCSQFHn9fkeTwCBcfm1-crfVES4DrvldNAkZAW4K2hjdj1V6WylTxRHagWHMUbpBMYWtChnTnsL34UAr1sNuAzw5MJa0dUBMDd6KzG4iro',
      description: 'Каизен аргачлалаар тоноглогдсон өндөр бүтээмжийн автоматжуулсан үйлдвэрлэлийн шугам, лазер зүсэлт ба чанарын стандарт.'
    },
    {
      id: 'g-3',
      title: 'Киото хотын уламжлалт өв соёл & Цайны ёслол',
      category: 'kyoto',
      categoryLabel: 'Киото',
      location: 'Kyoto Heritage Garden',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAHA8TXq1G9SzKMdPWwDO_YwokymI2NuJpsFZLzsAC1aAXtR4q4b7fx0FAb1nYNbZnwqqptLuI13MNbeI2rznubhRylfclHTRYqj3Jp27GfKnpxNQYDCozr_xDQFyD_0Hok-SjKGR77h_uqacA2RMeZUBuUUJXu6vqTwIEBIlpOIUUjxsTZ79-ZU3Zsi2sYjfXLKRp6jGGupkXixZVND14ls81Zxg_9hpkSv0_CePU1rh4R6qnDmrg',
      description: 'Aeru компанийн уламжлалт урлалыг орчин үеийн зах зээлд нутагшуулсан туршлага болон Omotenashi зочломтгой соёл.'
    },
    {
      id: 'g-4',
      title: 'Кансай нисэх буудал & Төлөөлөгчдийн угтан авалт',
      category: 'osaka',
      categoryLabel: 'Осака',
      location: 'Kansai International Airport (KIX)',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBffih9LwpXegAWwdJDBMqAyfAQv-eN8eDNosMWfnzkC7cCd4X0V3nwu3TmV2OQCaifgQGxph6OyP0MZua8-LBf9FSabaS7B4RPS-Exqcmdj2A819a0LqsLmSVURbvqQ5LzHTG5B2fsoWrqcRGz4oEp45gKy9IWjVckz_-LjP3YdzjgGqmaxRMwo16zjqLMWjQpDdwHXXwctTso1qVif5dTffoU2ZPgmoRjoBdp6pKlqRkgZT13wbYz',
      description: 'Чингис Хаан ОУНБ-аас Кансай хүрэх шууд нислэг болон Осака хот руу шилжих хурдан галт тэрэгний терминал.'
    },
    {
      id: 'g-5',
      title: 'Токио хотын IDE-JETRO эдийн засгийн хүрээлэн',
      category: 'tokyo',
      categoryLabel: 'Токио',
      location: 'Tokyo Central Business District',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyGwDPEsxEe2WqumJRh5L-tuCOfFhRpTcKtlxO0tm-fK3thH1hS1VpaCwbgyxDh5UxmteBd2rJNdQAG_uOU_k67T5znG5B9-vwhiwCANVw6PSM7f2BGKnn3b-2DTJZeFGEJUcqFxV9AB6M3ozqmVj5L128GW_4OmRCYpqt8aTcY_XR5EJfCiOZyTTtOX0OqDjytDXlyl2jUlCj3nz3-A-BzNhV9G4NVbHE16Wblt7QB2cdRGRq2lCX',
      description: 'Азийн эдийн засгийн судалгаа, Монгол-Японы худалдааны хэлэлцээр болон хөрөнгө оруулалтын төв байр.'
    },
    {
      id: 'g-6',
      title: 'ЖДҮ стратегийн семинар & Олон улсын зөвлөх',
      category: 'osaka',
      categoryLabel: 'Осака',
      location: 'OBP Plaza Seminar Hall',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhVmSxXXaAmHa3Bb1MIgw58uWb-iYvVNDLxCB_d0s77i4CR0XVQVEsXUSpttDC2YzQKaRYt-2Y8u-7aY-YJZroQabQULkgITWcdCMPQ3l5wQdRJb89pOC7xIUjzJcMDK7pRRveDo28m2pwdKsMY6U0H2x350Cwn3ykizhTaL__xFCMekZCIy_9512XVw9b0TlJQiAgVKhy0W8YmsiH62RHwutAVX81nc4bBfOR2Pqp3i1jJprYlZgl',
      description: 'Ноён Тошия Муратагийн жижиг дунд үйлдвэрийн бүтээмж, өрсөлдөх чадварын стратегийн мастер класс.'
    }
  ];

  const filtered = selectedCategory === 'all' 
    ? photos 
    : photos.filter(p => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-20 w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#e5eeff]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#002045]"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#74777f]">
              АЯЛЛЫН ЦОМОГ & ФОТО САН
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002045] tracking-tight">
            Аяллын Зургийн Сан
          </h1>
          <p className="text-xs sm:text-sm text-[#586e8d] mt-1">
            Осака, Киото, Токио хотуудын үйлдвэр, уулзалтын танхим, соёлын өвт газруудын бодит зургууд.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#002045] text-white shadow-sm'
                : 'bg-white border border-[#d3e4fe] text-[#43474e] hover:bg-[#eff4ff]'
            }`}
          >
            Бүх зургууд
          </button>
          <button
            onClick={() => setSelectedCategory('osaka')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedCategory === 'osaka'
                ? 'bg-[#002045] text-white shadow-sm'
                : 'bg-white border border-[#d3e4fe] text-[#43474e] hover:bg-[#eff4ff]'
            }`}
          >
            Осака
          </button>
          <button
            onClick={() => setSelectedCategory('kyoto')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedCategory === 'kyoto'
                ? 'bg-[#002045] text-white shadow-sm'
                : 'bg-white border border-[#d3e4fe] text-[#43474e] hover:bg-[#eff4ff]'
            }`}
          >
            Киото
          </button>
          <button
            onClick={() => setSelectedCategory('tokyo')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedCategory === 'tokyo'
                ? 'bg-[#002045] text-white shadow-sm'
                : 'bg-white border border-[#d3e4fe] text-[#43474e] hover:bg-[#eff4ff]'
            }`}
          >
            Токио
          </button>
          <button
            onClick={() => setSelectedCategory('factory')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedCategory === 'factory'
                ? 'bg-[#002045] text-white shadow-sm'
                : 'bg-white border border-[#d3e4fe] text-[#43474e] hover:bg-[#eff4ff]'
            }`}
          >
            Үйлдвэрлэл
          </button>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
        {filtered.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setActivePhoto(photo)}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border border-[#e5eeff] flex flex-col justify-between"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-bold">
                  {photo.categoryLabel}
                </span>
              </div>
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="p-2.5 rounded-full bg-white/90 text-[#002045] shadow-lg">
                  <span className="material-symbols-outlined text-[24px]">zoom_in</span>
                </span>
              </div>
            </div>
            <div className="p-5">
              <span className="text-[11px] text-[#b52426] font-bold uppercase tracking-wider block mb-1">
                {photo.location}
              </span>
              <h3 className="font-bold text-base text-[#002045] group-hover:text-[#b52426] transition-colors leading-snug">
                {photo.title}
              </h3>
              <p className="text-xs text-[#586e8d] mt-2 line-clamp-2 leading-relaxed">
                {photo.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-700">
            <div className="relative max-h-[60vh] bg-black flex items-center justify-center">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                className="max-h-[60vh] w-auto object-contain"
              />
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-6">
              <span className="text-xs font-bold text-[#b52426] uppercase tracking-wider block mb-1">
                {activePhoto.location} • {activePhoto.categoryLabel}
              </span>
              <h3 className="text-lg font-bold text-[#002045]">{activePhoto.title}</h3>
              <p className="text-sm text-[#43474e] mt-2 leading-relaxed">
                {activePhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
