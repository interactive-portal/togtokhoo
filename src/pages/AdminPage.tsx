import React, { useState, useEffect } from 'react';
import {
  getItineraryData,
  saveItineraryData,
  getTeamsData,
  saveTeamsData,
  getGiftsData,
  saveGiftsData,
  getShoppingData,
  saveShoppingData,
  getParticipantsData,
  saveParticipantsData,
  getRulesData,
  saveRulesData,
  resetAllDataToDefaults,
  DataCategory
} from '../data/dataStore';

interface AdminPageProps {
  onBackToApp: () => void;
}

const ADMIN_PASS = 'Aa@123456';
const AUTH_KEY = 'japan_tour_admin_auth_token';

export const AdminPage: React.FC<AdminPageProps> = ({ onBackToApp }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Selected JSON Category Tab
  const [activeTab, setActiveTab] = useState<DataCategory>('itinerary');

  // Editor content & error state
  const [jsonText, setJsonText] = useState('');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState(false);

  // Load active tab's data into the editor
  const loadTabContent = (tab: DataCategory) => {
    setJsonError(null);
    setSaveSuccessMsg(null);
    let data: unknown = null;

    if (tab === 'itinerary') data = getItineraryData();
    else if (tab === 'teams') data = getTeamsData();
    else if (tab === 'gifts') data = getGiftsData();
    else if (tab === 'shopping') data = getShoppingData();
    else if (tab === 'participants') data = getParticipantsData();
    else if (tab === 'rules') data = getRulesData();

    setJsonText(JSON.stringify(data, null, 2));
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadTabContent(activeTab);
    }
  }, [isAuthenticated, activeTab]);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASS) {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem(AUTH_KEY, 'true');
      } catch (err) {
        console.warn(err);
      }
      setLoginError('');
      setPasswordInput('');
    } else {
      setLoginError('Нууц үг буруу байна. Дахин оролдоно уу.');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem(AUTH_KEY);
    } catch (err) {
      console.warn(err);
    }
  };

  // Validate JSON string on change
  const handleJsonChange = (text: string) => {
    setJsonText(text);
    setSaveSuccessMsg(null);
    try {
      JSON.parse(text);
      setJsonError(null);
    } catch (err) {
      if (err instanceof Error) {
        setJsonError(err.message);
      } else {
        setJsonError('Буруу JSON синтакс байна');
      }
    }
  };

  // Format / Beautify JSON
  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonText(JSON.stringify(parsed, null, 2));
      setJsonError(null);
    } catch (err) {
      if (err instanceof Error) {
        setJsonError(`Цэгцлэх боломжгүй: ${err.message}`);
      }
    }
  };

  // Save changes to localStorage via dataStore
  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonError(null);

      if (activeTab === 'itinerary') saveItineraryData(parsed);
      else if (activeTab === 'teams') saveTeamsData(parsed);
      else if (activeTab === 'gifts') saveGiftsData(parsed);
      else if (activeTab === 'shopping') saveShoppingData(parsed);
      else if (activeTab === 'participants') saveParticipantsData(parsed);
      else if (activeTab === 'rules') saveRulesData(parsed);

      setSaveSuccessMsg('Амжилттай хадгалагдлаа! Аппликейшны бүх хуудсанд шууд шинэчлэгдлээ.');
      setTimeout(() => setSaveSuccessMsg(null), 4000);
    } catch (err) {
      if (err instanceof Error) {
        setJsonError(`Хадгалах боломжгүй! JSON алдаа: ${err.message}`);
      }
    }
  };

  // Reset current category to default data
  const handleResetCurrent = () => {
    if (confirm(`Та "${activeTab}" өгөгдлийг анхны анхдагч төлөвт шилжүүлэхдээ итгэлтэй байна уу?`)) {
      if (activeTab === 'itinerary') localStorage.removeItem('japan_tour_data_itinerary');
      else if (activeTab === 'teams') localStorage.removeItem('japan_tour_data_teams');
      else if (activeTab === 'gifts') localStorage.removeItem('japan_tour_data_gifts');
      else if (activeTab === 'shopping') localStorage.removeItem('japan_tour_data_shopping');
      else if (activeTab === 'participants') localStorage.removeItem('japan_tour_data_participants');
      else if (activeTab === 'rules') localStorage.removeItem('japan_tour_data_rules');

      window.dispatchEvent(new Event('study_tour_data_updated'));
      loadTabContent(activeTab);
      setSaveSuccessMsg('Анхны төлөвт амжилттай шилжүүллээ.');
      setTimeout(() => setSaveSuccessMsg(null), 3000);
    }
  };

  // Copy JSON to clipboard
  const handleCopyJson = () => {
    navigator.clipboard.writeText(jsonText).then(() => {
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 2000);
    });
  };

  // Download JSON file
  const handleDownloadFile = () => {
    const blob = new Blob([jsonText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `japan_tour_${activeTab}_backup.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Upload / Import JSON file
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        setJsonText(JSON.stringify(parsed, null, 2));
        setJsonError(null);
        setSaveSuccessMsg('JSON файл амжилттай дуудагдлаа. Хадгалах товчийг дарж баталгаажуулна уу.');
      } catch {
        setJsonError('Алдаатай JSON файл байна. Зөв .json файл сонгоно уу.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Tab definitions
  const tabsList: { key: DataCategory; title: string; icon: string; countDesc: string }[] = [
    { key: 'itinerary', title: 'Хөтөлбөр (Itinerary)', icon: 'calendar_month', countDesc: '13 өдрийн хөтөлбөр' },
    { key: 'teams', title: 'Багийн бүртгэл (Teams)', icon: 'groups', countDesc: '5 Ажлын хэсэг' },
    { key: 'gifts', title: 'Бэлэг, төсөв (Gifts)', icon: 'featured_seasonal_and_gifts', countDesc: 'Дурсгалын бэлгийн бүртгэл' },
    { key: 'shopping', title: 'Shopping (Malls)', icon: 'shopping_bag', countDesc: 'Токио & Осака дэлгүүрүүд' },
    { key: 'participants', title: 'Төлөөлөгчид (Participants)', icon: 'contacts', countDesc: 'Делегатууд & Удирдлага' },
    { key: 'rules', title: 'Дүрэм & Үгс (Rules & Phrases)', icon: 'translate', countDesc: 'Чеклист, хориглох, үгс' }
  ];

  // -------------------------------------------------------------
  // Render Login Form if not authenticated
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200">
          {/* Lock Icon */}
          <div className="w-16 h-16 rounded-2xl bg-red-50 text-[#b52426] flex items-center justify-center mx-auto mb-4 border border-red-100 shadow-xs">
            <span className="material-symbols-outlined text-[32px]">admin_panel_settings</span>
          </div>

          <div className="text-center mb-6">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#002045]">
              Админ Системд Нэвтрэх
            </h1>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Japanese Executive Study Tour 2026 порталын JSON өгөгдлийг удирдах, шинэчлэх хэсэг.
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-800 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Админ Нууц үг:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Нууц үгээ оруулна уу..."
                  required
                  autoFocus
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#002045] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#002045] hover:bg-[#1a365d] text-white font-extrabold text-xs transition-colors shadow-md active:scale-98"
            >
              Нэвтрэх
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={onBackToApp}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Сайт руу буцах</span>
            </button>
            <span className="text-[11px] text-slate-400">Secure Access</span>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Render Authenticated Admin Dashboard
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col text-slate-800">
      {/* Admin Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-4 sm:px-8 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#002045] text-white flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-sm sm:text-base text-[#002045]">
                Админ Удирдлагын Хянах Самбар
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">
                Идэвхтэй
              </span>
            </div>
            <span className="text-[11px] text-slate-500 hidden sm:block">
              JSON Өгөгдөл Засварлагч & Аппликейшны шууд синхрончлол
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onBackToApp}
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">home</span>
            <span className="hidden sm:inline">Сайт руу буцах</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold flex items-center gap-1 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">logout</span>
            <span>Гарах</span>
          </button>
        </div>
      </header>

      {/* Main Admin Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 flex flex-col gap-5">
        {/* Category Tabs Strip */}
        <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-xs flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {tabsList.map((t) => {
            const isActive = activeTab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#002045] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{t.icon}</span>
                <span>{t.title}</span>
              </button>
            );
          })}
        </div>

        {/* Toolbar & Status Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-700">
              Сонгогдсон хэсэг: <strong className="text-[#002045] uppercase">{activeTab}</strong>
            </span>
            {jsonError ? (
              <span className="px-2.5 py-1 rounded-lg bg-red-100 text-red-800 text-xs font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">error</span>
                <span>JSON Алдаатай</span>
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                <span>JSON Зөв бүтэцтэй ✓</span>
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleFormatJson}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 transition-colors"
              title="JSON-ийг уншихад эвтэйхэн цэгцлэх"
            >
              <span className="material-symbols-outlined text-[16px]">code</span>
              <span>Цэгцлэх (Format)</span>
            </button>

            <button
              onClick={handleCopyJson}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">content_copy</span>
              <span>{copyStatus ? 'Хуулагдлаа!' : 'Хуулах'}</span>
            </button>

            <button
              onClick={handleDownloadFile}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 transition-colors"
              title="Backup файл болгон татах"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Татах (.json)</span>
            </button>

            <label className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[16px]">upload_file</span>
              <span>Файл оруулах</span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            <button
              onClick={handleResetCurrent}
              className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold flex items-center gap-1 transition-colors"
              title="Энэ хэсгийн өгөгдлийг анхдагч төлөвт шилжүүлэх"
            >
              <span className="material-symbols-outlined text-[16px]">restart_alt</span>
              <span>Анхны төлөв</span>
            </button>

            <button
              onClick={handleSave}
              disabled={!!jsonError}
              className={`px-4 py-2 rounded-xl text-white text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-sm ${
                jsonError
                  ? 'bg-slate-300 cursor-not-allowed text-slate-500'
                  : 'bg-[#1967d2] hover:bg-[#1557b0] active:scale-95'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              <span>Хадгалах (Save JSON)</span>
            </button>
          </div>
        </div>

        {/* Success Alert Banner */}
        {saveSuccessMsg && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center justify-between gap-2 shadow-xs animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-emerald-600">check_circle</span>
              <span>{saveSuccessMsg}</span>
            </div>
            <button
              onClick={() => setSaveSuccessMsg(null)}
              className="text-emerald-700 hover:text-emerald-900"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        )}

        {/* Error Alert Banner */}
        {jsonError && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-300 text-red-900 text-xs font-mono flex items-center gap-2 shadow-xs">
            <span className="material-symbols-outlined text-[20px] text-red-600 shrink-0">error</span>
            <span className="break-all">{jsonError}</span>
          </div>
        )}

        {/* Code Editor Box */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col flex-1 min-h-[500px]">
          <div className="bg-slate-800 text-slate-200 px-4 py-2.5 flex items-center justify-between text-xs font-mono">
            <span>JSON Code Editor • {activeTab}.json</span>
            <span className="text-[11px] text-slate-400">Шууд засварлаад &quot;Хадгалах&quot; товчийг дарна уу</span>
          </div>

          <textarea
            value={jsonText}
            onChange={(e) => handleJsonChange(e.target.value)}
            spellCheck={false}
            rows={22}
            className="w-full flex-1 p-4 font-mono text-xs text-slate-900 bg-slate-50/50 leading-relaxed focus:outline-none resize-y selection:bg-blue-100"
            placeholder="JSON өгөгдлөө энд оруулна уу..."
          />
        </div>

        {/* Bottom Help Tips */}
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[22px] text-blue-700">lightbulb</span>
            <div>
              <span className="font-bold block">Зөвлөгөө:</span>
              <span className="text-slate-700">
                JSON-ийг өөрчилсний дараа &quot;Хадгалах (Save JSON)&quot; товчийг дарвал Нүүр хуудас, Хөтөлбөр, Багийн бүртгэл, Shopping зэрэг бүх хуудсанд шууд харагдана.
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              if (confirm('Бүх өгөгдлийг (Хөтөлбөр, Баг, Бэлэг, Дэлгүүр, Төлөөлөгчид) үйлдвэрийн анхны төлөвт шилжүүлэх үү?')) {
                resetAllDataToDefaults();
                loadTabContent(activeTab);
                setSaveSuccessMsg('Бүх өгөгдлийг амжилттай цэвэрлэж анхдагч утгад шилжүүллээ.');
              }
            }}
            className="px-3 py-1.5 rounded-xl bg-white border border-red-200 hover:bg-red-50 text-red-700 font-bold text-xs shrink-0 transition-colors"
          >
            Бүх өгөгдлийг анхны төлөвт нь буцаах
          </button>
        </div>
      </div>
    </div>
  );
};
