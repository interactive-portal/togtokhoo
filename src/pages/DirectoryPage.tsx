import React, { useState, useMemo } from 'react';
import { LEADERS, DELEGATES, Delegate, generateVCard, generateCsv } from '../data/participants';

export const DirectoryPage: React.FC = () => {
  const [delegatesList, setDelegatesList] = useState<Delegate[]>(DELEGATES);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form state for adding new delegate
  const [newCompany, setNewCompany] = useState('');
  const [newName, setNewName] = useState('');
  const [newFullName, setNewFullName] = useState('');
  const [newNickname, setNewNickname] = useState('');
  const [newPosition, setNewPosition] = useState('');
  const [newSector, setNewSector] = useState('Худалдаа ложистик');
  const [newPhoneMn, setNewPhoneMn] = useState('+976 ');
  const [newPhoneJp, setNewPhoneJp] = useState('+81 ');
  const [newEmail, setNewEmail] = useState('');

  // Sector counts
  const sectorCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: delegatesList.length,
      'Хүнсний үйлдвэрлэл': 0,
      'Ноос ноолуур': 0,
      'Санхүү банк': 0,
      'Мэдээллийн технологи': 0,
      'Худалдаа ложистик': 0,
      'Барилга, дэд бүтэц': 0
    };
    delegatesList.forEach(d => {
      Object.keys(counts).forEach(k => {
        if (k !== 'all' && d.sector.includes(k)) {
          counts[k]++;
        }
      });
    });
    return counts;
  }, [delegatesList]);

  // Filtered delegates
  const filteredDelegates = useMemo(() => {
    return delegatesList.filter(d => {
      // Sector filter
      if (selectedSector !== 'all' && !d.sector.includes(selectedSector)) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = d.name.toLowerCase().includes(q);
        const matchesFullName = d.fullName.toLowerCase().includes(q);
        const matchesNick = d.nickname.toLowerCase().includes(q);
        const matchesCompany = d.company.toLowerCase().includes(q);
        const matchesSector = d.sector.toLowerCase().includes(q);
        const matchesPos = d.position.toLowerCase().includes(q);
        const matchesPhone = d.phoneMn.includes(q) || d.phoneJp.includes(q);
        if (!matchesName && !matchesFullName && !matchesNick && !matchesCompany && !matchesSector && !matchesPos && !matchesPhone) {
          return false;
        }
      }
      return true;
    });
  }, [delegatesList, selectedSector, searchQuery]);

  const handleDownloadVCard = () => {
    const vcardData = generateVCard(filteredDelegates);
    const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Japanese_Study_Tour_Contacts.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadExcel = () => {
    const csvData = generateCsv(filteredDelegates);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Japanese_Study_Tour_Delegates_2026.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleAddDelegateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany || !newName || !newPosition) {
      alert('Компани, нэр, албан тушаалыг заавал бөглөнө үү.');
      return;
    }
    const nextNum = delegatesList.length + 1;
    const initials = newName.split('. ').map(p => p.trim()[0]).filter(Boolean).join('').slice(0, 2).toUpperCase() || 'ТӨ';
    const newDel: Delegate = {
      id: `del-${nextNum}`,
      number: `Төлөөлөгч #${nextNum < 10 ? '0' + nextNum : nextNum}`,
      initials,
      company: newCompany,
      sector: newSector,
      sectorBadgeColor: 'blue',
      name: newName,
      fullName: newFullName || newName,
      nickname: newNickname || 'Делегат',
      position: newPosition,
      phoneMn: newPhoneMn,
      phoneJp: newPhoneJp,
      email: newEmail,
      avatarBg: 'bg-[#d6e3ff]',
      avatarColor: 'text-[#002045]'
    };
    setDelegatesList([...delegatesList, newDel]);
    setIsAddModalOpen(false);
    // Reset
    setNewCompany('');
    setNewName('');
    setNewFullName('');
    setNewNickname('');
    setNewPosition('');
    setNewEmail('');
  };

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Top Ambient Banner & Emergency Leadership Dock */}
      <section className="w-full bg-[#eff4ff] px-4 sm:px-6 py-8 relative overflow-hidden border-b border-[#d3e4fe]">
        <div className="max-w-7xl mx-auto flex flex-col gap-6 relative z-10">
          {/* Breadcrumb / Section Tagline */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#b52426]"></span>
                <span className="text-xs uppercase tracking-widest text-[#b52426] font-extrabold">
                  Төлөөлөгчдийн Нэгдсэн Лавлах
                </span>
                <span className="text-[#586e8d] text-xs">/ Осака • Токио 2026</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002045] tracking-tight">
                Аяллын Багийн Бүрэлдэхүүн & Холбоо Барих
              </h1>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="px-3 py-1.5 rounded-lg bg-white text-[#002045] shadow-sm border border-[#d3e4fe]">
                Нийт {delegatesList.length} Төлөөлөгч
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-[#ffdad6] text-[#920212]">
                3 Зохион байгуулагч
              </span>
            </div>
          </div>

          {/* Quick Executive Leadership strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {LEADERS.map((lead) => (
              <div
                key={lead.id}
                className="bg-white p-5 rounded-2xl shadow-sm border border-[#d3e4fe] flex items-start gap-4 hover:shadow-md transition-all"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold shrink-0 ${lead.bgColor}`}>
                  {lead.avatarChar}
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] text-[#b52426] font-bold uppercase tracking-wider">
                      {lead.role}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 bg-[#eff4ff] px-1.5 py-0.5 rounded">
                      {lead.tag}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-[#002045] truncate mt-0.5">{lead.name}</h3>
                  <p className="text-xs text-[#586e8d] truncate">{lead.description}</p>
                  
                  <div className="flex items-center gap-3 mt-2 text-xs">
                    <a
                      href={`tel:${lead.phone}`}
                      className="font-bold text-[#002045] hover:text-[#b52426] flex items-center gap-1 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[15px] text-[#b52426]">call</span>
                      <span>{lead.phoneDisplay}</span>
                    </a>
                    {lead.whatsapp && (
                      <a
                        href={lead.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] px-2 py-0.5 rounded bg-[#e5eeff] hover:bg-[#d6e3ff] text-[#002045] font-bold transition-colors"
                      >
                        WhatsApp
                      </a>
                    )}
                    {lead.email && (
                      <a
                        href={`mailto:${lead.email}`}
                        className="text-[11px] px-2 py-0.5 rounded bg-[#e5eeff] hover:bg-[#d6e3ff] text-[#002045] font-bold transition-colors"
                      >
                        Имэйл
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Directory Workspace */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6">
        {/* Controls Bar: Filter Chips, Search, Layout View Toggle, Export */}
        <div className="flex flex-col gap-4 bg-white p-5 rounded-2xl shadow-sm border border-[#e5eeff]">
          {/* Search + Action row */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input with clear icon */}
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#74777f] text-[20px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Нэр, Блиц нэр, Компани, эсвэл чиглэлээр хайх..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#eff4ff] text-[#0b1c30] placeholder:text-[#74777f] text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[#002045] transition-all border border-[#d3e4fe]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <span className="material-symbols-outlined text-[16px]">cancel</span>
                </button>
              )}
            </div>

            {/* Export and View Switches */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              {/* View Toggle */}
              <div className="flex items-center p-1 bg-[#eff4ff] rounded-xl border border-[#d3e4fe]">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-bold transition-all ${
                    viewMode === 'grid'
                      ? 'bg-white text-[#002045] shadow-sm'
                      : 'text-[#586e8d] hover:text-[#002045]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">grid_view</span>
                  <span>Карт</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-bold transition-all ${
                    viewMode === 'table'
                      ? 'bg-white text-[#002045] shadow-sm'
                      : 'text-[#586e8d] hover:text-[#002045]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">table_rows</span>
                  <span>Хүснэгт</span>
                </button>
              </div>

              {/* Export vCard */}
              <button
                type="button"
                onClick={handleDownloadVCard}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#e5eeff] hover:bg-[#d6e3ff] text-[#002045] text-xs font-bold transition-colors"
                title="Бүх төлөөлөгчдийг гар утсандаа хадгалах"
              >
                <span className="material-symbols-outlined text-[18px]">contact_phone</span>
                <span>vCard Татах</span>
              </button>

              {/* Export Excel */}
              <button
                type="button"
                onClick={handleDownloadExcel}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#002045] text-white hover:bg-[#1a365d] text-xs font-bold shadow-sm transition-colors"
                title="CSV / Excel татаж авах"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span>Excel Экспорт</span>
              </button>

              {/* Add Delegate Button */}
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-[#b52426] text-white hover:bg-[#920212] text-xs font-bold shadow-sm transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">person_add</span>
                <span className="hidden sm:inline">Төлөөлөгч нэмэх</span>
              </button>
            </div>
          </div>

          {/* Sector Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs text-[#586e8d] mr-1 font-bold">Салбар чиглэл:</span>
            <button
              onClick={() => setSelectedSector('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedSector === 'all'
                  ? 'bg-[#002045] text-white shadow-sm'
                  : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#e5eeff]'
              }`}
            >
              Бүх оролцогчид ({sectorCounts.all})
            </button>
            <button
              onClick={() => setSelectedSector('Хүнсний үйлдвэрлэл')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedSector === 'Хүнсний үйлдвэрлэл'
                  ? 'bg-[#002045] text-white shadow-sm'
                  : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#e5eeff]'
              }`}
            >
              Хүнсний үйлдвэрлэл ({sectorCounts['Хүнсний үйлдвэрлэл']})
            </button>
            <button
              onClick={() => setSelectedSector('Ноос ноолуур')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedSector === 'Ноос ноолуур'
                  ? 'bg-[#002045] text-white shadow-sm'
                  : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#e5eeff]'
              }`}
            >
              Ноос ноолуур ({sectorCounts['Ноос ноолуур']})
            </button>
            <button
              onClick={() => setSelectedSector('Санхүү банк')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedSector === 'Санхүү банк'
                  ? 'bg-[#002045] text-white shadow-sm'
                  : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#e5eeff]'
              }`}
            >
              Санхүү & Банк ({sectorCounts['Санхүү банк']})
            </button>
            <button
              onClick={() => setSelectedSector('Мэдээллийн технологи')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedSector === 'Мэдээллийн технологи'
                  ? 'bg-[#002045] text-white shadow-sm'
                  : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#e5eeff]'
              }`}
            >
              Мэдээллийн технологи ({sectorCounts['Мэдээллийн технологи']})
            </button>
            <button
              onClick={() => setSelectedSector('Худалдаа ложистик')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedSector === 'Худалдаа ложистик'
                  ? 'bg-[#002045] text-white shadow-sm'
                  : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#e5eeff]'
              }`}
            >
              Худалдаа ложистик ({sectorCounts['Худалдаа ложистик']})
            </button>
            <button
              onClick={() => setSelectedSector('Барилга, дэд бүтэц')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedSector === 'Барилга, дэд бүтэц'
                  ? 'bg-[#002045] text-white shadow-sm'
                  : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#e5eeff]'
              }`}
            >
              Барилга дэд бүтэц ({sectorCounts['Барилга, дэд бүтэц']})
            </button>
          </div>
        </div>

        {/* Results Counter Notice */}
        <div className="flex items-center justify-between text-xs text-[#586e8d] px-1">
          <span>Нийт <strong>{filteredDelegates.length}</strong> оролцогчийн мэдээлэл харагдаж байна</span>
          <span className="flex items-center gap-1 text-[#74777f]">
            <span className="material-symbols-outlined text-[16px]">info</span>
            Шууд залгах эсвэл WhatsApp-аар холбогдох боломжтой
          </span>
        </div>

        {/* VIEW 1: Grid Mode (Default) */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDelegates.map((del) => (
              <div
                key={del.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden relative group border border-[#e5eeff]"
              >
                {/* Top lacquer bar */}
                <div className={`h-1.5 w-full ${del.sectorBadgeColor === 'red' ? 'bg-[#b52426]' : del.sectorBadgeColor === 'blue' ? 'bg-[#002045]' : 'bg-[#74777f]'}`} />
                
                <div className="p-6 flex flex-col gap-4">
                  {/* Company & Sector Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col">
                      <span className="text-base font-bold text-[#002045] tracking-tight">{del.company}</span>
                      <span className={`text-[11px] font-bold uppercase tracking-wider ${
                        del.sectorBadgeColor === 'red' ? 'text-[#b52426]' : 'text-[#1a365d]'
                      }`}>
                        {del.sector}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#002045] text-[11px] font-bold border border-[#d3e4fe]">
                      {del.number}
                    </span>
                  </div>

                  {/* Participant Info & Blitz Nickname */}
                  <div className="flex items-center gap-3.5 pt-1">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-extrabold shrink-0 shadow-inner ${
                      del.avatarBg || 'bg-[#d6e3ff]'
                    } ${del.avatarColor || 'text-[#002045]'}`}>
                      {del.initials}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="font-bold text-base text-[#002045] truncate">{del.name}</h4>
                        <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#920212] text-[11px] font-extrabold shrink-0">
                          "{del.nickname}"
                        </span>
                      </div>
                      <p className="text-xs text-[#586e8d] font-medium truncate mt-0.5">{del.position}</p>
                      <p className="text-[11px] text-slate-400 truncate">{del.fullName}</p>
                    </div>
                  </div>

                  {/* Contact details block */}
                  <div className="flex flex-col gap-2 p-3 rounded-xl bg-[#f8f9ff] text-xs border border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-[#586e8d] flex items-center gap-1 text-[11px] font-semibold">
                        <span className="material-symbols-outlined text-[15px] text-[#b52426]">phone_iphone</span> Утас (MN):
                      </span>
                      <a href={`tel:${del.phoneMn.replace(/[^0-9+]/g, '')}`} className="font-bold text-[#002045] hover:text-[#b52426]">
                        {del.phoneMn}
                      </a>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#586e8d] flex items-center gap-1 text-[11px] font-semibold">
                        <span className="material-symbols-outlined text-[15px] text-[#002045]">sim_card</span> Япон / Roaming:
                      </span>
                      <span className="font-semibold text-slate-700">{del.phoneJp}</span>
                    </div>
                    <div className="flex items-center justify-between truncate">
                      <span className="text-[#586e8d] flex items-center gap-1 text-[11px] font-semibold">
                        <span className="material-symbols-outlined text-[15px] text-[#002045]">mail</span> Имэйл:
                      </span>
                      <a href={`mailto:${del.email}`} className="font-medium text-[#002045] hover:underline truncate ml-2">
                        {del.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Action Bar */}
                <div className="px-6 py-3 bg-[#f8f9ff] border-t border-slate-100 flex items-center justify-between gap-2">
                  <a
                    href={`tel:${del.phoneMn.replace(/[^0-9+]/g, '')}`}
                    className="flex-1 py-1.5 rounded-lg bg-white hover:bg-[#002045] hover:text-white text-[#002045] text-xs font-bold text-center shadow-sm border border-slate-200 transition-colors flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">call</span> Залгах
                  </a>
                  <a
                    href={`https://wa.me/${del.phoneMn.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-1.5 rounded-lg bg-white hover:bg-[#b52426] hover:text-white text-[#b52426] text-xs font-bold text-center shadow-sm border border-slate-200 transition-colors flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">chat</span> WhatsApp
                  </a>
                  <a
                    href={`mailto:${del.email}`}
                    className="p-1.5 rounded-lg bg-white hover:bg-[#e5eeff] text-[#002045] shadow-sm border border-slate-200 transition-colors flex items-center justify-center"
                    title="Имэйл илгээх"
                  >
                    <span className="material-symbols-outlined text-[18px]">alternate_email</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 2: Table Mode */}
        {viewMode === 'table' && (
          <div className="w-full bg-white rounded-2xl shadow-sm overflow-x-auto border border-[#e5eeff]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#eff4ff] text-[#002045] text-xs font-bold uppercase tracking-wider border-b border-[#d3e4fe]">
                  <th className="py-3 px-4">Компаний нэр</th>
                  <th className="py-3 px-4">Чиглэл</th>
                  <th className="py-3 px-4">Аялагчийн нэр</th>
                  <th className="py-3 px-4">Блиц нэр</th>
                  <th className="py-3 px-4">Албан тушаал</th>
                  <th className="py-3 px-4">Утас (MN / JP)</th>
                  <th className="py-3 px-4">Имэйл</th>
                  <th className="py-3 px-4 text-center">Холбогдох</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-[#0b1c30]">
                {filteredDelegates.map((d) => (
                  <tr key={d.id} className="hover:bg-[#f8f9ff] transition-colors">
                    <td className="py-3 px-4 font-bold text-[#002045]">{d.company}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        d.sectorBadgeColor === 'red' ? 'bg-[#ffdad6] text-[#410003]' : 'bg-[#e5eeff] text-[#002045]'
                      }`}>
                        {d.sector}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold">{d.fullName}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-[#ffdad6] font-bold text-[#b52426]">
                        {d.nickname}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#586e8d]">{d.position}</td>
                    <td className="py-3 px-4">
                      <span className="block font-bold text-[#002045]">{d.phoneMn}</span>
                      <span className="text-[11px] text-slate-400">{d.phoneJp}</span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-600">{d.email}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <a
                          href={`tel:${d.phoneMn.replace(/[^0-9+]/g, '')}`}
                          className="p-1.5 rounded bg-[#eff4ff] hover:bg-[#002045] hover:text-white text-[#002045] transition-colors"
                          title="Залгах"
                        >
                          <span className="material-symbols-outlined text-[16px]">call</span>
                        </a>
                        <a
                          href={`https://wa.me/${d.phoneMn.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded bg-[#ffdad6] hover:bg-[#b52426] hover:text-white text-[#b52426] transition-colors"
                          title="WhatsApp"
                        >
                          <span className="material-symbols-outlined text-[16px]">chat</span>
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Communication & Hotel Protocol Memo Card */}
        <div className="bg-[#eff4ff] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#d3e4fe]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#b52426] text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">sim_card_download</span>
            </div>
            <div className="flex flex-col">
              <h4 className="text-base sm:text-lg font-bold text-[#002045]">Япон eSIM & Roaming Зохицуулалт</h4>
              <p className="text-xs sm:text-sm text-[#43474e] max-w-2xl mt-1 leading-relaxed">
                Бүх төлөөлөгчдийн SoftBank 5G дата багц болон дотоодын дугаарын идэвхжүүлэлтийг 10-р сарын 18-нд Кансай (KIX) нисэх онгоцны буудалд газардах үед штабын баг газар дээр нь тохируулж өгнө.
              </p>
            </div>
          </div>
          <a
            href="tel:+818049201122"
            className="shrink-0 px-6 py-3 rounded-xl bg-[#002045] text-white hover:bg-[#1a365d] text-xs sm:text-sm font-bold shadow transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">support_agent</span>
            <span>Штаб руу шууд залгах</span>
          </a>
        </div>
      </main>

      {/* Add Delegate Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-[#002045] text-lg">Шинэ төлөөлөгч нэмэх</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleAddDelegateSubmit} className="py-4 space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#002045] block mb-1">Компанийн нэр *</label>
                <input
                  type="text"
                  required
                  placeholder="Жишээ: АПУ ХК, MCS..."
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#002045]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#002045] block mb-1">Товч нэр *</label>
                  <input
                    type="text"
                    required
                    placeholder="Жишээ: Б. Тэмүүлэн"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#002045]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#002045] block mb-1">Блиц нэр (Дуудах нэр)</label>
                  <input
                    type="text"
                    placeholder="Жишээ: Тэмка"
                    value={newNickname}
                    onChange={(e) => setNewNickname(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#002045]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#002045] block mb-1">Овог нэр (Бүтэн)</label>
                <input
                  type="text"
                  placeholder="Жишээ: Батболдын Тэмүүлэн"
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#002045]"
                />
              </div>

              <div>
                <label className="font-bold text-[#002045] block mb-1">Албан тушаал *</label>
                <input
                  type="text"
                  required
                  placeholder="Жишээ: Гүйцэтгэх захирал (CEO)"
                  value={newPosition}
                  onChange={(e) => setNewPosition(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#002045]"
                />
              </div>

              <div>
                <label className="font-bold text-[#002045] block mb-1">Салбар чиглэл</label>
                <select
                  value={newSector}
                  onChange={(e) => setNewSector(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#002045] bg-white"
                >
                  <option value="Хүнсний үйлдвэрлэл">Хүнсний үйлдвэрлэл</option>
                  <option value="Худалдаа ложистик">Худалдаа ложистик</option>
                  <option value="Ноос ноолуур / Экспорт">Ноос ноолуур / Экспорт</option>
                  <option value="Санхүү банк">Санхүү банк</option>
                  <option value="Мэдээллийн технологи">Мэдээллийн технологи</option>
                  <option value="Барилга, дэд бүтэц">Барилга, дэд бүтэц</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#002045] block mb-1">Утас (MN)</label>
                  <input
                    type="text"
                    value={newPhoneMn}
                    onChange={(e) => setNewPhoneMn(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#002045]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#002045] block mb-1">Утас (JP / Roaming)</label>
                  <input
                    type="text"
                    value={newPhoneJp}
                    onChange={(e) => setNewPhoneJp(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#002045]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#002045] block mb-1">Имэйл</label>
                <input
                  type="email"
                  placeholder="name@company.mn"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#002045]"
                />
              </div>

              <div className="pt-3 flex gap-2 justify-end border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
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
