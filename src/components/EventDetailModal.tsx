import React, { useState } from 'react';
import { ItineraryItem } from '../data/itinerary';

interface EventDetailModalProps {
  item: ItineraryItem | null;
  onClose: () => void;
  onOpenHandout?: (title: string) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  item,
  onClose,
  onOpenHandout
}) => {
  const [personalNote, setPersonalNote] = useState('');
  const [savedNotes, setSavedNotes] = useState<string[]>(() => {
    if (!item) return [];
    try {
      const stored = localStorage.getItem(`notes_${item.id}`);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  if (!item) return null;

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personalNote.trim()) return;
    const updated = [...savedNotes, personalNote.trim()];
    setSavedNotes(updated);
    setPersonalNote('');
    localStorage.setItem(`notes_${item.id}`, JSON.stringify(updated));
  };

  const handleDownloadCalendar = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Japanese Executive Study Tour//EN
BEGIN:VEVENT
SUMMARY:${item.title}
DESCRIPTION:${item.description}
LOCATION:${item.locationName}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${item.id}-schedule.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-[#f8f9ff] flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${item.categoryBg}`}>
                <span className="material-symbols-outlined text-[15px] mr-1">{item.categoryIcon}</span>
                {item.categoryLabel}
              </span>
              <span className="text-xs font-bold text-[#586e8d] bg-white px-2 py-0.5 rounded border border-slate-200">
                {item.dateStr} • {item.time}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Батлагдсан
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-[#002045] leading-tight">
              {item.title}
            </h2>
            {item.subtitle && (
              <p className="text-xs font-bold text-[#b52426] uppercase tracking-wider mt-1">
                {item.subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Speaker / Company block */}
          {item.speaker && (
            <div className="p-4 rounded-xl bg-[#eff4ff] border border-[#d3e4fe] flex items-center gap-4">
              {item.speaker.avatar && (
                <img
                  src={item.speaker.avatar}
                  alt={item.speaker.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                />
              )}
              <div>
                <h4 className="font-bold text-[#002045] text-base">{item.speaker.name}</h4>
                <p className="text-xs text-[#586e8d] font-medium">{item.speaker.title}</p>
                {item.speaker.profileUrl && (
                  <a
                    href={item.speaker.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#002045] font-semibold hover:underline mt-1"
                  >
                    <span className="material-symbols-outlined text-xs">link</span>
                    <span>Facebook Профайл</span>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Detailed description */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Хөтөлбөрийн дэлгэрэнгүй</h4>
            <p className="text-sm text-[#43474e] leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Location info */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#b52426] text-[22px] shrink-0 mt-0.5">location_on</span>
              <div>
                <h5 className="font-bold text-sm text-[#002045]">{item.locationName}</h5>
                {item.locationDetail && (
                  <p className="text-xs text-slate-500 mt-0.5">{item.locationDetail}</p>
                )}
              </div>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.locationName)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-300 text-[#002045] hover:bg-[#eff4ff] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shrink-0"
            >
              <span>Газрын зураг</span>
              <span className="material-symbols-outlined text-[15px]">open_in_new</span>
            </a>
          </div>

          {/* Attachment download */}
          {item.attachment && (
            <div className="p-3.5 rounded-xl bg-[#e5eeff] flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#002045]">
                <span className="material-symbols-outlined text-[20px] text-[#b52426]">description</span>
                <span>{item.attachment.name}</span>
                {item.attachment.size && <span className="text-slate-500">({item.attachment.size})</span>}
              </div>
              <button
                onClick={() => onOpenHandout && onOpenHandout(item.attachment!.name)}
                className="px-3 py-1 rounded bg-white text-[#002045] hover:bg-[#d6e3ff] text-xs font-bold flex items-center gap-1 shadow-sm transition-colors"
              >
                <span className="material-symbols-outlined text-[15px]">download</span>
                <span>Нээх</span>
              </button>
            </div>
          )}

          {/* Delegate's Personal Notes */}
          <div className="border-t border-slate-200 pt-4">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">edit_note</span>
              Хувийн тэмдэглэл & Асуултууд
            </h4>
            
            {savedNotes.length > 0 && (
              <div className="space-y-2 mb-3">
                {savedNotes.map((note, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start justify-between">
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleAddNote} className="flex gap-2">
              <input
                type="text"
                placeholder="Энэхүү айлчлалын үеэр тодруулах асуултаа энд бичнэ үү..."
                value={personalNote}
                onChange={(e) => setPersonalNote(e.target.value)}
                className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#002045]"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-lg bg-[#002045] text-white text-xs font-bold hover:bg-[#1a365d] transition-colors shrink-0"
              >
                Нэмэх
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Хаах
          </button>
          <button
            onClick={handleDownloadCalendar}
            className="px-4 py-2 rounded-lg text-xs font-bold bg-[#002045] text-white hover:bg-[#1a365d] flex items-center gap-1.5 shadow transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">calendar_add_on</span>
            <span>Календарт нэмэх (.ics)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
