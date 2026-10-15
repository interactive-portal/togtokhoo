import React from 'react';

interface HandoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentTitle: string;
  documentSubtitle?: string;
  fileSize?: string;
}

export const HandoutModal: React.FC<HandoutModalProps> = ({
  isOpen,
  onClose,
  documentTitle,
  documentSubtitle = 'Япон Бизнес Сургалт & Аяллын Штаб',
  fileSize = '2.4 MB'
}) => {
  if (!isOpen) return null;

  const handlePrintDownload = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-[#eff4ff]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#b52426] text-white flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
            </div>
            <div>
              <h3 className="font-bold text-[#002045] text-base sm:text-lg">{documentTitle}</h3>
              <p className="text-xs text-[#586e8d]">{documentSubtitle} • {fileSize}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Document Body Preview */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-[#0b1c30] leading-relaxed">
          <div className="border border-slate-200 rounded-xl p-5 bg-[#f8f9ff]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <span>Japanese Executive Study Tour 2026</span>
              <span>Осака • Киото • Токио</span>
            </div>
            <h2 className="text-xl font-bold text-[#002045] mt-4 mb-2">
              {documentTitle.replace('.pdf', '')}
            </h2>
            <p className="text-xs text-slate-600 mb-4">
              Энэхүү баримт бичиг нь Япон улсад зохион байгуулагдах удирдлагын түвшний сургалт, үйлдвэрийн танилцах экспедицийн албан ёсны гарын авлага болно.
            </p>

            <div className="space-y-3 text-xs bg-white p-4 rounded-lg border border-slate-200">
              <div className="font-bold text-[#002045] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#b52426]">verified</span>
                Агуулгын тойм (Table of Contents):
              </div>
              <ul className="list-disc list-inside space-y-1.5 text-slate-700">
                <li>1-р бүлэг: Аяллын ерөнхий зохион байгуулалт, цагийн хуваарь ба логистик</li>
                <li>2-р бүлэг: Японы бизнесийн соёл (Meishi - нэрийн хуудас, Aisatsu, Hourensou)</li>
                <li>3-р бүлэг: Kaizen, 5S аргачлал ба Монголын ЖДҮ салбарт нутагшуулах нь</li>
                <li>4-р бүлэг: Зочлох компаниудын бизнес загвар, QC стандарт ба бүтээгдэхүүн хөгжүүлэлт</li>
                <li>5-р бүлэг: Орон нутгийн дэд бүтэц, төрийн бодлого болон хотын захиргааны санхүүгийн механизм</li>
                <li>6-р бүлэг: Онцгой байдал, эмнэлгийн болон консулын тусламж үйлчилгээ</li>
              </ul>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50 text-emerald-800 text-xs border border-emerald-200">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span>Баримт бичиг баталгаажсан. Төлөөлөгч нэг бүрт сургалтын танхимд хэвлэмэл эх хувиар олгогдоно.</span>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Хаах
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintDownload}
              className="px-4 py-2 rounded-lg text-sm font-bold bg-[#eff4ff] text-[#002045] hover:bg-[#dce9ff] flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">print</span>
              <span>Хэвлэх</span>
            </button>
            <button
              onClick={() => {
                alert(`"${documentTitle}" файлыг татаж байна... Таны төхөөрөмжид хадгалагдана.`);
                onClose();
              }}
              className="px-5 py-2 rounded-lg text-sm font-bold bg-[#002045] text-white hover:bg-[#1a365d] flex items-center gap-1.5 shadow transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Татаж авах (PDF)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
