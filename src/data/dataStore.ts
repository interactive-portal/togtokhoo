import { ITINERARY_DATA, ItineraryItem } from './itinerary';
import { STUDY_TOUR_TEAMS, TeamGroup } from './teams';
import { INITIAL_GIFTS, GiftItem } from './gifts';
import { SHOPPING_MALLS, ShoppingMall } from './shopping';
import { LEADERS, DELEGATES, Leader, Delegate } from './participants';
import {
  CHECKLIST_ITEMS,
  PROHIBITIONS,
  ETIQUETTE_RULES,
  JAPANESE_PHRASES,
  ChecklistItem,
  ProhibitionItem,
  EtiquetteRule,
  JapanesePhrase
} from './rulesAndEtiquette';
import { PageTab } from '../components/Header';

export interface MenuItemConfig {
  id: string;
  key: PageTab;
  label: string;
  icon: string;
  badge?: string;
  category: 'primary' | 'secondary';
  order: number;
  enabled: boolean;
  description?: string;
}

export interface BannerSlide {
  id: string;
  title: string;
  subtitle: string;
  dateText?: string;
  alertBadge?: string;
  locationText?: string;
  imageUrl: string;
  tag: string;
  actionTab?: PageTab;
  actionText?: string;
  enabled: boolean;
  order: number;
}

export const INITIAL_MENUS: MenuItemConfig[] = [
  { id: 'm-nuur', key: 'nuur', label: 'Нүүр хуудас', icon: 'home', category: 'primary', order: 1, enabled: true, description: 'Аяллын үндсэн хяналтын самбар, онцлох мэдэгдлүүд' },
  { id: 'm-khotolbor', key: 'khotolbor', label: 'Хөтөлбөр', icon: 'calendar_month', category: 'primary', order: 2, enabled: true, description: '10 хоногийн бүрэн хөтөлбөр, уулзалт, цагийн хуваарь' },
  { id: 'm-bag', key: 'bagiin-burtgel', label: 'Багийн бүртгэл', icon: 'groups', category: 'primary', order: 3, enabled: true, description: '5 багийн гишүүд, ахлагч нар, оногдсон даалгавар' },
  { id: 'm-beleg', key: 'beleg', label: 'Бэлэг', icon: 'featured_seasonal_and_gifts', category: 'primary', order: 4, enabled: true, description: 'Японы байгууллага, хөтөч, зочдод өгөх бэлгийн хүснэгт' },
  { id: 'm-shopping', key: 'shopping', label: 'Shopping', icon: 'shopping_bag', category: 'primary', order: 5, enabled: true, description: 'Токио болон Осака хотуудын худалдааны төвүүд' },
  { id: 'm-deklarats', key: 'deklarats', label: 'Декларац (VJW)', icon: 'badge', badge: 'QR', category: 'primary', order: 6, enabled: true, description: 'Visit Japan Web цагаачлалын карт, гаалийн мэдүүлэг' },
  { id: 'm-teever', key: 'teever', label: 'Тээвэр, чиглэл, байршил', icon: 'directions_bus', category: 'secondary', order: 7, enabled: true, description: 'Нислэг, Шинкансэн галт тэрэг, буудлуудын мэдээлэл' },
  { id: 'm-khel', key: 'khel', label: 'Япон хэлний түргэн туслах', icon: 'translate', category: 'secondary', order: 8, enabled: true, description: 'Дуут дуудлагатай Япон хэлний нийтлэг өгүүлбэрүүд' },
  { id: 'm-irts', key: 'surgaltyn-irts', label: 'Сургалтын ирц', icon: 'fact_check', category: 'secondary', order: 9, enabled: true, description: 'Өдөр тутмын ирц бүртгэл, хураангуй тайлан' },
  { id: 'm-zurag', key: 'zurgiin-san', label: 'Зургийн сан', icon: 'photo_library', category: 'secondary', order: 10, enabled: true, description: 'Аяллын зураг, видео, дурсамжийн сан' },
  { id: 'm-kholboo', key: 'kholboo-barikh', label: 'Холбоо барих', icon: 'contacts', category: 'secondary', order: 11, enabled: true, description: 'Яаралтай утас, зохион байгуулагчид, ЭСЯ-ны мэдээлэл' }
];

