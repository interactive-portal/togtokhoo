import React, { useState, useMemo } from 'react';
import { INITIAL_GIFTS, GiftItem } from '../data/gifts';

export const GiftsPage: React.FC = () => {
  const [gifts, setGifts] = useState<GiftItem[]>(INITIAL_GIFTS);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [newCategory, setNewCategory] = useState<GiftItem['category']>('Байгууллагын бэлэг');
  const [newRecipient, setNewRecipient] = useState('');
  const [newQuantity, setNewQuantity] = useState<number>(1);
  const [newUnitCostMnt, setNewUnitCostMnt] = useState<number>(150000);
  const [newNotes, setNewNotes] = useState('');
  const [newPreparedBy, setNewPreparedBy] = useState('Штабын баг');

  const exchangeRate = 22.8; // 1 JPY ≈ 22.8 MNT

  // Summary stats
  const stats = useMemo(() => {
    let totalItems = 0;
    let totalBudgetMnt = 0;
    gifts.forEach(g => {
      totalItems += g.quantity;
      totalBudgetMnt += g.quantity * g.unitCostMnt;
    });
    const totalBudgetJpy = Math.round(totalBudgetMnt / exchangeRate);
    return { totalItems, totalBudgetMnt, totalBudgetJpy };
  }, [gifts]);

  // Filtered gifts
  const filteredGifts = useMemo(() => {
    return gifts.filter(g => {
      if (categoryFilter !== 'all' && g.category !== categoryFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesRec = g.recipient.toLowerCase().includes(q);
        const matchesCat = g.category.toLowerCase().includes(q);
        const matchesNotes = g.notes.toLowerCase().includes(q);
        if (!matchesRec && !matchesCat && !matchesNotes) return false;
      }
      return true;
    });
  }, [gifts, categoryFilter, searchQuery]);

  const handleAddGift = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecipient.trim()) {
      alert('Хүлээн авагчийн нэрийг оруулна уу.');
      return;
    }
    const unitJpy = Math.round(newUnitCostMnt / exchangeRate);
    const item: GiftItem = {
      id: `gift-${Date.now()}`,
      category: newCategory,
      recipient: newRecipient,
      quantity: Number(newQuantity) || 1,
      unitCostMnt: Number(newUnitCostMnt) || 0,
      unitCostJpy: unitJpy,
      notes: newNotes,
      status: 'Төлөвлөсөн',
      preparedBy: newPreparedBy
    };
    setGifts([item, ...gifts]);
    setIsModalOpen(false);
    // Reset form
    setNewRecipient('');
    setNewNotes('');
    setNewQuantity(1);
    setNewUnitCostMnt(150000);
  };

  const handleDeleteGift = (id: string) => {
    if (confirm('Энэхүү бэлгийн бүртгэлийг хасах уу?')) {
      setGifts(gifts.filter(g => g.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-20 w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#e5eeff]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#b52426]"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#74777f]">
              ДИПЛОМАТ ЁСЛОЛ & ХҮНДЭТГЭЛИЙН БЭЛЭГ
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002045] tracking-tight">
            Бэлэг, Дурсгалын Бүртгэл & Төсөв
          </h1>
          <p className="text-xs sm:text-sm text-[#586e8d] mt-1 leading-relaxed">
            Японы талын зочлох үйлдвэр, илтгэгч профессорууд болон албаны байгууллагуудад гардуулах хүндэтгэлийн бэлгийн нэгдсэн жагсаалт.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#002045] text-white text-xs sm:text-sm font-bold hover:bg-[#1a365d] transition-all shadow shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">add_box</span>
          <span>Шинэ бэлэг нэмэх</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
        <div className="p-5 rounded-2xl bg-white border border-[#d3e4fe] shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#eff4ff] text-[#002045] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[26px]">inventory_2</span>
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Нийт бэлгийн тоо</span>
            <span className="text-2xl font-bold text-[#002045]">{stats.totalItems} ширхэг</span>
            <span className="text-[11px] text-slate-500 block">{gifts.length} байгууллага/хүнд</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#d3e4fe] shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#ffdad6] text-[#b52426] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[26px]">payments</span>
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Нийт төсөв (MNT)</span>
            <span className="text-2xl font-bold text-[#b52426]">
              {stats.totalBudgetMnt.toLocaleString()} ₮
            </span>
            <span className="text-[11px] text-slate-500 block">Монгол төгрөгөөр</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#d3e4fe] shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#ffdcc3] text-[#2f1500] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[26px]">currency_yen</span>
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Нийт дүн (JPY)</span>
            <span className="text-2xl font-bold text-[#002045]">
              ¥{stats.totalBudgetJpy.toLocaleString()}
            </span>
            <span className="text-[11px] text-slate-500 block">Ханш: 1 JPY ≈ {exchangeRate} MNT</span>
          </div>
        </div>
      </div>

      {/* Control Bar: Categories, Search, Grid/Table Switch */}
      <div className="p-4 rounded-2xl bg-white border border-[#e5eeff] shadow-sm mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Filter Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
              categoryFilter === 'all' ? 'bg-[#002045] text-white shadow-sm' : 'bg-[#eff4ff] text-[#43474e] hover:bg-[#e5eeff]'
            }`}
          >
            Бүгд ({gifts.length})
          </button>
          <button
            onClick={() => setCategoryFilter('VIP дурсгал')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
              categoryFilter === 'VIP дурсгал' ? 'bg-[#002045] text-white shadow-sm' : 'bg-[#eff4ff] text-[#43474e] hover:bg-[#e5eeff]'
            }`}
          >
            VIP дурсгал
          </button>
          <button
            onClick={() => setCategoryFilter('Байгууллагын бэлэг')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
              categoryFilter === 'Байгууллагын бэлэг' ? 'bg-[#002045] text-white shadow-sm' : 'bg-[#eff4ff] text-[#43474e] hover:bg-[#e5eeff]'
            }`}
          >
            Байгууллагын бэлэг
          </button>
          <button
            onClick={() => setCategoryFilter('Илтгэгчийн хүндэтгэл')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
              categoryFilter === 'Илтгэгчийн хүндэтгэл' ? 'bg-[#002045] text-white shadow-sm' : 'bg-[#eff4ff] text-[#43474e] hover:bg-[#e5eeff]'
            }`}
          >
            Илтгэгчийн хүндэтгэл
          </button>
        </div>

        {/* Search & View Switch */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Хүлээн авагч, тайлбараар хайх..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-[#eff4ff] border border-[#d3e4fe] focus:outline-none focus:ring-1 focus:ring-[#002045]"
            />
          </div>

          <div className="flex items-center p-1 bg-[#eff4ff] rounded-xl border border-[#d3e4fe] shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                viewMode === 'grid' ? 'bg-white text-[#002045] shadow-sm' : 'text-slate-500 hover:text-[#002045]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">grid_view</span>
              <span>Grid</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                viewMode === 'table' ? 'bg-white text-[#002045] shadow-sm' : 'text-slate-500 hover:text-[#002045]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">table_rows</span>
              <span>Хүснэгт</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: Grid Mode */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGifts.map((gift) => {
            const totalMnt = gift.quantity * gift.unitCostMnt;
            const totalJpy = gift.quantity * gift.unitCostJpy;
            return (
              <div
                key={gift.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-[#e5eeff] p-5 flex flex-col justify-between"
              >
                <div>
                  {/* Category & Status */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                      gift.category === 'VIP дурсгал'
                        ? 'bg-[#ffdad6] text-[#920212]'
                        : gift.category === 'Илтгэгчийн хүндэтгэл'
                        ? 'bg-[#ffdcc3] text-[#2f1500]'
                        : 'bg-[#d6e3ff] text-[#001b3c]'
                    }`}>
                      {gift.category}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {gift.status}
                    </span>
                  </div>

                  {/* Recipient */}
                  <h3 className="font-bold text-base text-[#002045] leading-snug mb-2">
                    {gift.recipient}
                  </h3>

                  {/* Notes / Gift description */}
                  <div className="p-3 rounded-xl bg-[#f8f9ff] border border-slate-100 text-xs text-[#586e8d] mb-4 leading-relaxed">
                    <span className="font-bold text-[#002045] block mb-1">Нэмэлт тайлбар:</span>
                    {gift.notes}
                  </div>
                </div>

                {/* Quantitative info & Budget block */}
                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Бэлгийн тоо:</span>
                    <span className="font-extrabold text-[#002045] text-sm bg-[#eff4ff] px-2.5 py-0.5 rounded">
                      {gift.quantity} ширхэг
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span>Нэг багцын өртөг:</span>
                    <span className="font-semibold text-slate-800">
                      {gift.unitCostMnt.toLocaleString()} ₮ <span className="text-slate-400 text-[11px]">(¥{gift.unitCostJpy.toLocaleString()})</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[#002045] font-bold pt-1 border-t border-dashed border-slate-200">
                    <span className="text-xs uppercase tracking-wider text-slate-500">Нийт төсөв:</span>
                    <div className="text-right">
                      <span className="text-base text-[#b52426] font-extrabold">
                        {totalMnt.toLocaleString()} ₮
                      </span>
                      <span className="text-[11px] text-slate-500 block">
                        (¥{totalJpy.toLocaleString()})
                      </span>
                    </div>
                  </div>

                  {gift.preparedBy && (
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                      <span>Хариуцах: {gift.preparedBy}</span>
                      <button
                        onClick={() => handleDeleteGift(gift.id)}
                        className="text-rose-500 hover:text-rose-700"
                        title="Устгах"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: Table Mode */}
      {viewMode === 'table' && (
        <div className="w-full bg-white rounded-2xl shadow-sm overflow-x-auto border border-[#e5eeff]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#eff4ff] text-[#002045] font-bold uppercase tracking-wider border-b border-[#d3e4fe]">
                <th className="py-3 px-4">Ангилал</th>
                <th className="py-3 px-4">Хүлээн авагч</th>
                <th className="py-3 px-4 text-center">Бэлгийн тоо</th>
                <th className="py-3 px-4">Нэг багцын өртөг</th>
                <th className="py-3 px-4">Нийт төсөв</th>
                <th className="py-3 px-4">Нэмэлт тайлбар</th>
                <th className="py-3 px-4 text-center">Үйлдэл</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[#0b1c30]">
              {filteredGifts.map((gift) => {
                const totalMnt = gift.quantity * gift.unitCostMnt;
                const totalJpy = gift.quantity * gift.unitCostJpy;
                return (
                  <tr key={gift.id} className="hover:bg-[#f8f9ff] transition-colors">
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        gift.category === 'VIP дурсгал'
                          ? 'bg-[#ffdad6] text-[#920212]'
                          : 'bg-[#d6e3ff] text-[#001b3c]'
                      }`}>
                        {gift.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-[#002045]">{gift.recipient}</td>
                    <td className="py-3 px-4 text-center font-extrabold text-[#002045]">
                      {gift.quantity}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-700">
                      {gift.unitCostMnt.toLocaleString()} ₮
                      <span className="text-slate-400 block text-[11px]">¥{gift.unitCostJpy.toLocaleString()}</span>
                    </td>
                    <td className="py-3 px-4 font-bold text-[#b52426]">
                      {totalMnt.toLocaleString()} ₮
                      <span className="text-slate-400 block text-[11px]">¥{totalJpy.toLocaleString()}</span>
                    </td>
                    <td className="py-3 px-4 max-w-xs text-slate-600 leading-relaxed">
                      {gift.notes}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleDeleteGift(gift.id)}
                        className="p-1 rounded text-slate-400 hover:text-rose-600"
                        title="Устгах"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Gift Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-[#002045] text-lg">Шинэ бэлэг бүртгэх</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddGift} className="py-4 space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-[#002045] block mb-1">Ангилал *</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as GiftItem['category'])}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#002045] bg-white"
                >
                  <option value="VIP дурсгал">VIP дурсгал</option>
                  <option value="Байгууллагын бэлэг">Байгууллагын бэлэг</option>
                  <option value="Илтгэгчийн хүндэтгэл">Илтгэгчийн хүндэтгэл</option>
                  <option value="Багийн бэлэг">Багийн бэлэг</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#002045] block mb-1">Хүлээн авагч (Байгууллага / Хүн) *</label>
                <input
                  type="text"
                  required
                  placeholder="Жишээ: Hiro Coffee Co. Ltd удирдлага"
                  value={newRecipient}
                  onChange={(e) => setNewRecipient(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#002045]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#002045] block mb-1">Бэлгийн тоо (ш) *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#002045]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#002045] block mb-1">Нэг багцын өртөг (₮) *</label>
                  <input
                    type="number"
                    min="0"
                    step="5000"
                    required
                    value={newUnitCostMnt}
                    onChange={(e) => setNewUnitCostMnt(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#002045]"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    ≈ ¥{Math.round(newUnitCostMnt / exchangeRate).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#eff4ff] border border-[#d3e4fe] flex justify-between items-center font-bold text-xs">
                <span className="text-[#002045]">Тооцоолсон нийт төсөв:</span>
                <span className="text-[#b52426] text-sm">
                  {(newQuantity * newUnitCostMnt).toLocaleString()} ₮
                </span>
              </div>

              <div>
                <label className="font-bold text-[#002045] block mb-1">Нэмэлт тайлбар (Бэлгийн бүрдэл, онцлог)</label>
                <textarea
                  rows={2}
                  placeholder="Бэлгийн нэр төрөл, сав баглаа боодол, монгол уламжлалт бэлгэдэл..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#002045]"
                />
              </div>

              <div>
                <label className="font-bold text-[#002045] block mb-1">Хариуцах баг / хүн</label>
                <input
                  type="text"
                  value={newPreparedBy}
                  onChange={(e) => setNewPreparedBy(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#002045]"
                />
              </div>

              <div className="pt-3 flex gap-2 justify-end border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 font-bold hover:bg-slate-100"
                >
                  Болих
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#002045] text-white font-bold hover:bg-[#1a365d]"
                >
                  Хадгалах
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
