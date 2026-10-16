import React, { useState, useEffect } from 'react';
import { TeamGroup } from '../data/teams';
import { getTeamsData } from '../data/dataStore';

export const TeamsPage: React.FC = () => {
  const [teams, setTeams] = useState<TeamGroup[]>(getTeamsData);

  useEffect(() => {
    const handleUpdate = () => {
      setTeams(getTeamsData());
    };
    window.addEventListener('study_tour_data_updated', handleUpdate);
    return () => window.removeEventListener('study_tour_data_updated', handleUpdate);
  }, []);

  const [activeGroup, setActiveGroup] = useState<string>('all');
  const [searchMember, setSearchMember] = useState('');

  const filteredTeams = teams.filter(team => {
    if (activeGroup !== 'all' && team.id !== activeGroup) return false;
    if (searchMember.trim()) {
      const q = searchMember.toLowerCase();
      const hasMember = team.members.some(m => m.name.toLowerCase().includes(q));
      const hasTopic = team.topic.toLowerCase().includes(q) || team.caseStudy.toLowerCase().includes(q);
      const hasLeader = team.leader.toLowerCase().includes(q);
      return hasMember || hasTopic || hasLeader;
    }
    return true;
  });

  const totalMembers = teams.reduce((acc, t) => acc + t.members.length, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-20 w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#e5eeff]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#002045]"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#74777f]">
              ХАМТЫН АЖИЛЛАГАА & БАГИЙН СУРГАЛТ
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002045] tracking-tight">
            Багийн Бүртгэл (5 Баг)
          </h1>
          <p className="text-xs sm:text-sm text-[#586e8d] mt-1 leading-relaxed">
            Сургалт, үйлдвэрийн танилцах аялал, кейс шинжилгээ болон эцсийн тайлан бэлтгэх 5 ажлын хэсгийн бүрэлдэхүүн.
          </p>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-white rounded-xl border border-[#d3e4fe] shadow-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[#002045] text-[20px]">groups</span>
            <span className="text-xs font-bold text-[#002045]">5 Баг</span>
          </div>
          <div className="px-4 py-2 bg-[#eff4ff] rounded-xl border border-[#d3e4fe] shadow-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[#b52426] text-[20px]">badge</span>
            <span className="text-xs font-bold text-[#002045]">Нийт {totalMembers} Төлөөлөгч</span>
          </div>
        </div>
      </div>

      {/* Filter tabs & Search */}
      <div className="py-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Group selector */}
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveGroup('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeGroup === 'all'
                ? 'bg-[#002045] text-white shadow-sm'
                : 'bg-white border border-[#d3e4fe] text-[#43474e] hover:bg-[#eff4ff]'
            }`}
          >
            Бүх багууд (5)
          </button>
          {teams.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveGroup(t.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeGroup === t.id
                  ? 'bg-[#002045] text-white shadow-sm'
                  : 'bg-white border border-[#d3e4fe] text-[#43474e] hover:bg-[#eff4ff]'
              }`}
            >
              {t.name} ({t.members.length})
            </button>
          ))}
        </div>

        {/* Member Search */}
        <div className="relative max-w-xs w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#74777f] text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchMember}
            onChange={(e) => setSearchMember(e.target.value)}
            placeholder="Оролцогчийн нэрээр хайх..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-[#d3e4fe] text-xs text-[#0b1c30] placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#002045]"
          />
        </div>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map((team) => (
          <div
            key={team.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-[#e5eeff] overflow-hidden flex flex-col justify-between"
          >
            {/* Top Bar */}
            <div className="p-5 border-b border-slate-100 bg-[#f8f9ff] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm ${team.badgeBg}`}>
                  G{team.groupNumber}
                </span>
                <div>
                  <h3 className="font-bold text-base text-[#002045]">{team.name}</h3>
                  <span className="text-[11px] text-[#586e8d] font-semibold">
                    Ахлагч: <strong className="text-[#b52426] font-bold">{team.leader}</strong>
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#eff4ff] text-[#002045] text-xs font-bold border border-[#d3e4fe]">
                {team.members.length} гишүүн
              </span>
            </div>

            {/* Team Members List */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                  Багийн бүрэлдэхүүн:
                </span>
                <div className="space-y-2">
                  {team.members.map((m, idx) => (
                    <div
                      key={m.id}
                      className={`p-2.5 rounded-xl border flex items-center justify-between transition-colors ${
                        m.isLeader
                          ? 'bg-[#ffdad6]/40 border-[#ffdad6] text-[#410003]'
                          : 'bg-[#f8f9ff] border-slate-100 text-[#0b1c30]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                          m.isLeader ? 'bg-[#b52426] text-white' : 'bg-[#e5eeff] text-[#002045]'
                        }`}>
                          {idx + 1}
                        </span>
                        <span className="text-sm font-bold">{m.name}</span>
                      </div>
                      {m.isLeader ? (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-[#b52426] text-white uppercase tracking-wider">
                          Ахлагч
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-500 font-medium">{m.role}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Research Topic */}
              <div className="mt-5 pt-4 border-t border-slate-100">
                <span className="text-[10px] font-bold text-[#b52426] uppercase tracking-wider block mb-1">
                  Судлах сэдэв & Даалгавар:
                </span>
                <h4 className="text-xs font-bold text-[#002045] leading-snug mb-1.5">
                  {team.topic}
                </h4>
                <p className="text-[11px] text-[#586e8d] leading-relaxed bg-[#eff4ff] p-2.5 rounded-lg border border-[#d3e4fe]/50">
                  {team.caseStudy}
                </p>
              </div>
            </div>

            {/* Footer action */}
            <div className="p-3 bg-[#f8f9ff] border-t border-slate-100 flex items-center justify-between text-xs text-[#586e8d]">
              <span className="flex items-center gap-1 font-semibold text-[11px]">
                <span className="material-symbols-outlined text-[15px] text-[#002045]">co_present</span>
                10.29 өдөр танилцуулна
              </span>
              <button
                onClick={() => alert(`${team.name}-ийн ахлагч ${team.leader} болон гишүүдэд ажлын хэсгийн даалгаврын мэдээлэл илгээгдлээ.`)}
                className="px-3 py-1 rounded bg-white hover:bg-[#e5eeff] text-[#002045] font-bold text-[11px] border border-slate-200 transition-colors"
              >
                Холбогдох
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Laptop Requirement Callout */}
      <div className="mt-8 p-5 rounded-2xl bg-[#eff4ff] border border-[#d3e4fe] flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#002045] text-white flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[24px]">laptop_mac</span>
        </div>
        <div>
          <h4 className="text-sm font-bold text-[#002045]">Багийн ажиллах төхөөрөмжийн санамж</h4>
          <p className="text-xs text-[#43474e] mt-0.5 leading-relaxed">
            Баг тус бүр дор хаяж 1 зөөврийн компьютер (Laptop) авч явна. Өдөр бүрийн дараах 30 минутын хэлэлцүүлэг болон эцсийн тайлан бэлтгэхэд ашиглана.
          </p>
        </div>
      </div>
    </div>
  );
};
