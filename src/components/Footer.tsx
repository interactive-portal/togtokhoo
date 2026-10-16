import React from 'react';
import { PageTab } from './Header';

interface FooterProps {
  onSelectTab: (tab: PageTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="w-full bg-white border-t border-[#e5eeff] shadow-[0_-1px_6px_rgba(26,54,93,0.02)] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Col 1 */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#b52426] text-[22px]">emergency</span>
              <span className="text-sm font-bold text-[#002045] tracking-wide uppercase">Яаралтай холбоо барих</span>
            </div>
            <p className="text-xs text-[#586e8d] leading-relaxed">
              Япон улсад зорчих үеийн консулын болон аяллын штабын 24/7 шуурхай утас.
            </p>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col gap-1 p-3.5 rounded-xl bg-[#eff4ff] border border-[#d3e4fe]/40">
            <span className="text-xs text-[#002045] font-bold">Монгол Улсын ЭСЯ (Токио)</span>
            <a href="tel:+81334692088" className="text-xs text-[#43474e] hover:text-[#b52426] font-medium transition-colors">
              Утас: +81 3-3469-2088
            </a>
            <span className="text-[11px] text-[#b52426] font-semibold">Консулын хэлтэс: 24 цаг</span>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col gap-1 p-3.5 rounded-xl bg-[#eff4ff] border border-[#d3e4fe]/40">
            <span className="text-xs text-[#002045] font-bold">Аяллын Ахлагч / Штаб</span>
            <a href="tel:+818049201122" className="text-xs text-[#43474e] hover:text-[#b52426] font-medium transition-colors">
              Япон шуурхай: +81 80-4920-1122
            </a>
            <span className="text-[11px] text-[#586e8d]">Монгол дугаар: +976 9911-0088</span>
          </div>

          {/* Col 4 */}
          <div className="flex flex-col gap-1 p-3.5 rounded-xl bg-[#eff4ff] border border-[#d3e4fe]/40">
            <span className="text-xs text-[#002045] font-bold">Орон нутгийн Хөтөч (Осака/Токио)</span>
            <a href="tel:+819088332190" className="text-xs text-[#43474e] hover:text-[#b52426] font-medium transition-colors">
              Хөтөч Сато Тацүя: +81 90-8833-2190
            </a>
            <span className="text-[11px] text-[#586e8d]">Хэл: Монгол, Япон, Англи</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[#e5eeff] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#586e8d]">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <button onClick={() => onSelectTab('khotolbor')} className="hover:text-[#002045] transition-colors font-medium">
              Хөтөлбөр
            </button>
            <button onClick={() => onSelectTab('bagiin-burtgel')} className="hover:text-[#002045] transition-colors font-medium">
              Багийн бүртгэл
            </button>
            <button onClick={() => onSelectTab('beleg')} className="hover:text-[#002045] transition-colors font-medium">
              Бэлэг & Төсөв
            </button>
            <button onClick={() => onSelectTab('shopping')} className="hover:text-[#002045] transition-colors font-medium">
              Shopping
            </button>
            <button onClick={() => onSelectTab('deklarats')} className="hover:text-[#002045] transition-colors font-medium text-[#b52426]">
              Декларац (VJW)
            </button>
            <button onClick={() => onSelectTab('teever')} className="hover:text-[#002045] transition-colors font-medium">
              Тээвэр, чиглэл
            </button>
            <button onClick={() => onSelectTab('khel')} className="hover:text-[#002045] transition-colors font-medium">
              Япон хэл
            </button>
            <button onClick={() => onSelectTab('surgaltyn-irts')} className="hover:text-[#002045] transition-colors font-medium">
              Сургалтын ирц
            </button>
            <button onClick={() => onSelectTab('zurgiin-san')} className="hover:text-[#002045] transition-colors font-medium">
              Зургийн сан
            </button>
            <button onClick={() => onSelectTab('kholboo-barikh')} className="hover:text-[#002045] transition-colors font-medium">
              Холбоо барих
            </button>
          </div>
          <span
            onDoubleClick={() => onSelectTab('admin')}
            title=""
            className="text-center md:text-right text-[#74777f] select-none"
          >
            © 2026 Japanese Executive Study Tour. Бүх эрх хуулиар хамгаалагдсан.
          </span>
        </div>
      </div>
    </footer>
  );
};
