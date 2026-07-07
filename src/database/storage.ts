import { Nickname, allNicknames } from '../data/nicknames';

const FAVORITES_KEY = 'kamshat_favorites';
const RECENT_SEARCHES_KEY = 'kamshat_recent_searches';
const RECENT_VIEWED_KEY = 'kamshat_recent_viewed';
const SETTINGS_KEY = 'kamshat_settings';

export interface RecentSearch {
  id: number;
  search_text: string;
  search_time: number;
}

export interface RecentView {
  id: number;
  nickname_id: number;
  view_time: number;
}

export interface AppSettings {
  dark_mode: boolean;
}

// ===== FAVORITES =====
export function getFavoriteIds(): number[] {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addFavorite(nicknameId: number): void {
  const favs = getFavoriteIds();
  if (!favs.includes(nicknameId)) {
    favs.push(nicknameId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
  }
}

export function removeFavorite(nicknameId: number): void {
  const favs = getFavoriteIds().filter(id => id !== nicknameId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
}

export function isFavorite(nicknameId: number): boolean {
  return getFavoriteIds().includes(nicknameId);
}

export function getFavoriteNicknames(): Nickname[] {
  const favIds = getFavoriteIds();
  return allNicknames.filter(n => favIds.includes(n.id));
}

// ===== RECENT SEARCHES =====
export function getRecentSearches(): RecentSearch[] {
  try {
    const data = localStorage.getItem(RECENT_SEARCHES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addRecentSearch(text: string): void {
  const searches = getRecentSearches();
  const filtered = searches.filter(s => s.search_text.toLowerCase() !== text.toLowerCase());
  const newSearch: RecentSearch = {
    id: Date.now(),
    search_text: text,
    search_time: Date.now(),
  };
  filtered.unshift(newSearch);
  const trimmed = filtered.slice(0, 50);
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(trimmed));
}

export function clearRecentSearches(): void {
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify([]));
}

// ===== RECENTLY VIEWED =====
export function getRecentlyViewed(): RecentView[] {
  try {
    const data = localStorage.getItem(RECENT_VIEWED_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addRecentlyViewed(nicknameId: number): void {
  const views = getRecentlyViewed();
  const filtered = views.filter(v => v.nickname_id !== nicknameId);
  const newView: RecentView = {
    id: Date.now(),
    nickname_id: nicknameId,
    view_time: Date.now(),
  };
  filtered.unshift(newView);
  const trimmed = filtered.slice(0, 100);
  localStorage.setItem(RECENT_VIEWED_KEY, JSON.stringify(trimmed));
}

export function getRecentlyViewedNicknames(): Nickname[] {
  const views = getRecentlyViewed();
  const viewIds = views.map(v => v.nickname_id);
  return viewIds
    .map(id => allNicknames.find(n => n.id === id))
    .filter((n): n is Nickname => n !== undefined)
    .slice(0, 20);
}

// ===== SETTINGS =====
export function getSettings(): AppSettings {
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch {
    // ignore
  }
  return { dark_mode: false };
}

export function saveSettings(settings: AppSettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

// ===== SEARCH =====
export function searchNicknames(query: string): Nickname[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return allNicknames.filter(n =>
    n.nickname.toLowerCase().includes(q) ||
    n.meaning.toLowerCase().includes(q) ||
    n.relationship.toLowerCase().includes(q) ||
    n.style.toLowerCase().includes(q) ||
    n.origin.toLowerCase().includes(q) ||
    n.gender.toLowerCase().includes(q) ||
    n.first_letter.toLowerCase() === q ||
    n.last_letter.toLowerCase() === q ||
    n.length.toString() === q
  );
}

export function filterByRelationship(relationship: string): Nickname[] {
  return allNicknames.filter(n => n.relationship === relationship);
}

export function filterByStyle(style: string): Nickname[] {
  return allNicknames.filter(n => n.style === style);
}

export function getRandomNickname(): Nickname {
  const index = Math.floor(Math.random() * allNicknames.length);
  return allNicknames[index];
}

export function getRandomByRelationship(relationship: string): Nickname {
  const filtered = filterByRelationship(relationship);
  if (filtered.length === 0) return getRandomNickname();
  const index = Math.floor(Math.random() * filtered.length);
  return filtered[index];
}

export function getRandomByStyle(style: string): Nickname {
  const filtered = filterByStyle(style);
  if (filtered.length === 0) return getRandomNickname();
  const index = Math.floor(Math.random() * filtered.length);
  return filtered[index];
}

export function getRandomByLength(minLen: number, maxLen: number): Nickname {
  const filtered = allNicknames.filter(n => n.length >= minLen && n.length <= maxLen);
  if (filtered.length === 0) return getRandomNickname();
  const index = Math.floor(Math.random() * filtered.length);
  return filtered[index];
}

export function getPopularNicknames(count: number = 20): Nickname[] {
  return [...allNicknames]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, count);
}

export function getSimilarNicknames(nickname: Nickname, count: number = 10): Nickname[] {
  return allNicknames
    .filter(n => n.id !== nickname.id)
    .filter(n =>
      n.relationship === nickname.relationship ||
      n.style === nickname.style ||
      n.origin === nickname.origin
    )
    .sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;
      if (a.relationship === nickname.relationship) scoreA += 3;
      if (a.style === nickname.style) scoreA += 2;
      if (a.origin === nickname.origin) scoreA += 1;
      if (b.relationship === nickname.relationship) scoreB += 3;
      if (b.style === nickname.style) scoreB += 2;
      if (b.origin === nickname.origin) scoreB += 1;
      return scoreB - scoreA;
    })
    .slice(0, count);
}
