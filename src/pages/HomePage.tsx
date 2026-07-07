import { useState, useMemo, useCallback, useEffect } from 'react';
import { Search, Shuffle, ChevronRight, Clock, TrendingUp, X } from 'lucide-react';
import { Nickname, allNicknames, relationshipCategories, styleCategories, relationshipEmojis, styleEmojis } from '../data/nicknames';
import { searchNicknames, getPopularNicknames, getRecentlyViewedNicknames, getRandomNickname, filterByRelationship, filterByStyle, addRecentSearch, getRecentSearches, clearRecentSearches } from '../database/storage';
import NicknameCard from '../components/NicknameCard';
import NicknameDetail from '../components/NicknameDetail';

interface HomePageProps {
  onNavigate?: (page: string, data?: Record<string, string>) => void;
}

type HomeView = 'main' | 'detail' | 'search-results' | 'category-list';

export default function HomePage(_props: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Nickname[]>([]);
  const [view, setView] = useState<HomeView>('main');
  const [selectedNickname, setSelectedNickname] = useState<Nickname | null>(null);
  const [categoryTitle, setCategoryTitle] = useState('');
  const [categoryList, setCategoryList] = useState<Nickname[]>([]);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState(getRecentSearches());
  const [recentlyViewed, setRecentlyViewed] = useState<Nickname[]>([]);

  const popular = useMemo(() => getPopularNicknames(10), []);

  useEffect(() => {
    setRecentlyViewed(getRecentlyViewedNicknames());
  }, [view]);

  const handleSearch = useCallback(() => {
    const q = searchQuery.trim();
    if (!q) return;
    addRecentSearch(q);
    const results = searchNicknames(q);
    setSearchResults(results);
    setView('search-results');
    setCategoryTitle(`Search: "${q}"`);
    setShowSearchSuggestions(false);
    setRecentSearches(getRecentSearches());
  }, [searchQuery]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  }, [handleSearch]);

  const handleNicknameClick = useCallback((nickname: Nickname) => {
    setSelectedNickname(nickname);
    setView('detail');
  }, []);

  const handleCategoryClick = useCallback((type: 'relationship' | 'style', value: string) => {
    const list = type === 'relationship' ? filterByRelationship(value) : filterByStyle(value);
    setCategoryList(list);
    const emoji = type === 'relationship' ? (relationshipEmojis[value] || '💫') : (styleEmojis[value] || '✨');
    setCategoryTitle(`${emoji} ${value}`);
    setView('category-list');
  }, []);

  const handleRandom = useCallback(() => {
    const random = getRandomNickname();
    setSelectedNickname(random);
    setView('detail');
  }, []);

  const handleBack = useCallback(() => {
    setView('main');
    setSelectedNickname(null);
  }, []);

  const handleClearSearches = useCallback(() => {
    clearRecentSearches();
    setRecentSearches([]);
  }, []);

  const handleRecentSearchClick = useCallback((text: string) => {
    setSearchQuery(text);
    addRecentSearch(text);
    const results = searchNicknames(text);
    setSearchResults(results);
    setView('search-results');
    setCategoryTitle(`Search: "${text}"`);
    setShowSearchSuggestions(false);
  }, []);

  // Detail View
  if (view === 'detail' && selectedNickname) {
    return (
      <NicknameDetail
        nickname={selectedNickname}
        onBack={handleBack}
        onNicknameClick={handleNicknameClick}
      />
    );
  }

  // Search Results or Category List
  if (view === 'search-results' || view === 'category-list') {
    const items = view === 'search-results' ? searchResults : categoryList;
    return (
      <div className="animate-fade-in">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-primary mb-4 font-medium text-sm"
        >
          <ChevronRight size={16} className="rotate-180" />
          Back to Home
        </button>

        <h2 className="text-xl font-bold text-gray-800 dark:text-dark-text mb-1">
          {categoryTitle}
        </h2>
        <p className="text-sm text-gray-500 dark:text-dark-muted mb-4">
          {items.length} nickname{items.length !== 1 ? 's' : ''} found
        </p>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-3">🔍</div>
            <p className="text-gray-500 dark:text-dark-muted font-medium">No nicknames found</p>
            <p className="text-sm text-gray-400 dark:text-gray-600 mt-1">Try a different search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {items.map(n => (
              <NicknameCard key={n.id} nickname={n} onClick={handleNicknameClick} />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Main Home View
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-dark-text">
          Discover <span className="text-gradient">Nicknames</span>
        </h1>
        <p className="text-sm text-gray-500 dark:text-dark-muted mt-1">
          {allNicknames.length.toLocaleString()} nicknames to explore ✨
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white dark:bg-dark-card card-shadow-lg border border-gray-100 dark:border-gray-700/50 focus-within:border-primary dark:focus-within:border-primary transition-colors">
          <Search size={18} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search nicknames, meanings, styles..."
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              setShowSearchSuggestions(true);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSearchSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
            className="flex-1 bg-transparent outline-none text-sm text-gray-800 dark:text-dark-text placeholder-gray-400 dark:placeholder-gray-500"
          />
          {searchQuery && (
            <button onClick={() => { setSearchQuery(''); setShowSearchSuggestions(false); }}>
              <X size={16} className="text-gray-400" />
            </button>
          )}
          <button
            onClick={handleSearch}
            className="px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-medium hover:bg-primary-dark transition-colors"
          >
            Search
          </button>
        </div>

        {/* Search Suggestions */}
        {showSearchSuggestions && recentSearches.length > 0 && !searchQuery && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-dark-card rounded-2xl card-shadow-lg border border-gray-100 dark:border-gray-700/50 z-20 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 dark:border-gray-700/50">
              <span className="text-xs font-semibold text-gray-500 dark:text-dark-muted uppercase tracking-wider">Recent Searches</span>
              <button
                onClick={handleClearSearches}
                className="text-xs text-primary font-medium"
              >
                Clear All
              </button>
            </div>
            {recentSearches.slice(0, 5).map(s => (
              <button
                key={s.id}
                onClick={() => handleRecentSearchClick(s.search_text)}
                className="flex items-center gap-3 px-4 py-2.5 w-full text-left hover:bg-gray-50 dark:hover:bg-dark-surface transition-colors"
              >
                <Clock size={14} className="text-gray-400 shrink-0" />
                <span className="text-sm text-gray-700 dark:text-dark-text">{s.search_text}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Random Nickname Button */}
      <button
        onClick={handleRandom}
        className="w-full mb-6 p-4 rounded-2xl gradient-primary text-white flex items-center justify-between card-shadow-lg hover:opacity-95 transition-opacity active:scale-[0.99]"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Shuffle size={20} />
          </div>
          <div className="text-left">
            <p className="font-bold text-sm">Random Nickname</p>
            <p className="text-white/70 text-xs">Discover something new</p>
          </div>
        </div>
        <ChevronRight size={20} className="text-white/60" />
      </button>

      {/* Relationship Categories */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-800 dark:text-dark-text">👥 Relationships</h2>
        </div>
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
          {relationshipCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick('relationship', cat)}
              className="flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-2xl bg-white dark:bg-dark-card card-shadow hover:card-shadow-lg transition-all shrink-0 active:scale-95 min-w-[72px]"
            >
              <span className="text-xl">{relationshipEmojis[cat]}</span>
              <span className="text-[11px] font-medium text-gray-700 dark:text-dark-text whitespace-nowrap">{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Style Categories */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-800 dark:text-dark-text">🎨 Styles</h2>
        </div>
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
          {styleCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick('style', cat)}
              className="flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-2xl bg-white dark:bg-dark-card card-shadow hover:card-shadow-lg transition-all shrink-0 active:scale-95 min-w-[72px]"
            >
              <span className="text-xl">{styleEmojis[cat]}</span>
              <span className="text-[11px] font-medium text-gray-700 dark:text-dark-text whitespace-nowrap">{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Popular Nicknames */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-800 dark:text-dark-text flex items-center gap-2">
            <TrendingUp size={18} className="text-primary" />
            Popular Nicknames
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {popular.map(n => (
            <NicknameCard key={n.id} nickname={n} onClick={handleNicknameClick} />
          ))}
        </div>
      </div>

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-gray-800 dark:text-dark-text flex items-center gap-2">
              <Clock size={18} className="text-gray-400" />
              Recently Viewed
            </h2>
          </div>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
            {recentlyViewed.slice(0, 10).map(n => (
              <button
                key={n.id}
                onClick={() => handleNicknameClick(n)}
                className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white dark:bg-dark-card card-shadow shrink-0 min-w-[90px] hover:card-shadow-lg transition-all active:scale-95"
              >
                <div className="w-10 h-10 rounded-xl gradient-card flex items-center justify-center text-white font-bold">
                  {n.nickname.charAt(0)}
                </div>
                <span className="text-xs font-medium text-gray-700 dark:text-dark-text text-center leading-tight max-w-[80px] truncate">
                  {n.nickname}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