export const INITIAL_BANNERS: BannerSlide[] = [
  {
    id: 'slide-flight',
    title: '2026.10.18 (Ня) 13:00',
    subtitle: 'Нисэх өдөр • Улаанбаатар (UBN) → Кансай Осака (KIX)',
    dateText: '2026.10.18 13:00',
    alertBadge: 'Нислэгээс 2-3 цагийн өмнө нисэх буудалд ирсэн байх.',
    locationText: 'Чингис хаан олон улсын нисэх буудал (UBN)',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=85&w=2400&auto=format&fit=crop',
    tag: 'ШУУРХАЙ МЭДЭЭ',
    actionTab: 'teever',
    actionText: 'Нислэг & Тээвэр',
    enabled: true,
    order: 1
  },
  {
    id: 'slide-companies',
    title: 'Үйлдвэр, Байгууллагын Танилцах Айлчлал',
    subtitle: 'Hiro Coffee, Amagasaki Shinkin Bank, Tanaka Tec, Harukado Co Ltd',
    dateText: '2026.10.20 - 10.23',
    alertBadge: 'Компанийн айлчлалд албаны хувцаслалт (Business Suit) шаардлагатай.',
    locationText: 'Осака, Хёго, Кобе, Нара мужийн төвүүд',
    imageUrl: 'https://images.unsplash.com/photo-1590559899731-a3f07b78375f?q=85&w=2400&auto=format&fit=crop',
    tag: 'БИЗНЕС СУРГАЛТ',
    actionTab: 'khotolbor',
    actionText: 'Хөтөлбөр үзэх',
    enabled: true,
    order: 2
  },
  {
    id: 'slide-shopping',
    title: 'Токио & Осака Хотын Шилдэг Дэлгүүрүүд',
    subtitle: 'Isetan Shinjuku, Shibuya Scramble, Ginza Shopping, Namba Parks',
    dateText: 'Чөлөөт өдрүүд',
    alertBadge: 'Tax Free худалдан авалтад паспортын эх хувь заавал шаардагдана.',
    locationText: 'Токио & Осака худалдааны гол дүүргүүд',
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=85&w=2400&auto=format&fit=crop',
    tag: 'SHOPPING & TOUR',
    actionTab: 'shopping',
    actionText: 'Худалдааны төвүүд',
    enabled: true,
    order: 3
  },
  {
    id: 'slide-vjw',
    title: 'Visit Japan Web & Багийн Зохион Байгуулалт',
    subtitle: 'Цагаачлалын карт, гаалийн мэдүүлгийн QR кодыг бэлэн байлгах',
    dateText: 'Хил нэвтрэх бэлтгэл',
    alertBadge: 'QR кодоо утасны зургийн санд Screenshot хийж офлайн бэлдэнэ үү.',
    locationText: 'services.digital.go.jp цахим систем',
    imageUrl: 'https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?q=85&w=2400&auto=format&fit=crop',
    tag: 'ХИЛ НЭВТРЭХ',
    actionTab: 'deklarats',
    actionText: 'QR Декларац',
    enabled: true,
    order: 4
  }
];

export const DATA_KEYS = {
  menus: 'japan_tour_data_menus',
  banners: 'japan_tour_data_banners',
  itinerary: 'japan_tour_data_itinerary',
  teams: 'japan_tour_data_teams',
  gifts: 'japan_tour_data_gifts',
  shopping: 'japan_tour_data_shopping',
  participants: 'japan_tour_data_participants',
  rules: 'japan_tour_data_rules'
} as const;

export type DataCategory = keyof typeof DATA_KEYS | 'all_json';

// 1. Menus Data
export const getMenusData = (): MenuItemConfig[] => {
  try {
    const raw = localStorage.getItem(DATA_KEYS.menus);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.warn('Failed to parse stored menus data', err);
  }
  return INITIAL_MENUS;
};

export const saveMenusData = (data: MenuItemConfig[]): void => {
  localStorage.setItem(DATA_KEYS.menus, JSON.stringify(data, null, 2));
  window.dispatchEvent(new Event('study_tour_data_updated'));
};

// 2. Banners Data
export const getBannersData = (): BannerSlide[] => {
  try {
    const raw = localStorage.getItem(DATA_KEYS.banners);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.warn('Failed to parse stored banners data', err);
  }
  return INITIAL_BANNERS;
};

export const saveBannersData = (data: BannerSlide[]): void => {
  localStorage.setItem(DATA_KEYS.banners, JSON.stringify(data, null, 2));
  window.dispatchEvent(new Event('study_tour_data_updated'));
};

// 3. Itinerary Data
export const getItineraryData = (): ItineraryItem[] => {
  try {
    const raw = localStorage.getItem(DATA_KEYS.itinerary);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.warn('Failed to parse stored itinerary data', err);
  }
  return ITINERARY_DATA;
};

export const saveItineraryData = (data: ItineraryItem[]): void => {
  localStorage.setItem(DATA_KEYS.itinerary, JSON.stringify(data, null, 2));
  window.dispatchEvent(new Event('study_tour_data_updated'));
};

