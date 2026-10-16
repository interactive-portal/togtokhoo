import React, { useState, useEffect } from 'react';
import {
  getMenusData,
  saveMenusData,
  getBannersData,
  saveBannersData,
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
  getAllDataUnified,
  saveAllDataUnified,
  resetCategoryToDefault,
  resetAllDataToDefaults,
  DataCategory,
  MenuItemConfig,
  BannerSlide
} from '../data/dataStore';
import { PageTab } from '../components/Header';

interface AdminPageProps {
  onBackToApp: () => void;
}

const ADMIN_PASS = 'Aa@123456';
const AUTH_KEY = 'japan_tour_admin_auth_token';

// Curated Ultra-HD quality Japan wallpapers for 1-click image upgrade
const HD_PRESET_IMAGES = [
  {
    name: 'Фүжи уул ба Чурейто Пагода (Намар)',
    url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=85&w=2400&auto=format&fit=crop'
  },
  {
    name: 'Осака хотын төв & Гранд Фронт (Шөнө)',
    url: 'https://images.unsplash.com/photo-1590559899731-a3f07b78375f?q=85&w=2400&auto=format&fit=crop'
  },
  {
    name: 'Токио цамхаг & Роппонги (Үдшийн туяа)',
    url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=85&w=2400&auto=format&fit=crop'
  },
  {
    name: 'Киото Кинкакужи Алтан сүм',
    url: 'https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?q=85&w=2400&auto=format&fit=crop'
  },
  {
    name: 'Шинкансэн Хурдны галт тэрэг',
    url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=85&w=2400&auto=format&fit=crop'
  },
  {
    name: 'Шибуяа Скрамбл гарц',
    url: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=85&w=2400&auto=format&fit=crop'
  }
];

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

  // Selected Category Tab
  const [activeTab, setActiveTab] = useState<DataCategory>('menus');

  // Mode: 'both' (Shows Visual list AND Live JSON Editor), 'json', or 'visual'
  const [editMode, setEditMode] = useState<'both' | 'json' | 'visual'>('both');

  // Visual state for Menus
  const [menusList, setMenusList] = useState<MenuItemConfig[]>([]);

  // Visual state for Banners
  const [bannersList, setBannersList] = useState<BannerSlide[]>([]);
  const [editingBannerIndex, setEditingBannerIndex] = useState<number | null>(null);

  // Editor content & error state for JSON mode
  const [jsonText, setJsonText] = useState('');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState(false);

  // Load active tab data
  const loadData = (tab: DataCategory) => {
    setJsonError(null);
    setSaveSuccessMsg(null);
    let data: unknown = null;

    if (tab === 'menus') {
      const items = getMenusData();
      setMenusList(items);
      data = items;
    } else if (tab === 'banners') {
      const items = getBannersData();
      setBannersList(items);
      data = items;
    } else if (tab === 'all_json') {
      data = getAllDataUnified();
    } else if (tab === 'itinerary') {
      data = getItineraryData();
    } else if (tab === 'teams') {
      data = getTeamsData();
    } else if (tab === 'gifts') {
      data = getGiftsData();
    } else if (tab === 'shopping') {
      data = getShoppingData();
    } else if (tab === 'participants') {
      data = getParticipantsData();
    } else if (tab === 'rules') {
      data = getRulesData();
    }

    setJsonText(JSON.stringify(data, null, 2));
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData(activeTab);
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
      setLoginError('Нууц үг буруу байна. "Aa@123456" нууц үгийг оруулна уу.');
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

  // Save changes in JSON mode
  const handleSaveJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonError(null);

      if (activeTab === 'menus') {
        saveMenusData(parsed);
        setMenusList(parsed);
      } else if (activeTab === 'banners') {
        saveBannersData(parsed);
        setBannersList(parsed);
      } else if (activeTab === 'all_json') {
        saveAllDataUnified(parsed);
        if (Array.isArray(parsed.menus)) setMenusList(parsed.menus);
        if (Array.isArray(parsed.banners)) setBannersList(parsed.banners);
      } else if (activeTab === 'itinerary') {
        saveItineraryData(parsed);
      } else if (activeTab === 'teams') {
        saveTeamsData(parsed);
      } else if (activeTab === 'gifts') {
        saveGiftsData(parsed);
      } else if (activeTab === 'shopping') {
        saveShoppingData(parsed);
      } else if (activeTab === 'participants') {
        saveParticipantsData(parsed);
      } else if (activeTab === 'rules') {
        saveRulesData(parsed);
      }

      setSaveSuccessMsg('Амжилттай хадгалагдлаа! Аппликейшны бүх цэс, хуудаснууд шууд шинэчлэгдлээ.');
      setTimeout(() => setSaveSuccessMsg(null), 4000);
    } catch (err) {
      if (err instanceof Error) {
        setJsonError(`Хадгалах боломжгүй! JSON алдаа: ${err.message}`);
      }
    }
  };

  // Format JSON
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

  // ==========================================
  // Visual Menu Actions
  // ==========================================
  const handleToggleMenu = (id: string) => {
    const updated = menusList.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m));
    setMenusList(updated);
    saveMenusData(updated);
    setJsonText(JSON.stringify(updated, null, 2));
    showQuickToast('Цэсний төлөв хадгалагдлаа');
  };

  const handleUpdateMenuField = (id: string, field: keyof MenuItemConfig, value: unknown) => {
    const updated = menusList.map((m) => (m.id === id ? { ...m, [field]: value } : m));
    setMenusList(updated);
    saveMenusData(updated);
    setJsonText(JSON.stringify(updated, null, 2));
  };

  const handleMoveMenu = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === menusList.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const copy = [...menusList];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIndex, 0, moved);

    // Reassign order numbers
    const updated = copy.map((m, i) => ({ ...m, order: i + 1 }));
    setMenusList(updated);
    saveMenusData(updated);
    setJsonText(JSON.stringify(updated, null, 2));
    showQuickToast('Цэсний дараалал шинэчлэгдлээ');
  };

  const handleToggleAllMenus = (enable: boolean) => {
    const updated = menusList.map((m) => ({ ...m, enabled: enable }));
    setMenusList(updated);
    saveMenusData(updated);
    setJsonText(JSON.stringify(updated, null, 2));
    showQuickToast(enable ? 'Бүх цэсийг идэвхжүүллээ' : 'Бүх цэсийг идэвхгүй болголоо');
  };

  const handleAddNewMenu = () => {
    try {
      const currentList: MenuItemConfig[] = Array.isArray(menusList) && menusList.length > 0 ? menusList : getMenusData();
      const newId = `m-custom-${Date.now().toString().slice(-4)}`;
      const newMenu: MenuItemConfig = {
        id: newId,
        key: `custom-${Date.now().toString().slice(-4)}` as PageTab,
        label: 'Шинэ нэмэгдсэн цэс',
        icon: 'stars',
        category: 'secondary',
        order: currentList.length + 1,
        enabled: true,
        description: 'Шинээр нэмэгдсэн цэсний тайлбар мэдээлэл'
      };
      const updated = [...currentList, newMenu];
      setMenusList(updated);
      saveMenusData(updated);
      setJsonText(JSON.stringify(updated, null, 2));
      showQuickToast('Шинэ цэс нэмэгдлээ! Картууд болон JSON кодонд шууд оров.');
    } catch (err) {
      console.warn(err);
    }
  };

  // ==========================================
  // Visual Banner Actions
  // ==========================================
  const handleToggleBanner = (id: string) => {
    const updated = bannersList.map((b) => (b.id === id ? { ...b, enabled: !b.enabled } : b));
    setBannersList(updated);
    saveBannersData(updated);
    setJsonText(JSON.stringify(updated, null, 2));
    showQuickToast('Баннерийн төлөв хадгалагдлаа');
  };

  const handleUpdateBannerField = (index: number, field: keyof BannerSlide, value: unknown) => {
    const updated = [...bannersList];
    updated[index] = { ...updated[index], [field]: value };
    setBannersList(updated);
    saveBannersData(updated);
    setJsonText(JSON.stringify(updated, null, 2));
  };

  const handleMoveBanner = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === bannersList.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const copy = [...bannersList];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIndex, 0, moved);

    const updated = copy.map((b, i) => ({ ...b, order: i + 1 }));
    setBannersList(updated);
    saveBannersData(updated);
    setJsonText(JSON.stringify(updated, null, 2));
    showQuickToast('Баннерийн дараалал шинэчлэгдлээ');
  };

  const handleAddBannerSlide = () => {
    const newSlide: BannerSlide = {
      id: `slide-${Date.now()}`,
      title: 'Шинэ Аяллын Баннер',
      subtitle: 'Дэд гарчиг болон тайлбар мэдээлэл',
      alertBadge: 'Шуурхай сануулга мэдээлэл',
      locationText: 'Байршил / Он сар өдөр',
      imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=85&w=2400&auto=format&fit=crop',
      tag: 'ШИНЭ',
      actionTab: 'khotolbor',
      actionText: 'Дэлгэрэнгүй',
      enabled: true,
      order: bannersList.length + 1
    };
    const updated = [...bannersList, newSlide];
    setBannersList(updated);
    saveBannersData(updated);
    setJsonText(JSON.stringify(updated, null, 2));
    setEditingBannerIndex(updated.length - 1);
    showQuickToast('Шинэ баннер нэмэгдлээ');
  };

  const handleDeleteBannerSlide = (index: number) => {
    if (bannersList.length <= 1) {
      alert('Дор хаяж нэг баннер байх шаардлагатай.');
      return;
    }
    if (confirm('Энэ баннерийг устгахдаа итгэлтэй байна уу?')) {
      const updated = bannersList.filter((_, i) => i !== index);
      setBannersList(updated);
      saveBannersData(updated);
      setJsonText(JSON.stringify(updated, null, 2));
      setEditingBannerIndex(null);
      showQuickToast('Баннер устгагдлаа');
    }
  };

  const showQuickToast = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(null), 3500);
  };

  // Reset category
  const handleResetCurrent = () => {
    if (confirm(`Та "${activeTab}" өгөгдлийг анхны анхдагч төлөвт шилжүүлэхдээ итгэлтэй байна уу?`)) {
      resetCategoryToDefault(activeTab);
      loadData(activeTab);
      showQuickToast(`"${activeTab}" өгөгдлийг анхдагч төлөвт амжилттай буцаалаа.`);
    }
  };

  // Reset ALL data
  const handleResetAll = () => {
    if (
      confirm(
        'АНХААРУУЛГА: Та БҮХ өгөгдөл, цэс, баннер, хөтөлбөрийг анхны хэвэнд нь оруулахдаа итгэлтэй байна уу?'
      )
    ) {
      resetAllDataToDefaults();
      loadData(activeTab);
      showQuickToast('Бүх өгөгдлийг бүрэн цэвэрлэж анхдагч төлөвт шилжүүллээ.');
    }
  };

  // Copy JSON
  const handleCopyJson = () => {
    navigator.clipboard.writeText(jsonText).then(() => {
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 2000);
    });
  };

  // Download JSON backup
  const handleDownloadJson = () => {
    const blob = new Blob([jsonText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `japan_tour_${activeTab}_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Available tabs
  const categoryTabs: { key: DataCategory; label: string; icon: string; countBadge?: string }[] = [
    { key: 'menus', label: 'Бүх цэсний JSON & Удирдлага', icon: 'menu_open', countBadge: '11 цэс' },
    { key: 'all_json', label: 'Бүх өгөгдлийн нэгдсэн JSON', icon: 'data_object', countBadge: 'Full JSON' },
    { key: 'banners', label: 'Баннер удирдах', icon: 'view_carousel', countBadge: 'HD Чанар' },
    { key: 'itinerary', label: 'Хөтөлбөр (JSON)', icon: 'calendar_month' },
    { key: 'teams', label: 'Багийн бүртгэл (JSON)', icon: 'groups' },
    { key: 'gifts', label: 'Бэлэг (JSON)', icon: 'featured_seasonal_and_gifts' },
    { key: 'shopping', label: 'Shopping (JSON)', icon: 'shopping_bag' },
    { key: 'participants', label: 'Төлөөлөгчид & Карт (JSON)', icon: 'badge' },
    { key: 'rules', label: 'Дүрэм & Үгсийн сан (JSON)', icon: 'gavel' }
  ];

  // ----------------------------------------------------
  // LOGIN SCREEN
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#001738] flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-7 sm:p-9 border border-white/20">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-[#002045] text-white flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[32px] text-amber-400">admin_panel_settings</span>
            </div>
            <h1 className="text-2xl font-black text-[#002045] tracking-tight">Админ удирдлагын хэсэг</h1>
            <p className="text-xs text-slate-500 mt-1">
              Бүх цэс, баннер, хөтөлбөр, багийн бүртгэлийг удирдах, өөрчлөх систем
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Админ нууц үг
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Нууц үгээ оруулна уу"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1967d2] focus:border-transparent transition-all pr-11"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">error</span>
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-[#1967d2] hover:bg-[#1557b0] text-white font-extrabold text-sm rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">login</span>
              <span>Нэвтрэх</span>
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={onBackToApp}
              className="text-xs font-bold text-slate-500 hover:text-slate-900 inline-flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Апп руу буцах</span>
            </button>
            <span className="text-[11px] text-slate-400">Нууц үг: Aa@123456</span>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // MAIN ADMIN DASHBOARD
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-[#f4f7fc] flex flex-col text-slate-800">
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-40 bg-[#001738] text-white shadow-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-amber-400 border border-white/15">
              <span className="material-symbols-outlined text-[22px]">admin_panel_settings</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-white leading-none">
                  JAPAN TRIP 2026 • Удирдлагын төв
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Шууд холболт
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5 hidden sm:block">
                Бүх цэс, баннер, хөтөлбөрийг хадгалахад хэрэглэгчийн бүх хуудсанд шууд шинэчлэгдэнэ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onBackToApp}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">visibility</span>
              <span className="hidden sm:inline">Аппликейшн үзэх</span>
            </button>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-400/20 text-xs font-bold flex items-center transition-all cursor-pointer"
              title="Гарах"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
            </button>
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 border-t border-white/10 overflow-x-auto scrollbar-none flex items-center gap-1.5 py-2">
          {categoryTabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1967d2] text-white shadow-sm ring-1 ring-white/30'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.countBadge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-md font-extrabold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-amber-300'
                    }`}
                  >
                    {tab.countBadge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Admin Content Container */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex-1 flex flex-col gap-5">
        {/* Success Alert Banner */}
        {saveSuccessMsg && (
          <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs sm:text-sm text-emerald-900 font-bold flex items-center justify-between shadow-sm animate-fade-in">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[22px] text-emerald-600">check_circle</span>
              <span>{saveSuccessMsg}</span>
            </div>
            <button onClick={() => setSaveSuccessMsg(null)} className="text-emerald-700 hover:text-emerald-950">
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        )}

        {/* Sub-header with Editor Mode Switch & Actions */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-black uppercase text-slate-500 tracking-wider">Засварлах хэлбэр:</span>
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 gap-1">
              <button
                onClick={() => setEditMode('both')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  editMode === 'both'
                    ? 'bg-[#1967d2] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">splitscreen</span>
                <span>Хосолсон (UI + JSON)</span>
              </button>
              <button
                onClick={() => setEditMode('json')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  editMode === 'json'
                    ? 'bg-[#1967d2] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">code</span>
                <span>JSON код засварлагч</span>
              </button>
              <button
                onClick={() => setEditMode('visual')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  editMode === 'visual'
                    ? 'bg-[#1967d2] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">tune</span>
                <span>Шууд удирдлага (UI)</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadJson}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              title="JSON файл татаж авах"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span className="hidden sm:inline">Backup татах</span>
            </button>
            <button
              onClick={handleResetCurrent}
              className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Энэ хэсгийг анхны байдалд буцаах"
            >
              <span className="material-symbols-outlined text-[16px]">history</span>
              <span className="hidden sm:inline">Энэ өгөгдлийг сэргээх</span>
            </button>
            <button
              onClick={handleResetAll}
              className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Бүх өгөгдлийг цэверлэх"
            >
              <span className="material-symbols-outlined text-[16px]">restart_alt</span>
              <span className="hidden sm:inline">Бүгдийг сэргээх</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 1. VISUAL MODE: MENUS MANAGEMENT */}
        {/* ========================================================================= */}
        {(editMode === 'visual' || editMode === 'both') && activeTab === 'menus' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-extrabold text-[#002045]">
                    Аппликейшны бүх цэсний визуал удирдлага
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-blue-50 text-[#1967d2] border border-blue-200">
                    {menusList.length} цэс
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Цэс асааж унтраах, нэр болон icon солих, дараалал зөөх (Мөн доор шууд JSON кодоор засах боломжтой)
                </p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleAddNewMenu}
                  className="px-3.5 py-1.5 rounded-xl bg-[#1967d2] hover:bg-[#1557b0] text-white text-xs font-extrabold shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">add_circle</span>
                  <span>+ Шинэ цэс нэмэх</span>
                </button>
                <button
                  onClick={() => handleToggleAllMenus(true)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">check</span>
                  <span>Бүгдийг асаах</span>
                </button>
                <button
                  onClick={() => handleToggleAllMenus(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">block</span>
                  <span>Бүгдийг унтраах</span>
                </button>
              </div>
            </div>

            {/* Menus List Cards */}
            <div className="grid grid-cols-1 gap-3">
              {menusList.map((item, index) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl p-4 border transition-all shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    item.enabled
                      ? 'border-slate-200 hover:border-[#1967d2]'
                      : 'border-slate-200 bg-slate-50/70 opacity-60'
                  }`}
                >
                  {/* Left info & icon */}
                  <div className="flex items-center gap-3.5 min-w-[280px]">
                    <span className="text-xs font-bold text-slate-400 w-5 text-center">
                      #{index + 1}
                    </span>
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
                        item.enabled
                          ? 'bg-[#e8f0fe] text-[#1967d2] border-blue-200'
                          : 'bg-slate-200 text-slate-500 border-slate-300'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-slate-400">[{item.key}]</span>
                        <span
                          className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md ${
                            item.category === 'primary'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-purple-50 text-purple-700 border border-purple-200'
                          }`}
                        >
                          {item.category === 'primary' ? 'Үндсэн цэс' : 'Дэд цэс'}
                        </span>
                        {item.badge && (
                          <span className="bg-red-500 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">{item.description}</p>
                    </div>
                  </div>

                  {/* Middle: Inline Editable fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1 max-w-xl">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Цэсний нэр</label>
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) => handleUpdateMenuField(item.id, 'label', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-[#1967d2]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Icon тэмдэг</label>
                      <input
                        type="text"
                        value={item.icon}
                        onChange={(e) => handleUpdateMenuField(item.id, 'icon', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-mono text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#1967d2]"
                        title="Google Material Symbols icon name"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Тэмдэглэгээ (Badge)</label>
                      <input
                        type="text"
                        value={item.badge || ''}
                        placeholder="Жишээ: QR, Шинэ"
                        onChange={(e) => handleUpdateMenuField(item.id, 'badge', e.target.value || undefined)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#1967d2]"
                      />
                    </div>
                  </div>

                  {/* Right: Actions & Toggle */}
                  <div className="flex items-center gap-2 justify-end shrink-0">
                    {/* Reorder Buttons */}
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => handleMoveMenu(index, 'up')}
                        disabled={index === 0}
                        className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                        title="Дээш зөөх"
                      >
                        <span className="material-symbols-outlined text-[16px] block">expand_less</span>
                      </button>
                      <button
                        onClick={() => handleMoveMenu(index, 'down')}
                        disabled={index === menusList.length - 1}
                        className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                        title="Доош зөөх"
                      >
                        <span className="material-symbols-outlined text-[16px] block">expand_more</span>
                      </button>
                    </div>

                    {/* Enable / Disable Switch */}
                    <button
                      onClick={() => handleToggleMenu(item.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                        item.enabled
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
                          : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {item.enabled ? 'visibility' : 'visibility_off'}
                      </span>
                      <span>{item.enabled ? 'Идэвхтэй' : 'Хаалттай'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. VISUAL MODE: BANNER MANAGEMENT & QUALITY ENHANCEMENT */}
        {/* ========================================================================= */}
        {(editMode === 'visual' || editMode === 'both') && activeTab === 'banners' && (
          <div className="space-y-6">
            {/* Header info */}
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-extrabold text-[#002045]">
                    Толгой Баннер & Дүрсний Чанар Сайжруулалт
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-300">
                    Ultra HD 4K
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Нүүр хуудасны шилдэг баннеруудыг удирдах, өндөр нягтралтай (4K) зургуудыг сонгож тохируулах
                </p>
              </div>

              <button
                onClick={handleAddBannerSlide}
                className="px-4 py-2.5 rounded-xl bg-[#1967d2] hover:bg-[#1557b0] text-white text-xs font-extrabold shadow-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">add_photo_alternate</span>
                <span>Шинэ баннер нэмэх</span>
              </button>
            </div>

            {/* 1-Click HD Preset Quality Enhancer Gallery */}
            <div className="bg-gradient-to-r from-[#002045] to-[#003366] text-white rounded-2xl p-5 shadow-sm border border-blue-900/40">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-400 text-[20px]">auto_fix_high</span>
                  <span className="text-sm font-extrabold tracking-wide">
                    Өндөр чанартай (Ultra HD) Японы гэрэл зургийн сангаас шууд солих
                  </span>
                </div>
                <span className="text-[11px] text-blue-200">Нэг товшилтоор зураг шинэчлэх</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {HD_PRESET_IMAGES.map((preset, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      if (bannersList.length > 0) {
                        const targetIdx = editingBannerIndex !== null ? editingBannerIndex : 0;
                        handleUpdateBannerField(targetIdx, 'imageUrl', preset.url);
                        showQuickToast(`"${preset.name}" өндөр чанартай зураг тохируулагдлаа!`);
                      }
                    }}
                    className="group relative rounded-xl overflow-hidden aspect-[16/10] bg-black/40 border border-white/20 hover:border-amber-400 cursor-pointer transition-all hover:scale-105"
                  >
                    <img
                      src={preset.url}
                      alt={preset.name}
                      className="w-full h-full object-cover group-hover:opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                      <span className="text-[10px] font-bold text-white line-clamp-1 leading-tight">
                        {preset.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Banner Slides List with Live Card Previews */}
            <div className="space-y-4">
              {bannersList.map((slide, index) => {
                const isEditing = editingBannerIndex === index;
                return (
                  <div
                    key={slide.id}
                    className={`bg-white rounded-2xl border shadow-xs transition-all overflow-hidden ${
                      isEditing
                        ? 'border-[#1967d2] ring-2 ring-blue-100'
                        : slide.enabled
                        ? 'border-slate-200 hover:border-slate-300'
                        : 'border-slate-200 opacity-60 bg-slate-50'
                    }`}
                  >
                    {/* Banner Live Visual Preview Row */}
                    <div className="relative min-h-[140px] sm:min-h-[160px] bg-slate-900 flex items-center overflow-hidden">
                      <img
                        src={slide.imageUrl}
                        alt={slide.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#001738]/95 via-[#001738]/70 to-transparent" />

                      {/* Info on top of banner */}
                      <div className="relative z-10 p-4 sm:p-6 text-white max-w-2xl">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#b52426] text-white uppercase tracking-wider">
                            {slide.tag || 'МЭДЭЭ'}
                          </span>
                          <span className="text-xs font-semibold text-slate-300">
                            Слайд #{index + 1}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug">
                          {slide.title}
                        </h3>
                        <p className="text-xs text-slate-200 mt-1 line-clamp-1">{slide.subtitle}</p>

                        {slide.alertBadge && (
                          <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#ffdad6] text-[#410003] text-[11px] font-bold">
                            <span className="material-symbols-outlined text-[14px] text-[#b52426]">warning</span>
                            <span>{slide.alertBadge}</span>
                          </div>
                        )}
                      </div>

                      {/* Top right quick toggles */}
                      <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
                        <button
                          onClick={() => setEditingBannerIndex(isEditing ? null : index)}
                          className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-md text-xs font-bold flex items-center gap-1 cursor-pointer transition-all"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            {isEditing ? 'expand_less' : 'edit'}
                          </span>
                          <span>{isEditing ? 'Хураах' : 'Засварлах'}</span>
                        </button>

                        <button
                          onClick={() => handleToggleBanner(slide.id)}
                          className={`px-3 py-1.5 rounded-xl backdrop-blur-md text-xs font-bold flex items-center gap-1 cursor-pointer transition-all ${
                            slide.enabled
                              ? 'bg-emerald-500/80 text-white hover:bg-emerald-500'
                              : 'bg-black/40 text-slate-300 hover:bg-black/60'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            {slide.enabled ? 'visibility' : 'visibility_off'}
                          </span>
                          <span>{slide.enabled ? 'Идэвхтэй' : 'Идэвхгүй'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Editor Form (Expanded when editing) */}
                    {isEditing && (
                      <div className="p-5 border-t border-slate-200 bg-slate-50/50 space-y-4 animate-fade-in">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[11px] font-extrabold text-slate-700 uppercase">
                              Гарчиг (Title)
                            </label>
                            <input
                              type="text"
                              value={slide.title}
                              onChange={(e) => handleUpdateBannerField(index, 'title', e.target.value)}
                              className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold focus:ring-2 focus:ring-[#1967d2] focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-extrabold text-slate-700 uppercase">
                              Дэд гарчиг (Subtitle)
                            </label>
                            <input
                              type="text"
                              value={slide.subtitle}
                              onChange={(e) => handleUpdateBannerField(index, 'subtitle', e.target.value)}
                              className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-[#1967d2] focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-extrabold text-slate-700 uppercase">
                              Сануулга бичвэр (Alert Badge)
                            </label>
                            <input
                              type="text"
                              value={slide.alertBadge || ''}
                              placeholder="Жишээ: Нислэгээс 2-3 цагийн өмнө ирсэн байх"
                              onChange={(e) => handleUpdateBannerField(index, 'alertBadge', e.target.value)}
                              className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-[#1967d2] focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-extrabold text-slate-700 uppercase">
                              Байршил / Он сар (Location)
                            </label>
                            <input
                              type="text"
                              value={slide.locationText || ''}
                              placeholder="Жишээ: Чингис хаан ОУНБ -> Кансай ОУНБ"
                              onChange={(e) => handleUpdateBannerField(index, 'locationText', e.target.value)}
                              className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-[#1967d2] focus:outline-none"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="text-[11px] font-extrabold text-slate-700 uppercase">
                              Өндөр нягтралтай зураг (Image URL)
                            </label>
                            <div className="mt-1 flex items-center gap-2">
                              <input
                                type="text"
                                value={slide.imageUrl}
                                onChange={(e) => handleUpdateBannerField(index, 'imageUrl', e.target.value)}
                                className="flex-1 px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-mono focus:ring-2 focus:ring-[#1967d2] focus:outline-none"
                              />
                              <span className="text-xs text-slate-400 font-semibold shrink-0">4K / HD</span>
                            </div>
                          </div>

                          <div>
                            <label className="text-[11px] font-extrabold text-slate-700 uppercase">
                              Шошго (Tag)
                            </label>
                            <input
                              type="text"
                              value={slide.tag}
                              onChange={(e) => handleUpdateBannerField(index, 'tag', e.target.value)}
                              className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold focus:ring-2 focus:ring-[#1967d2] focus:outline-none"
                            />
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="flex-1">
                              <label className="text-[11px] font-extrabold text-slate-700 uppercase">
                                Товчлуурын линк (Action Tab)
                              </label>
                              <select
                                value={slide.actionTab || 'khotolbor'}
                                onChange={(e) =>
                                  handleUpdateBannerField(index, 'actionTab', e.target.value as PageTab)
                                }
                                className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold focus:ring-2 focus:ring-[#1967d2] focus:outline-none"
                              >
                                {menusList.map((m) => (
                                  <option key={m.key} value={m.key}>
                                    {m.label} ({m.key})
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="flex-1">
                              <label className="text-[11px] font-extrabold text-slate-700 uppercase">
                                Товчлуурын бичвэр
                              </label>
                              <input
                                type="text"
                                value={slide.actionText || 'Үзэх'}
                                onChange={(e) => handleUpdateBannerField(index, 'actionText', e.target.value)}
                                className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-[#1967d2] focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Reorder & Delete footer */}
                        <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleMoveBanner(index, 'up')}
                              disabled={index === 0}
                              className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300 text-xs font-bold disabled:opacity-40"
                            >
                              ↑ Дээш зөөх
                            </button>
                            <button
                              onClick={() => handleMoveBanner(index, 'down')}
                              disabled={index === bannersList.length - 1}
                              className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300 text-xs font-bold disabled:opacity-40"
                            >
                              ↓ Доош зөөх
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleDeleteBannerSlide(index)}
                              className="px-3 py-1.5 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 text-xs font-bold flex items-center gap-1"
                            >
                              <span className="material-symbols-outlined text-[16px]">delete</span>
                              <span>Устгах</span>
                            </button>
                            <button
                              onClick={() => setEditingBannerIndex(null)}
                              className="px-4 py-1.5 rounded-lg bg-[#1967d2] text-white hover:bg-[#1557b0] text-xs font-extrabold"
                            >
                              Дуусгах
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. JSON CODE EDITOR (Visible in 'both' and 'json' modes, and for all categories) */}
        {/* ========================================================================= */}
        {(editMode === 'json' || editMode === 'both' || (activeTab !== 'menus' && activeTab !== 'banners')) && (
          <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden flex flex-col flex-1">
            {/* Editor Action Bar */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-slate-900">
                      {activeTab === 'menus'
                        ? '📄 Бүх 11 цэсний шууд JSON код удирдах хэсэг'
                        : `${categoryTabs.find((t) => t.key === activeTab)?.label} — Шууд JSON бүтэц`}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-[#1967d2] border border-blue-200">
                      Шууд засварлах & Хадгалах
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {activeTab === 'menus'
                      ? 'Цэс нэмэх, хасах, нэр, icon, дарааллыг JSON кодонд шууд засаад "Хадгалах" товч дарна уу. Апп-д шууд шинэчлэгдэнэ.'
                      : 'JSON кодыг шууд өөрчлөөд "Хадгалах" товч дарахад аппликейшн шууд шинэчлэгдэнэ'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {activeTab === 'menus' && (
                  <button
                    onClick={handleAddNewMenu}
                    className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300 flex items-center gap-1 transition-all"
                    title="Шинэ цэс нэмэх"
                  >
                    <span className="material-symbols-outlined text-[16px]">add_circle</span>
                    <span>+ Шинэ цэс</span>
                  </button>
                )}
                <button
                  onClick={handleFormatJson}
                  className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold flex items-center gap-1 transition-all"
                  title="JSON форматаа цэгцлэх"
                >
                  <span className="material-symbols-outlined text-[16px]">auto_fix_normal</span>
                  <span>Цэгцлэх (Format)</span>
                </button>
                <button
                  onClick={handleCopyJson}
                  className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold flex items-center gap-1 transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">content_copy</span>
                  <span>{copyStatus ? 'Хуулагдлаа!' : 'Хуулах'}</span>
                </button>
                <button
                  onClick={handleSaveJson}
                  className="px-5 py-2 rounded-xl bg-[#1967d2] hover:bg-[#1557b0] text-white text-xs font-black shadow-md flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                >
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  <span>Хадгалах & Шинэчлэх</span>
                </button>
              </div>
            </div>

            {/* Error banner if JSON syntax is invalid */}
            {jsonError && (
              <div className="p-3 bg-red-100/80 border-b border-red-200 text-xs text-red-800 font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-red-600">error</span>
                <span>JSON Алдаа: {jsonError}</span>
              </div>
            )}

            {/* Code Textarea */}
            <div className="relative flex-1 min-h-[460px]">
              <textarea
                value={jsonText}
                onChange={(e) => {
                  setJsonText(e.target.value);
                  try {
                    JSON.parse(e.target.value);
                    setJsonError(null);
                  } catch (err) {
                    if (err instanceof Error) setJsonError(err.message);
                  }
                }}
                spellCheck={false}
                className="w-full h-full min-h-[460px] p-4 font-mono text-xs text-slate-900 bg-slate-950/[0.02] focus:outline-none resize-y leading-relaxed"
                placeholder="JSON өгөгдлөө энд оруулна уу..."
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
