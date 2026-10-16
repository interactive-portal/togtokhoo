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

export const DATA_KEYS = {
  itinerary: 'japan_tour_data_itinerary',
  teams: 'japan_tour_data_teams',
  gifts: 'japan_tour_data_gifts',
  shopping: 'japan_tour_data_shopping',
  participants: 'japan_tour_data_participants',
  rules: 'japan_tour_data_rules'
} as const;

export type DataCategory = keyof typeof DATA_KEYS;

// 1. Itinerary Data
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

// 2. Teams Data
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

// 3. Gifts Data
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

// 4. Shopping Data
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

// 5. Participants Data (Leaders & Delegates)
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

// 6. Rules & Etiquette Data
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

// Reset all to defaults
export const resetAllDataToDefaults = (): void => {
  Object.values(DATA_KEYS).forEach((k) => localStorage.removeItem(k));
  window.dispatchEvent(new Event('study_tour_data_updated'));
};