// 4. Teams Data
export const getTeamsData = (): TeamGroup[] => {
  try {
    const raw = localStorage.getItem(DATA_KEYS.teams);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.warn('Failed to parse stored teams data', err);
  }
  return STUDY_TOUR_TEAMS;
};

export const saveTeamsData = (data: TeamGroup[]): void => {
  localStorage.setItem(DATA_KEYS.teams, JSON.stringify(data, null, 2));
  window.dispatchEvent(new Event('study_tour_data_updated'));
};

// 5. Gifts Data
export const getGiftsData = (): GiftItem[] => {
  try {
    const raw = localStorage.getItem(DATA_KEYS.gifts);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.warn('Failed to parse stored gifts data', err);
  }
  return INITIAL_GIFTS;
};

export const saveGiftsData = (data: GiftItem[]): void => {
  localStorage.setItem(DATA_KEYS.gifts, JSON.stringify(data, null, 2));
  window.dispatchEvent(new Event('study_tour_data_updated'));
};

// 6. Shopping Data
export const getShoppingData = (): ShoppingMall[] => {
  try {
    const raw = localStorage.getItem(DATA_KEYS.shopping);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.warn('Failed to parse stored shopping data', err);
  }
  return SHOPPING_MALLS;
};

export const saveShoppingData = (data: ShoppingMall[]): void => {
  localStorage.setItem(DATA_KEYS.shopping, JSON.stringify(data, null, 2));
  window.dispatchEvent(new Event('study_tour_data_updated'));
};

// 7. Participants Data (Leaders & Delegates)
export interface ParticipantsBundle {
  leaders: Leader[];
  delegates: Delegate[];
}

export const getParticipantsData = (): ParticipantsBundle => {
  try {
    const raw = localStorage.getItem(DATA_KEYS.participants);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.warn('Failed to parse stored participants data', err);
  }
  return { leaders: LEADERS, delegates: DELEGATES };
};

export const saveParticipantsData = (data: ParticipantsBundle): void => {
  localStorage.setItem(DATA_KEYS.participants, JSON.stringify(data, null, 2));
  window.dispatchEvent(new Event('study_tour_data_updated'));
};

// 8. Rules & Etiquette Data
export interface RulesBundle {
  checklist: ChecklistItem[];
  prohibitions: ProhibitionItem[];
  etiquette: EtiquetteRule[];
  phrases: JapanesePhrase[];
}

export const getRulesData = (): RulesBundle => {
  try {
    const raw = localStorage.getItem(DATA_KEYS.rules);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.warn('Failed to parse stored rules data', err);
  }
  return {
    checklist: CHECKLIST_ITEMS,
    prohibitions: PROHIBITIONS,
    etiquette: ETIQUETTE_RULES,
    phrases: JAPANESE_PHRASES
  };
};

export const saveRulesData = (data: RulesBundle): void => {
  localStorage.setItem(DATA_KEYS.rules, JSON.stringify(data, null, 2));
  window.dispatchEvent(new Event('study_tour_data_updated'));
};

// Get all categories in one unified JSON object
export const getAllDataUnified = () => ({
  menus: getMenusData(),
  banners: getBannersData(),
  itinerary: getItineraryData(),
  teams: getTeamsData(),
  gifts: getGiftsData(),
  shopping: getShoppingData(),
  participants: getParticipantsData(),
  rules: getRulesData()
});

// Save all categories from unified JSON
export const saveAllDataUnified = (all: Record<string, any>) => {
  if (Array.isArray(all.menus)) saveMenusData(all.menus);
  if (Array.isArray(all.banners)) saveBannersData(all.banners);
  if (Array.isArray(all.itinerary)) saveItineraryData(all.itinerary);
  if (Array.isArray(all.teams)) saveTeamsData(all.teams);
  if (Array.isArray(all.gifts)) saveGiftsData(all.gifts);
  if (Array.isArray(all.shopping)) saveShoppingData(all.shopping);
  if (all.participants) saveParticipantsData(all.participants);
  if (all.rules) saveRulesData(all.rules);
  window.dispatchEvent(new Event('study_tour_data_updated'));
};

// Reset single category to default
export const resetCategoryToDefault = (category: DataCategory): void => {
  if (category === 'all_json') {
    resetAllDataToDefaults();
    return;
  }
  localStorage.removeItem(DATA_KEYS[category]);
  window.dispatchEvent(new Event('study_tour_data_updated'));
};

// Reset all to defaults
export const resetAllDataToDefaults = (): void => {
  Object.values(DATA_KEYS).forEach((k) => localStorage.removeItem(k));
  window.dispatchEvent(new Event('study_tour_data_updated'));
};
