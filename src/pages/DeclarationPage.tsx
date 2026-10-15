import React from 'react';

export const DeclarationPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-20 w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#e5eeff]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#b52426]"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#74777f]">
              ЯПОН УЛСЫН ДИЖИТАЛ АГЕНТЛАГ (DIGITAL AGENCY OF JAPAN)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002045] tracking-tight">
            Цахим Декларац — services.digital.go.jp
          </h1>
          <p className="text-xs sm:text-sm text-[#586e8d] mt-1 leading-relaxed">
            Японы хилээр түргэн шуурхай нэвтрэх (Visit Japan Web) цахим цагаачлалын карт ба гаалийн мэдүүлгийн албан ёсны үйлчилгээ.
          </p>
        </div>

        {/* Primary Action to open services.digital.go.jp */}
        <a
          href="https://services.digital.go.jp"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#002045] hover:bg-[#1a365d] text-white text-sm font-bold shadow-lg transition-all shrink-0"
        >
          <span className="material-symbols-outlined text-[20px]">open_in_new</span>
          <span>services.digital.go.jp нээх</span>
        </a>
      </div>

      {/* Main Official Portal Hero Card */}
      <div className="my-8 rounded-2xl bg-gradient-to-br from-[#002045] via-[#1a365d] to-[#002045] text-white p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#d6e3ff] text-xs font-bold mb-3 border border-white/20">
            <span className="material-symbols-outlined text-[16px] text-amber-300">verified</span>
            Япон улсын албан ёсны цахим бүртгэл
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight mb-3">
            Visit Japan Web цахим мэдүүлэг
          </h2>
          <p className="text-sm text-[#d3e4fe] leading-relaxed mb-6">
            Нисэхээс өмнө <strong>services.digital.go.jp</strong> системд бүртгүүлж цагаачлал болон гаалийн QR кодыг утсандаа хадгалснаар Кансай нисэх онгоцны буудлын шалган нэвтрүүлэх хэсгээр цаасан маягт бөглөхгүйгээр автомат шугамаар 5-10 минутад нэвтэрнэ.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://services.digital.go.jp"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-[#b52426] hover:bg-[#920212] text-white text-sm font-bold shadow transition-all flex items-center gap-2"
            >
              <span>Цахимаар бөглөх</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
            <a
              href="https://www.vjw.digital.go.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white text-sm font-bold border border-white/20 transition-all flex items-center gap-2"
            >
              <span>VJW Нэвтрэх (Login)</span>
              <span className="material-symbols-outlined text-[16px]">login</span>
            </a>
          </div>
        </div>
      </div>

      {/* Pre-filled info for delegates to use when filling out */}
      <div className="mb-10">
        <h3 className="text-lg font-bold text-[#002045] mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#b52426]">info</span>
          Бүртгэлд бөглөх аяллын бэлэн мэдээлэл (Хуулж авах)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-white border border-[#d3e4fe] shadow-sm">
            <span className="text-slate-400 font-semibold block uppercase">1. Нислэгийн дугаар</span>
            <span className="text-base font-extrabold text-[#002045] mt-1 block">OM501 (MIAT)</span>
            <span className="text-slate-500 text-[11px]">10.18 өдөр UBN → KIX</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#d3e4fe] shadow-sm">
            <span className="text-slate-400 font-semibold block uppercase">2. Осака буудлын нэр</span>
            <span className="text-sm font-bold text-[#002045] mt-1 block">Hotel Granvia Osaka</span>
            <span className="text-slate-500 text-[11px]">3-1-1 Umeda, Kita-ku, Osaka</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#d3e4fe] shadow-sm">
            <span className="text-slate-400 font-semibold block uppercase">3. Холбогдох Япон утас</span>
            <span className="text-sm font-bold text-[#002045] mt-1 block">+81 80-4920-1122</span>
            <span className="text-slate-500 text-[11px]">Аяллын штаб / Зохицуулагч</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#d3e4fe] shadow-sm">
            <span className="text-slate-400 font-semibold block uppercase">4. Байх хугацаа</span>
            <span className="text-base font-extrabold text-[#002045] mt-1 block">13 хоног (Days)</span>
            <span className="text-slate-500 text-[11px]">2026.10.18 - 2026.10.30</span>
          </div>
        </div>
      </div>

      {/* Step by Step Guide */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-[#e5eeff] shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#eff4ff] text-[#002045] font-extrabold text-base flex items-center justify-center mb-4">
              01
            </div>
            <h4 className="font-bold text-base text-[#002045] mb-2">Хаяг үүсгэх & Паспорт бүртгэх</h4>
            <p className="text-xs text-[#586e8d] leading-relaxed">
              <strong>services.digital.go.jp</strong> хаягаар орж имэйлээрээ бүртгэл үүсгэнэ. Паспортын мэдээллийн хуудсыг камераар уншуулах эсвэл гараар үнэн зөв оруулна.
            </p>
          </div>
          <span className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-emerald-700 flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">check_circle</span> Паспорт хүчинтэй байх
          </span>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#e5eeff] shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#eff4ff] text-[#002045] font-extrabold text-base flex items-center justify-center mb-4">
              02
            </div>
            <h4 className="font-bold text-base text-[#002045] mb-2">Цагаачлал & Гаалийн мэдүүлэг</h4>
            <p className="text-xs text-[#586e8d] leading-relaxed">
              "Disembarkation Card for Foreigner" болон "Customs Declaration" 2 хэсгийг бөглөнө. Аяллын зорилго: <em>Business / Study Tour</em> гэж сонгоно.
            </p>
          </div>
          <span className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-emerald-700 flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">check_circle</span> Зорилго: Бизнес сургалт
          </span>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#e5eeff] shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#eff4ff] text-[#002045] font-extrabold text-base flex items-center justify-center mb-4">
              03
            </div>
            <h4 className="font-bold text-base text-[#002045] mb-2">QR кодыг дэлгэцэнд хадгалах</h4>
            <p className="text-xs text-[#586e8d] leading-relaxed">
              Бөглөж дуусахад үүсэх <strong>QR код</strong>-ын зургийг Screenshot хийж утасныхаа цомогт хадгална. Интернэтгүй үед ч хилээр уншуулах боломжтой.
            </p>
          </div>
          <span className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-emerald-700 flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">qr_code</span> Screenshot хадгалах
          </span>
        </div>
      </div>
    </div>
  );
};
