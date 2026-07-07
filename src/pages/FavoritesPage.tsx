import { useState, useCallback, useEffect } from 'react';
import { Heart, Search, X } from 'lucide-react';
import { Nickname } from '../data/nicknames';
import { getFavoriteNicknames } from '../database/storage';
import NicknameCard from '../components/NicknameCard';
import NicknameDetail from '../components/NicknameDetail';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Nickname[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNickname, setSelectedNickname] = useState<Nickname | null>(null);

  const loadFavorites = useCallback(() => {
    setFavorites(getFavoriteNicknames());
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const filteredFavorites = searchQuery.trim()
    ? favorites.filter(n =>
        n.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.relationship.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.style.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : favorites;

  const handleNicknameClick = useCallback((nickname: Nickname) => {
    setSelectedNickname(nickname);
  }, []);

  const handleBack = useCallback(() => {
    setSelectedNickname(null);
    loadFavorites();
  }, [loadFavorites]);

  if (selectedNickname) {
    return (
      <NicknameDetail
        nickname={selectedNickname}
        onBack={handleBack}
        onNicknameClick={handleNicknameClick}
      />
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Heart size={22} className="text-accent fill-accent" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-dark-text">Favorites</h1>
        </div>
        <p className="text-sm text-gray-500 dark:text-dark-muted">
          {favorites.length} saved nickname{favorites.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Search */}
      {favorites.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white dark:bg-dark-card card-shadow border border-gray-100 dark:border-gray-700/50 focus-within:border-primary transition-colors">
            <Search size={18} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search favorites..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-gray-800 dark:text-dark-text placeholder-gray-400"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')}>
                <X size={16} className="text-gray-400" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Empty State */}
      {favorites.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 rounded-3xl bg-accent-100 dark:bg-pink-900/20 flex items-center justify-center mx-auto mb-4">
            <Heart size={36} className="text-accent" />
          </div>
          <h3 className="text-lg font-bold text-gray-700 dark:text-dark-text mb-2">No favorites yet</h3>
          <p className="text-sm text-gray-500 dark:text-dark-muted max-w-xs mx-auto">
            Tap the heart icon on any nickname to save it here
          </p>
        </div>
      )}

      {/* Favorites List */}
      {filteredFavorites.length === 0 && favorites.length > 0 && searchQuery && (
        <div className="text-center py-12">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-gray-500 dark:text-dark-muted">No favorites match "{searchQuery}"</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-3">
        {filteredFavorites.map(n => (
          <NicknameCard
            key={n.id}
            nickname={n}
            onClick={handleNicknameClick}
            onFavoriteChange={loadFavorites}
          />
        ))}
      </div>
    </div>
  );
}
