import React, { useState } from 'react';
import { DELEGATES } from '../data/participants';
import { ITINERARY_DATA } from '../data/itinerary';

export const AttendancePage: React.FC = () => {
  const [selectedDayId, setSelectedDayId] = useState<string>('day-2');
  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, Record<string, boolean>>>(() => {
    // Initial mock: most delegates checked in
    const initial: Record<string, Record<string, boolean>> = {};
    ITINERARY_DATA.forEach(day => {
      initial[day.id] = {};
      DELEGATES.forEach((del, idx) => {
        initial[day.id][del.id] = idx !== 4; // all checked in except 1 for realism
      });
    });
    return initial;
  });

  const currentEvent = ITINERARY_DATA.find(d => d.id === selectedDayId) || ITINERARY_DATA[1];
  const dayRecords = attendanceRecords[selectedDayId] || {};

  const toggleCheckIn = (delegateId: string) => {
    setAttendanceRecords(prev => ({
      ...prev,
      [selectedDayId]: {
        ...prev[selectedDayId],
        [delegateId]: !prev[selectedDayId]?.[delegateId]
      }
    }));
  };

  const markAll = (status: boolean) => {
    const updated: Record<string, boolean> = {};
    DELEGATES.forEach(d => {
      updated[d.id] = status;
    });
    setAttendanceRecords(prev => ({
      ...prev,
      [selectedDayId]: updated
    }));
  };

  const attendedCount = DELEGATES.filter(d => dayRecords[d.id]).length;
  const percentage = Math.round((attendedCount / DELEGATES.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-20 w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#e5eeff]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#002045]"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#74777f]">
              ИРЦИЙН БҮРТГЭЛ & KAIZEN ЦАГ БАРИМТЛАЛ
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002045] tracking-tight">
            Сургалт & Үйлдвэрийн Айлчлалын Ирц
          </h1>
          <p className="text-xs sm:text-sm text-[#586e8d] mt-1">
            Японы бизнесийн 10 минутын өмнө бэлэн байх дүрмийн хэрэгжилт, төлөөлөгчдийн өдөр бүрийн ирц.
          </p>
        </div>

        {/* Stats card */}
        <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-[#d3e4fe]">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-semibold uppercase">Одоогийн ирц</span>
            <span className="text-2xl font-bold text-[#002045]">
              {attendedCount} / {DELEGATES.length}
            </span>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-emerald-500 bg-emerald-50 flex items-center justify-center font-bold text-emerald-800 text-sm">
            {percentage}%
          </div>
        </div>
      </div>

      {/* Day Selector Tabs */}
      <div className="py-6">
        <label className="text-xs font-bold text-[#002045] uppercase tracking-wider block mb-2">
          Арга хэмжээ сонгох:
        </label>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {ITINERARY_DATA.filter(d => d.category !== 'flight').map(d => (
            <button
              key={d.id}
              onClick={() => setSelectedDayId(d.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 transition-all text-left flex flex-col gap-0.5 ${
                selectedDayId === d.id
                  ? 'bg-[#002045] text-white shadow-md'
                  : 'bg-white border border-[#e5eeff] text-[#43474e] hover:bg-[#eff4ff]'
              }`}
            >
              <span className={`text-[10px] uppercase font-semibold ${selectedDayId === d.id ? 'text-[#adc7f7]' : 'text-[#74777f]'}`}>
                {d.dateStr.split(' - ')[0]}
              </span>
              <span className="truncate max-w-[180px]">{d.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Current Event Banner */}
      <div className="bg-[#eff4ff] rounded-2xl p-6 mb-6 border border-[#d3e4fe] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#ffdad6] text-[#410003] uppercase">
            {currentEvent.categoryLabel} • {currentEvent.time}
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-[#002045] mt-1.5">{currentEvent.title}</h2>
          <p className="text-xs text-[#586e8d] mt-0.5 flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-[#002045]">location_on</span>
            {currentEvent.locationName}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => markAll(true)}
            className="px-3.5 py-1.5 rounded-lg bg-[#002045] text-white text-xs font-bold hover:bg-[#1a365d] transition-colors"
          >
            Бүгдийг ирсэн
          </button>
          <button
            onClick={() => markAll(false)}
            className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors"
          >
            Цэвэрлэх
          </button>
        </div>
      </div>

      {/* Delegate Attendance List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DELEGATES.map((del) => {
          const isPresent = !!dayRecords[del.id];
          return (
            <div
              key={del.id}
              onClick={() => toggleCheckIn(del.id)}
              className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all cursor-pointer ${
                isPresent
                  ? 'bg-white border-emerald-300 shadow-sm'
                  : 'bg-slate-50 border-slate-200 opacity-70'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm ${
                  del.avatarBg || 'bg-[#d6e3ff]'
                } ${del.avatarColor || 'text-[#002045]'}`}>
                  {del.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-[#002045]">{del.fullName}</h4>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#ffdad6] text-[#b52426]">
                      "{del.nickname}"
                    </span>
                  </div>
                  <span className="text-xs text-[#586e8d]">{del.company} • {del.position}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  isPresent ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {isPresent ? 'Ирсэн' : 'Бүртгээгүй'}
                </span>
                <span className={`material-symbols-outlined text-[24px] ${
                  isPresent ? 'text-emerald-600' : 'text-slate-300'
                }`}>
                  {isPresent ? 'check_circle' : 'radio_button_unchecked'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
